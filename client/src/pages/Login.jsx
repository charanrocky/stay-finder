import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, pw);
      nav("/");
    } catch {
      alert("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome back 👋
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
