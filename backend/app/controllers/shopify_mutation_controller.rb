class ShopifyMutationController < ApplicationController
  before_action :init_client

  def create_customer
    mutation =<<~MUTATION
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          email
        }
        customerUserErrors {
          message
        }
      }
    }
    MUTATION
  end

  private 
    def init_client
      # For anything which needs authenticated access via OAuth
      # session = ShopifyAPI::Utils::SessionUtils.load_current_session(cookies: request.cookies, is_online: true)

      # initalize the shopify api client
      @client = ShopifyAPI::Clients::Graphql::Storefront.new(ENV["SHOPIFY_SHOP_URL"], ENV["SHOPIFY_STOREFRONT_API_TOKEN"])
    end
end
