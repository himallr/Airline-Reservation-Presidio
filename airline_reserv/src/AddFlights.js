import React, { useState } from 'react'
import img from "../src/images/flight1.jpeg"
import { ToastContainer, toast } from 'react-toastify';
import { addFlight } from './ApiHelpers';
import { useNavigate } from 'react-router-dom';
const AddFlights = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        Flight_No: "",
        Flight_Name: "",
        Source: "",
        Destination: "",
        Timings: "",
        Max_seats: "",
        Pricing: "",
        Classes: ""
    });

    const handleChange = (e) => {
        let inputValue, isValidInput
        console.log(e.target.type);
        if (e.target.type === "text") {
            inputValue = e.target.value;
            isValidInput = /^[a-zA-Z\s]+$/.test(inputValue);
        }

        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

    };
    const showSuccessToast = (message) => {
        toast.success("Successfully Added the Fight");
    };

    console.log(inputs);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);

        addFlight({ ...inputs })
            .then((res) => {
                console.log(res);
                navigate("/ProfileAdmin")
                showSuccessToast("Successfully added")
            })
            .catch((err) => console.log(err));
    };

    return (
        <section classNameName="h-100 bg-dark">
            <ToastContainer
                position="top-center"
                autoClose="600"
            />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <form className="row g-0" onSubmit={handleSubmit}>
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img src={img}
                                        alt="Sample photo" className="img-fluid"
                                        style={{ width: '100%', height: '100%', "borderTopLeftradius": "0.25rem", "border-bottom-left-radius": ".25rem" }} />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase text-center">Adding Flight Schedules</h3>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1m">Flight No.</label>
                                                    <input value={inputs.Flight_No} onChange={handleChange} name="Flight_No" type="number" id="form3Example1m" className="form-control form-control-lg" />

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1n">Flight name*</label>
                                                    <input value={inputs.Flight_Name} onChange={handleChange} name="Flight_Name" type="text" id="form3Example1n" className="form-control form-control-lg" />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1m1">Source*</label>
                                                    <input value={inputs.Source} onChange={handleChange} name="Source" type="text" id="form3Example1m1" className="form-control form-control-lg" />

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1n1">Destination*</label>
                                                    <input value={inputs.Destination} onChange={handleChange} name="Destination" type="text" id="form3Example1n1" className="form-control form-control-lg" />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1m">Maximum Seats</label>
                                                    <input value={inputs.Max_seats} onChange={handleChange} name="Max_seats" type="number" id="form3Example1m" className="form-control form-control-lg" />

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1n">Pricing*</label>
                                                    <input value={inputs.Pricing} onChange={handleChange} name="Pricing" type="number" id="form3Example1n" className="form-control form-control-lg" />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1m">Timings*</label>
                                                    <input value={inputs.Timings} onChange={handleChange} name="Timings" type="time" id="form3Example1m" className="form-control form-control-lg" />

                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="form3Example1n">Classes</label>
                                                    <select className='form-select' value={inputs.Classes} onChange={handleChange} name='Classes'>
                                                        <option value="Business Class">Business Class</option>
                                                        <option value="Premium Class">Premium Class</option>
                                                        <option value="Business Premium Class">Business Premium Class</option>
                                                    </select>
                                                    {/* <input value={inputs.Classes} onChange={handleChange} name="Classes" type="text" id="form3Example1n" className="form-control form-control-lg" /> */}

                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center pt-3">
                                            <button type="submit" className="btn btn-success btn-lg ms-2">Add Flight</button>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddFlights
