// scripts.js

// Elementos del DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const accountForm = document.getElementById('account-form');
const loginFeedback = document.getElementById('login-feedback');
const registerFeedback = document.getElementById('register-feedback');
const accountFeedback = document.getElementById('account-feedback');

function updateUserMenu() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    document.getElementById('login-link').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('register-link').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('account-link').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('logout-link').style.display = isLoggedIn ? 'block' : 'none';
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simular validación de usuario
    if (email && password) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    } else {
        loginFeedback.textContent = 'Por favor, completa todos los campos.';
    }
});

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (password !== confirmPassword) {
        registerFeedback.textContent = 'Las contraseñas no coinciden.';
        return;
    }
    
    // Simular registro de usuario
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'login.html';
});

accountForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('account-name').value;
    const email = document.getElementById('account-email').value;
    const password = document.getElementById('account-password').value;
    
    // Validaciones simples y actualización simulada
    if (name && email) {
        // Aquí puedes agregar lógica para subir el archivo de imagen del perfil si es necesario
        accountFeedback.textContent = 'Cambios guardados exitosamente.';
    } else {
        accountFeedback.textContent = 'Por favor, completa todos los campos.';
    }
});

document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

document.addEventListener('DOMContentLoaded', updateUserMenu);

document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    updateUserMenu();
    window.location.href = 'login.html';
});
