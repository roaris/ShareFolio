# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
  validates :app_name, presence: true, length: { maximum: 50 }
  validates :app_url, presence: true, length: { maximum: 255 }, format: /\Ahttps?:\/\/.+\..+\z/
  validates :repo_url, length: { maximum: 255 }, format: /\A\z|\Ahttps?:\/\/.+\..+\z/
  validates :description, presence: true, length: { maximum: 10000 }
  validates :like_num, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
