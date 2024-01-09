import React, { useEffect, useState } from 'react'
import { cancelTicket, getBookingsfromUser } from './ApiHelpers'

const Bookings = () => {
    const [bookings, setBookings] = useState('')
    const id = localStorage.getItem("UserID")
    useEffect(() => {
        getBookingsfromUser(id)
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
                                    <div className="card-body row">
                                        <div className="col-md-6">
                                            <h5 className="card-title">Flight Details: {item.flights.Flight_Name}</h5>
                                            <div className="card-text border-right">
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
                                        </div>
                                        <div className='col-md-6'>
                                            <h5 className="card-title">Passenger Details: </h5>
                                            <div className="card-text">
                                                <p className="mb-1">
                                                    <strong>Passenger Name:</strong> {item.Passenger && item.Passenger.firstName + " " + item.Passenger.lastName}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Age:</strong> {item.Passenger && item.Passenger.Age}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Phone Number:</strong> {item.Passenger && item.Passenger.Phn_No}
                                                </p>
                                            </div>
                                            <button className='btn btn-secondary' onClick={() => cancel(item._id)}>Cancel Ticket</button>
                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }
                    {
                        bookings == '' &&
                        <h5 className='text-mute mt-5 mb-5'>-- No Bookings Found --</h5>
                    }
                </div>
            </div>
        </div>
    )
}

export default Bookings
