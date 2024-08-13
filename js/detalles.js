document.addEventListener('DOMContentLoaded', function() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const mainImage = document.getElementById('main-image');
    const thumbnailsDiv = document.querySelector('.thumbnails');
    const sliderModal = document.getElementById('slider-modal');
    const swiperWrapper = document.getElementById('swiper-wrapper');
    const sliderCloseButton = document.getElementById('slider-close');
    const caracteristicasList = document.getElementById('caracteristicas-list');
    const buyNowButton = document.getElementById('buy-now');

    fetch('../data/data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (product) {
                document.getElementById('product-name').textContent = product.name;
                document.getElementById('product-description').textContent = product.description;
                document.getElementById('product-price').textContent = `S/${product.price}`;
                document.getElementById('product-rating').textContent = product.rating;

                if (product.priceNew) {
                    const priceNewElement = document.getElementById('product-price-new');
                    priceNewElement.style.display = 'block';
                    priceNewElement.querySelector('span').textContent = `S/${product.priceNew}`;
                }

                mainImage.src = product.image;

                caracteristicasList.innerHTML = '';
                product.caracteristicas.forEach(caracteristica => {
                    const li = document.createElement('li');
                    li.textContent = caracteristica;
                    caracteristicasList.appendChild(li);
                });

                const allImages = [product.image, ...product.images];

                const showSlider = () => {
                    sliderModal.classList.add('active');
                    swiperWrapper.innerHTML = '';
                    allImages.forEach(imgSrc => {
                        const slideDiv = document.createElement('div');
                        slideDiv.className = 'swiper-slide';
                        slideDiv.innerHTML = `<img src="${imgSrc}" alt="Imagen slider">`;
                        swiperWrapper.appendChild(slideDiv);
                    });

                    if (!window.mySwiper) {
                        window.mySwiper = new Swiper('.swipers', {
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                        });
                    } else {
                        window.mySwiper.update();
                    }
                };

                mainImage.addEventListener('click', showSlider);

                product.images.forEach((imgSrc, index) => {
                    const thumbImg = document.createElement('img');
                    thumbImg.src = imgSrc;
                    thumbImg.alt = `Imagen ${index + 1} de ${product.name}`;
                    
                    thumbImg.addEventListener('mouseover', () => {
                        mainImage.src = imgSrc;
                    });

                    thumbImg.addEventListener('click', showSlider);

                    thumbnailsDiv.appendChild(thumbImg);
                });

                sliderCloseButton.addEventListener('click', () => {
                    sliderModal.classList.remove('active');
                });

                sliderModal.addEventListener('click', (e) => {
                    if (e.target === sliderModal) {
                        sliderModal.classList.remove('active');
                    }
                });

                // Manejador de clic para el botón "Comprar ahora"
                buyNowButton.addEventListener('click', () => {
                    const priceElement = document.getElementById('product-price');
                    const priceText = priceElement.textContent.replace('$', ''); // Obtener precio sin el signo de dólar
                    localStorage.setItem('productPrice', priceText); // Almacenar el precio en localStorage
                    window.location.href = 'payment.html'; // Redirigir a la página de pago
                });

            } else {
                document.getElementById('product-details').innerHTML = `<p>Producto no encontrado</p>`;
            }
        })
        .catch(error => console.error('Error al cargar los detalles del producto:', error));
});
