import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<h1>Unauthorized</h1>}/>

        {/* Protected Routes */}
        <Route
          path="/cars"
          element={
            <AuthProvider>
              <ProtectedRoutes>
                <Layout>
                  <CarList />
                </Layout>
              </ProtectedRoutes>
            </AuthProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthProvider>
              <ProtectedRoutes>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoutes>
            </AuthProvider>
          }
        />
        <Route
          path="/car/:id"
          element={
            <AuthProvider>
              <ProtectedRoutes>
                <Layout>
                  <CarDetail />
                </Layout>
              </ProtectedRoutes>
            </AuthProvider>
          }
        />
        <Route
          path="/booking/"
          element={
            <AuthProvider>
              <ProtectedRoutes>
                <Layout>
                  <BookingList />
                </Layout>
              </ProtectedRoutes>
            </AuthProvider>
          }
        />
        <Route
          path="/admin/addcar"
          element={
            <AuthProvider>
              <AdminRoutes>
                <Layout>
                  <AddCar />
                </Layout>
              </AdminRoutes>
            </AuthProvider>
          }
        />
        <Route
          path="/admin/editcar/:id"
          element={
            <AuthProvider>
              <AdminRoutes>
                <Layout>
                  <EditCar />
                </Layout>
              </AdminRoutes>
            </AuthProvider>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AuthProvider>
              <AdminRoutes>
                <Layout>
                  <AdminBookingList />
                </Layout>
              </AdminRoutes>
            </AuthProvider>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AuthProvider>
              <AdminRoutes>
                <Layout>
                  <UserList />
                </Layout>
              </AdminRoutes>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
