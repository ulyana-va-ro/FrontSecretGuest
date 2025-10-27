import React, { useEffect, useState, type SetStateAction } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  AppBar, 
  Tabs, 
  Tab,
  Card,
  CardMedia,
  CardContent,
  Stack
} from '@mui/material';
import ReportPage from "./ReportPage";
import { getHotels } from '../api/hotels';
import type { Hotel } from '../api/typesGo';

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/reviews/${hotel.id}`);
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
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
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
        {/* <Box sx={{ mt: "auto", p: 2 }}>
          <Button variant="contained" color="primary" >
            Удалить
          </Button>
        </Box> */}
      </Card>
      {/* <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 100,
          ml: 'auto',
          bgcolor: 'secondary.main',
          p: 1,
          borderRadius: 1
      }}>
          <Typography variant="body2">{hotel.priority}</Typography>
      </Box> */}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminPanel: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

    if (loading) return <Box>Загрузка...</Box>;
    if (error) return <Box>{error}</Box>;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ mt: 2, mb: 2, borderRadius: 1 }}>
          <Tabs value={value} onChange={handleTabChange} centered>
            <Tab label="Отели" {...a11yProps(0)}/>
            <Tab label="Ревью" {...a11yProps(1)} />
          </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Search Hotels"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>
        {loading ? (
          <Typography>Загрузка...</Typography>
        ) : (
          filteredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* {value === 1 && <ReportPage />} */}
      </TabPanel>
    </Box>
  );
};

export default AdminPanel;