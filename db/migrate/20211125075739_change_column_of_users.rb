# frozen_string_literal: true

class ChangeColumnOfUsers < ActiveRecord::Migration[6.1]
  def up
    change_table :users do |t|
      t.remove :password_digest
      t.string :uid, null: false
      t.index :uid, unique: true
    end
  end

  def down
    change_table :users do |t|
      t.string :password_digest, null: false
      t.remove :uid
      t.remove_index :uid
    end
  end
end
