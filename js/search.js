document.addEventListener('DOMContentLoaded', function() {
    const buscador = document.getElementById('buscador');
    if (buscador) {
        buscador.addEventListener('input', function() {
            const consulta = this.value.toLowerCase();
            
            // Cargar productos desde data.json
            fetch('data/data.json')
                .then(response => response.json())
                .then(products => {
                    const resultados = products.filter(product =>
                        product.name.toLowerCase().includes(consulta) ||
                        product.description.toLowerCase().includes(consulta)
                    ).slice(0, 6); // Limitar a 6 sugerencias
                    
                    mostrarSugerencias(resultados);
                })
                .catch(error => console.error('Error al cargar los productos:', error));
        });
    }

    function mostrarSugerencias(products) {
        const sugerenciasDiv = document.getElementById('sugerencias');
        sugerenciasDiv.innerHTML = ""; // Limpiar sugerencias anteriores
        
        if (products.length > 0) {
            products.forEach(product => {
                const div = document.createElement('div');
                div.classList.add('sugerencia-item');
                
                // Verificar si el producto ya fue buscado
                const icono = localStorage.getItem(`buscado_${product.id}`) ? 'bx-time' : 'bx-search';

                div.innerHTML = `
                    <a href="${product.url}">
                        <i class='bx ${icono}'></i> ${product.name}
                    </a>`;
                sugerenciasDiv.appendChild(div);
                
                // Agregar evento para cambiar el icono al hacer clic
                div.addEventListener('click', function() {
                    localStorage.setItem(`buscado_${product.id}`, true);
                });
            });
            sugerenciasDiv.style.display = "block";
        } else {
            sugerenciasDiv.style.display = "none";
        }
    }

    // Ocultar sugerencias si se hace clic fuera del buscador
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            document.getElementById('sugerencias').style.display = "none";
        }
    });
});

