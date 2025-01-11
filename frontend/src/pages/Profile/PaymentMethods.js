import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const PaymentMethods = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            cardNumber: '**** **** **** 1234',
            cardHolder: 'John Doe',
            expiryDate: '12/25',
            type: 'Mastercard'
        },
        {
            id: 2,
            cardNumber: '**** **** **** 5678',
            cardHolder: 'John Doe',
            expiryDate: '09/24',
            type: 'Visa'
        }
    ]);

    const [openDialog, setOpenDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const [newCard, setNewCard] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    const handleAddCard = () => {
        // Normalde burada API çağrısı yapılacak
        const newCardData = {
            id: cards.length + 1,
            cardNumber: '**** **** **** ' + newCard.cardNumber.slice(-4),
            cardHolder: newCard.cardHolder,
            expiryDate: newCard.expiryDate,
            type: 'New Card'
        };

        setCards([...cards, newCardData]);
        setOpenDialog(false);
        setSnackbar({
            open: true,
            message: 'Kart başarıyla eklendi!',
            severity: 'success'
        });
        setNewCard({ cardNumber: '', cardHolder: '', expiryDate: '', cvv: '' });
    };

    const handleDeleteCard = (cardId) => {
        setCards(cards.filter(card => card.id !== cardId));
        setSnackbar({
            open: true,
            message: 'Kart başarıyla silindi!',
            severity: 'success'
        });
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#7392B7' }}>
                    Kayıtlı Kartlarınız
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{
                        bgcolor: '#7392B7',
                        '&:hover': {
                            bgcolor: '#759EB8'
                        }
                    }}
                >
                    Yeni Kart Ekle
                </Button>
            </Box>

            <Grid container spacing={2}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} key={card.id}>
                        <Card
                            sx={{
                                bgcolor: '#7392B7',
                                color: 'white',
                                position: 'relative',
                                '&:hover': {
                                    boxShadow: '0 4px 8px rgba(115, 146, 183, 0.2)',
                                }
                            }}
                        >
                            <CardContent>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <CreditCardIcon sx={{ fontSize: 40 }} />
                                    <IconButton
                                        onClick={() => handleDeleteCard(card.id)}
                                        sx={{ color: 'white' }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    {card.cardNumber}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 2
                                }}>
                                    <Typography variant="body2">
                                        {card.cardHolder}
                                    </Typography>
                                    <Typography variant="body2">
                                        {card.expiryDate}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16,
                                        right: 16,
                                        opacity: 0.8
                                    }}
                                >
                                    {card.type}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Yeni Kart Ekleme Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Yeni Kart Ekle</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Kart Numarası"
                                value={newCard.cardNumber}
                                onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Kart Üzerindeki İsim"
                                value={newCard.cardHolder}
                                onChange={(e) => setNewCard({...newCard, cardHolder: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Son Kullanma Tarihi (AA/YY)"
                                value={newCard.expiryDate}
                                onChange={(e) => setNewCard({...newCard, expiryDate: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="CVV"
                                type="password"
                                value={newCard.cvv}
                                onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>İptal</Button>
                    <Button
                        onClick={handleAddCard}
                        sx={{
                            color: '#7392B7'
                        }}
                    >
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PaymentMethods;