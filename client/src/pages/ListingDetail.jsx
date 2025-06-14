import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getListingById } from "../services/listingService";
import { createBooking } from "../services/bookingService";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    getListingById(id).then((data) => setListing(data));
  }, [id]);

  const book = () => {
    createBooking({
      listing: id,
      startDate: new Date(),
      endDate: new Date(),
    }).then(() => alert("🎉 Booking successful!"));
  };

  if (!listing)
    return (
      <div className="text-center text-gray-500 py-20 text-xl">Loading...</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero Image */}
      <div className="rounded-xl overflow-hidden shadow-md mb-6">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Details */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            {listing.title}
          </h1>
          <p className="text-gray-600 text-lg">{listing.description}</p>
          <div className="text-gray-500">
            <span className="font-medium text-gray-700">Location:</span>{" "}
            {listing.location}
          </div>
        </div>

        {/* Right Column: Booking Box */}
        <div className="border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            ${listing.price}
            <span className="text-base font-normal text-gray-500">
              {" "}
              / night
            </span>
          </h2>

          {/* DatePickers could go here in real version */}
          <button
            onClick={book}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Book Now
          </button>

          <p className="text-sm text-gray-500 text-center">
            No date picker yet — default booking created on click
          </p>
        </div>
      </div>
    </div>
  );
}
