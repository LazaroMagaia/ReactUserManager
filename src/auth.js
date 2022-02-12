import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const admin = localStorage.getItem("admin");
  const accessToken = localStorage.getItem("AccessToken");
  let user = null;
  if(admin && accessToken)
  {
    user =true;
    return user
  }
  else
  {
    user = false;
    return user
  }
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;