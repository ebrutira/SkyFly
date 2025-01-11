import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Skeleton
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/login');
    };

    const handleProfile = () => {
        handleClose();
        navigate('/profile');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#7392B7' }}>
            <Container>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo ve Site Adı */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlightTakeoffIcon sx={{ mr: 1, color: '#FFECD6' }} />
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: '#FFECD6',
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}
                        >
                            SkyFly
                        </Typography>
                    </Box>

                    {/* Navigasyon Linkleri */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/flights"
                            sx={{
                                color: '#FFECD6',
                                '&:hover': { backgroundColor: '#759EB8' }
                            }}
                        >
                            Uçuşlar
                        </Button>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/about"
                            sx={{
                                color: '#FFECD6',
                                '&:hover': { backgroundColor: '#759EB8' }
                            }}
                        >
                            Hakkımızda
                        </Button>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/contact"
                            sx={{
                                color: '#FFECD6',
                                '&:hover': { backgroundColor: '#759EB8' }
                            }}
                        >
                            İletişim
                        </Button>

                        {loading ? (
                            <Skeleton variant="circular" width={40} height={40} />
                        ) : user ? (
                            <>
                                <IconButton
                                    onClick={handleMenu}
                                    sx={{
                                        color: '#FFECD6',
                                        '&:hover': { backgroundColor: '#759EB8' }
                                    }}
                                >
                                    <Avatar sx={{ bgcolor: '#FFECD6', color: '#7392B7' }}>
                                        {user.firstName?.[0]}
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleProfile}>Profilim</MenuItem>
                                    <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                component={RouterLink}
                                to="/login"
                                sx={{
                                    color: '#FFECD6',
                                    borderColor: '#FFECD6',
                                    '&:hover': {
                                        borderColor: '#FFECD6',
                                        backgroundColor: '#759EB8'
                                    }
                                }}
                            >
                                Giriş Yap
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;