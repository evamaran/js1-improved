async function loadComponent(id, file) {
  const container = document.getElementById(id);
  try {
    const response = await fetch(file);
    const html = await response.text();
    container.innerHTML = html;

    if (id === "header") {
        // Header in DOM for cart count to work
        import("./cart.js").then(module => {
            module.updateCartCount();
        });

        document.dispatchEvent(new Event("header-loaded"));
    }

  } catch (error) {
  }
}

loadComponent("header", "/js1/components/header.html");
loadComponent("footer", "/js1/components/footer.html");