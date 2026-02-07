'use strict';

const BACKEND_URL = 'http://localhost:5000';

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleBtns = document.querySelectorAll('.toggle-btn');
const authMessage = document.getElementById('auth-message');
const toggleSlider = document.querySelector('.toggle-slider');

/**
 * Initialize auth page
 */
function initAuthPage() {
    initFormToggle();
    initPasswordToggles();
    initFormSubmissions();
    initAnimations();
    checkRedirectParam();
}

/**
 * Check if user was redirected and show appropriate form
 */
function checkRedirectParam() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const redirect = params.get('redirect');
    
    if (mode === 'signup') {
        switchForm('signup');
    }
    
    if (redirect) {
        sessionStorage.setItem('redirectAfterAuth', redirect);
    }
}

/**
 * Form toggle between login and signup
 */
function initFormToggle() {
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const formType = btn.dataset.form;
            switchForm(formType);
        });
    });
}

function switchForm(formType) {
    toggleBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.form === formType);
    });
    
    // Move slider
    if (formType === 'signup') {
        toggleSlider.style.transform = 'translateX(100%)';
    } else {
        toggleSlider.style.transform = 'translateX(0)';
    }
    
    // Toggle forms with animation
    if (formType === 'login') {
        signupForm.classList.remove('active');
        setTimeout(() => {
            loginForm.classList.add('active');
        }, 150);
    } else {
        loginForm.classList.remove('active');
        setTimeout(() => {
            signupForm.classList.add('active');
        }, 150);
    }
    
    // Clear messages
    hideMessage();
}

/**
 * Password visibility toggles
 */
function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            btn.textContent = isPassword ? '🙈' : '👁️';
        });
    });
}

/**
 * Form submissions
 */
function initFormSubmissions() {
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const submitBtn = loginForm.querySelector('.submit-btn');
    
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    setLoading(submitBtn, true);
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        // Save token and user data
        localStorage.setItem('zendesi_token', data.token);
        localStorage.setItem('zendesi_user', JSON.stringify(data.user));
        
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect after short delay
        setTimeout(() => {
            const redirect = sessionStorage.getItem('redirectAfterAuth');
            if (redirect) {
                sessionStorage.removeItem('redirectAfterAuth');
                window.location.href = redirect;
            } else {
                window.location.href = 'index.html';
            }
        }, 1500);
        
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        setLoading(submitBtn, false);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    const terms = document.getElementById('terms').checked;
    const submitBtn = signupForm.querySelector('.submit-btn');
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (!terms) {
        showMessage('Please accept the terms and conditions', 'error');
        return;
    }
    
    setLoading(submitBtn, true);
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
        }
        
        // Save token and user data
        localStorage.setItem('zendesi_token', data.token);
        localStorage.setItem('zendesi_user', JSON.stringify(data.user));
        
        showMessage('Account created successfully! Redirecting...', 'success');
        
        // Redirect after short delay
        setTimeout(() => {
            const redirect = sessionStorage.getItem('redirectAfterAuth');
            if (redirect) {
                sessionStorage.removeItem('redirectAfterAuth');
                window.location.href = redirect;
            } else {
                window.location.href = 'index.html';
            }
        }, 1500);
        
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        setLoading(submitBtn, false);
    }
}

/**
 * UI Helpers
 */
function showMessage(text, type) {
    authMessage.textContent = text;
    authMessage.className = `auth-message ${type} show`;
    
    if (type === 'error') {
        authMessage.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            authMessage.style.animation = '';
        }, 500);
    }
}

function hideMessage() {
    authMessage.className = 'auth-message';
    authMessage.textContent = '';
}

function setLoading(btn, isLoading) {
    btn.classList.toggle('loading', isLoading);
    btn.disabled = isLoading;
}

/**
 * Animations
 */
function initAnimations() {
    // Animate shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animate form inputs on focus
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if already has value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add ripple effect to buttons
    document.querySelectorAll('.submit-btn, .social-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthPage);
} else {
    initAuthPage();
}
