import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    bookings:[{
        type: mongoose.Types.ObjectId,
        ref: "Bookings",
        required: true,
    }]
})

export default mongoose.model("User",userSchema);