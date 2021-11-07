# frozen_string_literal: true

if Rails.env.production?
  CarrierWave.configure do |config|
    config.fog_credentials = {
      provider: 'AWS',
      region: ENV['S3_REGION'],
      aws_access_key_id: ENV['S3_ACCESS_KEY'],
      aws_secret_access_key: ENV['S3_SECRET_KEY'],
    }
    config.fog_directory = ENV['S3_BUCKET']
  end
else
  CarrierWave.configure do |config|
    config.asset_host = ENV['BACKEND_ORIGIN']
  end
end
