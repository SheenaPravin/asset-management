import React from "react";

// Mirrors original System page (admin placeholder). Wire to real user-admin APIs as next step.
export default function System() {
  return (
    <div style={{ maxWidth: 500 }}>
      <h3>Administrator Actions</h3>
      <br />
      <h5>User Actions</h5>
      <input className="form-control mb-2" placeholder="enter username" />
      <div className="form-check"><input className="form-check-input" type="radio" name="a" id="pword" /><label className="form-check-label" htmlFor="pword">Reset Password</label></div>
      <div className="form-check"><input className="form-check-input" type="radio" name="a" id="restrict" /><label className="form-check-label" htmlFor="restrict">Restrict User</label></div>
      <button className="btn btn-primary mt-2" type="button" onClick={() => alert("Not implemented in this port — see README roadmap.")}>Submit</button>
      <hr />
      <h5>Register User</h5>
      <p className="text-muted">Use the Register page to create users. Role-based admin is on the roadmap.</p>
      <button className="btn btn-secondary" type="button" onClick={() => alert("Restore from backup is on the roadmap.")}>Restore from Backup</button>
    </div>
  );
}
