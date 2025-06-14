import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="shadow-md sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-rose-500">
          StayFinder
        </Link>

        {/* Center search bar (optional) */}
        {/* 
        <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm">
          <input
            type="text"
            placeholder="Search destinations"
            className="outline-none text-sm text-gray-600"
          />
        </div>
        */}

        {/* Navigation */}
        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <Link to="/host-dashboard" className="hover:underline">
                Host Dashboard
              </Link>
              <Link to="/my-bookings" className="hover:underline">
                My Bookings
              </Link>
              <button
                onClick={logout}
                className="text-white bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-rose-500 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-rose-500 hover:bg-rose-600 px-4 py-1 rounded-full"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
