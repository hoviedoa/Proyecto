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

    const formulario = document.getElementById("formulario-egresado");
    const identificacion = document.getElementById("identificacion");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const carrera = document.getElementById("carrera");
    const fecha = document.getElementById("fecha");
    const lugaresContainer = document.getElementById("lugares-container");
    const botonAgregarLugar = document.getElementById("agregar-lugar-btn");
    const templateLugar = document.getElementById("template-lugar");
    const listaEgresados = document.getElementById("lista-egresados");
    let contadorLugar = 0;

    function cargarCarreras(){
        const carrerasGuardadas = 
        JSON.parse(localStorage.getItem("carreras")) || [];
        carrerasGuardadas.forEach(function(carreraGuardada){
            const opcion = document.createElement("option");
            opcion.value = carreraGuardada.codigo;
            opcion.textContent = carreraGuardada.nombre;
            carrera.appendChild(opcion);
        });
    }

    botonAgregarLugar.addEventListener("click", function(){
        const nuevoLugar = templateLugar.content.cloneNode(true);
        const bloque = nuevoLugar.querySelector(".bloque-lugar");
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

    lugaresContainer.addEventListener("click", function(event){
        if(event.target.closest(".eliminar-lugar")){
            const bloque = event.target.closest(".bloque-lugar");
            bloque.remove();
        }
    });

    function obtenerLugares(){
        const lugares =
        document.querySelectorAll(".bloque-lugar");
        let lista = [];
        lugares.forEach(function(lugar){
            lista.push({
                empresa:
                lugar.querySelector("input[id^='empresa']").value,
                puesto:
                lugar.querySelector("input[id^='puesto']").value,
                fechaInicio:
                lugar.querySelector("input[id^='fecha-inicio']").value,
                fechaFin:
                lugar.querySelector("input[id^='fecha-fin']").value
            });
        });
        return lista;
    }

    function validarIdentificacion(valor){
        return valor.length >= 6;
    }

    function validarNombre(valor){
        return valor.length >= 3;
    }

    function validarCorreo(valor){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    function validarFormulario(){
        let error = false;
        const valorIdentificacion =
        identificacion.value.trim();
        if(!validarIdentificacion(valorIdentificacion)){
            identificacion.classList.add("input-error");
            error = true;
        }else{
            identificacion.classList.remove("input-error");
        }
        const valorNombre =
        nombre.value.trim();
        if(!validarNombre(valorNombre)){
            nombre.classList.add("input-error");
            error = true;
        }else{
            nombre.classList.remove("input-error");
        }
        const valorCorreo =
        correo.value.trim();

        if(!validarCorreo(valorCorreo)){
            correo.classList.add("input-error");
            error = true;
        }else{
            correo.classList.remove("input-error");
        }
        if(carrera.value === ""){
            carrera.classList.add("input-error");
            error = true;
        }else{
            carrera.classList.remove("input-error");
        }
        if(fecha.value === ""){
            fecha.classList.add("input-error");
            error = true;
        }else{
            fecha.classList.remove("input-error");
        }
        return !error;
    }

    formulario.addEventListener("submit", function(event){
        event.preventDefault();
        if(!validarFormulario()){
            Swal.fire({
                title:"No se pudo registrar el egresado",
                text:"Complete correctamente los campos resaltados.",
                icon:"warning",
                confirmButtonText:"Aceptar"
            });
            return;
        }
        const egresado = {
            identificacion: inputCedula.value.trim(),
            nombre: inputNombre.value.trim(),
            correo: inputCorreo.value.trim(),
            telefono: inputTelefono.value.trim(),
            carrera: inputCarrera.value,
            fecha: inputFecha.value,
            lugaresTrabajo: lugaresTrabajo,
            empresa: "",
            puesto: "",
            area: "",
            linkedin: "",
            portafolio: ""
        };
        let egresados =
        JSON.parse(localStorage.getItem("egresados")) || [];
        egresados.push(egresado);
        localStorage.setItem(
            "egresados",
            JSON.stringify(egresados)
        );

        Swal.fire({
            title:"Egresado registrado",
            text:"El egresado fue guardado correctamente.",
            icon:"success",
            confirmButtonText:"Aceptar"
        });

        formulario.reset();
        lugaresContainer.innerHTML = "";
        mostrarEgresados();
    });

    function mostrarEgresados(){
        listaEgresados.innerHTML =
        "<h2>Egresados registrados</h2>";
        const egresados =
        JSON.parse(localStorage.getItem("egresados")) || [];
        for(let i = 0; i < egresados.length; i++){
            const egresado = egresados[i];
            listaEgresados.innerHTML += `
            <article class="tarjeta-egresado">
                <h3>${egresado.nombre}</h3>
                <p>
                Identificación:
                ${egresado.identificacion}
                </p>

                <p>
                Correo:
                ${egresado.correo}
                </p>

                <p>
                Carrera:
                ${egresado.carrera}
                </p>

                <p>
                Fecha registro:
                ${egresado.fecha}
                </p>
            </article>
            `;
        }

    }
    cargarCarreras();

    mostrarEgresados();
