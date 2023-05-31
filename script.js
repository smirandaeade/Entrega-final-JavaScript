const myForm = document.querySelector('#myForm');
const fechaActual = new Date().toISOString().split('T')[0];

myForm.addEventListener('submit', (event) => {
    const nombre = document.querySelector('#nombre-input').value;
    const apellido1 = document.querySelector('#apellido1-input').value;
    const apellido2 = document.querySelector('#apellido2-input').value;
    const fechaNacimiento = document.getElementById('fecha-nac');
    fechaNacimiento.setAttribute('max', fechaActual);

    if (!validarCampo(nombre, '#nombre-error')){
        event.preventDefault(); // Evita el envío del formulario
    }
    if(!validarCampo(apellido1, '#apellido1-error')){
        event.preventDefault(); // Evita el envío del formulario
    }
    if(!validarCampo(apellido2, '#apellido2-error')){
        event.preventDefault(); // Evita el envío del formulario
    }

    
});

const validarCampo = (valor, errorSelector) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/; // Expresión regular para permitir solo letras (mayúsculas, minúsculas y acentuadas)
    const errorSpan = document.querySelector(errorSelector);

    if (!regex.test(valor)) {
        errorSpan.textContent = 'El campo no debe contener números ni espacios';
        return false;
    } else {
        errorSpan.textContent = '';
        return true;
    }
}; z