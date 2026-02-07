'use strict';

let bookingData = null;

/**
 * Initialize payment page
 */
function initPaymentPage() {
    loadBookingData();
    initPaymentTabs();
    initCardForm();
    initPromoCode();
    initFormSubmissions();
}

/**
 * Load booking data from session storage
 */
function loadBookingData() {
    const data = sessionStorage.getItem('zendesi_booking');
    
    if (!data) {
        // Redirect to home if no booking data
        window.location.href = 'index.html';
        return;
    }
    
    bookingData = JSON.parse(data);
    renderBookingSummary();
}

/**
 * Render booking summary
 */
function renderBookingSummary() {
    if (!bookingData) return;
    
    const { hotel, destination, checkin, checkout, nights, guests, rooms, subtotal, taxes, total } = bookingData;
    
    // Hotel info
    document.getElementById('hotel-image').src = hotel.image;
    document.getElementById('hotel-name').textContent = hotel.name;
    document.getElementById('hotel-location').textContent = destination;
    document.getElementById('hotel-stars').textContent = getStars(hotel.rating);
    document.getElementById('hotel-rating').textContent = hotel.rating;
    
    // Booking details
    document.getElementById('checkin-date').textContent = formatDate(checkin);
    document.getElementById('checkout-date').textContent = formatDate(checkout);
    document.getElementById('nights-count').textContent = `${nights} night${nights > 1 ? 's' : ''}`;
    document.getElementById('guests-count').textContent = `${guests} guest${guests > 1 ? 's' : ''}`;
    document.getElementById('rooms-count').textContent = `${rooms} room${rooms > 1 ? 's' : ''}`;
    
    // Prices
    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('taxes').textContent = `₹${taxes.toLocaleString()}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString()}`;
    
    // Update all pay buttons
    const totalFormatted = `₹${total.toLocaleString()}`;
    document.getElementById('pay-amount').textContent = totalFormatted;
    document.querySelectorAll('.upi-pay-amount, .nb-pay-amount, .wallet-pay-amount').forEach(el => {
        el.textContent = totalFormatted;
    });
}

function getStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '½';
    return stars;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
}

/**
 * Payment method tabs
 */
function initPaymentTabs() {
    const tabs = document.querySelectorAll('.payment-tab');
    const forms = document.querySelectorAll('.payment-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const method = tab.dataset.method;
            
            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update forms
            forms.forEach(f => f.classList.remove('active'));
            document.getElementById(`${method}-form`).classList.add('active');
        });
    });
}

/**
 * Card form interactions
 */
function initCardForm() {
    const cardNumber = document.getElementById('card-number');
    const cardName = document.getElementById('card-name');
    const cardExpiry = document.getElementById('card-expiry');
    
    // Card number formatting and preview
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        value = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = value;
        
        // Update preview
        const preview = document.getElementById('preview-number');
        if (value.length > 0) {
            preview.textContent = value.padEnd(19, '•').replace(/(\S{4})/g, '$1 ').trim();
        } else {
            preview.textContent = '•••• •••• •••• ••••';
        }
        
        // Detect card type and highlight brand
        const brands = document.querySelectorAll('.brand');
        brands.forEach(b => b.classList.remove('active'));
        
        const firstDigit = value.replace(/\s/g, '')[0];
        if (firstDigit === '4') {
            document.querySelector('.brand.visa').classList.add('active');
        } else if (firstDigit === '5') {
            document.querySelector('.brand.mastercard').classList.add('active');
        } else if (firstDigit === '6') {
            document.querySelector('.brand.rupay').classList.add('active');
        }
    });
    
    // Card name preview
    cardName.addEventListener('input', (e) => {
        const preview = document.getElementById('preview-name');
        preview.textContent = e.target.value.toUpperCase() || 'YOUR NAME';
    });
    
    // Card expiry formatting and preview
    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
        
        const preview = document.getElementById('preview-expiry');
        preview.textContent = value || 'MM/YY';
    });
}

/**
 * Promo code functionality
 */
function initPromoCode() {
    const toggle = document.getElementById('promo-toggle');
    const form = document.getElementById('promo-form');
    const applyBtn = document.getElementById('apply-promo');
    const message = document.getElementById('promo-message');
    
    toggle.addEventListener('click', () => {
        form.classList.toggle('open');
        const icon = toggle.querySelector('.toggle-icon');
        icon.textContent = form.classList.contains('open') ? '−' : '+';
    });
    
    applyBtn.addEventListener('click', () => {
        const code = document.getElementById('promo-code').value.trim().toUpperCase();
        
        // Demo promo codes
        const promoCodes = {
            'ZENDESI10': 0.10,
            'INDIA20': 0.20,
            'FIRST15': 0.15
        };
        
        if (promoCodes[code]) {
            const discount = Math.round(bookingData.total * promoCodes[code]);
            bookingData.discount = discount;
            bookingData.finalTotal = bookingData.total - discount;
            
            message.textContent = `🎉 Promo applied! You save ₹${discount.toLocaleString()}`;
            message.className = 'promo-message success';
            
            // Update total display
            document.getElementById('total').textContent = `₹${bookingData.finalTotal.toLocaleString()}`;
            const totalFormatted = `₹${bookingData.finalTotal.toLocaleString()}`;
            document.getElementById('pay-amount').textContent = totalFormatted;
            document.querySelectorAll('.upi-pay-amount, .nb-pay-amount, .wallet-pay-amount').forEach(el => {
                el.textContent = totalFormatted;
            });
        } else {
            message.textContent = 'Invalid promo code';
            message.className = 'promo-message error';
        }
    });
}

/**
 * Form submissions
 */
function initFormSubmissions() {
    const forms = document.querySelectorAll('.payment-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handlePayment);
    });
}

async function handlePayment(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.pay-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate booking ID
    const bookingId = 'ZEN' + Date.now().toString(36).toUpperCase();
    
    // Save confirmation data
    const confirmationData = {
        ...bookingData,
        bookingId,
        paymentMethod: e.target.id.replace('-form', ''),
        paymentDate: new Date().toISOString(),
        status: 'confirmed'
    };
    
    sessionStorage.setItem('zendesi_confirmation', JSON.stringify(confirmationData));
    
    // Redirect to confirmation page
    window.location.href = 'booking.html';
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPaymentPage);
} else {
    initPaymentPage();
}
