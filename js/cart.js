
function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // normalize old + new cart data
    cart = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: Number(item.price) || 0,
        image: item.image,
        qty: Number(item.qty) || 1
    }));

    return cart;
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>
                <p>Looks like you haven't added anything yet.</p>
                <a href="products.html" class="btn">Go Shopping</a>
            </div>
        `;

        document.getElementById("totalPrice").innerText = "Total: $0";
        updateCartCount();
        return;
    }

    cart.forEach((item, index) => {

        total += (Number(item.price) || 0) * (Number(item.qty) || 1);

        container.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>$${Number(item.price) || 0}</p>
              
                <div class="qty-controls">
                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${Number(item.qty) || 1}</span>

                    <button onclick="increaseQty(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>

        </div>
        `;
    });

    document.getElementById("totalPrice").innerText =
        "Total: $" + total;

    updateCartCount();
}


function increaseQty(index) {
    let cart = getCart();
    cart[index].qty = Number(cart[index].qty) + 1;
    saveCart(cart);
    renderCart();
    updateCartCount();
}

function decreaseQty(index) {
    let cart = getCart();

    if (cart[index].qty > 1) {
        cart[index].qty = Number(cart[index].qty) - 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
    updateCartCount();
}

function removeItem(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    updateCartCount();
}