import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { getHotelById } from '../api/goApi';
import { getHotelReviews } from '../api/goApi';
import type { Hotel } from '../api/typesGo';
import type { Review } from '../api/typesGo';


const HotelReviewsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      if (!hotelId) {
        setError('Hotel ID is missing');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const hotelData = await getHotelById(Number(hotelId));
        setHotel(hotelData);

        const reviewsData = await getHotelReviews(Number(hotelId));
        setReviews(reviewsData);

        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Ошибка при загрузке данных');
        setLoading(false);
      }
    };
    fetchHotelData();
  }, [hotelId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box>
        <Typography variant="h6">Hotel not found</Typography>
      </Box>
    );
  }

  const hasSecretGuest = reviews.some(r => r.isSecretGuest);

  return (
    <Box>
        <Box sx={{ p: "32px 10%", borderRadius: 1, background: "#FFFFFF" }}>
            <Box>
                <Typography variant="h4" component="h1">
                    {hotel.name} Reviews
                </Typography>
                {hasSecretGuest && (
                  <Typography color="primary" fontWeight="bold" sx={{ mt: 1 }}>
                    Здесь был секретный гость
                  </Typography>
                )}
            </Box>
            <ImageList cols={1} rowHeight={300} sx={{ mb: 2 }}>
            <ImageListItem key="hotel2.png">
                <img
                    src="/assets/hotel2.png"
                    alt={hotel.name}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </ImageListItem>
            </ImageList>
        </Box>
        <List sx={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", columnGap: 1, rowGap: 2 }}>
          {reviews.map((review) => {
          let ratingColor = '';
          if (review.rating >= 7) {
            ratingColor = 'green';
          } else if (review.rating >= 4) {
            ratingColor = 'orange';
          } else {
            ratingColor = 'red';
          }
          return (
            <ListItem key={review.id} alignItems="flex-start" sx={{ p: "8px 16px", borderRadius: 1, background: "#FFFFFF" }}>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="subtitle1" component="span">
                        {`User #${review.userId}`}
                      </Typography>
                      <Typography color="primary" fontSize="0.9em">
                        {review.isSecretGuest ? "Секретный гость" : ""}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        bgcolor: ratingColor,
                        color: 'white',
                        borderRadius: 1,
                        padding: 1,
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {review.rating.toFixed(1)}
                    </Box>
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          );
        })}
        </List>
        <Box sx={{ p: "32px 10%", borderRadius: 1, background: "#FFFFFF" }}>
            {/* здесь отчет секретного гостя */}
        </Box>
    </Box>
  );
};

export default HotelReviewsPage;