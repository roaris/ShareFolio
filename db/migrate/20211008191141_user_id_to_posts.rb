# frozen_string_literal: true

class UserIdToPosts < ActiveRecord::Migration[6.1]
  def change
    change_table :posts do |t|
      t.references :user, foreign_key: true, null: false
    end
  end
end
