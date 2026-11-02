---
title: "Lotti di donazioni"
---

# Lotti di donazioni

<div class="article-intro">

I lotti raggruppano le tue donazioni per un monitoraggio e una riconciliazione più semplici. Un lotto tipico rappresenta una singola raccolta, come l'offerta della domenica o un evento speciale. Usare i lotti ti aiuta a restare organizzato e rende semplice verificare che i tuoi registri corrispondano ai depositi effettivi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati di aver [configurato i tuoi fondi](funds.md) in modo che siano disponibili quando registri le donazioni
- Ti serve il permesso **Visualizza riepiloghi donazioni**, **Modifica donazioni** oppure **Inserisci donazioni** per vedere la pagina Lotti (vedi [Chi può modificare un lotto](#who-can-change-a-batch))

</div>

## La pagina Lotti

Quando vai su **Donazioni > Lotti**, vedrai un elenco dei tuoi lotti. Ogni riga mostra:

- **Nome** -- l'etichetta che hai dato al lotto
- **Data** -- la data della raccolta
- **Donazioni** -- il numero di singole donazioni nel lotto
- **Totale** -- l'importo complessivo in dollari
- **Stato** -- **Aperto** o **Chiuso** (vedi [Chiudere e riaprire un lotto](#closing-and-reopening-a-batch))

Sopra l'elenco, i pulsanti degli anni ti permettono di mostrare solo i lotti di un anno, oppure tutti i lotti con **Tutti**. Un riepilogo su una riga mostra il numero di lotti, il numero di offerte e l'importo totale dei lotti visualizzati.

## Creare un nuovo lotto

1. Clicca su **Aggiungi lotto** in cima alla pagina.
2. Inserisci un nome descrittivo (ad esempio "Offerta della domenica - 9 feb").
3. Seleziona la data della raccolta.
4. Clicca su **Salva**.

Il tuo nuovo lotto compare nell'elenco, pronto per l'aggiunta delle donazioni.

## Lavorare con i lotti

- **Visualizzare le donazioni** -- clicca sul nome di un lotto per aprirlo e vedere tutte le singole donazioni che contiene. Da lì puoi aggiungere, modificare o rimuovere donazioni, oppure cliccare su **Importa CSV** per aggiungere molte donazioni in una volta da un foglio di calcolo (vedi [Importare donazioni da un file CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Modificare i dettagli del lotto** -- clicca sul pulsante **Modifica** nella riga di un lotto per cambiarne nome o data. Solo chi ha **Modifica donazioni** può eliminare un lotto.
- **Ordinare** -- usa le intestazioni delle colonne per ordinare i lotti per nome o data.
- **Esportare** -- clicca su **Esporta** in cima alla pagina per scaricare i lotti visualizzati come foglio di calcolo (CSV).
- **Eventi non riusciti** -- se il tuo gateway di pagamento ha segnalato dei problemi, in cima alla pagina compare un pulsante **Eventi non riusciti** (con il numero di eventi non risolti). Cliccalo per mostrare o nascondere l'elenco degli eventi sotto i lotti.
- **Importare da Stripe** -- clicca su **Importa transazioni Stripe mancanti** in cima alla pagina per aprire lo strumento [Importazione Stripe](stripe-import.md). Il pulsante compare solo quando il gateway di donazioni della tua chiesa è Stripe.

## Chi ha registrato ogni offerta

Ogni offerta inserita in un lotto mostra **Inserita da** e il nome della persona sotto il nome del donatore, così puoi capire chi l'ha inserita senza un foglio firme. B1 registra questo automaticamente in base a chi è connesso, e modificare l'offerta in seguito non lo cambia. Le offerte importate con **Importa CSV** mostrano la persona che ha eseguito l'importazione.

Le donazioni online, quelle aggiunte tramite lo strumento [Importazione Stripe](stripe-import.md) e le offerte inserite prima che questa funzione fosse aggiunta nel novembre 2026 non mostrano un nome.

## Chiudere e riaprire un lotto {#closing-and-reopening-a-batch}

Una volta che un lotto è stato contato e depositato, chiudilo così le sue donazioni restano esattamente come erano quando l'hai chiuso.

1. Apri il lotto.
2. Clicca su **Chiudi lotto** in cima alla pagina.

Il badge di stato accanto al nome del lotto passa da **Aperto** a **Chiuso**, il lotto mostra **Chiuso** nella colonna **Stato** della pagina Lotti, e un avviso in cima al lotto spiega che è chiuso. Mentre un lotto è chiuso, chi ha **Inserisci donazioni** può ancora visualizzarlo, ma non può aggiungere, modificare o eliminare le sue donazioni né cambiarne nome o data.

Per apportare di nuovo delle modifiche, apri il lotto e clicca su **Riapri lotto**. I nuovi lotti partono sempre aperti.

:::info
Solo chi ha **Modifica donazioni** vede i pulsanti **Chiudi lotto** e **Riapri lotto**. Possono anche modificare le donazioni in un lotto chiuso se serve una correzione, senza riaprirlo.
:::

## Chi può modificare un lotto {#who-can-change-a-batch}

Due [permessi di ruolo](../settings/roles-permissions.md) permettono a qualcuno di lavorare con i lotti:

- **Modifica donazioni** -- accesso completo: aggiungere ed eliminare lotti, chiuderli e riaprirli, e aggiungere, modificare o eliminare qualsiasi donazione, che il lotto sia aperto o chiuso.
- **Inserisci donazioni** -- per i team di conteggio e i volontari che registrano le offerte. Possono aggiungere lotti e aggiungere, modificare o eliminare donazioni, ma solo mentre il lotto è aperto. Non possono eliminare lotti, chiuderli o riaprirli, né modificare le offerte arrivate tramite le donazioni online.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi donazioni** vede **Donazioni** nel menu di B1 Admin, che porta direttamente alla pagina Lotti. **Riepilogo**, **Fondi**, **Campagne** e **Ricevute di donazione** restano nascosti per loro. Per aprire un lotto e vedere le donazioni al suo interno, il ruolo deve anche avere **Visualizza donazioni**.

:::tip
Una configurazione comune è un ruolo "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, e un tesoriere con **Modifica donazioni** che chiude ogni lotto una volta riconciliato il deposito.
:::

## Stampare un lotto

Apri un lotto e clicca su **Stampa** sopra l'elenco delle donazioni per stampare una copia cartacea per il tuo team di conteggio o per i registri di deposito. La stampa include:

- L'intestazione della tua chiesa -- il tuo logo (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della tua chiesa sotto -- poi il nome del lotto e la sua data
- Ogni donazione del lotto, con il nome del donatore, chi l'ha inserita, il metodo, le note, la data e l'importo (le offerte rimborsate sono barrate e contrassegnate come rimborsate)
- **Subtotali per fondo** -- il totale donato a ciascun fondo nel lotto
- **Totale del lotto** -- l'importo complessivo dell'intero lotto

Il pulsante **Stampa** compare solo quando il lotto ha almeno una donazione.

### Stampare più lotti insieme

Per stampare ogni lotto di un periodo in una sola volta -- ad esempio tutti i depositi del mese scorso -- clicca su **Stampa** in cima alla pagina **Lotti**, accanto a **Esporta**. Si apre la pagina **Stampa lotti** con una **Data di inizio** e una **Data di fine** che corrispondono ai lotti visualizzati: dal 1° gennaio al 31 dicembre dell'anno scelto, oppure dalla data del lotto più vecchio a quella del più recente quando è selezionato **Tutti**. Cambia una delle due date per scegliere un intervallo diverso.

Ogni lotto con una data compresa nell'intervallo (date di inizio e fine incluse) viene stampato in ordine cronologico, un lotto per pagina, con lo stesso layout della stampa di un singolo lotto. I lotti senza donazioni vengono esclusi, e se nessun lotto nell'intervallo ha donazioni vedrai il messaggio "Nessun lotto con donazioni in questo intervallo di date." Clicca su **Stampa** per aprire la finestra di stampa del browser, oppure su **Chiudi** per tornare all'elenco dei lotti.

## Esportare un lotto in QuickBooks Online

Apri un lotto e clicca su **Esporta per QuickBooks** per scaricare il lotto come voce di giornale che QuickBooks Online può importare (**Impostazioni > Importa dati > Voci di giornale**). Il file contiene un addebito a **Fondi non depositati** per il totale del lotto e un accredito per ogni fondo, usando il nome di ciascun fondo come nome del conto. Durante l'importazione QuickBooks ti chiede di associare quei nomi al tuo piano dei conti, quindi dai ai tuoi fondi lo stesso nome che il tuo contabile usa per i conti di entrata, oppure associali una volta sola durante l'importazione.

:::tip
Dai ai tuoi lotti nomi coerenti così sono facili da trovare in seguito. Includere la data e il tipo di raccolta (ad esempio "Culto della domenica mattina - 2025-02-09") mantiene l'elenco organizzato man mano che cresce.
:::

## Passi successivi

Una volta creato un lotto, consulta [Registrare le donazioni](recording-donations.md) per imparare ad aggiungere le singole donazioni. Puoi anche [importare le transazioni Stripe](stripe-import.md) per creare automaticamente lotti dalle donazioni online.
