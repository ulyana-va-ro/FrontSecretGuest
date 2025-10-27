import { useState } from 'react';
import { TextField, Button, Typography, Dialog } from '@mui/material';
import { Box } from '@mui/system';
import { register } from "../api/auth";
import axios from "axios";

const Register = () => {
  const [open] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState(""); 
  const [error, setError] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "" && username.trim() !== "";

  const handleRegister = async () => {
    if (!isFormValid) {
      setError("Заполните все поля");
      return;
    }

    try {
      const res = await register({ email, password, username });

      console.log("Успешная регистрация:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("guest_id", res.data.user.id.toString());

      window.location.href = "/auth";
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка при регистрации");
    }
  };

  return (
    <Dialog open={open} scroll="paper" 
      sx={{ "& .MuiPaper-root": { padding: 3, width:"400px" } }}>
      <Box>
        <Typography variant="h5">Регистрация</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField 
            label="Имя" 
            variant="outlined" 
            fullWidth 
            onChange={(e) => setName(e.target.value)} />
          <TextField 
            label="Почта" 
            variant="outlined" 
            fullWidth 
            onChange={(e) => setEmail(e.target.value)} />
          <TextField 
            label="Пароль" 
            variant="outlined" 
            type="password" 
            fullWidth 
            onChange={(e) => setPassword(e.target.value)} />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            onClick={handleRegister}
          >
            Зарегистрироваться
          </Button>

          <Button 
            variant="text" 
            onClick={() => window.location.href="/login"}
          >
            Уже есть аккаунт? Войти
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Register;
