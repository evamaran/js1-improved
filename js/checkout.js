document.addEventListener("DOMContentLoaded", () => {
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderItemsContainer = document.getElementById("order-items");
  const subtotalEl = document.getElementById("subtotal");
  const shippingCostEl = document.getElementById("shipping-cost");
  const totalEl = document.getElementById("total");
  const form = document.getElementById("checkout-form");

  function renderOrderItems() {
    orderItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("order-item");

      div.innerHTML = `
        <div class="summary-line">
          <span>${item.title} (x${item.quantity || 1})</span>
          <span>${item.price * (item.quantity || 1)} NOK</span>
        </div>
      `;

      orderItemsContainer.appendChild(div);
    });
  }

  function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);

    subtotalEl.textContent = `${subtotal} NOK`;

    const shippingMethod = document.querySelector("input[name='shipping']:checked").value;

    let shippingCost = 0;
    if (shippingMethod === "express") {
      shippingCost = 49;
      shippingCostEl.textContent = "49 NOK";
    } else {
      shippingCostEl.textContent = "Free";
    }

    const total = subtotal + shippingCost;
    totalEl.textContent = `${total} NOK`;
  }

  renderOrderItems();
  calculateTotals();

  document.querySelectorAll("input[name='shipping']").forEach(radio => {
    radio.addEventListener("change", calculateTotals);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    localStorage.removeItem("cart");

	const orderData = {
		orderNumber: Math.floor(Math.random() * 900000) + 100000,
		total: totalEl.textContent.replace(" NOK", ""),
		items: cart
	};

	localStorage.setItem("lastOrder", JSON.stringify(orderData));

    window.location.href = "order-complete.html";
  });
});