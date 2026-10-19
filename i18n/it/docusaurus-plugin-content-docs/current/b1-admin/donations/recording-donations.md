---
title: "Registrare le donazioni"
---

# Registrare le donazioni

<div class="article-intro">

In B1 Admin, le donazioni si registrano tramite il sistema dei Lotti. Create un lotto che rappresenti una raccolta (per esempio un'offerta domenicale), poi aggiungete al lotto le singole donazioni. In questo modo le registrazioni delle offerte restano ordinate e facili da riconciliare.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configurate i vostri [fondi](funds.md) per poter assegnare le donazioni alle categorie giuste
- Create un [lotto](batches.md) che contenga le donazioni che state per inserire
- Assicuratevi che i donatori siano nella vostra [rubrica persone](../people/adding-people.md), così potrete cercarli quando inserite le offerte
- Vi servono **Modifica donazioni**, oppure **Inserisci donazioni** insieme a **Visualizza donazioni**, per inserire offerte in un lotto (vedere [Chi può modificare un lotto](batches.md#who-can-change-a-batch))

</div>

## Creare un lotto e aggiungere donazioni

1. In **B1 Admin**, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandete **Donazioni** e fate clic su **Lotti**.
2. Fate clic su **Aggiungi lotto** in cima alla pagina.
3. Inserite un nome per il lotto (ad esempio "Offerta domenicale - 5 gennaio") e selezionate la data. Fate clic su **Salva**.
4. Il nuovo lotto compare nell'elenco con zero donazioni e 0,00 $.
5. Fate clic sul **nome del lotto** per aprirlo.

## Inserire le singole donazioni

1. Nella pagina di dettaglio del lotto, accanto all'elenco delle donazioni compare il pannello di inserimento. Sotto **Seleziona persona o anonimo**, digitate il nome del donatore nel campo di ricerca per trovarlo, oppure fate clic su **Anonimo**. (Fare clic su **Aggiungi donazione** in cima alla pagina porta direttamente a questo pannello.)
2. Dopo aver selezionato una persona, il modulo mostra i campi **Data**, **Metodo** (Assegno, Contanti, Carta o In natura), **Fondo**, **Note**, **Importo** e **N. assegno** (oppure **Ultime 4 cifre** per le carte, o **Articolo** per descrivere un'offerta in natura). Fate clic su **Cambia** accanto al nome del donatore per sceglierne un altro.
3. Compilate i dettagli e fate clic su **Aggiungi donazione** (oppure premete Invio).
4. La donazione viene aggiunta all'elenco, e il modulo si azzera per consentirvi di inserire la successiva.

:::info
Se il lotto è stato [chiuso](batches.md#closing-and-reopening-a-batch), il pannello di inserimento e i link **Modifica** sono nascosti per chi non ha **Modifica donazioni**, e in cima al lotto compare un avviso che indica che è chiuso. Chiedete a qualcuno con **Modifica donazioni** di riaprirlo.
:::

:::tip
Potete inserire rapidamente più donazioni di seguito senza lasciare la pagina del lotto. Il modulo si azzera dopo ogni inserimento, così potete scorrere un mazzo di assegni o di buste in modo efficiente.
:::

## Registrare un'offerta dalla scheda di una persona

Per registrare una singola offerta senza aprire un lotto, aprite la scheda del donatore in **Persone** e fate clic su **Registra un'offerta** (nel riepilogo delle donazioni, o nella vista delle donazioni della persona).

1. Impostate la **Data** e l'**Importo**.
2. Scegliete il **Fondo** e il **Metodo** (Assegno, Contanti, Carta o In natura), e inserite il **N. assegno**, le **Ultime 4 cifre** o l'**Articolo** (per le offerte in natura), se necessario.
3. Facoltativamente aggiungete le **Note**, poi fate clic su **Salva**.

L'offerta viene salvata nel lotto di quella data. Se non esiste ancora un lotto per quella data, ne viene creato uno automaticamente, con il nome della data.

## Suddividere una donazione tra più fondi

A volte un donatore offre a più fondi con un'unica transazione. Per gestire questo caso:

1. Sotto il pannello di inserimento, fate clic sul link **editor completo della donazione** (oppure fate clic su **Modifica** nella riga di una donazione esistente).
2. Nell'editor completo, aggiungete gli importi a fondi diversi. Il totale viene calcolato automaticamente dagli importi dei singoli fondi.
3. Fate clic su **Salva** per aggiornare la donazione.

:::info
Suddividere le donazioni tra più fondi è comune quando un donatore scrive un unico assegno destinato a più scopi, ad esempio il Fondo generale e le Missioni.
:::

## Modificare o rimuovere le donazioni

Per modificare una donazione, fate clic sul pulsante **Modifica** nella sua riga del lotto. Potete cambiare la data, l'importo, il fondo, il metodo di pagamento (Assegno, Contanti, Carta o In natura) o qualsiasi altro dettaglio. Per un'offerta in natura, l'editor etichetta il campo **Articolo**, così potete descrivere ciò che è stato donato. Fate clic su **Salva** al termine.

:::tip
La riga sotto il nome del lotto, in cima alla pagina, si aggiorna automaticamente mostrando la data del lotto, il numero di offerte e l'importo complessivo man mano che aggiungete o modificate i dati. Usatela per riconciliare con la distinta di deposito.
:::

## Rimborsare una donazione

Se un donatore è stato addebitato per errore o chiede la restituzione del denaro, potete rimborsare una donazione completata direttamente dalla sua schermata di modifica -- senza bisogno di accedere alla dashboard del vostro gateway di pagamento.

1. Aprite la donazione e fate clic su **Modifica**.
2. Fate clic sul pulsante **Rimborsa**, accanto a Elimina, in fondo al modulo.
3. Confermate la finestra di dialogo: "Rimborsare integralmente questa donazione tramite il gateway di pagamento? Questa operazione non può essere annullata."

La donazione viene rimborsata integralmente tramite il gateway di pagamento originale e contrassegnata come **Rimborsata** negli elenchi delle donazioni.

:::warning
I rimborsi sono solo integrali -- da B1 Admin non è possibile rimborsare un importo parziale. Inoltre, il rimborso non può essere annullato una volta confermato.
:::

:::info
Il pulsante **Rimborsa** compare solo per le donazioni pagate online (che hanno una transazione sul gateway) e che sono ancora in stato **Completata**. Le donazioni inserite manualmente (contanti, assegni) non hanno una transazione sul gateway da rimborsare -- per queste, modificatele o eliminatele.
:::

## Passaggi successivi

- Verificate le registrazioni usando i [Rapporti sulle donazioni](donation-reports.md) per controllarne la correttezza
- A fine anno, generate le [Ricevute di donazione](giving-statements.md) per i vostri donatori
