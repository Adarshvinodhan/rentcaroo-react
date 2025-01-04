import React, { useState } from 'react';
import api from '../axios';
import {jwtDecode} from 'jwt-decode';

const BookingCard = ({ booking }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const user_id = decoded.id;
    const username = decoded.username;

    const reviewData = {
      userId: user_id,
      username: username, 
      carId: booking.car,
      carname: booking.model,
      rating,
      comment,
    };
    console.log(reviewData);

    try {
      const response = await api.post('/api/review', reviewData);
      if (response.status === 201) {
        alert('Review submitted successfully!');
        setShowReviewForm(false);
      } else {
        console.log(response);
        alert('Failed to submit review');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-bold mb-2">Booking Details</h3>
      <p><strong>Car:</strong> {booking.model}</p>
      <p><strong>Hours:</strong> {booking.hours}</p>
      <p><strong>Amount:</strong> ${booking.amount}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
      
      <button 
        onClick={() => setShowReviewForm(true)} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Write a Review
      </button>

      {showReviewForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
          <h4 className="text-lg font-bold mb-2">Submit Your Review</h4>
          <label className="block mb-2">
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="ml-2 border p-1 rounded">
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>{star}</option>
              ))}
            </select>
          </label>

          <label className="block mb-2">
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mt-2 border p-2 rounded"></textarea>
          </label>

          <button 
            type="submit" 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingCard;
