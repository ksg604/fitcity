class CreatePasswordResetTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :password_reset_tokens do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :encrypted_token, index: { unique: true }
      t.datetime :exp

      t.timestamps
    end
  end
end
