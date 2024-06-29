document.addEventListener('DOMContentLoaded', () => {
    let botonAgregar = document.getElementById('botonAgregar');
    let tablaProgreso = document.getElementById('trackeoTabla');
    let historialCuerpo = document.getElementById('historialCuerpo');

    botonAgregar.addEventListener('click', (event) => {
        event.preventDefault();

        // obtener los datos del formulario
        let ejercicio = document.getElementById('ejercicio').value;
        let musculo = document.getElementById('musculo').value;
        let series = document.getElementById('series').value;
        let repeticiones = document.getElementById('repeticiones').value;
        let peso = document.getElementById('peso').value;

        if (!ejercicio || !musculo || !series || !repeticiones || !peso) {
            alert("Por favor, complete todos los campos antes de agregar.");
            return;
        }

        // crear una nueva fila y agregar los datos a la tabla principal
        let nuevaFila = document.createElement('tr');

        nuevaFila.innerHTML = `
            <td>${ejercicio}</td>
            <td>${musculo}</td>
            <td>${series}</td>
            <td>${repeticiones}</td>
            <td>${peso}</td>
            <td><button class="editar">Modificar</button></td>
            <td><button class="eliminar">Eliminar</button></td>
        `;

        tablaProgreso.appendChild(nuevaFila);

        // guardar la fecha y hora actuales
        let fechaActual = new Date().toLocaleString();

        // crear una nueva fila para el historial y agregar los datos
        let nuevaFilaHistorial = document.createElement('tr');

        nuevaFilaHistorial.innerHTML = `
            <td>${fechaActual}</td>
            <td>${ejercicio}</td>
            <td>${musculo}</td>
            <td>${series}</td>
            <td>${repeticiones}</td>
            <td>${peso}</td>
        `;

        historialCuerpo.appendChild(nuevaFilaHistorial);

        // Limpiar el formulario después de agregar los datos
        document.getElementById('formulario').reset();

        
        actualizarEventos();
    });

    function actualizarEventos() {
        let botonesEliminar = document.getElementsByClassName('eliminar');
        let botonesModificar = document.getElementsByClassName('editar');

        for (let i = 0; i < botonesEliminar.length; i++) {
            botonesEliminar[i].addEventListener('click', (event) => {
                let confirmacion = confirm("¿Estás seguro de que deseas eliminar este ejercicio?");
                if (confirmacion) {
                    event.target.closest('tr').remove();
                }
            });
        }

        for (let i = 0; i < botonesModificar.length; i++) {
            botonesModificar[i].addEventListener('click', (event) => {
                let fila = event.target.closest('tr');

                document.getElementById('ejercicio').value = fila.children[0].textContent;
                document.getElementById('musculo').value = fila.children[1].textContent;
                document.getElementById('series').value = fila.children[2].textContent;
                document.getElementById('repeticiones').value = fila.children[3].textContent;
                document.getElementById('peso').value = fila.children[4].textContent;

                fila.remove();
            });
        }
    }

    
    actualizarEventos();
});

  