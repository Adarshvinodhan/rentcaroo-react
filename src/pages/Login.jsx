import React, { useState } from 'react';
import api from '../axios';
import { useNavigate } from 'react-router-dom'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 
import { ImSpinner2 } from 'react-icons/im'; 
import GoogleButton from '../components/GoogleButton';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Autofill admin credentials
  const autofillAdminCredentials = () => {
    setFormData({
      email: 'adarshvinodhan@gmail.com',
      password: 'test',
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true); // Start loading

    const { email, password } = formData;

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });
      setSuccess('Login successful!');
      localStorage.setItem('token', response.data.token);
      setTimeout(() => {navigate('/cars')}, 1000);
     
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false); 
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4 relative">
  {/* Welcome Section */}
  <div className="absolute top-10 left-10 text-gray-800 z-10 max-w-sm">
    <h1 className="text-4xl font-extrabold leading-tight">
      Rent<span className="text-blue-600 italic">Caroo</span>
    </h1>
    <p className="mt-4 text-lg font-medium">
      Stop Asking <span className="font-bold">"Machi Vandikedaikuma from Now"</span>
    </p>
    <p className="mt-2 text-sm text-gray-700">Affordable. Reliable. Trust.</p>
  </div>

  {/* Login Section */}
  <div className="relative z-20 w-full max-w-md bg-transparent rounded-lg shadow-lg p-8 border border-gray-200">
    {/* Error and Success Messages */}
    {error && (
      <p className="mb-4 text-sm text-red-600 border border-red-300 bg-red-50 rounded-md p-2">
        {error}
      </p>
    )}
    {success && (
      <p className="mb-4 text-sm text-green-600 border border-green-300 bg-green-50 rounded-md p-2">
        {success}
      </p>
    )}

    {/* Login Form */}
    <form onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mt-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Password Input */}
      <div className="mb-5 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mt-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <ImSpinner2 className="animate-spin mr-2" size={20} /> Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>

    {/* Admin Login */}
    <button
      onClick={autofillAdminCredentials}
      className="w-full mt-4 py-3 font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-500 focus:ring-2 focus:ring-gray-400 focus:outline-none"
    >
      Login as Admin
    </button>

    {/* Google Button */}
    <div className="mt-4">
      <GoogleButton />
    </div>

    {/* Register Link */}
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Register here
        </Link>
      </p>
    </div>
  </div>
</div>
  );
};

export default Login;