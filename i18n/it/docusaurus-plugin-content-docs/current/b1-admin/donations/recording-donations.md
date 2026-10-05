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
2. Fai clic su **Aggiungi lotto**.
3. Inserisci un nome per il lotto (ad esempio, "Offerta domenicale - 5 gennaio") e seleziona la data. Fai clic su **Salva**.
4. Il tuo nuovo lotto appare nell'elenco mostrando zero donazioni e $0,00.
5. Fai clic sul **nome del lotto** per aprirlo.

## Inserimento di singole donazioni

1. Nella pagina dei dettagli del lotto, digita il nome del donatore nel **campo di ricerca** per trovarlo.
2. Dopo aver selezionato una persona, appare il modulo di inserimento della donazione con campi per **Data**, **Metodo di pagamento**, **Fondo**, **Importo** e **Numero di assegno**.
3. Compila i dettagli e fai clic su **Aggiungi donazione**.
4. La donazione viene aggiunta alla tabella sottostante e il modulo si ripristina in modo da poter inserire quella successiva.

:::tip
Puoi inserire rapidamente più donazioni di seguito senza lasciare la pagina del lotto. Il modulo si ripristina dopo ogni voce in modo da poter scorrere efficientemente uno stack di assegni o buste.
:::

## Suddivisione di una donazione tra più fondi

A volte un singolo donatore dona più di un fondo in una transazione. Per gestire ciò:

1. Fai clic sul pulsante **Modifica** sulla riga di donazione.
2. Nel modulo di modifica, aggiungi importi a fondi diversi. Il totale verrà calcolato automaticamente dagli importi dei fondi individuali.
3. Fai clic su **Salva** per aggiornare la donazione.

:::info
Suddividere le donazioni tra i fondi è comune quando un donatore scrive un assegno singolo destinato a scopi multipli, come Fondo generale e Missioni.
:::

## Modifica o rimozione di donazioni

Per modificare una donazione, fai clic sul pulsante **Modifica** sulla sua riga nel lotto. Puoi modificare la data, l'importo, il fondo, il metodo di pagamento o qualsiasi altro dettaglio. Fai clic su **Salva** al termine.

:::tip
L'intestazione della pagina del lotto si aggiorna automaticamente per mostrare il numero totale di donazioni e l'importo in dollari combinato mentre aggiungi o modifichi le voci. Utilizzalo per riconciliare contro il tuo foglio di deposito.
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
