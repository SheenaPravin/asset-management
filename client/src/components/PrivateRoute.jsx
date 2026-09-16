import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ user, children }) {
  if (!user) return <div className="text-center py-5"><div className="spinner-border" /></div>;
  if (!user.isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}
