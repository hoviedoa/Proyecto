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

const perfilEgresado = document.getElementById("perfil-egresado");

function mostrarPerfil() {

    let egresados = JSON.parse(localStorage.getItem("egresados"));

    if (egresados == null) {

        egresados = [];

    }

    perfilEgresado.innerHTML = "<h2>Información del egresado</h2>";

    if (egresados.length == 0) {

        perfilEgresado.innerHTML += `

            <p>No hay egresados registrados.</p>

        `;

        return;

    }

    for (let i = 0; i < egresados.length; i++) {

        const egresado = egresados[i];

        perfilEgresado.innerHTML += `

        <article class="card-carrera">

            <h3>Información Personal</h3>

            <p><strong>Nombre Completo:</strong> ${egresado.nombre}</p>

            <p><strong>Identificación:</strong> ${egresado.identificacion}</p>

            <p><strong>Correo:</strong> ${egresado.correo}</p>

            <p><strong>Teléfono:</strong> ${egresado.telefono}</p>

        </article>

        <article class="card-carrera">

            <h3>Información Profesional</h3>

            <p><strong>Lugar de trabajo:</strong> ${egresado.empresa}</p>

            <p><strong>Fecha de registro:</strong> ${egresado.fecha}</p>

        </article>

        <article class="card-carrera">

            <h3>Información Académica</h3>

            <p><strong>Carrera asociada:</strong> ${egresado.carrera}</p>

        </article>

        `;

    }

}


mostrarPerfil();