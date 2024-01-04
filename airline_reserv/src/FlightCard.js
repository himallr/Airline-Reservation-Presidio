import React, { useEffect, useState } from 'react'
import img1 from "./images/img1.avif";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpeg";
import "./FlightCard.css";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const FlightCard = () => {

    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

    return (
        <div className='container'>
            <div className='row mt-5 mb-5'>

                <div className='col-lg-4 col-md-2 col-sm-1 imgs1'>
                    {!isAdminLoggedIn ?
                        <Link to={isUserLoggedIn ? `/Book` : `/Login`}>
                            <div className='card'>
                                <img className='card-img-top image' src={img2}></img>
                                <div class="middle1">
                                    <div class="text">Book Flights here</div>
                                </div>
                            </div>
                        </Link>
                        :
                        <Link to="/addFlight">
                            <div className='card'>
                                <img className='card-img-top image' src={img2}></img>
                                <div class="middle1">
                                    <div class="text">Add Flights</div>
                                </div>
                            </div>
                        </Link>
                    }
                </div>
                <div className='col-lg-4 col-md-2 col-sm-1 imgs1'>
                    {!isAdminLoggedIn ?
                        <Link to={isUserLoggedIn ? `/Bookings` : `/Login`}>
                            <div className='card'>
                                <img className='card-img-top image' src={img3}></img>
                                <div class="middle1">
                                    <div class="text">Check your bookings</div>
                                </div>
                            </div>
                        </Link>
                        :
                        <Link to="/view">
                            <div className='card'>
                                <img className='card-img-top image' src={img3}></img>
                                <div class="middle1">
                                    <div class="text">Show Flight details</div>
                                </div>
                            </div>
                        </Link>
                    }
                </div>
                <div className='col-lg-4 col-md-2 col-sm-1 imgs1'>
                    {!isAdminLoggedIn ?
                        <Link to={isUserLoggedIn ? `/View` : `/Login`}>
                            <div className='card'>
                                <img className='card-img-top image' src={img1}></img>
                                <div class="middle1">
                                    <div class="text">View Flights here</div>
                                </div>
                            </div>
                        </Link>
                        :
                        <Link to="/View">
                            <div className='card'>
                                <img className='card-img-top image' src={img1}></img>
                                <div class="middle1">
                                    <div class="text">View Profile</div>
                                </div>
                            </div>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default FlightCard
