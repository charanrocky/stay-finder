import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ListingDetail from "../pages/ListingDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HostDashboard from "../pages/HostDashboard";
import MyBookings from "../pages/MyBookings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing/:id" element={<ListingDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/host-dashboard" element={<HostDashboard />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
}
