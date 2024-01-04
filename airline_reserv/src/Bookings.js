import React, { useEffect, useState } from 'react'
import { cancelTicket, getBookings } from './ApiHelpers'

const Bookings = () => {
    const [bookings, setBookings] = useState('')
    useEffect(() => {
        getBookings()
            .then((data) => {
                setBookings(data.bookings);
            })
    }, [])
    console.log(bookings);

    const cancel = (id) => {
        cancelTicket(id)
        window.location.reload();
    }
    return (
        <div className='container'>
            <div className='row mt-4 text-center'>
                <h1>My Booking Infos.</h1>
                <div className='col-md-12'>
                    {
                        bookings && bookings.map((item) => {
                            return (
                                <div className="card mt-4 mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Flight Details: {item.flights.Flight_Name}</h5>
                                        <div className="card-text">
                                            <p className="mb-1">
                                                <strong>Flight Source:</strong> {item.flights.Source}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Flight Destination:</strong> {item.flights.Destination}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Date:</strong> {item.date}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Check In Time:</strong> {item.flights.Timings}
                                            </p>
                                            <p className="mb-1">
                                                <strong>Price:</strong> {item.flights.Pricing * item.no_of_seats}
                                            </p>
                                            <p className="mb-1">
                                                <strong>No.of.seats:</strong> {item.no_of_seats}
                                            </p>
                                        </div>
                                        <button className='btn btn-secondary' onClick={() => cancel(item._id)}>Cancel Ticket</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Bookings
