# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Destroy TaggedTasks"
TaggedTask.destroy_all

puts "Destroy Tags"
Tag.destroy_all

puts "Destroy Tasks"
Task.destroy_all

puts "Destroy Members"
Member.destroy_all

puts "Destroy Groups"
Group.destroy_all

puts "Destroy Users"
User.destroy_all

puts "Creating User and Admin"
admin_one = User.create!(email: "jose@test.io", password: "1234567")
user_one = User.create!(email: "saki@test.io", password: "1234567")
admin_two = User.create!(email: "joe@test.io", password: "1234567")

puts "Creating Group"
group_one = Group.create!(name: "Test Group One", description: "blablabla", admin: admin_one)
group_two = Group.create!(name: "Test Group Two", description: "blablabla", admin: admin_two)

puts "Creating Participants"
participant_one = Member.new(user: user_one, group: group_one)
participant_one.save!

puts "Creating Tasks"
task_one = Task.create!(name: "Task 1", user: user_one, group: group_one, assignee: admin_one)
task_two = Task.create!(name: "Task 2", user: admin_one, group: group_one, assignee: admin_one)
# Test if we can create tasks for users not part of the group
task_two = Task.create!(name: "Task 2", user: admin_one, group: group_one, assignee: admin_two)

puts "Creating Tags"
tag_one = Tag.create!(name: "Tag 1", user: user_one, group: group_one)
tag_two = Tag.create!(name: "Tag 2", user: admin_one, group: group_one)
# Test if we can create tags even if user not part of the group
tag_three = Tag.create!(name: "Tag 3", user: admin_one, group: group_two)

puts "Creating TaggedTasks"
taggedtask_one = TaggedTask.create!(task: task_one, tag: tag_one)
# Test if we can create taggedtasks even if tag not part of the group
taggedtask_two = TaggedTask.create!(task: task_one, tag: tag_three)