export const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export const formatPrice = (price) => {
    if (!price) return '0 ₺';
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(price);
};

export const formatCardNumber = (value) => {
    if (!value) return '';
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(' ');
    }
    return value;
};

export const formatExpiryDate = (value) => {
    if (!value) return '';
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if (v.length >= 2) {
        const month = v.slice(0, 2);
        const year = v.slice(2, 4);

        if (parseInt(month) > 12) {
            return '12/' + year;
        }

        return month + (year ? '/' + year : '');
    }
    return v;
};

export const validatePaymentForm = (cardData) => {
    const errors = {};

    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
        errors.cardNumber = 'Geçerli bir kart numarası giriniz';
    }

    if (!cardData.expiryDate || !cardData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        errors.expiryDate = 'Geçerli bir son kullanma tarihi giriniz (AA/YY)';
    }

    if (!cardData.cvv || cardData.cvv.length !== 3) {
        errors.cvv = 'Geçerli bir CVV giriniz';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};