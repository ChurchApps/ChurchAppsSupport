---
title: "Registrare le donazioni"
description: "Registra le donazioni della chiesa in B1 Admin creando un lotto, inserendo le offerte una alla volta, importando un CSV oppure registrando una singola offerta dal profilo di un donatore."
---

# Registrare le donazioni {#recording-donations}

<div class="article-intro">

In B1 Admin la registrazione delle donazioni avviene tramite il sistema dei Lotti. Crei un lotto che rappresenta una colletta (come l'offerta di una domenica), poi aggiungi a quel lotto le singole donazioni. Così i tuoi registri restano organizzati e facili da riconciliare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi](funds.md) così puoi assegnare le donazioni alle categorie corrette
- Crea un [lotto](batches.md) che conterrà le donazioni che stai per inserire
- Assicurati che i donatori siano nella tua [rubrica persone](../people/adding-people.md) così puoi cercarli quando inserisci le offerte
- Ti serve **Modifica donazioni**, oppure **Inserisci donazioni** insieme a **Visualizza donazioni**, per inserire offerte in un lotto (vedi [Chi può modificare un lotto](batches.md#who-can-change-a-batch))

</div>

## Creare un lotto e aggiungere donazioni {#creating-a-batch-and-adding-donations}

1. In **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Donazioni** e fai clic su **Lotti**.
2. Fai clic su **Aggiungi lotto** in cima alla pagina.
3. Inserisci un nome per il lotto (ad esempio "Offerta domenicale - 5 gen") e seleziona la data. Fai clic su **Salva**.
4. Il tuo nuovo lotto compare nell'elenco con zero donazioni e 0,00 $.
5. Fai clic sul **nome del lotto** per aprirlo.

## Inserire le singole donazioni {#entering-individual-donations}

1. Nella pagina di dettaglio del lotto, il pannello di inserimento delle donazioni compare accanto all'elenco delle donazioni. Sotto **Seleziona persona o anonimo**, digita il nome del donatore nel campo di ricerca per trovarlo, oppure fai clic su **Anonimo**. (Facendo clic su **Aggiungi donazione** in cima alla pagina si scorre fino a questo pannello.)
2. Dopo aver selezionato una persona, il modulo di inserimento mostra i campi **Data** (che parte dalla data del lotto), **Metodo** (Assegno, Contanti, Carta o In natura), **Fondo** (mostrato quando la tua chiesa ha più di un fondo), **Memo (compare sulla ricevuta)**, **Note (interne)**, **Importo** e **Assegno n.** (oppure **Ultime 4 cifre** per le offerte con carta, oppure **Oggetto** per descrivere un'offerta in natura; le offerte in contanti non hanno un campo di dettaglio). Fai clic su **Cambia** accanto al nome del donatore per sceglierne un altro.
3. Compila i dettagli e fai clic su **Aggiungi donazione** (oppure premi Invio). Se l'importo è vuoto o pari a zero, il modulo ti chiede di inserire un importo maggiore di zero invece di salvare.
4. La donazione viene aggiunta all'elenco e il modulo si azzera così puoi inserire la successiva. Data, metodo, fondo, memo e note restano come li hai impostati, quindi una pila di assegni simili richiede solo il donatore, l'importo e il numero dell'assegno.

La **Data** parte sempre dalla data del lotto quando apri un lotto. Se la cambi, la nuova data viene riportata sulla donazione successiva che inserisci in quel lotto -- nel pannello di inserimento e nell'editor completo delle donazioni -- finché non la cambi di nuovo o non esci dal lotto.

:::tip Memo o Note?
Il **Memo** viene stampato sulla ricevuta del donatore, accanto all'offerta. Usalo per ciò che il donatore deve vedere, come lo scopo di un'offerta destinata a qualcosa ("Viaggio dei giovani"). Le **Note** sono solo per il tuo staff e non vengono mai stampate. Quando qualcuno dona online, ciò che scrive nella casella memo del modulo di donazione viene salvato come memo dell'offerta.
:::

:::info
Se il lotto è stato [chiuso](batches.md#closing-and-reopening-a-batch), il pannello di inserimento e i link **Modifica** sono nascosti per chi non ha **Modifica donazioni**, e un avviso in cima al lotto indica che è chiuso. Chiedi a chi ha **Modifica donazioni** di riaprirlo.
:::

:::tip
Puoi inserire rapidamente più donazioni di seguito senza uscire dalla pagina del lotto. Il modulo si azzera dopo ogni inserimento, così puoi scorrere una pila di assegni o di buste in modo efficiente.
:::

## Importare le donazioni da un file CSV {#importing-donations-from-a-csv-file}

Se le tue donazioni sono già in un foglio di calcolo -- ad esempio un'esportazione da un altro sistema di donazioni o il foglio di conteggio di un team -- puoi importarle in un lotto invece di digitarle una per una.

1. Apri il lotto e fai clic su **Importa CSV** in cima alla pagina. (Il pulsante compare quando puoi modificare il lotto e la tua chiesa ha almeno un [fondo](funds.md).)
2. Fai clic su **Scegli file CSV** e seleziona il tuo file. Il file deve avere una riga di intestazione, e le colonne possono essere in qualsiasi ordine:
   - **Importo** (obbligatorio; funziona anche `Total`) -- I simboli di valuta e le virgole vengono ignorati, quindi `$1,250.00` va bene. L'importo deve essere maggiore di zero.
   - **Data** -- Usa un formato come `2026-10-25` oppure `10/25/2026`. Se è vuota, viene usata la data del lotto.
   - **Fondo** -- Il nome del fondo, abbinato senza distinguere maiuscole e minuscole. Se è vuoto, viene usato il tuo primo fondo.
   - **Metodo** -- **Assegno**, **Contanti**, **Carta** o **In natura**. Se è vuoto, viene usato **Assegno**.
   - **Numero assegno** -- Il numero dell'assegno (o altro dettaglio del pagamento).
   - **Note**
   - **Email**, **Nome**, oppure **Nome** e **Cognome** -- Usati per abbinare il donatore a qualcuno nel tuo database. Un nome scritto come "Rossi, Mario" viene letto come "Mario Rossi".
3. Controlla l'anteprima. Ogni riga mostra il suo numero di riga, il donatore indicato nel file, la **Corrispondenza**, il fondo e l'importo:
   - Un nome di persona significa che il donatore è stato abbinato. B1 abbina prima per email, poi per nome esatto, e solo quando corrisponde esattamente una persona.
   - **Non trovato — anonimo** significa che non è stata trovata una corrispondenza univoca. L'offerta viene importata come anonima e alle sue note viene aggiunto "Importato come:" con il nome del donatore, così puoi assegnarla in seguito.
   - Un messaggio in rosso come **Importo non valido**, **Fondo sconosciuto**, **Metodo sconosciuto** oppure **Data non valida** significa che quella riga verrà saltata. Correggi il file e selezionalo di nuovo per includerla.
4. Fai clic su **Importa** (il pulsante mostra quante righe verranno importate). Le donazioni vengono aggiunte al lotto.

:::tip
Dopo l'importazione, usa **Modifica** su qualsiasi donazione anonima per scegliere la persona giusta. La nota "Importato come:" ti indica chi il file diceva fosse il donatore.
:::

## Registrare un'offerta dalla scheda di una persona {#logging-a-gift-from-a-persons-record}

Per registrare una singola offerta senza aprire un lotto, apri la scheda del donatore in **Persone** e fai clic su **Registra un'offerta** (nel riepilogo delle donazioni, oppure nella vista delle donazioni della persona).

1. Imposta la **Data** e l'**Importo**.
2. Scegli il **Fondo** e il **Metodo** (Assegno, Contanti, Carta o In natura), e inserisci il **Numero assegno**, le **Ultime 4 cifre** o l'**Oggetto** (per le offerte in natura) se necessario.
3. Facoltativamente aggiungi **Note**, poi fai clic su **Salva**.

L'offerta viene salvata nel lotto di quella data. Se non esiste ancora un lotto per quella data, ne viene creato uno automaticamente, con il nome della data.

## Dividere una donazione tra più fondi {#splitting-a-donation-across-multiple-funds}

A volte un singolo donatore dona a più di un fondo in un'unica transazione. Per gestire questo caso:

1. Sotto il pannello di inserimento, fai clic sul link **editor completo delle donazioni** (oppure fai clic su **Modifica** sulla riga di una donazione esistente). Una nuova offerta parte dalla data del lotto.
2. Nell'editor completo, inserisci un importo e un fondo, poi fai clic su **Aggiungi altro** per aggiungere un altro fondo e un altro importo. Il totale viene calcolato dagli importi dei singoli fondi.
3. Fai clic su **Salva**. Un'offerta senza importo in nessun fondo non viene salvata; l'editor chiede un importo maggiore di zero.

:::info
Dividere le donazioni tra più fondi è comune quando un donatore scrive un unico assegno destinato a più scopi, come il Fondo generale e le Missioni.
:::

## Modificare o rimuovere donazioni {#editing-or-removing-donations}

Per modificare una donazione, fai clic sul pulsante **Modifica** sulla sua riga nel lotto. Puoi cambiare la data, l'importo, il fondo, il metodo di pagamento (Assegno, Contanti, Carta o In natura) o qualsiasi altro dettaglio, incluso il **Memo** e le **Note**. Per un'offerta in natura, l'editor etichetta il campo di dettaglio come **Oggetto** così puoi descrivere cosa è stato donato. Fai clic su **Salva** quando hai finito.

### Spostare un'offerta in un altro lotto {#moving-a-gift-to-another-batch}

Se un'offerta è stata inserita nel lotto sbagliato, puoi spostarla invece di eliminarla e digitarla di nuovo:

1. Fai clic su **Modifica** sulla riga della donazione.
2. Nel menu a tendina **Lotto**, scegli il lotto in cui deve stare. L'elenco mostra la data e il nome di ogni lotto, dal più recente. I lotti chiusi non sono elencati, tranne il lotto attuale dell'offerta.
3. Fai clic su **Salva**.

L'offerta esce dal lotto attuale e compare in quello scelto, e i totali di entrambi i lotti si aggiornano. Spostare un'offerta è una modifica, quindi non avvia un [flusso di lavoro](../serving/workflows.md#triggers) **Donazione · Creata** come accadrebbe se la inserissi di nuovo.

:::tip
La riga sotto il nome del lotto in cima alla pagina si aggiorna automaticamente e mostra la data del lotto, il numero di offerte e l'importo complessivo in dollari man mano che aggiungi o modifichi le voci. Usala per riconciliare con la distinta di versamento.
:::

## Rimborsare una donazione {#refunding-a-donation}

Se un donatore è stato addebitato per errore o chiede la restituzione del denaro, puoi rimborsare una donazione completata direttamente dalla sua schermata di modifica, senza andare nella dashboard del tuo gateway di pagamento.

1. Apri la donazione e fai clic su **Modifica**.
2. Fai clic sul pulsante **Rimborsa** accanto a Elimina in fondo al modulo.
3. Conferma la finestra: "Rimborsare questa donazione per intero tramite il gateway di pagamento? Questa operazione non può essere annullata."

La donazione viene rimborsata integralmente tramite il gateway di pagamento originale e contrassegnata come **Rimborsata** negli elenchi delle donazioni.

:::warning
I rimborsi sono solo totali -- non c'è modo di rimborsare un importo parziale da B1 Admin. Inoltre il rimborso non può essere annullato una volta confermato.
:::

:::info
Il pulsante **Rimborsa** compare solo per le donazioni pagate online (che hanno una transazione sul gateway) e che sono ancora in stato **Completata**. Le donazioni inserite manualmente (contanti, assegno) non hanno una transazione sul gateway da rimborsare -- modificale o eliminale.
:::

## Stampare una ricevuta per una singola offerta {#printing-a-receipt-for-one-gift}

Quando qualcuno consegna un assegno, paga un evento o una maglietta, oppure un'organizzazione in visita porta una donazione, puoi stampare una ricevuta solo per quell'offerta invece di un intero lotto o di una ricevuta di fine anno.

1. Apri il lotto che contiene la donazione.
2. Fai clic su **Ricevuta** accanto a **Modifica** sulla riga della donazione. Puoi anche fare clic su **Ricevuta** in fondo al modulo Modifica donazione.
3. Fai clic su **Stampa**, oppure su **Chiudi** per tornare indietro.

La ricevuta usa lo stesso layout della ricevuta di donazione: la tua chiesa e il donatore (oppure "Anonimo"), la data e il metodo dell'offerta, ogni fondo e importo, il memo dell'offerta (se ne ha uno), la tua Nota sulle donazioni e il blocco della ricevuta ufficiale se hai impostato un **Formato ricevuta** (vedi [Ricevute di donazione](giving-statements.md)). Il numero di ricevuta in quel blocco è l'ID della donazione.

:::info
La dicitura "nessun bene o servizio" viene stampata solo quando ogni fondo dell'offerta è contrassegnato come fiscalmente deducibile. Se una parte dell'offerta è andata a un fondo non deducibile, come una quota di partecipazione a un evento o un acquisto, la ricevuta non riporta quella dicitura, così appare come un pagamento anziché come un'offerta benefica.
:::

:::tip
Le offerte online ricevono già un'email di ringraziamento automatica, quindi la ricevuta è utile soprattutto per le offerte inserite a mano.
:::

## Prossimi passi {#next-steps}

- Verifica le tue registrazioni usando i [Report sulle donazioni](donation-reports.md) per controllarne l'accuratezza
- A fine anno, genera le [Ricevute di donazione](giving-statements.md) per i tuoi donatori
