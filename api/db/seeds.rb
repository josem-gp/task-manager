require 'faker'

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

# With this function we create fake data for a specific group.
# We will add a specific user we want so that it will have data created for them in the group
def create_fake_data(group, admin, user, icons)
  users = [admin, user]
  tasks = []
  tags = []

  
  puts "Creating Fake users for #{group.name}"
  30.times do
    username = Faker::Internet.username(specifier: 6..15) # So it is not bigger than 15
    user = Faker::Internet.user('email', 'password')
    saved_user = User.create!(username: username, email: user[:email], password: user[:password])
    saved_user.icon = icons.sample
    saved_user.save!
    users << saved_user
  end

  # By default, Faker generates random data that may include duplicates
  users.uniq!

  "Creating Memberships"
  users.each do |user|
    Membership.create!(user: user, group: group)
  end

  puts "Create Tasks for #{group.name}"
  50.times do
    # We want the date to be close to our current date
    rand_date = ((Date.current - 10) + rand((Date.current + 30) - (Date.current - 10))).strftime("%Y-%m-%d")
    tasks << Task.create!(name: "#{Faker::Verb.base} #{Faker::Hacker.noun}", user: users.sample, group: group, assignee: users.sample, due_date: rand_date) 
  end

  puts "Creating Tags for #{group.name}"
  20.times do
    tags << Tag.create!(name: "#{Faker::Lorem.characters(number: rand(8..10))}_tag", user: users.sample, group: group)
  end

  puts "Creating TaggedTasks for #{group.name}"
  30.times do 
    TaggedTask.create!(task: tasks.sample, tag: tags.sample)
  end

  puts "Creating Invitations for #{group.name}"
  10.times do 
    Invitation.create!(sender: admin, group: group, email: Faker::Internet.email)
  end
end 

puts "Creating Icons"

default_icon = Icon::IMAGES[0]
icons = Icon::IMAGES[1..-1]

saved_icons = []

saved_icons << Icon.create!(name: "default_icon", url: default_icon)

icons.each_with_index do |icon, idx|
  saved_icons << Icon.create!(name: "icon#{idx}", url: icon)
end

puts "Creating main Users"
admin_one = User.create!(username: "jose", email: "testest@gmail.com", password: "123456")
admin_two = User.create!(username: "saki", email: "saki@test.io", password: "1234567")

puts "Creating main Groups"
group_one = Group.create!(name: "Test Group One", description: "blablabla", admin: admin_one)
group_two = Group.create!(name: "Test Group Two", description: "blablabla", admin: admin_two)

create_fake_data(group_one, admin_one, admin_two, saved_icons)
create_fake_data(group_two, admin_two, admin_one, saved_icons)
