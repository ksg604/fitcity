import styles from "./Loading.module.css";

export default function Loading() {
  return(
    <main className={styles["Loading"]}>
      <p className={styles["loading-text"]}>...loading</p>
    </main>
  )
}