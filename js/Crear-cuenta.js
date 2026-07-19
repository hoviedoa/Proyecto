const inputIdentificacion = document.getElementById("identificacion");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputContrasena = document.getElementById("contrasena");
const inputConfirmar = document.getElementById("confirmar");

const formularioCrearCuenta = document.getElementById("formulario-crear-cuenta");

const btnCrearCuenta = document.getElementById("btn-crear-cuenta");


function validarIdentificacion(identificacion) {

    return /^[0-9]{9}$/.test(identificacion);

}


function validarNombre(nombre) {

    return nombre.length >= 2;

}


function validarCorreo(correo) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

}


function validarContrasena(contrasena) {

    return contrasena.length >= 8;

}


function validarConfirmacion() {

    return inputContrasena.value === inputConfirmar.value;

}


function resaltarCampos() {

    let error = false;


    const identificacion = inputIdentificacion.value.trim();

    if (!validarIdentificacion(identificacion)) {

        inputIdentificacion.classList.add("input-error");

        error = true;

    } else {

        inputIdentificacion.classList.remove("input-error");

    }


    const nombre = inputNombre.value.trim();

    if (!validarNombre(nombre)) {

        inputNombre.classList.add("input-error");

        error = true;

    } else {

        inputNombre.classList.remove("input-error");

    }


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


    if (!validarConfirmacion()) {

        inputConfirmar.classList.add("input-error");

        error = true;

    } else {

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

    const correo = inputCorreo.value.trim();

    for (let i = 0; i < usuarios.length; i++) {

        if (usuarios[i].correo == correo) {

            Swal.fire({

                title: "Correo ya registrado",

                text: "Ya existe una cuenta con ese correo.",

                icon: "error",

                confirmButtonText: "Aceptar"

            });

            return;

        }

    }
    const usuario = {
        identificacion: inputIdentificacion.value.trim(),
        correo: inputCorreo.value.trim(),
        contrasena: inputContrasena.value,
        rol: inputRol.value,
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
btnCrearCuenta.addEventListener(

    "click",

    crearCuenta

);