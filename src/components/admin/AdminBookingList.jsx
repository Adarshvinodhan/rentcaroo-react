import React, { useState, useEffect } from 'react';
import api from '../../axios';
import BookingCard from '../BookingCard';

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminBookings = async () => {
      try {
        const response = await api.get('/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching admin bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminBookings();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="pl-64 pt-16">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default AdminBookingList;
