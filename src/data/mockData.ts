// src/data/mockData.ts
// src/data/mockData.ts
import type { CleanlinessSection } from '../types/reportTypes';

export const mockCleanlinessData: CleanlinessSection = {
  overallScore: 6, 
  imageSrc: 'https://example.com/bathroom-image.jpg', 
  details: [
    { label: 'Номер', comment: 'В номере очень чисто' },
    { label: 'Ванная', comment: 'Ванная супер' },
    { label: 'Постельное бельё', comment: 'Постельное бельё чистое' },
    { label: 'Общественные зоны', comment: 'На улице мусор' },
  ],
};