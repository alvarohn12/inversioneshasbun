document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>No tienes productos en tu carrito.</p>';
            totalPriceElement.innerHTML = 'Total: S/ 0.00';
        } else {
            cart.forEach(product => {
                let productElement = document.createElement('div');
                productElement.className = 'card cardd';
                productElement.innerHTML = `
                <a href="detalles-producto.html?id=${product.id}">
                <img class="card-img" src="${product.image}" alt="${product.name}">
                </a>
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Precio: S/ ${product.price}</p>
                <div class="inferior">
                    <p>Cantidad: 
                        <button class="update-quantity" data-id="${product.id}" data-delta="-1"><i class="fa-solid fa-minus"></i></button>
                        ${product.quantity}
                        <button class="update-quantity" data-id="${product.id}" data-delta="1"><i class="fa-solid fa-plus"></i></button>
                    </p>
                    <button class="remove-from-cart" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
                </div>`;
                cartContainer.appendChild(productElement);

                totalPrice += product.price * product.quantity; // Sumar el total
            });

            totalPriceElement.innerHTML = `Total: S/ ${totalPrice.toFixed(2)}`; // Mostrar el total
        }

        document.querySelectorAll('.update-quantity').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                const delta = parseInt(this.getAttribute('data-delta'));
                updateQuantity(productId, delta);
            });
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                removeFromCart(productId);
            });
        });
    }

    function updateQuantity(productId, delta) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(p => p.id == productId);
        if (product) {
            product.quantity += delta;
            if (product.quantity <= 0) {
                cart = cart.filter(p => p.id != productId);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(p => p.id != productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        Swal.fire({
            title: '¡Producto eliminado!',
            text: 'Producto ha sido eliminado del carrito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    document.getElementById('clear-cart').addEventListener('click', function() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('cart');
                renderCart();
                Swal.fire({
                    title: '¡Carrito vacío!',
                    text: 'Todos los productos han sido eliminados del carrito.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });

    document.getElementById('checkout').addEventListener('click', function() {
        const totalPriceText = totalPriceElement.innerText.replace('Total: S/ ', '').trim();
        const totalPrice = parseFloat(totalPriceText);
        if (!isNaN(totalPrice)) {
            localStorage.setItem('totalPrice', totalPrice.toFixed(2)); // Guardar el total en el almacenamiento local
            window.location.href = 'payment.html'; // Redirige al formulario de pago
        } else {
            alert("Error al obtener el precio total. Por favor, inténtalo de nuevo.");
        }
    });

    renderCart();
});