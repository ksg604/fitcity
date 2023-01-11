import { FormEvent, useState, useEffect } from "react";
import styles from "./Login.module.css";
import api from "../ApiClient";
import FormError from "../components/FormError";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setLoggedIn } from "../features/auth/authSlice";
import { useNavigate, redirect } from "react-router-dom";

export default function Login() {

  const [validationError, setValidationError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clearValidationError = () => setValidationError("");

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    
    let formData = new FormData(evt.target as HTMLFormElement);

    try {
      await api.login(formData.get("username"), formData.get("password"));
      dispatch(setLoggedIn(true));
      navigate("/");
    } catch (error: any) {
      setValidationError(error.message);
      console.log(error);
    }
  }

  return(
    <div className={styles["Login"]}>
      <main className={styles["main"]}>
        <h2>Login</h2>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-input-container"]}>
            <label htmlFor="username">Email Address: </label>
            <input className={styles["form-input"]} name="username" type="text" onFocus={clearValidationError}/>
          </div>
          <div className={styles["form-input-container"]}>
            <label htmlFor="password">Password: </label>
            <input className={styles["form-input"]} name="password" type="password" onFocus={clearValidationError}/>
          </div>
          <input type="submit" value="Login"></input>
          {validationError && 
            <FormError error={validationError}/>
          }
        </form>
      </main>
    </div>
  )
}