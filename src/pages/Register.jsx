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
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-4">
  <div className="w-full max-w-sm">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-gray-700">
        Rent<span className="text-blue-600 italic">Caroo</span>
      </h1>
    </div>

    <div className="bg-transparent rounded-lg shadow-md p-6 border border-gray-300">
      <h2 className="text-2xl font-bold text-center text-black mb-4">Create Account</h2>

      {error && <div className="text-red-500 text-center mb-3 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-4">
        <GoogleButton />
      </div>

      <p className="mt-4 text-center text-gray-600 text-sm">
        Already have an account?{' '}
        <a href="/" className="text-blue-600 hover:text-blue-700">
          Login here
        </a>
      </p>
    </div>
  </div>
</div>



  );
};

export default Register;
