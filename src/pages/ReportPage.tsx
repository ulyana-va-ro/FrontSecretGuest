import React, { useState, type JSX } from 'react';
import {
  Typography,
  Box,
  LinearProgress,
  Paper,
  Stack,
  Container,
} from '@mui/material';

interface Hotel {
  id: number;
  name: string;
  imageUrl: string;
  arrivalDate: string;   
  departureDate: string; 
  rating: number;
  reviewCount: number; 
  hasIssues: boolean;     
}

const ExampleHotel: Hotel = {
    id: 1,
    name: 'Апартаменты Luxury с 2 комнатами',
    imageUrl: "/assets/hotel2.png",
    arrivalDate: '27 сент 2025, сб',
    departureDate: '28 сент 2025, вс',
    rating: 8.3,
    reviewCount: 2,
    hasIssues: false
};

// ---

interface CleanlinessDetail {
  label: string;
  comment: string;
}

interface CleanlinessSection {
  overallScore: number;
  details: CleanlinessDetail[];
  imageSrc?: string;
}

interface ServiceDetail {
  label: string;
  comment: string;
}

interface ServiceSection {
  overallScore: number;
  details: ServiceDetail[];
  imageSrc?: string;
}

interface RoomDetail {
  label: string;
  comment: string;
}

interface RoomSection {
  overallScore: number;
  details: RoomDetail[];
  imageSrc?: string;
}

interface FoodDetail {
  label: string;
  comment: string;
}

interface FoodSection {
  overallScore: number;
  details: FoodDetail[];
  imageSrc?: string;
}

interface HygieneProductsSection {
  overallScore: number;
  details: { label: string; comment: string }[];
  imageSrc?: string;
}

interface InfrastructureDetail {
  label: string;
  comment: string;
}

interface InfrastructureSection {
  overallScore: number;
  details: InfrastructureDetail[];
  imageSrc?: string;
}

interface ExpectationMatchSection {
  overallScore: number;
  details: { label: string; comment: string }[];
  imageSrc?: string;
}

interface LocationDetail {
  label: string;
  comment: string;
}

interface LocationSection {
  overallScore: number;
  details: LocationDetail[];
  imageSrc?: string;
}

interface OverallImpressionDetail {
  label: string;
  comment: string;
}

interface OverallImpressionSection {
  overallScore: number;
  details: OverallImpressionDetail[];
  imageSrc?: string;
}

interface DiscrepanciesSection {
  hasDiscrepancies: boolean;
  discrepancyDescription: string;
}

interface ReportData {
  cleanliness: CleanlinessSection;
  service: ServiceSection;
  room: RoomSection;
  food: FoodSection;
  hygieneProducts: HygieneProductsSection;
  infrastructure: InfrastructureSection;
  expectationMatch: ExpectationMatchSection;
  location: LocationSection;
  overallImpression: OverallImpressionSection;
  discrepancies: DiscrepanciesSection;
}

const mockReportData: ReportData = {
  cleanliness: {
    overallScore: 6,
    details: [
      { label: 'Номер', comment: 'В номере очень чисто' },
      { label: 'Ванная', comment: 'Ванная супер' },
      { label: 'Постельное бельё', comment: 'Постельное бельё чистое' },
      { label: 'Общественные зоны', comment: 'На улице мусор' },
    ],
  },
  service: {
    overallScore: 8,
    details: [
      { label: 'Вежливость персонала', comment: 'Очень вежливый' },
      { label: 'Готовность помочь', comment: 'Всегда готовы помочь' },
    ],
  },
  room: {
    overallScore: 7,
    details: [
      { label: 'Кровать', comment: 'Удобная' },
      { label: 'Тишина', comment: 'Тихо' },
      { label: 'Кондиционер/отопление', comment: 'Работает хорошо' },
      { label: 'Оборудование', comment: 'Все необходимое есть' },
    ],
  },
  food: {
    overallScore: 9,
    details: [
      { label: 'Качество завтрака', comment: 'Очень вкусно' },
      { label: 'Разнообразие', comment: 'Достаточно' },
      { label: 'Свежесть продуктов', comment: 'Свежие' },
    ],
  },
  hygieneProducts: {
    overallScore: 10,
    details: [{ label: 'Наличие', comment: 'В наличии все необходимое' }],
  },
  infrastructure: {
    overallScore: 7,
    details: [
      { label: 'Лифты', comment: 'Работают' },
      { label: 'Парковка', comment: 'Есть' },
      { label: 'Фитнес/бассейн', comment: 'В хорошем состоянии' },
      { label: 'Wi-Fi', comment: 'Отличный' },
    ],
  },
  expectationMatch: {
    overallScore: 8,
    details: [{ label: 'Соответствие описанию', comment: 'Полностью соответствует' }],
  },
  location: {
    overallScore: 8,
    details: [
      { label: 'Район города', comment: 'Удобный' },
      { label: 'Безопасность', comment: 'Безопасно' },
    ],
  },
  overallImpression: {
    overallScore: 7,
    details: [
      { label: 'Цена/качество', comment: 'Хорошее' },
      { label: 'Готов ли рекомендовать друзьям', comment: 'Рекомендую' },
    ],
  },
  discrepancies: {
    hasDiscrepancies: false,
    discrepancyDescription: '',
  },
};

const ScoreProgressBar: React.FC<{ score: number }> = ({ score }) => {
  const maxScore = 10;
  const progress = (score / maxScore) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1, mb: 2 }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 5,
          flexGrow: 1,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#aed581',
            borderRadius: 5,
          },
        }}
      />
    </Box>
  );
};

interface DetailTableProps<T> {
  details: T[];
}

const DetailTable: <T extends { label: string; comment: string }>(props: DetailTableProps<T>) => JSX.Element = <T extends { label: string; comment: string }>({ details }: DetailTableProps<T>) => {
  return (
    <Stack spacing={1}>
      {details.map((item, index) => (
        <Box key={index} sx={{ display: 'grid', gridTemplateColumns: "repeat(2,1fr)", gap: 4 }}>
          <Typography variant="body1" sx={{ textAlign: 'right' }}>
            {item.label}
          </Typography>
          <Typography variant="body1">
            {item.comment}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

const ImagePlaceholder: React.FC = () => (
  <Box
    sx={{
      width: '100%',
      height: "25vh",
      backgroundColor: '#e9e9e9ff',
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 1,
    }}
  >
    <Typography variant="body2" color="text.secondary" textAlign="center">
      Изображение
    </Typography>
  </Box>
);

interface ScoreSectionProps<T extends { details: any[]; overallScore: number; imageSrc?: string }> {
  title: string;
  data: T;
}

const ScoreSection: React.FC<ScoreSectionProps<any>> = ({ title, data }) => {
  return (
    <Paper elevation={0} sx={{ width: "100%", p: "32px 10%" }}>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h4" color="primary">
              {data.overallScore}
            </Typography>
          </Box>
          <ScoreProgressBar score={data.overallScore} />
          <DetailTable details={data.details} />
        </Box>
        <Box sx={{ flex: 1, minWidth: '30%' }}>
          <ImagePlaceholder />
        </Box>
      </Box>
    </Paper>
  );
};

const ReportPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: 'center' }}>

      </Box>
      <Container maxWidth="xl" sx={{ background: "#FFFFFF", borderRadius: 1 }}>
        <ScoreSection title="Чистота" data={mockReportData.cleanliness} />
        <ScoreSection title="Обслуживание" data={mockReportData.service} />
        <ScoreSection title="Номер" data={mockReportData.room} />
        <ScoreSection title="Питание" data={mockReportData.food} />
        <ScoreSection title="Средства гигиены" data={mockReportData.hygieneProducts} />
        <ScoreSection title="Инфраструктура" data={mockReportData.infrastructure} />
        <ScoreSection title="Соответствие ожиданиям" data={mockReportData.expectationMatch} />
        <ScoreSection title="Расположение" data={mockReportData.location} />
        <ScoreSection title="Общее впечатление" data={mockReportData.overallImpression} />
      </Container>
    </Box>
  );
};

export default ReportPage;