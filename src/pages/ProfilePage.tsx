import { useEffect, useState } from 'react';
import { Typography, Box, } from '@mui/material';
import type { GuestProfile } from '../api/typesPython';
import { getGuestProfile } from '../api/guestApi';

const Profile = () => {
  const [profile, setProfile] = useState<GuestProfile | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      getGuestProfile(user.id).then(setProfile);
    }
  }, []);

  return (
    <Box sx={{ p: "16px 10%", borderRadius: 1, background: "#FFFFFF" }}>
      <Box sx={{ display: "flex", alignItems: "flex-end", p: "16px 32px", gap: 1, borderBottom: '1px solid #e0e0e0' }} >
        <img src="/assets/photo-profile.jpg" alt="profile" style={{ width: "120px" }}/>
        <Box>
          <Typography sx={{ fontSize: "1.5rem" }}>
            {profile ? `${profile.first_name} ${profile.last_name}` : "Имя пользователя"}
          </Typography>
          <Typography>
            {profile?.phone || "Телефон не указан"}
          </Typography>
        </Box>
      </Box>
      <Box>
        <h1>Секретный гость</h1>
        <Box sx={{ width: 300, p: "16px 32px", borderRadius: 1, bgcolor: 'secondary.main' }} >
          <Typography fontSize={ "24px" } fontWeight={ "bold" }>
              Заявка №{/* тут id */}
            </Typography>
            <Typography >
              Отель - {/* тут отель */}
            </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;