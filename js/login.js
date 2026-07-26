const inputCorreo = document.getElementById("correo");

const inputContrasena = document.getElementById("contrasena");

const inputRol = document.getElementById("rol");

const formularioLogin = document.getElementById("formulario-login");


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

    const contrasena = inputContrasena.value;

    const rol = inputRol.value;


    if (!validarCorreo(correo)) {

        inputCorreo.classList.add("input-error");

        error = true;

    }
    else {

        inputCorreo.classList.remove("input-error");

    }


    if (!validarContrasena(contrasena)) {

        inputContrasena.classList.add("input-error");

        error = true;

    }
    else {

        inputContrasena.classList.remove("input-error");

    }


    if (!validarRol(rol)) {

        inputRol.classList.add("input-error");

        error = true;

    }
    else {

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

        inputCorreo.classList.add("input-error");

        inputContrasena.classList.add("input-error");

        inputRol.classList.add("input-error");


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
        else if (rol == "egresado") {

            window.location.href = "Egresados.html";

        }
        else {

            window.location.href = "Inicio.html";

        }

    });

}


formularioLogin.addEventListener("submit", iniciarSesion);


inputCorreo.addEventListener("input", function () {

    inputCorreo.classList.remove("input-error");

});


inputContrasena.addEventListener("input", function () {

    inputContrasena.classList.remove("input-error");

});


inputRol.addEventListener("change", function () {

    inputRol.classList.remove("input-error");

});