---
title: "Registrazione donazioni"
---

# Registrazione donazioni

<div class="article-intro">

La registrazione delle donazioni in B1 Admin viene effettuata attraverso il sistema dei lotti. Crei un lotto per rappresentare una raccolta (come un'offerta domenicale), quindi aggiungi singole donazioni a quel lotto. Questo mantiene i tuoi registri di donazioni organizzati e facili da riconciliare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi [fondi](funds.md) in modo da poter assegnare le donazioni alle categorie corrette
- Crea un [lotto](batches.md) per contenere le donazioni che stai per inserire
- Assicurati che i donatori siano nella tua [directory persone](../people/adding-people.md) in modo da poterli cercare quando inserisci le offerte

</div>

## Creazione di un lotto e aggiunta di donazioni

1. In **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Donazioni** e fai clic su **Lotti**.
2. Fai clic su **Aggiungi lotto** in alto nella pagina.
3. Inserisci un nome per il lotto (ad esempio, "Offerta domenicale - 5 gennaio") e seleziona la data. Fai clic su **Salva**.
4. Il tuo nuovo lotto appare nell'elenco mostrando zero donazioni e $0,00.
5. Fai clic sul **nome del lotto** per aprirlo.

## Inserimento di singole donazioni

1. Nella pagina dei dettagli del lotto, il pannello di inserimento delle donazioni appare accanto all'elenco delle donazioni. Sotto **Seleziona persona o anonimo**, digita il nome del donatore nel **campo di ricerca** per trovarlo, oppure fai clic su **Anonimo**. (Fare clic su **Aggiungi donazione** in alto nella pagina porta a questo pannello.)
2. Dopo aver selezionato una persona, il modulo di inserimento mostra i campi per **Data**, **Metodo** (Assegno, Contanti, Carta o In natura), **Fondo**, **Note**, **Importo** e **Numero assegno** (o **Ultime 4 cifre** per le donazioni con carta). Fai clic su **Cambia** accanto al nome del donatore per sceglierne un altro.
3. Compila i dettagli e fai clic su **Aggiungi donazione** (oppure premi Invio).
4. La donazione viene aggiunta all'elenco delle donazioni e il modulo si ripristina in modo da poter inserire quella successiva.

:::tip
Puoi inserire rapidamente più donazioni di seguito senza lasciare la pagina del lotto. Il modulo si ripristina dopo ogni voce in modo da poter scorrere efficientemente uno stack di assegni o buste.
:::

## Registrare un'offerta dalla scheda di una persona {#logging-a-gift-from-a-persons-record}

Per registrare una singola offerta senza aprire un lotto, apri la scheda del donatore in **Persone** e fai clic su **Registra un'offerta** (nel riepilogo delle donazioni, o nella vista delle donazioni della persona).

1. Imposta la **Data** e l'**Importo**.
2. Scegli il **Fondo** e il **Metodo** (Assegno, Contanti, Carta o In natura), e inserisci il **Numero assegno** o le **Ultime 4 cifre** se necessario.
3. Facoltativamente aggiungi le **Note**, quindi fai clic su **Salva**.

L'offerta viene salvata nel lotto di quella data. Se per quella data non esiste ancora un lotto, ne viene creato uno automaticamente, con il nome della data.

## Suddivisione di una donazione tra più fondi

A volte un singolo donatore dona più di un fondo in una transazione. Per gestire ciò:

1. Sotto il pannello di inserimento, fai clic sul link **editor completo della donazione** (oppure fai clic su **Modifica** sulla riga di una donazione esistente).
2. Nell'editor completo, aggiungi importi a fondi diversi. Il totale verrà calcolato automaticamente dagli importi dei fondi individuali.
3. Fai clic su **Salva** per aggiornare la donazione.

:::info
Suddividere le donazioni tra i fondi è comune quando un donatore scrive un assegno singolo destinato a scopi multipli, come Fondo generale e Missioni.
:::

## Modifica o rimozione di donazioni

Per modificare una donazione, fai clic sul pulsante **Modifica** sulla sua riga nel lotto. Puoi modificare la data, l'importo, il fondo, il metodo di pagamento o qualsiasi altro dettaglio. Fai clic su **Salva** al termine.

:::tip
La riga sotto il nome del lotto in alto nella pagina si aggiorna automaticamente per mostrare la data del lotto, il numero di offerte e l'importo in dollari combinato mentre aggiungi o modifichi le voci. Utilizzalo per riconciliare contro il tuo foglio di deposito.
:::

## Rimborso di una donazione

Se un donatore è stato addebitato per errore o richiede il rimborso del denaro, puoi rimborsare una donazione completata direttamente dalla sua schermata di modifica - non è necessario andare al dashboard del tuo gateway di pagamento.

1. Apri la donazione e fai clic su **Modifica**.
2. Fai clic sul pulsante **Rimborso** accanto a Elimina in fondo al modulo.
3. Conferma la finestra di dialogo: "Rimborsare completamente questa donazione tramite il gateway di pagamento? Questo non può essere annullato."

La donazione viene rimborsata integralmente tramite il gateway di pagamento originale e contrassegnata come **Rimborsata** negli elenchi delle donazioni.

:::warning
I rimborsi sono solo rimborsi completi - non c'è modo di rimborsare un importo parziale da B1 Admin. Inoltre, il rimborso non può essere annullato una volta confermato.
:::

:::info
Il pulsante **Rimborso** appare solo per le donazioni pagate online (hanno una transazione gateway) e che sono ancora nello stato **Completata**. Le donazioni inserite manualmente (contanti, assegno) non hanno una transazione gateway da rimborsare - modifica o elimina quelle invece.
:::

## Passaggi successivi

- Rivedi le tue voci utilizzando [Rapporti di donazione](donation-reports.md) per verificare l'accuratezza
- Alla fine dell'anno, genera [Estratti conto dei doni](giving-statements.md) per i tuoi donatori
