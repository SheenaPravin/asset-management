import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Equipment from "./pages/Equipment";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import ItemDetails from "./pages/ItemDetails";
import System from "./pages/System";
import { AuthAPI, DEMO } from "./api/client";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (DEMO) {
      // No backend on GitHub Pages — sign in as the demo user instantly.
      localStorage.setItem("token", "Bearer demo");
      AuthAPI.me().then(({ data }) => setUser(data));
      return;
    }
    if (!localStorage.getItem("token")) { setUser({ isLoggedIn: false }); return; }
    AuthAPI.me().then(({ data }) => setUser(data)).catch(() => setUser({ isLoggedIn: false }));
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      {DEMO && (
        <div className="container"><div className="alert alert-info py-2">
          Demo build — data is stored in your browser (localStorage). Run the full MERN stack locally for the real MongoDB backend. See README.
        </div></div>
      )}
      <div className="container pb-5">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute user={user}><Home user={user} /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute user={user}><Navigate to="/home" replace /></PrivateRoute>} />
          <Route path="/equipment" element={<PrivateRoute user={user}><Equipment /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute user={user}><Create /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute user={user}><Edit /></PrivateRoute>} />
          <Route path="/item/:id" element={<PrivateRoute user={user}><ItemDetails /></PrivateRoute>} />
          <Route path="/system" element={<PrivateRoute user={user}><System /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}
