---
title: "Sale, risorse e programmazione"
description: "Configura in B1 Admin sale, attrezzature, blocchi e modelli di evento così i gruppi possono richiedere prenotazioni e tu puoi approvarle per evitare doppie prenotazioni."
---

# Sale, risorse e programmazione

<div class="article-intro">

Sale e risorse ti permettono di tenere traccia degli spazi e delle attrezzature prenotabili della tua chiesa. Quando un gruppo o un team vuole usare una sala o prendere in prestito una risorsa per un evento, può richiederla tramite B1 -- e tu puoi approvare o rifiutare queste richieste per evitare doppie prenotazioni.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso **Modifica contenuti**
- Configura i [gruppi](../groups/creating-groups.md) i cui membri invieranno richieste di prenotazione

</div>

## Aprire Sale e risorse {#opening-rooms--resources}

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e fai clic su **Sale e risorse**. La pagina ha quattro schede: **Sale**, **Risorse**, **Blocchi** e **Modelli**. Il pulsante di aggiunta in cima alla pagina cambia in base alla scheda selezionata, e un campo **Trova** ti permette di filtrare l'elenco corrente.

## Sale {#rooms}

Le sale sono spazi fisici che possono essere riservati insieme agli eventi del calendario -- un santuario, una sala di ritrovo, un'aula, ecc.

### Aggiungere una sala {#adding-a-room}

1. Nella scheda **Sale**, fai clic su **Aggiungi sala** in cima alla pagina.
2. Inserisci un **Nome sala**.
3. Facoltativamente imposta una **Capienza** (numero massimo di persone) e una **Descrizione**. Entrambe compaiono accanto alla sala quando le persone scelgono le sale per un evento.
4. Imposta un **Gruppo di approvazione** se le prenotazioni richiedono un via libera. Le prenotazioni fatte dai membri di quel gruppo vengono approvate automaticamente; quelle di chiunque altro restano **In attesa** finché non vengono approvate nella pagina [Approvazioni](./approvals.md), e i membri del gruppo ricevono un'email sulle nuove richieste. Lascia su **Nessuna approvazione necessaria** per approvare automaticamente ogni prenotazione.
5. Fai clic su **Salva**.

L'elenco delle sale mostra per ciascuna il **Nome sala**, la **Capienza** e il **Gruppo di approvazione**. Le sale disattivate mostrano un badge **Inattivo** accanto al nome.

### Modificare o eliminare una sala {#editing-or-deleting-a-room}

Passa con il mouse su una sala e fai clic su **Modifica**, apporta le modifiche e fai clic su **Salva**. Usa **Elimina** per rimuovere definitivamente una sala.

Se una sala è chiusa per un certo periodo -- una ristrutturazione, una stagione o senza una data di ritorno prestabilita -- disattiva l'interruttore **Attivo** e fai clic su **Salva** invece di eliminarla. Una sala inattiva mantiene i suoi dettagli e tutte le prenotazioni passate, ma non compare più negli elenchi delle sale quando qualcuno programma un evento o richiede una sala. Riattiva l'interruttore per renderla di nuovo prenotabile. Un blocco è più adatto quando la sala è chiusa in date specifiche, perché la sala resta nell'elenco e segnala le prenotazioni in quelle date.

## Risorse {#resources}

Le risorse sono oggetti che possono essere prenotati insieme a un evento -- attrezzatura audio/video, proiettori, sedie, un furgone, ecc.

### Aggiungere una risorsa {#adding-a-resource}

1. Fai clic sulla scheda **Risorse**, poi su **Aggiungi risorsa**.
2. Inserisci un **Nome risorsa** e, facoltativamente, una **Descrizione**.
3. Imposta la **Quantità** che possiedi (ad esempio 3 proiettori). Ogni evento ne prenota una, e B1 ti avvisa quando più eventi contemporanei la prenotano rispetto a quante ne hai.
4. Imposta un **Gruppo di approvazione** se qualcuno deve approvare i prestiti delle risorse. Funziona come per le sale.
5. Fai clic su **Salva**.

Modifica o elimina una risorsa allo stesso modo di una sala. Una risorsa ha anche un interruttore **Attivo**: disattivalo per toglierla dagli elenchi delle risorse senza perdere i suoi dettagli o le prenotazioni passate.

## Blocchi {#blockouts}

I blocchi impediscono che sale o risorse vengano prenotate in determinati momenti -- per ristrutturazioni, periodi riservati o manutenzione.

### Aggiungere un blocco {#adding-a-blockout}

1. Fai clic sulla scheda **Blocchi**, poi su **Aggiungi blocco**.
2. In **Si applica a**, scegli una sala, una risorsa oppure **Tutte le sale e risorse**.
3. Imposta la data/ora di **Inizio** e **Fine** del blocco.
4. Facoltativamente aggiungi un **Motivo**. Compare nel calendario [Disponibilità](./availability.md) come *Bloccato: motivo*.
5. Fai clic su **Salva**.

Gli eventi che prenotano una sala o una risorsa bloccata mostrano un avviso di conflitto nell'editor dell'evento.

## Modelli di evento {#event-templates}

I modelli ti permettono di salvare una configurazione di evento riutilizzabile -- titolo, descrizione, durata, sale e risorse -- così gli eventi che crei spesso vengono impostati sempre allo stesso modo.

### Aggiungere un modello {#adding-a-template}

1. Fai clic sulla scheda **Modelli**, poi su **Aggiungi modello**.
2. Inserisci un **Nome modello** (mostrato quando si sceglie un modello).
3. Compila il **Titolo evento**, la **Descrizione evento** e la **Durata (minuti)** da usare per i nuovi eventi.
4. Facoltativamente scegli le **Sale** e le **Risorse** da prenotare.
5. Fai clic su **Salva**.

Quando crei un nuovo evento, scegli il modello nel campo **Modello** dell'editor dell'evento per compilare titolo, descrizione, sale e risorse, e per impostare l'orario di fine in base alla durata del modello (imposta prima l'**Inizio**). Devi ancora scegliere il **Gruppo** dell'evento. Il campo **Modello** compare solo quando esiste almeno un modello.

## Articoli correlati {#related-articles}

- [Calendario della disponibilità](./availability.md) — visualizza tutte le prenotazioni a colpo d'occhio e prenota sale o risorse direttamente
- [Approvazioni del calendario](./approvals.md) — approva o rifiuta le richieste di prenotazione di sale e risorse
- [Creare calendari](./creating-calendars.md) — configura i calendari degli eventi
- [Creare gruppi](../groups/creating-groups.md) — configura i gruppi che possono prenotare sale e risorse
