import api from "./api";

export const getListings = () => api.get("/listings").then((res) => res.data);
export const getListingById = (id) =>
  api.get(`/listings/${id}`).then((res) => res.data);
export const createListing = (data) =>
  api.post("/listings", data).then((res) => res.data);
export const updateListing = (id, data) =>
  api.put(`/listings/${id}`, data).then((res) => res.data);
export const deleteListing = (id) =>
  api.delete(`/listings/${id}`).then((res) => res.data);
