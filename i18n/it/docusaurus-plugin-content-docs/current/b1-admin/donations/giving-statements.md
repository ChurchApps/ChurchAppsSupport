---
title: "Estratti conto delle donazioni"
---

# Estratti conto delle donazioni

<div class="article-intro">

Alla fine di ogni anno, i tuoi donatori hanno bisogno di un riepilogo delle loro donazioni deducibili dalle tasse per i propri archivi. B1 Admin rende facile generare questi estratti conto per tutti i donatori in una volta sola, facendoti risparmiare ore di lavoro manuale.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Verifica che i tuoi [fondi](funds.md) siano correttamente contrassegnati come **Deducibili dalle tasse** -- solo le donazioni ai fondi deducibili compaiono negli estratti conto
- Assicurati che tutte le donazioni siano state [registrate](recording-donations.md) e che le transazioni online siano state [importate da Stripe](stripe-import.md)

</div>

## Accesso agli estratti conto delle donazioni

1. In **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Donazioni**.
2. Fai clic su **Estratti conto delle donazioni**. Si apre la pagina **Estratti conto delle donazioni in blocco**.

## Generazione degli estratti conto

1. Nel riquadro **Seleziona anno**, scegli l'**Anno** dal menu a tendina. Puoi scegliere l'anno corrente o uno qualsiasi dei cinque anni precedenti.
2. La pagina carica solo le donazioni datate in quell'anno (dal 1° gennaio al 31 dicembre), quindi si apre rapidamente anche se la tua chiesa ha molti anni di storia delle donazioni. Quando scegli un anno diverso, il riepilogo si aggiorna con le donazioni di quell'anno. Il riquadro **Riepilogo** sotto l'anno mostra le statistiche relative a quell'anno, tra cui:
   - **Donatori totali** -- il numero di persone che hanno donato
   - **Donazioni totali** -- il numero di singole registrazioni di donazione
   - **Importo totale** -- l'importo complessivo di tutte le donazioni

## Download degli estratti conto

Il riquadro **Opzioni di download** ti offre due modi per consegnare gli estratti conto ai tuoi donatori:

### Download come file CSV

Sotto **File CSV individuali**, fai clic su **Scarica ZIP** per scaricare un file ZIP contenente un file CSV individuale per ogni donatore. Questo è utile se vuoi inviare gli estratti conto singolarmente via email o importarli in un altro sistema.

### Stampa di tutti gli estratti conto

Sotto **Estratti conto stampabili**, fai clic su **Stampa tutti** (il pulsante mostra il numero di estratti conto) per aprire nel browser una vista stampabile di tutti gli estratti conto dei donatori per l'anno selezionato. Da lì, usa la funzione di stampa del browser per inviarli a una stampante. Ogni estratto conto inizia su una nuova pagina, pronto per essere piegato e spedito, e sono ordinati per cognome e poi per nome del donatore.

Se hai caricato un **Logo per sfondo chiaro** in [Sito web > Aspetto](../website/appearance.md), questo viene stampato centrato in cima a ogni estratto conto, sopra il titolo. Questo vale sia per **Stampa tutti** sia per l'estratto conto di un singolo donatore stampato dalla sua scheda.

:::tip
Genera i tuoi estratti conto all'inizio di gennaio, mentre i dati sono ancora freschi. Verifica con attenzione che i tuoi fondi siano correttamente contrassegnati come deducibili dalle tasse prima di generare gli estratti conto -- sono incluse solo le donazioni ai fondi deducibili.
:::

:::info
Gli estratti conto includono solo le donazioni assegnate a fondi per cui è attivata l'impostazione **Deducibile dalle tasse**. Se un fondo non è contrassegnato come deducibile, le sue donazioni non compariranno nell'estratto conto. Puoi gestire questa impostazione nella pagina [Fondi](funds.md).
:::

## Formati di ricevuta per Canada, Australia e Nuova Zelanda

Le chiese al di fuori degli Stati Uniti possono passare l'estratto conto al formato ufficiale di ricevuta del proprio paese. Fai clic su **Formato estratto conto** in cima alla pagina Estratti conto delle donazioni (oppure vai su **Impostazioni** e apri la sezione **Donazioni**), e imposta **Formato estratto conto** su **Canada**, **Australia** o **Nuova Zelanda**, poi compila i campi che compaiono: il tuo numero di registrazione (numero di registrazione CRA, ABN o numero di registrazione di ente benefico della Nuova Zelanda), l'indirizzo della tua organizzazione, il nome della persona autorizzata a firmare le ricevute e, solo per il Canada, la città in cui vengono emesse le ricevute.

Gli estratti conto riportano poi la formulazione richiesta dalla tua autorità fiscale (per il Canada, "Ricevuta ufficiale ai fini dell'imposta sul reddito" con il riferimento CRA), un numero di ricevuta nel formato `ANNO-IDDONATORE`, l'importo ammissibile calcolato solo dai fondi deducibili dalle tasse e una riga separata per eventuali doni destinati a fondi non deducibili. I donatori vedono lo stesso blocco di ricevuta quando stampano il proprio estratto conto da B1.church.

## Passi successivi

Se hai bisogno di rivedere i dettagli delle donazioni prima di generare gli estratti conto, visita la pagina [Report delle donazioni](donation-reports.md) oppure controlla i singoli [lotti](batches.md).
