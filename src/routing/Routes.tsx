import { Routes as AppRoutes, Route, useMatch, useNavigate } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/Login";
import MyProfile from '../screens/MyProfile';
import NotFound from "../NotFound";
import { useAppSelector } from "../hooks";
import { useEffect } from "react";
import Signup from "../screens/Signup";
import Products from "../screens/Products";

export default function Routes() {

  const isLoggedIn = useAppSelector(state => state.auth.loggedIn);
  const navigate = useNavigate();
  
  const protectedRoutes = [
    "/profile"
  ];
  const inProtectedRoute = protectedRoutes.some(route => useMatch(route));

  useEffect(() => {
    if (!isLoggedIn && inProtectedRoute) navigate("/login");
  }, [isLoggedIn, inProtectedRoute]);
  
  return(
    <AppRoutes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<MyProfile/>}/>
      <Route path="/products/footwear" element={<Products product="footwear"/>}/>
      <Route path="/products/knee-sleeves" element={<Products product="knee-sleeves"/>}/>
      <Route path="/products/lifting-belts" element={<Products product="lifting-belts"/>}/>
      <Route path="*" element={<NotFound/>}/>
    </AppRoutes>
  )
}