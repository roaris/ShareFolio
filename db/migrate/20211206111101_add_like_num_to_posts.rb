# frozen_string_literal: true

class AddLikeNumToPosts < ActiveRecord::Migration[6.1]
  def change
    change_table :posts do |t|
      t.integer :like_num, null: false, default: 0
    end
  end
end
