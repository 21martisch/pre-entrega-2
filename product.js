
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let productsContainer = document.getElementById("products-container");
let searchInput = document.getElementById("search");

fetch('./data/data.json')
    .then(response => response.json())
    .then(productos => {
        renderProductos(productos);
        
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProducts = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm)
            );
            renderProductos(filteredProducts);
        });

    })
    .catch(error => console.error('Error al cargar productos:', error));

function renderProductos(productsArray) {
    productsContainer.innerHTML = "";
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img class="productoImg" src="${producto.img}" alt="Imagen de ${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <h4>$${producto.precio}</h4>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        `;
        productsContainer.appendChild(card);
    });
    addToCartButton(productsArray);
}

function addToCartButton(productsArray) {
    const addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id);
            const selectedProduct = productsArray.find(producto => producto.id === productId);
            const productInCart = cartProducts.find(producto => producto.id === productId);

            if (productInCart) {
                productInCart.cantidad += 1;
            } else {
                selectedProduct.cantidad = 1;
                cartProducts.push(selectedProduct);
            }

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            showToast(selectedProduct.nombre);
        };
    });
}
function showToast(productName) {
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = `
        <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 20px; right: 20px; z-index: 10000;">
            <div class="d-flex">
                <div class="toast-body">
                    ¡${productName} ha sido agregado al carrito!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    document.body.appendChild(toastContainer);

    const toastElement = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toastElement.show();

    setTimeout(() => {
        toastContainer.remove();
    }, 3000); // Se oculta después de 3 segundos
}
