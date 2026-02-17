import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/login", {
        email,
        password,
      });

      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("email", res.data.user.email);

      navigate("/home");
    } catch (err) {
      setMsg("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-msg">{msg}</p>

        <p className="auth-link">
          New user? <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
