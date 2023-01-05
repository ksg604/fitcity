module Jwt
  module Authenticator    
    module_function
    def authenticate(headers)
      require_relative "./error/Errors"
      encrypted_access_token = headers.fetch("Authorization", "").split("Bearer ")[1]

      raise ActionController::BadRequest.new("Missing Access Token") unless encrypted_access_token.present?

      decoded_token = Jwt::Decoder.decode!(encrypted_access_token)
      user = authenticate_user_from_token(decoded_token)

      [user, decoded_token]
    end

    def authenticate_user_from_token(decoded_token)
      raise ActionController::BadRequest.new("Invalid Access Token") unless decoded_token[:jti].present? && decoded_token[:user_id].present?

      user = User.find_by(id: decoded_token.fetch(:user_id))
      blacklisted = Jwt::Blacklister.blacklisted?(decoded_token.fetch(:jti))
      whitelisted = Jwt::Whitelister.whitelisted?(decoded_token.fetch(:jti))
      valid_issued_at = valid_issued_at?(decoded_token, user)

      return user if !blacklisted && whitelisted && valid_issued_at
    end

    def valid_issued_at?(decoded_token, user)
      !user.token_issued_at || decoded_token.fetch(:issued_at) >= user.token_issued_at
    end
  end

  module Blacklister
    module_function

    def blacklist!(jti:, exp:, user:)
      user.blacklisted_tokens.create!(
        jti: jti,
        exp: Time.at(exp)
      )
    end

    def blacklisted?(jti)
      BlacklistedToken.exists?(jti: jti)
    end
  end

  module Decoder
    module_function
    
    def decode!(access_token)
      begin
        decoded_token = JWT.decode(access_token, key = Jwt::Secret.secrets, verify = true, options = { algorithm: "HS256" })[0]
        decoded_token.symbolize_keys
      rescue => exception
        raise ActionController::BadRequest.new("Token is not a valid JWT: #{exception}")
      end
    end
  end

  module Encoder
    module_function

    def encode(user)
      jti = SecureRandom.hex
      exp = Jwt::Encoder.token_expiry.to_i
      issued_at = Jwt::Encoder.token_issued_at.to_i
      access_token = JWT.encode(
        {
          user_id: user.id,
          jti: jti,
          issued_at: issued_at,
          exp: exp
        }, Jwt::Secret.secrets
      )

      [access_token, jti, issued_at, exp]
    end

    def token_expiry
      (Jwt::Encoder.token_issued_at + Jwt::Expiry.expiry)
    end

    def token_issued_at
      Time.now
    end
  end

  module Expiry
    module_function
    def expiry
      2.hours
    end
  end

  module Issuer
    module_function
    def issue_tokens(user)
      access_token, jti, issued_at, exp = Jwt::Encoder.encode(user)
      user.token_issued_at = issued_at

      Jwt::Whitelister.whitelist!(
        jti: jti,
        exp: exp,
        user: user
      )

      refresh_token = user.refresh_tokens.create!
      [access_token, refresh_token]
    end
  end 

  module Secret
    module_function
    def secrets
      Rails.application.secrets.secret_key_base
    end
  end
  
  module Revoker
    module_function
    def revoke(decoded_token:, user:)
      jti = decoded_token.fetch(:jti)
      exp = decoded_token.fetch(:exp)

      Jwt::Whitelister.remove_whitelist!(jti: jti)
      Jwt::Blacklister.blacklist!(
        jti: jti,
        exp: exp,
        user: user
      )
    end
  end

  module Whitelister
    module_function

    def whitelist!(jti:, exp:, user:)
      user.whitelisted_tokens.create!(
        jti: jti,
        exp: Time.at(exp)
      )
    end

    def remove_whitelist!(jti:) 
      whitelist = WhitelistedToken.find_by(jti: jti)
      whitelist.destroy if whitelist.present?
    end

    def whitelisted?(jti)
      WhitelistedToken.exists?(jti: jti)
    end
  end

end