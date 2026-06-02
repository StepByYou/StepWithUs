# StepWithUs v4.0 — Payment Ready

## Cosa fare

1. Crea un account Stripe.
2. Crea un prodotto per ogni ebook e pacchetto.
3. Crea un Payment Link per ogni prodotto.
4. In Stripe usa `thank-you.html` come pagina di ritorno.
5. Apri `js/payment-links.js`.
6. Sostituisci i placeholder `INSERISCI_LINK_...` con i link veri.

Per PayPal fai lo stesso usando i campi `paypal`.

Questa è la soluzione più semplice per GitHub Pages.
Per download protetti automatici servirà poi un backend con webhook Stripe.
