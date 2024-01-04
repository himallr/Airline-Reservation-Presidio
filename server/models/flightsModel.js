import mongoose from 'mongoose';

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
});

const flightSchema = new mongoose.Schema({
    Flight_No: {
        type: Number,
        required: true,
        unique: true
    },
    Flight_Name: {
        type: String,
        required: true,
    },
    Source: {
        type: String,
        required: true,
    },
    Destination: {
        type: String,
        required: true,
    },
    Timings: {
        type: String,
        required: true,
    },
    Max_seats: {
        type: Number,
        required: true,
    },
    Pricing: {
        type: Number,
        required: true,
    },
    Passenger: passengerSchema,
    Classes: {
        type: String,
        required: true,
    },
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: "Bookings",
        required: true,
    }]
})

export default mongoose.model("Flight", flightSchema);