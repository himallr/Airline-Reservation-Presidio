import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    flights: [{
        type: mongoose.Types.ObjectId,
        ref: "Flight",
        required: true,
    }]
})

export default mongoose.model("Admin", adminSchema);