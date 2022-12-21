import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/images/banner_image.avif";

export default function Header() {

  const [drawerOpen, setDrawerOpen] = useState(false);

  return(
    <header className={styles["Header"]}>
      <div className={styles["row"]}> 
        <FontAwesomeIcon icon={drawerOpen ? faX : faBars} size="2xl" onClick={() => setDrawerOpen(!drawerOpen)} color="white"/>
        <Link className={styles["banner-container"]} to="/" onClick={() => setDrawerOpen(false)}>
          <img className={styles["header-banner"]} src={banner}/>
        </Link>
      </div>
      <div className={`${styles["drawer"]} ${!drawerOpen ? styles["hidden"] : ""}`}>
        <nav className={styles["drawer-menu"]}>
          <Link className={styles["drawer-item"]} to="/" reloadDocument>Home</Link>
          <Link className={styles["drawer-item"]} to="/products/footwear" reloadDocument>Footwear</Link>
          <Link className={styles["drawer-item"]} to="/products/lifting-belts" reloadDocument>Lifting Belts</Link>
          <Link className={styles["drawer-item"]} to="/products/knee-sleeves" reloadDocument>Knee Sleeves</Link>
        </nav>
      </div>
    </header>
  )
}
