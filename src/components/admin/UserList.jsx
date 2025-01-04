import api from '../../axios';
import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="ml-64 mt-16 p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">User Profiles</h2>
        {users.length > 0 ? (
          <div className="space-y-6">
            {users.map((user) => (
              <div key={user.id} className="p-4 bg-gray-50 rounded-lg shadow">
                <div className="space-y-2">
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
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
