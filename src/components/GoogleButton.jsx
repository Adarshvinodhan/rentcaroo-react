import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import api from '../axios';

const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${api.defaults.baseURL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full px-4 py-3 mt-4 flex items-center justify-center font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
      <FcGoogle className="mr-2" size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
