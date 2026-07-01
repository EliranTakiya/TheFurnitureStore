if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

const form = document.getElementById("productForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const file = document.getElementById("image").files[0];

    if (!file) {
        alert("Please choose an image.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {

        let products = JSON.parse(localStorage.getItem("products")) || [];

        const product = {
            id: Date.now(),   // 🔥 ADD THIS
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            category: document.getElementById("category").value,
            image: reader.result
        };

        products.push(product);

        localStorage.setItem("products", JSON.stringify(products));

        window.location.href = "products.html";
    };

    reader.readAsDataURL(file);
});