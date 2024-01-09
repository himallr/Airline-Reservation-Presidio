import React, { useEffect, useState } from 'react'
import { getFlights } from './ApiHelpers'

const ViewFlights = () => {

    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getFlights()
            .then((data) => {
                setFlights(data.flights)
            })
    }, [])

    return (
        <div className='conatiner'>
            <div className='row px-4 mt-5 mb-5'>
                <h2 className='text-primary text-bold text-center'>View Flights</h2>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Flight No.</th>
                            <th>Flight Name</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Flight Class</th>
                            <th>Check In</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {flights && flights.map((item, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{item.Flight_No}</td>
                                    <td className="p-3">{item.Flight_Name}</td>
                                    <td className="p-3">{item.Source}</td>
                                    <td className="p-3">{item.Destination}</td>
                                    <td className="p-3">{item.Classes}</td>
                                    <td className="p-3">{item.Timings}</td>
                                    <td className="p-3">{item.Pricing}</td>
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

export default ViewFlights
