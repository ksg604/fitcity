class UserMailer < ApplicationMailer
  default from: 'kevin.sangab@gmail.com'
  layout "mailer"

  def send_password_reset_email(user_email)
    mail(to: user_email, subject: 'Reset Your Password')
  end
end
