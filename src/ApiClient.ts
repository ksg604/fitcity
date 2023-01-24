import store from "./store";
import { setAccessToken } from "./features/auth/authSlice";

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
    return r;
  }

  static async getMyInfo() {
    return await fetchGenerator("/users/me", "GET", {}, true);
  }

  static async resetPassword() {
    return await fetchGenerator("/users/reset-password", "POST", {}, true);
  }

  static async getProductInfo(product: string) {
    return await fetchGenerator(`/products/${product}`, "GET", {}, true);
  }
}