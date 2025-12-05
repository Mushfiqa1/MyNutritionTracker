import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="logo">MyNutritionTracker</div>

      <ul>
        {/* If logged OUT → show public links */}
        {!token && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {/* If logged IN → show tracker links */}
        {token && (
          <>
            <li><Link to="/home">Tracker</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
