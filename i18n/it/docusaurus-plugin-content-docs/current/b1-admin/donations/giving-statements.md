---
title: "Ricevute di donazione"
description: "Crea le ricevute di donazione di fine anno per ogni donatore in B1 Admin, poi scaricale come file CSV o stampale per la spedizione con i totali fiscalmente deducibili."
---

# Ricevute di donazione

<div class="article-intro">

Alla fine di ogni anno, i tuoi donatori hanno bisogno di un riepilogo delle loro donazioni deducibili per i propri registri. B1 Admin rende facile generare queste ricevute per tutti i donatori in una sola volta, risparmiandoti ore di lavoro manuale.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Verifica che i tuoi [fondi](funds.md) siano correttamente contrassegnati come **Fiscalmente deducibile** -- solo le donazioni a fondi deducibili compaiono nelle ricevute
- Assicurati che tutte le donazioni siano state [registrate](recording-donations.md) e che le transazioni online siano state [importate da Stripe](stripe-import.md)

</div>

## Accedere alle ricevute di donazione {#accessing-giving-statements}

1. In **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Donazioni**.
2. Fai clic su **Ricevute di donazione**. Si apre la pagina **Ricevute di donazione dei lotti**.

## Generare le ricevute {#generating-statements}

1. Nel riquadro **Seleziona anno**, scegli l'**Anno** dal menu a tendina. Puoi scegliere l'anno in corso o uno dei cinque anni precedenti.
2. La pagina carica solo le donazioni con data in quell'anno (dal 1° gennaio al 31 dicembre), quindi si apre rapidamente anche se la tua chiesa ha molti anni di storico delle donazioni. Quando scegli un altro anno, il riepilogo si aggiorna con le donazioni di quell'anno. Il riquadro **Riepilogo** sotto l'anno mostra le statistiche per quell'anno, contando le stesse offerte incluse nelle ricevute (le offerte fatte solo a fondi non deducibili sono escluse):
   - **Donatori totali** -- il numero di persone che hanno donato
   - **Donazioni totali** -- il numero di singoli record di donazione
   - **Importo totale** -- l'importo complessivo delle loro donazioni

## Scaricare le ricevute {#downloading-statements}

Il riquadro **Opzioni di download** ti offre due modi per consegnare le ricevute ai tuoi donatori:

### Scaricare come file CSV {#download-as-csv-files}

In **File CSV individuali**, fai clic su **Scarica ZIP** (il pulsante mostra il numero di file) per scaricare un file ZIP che contiene un file CSV individuale per ogni donatore. È utile se vuoi inviare le ricevute singolarmente via email o importarle in un altro sistema.

### Stampare tutte le ricevute {#print-all-statements}

In **Ricevute stampabili**, fai clic su **Stampa tutte** (il pulsante mostra il numero di ricevute) per aprire nel browser una vista stampabile di tutte le ricevute dei donatori per l'anno selezionato. Da lì, usa la funzione di stampa del browser per inviarle alla stampante. Ogni ricevuta inizia su una nuova pagina così sono pronte per essere piegate e spedite, e sono ordinate per cognome del donatore, poi per nome.

Se hai caricato un **Logo per sfondo chiaro** in [Sito web > Aspetto](../website/appearance.md), viene stampato centrato in cima a ogni ricevuta, sopra il titolo della ricevuta. Questo vale per **Stampa tutte**, per la ricevuta di un singolo donatore stampata dalla sua scheda, e per le ricevute che i membri stampano da sé dalla pagina **Donazioni** di B1.church.

:::tip
Genera le ricevute all'inizio di gennaio, quando i registri sono ancora freschi. Ricontrolla che i tuoi fondi siano contrassegnati correttamente come fiscalmente deducibili prima di generare le ricevute -- sono incluse solo le donazioni a fondi deducibili.
:::

:::info
Le ricevute di donazione includono solo le donazioni assegnate a fondi con l'impostazione **Fiscalmente deducibile** attiva. Se un fondo non è contrassegnato come fiscalmente deducibile, le sue donazioni non compariranno nella ricevuta. Puoi gestire questa impostazione nella pagina [Fondi](funds.md).
:::

## Formati di ricevuta per Canada, Australia e Nuova Zelanda {#receipt-formats-for-canada-australia-and-new-zealand}

Le chiese al di fuori degli Stati Uniti possono passare alla disposizione ufficiale di ricevuta del proprio paese. Fai clic su **Formato ricevuta** in cima alla pagina Ricevute di donazione (oppure vai su **Impostazioni** e apri la sezione **Donazioni**), e imposta **Formato ricevuta** (che parte da **Standard**) su **Canada - ricevuta ufficiale CRA**, **Australia** oppure **Nuova Zelanda**, poi compila i campi che compaiono: il tuo numero di registrazione (**Numero di registrazione CRA**, **ABN** oppure **Numero di registrazione di beneficenza NZ**), l'**Indirizzo dell'organizzazione**, il **Nome del firmatario autorizzato** e, per il Canada, la **Città di emissione**. Fai clic su **Salva**.

Le ricevute riportano poi la formulazione che l'autorità fiscale si aspetta (per il Canada, "Ricevuta ufficiale ai fini dell'imposta sul reddito" con il riferimento CRA), un numero di ricevuta nel formato `YEAR-DONORID`, l'importo ammissibile calcolato solo sui fondi deducibili e una riga separata per eventuali offerte a fondi non deducibili. I donatori vedono lo stesso blocco di ricevuta quando stampano la propria ricevuta da B1.church.

## Cosa vedono i membri in B1.church {#what-members-see-in-b1church}

La stessa sezione **Donazioni** delle impostazioni controlla ciò che i membri vedono nella propria pagina delle donazioni in B1.church:

- **Storico donazioni dei membri** stabilisce quali anni possono vedere i membri. **Tutti gli anni** è l'impostazione predefinita. **Fino al 2025** (o qualsiasi altro anno) si ferma a quell'anno, quindi i membri non possono visualizzare né stampare un anno successivo finché non lo consenti. Usalo per trattenere l'anno in corso mentre completi correzioni e rimborsi. **Nascosto** rimuove completamente lo storico delle donazioni, i totali annuali e la stampa delle ricevute. I membri possono comunque donare.
- **Nota sulle donazioni** è un breve messaggio mostrato nella pagina delle donazioni del membro e nello storico, e stampato in fondo a ogni ricevuta di donazione, comprese quelle che stampi da qui. Usala per informazioni come la tua politica sui rimborsi.

Queste impostazioni modificano solo ciò che vedono i membri. Da questa pagina puoi comunque stampare qualsiasi anno.

## Prossimi passi {#next-steps}

Se devi rivedere i dettagli delle donazioni prima di generare le ricevute, visita la pagina [Report sulle donazioni](donation-reports.md) oppure controlla i singoli [lotti](batches.md).
