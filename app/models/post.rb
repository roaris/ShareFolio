# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  validates :app_name, presence: true, length: { maximum: 50 }
  validates :app_url, presence: true, length: { maximum: 255 }
  validates :repo_url, length: { maximum: 255 }
  validates :description, presence: true, length: { maximum: 10000 }
end
