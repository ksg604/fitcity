import styles from "./ForgotPassword.module.css";
import { useState, FormEvent } from "react";
import { palette } from "../palette";
import api from "../ApiClient";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [formInput, setFormInput] = useState({
    email: "",
  });

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    try {
      await api.requestResetPassword(formInput.email);
      toast("A link was sent to your email to reset your password ", {toastId: "successtoast", type: "success"});
    } catch (err : unknown) {
      toast("Internal server error", {toastId: "errortoast", type: "error"});
      console.log(err);
    } 
  }

  return(
    <div className={styles["ForgotPassword"]}>
      <form className={styles["forgot-password-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-input-container"]}>
          <h2 className={styles["reset-header"]}>Reset Password</h2>
          <label className={styles["label"]} htmlFor="email" 
                  style={formInput.email ? {} : {visibility: "hidden"}}>Email: </label>
          <input required className={styles["form-input"]} name="email" type="email" 
            onInput={(evt) => {setFormInput({...formInput, email: evt.currentTarget.value});}} 
            placeholder="Email"/>
          <p className={styles["reset-info"]}>We will send you an email to reset your password.</p>
        </div>
        <input type="submit" className={`${styles["btn"]} ${styles["submit-btn"]}`}
            style={{background: palette[0]}}
            value="Submit"/>
      </form>
    </div>
  )
}