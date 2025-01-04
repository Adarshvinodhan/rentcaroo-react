import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CarList from "./components/CarList";
import Profile from "./components/Profile";
import CarDetail from "./pages/CarDetail";
import AddCar from "./components/admin/AddCar";
import EditCar from "./components/admin/EditCar";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminBookingList from "./components/admin/AdminBookingList";
import UserList from "./components/admin/UserList";
import BookingList from "./components/BookingList";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />
        {/* Protected Routes inside Layout */}
        <Route path="/" element={<ProtectedRoutes><Layout><CarList/></Layout></ProtectedRoutes>}/>
        <Route path="/profile" element={<ProtectedRoutes><Layout><Profile/></Layout></ProtectedRoutes>}/>
        <Route path="/car/:id" element={<ProtectedRoutes><Layout><CarDetail/></Layout></ProtectedRoutes>}/>
        <Route path="/booking/" element={<ProtectedRoutes><Layout><BookingList/></Layout></ProtectedRoutes>}/>
        <Route path="/admin/addcar" element={<AdminRoutes><Layout><AddCar/></Layout></AdminRoutes>}/>
        <Route path="/admin/editcar/:id" element={<AdminRoutes><Layout><EditCar/></Layout></AdminRoutes>}/>
        <Route path="/admin/bookings" element={<AdminRoutes><Layout><AdminBookingList/></Layout></AdminRoutes>}/>
        <Route path="/admin/users" element={<AdminRoutes><Layout><UserList/></Layout></AdminRoutes>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
