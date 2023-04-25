class Api::V1::Groups::TasksController < ApplicationController
  before_action :find_group

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
      render json: { 
        task_value: build_task_json(@task), 
        message: "The task was successfully created" 
      }
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
    params.require(:task).permit(:name, :note, :finished, :due_date, :assignee_id, tag_ids: [])
  end
end
