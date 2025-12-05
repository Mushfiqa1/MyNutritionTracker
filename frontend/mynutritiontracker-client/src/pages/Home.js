import { useEffect, useState } from "react";
import { getEntries, deleteEntry } from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const res = await getEntries();
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to fetch entries", err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this entry?")) return;

    try {
      await deleteEntry(id);
      loadEntries();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  const totalCalories = entries.reduce((sum, e) => sum + (e.calories || 0), 0);
  const mealsCount = entries.length;

  return (
    <>

      {/* ===== TOP NAV BAR ===== */}
      <div className="header-container">
        <div className="header-left">MyNutritionTracker</div>

        <div className="header-right">
          <Link to="/home">Tracker</Link>
          <Link to="/profile">Profile</Link>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== MAIN DASHBOARD ===== */}
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>Your Nutrition Tracker</h1>
          <Link to="/add" className="add-entry-btn">+ Add Entry</Link>
        </div>

        <div className="summary-cards">
          <div className="card">
            <h3>Total Calories Today</h3>
            <p>{totalCalories}</p>
          </div>

          <div className="card">
            <h3>Meals Logged</h3>
            <p>{mealsCount}</p>
          </div>

          <div className="card">
            <h3>Avg Calories / Meal</h3>
            <p>{mealsCount ? Math.round(totalCalories / mealsCount) : 0}</p>
          </div>
        </div>

        <div className="entries-section">
          <h2>Your Entries</h2>

          {entries.length === 0 ? (
            <p className="no-entries">No entries yet. Start by adding a meal!</p>
          ) : (
            <div className="entries-list">
              {entries.map((entry) => (
                <div className="entry-card" key={entry._id}>

                  <div className="entry-info">
                    <h3>{entry.foodName}</h3>
                    <p><strong>Calories:</strong> {entry.calories}</p>
                    <p><strong>Protein:</strong> {entry.protein}g</p>
                    <p><strong>Carbs:</strong> {entry.carbs}g</p>
                    <p><strong>Fats:</strong> {entry.fats}g</p>
                    <p className="entry-date">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="entry-actions">
                    <Link className="edit-btn" to={`/edit/${entry._id}`}>Edit</Link>
                    <button className="delete-btn" onClick={() => handleDelete(entry._id)}>Delete</button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
