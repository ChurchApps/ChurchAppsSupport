---
title: "Creare calendari"
description: "Crea un calendario in B1 Admin, collega gruppi o importa file .ics e gestisci eventi, iscrizioni e note da un unico punto."
---

# Creare calendari

<div class="article-intro">

Creare un calendario in B1 Admin ti permette di costruire una vista curata degli eventi collegando uno o più gruppi. Gli eventi sono gestiti dai leader dei gruppi all'interno dei rispettivi gruppi, e il tuo calendario mostra questi eventi in un unico posto. Gli amministratori con accesso alla modifica possono aggiungere o modificare eventi per qualsiasi gruppo. I leader di gruppo non amministratori possono gestire solo gli eventi dei gruppi che guidano.

</div>

## Video di formazione {#training-video}

<YouTube id="Ko3kgsCSLFs" title="Creare calendari, eventi e prenotazioni di sale in B1" next="Iscrizioni agli eventi ed eventi a pagamento in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i [gruppi](../groups/creating-groups.md) i cui eventi vuoi includere nel calendario
- Ti serve il permesso **Modifica contenuti**

</div>

## Creare un nuovo calendario {#creating-a-new-calendar}

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e fai clic su **Calendari**.
2. Fai clic su **Aggiungi calendario** in cima alla pagina. Il modulo del nuovo calendario si apre sotto l'elenco dei calendari.
3. Inserisci un **Nome del calendario** (ad esempio "Eventi del ministero giovanile" o "Calendario principale della chiesa").
4. Fai clic su **Crea** per salvare il nuovo calendario.

Per rinominare o eliminare un calendario in seguito, passa con il mouse sulla sua riga nella pagina Calendari e fai clic su **Modifica** (oppure fai clic su **Modifica** nella pagina di dettaglio del calendario).

## La pagina di dettaglio del calendario {#the-calendar-detail-page}

Dopo aver creato un calendario, fai clic sul suo nome (oppure passa con il mouse sulla sua riga e fai clic su **Gestisci eventi**) per aprire la pagina di dettaglio. Questa pagina ha due aree principali:

- **Colonna sinistra** -- Il nome del calendario con le sue azioni (**Nuovo evento**, **Modifica**, **Importa .ics** e **Stampa**), un collegamento alle eventuali approvazioni in attesa e l'elenco **Gruppi nel calendario** che mostra quali gruppi sono inclusi in questo calendario. Fai clic su **Rimuovi** accanto a un gruppo per toglierlo dal calendario.
- **Area principale** -- La vista **Eventi del calendario** con gli eventi provenienti dai gruppi collegati, con i pulsanti **Iscriviti** e **Aggiungi gruppo** sopra. Usa **Oggi**, **Indietro**, **Avanti** e le viste **Mese**, **Settimana**, **Giorno** e **Agenda** per spostarti. Ogni evento è disegnato con il colore del suo gruppo. I colori vengono assegnati automaticamente e un gruppo mantiene lo stesso colore in ogni calendario.

Fai clic su **Stampa** per ottenere un mese stampabile. La stampa inizia con il logo della chiesa su sfondo chiaro (da [Aspetto](../website/appearance.md), se ne hai impostato uno), il nome della chiesa e il nome del calendario. I nomi degli eventi vanno a capo su più righe invece di essere tagliati, e i colori dei gruppi vengono mantenuti.

## Collegare gruppi {#connecting-groups}

I gruppi che hanno eventi nel calendario compaiono automaticamente nell'elenco **Gruppi nel calendario** sul lato sinistro della pagina di dettaglio.

1. Fai clic su **Aggiungi gruppo** sopra il calendario per associare un gruppo al tuo calendario.
2. Scegli il gruppo in **Seleziona un gruppo**. L'elenco include tutti i gruppi della tua chiesa, non solo quelli di cui fai parte.
3. Scegli **Aggiungi tutti gli eventi del gruppo**, oppure **Aggiungi eventi specifici** e fai clic su ciascun evento che vuoi nel piccolo calendario che compare.
4. Fai clic su **Salva**.

Ogni evento compare nel calendario una sola volta. Se aggiungi un intero gruppo, eventuali suoi eventi che avevi già aggiunto singolarmente vengono inglobati nella voce del gruppo, e scegliere eventi specifici di un gruppo già presente nel calendario non aggiunge nulla di nuovo. Solo i gruppi aggiunti per intero sono elencati in **Gruppi nel calendario**.

### Importare un file .ics {#importing-an-ics-file}

Fai clic su **Importa .ics** per importare eventi da un altro calendario. Scegli il **Gruppo** a cui devono appartenere gli eventi, poi fai clic su **Scegli file .ics** oppure incolla il contenuto del file, e fai clic su **Importa**. Gli eventi vengono creati nel gruppo scelto, e il gruppo viene aggiunto al calendario da cui hai importato, così gli eventi compaiono subito lì.

### Rimuovere un evento dal calendario {#removing-an-event-from-the-calendar}

Fai clic su un evento nel calendario, poi fai clic su **Rimuovi dal calendario**. Questo lo toglie solo da questo calendario -- l'evento resta nel suo gruppo. Se l'evento è nel calendario perché è stato aggiunto l'intero gruppo, rimuoverlo toglie da questo calendario tutti gli eventi di quel gruppo (che restano comunque nel gruppo). Per eliminare definitivamente un evento, eliminalo dal [calendario del gruppo](../groups/group-calendar.md).

:::tip
Collegare i gruppi al tuo calendario è un modo efficace per aggregare automaticamente gli eventi. Quando un leader di gruppo aggiunge un evento al proprio [gruppo](../groups/creating-groups.md), questo può confluire nel calendario dell'intera chiesa senza alcun lavoro extra da parte tua.
:::

:::info
Se vuoi creare un unico calendario che raccoglie eventi da molti gruppi della chiesa, consulta [Calendario curato](./curated-calendar.md) per un approccio più snello.
:::

## Aggiungere e modificare eventi {#adding-and-editing-events}

Fai clic su **Nuovo evento** nella pagina di dettaglio del calendario per aggiungere un evento, oppure fai clic su un evento nel calendario e poi su **Modifica** per cambiarlo. Il modulo **Nuovo evento** / **Modifica evento** ha questi campi:

- **Gruppo** -- Il gruppo a cui appartiene l'evento. Se la tua chiesa ha dei modelli di evento, puoi anche scegliere un **Modello** per compilare il modulo.
- **Titolo**
- **Foto dell'evento** -- Fai clic su **Aggiungi foto** (o sul riquadro vuoto della foto) per scegliere o caricare un'immagine, ritagliata in un formato ampio 16:9. Fai clic su **Cambia foto** per sostituirla. La foto viene mostrata in cima alla pagina dell'evento sul tuo sito web e come sua anteprima quando un elemento Calendario mostra i **Prossimi eventi** (vedi [Mostrare gli eventi sul tuo sito web](#showing-events-on-your-website)).
- **Descrizione** -- Mostrata nella pagina dell'evento sul tuo sito web. Sono supportati testo in grassetto, elenchi e link.
- **Inizio** e **Fine**, **Si ripete** e **Visibilità** (**Pubblico** o **Privato**).
- **Tag** -- Etichette separate da virgole, ad esempio `youth, students`. Un elemento Calendario sul tuo sito web può essere impostato per mostrare solo gli eventi con un certo tag. Questo è lo stesso campo **Tag** presente nelle impostazioni di iscrizione dell'evento.
- **Chi può vedere le note** e **Chi può scrivere note** -- Chi può leggere e aggiungere alle note dell'evento (vedi [Note dell'evento](#event-notes)). Scegli **Solo staff** (predefinito), **Leader di gruppo** (i leader del gruppo dell'evento) oppure **Membri del gruppo** (tutti nel gruppo dell'evento, inclusi i suoi leader).
- **Sale** e **Risorse** -- Riserva spazi e attrezzature per l'evento. Vedi [Sale, risorse e programmazione](./rooms-resources.md). Una volta scelta una sala o una risorsa, puoi anche aggiungere tempi di allestimento e smontaggio oppure una finestra di prenotazione personalizzata -- vedi [Prenotare una sala o una risorsa](./availability.md#booking-a-room-or-resource).
- **Promemoria** -- Espandi questa sezione per inviare promemoria prima dell'evento. Vedi [Promemoria degli eventi](./event-reminders.md).

**Gruppo**, **Titolo**, **Inizio** e **Fine** sono obbligatori, e la fine deve essere successiva all'inizio. Fai clic su **Salva**. Se l'evento si ripete, B1 ti chiede una conferma, perché il salvataggio aggiorna ogni occorrenza della serie. Per eliminare un evento, aprilo nell'editor e fai clic su **Elimina**.

### Note dell'evento {#event-notes}

Ogni evento ha una propria discussione di note per la pianificazione e il follow-up. Fai clic su un evento nella pagina di dettaglio del calendario; la finestra mostra i dettagli dell'evento, i suoi promemoria e le sue **Note** sotto, con i pulsanti **Modifica**, **Gestisci iscrizioni** e **Rimuovi dal calendario**. Scrivi una nota e pubblicala per aggiungerla alla discussione.

Lo staff con il permesso di modificare contenuti o amministrare i calendari può sempre leggere e scrivere le note degli eventi. Le impostazioni **Chi può vedere le note** e **Chi può scrivere note** dell'evento decidono se anche i leader o i membri del gruppo dell'evento possono farlo.

### Mostrare gli eventi sul tuo sito web {#showing-events-on-your-website}

Per inserire un calendario nel tuo sito web, aggiungi un elemento **Calendario** a una pagina e scegli questo calendario. L'elemento può mostrare un calendario mensile oppure una griglia di riquadri dei prossimi eventi, e può essere limitato agli eventi con un determinato tag. I visitatori che fanno clic su un evento aprono la sua pagina dedicata. Vedi [Usare l'elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Attivare le iscrizioni agli eventi {#enabling-event-registration}

Puoi attivare le iscrizioni per qualsiasi evento del calendario, così i membri possono registrarsi tramite il sito web B1 o l'app mobile.

1. Fai clic su un evento esistente nel calendario (crealo prima, se necessario) e fai clic su **Gestisci iscrizioni**. Si apre la pagina delle iscrizioni dell'evento. (Il pulsante **Attiva le iscrizioni** nella pagina **Iscrizioni** ti porta ai tuoi calendari per scegliere un evento.)
2. Fai clic su **Modifica impostazioni**, poi attiva **Abilita iscrizioni** nella scheda **Impostazioni iscrizione**.
3. Configura le impostazioni di iscrizione:
   - **Capienza** (facoltativa) -- Imposta un numero massimo di iscrizioni. Lascia vuoto per un numero illimitato.
   - **Apertura iscrizioni** -- La data e l'ora in cui le iscrizioni diventano disponibili.
   - **Chiusura iscrizioni** -- La data e l'ora in cui le iscrizioni si chiudono.
   - **Tag** -- Etichette separate da virgole (ad esempio "giovani, ritiro, VBS") per aiutare a categorizzare gli eventi con iscrizione.
   - **Domande di iscrizione** -- Facoltativamente, allega un [modulo](../forms/creating-forms.md) così chi si iscrive risponde a domande aggiuntive (restrizioni alimentari, taglia della maglietta, contatto di emergenza, ecc.) durante la registrazione. Scegli **Nessuno** per non inserire domande.
   - **Attiva lista d'attesa** -- Quando l'evento è al completo, permetti ad altri iscritti di unirsi a una lista d'attesa invece di essere respinti. Vedi [Iscrizioni a pagamento](./paid-registrations.md#waitlist).
4. Fai clic su **Salva impostazioni**.

Per gli eventi a pagamento, la stessa pagina delle impostazioni ti permette di definire **Tipi di partecipante** con prezzo, **Selezioni** facoltative (extra) e **Codici sconto**, con i pagamenti raccolti tramite il fornitore di donazioni della tua chiesa. Vedi [Iscrizioni a pagamento](./paid-registrations.md) per la guida completa.

Una volta attivate le iscrizioni, i membri vedranno un pulsante **Iscriviti a questo evento** quando visualizzano l'evento su [B1.church o nell'app B1](../../b1-church/events/registering.md). Se hai allegato un modulo, chi si iscrive vedrà un passaggio **Domande** durante la registrazione e le sue risposte verranno salvate insieme all'iscrizione.

:::info
Le Domande di iscrizione funzionano solo con moduli che **non** sono contrassegnati come Riservati. Un modulo riservato viene saltato automaticamente durante la registrazione invece di essere mostrato, quindi usa un modulo non riservato quando alleghi domande a un evento.
:::

### Gestire le iscrizioni {#managing-registrations}

Per visualizzare e gestire le iscrizioni ai tuoi eventi:

1. Nel menu Jump, scegli **Calendari > Iscrizioni**.
2. Vedrai una tabella di tutti gli eventi con iscrizioni attive, con titolo dell'evento, data, numero attuale di iscrizioni rispetto alla capienza e tag. Digita in **Cerca eventi** per filtrarla.
3. Fai clic sul nome di un evento per vedere l'elenco completo delle iscrizioni, con le colonne **Nome**, **Membri**, **Tipo**, **Pagati / Totale**, **Stato** e **Data**.
4. Dalla pagina di dettaglio puoi:
   - **Aggiungi partecipante** -- Registra manualmente qualcuno che si è iscritto offline o per telefono.
   - **Annulla iscrizione** sulle singole iscrizioni (ti chiede conferma)
   - **Elimina** definitivamente le iscrizioni (ti chiede conferma)
   - **Promuovi** le iscrizioni in lista d'attesa quando si libera un posto
   - **Esporta CSV** -- Scarica tutte le iscrizioni, inclusi tipi di partecipante, selezioni, importi pagati e risposte alle domande

   Queste azioni di riga sono icone alla fine di ogni riga; passa con il mouse su un'icona per vederne il nome.

Se all'evento sono allegate Domande di iscrizione, la pagina di dettaglio mostra anche un filtro **Solo domande senza risposta** per trovare rapidamente chi non ha ancora inviato le risposte, e un pulsante **Vedi risposte** su ogni iscrizione con risposte per vedere le loro risposte. Gli eventi con tipi di partecipante mostrano anche i conteggi per tipo sopra la tabella, e ogni riga ha una finestra **Dettagli iscrizione** con i pagamenti -- vedi [Iscrizioni a pagamento](./paid-registrations.md#the-registration-roster).

Il lato sinistro della pagina di dettaglio mostra quante persone sono iscritte (la persona che si iscrive più tutti quelli nella sua iscrizione), con una barra di capienza, l'eventuale conteggio della lista d'attesa, i tag dell'evento e i suoi **Promemoria**. Il titolo della scheda **Iscrizioni** conta invece le iscrizioni, che sono ciò che limita la capienza -- quindi una famiglia di quattro persone è una sola iscrizione ma quattro persone.

:::tip
Usa la barra di avanzamento della capienza nella pagina Iscrizioni per monitorare quanto velocemente si stanno riempiendo gli eventi. La barra diventa rossa quando un evento raggiunge o supera la capienza.
:::

## Prossimi passi {#next-steps}

- [Calendario curato](./curated-calendar.md) -- Crea un calendario che attinge da più gruppi
- [Iscrizioni a pagamento](./paid-registrations.md) -- Tipi di partecipante, selezioni extra, codici sconto, pagamenti e liste d'attesa
- [Guida alle iscrizioni agli eventi](../guides/event-registration.md) -- Guida passo passo per configurare le iscrizioni agli eventi
- [Panoramica dei calendari](./index.md) -- Torna alla panoramica dei calendari
