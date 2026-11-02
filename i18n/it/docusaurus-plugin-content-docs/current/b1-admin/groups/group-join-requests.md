---
title: "Richieste di adesione ai gruppi"
---

# Richieste di adesione ai gruppi

<div class="article-intro">

Quando un gruppo è configurato con una politica di adesione basata sull'approvazione, le persone possono inviare richieste per entrare. I leader dei gruppi e gli amministratori esaminano queste richieste e le approvano o le rifiutano. Questo dà alla tua chiesa il controllo sull'appartenenza ai gruppi, rendendo al tempo stesso facile per le persone manifestare interesse a farne parte.

</div>

## Video di formazione

<YouTube id="1vj-suCiIsE" title="Richieste di adesione ai gruppi e calendari dei gruppi in B1" next="Configurare culti e presenze in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso di gestire i gruppi, oppure devi essere leader del gruppo specifico. Vedi [Ruoli e permessi](../people/roles-permissions.md) per i dettagli.
- Il gruppo deve avere la politica di adesione impostata su **Su richiesta** (approvazione richiesta). Vedi [Creare gruppi](./creating-groups.md) per sapere come configurare le politiche di adesione.

</div>

## Capire le politiche di adesione

I gruppi possono avere tre diverse politiche di adesione:

- **Aperto** -- Chiunque può entrare subito senza approvazione
- **Su richiesta** -- Le persone inviano una richiesta di adesione che richiede approvazione
- **Chiuso** -- Nessuno può richiedere di entrare (i membri devono essere aggiunti manualmente)

Quando un gruppo usa la politica **Su richiesta**, tutti i tentativi di adesione passano dal flusso di approvazione descritto in questa pagina.

## Visualizzare le richieste in attesa

### Per i leader dei gruppi

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) e scegli **Persone > Gruppi**
2. Clicca sul nome del gruppo
3. La sezione **Membri** mostra quante richieste sono in attesa. Clicca su **Tutti i membri** -- le richieste in attesa per questo gruppo compaiono in cima all'elenco dei membri

### Per gli amministratori

Gli amministratori con permessi di gestione dei gruppi possono visualizzare le richieste in attesa di tutti i gruppi:

1. Nel menu di navigazione rapida, scegli **Persone > Gruppi**
2. Clicca sul pulsante **richieste in attesa** nell'intestazione della pagina (ad esempio "3 richieste in attesa"). Compare solo quando ci sono richieste in attesa.
3. Esamina tutte le richieste in attesa in tutta la chiesa

## Esaminare una richiesta di adesione

Ogni richiesta di adesione mostra:

- **Nome e foto della persona** -- La persona che chiede di entrare
- **Messaggio facoltativo** -- Un messaggio personale che spiega perché vuole entrare (se fornito)
- **Data della richiesta** -- Quando è stata inviata la richiesta

Per esaminare una richiesta:

1. Leggi il messaggio della persona, se ne ha inviato uno
2. Se necessario, clicca sul nome della persona per visualizzarne il profilo
3. Decidi se approvare o rifiutare

## Approvare una richiesta

1. Clicca su **Approva** nella richiesta di adesione
2. La persona viene immediatamente aggiunta al gruppo come membro
3. Chi ha fatto la richiesta riceve una notifica che la sua richiesta è stata approvata
4. La richiesta viene contrassegnata come approvata nel sistema

:::tip
Quando approvi una richiesta, la persona diventa un normale membro del gruppo. Se necessario, puoi promuoverla a leader del gruppo in seguito dalla pagina [Membri del gruppo](./group-members.md).
:::

## Rifiutare una richiesta

1. Clicca su **Rifiuta** nella richiesta di adesione
2. Facoltativamente, indica un motivo per il rifiuto (fino a 500 caratteri)
3. Clicca su **Conferma**
4. Chi ha fatto la richiesta riceve una notifica con il motivo del rifiuto (se indicato)
5. La richiesta viene contrassegnata come rifiutata

:::info
Indicare un motivo di rifiuto aiuta la persona a capire perché la sua richiesta non è stata approvata e può incoraggiarla a riprovare più avanti o a esplorare altri gruppi.
:::

## Approvare dalla pagina Attività {#approving-from-the-tasks-page}

Ogni richiesta di adesione crea anche un'attività in **Servizio &rarr; Il mio lavoro**, intitolata "*Persona* ha chiesto di entrare in *Gruppo*." È assegnata ai leader del gruppo. Se il gruppo non ha ancora un leader, viene assegnata a un membro del personale con il permesso **Membri del gruppo > Modifica**, oppure agli amministratori di dominio della tua chiesa se nessuno ha quel permesso. Il personale e gli amministratori che ricevono l'attività in questo modo ricevono anche una notifica che porta direttamente ad essa.

Aprendo l'attività vedi il nome di chi ha fatto la richiesta, il gruppo e il suo messaggio facoltativo, con i pulsanti **Approva** e **Rifiuta** direttamente sulla scheda dell'attività (Rifiuta apre lo stesso campo facoltativo per il motivo descritto sopra). Questo offre ai leader un secondo modo, guidato dalle notifiche, per agire su una richiesta senza aprire l'elenco dei membri del gruppo.

Decidere una richiesta da uno dei due punti -- l'elenco dei membri del gruppo oppure la scheda Attività -- la chiude ovunque, così i leader non vedono mai un'attività obsoleta per una richiesta già gestita da qualcun altro.

## Notifiche

Il sistema di richieste di adesione invia automaticamente delle notifiche:

- **Quando una richiesta viene inviata** -- Tutti i leader del gruppo ricevono una notifica. Se il gruppo non ha leader, vengono invece avvisati il personale o gli amministratori assegnati all'attività (vedi sopra).
- **Quando una richiesta viene approvata** -- Chi ha fatto la richiesta riceve una conferma
- **Quando una richiesta viene rifiutata** -- Chi ha fatto la richiesta riceve una notifica con l'eventuale motivo del rifiuto

Le notifiche compaiono nel centro notifiche dell'utente su B1.church e nell'app mobile. Nella campanella delle notifiche di B1 Admin, cliccando su una notifica di richiesta di adesione (o su **Visualizza dettagli**) si apre il gruppo sul sito B1.church della tua chiesa in una nuova scheda.

## Gestire le richieste dal lato dei membri

Le persone possono gestire le proprie richieste di adesione da B1.church:

- Visualizzare lo stato delle proprie richieste in attesa nella pagina di dettaglio del gruppo
- Annullare una richiesta in attesa se cambiano idea
- Vedere se la propria richiesta è stata approvata o rifiutata

## Buone pratiche

- **Rispondi tempestivamente** -- Cerca di esaminare le richieste entro 24-48 ore così le persone non restano in attesa
- **Sii chiaro nei motivi di rifiuto** -- Aiuta le persone a capire i passi successivi o le alternative possibili
- **Controlla i profili** -- Esamina il profilo della persona per vedere se è adatta al gruppo
- **Comunica le aspettative** -- Assicurati che la descrizione del gruppo indichi chiaramente a chi è rivolto

## Articoli correlati

- [Creare gruppi](./creating-groups.md) -- Scopri come impostare i gruppi e configurare le politiche di adesione
- [Membri del gruppo](./group-members.md) -- Gestisci i membri già presenti nel gruppo
- [Calendario del gruppo](./group-calendar.md) -- Pianifica gli incontri e gli eventi del gruppo
