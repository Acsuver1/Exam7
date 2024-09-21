import React, { useState, useEffect } from 'react';
import { useUserQuery, useUserDeleteMutation } from "../../redux/api/userApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoriteIcon from '@mui/icons-material/Favorite'; 
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'; 
import CreateIcon from '@mui/icons-material/Add'; 
import './User.css'; 

const User = () => {
  const { data } = useUserQuery();
  const [likes, setLikes] = useState({});
  const [deleteUser] = useUserDeleteMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    setLikes(savedLikes);
  }, []);

  const handleDelete = (id) => {
    deleteUser(id);
    toast.success('User deleted successfully!');
  };

  const updateLocalStorage = (newLikes) => {
    localStorage.setItem('likes', JSON.stringify(newLikes));
  };

  const handleLike = (userId) => {
    const newLikes = {
      ...likes,
      [userId]: !likes[userId],
    };
    setLikes(newLikes);
    updateLocalStorage(newLikes);
    toast.success(newLikes[userId] ? 'You liked this user!' : 'You unliked this user!');
  };

  const handleCreateUser = () => {
    navigate('/dashboard'); 
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<CreateIcon />} 
        onClick={handleCreateUser} 
        sx={{ marginBottom: 2 }}
      >
        Create User
      </Button>
      <TableContainer className="TableContainer">
        <Table>
          <TableHead className="table-header">
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data?.data?.map((user) => (
                <TableRow key={user.id} className="MuiTableRow-root">
                  <TableCell>
                    <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} style={{ width: '50px', borderRadius: '50%' }} />
                  </TableCell>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="flex items-center space-x-2">
                      <IconButton className="icon-button" onClick={() => handleLike(user.id)}>
                        <FavoriteIcon color={likes[user.id] ? 'error' : 'action'} /> 
                      </IconButton>
                      {likes[user.id] ? 'Liked' : 'Not Liked'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center space-x-2">
                      <Link to={`/single/${user.id}`}>  
                        <Button variant="contained" className="MuiButton-contained" fullWidth>
                          View Users
                        </Button>
                      </Link>
                      <IconButton className="icon-button" onClick={() => handleDelete(user.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </span>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <ToastContainer />
    </Container>
  );
};

export default User;
