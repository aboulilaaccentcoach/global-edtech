// ---------- API Configuration ----------
const API_BASE = '/api';

// ---------- Authentication Functions ----------
async function signup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const resultDiv = document.getElementById('signup-result');
    
    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            resultDiv.className = 'result-message success';
            resultDiv.innerHTML = `
                ✅ Account created!<br>
                <strong>Email:</strong> ${data.email}<br>
                <strong>Password:</strong> <span style="font-family: monospace;">${data.password}</span><br>
                <small>Please save this password. You can now login.</small>
            `;
            resultDiv.style.display = 'block';
            
            // Clear form
            document.getElementById('signup-email').value = '';
            
            // Switch to login after 3 seconds
            setTimeout(() => {
                switchModal('signup-modal', 'login-modal');
                resultDiv.style.display = 'none';
            }, 30000);
        } else {
            resultDiv.className = 'result-message error';
            resultDiv.textContent = data.error || 'Signup failed';
            resultDiv.style.display = 'block';
        }
    } catch (error) {
        resultDiv.className = 'result-message error';
        resultDiv.textContent = 'Network error. Please try again.';
        resultDiv.style.display = 'block';
    }
}

async function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            errorDiv.style.display = 'none';
            closeModal('login-modal');
            updateUI(data.user);
            loadServices();
        } else {
            errorDiv.textContent = data.error || 'Login failed';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        errorDiv.textContent = 'Network error. Please try again.';
        errorDiv.style.display = 'block';
    }
}

async function logout() {
    try {
        await fetch(`${API_BASE}/logout`, { method: 'POST' });
        updateUI(null);
        loadServices();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

async function forgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;
    const resultDiv = document.getElementById('forgot-result');
    
    try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            resultDiv.className = 'result-message success';
            resultDiv.innerHTML = `
                ✅ New password generated!<br>
                <strong>Email:</strong> ${data.email}<br>
                <strong>New Password:</strong> <span style="font-family: monospace;">${data.new_password}</span><br>
                <small>Please login with your new password.</small>
            `;
            resultDiv.style.display = 'block';
            resultDiv.style.marginTop = '-150px';
            resultDiv.style.zIndex = '9999';
            
            setTimeout(() => {
                switchModal('forgot-modal', 'login-modal');
                resultDiv.style.display = 'none';
            }, 30000);
        } else {
            resultDiv.className = 'result-message error';
            resultDiv.textContent = data.error || 'Password reset failed';
            resultDiv.style.display = 'block';
        }
    } catch (error) {
        resultDiv.className = 'result-message error';
        resultDiv.textContent = 'Network error. Please try again.';
        resultDiv.style.display = 'block';
    }
}

// ---------- UI Functions ----------
function updateUI(user) {
    const authButtons = document.getElementById('auth-buttons');
    const userInfo = document.getElementById('user-info');
    const userEmail = document.getElementById('user-email');
    
    if (user) {
        authButtons.style.display = 'none';
        userInfo.style.display = 'flex';
        userEmail.textContent = user.email;
    } else {
        authButtons.style.display = 'flex';
        userInfo.style.display = 'none';
        sessionStorage.clear();
    }
}

function checkAuth() {
    fetch(`${API_BASE}/check-auth`)
        .then(res => res.json())
        .then(data => {
            if (data.authenticated) {
                updateUI(data.user);
            } else {
                updateUI(null);
            }
            loadServices();
        })
        .catch(() => updateUI(null));
}

// ---------- Modal Functions ----------
function showLogin() {
    document.getElementById('login-modal').style.display = 'block';
    document.getElementById('login-error').style.display = 'none';
}

function showSignup() {
    document.getElementById('signup-modal').style.display = 'block';
    document.getElementById('signup-result').style.display = 'none';
}

function showForgotPassword() {
    closeModal('login-modal');
    document.getElementById('forgot-modal').style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function switchModal(from, to) {
    closeModal(from);
    document.getElementById(to).style.display = 'block';
}

// Close modal on click outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// ---------- Services Functions ----------
async function loadServices() {
    try {
        const response = await fetch(`${API_BASE}/services`);
        const services = await response.json();
        renderServices(services);
    } catch (error) {
        console.error('Error loading services:', error);
        document.getElementById('services-grid').innerHTML = `
            <div class="error-message" style="display:block;grid-column:1/-1;text-align:center;">
                Failed to load services. Please refresh the page.
            </div>
        `;
    }
}

function renderServices(services) {
    const grid = document.getElementById('services-grid');
    const isAuthenticated = document.getElementById('user-info').style.display !== 'none';
    
    grid.innerHTML = services.map(service => {
        let subServicesHTML = '';
        if (service.sub_pages) {
            subServicesHTML = `
                <div class="sub-services">
                    ${service.sub_pages.map(sub => `
                        <span class="sub-service-tag">${sub.name}</span>
                    `).join('')}
                </div>
            `;
        }
        
        const requiresAuth = service.requires_auth;
        const isLocked = requiresAuth && !isAuthenticated;
       
        const cardBackground = service.path.includes('sat') ? 'url("css/images/sat.jpg")' : service.path.includes('exam1') ? 'url("css/images/ielts1.jpg")' : service.path.includes('exam2') ? 'url("css/images/ielts2.jpg")' : service.path.includes('ACCENT') ? 'url("css/images/american_accent.jpg")' : service.path.includes('SPEAKING') ? 'url("css/images/ielts_speaking.jpg")' : service.path.includes('international') ? 'url("css/images/international_speaker.jpg")' : 'none';
        
        return `
            <div class="service-card" style="background-image: ${cardBackground};" onclick="${isLocked ? "showLogin()" : `navigateTo('${service.path}')`}">
                <span class="icon">${service.icon}</span>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                ${subServicesHTML}
                <span class="badge ${requiresAuth ? 'badge-auth' : 'badge-free'}">
                    ${requiresAuth ? '🔒 Login Required' : '🌟 Free'}
                </span>
                ${isLocked ? '<span class="lock-icon">🔒</span>' : ''}
            </div>
        `;
    }).join('');
}

function navigateTo(path) {
    // If path is a directory (ends with /), we need to handle it
    if (path.endsWith('/')) {
        // For IELTS exams, we'll show a sub-navigation
        window.location.href = path;
    } else {
        window.location.href = path;
    }
}

// ---------- Initialize ----------
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
});

// ---------- Expose Functions to Global Scope ----------
window.showLogin = showLogin;
window.showSignup = showSignup;
window.showForgotPassword = showForgotPassword;
window.closeModal = closeModal;
window.switchModal = switchModal;
window.login = login;
window.signup = signup;
window.logout = logout;
window.forgotPassword = forgotPassword;
window.navigateTo = navigateTo;
window.loadServices = loadServices;