import React, { useEffect, useState } from 'react'
import { BookFlight, getFlightDetails } from './ApiHelpers';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const PassengerDetails = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const bookingDetails = location.state?.bookingDetails;
    console.log(bookingDetails);

    const [passengerDetails, setPassengerDetails] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        Age: '',
        Phn_No: ''
    });
    const [flight, setFlight] = useState()

    const { id } = useParams();
    useEffect(() => {
        getFlightDetails(id)
            .then((data) => {
                setFlight(data.flights)
            })
    }, [])
    console.log(flight);
    console.log(passengerDetails);

    const handleChange = (e) => {
        setPassengerDetails({ ...passengerDetails, [e.target.name]: e.target.value });
    };

    const user = localStorage.getItem("UserID");
    const handleUpdate = async () => {
        try {
            await BookFlight(id, bookingDetails, passengerDetails, user);
            console.log(bookingDetails);
            navigate("/Bookings")
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div className='container'>
            <div className='row mt-5 mb-4 d-flex justify-content-center'>
                <h4 className='text-center pb-5'> {flight && flight.Flight_Name}</h4>
                <div className='col-md-8'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label h4">Enter your First Name:</label>
                            <input className="form-control" id="firstname" type='text' name="firstName" value={passengerDetails.firstName} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookType" className="form-label h4">Enter your Middle Name:</label>
                            <input type="text" className="form-control" id="middlename" name="middleName" value={passengerDetails.middleName} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookType" className="form-label h4">Enter your Last Name:</label>
                            <input type="text" className="form-control" id="lastname" name="lastName" value={passengerDetails.lastName} onChange={handleChange} />
                        </div>
                        <div className='row'>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="description" className="form-label h4">Enter your Age:</label>
                                <input className="form-control" id="age" type='number' name="Age" value={passengerDetails.Age} onChange={handleChange} max={80} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="description" className="form-label h4">Enter your Phone Number:</label>
                                <input className="form-control" id="phn" type='number' name="Phn_No" value={passengerDetails.Phn_No} onChange={handleChange} />
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary d-flex mx-auto mt-3" onClick={handleUpdate}>Update Flight Schedule</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PassengerDetails
