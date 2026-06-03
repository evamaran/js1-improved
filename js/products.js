const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.getElementById("product-list");

async function fetchProducts() {
    // Loading indicator
    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const products = data.data;

        renderProducts(products);
        initFavoriteIcons(); // activate favorite icons
    } catch (error) {
        container.innerHTML = "<p>Could not load products.</p>";
    }
}

function renderProducts(products) {
    // Clear loading text
    container.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const image = product.image?.url || "https://via.placeholder.com/400x500?text=No+image";

        card.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${image}" alt="${product.image?.alt || product.title}">
                <h3>${product.title}</h3>
                <p>${product.price.toFixed(2)} NOK</p>
            </a>
            <i class="fa-regular fa-heart favorite-icon" data-id="${product.id}"></i>
        `;

        container.appendChild(card);
    });
}

// FAVORITES: activate heart icons
function initFavoriteIcons() {
    const icons = document.querySelectorAll(".favorite-icon");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    icons.forEach(icon => {
        const productId = icon.dataset.id;

        // Set active status if product is in favorites
        if (favorites.includes(productId)) {
            icon.classList.add("active");
        }

        // Toggle favorite by clicking the heart icon
        icon.addEventListener("click", () => {
            favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            if (favorites.includes(productId)) {
                favorites = favorites.filter(id => id !== productId);
                icon.classList.remove("active");
            } else {
                favorites.push(productId);
                icon.classList.add("active");
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    });
}

fetchProducts();
