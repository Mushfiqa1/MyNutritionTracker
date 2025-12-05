import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If NO token → redirect to dashboard
  if (!token) return <Navigate to="/" replace />;

  return children;
}
