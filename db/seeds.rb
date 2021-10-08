# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'factory_bot_rails'

(1..5).each do |i|
  FactoryBot.create(:user)
end

(1..10).each do |i|
  FactoryBot.create(:post, user_id: (i-1)/2+1)
end
