const menuLogin = document.getElementById("menu-login");
const menuPerfil = document.getElementById("menu-perfil");
const menuEgresados = document.getElementById("menu-egresados");
const menuCarreras = document.getElementById("menu-carreras");
const menuSalir = document.getElementById("menu-salir");

const sesion = JSON.parse(localStorage.getItem("sesion"));

const paginaActual = window.location.pathname.split("/").pop();

if (sesion == null) {

    if (menuSalir != null) {

        menuSalir.style.display = "none";

    }

    if (
        paginaActual != "Inicio.html" &&
        paginaActual != "login.html" &&
        paginaActual != "crear-cuenta.html"
    ) {

        Swal.fire({

            title: "Acceso denegado",

            text: "Debe iniciar sesión.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        }).then(function () {

            window.location.href = "login.html";

        });

    }

}
else {

    if (menuLogin != null) {

        menuLogin.style.display = "none";

    }

    if (menuSalir != null) {

        menuSalir.style.display = "block";

    }

    if (sesion.rol == "registro") {

        if (menuPerfil != null) menuPerfil.style.display = "none";
        if (menuEgresados != null) menuEgresados.style.display = "block";
        if (menuCarreras != null) menuCarreras.style.display = "block";

        if (paginaActual == "Egresados.html") {

            Swal.fire({

                title: "Acceso denegado",

                text: "Esta página es exclusiva para egresados.",

                icon: "error",

                confirmButtonText: "Aceptar"

            }).then(function () {

                window.location.href = "Inicio.html";

            });

        }

    }

    else if (sesion.rol == "bienestar") {

        if (menuPerfil != null) menuPerfil.style.display = "block";
        if (menuEgresados != null) menuEgresados.style.display = "none";
        if (menuCarreras != null) menuCarreras.style.display = "none";

        if (
            paginaActual == "Gestion-carreras.html" ||
            paginaActual == "Gestion-egresados.html"
        ) {

            Swal.fire({

                title: "Acceso denegado",

                text: "No posee permisos para ingresar.",

                icon: "error",

                confirmButtonText: "Aceptar"

            }).then(function () {

                window.location.href = "Inicio.html";

            });

        }

    }

    else if (sesion.rol == "egresado") {

        if (menuPerfil != null) menuPerfil.style.display = "block";
        if (menuEgresados != null) menuEgresados.style.display = "none";
        if (menuCarreras != null) menuCarreras.style.display = "none";

        if (
            paginaActual == "Gestion-carreras.html" ||
            paginaActual == "Gestion-egresados.html"
        ) {

            Swal.fire({

                title: "Acceso denegado",

                text: "No posee permisos para ingresar.",

                icon: "error",

                confirmButtonText: "Aceptar"

            }).then(function () {

                window.location.href = "Inicio.html";

            });

        }

    }

}

const cerrarSesion = document.getElementById("cerrar-sesion");

if (cerrarSesion != null) {

    cerrarSesion.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("sesion");

        window.location.href = "login.html";

    });

}