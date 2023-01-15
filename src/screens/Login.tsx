import { FormEvent, useState } from "react";
import styles from "./Login.module.css";
import api from "../ApiClient";
import FormError from "../components/FormError";
import { useAppDispatch } from "../hooks";
import { setLoggedIn } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../parts/Toast";
import { toast } from "react-toastify";

export default function Login() {

  type LoginState = {
    email: FormDataEntryValue,
    password: FormDataEntryValue
  }

  const [formInput, setFormInput] = useState<LoginState>({
    email: "",
    password: ""
  });

  const [validationError, setValidationError] = useState<String>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clearValidationError = () => setValidationError("");

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await api.login(formInput.email, formInput.password);
      dispatch(setLoggedIn(true));
      
      navigate("/");
    } catch (error: any) {
      setValidationError("Invalid email or password");
      toast("Invalid email or password", {toastId: "Invalid"});
      console.log(error);
    }
  }

  return(
    <div className={styles["Login"]}>
      <main className={styles["main"]}>
        <h2>Login</h2>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-input-container"]}>
            <label className={styles["label"]} htmlFor="email" 
            style={(formInput.email as string).length > 0 ? {} : {visibility: "hidden"}}>Email Address</label>
            <input required 
                  className={styles["form-input"]} 
                  name="email" type="text" placeholder="Email"
                  onFocus={clearValidationError}
                  onInput={(evt) => {setFormInput({...formInput, email: evt.currentTarget.value})}}
            />
          </div>
          <div className={styles["form-input-container"]}>
            <label className={styles["label"]} htmlFor="password" 
            style={(formInput.password as string).length > 0 ? {} : {visibility: "hidden"}}>Password</label>
            <input required 
                  className={styles["form-input"]} 
                  name="password" type="password" placeholder="Password"
                  onFocus={clearValidationError}
                  onInput={(evt) => {setFormInput({...formInput, password: evt.currentTarget.value})}}
            />
          </div>
          <input className={`${styles["btn"]} ${styles["submit-btn"]}`} type="submit" value="Login"></input>
          <div className={styles["error-container"]}>
            {validationError && <FormError error={validationError}/>}
          </div>  
        </form>
      </main>
      <Toast />
    </div>
  )
}