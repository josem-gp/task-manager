class Api::V1::GroupsController < ApplicationController
  def index
    render json: { status: 200, message: "Hello World!"}
  end
end