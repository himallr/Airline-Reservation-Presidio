import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import flightRoute from './routes/flightRoute.js';
import AdminRouter from './routes/adminRoute.js';
import bookingRouter from './routes/bookingRoute.js';

dotenv.config();
const app = express();
app.use(cors({
    origin: ["https://airline-reservation-rho.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

app.use("/user", userRoute);
app.use("/admin", AdminRouter);
app.use("/flight", flightRoute);
app.use("/booking", bookingRouter);

mongoose.connect(`mongodb+srv://himallr2003:C2eeLdLT3yfyouz1@cluster0.mazfjhw.mongodb.net/test?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3001, () => {
            console.log("Connected to mongodb and Listening to port 3001");
        })
    })
    .catch((err) => { console.log(err); })
