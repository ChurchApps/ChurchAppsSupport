---
title: "Registrare le donazioni"
---

# Registrare le donazioni

<div class="article-intro">

Registrare le donazioni in B1 Admin avviene tramite il sistema dei Lotti (Batches). Crei un lotto che rappresenta una raccolta (come un'offerta domenicale), quindi aggiungi le singole donazioni a quel lotto. In questo modo i registri delle offerte restano ordinati e facili da riconciliare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi](funds.md) in modo da poter assegnare le donazioni alle categorie corrette
- Crea un [lotto](batches.md) che conterrà le donazioni che stai per inserire
- Assicurati che i donatori siano nella tua [rubrica delle persone](../people/adding-people.md), così potrai cercarli quando inserisci le offerte
- Ti servono **Modifica donazioni**, oppure **Inserisci donazioni** insieme a **Visualizza donazioni**, per inserire offerte in un lotto (vedi [Chi può modificare un lotto](batches.md#who-can-change-a-batch))

</div>

## Creare un lotto e aggiungere donazioni

1. In **B1 Admin**, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Donazioni** e clicca su **Lotti**.
2. Clicca su **Aggiungi lotto** in cima alla pagina.
3. Inserisci un nome per il lotto (ad esempio "Offerta domenicale - 5 gennaio") e seleziona la data. Clicca su **Salva**.
4. Il nuovo lotto compare nell'elenco con zero donazioni e 0,00 $.
5. Clicca sul **nome del lotto** per aprirlo.

## Inserire le singole donazioni

1. Nella pagina di dettaglio del lotto, il pannello di inserimento delle donazioni compare accanto all'elenco delle donazioni. In **Seleziona persona o Anonimo**, digita il nome del donatore nel campo di ricerca per trovarlo, oppure clicca su **Anonimo**. (Cliccare su **Aggiungi donazione** in cima alla pagina porta direttamente a questo pannello.)
2. Dopo aver selezionato una persona, il modulo di inserimento mostra i campi **Data**, **Metodo** (Assegno, Contanti, Carta o In natura), **Fondo**, **Note**, **Importo** e **N. assegno** (oppure **Ultime 4 cifre** per le donazioni con carta, o **Articolo** per descrivere una donazione in natura). Clicca su **Cambia** accanto al nome del donatore per sceglierne un altro.
3. Compila i dettagli e clicca su **Aggiungi donazione** (oppure premi Invio).
4. La donazione viene aggiunta all'elenco e il modulo si azzera, così puoi inserire la successiva.

:::info
Se il lotto è stato [chiuso](batches.md#closing-and-reopening-a-batch), il pannello di inserimento e i link **Modifica** sono nascosti per chi non dispone del permesso **Modifica donazioni**, e in cima al lotto compare un avviso che indica che è chiuso. Chiedi a qualcuno con il permesso **Modifica donazioni** di riaprirlo.
:::

:::tip
Puoi inserire rapidamente più donazioni di seguito senza lasciare la pagina del lotto. Il modulo si azzera dopo ogni inserimento, così puoi scorrere rapidamente una pila di assegni o di buste.
:::

## Importare le donazioni da un file CSV {#importing-donations-from-a-csv-file}

Se le tue donazioni sono già in un foglio di calcolo -- ad esempio un'esportazione da un altro sistema di gestione delle offerte o il foglio di conteggio di un team -- puoi importarle in un lotto invece di digitarle una per una.

1. Apri il lotto e clicca su **Importa CSV** in cima alla pagina. (Il pulsante compare quando puoi modificare il lotto e la tua chiesa ha almeno un [fondo](funds.md).)
2. Clicca su **Scegli file CSV** e seleziona il tuo file. Il file deve avere una riga di intestazione, e le colonne possono essere in qualsiasi ordine:
   - **Amount** (obbligatoria; funziona anche `Total`) -- I simboli di valuta e le virgole vengono ignorati, quindi `$1,250.00` va bene. L'importo deve essere maggiore di zero.
   - **Date** -- Usa un formato come `2026-10-25` o `10/25/2026`. Se è vuota, viene usata la data del lotto.
   - **Fund** -- Il nome del fondo, confrontato senza distinzione tra maiuscole e minuscole. Se è vuota, viene usato il tuo primo fondo.
   - **Method** -- **Check**, **Cash**, **Card** oppure **In-Kind**. Se è vuota, viene usato **Check**.
   - **Check Number** -- Il numero dell'assegno (o altro dettaglio del pagamento).
   - **Notes**
   - **Email**, **Name**, oppure **First Name** e **Last Name** -- Usate per associare il donatore a una persona nel database. Un nome scritto come "Smith, John" viene letto come "John Smith".
3. Controlla l'anteprima. Ogni riga mostra il numero di riga, il donatore indicato nel file, la **Corrispondenza**, il fondo e l'importo:
   - Il nome di una persona significa che il donatore è stato associato. B1 cerca prima per email, poi per nome esatto, e solo quando corrisponde una sola persona.
   - **Non trovato — anonimo** significa che non è stata trovata una corrispondenza univoca. La donazione viene importata come anonima e alle sue note viene aggiunto "Importato come:" con il nome del donatore, così potrai assegnarla in seguito.
   - Un messaggio in rosso come **Importo non valido**, **Fondo sconosciuto**, **Metodo sconosciuto** o **Data non valida** significa che quella riga verrà saltata. Correggi il file e selezionalo di nuovo per includerla.
4. Clicca su **Importa** (il pulsante indica quante righe verranno importate). Le donazioni vengono aggiunte al lotto.

:::tip
Dopo l'importazione, usa **Modifica** su qualsiasi donazione anonima per scegliere la persona giusta. La nota "Importato come:" indica chi il file riportava come mittente.
:::

## Registrare un'offerta dalla scheda di una persona

Per registrare una singola offerta senza aprire un lotto, apri la scheda del donatore in **Persone** e clicca su **Registra un'offerta** (nel riepilogo delle donazioni, oppure nella vista delle donazioni della persona).

1. Imposta la **Data** e l'**Importo**.
2. Scegli il **Fondo** e il **Metodo** (Assegno, Contanti, Carta o In natura), e inserisci il **N. assegno**, le **Ultime 4 cifre** o l'**Articolo** (per le donazioni in natura) se necessario.
3. Facoltativamente aggiungi le **Note**, poi clicca su **Salva**.

L'offerta viene salvata nel lotto di quella data. Se per quella data non esiste ancora un lotto, ne viene creato uno automaticamente, con il nome della data.

## Dividere una donazione tra più fondi

A volte un donatore, con una sola transazione, offre a più di un fondo. Per gestire questo caso:

1. Sotto il pannello di inserimento, clicca sul link **editor completo della donazione** (oppure clicca su **Modifica** nella riga di una donazione esistente).
2. Nell'editor completo, aggiungi gli importi ai diversi fondi. Il totale viene calcolato automaticamente a partire dagli importi dei singoli fondi.
3. Clicca su **Salva** per aggiornare la donazione.

:::info
Dividere le donazioni tra più fondi è comune quando un donatore scrive un unico assegno destinato a più scopi, ad esempio il Fondo generale e le Missioni.
:::

## Modificare o rimuovere le donazioni

Per modificare una donazione, clicca sul pulsante **Modifica** nella sua riga all'interno del lotto. Puoi cambiare la data, l'importo, il fondo, il metodo di pagamento (Assegno, Contanti, Carta o In natura) o qualsiasi altro dettaglio. Per una donazione in natura, l'editor etichetta il campo di dettaglio come **Articolo**, così puoi descrivere ciò che è stato donato. Clicca su **Salva** quando hai finito.

:::tip
La riga sotto il nome del lotto in cima alla pagina si aggiorna automaticamente e mostra la data del lotto, il numero di offerte e l'importo complessivo in dollari man mano che aggiungi o modifichi le voci. Usala per riconciliare con la distinta di versamento.
:::

## Rimborsare una donazione

Se un donatore è stato addebitato per errore o chiede la restituzione del denaro, puoi rimborsare una donazione completata direttamente dalla sua schermata di modifica -- senza bisogno di accedere alla dashboard del tuo gateway di pagamento.

1. Apri la donazione e clicca su **Modifica**.
2. Clicca sul pulsante **Rimborsa**, accanto a Elimina in fondo al modulo.
3. Conferma la finestra di dialogo: "Rimborsare questa donazione per intero tramite il gateway di pagamento? L'operazione non può essere annullata."

La donazione viene rimborsata per intero tramite il gateway di pagamento originale e contrassegnata come **Rimborsata** negli elenchi delle donazioni.

:::warning
I rimborsi sono solo integrali -- da B1 Admin non è possibile rimborsare un importo parziale. Inoltre, il rimborso non può essere annullato una volta confermato.
:::

:::info
Il pulsante **Rimborsa** compare solo per le donazioni pagate online (che hanno una transazione sul gateway) e ancora in stato **Completata**. Le donazioni inserite manualmente (contanti, assegno) non hanno una transazione sul gateway da rimborsare -- in quel caso modificale o eliminale.
:::

## Stampare una ricevuta per una singola offerta

Quando qualcuno consegna un assegno, paga un evento o una maglietta, oppure un'organizzazione ospite porta una donazione, puoi stampare una ricevuta solo per quella offerta, invece di stampare un intero lotto o un estratto conto di fine anno.

1. Apri il lotto che contiene la donazione.
2. Clicca su **Ricevuta** accanto a **Modifica** nella riga della donazione. Puoi anche cliccare su **Ricevuta** in fondo al modulo Modifica donazione.
3. Clicca su **Stampa**, oppure su **Chiudi** per tornare indietro.

La ricevuta usa lo stesso layout dell'estratto conto delle donazioni: la tua chiesa e il donatore (oppure "Anonimo"), la data e il metodo dell'offerta, ciascun fondo e importo, la nota, la tua **Nota per le donazioni** e il blocco ufficiale della ricevuta, se hai impostato un **Formato dell'estratto conto** (vedi [Estratti conto delle donazioni](giving-statements.md)). Il numero della ricevuta in quel blocco è l'ID della donazione.

:::info
La dicitura "nessun bene o servizio" viene stampata solo quando ogni fondo dell'offerta è contrassegnato come deducibile dalle tasse. Se una parte dell'offerta è andata a un fondo non deducibile, come una quota per un evento o un acquisto, la ricevuta non riporta quella dicitura, così appare come un pagamento e non come un'offerta benefica.
:::

:::tip
Le donazioni online ricevono già un'email di ringraziamento automatica, quindi la ricevuta è utile soprattutto per le offerte inserite a mano.
:::

## Passaggi successivi

- Verifica le tue registrazioni usando i [Report delle donazioni](donation-reports.md) per controllarne l'accuratezza
- A fine anno, genera gli [Estratti conto delle donazioni](giving-statements.md) per i tuoi donatori
