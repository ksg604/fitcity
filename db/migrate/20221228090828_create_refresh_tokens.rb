class CreateRefreshTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :refresh_tokens do |t|
      t.string :encrypted_token, index: { unique: true }
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
