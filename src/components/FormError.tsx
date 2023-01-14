import styles from "./FormError.module.css";

export default function FormError({ error } : { error: String }) {
  return(
    <div className={styles["FormError"]}>
      {error}
    </div>
  )
}