const inputNombre = document.getElementById("nombre");

const inputCodigo = document.getElementById("codigo");

const inputEscuela = document.getElementById("escuela");

const inputDuracion = document.getElementById("duracion");

const inputDescripcion = document.getElementById("descripcion");


const formularioCarrera = document.getElementById(
    "formulario-carrera"
);

const btnGuardarCarrera = document.getElementById(
    "guardar-carrera"
);

const listaCarreras = document.getElementById(
    "lista-carreras"
);


let indiceCarreraEditando = -1;


function validarNombre(nombre) {

    return nombre.length >= 2;

}


function validarCodigo(codigo) {

    return /^[A-Z]{3}-[0-9]{3}$/.test(codigo);

}


function validarEscuela(escuela) {

    return escuela != "";

}


function validarDuracion(duracion) {

    if (duracion == "") {

        return true;

    }

    return Number(duracion) >= 1;

}


function resaltarCamposVacios() {

    let error = false;


    const nombre = inputNombre.value.trim();

    const codigo = inputCodigo.value.trim();

    const escuela = inputEscuela.value;

    const duracion = inputDuracion.value;


    if (!validarNombre(nombre)) {

        inputNombre.classList.add("input-error");

        error = true;

    }
    else {

        inputNombre.classList.remove("input-error");

    }


    if (!validarCodigo(codigo)) {

        inputCodigo.classList.add("input-error");

        error = true;

    }
    else {

        inputCodigo.classList.remove("input-error");

    }


    if (!validarEscuela(escuela)) {

        inputEscuela.classList.add("input-error");

        error = true;

    }
    else {

        inputEscuela.classList.remove("input-error");

    }


    if (!validarDuracion(duracion)) {

        inputDuracion.classList.add("input-error");

        error = true;

    }
    else {

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


function codigoRepetido(codigo, carreras) {

    for (let i = 0; i < carreras.length; i++) {

        if (

            carreras[i].codigo == codigo &&

            i != indiceCarreraEditando

        ) {

            return true;

        }

    }


    return false;

}


function guardarCarrera(event) {

    event.preventDefault();


    const formularioValido = validarFormulario();


    if (!formularioValido) {

        return;

    }


    let carreras = JSON.parse(
        localStorage.getItem("carreras")
    );


    if (carreras == null) {

        carreras = [];

    }


    const codigo = inputCodigo.value.trim();


    if (codigoRepetido(codigo, carreras)) {

        inputCodigo.classList.add("input-error");


        Swal.fire({

            title: "Código repetido",

            text: "Ya existe una carrera con ese código.",

            icon: "error",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    const carrera = {

        nombre: inputNombre.value.trim(),

        codigo: codigo,

        escuela: inputEscuela.value,

        duracion: inputDuracion.value,

        descripcion: inputDescripcion.value.trim()

    };


    if (indiceCarreraEditando == -1) {

        carreras.push(carrera);


        Swal.fire({

            title: "Carrera registrada",

            text: "La carrera fue guardada correctamente.",

            icon: "success",

            confirmButtonText: "Aceptar"

        });

    }
    else {

        carreras[indiceCarreraEditando] = carrera;


        Swal.fire({

            title: "Carrera actualizada",

            text: "La carrera fue actualizada correctamente.",

            icon: "success",

            confirmButtonText: "Aceptar"

        });


        indiceCarreraEditando = -1;

        btnGuardarCarrera.textContent = "Guardar Carrera";

    }


    localStorage.setItem(

        "carreras",

        JSON.stringify(carreras)

    );


    formularioCarrera.reset();

    eliminarErrores();

    mostrarCarreras();

}


function mostrarCarreras() {

    let carreras = JSON.parse(
        localStorage.getItem("carreras")
    );


    if (carreras == null) {

        carreras = [];

    }


    listaCarreras.innerHTML = "<h2>Carreras registradas</h2>";


    if (carreras.length == 0) {

        listaCarreras.innerHTML += `

            <p>No hay carreras registradas.</p>

        `;

        return;

    }


    for (let i = 0; i < carreras.length; i++) {

        const carrera = carreras[i];


        let duracionTexto = "No especificada";


        if (carrera.duracion != "") {

            duracionTexto = carrera.duracion + " años";

        }


        let descripcionTexto = "Sin descripción";


        if (carrera.descripcion != "") {

            descripcionTexto = carrera.descripcion;

        }


        listaCarreras.innerHTML += `

            <article class="card-carrera">

                <h3>${carrera.nombre}</h3>

                <p>
                    <strong>Código:</strong>
                    ${carrera.codigo}
                </p>

                <p>
                    <strong>Escuela:</strong>
                    ${carrera.escuela}
                </p>

                <p>
                    <strong>Duración:</strong>
                    ${duracionTexto}
                </p>

                <p>${descripcionTexto}</p>

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


function editarCarrera(indice) {

    let carreras = JSON.parse(
        localStorage.getItem("carreras")
    );


    if (carreras == null) {

        return;

    }


    const carrera = carreras[indice];


    inputNombre.value = carrera.nombre;

    inputCodigo.value = carrera.codigo;

    inputEscuela.value = carrera.escuela;

    inputDuracion.value = carrera.duracion;

    inputDescripcion.value = carrera.descripcion;


    indiceCarreraEditando = indice;


    btnGuardarCarrera.textContent = "Actualizar Carrera";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


function eliminarCarrera(indice) {

    let carreras = JSON.parse(
        localStorage.getItem("carreras")
    );


    if (carreras == null) {

        return;

    }


    Swal.fire({

        title: "¿Eliminar carrera?",

        text: "Esta acción no se puede deshacer.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Eliminar",

        cancelButtonText: "Cancelar"

    }).then(function (resultado) {

        if (resultado.isConfirmed) {

            carreras.splice(indice, 1);


            localStorage.setItem(

                "carreras",

                JSON.stringify(carreras)

            );


            if (indiceCarreraEditando == indice) {

                indiceCarreraEditando = -1;

                formularioCarrera.reset();

                btnGuardarCarrera.textContent =
                    "Guardar Carrera";

            }


            Swal.fire({

                title: "Carrera eliminada",

                text: "La carrera fue eliminada correctamente.",

                icon: "success",

                confirmButtonText: "Aceptar"

            });


            mostrarCarreras();

        }

    });

}


function eliminarErrores() {

    inputNombre.classList.remove("input-error");

    inputCodigo.classList.remove("input-error");

    inputEscuela.classList.remove("input-error");

    inputDuracion.classList.remove("input-error");

}


formularioCarrera.addEventListener(

    "submit",

    guardarCarrera

);


inputNombre.addEventListener("input", function () {

    inputNombre.classList.remove("input-error");

});


inputCodigo.addEventListener("input", function () {

    inputCodigo.value = inputCodigo.value.toUpperCase();

    inputCodigo.classList.remove("input-error");

});


inputEscuela.addEventListener("change", function () {

    inputEscuela.classList.remove("input-error");

});


inputDuracion.addEventListener("input", function () {

    inputDuracion.classList.remove("input-error");

});


mostrarCarreras();