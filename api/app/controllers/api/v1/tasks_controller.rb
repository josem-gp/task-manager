class Api::V1::TasksController < ApplicationController
  before_action :find_task, only: [:show, :update, :destroy]
  before_action :find_all_user_tasks, only: [:index, :search_tasks]
  before_action :skip_authorization, only: [:index, :search_tasks]
  
  # Fetch all the tasks of a user (whether the user is the creator or assignee)
  # GET /api/v1/tasks
  def index
    render json: { tasks: @user_tasks } # we don't need the auth check because we already fetch only the tasks of the current user in the backend
  end

  # Fetch one specific task
  # GET /api/v1/tasks/:id
  def show
    render json: { task: @task }
  end

  # Create a task
  # POST /api/v1/tasks
  def create
    @task = Task.new(task_params)
    @task.user = current_user
    authorize @task, policy_class: Api::V1::TaskPolicy
    if @task.save
      render json: { task: @task , message: "The task was successfully created" }
    else
      error_message = @task.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Update a task 
  # PATCH /api/v1/tasks/:id
  def update
    if @task.update(task_params)
      render json: { task: @task , message: "The task was successfully updated" }
    else
      error_message = @task.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Destroy a task
  # DELETE /api/v1/tasks/:id
  def destroy
    if @task.destroy
      render json: { message: "The task was successfully deleted" }
    else 
      render_error("The task couldn't be deleted", :bad_request)
    end
  end

  # Fetch all tasks where user is creator or assignee
  # GET /api/v1/search_tasks/:search_id
  def search_tasks
    searched_tasks = @user_tasks.search_by_name_and_description(params[:search_id])
    if searched_tasks.empty?
      render_error("There are no matches for your search", :not_found)
    else
      render json: { tasks: searched_tasks }
    end
  end

  private

  def find_all_user_tasks
    @user_tasks = Task.where(user: current_user).or(Task.where(assignee: current_user))
  end

  def find_task
    @task = Task.find(params[:id])
    authorize @task, policy_class: Api::V1::TaskPolicy
  end

  def task_params
    params.require(:task).permit(:name, :note, :finished, :due_date, :assignee_id, :group_id)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end