
import './App.css'
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routing/Routes";
import Toast from "./parts/Toast";
import { useAppDispatch } from './hooks';
import { setIsMobile } from './features/device/deviceSlice';
import { useEffect } from 'react';

export default function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 769) {
        dispatch(setIsMobile(true));
        return;
      }
      dispatch(setIsMobile(false));
    });
  }, [dispatch]);

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
