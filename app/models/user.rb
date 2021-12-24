# frozen_string_literal: true

class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  validates :name, { presence: true, length: { minimum: 3, maximum: 20 } }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze
  validates :email, {
    presence: true,
    length: { maximum: 255 },
    format: { with: VALID_EMAIL_REGEX },
  }
  mount_uploader :upload_icon, IconUploader
  validates :default_icon_url, presence: true
  validates :uid, presence: true

  def process
    icon_url = self.upload_icon.url || default_icon_url
    self.attributes.except('email', 'uid', 'upload_icon', 'default_icon_url').merge({ icon_url: icon_url })
  end
end
