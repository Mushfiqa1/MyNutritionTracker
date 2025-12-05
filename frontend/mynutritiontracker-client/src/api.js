import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// =======================
//  USER API
// =======================

// Register + Auto Login
export const registerUser = async (data) => {
  const res = await API.post("/users/register", data);

  // 🔥 Auto-login by storing token
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res;
};

// Login + Save Token
export const loginUser = async (data) => {
  const res = await API.post("/users/login", data);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res;
};

export const getProfile = () => API.get("/users/profile");

// =======================
//  NUTRITION API
// =======================
export const getEntries = () => API.get("/nutrition");
export const addEntry = (data) => API.post("/nutrition", data);
export const deleteEntry = (id) => API.delete(`/nutrition/${id}`);
export const updateEntry = (id, data) => API.put(`/nutrition/${id}`, data);

export default API;
