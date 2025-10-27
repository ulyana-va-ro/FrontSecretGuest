import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { Box, } from "@mui/material";
import Menu from "./components/Menu";
import PrivateRoute from "./components/PrivateRoute";
import AuthPage from "./pages/AuthPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HotelPage from "./pages/HotelPage";
import CurrentTravelPage from "./pages/CurrentTravelPage";
import СompletedTravelPage from "./pages/СompletedTravelPage";
import SecretGuestPage from "./pages/SecretGuestPage";
import TravelPage from "./pages/TravelPage";
import BookingHotelPage from "./pages/BookingHotelPage";
import HotelReviewsPage from "./pages/HotelReviewsPage";
import ReportPage from "./pages/ReportPage";
import AdminPage from "./pages/AdminPage";

const RedirectDefault = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/profile" replace /> : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ width: "100%", height: "40px", background: "#FFFFFF" }}>
        <img src="/assets/logo.svg" alt="logo" />
      </Box>
      <Box sx={{ display: "flex", gap: 2, padding: "8px 10%", width: "100%" }}>
        <Box >
          <Menu/>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/hotel" element={<PrivateRoute><HotelPage /></PrivateRoute>} />
            <Route path="/current-travel" element={<PrivateRoute><CurrentTravelPage /></PrivateRoute>} />
            <Route path="/completed-travel" element={<PrivateRoute><СompletedTravelPage /></PrivateRoute>} />
            <Route path="/secret-guest" element={<PrivateRoute><SecretGuestPage /></PrivateRoute>} />
            <Route path="/travel" element={<PrivateRoute><TravelPage /></PrivateRoute>} />
            <Route path="/booking/:hotelId" element={<PrivateRoute><BookingHotelPage /></PrivateRoute>} />
            <Route path="/reviews/:hotelId" element={<PrivateRoute><HotelReviewsPage /></PrivateRoute>} />
            <Route path="/report" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            <Route path="*" element={<RedirectDefault />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;