import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import GoogleButton from '../components/GoogleButton';


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Show loading spinner

    try {
      const response = await api.post("/api/auth/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 relative">
  <div className="absolute top-6 left-6 text-gray-700 z-10 sm:top-10 sm:left-10">
    <h1 className="text-2xl font-bold sm:text-4xl">
      Welcome to Rent<span className="text-blue-600 italic">Caroo</span>
    </h1>
  </div>
  <div className="relative z-20 w-full max-w-sm p-6 bg-transparent rounded-lg shadow-xl border border-gray-300 sm:max-w-md sm:p-8">
    <h2 className="mb-4 text-2xl font-bold text-center text-black sm:mb-6 sm:text-3xl">Create Account</h2>

    {error && <div className="text-red-500 text-center mb-3 text-sm sm:mb-4">{error}</div>}

    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-4 sm:py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-4 sm:py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-4 sm:py-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mt-1 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-4 sm:py-3"
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 mt-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 sm:py-3 ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
    <div className="mt-3 sm:mt-4">
      <GoogleButton />
    </div>

    <p className="mt-4 text-center text-gray-600 text-sm sm:mt-6 sm:text-base">
      Already have an account?{' '}
      <a href="/" className="text-blue-600 hover:text-blue-700">
        Login here
      </a>
    </p>
  </div>
</div>


  );
};

export default Register;
