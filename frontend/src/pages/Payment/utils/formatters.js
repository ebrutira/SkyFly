// Kart numarası formatı için yardımcı fonksiyon
export const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
};

// SKT formatı için yardımcı fonksiyon
export const formatExpiryDate = (value) => {
    const cleanValue = value.replace(/\D+/g, '');
    const month = cleanValue.substr(0, 2);
    const year = cleanValue.substr(2, 2);

    if (cleanValue.length >= 2) {
        return `${month}/${year}`;
    }
    return cleanValue;
};

// Form validasyonu
export const validatePaymentForm = (cardData) => {
    const errors = {};

    // Kart numarası kontrolü
    if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
        errors.cardNumber = 'Geçerli bir kart numarası giriniz';
    }

    // SKT kontrolü
    if (!cardData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        errors.expiryDate = 'Geçerli bir son kullanma tarihi giriniz (AA/YY)';
    } else {
        const [month, year] = cardData.expiryDate.split('/');
        const currentDate = new Date();
        const cardDate = new Date(2000 + parseInt(year), parseInt(month) - 1);

        if (cardDate < currentDate) {
            errors.expiryDate = 'Kartınızın süresi dolmuş';
        }
    }

    // CVV kontrolü
    if (cardData.cvv.length !== 3) {
        errors.cvv = 'Geçerli bir CVV giriniz';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Fiyat formatı için yardımcı fonksiyon
export const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(price);
};