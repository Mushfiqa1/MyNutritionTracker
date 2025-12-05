import React, { useState } from "react";
import { addEntry } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/AddEntry.css";

export default function AddEntry() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addEntry(form);
      navigate("/home"); // go back to tracker
    } catch (err) {
      console.error("ADD ENTRY ERROR:", err);
      alert("Failed to add entry.");
    }
  }

  return (
    <div className="entry-container">
      <div className="entry-card">
        <h2>Add Nutrition Entry</h2>

        <form onSubmit={handleSubmit} className="entry-form">

          <div className="form-group">
            <label>Food Name</label>
            <input
              type="text"
              name="foodName"
              placeholder="e.g., Chicken Breast"
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
              placeholder="e.g., 320"
              value={form.calories}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group small">
              <label>Protein (g)</label>
              <input
                type="number"
                name="protein"
                placeholder="30"
                value={form.protein}
                onChange={handleChange}
              />
            </div>

            <div className="form-group small">
              <label>Carbs (g)</label>
              <input
                type="number"
                name="carbs"
                placeholder="0"
                value={form.carbs}
                onChange={handleChange}
              />
            </div>

            <div className="form-group small">
              <label>Fats (g)</label>
              <input
                type="number"
                name="fats"
                placeholder="8"
                value={form.fats}
                onChange={handleChange}
              />
            </div>

          </div>

          <button className="primary-btn" type="submit">
            + Add Entry
          </button>
        </form>
      </div>
    </div>
  );
}
