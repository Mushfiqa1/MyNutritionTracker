import React, { useEffect, useState } from "react";
import { getProfile } from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (err) {
      console.log("Profile error", err);
    }
  };

  if (!user) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>My Profile</h1>

      <div className="card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
