import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <AppRoutes />
      </div>
    </div>
  );
}
