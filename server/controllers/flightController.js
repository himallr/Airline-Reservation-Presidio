import flight from "../models/flightsModel.js";
import Admin from "../models/adminModel.js";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

export const addFlight = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; //Bearer token
    if (!extractedToken) {
        return res.status(404).json({ message: "Token Not found" });
    }

    let adminId;

    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        }
        else {
            adminId = decrypted.id;
            return;
        }
    });

    const { Flight_No, Flight_Name, Source, Destination, Timings, Max_seats, Pricing, Passenger, Classes } = req.body;
    let flights;
    try {
        flights = new flight({ Flight_No, Flight_Name, Source, Destination, Timings, Max_seats, Pricing, Passenger, Classes });
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        console.log(adminUser);

        await flights.save({ session });
        adminUser.flights.push(flights);
        await adminUser.save({ session });
        await session.commitTransaction();
    }
    catch (e) {
        console.log(e);
    }
    console.log(flights);
    if (flights) {
        return res.status(200).json({ flights });
    }
    else {
        return res.status(500).json({ message: "Cannot able to add flights" });
    }
}

export const getFlight = async (req, res, next) => {
    let flights;
    try {
        flights = await flight.find();
    }
    catch (e) {
        console.log(e);
    }
    console.log(flights);
    if (flights) {
        return res.status(200).json({ flights });
    }
    return res.status(500).json({ Message: "No Flights available" });
}

export const getFlightByID = async (req, res, next) => {
    const id = req.params.id;
    let flights;
    try {
        flights = await flight.findById(id);
    }
    catch (e) {
        console.log(e);
    }
    console.log(flights);
    if (flights) {
        return res.status(200).json({ flights });
    }
    return res.status(500).json({ Message: "No Flights available" });
}

export const updateFlight = async (req, res) => {
    const { Flight_Name, Timings, Max_seats, Pricing } = req.body;
    const id = req.params.id;
    console.log(Pricing);
    let flights;
    try {
        flights = await flight.findByIdAndUpdate(id, { Flight_Name, Timings, Max_seats, Pricing });
        flights = await flights.save();
    }
    catch (e) {
        console.log(e);
    }
    if (flights) {
        return res.status(200).json({ flights });
    }
    else {
        return res.status(500).json({ Message: "Cannot Update" });
    }
}

export const deleteFlightSchedule = async (req, res, next) => {

    const id = req.params.id;
    let flights;
    try {
        flights = await flight.findByIdAndDelete(id);
        const session = await mongoose.startSession();
        session.startTransaction();
        await flights.admin.flights.pull(flights);
        await flights.admin.save({ session });
        session.commitTransaction();
    }
    catch (err) {
        console.log(err);
    }
    if (flights) {
        return res.status(200).json({ Message: "Successfully deleted" })
    }
    else {
        return res.status(500).json({ Message: "Could not find flight" })
    }
}

export const SearchFlight = async (req, res, next) => {
    try {
        const { source, destination, flightClass } = req.query;

        // Build the query object based on provided parameters
        const query = {};
        let formattedClass;
        if (source) query.Source = source;
        if (destination) query.Destination = destination;
        if (flightClass) {
            formattedClass = flightClass.replace(/([a-z])([A-Z])/g, '$1 $2');
            query.Classes = formattedClass;
        }

        console.log(query);

        // Execute the query
        const filteredFlights = await flight.find(query);

        res.status(200).json(filteredFlights);
    } catch (error) {
        console.error('Error filtering flights:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
