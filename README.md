<!-- README.md -->
# 📚 StepWithUs - E-Commerce E-Books Digitali

Un e-commerce moderno e fully responsive per la vendita di e-books digitali, costruito con **HTML5**, **CSS3** e **JavaScript vanilla**.

![StepWithUs](https://img.shields.io/badge/StepWithUs-E--Books-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)

## 🌟 Caratteristiche

✅ **Homepage attrattiva** con hero section e call-to-action  
✅ **Catalogo e-books** con 8 prodotti di esempio (programmazione, business, design, salute)  
✅ **Filtri per categoria** per navigare facilmente  
✅ **Carrello funzionante** con localStorage (persiste anche dopo refresh)  
✅ **Modal dettagli prodotto** con tutte le informazioni  
✅ **Design responsive** - perfetto su mobile, tablet e desktop  
✅ **Interfaccia moderna** con gradients e transizioni smooth  
✅ **Sezione Chi Siamo** con features principali  
✅ **Contatti** con informazioni email e social media  

## 📋 Struttura del Progetto

```
StepWithUs/
├── index.html          # Homepage principale
├── css/
│   └── style.css       # Styling completo (responsive)
├── js/
│   └── script.js       # Logica e-commerce (carrello, filtri, modal)
├── images/             # Cartella per immagini (da aggiungere)
└── README.md           # Questo file
```

## 🚀 Come Iniziare

### 1. **Clonare il Repository**
```bash
git clone https://github.com/StepByYou/StepWithUs.git
cd StepWithUs
```

### 2. **Aprire il Sito Localmente**
Semplicemente apri `index.html` nel browser:
```bash
open index.html    # macOS
start index.html   # Windows
firefox index.html # Linux
```

Oppure usa un server locale:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server
```

Poi accedi a: `http://localhost:8000`

### 3. **Deployer su GitHub Pages**
Il sito è già pronto per GitHub Pages!

Vai alle **Settings** del repository → **Pages** → Seleziona il branch `main` → Salva

Il sito sarà disponibile a: `https://stepbyyou.github.io/stepwithus/`

## 📦 Prodotti Disponibili

1. **Guida Completa a JavaScript** - €19.99 (Marco Rossi)
2. **Business Plan in 30 Giorni** - €24.99 (Laura Bianchi)
3. **Design Thinking: Innovazione Pratica** - €21.99 (Andrea Verdi)
4. **React e Modern Web Development** - €27.99 (Alessandro Neri)
5. **Marketing Digitale 2026** - €23.99 (Chiara Milano)
6. **Nutrizione e Benessere Completo** - €18.99 (Dr. Marco Salute)
7. **Python per Data Science** - €29.99 (Roberto Dati)
8. **Startup da Zero a Successo** - €25.99 (Luca Imprenditore)

## 🛒 Funzionalità Carrello

- ✅ Aggiungi prodotti al carrello
- ✅ Rimuovi prodotti dal carrello
- ✅ Visualizza il totale
- ✅ I dati del carrello si salvano automaticamente nel browser (localStorage)
- ✅ Persiste anche dopo aver chiuso il sito

## 🔧 Personalizzare il Sito

### Aggiungere un Nuovo E-Book
Modifica `js/script.js` e aggiungi un oggetto nella lista `ebooks`:

```javascript
{
    id: 9,
    title: "Il Tuo Nuovo E-Book",
    author: "Nome Autore",
    category: "programmazione", // programmazione, business, design, salute
    price: 24.99,
    emoji: "📖",
    description: "Una breve descrizione",
    fullDescription: "Una descrizione più lunga e dettagliata",
    pages: 400,
    language: "Italiano"
}
```

### Cambiare i Colori
Modifica le variabili CSS in `css/style.css`:

```css
:root {
    --primary-color: #6366f1;        /* Blu */
    --secondary-color: #ec4899;      /* Rosa */
    --dark-bg: #0f172a;              /* Sfondo scuro */
    --light-bg: #f8fafc;             /* Sfondo chiaro */
    /* ... altre variabili */
}
```

### Aggiungere il Pagamento
Integra Stripe o PayPal nel file `js/script.js`, nella funzione `checkout`:

```javascript
document.getElementById('checkout-btn').addEventListener('click', () => {
    // Aggiungi qui la logica Stripe/PayPal
});
```

## 📱 Responsive Design

Il sito è perfettamente responsive:
- **Desktop**: Layout a 3 colonne
- **Tablet**: Layout a 2 colonne
- **Mobile**: Layout a 1 colonna

## 🎨 Colori e Tema

- **Colore Primario**: Indaco (#6366f1)
- **Colore Secondario**: Rosa (#ec4899)
- **Sfondo**: Bianco e grigio leggero
- **Testo**: Grigio scuro per contrasto

## 🔐 Privacy e Sicurezza

⚠️ **Nota Importante**: Questo è un sito di demo senza backend.

- I dati del carrello si salvano solo nel browser locale
- Non vengono inviati dati a server (per ora)
- Per implementare pagamenti veri, devi aggiungere un backend

## 📧 Contatti

- **Email**: info@stepwithus.com
- **Social**: Twitter, Instagram, LinkedIn (link da aggiungere)

## 📄 Licenza

MIT License - Puoi usare questo codice liberamente

## 🚧 Todo / Prossimi Step

- [ ] Aggiungere backend con database
- [ ] Integrare Stripe/PayPal per pagamenti
- [ ] Sistema di autenticazione utenti
- [ ] Gestione ordini e fatture
- [ ] Email di conferma acquisti
- [ ] Sezione review/rating prodotti
- [ ] Blog
- [ ] Newsletter signup

## 💡 Suggerimenti

Hai idee per migliorare il sito? Apri una **Issue** o una **Pull Request**! 

## 🙏 Crediti

Creato con ❤️ da **StepByYou**

---

**Buon divertimento e buone vendite!** 🎉📚
