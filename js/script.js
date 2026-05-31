// Database di e-books di esempio
const ebooks = [
    {
        id: 1,
        title: "Guida Completa a JavaScript",
        author: "Marco Rossi",
        category: "programmazione",
        price: 19.99,
        emoji: "📘",
        description: "Impara JavaScript da zero fino ai concetti avanzati. Un corso completo che ti farà diventare uno sviluppatore esperto.",
        fullDescription: "Questo e-book completo copre tutti gli aspetti di JavaScript moderno. Dai fondamenti delle variabili e funzioni, ai concetti avanzati come async/await, promise, e manipolazione del DOM. Include esercizi pratici e progetti reali.",
        pages: 450,
        language: "Italiano"
    },
    {
        id: 2,
        title: "Business Plan in 30 Giorni",
        author: "Laura Bianchi",
        category: "business",
        price: 24.99,
        emoji: "💼",
        description: "Come creare un business plan vincente passo dopo passo. Inclui template pronti all'uso.",
        fullDescription: "Una guida pratica per creare un business plan professionale. Scopri come strutturare la tua idea, analizzare il mercato, e ottenere finanziamenti. Contiene template scaricabili e case study di successo.",
        pages: 380,
        language: "Italiano"
    },
    {
        id: 3,
        title: "Design Thinking: Innovazione Pratica",
        author: "Andrea Verdi",
        category: "design",
        price: 21.99,
        emoji: "🎨",
        description: "Scopri come il design thinking può trasformare i tuoi progetti e rendere i clienti felici.",
        fullDescription: "Impara i principi del design thinking applicato a problemi reali. Dalla ricerca utente alla prototipazione, fino alla validazione delle soluzioni. Con workshop interattivi e esercizi pratici.",
        pages: 320,
        language: "Italiano"
    },
    {
        id: 4,
        title: "React e Modern Web Development",
        author: "Alessandro Neri",
        category: "programmazione",
        price: 27.99,
        emoji: "⚛️",
        description: "Diventa uno sviluppatore React esperto. Dalla teoria alla costruzione di app complesse.",
        fullDescription: "Un corso completo su React con hooks, context API, e state management. Impara a costruire applicazioni moderne e scalabili. Progetto finale: un'app e-commerce completamente funzionante.",
        pages: 520,
        language: "Italiano"
    },
    {
        id: 5,
        title: "Marketing Digitale 2026",
        author: "Chiara Milano",
        category: "business",
        price: 23.99,
        emoji: "📱",
        description: "Le strategie di marketing digitale più efficaci nel 2026. SEO, social media, email marketing.",
        fullDescription: "Scopri le ultime tendenze nel marketing digitale. Dalla SEO avanzata al social media marketing, dall'email marketing all'influencer marketing. Con case study e strategie testare.",
        pages: 400,
        language: "Italiano"
    },
    {
        id: 6,
        title: "Nutrizione e Benessere Completo",
        author: "Dr. Marco Salute",
        category: "salute",
        price: 18.99,
        emoji: "🥗",
        description: "Scopri come nutrirti bene e mantenerti in forma. Piano alimentare personalizzato incluso.",
        fullDescription: "Una guida completa alla nutrizione consapevole. Impara i principi della corretta alimentazione, come leggere le etichette, e ricevi piani alimentari personalizzati. Interviste con nutrizionisti esperti.",
        pages: 360,
        language: "Italiano"
    },
    {
        id: 7,
        title: "Python per Data Science",
        author: "Roberto Dati",
        category: "programmazione",
        price: 29.99,
        emoji: "🐍",
        description: "Analizza i dati come un professionista. NumPy, Pandas, Matplotlib e Machine Learning.",
        fullDescription: "Diventa un data scientist con Python. Copre librerie essenziali come NumPy, Pandas e scikit-learn. Impara tecniche di machine learning applicate a dataset reali. Progetti finali inclusi.",
        pages: 580,
        language: "Italiano"
    },
    {
        id: 8,
        title: "Startup da Zero a Successo",
        author: "Luca Imprenditore",
        category: "business",
        price: 25.99,
        emoji: "🚀",
        description: "La guida definitiva per lanciare una startup di successo. Dalla idea al finanziamento.",
        fullDescription: "Impara dai migliori imprenditori. Questa guida copre come validare la tua idea, trovare co-founder, pitchare agli investitori e scale la tua azienda. Con checklist e risorse utili.",
        pages: 420,
        language: "Italiano"
    }
];

// Stato dell'app
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// Inizializza l'app
document.addEventListener('DOMContentLoaded', () => {
    renderEbooks();
    updateCartCount();
    setupEventListeners();
});

// Render dei libri
function renderEbooks(filterCategory = 'all') {
    const grid = document.getElementById('ebooks-grid');
    grid.innerHTML = '';

    const filteredBooks = filterCategory === 'all' 
        ? ebooks 
        : ebooks.filter(book => book.category === filterCategory);

    filteredBooks.forEach(book => {
        const card = createEbookCard(book);
        grid.appendChild(card);
    });
}

// Crea una card e-book
function createEbookCard(book) {
    const card = document.createElement('div');
    card.className = 'ebook-card';
    card.dataset.category = book.category;

    card.innerHTML = `
        <div class="ebook-cover">${book.emoji}</div>
        <div class="ebook-info">
            <span class="ebook-category">${capitalizeCategory(book.category)}</span>
            <h3 class="ebook-title">${book.title}</h3>
            <p class="ebook-author">di ${book.author}</p>
            <p class="ebook-description">${book.description}</p>
            <div class="ebook-price">€${book.price.toFixed(2)}</div>
            <div class="ebook-actions">
                <button class="btn btn-primary add-to-cart" data-id="${book.id}">Aggiungi al Carrello</button>
                <button class="btn btn-secondary view-details" data-id="${book.id}">Dettagli</button>
            </div>
        </div>
    `;

    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderEbooks(currentFilter);
        });
    });

    // Add to cart buttons (delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const bookId = parseInt(e.target.dataset.id);
            addToCart(bookId);
        }

        if (e.target.classList.contains('view-details')) {
            const bookId = parseInt(e.target.dataset.id);
            showProductDetails(bookId);
        }

        if (e.target.classList.contains('remove-btn')) {
            const bookId = parseInt(e.target.dataset.id);
            removeFromCart(bookId);
        }
    });

    // Cart button
    document.querySelector('.cart-btn').addEventListener('click', openCart);

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
        });
    });

    // Close modal quando clicchi fuori
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Integrazione pagamenti: Stripe/PayPal\n\nQuesto è un demo. Per attivare i pagamenti, configura Stripe o PayPal nel tuo account.');
    });
}

// Aggiungi al carrello
function addToCart(bookId) {
    const book = ebooks.find(b => b.id === bookId);
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`"${book.title}" aggiunto al carrello!`);
}

// Rimuovi dal carrello
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    updateCartCount();
    renderCart();
}

// Salva carrello nel localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Aggiorna numero articoli nel carrello
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Apri carrello
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('show');
    renderCart();
}

// Renderizza il carrello
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Il tuo carrello è vuoto</div>';
        totalPriceSpan.textContent = '0.00';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>Quantità: ${item.quantity} × €${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <span class="cart-item-price">€${itemTotal.toFixed(2)}</span>
                    <button class="remove-btn" data-id="${item.id}">Rimuovi</button>
                </div>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = html;
    totalPriceSpan.textContent = total.toFixed(2);
}

// Mostra dettagli prodotto
function showProductDetails(bookId) {
    const book = ebooks.find(b => b.id === bookId);
    const modal = document.getElementById('productModal');
    const detailsDiv = document.getElementById('product-details');

    detailsDiv.innerHTML = `
        <div class="product-detail">
            <div class="product-cover-large">${book.emoji}</div>
            <div class="product-info-detail">
                <h2>${book.title}</h2>
                <div class="product-meta">
                    <p><strong>Autore:</strong> ${book.author}</p>
                    <p><strong>Categoria:</strong> ${capitalizeCategory(book.category)}</p>
                    <p><strong>Pagine:</strong> ${book.pages}</p>
                    <p><strong>Lingua:</strong> ${book.language}</p>
                </div>
                <p class="product-full-description">${book.fullDescription}</p>
                <div class="product-price-large">€${book.price.toFixed(2)}</div>
                <div class="product-detail-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${book.id}">Aggiungi al Carrello</button>
                    <button class="btn btn-secondary" onclick="document.getElementById('productModal').classList.remove('show')">Chiudi</button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('show');
}

// Notifica
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Utility: capitalizza categoria
function capitalizeCategory(category) {
    const map = {
        'programmazione': 'Programmazione',
        'business': 'Business',
        'design': 'Design',
        'salute': 'Salute'
    };
    return map[category] || category;
}

// CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
