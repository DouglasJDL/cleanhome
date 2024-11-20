$(document).ready(function () {
    // Código relacionado con sugerencias y campo de búsqueda

    const topProductosYServicios = [
        {
            nombre: "Producto Multiuso",
            imagen: "img/producto1.jpg",
            precio: "Q20.00",
            etiqueta: "Más Vendido",
            tipo: "producto"
        },
        {
            nombre: "Limpieza Residencial",
            imagen: "img/servicio1.jpg",
            tipo: "servicio"
        }
    ];

    function mostrarSugerencias(filtrar = true) {
        const inputValue = $(".form-control[type='search']").val().toLowerCase();
        const suggestionsContainer = $("#recomendaciones");
        suggestionsContainer.remove(); // Limpiar sugerencias previas

        let recomendacionesHTML = `
            <ul id="recomendaciones" class="list-group position-absolute shadow" style="top: 100%; z-index: 1000; width: 400px; max-width: 100%;">
        `;

        const productosFiltrados = topProductosYServicios.filter(item => item.tipo === "producto" && (!filtrar || item.nombre.toLowerCase().includes(inputValue)));
        const serviciosFiltrados = topProductosYServicios.filter(item => item.tipo === "servicio" && (!filtrar || item.nombre.toLowerCase().includes(inputValue)));

        // Añadir los productos filtrados
        if (productosFiltrados.length > 0) {
            recomendacionesHTML += `<li class="list-group-item suggestion-title bg-light"><strong>Producto Sugerido</strong></li>`;
            productosFiltrados.forEach(item => {
                recomendacionesHTML += `
                    <li class="list-group-item d-flex align-items-center">
                        <img src="${item.imagen}" alt="${item.nombre}" class="me-3" style="width: 50px; height: 50px; object-fit: cover;">
                        <div>
                            <h6 class="mb-0">${item.nombre}</h6>
                            <small class="text-muted">${item.precio} - <span class="badge bg-success">${item.etiqueta}</span></small>
                           
                        </div>
                    </li>`;
            });
        }

        // Añadir los servicios filtrados
        if (serviciosFiltrados.length > 0) {
            recomendacionesHTML += `<li class="list-group-item suggestion-title bg-light"><strong>Servicio Sugerido</strong></li>`;
            serviciosFiltrados.forEach(item => {
                recomendacionesHTML += `
                    <li class="list-group-item d-flex align-items-center">
                        <img src="${item.imagen}" alt="${item.nombre}" class="me-3" style="width: 50px; height: 50px; object-fit: cover;">
                        <div>
                            <h6 class="mb-0">${item.nombre}</h6>
                            
                        </div>
                    </li>`;
            });
        }

        recomendacionesHTML += `
            <li class="list-group-item">
                <a href="tienda.html" class="btn btn-sm btn-primary mt-2">Ver Todos los Resultados</a>
            </li>`;

        recomendacionesHTML += '</ul>';

        $(".form-control[type='search']").after(recomendacionesHTML);
    }

    // Mostrar todas las sugerencias cuando el campo de búsqueda recibe foco
    $(".form-control[type='search']").on("focus", function () {
        mostrarSugerencias(false);
    });

    // Filtrar sugerencias cuando el usuario escribe en el campo de búsqueda
    $(".form-control[type='search']").on("input", function () {
        mostrarSugerencias();
    }).on("blur", function () {
        setTimeout(function () {
            $("#recomendaciones").remove();
        }, 200);
    });

    // Cancelar la acción predeterminada si no hay valor en el campo al presionar Enter
    $("#searchForm").on("submit", function (event) {
        const inputValue = $(".form-control[type='search']").val().trim();
        if (inputValue === "") {
            event.preventDefault();
        }
    });

    // Inicializar el carrusel (Swiper) - mover esta parte al final para evitar conflictos
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Inicializar la librería TwentyTwenty para la comparación de imágenes
    $(window).on('load', function() {
        $('.twentytwenty-container').twentytwenty({
            before_label: 'Antes',
            after_label: 'Después',
            default_offset_pct: 0.5 
        });
    });
});




//tienda

    // Actualización dinámica del rango de precios
    document.getElementById('priceRange').addEventListener('input', function() {
        document.getElementById('priceRangeValue').textContent = 'Hasta Q' + this.value;
    });

    // Replicar los productos de manera aleatoria hasta 2 veces
    document.addEventListener('DOMContentLoaded', function() {
        const productContainer = document.getElementById('productContainer');
        const productCards = Array.from(document.querySelectorAll('.product-card-template'));
        const maxRepetitions = 2;

        let allProducts = [];
        for (let i = 0; i < maxRepetitions; i++) {
            allProducts = allProducts.concat(productCards);
        }

        // Mezclar productos aleatoriamente
        allProducts = allProducts.sort(() => Math.random() - 0.5);

        // Limpiar el contenedor de productos y agregar los productos mezclados
        productContainer.innerHTML = '';
        allProducts.forEach(product => {
            productContainer.appendChild(product.cloneNode(true));
        });
    });


    document.addEventListener("DOMContentLoaded", function () {
        const rangeInput = document.getElementById("priceRange");
        const rangeValue = document.getElementById("priceRangeValue");
    
        // Actualizar la barra azul y el texto dinámicamente
        rangeInput.addEventListener("input", function () {
            const value = rangeInput.value;
            const max = rangeInput.max;
            const min = rangeInput.min;
            const progress = ((value - min) / (max - min)) * 100;
    
            // Cambiar el color del rango dinámicamente
            rangeInput.style.setProperty("--progress", `${progress}%`);
            rangeValue.textContent = `Hasta Q${value}`;
        });
    });