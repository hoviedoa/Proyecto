const sesion = JSON.parse(localStorage.getItem("sesion"));

const perfilEgresado = document.getElementById("perfil-egresado");


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


function obtenerEgresados() {

    let egresados = JSON.parse(localStorage.getItem("egresados"));

    if (egresados == null) {

        egresados = [];

    }

    return egresados;

}


function buscarIndiceEgresado(egresados) {

    let indiceEgresado = -1;

    for (let i = 0; i < egresados.length; i++) {

        if (
            egresados[i].identificacion ==
            sesion.identificacion
        ) {

            indiceEgresado = i;

            break;

        }

    }

    return indiceEgresado;

}


function mostrarPerfil() {

    const egresados = obtenerEgresados();

    const indiceEgresado = buscarIndiceEgresado(egresados);

    perfilEgresado.innerHTML = `

        <h2>Información del egresado</h2>

    `;


    if (indiceEgresado == -1) {

        perfilEgresado.innerHTML += `

            <article class="card-carrera">

                <h3>Perfil no disponible</h3>

                <p>
                    Su información todavía no ha sido registrada
                    por el personal de Registro.
                </p>

            </article>

        `;

        return;

    }


    const egresado = egresados[indiceEgresado];


    perfilEgresado.innerHTML += `

        <article class="card-carrera">

            <h3>Información Personal</h3>

            <p>
                <strong>Nombre completo:</strong>
                ${egresado.nombre || "No registrado"}
            </p>

            <p>
                <strong>Identificación:</strong>
                ${egresado.identificacion || "No registrada"}
            </p>

            <p>
                <strong>Correo:</strong>
                ${egresado.correo || "No registrado"}
            </p>

            <p>
                <strong>Teléfono:</strong>
                ${egresado.telefono || "No registrado"}
            </p>

        </article>


        <article class="card-carrera">

            <h3>Información Profesional</h3>

            <p>
                <strong>Empresa actual:</strong>
                ${egresado.empresa || "No registrada"}
            </p>

            <p>
                <strong>Puesto:</strong>
                ${egresado.puesto || "No registrado"}
            </p>

            <p>
                <strong>Área profesional:</strong>
                ${egresado.area || "No registrada"}
            </p>

            <p>
                <strong>LinkedIn:</strong>
                ${egresado.linkedin || "No registrado"}
            </p>

            <p>
                <strong>Portafolio:</strong>
                ${egresado.portafolio || "No registrado"}
            </p>

        </article>


        <article class="card-carrera">

            <h3>Títulos obtenidos</h3>

            <p>No registrados.</p>

        </article>


        <article class="card-carrera">

            <h3>Información Académica</h3>

            <p>
                <strong>Carrera asociada:</strong>
                ${egresado.carrera || "No registrada"}
            </p>

            <p>
                <strong>Fecha de registro:</strong>
                ${egresado.fecha || "No registrada"}
            </p>

        </article>

    `;


    if (sesion.rol == "egresado") {

        perfilEgresado.innerHTML += `

            <div class="acciones">

                <button
                    type="button"
                    class="editar"
                    id="editar-perfil">

                    Editar mi perfil

                </button>

            </div>

        `;


        const botonEditarPerfil =
            document.getElementById("editar-perfil");


        botonEditarPerfil.addEventListener("click", function () {

            mostrarFormularioEdicion(indiceEgresado);

        });

    }

}


function mostrarFormularioEdicion(indiceEgresado) {

    const egresados = obtenerEgresados();

    const egresado = egresados[indiceEgresado];


    perfilEgresado.innerHTML = `

        <h2>Editar información profesional</h2>

        <form id="formulario-editar-perfil">

            <div class="campo">

                <label for="editar-telefono">

                    Teléfono

                    <span class="obligatorio">*</span>

                </label>

                <input
                    type="text"
                    id="editar-telefono"
                    value="${egresado.telefono || ""}"
                    required>

                <p class="ayuda">
                    Ingrese su número de teléfono.
                </p>

            </div>


            <div class="campo">

                <label for="editar-empresa">

                    Empresa actual

                </label>

                <input
                    type="text"
                    id="editar-empresa"
                    value="${egresado.empresa || ""}">

                <p class="ayuda">
                    Ingrese el nombre de la empresa donde trabaja.
                </p>

            </div>


            <div class="campo">

                <label for="editar-puesto">

                    Puesto

                </label>

                <input
                    type="text"
                    id="editar-puesto"
                    value="${egresado.puesto || ""}">

                <p class="ayuda">
                    Ingrese el puesto que desempeña.
                </p>

            </div>


            <div class="campo">

                <label for="editar-area">

                    Área profesional

                </label>

                <input
                    type="text"
                    id="editar-area"
                    value="${egresado.area || ""}">

                <p class="ayuda">
                    Ingrese su área profesional.
                </p>

            </div>


            <div class="campo">

                <label for="editar-linkedin">

                    LinkedIn

                </label>

                <input
                    type="text"
                    id="editar-linkedin"
                    value="${egresado.linkedin || ""}">

                <p class="ayuda">
                    Ingrese el enlace de su perfil de LinkedIn.
                </p>

            </div>


            <div class="campo">

                <label for="editar-portafolio">

                    Portafolio

                </label>

                <input
                    type="text"
                    id="editar-portafolio"
                    value="${egresado.portafolio || ""}">

                <p class="ayuda">
                    Ingrese el enlace de su portafolio profesional.
                </p>

            </div>


            <div class="acciones">

                <button
                    type="submit"
                    class="editar">

                    Guardar cambios

                </button>

                <button
                    type="button"
                    id="cancelar-edicion">

                    Cancelar

                </button>

            </div>

        </form>

    `;


    const formularioEditarPerfil =
        document.getElementById("formulario-editar-perfil");

    const botonCancelar =
        document.getElementById("cancelar-edicion");


    formularioEditarPerfil.addEventListener("submit", function (event) {

        event.preventDefault();

        guardarCambiosPerfil(indiceEgresado);

    });


    botonCancelar.addEventListener("click", function () {

        mostrarPerfil();

    });

}


function guardarCambiosPerfil(indiceEgresado) {

    const inputTelefono =
        document.getElementById("editar-telefono");

    const inputEmpresa =
        document.getElementById("editar-empresa");

    const inputPuesto =
        document.getElementById("editar-puesto");

    const inputArea =
        document.getElementById("editar-area");

    const inputLinkedin =
        document.getElementById("editar-linkedin");

    const inputPortafolio =
        document.getElementById("editar-portafolio");


    if (inputTelefono.value.trim() == "") {

        inputTelefono.classList.add("input-error");

        Swal.fire({

            title: "Campo incompleto",

            text: "Debe ingresar el teléfono.",

            icon: "warning",

            confirmButtonText: "Aceptar"

        });

        return;

    }


    let egresados = obtenerEgresados();


    egresados[indiceEgresado].telefono =
        inputTelefono.value.trim();

    egresados[indiceEgresado].empresa =
        inputEmpresa.value.trim();

    egresados[indiceEgresado].puesto =
        inputPuesto.value.trim();

    egresados[indiceEgresado].area =
        inputArea.value.trim();

    egresados[indiceEgresado].linkedin =
        inputLinkedin.value.trim();

    egresados[indiceEgresado].portafolio =
        inputPortafolio.value.trim();


    localStorage.setItem(

        "egresados",

        JSON.stringify(egresados)

    );


    Swal.fire({

        title: "Perfil actualizado",

        text: "La información se guardó correctamente.",

        icon: "success",

        confirmButtonText: "Aceptar"

    }).then(function () {

        mostrarPerfil();

    });

}


if (sesion != null) {

    mostrarPerfil();

}