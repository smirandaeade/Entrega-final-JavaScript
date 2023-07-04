// formulario Login

let userData = null;

const loginForm = document.getElementById('formulario-indexsesion');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('correo-index').value;
    const password = document.getElementById('pass-index').value;

    try {
        const storedData = await loginUser(email, password);
        userData = storedData.nombre + ' ' + storedData.apellido1 + ' ' + storedData.apellido2;
        sessionStorage.setItem('userData', JSON.stringify(userData));

        await Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });

        window.location.href = 'menu.html';
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Correo o contraseña incorrectos',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
    }
});

function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        let userFound = false;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const storedData = JSON.parse(localStorage.getItem(key));
            if (storedData && storedData.email === email && storedData.password === password) {
                userFound = true;
                resolve(storedData);
                break;
            }
        }

        if (!userFound) {
            reject();
        }
    });
}
