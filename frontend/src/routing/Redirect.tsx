import { Navigate } from "react-router";

export default function Redirect( { path } : { path: string} ) {
  return(
    <div>
      <Navigate to={path} replace/>
    </div>
  )
}