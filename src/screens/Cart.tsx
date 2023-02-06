import styles from "./Cart.module.css";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Loading from "./Loading";
import { CartLine } from "../types";
import api from "../ApiClient";
import { setCart } from "../features/cart/cartSlice";

export default function Cart() {

  const [loading, setLoading] = useState(true);
  const cart = useAppSelector(state => state.cart.cart);
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(state => state.device.isMobile);

  const handleIncreaseQuantity = async (line : CartLine) => {
    try {
      await api.updateCart(cart.id, line.id, line.merchandise.id, line.quantity + 1);
      let res2 = await api.getCart();
      dispatch(setCart(res2.cart));
    } catch (err : unknown) {
      console.error(err);
    }
  }

  const handleDecreaseQuantity = async (line : CartLine) => {
    try {
      await api.updateCart(cart.id, line.id, line.merchandise.id, line.quantity - 1);
      let res2 = await api.getCart();
      dispatch(setCart(res2.cart));
    } catch (err : unknown) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (Object.keys(cart).length > 0) setLoading(false);
  }, [cart]);

  if (loading) return <Loading />
  if (cart.lines.length === 0) return <div>Your cart is empty</div>

  return(
    <div className={styles["Cart"]}>
      <table className={styles["table"]}>
        <thead>
          <tr>
            <th className={styles["table-cell"]}>Item</th>
            <th className={styles["table-cell"]}>Color</th>
            <th className={styles["table-cell"]}>Price</th>
            <th className={styles["table-cell"]}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {cart.lines.map((line, index) => 
          <tr key={index}>
            <td className={styles["table-cell"]}>
              <div className={styles["item-container"]}>
                {!isMobile && <img className={styles["item-img"]} src={line.merchandise.image}/>}
                <p className={styles["item-text"]}>{line.merchandise.productTitle} ({line.merchandise.size})</p>
              </div>
            </td>
            <td className={styles["table-cell"]}>{line.merchandise.color}</td>
            <td className={styles["table-cell"]}>${line.cost.totalAmount}</td>
            <td className={`${styles["table-cell"]} ${styles["qty-cell"]}`}>
              <button className={styles["qty-btn"]} onClick={() => handleDecreaseQuantity(line)}>-</button>
              {line.quantity}
              <button className={styles["qty-btn"]} onClick={() => handleIncreaseQuantity(line)}>+</button>
            </td>
          </tr>)}
        </tbody>
      </table>
      <button className={styles["btn"]} onClick={() => window.location.href = cart.checkoutUrl}>Checkout</button>
    </div>
  )
}