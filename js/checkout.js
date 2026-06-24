function loadCheckout() {
    let cart = getCart();

    const itemsContainer = document.getElementById("checkoutItems");

    let subtotal = 0;

    itemsContainer.innerHTML = "";

    if (cart.length === 0) {
        itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        let itemTotal = Number(item.price) * Number(item.qty);
        subtotal += itemTotal;

        itemsContainer.innerHTML += `
        <div class="checkout-item">
            <span>${item.name} x${item.qty}</span>
            <span>$${itemTotal}</span>
        </div>
        `;
    });

    const shippingSelect = document.getElementById("shipping");

    function updateTotals() {
        let shipping = Number(shippingSelect.value);
        let total = subtotal + shipping;

        document.getElementById("checkoutSubtotal").innerText =
            "Subtotal: $" + subtotal;

        document.getElementById("checkoutShipping").innerText =
            "Shipping: $" + shipping;

        document.getElementById("checkoutTotal").innerText =
            "Total: $" + total;
    }

    shippingSelect.addEventListener("change", updateTotals);

    updateTotals();
}

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    localStorage.removeItem("cart");

    showToast("Order placed successfully!");

    setTimeout(() => {
        window.location.href = "success.html";
    }, 1500);
});

loadCheckout();