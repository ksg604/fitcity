import store from "./store";
import { setAccessToken, setLoggedIn } from "./features/auth/authSlice";

const apiUrl: string = "/api/api";

async function fetchGenerator(apiEndpoint: string, method: string, data: Object, credsRequired: boolean) : Promise<APIClientResponse> {
  
  let headers: HeadersInit = {
    "Content-Type": "application/json"
  };

  if (credsRequired) {
    headers = {
      ...headers,
      "Authorization": `Bearer ${store.getState().auth.accessToken}`
    }
  }

  let requestInit : RequestInit = {
    method: method,
    headers: headers,
    credentials: "include"
  }

  if (method !== "GET") {
    requestInit = {
      ...requestInit,
      body: JSON.stringify(data)
    }
  }
  const response = await fetch(apiUrl + apiEndpoint, requestInit);

  let json = await response.json();

  if (response.ok) {
    return json;        
  } else {
    throw new Error(json.message);
  }
}

type APIClientResponse = { [key: string]: any };

export default class ApiClient {

  // if originalRequestFunc fails due to a 401/Unauthorized, this helper method will try to refresh the access token and
  // try one more time.
  static async withRetry(originalRequestFunc : () => Promise<APIClientResponse>) : Promise<APIClientResponse> {
    try {
      console.log("Starting first attempt at running the original request");
      return await originalRequestFunc();
    } catch (err : unknown) {
      if (err instanceof Error && !err.message.toLowerCase().includes("access token expired")) {
        throw err;
      }
      console.log("Unauthorized. Attempting to get another access token and trying again");
      await this.refresh();
      console.log(`Got the access token: ${store.getState().auth.accessToken}. Reattempting original request`);
      return originalRequestFunc();
    }
  }

  static async signup(email: FormDataEntryValue, password: FormDataEntryValue, 
                      password_confirmation: FormDataEntryValue) {
    let r = <{access_token: string}>await fetchGenerator("/users", "POST", {email: email, 
                                                    password: password, 
                                                    password_confirmation: password_confirmation}, false);   
    store.dispatch(setAccessToken(r.access_token)); 
    return r;
  }

  static async login(email: FormDataEntryValue | null, password: FormDataEntryValue | null) {
    let r =  <{access_token: string}>await fetchGenerator("/users/login", "POST", {email: email, password: password}, false);
    store.dispatch(setAccessToken(r.access_token));
    return r;
  }

  static async logout() : Promise<APIClientResponse> {
    let r = <APIClientResponse>await fetchGenerator("/users/logout", "POST", {}, false);
    store.dispatch(setAccessToken(""));
    return r;
  }

  static async refresh() {
    let r = <{access_token: string}>await fetchGenerator("/users/refresh", "POST", {}, false);
    store.dispatch(setAccessToken(r.access_token));
    return r;
  }

  static async getMyInfo() {
    return await this.withRetry(() => fetchGenerator("/users/me", "GET", {}, true));
  }

  static async requestResetPassword(email: string) : Promise<APIClientResponse> {
    return await fetchGenerator("/users/request-reset-password", "POST", {email: email}, false);
  }

  static async getProductInfo(product: string) : Promise<APIClientResponse> {
    return await fetchGenerator(`/products/${product}`, "GET", {}, false);
  }

  static async resetPassword(token: string, newPassword: string) : Promise<APIClientResponse> {
    return await fetchGenerator("/users/reset-password", "POST", {token: token, new_password: newPassword}, false);
  }

  static async getCart() {
    return await this.withRetry(() => fetchGenerator("/users/cart", "GET", {}, true));
  }

  static async addProductToCart(productId: string, cartId: string) {
    return await this.withRetry(() => fetchGenerator("/users/cart", "POST", {product_id: productId, cart_id: cartId}, true));
  }

  static async updateCart(cartId: string, lineId: string, merchandiseId: string, quantity: number) {
    return await fetchGenerator("/users/cart", "PUT", {cart_id: cartId, line_id: lineId, merchandise_id: merchandiseId, quantity: quantity}, false);
  }
}