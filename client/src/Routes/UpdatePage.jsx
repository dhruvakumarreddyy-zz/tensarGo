import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Userfinder from '../api/Userfinder';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const UpdatePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [status, setStatus] = useState('Active');
  useEffect(() => {
    const fetchData = async () => {
      const response = await Userfinder.get(`/${id}`);
      console.log('lllllllll');
      console.log(response);
      setUser(response.data.data.user.name);
      setEmail(response.data.data.user.email_id);
      setGender(response.data.data.user.gender);
      setStatus(response.data.data.user.status);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await Userfinder.put(`/${id}`, {
      name: user,
      email_id: email,
      gender: gender,
      status: status,
    });
    history.push('/');
  };
  return (
    <div>
      <Form>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for='exampleEmail'>Users </Label>
              <Input
                type='text'
                name='text'
                value={user}
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
                value={email}
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
                value={gender}
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
                value={status}
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
    </div>
  );
};

export default UpdatePage;
