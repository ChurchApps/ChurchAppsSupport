---
title: "Ricevute di donazione"
---

# Ricevute di donazione

<div class="article-intro">

A fine anno, i tuoi donatori hanno bisogno di un riepilogo delle loro donazioni deducibili dalle tasse per i propri archivi. B1 Admin rende facile generare queste ricevute per tutti i donatori in una sola volta, facendoti risparmiare ore di lavoro manuale.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Verifica che i tuoi [fondi](funds.md) siano correttamente contrassegnati come **Deducibili fiscalmente** -- sulle ricevute compaiono solo le donazioni ai fondi deducibili
- Assicurati che tutte le donazioni siano state [registrate](recording-donations.md) e che eventuali transazioni online siano state [importate da Stripe](stripe-import.md)

</div>

## Accedere alle ricevute di donazione

1. In **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Donazioni**.
2. Fai clic su **Ricevute di donazione**. Si apre la pagina **Ricevute di donazione per lotto**.

## Generare le ricevute

1. Nel pannello **Seleziona anno**, scegli l'**Anno** dal menu a tendina. Puoi scegliere l'anno in corso oppure uno dei cinque anni precedenti.
2. La pagina carica solo le donazioni con data in quell'anno (dal 1° gennaio al 31 dicembre), quindi si apre rapidamente anche se la tua chiesa ha molti anni di storico delle donazioni. Quando scegli un altro anno, il riepilogo si aggiorna con le donazioni di quell'anno. Il pannello **Riepilogo** sotto l'anno mostra le statistiche per quell'anno, tra cui:
   - **Donatori totali** -- il numero di persone che hanno donato
   - **Donazioni totali** -- il numero di singoli record di donazione
   - **Importo totale** -- l'importo complessivo di tutte le donazioni

## Scaricare le ricevute

Il pannello **Opzioni di download** ti offre due modi per far arrivare le ricevute ai tuoi donatori:

### Scaricare come file CSV

In **File CSV individuali**, fai clic su **Scarica ZIP** per scaricare un file ZIP che contiene un file CSV separato per ogni donatore. È utile se vuoi inviare le ricevute singolarmente via email o importarle in un altro sistema.

### Stampare tutte le ricevute

In **Ricevute stampabili**, fai clic su **Stampa tutte** (il pulsante mostra il numero di ricevute) per aprire nel browser una vista stampabile di ogni ricevuta del donatore per l'anno selezionato. Da lì, usa la funzione di stampa del browser per inviarle alla stampante. Ogni ricevuta inizia su una nuova pagina così sono pronte da piegare e spedire, e sono ordinate per cognome del donatore, poi per nome.

Se hai caricato un **Logo per sfondo chiaro** in [Sito web > Aspetto](../website/appearance.md), viene stampato centrato in cima a ogni ricevuta, sopra il titolo. Questo vale sia per **Stampa tutte** sia per la ricevuta di un singolo donatore stampata dalla sua scheda.

:::tip
Genera le ricevute all'inizio di gennaio, quando i registri sono ancora freschi. Controlla due volte che i fondi siano correttamente contrassegnati come deducibili fiscalmente prima di generare le ricevute -- sono incluse solo le donazioni ai fondi deducibili.
:::

:::info
Le ricevute di donazione includono solo le donazioni assegnate a fondi con l'impostazione **Deducibile fiscalmente** attiva. Se un fondo non è contrassegnato come deducibile fiscalmente, le sue donazioni non compariranno sulla ricevuta. Puoi gestire questa impostazione nella pagina [Fondi](funds.md).
:::

## Formati di ricevuta per Canada, Australia e Nuova Zelanda

Le chiese al di fuori degli Stati Uniti possono passare alla struttura ufficiale delle ricevute del proprio paese. Fai clic su **Formato ricevuta** in cima alla pagina Ricevute di donazione (oppure vai su **Impostazioni** e apri la sezione **Donazioni**), e imposta **Formato ricevuta** su **Canada**, **Australia** o **Nuova Zelanda**, poi compila i campi che compaiono: il tuo numero di registrazione (numero di registrazione CRA, ABN o numero di registrazione di ente di beneficenza in Nuova Zelanda), l'indirizzo della tua organizzazione, il nome della persona autorizzata a firmare le ricevute e, per il Canada, la città in cui vengono emesse le ricevute.

Le ricevute riportano poi la dicitura richiesta dalla tua autorità fiscale (per il Canada, "Ricevuta ufficiale ai fini dell'imposta sul reddito" con il riferimento CRA), un numero di ricevuta nel formato `ANNO-IDDONATORE`, l'importo ammissibile calcolato solo dai fondi deducibili fiscalmente e una riga separata per eventuali donazioni a fondi non deducibili. I donatori vedono lo stesso blocco di ricevuta quando stampano la propria ricevuta da B1.church.

## Cosa vedono i membri su B1.church

La stessa sezione **Donazioni** delle impostazioni controlla ciò che i membri vedono nella propria pagina delle donazioni su B1.church:

- **Storico delle donazioni dei membri** stabilisce quali anni i membri possono vedere. **Tutti gli anni** è il predefinito. **Fino al 2025** (o qualsiasi altro anno) si ferma a quell'anno, quindi i membri non possono visualizzare o stampare un anno successivo finché non lo consenti. Usalo per trattenere l'anno in corso mentre completi correzioni e rimborsi. **Nascosto** rimuove completamente lo storico delle donazioni, i totali annuali e la stampa delle ricevute. I membri possono comunque donare.
- **Nota sulle donazioni** è un breve messaggio mostrato nella pagina delle donazioni del membro e nello storico, e stampato in fondo a ogni ricevuta di donazione, incluse quelle che stampi da qui. Usala per cose come la tua politica sui rimborsi.

Queste impostazioni cambiano solo ciò che vedono i membri. Puoi comunque stampare qualsiasi anno da questa pagina.

## Prossimi passi

Se hai bisogno di rivedere i dettagli delle donazioni prima di generare le ricevute, visita la pagina [Report sulle donazioni](donation-reports.md) oppure controlla i singoli [lotti](batches.md).
