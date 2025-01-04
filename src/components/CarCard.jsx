import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import api from "../axios";

const CarCard = ({ car,onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCardClick = () => {
    navigate(`/car/${car._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent triggering parent click
    navigate(`/admin/editcar/${car._id}`); // Updated route to match the EditCar page
};


  const handleDelete = async (e) => {
    e.stopPropagation();
  
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        const response = await api.delete(`/api/car/${car._id}`);
        console.log(response.data);
        onDelete(car._id);
      } catch (err) {
        console.error('Error deleting car:', err);
        window.alert(err.response?.data?.message || "Failed to delete the car.");
      }
    }
  };
  

  return (
<div
  onClick={handleCardClick}
  className="max-w-sm mx-auto bg-white text-black shadow-lg rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:shadow-xl transition-shadow duration-300"
>
  <img
    className="w-full h-48 object-cover"
    src={car.image}
    alt={`${car.make} ${car.model}`}
  />
  <div className="p-6">
    <h2 className="text-xl font-bold mb-2">
      {car.make} {car.model}
    </h2>
    <p className="text-gray-700 mb-4">{car.description}</p>
    <div className="flex justify-between items-center">
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${
          car.availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {car.availability ? "Available" : "Sold Out"}
      </span>
    </div>
    <div className="mt-2">
      <span className="text-lg font-semibold text-gray-800">
        ₹{car.rentPerHour} / hour
      </span>
    </div>
    <div className="mt-4 flex flex-wrap text-sm text-gray-500 gap-2">
      <span>Year: {car.year}</span>
      <span>Color: {car.color}</span>
      <span>Seats: {car.seat}</span>
    </div>
    <div className="mt-6 flex flex-wrap gap-4">
      {user.role === "admin" ? (
        <>
          <button
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </>
      ) : (
        <Link
          to={`/car/${car._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => e.stopPropagation()} // Prevents parent click event
        >
          Book Now
        </Link>
      )}
    </div>
  </div>
</div>


  );
};

export default CarCard;