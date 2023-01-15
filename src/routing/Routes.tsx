import { Routes as AppRoutes, Route, useMatch, useNavigate } from "react-router-dom";
import Home from "../screens/Home";
import Footwear from "../screens/Footwear";
import KneeSleeves from "../screens/KneeSleeves";
import LiftingBelts from "../screens/LiftingBelts";
import Login from "../screens/Login";
import MyProfile from '../screens/MyProfile';
import NotFound from "../NotFound";
import { useAppSelector } from "../hooks";
import { useEffect } from "react";
import Signup from "../screens/Signup";

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
      <Route path="/products/footwear" element={<Footwear/>}/>
      <Route path="/products/knee-sleeves" element={<KneeSleeves/>}/>
      <Route path="/products/lifting-belts" element={<LiftingBelts/>}/>
      <Route path="*" element={<NotFound/>}/>
    </AppRoutes>
  )
}