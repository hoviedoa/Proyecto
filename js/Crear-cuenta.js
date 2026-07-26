const inputIdentificacion = document.getElementById("identificacion");

const inputNombre = document.getElementById("nombre");

const inputCorreo = document.getElementById("correo");

const inputRol = document.getElementById("rol");

const inputContrasena = document.getElementById("contrasena");

const inputConfirmar = document.getElementById("confirmar");


const formularioCrearCuenta = document.getElementById(
    "formulario-crear-cuenta"
);


function validarIdentificacion(identificacion) {

    return /^[0-9]{9}$/.test(identificacion);

}


function validarNombre(nombre) {

    return nombre.length >= 2;

}


function validarCorreo(correo) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

}


function validarRol(rol) {

    return rol != "";

}


function validarContrasena(contrasena) {

    return contrasena.length >= 8;

}


function validarConfirmacion() {

    const contrasena = inputContrasena.value;

    const confirmar = inputConfirmar.value;

    return confirmar.length >= 8 && contrasena === confirmar;

}


function resaltarCampos() {

    let error = false;


    const identificacion = inputIdentificacion.value.trim();

    const nombre = inputNombre.value.trim();

    const correo = inputCorreo.value.trim();

    const rol = inputRol.value;

    const contrasena = inputContrasena.value;


    if (!validarIdentificacion(identificacion)) {

        inputIdentificacion.classList.add("input-error");

        error = true;

    }
    else {

        inputIdentificacion.classList.remove("input-error");

    }


    if (!validarNombre(nombre)) {

        inputNombre.classList.add("input-error");

        error = true;

    }
    else {

        inputNombre.classList.remove("input-error");

    }


    if (!validarCorreo(correo)) {

        inputCorreo.classList.add("input-error");

        error = true;

    }
    else {

        inputCorreo.classList.remove("input-error");

    }


    if (!validarRol(rol)) {

        inputRol.classList.add("input-error");

        error = true;

    }
    else {

        inputRol.classList.remove("input-error");

    }


    if (!validarContrasena(contrasena)) {

        inputContrasena.classList.add("input-error");

        error = true;

    }
    else {

        inputContrasena.classList.remove("input-error");

    }


    if (!validarConfirmacion()) {

        inputConfirmar.classList.add("input-error");

        error = true;

    }
    else {

        inputConfirmar.classList.remove("input-error");

    }


    return error;

}


function crearCuenta(event) {

    event.preventDefault();


    const error = resaltarCampos();


    if (error) {

        Swal.fire({

            title: "No se pudo crear la cuenta",

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


    const identificacion = inputIdentificacion.value.trim();

    const correo = inputCorreo.value.trim();


    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].correo == correo) {

            inputCorreo.classList.add("input-error");


            Swal.fire({

                title: "Correo ya registrado",

                text: "Ya existe una cuenta con ese correo.",

                icon: "error",

                confirmButtonText: "Aceptar"

            });

            return;

        }


        if (usuarios[i].identificacion == identificacion) {

            inputIdentificacion.classList.add("input-error");


            Swal.fire({

                title: "Identificación ya registrada",

                text: "Ya existe una cuenta con esa identificación.",

                icon: "error",

                confirmButtonText: "Aceptar"

            });

            return;

        }

    }


    const usuario = {

        identificacion: identificacion,

        nombre: inputNombre.value.trim(),

        correo: correo,

        rol: inputRol.value,

        contrasena: inputContrasena.value,

        telefono: "",

        empresa: "",

        puesto: "",

        area: "",

        linkedin: "",

        portafolio: ""

    };


    usuarios.push(usuario);


    localStorage.setItem(

        "usuarios",

        JSON.stringify(usuarios)

    );


    Swal.fire({

        title: "Cuenta creada",

        text: "La cuenta fue creada correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    }).then(function () {

        window.location.href = "login.html";

    });

}


formularioCrearCuenta.addEventListener("submit", crearCuenta);


inputIdentificacion.addEventListener("input", function () {

    inputIdentificacion.classList.remove("input-error");

});


inputNombre.addEventListener("input", function () {

    inputNombre.classList.remove("input-error");

});


inputCorreo.addEventListener("input", function () {

    inputCorreo.classList.remove("input-error");

});


inputRol.addEventListener("change", function () {

    inputRol.classList.remove("input-error");

});


inputContrasena.addEventListener("input", function () {

    inputContrasena.classList.remove("input-error");

    inputConfirmar.classList.remove("input-error");

});


inputConfirmar.addEventListener("input", function () {

    inputConfirmar.classList.remove("input-error");

});