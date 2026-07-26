const sesionMenu = JSON.parse(localStorage.getItem("sesion"));

const menuLogin = document.getElementById("menu-login");
const menuPerfil = document.getElementById("menu-perfil");
const menuEgresados = document.getElementById("menu-egresados");
const menuCarreras = document.getElementById("menu-carreras");
const menuSalir = document.getElementById("menu-salir");

const botonCerrarSesion = document.getElementById("cerrar-sesion");


const botonIniciarSesion = document.getElementById("boton-iniciar-sesion");

const tarjetaPerfil = document.getElementById("tarjeta-perfil");
const tarjetaEgresados = document.getElementById("tarjeta-egresados");
const tarjetaCarreras = document.getElementById("tarjeta-carreras");



if (sesionMenu == null) {

    menuLogin.style.display = "block";
    menuPerfil.style.display = "none";
    menuEgresados.style.display = "none";
    menuCarreras.style.display = "none";
    menuSalir.style.display = "none";


    if (botonIniciarSesion != null) {

        botonIniciarSesion.style.display = "inline-block";

    }


    if (tarjetaPerfil != null) {

        tarjetaPerfil.style.display = "block";

    }

    if (tarjetaEgresados != null) {

        tarjetaEgresados.style.display = "none";

    }

    if (tarjetaCarreras != null) {

        tarjetaCarreras.style.display = "none";

    }

}

else {

    menuLogin.style.display = "none";
    menuSalir.style.display = "block";


    if (botonIniciarSesion != null) {

        botonIniciarSesion.style.display = "none";

    }


    if (sesionMenu.rol == "registro") {

        menuPerfil.style.display = "none";
        menuEgresados.style.display = "block";
        menuCarreras.style.display = "block";

        if (tarjetaPerfil != null) {

            tarjetaPerfil.style.display = "none";

        }

        if (tarjetaEgresados != null) {

            tarjetaEgresados.style.display = "block";

        }

        if (tarjetaCarreras != null) {

            tarjetaCarreras.style.display = "block";

        }

    }


    else if (sesionMenu.rol == "egresado") {

        menuPerfil.style.display = "block";
        menuEgresados.style.display = "none";
        menuCarreras.style.display = "none";

        if (tarjetaPerfil != null) {

            tarjetaPerfil.style.display = "block";

        }

        if (tarjetaEgresados != null) {

            tarjetaEgresados.style.display = "none";

        }

        if (tarjetaCarreras != null) {

            tarjetaCarreras.style.display = "none";

        }

    }


    else if (sesionMenu.rol == "bienestar") {

        menuPerfil.style.display = "none";
        menuEgresados.style.display = "none";
        menuCarreras.style.display = "none";

        if (tarjetaPerfil != null) {

            tarjetaPerfil.style.display = "none";

        }

        if (tarjetaEgresados != null) {

            tarjetaEgresados.style.display = "none";

        }

        if (tarjetaCarreras != null) {

            tarjetaCarreras.style.display = "none";

        }

    }

}


if (botonCerrarSesion != null) {

    botonCerrarSesion.addEventListener("click", function (event) {

        event.preventDefault();

        Swal.fire({

            title: "Cerrar sesión",

            text: "¿Desea cerrar la sesión actual?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Sí",

            cancelButtonText: "Cancelar"

        }).then(function (resultado) {

            if (resultado.isConfirmed) {

                localStorage.removeItem("sesion");

                window.location.href = "Inicio.html";

            }

        });

    });

}