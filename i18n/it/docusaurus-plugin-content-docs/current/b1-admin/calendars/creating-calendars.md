---
title: "Creare calendari"
---

# Creare calendari

<div class="article-intro">

Creare un calendario in B1 Admin ti permette di costruire una vista curata degli eventi collegando uno o più gruppi. Gli eventi sono gestiti dai leader dei gruppi all'interno dei rispettivi gruppi, e il tuo calendario mostra quegli eventi in un unico posto. Gli amministratori con accesso alla modifica possono aggiungere o modificare eventi per qualsiasi gruppo. I leader di gruppo non amministratori possono gestire solo gli eventi dei gruppi che guidano.

</div>

## Video di formazione

<YouTube id="Ko3kgsCSLFs" title="Creare calendari, eventi e prenotazioni di sale in B1" next="Iscrizioni a eventi e a pagamento in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i [gruppi](../groups/creating-groups.md) i cui eventi vuoi includere nel calendario
- Ti serve l'accesso amministrativo alla sezione Calendari di B1 Admin

</div>

## Creare un nuovo calendario

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e clicca su **Calendari**.
2. Clicca su **Aggiungi calendario** in cima alla pagina. Il modulo del nuovo calendario si apre sotto l'elenco dei calendari.
3. Inserisci un **nome** per il calendario (ad esempio "Eventi del ministero giovanile" o "Calendario principale della chiesa").
4. Aggiungi una **descrizione** facoltativa per aiutare il tuo team a capire a cosa serve questo calendario.
5. Clicca su **Crea** per salvare il nuovo calendario.

## La pagina di dettaglio del calendario

Dopo aver creato un calendario, clicca su **Gestisci eventi** nella sua riga per aprire la pagina di dettaglio. Questa pagina ha due aree principali:

- **Colonna sinistra** -- Il nome del calendario con le sue azioni (**Nuovo evento**, **Modifica**, **Importa .ics** e **Stampa**), seguito dall'elenco **Gruppi nel calendario** che mostra quali gruppi sono inclusi in questo calendario. Clicca su **Rimuovi** accanto a un gruppo per toglierlo dal calendario.
- **Area principale** -- La vista **Eventi del calendario** che mostra gli eventi raccolti dai gruppi collegati, con i pulsanti **Iscriviti** e **Aggiungi gruppo** sopra di essa.

## Collegare i gruppi

I gruppi che hanno eventi nel calendario compaiono automaticamente nell'elenco **Gruppi nel calendario** sul lato sinistro della pagina di dettaglio.

1. Clicca su **Aggiungi gruppo** sopra il calendario per associare un gruppo al tuo calendario.
2. Seleziona il gruppo dal menu a tendina. L'elenco include ogni gruppo della tua chiesa, non solo quelli di cui fai parte.
3. Scegli se includere **tutti gli eventi** di quel gruppo oppure solo **eventi specifici**.
4. Clicca su **Salva**.

Ogni evento compare nel calendario una sola volta. Se aggiungi un intero gruppo, eventuali suoi eventi che avevi già aggiunto singolarmente vengono inglobati nella voce del gruppo, e scegliere eventi specifici da un gruppo già presente nel calendario non aggiunge nulla di nuovo. Solo i gruppi aggiunti per intero compaiono in **Gruppi nel calendario**.

### Importare un file .ics

Clicca su **Importa .ics** per portare eventi da un altro calendario. Scegli il **Gruppo** a cui devono appartenere gli eventi, poi clicca su **Scegli file .ics** oppure incolla il contenuto del file, e clicca su **Importa**. Gli eventi vengono creati in quel gruppo, e il gruppo viene aggiunto al calendario da cui hai importato, così gli eventi compaiono subito lì.

### Rimuovere un evento dal calendario

Clicca su un evento nel calendario, poi clicca su **Rimuovi dal calendario**. Questo lo toglie solo da questo calendario -- l'evento resta nel suo gruppo. Se l'evento è nel calendario perché è stato aggiunto l'intero gruppo, rimuoverlo toglie dal calendario tutti gli eventi di quel gruppo (gli eventi restano comunque nel gruppo). Per eliminare un evento in modo definitivo, eliminalo dal [calendario del gruppo](../groups/group-calendar.md).

:::tip
Collegare i gruppi al tuo calendario è un modo efficace per raccogliere automaticamente gli eventi. Quando un leader di gruppo aggiunge un evento al proprio [gruppo](../groups/creating-groups.md), può confluire nel calendario di tutta la chiesa senza alcun lavoro aggiuntivo da parte tua.
:::

:::info
Se vuoi creare un unico calendario che raccoglie eventi da molti gruppi della tua chiesa, consulta [Calendario curato](curated-calendar) per un approccio più snello.
:::

## Aggiungere e modificare gli eventi {#adding-and-editing-events}

Clicca su **Nuovo evento** nella pagina di dettaglio del calendario per aggiungere un evento, oppure clicca su un evento nel calendario e poi su **Modifica** per cambiarlo. Il modulo **Nuovo evento** / **Modifica evento** ha questi campi:

- **Gruppo** -- Il gruppo a cui appartiene l'evento. Se la tua chiesa ha dei modelli di evento, puoi anche scegliere un **Modello** per compilare il modulo.
- **Titolo**
- **Foto dell'evento** -- Clicca su **Aggiungi foto** (oppure sulla casella vuota della foto) per scegliere o caricare un'immagine, ritagliata in un formato ampio 16:9. Clicca su **Cambia foto** per sostituirla. La foto viene mostrata in cima alla pagina dell'evento sul tuo sito web e come sua miniatura quando un elemento Calendario mostra i **Prossimi eventi** (vedi [Mostrare gli eventi sul tuo sito web](#showing-events-on-your-website)).
- **Descrizione** -- Mostrata nella pagina dell'evento sul tuo sito web. Sono supportati testo in grassetto, elenchi e link.
- **Inizio** e **Fine**, **Ripetizione** e **Visibilità** (**Pubblico** o **Privato**).
- **Tag** -- Etichette separate da virgole, come `giovani, studenti`. Un elemento Calendario sul tuo sito web può essere impostato per mostrare solo gli eventi con un certo tag. È lo stesso campo **Tag** mostrato nelle impostazioni di iscrizione dell'evento.
- **Chi può vedere le note** e **Chi può pubblicare note** -- Chi può leggere e aggiungere note alla discussione dell'evento (vedi [Note dell'evento](#event-notes)). Scegli **Solo staff** (l'impostazione predefinita), **Leader del gruppo** (i leader del gruppo dell'evento) oppure **Membri del gruppo** (tutte le persone del gruppo dell'evento, inclusi i suoi leader).
- **Sale** e **Risorse** -- Riserva spazi e attrezzature per l'evento. Vedi [Sale, risorse e pianificazione](rooms-resources).

Clicca su **Salva**. Se l'evento si ripete, B1 ti chiede di confermare, perché salvare aggiorna ogni occorrenza della serie.

### Note dell'evento {#event-notes}

Ogni evento ha una propria discussione di note per la pianificazione e il follow-up. Clicca su un evento nella pagina di dettaglio del calendario; la finestra mostra i dettagli dell'evento, i suoi promemoria e le sue **Note** qui sotto. Scrivi una nota e pubblicala per aggiungerla alla discussione.

Il personale con il permesso di modificare i contenuti o di amministrare i calendari può sempre leggere e pubblicare le note dell'evento. Le impostazioni **Chi può vedere le note** e **Chi può pubblicare note** dell'evento decidono se anche i leader o i membri del gruppo dell'evento possono farlo.

### Mostrare gli eventi sul tuo sito web {#showing-events-on-your-website}

Per inserire un calendario sul tuo sito web, aggiungi un elemento **Calendario** a una pagina e scegli questo calendario. L'elemento può mostrare un calendario mensile oppure una griglia di riquadri con i prossimi eventi, e può essere limitato agli eventi con un solo tag. I visitatori che cliccano su un evento aprono la sua pagina dedicata. Vedi [Uso dell'elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Attivare l'iscrizione agli eventi {#enabling-event-registration}

Puoi attivare le iscrizioni per qualsiasi evento del calendario, così che i membri possano iscriversi tramite il sito web o l'app mobile di B1.

1. Clicca su un evento esistente oppure creane uno nuovo.
2. Nell'editor dell'evento, attiva **Iscrizione**.
3. Configura le impostazioni di iscrizione:
   - **Capienza** (facoltativa) -- Imposta un numero massimo di iscrizioni. Lascia vuoto per un numero illimitato.
   - **Apertura iscrizioni** -- La data e l'ora in cui le iscrizioni diventano disponibili.
   - **Chiusura iscrizioni** -- La data e l'ora in cui le iscrizioni si chiudono.
   - **Tag** -- Etichette separate da virgole (ad esempio "giovani, ritiro, vbs") per aiutare a categorizzare gli eventi con iscrizione.
   - **Domande di iscrizione** -- Facoltativamente, allega un [modulo](../forms/creating-forms.md) così chi si iscrive risponde a domande aggiuntive (restrizioni alimentari, taglia della maglietta, contatto d'emergenza, ecc.) durante la registrazione. Scegli **Nessuno** per non fare domande.
   - **Attiva lista d'attesa** -- Quando l'evento si riempie, consenti agli altri iscritti di entrare in una lista d'attesa invece di essere respinti. Vedi [Iscrizioni a pagamento](paid-registrations#waitlist).
4. Salva l'evento.

Per gli eventi a pagamento, la stessa pagina delle impostazioni ti permette di definire **Tipi di partecipante** con prezzo, **Selezioni** facoltative (extra) e **Codici sconto**, con il pagamento riscosso tramite il fornitore di donazioni della tua chiesa. Vedi [Iscrizioni a pagamento](paid-registrations) per la guida completa.

Una volta attivata l'iscrizione, i membri vedranno un pulsante **Iscriviti a questo evento** quando visualizzano l'evento sul [sito web di B1](../../b1-church/events/registering) o nell'[app mobile di B1](../../b1-mobile/events/registering). Se hai allegato un modulo, chi si iscrive vedrà un passaggio **Domande** durante la registrazione e le sue risposte verranno salvate insieme all'iscrizione.

:::info
Le domande di iscrizione funzionano solo con moduli che **non** sono contrassegnati come Riservati. Un modulo riservato viene saltato automaticamente durante l'iscrizione invece di essere mostrato, quindi usa un modulo non riservato quando alleghi domande a un evento.
:::

### Gestire le iscrizioni

Per vedere e gestire le iscrizioni ai tuoi eventi:

1. Nel menu di navigazione rapida, scegli **Calendari > Iscrizioni**.
2. Vedrai una tabella con tutti gli eventi con iscrizione attiva, che mostra il titolo dell'evento, la data, il numero attuale di iscrizioni rispetto alla capienza e i tag.
3. Clicca su un evento per vedere l'elenco completo delle iscrizioni, inclusi nomi, numero di membri, tipi di partecipante, stato del pagamento e data di iscrizione.
4. Dalla pagina di dettaglio puoi:
   - **Aggiungi partecipante** -- Registrare manualmente qualcuno che si è iscritto offline o per telefono.
   - **Annulla** le singole iscrizioni
   - **Elimina** le iscrizioni in modo definitivo
   - **Promuovi** le iscrizioni in lista d'attesa quando si libera un posto
   - **Esporta CSV** -- Scarica tutte le iscrizioni, inclusi tipi di partecipante, selezioni, importi pagati e risposte alle domande

Se l'evento ha delle domande di iscrizione allegate, la pagina di dettaglio mostra anche un filtro **Solo domande senza risposta** per trovare rapidamente chi non ha ancora inviato le risposte, e un pulsante **Vedi risposte** su ogni iscrizione con risposte per visualizzarle. Gli eventi a pagamento aggiungono una colonna **Tipo**, una colonna **Pagato / Totale**, i conteggi per tipo e una finestra con i dettagli dei pagamenti -- vedi [Iscrizioni a pagamento](paid-registrations#the-registration-roster).

:::tip
Usa la barra di avanzamento della capienza per monitorare quanto velocemente si riempiono gli eventi. La barra diventa rossa quando un evento raggiunge o supera la capienza.
:::

## Passaggi successivi

- [Calendario curato](curated-calendar) -- Crea un calendario che raccoglie eventi da più gruppi
- [Iscrizioni a pagamento](paid-registrations) -- Tipi di partecipante, selezioni extra, codici sconto, pagamenti e liste d'attesa
- [Guida alle iscrizioni agli eventi](../guides/event-registration) -- Guida passo passo per configurare le iscrizioni agli eventi
- [Panoramica dei calendari](./) -- Torna alla panoramica dei calendari
