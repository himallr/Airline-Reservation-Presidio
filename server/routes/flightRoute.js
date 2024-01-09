import express from 'express';
import { addFlight, updateFlight, getFlight, getFlightByID, deleteFlightSchedule, SearchFlight } from '../controllers/flightController.js';

const flightRoute = express.Router();

flightRoute.get("/", getFlight);
flightRoute.get("/:id", getFlightByID);
flightRoute.post("/addFlight", addFlight);
flightRoute.put("/updateFlight/:id", updateFlight);
flightRoute.delete("/delete/:id", deleteFlightSchedule);
flightRoute.get("/Search/SDD", SearchFlight);

export default flightRoute;
