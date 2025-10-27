export interface User {
  id: number;
  username: string;
  email: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  description?: string;
}

export interface Review {
  id: number;
  userId: number;
  hotelId: number;
  rating: number;
  comment: string;
  isSecretGuest?: boolean;
}

export interface CreateReviewRequest {
  hotelId: number;
  rating: number;
  comment: string;
}