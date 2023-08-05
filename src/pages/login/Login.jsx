import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function Login() {
  // State to manage username, password, and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // Initialize navigation hook
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
  
      if (res && res.data) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/");
      } else {
        // Handle unexpected response structure
        setError("Unexpected response from the server");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        // Handle other errors (e.g., network errors)
        setError("An error occurred");
      }
    }
  };


  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        {/* Username Input */}
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* Password Input */}
        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <div className="err">
          {error && error}
        </div>


      </form>
    </div>
  );
}

export default Login;
