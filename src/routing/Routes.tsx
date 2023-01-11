import { Routes as AppRoutes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Footwear from "../screens/Footwear";
import KneeSleeves from "../screens/KneeSleeves";
import LiftingBelts from "../screens/LiftingBelts";
import Login from "../screens/Login";
import MyProfile from '../screens/MyProfile';

export default function Routes() {
  return(
    <AppRoutes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<MyProfile/>}/>
      <Route path="/products/footwear" element={<Footwear/>}/>
      <Route path="/products/knee-sleeves" element={<KneeSleeves/>}/>
      <Route path="/products/lifting-belts" element={<LiftingBelts/>}/>
    </AppRoutes>
  )
}