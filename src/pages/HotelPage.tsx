import { useEffect, useState, type SetStateAction } from "react";
import { Box, } from '@mui/material';
import { type Hotel } from '../api/typesGo';
import { getHotels } from '../api/hotels';
import HotelCard from "../components/HotelCard";
import { getHotelsMock } from "../mocks/mockApi";
import axios from "axios";

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchTerm = ""; 

  useEffect(() => {
    setLoading(true);
    getHotels()
      .then((res: { data: SetStateAction<Hotel[]>; }) => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setError("Ошибка при загрузке отелей");
        setLoading(false);
      });
  }, []);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Box>Загрузка...</Box>;
  if (error) return <Box>{error}</Box>;

  return (
    <Box>
      {filteredHotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </Box>
  );
};

export default HotelsPage;