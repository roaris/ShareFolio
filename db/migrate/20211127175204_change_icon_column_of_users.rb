class ChangeIconColumnOfUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :icon, :upload_icon
    add_column :users, :default_icon_url, :string, null: false
  end
end
