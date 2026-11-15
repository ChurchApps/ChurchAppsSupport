---
title: "Lotti di donazioni"
description: "Raggruppa le offerte in lotti di donazioni in B1 Admin, poi chiudi, stampa o esporta ciascun lotto così i totali corrispondono ai tuoi versamenti in banca."
---

# Lotti di donazioni

<div class="article-intro">

I lotti raggruppano le tue donazioni per un monitoraggio e una riconciliazione più semplici. Un lotto tipico rappresenta una singola colletta, come l'offerta di una domenica o un evento speciale. Usare i lotti ti aiuta a restare organizzato e rende semplice verificare che i tuoi registri corrispondano ai versamenti effettivi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati di aver [configurato i tuoi fondi](funds.md) così siano disponibili quando registri le donazioni
- Ti serve il permesso **Visualizza riepiloghi donazioni**, **Modifica donazioni** oppure **Inserisci donazioni** per vedere la pagina Lotti (vedi [Chi può modificare un lotto](#who-can-change-a-batch))

</div>

## La pagina dei lotti {#the-batches-page}

Quando vai su **Donazioni > Lotti**, vedi un elenco dei tuoi lotti. Ogni riga mostra:

- **Nome** -- l'etichetta che hai dato al lotto
- **Data** -- la data della colletta
- **Donazioni** -- il numero di singole donazioni nel lotto
- **Totale** -- l'importo complessivo in dollari
- **Stato** -- **Aperto** o **Chiuso** (vedi [Chiudere e riaprire un lotto](#closing-and-reopening-a-batch))

Sopra l'elenco, i pulsanti degli anni ti permettono di mostrare solo i lotti di un anno, oppure **Tutti** i lotti. Un riepilogo su una riga mostra il numero di lotti, il numero di offerte e l'importo totale dei lotti visualizzati.

## Creare un nuovo lotto {#creating-a-new-batch}

1. Fai clic su **Aggiungi lotto** in cima alla pagina.
2. Inserisci un nome descrittivo (ad esempio "Offerta domenicale - 9 feb"). Il nome è facoltativo, ma un nome chiaro rende il lotto più facile da trovare in seguito.
3. Seleziona la data della colletta. Parte dalla data di oggi.
4. Fai clic su **Salva**.

Il tuo nuovo lotto compare nell'elenco, pronto per l'aggiunta delle donazioni.

## Lavorare con i lotti {#working-with-batches}

- **Visualizzare le donazioni** -- fai clic sul nome di un lotto per aprirlo e vedere tutte le singole donazioni che contiene. Da lì puoi aggiungere, modificare o rimuovere donazioni, oppure fare clic su **Importa CSV** per aggiungere molte donazioni in una volta sola da un foglio di calcolo (vedi [Importare donazioni da un file CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Modificare i dettagli del lotto** -- fai clic sul pulsante **Modifica** di una riga del lotto (oppure su **Modifica lotto** in cima a un lotto aperto) per cambiarne il nome o la data. Solo chi ha **Modifica donazioni** vede lì il pulsante **Elimina**; eliminare un lotto rimuove le donazioni che contiene, e se lo elimini dalla sua pagina dedicata torni all'elenco dei Lotti.
- **Ordinare** -- usa le intestazioni di colonna per ordinare i lotti per nome o data.
- **Esportare** -- fai clic su **Esporta** in cima alla pagina per scaricare i lotti visualizzati come foglio di calcolo (CSV).
- **Eventi non riusciti** -- se il tuo gateway di pagamento ha segnalato dei problemi, in cima alla pagina compare un pulsante **Eventi non riusciti** (con il numero di eventi non risolti). Fai clic su di esso per mostrare o nascondere l'elenco degli eventi sotto i lotti.
- **Importare da Stripe** -- fai clic su **Importa transazioni Stripe mancanti** in cima alla pagina per aprire lo strumento [Importazione Stripe](stripe-import.md). Il pulsante compare solo quando il gateway di donazioni della tua chiesa è Stripe.

## Chi ha inserito ogni offerta {#who-entered-each-gift}

Ogni offerta inserita in un lotto mostra **Inserito da** e il nome della persona sotto il nome del donatore, così puoi capire chi l'ha inserita senza un foglio firme. B1 registra questo automaticamente in base a chi ha effettuato l'accesso, e modificare l'offerta in seguito non lo cambia. Le offerte importate con **Importa CSV** mostrano la persona che ha eseguito l'importazione.

Le donazioni online, quelle aggiunte dallo strumento [Importazione Stripe](stripe-import.md) e quelle inserite prima che questa funzione fosse aggiunta, nel novembre 2026, non mostrano un nome.

## Chiudere e riaprire un lotto {#closing-and-reopening-a-batch}

Una volta che un lotto è stato contato e versato, chiudilo così le sue donazioni restano esattamente come erano quando l'hai chiuso.

1. Apri il lotto.
2. Fai clic su **Chiudi lotto** in cima alla pagina.

Il badge di stato accanto al nome del lotto passa da **Aperto** a **Chiuso**, il lotto mostra **Chiuso** nella colonna **Stato** della pagina Lotti, e un avviso in cima al lotto spiega che è chiuso. Mentre un lotto è chiuso, chi ha **Inserisci donazioni** può ancora visualizzarlo, ma non può aggiungere, modificare o eliminare le sue donazioni né cambiarne il nome o la data.

Per apportare di nuovo modifiche, apri il lotto e fai clic su **Riapri lotto**. I nuovi lotti partono sempre aperti.

:::info
Solo chi ha **Modifica donazioni** vede i pulsanti **Chiudi lotto** e **Riapri lotto**. Possono anche modificare le donazioni in un lotto chiuso, se serve una correzione, senza riaprirlo.
:::

## Chi può modificare un lotto {#who-can-change-a-batch}

Due [permessi di ruolo](../settings/roles-permissions.md) permettono a qualcuno di lavorare con i lotti:

- **Modifica donazioni** -- accesso completo: aggiungere ed eliminare lotti, chiuderli e riaprirli, e aggiungere, modificare o eliminare qualsiasi donazione, che il lotto sia aperto o chiuso.
- **Inserisci donazioni** -- per i team di conteggio e i volontari che registrano le offerte. Possono aggiungere lotti e aggiungere, modificare o eliminare donazioni, ma solo mentre il lotto è aperto. Non possono eliminare lotti, chiuderli o riaprirli, né modificare le offerte arrivate tramite le donazioni online.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi donazioni** vede **Donazioni** nel menu di B1 Admin, che porta direttamente alla pagina Lotti. **Riepilogo**, **Fondi**, **Campagne** e **Ricevute di donazione** restano nascosti per loro. Per aprire un lotto e vedere le donazioni che contiene, il ruolo deve anche avere **Visualizza donazioni**.

:::tip
Una configurazione comune è un ruolo "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, e un tesoriere con **Modifica donazioni** che chiude ogni lotto dopo che il versamento è stato riconciliato.
:::

## Stampare un lotto {#printing-a-batch}

Apri un lotto e fai clic su **Stampa** sopra l'elenco delle donazioni per stampare una copia cartacea per il tuo team di conteggio o per i registri dei versamenti. La stampa include:

- L'intestazione della tua chiesa -- il tuo logo (il **Logo per sfondo chiaro** da [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della tua chiesa sotto -- poi il nome del lotto e la sua data
- Ogni donazione del lotto, con il nome del donatore, chi l'ha inserita, il metodo, le note, la data e l'importo (le offerte rimborsate sono barrate e contrassegnate come rimborsate)
- **Subtotali dei fondi** -- il totale donato a ciascun fondo nel lotto
- **Totale del lotto** -- l'importo complessivo dell'intero lotto

Il pulsante **Stampa** compare solo quando il lotto ha almeno una donazione.

### Stampare più lotti insieme {#printing-several-batches-at-once}

Per stampare in una sola volta tutti i lotti di un periodo -- ad esempio tutti i versamenti del mese scorso -- fai clic su **Stampa** in cima alla pagina **Lotti**, accanto a **Esporta**. Si apre la pagina **Stampa lotti** con una **Data di inizio** e una **Data di fine** che corrispondono ai lotti visualizzati: dal 1° gennaio al 31 dicembre dell'anno scelto, oppure dalla data del lotto più vecchio a quella del più recente quando è selezionato **Tutti**. Cambia una delle due date per scegliere un intervallo diverso.

Ogni lotto con data compresa nell'intervallo (incluse le date di inizio e fine) viene stampato in ordine di data, un lotto per pagina, con lo stesso layout di una stampa di singolo lotto. I lotti senza donazioni vengono esclusi, e se nessun lotto nell'intervallo ha donazioni vedrai il messaggio "Nessun lotto con donazioni in questo intervallo di date." Fai clic su **Stampa** per aprire la finestra di stampa del browser, oppure su **Chiudi** per tornare all'elenco dei lotti.

## Esportare un lotto verso QuickBooks Online {#exporting-a-batch-to-quickbooks-online}

Apri un lotto e fai clic su **Esporta per QuickBooks** per scaricarlo come registrazione di giornale che QuickBooks Online può importare (**Impostazioni > Importa dati > Registrazioni di giornale**). Il file contiene un addebito a **Fondi non depositati** per il totale del lotto e un accredito per ciascun fondo, usando il nome di ciascun fondo come nome del conto. Durante l'importazione QuickBooks ti chiede di associare questi nomi al tuo piano dei conti, quindi chiama i fondi come il tuo commercialista chiama i conti di entrata, oppure associali una volta sola durante l'importazione.

:::tip
Dai ai lotti nomi coerenti così sono facili da trovare in seguito. Includere la data e il tipo di colletta (ad esempio "Domenica mattina - 2025-02-09") mantiene il tuo elenco ordinato man mano che cresce.
:::

## Prossimi passi {#next-steps}

Una volta creato un lotto, consulta [Registrare le donazioni](recording-donations.md) per imparare ad aggiungervi le singole donazioni. Puoi anche [importare le transazioni Stripe](stripe-import.md) per creare automaticamente lotti dalle donazioni online.
