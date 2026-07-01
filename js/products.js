const products = [
        {
        id: 1,
        name: "Modern Sofa",
        price: 899,
        category: "sofa",
        image: "https://picsum.photos/400/300?random=1"
    },
    {
        id: 2,
        name: "Wooden Dining Table",
        price: 1200,
        category: "table",
        image: "https://picsum.photos/400/300?random=2"
    },
    {
        id: 3,
        name: "Luxury Bed",
        price: 1500,
        category: "bed",
        image: "https://picsum.photos/400/300?random=3"
    },
    {
        id: 4,
        name: "Office Chair",
        price: 250,
        category: "chair",
        image: "https://picsum.photos/400/300?random=4"
    },
    {
        id: 5,
        name: "TV Stand",
        price: 499,
        category: "table",
        image: "https://picsum.photos/400/300?random=5"
    },
    {
        id: 6,
        name: "Coffee Table",
        price: 299,
        category: "table",
        image: "https://picsum.photos/400/300?random=6"
    }
];

function renderProducts() {

    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    // 1. default products (hardcoded)
    const defaultProducts = [
        {
            id: 1,
            name: "Modern Sofa",
            price: 899,
            category: "sofa",
            image: "https://picsum.photos/400/300?random=1"
        },
        {
            id: 2,
            name: "Wooden Dining Table",
            price: 1200,
            category: "table",
            image: "https://picsum.photos/400/300?random=2"
        },
        {
            id: 3,
            name: "Luxury Bed",
            price: 1500,
            category: "bed",
            image: "https://picsum.photos/400/300?random=3"
        },
        {
            id: 4,
            name: "Office Chair",
            price: 250,
            category: "chair",
            image: "https://picsum.photos/400/300?random=4"
        },
        {
            id: 5,
            name: "TV Stand",
            price: 499,
            category: "table",
            image: "https://picsum.photos/400/300?random=5"
        },
        {
            id: 6,
            name: "Coffee Table",
            price: 299,
            category: "table",
            image: "https://picsum.photos/400/300?random=6"
        }
    ];

    // 2. products added from admin
    let adminProducts = JSON.parse(localStorage.getItem("products")) || [];

    // 3. merge both
    let allProducts = [...defaultProducts, ...adminProducts];

    // 4. render
    allProducts.forEach(product => {

        container.innerHTML += `
        <div class="product-card" onclick="openProduct(${product.id})">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

            <button onclick="event.stopPropagation(); addToCart(${product.id})">
                Add To Cart
            </button>

        </div>
        `;
    });
}

function loadFeaturedProducts() {

    const container = document.getElementById("featuredProducts");

    container.innerHTML = "";

    products.slice(0, 3).forEach(product => {

        container.innerHTML += `
        <div class="product-card" onclick="openProduct(${product.id})">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

        </div>
        `;

    });
}

function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}

function searchProducts(query) {
    const container = document.getElementById("productsContainer");

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    container.innerHTML = "";

    filtered.forEach(product => {
        container.innerHTML += `
        <div class="product-card" onclick="openProduct(${product.id})">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

            <button onclick="event.stopPropagation(); addToCart(${product.id})">
                Add To Cart
            </button>

        </div>
        `;
    });
}

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        searchProducts(this.value);
    });
}

function loadProductPage() {

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const product = products.find(p => p.id === id);

    const container = document.getElementById("productDetails");

    if (!product) {
        container.innerHTML = "<h2>Product not found</h2>";
        return;
    }

    // MAIN PRODUCT
    container.innerHTML = `
    <div class="product-layout">

        <div class="product-image">
            <img src="${product.image}">
        </div>

        <div class="product-info">

            <h2>${product.name}</h2>
            <h3>$${product.price}</h3>
        <p>
          
        </p>
            <p>
                This is a high quality furniture piece designed for modern homes.
                Durable, stylish, and comfortable.
            </p>

            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>

        </div>

    </div>

    <div class="related-section">
        <h2>Related Products</h2>
        <div id="relatedProducts" class="related-grid"></div>
    </div>
    `;

    loadRelatedProducts(product);
}





function loadRelatedProducts(currentProduct) {

    const container = document.getElementById("relatedProducts");

    const related = products.filter(p =>
        p.category === currentProduct.category && p.id !== currentProduct.id
    );

    // fallback if not enough related items
    const finalList = related.length > 0
        ? related
        : products.filter(p => p.id !== currentProduct.id);

    container.innerHTML = "";

    finalList.slice(0, 4).forEach(product => {
        container.innerHTML += `
        <div class="product-card" onclick="openProduct(${product.id})">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

        </div>
        `;
    });
}

function filterProducts(category) {

    const container = document.getElementById("productsContainer");

    let filtered = products;

    if (category !== "all") {
        filtered = products.filter(p => p.category === category);
    }

    container.innerHTML = "";

    filtered.forEach(product => {
        container.innerHTML += `
        <div class="product-card" onclick="openProduct(${product.id})">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>$${product.price}</p>

            <button onclick="event.stopPropagation(); addToCart(${product.id})">
                Add To Cart
            </button>

        </div>
        `;
    });
}