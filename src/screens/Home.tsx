import styles from "./Home.module.css";
import Footwear from "../assets/images/footwear.webp";
import Belt from "../assets/images/belts.webp";
import KneeSleeve from "../assets/images/knee_sleeves.webp";
import { Link } from "react-router-dom";

export default function Home() {
  return(
    <div className={styles["Home"]}>
      <main className={styles["main"]}>
        <h2>Collections</h2>
        <section className={styles["collections"]}>
          <Link to="/products/footwear" className={styles["product-link"]}>
            <div className={styles["product-link-container"]}>
              <img className={styles["product-img"]} src={Footwear} alt="Footwear"/>
              <div className={styles["product-img-overlay"]}>
                <p className={styles["product-overlay-text"]}>Lifting Shoes</p>
              </div>
            </div>
          </Link>
          <Link to="/products/lifting-belts" className={styles["product-link"]}>
            <div className={styles["product-link-container"]}>
              <img className={styles["product-img"]} src={Belt} alt="Belt"/>
              <div className={styles["product-img-overlay"]}>
                <p className={styles["product-overlay-text"]}>Lifting Belts</p>
              </div>
            </div>
          </Link>
          <Link to="products/knee-sleeves" className={styles["product-link"]}>
            <div className={styles["product-link-container"]}>
              <img className={styles["product-img"]} src={KneeSleeve} alt="Knee Sleeve"/>
              <div className={styles["product-img-overlay"]}>
                <p className={styles["product-overlay-text"]}>Knee Sleeves</p>
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  )
}