import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/client";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const [email, password] = [e.target[0].value, e.target[1].value];
    try {
      const { data } = await AuthAPI.login(email, password);
      localStorage.setItem("token", data.token);
      const me = await AuthAPI.me();
      setUser(me.data);
      navigate("/home");
    } catch (ex) {
      setErr(ex.response?.data?.message || "Login failed");
    }
  };
  return (
    <form onSubmit={submit} style={{ maxWidth: 500 }}>
      <h3>Login</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <label className="form-label">Email address</label>
      <input type="email" required className="form-control" placeholder="name@example.com" />
      <br />
      <label className="form-label">Password</label>
      <input type="password" required className="form-control" />
      <p className="mt-2">Don't have an account? <Link to="/register">Register here</Link></p>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}
