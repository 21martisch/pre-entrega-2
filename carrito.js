let cartStorage = localStorage.getItem("cartProducts");
cartStorage = JSON.parse(cartStorage) || [];

let cartContainer = document.getElementById("cart-section");

function renderCarrito(cartItems) {
    cartContainer.innerHTML = "";
    let totalGeneral = 0;

    cartItems.forEach((producto, index) => {
        const totalProducto = producto.precio * producto.cantidad;
        totalGeneral += totalProducto;

        const card = document.createElement("div");
        card.classList.add("cart-item");
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <h4>Precio: $${producto.precio}</h4>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Total: $${totalProducto}</p>
            <button onclick="incrementarCantidad(${index})">+</button>
            <button onclick="decrementarCantidad(${index})">-</button>
        `;
        cartContainer.appendChild(card);
    });

    const totalElement = document.createElement("h3");
    totalElement.innerText = `Total: $${totalGeneral}`;
    cartContainer.appendChild(totalElement);
}

function incrementarCantidad(index) {
    cartStorage[index].cantidad += 1;
    actualizarCarrito();
}

function decrementarCantidad(index) {
    if (cartStorage[index].cantidad > 1) {
        cartStorage[index].cantidad -= 1;
    } else {
        cartStorage.splice(index, 1);
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
    renderCarrito(cartStorage);
}

renderCarrito(cartStorage);
