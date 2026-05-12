---
title: "Supporto Multi-Valuta"
---

# Supporto Multi-Valuta

<div class="article-intro">

La funzionalità multi-valuta di B1 consente alla tua chiesa di accettare e tracciare donazioni in valute diverse. Questo è particolarmente utile per chiese con membri internazionali, missionari o più sedi in paesi diversi.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso di gestire le donazioni. Consulta [Ruoli e Permessi](../people/roles-permissions.md) per i dettagli.
- Configura le tue [donazioni online](./online-giving-setup.md) con Stripe, che supporta transazioni multi-valuta.
- Comprendi le esigenze contabili della tua chiesa per la gestione di più valute.

</div>

## Abilitazione del Multi-Valuta

Il supporto multi-valuta è ora abilitato per impostazione predefinita in B1. Una volta abilitato:

- I membri possono donare nella loro valuta locale quando donano online
- Puoi registrare manualmente donazioni in qualsiasi valuta
- I report delle donazioni mostrano gli importi nella loro valuta originale
- Stripe gestisce automaticamente la conversione di valuta per le donazioni online

## Valute Supportate

Il sistema supporta tutte le principali valute mondiali, tra cui:

- **USD** -- Dollaro degli Stati Uniti
- **EUR** -- Euro
- **GBP** -- Sterlina Britannica
- **CAD** -- Dollaro Canadese
- **AUD** -- Dollaro Australiano
- **MXN** -- Peso Messicano
- **BRL** -- Real Brasiliano
- **INR** -- Rupia Indiana
- **CNY** -- Yuan Cinese
- **JPY** -- Yen Giapponese
- E molte altre...

Le valute disponibili per le donazioni online dipendono dalle valute supportate dal tuo account Stripe.

## Registrazione di Donazioni in Valute Diverse

### Donazioni Online

Quando un membro dona online tramite Stripe:

1. Seleziona la valuta preferita al checkout
2. Stripe elabora il pagamento in quella valuta
3. La donazione viene registrata in B1 con l'importo nella valuta originale
4. Stripe gestisce automaticamente qualsiasi conversione di valuta necessaria alla valuta predefinita del tuo account

### Inserimento Manuale

Per registrare una donazione in contanti o assegno in una valuta diversa:

1. Vai a **Donazioni** in B1 Admin
2. Clicca su **Aggiungi Donazione**
3. Seleziona la valuta dal menu a discesa della valuta
4. Inserisci l'importo in quella valuta
5. Completa il resto dei dettagli della donazione
6. Clicca su **Salva**

## Visualizzazione delle Donazioni Multi-Valuta

### Report delle Donazioni

I report delle donazioni mostrano gli importi nella loro valuta originale:

- I record delle singole donazioni mostrano il codice valuta (ad esempio, "$100.00 USD")
- I totali sono calcolati per valuta
- Puoi filtrare per valute specifiche

### Estratti Conto delle Donazioni

Quando generi estratti conto delle donazioni:

- Ogni donazione appare con la sua valuta originale
- I totali sono suddivisi per valuta
- I membri vedono esattamente cosa hanno donato in ciascuna valuta

## Integrazione Stripe

Per le donazioni online, Stripe gestisce le transazioni multi-valuta:

- **Conversione automatica** -- Stripe converte le valute alla valuta predefinita del tuo account
- **Tassi di cambio** -- Stripe utilizza i tassi di cambio correnti di mercato
- **Commissioni** -- La conversione di valuta può comportare commissioni Stripe aggiuntive
- **Valuta di pagamento** -- I fondi vengono depositati nella valuta predefinita del tuo account

:::info
Controlla la tua dashboard di Stripe per vedere i tassi di conversione attuali e eventuali commissioni associate alle transazioni multi-valuta.
:::

## Considerazioni Contabili

Quando si lavora con più valute:

- **Tenuta dei registri** -- Tieni traccia degli importi delle donazioni originali e delle valute per una rendicontazione accurata
- **Tassi di cambio** -- Nota che i tassi di conversione di Stripe possono differire dai tassi della tua banca
- **Ricevute fiscali** -- Consulta il tuo commercialista su come riportare donazioni in valute diverse ai fini fiscali
- **Allocazione fondi** -- Puoi allocare donazioni a fondi specifici indipendentemente dalla valuta

## Migliori Pratiche

- **Valuta predefinita** -- Imposta la valuta principale della tua chiesa come predefinita per la maggior parte delle transazioni
- **Comunicazione chiara** -- Comunica ai donatori in quale valuta stanno donando durante il processo di checkout
- **Reporting coerente** -- Decidi se riportare nelle valute originali o convertire in un'unica valuta per i riepiloghi
- **Riconciliazione regolare** -- Riconcilia i pagamenti di Stripe con i tuoi record di donazioni, tenendo conto delle conversioni di valuta

## Limitazioni

- La conversione di valuta è gestita da Stripe solo per le donazioni online
- Le donazioni manuali vengono registrate come inserite senza conversione automatica
- I report storici mostrano le donazioni nelle loro valute originali
- I calcoli dei totali sono effettuati per valuta, non tra valute

## Articoli Correlati

- [Configurazione Donazioni Online](./online-giving-setup.md) -- Configura Stripe per accettare donazioni
- [Registrazione Donazioni](./recording-donations.md) -- Inserisci manualmente i record delle donazioni
- [Report Donazioni](./donation-reports.md) -- Genera e visualizza riepiloghi delle donazioni
- [Estratti Conto delle Donazioni](./giving-statements.md) -- Crea estratti conto delle donazioni di fine anno
