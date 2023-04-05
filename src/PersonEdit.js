import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import './PersonEdit.css';

const PersonEdit = () => {

    const initialFormState = {
        name: '',
        birth: '',
        mother: '',
        taj: 0,
        tax: 0,
        email: '',
        address: '',
        phone: '',
    };
    const [person, setPerson] = useState(initialFormState);
    const navigate = useNavigate();
    const errorMessageName = "Please use 1-20 characters and only letters"
    const errorMessagPositiveNumber = "Must be a positiv integer"

    const handleChange = (event) => {
        let {name, value} = event.target
        setPerson({...person, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(person)

        await fetch(`/api/person`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person),
        });
        setPerson(initialFormState);
        navigate('/persons');
    }

    return (

                <Container>
                    <h2 className="person-edit-header">Add Person</h2>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input autoFocus={true} type="text" name="name" id="name"
                                   onChange={handleChange} required={true} pattern='^[A-Za-z]{1,20}$'
                                  />
                            <div className="form-error-message">
                                <span>{errorMessageName}</span>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="birth">Day of birth</Label>
                            <Input type="date" name="birth" id="brith"
                                   onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="mother">Mother's name</Label>
                            <Input type="text" name="mother" id="mother"
                                   onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="taj">TAJ Id</Label>
                            <Input type="number" name="taj" id="taj"
                                   onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="tax">TAX Id</Label>
                            <Input type="number" name="tax" id="tax"
                                   onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email"
                                   onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" id="address"
                                   onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input type="text" name="phone" id="phone"
                                   onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/persons">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
    )
};

export default PersonEdit;