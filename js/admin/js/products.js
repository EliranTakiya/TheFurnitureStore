if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

const table = document.getElementById("productsTable");

let products = JSON.parse(localStorage.getItem("products")) || [];

function loadProducts() {

    table.innerHTML = "";

    if (products.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">No products found.</td>
            </tr>
        `;

        return;
    }

    products.forEach((product, index) => {

        table.innerHTML += `

        <tr>

            <td>
                <img src="${product.image}" class="product-image">
            </td>

            <td>${product.name}</td>

            <td>$${product.price}</td>

            <td>${product.category}</td>

            <td>
                <button class="edit-btn" onclick="editProduct(${index})">
                    Edit
                </button>
            </td>

            <td>
                <button class="delete-btn" onclick="deleteProduct(${index})">
                    Delete
                </button>
            </td>

        </tr>

        `;

    });

}

function editProduct(index) {

    localStorage.setItem("editIndex", index);

    window.location.href = "edit-product.html";

}

function deleteProduct(index) {

    if (!confirm("Delete this product?"))
        return;

    products.splice(index, 1);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    loadProducts();

}

loadProducts();