import api from "./index";
import type { CreateReviewRequest, Review } from "./typesGo";

export const createReview = (data: CreateReviewRequest) =>
  api.post<Review>("/reviews", data);