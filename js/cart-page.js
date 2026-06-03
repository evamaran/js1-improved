import { getCart, saveCart, updateCartCount } from "./cart.js";

const cartContainer = document.getElementById("cart");

// Render cart
function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    // Update BOTH containers so UI resets correctly
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-container").innerHTML = "<p>Your cart is empty.</p>";
    updateCartCount();
    return;
  }

  // Render items
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="cart-info">
        <h3>${item.title}</h3>
        <p>Size: ${item.size}</p>
        <p>${Number(item.price).toFixed(2)} NOK</p>
      </div>
      <div class="cart-actions">
        <div class="quantity-wrapper">
          <button class="qty-btn decrease" data-id="${item.id}" data-size="${item.size}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn increase" data-id="${item.id}" data-size="${item.size}">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}" data-size="${item.size}">
          Remove
        </button>
      </div>
    </div>
  `).join("");

  // Calculate total
  const total = calculateTotal(cart);

  // Replace summary (not append)
  document.querySelector(".cart-container").innerHTML = `
    ${cartContainer.innerHTML}
    <div class="cart-summary">
      <p>Total: ${total.toFixed(2)} NOK</p>
      <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
    </div>
  `;

  attachEventListeners();
  updateCartCount();
}

// Attach event listeners
function attachEventListeners() {
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      updateQuantity(btn.dataset.id, btn.dataset.size, +1);
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      updateQuantity(btn.dataset.id, btn.dataset.size, -1);
    });
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeItem(btn.dataset.id, btn.dataset.size);
    });
  });
}

// Update quantity
function updateQuantity(id, size, change) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.size === size);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.indexOf(item);
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

// Remove item
function removeItem(id, size) {
  const cart = getCart().filter(item => !(item.id === id && item.size === size));
  saveCart(cart);
  renderCart();
}

// Calculate total
function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
}

// Init
renderCart();
updateCartCount();