import React, { useState, useEffect } from "react";
import { getMyBookings } from "../services/bookingService";

export default function MyBookings() {
  const [bks, setBks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getMyBookings();
        setBks(data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        setError("Failed to load your bookings.");
      }
    };
    loadBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        My Bookings
      </h2>

      {error && <p className="text-red-600 text-center font-medium">{error}</p>}

      {bks.length === 0 && !error ? (
        <p className="text-gray-500 text-center">You have no bookings yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {bks.map((b) =>
            b?.listing ? (
              <div
                key={b._id}
                className="border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={b.listing?.image || "/placeholder.jpg"}
                  alt={b.listing?.title || "No Title"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {b.listing?.title || "Untitled"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {b.listing?.location || "Unknown Location"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">From:</span>{" "}
                    {b.startDate
                      ? new Date(b.startDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">To:</span>{" "}
                    {b.endDate
                      ? new Date(b.endDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <div key={b._id} className="text-red-500 text-sm">
                Invalid booking data.
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
