class Api::V1::TasksController < ApplicationController
  before_action :find_task, only: [:show, :update, :destroy]
  before_action :skip_authorization, only: [:index]
  
  # Fetch all the tasks of a user (whether the user is the creator or assignee)
  # GET /api/v1/tasks
  def index
    tasks = Task.where(user: current_user).or(Task.where(assignee: current_user)) # we don't need the auth check because we already fetch only the tasks of the current user in the backend
    render json: { tasks: tasks }
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
    authorize @task
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

  private

  def find_task
    @task = Task.find(params[:id])
    authorize @task
  end

  def task_params
    params.require(:task).permit(:name, :note, :finished, :due_date, :assignee_id, :group_id)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end