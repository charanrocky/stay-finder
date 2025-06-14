import api from "./api";

export const createBooking = (data) =>
  api.post("/bookings", data).then((res) => res.data);
export const getMyBookings = () =>
  api.get("/bookings/my").then((res) => res.data);
