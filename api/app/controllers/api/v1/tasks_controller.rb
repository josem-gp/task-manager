class Api::V1::TasksController < ApplicationController
  before_action :find_task, only: [:show, :update, :destroy]

  # Fetch one specific task
  # GET /api/v1/tasks/:id
  def show
    render json: { task_value: build_task_json(@task) }
  end

  # Create a task
  # POST /api/v1/tasks
  def create
    @task = Task.new(task_params.except(:tag_ids))
    @task.user = current_user
    authorize @task, policy_class: Api::V1::TaskPolicy
    if @task.save
      # Create the tagged_tasks if the tags param is not empty
      @task.create_tagged_tasks(task_params[:tag_ids]) if task_params[:tag_ids]
      render json: { task_value: build_task_json(@task), message: "The task was successfully created" }
    else
      error_message = @task.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Update a task 
  # PATCH /api/v1/tasks/:id
  def update
    if @task.update(task_params.except(:tag_ids))
      # Create the tagged_tasks if the tags param is not empty
      @task.create_tagged_tasks(task_params[:tag_ids]) if task_params[:tag_ids]
      render json: { task_value: build_task_json(@task), message: "The task was successfully updated" }
    else
      error_message = @task.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Destroy a task
  # DELETE /api/v1/tasks/:id
  def destroy
    if @task.destroy # this will also delete the tagged_tasks associated
      render json: { message: "The task was successfully deleted" }
    else 
      render_error("The task couldn't be deleted", :bad_request)
    end
  end

  private

  def find_task
    @task = Task.find(params[:id])
    authorize @task, policy_class: Api::V1::TaskPolicy
  end

  def task_params
    params.require(:task).permit(:name, :note, :finished, :due_date, :assignee_id, :group_id, tag_ids: [])
  end
end
