import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { filterSearch } from './ApiHelpers';
import BookFlight from './BookFlight';

const BookFlights = () => {
    const [flights, setFlight] = useState([]);
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        flightClass: 'Economy Class'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterSearch(formData.flightClass, formData.source, formData.destination)
            .then((data) => {
                console.log(data);
                setFlight(data);
            })
        console.log(formData);
    };

    const places = ["Madurai","Mumbai", "Chennai", "Delhi", "Kolkata", "Bangalore", "Pune", "Hyderabad", "Virudhunagar"]

    console.log(places);
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <h2 className='text-center text-primary text-bold'>Book Details</h2>
                        <Form.Group controlId="source">
                            <Form.Label>Source</Form.Label>
                            <Form.Select
                                type="text"
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                required
                            >
                                {
                                    places && places.map((data) => {
                                        return <option value={data}>{data}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="destination">
                            <Form.Label>Destination</Form.Label>
                            <Form.Select
                                type="text"
                                name="destination"
                                value={formData.destination}
                                onChange={handleChange}
                                required
                            >
                                {
                                    places && places.map((data) => {
                                        return <option value={data}>{data}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="flightClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Select
                                name="flightClass"
                                value={formData.flightClass}
                                onChange={handleChange}
                            >
                                <option value="Economy Class">Economy Class</option>
                                <option value="Business Class">Business Class</option>
                                <option value="Business Premium Class">Business Premium Class</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button className='mt-3 text-center' variant="primary" type="submit">
                                View Flights
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            {
                flights &&
                <BookFlight flights={flights} />
            }
        </Container>
    );
};

export default BookFlights;
