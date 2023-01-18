import styles from "./Home.module.css";
import Footwear from "../assets/images/footwear.webp";
import Belt from "../assets/images/belts.webp";
import KneeSleeve from "../assets/images/knee_sleeves.webp";
import { Link } from "react-router-dom";

export default function Home() {
  return(
    <div className={styles["Home"]}>
      <main>
        <h2>Products</h2>
        <Link to="/products/footwear">
          <div className={styles["product-link-container"]}>
            <img className={styles["product-img"]} src={Footwear} alt="Footwear"/>
            <div className={styles["product-img-overlay"]}>
              <p className={styles["product-overlay-text"]}>Lifting Shoes</p>
            </div>
          </div>
        </Link>
        <Link to="/products/belts">
          <div className={styles["product-link-container"]}>
            <img className={styles["product-img"]} src={Belt} alt="Belt"/>
            <div className={styles["product-img-overlay"]}>
              <p className={styles["product-overlay-text"]}>Lifting Belts</p>
            </div>
          </div>
        </Link>
        <Link to="products/knee-sleeves">
          <div className={styles["product-link-container"]}>
            <img className={styles["product-img"]} src={KneeSleeve} alt="Knee Sleeve"/>
            <div className={styles["product-img-overlay"]}>
              <p className={styles["product-overlay-text"]}>Knee Sleeves</p>
            </div>
          </div>
        </Link>
      </main>
    </div>
  )
}