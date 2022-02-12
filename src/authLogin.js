import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const admin = localStorage.getItem("admin");
  const accessToken = localStorage.getItem("AccessToken");
  let user = null;
  if(!admin && accessToken)
  {
    user =false;
    return user
  }
};

const LoginProtected = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/admin"/> :<Outlet/>;
};

export default LoginProtected;