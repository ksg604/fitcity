import { Routes as AppRoutes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Footwear from "../screens/Footwear";
import KneeSleeves from "../screens/KneeSleeves";
import LiftingBelts from "../screens/LiftingBelts";

export default function Routes() {
  return(
    <AppRoutes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products/footwear" element={<Footwear/>}/>
      <Route path="/products/knee-sleeves" element={<KneeSleeves/>}/>
      <Route path="/products/lifting-belts" element={<KneeSleeves/>}/>
    </AppRoutes>
  )
}