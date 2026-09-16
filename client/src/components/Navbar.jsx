import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/home">RASL Asset Manager</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/home">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/equipment">Equipment</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/create">Add Item</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/system">System</NavLink></li>
            {user?.isLoggedIn
              ? <li className="nav-item"><button className="btn btn-link nav-link" onClick={signOut}>Sign Out ({user.first_name})</button></li>
              : <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
