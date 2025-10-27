import api from "./index";
import type { RegisterRequest, LoginRequest, AuthResponse } from "./typesGo";

export const register = (data: RegisterRequest) =>
  api.post<AuthResponse>("/register", data);

export const login = (data: LoginRequest) =>
  api.post<AuthResponse>("/login", data);

export const getCurrentUser = () =>
  api.get<AuthResponse>("/user");