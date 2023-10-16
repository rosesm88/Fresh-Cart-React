import React, { useContext } from "react";
import { userContext } from "../../Context/UserContaxt";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { userToken } = useContext(userContext);

  if (userToken) {
    return children;
  } else {
    return <Navigate to={"/Login"} />;
  }
}
