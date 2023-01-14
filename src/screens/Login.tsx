import { FormEvent, useState } from "react";
import styles from "./Login.module.css";
import api from "../ApiClient";
import FormError from "../components/FormError";
import { useAppDispatch } from "../hooks";
import { setLoggedIn } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [validationError, setValidationError] = useState<String[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clearValidationError = () => setValidationError([]);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    
    let formData = new FormData(evt.target as HTMLFormElement);

    try {
      await api.login(formData.get("email"), formData.get("password"));
      dispatch(setLoggedIn(true));
      navigate("/");
    } catch (error: any) {
      setValidationError(prev => [...prev, error.messaged]);
      console.log(error);
    }
  }

  return(
    <div className={styles["Login"]}>
      <main className={styles["main"]}>
        <h2>Login</h2>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-input-container"]}>
            <label htmlFor="email">Email Address: </label>
            <input className={styles["form-input"]} name="email" type="text" onFocus={clearValidationError}/>
          </div>
          <div className={styles["form-input-container"]}>
            <label htmlFor="password">Password: </label>
            <input className={styles["form-input"]} name="password" type="password" onFocus={clearValidationError}/>
          </div>
          <input type="submit" value="Login"></input>
        </form>
      </main>
    </div>
  )
}