
for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    console.log('Key: ' + key + ', Value: ' + value);
}

// formulario Login

let userData = null;

const loginForm = document.getElementById('formulario-indexsesion');

loginForm.addEventListener('submit', (event) => {

    event.preventDefault();


    const email = document.getElementById('correo-index').value;
    const password = document.getElementById('pass-index').value;
    
    let userFound = false;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedData = JSON.parse(localStorage.getItem(key));
        if (storedData && storedData.email === email && storedData.password === password) {
            userFound = true;
            userData = storedData.nombre + ' ' + storedData.apellido1 + ' ' + storedData.apellido2;
            sessionStorage.setItem('userData', JSON.stringify(userData));
            break;
        }
    }

    if (userFound) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'menu.html';
        
    } else {
        alert('Correo o contraseña incorrectos');
    }
})