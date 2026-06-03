// Get cart from localStorage
export function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
export function addToCart(product, selectedSize) {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.id === product.id && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price).toFixed(2),
      image: product.image?.url || product.image || product.image_url || product.imageUrl,
      size: selectedSize,
      quantity: 1
    });
  }

  saveCart(cart);

  updateCartCount();

  showCartToast();
}
export function showCartToast() {
  const toast = document.getElementById("cart-toast");
  if (!toast) return;

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);

  const closeBtn = toast.querySelector(".close-toast");
  closeBtn.onclick = () => toast.classList.add("hidden");

  const goToCart = toast.querySelector(".go-to-cart");
  goToCart.onclick = () => {
    window.location.href = "cart.html";
  };
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) return;

  const count = getCartCount();
  countElement.textContent = count;
}
