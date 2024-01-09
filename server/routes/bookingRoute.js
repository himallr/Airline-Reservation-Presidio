
import express from "express";
import { createBooking, getAllBookings, getBooking, deleteBookings, findBookingsByUserId } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.get("/:id", getBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/fromUser/:id", findBookingsByUserId);
bookingRouter.post("/", createBooking);
bookingRouter.delete("/Cancel/:id", deleteBookings);

export default bookingRouter;