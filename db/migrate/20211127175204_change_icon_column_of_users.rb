# frozen_string_literal: true

class ChangeIconColumnOfUsers < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.rename :icon, :upload_icon
      t.string :default_icon_url, null: false
    end
  end
end
