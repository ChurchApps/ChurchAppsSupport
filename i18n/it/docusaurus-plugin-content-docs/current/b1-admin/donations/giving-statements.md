---
title: "Estratti conto delle donazioni"
---

# Estratti conto delle donazioni {#giving-statements}

<div class="article-intro">

Alla fine di ogni anno, i tuoi donatori hanno bisogno di un riepilogo delle loro donazioni deducibili dalle tasse per i propri archivi. B1 Admin rende facile generare questi estratti conto per tutti i donatori in una volta sola, risparmiandoti ore di lavoro manuale.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Verifica che i tuoi [fondi](funds.md) siano correttamente contrassegnati come **Deducibile fiscalmente** -- negli estratti conto compaiono solo le donazioni ai fondi deducibili fiscalmente
- Assicurati che tutte le donazioni siano state [registrate](recording-donations.md) e che le transazioni online siano state [importate da Stripe](stripe-import.md)

</div>

## Accedere agli estratti conto delle donazioni {#accessing-giving-statements}

1. In **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Donazioni**.
2. Fai clic su **Estratti conto delle donazioni**. Si apre la pagina **Estratti conto delle donazioni in blocco**.

## Generare gli estratti conto {#generating-statements}

1. Nel pannello **Seleziona anno**, scegli l'**Anno** dal menu a tendina. Puoi scegliere l'anno in corso o uno dei cinque anni precedenti.
2. La pagina carica solo le donazioni con data in quell'anno (dal 1° gennaio al 31 dicembre), quindi si apre rapidamente anche se la tua chiesa ha molti anni di storico donazioni. Quando scegli un anno diverso, il riepilogo si aggiorna con le donazioni di quell'anno. Il pannello **Riepilogo** sotto l'anno mostra le statistiche per quell'anno, tra cui:
   - **Donatori totali** -- il numero di persone che hanno donato
   - **Donazioni totali** -- il numero di singole registrazioni di donazione
   - **Importo totale** -- l'importo complessivo di tutte le donazioni

## Scaricare gli estratti conto {#downloading-statements}

Il pannello **Opzioni di download** offre due modi per far arrivare gli estratti conto ai donatori:

### Scarica come file CSV {#download-as-csv-files}

Nella sezione **File CSV individuali**, fai clic su **Scarica ZIP** per scaricare un file ZIP che contiene un file CSV separato per ciascun donatore. È utile se vuoi inviare gli estratti conto singolarmente via email o importarli in un altro sistema.

### Stampa tutti gli estratti conto {#print-all-statements}

Nella sezione **Estratti conto stampabili**, fai clic su **Stampa tutti** (il pulsante mostra il numero di estratti conto) per aprire nel browser una vista stampabile dell'estratto conto di ogni donatore per l'anno selezionato. Da lì, usa la funzione di stampa del browser per inviarli alla stampante. Ogni estratto conto inizia su una nuova pagina, così sono pronti da piegare e spedire, e sono ordinati per cognome del donatore, poi per nome.

Se hai caricato un **Logo per sfondo chiaro** in [Sito web > Aspetto](../website/appearance.md), viene stampato centrato in cima a ogni estratto conto, sopra il titolo. Questo vale sia per **Stampa tutti** sia per l'estratto conto di un singolo donatore stampato dalla sua scheda.

:::tip
Genera gli estratti conto all'inizio di gennaio, mentre i dati sono ancora freschi. Prima di generarli, ricontrolla che i fondi siano correttamente contrassegnati come deducibili fiscalmente -- negli estratti conto vengono inclusi solo le donazioni ai fondi deducibili fiscalmente.
:::

:::info
Gli estratti conto includono solo le donazioni assegnate a fondi per cui è attiva l'impostazione **Deducibile fiscalmente**. Se un fondo non è contrassegnato come deducibile fiscalmente, le sue donazioni non compariranno nell'estratto conto. Puoi gestire questa impostazione nella pagina [Fondi](funds.md).
:::

## Formati di ricevuta per Canada, Australia e Nuova Zelanda {#receipt-formats-for-canada-australia-and-new-zealand}

Le chiese al di fuori degli Stati Uniti possono passare alla struttura di ricevuta ufficiale del proprio paese. Fai clic su **Formato estratto conto** in cima alla pagina Estratti conto delle donazioni (oppure vai su **Impostazioni** e apri la sezione **Donazioni**), poi imposta **Formato estratto conto** su **Canada**, **Australia** o **Nuova Zelanda**, e compila i campi che compaiono: il tuo numero di registrazione (numero di registrazione CRA, ABN o numero di registrazione di ente benefico della Nuova Zelanda), l'indirizzo della tua organizzazione, il nome della persona autorizzata a firmare le ricevute e, per il Canada, la città in cui vengono emesse le ricevute.

Gli estratti conto riportano quindi la dicitura richiesta dall'autorità fiscale (per il Canada, "Ricevuta ufficiale ai fini dell'imposta sul reddito" con il riferimento CRA), un numero di ricevuta nel formato `ANNO-DONORID`, l'importo ammissibile calcolato solo dai fondi deducibili fiscalmente e una riga separata per eventuali donazioni a fondi non deducibili. I donatori vedono lo stesso blocco di ricevuta quando stampano il proprio estratto conto da B1.church.

## Cosa vedono i membri in B1.church {#what-members-see-in-b1church}

La stessa sezione **Donazioni** delle Impostazioni controlla anche ciò che i membri vedono nella propria pagina delle donazioni su B1.church:

- **Storico donazioni dei membri** stabilisce quali anni possono vedere i membri. **Tutti gli anni** è l'impostazione predefinita. **Fino al 2025** (o un altro anno) si ferma a quell'anno, così i membri non possono visualizzare o stampare un anno successivo finché non lo consenti. Usalo per trattenere l'anno in corso mentre completi correzioni e rimborsi. **Nascosto** rimuove completamente lo storico donazioni, i totali annuali e la stampa degli estratti conto. I membri possono comunque donare.
- **Nota sulle donazioni** è un breve messaggio mostrato nella pagina delle donazioni del membro e nello storico, e stampato in fondo a ogni estratto conto delle donazioni, inclusi quelli che stampi da qui. Usalo per informazioni come la politica sui rimborsi.

Queste impostazioni modificano solo ciò che vedono i membri. Da questa pagina puoi comunque stampare l'estratto conto di qualsiasi anno.

## Passaggi successivi {#next-steps}

Se devi rivedere i dettagli delle donazioni prima di generare gli estratti conto, visita la pagina [Rapporti sulle donazioni](donation-reports.md) oppure controlla i singoli [lotti](batches.md).
