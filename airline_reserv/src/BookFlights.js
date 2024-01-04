import React, { useState } from 'react'
import { getFlightName } from './ApiHelpers';

const BookFlights = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [booknames, setBookNames] = useState([]);
    const [name, setName] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNameChange = (event) => {
        const names = event.target.value
        setName(event.target.value);
        getFlightName(names).then((data) => { setBookNames(data.books) })
    };

    const options = ["Madurai", "Bengaluru", "Kolkata", "Chennai", "Pune", "Rajasthan", "Trichy"];

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-3'>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className='my-3'>
                                <input
                                    type="text"
                                    id="genre"
                                    value={name}
                                    onChange={handleNameChange}
                                    className='form-control border-3 border-success'
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='bg-secondary'>
                        <div className=''>Source</div>
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {selectedOption}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='bg-secondary'>
                        <div className=''>Destination</div>
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {selectedOption}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='bg-secondary'>
                        <div className=''>Timing</div>
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {selectedOption}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='bg-secondary'>
                        <div className=''>Source</div>
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {selectedOption}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookFlights
