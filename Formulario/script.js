
    const canvas = document.getElementById('firma');
    const ctx = canvas.getContext('2d');
    let dibujando = false;

    // Ajustar el tamaño del lienzo según el dispositivo
    function ajustarCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', ajustarCanvas);
    ajustarCanvas();

    // Iniciar dibujo
    function iniciarDibujo(x, y) {
        dibujando = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Dibujar
    function dibujar(x, y) {
        if (dibujando) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    // Terminar dibujo
    function terminarDibujo() {
        dibujando = false;
    }

    // Obtener coordenadas correctas
    function obtenerCoordenadas(evento) {
        const rect = canvas.getBoundingClientRect();
        if (evento.touches) {
            return {
                x: evento.touches[0].clientX - rect.left,
                y: evento.touches[0].clientY - rect.top
            };
        }
        return {
            x: evento.clientX - rect.left,
            y: evento.clientY - rect.top
        };
    }

    // Eventos del ratón
    canvas.addEventListener('mousedown', (e) => {
        const { x, y } = obtenerCoordenadas(e);
        iniciarDibujo(x, y);
    });

    canvas.addEventListener('mousemove', (e) => {
        const { x, y } = obtenerCoordenadas(e);
        dibujar(x, y);
    });

    canvas.addEventListener('mouseup', terminarDibujo);

    // Eventos táctiles
    canvas.addEventListener('touchstart', (e) => {
        const { x, y } = obtenerCoordenadas(e);
        iniciarDibujo(x, y);
        e.preventDefault(); // Evitar el scroll mientras se dibuja
    });

    canvas.addEventListener('touchmove', (e) => {
        const { x, y } = obtenerCoordenadas(e);
        dibujar(x, y);
        e.preventDefault(); // Evitar el scroll mientras se dibuja
    });

    canvas.addEventListener('touchend', terminarDibujo);

    // Botón para limpiar el lienzo
    function limpiarFirma() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
