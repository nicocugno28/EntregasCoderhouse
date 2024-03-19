/// Función para agregar un elemento a la lista de compra
function agregarElemento(lista) {
    const elemento = prompt("Ingrese el elemento que desea agregar a la lista de compra:");
    lista.push(elemento);
    alert("Elemento '" + elemento + "' agregado a la lista de compra.");
}

// Función para borrar un elemento de la lista de compra
function borrarElemento(lista) {
    const elementoABorrar = prompt("Ingrese el elemento que desea borrar de la lista de compra:");
    const index = lista.indexOf(elementoABorrar);
    if (index !== -1) {
        lista.splice(index, 1);
        alert("Elemento '" + elementoABorrar + "' ha sido borrado de la lista de compra.");
    } else {
        alert("El elemento '" + elementoABorrar + "' no existe en la lista de compra.");
    }
}

// Función principal que muestra el menú y controla el flujo del programa
function mostrarMenu() {
    const listaCompra = [];

    let opcion;
    do {
        opcion = parseInt(prompt("Ingrese:\n1 para agregar un elemento a su lista de compra\n2 para borrar un elemento de la lista de compra\n0 para salir"));

        switch (opcion) {
            case 1:
                agregarElemento(listaCompra);
                break;
            case 2:
                borrarElemento(listaCompra);
                break;
            case 0:
                alert("Saliendo del menú. Su lista de compra es: " + listaCompra.join(", "));
                break;
            default:
                alert("Opción inválida. Por favor, ingrese 1 para agregar, 2 para borrar o 0 para salir.");
        }
    } while (opcion !== 0);

    // Mostrar la lista de compra en la consola
    console.log("Lista de compra final: ", listaCompra);
}

// Llamada a la función para mostrar el menú
mostrarMenu();