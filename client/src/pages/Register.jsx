import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, pw);
      nav("/");
    } catch {
      alert("❌ Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an account
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            placeholder="Full Name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
