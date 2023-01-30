import styles from "./MyProfile.module.css";
import api from "../ApiClient";
import { useState, useEffect } from "react";
import { palette } from "../palette";
import { toast } from "react-toastify";
import { setModalIsOpen } from "../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import AppModal from "../parts/AppModal";

export default function MyProfile() {

  const [myEmail, setMyEmail] = useState("");
  const [canResetPassword, setCanResetPassword] = useState(true);
  const isLoggedIn = useAppSelector(state => state.auth.loggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        let r = await api.getMyInfo();
        setMyEmail(r.email);
      } catch (error: unknown) {
        console.log(error);
      }
    }
    getMyInfo();
  }, [myEmail, isLoggedIn]);
 
  const handleResetPw = async () => {
    try {
      await api.requestResetPassword();
      setCanResetPassword(false);
      setTimeout(() => setCanResetPassword(true), 60000);
      dispatch(setModalIsOpen(false));
      toast("Check your email for a password reset link", {toastId: "successtoast", type: "info"});
    } catch (error: unknown) {
      console.log(error);
    }
  }

  return(
    <div className={styles["MyProfile"]}>
      <main className={styles["main"]}>
        <div className={styles["info-box-outer"]}>
          <h2>My Info</h2>
          <div className={styles["info-box-inner"]} style={{border: `solid 2px ${palette[0]}`}}>
            <p>Email: {myEmail}</p>
            <p>Password: ********</p>
            <button className={`btn ${styles["reset-pw-btn"]}`} 
            style={{background: palette[0]}} 
            onClick={() => canResetPassword ? dispatch(setModalIsOpen(true)) : 
            toast("You may only request a password reset once every 60 seconds", {toastId: "errortoast", type: "error"})}>Reset password</button>
          </div>
        </div>
      </main>
      <AppModal 
        title="Reset Your Password?" 
        body={`An email with instructions to reset your password will be sent to ${myEmail}`}
        onYes={handleResetPw} hasCancelBtn/>
    </div>
  )
}