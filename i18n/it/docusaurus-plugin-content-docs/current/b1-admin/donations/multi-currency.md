---
title: "Supporto Multi-Valuta"
---

# Supporto Multi-Valuta

<div class="article-intro">

La funzione multi-valuta di B1 consente alla tua chiesa di accettare e tracciare donazioni in diverse valute. Questo è particolarmente utile per chiese con membri internazionali, missionari o molteplici campus in diversi paesi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno del permesso per gestire le donazioni. Consulta [Ruoli e Autorizzazioni](../people/roles-permissions.md) per i dettagli.
- Configura le tue [donazioni online](./online-giving-setup.md) con Stripe, che supporta transazioni multi-valuta.
- Comprendi le esigenze contabili della tua chiesa per la gestione di più valute.

</div>

## Abilitazione Multi-Valuta

Il supporto multi-valuta è ora abilitato per impostazione predefinita in B1. Una volta abilitato:

- I membri possono donare nella loro valuta locale quando donano online
- Puoi registrare manualmente donazioni in qualsiasi valuta
- I report di donazioni mostrano importi nella loro valuta originale
- Stripe gestisce automaticamente la conversione di valuta per le donazioni online

## Valute supportate

Il sistema supporta tutte le principali valute mondiali, incluse:

- **USD** -- Dollaro statunitense
- **EUR** -- Euro
- **GBP** -- Sterlina britannica
- **CAD** -- Dollaro canadese
- **AUD** -- Dollaro australiano
- **MXN** -- Peso messicano
- **BRL** -- Real brasiliano
- **INR** -- Rupia indiana
- **CNY** -- Yuan cinese
- **JPY** -- Yen giapponese
- E molti altri...

Le valute disponibili per le donazioni online dipendono dalle valute supportate dal tuo account Stripe.

## Registrazione di donazioni in diverse valute

### Donazioni online

Quando un membro dona online tramite Stripe:

1. Selezionano la loro valuta preferita al momento del pagamento
2. Stripe elabora il pagamento in quella valuta
3. La donazione viene registrata in B1 con l'importo della valuta originale
4. Stripe gestisce automaticamente qualsiasi conversione di valuta necessaria per la valuta predefinita del tuo account

### Immissione manuale

Per registrare una donazione in contanti o assegni in una valuta diversa:

1. Vai a **Donazioni** in B1 Admin
2. Fai clic su **Aggiungi Donazione**
3. Seleziona la valuta dal menu a discesa della valuta
4. Immetti l'importo in quella valuta
5. Completa il resto dei dettagli della donazione
6. Fai clic su **Salva**

## Visualizzazione di donazioni multi-valuta

### Report di donazioni

I report di donazioni visualizzano importi nella loro valuta originale:

- I record di singole donazioni mostrano il codice della valuta (ad es. "$100.00 USD")
- I totali vengono calcolati per valuta
- Puoi filtrare per valute specifiche

### Totali convertiti

Ovunque B1 mostri un unico totale combinato -- le schede KPI di riepilogo donazioni, un totale di batch di donazioni e un totale del fondo -- le donazioni registrate in una valuta diversa dalla valuta predefinita della tua chiesa vengono convertite nella valuta della tua chiesa utilizzando i tassi di cambio attuali, in modo che il totale sia un unico numero significativo invece di aggiungere valute diverse insieme. Una nota **Convertito ai tassi di cambio attuali** appare sotto il totale ogni volta che è stata applicata una conversione. Le singole voci di riga di donazione ancora visualizzano nella loro valuta originale.

### Dichiarazioni di donazioni

Quando si generano dichiarazioni di donazioni:

- Ogni donazione appare con la sua valuta originale
- I totali sono suddivisi per valuta
- I membri vedono esattamente quello che hanno donato in ogni valuta

## Integrazione Stripe

Per le donazioni online, Stripe gestisce transazioni multi-valuta:

- **Conversione automatica** -- Stripe converte le valute alla valuta predefinita del tuo account
- **Tassi di cambio** -- Stripe utilizza i tassi di cambio di mercato attuali
- **Commissioni** -- La conversione di valuta può comportare commissioni aggiuntive di Stripe
- **Valuta di pagamento** -- I fondi vengono depositati nella valuta predefinita del tuo account

:::info
Controlla il tuo dashboard di Stripe per vedere i tassi di conversione attuali e le eventuali commissioni associate alle transazioni multi-valuta.
:::

## Considerazioni contabili

Quando si lavora con più valute:

- **Conservazione dei record** -- Tieni traccia degli importi e delle valute di donazione originali per un reporting accurato
- **Tassi di cambio** -- Nota che i tassi di conversione di Stripe possono differire dai tassi della tua banca
- **Ricevute fiscali** -- Consulta il tuo ragioniere su come segnalare le donazioni in diverse valute ai fini fiscali
- **Allocazione dei fondi** -- Puoi allocare donazioni a fondi specifici indipendentemente dalla valuta

## Best practice

- **Valuta predefinita** -- Imposta la valuta primaria della tua chiesa come predefinita per la maggior parte delle transazioni
- **Comunicazione chiara** -- Comunica ai donatori quale valuta stanno donando durante il processo di checkout
- **Report coerente** -- I totali combinati vengono sempre convertiti nella valuta della tua chiesa automaticamente; utilizza il filtro di valuta per donazione quando hai bisogno di vedere gli importi originali
- **Riconciliazione regolare** -- Riconcilia i pagamenti di Stripe con i tuoi record di donazioni, tenendo conto delle conversioni di valuta

## Limitazioni

- La conversione di valuta per l'elaborazione dei pagamenti è gestita da Stripe solo per le donazioni online; le donazioni manuali vengono registrate come immesse senza conversione automatica
- I report storici e le singole voci di riga di donazione mostrano sempre la valuta originale in cui il dono è stato registrato
- I totali combinati (schede KPI, totali di batch, totali di fondo) vengono convertiti nella valuta della tua chiesa utilizzando i tassi di cambio attuali -- questi tassi possono differire leggermente dai tassi della tua banca o di Stripe al momento in cui i fondi si risolvono

## Articoli correlati

- [Configurazione Donazioni Online](./online-giving-setup.md) -- Configura Stripe per accettare donazioni
- [Registrazione Donazioni](./recording-donations.md) -- Immetti manualmente i record di donazioni
- [Report Donazioni](./donation-reports.md) -- Genera e visualizza riepiloghi di donazioni
- [Dichiarazioni di donazioni](./giving-statements.md) -- Crea dichiarazioni di donazioni di fine anno
