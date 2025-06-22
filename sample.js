document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-price');
    const cartCount = document.querySelector('.cart-count');
    const notification = document.querySelector('.notification');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart UI
    function updateCart() {
        renderCartItems();
        renderCartTotal();
        updateCartCount();
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.classList.add('cart-item');
            cartItemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">$${item.price}</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                        <button class="remove-item"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);

            // Add event listeners to quantity buttons
            const minusBtn = cartItemEl.querySelector('.minus');
            const plusBtn = cartItemEl.querySelector('.plus');
            const removeBtn = cartItemEl.querySelector('.remove-item');
            const quantityEl = cartItemEl.querySelector('.cart-item-quantity');

            minusBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityEl.textContent = item.quantity;
                    updateCart();
                }
            });

            plusBtn.addEventListener('click', () => {
                item.quantity++;
                quantityEl.textContent = item.quantity;
                updateCart();
            });

            removeBtn.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                updateCart();
                showNotification('Item removed from cart');
            });
        });
    }

    // Render cart total
    function renderCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    }

    // Show notification
    function showNotification(message) {
        notification.querySelector('p').textContent = message;
        notification.classList.add('active');
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }

    // Cart event listeners
    cartIcon.addEventListener('click', () => {
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    // Close cart when clicking outside
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });

    // Product data
    const products = [
        {
            id: 1,
            title: "Neon Windbreaker",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            category: "clothing",
            rating: 4,
            badge: "New"
        },
        {
            id: 2,
            title: "Holographic Backpack",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            category: "accessories",
            rating: 5,
            badge: "Bestseller"
        },
        {
            id: 3,
            title: "Smart Glasses",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1551031749-8f62d9ec3c1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            category: "tech",
            rating: 4,
            badge: "Sale"
        },
        {
            id: 4,
            title: "LED Sneakers",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
            category: "clothing",
            rating: 5,
            badge: "Popular"
        },
        {
            id: 5,
            title: "Wireless Earbuds",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
            category: "tech",
            rating: 4,
            badge: "New"
        },
        {
            id: 6,
            title: "Reflective Belt",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1602810318383-1a77006e69d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            category: "accessories",
            rating: 3,
            badge: null
        },
        {
            id: 7,
            title: "Solar Charger",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            category: "tech",
            rating: 4,
            badge: "Eco"
        },
        {
            id: 8,
            title: "Glow-in-the-Dark Hoodie",
            price: 69.99,
            image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
            category: "clothing",
            rating: 5,
            badge: "Limited"
        }
    ];

    // Render products
    const productGrid = document.querySelector('.product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function renderProducts(filter = 'all') {
        productGrid.innerHTML = '';
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);
        
        filteredProducts.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.category = product.category;
            
            // Add animation delay based on index
            productCard.style.animationDelay = `${index * 0.1}s`;
            
            // Add to cart function
            const addToCart = () => {
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1
                    });
                }
                updateCart();
                showNotification('Item added to cart!');
                cartOverlay.classList.add('active');
            };
            
            // Create stars for rating
            const stars = Array(product.rating).fill('<i class="fas fa-star"></i>').join('');
            const emptyStars = Array(5 - product.rating).fill('<i class="far fa-star"></i>').join('');
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-content">
                    <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="product-rating">
                        ${stars}${emptyStars}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="wishlist"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
            
            // Trigger animation
            setTimeout(() => {
                productCard.classList.add('animate');
            }, 50);
            
            // Add event listener to the add to cart button
            productCard.querySelector('.add-to-cart').addEventListener('click', addToCart);
            
            // Add event listener to wishlist button
            productCard.querySelector('.wishlist').addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-heart"></i>';
                this.style.color = 'var(--accent)';
                showNotification('Added to wishlist!');
            });
        });
    }

    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.filter);
        });
    });

    // Initialize
    renderProducts();
    updateCart();

    // Animate stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
                
                // Add animation class to any element with data-animate attribute
                if (entry.target.hasAttribute('data-animate')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('[data-animate], .about-stats').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        // In a real app, you would send this to your server
        console.log('Subscribed with email:', email);
        this.querySelector('input').value = '';
        showNotification('Thanks for subscribing!');
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would send this to your server
        console.log('Form submitted');
        this.reset();
        showNotification('Message sent successfully!');
    });

    // Hero button click
    document.querySelector('.hero-btn').addEventListener('click', function() {
        document.querySelector('#products').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Featured button click
    document.querySelector('.featured-btn').addEventListener('click', function() {
        cartOverlay.classList.add('active');
    });

    // Scroll to top button (could be added to the HTML)
    window.addEventListener('scroll', function() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (window.pageYOffset > 300) {
            scrollTopBtn?.classList.add('show');
        } else {
            scrollTopBtn?.classList.remove('show');
        }
    });
});