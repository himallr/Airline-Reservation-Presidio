import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFlightDetails, updateFlights } from './ApiHelpers';

const UpdateFlight = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [flight, setFlight] = useState({
        Timings: '',
        Max_seats: '',
        Pricing: '',
    });

    console.log(flight);
    
    // Fetch the book details when the component mounts
    useEffect(() => {
        const fetchFlightDetails = async () => {
            try {
                const flightDetails = await getFlightDetails(id);
                setFlight(flightDetails.flights);
                console.log(flight,"id");
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchFlightDetails();
    }, [id]);

    console.log(flight);
    
    const handleChange = (e) => {
        setFlight((prevFlight)=>({ ...prevFlight, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async () => {
        try {
            const fli = await updateFlights(id, flight);
            console.log(flight);
            navigate("/ProfileAdmin")
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className='text-success text-bold mt-5 mb-4 text-center'>Update Flight Schedule</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Timings</label>
                    <input className="form-control" id="timings" name="Timings" value={flight.Timings} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="bookType" className="form-label">Maximum Seats for the flight:</label>
                    <input type="number" className="form-control" id="maxseats" name="Max_seats" value={flight.Max_seats} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Price</label>
                    <input type="number" className="form-control" id="pricing" name="Pricing" value={flight.Pricing} onChange={handleChange} />
                </div>
                <button type="button" className="btn btn-primary d-flex mx-auto" onClick={handleUpdate}>Update Flight Schedule</button>
            </form>
        </div>
    );
};

export default UpdateFlight;
