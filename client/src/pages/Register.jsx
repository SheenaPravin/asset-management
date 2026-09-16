import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/client";

export default function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const [email, password, first_name, last_name] = [0, 1, 2, 3].map((i) => e.target[i].value);
    try {
      await AuthAPI.register({ email, password, first_name, last_name });
      navigate("/login");
    } catch (ex) {
      setErr(ex.response?.data?.message || "Registration failed");
    }
  };
  return (
    <form onSubmit={submit} style={{ maxWidth: 500 }}>
      <h3>Register</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <label className="form-label">Email address</label>
      <input type="email" required className="form-control" />
      <br />
      <label className="form-label">Password</label>
      <input type="password" required className="form-control" />
      <br />
      <label className="form-label">First Name</label>
      <input type="text" required className="form-control" />
      <br />
      <label className="form-label">Last Name</label>
      <input type="text" required className="form-control" />
      <br />
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
}
