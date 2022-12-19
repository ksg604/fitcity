import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Header() {

  const [drawerOpen, setDrawerOpen] = useState(false);

  return(
    <div className={styles["Header"]}>
      <div className={styles["row"]}> 
        <FontAwesomeIcon icon={drawerOpen ? faX : faBars} size="2xl" onClick={() => setDrawerOpen(!drawerOpen)} color="white"/>
      </div>
      <div className={`${styles["drawer"]} ${!drawerOpen && styles["hidden"]}`}>
      </div>
    </div>
  )
}
