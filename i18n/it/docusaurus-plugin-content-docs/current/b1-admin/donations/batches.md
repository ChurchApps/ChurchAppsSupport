---
title: "Lotti di donazioni"
---

# Lotti di donazioni

<div class="article-intro">

I lotti raggruppano le tue donazioni per facilitarne il monitoraggio e la riconciliazione. Un lotto tipico rappresenta una singola raccolta, come l'offerta di una domenica o un evento speciale. Usare i lotti ti aiuta a restare organizzato e rende semplice verificare che le tue registrazioni corrispondano ai versamenti effettivi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati di aver [configurato i tuoi fondi](funds.md) in modo che siano disponibili quando registri le donazioni
- Ti serve il permesso **Visualizza riepiloghi delle donazioni**, **Modifica donazioni** o **Inserisci donazioni** per vedere la pagina Lotti (vedi [Chi può modificare un lotto](#who-can-change-a-batch))

</div>

## La pagina Lotti

Quando vai su **Donazioni > Lotti**, vedi l'elenco dei tuoi lotti. Ogni riga mostra:

- **Nome** -- l'etichetta che hai dato al lotto
- **Data** -- la data della raccolta
- **Donazioni** -- il numero di singole donazioni nel lotto
- **Totale** -- l'importo complessivo in denaro
- **Stato** -- **Aperto** o **Chiuso** (vedi [Chiudere e riaprire un lotto](#closing-and-reopening-a-batch))

Sopra l'elenco, i pulsanti degli anni ti permettono di mostrare solo i lotti di un anno, oppure tutti i lotti con **Tutti**. Una riga di riepilogo mostra il numero di lotti, il numero di doni e l'importo totale dei lotti visualizzati.

## Creare un nuovo lotto

1. Fai clic su **Aggiungi lotto** in cima alla pagina.
2. Inserisci un nome descrittivo (ad esempio "Offerta domenicale - 9 febbraio").
3. Seleziona la data della raccolta.
4. Fai clic su **Salva**.

Il tuo nuovo lotto compare nell'elenco, pronto per l'aggiunta delle donazioni.

## Lavorare con i lotti

- **Visualizzare le donazioni** -- fai clic sul nome di un lotto per aprirlo e vedere tutte le singole donazioni che contiene. Da lì puoi aggiungere, modificare o rimuovere donazioni.
- **Modificare i dettagli del lotto** -- fai clic sul pulsante **Modifica** nella riga di un lotto per cambiarne nome o data. Solo chi ha **Modifica donazioni** può eliminare un lotto.
- **Ordinare** -- usa le intestazioni delle colonne per ordinare i lotti per nome o data.
- **Esportare** -- fai clic su **Esporta** in cima alla pagina per scaricare i lotti visualizzati come foglio di calcolo (CSV).
- **Eventi falliti** -- se il tuo gateway di pagamento ha segnalato problemi, in cima alla pagina compare un pulsante **Eventi falliti** (con il numero di eventi non risolti). Fai clic per mostrare o nascondere l'elenco degli eventi sotto i lotti.
- **Importare da Stripe** -- fai clic su **Importa transazioni Stripe mancanti** in cima alla pagina per aprire lo strumento [Importazione da Stripe](stripe-import.md).

## Chiudere e riaprire un lotto {#closing-and-reopening-a-batch}

Una volta che un lotto è stato contato e versato, chiudilo in modo che le sue donazioni restino esattamente come erano quando l'hai chiuso.

1. Apri il lotto.
2. Fai clic su **Chiudi lotto** in cima alla pagina.

L'etichetta di stato accanto al nome del lotto passa da **Aperto** a **Chiuso**, il lotto mostra **Chiuso** nella colonna **Stato** della pagina Lotti, e un avviso in cima al lotto spiega che è chiuso. Mentre un lotto è chiuso, chi ha **Inserisci donazioni** può comunque visualizzarlo, ma non può aggiungere, modificare o eliminare le sue donazioni né cambiarne nome o data.

Per apportare di nuovo modifiche, apri il lotto e fai clic su **Riapri lotto**. I nuovi lotti partono sempre aperti.

:::info
Solo chi ha **Modifica donazioni** vede i pulsanti **Chiudi lotto** e **Riapri lotto**. Possono comunque modificare le donazioni in un lotto chiuso se serve una correzione, senza doverlo riaprire.
:::

## Chi può modificare un lotto {#who-can-change-a-batch}

Due [permessi del ruolo](../settings/roles-permissions.md) permettono a una persona di lavorare con i lotti:

- **Modifica donazioni** -- accesso completo: aggiungere ed eliminare lotti, chiuderli e riaprirli, e aggiungere, modificare o eliminare qualsiasi donazione, che il lotto sia aperto o chiuso.
- **Inserisci donazioni** -- per i team di conteggio e i volontari che registrano le offerte. Possono aggiungere lotti e aggiungere, modificare o eliminare donazioni, ma solo mentre il lotto è aperto. Non possono eliminare lotti, chiuderli o riaprirli, né modificare i doni arrivati tramite donazioni online.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi delle donazioni** vede **Donazioni** nel menu di B1 Admin, che porta direttamente alla pagina Lotti. Restano nascosti **Riepilogo**, **Fondi**, **Campagne** ed **Estratti conto delle donazioni**. Per aprire un lotto e vedere le donazioni che contiene, il ruolo deve avere anche **Visualizza donazioni**.

:::tip
Una configurazione comune è un ruolo "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, e un tesoriere con **Modifica donazioni** che chiude ogni lotto dopo aver riconciliato il versamento.
:::

## Stampare un lotto

Apri un lotto e fai clic su **Stampa** sopra l'elenco delle donazioni per stampare una copia cartacea per il team di conteggio o per le registrazioni dei versamenti. La stampa include:

- Il nome della tua chiesa, il nome del lotto e la data del lotto
- Ogni donazione del lotto, con il nome del donatore, il metodo, le note, la data e l'importo (le donazioni rimborsate sono barrate e contrassegnate come rimborsate)
- **Subtotali per fondo** -- il totale donato a ciascun fondo nel lotto
- **Totale del lotto** -- l'importo complessivo dell'intero lotto

Il pulsante **Stampa** compare solo quando il lotto contiene almeno una donazione.

### Stampare più lotti insieme

Per stampare tutti i lotti di un periodo in una volta sola -- ad esempio tutti i versamenti del mese scorso -- fai clic su **Stampa** in cima alla pagina **Lotti**, accanto a **Esporta**. Si apre la pagina **Stampa lotti** con una **Data di inizio** e una **Data di fine** che per impostazione predefinita coprono gli ultimi 30 giorni. Modifica una delle due date per scegliere un intervallo diverso.

Ogni lotto con data compresa nell'intervallo (incluse le date di inizio e fine) viene stampato in ordine cronologico, un lotto per pagina, con lo stesso layout di una stampa di un singolo lotto. I lotti senza donazioni vengono esclusi e, se nessun lotto nell'intervallo contiene donazioni, vedrai il messaggio "Nessun lotto con donazioni in questo intervallo di date." Fai clic su **Stampa** per aprire la finestra di stampa del browser, oppure su **Chiudi** per tornare all'elenco dei lotti.

## Esportare un lotto verso QuickBooks Online

Apri un lotto e fai clic su **Esporta per QuickBooks** per scaricare il lotto come voce di registro contabile che QuickBooks Online può importare (**Impostazioni > Importa dati > Voci di registro**). Il file contiene un addebito a **Fondi non depositati** per il totale del lotto e un accredito per ogni fondo, usando il nome di ciascun fondo come nome del conto. Durante l'importazione QuickBooks ti chiede di associare quei nomi al tuo piano dei conti, quindi dai ai tuoi fondi lo stesso nome che il tuo contabile usa per i conti di entrata, oppure associali una volta sola in fase di importazione.

:::tip
Dai ai tuoi lotti nomi coerenti, così sono facili da ritrovare in seguito. Includere la data e il tipo di raccolta (ad esempio "Domenica mattina - 2025-02-09") mantiene l'elenco ordinato man mano che cresce.
:::

## Passi successivi

Una volta creato un lotto, consulta [Registrare le donazioni](recording-donations.md) per imparare ad aggiungere le singole donazioni al lotto. Puoi anche [importare le transazioni Stripe](stripe-import.md) per creare automaticamente lotti dalle donazioni online.
