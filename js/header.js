// Load header component
fetch("./components/header.html")
	.then(res => res.text())
	.then(html => {
		document.getElementById("header").innerHTML = html;

		const cartCount = document.getElementById("cart-count");
		const cart = JSON.parse(localStorage.getItem("cart")) || [];
		cartCount.textContent = cart.length;

		// Mobile navigation elements
		const hamburger = document.querySelector(".hamburger");
		const mobileNav = document.querySelector(".mobile-nav");
		const closeBtn = document.querySelector(".close-mobile-nav");

		// Open mobile nav
		hamburger.addEventListener("click", () => {
			mobileNav.classList.add("open");
			document.body.style.overflow = "hidden";
		});

		// Close mobile nav
		closeBtn.addEventListener("click", () => {
			mobileNav.classList.remove("open");
			document.body.style.overflow = "";
		});

		// Close mobile nav when clicking a link
		mobileNav.addEventListener("click", (e) => {
			if (e.target.tagName === "A") {
				mobileNav.classList.remove("open");
				document.body.style.overflow = "";
			}
		});

		if (window.FontAwesome) {
			window.FontAwesome.dom.i2svg();
		}
	});

// Favorites dropdown (delegated listener)
document.addEventListener("click", (e) => {
	const dropdown = document.getElementById("favoritesDropdown");
	const heartIcon = e.target.closest(".favorites-toggle");

	// Toggle dropdown when clicking the heart icon
	if (heartIcon) {
		e.preventDefault(); // prevent navigation to favorites.html
		dropdown.classList.toggle("open");
		renderFavorites();
		return;
	}

	// Close dropdown when clicking outside
	if (!e.target.closest("#favoritesDropdown")) {
		dropdown.classList.remove("open");
	}
});

// Render favorites list
function renderFavorites() {
	const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
	const list = document.getElementById("favoritesList");

	if (favorites.length === 0) {
		list.innerHTML = "<p>No favorites yet.</p>";
		return;
	}

	list.innerHTML = favorites
		.slice(0, 5)
		.map(
			(item) => `
		<a href="product.html?id=${item.id}" class="favorite-item">
			<img src="${item.imageUrl}" alt="${item.title}">
			<span>${item.title}</span>
		</a>
	`
		)
		.join("");
}
