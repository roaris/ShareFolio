# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'factory_bot_rails'

(1..5).each do |_i|
  FactoryBot.create(:user)
end

(1..10).each do |i|
  FactoryBot.create(:post, user_id: ((i - 1) / 2) + 1)
end

(1..20).each do |i|
  FactoryBot.create(:comment, user_id: ((i - 1) % 5) + 1, post_id: ((i - 1) / 2) + 1)
end

tags = [
  'AWS',
  'Angular',
  'C++',
  'C#',
  'Django',
  'Express.js',
  'Firebase Authentication',
  'Firebase Realtime Database',
  'Firebase Storage',
  'Flask',
  'Gin',
  'Go',
  'Heroku',
  'Java',
  'JavaScript',
  'Kotlin',
  'Laravel',
  'Next.js',
  'Node.js',
  'Nuxt.js',
  'PHP',
  'Python',
  'Ruby on Rails',
  'React',
  'Ruby',
  'Vue',
]

tags.each { |tag| FactoryBot.create(:tag, name: tag) }
