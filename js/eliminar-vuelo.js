const eliminarVueloBtn = document.querySelector('.eliminarVuelo');

eliminarVueloBtn.addEventListener('click', eliminarPasaje);

function eliminarPasaje() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    // Obtener el pasaje del localStorage
    const pasaje = JSON.parse(localStorage.getItem('pasaje'));

    // Comprobar si el pasaje existe y si pertenece al usuario de la sesión actual
    if (pasaje && pasaje.usuario === userData) {
        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará tu pasaje',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminar el pasaje del localStorage
                localStorage.removeItem('pasaje');

                Swal.fire({
                    icon: 'success',
                    title: 'Pasaje eliminado',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true
                }).then(() => {
                    window.location.href = 'viajes.html';
                });
            }
        });
    }
}
