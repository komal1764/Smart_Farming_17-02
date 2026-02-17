import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        right: "20px",
        width: "230px",
        background: "#ffffff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
        borderLeft: "4px solid #4caf50",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h3
        style={{
          margin: "0 0 10px",
          textAlign: "center",
          color: "#2e7d32",
          fontSize: "18px"
        }}
      >
        User Profile
      </h3>

      <p style={{ fontSize: "14px", margin: "6px 0", color: "#333" }}>
        <b>Email:</b> {email}
      </p>

      <p style={{ fontSize: "14px", margin: "6px 0", color: "#333" }}>
        <b>User ID:</b> {userId}
      </p>

      <button
        onClick={logout}
        style={{
          width: "100%",
          marginTop: "12px",
          padding: "8px",
          background: "#e53935",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileCard;
