# frozen_string_literal: true

class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :name, { presence: true, length: { minimum: 3, maximum: 20 } }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze
  validates :email, {
    presence: true,
    length: { maximum: 255 },
    format: { with: VALID_EMAIL_REGEX },
  }
  mount_uploader :icon, IconUploader
  validates :uid, presence: true
end
