document.addEventListener("DOMContentLoaded", function () {

    const comentarios = [
        {
            autor: "Álvaro Javier Ramos Jiménez",
            email: "alvaro@correo.com",
            fecha: "15/03/2026",
            hora: "10:15",
            texto: "Me parece muy bien que se repare el alumbrado de la zona cuanto antes."
        },
        {
            autor: "Alba María Ramos Jiménez",
            email: "alba@correo.com",
            fecha: "15/03/2026",
            hora: "11:02",
            texto: "Por la noche hacía falta más iluminación en el paseo."
        },
        {
            autor: "Juan Pérez Rodríguez",
            email: "juan@correo.com",
            fecha: "15/03/2026",
            hora: "12:40",
            texto: "Espero que también revisen otras farolas cercanas que fallan algunos días."
        }
    ];

    const zonaComentarios = document.getElementById("zonaComentarios");
    const panelComentarios = document.getElementById("panelComentarios");
    const cerrarPanel = document.getElementById("cerrarPanel");

    const botonNuevoComentario = document.getElementById("botonNuevoComentario");
    const formularioComentario = document.getElementById("formularioComentario");
    const cerrarFormulario = document.getElementById("cerrarFormulario");
    const listaComentarios = document.getElementById("listaComentarios");

    const nombreComentario = document.getElementById("nombreComentario");
    const emailComentario = document.getElementById("emailComentario");
    const textoComentario = document.getElementById("textoComentario");
    const enviarComentario = document.getElementById("enviarComentario");

    let panelBloqueado = false;

    const fondoModal = document.getElementById("fondoModal");
    const mensajeModal = document.getElementById("mensajeModal");
    const cerrarModal = document.getElementById("cerrarModal");

    const localidades = [
        "Escaleritas",
        "Triana",
        "Vegueta",
        "Guanarteme",
        "La Isleta",
        "Tafira",
        "Tamaraceite",
        "Minilla"
    ];

    
    function abrirPanel() {
        if (!panelBloqueado) {
            panelComentarios.classList.add("abierto");
        }
    }

    function cerrarPanelComentarios() {
        panelComentarios.classList.remove("abierto");
        ocultarFormulario();
        panelBloqueado = true;
    }

    function mostrarFormulario() {
        formularioComentario.classList.remove("oculto");
        botonNuevoComentario.classList.add("oculto");
    }

    function ocultarFormulario() {
        formularioComentario.classList.add("oculto");
        botonNuevoComentario.classList.remove("oculto");
    }

    function obtenerFechaActual() {
        const ahora = new Date();

        let dia = ahora.getDate();
        let mes = ahora.getMonth() + 1;
        let anio = ahora.getFullYear();

        if (dia < 10) {
            dia = "0" + dia;
        }

        if (mes < 10) {
            mes = "0" + mes;
        }

        return dia + "/" + mes + "/" + anio;
    }

    function obtenerHoraActual() {
        const ahora = new Date();

        let horas = ahora.getHours();
        let minutos = ahora.getMinutes();

        if (horas < 10) {
            horas = "0" + horas;
        }

        if (minutos < 10) {
            minutos = "0" + minutos;
        }

        return horas + ":" + minutos;
    }

    function crearComentarioHTML(comentario) {
        const cajaComentario = document.createElement("div");
        cajaComentario.className = "comentario";

        const autor = document.createElement("p");
        autor.className = "comentario_autor";
        autor.textContent = comentario.autor;

        const fecha = document.createElement("p");
        fecha.className = "comentario_fecha";
        fecha.textContent = comentario.fecha + " - " + comentario.hora;

        const texto = document.createElement("p");
        texto.className = "comentario_texto";
        texto.textContent = comentario.texto;

        cajaComentario.appendChild(autor);
        cajaComentario.appendChild(fecha);
        cajaComentario.appendChild(texto);

        return cajaComentario;
    }

    function mostrarComentarios() {
        listaComentarios.innerHTML = "";

        comentarios.forEach(function (comentario) {
            const comentarioHTML = crearComentarioHTML(comentario);
            listaComentarios.appendChild(comentarioHTML);
        });
    }

    function limpiarFormulario() {
        nombreComentario.value = "";
        emailComentario.value = "";
        textoComentario.value = "";
    }
    function emailValido(email) {
        const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionEmail.test(email);
    }



    function anadirNuevoComentario() {
        const nombre = nombreComentario.value;
        const email = emailComentario.value;
        const texto = textoComentario.value;

        if (nombre === "" || email === "" || texto === "") {
            mostrarModal("Todos los campos del formulario deben estar rellenos.");
            return;
        }

        if (!emailValido(email)) {
            mostrarModal("Debes introducir una dirección de e-mail válida.");
            return;
        }

        const nuevoComentario = {
            autor: nombre,
            email: email,
            fecha: obtenerFechaActual(),
            hora: obtenerHoraActual(),
            texto: texto
        };

        comentarios.unshift(nuevoComentario);
        mostrarComentarios();
        limpiarFormulario();
        ocultarFormulario();
    }

    function mostrarModal(mensaje) {
        mensajeModal.textContent = mensaje;
        fondoModal.classList.remove("oculto");
    }

    function ocultarModal() {
        fondoModal.classList.add("oculto");
    }

    function detectarLocalidades() {
        let textoActual = textoComentario.value;

        localidades.forEach(function (localidad) {
            const expresion = new RegExp("\\b" + localidad + "\\b", "gi");
            textoActual = textoActual.replace(expresion, localidad.toUpperCase());
        });

        textoComentario.value = textoActual;
    }

    zonaComentarios.addEventListener("mouseover", abrirPanel);

    zonaComentarios.addEventListener("mouseleave", function () {
        panelBloqueado = false;
    });

    cerrarPanel.addEventListener("click", cerrarPanelComentarios);
    botonNuevoComentario.addEventListener("click", mostrarFormulario);
    cerrarFormulario.addEventListener("click", ocultarFormulario);
    enviarComentario.addEventListener("click", anadirNuevoComentario);

    cerrarModal.addEventListener("click", ocultarModal);

    textoComentario.addEventListener("input", detectarLocalidades);

    mostrarComentarios();
});