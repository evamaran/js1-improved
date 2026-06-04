document.addEventListener("DOMContentLoaded", () => {

	const orderHistoryContainer = document.getElementById("order-history");
	const favoritesContainer = document.getElementById("favorite-items");

	const API_URL = "https://v2.api.noroff.dev/rainy-days";

	const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
	const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

	// ORDER HISTORY
	if (lastOrder) {
		const div = document.createElement("div");
		div.innerHTML = `
	<p><strong>Order #${lastOrder.orderNumber}</strong></p>
	<p>Total: ${lastOrder.total} NOK</p>
	<p>Items: ${lastOrder.items.length}</p>
	`;
		orderHistoryContainer.appendChild(div);
	} else {
		orderHistoryContainer.innerHTML = "<p>No previous orders.</p>";
	}

	// FAVORITES
	async function loadFavorites() {
		if (favorites.length === 0) {
			favoritesContainer.innerHTML = "<p>No saved favorites.</p>";
			return;
		}

		try {
			const response = await fetch(API_URL);
			const data = await response.json();
			const products = data.data;

			const favoriteIds = favorites.map(f => f.id);

			const favoriteProducts = products.filter(product =>
				favoriteIds.includes(product.id)
			);

			renderFavoriteProducts(favoriteProducts);

		} catch (error) {
			favoritesContainer.innerHTML = "<p>Could not load favorite products.</p>";
		}
	}

	function renderFavoriteProducts(products) {
		favoritesContainer.innerHTML = "";

		products.forEach(product => {
			const image =
				product.image?.url ||
				product.image ||
				"https://via.placeholder.com/400x500?text=No+image";

			favoritesContainer.innerHTML += `
		<a href="product.html?id=${product.id}" class="favorite-card">
		<img src="${image}" alt="${product.image?.alt || product.title}">
		<h3>${product.title}</h3>
		<p>${product.price} NOK</p>
		</a>
	`;
		});
	}

	loadFavorites();

	// LOGOUT
	document.getElementById("logout-btn").addEventListener("click", () => {
		localStorage.clear();
		window.location.reload();
	});
});
