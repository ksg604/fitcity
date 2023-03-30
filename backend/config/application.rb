require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

ShopifyAPI::Context.setup(
  api_key: "#{ENV["SHOPIFY_API_KEY"]}", # Client ID generated from Shopify Partners Dashboard app creation
  api_secret_key: "#{ENV["SHOPIFY_API_SECRET_KEY"]}", # Client Secret generated from Shopify Partners Dashboard app creation
  host: "#{ENV["SHOPIFY_HOST"]}", # Rails app host
  scope: "read_orders,read_products", # Access scopes we will request from the merchant when they attempt to install our app
  session_storage: ShopifyAPI::Auth::FileSessionStorage.new, # See more details below
  is_embedded: false, # Set to true if you are building an embedded app
  api_version: "2022-10", # The version of the API you would like to use
  is_private: false, # Set to true if you have an existing private app
)

module FitcityApi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
