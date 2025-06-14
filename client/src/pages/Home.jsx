import React, { useState, useEffect } from "react";
import { getListings } from "../services/listingService";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    maxPrice: "",
    date: "",
  });

  const loadListings = async () => {
    const all = await getListings();
    const filtered = all.filter((listing) => {
      const matchesLocation = filters.location
        ? listing.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        : true;
      const matchesPrice = filters.maxPrice
        ? listing.price <= parseFloat(filters.maxPrice)
        : true;
      const matchesDate = true; // Add availability logic if needed
      return matchesLocation && matchesPrice && matchesDate;
    });
    setListings(filtered);
  };

  useEffect(() => {
    loadListings();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filter Bar */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-center">
        <input
          type="text"
          name="location"
          placeholder="Search by location"
          className="border rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          className="border rounded-lg px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.maxPrice}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.date}
          onChange={handleChange}
        />
        <button
          onClick={() => setFilters({ location: "", maxPrice: "", date: "" })}
          className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-200 transition"
        >
          Clear
        </button>
      </div>

      {/* Listings */}
      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((l) => (
            <PropertyCard key={l._id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
