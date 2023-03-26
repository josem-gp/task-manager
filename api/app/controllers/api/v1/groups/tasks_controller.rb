class Api::V1::Groups::TasksController < ApplicationController
  before_action :find_group
  before_action :skip_authorization, only: [:index]

  # Fetch all the tasks of an user in a group (whether the user is the creator or assignee)
  # GET /api/v1/groups/:group_id/tasks
  def index
    tasks = @group.tasks.where(user: current_user).or(Task.where(assignee: current_user)) # we don't need the auth check because we already fetch only the tasks in the group of the current user in the backend
    render json: { task_value: divide_tasks_by_date(tasks) }
  end

  # Create a task in a group
  # POST /api/v1/groups/:group_id/tasks
  def create
    @task = Task.new(task_params.except(:tag_ids))
    @task.user = current_user
    @task.group = @group
    authorize @task, policy_class: Api::V1::Groups::TaskPolicy
    if @task.save
      # Create the tagged_tasks if the tags param is not empty
      @task.create_tagged_tasks(task_params[:tag_ids]) if task_params[:tag_ids]
      render json: { task_value: { task: @task, task_tags: @task.tags }, message: "The task was successfully created" }
    else
      error_message = @task.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  private

  def find_group
    @group = Group.find(params[:group_id])
  end

  # We want to return each task and their tags
  def build_json(tasks)
    tasks.map { |t|  { task: t, task_tags: t.tags } }
  end

  def task_params
    params.require(:task).permit(:name, :note, :finished, :due_date, :assignee_id, tag_ids: [])
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end

  def divide_tasks_by_date(tasks)
    today = Date.today
    upcoming_tasks = tasks.filter { |task| task.due_date > today }
    past_tasks = tasks.filter { |task| task.due_date < today }
    today_tasks = tasks.filter { |task| task.due_date == today }
    {
      today: build_json(today_tasks),
      upcoming: build_json(upcoming_tasks),
      past: build_json(past_tasks)
    }
  end
end
