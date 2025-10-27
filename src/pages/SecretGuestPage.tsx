import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { applySecretGuest } from "../api/goApi";

const SecretGuestForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reason: 'Отдых',
    adults: 2,
    children: 0,
    willingToRate: 'Да',
  });

  const handleChange = (field: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value: string | number = event.target.value;

      if (event.target.type === 'number') {
        const numValue = parseInt(value as string, 10);
        value = isNaN(numValue) ? 0 : numValue;
      }

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Необходима авторизация");
        return;
      }
      await applySecretGuest(token, formData);
      alert("Заявка отправлена!");
      navigate("/travel", { state: { tab: 0 } });
    } catch (e) {
      alert("Ошибка при отправке заявки");
    }
  };

  return (
      <Box>
        <Box>
          <Accordion sx={{ boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}>
              <h2 style={{ flexGrow: 1, textAlign: "center" }}>
                ✨ Стань «Секретным гостем» Островка!
              </h2>
            </AccordionSummary>
            <AccordionDetails sx={{ p: "32px 10%" }}>
              <Typography paragraph>
                Любишь путешествовать и делиться впечатлениями? Теперь твой отдых может стать ещё выгоднее и полезнее.
              </Typography>

              <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                🚪 Что это за программа?
              </Typography>
              <Typography paragraph>
                «Секретный гость» — это путешественники, которые помогают нам проверять отели изнутри. Ты бронируешь поездку со
                скидкой до 100%, а взамен оставляешь честный отзыв о проживании.
              </Typography>

              <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                💡 Что нужно делать?
              </Typography>
              <Typography component="ol" sx={{ pl: 3 }}>
                <li>Подать заявку на участие.</li>
                <li>Получить приглашение в один из отелей, где нужна проверка.</li>
                <li>Остановиться там со скидкой или бесплатно.</li>
                <li>Оставить подробный отзыв с оценкой сервиса, удобств и соответствия фото/описания.</li>
              </Typography>

              <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
                🎁 Что получаешь ты?
              </Typography>
              <Typography component="ul" sx={{ pl: 3 }}>
                <li>Проживание со скидкой до 100%.</li>
                <li>Специальный статус «Секретного гостя» в профиле.</li>
                <li>Участие в развитии качества отелей и доверия к платформе.</li>
              </Typography>

              <Typography sx={{ mt: 2 }}>
                🙌 Присоединяйся — будь в числе первых, кто помогает нам делать путешествия лучше!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box sx={{ p: 0.5, m: "8px 0", borderRadius: 1, bgcolor: 'secondary.main', textAlign: "center" }}>
          <h2>👇 Заполни анкету 👇</h2>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Box  sx={{ p: "32px 10%", pb: "100px", borderRadius: 1, background: "#FFFFFF" }} >
            <Box  sx={{ display: "grid", gap: 4 }} >
              <FormControl component="fieldset" fullWidth>
                <FormLabel>1. Какая основная причина вашего бронирования</FormLabel>
                <RadioGroup
                  value={formData.reason}
                  onChange={handleChange('reason')}
                  sx={{ display: "flex" }}
                >
                  <FormControlLabel value="Отдых" control={<Radio />} label="Отдых" />
                  <FormControlLabel value="Работа" control={<Radio />} label="Работа" />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormLabel>2. На сколько гостей обычно бронируете</FormLabel>
                <Box display="flex" alignItems="center" gap={2} marginTop={1}>
                  <TextField
                    label="Взрослые"
                    type="number"
                    value={formData.adults}
                    onChange={handleChange('adults')}
                    inputProps={{ min: 1 }}
                    style={{ width: 120 }}
                  />
                  <TextField
                    label="Дети"
                    type="number"
                    value={formData.children}
                    onChange={handleChange('children')}
                    inputProps={{ min: 0 }}
                    style={{ width: 120 }}
                  />
                </Box>
              </FormControl>
              <FormControl component="fieldset" fullWidth>
                <FormLabel>3. Готовы ли вы заполнять формы оценки отеля</FormLabel>
                <RadioGroup
                  value={formData.willingToRate}
                  onChange={handleChange('willingToRate')}
                  sx={{ display: "flex" }}
                >
                  <FormControlLabel value="Да" control={<Radio />} label="Да" />
                  <FormControlLabel value="Нет" control={<Radio />} label="Нет" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box marginTop={2} sx={{ float: "right" }}>
              <Button variant="contained" color="primary" type="submit">
                Отправить
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
  );
};

export default SecretGuestForm;