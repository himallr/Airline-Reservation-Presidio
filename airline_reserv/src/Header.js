import React from 'react'
import { Link } from 'react-router-dom';
import { adminActions, userActions } from './Store.js';
import { useDispatch, useSelector } from 'react-redux';
import logo from "./images/airline.jpg";

const Header = () => {
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

    const logout = () => {
        dispatch(userActions.logout())
    }

    const Adminlogout = () => {
        dispatch(adminActions.logout())
    }
    console.log(isUserLoggedIn);
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white px-3" style={{ "paddingLeft": "0px", "position": "sticky", "boxShadow": "0 6px 4px rgba(0,1,0.2,0.3)" }}>
            <Link to="/" className="navbar-brand text-secondary">
                <img className="rounded-circle my-3" src={logo} height={50} width={100}></img>

            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon color-white"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form>
                    <ul className="form-inline navbar-nav mr-auto">
                        {isUserLoggedIn &&
                            <ul className='navbar-nav mr-auto'>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/View">Flight Schedules</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/BookFlights">Book Flights</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/Bookings">Bookings</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/" onClick={logout}>Logout</Link>
                                </li>
                            </ul>
                        }
                        {isAdminLoggedIn &&
                            <ul className='navbar-nav mr-auto'>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/addFlight">Add Flights</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/ProfileAdmin">Profile</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/" onClick={Adminlogout}>Logout</Link>
                                </li>
                            </ul>
                        }
                        {!isAdminLoggedIn && !isUserLoggedIn &&
                            < ul className='navbar-nav mr-auto'>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/User">Login</Link>
                                </li>
                                <li className="nav-item mx-2 my-2">
                                    <Link className="nav-link text-black" to="/Admin">Admin</Link>
                                </li>
                            </ul>
                        }
                    </ul>
                </form>
            </div>
        </nav >
    )
}

export default Header
