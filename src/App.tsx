
import './App.css'
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routing/Routes";
import Toast from "./parts/Toast";
import { useAppDispatch, useAppSelector } from './hooks';
import { setIsMobile } from './features/device/deviceSlice';
import { useEffect } from 'react';
import api from "./ApiClient";
import { setLoggedIn } from './features/auth/authSlice';
import { setCart } from './features/cart/cartSlice';

export default function App() {

  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.accessToken);
  const isLoggedIn = useAppSelector(state => state.auth.loggedIn);

  useEffect(() => {

    const resizeListener = () => {
      if (window.innerWidth < 769) {
        dispatch(setIsMobile(true));
        return;
      }
      dispatch(setIsMobile(false));
    };

    window.addEventListener("resize", resizeListener);

    const refreshToken = async () => {
      try {
        await api.refresh();
        dispatch(setLoggedIn(true));
      } catch (err : unknown) {
        console.log(err);
      }
    }
    if (!token) {
      console.log("No access token in memory.  Attempting to refresh the token...");
      refreshToken();
      console.log("Refresh successful");
    }

    return () => {window.removeEventListener("resize", resizeListener)}
  }, []);

  useEffect(() => {
    const getCart = async () => {
      try {
        let r = await api.getCart();
        dispatch(setCart(r.cart));
      } catch (err: unknown) {
        console.log(err);
      }
    }
    if (token && isLoggedIn) getCart();
  }, [token, isLoggedIn]);
  
  return (
      <div id="App" className="App">
        <BrowserRouter>
          <Header />
          <Routes />
          <Footer />
          <Toast />
        </BrowserRouter>
      </div>
  )
}
