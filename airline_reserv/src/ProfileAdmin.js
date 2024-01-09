import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAdminById, removeFlight } from './ApiHelpers';

const ProfileAdmin = () => {
    const navigate = useNavigate();
    const [flights, setFlights] = useState();
    const id = localStorage.getItem("AdminID")

    useEffect(() => {
        getAdminById(id)
            .then((datas) => {
                setFlights(datas.admins)
            })
    }, [])
    console.log(flights);
    console.log(id);

    const handleDelete = (id) => {
        console.log(id);
        window.location.reload();
        removeFlight(id)
    }
    const handleUpdate = (id) => {
        navigate(`/Update/${id}`)
    }

    const showSuccessToast = (message) => {
        toast.success(message);
    };

    const name = flights && flights.Name;
    const email = flights && flights.Email;

    return (
        <div className='container'>
            <ToastContainer
                position="top-center"
            />
            <div className='row'>
                <div className='col-md-3 my-5'>
                    <div className='d-flex flex-column'>
                        <h4 className='text-bold'>Username:<span className='h5'>{name}</span></h4>
                        <h4 className='text-bold'>Email:<span className='h5'>{email}</span></h4>
                    </div>
                </div>
                <div className='col-md-12'>
                    <h2 className='text-primary text-bold mb-4 text-center'>Flights Added</h2>
                    <div className='table-responsive'>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr style={{ background: 'green', color: 'green' }}>
                                    <th>S.No</th>
                                    <th>Flight No</th>
                                    <th>Flight Name</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Maximum Seats</th>
                                    <th>Time</th>
                                    <th>Price</th>
                                    <th>Class</th>
                                    <th>Updation</th>
                                    <th>Deletion</th>
                                </tr>
                            </thead>
                            {
                                flights && flights.flights.map((item, index) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{item.Flight_No}</td>
                                                <td className="p-3">{item.Flight_Name}</td>
                                                <td className="p-3">{item.Source}</td>
                                                <td className="p-3">{item.Destination}</td>

                                                <td className="p-3">{item.Max_seats}</td>
                                                <td className="p-3">{item.Timings}</td>
                                                <td className="p-3">{item.Pricing}</td>
                                                <td className="p-3">{item.Classes}</td>
                                                <td className="p-3"><button onClick={() => handleUpdate(item._id)} className='btn btn-outline-success'>Edit</button></td>
                                                <td className="p-3"><button onClick={() => handleDelete(item._id)} className='btn btn-danger'>Delete</button></td>
                                            </tr>
                                        </tbody>

                                    )
                                }
                                )
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAdmin
