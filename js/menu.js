const welcomeMessage = document.getElementById('welcome-message');

welcomeMessage.textContent = 'Bienvenido(a): ' + ' ' + JSON.parse(sessionStorage.getItem('userData'));        