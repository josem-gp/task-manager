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

# user_two = User.create!(username: "Jose", email: "joes@test.io", password: "1234567") # Test if case sensitive works for username
# user_three = User.create!(username: "jjose", email: "Joe@test.io", password: "1234567") # Test if case sensitive works for email
# user_four = User.create!(email: "jake@test.io", password: "1234567") # Test if user can be saved without username
# user_five = User.create!(username: "Joseasdfasd", email: "jake@test.io", password: "12345") # Test if password can be less than 6 char
# user_six = User.create!(email: "jake123@test.io", username: "Joñasdfseas") # Test if user can be saved without password
# user_seven = User.create!(username: "JJon", password: "123456") # Test if user can be saved without email


puts "Creating Group"
group_one = Group.create!(name: "Test Group One", description: "blablabla", admin: admin_one)
group_two = Group.create!(name: "Test Group Two", description: "blablabla", admin: admin_two)

# group_three = Group.create!(description: "blablabla", admin: admin_two) # Test no presence of name
# group_four = Group.create!(name: "Test Group Two ñalsdfjadlskfjasdñlfkadsjfañlsdkfjasdlñkfdajsñlfkdasjfdaslfkds", description: "blablabla", admin: admin_two) # Test name too long
# group_four = Group.create!(name: "Test Group Three", description: "ñalsdfjadlskfjasdñlfkadsjfañlsdkfjasdlñkfdajsñlfkdasjfdaslfkds", admin: admin_two) # Test desc too long

puts "Creating Memberships"
participant_one = Membership.create!(user: user_one, group: group_one) # I can add any user to any group
participant_one = Membership.create!(user: admin_two, group: group_one)

puts "Creating Tasks"
task_one = Task.create!(name: "Task 1", user: user_one, group: group_one, assignee: admin_one, due_date: "2024-12-30") 
task_two = Task.create!(name: "Task 2", user: admin_one, group: group_one, assignee: user_one, due_date: "2030-12-03")
task_two = Task.create!(name: "Task 3", user: user_one, group: group_one, due_date: "2030-12-03")

# task_two = Task.create!(name: "Task 3", user: admin_one, group: group_two, assignee: user_one) # Test if we can create tasks for users not part of the group
# task_two = Task.create!(name: "Task 4", user: admin_one, group: group_one, assignee: admin_two) # Test if we can create tasks for assignee not part of the group
# task_two = Task.create!(user: admin_one, group: group_one, assignee: admin_one) # Test no name
# task_two = Task.create!(name: "Task 2 ñalskdfjdsa lfakdjsfñlkasdj f ñlaskdfjasñld ñaslkdfj", user: admin_one, group: group_one, assignee: admin_one, due_date: "24/12/30") # Test name too long
# task_two = Task.create!(name: "Task 2", user: admin_one, group: group_one, assignee: admin_one, due_date: "12-24-2030") # Test due date format

puts "Creating Tags"
tag_one = Tag.create!(name: "Tag 1", user: user_one, group: group_one)
tag_two = Tag.create!(name: "Tag 2", user: admin_one, group: group_one)
tag_three = Tag.create!(name: "Tag 3", user: admin_two, group: group_two)

# tag_four = Tag.create!(name: "Tag 4", user: admin_one, group: group_two) # Test if we can create tags even if user not part of the group
# tag_one = Tag.create!(user: user_one, group: group_one) # Test no name
# tag_two = Tag.create!(name: "Tag  ñalskdfjads l ñalksdf jasd laksdjf añslkdfj", user: admin_one, group: group_one) # Test name too long

puts "Creating TaggedTasks"
taggedtask_one = TaggedTask.create!(task: task_two, tag: tag_two)

# taggedtask_two = TaggedTask.create!(task: task_one, tag: tag_four) # Test if we can create taggedtasks even if tag not part of the group

puts "Creating Invitations"
invitation_one = Invitation.create!(sender: admin_one, group: group_one, email: "abc@test.io")

# invitation_two = Invitation.create!(sender: admin_one, group: group_two) # Test if we can create invitations even if sender not part of the group
# invitation_three = Invitation.create!(sender: user_one, group: group_one) # Test if we can create invitations even if sender not admin
# invitation_two = Invitation.create!(sender: admin_one, group: group_one) # Test no email
# invitation_three = Invitation.create!(sender: admin_one, group: group_one, email: "abctest.io") # Test email wrong format