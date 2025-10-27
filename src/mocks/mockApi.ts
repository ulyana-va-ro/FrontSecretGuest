import type { Hotel } from "../api/typesGo"; 

export const getHotelsMock = (): Promise<{ data: Hotel[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 1,
            name: "Grand Palace Hotel",
            location: "New York, USA",
            rating: 8.5,
            description: "Роскошный отель в центре города с видом на парк.",
          },
          {
            id: 2,
            name: "Sunny Beach Resort",
            location: "Barcelona, Spain",
            rating: 3.0,
            description: "Отдых у моря с бассейном и анимацией.",
          },
          {
            id: 3,
            name: "Mountain Lodge",
            location: "Zermatt, Switzerland",
            rating: 6.8,
            description: "Уютный шале у подножия Альп.",
          },
        ],
      });
    }, 500);
  });
};