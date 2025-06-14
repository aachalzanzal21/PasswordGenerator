import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert("Check your email for the reset link");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-3" placeholder="Enter email"
               value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn btn-primary">Send Reset Link</button>
      </form>
    </div>
  );
}
