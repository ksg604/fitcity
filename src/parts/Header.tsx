import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from "../assets/images/banner_image.avif";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setLoggedIn } from "../features/auth/authSlice";
import api from "../ApiClient";
import { toast } from "react-toastify";

export default function Header() {

  type NavigationState = {
    previousScrollY: number,
    expandedHeader: boolean
  }

  const isLoggedIn = useAppSelector(state => state.auth.loggedIn);
  const isMobile = useAppSelector(state => state.device.isMobile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    previousScrollY: window.scrollY,
    expandedHeader: (window.scrollY < 10)
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    if (drawerOpen) setDrawerOpen(false);
    try {
      await api.logout();
      toast("Successfully logged out", {toastId: "successtoast", type: "success"});
      dispatch(setLoggedIn(false));
    } catch (error : any) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleNavigation = () => {
      const scrollingUp = (window.scrollY < navigationState.previousScrollY);
      const scrollingDown = (window.scrollY > navigationState.previousScrollY);
      if (scrollingUp && (window.scrollY < 10)) {
        console.log("expanding header");
        setNavigationState({expandedHeader: true, previousScrollY: window.scrollY});
      } else if (scrollingDown && (window.scrollY > 10) && navigationState.expandedHeader) {
        console.log("minimizing header")
        setNavigationState({expandedHeader: false, previousScrollY: window.scrollY});
      } else {
        setNavigationState({...navigationState, previousScrollY: window.scrollY});
      }
    }
    window.addEventListener("scroll", handleNavigation);
    return () => {window.removeEventListener("scroll", handleNavigation)}
  }, [navigationState.previousScrollY]);

  return(
    <header className={`${styles["Header"]} ${navigationState.expandedHeader ? styles["expanded"]: ""}`}>
      { isMobile 
        ? <>
            <div className={styles["outer-container"]}> 
              <FontAwesomeIcon icon={drawerOpen ? faX : faBars} size="2xl" onClick={() => setDrawerOpen(!drawerOpen)} color="white"/>
              <Link className={styles["banner-container"]} to="/" onClick={() => setDrawerOpen(false)}>
                <img className={`${styles["header-banner"]}`} src={banner}/>
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
          </>
        : <div className={styles["outer-container"]}>
            <Link className={styles["banner-container"]} to="/">
              <img className={`${styles["header-banner"]} ${navigationState.expandedHeader ? styles["expanded"] : ""}`} src={banner}/>
            </Link>
            <nav className={styles["drawer-menu"]}>
              <Link className={styles["drawer-item"]} to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
              <Link className={styles["drawer-item"]} to="/products/footwear" onClick={() => setDrawerOpen(false)}>Footwear</Link>
              <Link className={styles["drawer-item"]} to="/products/lifting-belts" onClick={() => setDrawerOpen(false)}>Lifting Belts</Link>
              <Link className={styles["drawer-item"]} to="/products/knee-sleeves" onClick={() => setDrawerOpen(false)}>Knee Sleeves</Link>
            </nav>
          </div>
      }
      
    </header>
  )
}
