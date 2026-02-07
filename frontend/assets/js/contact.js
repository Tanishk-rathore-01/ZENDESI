'use strict';

function initContactPage() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const toast = document.createElement('div');
    toast.className = 'toast hidden';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        setTimeout(() => {
            toast.className = 'toast hidden';
        }, 3200);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submit = form.querySelector('button[type="submit"]');
        submit?.classList.add('loading');
        submit?.setAttribute('disabled', 'true');

        setTimeout(() => {
            form.reset();
            submit?.classList.remove('loading');
            submit?.removeAttribute('disabled');
            showToast('Message sent! Our team will reply within 24 hours.', 'success');
        }, 900);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
} else {
    initContactPage();
}

