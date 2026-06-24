function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    let cart = getCart();
    const product = products.find(p => Number(p.id) === Number(id));

    if (!product) return;

    let existing = cart.find(item =>
        Number(item.id) === Number(id) 
    );
    if (existing) {
        existing.qty = Number(existing.qty) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            qty: 1,
        });
    }

    saveCart(cart);
    updateCartCount(); 
    animateCart(); 
    showToast("Added to cart");}

function updateCartCount() {
    let cart = getCart();

    let count = cart.reduce((sum, item) => {
        return sum + (Number(item.qty) || 0);
    }, 0);

    const el = document.getElementById("cartCount");

    if (el) {
        el.innerText = `(${count})`;
    }
}

updateCartCount();

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function animateCart() {
    const cart = document.getElementById("cartCount");

    if (!cart) return;

    cart.classList.add("cart-bounce");
    cart.classList.add("cart-pulse");

    setTimeout(() => {
        cart.classList.remove("cart-bounce");
        cart.classList.remove("cart-pulse");
    }, 400);
}