---
title: "Richieste di adesione ai gruppi"
description: "Esamina, approva o rifiuta le richieste di adesione ai gruppi in B1 Admin, trova le richieste in attesa come leader o amministratore e aggiungi un motivo quando rifiuti."
---

# Richieste di adesione ai gruppi

<div class="article-intro">

Quando un gruppo è configurato con una politica di adesione basata sull'approvazione, le persone possono inviare richieste per entrare. I leader e gli amministratori del gruppo esaminano queste richieste e le approvano o le rifiutano. Questo dà alla tua chiesa il controllo sull'appartenenza ai gruppi, rendendo al tempo stesso semplice per le persone esprimere il desiderio di entrare.

</div>

## Video di formazione {#training-video}

<YouTube id="1vj-suCiIsE" title="Richieste di adesione ai gruppi e calendari dei gruppi in B1" next="Configurare culti e presenze in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso di gestire i gruppi, oppure devi essere leader dello specifico gruppo. Vedi [Ruoli e permessi](../people/roles-permissions.md) per i dettagli.
- Il gruppo deve avere la politica di adesione impostata su **Richiesta** (approvazione richiesta). Vedi [Creare gruppi](./creating-groups.md) per sapere come configurare le politiche di adesione.

</div>

## Capire le politiche di adesione {#understanding-join-policies}

I gruppi possono avere tre diverse politiche di adesione:

- **Aperto** -- Chiunque può entrare subito, senza approvazione
- **Richiesta** -- Le persone inviano una richiesta di adesione che richiede approvazione
- **Chiuso** -- Nessuno può chiedere di entrare (i membri devono essere aggiunti manualmente)

Quando un gruppo usa la politica **Richiesta**, tutti i tentativi di adesione passano dal flusso di approvazione descritto in questa pagina.

## Visualizzare le richieste in attesa {#viewing-pending-requests}

### Per i leader dei gruppi {#for-group-leaders}

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) e scegli **Persone > Gruppi**
2. Fai clic sul nome del gruppo
3. La sezione **Membri** mostra quante richieste sono in attesa (ad esempio "1 in attesa"). Fai clic su **Tutti i membri** -- le richieste in attesa per questo gruppo compaiono sotto **Richieste in attesa** in cima all'elenco dei membri

### Per gli amministratori {#for-administrators}

Gli amministratori con permessi di gestione dei gruppi possono vedere le richieste in attesa di tutti i gruppi:

1. Nel menu Jump, scegli **Persone > Gruppi**
2. Fai clic sul pulsante **richieste in attesa** nell'intestazione della pagina (ad esempio "3 richieste in attesa"). Compare solo quando ci sono richieste in attesa.
3. La pagina **Richieste di adesione in attesa** elenca ogni richiesta in attesa di tutta la chiesa, con il gruppo a cui la persona vuole aderire accanto al nome. Fai clic su **Gruppi** in cima alla pagina per tornare indietro. Quando non c'è nulla in attesa, la pagina mostra **Nessuna richiesta in attesa.**

## Esaminare una richiesta di adesione {#reviewing-a-join-request}

Ogni richiesta di adesione mostra:

- **Nome e foto della persona** -- La persona che chiede di entrare (e, nella pagina di tutta la chiesa, il gruppo)
- **Messaggio facoltativo** -- Un messaggio personale che spiega perché vuole entrare (se fornito)
- **Data della richiesta** -- Quando la richiesta è stata inviata

Per esaminare una richiesta:

1. Leggi il messaggio della persona, se ne ha inviato uno
2. Se necessario, fai clic sul nome della persona per aprire il suo profilo
3. Decidi se approvare o rifiutare

## Approvare una richiesta {#approving-a-request}

1. Fai clic su **Approva** sulla richiesta di adesione
2. La persona viene subito aggiunta al gruppo come membro e la richiesta scompare dall'elenco
3. Chi ha fatto la richiesta riceve una notifica che la sua richiesta è stata approvata
4. La richiesta viene contrassegnata come approvata nel sistema

:::tip
Quando approvi una richiesta, la persona diventa un membro normale del gruppo. In seguito puoi promuoverla a leader del gruppo, se necessario, dalla pagina [Membri del gruppo](./group-members.md).
:::

## Rifiutare una richiesta {#declining-a-request}

1. Fai clic su **Rifiuta** sulla richiesta di adesione
2. Nella finestra **Rifiuta richiesta**, inserisci facoltativamente un **Motivo (facoltativo)** (fino a 500 caratteri)
3. Fai clic su **Rifiuta**
4. Chi ha fatto la richiesta riceve una notifica con il tuo motivo del rifiuto (se fornito)
5. La richiesta viene contrassegnata come rifiutata

:::info
Indicare un motivo del rifiuto aiuta la persona a capire perché la richiesta non è stata approvata e può incoraggiarla a riprovare più avanti o a esplorare altri gruppi.
:::

## Approvare dalla pagina Compiti {#approving-from-the-tasks-page}

Ogni richiesta di adesione crea anche un compito in **Servizio &rarr; Il mio lavoro**, intitolato "*Persona* ha chiesto di entrare in *Gruppo*." È assegnato ai leader del gruppo. Se il gruppo non ha ancora un leader, va a qualsiasi membro dello staff con il permesso **Membri del gruppo &gt; Modifica**, oppure agli amministratori di dominio della chiesa se nessuno ha quel permesso. Lo staff e gli amministratori che ricevono il compito in questo modo ricevono anche una notifica che porta direttamente ad esso.

Aprendo il compito compaiono il nome di chi ha fatto la richiesta, il gruppo e il suo messaggio facoltativo, con i pulsanti **Approva** e **Rifiuta** direttamente sulla scheda del compito (Rifiuta apre lo stesso campo facoltativo per il motivo descritto sopra). Questo offre ai leader un secondo modo, guidato dalle notifiche, per gestire una richiesta senza aprire l'elenco membri del gruppo.

Decidere una richiesta da uno dei due punti -- l'elenco membri del gruppo oppure la scheda Compiti -- la chiude ovunque, così i leader non vedono mai un compito obsoleto per una richiesta già gestita da qualcun altro.

## Notifiche {#notifications}

Il sistema delle richieste di adesione invia automaticamente le notifiche:

- **Quando una richiesta viene inviata** -- Tutti i leader del gruppo ricevono una notifica. Se il gruppo non ha leader, vengono invece avvisati lo staff o gli amministratori assegnati al compito (vedi sopra)
- **Quando una richiesta viene approvata** -- Chi ha fatto la richiesta riceve una conferma
- **Quando una richiesta viene rifiutata** -- Chi ha fatto la richiesta riceve una notifica con l'eventuale motivo del rifiuto

Le notifiche compaiono nel centro notifiche dell'utente su B1.church e nell'app mobile. Nella campanella delle notifiche di B1 Admin, fare clic su una notifica di richiesta di adesione (oppure su **Vedi dettagli**) apre il gruppo sul sito B1.church della tua chiesa in una nuova scheda.

## Gestire le richieste dal lato membro {#managing-requests-from-the-member-side}

Le persone possono gestire le proprie richieste di adesione da B1.church:

- Vedere lo stato delle proprie richieste in attesa nella pagina di dettaglio del gruppo
- Annullare una richiesta in attesa se cambiano idea
- Vedere se la loro richiesta è stata approvata o rifiutata

## Buone pratiche {#best-practices}

- **Rispondi tempestivamente** -- Cerca di esaminare le richieste entro 24-48 ore, così le persone non restano in attesa
- **Sii chiaro nei motivi del rifiuto** -- Aiuta le persone a capire i passi successivi o le opzioni alternative
- **Controlla i profili** -- Esamina il profilo della persona per capire se è adatta al gruppo
- **Comunica le aspettative** -- Assicurati che la descrizione del gruppo indichi chiaramente a chi è rivolto

## Articoli correlati {#related-articles}

- [Creare gruppi](./creating-groups.md) -- Scopri come configurare i gruppi e le politiche di adesione
- [Membri del gruppo](./group-members.md) -- Gestisci i membri già presenti nel gruppo
- [Calendario del gruppo](./group-calendar.md) -- Programma riunioni ed eventi del gruppo
