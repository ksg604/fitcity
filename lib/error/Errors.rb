module Errors
  module_function
  def unauthorized
    render json: { status: "Unauthorized" }, status: 401
  end
end