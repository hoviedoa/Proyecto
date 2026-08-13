const URL_EGRESADOS = "http://localhost:3000/egresados";


const formulario = document.getElementById("formulario-egresado");

const identificacion = document.getElementById("identificacion");

const nombre = document.getElementById("nombre");

const correo = document.getElementById("correo");

const telefono = document.getElementById("telefono");

const carrera = document.getElementById("carrera");

const fecha = document.getElementById("fecha");


const lugaresContainer =
    document.getElementById("lugares-container");

const botonAgregarLugar =
    document.getElementById("agregar-lugar-btn");

const templateLugar =
    document.getElementById("template-lugar");

const listaEgresados =
    document.getElementById("lista-egresados");


let contadorLugar = 0;



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



botonAgregarLugar.addEventListener("click", function () {

    const nuevoLugar =
        templateLugar.content.cloneNode(true);

    const bloque =
        nuevoLugar.querySelector(".bloque-lugar");


    bloque.dataset.index = contadorLugar;


    bloque.querySelector("#empresa-0").id =
        "empresa-" + contadorLugar;

    bloque.querySelector("#puesto-0").id =
        "puesto-" + contadorLugar;

    bloque.querySelector("#fecha-inicio-0").id =
        "fecha-inicio-" + contadorLugar;

    bloque.querySelector("#fecha-fin-0").id =
        "fecha-fin-" + contadorLugar;


    lugaresContainer.appendChild(nuevoLugar);


    contadorLugar++;

});



lugaresContainer.addEventListener("click", function (event) {

    if (event.target.closest(".eliminar-lugar")) {

        const bloque =
            event.target.closest(".bloque-lugar");

        bloque.remove();

    }

});



function obtenerLugares() {

    const lugares =
        document.querySelectorAll(".bloque-lugar");

    let lista = [];


    for (let i = 0; i < lugares.length; i++) {

        const empresaLugar =
            lugares[i]
                .querySelector("input[id^='empresa']")
                .value
                .trim();

        const puestoLugar =
            lugares[i]
                .querySelector("input[id^='puesto']")
                .value
                .trim();

        const fechaInicioLugar =
            lugares[i]
                .querySelector("input[id^='fecha-inicio']")
                .value;

        const fechaFinLugar =
            lugares[i]
                .querySelector("input[id^='fecha-fin']")
                .value;


        if (
            empresaLugar != "" &&
            puestoLugar != "" &&
            fechaInicioLugar != ""
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

    return /^[0-9]{4}-?[0-9]{4}$/.test(valor);

}



function validarFormulario() {

    let error = false;


    if (!validarIdentificacion(
        identificacion.value.trim()
    )) {

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



function crearObjetoServidor() {

    const egresadoServidor = {

        identificacion: identificacion.value.trim(),

        nombreCompleto: nombre.value.trim(),

        correoElectronico: correo.value.trim(),

        telefono: telefono.value.trim(),

        fechaRegistro: fecha.value,

        lugaresTrabajo: obtenerLugares(),

        empresaActual: "",

        puestoActual: "",

        areaProfesional: "",

        linkedin: "",

        portafolio: ""

    };


    return egresadoServidor;

}



function guardarCopiaLocal() {

    let egresados = JSON.parse(
        localStorage.getItem("egresados")
    );


    if (egresados == null) {

        egresados = [];

    }


    const egresadoLocal = {

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


    egresados.push(egresadoLocal);


    localStorage.setItem(

        "egresados",

        JSON.stringify(egresados)

    );

}



async function registrarEgresado(event) {

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


    const egresadoServidor =
        crearObjetoServidor();


    try {

        const respuesta = await fetch(
            URL_EGRESADOS,
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(
                    egresadoServidor
                )

            }
        );


        const datosRespuesta =
            await respuesta.json();


        if (!respuesta.ok) {

            let mensajeError =
                "No se pudo registrar el egresado.";


            if (datosRespuesta.mensajeError) {

                mensajeError =
                    datosRespuesta.mensajeError;

            }


            throw new Error(mensajeError);

        }


        guardarCopiaLocal();


        Swal.fire({

            title: "Egresado registrado",

            text: "El egresado fue enviado al servidor correctamente.",

            icon: "success",

            confirmButtonText: "Aceptar"

        });


        formulario.reset();

        lugaresContainer.innerHTML = "";

        contadorLugar = 0;


        cargarCarreras();


        await consultarEgresados();

    }
    catch (error) {

        Swal.fire({

            title: "Error",

            text: error.message,

            icon: "error",

            confirmButtonText: "Aceptar"

        });

    }

}



async function consultarEgresados() {

    try {

        const respuesta = await fetch(
            URL_EGRESADOS
        );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron consultar los egresados."
            );

        }


        const egresados =
            await respuesta.json();


        mostrarEgresados(egresados);

    }
    catch (error) {

        listaEgresados.innerHTML = `

            <h2>Egresados registrados</h2>

            <p>
                No fue posible cargar los datos
                desde el servidor.
            </p>

        `;


        Swal.fire({

            title: "Error de conexión",

            text: error.message,

            icon: "error",

            confirmButtonText: "Aceptar"

        });

    }

}



function mostrarEgresados(egresados) {

    listaEgresados.innerHTML = `

        <h2>Egresados registrados</h2>

    `;


    if (egresados.length == 0) {

        listaEgresados.innerHTML += `

            <p>
                No hay egresados registrados
                en el servidor.
            </p>

        `;

        return;

    }


    for (let i = 0; i < egresados.length; i++) {

        const egresado = egresados[i];


        let fechaMostrar =
            egresado.fechaRegistro;


        if (fechaMostrar != null) {

            fechaMostrar =
                fechaMostrar.substring(0, 10);

        }


        listaEgresados.innerHTML += `

            <article class="card-carrera">

                <h3>
                    ${egresado.nombreCompleto}
                </h3>

                <p>
                    <strong>
                        Identificación:
                    </strong>

                    ${egresado.identificacion}
                </p>

                <p>
                    <strong>
                        Correo:
                    </strong>

                    ${egresado.correoElectronico}
                </p>

                <p>
                    <strong>
                        Teléfono:
                    </strong>

                    ${egresado.telefono}
                </p>

                <p>
                    <strong>
                        Fecha de registro:
                    </strong>

                    ${fechaMostrar}
                </p>

            </article>

        `;

    }

}



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



formulario.addEventListener(
    "submit",
    registrarEgresado
);



cargarCarreras();

consultarEgresados();