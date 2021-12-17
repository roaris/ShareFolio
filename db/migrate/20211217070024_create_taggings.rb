# frozen_string_literal: true

class CreateTaggings < ActiveRecord::Migration[6.1]
  def change
    create_table :taggings do |t|
      t.references :post, foreign_key: true, null: false
      t.references :tag, foreign_key: true, null: false
      t.timestamps
    end
    add_index :taggings, %i[post_id tag_id], unique: true
  end
end
