import { useState } from 'react';
import { TextField, Button, Typography, Dialog } from '@mui/material';
import { Box } from '@mui/system';
import { login } from "../api/auth";
import axios from "axios";

const Login = () => {
  const [open] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";
  
  // const login = async ({ email, password }: { email: string; password: string }) => {
  //   return new Promise<{ data: { token: string; user: { id: number; email: string } } }>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (email === "test@example.com" && password === "123") {
  //         resolve({
  //           data: {
  //             token: "mock-token-123456",
  //             user: { id: 1, email },
  //           },
  //         });
  //       } else {
  //         reject(new Error("Неверный логин или пароль"));
  //       }
  //     }, 500);
  //   });
  // };

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      console.log("Успешный вход:", res.data);
      console.log("Токен:", res.data.token);

      window.location.href = "/profile";
    } catch (err: any) {
      setError("Неверный логин или пароль");
    }
};

  return (
    <Dialog open={open} scroll="paper" 
      sx={{ "& .MuiPaper-root": { padding: 3, width:"400px" } }}>
      <Box>
        <Typography variant="h5">Вход</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
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
            onClick={handleLogin}
          >
            Войти
          </Button>
          <Button 
            variant="text" 
            onClick={() => window.location.href="/register"}
          >
            Нет аккаунта? Зарегистрироваться
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Login;