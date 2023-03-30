import { Routes as AppRoutes, Route, useNavigate } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/Login";
import MyProfile from '../screens/MyProfile';
import NotFound from "../NotFound";
import { useAppSelector } from "../hooks";
import Signup from "../screens/Signup";
import Products from "../screens/Products";
import ResetPassword from "../screens/ResetPassword";
import ForgotPassword from "../screens/ForgotPassword";
import Cart from "../screens/Cart";
import { useEffect } from "react";

export default function Routes() {

  const isLoggedIn = useAppSelector(state => state.auth.loggedIn);
  const token = useAppSelector(state => state.auth.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    const path = /#!(\/.*)$/.exec(window.location.href);
    if (path) navigate(path[1], { replace: true });
  }, []);

  return(
    <AppRoutes>
      {isLoggedIn && token &&
        <>
          <Route path="/profile" element={<MyProfile/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </> 
      }
      <Route path="/profile/settings/reset-password" element={<ResetPassword/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/products/footwear" element={<Products product="footwear"/>}/>
      <Route path="/products/knee-sleeves" element={<Products product="knee-sleeves"/>}/>
      <Route path="/products/lifting-belts" element={<Products product="lifting-belts"/>}/>
      <Route path="*" element={<NotFound/>}/>
    </AppRoutes>
  )
}