class Api::V1::Groups::TasksController < ApplicationController
  before_action :find_group

  # Fetch all the tasks of an user in a group (whether the user is the creator or assignee)
  # GET /api/v1/groups/:group_id/tasks
  def index
    @tasks = @group.tasks.where(user: current_user).or(Task.where(assignee: current_user))
    authorize @tasks.first, policy_class: Groups::TaskPolicy # every record will have the same group so we can just take one and do the authorize
    render json: { tasks: @tasks }
  end

  # Create a task in a group
  # POST /api/v1/groups/:group_id/tasks
  def create
    @task = Task.new(task_params)
    @task.user = current_user
    @task.group = @group
    authorize @task, policy_class: Groups::TaskPolicy
    if @task.save
      render json: { task: @task , message: "The task was successfully created" }
    else
      error_message = @task.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  private

  def find_group
    @group = Group.find(params[:group_id])
  end

  def task_params
    params.require(:task).permit(:name, :note, :finished, :due_date, :assignee_id)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end
