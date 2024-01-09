import React, { useEffect, useState } from 'react'
import { getFlights } from './ApiHelpers'
import { useNavigate } from 'react-router-dom';

const BookFlight = (props) => {

    console.log(props);
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFlights()
            .then((data) => {
                setFlights(data.flights)
            })
    }, [])

    const handleBook = (id) => {
        navigate(`/Book/${id}`)
    }
    return (
        <div className='conatiner'>
            <div className='row mt-5 px-4 mb-5'>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Flight No</th>
                            <th>Flight Name</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Flight class</th>
                            <th>Price</th>
                            <th>Book Flights</th>
                        </tr>
                    </thead>
                    {props.flights.length === 0 && flights ? flights.map((item, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{item.Flight_No}</td>
                                    <td className="p-3">{item.Flight_Name}</td>
                                    <td className="p-3">{item.Source}</td>
                                    <td className="p-3">{item.Destination}</td>
                                    <td className="p-3">{item.Classes}</td>
                                    <td className="p-3">{item.Pricing}</td>
                                    <td className="p-3"><button onClick={() => handleBook(item._id)} className='btn btn-outline-success'>book</button></td>
                                </tr>
                            </tbody>
                        )
                    })
                        :
                        props.flights && props.flights.map((item, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{item.Flight_No}</td>
                                        <td className="p-3">{item.Flight_Name}</td>
                                        <td className="p-3">{item.Source}</td>
                                        <td className="p-3">{item.Destination}</td>
                                        <td className="p-3">{item.Classes}</td>
                                        <td className="p-3">{item.Pricing}</td>
                                        <td className="p-3"><button onClick={() => handleBook(item._id)} className='btn btn-outline-success'>book</button></td>
                                    </tr>
                                </tbody>
                            )
                        })

                    }
                </table>
            </div>
        </div>
    )
}

export default BookFlight
