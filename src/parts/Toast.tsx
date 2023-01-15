import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from "./Toast.module.css";

export default function Toast() {
  return(
    <ToastContainer limit={1} position="bottom-center" 
    className={`${styles["toast-container"]}`}
    toastClassName={`${styles["toast-wrapper"]}`} 
    bodyClassName={`${styles["toast-body"]}`}
    />
  )
}