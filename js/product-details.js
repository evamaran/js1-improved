import { addToCart, updateCartCount } from "./cart.js";

document.addEventListener("header-loaded", () => {
		updateCartCount();
});

const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.getElementById("product-details");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Fetch one product
async function fetchProduct() {
		container.innerHTML = "<p>Loading...</p>";

		try {
				const response = await fetch(`${API_URL}/${id}`);
				const data = await response.json();
				const product = data.data;

				renderProduct(product);
		} catch (error) {
				container.innerHTML = "<p>Could not load product.</p>";
		}
}

//  Render product
function renderProduct(product) {

		const image = product.image?.url || "https://via.placeholder.com/400x500?text=No+image";
		const alt = product.image?.alt || product.title;

		container.innerHTML = `
		<section class="product-details-card">

			<div class="product-image">
				<img src="${image}" alt="${alt}">
			</div>

			<div class="product-info">
				<h1>${product.title}</h1>
				<p class="price">${product.price.toFixed(2)} NOK</p>

				<i class="fa-regular fa-heart favorite-icon" data-id="${product.id}"></i>

				<p class="description">${product.description}</p>

				<label for="size">Size</label>
				<select id="size" class="size-select">
					${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
				</select>

				<button class="btn-add">Add to cart</button>
			</div>

		</section>
	`;

		// Add to cart
		document.querySelector(".btn-add").addEventListener("click", () => {
				const selectedSize = document.querySelector("#size").value;
				addToCart(product, selectedSize);
				updateCartCount();
				showToast(product);
		});

		// FAVORITES: activate heart icon
		initFavoriteIcon(product.id);
}
function initFavoriteIcon(productId) {
		const icon = document.querySelector(".favorite-icon");
		let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

		if (favorites.includes(productId)) {
				icon.classList.add("active");
		}

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
}

// Init
fetchProduct();
updateCartCount();
