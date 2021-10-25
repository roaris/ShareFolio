# frozen_string_literal: true

class ChangeColumnOfPosts < ActiveRecord::Migration[6.1]
  def up
    change_table :posts do |t|
      t.remove :title, :string
      t.remove :content, :string
      t.string :app_name, null: false
      t.string :app_url, null: false
      t.string :repo_url
      t.text :description, null: false
    end
  end

  def down
    change_table :posts do |t|
      t.string :title, null: false
      t.string :content, null: false
      t.remove :app_name
      t.remove :app_url
      t.remove :repo_url
      t.remove :description
    end
  end
end
