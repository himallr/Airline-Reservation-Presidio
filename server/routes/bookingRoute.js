//CRUD operations for Bookings

import express from "express";
import { createBooking, getAllBookings, getBooking ,deleteBookings } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

//userRouter.post("/addmovies", getAllUsers); //localhost:3001/user/allusers (from index.js)
bookingRouter.post("/", createBooking);
bookingRouter.get("/:id",getBooking);
bookingRouter.get("/",getAllBookings);
bookingRouter.delete("/Cancel/:id",deleteBookings);

export default bookingRouter;