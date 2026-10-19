---
title: "Creare i calendari"
---

# Creare i calendari

<div class="article-intro">

Creare un calendario in B1 Admin ti permette di costruire una vista curata degli eventi collegando uno o più gruppi. Gli eventi sono gestiti dai responsabili dei gruppi all'interno dei rispettivi gruppi, e il tuo calendario mostra quegli eventi in un unico punto. Gli amministratori con accesso alla modifica possono aggiungere o modificare eventi per qualsiasi gruppo. I responsabili di gruppo non amministratori possono gestire solo gli eventi dei gruppi che guidano.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i [gruppi](../groups/creating-groups.md) i cui eventi vuoi includere nel tuo calendario
- Ti serve l'accesso amministrativo alla sezione Calendari di B1 Admin

</div>

## Creare un nuovo calendario

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e fai clic su **Calendari**.
2. Fai clic su **Aggiungi calendario** in cima alla pagina. Il modulo del nuovo calendario si apre sotto l'elenco dei calendari.
3. Inserisci un **nome** per il tuo calendario (ad esempio, "Eventi del Ministero Giovanile" o "Calendario Principale della Chiesa").
4. Aggiungi una **descrizione** facoltativa per aiutare il tuo team a capire a cosa serve questo calendario.
5. Fai clic su **Crea** per salvare il nuovo calendario.

## La pagina di dettaglio del calendario

Dopo aver creato un calendario, fai clic su **Gestisci eventi** nella sua riga per aprire la pagina di dettaglio. Questa pagina ha due aree principali:

- **Colonna sinistra** -- Il nome del calendario con le sue azioni (**Nuovo evento**, **Modifica**, **Importa .ics** e **Stampa**), seguito dall'elenco **Gruppi nel calendario** che mostra quali gruppi sono inclusi in questo calendario. Fai clic su **Rimuovi** accanto a un gruppo per toglierlo dal calendario.
- **Area principale** -- La vista **Eventi del calendario** con gli eventi importati dai gruppi collegati, con i pulsanti **Iscriviti** e **Aggiungi gruppo** sopra di essa.

## Collegare i gruppi

I gruppi che hanno eventi nel calendario compaiono automaticamente nell'elenco **Gruppi nel calendario** sul lato sinistro della pagina di dettaglio.

1. Fai clic su **Aggiungi gruppo** sopra il calendario per associare un gruppo al tuo calendario.
2. Seleziona il gruppo dal menu a discesa.
3. Scegli se includere **tutti gli eventi** di quel gruppo oppure solo **eventi specifici**.
4. Fai clic su **Salva**.

:::tip
Collegare i gruppi al tuo calendario è un modo efficace per aggregare automaticamente gli eventi. Quando un responsabile di gruppo aggiunge un evento al proprio [gruppo](../groups/creating-groups.md), questo può confluire nel calendario generale della chiesa senza alcun lavoro aggiuntivo da parte tua.
:::

:::info
Se vuoi creare un unico calendario che raccoglie eventi da molti gruppi della chiesa, consulta [Calendario curato](curated-calendar) per un approccio più snello.
:::

## Aggiungere e modificare eventi {#adding-and-editing-events}

Fai clic su **Nuovo evento** nella pagina di dettaglio del calendario per aggiungere un evento, oppure fai clic su un evento del calendario e poi su **Modifica** per cambiarlo. Il modulo **Nuovo evento** / **Modifica evento** ha questi campi:

- **Gruppo** -- Il gruppo a cui appartiene l'evento. Se la tua chiesa ha dei modelli di evento, puoi anche scegliere un **Modello** per compilare il modulo.
- **Titolo**
- **Foto dell'evento** -- Fai clic su **Aggiungi foto** (o sulla casella vuota della foto) per scegliere o caricare un'immagine, ritagliata in formato ampio 16:9. Fai clic su **Cambia foto** per sostituirla. La foto viene mostrata in cima alla pagina dell'evento sul tuo sito web e come sua miniatura quando un elemento Calendario mostra i **Prossimi eventi** (vedi [Mostrare gli eventi sul tuo sito web](#showing-events-on-your-website)).
- **Descrizione** -- Mostrata nella pagina dell'evento sul tuo sito web. Sono supportati testo in grassetto, elenchi e collegamenti.
- **Inizio** e **Fine**, **Ripetizione** e **Visibilità** (**Pubblico** o **Privato**).
- **Tag** -- Etichette separate da virgole, come `youth, students`. Un elemento Calendario sul tuo sito web può essere impostato per mostrare solo gli eventi con un determinato tag. Questo è lo stesso campo **Tag** presente nelle impostazioni di registrazione dell'evento.
- **Chi può vedere le note** e **Chi può scrivere note** -- Chi può leggere e aggiungere note all'evento (vedi [Note dell'evento](#event-notes)). Scegli **Solo staff** (predefinito), **Responsabili del gruppo** (leader del gruppo dell'evento) oppure **Membri del gruppo** (tutti i membri del gruppo dell'evento, inclusi i suoi responsabili).
- **Sale** e **Risorse** -- Prenota spazi e attrezzature per l'evento. Vedi [Sale, risorse e pianificazione](rooms-resources).

Fai clic su **Salva**. Se l'evento si ripete, B1 ti chiede di confermare, perché salvare aggiorna ogni occorrenza della serie.

### Note dell'evento {#event-notes}

Ogni evento ha il proprio thread di note per la pianificazione e il follow-up. Fai clic su un evento nella pagina di dettaglio del calendario; la finestra mostra i dettagli dell'evento, i suoi promemoria e le sue **Note** in basso. Scrivi una nota e pubblicala per aggiungerla al thread.

Il personale con il permesso di modificare i contenuti o di amministrare i calendari può sempre leggere e pubblicare le note dell'evento. Le impostazioni **Chi può vedere le note** e **Chi può scrivere note** dell'evento decidono se anche i responsabili o i membri del gruppo dell'evento possono farlo.

### Mostrare gli eventi sul tuo sito web {#showing-events-on-your-website}

Per inserire un calendario sul tuo sito web, aggiungi un elemento **Calendario** a una pagina e scegli questo calendario. L'elemento può mostrare un calendario mensile oppure una griglia di riquadri degli eventi imminenti, e può essere limitato agli eventi con un determinato tag. I visitatori che fanno clic su un evento aprono la sua pagina dedicata. Vedi [Uso dell'elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Abilitare la registrazione agli eventi {#enabling-event-registration}

Puoi abilitare la registrazione per qualsiasi evento del calendario, così i membri possono iscriversi tramite il sito web B1 o l'app mobile.

1. Fai clic su un evento esistente oppure creane uno nuovo.
2. Nell'editor dell'evento, attiva **Registrazione**.
3. Configura le impostazioni di registrazione:
   - **Capienza** (facoltativa) -- Imposta un numero massimo di registrazioni. Lascia vuoto per un numero illimitato.
   - **Apertura registrazioni** -- La data e l'ora in cui la registrazione diventa disponibile.
   - **Chiusura registrazioni** -- La data e l'ora in cui la registrazione si chiude.
   - **Tag** -- Etichette separate da virgole (ad esempio "youth, retreat, vbs") per aiutare a categorizzare gli eventi con registrazione.
   - **Domande di registrazione** -- Facoltativamente collega un [modulo](../forms/creating-forms.md) così i partecipanti rispondono a domande aggiuntive (restrizioni alimentari, taglia della maglietta, contatto di emergenza, ecc.) durante l'iscrizione. Scegli **Nessuno** per saltare le domande.
   - **Abilita lista d'attesa** -- Quando l'evento è al completo, permetti ai partecipanti in più di entrare in una lista d'attesa invece di essere respinti. Vedi [Registrazioni a pagamento](paid-registrations#waitlist).
4. Salva l'evento.

Per gli eventi a pagamento, la stessa pagina delle impostazioni ti permette di definire **Tipi di partecipante** con prezzo, **Selezioni** facoltative (extra) e **Codici sconto**, con il pagamento raccolto tramite il provider di donazioni della tua chiesa. Vedi [Registrazioni a pagamento](paid-registrations) per la guida completa.

Una volta abilitata la registrazione, i membri vedranno un pulsante **Registrati a questo evento** quando visualizzano l'evento sul [sito web B1](../../b1-church/events/registering) o nell'[app mobile B1](../../b1-mobile/events/registering). Se hai collegato un modulo, i partecipanti vedono un passaggio **Domande** durante la registrazione e le loro risposte vengono salvate insieme alla registrazione.

:::info
Le domande di registrazione funzionano solo con moduli che **non** sono contrassegnati come Riservati. Un modulo riservato viene saltato automaticamente durante la registrazione anziché essere mostrato, quindi usa un modulo non riservato quando alleghi domande a un evento.
:::

### Gestire le registrazioni

Per visualizzare e gestire le registrazioni ai tuoi eventi:

1. Nel menu Jump, scegli **Calendari > Registrazioni**.
2. Vedrai una tabella di tutti gli eventi con registrazione abilitata, che mostra il titolo dell'evento, la data, il numero attuale di registrazioni rispetto alla capienza e i tag.
3. Fai clic su un evento per vedere l'elenco completo delle registrazioni, inclusi nomi, numero di membri, tipi di partecipante, stato del pagamento e data di registrazione.
4. Dalla pagina di dettaglio, puoi:
   - **Aggiungi partecipante** -- Registra manualmente qualcuno che si è iscritto di persona o per telefono.
   - **Annulla** singole registrazioni
   - **Elimina** definitivamente le registrazioni
   - **Promuovi** le registrazioni in lista d'attesa quando si libera un posto
   - **Esporta CSV** -- Scarica tutte le registrazioni, inclusi tipi di partecipante, selezioni, importi pagati e risposte alle domande

Se all'evento sono collegate domande di registrazione, la pagina di dettaglio mostra anche un filtro **Solo domande senza risposta** per trovare rapidamente i partecipanti che non hanno ancora inviato risposte, e un pulsante **Vedi risposte** su ogni registrazione con risposte per vedere le loro risposte. Gli eventi a pagamento aggiungono una colonna **Tipo**, una colonna **Pagato / Totale**, i conteggi per tipo e una finestra con i dettagli dei pagamenti — vedi [Registrazioni a pagamento](paid-registrations#the-registration-roster).

:::tip
Usa la barra di avanzamento della capienza per monitorare quanto velocemente si riempiono gli eventi. La barra diventa rossa quando un evento raggiunge o supera la capienza.
:::

## Passi successivi

- [Calendario curato](curated-calendar) -- Crea un calendario che attinge da più gruppi
- [Registrazioni a pagamento](paid-registrations) -- Tipi di partecipante, selezioni extra, codici sconto, pagamenti e liste d'attesa
- [Guida alla registrazione agli eventi](../guides/event-registration) -- Guida passo passo per configurare la registrazione agli eventi
- [Panoramica dei calendari](./) -- Torna alla panoramica dei calendari
