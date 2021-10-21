# frozen_string_literal: true

class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  validates :name, { presence: true, length: { minimum: 3, maximum: 20 } }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze
  validates :email, {
    presence: true,
    length: { maximum: 255 },
    format: { with: VALID_EMAIL_REGEX },
    uniqueness: true,
  }
  has_secure_password
  validates :password, { presence: true, length: { minimum: 6 }, allow_nil: true }
  mount_uploader :icon, IconUploader
end
