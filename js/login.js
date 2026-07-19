let usuarios = JSON.parse(localStorage.getItem("usuarios"));

if (usuarios == null) {

    usuarios = [];

}

let existeRegistro = false;
let existeBienestar = false;

for (let i = 0; i < usuarios.length; i++) {

    if (usuarios[i].rol == "registro") {

        existeRegistro = true;

    }

    if (usuarios[i].rol == "bienestar") {

        existeBienestar = true;

    }

}

if (!existeRegistro) {

    usuarios.push({

        identificacion: "000000001",
        correo: "registro@cenfotec.ac.cr",
        contrasena: "Registro123",
        rol: "registro"

    });

}

if (!existeBienestar) {

    usuarios.push({

        identificacion: "000000002",
        correo: "bienestar@cenfotec.ac.cr",
        contrasena: "Bienestar123",
        rol: "bienestar"

    });

}

localStorage.setItem(

    "usuarios",

    JSON.stringify(usuarios)

);

const inputCorreo = document.getElementById("correo");
const inputContrasena = document.getElementById("contrasena");
const inputRol = document.getElementById("rol");

const formularioLogin = document.getElementById("formulario-login");
const btnIniciarSesion = document.getElementById("btn-iniciar-sesion");


function validarCorreo(correo) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

}


function validarContrasena(contrasena) {

    return contrasena.length >= 8;

}


function validarRol(rol) {

    return rol != "";

}


function resaltarCampos() {

    let error = false;


    const correo = inputCorreo.value.trim();

    if (!validarCorreo(correo)) {

        inputCorreo.classList.add("input-error");

        error = true;

    } else {

        inputCorreo.classList.remove("input-error");

    }


    const contrasena = inputContrasena.value;

    if (!validarContrasena(contrasena)) {

        inputContrasena.classList.add("input-error");

        error = true;

    } else {

        inputContrasena.classList.remove("input-error");

    }


    const rol = inputRol.value;

    if (!validarRol(rol)) {

        inputRol.classList.add("input-error");

        error = true;

    } else {

        inputRol.classList.remove("input-error");

    }

    return error;

}
function iniciarSesion(event) {

    event.preventDefault();

    const error = resaltarCampos();

    if (error) {

        Swal.fire({

            title: "Datos incorrectos",

            text: "Complete correctamente los campos resaltados.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuarios == null) {

        usuarios = [];

    }


    const correo = inputCorreo.value.trim();
    const contrasena = inputContrasena.value;
    const rol = inputRol.value;

    let usuarioEncontrado = null;


    for (let i = 0; i < usuarios.length; i++) {

        if (

            usuarios[i].correo == correo &&

            usuarios[i].contrasena == contrasena &&

            usuarios[i].rol == rol

        ) {

            usuarioEncontrado = usuarios[i];

            break;

        }

    }


    if (usuarioEncontrado == null) {

        Swal.fire({

            title: "Inicio de sesión fallido",

            text: "Correo, contraseña o rol incorrectos.",

            icon: "error",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    localStorage.setItem(

        "sesion",

        JSON.stringify(usuarioEncontrado)

    );


    Swal.fire({

        title: "Bienvenido",

        text: "Inicio de sesión exitoso.",

        icon: "success",

        confirmButtonText: "Aceptar"

    }).then(function () {

        if (rol == "registro") {

            window.location.href = "Gestion-egresados.html";

        }

        else if (rol == "bienestar") {

            window.location.href = "Egresados.html";

        }

        else {

            window.location.href = "Egresados.html";

        }

    });

}
btnIniciarSesion.addEventListener(

    "click",

    iniciarSesion

);

const menuLogin = document.getElementById("menu-login");
const menuPerfil = document.getElementById("menu-perfil");
const menuEgresados = document.getElementById("menu-egresados");
const menuCarreras = document.getElementById("menu-carreras");
const menuSalir = document.getElementById("menu-salir");

const sesion = JSON.parse(localStorage.getItem("sesion"));

if (sesion != null) {

    menuLogin.style.display = "none";

    menuSalir.style.display = "block";

    if (sesion.rol == "registro") {

        menuPerfil.style.display = "none";

        menuEgresados.style.display = "block";

        menuCarreras.style.display = "block";

    }

    else if (sesion.rol == "bienestar") {

        menuPerfil.style.display = "block";

        menuEgresados.style.display = "none";

        menuCarreras.style.display = "none";

    }

    else {

        menuPerfil.style.display = "block";

        menuEgresados.style.display = "none";

        menuCarreras.style.display = "none";

    }
}
else {

    menuSalir.style.display = "none";

}
const cerrarSesion = document.getElementById("cerrar-sesion");

if (cerrarSesion != null) {

    cerrarSesion.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("sesion");

        window.location.href = "login.html";

    });

}