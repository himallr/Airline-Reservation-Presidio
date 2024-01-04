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
    const { Timings, Max_seats, Pricing } = req.body;
    const id = req.params.id;
    console.log(Pricing);
    let flights;
    try {
        flights = await flight.findByIdAndUpdate(id, { Timings, Max_seats, Pricing });
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
        const search = req.query.search || ""
        let sort = req.query.sort || "sort"
        let genre = req.query.genre || "All"

        const genreOpts = [
            "Fiction",
            "scific",
            "Fantasy",
            "Mystery",
            "Biography",
            "Horror",
        ];
        genre === "All" ? (genre = [...genreOpts]) : (genre = req.query.genre.split(","));
        req.query.rating ? (sort = req.query.sort.split(",")) : (sort = [sort])
        let sortby = {};
        if (sort[1]) {
            sortby[sort[0]] = sort[1];
        }
        else {
            sortby[sort[0]] = "asc";
        }

        const books = await flight.find({ BookName: { $regex: search, $options: "i" } })
            .where("Flight_Name")
            .in([...genre])
            .sort(sortby)
        const total = await flight.countDocuments({
            genre: { $in: [...genre] },
            name: { $regex: search, $options: "i" }
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            genres: genreOpts,
            books,
        };

        return res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
    }
}//later