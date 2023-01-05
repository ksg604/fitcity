class RefreshToken < ApplicationRecord
  belongs_to :user
  before_create :set_encrypted_token

  attr_accessor :token

  def self.verify_token(token)
    encrypted_token = Digest::SHA2.new(512).hexdigest(token)
    RefreshToken.find_by(encrypted_token: encrypted_token)
  end

  private 
    def set_encrypted_token
      self.token = SecureRandom.hex
      self.encrypted_token = Digest::SHA2.new(512).hexdigest(token)
    end
end
