
import './App.css'
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routing/Routes";
import { useAppSelector } from "./hooks";
import { useEffect } from 'react';

export default function App() {
  const loggedIn = useAppSelector(state => state.loggedIn);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes />
          <Footer />
        </BrowserRouter>
      </div>
  )
}
