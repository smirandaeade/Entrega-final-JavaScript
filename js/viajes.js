for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    console.log('Key: ' + key + ', Value: ' + value);
}

for (var i = 0; i < sessionStorage.length; i++) {
    var key = sessionStorage.key(i);
    var value = sessionStorage.getItem(key);
    console.log('Key: ' + key + ', Value: ' + value);
}

// Obtener el objeto "pasaje" del sessionStorage
var pasaje = JSON.parse(localStorage.getItem('pasaje'));

// Obtener el elemento HTML donde se mostrará el objeto "pasaje"
var pasajeInfo = document.getElementById('pasajeInfo');

// Comprobar si el objeto "pasaje" existe en el sessionStorage
if (pasaje.usuario && pasaje.usuario === JSON.parse(sessionStorage.getItem('userData'))) {
    // Crear una cadena con los datos del objeto "pasaje"
    var pasajeTexto = 'Origen: ' + pasaje.origen + '<br>' +
        'Destino: ' + pasaje.destino + '<br>' + pasaje.fechaVuelo + '<br>' +
        'Plataforma de lanzamiento: ' + pasaje.plataforma;

    // Asignar el texto al elemento HTML para mostrar los datos del objeto "pasaje"
    pasajeInfo.innerHTML = pasajeTexto;
} else {
    // El objeto "pasaje" no está presente en el localStorage o no coincide con el usuario actual
    pasajeInfo.innerHTML = 'No existen pasajes comprados por este usuario.<br><br><a href="./comprapasaje.html"><button>Comprar pasajes</button>';
}
