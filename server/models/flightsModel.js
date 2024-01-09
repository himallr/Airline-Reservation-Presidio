import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    Flight_No: {
        type: Number,
        required: true,
        unique: true
    },
    Flight_Name: {
        type: String,
        required: true,
        unique: false
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