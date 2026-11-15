---
title: "Supporto multi-valuta"
description: "Registra e rendiconta donazioni in valute diverse in B1 Admin, incluso l'inserimento manuale, le donazioni online con Stripe e come vengono convertiti i totali combinati."
---

# Supporto multi-valuta

<div class="article-intro">

La funzione multi-valuta di B1 permette alla tua chiesa di accettare e monitorare donazioni in valute diverse. È particolarmente utile per le chiese con membri internazionali, missionari o più campus in paesi diversi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso di gestire le donazioni. Vedi [Ruoli e permessi](../people/roles-permissions.md) per i dettagli.
- Configura le tue [donazioni online](./online-giving-setup.md) con Stripe, che supporta transazioni multi-valuta. Una chiesa senza donazioni online può comunque scegliere la valuta in cui vengono registrate le offerte inserite a mano.
- Comprendi le esigenze contabili della tua chiesa per la gestione di più valute.

</div>

La valuta della tua chiesa parte dalla valuta del paese inserito al momento della registrazione della chiesa (ad esempio scellini keniani per una chiesa in Kenya), ed è quella usata finché non ne viene salvata un'altra. Puoi cambiarla in qualsiasi momento in **Impostazioni → Donazioni** (il menu a tendina **Valuta**). Se il tuo paese non viene riconosciuto, parte da dollari USA.

## Attivare la multi-valuta {#enabling-multi-currency}

Il supporto multi-valuta è attivo per impostazione predefinita in B1:

- Le offerte online vengono addebitate nella valuta scelta nelle tue impostazioni **Donazioni**
- Ogni donazione mantiene la valuta in cui è stata registrata, e le singole righe di donazione mostrano quella valuta
- I totali combinati vengono convertiti nella valuta della tua chiesa (vedi [Totali convertiti](#converted-totals))
- Stripe gestisce la conversione valutaria nella valuta di accredito per le donazioni online

## Valute supportate {#supported-currencies}

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

## Registrare donazioni in valute diverse {#recording-donations-in-different-currencies}

### Donazioni online {#online-donations}

Quando un membro dona online tramite Stripe:

1. L'offerta viene addebitata nella valuta impostata in **Impostazioni → Donazioni**; i donatori non scelgono una valuta al checkout
2. Stripe elabora il pagamento in quella valuta
3. La donazione viene registrata in B1 con quella valuta e quell'importo
4. Stripe gestisce automaticamente l'eventuale conversione necessaria nella valuta di accredito del tuo account

Se in seguito cambi l'impostazione **Valuta**, le nuove offerte usano la nuova valuta mentre quelle già registrate mantengono la propria, quindi i tuoi registri possono contenere più di una valuta.

### Inserimento manuale {#manual-entry}

Le offerte inserite a mano -- in un lotto, con **Importa CSV**, oppure con **Registra un'offerta** nella scheda di una persona -- vengono sempre registrate nella valuta della tua chiesa, che è mostrata accanto al campo **Importo**. Per l'inserimento manuale non c'è un menu a tendina della valuta, quindi converti un'offerta fatta in un'altra valuta nella valuta della tua chiesa prima di inserirla, e annota l'importo originale in **Note** se ti serve.

## Visualizzare le donazioni multi-valuta {#viewing-multi-currency-donations}

### Report sulle donazioni {#donation-reports}

Le singole righe di donazione -- in un lotto, nella pagina di un fondo e nello storico delle donazioni di una persona -- mostrano ogni offerta nella valuta in cui è stata registrata. I totali combinati vengono convertiti, come descritto di seguito.

### Totali convertiti {#converted-totals}

Ovunque B1 mostri un unico totale combinato -- le schede KPI del riepilogo delle donazioni, il totale di un lotto di donazioni e il totale di un fondo -- le donazioni registrate in una valuta diversa da quella predefinita della tua chiesa vengono convertite nella valuta della chiesa usando i tassi di cambio correnti, così il totale è un unico numero significativo invece di sommare valute diverse. Una nota **Convertito ai tassi di cambio correnti** compare sotto il totale ogni volta che è stata applicata una conversione. Le singole righe di donazione continuano a mostrare la valuta originale.

### Ricevute di donazione {#giving-statements}

Le ricevute di donazione elencano l'importo di ogni offerta così come è stato registrato e ne sommano gli importi senza convertirli, quindi una ricevuta è accurata solo se tutte le offerte di quel donatore per l'anno sono nella valuta della tua chiesa. Se un donatore ha donato in più di una valuta, controlla la sua ricevuta prima di inviarla.

## Integrazione con Stripe {#stripe-integration}

Per le donazioni online, Stripe gestisce le transazioni multi-valuta:

- **Conversione automatica** -- Stripe converte le valute nella valuta predefinita del tuo account
- **Tassi di cambio** -- Stripe usa i tassi di cambio di mercato correnti
- **Commissioni** -- La conversione valutaria può comportare commissioni Stripe aggiuntive
- **Valuta di accredito** -- I fondi vengono accreditati nella valuta predefinita del tuo account

:::info
Controlla la tua dashboard Stripe per vedere i tassi di conversione correnti e le eventuali commissioni associate alle transazioni multi-valuta.
:::

## Considerazioni contabili {#accounting-considerations}

Quando lavori con più valute:

- **Tenuta dei registri** -- Tieni traccia degli importi e delle valute originali delle donazioni per un reporting accurato
- **Tassi di cambio** -- Tieni presente che i tassi di conversione di Stripe possono differire da quelli della tua banca
- **Ricevute fiscali** -- Consulta il tuo commercialista su come riportare le donazioni in valute diverse ai fini fiscali
- **Allocazione ai fondi** -- Puoi assegnare le donazioni a fondi specifici indipendentemente dalla valuta

## Buone pratiche {#best-practices}

- **Valuta predefinita** -- Imposta la valuta principale della tua chiesa in **Impostazioni > Donazioni**, così le offerte inserite a mano e i totali delle donazioni la usano
- **Comunicazione chiara** -- Indica ai donatori in quale valuta stanno donando durante il processo di checkout
- **Reporting coerente** -- I totali combinati vengono sempre convertiti automaticamente nella valuta della tua chiesa; apri un lotto o un fondo per vedere l'importo e la valuta originali di ogni offerta
- **Riconciliazione regolare** -- Riconcilia gli accrediti Stripe con i tuoi registri delle donazioni, tenendo conto delle conversioni valutarie

## Limiti {#limitations}

- La conversione valutaria per l'elaborazione dei pagamenti è gestita da Stripe solo per le donazioni online; le donazioni manuali vengono registrate nella valuta della chiesa così come inserite
- I report storici e le singole righe di donazione mostrano sempre la valuta originale in cui l'offerta è stata registrata
- I totali combinati (schede KPI, totali dei lotti, totali dei fondi) vengono convertiti nella valuta della chiesa usando i tassi di cambio correnti -- questi tassi possono differire leggermente da quelli della tua banca o di Stripe al momento del regolamento dei fondi

## Articoli correlati {#related-articles}

- [Configurazione delle donazioni online](./online-giving-setup.md) -- Configura Stripe per accettare donazioni
- [Registrare le donazioni](./recording-donations.md) -- Inserisci manualmente i record delle donazioni
- [Report sulle donazioni](./donation-reports.md) -- Genera e visualizza i riepiloghi delle donazioni
- [Ricevute di donazione](./giving-statements.md) -- Crea le ricevute di donazione di fine anno
