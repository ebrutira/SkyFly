import React, { useState } from 'react';
import {
    Box,
    Typography,
    Switch,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
    Snackbar,
    Paper
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        promotionalEmails: true,
        twoFactorAuth: false,
        language: 'Türkçe',
        privacyMode: false
    });

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSettingChange = (setting) => (event) => {
        setSettings({
            ...settings,
            [setting]: event.target.checked
        });

        setSnackbar({
            open: true,
            message: 'Ayarlarınız başarıyla güncellendi!',
            severity: 'success'
        });
    };

    const handlePasswordChange = () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setSnackbar({
                open: true,
                message: 'Yeni şifreler eşleşmiyor!',
                severity: 'error'
            });
            return;
        }

        // Burada API çağrısı yapılacak
        setOpenPasswordDialog(false);
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setSnackbar({
            open: true,
            message: 'Şifreniz başarıyla güncellendi!',
            severity: 'success'
        });
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3, color: '#7392B7' }}>
                Hesap Ayarları
            </Typography>

            <Paper sx={{
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #C5D5EA'
            }}>
                <List>
                    {/* Bildirim Ayarları */}
                    <ListItem>
                        <ListItemIcon>
                            <NotificationsIcon sx={{ color: '#7392B7' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="E-posta Bildirimleri"
                            secondary="Uçuş güncellemeleri ve önemli bildirimler"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.emailNotifications}
                                onChange={handleSettingChange('emailNotifications')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <ListItemIcon>
                            <PhoneIcon sx={{ color: '#7392B7' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="SMS Bildirimleri"
                            secondary="Acil durum ve uçuş değişiklikleri"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.smsNotifications}
                                onChange={handleSettingChange('smsNotifications')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />

                    <ListItem>
                        <ListItemIcon>
                            <EmailIcon sx={{ color: '#7392B7' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Promosyon E-postaları"
                            secondary="Özel teklifler ve kampanyalar"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.promotionalEmails}
                                onChange={handleSettingChange('promotionalEmails')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />

                    {/* Güvenlik Ayarları */}
                    <ListItem>
                        <ListItemIcon>
                            <SecurityIcon sx={{ color: '#7392B7' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="İki Faktörlü Doğrulama"
                            secondary="Ek güvenlik katmanı"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.twoFactorAuth}
                                onChange={handleSettingChange('twoFactorAuth')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />

                    {/* Dil Ayarları */}
                    <ListItem>
                        <ListItemIcon>
                            <LanguageIcon sx={{ color: '#7392B7' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Dil"
                            secondary={settings.language}
                        />
                        <ListItemSecondaryAction>
                            <Button
                                size="small"
                                sx={{ color: '#7392B7' }}
                            >
                                Değiştir
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>

                    <Divider />

                    {/* Gizlilik Ayarları */}
                    <ListItem>
                        <ListItemIcon>
                            <PrivacyTipIcon sx={{ color: '#7392B7' }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Gizlilik Modu"
                            secondary="Profil bilgilerini gizle"
                        />
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                checked={settings.privacyMode}
                                onChange={handleSettingChange('privacyMode')}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>

            {/* Şifre Değiştirme Butonu */}
            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => setOpenPasswordDialog(true)}
                    sx={{
                        bgcolor: '#7392B7',
                        '&:hover': {
                            bgcolor: '#759EB8'
                        }
                    }}
                >
                    Şifre Değiştir
                </Button>
            </Box>

            {/* Şifre Değiştirme Dialog */}
            <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
                <DialogTitle>Şifre Değiştir</DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 1 }}>
                        <TextField
                            fullWidth
                            type="password"
                            label="Mevcut Şifre"
                            margin="normal"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({
                                ...passwordForm,
                                currentPassword: e.target.value
                            })}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Yeni Şifre"
                            margin="normal"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({
                                ...passwordForm,
                                newPassword: e.target.value
                            })}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Yeni Şifre (Tekrar)"
                            margin="normal"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({
                                ...passwordForm,
                                confirmPassword: e.target.value
                            })}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPasswordDialog(false)}>
                        İptal
                    </Button>
                    <Button
                        onClick={handlePasswordChange}
                        sx={{ color: '#7392B7' }}
                    >
                        Değiştir
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

export default Settings;