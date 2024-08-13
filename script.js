class Carrito {
    constructor() {
        this.productos = [];
        this.productosDisponibles = [
            new Producto("Leche", 1000),
            new Producto("Pan de Molde", 2000),
            new Producto("Queso", 1200),
            new Producto("Mermelada", 890),
            new Producto("Azúcar", 1300)
        ];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    finalizarCompra() {
        const total = this.calcularTotal();
        const mensaje = `El total de la compra es $${total} ¿Deseas confirmar la compra?`;

        const confirmar = confirm(mensaje);

        if (confirmar) {
            alert("¡Gracias por tu compra!");
            this.productos = [];
        } else {
            alert("La compra ha sido cancelada.");
            this.productos = [];
            this.seleccionarProducto();
        }
    }

    mostrarDetalles() {
        if (this.productos.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        let detalles = 'Detalles de la compra:\n';
        const cantidades = {};

        this.productos.forEach((producto) => {
            if (!cantidades[producto.nombre]) {
                cantidades[producto.nombre] = { precio: producto.precio, cantidad: 0 };
            }
            cantidades[producto.nombre].cantidad += 1;
        });

        Object.keys(cantidades).forEach((nombre) => {
            const { precio, cantidad } = cantidades[nombre];
            detalles += `${nombre}: $${precio} | Cantidad: ${cantidad} = $${precio * cantidad}\n`;
        });

        const total = this.calcularTotal();
        detalles += `Total: $${total}`;

        alert(detalles);
    }

    mostrarProductosDisponibles() {
        let productosDisponibles = "Productos disponibles:\n";
        this.productosDisponibles.forEach((producto, index) => {
            productosDisponibles += `${index + 1}. ${producto.nombre} - $${Math.round(producto.precio)}\n`;
        });

        return productosDisponibles;
    }

    seleccionarProducto() {
        let continuar = true;

        while (continuar) {
            let productosDisponibles = this.mostrarProductosDisponibles();
            if (!productosDisponibles) {
                return;
            }

            let seleccion;
            let indexSeleccionado;
            let cantidad;

            do {
                seleccion = prompt(`Introduce el número del producto que deseas agregar al carrito:\n${productosDisponibles}`);
                indexSeleccionado = parseInt(seleccion, 10) - 1;

                if (isNaN(indexSeleccionado) || indexSeleccionado < 0 || indexSeleccionado >= this.productosDisponibles.length) {
                    alert("Selección inválida. Por favor, elige un número válido.");
                }
            } while (isNaN(indexSeleccionado) || indexSeleccionado < 0 || indexSeleccionado >= this.productosDisponibles.length);

            const productoSeleccionado = this.productosDisponibles[indexSeleccionado];

            do {
                cantidad = prompt(`¿Cuántas unidades de ${productoSeleccionado.nombre} deseas agregar?`);
                cantidad = parseInt(cantidad, 10);

                if (isNaN(cantidad) || cantidad <= 0) {
                    alert("Cantidad inválida. Por favor, introduce un número válido mayor que 0.");
                }
            } while (isNaN(cantidad) || cantidad <= 0);

            alert(`Has agregado ${cantidad} unidades de ${productoSeleccionado.nombre} al carrito.`);
            for (let i = 0; i < cantidad; i++) {
                this.agregarProducto(productoSeleccionado);
            }

            let respuesta;
            do {
                respuesta = prompt("¿Deseas seguir agregando productos? (s/n)").toLowerCase();
                
                if (respuesta !== 's' && respuesta !== 'n') {
                    alert("Respuesta inválida. Por favor, responde con 's' para sí o 'n' para no.");
                }
            } while (respuesta !== 's' && respuesta !== 'n');

            if (respuesta === 'n') {
                continuar = false;
                this.mostrarDetalles();
                this.finalizarCompra();
            }
        }
    }
}

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

const carrito = new Carrito();
carrito.seleccionarProducto();
