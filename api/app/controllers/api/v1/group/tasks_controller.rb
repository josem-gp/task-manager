class Api::V1::Group::TasksController < ApplicationController
  before_action :find_group
  before_action :find_tag, only: [:create]
end
