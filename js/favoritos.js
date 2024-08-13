document.addEventListener('DOMContentLoaded', function() {
    const favoritesContainer = document.getElementById('favorites-container');

    function renderFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoritesContainer.innerHTML = '';
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>No tienes productos en tu lista de favoritos.</p>';
        } else {
            favorites.forEach(product => {
                let productElement = document.createElement('div');
                productElement.className = 'card';
                productElement.innerHTML = `
                <a href="detalles-producto.html?id=${product.id}">
                <img class="imagen_favorita" src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                </a>
                    <p>${product.description}</p>
                    <p>Precio: $${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                    <button class="more-info" data-id="${product.id}">Más información</button>
                    <button class="remove-from-favorites" data-id="${product.id}"><i class="fa-solid fa-trash"></i></button>
                    `;
                favoritesContainer.appendChild(productElement);
            });

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    addToCart(productId);
                });
            });

            document.querySelectorAll('.remove-from-favorites').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    removeFromFavorites(productId);
                });
            });

            document.querySelectorAll('.more-info').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    showProductInfo(productId);
                });
            });
        }
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = JSON.parse(localStorage.getItem('favorites')).find(p => p.id == productId);
        const cartProduct = cart.find(p => p.id == productId);
        if (cartProduct) {
            cartProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        Swal.fire({
            title: '¡Producto añadido!',
            text: `${product.name} ha sido añadido al carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    function removeFromFavorites(productId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(p => p.id != productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
        Swal.fire({
            title: '¡Producto eliminado!',
            text: `Producto ha sido eliminado de tus favoritos.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    function showProductInfo(productId) {
        window.location.href = `detalles-producto.html?id=${productId}`;
    }

    renderFavorites();
});
