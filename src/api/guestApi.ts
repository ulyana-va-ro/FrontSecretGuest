import axios from 'axios';
import type { SecretGuestForm } from './typesPython';

const API_BASE = '/guest';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Типы для Guest, Booking, Review и т.д. будут импортироваться из openapi типов (генерировать отдельно)

// Регистрация гостя
export async function registerGuest(data: {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  is_vip?: boolean;
}) {
  const res = await api.post('/auth/register', data);
  return res.data;
}

// Логин гостя (по email)
export async function loginGuest(email: string) {
  const res = await api.post('/auth/login', { email });
  return res.data;
}

// Получить профиль гостя
export async function getGuestProfile(guest_id: number) {
  const res = await api.get(`/profile/${guest_id}`);
  return res.data;
}

// Обновить профиль гостя
export async function updateGuestProfile(guest_id: number, data: Partial<{
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_vip: boolean;
}>) {
  const res = await api.put(`/profile/${guest_id}`, data);
  return res.data;
}

// Удалить профиль гостя
export async function deleteGuestProfile(guest_id: number) {
  const res = await api.delete(`/profile/${guest_id}`);
  return res.data;
}

// Получить текущие бронирования
export async function getCurrentBookings(guest_id: number) {
  const res = await api.get(`/bookings/${guest_id}/current`);
  return res.data;
}

// Получить историю бронирований
export async function getBookingHistory(guest_id: number) {
  const res = await api.get(`/bookings/${guest_id}/history`);
  return res.data;
}

// Создать бронирование
export async function createBooking(guest_id: number, data: {
  hotel_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price?: number;
}) {
  const res = await api.post(`/bookings/${guest_id}/create`, data);
  return res.data;
}

// Доступные для анкеты бронирования (тайный гость)
export async function getAvailableSecretGuestBookings(guest_id: number) {
  const res = await api.get(`/secret-guest/${guest_id}/available-bookings`);
  return res.data;
}

// Получить форму анкеты тайного гостя
export async function getSecretGuestForm(guest_id: number, booking_id: number) {
  const res = await api.get(`/secret-guest/${guest_id}/bookings/${booking_id}/form`);
  return res.data;
}

// Отправить анкету тайного гостя
export async function submitSecretGuestForm(guest_id: number, booking_id: number, form: SecretGuestForm) {
  const res = await api.post(`/secret-guest/${guest_id}/bookings/${booking_id}/form`, form);
  return res.data;
}

// История анкет тайного гостя
export async function getSecretGuestHistory(guest_id: number) {
  const res = await api.get(`/secret-guest/${guest_id}/history`);
  return res.data;
}

// Получить форму отзыва
export async function getReviewForm(guest_id: number, booking_id: number) {
  const res = await api.get(`/reviews/${guest_id}/bookings/${booking_id}/form`);
  return res.data;
}

// Отправить отзыв
export async function submitReview(guest_id: number, booking_id: number, data: any) {
  const res = await api.post(`/reviews/${guest_id}/bookings/${booking_id}/submit`, data);
  return res.data;
}