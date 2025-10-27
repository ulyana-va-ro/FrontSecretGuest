import React  from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from '@mui/material';
import type { Hotel } from '../api/typesGo';

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/reviews/${hotel.id}`);
  };
  
  const handleBookingClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigate(`/booking/${hotel.id}`); 
  };

  let ratingColor = '';
  if (hotel.rating >= 7) {
    ratingColor = 'green';
  } else if (hotel.rating >= 4) {
    ratingColor = 'orange';
  } else {
    ratingColor = 'red';
  }

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Card sx={{ display: 'flex', position: 'relative', width: "100%", borderRadius: 1, cursor: "pointer" }}
            onClick={handleCardClick}
      >
        <CardMedia
            component="img"
            sx={{ width: 300, height: 150 }}
            image="/assets/hotel2.png"
            alt={hotel.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography component="div" variant="h5">
                      {hotel.name}
                  </Typography>
              </Stack>
              <Typography variant="h6">
                  {/* ${hotel.price} */}
                  {/* Цена по запросу */}
                  {hotel.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  {/* {hotel.reviewCount} reviews */}
                   {hotel.description}
              </Typography>
          </CardContent>
        </Box>
        <Box
            sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: ratingColor,
                color: 'white',
                borderRadius: 1,
                padding: 1,
                fontSize: '0.8rem',
                fontWeight: 'bold',
                zIndex: 1,
            }}
          >
            {hotel.rating.toFixed(1)}
        </Box>
        <Box sx={{ mt: "auto", p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleBookingClick}>
            Забронировать
          </Button>
        </Box>
      </Card>
      {/* <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
          ml: 'auto',
          bgcolor: 'secondary.main',
          p: 1,
          borderRadius: 1
      }}>
          <Typography variant="subtitle1">Условия участия</Typography>
          <Typography variant="body2">{hotel.benefits}</Typography>
      </Box> */}
    </Box>
  );
};

export default HotelCard;