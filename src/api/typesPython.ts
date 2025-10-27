export interface Guest {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  is_vip?: boolean;
}

export interface GuestCreate {
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  is_vip?: boolean;
}

export type GuestProfile = Guest;

export interface Booking {
  id: number;
  guest_id: number;
  hotel_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price?: number;
  status?: string;
}

export interface CreateBookingRequest {
  hotel_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price?: number;
}

export interface SecretGuestForm {
  questions: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

export interface Review {
  id: number;
  guest_id: number;
  booking_id: number;
  rating: number;
  comment: string;
  created_at?: string;
}

export interface CreateReviewRequest {
  booking_id: number;
  rating: number;
  comment: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}