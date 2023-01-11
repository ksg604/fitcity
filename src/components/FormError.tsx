import { AppProps } from "../props";
import styles from "./FormError.module.css";

export default function FormError({ error } : AppProps) {
  return(
    <div className={styles["FormError"]}>
      {error}
    </div>
  )
}