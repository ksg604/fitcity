class UsersController < ApplicationController

  wrap_parameters :user, include: [:email, :password, :password_confirmation]
  before_action :authenticate_user, only: [:logout, :get_my_info, :reset_password]
  require "Jwt"

  def index
    # Get all users
  end

  def show 
    # show
  end

  def create
    if request.original_url.include? "api"
      user = User.new(create_user_params)
      begin
        user.save!
        access_token, refresh_token = Jwt::Issuer.issue_tokens(user)

        # Server responds with JWT in the headers and refresh token in the body
        respond_to do |format|
          # response.set_header("Authorization", "Bearer #{access_token}")
          format.json { render :json => { access_token: access_token, refresh_token: refresh_token.encrypted_token } }
        end
      rescue => exception
        logger.error "Exception: #{exception}"
        if exception.message.include? "doesn't match"
          render :json => { message: exception }, status: :unprocessable_entity
        else
          render :json => { message: exception }, status: :bad_request
        end
      end
    else 
      p "web ui action"
    end
  end

  def login
    user = User.find_by(email: login_user_params[:email])
    
    if !user || !user.authenticate(login_user_params[:password])
      render :json => { message: "Invalid email or password" }, status: :unauthorized
    else
      access_token, refresh_token = Jwt::Issuer.issue_tokens(user)

      respond_to do |format|
        # response.set_header("Authorization", "Bearer #{access_token}")
        format.json { render :json => { access_token: access_token, refresh_token: refresh_token.encrypted_token } }
      end
    end
  end

  def logout
    Jwt::Revoker.revoke(decoded_token: @decoded_token, user: @user)

    respond_to do |format|
      format.json { render :json => { status: "Successfully logged out"} }
    end
  end

  def get_my_info
    respond_to do |format|
      format.json { render :json => { email: @user.email } }
    end
  end

  def reset_password
    respond_to do |format|
      begin
        UserMailer.send_password_reset_email(@user.email).deliver
        format.json { render :json => { message: "Successfully sent password reset email"} }
      rescue => exception
        logger.error "Exception: #{exception}"
      end
    end
  end

  private
    # Using a private method to encapsulate the permissible parameters
    # is just a good pattern since you'll be able to reuse the same
    # permit list between create and update. Also, you can specialize
    # this method with per-user checking of permissible attributes.
    def create_user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

    def login_user_params
      params.require(:user).permit(:email, :password)
    end

    def authenticate_user
      @user, @decoded_token = authenticate
    end 
end
