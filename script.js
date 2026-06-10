// Shop With Mojo — Cart & UI Logic

const cart = [];
let cartCount = 0;

const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');

// Toggle cart
cartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
});
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
}

// Add to cart
function addToCart(name) {
  cart.push(name);
  cartCount++;
  cartCountEl.textContent = cartCount;
  renderCart();
  showToast(`${name} added to cart!`);
}

// Render cart items
function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    return;
  }
  cartItemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <span class="cart-item-name">🌿 ${item}</span>
      <span class="cart-item-remove" onclick="removeFromCart(${i})">Remove</span>
    </div>
  `).join('');
}

// Remove from cart
function removeFromCart(index) {
  const removed = cart.splice(index, 1)[0];
  cartCount--;
  cartCountEl.textContent = cartCount;
  renderCart();
  showToast(`${removed} removed`);
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Intersection observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`;
  observer.observe(card);
});
