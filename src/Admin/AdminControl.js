import React from "react";
import { useNavigate } from "react-router-dom";

export const AdminControl = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <button onClick={() => navigate("/Home")}>Homepage</button>
      <button>About Us</button>
      <button>Services</button>
      <button>Contact</button>
    </div>
  );
};
