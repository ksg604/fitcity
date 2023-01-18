
import './App.css'
import Header from "./parts/Header";
import Footer from "./parts/Footer";
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routing/Routes";
import Toast from "./parts/Toast";

export default function App() {

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
