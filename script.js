for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    console.log('Key: ' + key + ', Value: ' + value);
}

//formulario de Registro
document.addEventListener('DOMContentLoaded', function () {

    const myForm = document.getElementById('formulario-registro');
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaNacimiento = document.getElementById('fecha-nac');
    fechaNacimiento.setAttribute('max', fechaActual);

    const validarCampo = (valor, errorSelector) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
        const errorSpan = document.querySelector(errorSelector);

        if (!regex.test(valor)) {
            errorSpan.textContent = 'El campo no debe contener números ni espacios';
            return false;
        } else {
            errorSpan.textContent = '';
            return true;
        }
    };

    var Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X"
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-");
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false;
            var tmp = rutCompleto.split('-');
            var digv = tmp[1];
            var rut = tmp[0];
            if (digv == 'K') digv = 'k';

            return (Fn.dv(rut) == digv);
        },
        dv: function (T) {
            var M = 0, S = 1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return S ? S - 1 : 'k';
        }
    }

    myForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const nombre = document.querySelector('#nombre-input').value;
        const apellido1 = document.querySelector('#apellido1-input').value;
        const apellido2 = document.querySelector('#apellido2-input').value;
        const fechaSeleccionada = new Date(fechaNacimiento.value);
        const currentDate = new Date();
        const edad = currentDate.getFullYear() - fechaSeleccionada.getFullYear();
        const rut = document.getElementById('run').value;
        const fechaError = document.getElementById('fecha-error');
        const rutError = document.getElementById('run-error');

        fechaError.textContent = '';
        rutError.textContent = '';

        validarCampo(nombre, '#nombre-error');
        validarCampo(apellido1, '#apellido1-error');
        validarCampo(apellido2, '#apellido2-error');

        if (edad < 18) {
            fechaError.textContent = 'Debe tener al menos 18 años';
            return false;
        }
        if (!Fn.validaRut(rut)) {
            rutError.textContent = 'Rut invalido';
            return false;
        }

        const rutExistente = localStorage.getItem(rut);
        if (rutExistente) {
            alert('Rut ya registrado');
            rutError.textContent = 'Este rut ya existe';
            return false;
        }

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const storedData = JSON.parse(localStorage.getItem(key));
            if (storedData && storedData.email === document.getElementById('correo').value) {
                alert('El correo electrónico ya está en uso');
                return false;
            }
        }

        const formData = {
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            fechaNacimiento: fechaSeleccionada,
            email: document.getElementById('correo').value,
            password: document.getElementById('pass').value
        };

        // Guardar el objeto en el LocalStorage
        localStorage.setItem(rut, JSON.stringify(formData));

        alert('registro exitoso');
        myForm.reset();
        window.location.href = 'index.html';

    })
})

// formulario Login
document.addEventListener('DOMContentLoaded', function () {

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
                break;
            }
        }

        if (userFound) {
            alert('Inicio de sesión exitoso');
            
        } else {
            alert('Correo o contraseña incorrectos');
        }
    })
})