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

puts "Destroy Memberships"
Membership.destroy_all

puts "Destroy Invitations"
Invitation.destroy_all

puts "Destroy Groups"
Group.destroy_all

puts "Destroy Users"
User.destroy_all

puts "Deleting all Icons"

Icon.destroy_all

puts "Creating Icons"

default_icon = Icon::IMAGES[0]
icons = Icon::IMAGES[1..-1]

Icon.create!(name: "default_icon", url: default_icon)

icons.each_with_index do |icon, idx|
  Icon.create!(name: "icon#{idx}", url: icon)
end

puts "Creating Users"
admin_one = User.create!(username: "jose", email: "jgarciaportillo@gmail.com", password: "123456")
user_one = User.create!(username: "saki", email: "saki@test.io", password: "1234567")
admin_two = User.create!(username: "joe", email: "joe@test.io", password: "1234567")

puts "Creating Group"
group_one = Group.create!(name: "Test Group One", description: "blablabla", admin: admin_one)
group_two = Group.create!(name: "Test Group Two", description: "blablabla", admin: admin_two)

puts "Creating Memberships"
participant_one = Membership.create!(user: user_one, group: group_one)

puts "Creating Tasks"
task_one = Task.create!(name: "Task 1", user: user_one, group: group_one, assignee: admin_one, due_date: "2024-12-30") 
task_two = Task.create!(name: "Task 2", user: admin_one, group: group_one, assignee: user_one, due_date: "2030-12-03")
task_two = Task.create!(name: "Task 3", user: user_one, group: group_one, due_date: "2030-12-03")

puts "Creating Tags"
tag_one = Tag.create!(name: "Tag 1", user: user_one, group: group_one)
tag_two = Tag.create!(name: "Tag 2", user: admin_one, group: group_one)
tag_three = Tag.create!(name: "Tag 3", user: admin_two, group: group_two)

puts "Creating TaggedTasks"
taggedtask_one = TaggedTask.create!(task: task_two, tag: tag_two)

puts "Creating Invitations"
invitation_one = Invitation.create!(sender: admin_one, group: group_one, email: "abc@test.io")
