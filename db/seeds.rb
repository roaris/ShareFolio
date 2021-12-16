# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'factory_bot_rails'

# (1..5).each do |_i|
#   FactoryBot.create(:user)
# end

# (1..10).each do |i|
#   FactoryBot.create(:post, user_id: ((i - 1) / 2) + 1)
# end

# (1..20).each do |i|
#   FactoryBot.create(:comment, user_id: ((i - 1) % 5) + 1, post_id: ((i - 1) / 2) + 1)
# end

# パフォーマンスチューニング用

(0...1000).each do |i|
  if i % 100 == 0
    print "#{i} loops end\n"
  end

  user = FactoryBot.build(:user)
  ActiveRecord::Base.connection.execute(
    "INSERT INTO users(id, name, email, uid, default_icon_url, created_at, updated_at)
    VALUES(#{i}, '#{user.name}', '#{user.email}', '#{user.uid}', '#{user.default_icon_url}', '#{Time.now}', '#{Time.now}');"
  )

  (0...5).each do |j|
    post = FactoryBot.build(:post, user_id: i)
    ActiveRecord::Base.connection.execute(
      "INSERT INTO posts(id, app_name, app_url, repo_url, description, like_num, user_id, created_at, updated_at)
      VALUES(#{5 * i + j}, '#{post.app_name}', '#{post.app_url}', '#{post.repo_url}', '#{post.description}', 10, #{post.user_id}, '#{Time.now}', '#{Time.now}');"
    )
  end
end

(0...1000).each do |i|
  if i % 100 == 0
    print "#{i} loops end\n"
  end

  (0...25).each do |j|
    comment = FactoryBot.build(:comment, user_id: i, post_id: (25 * i + j) % 5000)
    ActiveRecord::Base.connection.execute(
      "INSERT INTO comments(id, content, user_id, post_id, created_at, updated_at)
      VALUES(#{25 * i + j}, '#{comment.content}', #{comment.user_id}, #{comment.post_id}, '#{Time.now}', '#{Time.now}')"
    )
  end

  (0...50).each do |j|
    like = FactoryBot.build(:like, user_id: i, post_id: (50 * i + j) % 5000)
    ActiveRecord::Base.connection.execute(
      "INSERT INTO likes(id, user_id, post_id, created_at, updated_at)
      VALUES(#{50 * i + j}, #{like.user_id}, #{like.post_id}, '#{Time.now}', '#{Time.now}')"
    )
  end
end
