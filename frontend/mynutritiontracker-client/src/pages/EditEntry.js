import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEntries, updateEntry } from "../api";
import "../styles/EditEntry.css";

export default function EditEntry() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  useEffect(() => {
    loadEntry();
  }, []);

  async function loadEntry() {
    try {
      const res = await getEntries();
      const entry = res.data.find((e) => e._id === id);

      if (!entry) {
        alert("Entry not found");
        navigate("/home");
        return;
      }

      setForm({
        foodName: entry.foodName,
        calories: entry.calories,
        protein: entry.protein,
        carbs: entry.carbs,
        fats: entry.fats,
      });
    } catch (err) {
      console.error("Failed to load entry", err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateEntry(id, form);
      navigate("/home");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update entry.");
    }
  }

  return (
    <div className="entry-container">
      <div className="entry-card">
        <h2>Edit Nutrition Entry</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Food Name</label>
            <input
              type="text"
              name="foodName"
              value={form.foodName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Calories</label>
            <input
              type="number"
              name="calories"
              value={form.calories}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Protein (g)</label>
            <input
              type="number"
              name="protein"
              value={form.protein}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Carbs (g)</label>
            <input
              type="number"
              name="carbs"
              value={form.carbs}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Fats (g)</label>
            <input
              type="number"
              name="fats"
              value={form.fats}
              onChange={handleChange}
            />
          </div>

          <button className="primary-btn" type="submit">
            Update Entry
          </button>
        </form>
      </div>
    </div>
  );
}
