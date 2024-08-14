document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('cards');
    const cartCount = document.getElementById('cart-count');
    const favoritesCount = document.getElementById('favorites-count');
    const filterButton = document.getElementById('filter-button');
    const filterNavigation = document.getElementById('filter-navigation');
    const closeFilter = document.getElementById('close-filter');
    const applyFilters = document.getElementById('apply-filters');
    const priceFilters = document.querySelectorAll('.filter-price');
    const category = document.body.getAttribute('data-category'); // Get the category from the body attribute

    let products = []; // This will be populated with data from data.json

    function renderProducts(filteredProducts) {
        productsContainer.innerHTML = '';
        filteredProducts.forEach(product => {
        let productElement = document.createElement('div');
        productElement.className = 'card';
        productElement.innerHTML = `
            <div class="card-h"> <button class="add-to-favorites heart" data-id="${product.id}"><i class='bx bx-heart'></i></button></div>
            <a href="detalles-producto.html?id=${product.id}">
            <img class="card-img" src="${product.image}" alt="${product.name} ">
            </a>
            <h2 class="card__title">${product.name}</h2>
            <p card__description>${product.description}</p>
            <p class="discounted-price" >Precio: S/${product.price}</p>
            <div class="rating">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <span class="c-star">${product.rating}</span>
            </div>
            <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
            <button class="more-info" data-id="${product.id}">Más información</button>
        `;
        productsContainer.appendChild(productElement);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });

    document.querySelectorAll('.add-to-favorites').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToFavorites(productId);
        });
    });

    document.querySelectorAll('.more-info').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            showProductInfo(productId);
        });
    });
}
    function showProductInfo(productId) {
        window.location.href = `detalles-producto.html?id=${productId}`;
    }
    function loadProducts() {
        fetch('data/data.json')
            .then(response => response.json())
            .then(data => {
                products = data.filter(product => product.category === category);
                renderProducts(products);
            })
            .catch(error => console.error('Error loading products:', error));
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = products.find(p => p.id == productId);
        const cartProduct = cart.find(p => p.id == productId);
        if (cartProduct) {
            cartProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        Swal.fire({
            title: '¡Producto añadido!',
            text: `${product.name} ha sido añadido al carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }

    function addToFavorites(productId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const product = products.find(p => p.id == productId);
        const favoriteProduct = favorites.find(p => p.id == productId);
        if (favoriteProduct) {
            Swal.fire({
                title: '¡Producto ya en favoritos!',
                text: `${product.name} ya está en tu lista de favoritos.`,
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
        } else {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesCount();
            Swal.fire({
                title: '¡Producto añadido!',
                text: `${product.name} ha sido añadido a tus favoritos.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    /* function showProductInfo(productId) {
        const product = products.find(p => p.id == productId);
        Swal.fire({
            title: product.name,
            html: `
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; border-radius: 8px;">
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                ${product.priceNew ? `<p><strong>New Price:</strong> $${product.priceNew}</p>` : ''}
                <p><strong>Rating:</strong> ${product.rating}</p>
            `,
            confirmButtonText: 'Close'
        });
    } */

        function applyFiltersFunction() {
            const selectedPrices = Array.from(priceFilters)
                .filter(filter => filter.checked)
                .map(filter => ({
                    min: parseFloat(filter.dataset.min) || 0,
                    max: parseFloat(filter.dataset.max) || Infinity
                }));
    
            let filteredProducts;
            if (selectedPrices.length > 0) {
                filteredProducts = products.filter(product => {
                    return selectedPrices.some(filter => {
                        return product.price >= filter.min && product.price <= filter.max;
                    });
                });
            } else {
                filteredProducts = products;
            }
    
            renderProducts(filteredProducts);
        }

        function updateApplyButtonState() {
            const anyChecked = Array.from(priceFilters).some(filter => filter.checked);
            applyFilters.disabled = !anyChecked;
        }
    
        filterButton.addEventListener('click', function() {
            filterNavigation.classList.toggle('visible');
        });
    
        closeFilter.addEventListener('click', function() {
            filterNavigation.classList.remove('visible');
        });
    
        applyFilters.addEventListener('click', function() {
            applyFiltersFunction();
            filterNavigation.classList.remove('visible');
        });
    
        priceFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                updateApplyButtonState();
                if (window.innerWidth > 768) {
                    applyFiltersFunction();
                }
            });
        });

    // Render all products initially
    loadProducts();
    updateApplyButtonState();
    updateCartCount();
    updateFavoritesCount();

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cart.reduce((sum, product) => sum + product.quantity, 0);
        if (totalCount > 0) {
            cartCount.textContent = totalCount;
            cartCount.style.display = 'inline';
        } else {
            cartCount.style.display = 'none';
        }
    }

    function updateFavoritesCount() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const totalCount = favorites.length;
        if (totalCount > 0) {
            favoritesCount.textContent = totalCount;
            favoritesCount.style.display = 'inline';
        } else {
            favoritesCount.style.display = 'none';
        }
    }
});

/* en menu acordeon */
document.querySelectorAll('.desglosamiento').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const arrowIcon = this.querySelector('.arrow-icon');

        // Toggle the active state
        content.classList.toggle('active');
        arrowIcon.classList.toggle('rotate-down');

        // Adjust the max-height
        if (content.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
    });
});

/* document.querySelectorAll('.accordion-header').forEach(header => {
    const content = header.nextElementSibling;
    const arrowIcon = header.querySelector('.arrow-icon');

    // Hacer que esté expandido por defecto
    content.classList.add('active');
    arrowIcon.classList.add('rotate-down');
    content.style.maxHeight = content.scrollHeight + 'px';

    header.addEventListener('click', function() {
        // Toggle the active state
        content.classList.toggle('active');
        arrowIcon.classList.toggle('rotate-down');

        // Adjust the max-height
        if (content.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0';
        }
    });
});
 */