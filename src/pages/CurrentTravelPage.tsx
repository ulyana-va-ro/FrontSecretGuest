import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, Typography, Slider, Box,   Radio, RadioGroup, FormControlLabel, Button, FormControl, } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { styled } from '@mui/system';
import { type Hotel } from '../api/typesGo';
import { submitSecretGuestForm } from '../api/guestApi';
import { getCurrentBookings } from '../api/guestApi';
import type { SecretGuestForm } from '../api/typesPython';
import HotelCard from "../components/HotelCard";

interface CurrentTravelPageProps {
  hotelId?: number;
  bookingId?: number;
}

interface FormValues {
  cleanlinessRating: number;
  cleanlinessRoomComment: string;
  cleanlinessBathroomComment: string;
  cleanlinessBeddingComment: string;
  cleanlinessPublicAreasComment: string;

  serviceRating: number;
  servicePolitenessComment: string;
  serviceHelpfulnessComment: string;

  roomRating: number;
  roomBedComment: string;
  roomQuietComment: string;
  roomClimateComment: string;
  roomEquipmentComment: string;

  foodRating: number;
  foodQualityComment: string;
  foodVarietyComment: string;
  foodFreshnessComment: string;

  hygieneRating: number;
  hygieneAvailabilityComment: string;

  infraRating: number;
  infraElevatorComment: string;
  infraParkingComment: string;
  infraFitnessPoolComment: string;
  infraWiFiComment: string;

  expectationsRating: number;
  expectationsComment: string;

  locationRating: number;
  locationAreaComment: string;
  locationSafetyComment: string;

  overallRating: number;
  overallPriceQualityComment: string;
  overallRecommendComment: string;

  discrepancy: "yes" | "no" | null;
  discrepancyComment: string;
}

const defaultFormValues: FormValues = {
  cleanlinessRating: 5,
  cleanlinessRoomComment: '',
  cleanlinessBathroomComment: '',
  cleanlinessBeddingComment: '',
  cleanlinessPublicAreasComment: '',

  serviceRating: 5,
  servicePolitenessComment: '',
  serviceHelpfulnessComment: '',

  roomRating: 5,
  roomBedComment: '',
  roomQuietComment: '',
  roomClimateComment: '',
  roomEquipmentComment: '',

  foodRating: 5,
  foodQualityComment: '',
  foodVarietyComment: '',
  foodFreshnessComment: '',

  hygieneRating: 5,
  hygieneAvailabilityComment: '',

  infraRating: 5,
  infraElevatorComment: '',
  infraParkingComment: '',
  infraFitnessPoolComment: '',
  infraWiFiComment: '',

  expectationsRating: 5,
  expectationsComment: '',

  locationRating: 5,
  locationAreaComment: '',
  locationSafetyComment: '',

  overallRating: 5,
  overallPriceQualityComment: '',
  overallRecommendComment: '',

  discrepancy: null,
  discrepancyComment: '',
};

const StyledAttachmentButton = styled(IconButton)(({ theme }) => ({
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const EstimationHotel: React.FC<CurrentTravelPageProps> = ({ hotelId, bookingId }) => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const guest_id = storedUser ? JSON.parse(storedUser).id : null;
        if (guest_id) {
            getCurrentBookings(guest_id).then((data) => {
                setBookings(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Typography>Загрузка...</Typography>;
    }

    const id = hotelId ?? null;
    const booking = bookings.find((b) => b.hotel_id === id);
    if (!booking) {
        return <Typography>Нет забронированных отелей</Typography>;
    }
    const hotel = booking.hotel || null; 

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
    const politenessAttachmentInputRef = useRef<HTMLInputElement>(null!);
    const helpfulnessAttachmentInputRef = useRef<HTMLInputElement>(null!);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (field: keyof FormValues) => 
    (event: Event, newValue: number | number[]) => {
        setFormValues(prev => ({
        ...prev,
        [field]: newValue as number
        }));
    };

    const handleAttachmentClick = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.click();
    };

    const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>, field: "politenessAttachment" | "helpfulnessAttachment") => {
        if (event.target.files && event.target.files.length > 0) {
            setFormValues(prev => ({ ...prev, [field]: event.target.files![0] }));
        }
    };

    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const storedUser = localStorage.getItem("user");
        const guest_id = storedUser ? JSON.parse(storedUser).id : null;
        if (!guest_id || !bookingId) {
            alert("Не удалось определить бронирование");
            return;
        }

        const questions: SecretGuestForm["questions"] = [
            { id: 1, question: "Чистота номера", answer: formValues.cleanlinessRoomComment },
            { id: 2, question: "Чистота ванной", answer: formValues.cleanlinessBathroomComment },
            { id: 3, question: "Чистота белья", answer: formValues.cleanlinessBeddingComment },
            { id: 4, question: "Чистота общественных зон", answer: formValues.cleanlinessPublicAreasComment },
            { id: 5, question: "Вежливость персонала", answer: formValues.servicePolitenessComment },
            { id: 6, question: "Готовность помочь", answer: formValues.serviceHelpfulnessComment },
            { id: 7, question: "Кровать", answer: formValues.roomBedComment },
            { id: 8, question: "Тишина", answer: formValues.roomQuietComment },
            { id: 9, question: "Климат", answer: formValues.roomClimateComment },
            { id: 10, question: "Оборудование", answer: formValues.roomEquipmentComment },
            { id: 11, question: "Качество завтрака", answer: formValues.foodQualityComment },
            { id: 12, question: "Разнообразие еды", answer: formValues.foodVarietyComment },
            { id: 13, question: "Свежесть фруктов", answer: formValues.foodFreshnessComment },
            { id: 14, question: "Средства гигиены", answer: formValues.hygieneAvailabilityComment },
            { id: 15, question: "Лифты", answer: formValues.infraElevatorComment },
            { id: 16, question: "Парковка", answer: formValues.infraParkingComment },
            { id: 17, question: "Фитнес/бассейн", answer: formValues.infraFitnessPoolComment },
            { id: 18, question: "Wi-Fi", answer: formValues.infraWiFiComment },
            { id: 19, question: "Соответствие ожиданиям", answer: formValues.expectationsComment },
            { id: 20, question: "Район города", answer: formValues.locationAreaComment },
            { id: 21, question: "Безопасность", answer: formValues.locationSafetyComment },
            { id: 22, question: "Цена/качество", answer: formValues.overallPriceQualityComment },
            { id: 23, question: "Рекомендация друзьям", answer: formValues.overallRecommendComment },
            { id: 24, question: "Несоответствия", answer: formValues.discrepancy === "yes" ? formValues.discrepancyComment : "Нет" },
        ];

        const form: SecretGuestForm = { questions };

        try {
            await submitSecretGuestForm(guest_id, bookingId, form);
            alert("Форма успешно отправлена!");
            navigate("/travel", { state: { tab: 2 } });
        } catch (e) {
            alert("Ошибка при отправке формы");
        }
    };

    return (
        <Box sx={{ display: "grid", gap: 1 }}>
            { hotelId ? (
                <Box>
                    {hotel && (
                        <Box sx={{ mb: 2 }}>
                            <HotelCard hotel={hotel} />
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            Оценка отеля: <b>{hotel.name}</b>
                            </Typography>
                        </Box>
                    )}
                    <Box component="form" onSubmit={handleSubmitForm} sx={{ display: "grid", gap: 2 }}>
                        {/* Чистота */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{ display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Чистота</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.cleanlinessRating}
                                            onChange={handleSliderChange("cleanlinessRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.cleanlinessRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Номер</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="cleanlinessRoomComment"
                                    placeholder="Введите текст"
                                    value={formValues.cleanlinessRoomComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Ванная</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="cleanlinessBathroomComment"
                                    placeholder="Введите текст"
                                    value={formValues.cleanlinessBathroomComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Постельноё бельё</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="cleanlinessBeddingComment"
                                    placeholder="Введите текст"
                                    value={formValues.cleanlinessBeddingComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Общественные зоны</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="cleanlinessPublicAreasComment"
                                    placeholder="Введите текст"
                                    value={formValues.cleanlinessPublicAreasComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Обслуживание */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Обслуживание</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.serviceRating}
                                            onChange={handleSliderChange("serviceRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.serviceRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Вежливость</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="servicePolitenessComment"
                                    placeholder="Введите текст"
                                    value={formValues.servicePolitenessComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Готовность помочь</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="serviceHelpfulnessComment"
                                    placeholder="Введите текст"
                                    value={formValues.serviceHelpfulnessComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Номер */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Номер</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.roomRating}
                                            onChange={handleSliderChange("roomRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.roomRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Кровать</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="roomBedComment"
                                    placeholder="Введите текст"
                                    value={formValues.roomBedComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Тишина</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="roomQuietComment"
                                    placeholder="Введите текст"
                                    value={formValues.roomQuietComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Кондиционер/отопление</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="roomClimateComment"
                                    placeholder="Введите текст"
                                    value={formValues.roomClimateComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Jборудование</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="roomEquipmentComment"
                                    placeholder="Введите текст"
                                    value={formValues.roomEquipmentComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Питание */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Питание</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.foodRating}
                                            onChange={handleSliderChange("foodRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.foodRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Качество завтрака</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="foodQualityComment"
                                    placeholder="Введите текст"
                                    value={formValues.foodQualityComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Разнообразие</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="foodVarietyComment"
                                    placeholder="Введите текст"
                                    value={formValues.foodVarietyComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Свежесть фруктов</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="foodFreshnessComment"
                                    placeholder="Введите текст"
                                    value={formValues.foodFreshnessComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Средства гигиены */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Средства гигиены</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.hygieneRating}
                                            onChange={handleSliderChange("hygieneRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.hygieneRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Наличие их</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="hygieneAvailabilityComment"
                                    placeholder="Введите текст"
                                    value={formValues.hygieneAvailabilityComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Инфраструктура */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Инфраструктура</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.infraRating}
                                            onChange={handleSliderChange("infraRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.infraRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Лифты</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="infraElevatorComment"
                                    placeholder="Введите текст"
                                    value={formValues.infraElevatorComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Парковка</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="infraParkingComment"
                                    placeholder="Введите текст"
                                    value={formValues.infraParkingComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Фитнес/басейн</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="infraFitnessPoolComment"
                                    placeholder="Введите текст"
                                    value={formValues.infraFitnessPoolComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Wi-Fi</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="infraWiFiComment"
                                    placeholder="Введите текст"
                                    value={formValues.infraWiFiComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Соответствие ожиданиям */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Соответствие ожиданиям</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.expectationsRating}
                                            onChange={handleSliderChange("expectationsRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.expectationsRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Соответствует ли отель описанию на сайте</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="expectationsComment"
                                    placeholder="Введите текст"
                                    value={formValues.expectationsComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Расположение */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Расположение</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.locationRating}
                                            onChange={handleSliderChange("locationRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.locationRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Район города</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="locationAreaComment"
                                    placeholder="Введите текст"
                                    value={formValues.locationAreaComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Безопастность</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="locationSafetyComment"
                                    placeholder="Введите текст"
                                    value={formValues.locationSafetyComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Общее впечатление */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', borderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center", textAlign: "right" }}>
                                <Typography variant="h5">Общее впечатление</Typography>
                                <Box sx={{ width: "70%", ml: "15%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography fontSize={ 24 }>👎</Typography>
                                        <Typography fontSize={ 24 } mr={ 2 }>👍</Typography>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        <Slider
                                            aria-label="Cleanliness Rating"
                                            value={formValues.overallRating}
                                            onChange={handleSliderChange("overallRating")}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                            color="secondary"
                                            componentsProps={{
                                                thumb: {
                                                    style: {
                                                        color: '#1976d2',
                                                    },
                                                },
                                            }}
                                        />
                                        <span style={{ marginLeft: "16px" }}>{formValues.overallRating}</span>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Цена/качество</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="overallPriceQualityComment"
                                    placeholder="Введите текст"
                                    value={formValues.overallPriceQualityComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(politenessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={politenessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "politenessAttachment")}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Typography sx={{ width: '30%', mr: 2, textAlign: "right" }}>Готов ли рекомендовать друзьям</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="overallRecommendComment"
                                    placeholder="Введите текст"
                                    value={formValues.overallRecommendComment}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                                <StyledAttachmentButton onClick={() => handleAttachmentClick(helpfulnessAttachmentInputRef)} sx={{ ml: 2 }}>
                                    <AttachmentIcon />
                                </StyledAttachmentButton>
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={helpfulnessAttachmentInputRef}
                                    onChange={(e) => handleAttachmentChange(e, "helpfulnessAttachment")}
                                />
                            </Box>
                        </Box>
                        {/* Несоответствия */}
                        <Box sx={{ p: "32px 10%", backgroundColor: '#FFFFFF', brderRadius: 1 }}>
                            <Box sx={{  display: "grid", gridTemplateColumns: "21% 79%", alignItems: "center" }}>
                                <Typography variant="h5" sx={{ textAlign: "right" }}>Несоответствия</Typography>
                                <FormControl sx={{ ml: 3 }}>
                                    <RadioGroup
                                    row
                                    value={formValues.discrepancy}
                                    onChange={(e) =>
                                        setFormValues((prev) => ({
                                        ...prev,
                                        discrepancy: e.target.value as "yes" | "no"
                                        }))
                                    }
                                    >
                                    <FormControlLabel value="yes" control={<Radio />} label="Да" />
                                    <FormControlLabel value="no" control={<Radio />} label="Нет" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            {formValues.discrepancy === "yes" && (
                                <TextField
                                label="Опишите несоответствие"
                                value={formValues.discrepancyComment}
                                onChange={(e) =>
                                    setFormValues((prev) => ({ ...prev, discrepancyComment: e.target.value }))
                                }
                                multiline
                                rows={3}
                                sx={{ width: "77%", ml: "23%" }}
                                />
                            )}
                        </Box>
                        <Box marginTop={2} sx={{ display: "flex", justifyContent: "space-between", pb: 10 }}>
                            {/* <Button variant="contained" color="secondary" type="submit">
                                Сохранить
                            </Button> */}
                            <Button variant="contained" color="primary" type="submit">
                                Отправить
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Typography>Нет забронированных отелей</Typography>
                </Box>
            )}
        </Box>
    );
};

export default EstimationHotel;