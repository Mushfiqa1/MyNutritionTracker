import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import HeroImage from "../photos/picture.png";

export default function Dashboard() {
  return (
    <div className="landing-container">

      {/* ===== TOP RIGHT NAVIGATION ===== */}
      <nav className="top-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">

        {/* LEFT TEXT AREA */}
        <div className="hero-text">
          <h1>Your Nutrition Journey<br />Starts Here</h1>

          <p className="hero-subtext">
            Track calories, meals, and daily progress with ease.
            Build healthier habits — one entry at a time.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Create an Account</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div className="hero-image-wrapper">
          <img src={HeroImage} alt="Healthy lifestyle" className="hero-image" />
        </div>

      </section>
    </div>
  );
}
