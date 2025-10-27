import { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography, Box, Link, } from '@mui/material';
import type { User } from '../api/typesGo';

const menuItems = [
    { text: 'Текущие поездки', link: '/current-travel' },
    { text: 'Завершенные поездки', link: '/completed-travel' },
    { text: 'Программа "Секретный гость"', link: '/secret-guest' },
];

const UserMenu = () => {

    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

    return (
        <Box sx={{ width: 300, p: 2, borderRadius: 1, background: '#FFFFFF' }} >
            <Box sx={{ display: "grid", mb: 2, p: 2, gap: 1, borderBottom: '1px solid #e0e0e0' }}>
                <Box>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {user ? user.email : "email@example.com"}
                    </Typography>
                </Box>
                <Link href="/profile" underline="none" color="primary">
                    Личный кабинет
                </Link>
            </Box>

            <List disablePadding>
            {menuItems.map((item) => (
                <ListItem disablePadding key={item.text}>
                    <ListItemButton component="a" href={item.link}>
                        <ListItemText primary={
                            <Typography color='primary'>
                                {item.text}
                            </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>
    );
};

export default UserMenu;