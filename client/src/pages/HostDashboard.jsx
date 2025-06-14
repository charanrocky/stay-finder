import React, { useState, useEffect } from "react";
import {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} from "../services/listingService";

export default function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    location: "",
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    try {
      const data = await getListings();
      setListings(data);
    } catch (err) {
      console.error("Failed to load listings", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? +value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateListing(editId, form);
      } else {
        await createListing(form);
      }
      setForm({
        title: "",
        description: "",
        price: "",
        image: "",
        location: "",
      });
      setEditId(null);
      load();
    } catch (err) {
      console.error("Submit error", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editId ? "Edit Listing" : "Create a New Listing"}
      </h2>

      {/* Listing Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-10 space-y-4"
      >
        {["title", "description", "price", "image", "location"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring focus:ring-blue-300"
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {editId ? "Update Listing" : "Create Listing"}
        </button>
      </form>

      {/* Listing List */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Your Listings
      </h3>
      <div className="grid sm:grid-cols-2 gap-6">
        {listings.map((l) => (
          <div
            key={l._id}
            className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              src={l.image}
              alt={l.title}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h4 className="text-lg font-bold">{l.title}</h4>
            <p className="text-gray-500 mb-2">{l.location}</p>
            <p className="text-gray-700 font-semibold">${l.price}/night</p>
            <div className="mt-3 flex gap-4">
              <button
                onClick={() => {
                  setForm({
                    title: l.title,
                    description: l.description,
                    price: l.price,
                    image: l.image,
                    location: l.location,
                  });
                  setEditId(l._id);
                }}
                className="text-blue-600 font-medium hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteListing(l._id).then(load)}
                className="text-red-500 font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
