import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { Container, TextField, Box } from '@mui/material';
import './App.css';
import './styles.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleSubmit = (user) => {
    if (isEditing) {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
        .then((response) => {
          const updatedUsers = users.map((u) =>
            u.id === user.id ? { ...u, ...response.data } : u
          );
          setUsers(updatedUsers);
          setFilteredUsers(
            updatedUsers.filter((u) =>
              u.name.toLowerCase().includes(searchTerm) || u.email.toLowerCase().includes(searchTerm)
            )
          );
          setIsEditing(false);
          setCurrentUser(null);
        })
        .catch((error) => console.error('Error updating user:', error));
    } else {
      axios
        .post('https://jsonplaceholder.typicode.com/users', user)
        .then((response) => {
          const newUser = { ...response.data, id: users.length + 1 };
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        })
        .catch((error) => console.error('Error adding user:', error));
    }
  };

  return (
    <Container maxWidth="lg">
      <Box mb={2} marginTop={2}>
        <TextField
          fullWidth
          label="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
        />
      </Box>
      <UserList users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      <UserForm currentUser={currentUser} onSubmit={handleSubmit} />
    </Container>
  );
}

export default App;


