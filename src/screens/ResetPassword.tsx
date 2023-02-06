import styles from "./ResetPassword.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { palette } from "../palette";
import api from "../ApiClient";
import { toast } from "react-toastify";

export default function ResetPassword() {

  type formInput = {
    newPassword: string,
    confirmNewPassword: string
  }
  const [loading, setLoading] = useState(true);
  const [formInput, setFormInput] = useState({
    newPassword: "",
    confirmNewPassword: ""
  });

  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    if (formInput.newPassword !== formInput.confirmNewPassword) {
      toast("Passwords must match", {toastId: "errortoast", type: "error"});
      return;
    }
    const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}/;
    if (!passwordRegex.test(formInput.newPassword)) {
      toast("Password does not meet requirements.  Use 8 or more characters (up to 32) along with a mixture of letters, numbers, and symbols", {toastId: "errortoast", type: "error"});
      return;
    }
    const token = (params.get("token") as string);
    try {
      await api.resetPassword(token, formInput.newPassword);
      toast("You may now login with your new password", {toastId: "successtoast", type: "success"});
      navigate("/login");
    } catch (err : unknown) {
      toast("Internal server error", {toastId: "errortoast", type: "error"});
      console.log(err);
    }
  }

  useEffect(() => {
    const token = params.get("token");
    if (!token) navigate("/404");    
    setLoading(false);
  }, []);

  if (loading) return <Loading/>

  return(
    <div className={styles["ResetPassword"]}>
      <form className={styles["reset-password-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-input-container"]}>
          <h2 className={styles["reset-header"]}>Reset Password</h2>
          <label className={styles["label"]} htmlFor="reset_password" 
              style={formInput.newPassword ? {} : {visibility: "hidden"}}>New Password</label>
          <input required className={styles["form-input"]} name="reset_password" type="password" 
            onInput={(evt) => {setFormInput({...formInput, newPassword: evt.currentTarget.value});}} 
            placeholder="New Password"/>
        </div>
        <div className={styles["form-input-container"]}>
          <label className={styles["label"]} htmlFor="confirm_change_password" 
              style={formInput.confirmNewPassword ? {} : {visibility: "hidden"}}>Confirm New Password</label>
          <input required className={styles["form-input"]} name="confirm_change_password" type="password" 
            onInput={(evt) => {setFormInput({...formInput, confirmNewPassword: evt.currentTarget.value});}} 
            placeholder="Confirm New Password"/>
        </div>
        <input type="submit" className={`${styles["btn"]} ${styles["submit-btn"]}`}
            style={{background: palette[0]}}
            value="Submit"/>
      </form>
    </div>
  )
}