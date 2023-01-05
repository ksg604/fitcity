class User < ApplicationRecord

  has_secure_password
  
  has_many :refresh_tokens
  has_many :blacklisted_tokens
  has_many :whitelisted_tokens
  validates_associated :refresh_tokens
  validates_associated :blacklisted_tokens
  validates_associated :whitelisted_tokens
  
  attr_accessor :token_issued_at

  validates :username, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, on: :create
  validates :password, confirmation: { case_sensitive: true }, length: { minimum: 8, maximum: 20 }, 
            format: { with: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}/ },
            on: :create
  validates :password_confirmation, presence: true, on: :create

end
