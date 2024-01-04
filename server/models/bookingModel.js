import mongoose from "mongoose";

const Bookingsdb = new mongoose.Schema(
    {
        flights: {
            type: mongoose.Types.ObjectId,
            ref: "Flight",
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        no_of_seats: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    }
);

export default mongoose.model("Bookings", Bookingsdb);