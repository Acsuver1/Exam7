import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetailsQuery } from "../../redux/api/userApi";
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Details = () => {
  const { id } = useParams(); 
  const { data, error, isLoading } = useDetailsQuery(id); 

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading user details</Typography>;
  if (!data) return <Typography>User not found</Typography>;

  const user = data.data; // Assuming the response contains the user object directly

  return (
    <Container sx={{ marginTop: 5 }}>
      <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Job: {user.job} {/* Assuming job is part of the user object */}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Details;
