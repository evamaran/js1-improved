// Load header component
fetch("./components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("header").innerHTML = html;

	const cartCount = document.getElementById("cart-count");
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	cartCount.textContent = cart.length;

    // Add elements
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-mobile-nav');

    // Add listeners
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });

    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
	if (window.FontAwesome) {
		window.FontAwesome.dom.i2svg();
	}
  });