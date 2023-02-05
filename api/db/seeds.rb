# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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
