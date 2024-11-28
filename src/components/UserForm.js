import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Grid } from '@mui/material';

function UserForm({ onSubmit, currentUser }) {
  const [user, setUser] = useState({ name: '', email: '', company: { name: '' } });
  const [errors, setErrors] = useState({});

  // Populate form when editing a user
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser({ name: '', email: '', company: { name: '' } });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'company') {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = 'Name is required';
    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!user.company.name.trim()) newErrors.company = 'Department is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(user);
      setUser({ name: '', email: '', company: { name: '' } });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setUser({ name: '', email: '', company: { name: '' } });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            name="name"
            label="Full Name"
            value={user.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={user.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            name="company"
            label="Department"
            value={user.company.name}
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {currentUser ? 'Update User' : 'Add User'}
            </Button>
          </Grid>
          {currentUser && (
            <Grid item xs={6}>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleReset}
              >
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
}

export default UserForm;
