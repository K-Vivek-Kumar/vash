"use client";

import React, { useState } from "react";
import axios from "axios";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/signup",
        userData
      );

      setMessage(response.data);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setMessage("Error signing up. Please try again.");
    }
  };

  return (
    <div>
      <h2>Signup Form</h2>
      <form onSubmit={handleSignup}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupForm;
