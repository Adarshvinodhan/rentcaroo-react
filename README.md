**Live:** [rentcaroo.netlify.app](https://rentcaroo.netlify.app)
Backend Repo:https://github.com/Adarshvinodhan/car-rental-server

## Rentcaroo
Rentcaroo is a full-featured car rental system that allows users to browse, rent, and pay for cars online. It includes an admin dashboard for managing cars, users, and bookings. The application is built using the MERN stack with secure authentication and online payments.

## ✨ Features
- 🔑 **User Authentication** – Secure login and registration using Passport.js
- 🚙 **Car Listings** – Browse and rent cars with real-time availability
- 💳 **Payments** – Seamless transactions via Razorpay
- 📊 **Admin Dashboard** – Manage cars, bookings, and users efficiently
- 🎨 **Modern UI** – Built with React and Tailwind CSS
- ⚡ **Fast & Scalable Backend** – Powered by Node.js, Express, and MongoDB

## 🛠 Tech Stack
### Frontend:
- React.js
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB
- Passport.js (Authentication)
- Razorpay (Payment Gateway)

## 🚀 Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- MongoDB (local or cloud instance)

### Installation
#### Clone the repository:
```bash
git clone https://github.com/yourusername/rentcaroo.git
cd rentcaroo
```
#### Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```
#### Configure Environment Variables
Create a `.env` file in the `backend` directory with:
```
MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
```

### Running the Application
#### Start the Backend Server
```bash
cd backend
npm start
```
#### Start the Frontend
```bash
cd frontend
npm start
```
Now visit [http://localhost:3000](http://localhost:3000) to use Rentcaroo!

## 📬 Contact
For any queries, reach out to [your-email@example.com](mailto:adarshvinodhan@gmail.com).
