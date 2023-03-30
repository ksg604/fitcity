import { FormEvent, useState } from "react";
import styles from "./Login.module.css";
import api from "../ApiClient";
import { useAppDispatch } from "../hooks";
import { setLoggedIn } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { palette } from "../palette";

export default function Login() {

  type LoginState = {
    email: FormDataEntryValue,
    password: FormDataEntryValue
  }

  const [formInput, setFormInput] = useState<LoginState>({
    email: "",
    password: ""
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    try {
      await api.login(formInput.email, formInput.password);
      toast("Successfully logged in", {toastId: "successtoast", type: "success"});
      dispatch(setLoggedIn(true));
      navigate("/profile");
    } catch (error: any) {
      toast(error.message, {toastId: "errortoast", type: "error"});
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
                  onInput={(evt) => {setFormInput({...formInput, email: evt.currentTarget.value})}} />
          </div>
          <div className={styles["form-input-container"]}>
            <label className={styles["label"]} htmlFor="password" 
            style={(formInput.password as string).length > 0 ? {} : {visibility: "hidden"}}>Password</label>
            <input required
                  className={styles["form-input"]} 
                  name="password" type="password" placeholder="Password"
                  onInput={(evt) => {setFormInput({...formInput, password: evt.currentTarget.value})}} />
          </div>
          <div className={styles["submit-container"]}>
            <input className={`${styles["btn"]} ${styles["submit-btn"]}`} 
              style={{background: palette[0]}}
              type="submit" value="Login"></input>
            <Link to="/signup" className={styles["signup"]}>
              Need an account?
            </Link>
          </div>
          <Link to="/forgot-password" className={styles["forgot-password"]}>
            Forgot your password?
          </Link>
        </form>
      </main>
    </div>
  )
}