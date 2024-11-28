import React, { useState} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Pagination, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserList({ users, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const displayedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name.split(' ')[0]}</TableCell>
                <TableCell>{user.name.split(' ')[1]}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(user.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Paper>
  );
}

export default UserList;
