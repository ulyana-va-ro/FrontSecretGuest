import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getBookingHistory } from '../api/guestApi';
import { getHotels } from '../api/hotels';
import type { Booking } from '../api/typesPython';
import type { Hotel } from '../api/typesGo';
import HotelCard from '../components/HotelCard';

const СompletedTravel: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const guest_id = storedUser ? JSON.parse(storedUser).id : null;
    if (guest_id) {
      Promise.all([
        getBookingHistory(guest_id),
        getHotels()
      ]).then(([bookingData, hotelsData]) => {
        setBookings(bookingData);
        setHotels(hotelsData.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (!bookings.length) {
    return <Typography>Завершённых поездок не найдено</Typography>;
  }

  return (
    <Box>
      {bookings.map((booking) => {
        const hotel = hotels.find(h => h.id === booking.hotel_id);
        return hotel ? (
          <HotelCard key={booking.id} hotel={hotel} />
        ) : (
          <Box key={booking.id} sx={{ mb: 2 }}>
            <Typography>Отель с ID {booking.hotel_id} не найден</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default СompletedTravel;