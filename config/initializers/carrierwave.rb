# frozen_string_literal: true

CarrierWave.configure do |config|
  config.asset_host = ENV['BACKEND_ORIGIN']
end
