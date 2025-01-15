import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

const PassengerForm = ({ passengers, setPassengers }) => {
    // Yolcu bilgilerini güncelleme fonksiyonu
    const handleInputChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index] = {
            ...updatedPassengers[index],
            [field]: value
        };
        setPassengers(updatedPassengers);
    };

    // Yolcu silme fonksiyonu
    const handleRemovePassenger = (index) => {
        if (passengers.length > 1) {
            const updatedPassengers = passengers.filter((_, i) => i !== index);
            setPassengers(updatedPassengers);
        }
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3, color: '#7392B7' }}>
                Yolcu Bilgileri
            </Typography>

            {passengers.map((passenger, index) => (
                <Paper key={index} sx={{ p: 3, mb: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1, color: '#7392B7' }} />
                            <Typography variant="h6">
                                {`${index + 1}. Yolcu`}
                            </Typography>
                        </Box>

                        {passengers.length > 1 && (
                            <IconButton
                                onClick={() => handleRemovePassenger(index)}
                                color="error"
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Ad"
                                required
                                value={passenger.firstName}
                                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Soyad"
                                required
                                value={passenger.lastName}
                                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Doğum Tarihi"
                                type="date"
                                required
                                InputLabelProps={{ shrink: true }}
                                value={passenger.birthDate}
                                onChange={(e) => handleInputChange(index, 'birthDate', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="TC Kimlik No"
                                required
                                value={passenger.identityNumber}
                                onChange={(e) => handleInputChange(index, 'identityNumber', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Box>
    );
};

export default PassengerForm;