scope :api do
  resources :users
end

post "/api/users/login", to: "users#login"
post "/api/users/logout", to: "users#logout"

# post "/api/users", to: "users#create"