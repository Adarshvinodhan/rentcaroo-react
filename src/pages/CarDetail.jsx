import React, { useState, useEffect } from "react";
import api from "../axios";
import { useParams } from "react-router-dom";
import PaymentButton from "../components/PaymentButton";
import { useAuth } from "../context/AuthContext";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [perHour, setPerHour] = useState(1);
  const{user} = useAuth();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/api/car/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load car details.");
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await api.get(`/api/review/car/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };

    fetchCar();
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500 bg-gray-50">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black flex justify-center py-2">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 md:p-16">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-64 object-contain rounded-md mb-4 shadow-md"
        />
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{`${car.make} ${car.model}`}</h1>
        <p className="text-gray-600 mb-4 leading-relaxed">{car.description}</p>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">Year:</span> {car.year}
          </p>
          <p>
            <span className="font-semibold">Color:</span> {car.color}
          </p>
          <p>
            <span className="font-semibold">Rent Per Hour:</span> ₹{car.rentPerHour}
          </p>
          <p>
            <span className="font-semibold">Availability:</span>{" "}
            {car.availability ? "Available" : "Not Available"}
          </p>
        </div>

        {/* Booking Section */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Book this Car</h2>
          <p className="mb-4 text-gray-600">
            Ready to book the <strong>{car.make} {car.model}</strong> for your trip? Enter the number of hours you want to rent and proceed with the payment.
          </p>
          <div className="flex flex-col gap-4 mb-4">
            <label htmlFor="hours" className="font-semibold text-gray-700">
              Number of Hours:
            </label>
            <input
              id="hours"
              type="number"
              className="border border-gray-300 rounded-md px-3 py-2 w-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              min={1}
              onChange={(e) => setPerHour(e.target.value)}
              value={perHour}
            />
            <span className="text-lg font-semibold">Total Amount: ₹{car.rentPerHour * perHour}</span>
          </div>
          <PaymentButton
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
            amount={car.rentPerHour * perHour}
            hours={perHour}
            user={user}
            car={id}
            model={car.model}
          />
        </div>

        {/* Review Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h2>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                  <p className="font-semibold text-gray-800">{review.username}</p>
                  <p className="text-gray-500 text-sm mb-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={
                          index < review.rating ? "text-yellow-500" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
