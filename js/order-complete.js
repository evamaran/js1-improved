document.addEventListener("DOMContentLoaded", () => {

  const orderNumberEl = document.getElementById("order-number");
  const orderTotalEl = document.getElementById("order-total");
  const orderSummaryItems = document.getElementById("order-summary-items");

  const orderData = JSON.parse(localStorage.getItem("lastOrder")) || null;

  if (!orderData) {
    orderSummaryItems.innerHTML = "<p>No order found.</p>";
    return;
  }

  orderNumberEl.textContent = orderData.orderNumber;
  orderTotalEl.textContent = `${orderData.total} NOK`;

  orderData.items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("order-summary-line");

    div.innerHTML = `
      <span>${item.title} (x${item.quantity})</span>
      <span>${item.price * item.quantity} NOK</span>
    `;

    orderSummaryItems.appendChild(div);
  });
});