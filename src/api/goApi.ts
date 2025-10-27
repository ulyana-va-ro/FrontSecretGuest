import axios from "axios";
import type { Hotel, Review } from './typesGo';

// Go API (hotel_n_assignment)
const GO_API_BASE = "/hotel";

export const goApi = axios.create({
  baseURL: GO_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Получить отель по id
export async function getHotelById(hotelId: number): Promise<Hotel> {
  const res = await goApi.get<Hotel>(`/hotels/${hotelId}`);
  return res.data;
}

// Получить отзывы по hotelId
export async function getHotelReviews(hotelId: number): Promise<Review[]> {
  const res = await goApi.get<Review[]>(`/hotels/${hotelId}/reviews`);
  return res.data;
}

// Подача заявки на участие в программе "Секретный гость"
export async function applySecretGuest(token: string, data: any = {}) {
  const res = await goApi.post(
    "/secret-guest/apply",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

// Пример: получить профиль тайного гостя
export async function getSecretGuestProfile(token: string) {
  const res = await goApi.get("/secret-guest/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
