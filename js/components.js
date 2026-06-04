async function loadComponent(id, file) {
	const container = document.getElementById(id);
	try {
		const response = await fetch(file);
		const html = await response.text();
		container.innerHTML = html;

		if (id === "header") {
			import("./cart.js").then(module => {
				module.updateCartCount();
			});

			document.dispatchEvent(new Event("header-loaded"));
		}

	} catch (error) {
	}
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");
