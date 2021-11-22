class ChangeColumnOfUsers < ActiveRecord::Migration[6.1]
  def up
    change_table :users do |t|
      t.remove :password_digest
      t.string :uid, null: false
    end
  end

  def down
    change_table :users do |t|
      t.string :password_digest, null: false
      t.remove :uid
    end
  end
end
