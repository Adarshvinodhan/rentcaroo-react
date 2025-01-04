import React, { useState } from 'react';
import api from '../axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import FontAwesome icons
import { Link } from 'react-router-dom'; // Import Link for routing

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { email, password } = formData;

    try {
      // Make API request
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
      setSuccess('Login successful!');
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 relative">
  <div className="absolute top-10 left-10 text-gray-700 z-10">
    <h1 className="text-4xl font-bold">Welcome to <span className='text-blue-600'>RentCaroo</span></h1>
    <p className="mt-4 text-lg font-medium">Stop Asking <span className='font-bold'>"Machi Vandikedaikuma from Now"</span></p>
    <p className="mt-2 text-sm">Affordable. Reliable. Fast.</p>
  </div>

  <div className="relative z-20 w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-300">
    <h2 className="mb-6 text-3xl font-bold text-center text-black">Login</h2>

    {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    {success && <p className="mb-4 text-sm text-green-500">{success}</p>}

    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mt-2 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="mb-6 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mt-2 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        Login
      </button>
    </form>

    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
          Register here
        </Link>
      </p>
    </div>
  </div>
</div>


  );
};

export default Login;
