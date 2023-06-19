// Obtener el elemento de cierre de sesión
var exitButton = document.getElementById('exit');

// Agregar un event listener al botón de cierre de sesión
exitButton.addEventListener('click', function() {
    // Eliminar el usuario de la sesión
    sessionStorage.removeItem('userData');
});
