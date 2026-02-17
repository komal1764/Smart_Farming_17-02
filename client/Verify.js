import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Verify() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("verifyEmail");
    if (!savedEmail) {
      navigate("/signup");   // safety redirect
    } else {
      setEmail(savedEmail);
    }
  }, [navigate]);

  const verify = () => {
    if (!otp) {
      setMsg("Please enter OTP");
      return;
    }

    setLoading(true);
    setMsg("");

    axios
      .post("http://localhost:9000/verify", {
        username: email,
        otp,
      })
      .then((res) => {
        if (res.data === "verified") {
          setMsg("Email verified successfully! Redirecting to login...");

          localStorage.removeItem("verifyEmail");

          setTimeout(() => {
            navigate("/");   // LOGIN PAGE
          }, 2000);
        } else {
          setMsg(res.data);
        }
      })
      .catch(() => setMsg("Server error. Try again later."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Email Verification</h2>

        <input value={email} disabled />

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={verify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="auth-msg">{msg}</p>
      </div>
    </div>
  );
}

export default Verify;
