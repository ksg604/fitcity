import styles from "./Signup.module.css";
import FormError from "../components/FormError";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "../ApiClient";
import { useAppDispatch } from "../hooks";
import { setLoggedIn } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import PasswordRule from "../components/signup/PasswordRule";
import { palette } from "../palette";
import { toast } from "react-toastify";

export default function Signup() {

  type FormState = {
    showErrors: boolean,
    email: {value: FormDataEntryValue, valid: boolean, attempted: boolean},
    password: {value: FormDataEntryValue, valid: boolean, attempted: boolean},
    password_confirmation: {value: FormDataEntryValue, valid: boolean, attempted: boolean}
  }

  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [formInput, setFormInput] = useState<FormState>({
    showErrors : false,
    email: {value: "", valid: true, attempted: false},
    password: {value: "", valid: false, attempted: false},
    password_confirmation: {value: "", valid: false, attempted: false}
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateEmail = (evt: ChangeEvent<HTMLInputElement>) : void => {
    evt.preventDefault();
    setFormInput({...formInput, email: {...formInput.email,
      valid: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(evt.currentTarget.value as string)
    }});
  }

  const validatePassword = (evt: ChangeEvent<HTMLInputElement>) : void => {
    evt.preventDefault();
    setFormInput({
      ...formInput, password: {...formInput.password, 
        valid: (/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,32}/.test(evt.currentTarget.value as string))}
    });
  }

  const validatePasswordConfirmation = () : void => {
    setFormInput({
      ...formInput,
      password_confirmation: {...formInput.password_confirmation, 
        valid: (formInput.password.value === formInput.password_confirmation.value)}
    });
  }

  const hasError = (errors: Array<String>, error: string) => {
    return errors.some((comparator: String) => comparator.includes(error))
  }

  const handleSubmit = async (evt: FormEvent) : Promise<void> => {
    evt.preventDefault();
    try {
      await api.signup(formInput.email.value, formInput.password.value, formInput.password_confirmation.value);
      toast("Successfully signed up", {toastId: "successtoast", type: "success"});
      dispatch(setLoggedIn(true));
      navigate("/profile")
    } catch (error : any) {
      const errors: Array<String> = error.message.split(", ");
      setFormInput({...formInput, showErrors: true, 
        email: {...formInput.email, valid: !hasError(errors, "Email is invalid")},
        password: {...formInput.password, valid: !hasError(errors, "Password is invalid"),},
        password_confirmation: {...formInput.password_confirmation, valid: !hasError(errors, "Password confirmation doesn't match Password")}
      });
      toast("Please correct all indicated fields", {toastId: "errortoast", type: "error"});
    }
  }

  return (
    <div className={styles["Signup"]}>
      <main className={styles["main"]}>
        <h2>Sign Up</h2>
        <form className={styles["signup-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-input-container"]}>
            <label className={styles["label"]} htmlFor="email" 
                style={formInput.email.value ? {} : {visibility: "hidden"}}>Email</label>
            <input required className={styles["form-input"]} name="email" type="email" 
              onInput={(evt) => {setFormInput({...formInput, email: {...formInput.email, value: evt.currentTarget.value}});}} 
              placeholder="Email"
              onBlur={validateEmail}
              style={formInput.showErrors && formInput.email.value && !formInput.email.valid ? {borderColor: palette[2]} : {}}/>
            {formInput.showErrors && !formInput.email.valid && formInput.email.value && <FormError error="Please enter a valid email in the format email@email.com"/>}
          </div>
          <div className={styles["form-input-container"]}>
            <label className={styles["label"]} htmlFor="password" 
              style={formInput.password.value ? {} : {visibility: "hidden"}}>Password</label>
            <input required className={styles["form-input"]} name="password" type="password" 
                    onInput={(evt) => {setFormInput({...formInput, password: {...formInput.password, value: evt.currentTarget.value}});}}
                    placeholder="Password" 
                    onFocus={() => setShowPasswordRules(true)} 
                    onBlur={(evt) => {setShowPasswordRules(false); validatePassword(evt);}} 
                    style={formInput.showErrors && !formInput.password.valid ? {borderColor: "#e63f57"} : {}}/>
          </div>
          {showPasswordRules && formInput.password.value && 
            <div className={styles["password-rules"]}>
              <PasswordRule rule="8 - 32 characters long" satisfied={/^.{8,32}$/.test(formInput.password.value as string)}/>
              <PasswordRule rule="1 uppercase character" satisfied={/[A-Z]/.test(formInput.password.value as string)}/>
              <PasswordRule rule="1 lowercase character" satisfied={/[a-z]/.test(formInput.password.value as string)}/>
              <PasswordRule rule="1 number" satisfied={/[0-9]/.test(formInput.password.value as string)}/>
              <PasswordRule rule="1 symbol" satisfied={/[!@#$%^&*]/.test(formInput.password.value as string)}/>
            </div>
          }
          {formInput.showErrors && !formInput.password.valid && 
          <FormError error="Password does not meet requirements.  Use 8 or more characters (up to 32) along with a mixture of letters, numbers, and symbols"/>}
          <div className={styles["form-input-container"]}>
            <label className={styles["label"]} htmlFor="confirm-password" 
            style={formInput.password_confirmation.value ? {} : {visibility: "hidden"}}>Confirm Password</label>
            <input required className={styles["form-input"]} name="confirm-password" type="password"
                    onInput={(evt) => {setFormInput({...formInput, password_confirmation: {...formInput.password_confirmation, value: evt.currentTarget.value}});}} 
                    placeholder="Confirm Password"
                    onBlur={validatePasswordConfirmation}
                    style={formInput.showErrors && !formInput.password_confirmation.valid ? {borderColor: palette[2]} : {}}/>
            {formInput.showErrors && !formInput.password_confirmation.valid && <FormError error="Passwords need to match"/>}
          </div>
          <div className={styles["submit-container"]}>
            <input className={`${styles["btn"]} ${styles["submit-btn"]}`} 
              style={{background: palette[0]}}
              type="submit" value="Sign Up"></input>
            <Link to="/login" className={styles["login"]}>
              Already have an account?
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}