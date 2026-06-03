const API_URL = "https://v2.api.noroff.dev/rainy-days";
const container = document.getElementById("product-list");

// Fetch all products
async function fetchProducts() {
	container.innerHTML = "<p>Loading...</p>";

	try {
		const response = await fetch(API_URL);
		const data = await response.json();
		const products = data.data;

		// Store globally for favorite lookup
		window.allProducts = products;

		renderProducts(products);
		initFavoriteIcons();
	} catch (error) {
		container.innerHTML = "<p>Could not load products.</p>";
	}
}

// Render product cards
function renderProducts(products) {
	container.innerHTML = "";

	products.forEach(product => {
		const card = document.createElement("div");
		card.classList.add("product-card");

		const image =
			product.image ||
			product.image?.url ||
			"https://via.placeholder.com/400x500?text=No+image";

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

// Favorites logic for product cards
function initFavoriteIcons() {
	const icons = document.querySelectorAll(".favorite-icon");
	let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

	icons.forEach(icon => {
		const productId = icon.dataset.id;

		// Check if product is already in favorites
		if (favorites.some(fav => fav.id === productId)) {
			icon.classList.add("active");
		}

		icon.addEventListener("click", () => {
			favorites = JSON.parse(localStorage.getItem("favorites")) || [];

			const product = window.allProducts.find(p => p.id === productId);
			if (!product) return;

			// Remove if already in favorites
			if (favorites.some(fav => fav.id === productId)) {
				favorites = favorites.filter(fav => fav.id !== productId);
				icon.classList.remove("active");
			} else {
				// Add full product object
				favorites.push({
					id: product.id,
					title: product.title,
					imageUrl: product.image || product.image?.url,
					price: product.price
				});
				icon.classList.add("active");
			}

			localStorage.setItem("favorites", JSON.stringify(favorites));
		});
	});
}

fetchProducts();
