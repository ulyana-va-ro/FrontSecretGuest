import React from 'react';
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar, 
  Tabs, 
  Tab,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HotelPage from "./HotelPage";
import CurrentTravelPage from "./CurrentTravelPage";
import СompletedTravelPage from "./СompletedTravelPage";

const SearchHotel: React.FC = () => {

    const location = useLocation();
    const { tab, hotelId, bookingId } = location.state || {};
    const [value, setValue] = React.useState(tab ?? 0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

  return (
    <Box>
        <Box>
            <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
                <h2 style={{ flexGrow: 1, textAlign: "center" }}>
                    🎉 Поздравляем! Ты стал Секретным гостем Островка 🎉
                </h2>
                </AccordionSummary>
                <AccordionDetails sx={{ p: "32px 10%" }}>
                <Typography paragraph>
                    Теперь твои путешествия не только приносят удовольствие, но и помогают улучшать качество отелей.
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                    📝 Твои обязанности
                </Typography>
                <Typography component="ol" sx={{ pl: 3 }}>
                    <li>Заселиться в назначенный отель и провести там время, как обычный гость.</li>
                    <li>Внимательно оценить качество сервиса, удобства, чистоту и соответствие фото/описания.</li>
                    <li>
                    Заполнить отчёт в личном кабинете в течение 48 часов после выезда:
                    <Typography component="ul" sx={{ pl: 3, mt: 1 }}>
                        <li>Поставить оценки по параметрам.</li>
                        <li>Добавить развернутый комментарий.</li>
                        <li>Прикрепить 2–3 фото.</li>
                    </Typography>
                    </li>
                    <li>Соблюдать честность: твой отзыв должен быть объективным и независимым.</li>
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                    🎁 Что получаешь ты
                </Typography>
                <Typography component="ul" sx={{ pl: 3 }}>
                    <li>Скидку на проживание до 100%.</li>
                    <li>Специальный статус «Секретного гостя» в профиле.</li>
                    <li>Участие в программе, которая делает путешествия лучше.</li>
                </Typography>

                <Typography sx={{ mt: 2 }}>
                    🙌 Спасибо, что помогаешь нам повышать качество отелей и доверие к Островку!
                </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
        <Box sx={{ width: "100%" }}>
            <AppBar position="static" color="inherit" elevation={0} sx={{ mt: 2, mb: 2, borderRadius: 1 }}>
                <Tabs value={value} onChange={handleTabChange} centered>
                  <Tab label="Поиск отелей" />
                  <Tab label="Текущие поездки" />
                  <Tab label="Завершенные поездки" />
                </Tabs>
            </AppBar>

            {value === 0 && <HotelPage />}
            {value === 1 && <CurrentTravelPage hotelId={hotelId} bookingId={bookingId} />}
            {value === 2 && <СompletedTravelPage />}
        </Box>
    </Box>
  );
};

export default SearchHotel;
