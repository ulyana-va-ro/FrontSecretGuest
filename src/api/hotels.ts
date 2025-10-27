import api from "./index";
import type { Hotel } from "./typesGo";

export const getHotels = () =>
  api.get<Hotel[]>("/hotels");

export const getHotelById = (id: number) =>
  api.get<Hotel>(`/hotels/${id}`);