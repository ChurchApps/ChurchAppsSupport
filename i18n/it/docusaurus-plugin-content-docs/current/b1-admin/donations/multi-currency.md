---
title: "Supporto multi-valuta"
description: "Registra e rendiconta in B1 Admin le donazioni in valute diverse, con inserimento manuale, donazioni online via Stripe e come vengono convertiti i totali combinati."
---

# Supporto multi-valuta

<div class="article-intro">

La funzione multi-valuta di B1 consente alla tua chiesa di accettare e tracciare donazioni in valute diverse. È particolarmente utile per le chiese con membri internazionali, missionari o più sedi in paesi diversi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso di gestire le donazioni. Vedi [Ruoli e permessi](../people/roles-permissions.md) per i dettagli.
- Configura le tue [donazioni online](./online-giving-setup.md) con Stripe, che supporta transazioni multi-valuta. Una chiesa senza donazioni online può comunque scegliere la valuta in cui vengono registrate le offerte inserite a mano.
- Comprendi le esigenze contabili della chiesa per la gestione di più valute.

</div>

La valuta della chiesa parte da quella del paese indicato al momento della registrazione (ad esempio, scellini keniani per una chiesa in Kenya), ed è quella usata finché non ne viene salvata una. Puoi cambiarla in qualsiasi momento in **Gestisci chiesa → Donazioni**. Se il tuo paese non viene riconosciuto, la valuta parte da dollari USA.

## Attivare la multi-valuta

Il supporto multi-valuta è ormai attivo per impostazione predefinita in B1. Una volta attivo:

- I membri possono donare nella propria valuta locale quando donano online
- Puoi registrare manualmente donazioni in qualsiasi valuta
- I report sulle donazioni mostrano gli importi nella valuta originale
- Stripe gestisce automaticamente la conversione valutaria per le donazioni online

## Valute supportate

Il sistema supporta tutte le principali valute del mondo, tra cui:

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
- E molte altre...

Le valute disponibili per le donazioni online dipendono dalle valute supportate dal tuo account Stripe.

## Registrare donazioni in valute diverse

### Donazioni online

Quando un membro dona online tramite Stripe:

1. Sceglie la valuta preferita al checkout
2. Stripe elabora il pagamento in quella valuta
3. La donazione viene registrata in B1 con l'importo nella valuta originale
4. Stripe gestisce automaticamente l'eventuale conversione verso la valuta predefinita del tuo account

### Inserimento manuale

Le offerte in contanti e con assegno che inserisci a mano vengono registrate nella valuta della chiesa -- la **Valuta** impostata in **Impostazioni > Donazioni** (vedi [Scegliere la valuta](./online-giving-setup.md#choosing-your-currency)). Non esiste una scelta di valuta per singola offerta. Il campo **Importo** mostra il codice della valuta alla fine (ad esempio *PHP*), così sai in quale valuta stai digitando.

1. Vai su **Donazioni > Lotti** in B1 Admin e apri il lotto
2. Fai clic su **Aggiungi donazione** in alto nella pagina del lotto
3. Inserisci l'importo nella valuta della chiesa
4. Completa il resto dei dettagli della donazione
5. Fai clic su **Salva**

Modificare un'offerta esistente mantiene la valuta con cui era stata registrata in origine.

## Visualizzare le donazioni multi-valuta

### Report sulle donazioni

I report sulle donazioni mostrano gli importi nella valuta originale:

- Le singole registrazioni di donazione mostrano il codice della valuta (ad esempio "$100.00 USD")
- I totali sono calcolati per valuta
- Puoi filtrare per valute specifiche

### Totali convertiti {#converted-totals}

Ovunque B1 mostri un unico totale combinato -- le schede KPI del riepilogo delle donazioni, il totale di un lotto di donazioni e il totale di un fondo -- le donazioni registrate in una valuta diversa da quella predefinita della chiesa vengono convertite nella valuta della chiesa usando i tassi di cambio attuali. Così il totale è un unico numero significativo invece di sommare valute diverse. Una nota **Convertito ai tassi di cambio attuali** compare sotto il totale ogni volta che è stata applicata una conversione. Le singole voci di donazione continuano a mostrare la valuta originale.

### Ricevute di donazione

Quando generi le ricevute di donazione:

- Ogni donazione compare con la sua valuta originale
- I totali sono suddivisi per valuta
- I membri vedono esattamente ciò che hanno donato in ciascuna valuta

## Integrazione con Stripe

Per le donazioni online, Stripe gestisce le transazioni multi-valuta:

- **Conversione automatica** -- Stripe converte le valute nella valuta predefinita del tuo account
- **Tassi di cambio** -- Stripe usa i tassi di mercato attuali
- **Commissioni** -- La conversione valutaria può comportare commissioni Stripe aggiuntive
- **Valuta di accredito** -- I fondi vengono accreditati nella valuta predefinita del tuo account

:::info
Controlla la dashboard di Stripe per vedere i tassi di conversione attuali e le eventuali commissioni associate alle transazioni multi-valuta.
:::

## Considerazioni contabili

Quando lavori con più valute:

- **Conservazione dei registri** -- Tieni traccia degli importi e delle valute originali delle donazioni per un reporting accurato
- **Tassi di cambio** -- Tieni presente che i tassi di conversione di Stripe possono differire da quelli della tua banca
- **Ricevute fiscali** -- Chiedi al tuo commercialista come indicare le donazioni in valute diverse ai fini fiscali
- **Allocazione ai fondi** -- Puoi assegnare le donazioni a fondi specifici indipendentemente dalla valuta

## Buone pratiche

- **Valuta predefinita** -- Imposta la valuta principale della chiesa in **Impostazioni > Donazioni**, così le offerte inserite a mano e i totali usano quella valuta
- **Comunicazione chiara** -- Di' ai donatori in quale valuta stanno donando durante il checkout
- **Report coerenti** -- I totali combinati vengono sempre convertiti automaticamente nella valuta della chiesa; usa il filtro per valuta delle singole donazioni quando ti servono gli importi originali
- **Riconciliazione periodica** -- Riconcilia i pagamenti di Stripe con i registri delle donazioni, tenendo conto delle conversioni valutarie

## Limitazioni

- La conversione valutaria per l'elaborazione dei pagamenti è gestita da Stripe solo per le donazioni online; le donazioni manuali vengono registrate così come inserite, senza conversione automatica
- I report storici e le singole voci di donazione mostrano sempre la valuta originale in cui il dono è stato registrato
- I totali combinati (schede KPI, totali di lotto, totali di fondo) sono convertiti nella valuta della chiesa con i tassi di cambio attuali -- questi tassi possono differire leggermente da quelli della tua banca o di Stripe al momento in cui i fondi vengono accreditati

## Articoli correlati

- [Configurazione delle donazioni online](./online-giving-setup.md) -- Configura Stripe per accettare donazioni
- [Registrare le donazioni](./recording-donations.md) -- Inserisci manualmente le registrazioni delle donazioni
- [Report sulle donazioni](./donation-reports.md) -- Genera e visualizza i riepiloghi delle donazioni
- [Ricevute di donazione](./giving-statements.md) -- Crea le ricevute di fine anno
