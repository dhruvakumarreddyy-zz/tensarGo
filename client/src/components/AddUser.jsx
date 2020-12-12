import React, { useState, useContext } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Userfinder from '../api/Userfinder';
import { UsersContext } from '../context/UsersContext';

const AddUser = () => {
  const { addUsers } = useContext(UsersContext);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [status, setStatus] = useState('Active');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Userfinder.post('/', {
        name: user,
        gender: gender,
        email_id: email,
        status: status,
      });
      // addUsers(response.data.data.name);
    } catch (error) {}
  };
  return (
    <Form>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for='exampleEmail'>Users </Label>
            <Input
              type='text'
              name='text'
              placeholder='Enter User Name'
              onChange={(e) => setUser(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for='exampleEmail'>Email </Label>
            <Input
              type='email'
              name='email'
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for='exampleSelect'>Gender</Label>
            <Input
              type='select'
              name='select'
              id='exampleSelect'
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for='exampleSelect'>Status</Label>
            <Input
              type='select'
              name='select'
              id='exampleSelect'
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button onClick={handleSubmit} type='submit'>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddUser;
