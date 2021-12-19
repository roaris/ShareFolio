# frozen_string_literal: true

class AddIndexToNameOfTags < ActiveRecord::Migration[6.1]
  def change
    add_index :tags, :name, unique: true
  end
end
