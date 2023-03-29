import styles from "./Products.module.css";
import api from "../ApiClient";
import { MouseEvent, useEffect, useState } from "react";
import { setModalIsOpen } from "../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import AppModal from "../parts/AppModal";
import Loading from "../screens/Loading";
import { toast } from "react-toastify";
import { setCart } from "../features/cart/cartSlice";

export default function Products({product} : {product : string}) {

  type Variant = {
    color: string,
    price: string,
    image: string,
    size: string,
    id: string,
    quantityAvailable: number
  }

  type Product = {
    colors: Array<{color: string, image: string}>,
    descriptionHtml: string,
    sizes: Array<string>,
    title: string,
    variants: Array<Variant>
  }

  type ScreenState = {
    productInfo: Product,
    currentVariant: Variant,
    loading: boolean
  }

  const [screenState, setScreenState] = useState<ScreenState>({
    loading: true,
    productInfo: {
      colors: [],
      descriptionHtml: "",
      sizes: [],
      title: "",
      variants: []
    },
    currentVariant: {
      color: "",
      price: "",
      image: "",
      size: "",
      id: "",
      quantityAvailable: 0
    },
  });

  const cartId = useAppSelector(state => state.cart.cart.id);
  const dispatch = useAppDispatch();

  const handleChangeColor = (e: MouseEvent<HTMLImageElement>) : void => {
    const color = (e.currentTarget.dataset.color as string);
    const variantToChangeTo = (screenState.productInfo.variants.find(variant => 
      variant.size === screenState.currentVariant.size && variant.color === color) as Variant);
    if (variantToChangeTo === screenState.currentVariant) return;
    setScreenState({...screenState, currentVariant: variantToChangeTo});
  }

  const handleChangeSize = (e: MouseEvent<HTMLButtonElement>) : void => {
    const size = (e.currentTarget.dataset.size as string);
    const variantToChangeTo = (screenState.productInfo.variants.find(variant => 
      variant.size === size && variant.color === screenState.currentVariant.color) as Variant);
    if (variantToChangeTo === screenState.currentVariant) return;
    setScreenState({...screenState, currentVariant: variantToChangeTo});
  }

  const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
    const merchandiseId = screenState.currentVariant.id;
    try {
      let r = await api.addProductToCart(merchandiseId, cartId);
      toast("Item added to your cart", {toastId: "successtoast", type: "success"});
      let res2 = await api.getCart();
      dispatch(setCart(res2.cart));
    } catch (err: unknown) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const r = await api.getProductInfo(product);
        setScreenState({loading: false, productInfo: r.product, currentVariant: r.product.variants[0]});
      } catch (err) {
        console.log(err);
      }
    }
    getProductInfo();
  }, [product]);

  return(
    <div className={styles["Products"]}>
      { screenState.loading
      ? <Loading />
      : <main className={styles["main"]}> 
          <section className={styles["product-img-section"]}>
            <div className={styles["img-container"]}>
              <img className={styles["product-img"]} 
                src={screenState.currentVariant.image} alt="product img" 
                onClick={() => dispatch(setModalIsOpen(true))}/>
            </div>
          </section>
          <section className={styles["product-info-section"]}>
            <h1>{screenState.productInfo.title} ({screenState.currentVariant.color})</h1>
            <h2 className={styles["price"]}>${screenState.currentVariant.price}</h2>
            
            <div id="alt-color-selection" className={styles["alt-color-selection"]}>
              <label className={styles["subheader"]} htmlFor="colors">Colors: </label>
              <div id="colors" className={styles["colors"]}>
                {screenState.productInfo.colors.map((color, index) => 
                <img className={`${styles["alt-color-img"]} ${color.color === screenState.currentVariant.color ? styles["selected"] : ""}`} 
                  data-color={color.color}
                  key={index} src={color.image} 
                  alt="alt color image"
                  onClick={handleChangeColor}/>)}
              </div>
            </div>
            <div className={styles["size-container"]}>
              <label className={styles["subheader"]} htmlFor="sizes">Sizes: </label>
              <div id="sizes" className={styles["sizes"]}>
                {screenState.productInfo.variants.map((variant, index) => (variant.color === screenState.currentVariant.color) &&
                <button className={`${styles["size-btn"]} 
                                  ${variant.size === screenState.currentVariant.size && variant.quantityAvailable !== 0 ? styles["selected"] : ""}
                                  ${variant.quantityAvailable === 0 ? styles["disabled"] : ""}
                                  `}
                key={index}
                data-size={variant.size} 
                value={variant.size}
                onClick={handleChangeSize}>{variant.size}</button>)}
              </div>
            </div>
            <div className={styles["description-container"]}>
              <label className={styles["subheader"]} htmlFor="description">Description: </label>
              <p id="description" className={styles["description"]} dangerouslySetInnerHTML={{ __html: screenState.productInfo.descriptionHtml as string }} />
            </div>
            <div className={styles["add-to-cart"]}>
              { screenState.currentVariant.quantityAvailable === 0
                ? <button className={`${styles["cart-btn"]} ${styles["disabled"]}`}>Out of Stock</button>
                : <button className={styles["cart-btn"]} onClick={handleAddToCart}>Add To Cart</button>
              }
            </div>
          </section>
          <AppModal 
            title="" hasXBtn
            body={<img src={screenState.currentVariant.image} width="100%"/>}/>
        </main>}
    </div>
  )
}