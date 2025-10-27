import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import { getHotels } from '../api/hotels';
import { createBooking } from '../api/guestApi';
import type { Hotel } from '../api/typesGo';

const BookingHotelPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [roomId, setRoomId] = useState<number>(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    getHotels().then(res => {
      const found = res.data.find((h: Hotel) => h.id === Number(hotelId));
      setHotel(found || null);
      if (found && Array.isArray((found as any).rooms)) {
        setRooms((found as any).rooms);
        if ((found as any).rooms.length > 0) {
          setRoomId((found as any).rooms[0].id);
        }
      } else {
        setRooms([{ id: 1, name: "Номер 1" }, { id: 2, name: "Номер 2" }]);
        setRoomId(1);
      }
    });
  }, [hotelId]);

  const handleBookNow = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Необходима авторизация");
      return;
    }
    const user = JSON.parse(storedUser);
    if (!hotel) {
      alert("Отель не найден");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Выберите даты заезда и выезда");
      return;
    }

    try {
      await createBooking(user.id, {
        hotel_id: hotel.id,
        room_id: roomId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        total_price: totalPrice,
      });
      alert("Бронирование успешно создано!");
      navigate("/travel", { state: { tab: 1 } });
    } catch (e) {
      alert("Ошибка при бронировании");
    }
  };

  return (
    <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom>
        {hotel ? `Бронирование отеля: ${hotel.name}` : "Загрузка..."}
      </Typography>
      <TextField
        label="Дата заезда"
        type="date"
        fullWidth
        margin="normal"
        value={checkIn}
        onChange={e => setCheckIn(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Дата выезда"
        type="date"
        fullWidth
        margin="normal"
        value={checkOut}
        onChange={e => setCheckOut(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        select
        label="Номер"
        fullWidth
        margin="normal"
        value={roomId}
        onChange={e => setRoomId(Number(e.target.value))}
      >
        {rooms.map(room => (
          <MenuItem key={room.id} value={room.id}>
            {room.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Стоимость (необязательно)"
        type="number"
        fullWidth
        margin="normal"
        value={totalPrice ?? ''}
        onChange={e => setTotalPrice(Number(e.target.value))}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleBookNow}
      >
        Забронировать
      </Button>
    </Box>
  );
};

export default BookingHotelPage;