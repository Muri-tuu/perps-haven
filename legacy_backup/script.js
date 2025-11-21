// Product Data
const products = [
    {
        id: 1,
        name: "Butterfly Hair Claw",
        price: 250,
        category: "hair",
        variants: [
            { name: "Dark Brown", image: "assets/hair-claw-1.jpg" },
            { name: "Cream", image: "assets/hair-claw-2.jpg" },
            { name: "Rust", image: "assets/hair-claw-3.jpg" },
            { name: "Tan", image: "assets/hair-claw-4.jpg" },
            { name: "Black", image: "assets/hair-claw-5.jpg" }
        ]
    },
    {
        id: 2,
        name: "Flower Hair Claw",
        price: 200,
        category: "hair",
        variants: [
            { name: "Blue", image: "assets/flower-claw-1.jpg" },
            { name: "Gold/Black", image: "assets/flower-claw-2.jpg" },
            { name: "Yellow", image: "assets/flower-claw-3.jpg" },
            { name: "Assorted", image: "assets/flower-claw-4.jpg" },
            { name: "Bright Yellow", image: "assets/flower-claw-5.jpg" }
        ]
    }
];

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const closeCartBtn = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Checkout Elements
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');

// Initialize
function init() {
    renderProducts(products);
    updateCartUI();
    setupEventListeners();
    renderReviews();
    initAnimations();
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    const tl = gsap.timeline();
    tl.from('.hero-content h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1
    })
        .from('.hero-content p', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.cta-btn', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.5');

    // Product Grid Stagger
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: '#product-grid',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Section Headers
    gsap.utils.toArray('h2').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Review Cards
    gsap.from('.review-card', {
        scrollTrigger: {
            trigger: '#reviews-container',
            start: 'top 80%',
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
}

// Render Products
function renderProducts(items) {
    productGrid.innerHTML = items.map(product => {
        // Default to first variant
        const currentVariant = product.variants[0];
        return `
        <div class="product-card" id="product-${product.id}" data-category="${product.category}" data-variant-index="0">
            <div class="product-img-container">
                <button class="nav-btn prev" onclick="changeVariant(${product.id}, -1)">&#10094;</button>
                <div class="product-img" style="background-image: url('${currentVariant.image}');"></div>
                <button class="nav-btn next" onclick="changeVariant(${product.id}, 1)">&#10095;</button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="variant-name">${currentVariant.name}</p>
                <p class="product-price">KES ${product.price}</p>
                <button class="add-btn" onclick="addToCart(${product.id})">Add to Stash</button>
            </div>
        </div>
    `}).join('');
}

// Variant Navigation
window.changeVariant = (productId, direction) => {
    const product = products.find(p => p.id === productId);
    const card = document.getElementById(`product-${productId}`);
    let currentIndex = parseInt(card.dataset.variantIndex);

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = product.variants.length - 1;
    if (currentIndex >= product.variants.length) currentIndex = 0;

    // Update State
    card.dataset.variantIndex = currentIndex;
    const variant = product.variants[currentIndex];

    // Update UI
    card.querySelector('.product-img').style.backgroundImage = `url('${variant.image}')`;
    card.querySelector('.variant-name').textContent = variant.name;
};

// Cart Logic
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    const card = document.getElementById(`product-${id}`);
    const variantIndex = parseInt(card.dataset.variantIndex);
    const variant = product.variants[variantIndex];

    // Unique ID for cart item based on product + variant
    const cartItemId = `${product.id}-${variant.name}`;
    const existingItem = cart.find(item => item.cartId === cartItemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            cartId: cartItemId,
            id: product.id,
            name: product.name,
            variant: variant.name,
            price: product.price,
            image: variant.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    openCart();
};

window.updateQuantity = (cartItemId, change) => {
    const item = cart.find(i => i.cartId === cartItemId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.cartId !== cartItemId);
    }

    saveCart();
    updateCartUI();
};

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update Items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div style="width: 60px; height: 60px; background-image: url('${item.image}'); background-size: cover; border-radius: 5px;"></div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-variant">${item.variant}</p>
                <p>KES ${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.cartId}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.cartId}', 1)">+</button>
                </div>
            </div>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `KES ${total}`;
}

// UI Interactions
function openCart() {
    cartDrawer.classList.add('open');
    overlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('open');
    overlay.classList.remove('active');
}

function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);

    // Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            if (filter === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === filter);
                renderProducts(filtered);
            }
        });
    });

    // Open Checkout Modal
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return alert('Your stash is empty!');
        closeCart();
        checkoutModal.classList.add('active');
        loadUserData();
    });

    // Close Checkout Modal
    closeCheckoutBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    // Handle Form Submit
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            fullName: document.getElementById('full-name').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            apartment: document.getElementById('apartment').value,
            pickup: document.getElementById('pickup-location').value,
            payment: document.querySelector('input[name="payment"]:checked').value
        };

        saveUserData(formData);
        sendWhatsAppOrder(formData);
    });

    // Parallax Effect
    document.addEventListener('mousemove', (e) => {
        const depthElements = document.querySelectorAll('.depth-text');
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        depthElements.forEach(el => {
            const speed = el.getAttribute('data-depth') || 0.05;
            el.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });
}

function saveUserData(data) {
    localStorage.setItem('user_data', JSON.stringify(data));
}

function loadUserData() {
    const data = JSON.parse(localStorage.getItem('user_data'));
    if (data) {
        document.getElementById('full-name').value = data.fullName || '';
        document.getElementById('username').value = data.username || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('apartment').value = data.apartment || '';
        document.getElementById('pickup-location').value = data.pickup || '';
    }
}

function sendWhatsAppOrder(user) {
    let message = `*New Order from Perps Haven* 💎\n`;
    message += `*Location: Murang'a University of Technology*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${user.fullName} (@${user.username})\n`;
    message += `Phone: ${user.phone}\n`;
    message += `Email: ${user.email}\n`;
    message += `Apartment: ${user.apartment}\n`;
    message += `Pickup Point: ${user.pickup}\n\n`;

    message += `*Order Items:*\n`;
    cart.forEach(item => {
        message += `- ${item.name} (${item.variant}) x${item.quantity} (KES ${item.price * item.quantity})\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\n*Total: KES ${total}*\n`;
    message += `Payment Method: ${user.payment}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/254700000000?text=${encodedMessage}`, '_blank');

    checkoutModal.classList.remove('active');
    cart = [];
    saveCart();
    updateCartUI();
}

// Reviews Logic
const reviews = [
    { name: "Stacy K.", text: "The drip is real! Got my necklace in 2 days.", role: "MUT Student" },
    { name: "Brian M.", text: "Best prices for campus students. Highly recommend.", role: "MUT Student" },
    { name: "Cynthia W.", text: "Love the packaging and the vibe. Will buy again.", role: "MUT Student" },
    { name: "Kevin O.", text: "Quality is top notch. The gold chain doesn't fade.", role: "MUT Student" }
];

function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (container) {
        container.innerHTML = reviews.map(review => `
            <div class="review-card">
                <p>"${review.text}"</p>
                <div class="reviewer">
                    <strong>${review.name}</strong>
                    <span>${review.role}</span>
                </div>
            </div>
        `).join('');
    }
}

// Run
init();
