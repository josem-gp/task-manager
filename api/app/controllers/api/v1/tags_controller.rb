class Api::V1::TagsController < ApplicationController
  before_action :find_group
  before_action :find_tag, only: [:update, :destroy]
  
  # Fetch all the tags in a group
  # GET /api/v1/groups/:group_id/tags
  def index
    @tags = @group.tags
    authorize @tags.first, policy_class: Api::V1::TagPolicy # every record will have the same group so we can just take one and do the authorize
    render json: { tags: except_attributes(@tags, ['created_at', 'updated_at']) }
  end

  # Create a tag
  # POST /api/v1/groups/:group_id/tags
  def create
    @tag = Tag.new(tag_params)
    @tag.user = current_user
    @tag.group = @group
    authorize @tag, policy_class: Api::V1::TagPolicy
    if @tag.save
      render json: { 
        tag: except_attributes(@tag, ['created_at', 'updated_at']), 
        message: "The tag was successfully created" 
      }
    else
      error_message = @tag.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Update a tag 
  # PATCH /api/v1/groups/:group_id/tags/:id
  def update
    if @tag.update(tag_params)
      render json: { 
        tag: except_attributes(@tag, ['created_at', 'updated_at']), 
        message: "The tag was successfully updated"
      }
    else
      error_message = @tag.errors.objects.first.full_message
      render_error(error_message, :bad_request)
    end
  end

  # Destroy a tag
  # DELETE /api/v1/groups/:group_id/tags/:id
  def destroy
    if @tag.destroy
      render json: { message: "The tag was successfully deleted" }
    else 
      render_error("The tag couldn't be deleted", :bad_request)
    end
  end

  private

  def find_group
    @group = Group.find(params[:group_id])
  end

  def find_tag
    @tag = Tag.find(params[:id])
    authorize @tag, policy_class: Api::V1::TagPolicy
  end

  def tag_params
    params.require(:tag).permit(:name)
  end

  def render_error(message, status)
    render json: {message: message}, status: status
  end
end
