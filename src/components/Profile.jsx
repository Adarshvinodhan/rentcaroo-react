import React, { useEffect, useState } from "react";
import api from "../axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/user")
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-4">
        <p>Error: Could not fetch user data.</p>
      </div>
    );
  }

  return (
<div className="sm:ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
  <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-center mb-6">Your Profile</h2>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-600">Username:</span>
        <p className="text-gray-800">{user.username}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-600">Email:</span>
        <p className="text-gray-800">{user.email}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-600">Phone:</span>
        <p className="text-gray-800">{user.phone}</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Profile;
