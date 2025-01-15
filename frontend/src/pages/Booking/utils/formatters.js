// Tarih ve saat formatı için yardımcı fonksiyon
export const formatDateTime = (dateTimeStr) => {
    try {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Date formatting error:', error);
        return dateTimeStr; // Hata durumunda orijinal string'i döndür
    }
};

// Para birimi formatı için yardımcı fonksiyon
export const formatPrice = (price) => {
    try {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(price);
    } catch (error) {
        console.error('Price formatting error:', error);
        return `${price} TL`; // Hata durumunda basit format
    }
};

// TC Kimlik numarası formatı için yardımcı fonksiyon
export const formatIdentityNumber = (number) => {
    if (!number) return '';
    const cleaned = number.replace(/\D/g, ''); // Sadece rakamları al
    return cleaned.slice(0, 11); // 11 karakterle sınırla
};