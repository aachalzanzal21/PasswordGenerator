import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/reset-password/${token}`)
      .then(() => setValid(true))
      .catch(() => alert("Token invalid or expired"));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      alert("Password reset successful!");
    } catch (err) {
      alert("Failed to reset password.");
    }
  };

  return valid ? (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <input type="password" className="form-control mb-3" placeholder="New password"
               value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-success">Reset</button>
      </form>
    </div>
  ) : null;
}
