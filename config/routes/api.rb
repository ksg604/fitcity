post "/api/users/login", to: "users#login"
post "/api/users/logout", to: "users#logout"
post "/api/users/reset-password", to: "users#reset_password"
get "/api/users/me", to: "users#get_my_info"

scope :api do
  resources :users
end

# post "/api/users", to: "users#create"