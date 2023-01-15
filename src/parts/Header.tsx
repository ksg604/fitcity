import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from "../assets/images/banner_image.avif";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setLoggedIn } from "../features/auth/authSlice";
import api from "../ApiClient";

export default function Header() {

  const isLoggedIn = useAppSelector(state => state.auth.loggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    if (drawerOpen) setDrawerOpen(false);
    try {
      await api.logout();
      dispatch(setLoggedIn(false));
    } catch (error : any) {
      console.log(error);
    }
  }

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
          <Link className={styles["drawer-item"]} to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
          <Link className={styles["drawer-item"]} to="/products/footwear" onClick={() => setDrawerOpen(false)}>Footwear</Link>
          <Link className={styles["drawer-item"]} to="/products/lifting-belts" onClick={() => setDrawerOpen(false)}>Lifting Belts</Link>
          <Link className={styles["drawer-item"]} to="/products/knee-sleeves" onClick={() => setDrawerOpen(false)}>Knee Sleeves</Link>

          {isLoggedIn 
            ? <div className={styles["user-row"]}>
                <button onClick={() => {setDrawerOpen(false); navigate("/profile")}}>My Profile</button>
                <button onClick={handleLogout}>Log Out</button>
              </div> 
            : <div className={styles["user-row"]}>
                <button onClick={() => {setDrawerOpen(false); navigate("/login")}}>Login</button>
                <button onClick={() => {setDrawerOpen(false); navigate("/signup")}}>Sign Up</button>
              </div>
          }
        </nav>
      </div>
    </header>
  )
}
