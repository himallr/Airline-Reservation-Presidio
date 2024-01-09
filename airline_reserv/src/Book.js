import React, { isValidElement, useEffect, useState } from 'react'
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

    const [errorMessages, setErrorMessages] = useState({
        date: '',
        seats: ''
    })

    console.log(flight);
    const handleChange = (e) => {
        setErrorMessages('');
        setBoooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const isValid = true;
            const selectedDate = booking.date;
            console.log(selectedDate);
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            console.log(formattedDate);
            if (booking.no_of_seats > flight.Max_seats) {
                setErrorMessages(prevErrors => ({ ...prevErrors, seats: 'Maximum seats is ' + flight.Max_seats }))
                isValid = false;
            }
            if (!booking.date || selectedDate < formattedDate) {
                setErrorMessages(prevErrors => ({ ...prevErrors, date: "Date is Empty or Enter after the current date" }))

                isValid = false;
            }
            if (isValid) {
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
                <h1 className='text-center'>{flight.Flight_Name} - {flight.Classes}</h1>
                <div className='col-md-8'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label h4">Date</label>
                            <input className="form-control" id="timings" type='date' name="date" value={flight.date} onChange={handleChange} />
                            {
                                errorMessages.date && <h6 className='text-danger'>{errorMessages.date}</h6>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookType" className="form-label h4">No.of.Seats in the flight:</label>
                            <input type="number" className="form-control" id="maxseats" name="no_of_seats" value={flight.no_of_seats} onChange={handleChange} />
                            {
                                errorMessages.seats && <h6 className='text-danger'>{errorMessages.seats}</h6>
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
