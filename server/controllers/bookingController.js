import mongoose from "mongoose";
import Bookings from "../models/bookingModel.js";
import User from "../models/userModel.js";
import flight from "../models/flightsModel.js";

export const createBooking = async (req, res, next) => {
    const { flights, date, no_of_seats, Passenger, user } = req.body;

    console.log(flights + " " + date + " " + no_of_seats + " " + Passenger.firstName + " " + Passenger.lastName + " " + user);
    let existflight;
    let existuser;

    try {
        existflight = await flight.findById(flights);
        existuser = await User.findById(user);
    }
    catch (e) {
        console.log("error");
    }

    if (!existflight) {
        return res.status(400).json({ message: "flight not found" });
    }
    if (!existuser) {
        return res.status(404).json({ message: "No user found" })
    }
    let newbooking;
    try {
        const remainingSeats = existflight.Max_seats - no_of_seats;

        if (remainingSeats < 0) {
            return res.status(400).json({ message: "Not enough seats available" });
        }
        newbooking = new Bookings({ flights, date, no_of_seats, Passenger, user });
        console.log(newbooking);
        const session = await mongoose.startSession();
        session.startTransaction();
        existflight.bookings.push(newbooking);
        existuser.bookings.push(newbooking);
        existflight.Max_seats = remainingSeats;
        await existuser.save({ session });
        await existflight.save({ session });
        await newbooking.save({ session });
        session.commitTransaction();
    } catch (e) {
        console.log(e);
    }
    if (!newbooking) {
        return res.status(400).json({ message: "unable to create" });
    }
    return res.status(200).json({ newbooking });
}

export const getBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {

        booking = await Bookings.findById(id);
    }
    catch (e) {
        console.log(e);
    }

    if (!booking) {
        return res.status(500).json({ message: "No Bookings found" });
    }
    return res.status(200).json({ booking });
}

export const getAllBookings = async (req, res, next) => {
    let bookings;
    try {
        bookings = await Bookings.find().populate("user flights");

    } catch (e) {
        console.log(e);
    }

    if (!bookings) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ bookings });
}

export const findBookingsByUserId = async (req, res, next) => {
    let bookings;
    const userID = req.params.id;
    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(500).json({ message: "User Not Found" });
        }

        bookings = await Bookings.find({ user: userID }).populate("flights");
        console.log(bookings);

    } catch (e) {
        console.log(e);
    }
    if (!bookings) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ bookings });
};

export const deleteBookings = async (req, res, next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Bookings.findByIdAndDelete(id).populate("user flights");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        booking.flights.Max_seats += booking.no_of_seats;
        await booking.user.bookings.pull(booking);
        await booking.flights.bookings.pull(booking);
        await booking.flights.save({ session });
        await booking.user.save({ session });
        session.commitTransaction();
    }
    catch (e) {
        console.log(e);
    }
    if (!booking) {
        return res.status(500).json({ message: "Unable to Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
}