import React from 'react';
import api from '../axios';

const PaymentButton = ({ amount,car,user,hours,model }) => {
    const addPayment = async () => {
        try {
            await api.post('/api/booking', {user,car,hours,amount,model}).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
    }catch (err) { 
        res.status(500).json({ message: err.message });
    }
    }
  const handlePayment = async () => {
    try {
      const { data } = await api.post('/api/order', {
        amount: amount,
        currency: 'INR',
      });

      const options = {
        key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Car Rental App',
        description: 'Payment for Booking',
        order_id: data.id,
        handler: async function (response) {
          const verifyResponse = await api.post('/api/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResponse.data.success) {
            alert('Payment Successful');
            addPayment();
          } else {
            alert('Payment Failed');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
<button
  onClick={handlePayment}
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
>
  Pay Now
</button>

  );
};

export default PaymentButton;
