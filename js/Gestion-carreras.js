const sesion = JSON.parse(localStorage.getItem("sesion"));

if (sesion == null) {

    Swal.fire({

        title: "Acceso denegado",

        text: "Debe iniciar sesión.",

        icon: "warning",

        confirmButtonText: "Aceptar"

    }).then(function () {

        window.location.href = "login.html";

    });

}

if (sesion.rol != "registro") {

    Swal.fire({

        title: "Acceso denegado",

        text: "No tiene permisos para ingresar.",

        icon: "error",

        confirmButtonText: "Aceptar"

    }).then(function () {

        window.location.href = "Inicio.html";

    });

}

const inputNombre = document.getElementById("nombre");
const inputCodigo = document.getElementById("codigo");
const inputEscuela = document.getElementById("escuela");
const inputDuracion = document.getElementById("duracion");
const inputDescripcion = document.getElementById("descripcion");

const formularioCarrera = document.getElementById("formulario-carrera");

const btnGuardarCarrera = document.getElementById("guardar-carrera");

const listaCarreras = document.getElementById("lista-carreras");

const inputsRequeridos = document.querySelectorAll("input[required], select[required]");


function validarNombre(nombre) {

    return nombre.length >= 2;

}

function validarCodigo(codigo) {

    return /^[A-Z]{3}-[0-9]{3}$/.test(codigo);

}

function validarEscuela(escuela) {

    return escuela !== "";

}

function validarDuracion(duracion) {

    if (duracion === "") {

        return true;

    }

    return duracion >= 1;

}


function resaltarCamposVacios() {

    let error = false;

    const nombre = inputNombre.value.trim();

    if (!validarNombre(nombre)) {

        inputNombre.classList.add("input-error");

        error = true;

    } else {

        inputNombre.classList.remove("input-error");

    }


    const codigo = inputCodigo.value.trim();

    if (!validarCodigo(codigo)) {

        inputCodigo.classList.add("input-error");

        error = true;

    } else {

        inputCodigo.classList.remove("input-error");

    }

    const escuela = inputEscuela.value;

    if (!validarEscuela(escuela)) {

        inputEscuela.classList.add("input-error");

        error = true;

    } else {

        inputEscuela.classList.remove("input-error");

    }

    const duracion = inputDuracion.value;

    if (!validarDuracion(duracion)) {

        inputDuracion.classList.add("input-error");

        error = true;

    } else {

        inputDuracion.classList.remove("input-error");

    }

    return error;

}

function validarFormulario() {

    const error = resaltarCamposVacios();

    if (error) {

        Swal.fire({

            title: "No se pudo registrar la carrera",

            text: "Complete correctamente los campos resaltados.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return false;

    }

    return true;

}


function guardarCarrera(event) {

    event.preventDefault();

    const formularioValido = validarFormulario();

    if (!formularioValido) {

        return;

    }


    const carrera = {

        nombre: inputNombre.value.trim(),

        codigo: inputCodigo.value.trim(),

        escuela: inputEscuela.value,

        duracion: inputDuracion.value,

        descripcion: inputDescripcion.value.trim()

    };


    let carreras = JSON.parse(localStorage.getItem("carreras"));

    if (carreras == null) {

        carreras = [];

    }



    carreras.push(carrera);


    localStorage.setItem(

        "carreras",

        JSON.stringify(carreras)

    );

    console.log(carreras);

    Swal.fire({

        title: "Carrera registrada",

        text: "La carrera fue guardada correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    });

    formularioCarrera.reset();

    mostrarCarreras();

}


function mostrarCarreras() {

    let carreras = JSON.parse(localStorage.getItem("carreras"));

    /* Si no existen carreras */

    if (carreras == null) {

        carreras = [];

    }

    listaCarreras.innerHTML = "<h2>Carreras registradas</h2>";

    for (let i = 0; i < carreras.length; i++) {

        const carrera = carreras[i];

        listaCarreras.innerHTML += `

        <article class="card-carrera">

            <h3>${carrera.nombre}</h3>

            <p><strong>Código:</strong> ${carrera.codigo}</p>

            <p><strong>Escuela:</strong> ${carrera.escuela}</p>

            <p><strong>Duración:</strong> ${carrera.duracion} años</p>

            <p>${carrera.descripcion}</p>

            <div class="acciones">

                <button
                    type="button"
                    class="editar"
                    onclick="editarCarrera(${i})">

                    Editar

                </button>

                <button
                    type="button"
                    class="eliminar"
                    onclick="eliminarCarrera(${i})">

                    Eliminar

                </button>

            </div>

        </article>

        `;

    }

}

function eliminarCarrera(indice) {

    let carreras = JSON.parse(localStorage.getItem("carreras"));

    carreras.splice(indice, 1);

    localStorage.setItem(

        "carreras",

        JSON.stringify(carreras)

    );

    mostrarCarreras();

}


formularioCarrera.addEventListener(

    "submit",

    guardarCarrera

);

mostrarCarreras();

function editarCarrera(indice) {

    let carreras = JSON.parse(localStorage.getItem("carreras"));

    if (carreras == null) {

        return;

    }

    const carrera = carreras[indice];

    inputNombre.value = carrera.nombre;

    inputCodigo.value = carrera.codigo;

    inputEscuela.value = carrera.escuela;

    inputDuracion.value = carrera.duracion;

    inputDescripcion.value = carrera.descripcion;

    carreras.splice(indice, 1);

    localStorage.setItem(

        "carreras",

        JSON.stringify(carreras)

    );

    mostrarCarreras();

}