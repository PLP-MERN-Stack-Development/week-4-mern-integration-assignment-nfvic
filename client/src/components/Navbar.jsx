import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      {user ? (
        <>
          <Link to="/create" style={{ marginRight: "1rem" }}>Create Post</Link>
          <span style={{ marginRight: "1rem" }}>Welcome, {user.username}!</span>
          <button onClick={logout} style={{ background: "none", border: "none", color: "#1976d2", cursor: "pointer" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar; 