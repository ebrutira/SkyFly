import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const BookingSteps = ({ activeStep }) => {
    // Rezervasyon sürecindeki adımları tanımlıyoruz
    const steps = ['Uçuş Detayları', 'Yolcu Bilgileri', 'Ödeme'];

    return (
        <Box sx={{ width: '100%', mb: 4 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default BookingSteps;