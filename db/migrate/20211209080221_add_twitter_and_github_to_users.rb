# frozen_string_literal: true

class AddTwitterAndGithubToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :twitter, :string
    add_column :users, :github, :string
  end
end
