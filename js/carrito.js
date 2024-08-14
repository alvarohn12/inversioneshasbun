document.addEventListener('DOMContentLoaded', function() {
    // Obtener los botones de "Añadir al carrito" y asignarles un evento
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productoId = this.getAttribute('data-id');
            agregarAlCarrito(productoId);
        });
    });

    function agregarAlCarrito(productoId) {
        fetch('data/data.json')
            .then(response => response.json())
            .then(productos => {
                let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const producto = productos.find(p => p.id == productoId);
                const productoEnCarrito = carrito.find(p => p.id == productoId);

                if (productoEnCarrito) {
                    productoEnCarrito.cantidad++;
                } else {
                    carrito.push({ ...producto, cantidad: 1 });
                }

                localStorage.setItem('carrito', JSON.stringify(carrito));
                Swal.fire({
                    title: '¡Producto añadido!',
                    text: `${producto.nombre} ha sido añadido al carrito.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                actualizarCuentaCarrito();
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }

    function actualizarCuentaCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalProductos = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
        const cuentaCarrito = document.getElementById('cart-count');

        if (totalProductos > 0) {
            cuentaCarrito.textContent = totalProductos;
            cuentaCarrito.style.display = 'inline';
        } else {
            cuentaCarrito.style.display = 'none';
        }
    }

    actualizarCuentaCarrito();
});
