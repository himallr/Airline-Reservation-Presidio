import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = ({ OnSubmit, isAdmin }) => {
    const [signin, setSignin] = useState(true);
    const [inputs, setInput] = useState({
        Name: "",
        Email: "",
        Password: "",
    });

    const handlechange = (e) => {
        e.preventDefault();
        setInput((prevstate) => ({
            ...prevstate, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        OnSubmit({ inputs, signup: isAdmin ? false : signin })

    }

    return (
        <Container className="mt-5">
            
            <div className="w-60 mx-auto p-4 border rounded">
                {signin ? <div className='h3 text-center'>LOGIN PAGE</div> : <div className='h3 text-center'>SIGNUP PAGE</div>}
                <Form style={{ maxWidth: '300px', margin: '0 auto' }} onSubmit={handleSubmit}>
                    {!signin &&
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name..."
                                value={inputs.Name}
                                onChange={handlechange}
                                name='Name'
                                required
                            />
                        </Form.Group>
                    }

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email..."
                            value={inputs.Email}
                            onChange={handlechange}
                            name='Email'
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password..."
                            value={inputs.Password}
                            onChange={handlechange}
                            name='Password'
                            required
                        />
                    </Form.Group>
                    {!isAdmin ? <>
                        {signin ?
                            <div class="col">
                                Create an account? <Link to="" className='text-secondary' onClick={() => setSignin(false)}>Signup</Link>
                            </div>
                            :
                            <div class="col">
                                Already have an account?<Link className='text-secondary' onClick={() => setSignin(true)}>login</Link>
                            </div>
                        }
                    </>
                        :
                        <></>
                    }

                    <div className="text-center mt-3">
                        <Button variant="secondary" type="submit">
                            {signin ? <span>Login</span> : <span>Signup</span>}
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default Login;
