import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Avatar,
    Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FlightIcon from '@mui/icons-material/Flight';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileInfo from './ProfileInfo';
import PastFlights from './PastFlights';
import PaymentMethods from './PaymentMethods';
import Settings from './Settings';

const Profile = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Sekmeler için içerik yönetimi
    const getTabContent = () => {
        switch (activeTab) {
            case 0:
                return <ProfileInfo />;
            case 1:
                return <PastFlights />;
            case 2:
                return <PaymentMethods />;
            case 3:
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{
            backgroundColor: '#D8E1E9',
            minHeight: '90vh',
            py: 6
        }}>
            <Container>
                {/* Profil Başlığı */}
                <Paper sx={{
                    p: 4,
                    mb: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #C5D5EA'
                }}>
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: '#7392B7'
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 50 }} />
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" sx={{ color: '#7392B7', fontWeight: 'bold' }}>
                                Hoşgeldin, Kullanıcı
                            </Typography>
                            <Typography color="text.secondary">
                                user@example.com
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Sekmeler */}
                <Paper sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #C5D5EA'
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            '& .MuiTab-root.Mui-selected': {
                                color: '#7392B7'
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#7392B7'
                            }
                        }}
                    >
                        <Tab
                            icon={<PersonIcon />}
                            label="Profil Bilgileri"
                            iconPosition="start"
                        />
                        <Tab
                            icon={<FlightIcon />}
                            label="Geçmiş Uçuşlar"
                            iconPosition="start"
                        />
                        <Tab
                            icon={<CreditCardIcon />}
                            label="Ödeme Yöntemleri"
                            iconPosition="start"
                        />
                        <Tab
                            icon={<SettingsIcon />}
                            label="Ayarlar"
                            iconPosition="start"
                        />
                    </Tabs>

                    <Box sx={{ p: 3 }}>
                        {getTabContent()}
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Profile;