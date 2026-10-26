---
title: "Registrare le donazioni"
---

# Registrare le donazioni

<div class="article-intro">

In B1 Admin, la registrazione delle donazioni avviene tramite il sistema dei Lotti (Batches). Si crea un lotto che rappresenta una raccolta (ad esempio un'offerta domenicale), quindi si aggiungono le singole donazioni a quel lotto. In questo modo i registri delle offerte restano ordinati e facili da riconciliare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi](funds.md) in modo da poter assegnare le donazioni alle categorie corrette
- Crea un [lotto](batches.md) che conterrà le donazioni che stai per inserire
- Assicurati che i donatori siano presenti nella tua [rubrica persone](../people/adding-people.md) in modo da poterli cercare al momento dell'inserimento
- Per inserire offerte in un lotto ti serve l'autorizzazione **Modifica donazioni**, oppure **Inserisci donazioni** insieme a **Visualizza donazioni** (vedi [Chi può modificare un lotto](batches.md#who-can-change-a-batch))

</div>

## Creare un lotto e aggiungere donazioni

1. In **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Donations** e fai clic su **Batches**.
2. Fai clic su **Add Batch** in cima alla pagina.
3. Inserisci un nome per il lotto (ad esempio "Offerta domenicale - 5 gennaio") e seleziona la data. Fai clic su **Save**.
4. Il nuovo lotto compare nell'elenco con zero donazioni e 0,00 $.
5. Fai clic sul **nome del lotto** per aprirlo.

## Inserire le singole donazioni

1. Nella pagina di dettaglio del lotto, il pannello di inserimento delle donazioni compare accanto all'elenco delle donazioni. In **Seleziona persona o Anonimo**, digita il nome del donatore nel campo di ricerca per trovarlo, oppure fai clic su **Anonymous**. (Fare clic su **Add Donation** in cima alla pagina porta direttamente a questo pannello.)
2. Dopo aver selezionato una persona, il modulo di inserimento mostra i campi **Date**, **Method** (Check, Cash, Card o In-Kind), **Fund**, **Notes**, **Amount** e **Check #** (oppure **Last 4 digits** per le donazioni con carta, o **Item** per descrivere una donazione in natura). Fai clic su **Change** accanto al nome del donatore per sceglierne un altro.
3. Compila i dettagli e fai clic su **Add Donation** (oppure premi Invio).
4. La donazione viene aggiunta all'elenco e il modulo si azzera, così puoi inserire la successiva.

:::info
Se il lotto è stato [chiuso](batches.md#closing-and-reopening-a-batch), il pannello di inserimento e i link **Edit** sono nascosti per chi non dispone dell'autorizzazione **Modifica donazioni**, e in cima al lotto compare un avviso che indica che è chiuso. Chiedi a qualcuno con l'autorizzazione **Modifica donazioni** di riaprirlo.
:::

:::tip
Puoi inserire rapidamente più donazioni di seguito senza lasciare la pagina del lotto. Il modulo si azzera dopo ogni inserimento, così puoi scorrere rapidamente una pila di assegni o di buste.
:::

## Importare le donazioni da un file CSV {#importing-donations-from-a-csv-file}

Se le tue donazioni sono già in un foglio di calcolo -- ad esempio un'esportazione da un altro sistema di gestione delle offerte o il foglio di conteggio di un team -- puoi importarle in un lotto invece di digitarle una per una.

1. Apri il lotto e fai clic su **Import CSV** in cima alla pagina. (Il pulsante compare quando puoi modificare il lotto e la tua chiesa ha almeno un [fondo](funds.md).)
2. Fai clic su **Choose CSV File** e seleziona il file. Il file deve avere una riga di intestazione e le colonne possono essere in qualsiasi ordine:
   - **Amount** (obbligatoria; funziona anche `Total`) -- I simboli di valuta e le virgole vengono ignorati, quindi `$1,250.00` va bene. L'importo deve essere maggiore di zero.
   - **Date** -- Usa un formato come `2026-10-25` o `10/25/2026`. Se è vuota, viene usata la data del lotto.
   - **Fund** -- Il nome del fondo, confrontato senza distinzione tra maiuscole e minuscole. Se è vuota, viene usato il primo fondo.
   - **Method** -- **Check**, **Cash**, **Card** o **In-Kind**. Se è vuota, viene usato **Check**.
   - **Check Number** -- Il numero dell'assegno (o altro dettaglio del pagamento).
   - **Notes**
   - **Email**, **Name**, oppure **First Name** e **Last Name** -- Usati per associare il donatore a una persona nel database. Un nome scritto come "Smith, John" viene letto come "John Smith".
3. Controlla l'anteprima. Ogni riga mostra il numero di riga, il donatore indicato nel file, la **Match**, il fondo e l'importo:
   - Il nome di una persona significa che il donatore è stato associato. B1 cerca prima per email, poi per nome esatto, e solo quando corrisponde esattamente una persona.
   - **Not found — anonymous** significa che non è stata trovata una corrispondenza univoca. La donazione viene importata come anonima e alle sue note viene aggiunto "Imported as:" con il nome del donatore, così potrai assegnarla in seguito.
   - Un messaggio in rosso come **Invalid amount**, **Unknown fund**, **Unknown method** o **Invalid date** significa che la riga verrà saltata. Correggi il file e selezionalo di nuovo per includerla.
4. Fai clic su **Import** (il pulsante indica quante righe verranno importate). Le donazioni vengono aggiunte al lotto.

:::tip
Dopo l'importazione, usa **Edit** su una donazione anonima per scegliere la persona corretta. La nota "Imported as:" indica chi era il mittente secondo il file.
:::

## Registrare un'offerta dalla scheda di una persona

Per registrare una singola offerta senza aprire un lotto, apri la scheda del donatore in **People** e fai clic su **Log a gift** (nel riepilogo delle offerte, o nella vista offerte della persona).

1. Imposta la **Date** e l'**Amount**.
2. Scegli il **Fund** e il **Method** (Check, Cash, Card o In-Kind), e inserisci il **Check #**, le **Last 4 digits** o l'**Item** (per le donazioni in natura) se necessario.
3. Facoltativamente aggiungi le **Notes**, quindi fai clic su **Save**.

L'offerta viene salvata nel lotto di quella data. Se per quella data non esiste ancora un lotto, ne viene creato uno automaticamente, con il nome della data.

## Dividere una donazione tra più fondi

A volte un donatore, con una sola transazione, offre a più di un fondo. Per gestire questo caso:

1. Sotto il pannello di inserimento, fai clic sul link **full donation editor** (oppure fai clic su **Edit** nella riga di una donazione esistente).
2. Nell'editor completo, aggiungi gli importi ai diversi fondi. Il totale viene calcolato automaticamente a partire dagli importi dei singoli fondi.
3. Fai clic su **Save** per aggiornare la donazione.

:::info
Dividere le donazioni tra più fondi è comune quando un donatore scrive un unico assegno destinato a più scopi, ad esempio il Fondo generale e le Missioni.
:::

## Modificare o rimuovere le donazioni

Per modificare una donazione, fai clic sul pulsante **Edit** nella sua riga all'interno del lotto. Puoi cambiare la data, l'importo, il fondo, il metodo di pagamento (Check, Cash, Card o In-Kind) o qualsiasi altro dettaglio. Per una donazione in natura, l'editor etichetta il campo di dettaglio come **Item**, così puoi descrivere ciò che è stato donato. Fai clic su **Save** quando hai finito.

:::tip
La riga sotto il nome del lotto, in cima alla pagina, si aggiorna automaticamente mostrando la data del lotto, il numero di offerte e l'importo complessivo man mano che aggiungi o modifichi le voci. Usala per riconciliare con la distinta di versamento.
:::

## Rimborsare una donazione

Se un donatore è stato addebitato per errore o chiede la restituzione del denaro, puoi rimborsare una donazione completata direttamente dalla sua schermata di modifica -- senza bisogno di accedere alla dashboard del tuo gateway di pagamento.

1. Apri la donazione e fai clic su **Edit**.
2. Fai clic sul pulsante **Refund**, accanto a Delete in fondo al modulo.
3. Conferma la finestra di dialogo: "Refund this donation in full through the payment gateway? This cannot be undone."

La donazione viene rimborsata integralmente tramite il gateway di pagamento originale e contrassegnata come **Refunded** negli elenchi delle donazioni.

:::warning
I rimborsi sono solo integrali -- da B1 Admin non è possibile rimborsare un importo parziale. Inoltre, il rimborso non può essere annullato una volta confermato.
:::

:::info
Il pulsante **Refund** compare solo per le donazioni pagate online (che hanno una transazione sul gateway) e ancora in stato **Complete**. Le donazioni inserite manualmente (contanti, assegno) non hanno una transazione sul gateway da rimborsare -- in quel caso modificale o eliminale.
:::

## Passaggi successivi

- Verifica le tue registrazioni usando i [Report sulle donazioni](donation-reports.md) per controllarne l'accuratezza
- A fine anno, genera gli [Estratti conto delle offerte](giving-statements.md) per i tuoi donatori
