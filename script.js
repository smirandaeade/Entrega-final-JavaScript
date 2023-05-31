const myForm = document.querySelector('#myForm');
const fechaActual = new Date().toISOString().split('T')[0];
const fechaNacimiento = document.getElementById('fecha-nac');
fechaNacimiento.setAttribute('max', fechaActual);


myForm.addEventListener('submit', (event) => {
    
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


    if (!validarCampo(nombre, '#nombre-error')) {
        event.preventDefault();
    }
    if (!validarCampo(apellido1, '#apellido1-error')) {
        event.preventDefault();
    }
    if (!validarCampo(apellido2, '#apellido2-error')) {
        event.preventDefault();
    }
    if (edad < 18) {
        event.preventDefault();
        fechaError.textContent = 'Debe tener al menos 18 años'
    }
    if (!Fn.validaRut(rut)) {
        event.preventDefault();
        rutError.textContent = 'Rut invalido'
    }

    console.log(rut);
});

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
	validaRut : function (rutCompleto) {
		rutCompleto = rutCompleto.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}
