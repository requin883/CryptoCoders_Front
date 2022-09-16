import { useState } from "react";
import { Outlet } from "react-router-dom";
import Homepages from "./Pages/Homepages/Homepages";




const ProtectedRoute = () => {
 let [auth, setAuth] = useState(false)
return auth ? <Outlet/> : <Homepages/>
}

export default ProtectedRoute;

  