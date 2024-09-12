const productos = [
    { id: 1, nombre: "Caramelera black de vidrio", precio: 5400 },
    { id: 2, nombre: "Frasco azucarera de vidrio ", precio: 7200 },
    { id: 3, nombre: "Vasos de vidrio c/u", precio: 2000 },
    { id: 4, nombre: "Copas base ancha c/u", precio: 4000 },
    { id: 5, nombre: "Set Utensilios cocina", precio: 20000 },
    { id: 6, nombre: "Vajilla de ceramica", precio: 45000 },
    { id: 7, nombre: "Bandeja de especieros ", precio: 8400 },
    { id: 8, nombre: "Contenedor mediano white", precio: 6000 },
    { id: 9, nombre: "Contenedor chico white", precio: 3800 },
    { id: 10, nombre: "Set x6 especieros altos", precio: 12000 },
    { id: 11, nombre: "Set x5 contenedores white", precio: 27500 },
    { id: 12, nombre: "Taza doble vidrio 250ml", precio: 6800 },
];

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

let productsContainer = document.getElementById("products-container");

function renderProductos(productsArray) {
    productsContainer.innerHTML = "";
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <h4>$${producto.precio}</h4>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        `;
        productsContainer.appendChild(card);
    });
    addToCartButton();
}

renderProductos(productos);

function addToCartButton() {
    const addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id);
            const selectedProduct = productos.find(producto => producto.id === productId);
            const productInCart = cartProducts.find(producto => producto.id === productId);

            if (productInCart) {
                productInCart.cantidad += 1;
            } else {
                selectedProduct.cantidad = 1;
                cartProducts.push(selectedProduct);
            }

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        };
    });
}
