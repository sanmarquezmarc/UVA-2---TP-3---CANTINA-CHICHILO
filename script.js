document.addEventListener('DOMContentLoaded', () => {
    const calendarioDiv = document.getElementById('calendario');
    const botonReservar = document.getElementById('boton-reservar');
    const selectorHora = document.getElementById('hora');
    let fechaSeleccionada = null;

    function generarCalendario(anio, mes) {
        calendarioDiv.innerHTML = ''; // Limpiar el calendario anterior

        const primerDiaMes = new Date(anio, mes, 1);
        const ultimoDiaMes = new Date(anio, mes + 1, 0);
        const totalDiasMes = ultimoDiaMes.getDate();
        const diaSemanaPrimerDia = primerDiaMes.getDay(); // 0 (Domingo) - 6 (Sábado)

        const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        // Encabezado del calendario (Mes y Año)
        const header = document.createElement('div');
        header.classList.add('header-calendario');
        const mesAnio = document.createElement('h2');
        mesAnio.textContent = `${nombresMeses[mes]} ${anio}`;
        const botonAnterior = document.createElement('button');
        botonAnterior.textContent = '<';
        botonAnterior.addEventListener('click', () => {
            const nuevoMes = mes === 0 ? 11 : mes - 1;
            const nuevoAnio = mes === 0 ? anio - 1 : anio;
            generarCalendario(nuevoAnio, nuevoMes);
        });
        const botonSiguiente = document.createElement('button');
        botonSiguiente.textContent = '>';
        botonSiguiente.addEventListener('click', () => {
            const nuevoMes = mes === 11 ? 0 : mes + 1;
            const nuevoAnio = mes === 11 ? anio + 1 : anio;
            generarCalendario(nuevoAnio, nuevoMes);
        });

        header.appendChild(botonAnterior);
        header.appendChild(mesAnio);
        header.appendChild(botonSiguiente);
        calendarioDiv.appendChild(header);

        // Nombres de los días de la semana
        nombresDias.forEach(nombre => {
            const diaNombre = document.createElement('div');
            diaNombre.textContent = nombre;
            calendarioDiv.appendChild(diaNombre);
        });

        // Espacios en blanco para el primer día del mes
        for (let i = 0; i < diaSemanaPrimerDia; i++) {
            const espacioBlanco = document.createElement('div');
            calendarioDiv.appendChild(espacioBlanco);
        }

        // Días del mes
        for (let dia = 1; dia <= totalDiasMes; dia++) {
            const diaDiv = document.createElement('div');
            diaDiv.classList.add('dia');
            diaDiv.textContent = dia;
            diaDiv.addEventListener('click', () => {
                // Remover la clase 'seleccionado' de la fecha previamente seleccionada
                const diaSeleccionadoAnterior = document.querySelector('.dia.seleccionado');
                if (diaSeleccionadoAnterior) {
                    diaSeleccionadoAnterior.classList.remove('seleccionado');
                }
                diaDiv.classList.add('seleccionado');
                fechaSeleccionada = new Date(anio, mes, dia);
                botonReservar.disabled = false;
                selectorHora.disabled = false;
            });

            // Resaltar el día actual
            const hoy = new Date();
            if (hoy.getFullYear() === anio && hoy.getMonth() === mes && hoy.getDate() === dia) {
                diaDiv.classList.add('hoy');
            }

            calendarioDiv.appendChild(diaDiv);
        }
    }

    // Inicializar el calendario con la fecha actual
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth();
    generarCalendario(anioActual, mesActual);

    // Lógica para el botón de reservar (puedes personalizar esto)
    botonReservar.addEventListener('click', () => {
        if (fechaSeleccionada) {
            const horaSeleccionada = selectorHora.value;
            alert(`Reserva para el día: ${fechaSeleccionada.toLocaleDateString()} a las ${horaSeleccionada}`);
            // Aquí puedes agregar la lógica para enviar la reserva a tu servidor
        } else {
            alert('Por favor, selecciona una fecha.');
        }
    });
});