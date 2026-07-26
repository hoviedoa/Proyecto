const formulario = document.getElementById("formulario-egresado");

const identificacion = document.getElementById("identificacion");

const nombre = document.getElementById("nombre");

const correo = document.getElementById("correo");

const telefono = document.getElementById("telefono");

const carrera = document.getElementById("carrera");

const fecha = document.getElementById("fecha");


const lugaresContainer = document.getElementById(
    "lugares-container"
);

const botonAgregarLugar = document.getElementById(
    "agregar-lugar-btn"
);

const templateLugar = document.getElementById(
    "template-lugar"
);

const listaEgresados = document.getElementById(
    "lista-egresados"
);

const botonGuardar = document.getElementById(
    "guardar-egresado"
);


let contadorLugar = 0;

let indiceEgresadoEditando = -1;


function cargarCarreras() {

    let carreras = JSON.parse(
        localStorage.getItem("carreras")
    );


    if (carreras == null) {

        carreras = [];

    }


    carrera.innerHTML = `

        <option value="">
            Seleccione una carrera
        </option>

    `;


    for (let i = 0; i < carreras.length; i++) {

        carrera.innerHTML += `

            <option value="${carreras[i].nombre}">

                ${carreras[i].nombre}

            </option>

        `;

    }

}


function agregarLugar(datosLugar) {

    const nuevoLugar = templateLugar.content.cloneNode(true);

    const bloque = nuevoLugar.querySelector(".bloque-lugar");


    bloque.dataset.index = contadorLugar;


    const labelEmpresa = bloque.querySelector(
        "label[for='empresa-0']"
    );

    const inputEmpresa = bloque.querySelector("#empresa-0");

    const ayudaEmpresa = bloque.querySelector(
        "#ayuda-empresa-0"
    );


    const labelPuesto = bloque.querySelector(
        "label[for='puesto-0']"
    );

    const inputPuesto = bloque.querySelector("#puesto-0");

    const ayudaPuesto = bloque.querySelector(
        "#ayuda-puesto-0"
    );


    const labelFechaInicio = bloque.querySelector(
        "label[for='fecha-inicio-0']"
    );

    const inputFechaInicio = bloque.querySelector(
        "#fecha-inicio-0"
    );

    const ayudaFechaInicio = bloque.querySelector(
        "#ayuda-fecha-inicio-0"
    );


    const labelFechaFin = bloque.querySelector(
        "label[for='fecha-fin-0']"
    );

    const inputFechaFin = bloque.querySelector(
        "#fecha-fin-0"
    );

    const ayudaFechaFin = bloque.querySelector(
        "#ayuda-fecha-fin-0"
    );


    inputEmpresa.id = "empresa-" + contadorLugar;

    labelEmpresa.setAttribute(
        "for",
        "empresa-" + contadorLugar
    );

    ayudaEmpresa.id = "ayuda-empresa-" + contadorLugar;

    inputEmpresa.setAttribute(
        "aria-describedby",
        "ayuda-empresa-" + contadorLugar
    );


    inputPuesto.id = "puesto-" + contadorLugar;

    labelPuesto.setAttribute(
        "for",
        "puesto-" + contadorLugar
    );

    ayudaPuesto.id = "ayuda-puesto-" + contadorLugar;

    inputPuesto.setAttribute(
        "aria-describedby",
        "ayuda-puesto-" + contadorLugar
    );


    inputFechaInicio.id =
        "fecha-inicio-" + contadorLugar;

    labelFechaInicio.setAttribute(
        "for",
        "fecha-inicio-" + contadorLugar
    );

    ayudaFechaInicio.id =
        "ayuda-fecha-inicio-" + contadorLugar;

    inputFechaInicio.setAttribute(
        "aria-describedby",
        "ayuda-fecha-inicio-" + contadorLugar
    );


    inputFechaFin.id =
        "fecha-fin-" + contadorLugar;

    labelFechaFin.setAttribute(
        "for",
        "fecha-fin-" + contadorLugar
    );

    ayudaFechaFin.id =
        "ayuda-fecha-fin-" + contadorLugar;

    inputFechaFin.setAttribute(
        "aria-describedby",
        "ayuda-fecha-fin-" + contadorLugar
    );


    if (datosLugar != null) {

        inputEmpresa.value = datosLugar.empresa;

        inputPuesto.value = datosLugar.puesto;

        inputFechaInicio.value = datosLugar.fechaInicio;

        inputFechaFin.value = datosLugar.fechaFin;

    }


    lugaresContainer.appendChild(nuevoLugar);


    contadorLugar++;

}


botonAgregarLugar.addEventListener("click", function () {

    agregarLugar(null);

});


lugaresContainer.addEventListener("click", function (event) {

    const botonEliminar = event.target.closest(
        ".eliminar-lugar"
    );


    if (botonEliminar != null) {

        const bloqueLugar = botonEliminar.closest(
            ".bloque-lugar"
        );


        bloqueLugar.remove();

    }

});


function obtenerLugares() {

    const lugares = lugaresContainer.querySelectorAll(
        ".bloque-lugar"
    );


    let lista = [];


    for (let i = 0; i < lugares.length; i++) {

        const empresaLugar = lugares[i]
            .querySelector("input[id^='empresa']")
            .value
            .trim();

        const puestoLugar = lugares[i]
            .querySelector("input[id^='puesto']")
            .value
            .trim();

        const fechaInicioLugar = lugares[i]
            .querySelector("input[id^='fecha-inicio']")
            .value;

        const fechaFinLugar = lugares[i]
            .querySelector("input[id^='fecha-fin']")
            .value;


        if (

            empresaLugar != "" ||

            puestoLugar != "" ||

            fechaInicioLugar != "" ||

            fechaFinLugar != ""

        ) {

            lista.push({

                empresa: empresaLugar,

                puesto: puestoLugar,

                fechaInicio: fechaInicioLugar,

                fechaFin: fechaFinLugar

            });

        }

    }


    return lista;

}


function validarIdentificacion(valor) {

    return /^[0-9]{9}$/.test(valor);

}


function validarNombre(valor) {

    return valor.length >= 2;

}


function validarCorreo(valor) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

}


function validarTelefono(valor) {

    if (valor == "") {

        return true;

    }


    return /^[0-9]{4}-?[0-9]{4}$/.test(valor);

}


function validarFormulario() {

    let error = false;


    if (!validarIdentificacion(identificacion.value.trim())) {

        identificacion.classList.add("input-error");

        error = true;

    }
    else {

        identificacion.classList.remove("input-error");

    }


    if (!validarNombre(nombre.value.trim())) {

        nombre.classList.add("input-error");

        error = true;

    }
    else {

        nombre.classList.remove("input-error");

    }


    if (!validarCorreo(correo.value.trim())) {

        correo.classList.add("input-error");

        error = true;

    }
    else {

        correo.classList.remove("input-error");

    }


    if (!validarTelefono(telefono.value.trim())) {

        telefono.classList.add("input-error");

        error = true;

    }
    else {

        telefono.classList.remove("input-error");

    }


    if (carrera.value == "") {

        carrera.classList.add("input-error");

        error = true;

    }
    else {

        carrera.classList.remove("input-error");

    }


    if (fecha.value == "") {

        fecha.classList.add("input-error");

        error = true;

    }
    else {

        fecha.classList.remove("input-error");

    }


    return !error;

}


function datoRepetido(egresados) {

    const identificacionIngresada =
        identificacion.value.trim();

    const correoIngresado =
        correo.value.trim();


    for (let i = 0; i < egresados.length; i++) {

        if (i != indiceEgresadoEditando) {

            if (

                egresados[i].identificacion ==
                identificacionIngresada

            ) {

                identificacion.classList.add("input-error");


                Swal.fire({

                    title: "Identificación repetida",

                    text: "Ya existe un egresado con esa identificación.",

                    icon: "error",

                    confirmButtonText: "Aceptar"

                });


                return true;

            }


            if (egresados[i].correo == correoIngresado) {

                correo.classList.add("input-error");


                Swal.fire({

                    title: "Correo repetido",

                    text: "Ya existe un egresado con ese correo.",

                    icon: "error",

                    confirmButtonText: "Aceptar"

                });


                return true;

            }

        }

    }


    return false;

}


function guardarEgresado(event) {

    event.preventDefault();


    if (!validarFormulario()) {

        Swal.fire({

            title: "No se pudo registrar el egresado",

            text: "Complete correctamente los campos resaltados.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    let egresados = JSON.parse(
        localStorage.getItem("egresados")
    );


    if (egresados == null) {

        egresados = [];

    }


    if (datoRepetido(egresados)) {

        return;

    }


    const egresado = {

        identificacion: identificacion.value.trim(),

        nombre: nombre.value.trim(),

        correo: correo.value.trim(),

        telefono: telefono.value.trim(),

        carrera: carrera.value,

        fecha: fecha.value,

        lugaresTrabajo: obtenerLugares(),

        empresa: "",

        puesto: "",

        area: "",

        linkedin: "",

        portafolio: ""

    };


    if (indiceEgresadoEditando == -1) {

        egresados.push(egresado);


        Swal.fire({

            title: "Egresado registrado",

            text: "El egresado fue guardado correctamente.",

            icon: "success",

            confirmButtonText: "Aceptar"

        });

    }
    else {

        const egresadoAnterior =
            egresados[indiceEgresadoEditando];


        egresado.empresa =
            egresadoAnterior.empresa || "";

        egresado.puesto =
            egresadoAnterior.puesto || "";

        egresado.area =
            egresadoAnterior.area || "";

        egresado.linkedin =
            egresadoAnterior.linkedin || "";

        egresado.portafolio =
            egresadoAnterior.portafolio || "";


        egresados[indiceEgresadoEditando] = egresado;


        indiceEgresadoEditando = -1;

        botonGuardar.textContent = "Registrar egresado";


        Swal.fire({

            title: "Egresado actualizado",

            text: "La información fue actualizada correctamente.",

            icon: "success",

            confirmButtonText: "Aceptar"

        });

    }


    localStorage.setItem(

        "egresados",

        JSON.stringify(egresados)

    );


    limpiarFormulario();

    mostrarEgresados();

}


function limpiarFormulario() {

    formulario.reset();

    lugaresContainer.innerHTML = "";

    contadorLugar = 0;


    identificacion.classList.remove("input-error");

    nombre.classList.remove("input-error");

    correo.classList.remove("input-error");

    telefono.classList.remove("input-error");

    carrera.classList.remove("input-error");

    fecha.classList.remove("input-error");

}


function mostrarEgresados() {

    listaEgresados.innerHTML = `

        <h2>Egresados registrados</h2>

    `;


    let egresados = JSON.parse(
        localStorage.getItem("egresados")
    );


    if (egresados == null) {

        egresados = [];

    }


    if (egresados.length == 0) {

        listaEgresados.innerHTML += `

            <p>No hay egresados registrados.</p>

        `;

        return;

    }


    for (let i = 0; i < egresados.length; i++) {

        listaEgresados.innerHTML += `

            <article class="card-carrera">

                <h3>${egresados[i].nombre}</h3>

                <p>
                    <strong>Identificación:</strong>
                    ${egresados[i].identificacion}
                </p>

                <p>
                    <strong>Correo:</strong>
                    ${egresados[i].correo}
                </p>

                <p>
                    <strong>Teléfono:</strong>
                    ${egresados[i].telefono || "No registrado"}
                </p>

                <p>
                    <strong>Carrera:</strong>
                    ${egresados[i].carrera}
                </p>

                <p>
                    <strong>Fecha:</strong>
                    ${egresados[i].fecha}
                </p>

                <div class="acciones">

                    <button
                        type="button"
                        class="editar"
                        onclick="editarEgresado(${i})">

                        Editar

                    </button>

                    <button
                        type="button"
                        class="eliminar"
                        onclick="eliminarEgresado(${i})">

                        Eliminar

                    </button>

                </div>

            </article>

        `;

    }

}


function editarEgresado(indice) {

    let egresados = JSON.parse(
        localStorage.getItem("egresados")
    );


    if (egresados == null) {

        return;

    }


    const egresado = egresados[indice];


    identificacion.value = egresado.identificacion;

    nombre.value = egresado.nombre;

    correo.value = egresado.correo;

    telefono.value = egresado.telefono;

    carrera.value = egresado.carrera;

    fecha.value = egresado.fecha;


    lugaresContainer.innerHTML = "";

    contadorLugar = 0;


    if (egresado.lugaresTrabajo != null) {

        for (

            let i = 0;

            i < egresado.lugaresTrabajo.length;

            i++

        ) {

            agregarLugar(egresado.lugaresTrabajo[i]);

        }

    }


    indiceEgresadoEditando = indice;

    botonGuardar.textContent = "Actualizar egresado";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


function eliminarEgresado(indice) {

    let egresados = JSON.parse(
        localStorage.getItem("egresados")
    );


    if (egresados == null) {

        return;

    }


    Swal.fire({

        title: "¿Eliminar egresado?",

        text: "Esta acción no se puede deshacer.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Eliminar",

        cancelButtonText: "Cancelar"

    }).then(function (resultado) {

        if (resultado.isConfirmed) {

            egresados.splice(indice, 1);


            localStorage.setItem(

                "egresados",

                JSON.stringify(egresados)

            );


            if (indiceEgresadoEditando == indice) {

                indiceEgresadoEditando = -1;

                botonGuardar.textContent =
                    "Registrar egresado";

                limpiarFormulario();

            }


            Swal.fire({

                title: "Egresado eliminado",

                text: "El egresado fue eliminado correctamente.",

                icon: "success",

                confirmButtonText: "Aceptar"

            });


            mostrarEgresados();

        }

    });

}


formulario.addEventListener("submit", guardarEgresado);


identificacion.addEventListener("input", function () {

    identificacion.classList.remove("input-error");

});


nombre.addEventListener("input", function () {

    nombre.classList.remove("input-error");

});


correo.addEventListener("input", function () {

    correo.classList.remove("input-error");

});


telefono.addEventListener("input", function () {

    telefono.classList.remove("input-error");

});


carrera.addEventListener("change", function () {

    carrera.classList.remove("input-error");

});


fecha.addEventListener("change", function () {

    fecha.classList.remove("input-error");

});


cargarCarreras();

mostrarEgresados();