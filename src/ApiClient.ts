import store from "./store";
import { setAccessToken } from "./features/auth/authSlice";

const apiUrl: string = "http://localhost:3000/api";

async function fetchGenerator(apiEndpoint: string, method: string, data: Object, credsRequired: boolean) {
  
  let headers: HeadersInit;

  if (credsRequired) {
    headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${store.getState().accessToken}`
    }
  } else {
    headers = {
      "Content-Type": "application/json"
    }
  }
  
  const response = await fetch(apiUrl + apiEndpoint, {
    method: method,
    headers: headers,
    credentials: "include",
    body: JSON.stringify(data),
  });

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
    console.log(email);
    let r = await fetchGenerator("/users", "POST", {email: email, 
                                                    password: password, 
                                                    password_confirmation: password_confirmation}, false);   
    store.dispatch(setAccessToken(r.access_token)); 
    return r;
  }

  static async login(email: FormDataEntryValue | null, password: FormDataEntryValue | null) {
    let r = await fetchGenerator("/users/login", "POST", {email: email, password: password}, false);
    store.dispatch(setAccessToken(r.access_token));
    return r;
  }

  static async logout() {
    let r = await fetchGenerator("/users/logout", "POST", {}, true);
    return r;
  }
}