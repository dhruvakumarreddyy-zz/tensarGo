import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Userfinder from '../api/Userfinder';
import AddUser from '../components/AddUser';
import { UsersContext } from '../context/UsersContext';
const Home = (props) => {
  const history = useHistory();
  const { users, setUsers } = useContext(UsersContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Userfinder.get('/');
        setUsers(response.data.data.users);
      } catch (err) {
        console.error(err.msg);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (id) => {
    history.push(`/users/${id}/update`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Userfinder.delete(`/${id}`);
      setUsers(
        users.filter((user) => {
          return user.user_id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h4>Add users</h4>
      <hr />
      <AddUser />
      <h4>Users List</h4>
      <hr />
      <table className='table' id='usersTable'>
        <thead>
          <tr>
            <th scope='col'>User</th>
            <th scope='col'>Email</th>
            <th scope='col'>Gender</th>
            <th scope='col'>Status</th>
            <th scope='col'>Update</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email_id}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>
                  <Button
                    onClick={() => handleUpdate(user.user_id)}
                    color='warning'
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(user.user_id)}
                    color='danger'
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactHTMLTableToExcel
        id='usersTable'
        table='usersTable'
        filename='excelfile'
        sheet='sheet 1'
        buttonText='convert to csv'
      />
    </div>
  );
};

export default Home;
