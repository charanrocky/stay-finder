import React from "react";
import { useNavigate } from "react-router-dom";

export default function PropertyCard({ listing }) {
  const nav = useNavigate();

  return (
    <div
      onClick={() => nav(`/listing/${listing._id}`)}
      className="cursor-pointer rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition duration-200 bg-white"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold text-gray-800 truncate">
            {listing.title}
          </h3>
          <p className="text-sm font-medium text-gray-900">
            ${listing.price}
            <span className="text-sm font-normal text-gray-500"> / night</span>
          </p>
        </div>
        {listing.location && (
          <p className="text-sm text-gray-500 mt-1">{listing.location}</p>
        )}
      </div>
    </div>
  );
}
