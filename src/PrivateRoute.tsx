import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "./store/store";


const PrivateRoute = ({ children } : any) => {
  const { user , isAuthenticated } = useSelector((state : RootState) => state.UserReducer);

  if (user == null || isAuthenticated == false ) {
    return (<Navigate to={"/login"} replace />)
  }

  return children;
};

export default PrivateRoute;