import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    Age: {
        type: Number,
        required: true
    },
    Phn_No: {
        type: Number,
        required: true
    }
});

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
        },
        Passenger: passengerSchema,
    }
);

export default mongoose.model("Bookings", Bookingsdb);