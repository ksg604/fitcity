import styles from "./PasswordRule.module.css";

export default function PasswordRule({rule, satisfied} : {rule: string, satisfied: boolean}) {
  return (
    <div className={styles["PasswordRule"]}>
      { satisfied 
      ? <svg data-v-122ca680="" xmlns="http://www.w3.org/2000/svg" width="13.437" height="10.156" className=""><path data-v-122ca680="" d="M0 5l1.85-1.85 3.3 3.35 6.5-6.5 1.8 1.8-8.3 8.35z" fill="#fff" fillRule="evenodd"></path></svg>
      : <svg data-v-122ca680="" xmlns="http://www.w3.org/2000/svg" width="11.844" height="11.812" className={styles["invalid"]}><path data-v-122ca680="" d="M-.006 1.856l1.85-1.85 4.05 4.1 4.1-4.1 1.85 1.85-4.1 4.05 4.1 4.1-1.85 1.8-4.1-4.1-4.05 4.1-1.85-1.85 4.1-4.05z" fill="#fff" fillRule="evenodd"></path></svg>
      }
      {rule} 
    </div>
  )
}