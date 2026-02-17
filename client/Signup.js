import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/save", {
        username: email,
        password1,
      });
      console.log(res.data);
      if (res.data === "saved") {
        localStorage.setItem("verifyEmail", email);
        navigate("/verify");   //  GUARANTEED redirect
      } else {
        setMsg(res.data);
      }
    } catch (err) {
      setMsg("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>

        <form onSubmit={handleSignup}>
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
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />

          <button type="submit">Signup</button>
        </form>

        <p className="auth-msg">{msg}</p>

        <p className="auth-link">
          Already registered?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
