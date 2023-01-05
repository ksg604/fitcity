class UsersController < ApplicationController

  wrap_parameters :user, include: [:username, :password, :password_confirmation]
  before_action :authenticate_user, only: [:logout]
  require "Jwt"

  def index
    # Get all users
  end

  def create
    if request.original_url.include? "api"
      user = User.new(create_user_params)

      begin
        user.save!
        access_token, refresh_token = Jwt::Issuer.issue_tokens(user)

        # Server responds with JWT in the headers and refresh token in the body
        respond_to do |format|
          response.set_header("Authorization", "Bearer #{access_token}")
          format.json { render :json => { refresh_token: refresh_token.encrypted_token } }
        end
      rescue => exception
        logger.error "Error: #{exception}"
        if exception.message.include? "doesn't match"
          render :json => { errors: exception }, status: :unprocessable_entity
        else
          render :json => { errors: exception }, status: :bad_request
        end
      end

    else 
      p "web ui action"
    end
  end

  def login
    user = User.find_by(username: login_user_params[:username])
    
    if !user || !user.authenticate(login_user_params[:password])
      render :json => { errors: "Invalid username or password" }, status: :unauthorized
    else
      access_token, refresh_token = Jwt::Issuer.issue_tokens(user)

      respond_to do |format|
        response.set_header("Authorization", "Bearer #{access_token}")
        format.json { render :json => { refresh_token: refresh_token.encrypted_token } }
      end
    end
  end

  def logout
    Jwt::Revoker.revoke(decoded_token: @decoded_token, user: @user)

    respond_to do |format|
      format.json { render :json => { status: "Successfully logged out"} }
    end
  end

  private
    # Using a private method to encapsulate the permissible parameters
    # is just a good pattern since you'll be able to reuse the same
    # permit list between create and update. Also, you can specialize
    # this method with per-user checking of permissible attributes.
    def create_user_params
      params.require(:user).permit(:username, :password, :password_confirmation)
    end

    def login_user_params
      params.require(:user).permit(:username, :password)
    end

    def authenticate_user
      @user, @decoded_token = authenticate
    end 
end
