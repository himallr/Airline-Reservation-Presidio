import React, { useEffect, useState } from 'react'
import { BookFlight, getFlightDetails } from './ApiHelpers';
import { useNavigate, useParams } from 'react-router-dom';

const Book = () => {
    const navigate = useNavigate();
    const [seats, setSeats] = useState('');
    const [booking, setBoooking] = useState({
        date: '',
        no_of_seats: '',
    });

    const [flight, setFlight] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getFlightDetails(id)
            .then((data) => {
                setFlight(data.flights)
            })
    }, [])

    console.log(flight);
    const handleChange = (e) => {
        setBoooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            if (booking.no_of_seats > flight.Max_seats) {
                setSeats("Maximum Seats is: " + flight.Max_seats)
            }
            else {
                // await BookFlight(id, booking, user);
                console.log(booking);
                navigate(`/Passenger/${id}`, { state: { bookingDetails: booking } })
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row mt-5 mb-4 d-flex justify-content-center'>
                <h1 className='text-center'>Flight Name: {flight.Flight_Name}</h1>
                <div className='col-md-8'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label h4">Date</label>
                            <input className="form-control" id="timings" type='date' name="date" value={flight.date} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookType" className="form-label h4">No.of.Seats in the flight:</label>
                            <input type="number" className="form-control" id="maxseats" name="no_of_seats" value={flight.no_of_seats} onChange={handleChange} />
                            {
                                seats && <h6 className='text-danger'>{seats}</h6>
                            }
                        </div>
                        <button type="button" className="btn btn-primary d-flex mx-auto" onClick={handleUpdate}>Next</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Book
