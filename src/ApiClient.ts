import store from "./store";
import { setAccessToken, setLoggedIn } from "./features/auth/authSlice";

const apiUrl: string = "http://10.0.0.31:3001/api";

async function fetchGenerator(apiEndpoint: string, method: string, data: Object, credsRequired: boolean) {
  
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
    if (response.status === 401 && json.message.includes("Access token expired")) {
      // If access token expires, attempt to refresh it
      console.log("Access token expired.  Attempting to refresh...");
      try {
        let r : Promise<void> = await ApiClient.refresh();
        store.dispatch(setLoggedIn(true));
        console.log("Refresh successful");
        return r;
      } catch (err) {
        // TODO: Refresh token has expired or is invalid
        console.log(err);
      }
    };
    throw new Error(json.message);
  }
}

export default class ApiClient {

  static async signup(email: FormDataEntryValue, password: FormDataEntryValue, 
                      password_confirmation: FormDataEntryValue) {
    let r = await fetchGenerator("/users", "POST", {email: email, 
                                                    password: password, 
                                                    password_confirmation: password_confirmation}, false);   
    store.dispatch(setAccessToken(r.access_token)); 
    return r;
  }

  static async login(email: FormDataEntryValue | null, password: FormDataEntryValue | null) {
    let r =  await fetchGenerator("/users/login", "POST", {email: email, password: password}, false);
    store.dispatch(setAccessToken(r.access_token));
    return r;
  }

  static async logout() {
    let r = await fetchGenerator("/users/logout", "POST", {}, true);
    store.dispatch(setAccessToken(""));
    return r;
  }

  static async refresh() {
    let r = await fetchGenerator("/users/refresh", "POST", {}, false);
    store.dispatch(setAccessToken(r.access_token));
    return r;
  }

  static async getMyInfo() {
    return await fetchGenerator("/users/me", "GET", {}, true);
  }

  static async requestResetPassword() {
    return await fetchGenerator("/users/reset-password", "GET", {}, true);
  }

  static async getProductInfo(product: string) {
    return await fetchGenerator(`/products/${product}`, "GET", {}, true);
  }

  static async resetPassword(token: string, newPassword: string) {
    return await fetchGenerator("/users/reset-password", "POST", {token: token, new_password: newPassword}, false);
  }
}