// Obtener el objeto "pasaje" del sessionStorage
var pasaje = JSON.parse(localStorage.getItem('pasaje'));

// Obtener el elemento HTML donde se mostrará el objeto "pasaje"
var pasajeInfo = document.getElementById('pasajeInfo');
const btnEliminar = document.querySelector('.eliminarVuelo');


// Comprobar si el objeto "pasaje" existe en el sessionStorage
if (pasaje && pasaje.usuario && pasaje.usuario === JSON.parse(sessionStorage.getItem('userData'))) {
    // Crear una cadena con los datos del objeto "pasaje"
    var pasajeTexto = 'Origen: ' + pasaje.origen + '<br>' +
        'Destino: ' + pasaje.destino + '<br>' + pasaje.fechaVuelo + '<br>' +
        'Plataforma de lanzamiento: ' + pasaje.plataforma;

    // Asignar el texto al elemento HTML para mostrar los datos del objeto "pasaje"
    pasajeInfo.innerHTML = pasajeTexto;
} else {
    // El objeto "pasaje" no está presente en el localStorage o no coincide con el usuario actual
    pasajeInfo.innerHTML = 'No existen pasajes comprados por este usuario.<br><br><a id="linkBuy" href="./comprapasaje.html"><button id="buyTicket">Comprar pasajes</button></a>';
    btnEliminar.remove();
}
