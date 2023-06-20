// Creación del objeto "vuelos"
var vuelos = {};

// Obtener los elementos <select> de origen y destino
var selectOrigen = document.getElementById("planeta-origin");
var selectDestino = document.getElementById("planeta-dest");

// Obtener las opciones de origen y destino
var opcionesOrigen = selectOrigen.getElementsByTagName("option");
var opcionesDestino = selectDestino.getElementsByTagName("option");

// Obtener la fecha actual
var fechaActual = new Date();

// Iterar sobre las opciones de origen y destino para crear las claves en el objeto "vuelos"
for (var i = 1; i < opcionesOrigen.length; i++) {
    var planetaOrigen = opcionesOrigen[i].value;
    var planetaDestino = opcionesDestino[i].value;

    vuelos[planetaOrigen] = {
        plataforma: obtenerNombrePlataforma(planetaOrigen),
        destinos: generarFechasVueloParaDestinos(opcionesDestino, planetaOrigen, fechaActual)
    };

    vuelos[planetaDestino] = {
        plataforma: obtenerNombrePlataforma(planetaDestino),
        destinos: generarFechasVueloParaDestinos(opcionesOrigen, planetaDestino, fechaActual)
    };
}

// Función para obtener el nombre de la plataforma según el planeta
function obtenerNombrePlataforma(planeta) {
    // Nombres de plataformas más geniales
    switch (planeta) {
        case "mercurio":
            return "Apolo Prime";
        case "venus":
            return "Celestial Nexus";
        case "tierra":
            return "Gaia Station";
        case "marte":
            return "Red Planet Gateway";
        case "luna":
            return "Lunaris Outpost";
        case "titan":
            return "Titanium Citadel";
        default:
            return "Plataforma Desconocida";
    }
}

// Función para generar fechas de vuelo para los destinos
function generarFechasVueloParaDestinos(destinos, planetaActual, fechaInicial) {
    var fechasVuelo = {};

    var fechaActualizada = new Date(fechaInicial);

    for (var i = 1; i < destinos.length; i++) {
        var destino = destinos[i].value;

        if (destino !== planetaActual) {
            var fechasDestino = {};

            for (var j = 0; j < 10; j++) {
                fechaActualizada.setDate(fechaActualizada.getDate() + 30);
                fechasDestino[obtenerFechaFormateada(fechaActualizada)] = 100; // Cantidad de asientos disponibles
            }

            fechasVuelo[destino] = fechasDestino;
        }
    }

    return fechasVuelo;
}

// Función para obtener una fecha en formato "dd/mm/yyyy"
function obtenerFechaFormateada(fecha) {
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();

    return dia + "/" + mes + "/" + anio;
}

// Agregar event listener para detectar cambios en los select de origen y destino
selectOrigen.addEventListener("change", mostrarPosibilidadesDeVuelo);
selectDestino.addEventListener("change", mostrarPosibilidadesDeVuelo);

// Función para mostrar las posibilidades de vuelo según el origen y destino seleccionados
function mostrarPosibilidadesDeVuelo() {
    var origenSeleccionado = selectOrigen.value;
    var destinoSeleccionado = selectDestino.value;

    var listadoPasajesDiv = document.querySelector(".listadoPasajes");
    listadoPasajesDiv.innerHTML = "";

    if (origenSeleccionado && destinoSeleccionado) {
        if (vuelos[origenSeleccionado] && vuelos[origenSeleccionado].destinos[destinoSeleccionado]) {
            var fechasVuelo = vuelos[origenSeleccionado].destinos[destinoSeleccionado];
            var plataformaOrigen = vuelos[origenSeleccionado].plataforma;

            var plataformaTitulo = document.createElement("h3");
            plataformaTitulo.textContent = "Plataforma de Lanzamiento: " + plataformaOrigen;
            listadoPasajesDiv.appendChild(plataformaTitulo);

            for (var fecha in fechasVuelo) {
                var pasajeDiv = document.createElement("div");
                pasajeDiv.textContent = "Fecha de vuelo: " + fecha;

                var asientosDisponibles = fechasVuelo[fecha];
                var asientosDisponiblesSpan = document.createElement("span");
                asientosDisponiblesSpan.textContent = "  || Asientos disponibles: " + asientosDisponibles;
                pasajeDiv.appendChild(asientosDisponiblesSpan);

                var seleccionarBtn = document.createElement("button");
                seleccionarBtn.textContent = "Seleccionar";

                seleccionarBtn.addEventListener("click", function (event) {
                    event.preventDefault(); // Evitar la recarga de la página

                    if (this.textContent === "Seleccionar") {
                        var seleccionados = listadoPasajesDiv.querySelectorAll(".seleccionado");
                        if (seleccionados.length > 0) {
                            swal.fire({
                                title: "Estimado usuario",
                                text: "De acuerdo a las políticas de la Federación Interplanetaria, solo puedes comprar un pasaje por usuario registrado en el sistema. Para poder comprar otro pasaje, debes completar el viaje que tienes agendado.",
                                icon: "info"
                            })
                        } else {
                            this.textContent = "Quitar";
                            this.parentNode.style.backgroundColor = "lightyellow";
                            this.style.backgroundColor = "red";
                            this.parentNode.classList.add("seleccionado");

                            // Actualizar visibilidad del botón Comprar
                            actualizarVisibilidadBotonComprar();
                        }
                    } else {
                        this.textContent = "Seleccionar";
                        this.parentNode.style.backgroundColor = "";
                        this.style.backgroundColor = "";
                        this.parentNode.classList.remove("seleccionado");

                        // Actualizar visibilidad del botón Comprar
                        actualizarVisibilidadBotonComprar();
                    }
                });

                pasajeDiv.appendChild(seleccionarBtn);
                listadoPasajesDiv.appendChild(pasajeDiv);
            }

            // Función para actualizar la visibilidad del botón Comprar
            function actualizarVisibilidadBotonComprar() {
                var btnComprar = document.getElementById("btnComprar");

                if (listadoPasajesDiv.querySelector(".seleccionado")) {
                    btnComprar.style.display = "block";
                } else {
                    btnComprar.style.display = "none";
                }
            }

            // Llamar a la función inicialmente para establecer la visibilidad del botón Comprar
            actualizarVisibilidadBotonComprar();

        } else {
            var mensajeDiv = document.createElement("div");
            mensajeDiv.textContent = "No hay posibilidades de vuelo para el origen y destino seleccionados.";
            listadoPasajesDiv.appendChild(mensajeDiv);
        }
    }
}

// Agregar event listener al formulario de compra
var formularioCompra = document.getElementById("formulario-compra");
formularioCompra.addEventListener("submit", comprarPasaje);

// Función para comprar el pasaje
function comprarPasaje(event) {
    event.preventDefault(); // Evitar la recarga de la página

    var origenSeleccionado = selectOrigen.value;
    var plataformaOrigen = vuelos[origenSeleccionado].plataforma;
    var seleccionado = document.querySelector(".seleccionado");

    // Obtener la fecha de vuelo seleccionada
    var fechaVueloElement = seleccionado;
    if (!fechaVueloElement) {
        alert("Error al obtener la fecha de vuelo seleccionada.");
        return;
    }
    var fechaVuelo = fechaVueloElement.textContent.split("||")[0].trim();
    // Obtener los datos del usuario almacenados en la sesión
    var userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
        alert("Debes iniciar sesión para comprar un pasaje.");
        return;
    }

    // Crear un objeto con los datos del pasaje
    var pasaje = {
        usuario: userData,
        origen: selectOrigen.value,
        destino: selectDestino.value,
        fechaVuelo: fechaVuelo,
        plataforma: plataformaOrigen
    };
    // Almacenar los datos del pasaje en la sesión
    sessionStorage.setItem('pasaje', JSON.stringify(pasaje));
    localStorage.setItem('pasaje', JSON.stringify(pasaje));

    swal.fire({
        title: "Compra realizada",
        html: `${fechaVuelo}<br><br>Plataforma de lanzamiento: ${plataformaOrigen}<br><br><br<br>Pasajero: ${pasaje.usuario}`,
        icon: "success"
    }).then(() => {
        window.location.href = './viajes.html';
    });

}