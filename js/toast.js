function showToast(product) {
  const container = document.getElementById("toast-container");

  // Find correct image for toast (try multiple properties for compatibility)
  const image =
    product.image?.url ||
    product.images?.[0]?.src ||
    "https://via.placeholder.com/100x100?text=No+image";

  const toast = document.createElement("div");
  toast.classList.add("toast");

  toast.innerHTML = `
    <img src="${image}" alt="${product.title}">
    <div class="toast-content">
      <div class="toast-title">${product.title} was added to your cart</div>
      <div class="toast-actions">
        <button onclick="window.location.href='cart.html'">Go to cart</button>
      </div>
    </div>
    <button class="close-btn">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  toast.querySelector(".close-btn").addEventListener("click", () => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
