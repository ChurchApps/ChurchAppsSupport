---
title: "Editor delle etichette di check-in"
description: "Personalizza i modelli di cartellino con nome e tagliando di ritiro stampati al check-in in B1 Admin, inclusi campi, posizionamento e condizioni su compleanni o note."
---

# Editor delle etichette di check-in

<div class="article-intro">

L'Editor delle etichette ti permette di creare e personalizzare i modelli del cartellino con il nome e del tagliando di ritiro che vengono stampati quando le famiglie registrano i propri figli. Puoi controllare esattamente quali informazioni compaiono su ogni etichetta, dove sono posizionate e come appaiono.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura le [Presenze](./setup.md) e imposta almeno un orario di culto con il check-in attivo
- Configura il [Check-In](./check-in.md) così da poter stampare le etichette
- Ti serve il permesso **Modifica presenze**

</div>

## Aprire l'Editor delle etichette {#opening-the-label-designer}

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Mobile** e fai clic su **Etichette**. Puoi anche fare clic su **B1 CheckIn** e poi su **Progetta etichette** nella scheda **Etichette di check-in**.

La pagina **Etichette di check-in** elenca i modelli salvati con il loro **Nome**, il **Tipo** (**Cartellino con nome** o **Tagliando di ritiro**) e le **Dimensioni**. Se non ne hai ancora creati, compare la scritta **Nessun modello di etichetta** e B1 Checkin stampa il proprio cartellino con nome e tagliando di ritiro predefiniti.

## Tipi di etichetta {#label-types}

- **Cartellino con nome** — stampato e applicato al bambino. Di solito include il nome del bambino, la sua classe o sessione e un codice di sicurezza.
- **Tagliando di ritiro** — consegnato al genitore o tutore. Di solito include il codice di sicurezza e un elenco dei bambini registrati.

Entrambi i modelli di partenza sono dimensionati per le comuni etichette termiche da 3,5 × 1,1 pollici (Brother DK-1201).

## Creare un modello di etichetta {#creating-a-label-template}

1. Fai clic su **Aggiungi etichetta** e scegli un punto di partenza: **Cartellino con nome 3,5" x 1,1"**, **Tagliando di ritiro 3,5" x 1,1"** oppure **Vuoto**.
2. Il modello si apre nell'editor delle etichette, con un'anteprima dell'etichetta compilata con dati di esempio.

### Editor delle etichette {#label-editor}

In cima all'editor puoi impostare:

- **Nome** — il nome del modello (solo per tua consultazione; obbligatorio)
- **Tipo** — Cartellino con nome o Tagliando di ritiro
- **Larghezza (in)** / **Altezza (in)** — dimensione dell'etichetta in pollici

### Aggiungere blocchi {#adding-blocks}

Un'etichetta è composta da blocchi, cioè singoli elementi di contenuto posizionati sull'etichetta. Fai clic su un pulsante nel pannello **Aggiungi blocco** per aggiungerne uno:

- **Campi** — inseriscono un valore al momento della stampa. I cartellini con nome offrono **Nome visualizzato**, **Nome**, **Cognome**, **Soprannome**, **Note del cartellino** (le note nella scheda della persona), **Compleanno questa settimana** (vero quando il compleanno della persona cade entro 3 giorni prima o dopo la data del check-in), **Sessioni** (gli orari dei culti e le sale a cui si sono registrati), **Codice di sicurezza**, **Data** e **Nome della chiesa**. I tagliandi di ritiro offrono **Bambini**, **Bambini e allergie**, **Codice di sicurezza**, **Data** e **Nome della chiesa**.
- **Testo** — testo statico che digiti (per titoli, etichette o istruzioni)
- **Codice a barre** — un codice a barre Code 128 o Code 39 di un campo, come il codice di sicurezza
- **Codice QR** — un codice QR di un campo
- **Riquadro** — un rettangolo con colore di riempimento e bordo facoltativi

### Posizionare e stilizzare i blocchi {#positioning-and-styling-blocks}

Trascina un blocco sull'etichetta per spostarlo, oppure fai clic su di esso e usa il pannello **Proprietà**. **X**, **Y**, **L** e **A** sono percentuali dell'etichetta (0–100). A seconda del blocco, puoi anche impostare:

- **Dimensione carattere** — dimensione del testo, in proporzione all'altezza dell'etichetta
- **Grassetto** e **Corsivo**
- **Allineamento** — Sinistra, Centro o Destra
- **Simbologia** e **Valore** — per codici a barre e codici QR
- **Riempimento** e **Bordo** — per i riquadri
- **Condizione** — **Sempre** mostra il blocco. Scegli un campo per mostrare il blocco solo quando quel campo **Non è vuoto**, **È vuoto**, **Uguale a** o **Diverso da** un valore. Ad esempio, mostra le note del cartellino solo se sono compilate, oppure mostra una grafica di compleanno solo quando **Compleanno questa settimana** è uguale a `true`.

Fai clic su **Rimuovi blocco** per eliminare il blocco selezionato.

### Salvare {#saving}

Fai clic su **Salva** per salvare il modello, oppure su **Annulla** per scartare le modifiche. B1 Checkin usa il modello aggiornato la volta successiva che carica le sue impostazioni.

## Scegliere il modello predefinito {#choosing-the-default-template}

Se hai più di un modello dello stesso tipo, fai clic su **Imposta come predefinito** su quello che B1 Checkin deve stampare. Compare un badge **Predefinito**, e qualsiasi altro modello di quel tipo smette di essere predefinito. Se nessun modello di un tipo è contrassegnato come predefinito, il kiosk usa il primo.

## Eliminare un modello {#deleting-a-template}

Fai clic su **Elimina** nella riga del modello e conferma. Se elimini tutti i modelli di un tipo, B1 Checkin torna all'etichetta predefinita per quel tipo.

:::tip
Dopo aver modificato un modello, stampa una prova per verificare che il layout sia corretto prima del tuo prossimo culto.
:::

## Articoli correlati {#related-articles}

- [Configurazione Presenze](./setup.md) — configura culti e gruppi per il check-in
- [Check-In](./check-in.md) — configura il kiosk B1 Checkin
- [Primi passi con B1 Checkin](../../b1-checkin/getting-started/index.md) — l'app kiosk Checkin
