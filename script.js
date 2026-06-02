// StepWithUs v2.0 - catalogo e interazioni
const ebooks = [
  {id:1, title:"Costruire Abitudini Vincenti", author:"StepWithUs", category:"crescita", price:12.99, coverClass:"cover-crescita", coverTitle:"Costruire\nAbitudini\nVincenti", tagline:"Piccoli passi, grandi risultati", description:"Sistemi pratici per creare abitudini positive ed eliminare quelle negative.", fullDescription:"Una guida ispirata ai migliori principi della crescita personale e della psicologia comportamentale.", pages:180, language:"Italiano"},
  {id:2, title:"Produttività senza Stress", author:"StepWithUs", category:"business", price:14.99, coverClass:"cover-produttivita", coverTitle:"Produttività\nSenza\nStress", tagline:"Fai di più con meno fatica", description:"Focus, priorità, gestione del tempo e organizzazione.", fullDescription:"Un sistema semplice per aumentare i risultati senza vivere sempre in urgenza.", pages:220, language:"Italiano"},
  {id:3, title:"AI per il Lavoro", author:"StepWithUs", category:"business", price:14.99, coverClass:"cover-lavoro", coverTitle:"AI per\nil Lavoro", tagline:"Prompt e strumenti utili", description:"Usa l’intelligenza artificiale per lavorare meglio e creare contenuti.", fullDescription:"Guida pratica per usare ChatGPT e strumenti AI nel lavoro quotidiano.", pages:200, language:"Italiano"},
  {id:4, title:"Nutrizione Intelligente", author:"StepWithUs", category:"benessere", price:27.99, coverClass:"cover-benessere", coverTitle:"Nutrizione\nIntelligente", tagline:"Salute, sport, equilibrio", description:"Dimagrimento, salute e sport spiegati in modo semplice.", fullDescription:"Guida educativa alla nutrizione con principi pratici ed esempi.", pages:250, language:"Italiano"},
  {id:5, title:"Geopolitica per Tutti", author:"StepWithUs", category:"societa", price:27.99, coverClass:"cover-economia", coverTitle:"Geopolitica\nper Tutti", tagline:"Capire economia e potere", description:"Economia globale, conflitti, energia, mercati e potere.", fullDescription:"Introduzione accessibile ai rapporti tra geopolitica ed economia globale.", pages:260, language:"Italiano"},
  {id:6, title:"Liberarsi dalla Ludopatia", author:"StepWithUs", category:"benessere", price:24.99, coverClass:"cover-ludopatia", coverTitle:"Liberarsi\ndalla\nLudopatia", tagline:"Riprendi il controllo", description:"Uscire dal gioco e ricostruire equilibrio personale ed economico.", fullDescription:"Comprendere la dipendenza dal gioco, proteggere il denaro e ricostruire abitudini.", pages:230, language:"Italiano"},
  {id:7, title:"Psicologia della Persuasione", author:"StepWithUs", category:"crescita", price:24.99, coverClass:"cover-persuasione", coverTitle:"Psicologia\ndella\nPersuasione", tagline:"Comunicare, influenzare, capire", description:"Comunicazione, influenza, negoziazione e vendita etica.", fullDescription:"Una guida pratica alla persuasione, al linguaggio del corpo e alla comunicazione efficace.", pages:210, language:"Italiano"},
  {id:8, title:"Educazione Finanziaria Moderna", author:"StepWithUs", category:"finanza", price:27.99, coverClass:"cover-finanza", coverTitle:"Educazione\nFinanziaria\nModerna", tagline:"Denaro, risparmio, futuro", description:"Gestione del denaro, risparmio, investimenti ed errori da evitare.", fullDescription:"Una guida moderna per comprendere denaro, pianificazione e scelte finanziarie.", pages:240, language:"Italiano"},
  {id:9, title:"Mentalità ad Alte Prestazioni", author:"StepWithUs", category:"crescita", price:27.99, coverClass:"cover-mentalita", coverTitle:"Mentalità ad\nAlte\nPrestazioni", tagline:"Disciplina, focus, resilienza", description:"Disciplina, resilienza, concentrazione e obiettivi.", fullDescription:"Un percorso pratico per sviluppare focus, energia mentale e costanza.", pages:230, language:"Italiano"},
  {id:10, title:"Trading Online: Guida Strategica ai Mercati", author:"StepWithUs", category:"finanza", price:29.99, coverClass:"cover-trading", coverTitle:"Trading\nOnline", tagline:"Strategia e rischio", description:"Fondamenta, gestione del rischio, psicologia e strategie operative.", fullDescription:"Guida al trading con basi, risk management, pattern, time frame e diario operativo.", pages:280, language:"Italiano"},
  {id:11, title:"I 20 Segreti Nascosti tra Animale e Padrone", author:"StepWithUs", category:"relazioni", price:24.99, coverClass:"cover-animali", coverTitle:"20 Segreti\nAnimale e\nPadrone", tagline:"Fiducia, segnali, legame", description:"Comunicazione non verbale, fiducia e segnali spesso ignorati.", fullDescription:"Un ebook emotivo e pratico sul legame tra animale e padrone.", pages:190, language:"Italiano"},
  {id:12, title:"Mafia Globale", author:"StepWithUs", category:"societa", price:29.99, coverClass:"cover-mafia", coverTitle:"Mafia\nGlobale", tagline:"Reti, potere, economia", description:"Legami tra mafia italiana, reti globali, traffici ed economia.", fullDescription:"Un taglio informativo e investigativo sui legami tra organizzazioni criminali, economia e società.", pages:280, language:"Italiano"}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => { renderEbooks(); updateCartCount(); setupEventListeners(); createParticles(); });

function coverMarkup(book){
  const title = (book.coverTitle || book.title || '').replaceAll('\n','<br>');
  const tag = book.tagline || '';
  return `<div class="cover-book ${book.coverClass || ''}"><b>${title}</b><small>${tag}</small></div>`;
}


function renderEbooks(filterCategory = 'all'){
  const grid = document.getElementById('ebooks-grid'); if(!grid) return; grid.innerHTML='';
  const categoryAliases = { produttivita: 'business', lavoro: 'business', economia: 'finanza' };
  const normalizedFilter = categoryAliases[filterCategory] || filterCategory;
  const filtered = normalizedFilter === 'all' ? ebooks : ebooks.filter(b => b.category === normalizedFilter);
  filtered.forEach(book => grid.appendChild(createEbookCard(book)));
}
function createEbookCard(book){
  const card=document.createElement('article'); card.className='ebook-card'; card.dataset.category=book.category;
  card.innerHTML=`<div class="ebook-cover">${coverMarkup(book)}</div><div class="ebook-info"><span class="ebook-category">${capitalizeCategory(book.category)}</span><h3 class="ebook-title">${book.title}</h3><p class="ebook-author">di ${book.author}</p><p class="ebook-description">${book.description}</p><div class="ebook-price">€${book.price.toFixed(2).replace('.',',')}</div><div class="ebook-actions"><button class="btn btn-primary add-to-cart" data-id="${book.id}">Acquista ora</button><button class="btn btn-secondary view-details" data-id="${book.id}">Dettagli</button></div></div>`;
  return card;
}
function setupEventListeners(){
  document.querySelector('.mobile-toggle')?.addEventListener('click',()=>document.querySelector('.nav-links')?.classList.toggle('open'));
  document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');currentFilter=btn.dataset.filter;renderEbooks(currentFilter);}));
  document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('add-to-cart')) addToCart(parseInt(e.target.dataset.id));
    if(e.target.classList.contains('view-details')) showProductDetails(parseInt(e.target.dataset.id));
    if(e.target.classList.contains('remove-btn')) removeFromCart(e.target.dataset.id);
  });
  document.querySelector('.cart-btn')?.addEventListener('click',(e)=>{e.preventDefault();openCart();});
  document.querySelectorAll('.close').forEach(btn=>btn.addEventListener('click',(e)=>e.target.closest('.modal').classList.remove('show')));
  document.querySelectorAll('.modal').forEach(modal=>modal.addEventListener('click',(e)=>{if(e.target===modal) modal.classList.remove('show')}));
  document.getElementById('checkout-btn')?.addEventListener('click',()=>{ if(cart.length===0){alert('Il carrello è vuoto.'); return;} alert('Carrello pronto. Collega i link reali Stripe/PayPal in js/payment-links.js per completare il checkout.'); });
}
function addToCart(bookId){ const book=ebooks.find(b=>b.id===bookId); const item=cart.find(i=>i.id===bookId); if(item) item.quantity+=1; else cart.push({...book,quantity:1}); saveCart(); updateCartCount(); showToast(`${book.title} aggiunto al carrello`); }
function removeFromCart(itemId){ cart=cart.filter(i=>String(i.id)!==String(itemId)); saveCart(); updateCartCount(); renderCart(); }
function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }
function updateCartCount(){ const count=cart.reduce((s,i)=>s+i.quantity,0); const el=document.getElementById('cart-count'); if(el) el.textContent=count; }
function openCart(){ renderCart(); document.getElementById('cartModal')?.classList.add('show'); }
function renderCart(){ const wrap=document.getElementById('cart-items'); const total=document.getElementById('total-price'); if(!wrap||!total) return; if(cart.length===0){wrap.innerHTML='<p>Il carrello è vuoto.</p>'; total.textContent='0,00'; return;} wrap.innerHTML=cart.map(i=>`<div class="cart-item"><div><strong>${i.title}</strong><br><span>Quantità: ${i.quantity}</span></div><div><strong>€${(i.price*i.quantity).toFixed(2).replace('.',',')}</strong><br><button class="remove-btn" data-id="${i.id}">Rimuovi</button></div></div>`).join(''); total.textContent=cart.reduce((s,i)=>s+i.price*i.quantity,0).toFixed(2).replace('.',','); }
function showProductDetails(bookId){ const book=ebooks.find(b=>b.id===bookId); const box=document.getElementById('product-details'); if(!book||!box) return; box.innerHTML=`<div class="product-detail-layout"><div class="product-detail-cover">${coverMarkup(book)}</div><div><span class="ebook-category">${capitalizeCategory(book.category)}</span><h2>${book.title}</h2><p class="ebook-author">di ${book.author}</p><p>${book.fullDescription}</p><div class="product-meta"><span>📄 ${book.pages} pagine</span><span>🌍 ${book.language}</span><span>⚡ Download digitale</span></div><div class="ebook-price">€${book.price.toFixed(2).replace('.',',')}</div><div class="detail-actions"><button class="btn btn-secondary add-to-cart" data-id="${book.id}">Aggiungi al carrello</button><button class="btn btn-primary buy-now" data-id="${book.id}">Acquista ora</button></div></div></div>`; document.getElementById('productModal').classList.add('show'); }
function capitalizeCategory(cat){
  const map={crescita:'Crescita',business:'Business & Lavoro',finanza:'Finanza',benessere:'Benessere',societa:'Società',relazioni:'Relazioni',all:'Tutti'};
  return map[cat]||cat;
}
function showToast(message){ const toast=document.createElement('div'); toast.textContent=message; toast.style.cssText='position:fixed;bottom:24px;right:24px;background:#07111f;color:#fff;padding:1rem 1.2rem;border-radius:14px;box-shadow:0 16px 35px rgba(0,0,0,.25);z-index:3000;font-weight:800;'; document.body.appendChild(toast); setTimeout(()=>toast.remove(),2200); }
function createParticles(){ const p=document.querySelector('.particles'); if(!p) return; for(let i=0;i<18;i++){ const s=document.createElement('span'); s.style.cssText=`position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;border-radius:50%;background:rgba(255,255,255,.35);animation:floatBook ${4+Math.random()*5}s ease-in-out infinite;animation-delay:${Math.random()*4}s;`; p.appendChild(s); } }




// StepWithUs v3.5 - bundle modal updated
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('bundleModal');
  if (!modal) return;

  const bundles = {
    growth: {
      title: 'Percorso Crescita',
      desc: 'Abitudini, Mentalità e Persuasione per costruire disciplina, focus e comunicazione efficace.',
      value: '€65,97',
      price: '€49,99',
      itemIds: [1, 9, 7]
    },
    business: {
      title: 'Percorso Business',
      desc: 'Produttività, AI ed educazione finanziaria per lavorare meglio e gestire meglio il denaro.',
      value: '€57,97',
      price: '€44,99',
      itemIds: [2, 3, 8]
    },
    trader: {
      title: 'Percorso Trader',
      desc: 'Educazione finanziaria e trading online per capire mercati, rischio e strategia.',
      value: '€57,98',
      price: '€39,99',
      itemIds: [8, 10]
    },
    global: {
      title: 'Geopolitica & Mafia',
      desc: 'Geopolitica e Mafia Globale per leggere potere, economia e reti internazionali.',
      value: '€57,98',
      price: '€39,99',
      itemIds: [5, 12]
    },
    wellness: {
      title: 'Percorso Benessere',
      desc: 'Nutrizione e Ludopatia per salute, equilibrio e controllo personale.',
      value: '€52,98',
      price: '€37,99',
      itemIds: [4, 6]
    },
    animal: {
      title: 'Uomo & Animale',
      desc: 'Il percorso dedicato al rapporto tra animale e padrone.',
      value: '€24,99',
      price: '€24,99',
      itemIds: [11]
    },
    ultimate: {
      title: 'StepWithUs Ultimate',
      desc: 'Tutti i 12 ebook StepWithUs in un unico pacchetto premium.',
      value: '€288,88',
      price: '€119,99',
      itemIds: [1,2,3,4,5,6,7,8,9,10,11,12]
    }
  };
  function openBundle(key) {
    const b = bundles[key];
    if (!b) return;
    document.getElementById('bundleModalTitle').textContent = b.title;
    document.getElementById('bundleModalDesc').textContent = b.desc;
    document.getElementById('bundleModalValue').textContent = 'Valore ' + b.value;
    document.getElementById('bundleModalPrice').textContent = b.price;
    const items = (b.itemIds || []).map(id => ebooks.find(book => book.id === id)).filter(Boolean);
    document.getElementById('bundleModalList').innerHTML = items.map(book => `<div class="bundle-modal-item"><strong>${book.title}</strong><span>€${book.price.toFixed(2).replace('.', ',')}</span></div>`).join('');
    const addBundleBtn = document.getElementById('bundleAddCart');
    addBundleBtn.textContent = `Aggiungi ${b.title} al carrello`;
    addBundleBtn.onclick = () => {
      const priceNumber = Number(String(b.price).replace('€','').replace(',', '.'));
      const item = { id: 'bundle-' + key, title: b.title, price: priceNumber, quantity: 1, type: 'bundle', itemIds: b.itemIds || [] };
      const existing = cart.find(i => i.id === item.id);
      if (existing) existing.quantity += 1; else cart.push(item);
      saveCart();
      updateCartCount();
      renderCart();
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      if (typeof showToast === 'function') showToast(`${b.title} aggiunto al carrello`);
    };
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  document.querySelectorAll('[data-bundle]').forEach(el => {
    el.addEventListener('click', (event) => {
      if (event.target.closest('.bundle-buy-now')) return;
      event.stopPropagation();
      openBundle(el.dataset.bundle);
    });
  });
  document.querySelectorAll('[data-close-bundle]').forEach(el => el.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }));
});




// StepWithUs v4.1 - Payment UI robust fix
(function(){
  function productPaymentKey(book) {
    const map = {
      1:'abitudini',
      2:'produttivita',
      3:'ai',
      4:'nutrizione',
      5:'geopolitica',
      6:'ludopatia',
      7:'persuasione',
      8:'finanza',
      9:'mentalita',
      10:'trading',
      11:'animali',
      12:'mafia'
    };
    return map[book.id];
  }

  function isPlaceholder(link) {
    return !link || link === '#' || link.startsWith('INSERISCI_');
  }

  window.openStepWithUsPayment = function(type, key, title, price) {
    const modal = document.getElementById('paymentModal');
    if (!modal) {
      alert('Checkout non trovato nella pagina.');
      return;
    }

    const linksRoot = window.STEPWITHUS_PAYMENT_LINKS || {};
    const source = type === 'bundle' ? linksRoot.bundles?.[key] : linksRoot.products?.[key];
    const stripe = source?.stripe || '#';
    const paypal = source?.paypal || '#';

    document.getElementById('paymentProduct').textContent = title;
    document.getElementById('paymentPrice').textContent = price;

    const stripeBtn = document.getElementById('stripePayBtn');
    const paypalBtn = document.getElementById('paypalPayBtn');

    stripeBtn.href = isPlaceholder(stripe) ? '#' : stripe;
    paypalBtn.href = isPlaceholder(paypal) ? '#' : paypal;

    stripeBtn.classList.toggle('disabled-payment', isPlaceholder(stripe));
    paypalBtn.classList.toggle('disabled-payment', isPlaceholder(paypal));

    stripeBtn.onclick = (e) => {
      if (isPlaceholder(stripe)) {
        e.preventDefault();
        if (typeof showToast === 'function') showToast('Inserisci prima il link Stripe reale in js/payment-links.js');
        else alert('Inserisci prima il link Stripe reale in js/payment-links.js');
      }
    };
    paypalBtn.onclick = (e) => {
      if (isPlaceholder(paypal)) {
        e.preventDefault();
        if (typeof showToast === 'function') showToast('Inserisci prima il link PayPal reale in js/payment-links.js');
        else alert('Inserisci prima il link PayPal reale in js/payment-links.js');
      }
    };

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  };

  function enhanceProductCards() {
    if (typeof ebooks === 'undefined') return;

    document.querySelectorAll('.ebook-card').forEach(card => {
      if (card.querySelector('.buy-now')) return;

      const addBtn = card.querySelector('.add-to-cart');
      if (!addBtn) return;

      const id = Number(addBtn.dataset.id);
      const book = ebooks.find(b => b.id === id);
      if (!book) return;

      const actions = document.createElement('div');
      actions.className = 'card-actions payment-actions';

      const buy = document.createElement('button');
      buy.className = 'buy-now';
      buy.dataset.id = String(id);
      buy.textContent = 'Acquista ora';

      if (addBtn.parentElement) {
        addBtn.parentElement.insertBefore(actions, addBtn);
        actions.appendChild(addBtn);
        actions.appendChild(buy);
      }
    });

    document.querySelectorAll('.bundle-card').forEach(card => {
      if (card.querySelector('.bundle-buy-now')) return;
      const key = card.dataset.bundle;
      if (!key) return;
      const title = card.querySelector('h3')?.textContent || 'Pacchetto';
      const price = card.querySelector('.bundle-price')?.textContent || '';

      const btn = document.createElement('button');
      btn.className = 'btn btn-primary bundle-buy-now';
      btn.dataset.bundle = key;
      btn.dataset.title = title;
      btn.dataset.price = price;
      btn.textContent = 'Acquista pacchetto';
      card.appendChild(btn);
    });
  }

  document.addEventListener('click', (event) => {
    const payBookBtn = event.target.closest('.buy-now');
    if (payBookBtn && typeof ebooks !== 'undefined') {
      const id = Number(payBookBtn.dataset.id);
      const book = ebooks.find(b => b.id === id);
      if (book) {
        event.preventDefault();
        window.openStepWithUsPayment('product', productPaymentKey(book), book.title, '€' + book.price.toFixed(2).replace('.', ','));
      }
    }

    const bundleBtn = event.target.closest('.bundle-buy-now');
    if (bundleBtn) {
      event.preventDefault();
      window.openStepWithUsPayment('bundle', bundleBtn.dataset.bundle, bundleBtn.dataset.title, bundleBtn.dataset.price);
    }

    if (event.target.closest('[data-close-payment]')) {
      document.getElementById('paymentModal')?.classList.remove('active');
      document.getElementById('paymentModal')?.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(enhanceProductCards, 100);
    setTimeout(enhanceProductCards, 500);
  });

  document.addEventListener('click', () => {
    setTimeout(enhanceProductCards, 100);
  });
})();


// StepWithUs v4.2 - normalize catalog buttons
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.ebook-card').forEach(card => {
      const add = card.querySelector('.add-to-cart');
      const buyButtons = card.querySelectorAll('.buy-now');

      if (add) add.textContent = 'Aggiungi al carrello';

      // Keep only one buy-now button per card
      buyButtons.forEach((btn, index) => {
        btn.textContent = 'Acquista ora';
        if (index > 0) btn.remove();
      });
    });
  }, 700);
});


// StepWithUs v4.3 - cart feedback animation
(function(){
  function showCartFeedback(message) {
    let box = document.querySelector('.cart-feedback');
    if (!box) {
      box = document.createElement('div');
      box.className = 'cart-feedback';
      box.innerHTML = `
        <div class="cart-feedback-icon">🛒</div>
        <div>
          <strong>Prodotto aggiunto</strong>
          <span></span>
        </div>
      `;
      document.body.appendChild(box);
    }

    box.querySelector('span').textContent = message || 'È stato aggiunto al carrello.';
    box.classList.remove('show');
    void box.offsetWidth;
    box.classList.add('show');

    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.classList.remove('cart-bump');
      void cartBtn.offsetWidth;
      cartBtn.classList.add('cart-bump');
    }

    setTimeout(() => box.classList.remove('show'), 2600);
  }

  document.addEventListener('click', (event) => {
    const addBtn = event.target.closest('.add-to-cart');
    if (!addBtn) return;

    const title =
      addBtn.closest('.ebook-card')?.querySelector('h3')?.textContent?.trim()
      || 'Ebook';

    setTimeout(() => showCartFeedback(`${title} è nel carrello.`), 80);
  });
})();


// StepWithUs v4.6 - final catalog button order
document.addEventListener('DOMContentLoaded', () => {
  function normalizeCatalogButtons(){
    document.querySelectorAll('.ebook-card').forEach(card => {
      const info = card.querySelector('.ebook-info');
      if (!info) return;

      const details = card.querySelector('.details-btn, .view-details, [data-action="details"]');
      const add = card.querySelector('.add-to-cart');
      const buy = card.querySelector('.buy-now');

      if (details) details.textContent = 'Dettagli';
      if (add) add.textContent = 'Aggiungi al carrello';
      if (buy) buy.textContent = 'Acquista ora';

      let actions = card.querySelector('.catalog-actions-final');
      if (!actions) {
        actions = document.createElement('div');
        actions.className = 'catalog-actions-final';
        info.appendChild(actions);
      }

      [details, add, buy].forEach(btn => {
        if (btn && btn.parentElement !== actions) actions.appendChild(btn);
      });
    });
  }

  normalizeCatalogButtons();
  setTimeout(normalizeCatalogButtons, 300);
  setTimeout(normalizeCatalogButtons, 800);
  document.addEventListener('click', () => setTimeout(normalizeCatalogButtons, 150));
});


// StepWithUs v5.2 - companion rocket follows mouse softly
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const rocket = document.querySelector('.rocket-live');
    const hero = document.querySelector('.premium-hero');
    if (!rocket || !hero) return;

    let targetX = 120;
    let targetY = 120;
    let currentX = 120;
    let currentY = 120;
    let lastX = 120;
    let lastY = 120;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left + 18;
      targetY = e.clientY - rect.top - 18;
    });

    hero.addEventListener('mouseleave', () => {
      const rect = hero.getBoundingClientRect();
      targetX = rect.width * 0.78;
      targetY = rect.height * 0.22;
    });

    function animateRocket(){
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      const dx = currentX - lastX;
      const dy = currentY - lastY;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      rocket.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${angle}deg)`;
      lastX = currentX;
      lastY = currentY;

      requestAnimationFrame(animateRocket);
    }

    animateRocket();
  });
})();


// StepWithUs v6.0 - Build Your Library
document.addEventListener('DOMContentLoaded', () => {
  const buildGrid = document.getElementById('build-grid');
  if (!buildGrid || typeof ebooks === 'undefined') return;

  buildGrid.innerHTML = ebooks.map(book => `
    <label class="build-option">
      <input type="checkbox" value="${book.id}">
      <span>${book.title}</span>
      <strong>€${book.price.toFixed(2).replace('.', ',')}</strong>
    </label>
  `).join('');

  function updateBuildTotal(){
    const selected = [...buildGrid.querySelectorAll('input:checked')].map(i => Number(i.value));
    const chosen = ebooks.filter(b => selected.includes(b.id));
    const subtotal = chosen.reduce((sum,b) => sum + b.price, 0);
    let discount = 0;
    if (chosen.length >= 5) discount = .25;
    else if (chosen.length === 4) discount = .20;
    else if (chosen.length === 3) discount = .15;
    else if (chosen.length === 2) discount = .10;

    const final = subtotal * (1 - discount);
    document.getElementById('build-count').textContent = chosen.length;
    document.getElementById('build-subtotal').textContent = '€' + subtotal.toFixed(2).replace('.', ',');
    document.getElementById('build-discount').textContent = '-' + Math.round(discount*100) + '%';
    document.getElementById('build-total').textContent = '€' + final.toFixed(2).replace('.', ',');
  }

  buildGrid.addEventListener('change', updateBuildTotal);

  document.getElementById('build-add-cart')?.addEventListener('click', () => {
    const selected = [...buildGrid.querySelectorAll('input:checked')].map(i => Number(i.value));
    const chosen = ebooks.filter(b => selected.includes(b.id));
    if (chosen.length < 2) {
      if (typeof showToast === 'function') showToast('Seleziona almeno 2 ebook per creare il pacchetto.');
      return;
    }
    const subtotal = chosen.reduce((sum,b) => sum + b.price, 0);
    let discount = 0;
    if (chosen.length >= 5) discount = .25;
    else if (chosen.length === 4) discount = .20;
    else if (chosen.length === 3) discount = .15;
    else if (chosen.length === 2) discount = .10;
    const final = subtotal * (1 - discount);
    const id = 'custom-library-' + selected.sort((a,b)=>a-b).join('-');
    const title = `Build Your Library (${chosen.length} ebook)`;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ id, title, price: Number(final.toFixed(2)), quantity: 1, type: 'custom-library', itemIds: selected });
    saveCart();
    updateCartCount();
    renderCart();
    if (typeof showToast === 'function') showToast('Pacchetto personalizzato aggiunto al carrello.');
  });

  updateBuildTotal();
});




// StepWithUs v8.7 - clean stable hero carousel
document.addEventListener('DOMContentLoaded', () => {
  const slides = [...document.querySelectorAll('.hero-slide')];
  if (!slides.length) return;
  let current = slides.findIndex(s => s.classList.contains('active'));
  if (current < 0) current = 0;
  slides.forEach((s, i) => s.classList.toggle('active', i === current));

  function showSlide(index){
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  document.querySelector('.hero-next')?.addEventListener('click', () => showSlide(current + 1));
  document.querySelector('.hero-prev')?.addEventListener('click', () => showSlide(current - 1));
});

/* StepWithUs v8.7.3 - Lightweight hero parallax movement */
(function(){
  const hero = document.querySelector('section#home.premium-hero');
  if(!hero) return;
  let raf = null;
  const setParallax = (x, y) => {
    hero.style.setProperty('--parallax-x', x.toFixed(2) + 'px');
    hero.style.setProperty('--parallax-y', y.toFixed(2) + 'px');
  };
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setParallax(x, y));
  });
  hero.addEventListener('mouseleave', () => {
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setParallax(0, 0));
  });
})();
