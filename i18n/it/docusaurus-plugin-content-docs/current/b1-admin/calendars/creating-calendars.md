---
title: "Creazione di calendari"
description: "Crea un calendario in B1 Admin, collega i gruppi o importa file .ics e gestisci da un unico punto i suoi eventi, le iscrizioni e le note."
---

# Creazione di calendari

<div class="article-intro">

Creare un calendario in B1 Admin ti permette di costruire una visualizzazione personalizzata degli eventi collegando uno o più gruppi. Gli eventi sono gestiti dai responsabili di gruppo all'interno dei rispettivi gruppi, mentre il calendario mostra tutti questi eventi in un unico posto. Gli amministratori con accesso di modifica possono aggiungere o modificare eventi per qualsiasi gruppo. I responsabili di gruppo che non sono amministratori possono gestire solo gli eventi dei gruppi che guidano.

</div>

## Video di formazione

<YouTube id="Ko3kgsCSLFs" title="Creazione di calendari, eventi e prenotazioni di sale in B1" next="Iscrizioni agli eventi e eventi a pagamento in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i [gruppi](../groups/creating-groups.md) i cui eventi vuoi includere nel calendario
- Ti serve l'accesso amministrativo alla sezione Calendari di B1 Admin

</div>

## Creazione di un nuovo calendario

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari** e fai clic su **Calendari**.
2. Fai clic su **Aggiungi calendario** in cima alla pagina. Il modulo per il nuovo calendario si apre sotto l'elenco dei calendari.
3. Inserisci un **nome** per il calendario (ad esempio, "Eventi del ministero giovanile" o "Calendario principale della chiesa").
4. Aggiungi una **descrizione** facoltativa per aiutare il tuo team a capire a cosa serve questo calendario.
5. Fai clic su **Crea** per salvare il nuovo calendario.

## La pagina di dettaglio del calendario

Dopo aver creato un calendario, fai clic su **Gestisci eventi** nella sua riga per aprire la pagina di dettaglio. Questa pagina è composta da due aree principali:

- **Colonna sinistra** -- Il nome del calendario con le sue azioni (**Nuovo evento**, **Modifica**, **Importa .ics** e **Stampa**), seguito dall'elenco **Gruppi nel calendario** che mostra quali gruppi sono inclusi in questo calendario. Fai clic su **Rimuovi** accanto a un gruppo per escluderlo dal calendario.
- **Area principale** -- La vista **Eventi del calendario** con gli eventi provenienti dai gruppi collegati, con i pulsanti **Iscriviti** e **Aggiungi gruppo** sopra di essa.

## Collegamento dei gruppi

I gruppi che hanno eventi nel calendario compaiono automaticamente nell'elenco **Gruppi nel calendario** sul lato sinistro della pagina di dettaglio.

1. Fai clic su **Aggiungi gruppo** sopra il calendario per associare un gruppo al calendario.
2. Seleziona il gruppo dal menu a discesa. L'elenco include tutti i gruppi della tua chiesa, non solo quelli a cui appartieni.
3. Scegli se includere **tutti gli eventi** di quel gruppo o solo **eventi specifici**.
4. Fai clic su **Salva**.

Ogni evento compare nel calendario una sola volta. Se aggiungi un intero gruppo, eventuali suoi eventi che avevi già aggiunto singolarmente vengono inglobati nella voce del gruppo, mentre selezionare eventi specifici da un gruppo già presente nel calendario non aggiunge nulla di nuovo. Nell'elenco **Gruppi nel calendario** compaiono solo i gruppi aggiunti per intero.

### Importazione di un file .ics

Fai clic su **Importa .ics** per importare eventi da un altro calendario. Scegli il **Gruppo** a cui devono appartenere gli eventi, quindi fai clic su **Scegli file .ics** oppure incolla il contenuto del file, e infine fai clic su **Importa**. Gli eventi vengono creati in quel gruppo, e il gruppo viene aggiunto al calendario da cui hai importato, così gli eventi compaiono subito lì.

### Rimozione di un evento dal calendario

Fai clic su un evento nel calendario, quindi fai clic su **Rimuovi dal calendario**. Questo rimuove l'evento solo da questo calendario: l'evento resta nel suo gruppo. Se l'evento è nel calendario perché è stato aggiunto l'intero gruppo, rimuoverlo toglie dal calendario tutti gli eventi di quel gruppo (che però restano nel gruppo). Per eliminare definitivamente un evento, cancellalo dal [calendario del gruppo](../groups/group-calendar.md).

:::tip
Collegare i gruppi al calendario è un modo efficace per aggregare automaticamente gli eventi. Quando un responsabile di gruppo aggiunge un evento al proprio [gruppo](../groups/creating-groups.md), questo può confluire nel calendario di tutta la chiesa senza alcun lavoro aggiuntivo da parte tua.
:::

:::info
Se vuoi creare un unico calendario che raccolga eventi da molti gruppi di tutta la chiesa, consulta [Calendario curato](./curated-calendar.md) per un approccio più snello.
:::

## Aggiunta e modifica di eventi {#adding-and-editing-events}

Fai clic su **Nuovo evento** nella pagina di dettaglio del calendario per aggiungere un evento, oppure fai clic su un evento nel calendario e poi su **Modifica** per cambiarlo. Il modulo **Nuovo evento** / **Modifica evento** contiene questi campi:

- **Gruppo** -- Il gruppo a cui appartiene l'evento. Se la tua chiesa ha dei modelli di evento, puoi anche scegliere un **Modello** per compilare il modulo.
- **Titolo**
- **Foto dell'evento** -- Fai clic su **Aggiungi foto** (o sulla casella vuota della foto) per scegliere o caricare un'immagine, ritagliata in formato panoramico 16:9. Fai clic su **Cambia foto** per sostituirla. La foto viene mostrata in cima alla pagina dell'evento sul tuo sito web e come riquadro quando un elemento Calendario mostra **Prossimi eventi** (vedi [Mostrare gli eventi sul tuo sito web](#showing-events-on-your-website)).
- **Descrizione** -- Mostrata nella pagina dell'evento sul tuo sito web. Sono supportati testo in grassetto, elenchi e link.
- **Inizio** e **Fine**, **Ripetizione** e **Visibilità** (**Pubblico** o **Privato**).
- **Tag** -- Etichette separate da virgole, ad esempio `giovani, studenti`. Un elemento Calendario sul tuo sito web può essere impostato per mostrare solo gli eventi con un determinato tag. Questo è lo stesso campo **Tag** presente nelle impostazioni di iscrizione dell'evento.
- **Chi può vedere le note** e **Chi può scrivere note** -- Chi può leggere e aggiungere note all'evento (vedi [Note dell'evento](#event-notes)). Scegli **Solo staff** (l'impostazione predefinita), **Responsabili di gruppo** (i leader del gruppo dell'evento) oppure **Membri del gruppo** (tutti i membri del gruppo dell'evento, compresi i suoi responsabili).
- **Sale** e **Risorse** -- Riserva spazi e attrezzature per l'evento. Vedi [Sale, risorse e pianificazione](./rooms-resources.md).

Fai clic su **Salva**. Se l'evento si ripete, B1 ti chiede di confermare, perché il salvataggio aggiorna tutte le occorrenze della serie.

### Note dell'evento {#event-notes}

Ogni evento ha una propria discussione di note per la pianificazione e il follow-up. Fai clic su un evento nella pagina di dettaglio del calendario: la finestra mostra i dettagli dell'evento, i suoi promemoria e le sue **Note** sotto. Scrivi una nota e pubblicala per aggiungerla alla discussione.

Lo staff con il permesso di modificare i contenuti o di amministrare i calendari può sempre leggere e pubblicare note sugli eventi. Le impostazioni **Chi può vedere le note** e **Chi può scrivere note** dell'evento decidono se anche i responsabili o i membri del gruppo dell'evento possono farlo.

### Mostrare gli eventi sul tuo sito web {#showing-events-on-your-website}

Per inserire un calendario sul tuo sito web, aggiungi un elemento **Calendario** a una pagina e scegli questo calendario. L'elemento può mostrare un calendario mensile oppure una griglia di riquadri con i prossimi eventi, e può essere limitato agli eventi con un determinato tag. I visitatori che fanno clic su un evento aprono la sua pagina dedicata. Vedi [Uso dell'elemento Calendario](../website/page-editor.md#using-the-calendar-element).

## Abilitazione delle iscrizioni agli eventi {#enabling-event-registration}

Puoi abilitare le iscrizioni per qualsiasi evento del calendario, così i membri possono registrarsi tramite il sito web di B1 o l'app mobile.

1. Fai clic su un evento esistente oppure creane uno nuovo.
2. Nell'editor dell'evento, attiva **Iscrizione** per abilitarla.
3. Configura le impostazioni di iscrizione:
   - **Capienza** (facoltativo) -- Imposta un numero massimo di iscrizioni. Lascia vuoto per iscrizioni illimitate.
   - **Apertura iscrizioni** -- La data e l'ora in cui le iscrizioni diventano disponibili.
   - **Chiusura iscrizioni** -- La data e l'ora in cui le iscrizioni si chiudono.
   - **Tag** -- Etichette separate da virgole (ad esempio "giovani, ritiro, VBS") per aiutare a categorizzare gli eventi a cui ci si può iscrivere.
   - **Domande di iscrizione** -- Facoltativamente, collega un [modulo](../forms/creating-forms.md) così chi si iscrive risponde a domande aggiuntive (restrizioni alimentari, taglia della maglietta, contatto di emergenza, ecc.) durante la registrazione. Scegli **Nessuno** per non porre domande.
   - **Abilita lista d'attesa** -- Quando l'evento è al completo, permetti ai nuovi iscritti di entrare in una lista d'attesa invece di essere respinti. Vedi [Iscrizioni a pagamento](./paid-registrations.md#waitlist).
4. Salva l'evento.

Per gli eventi a pagamento, la stessa pagina delle impostazioni ti permette di definire **Tipi di partecipante** con un prezzo, **Selezioni** facoltative (extra) e **Codici sconto**, con il pagamento gestito tramite il fornitore di donazioni della tua chiesa. Vedi [Iscrizioni a pagamento](./paid-registrations.md) per la guida completa.

Una volta abilitate le iscrizioni, i membri vedranno un pulsante **Iscriviti a questo evento** quando visualizzano l'evento su [B1.church o nell'app B1](../../b1-church/events/registering.md). Se hai allegato un modulo, chi si iscrive vedrà un passaggio **Domande** durante la registrazione e le risposte verranno salvate insieme all'iscrizione.

:::info
Le domande di iscrizione funzionano solo con moduli **non** contrassegnati come Riservati. Un modulo riservato viene saltato automaticamente durante la registrazione invece di essere mostrato, quindi usa un modulo non riservato quando alleghi domande a un evento.
:::

### Gestione delle iscrizioni

Per visualizzare e gestire le iscrizioni ai tuoi eventi:

1. Nel menu Jump, scegli **Calendari > Iscrizioni**.
2. Vedrai una tabella con tutti gli eventi che hanno le iscrizioni abilitate, con il titolo dell'evento, la data, il numero attuale di iscritti rispetto alla capienza e i tag.
3. Fai clic su un evento per vedere l'elenco completo delle iscrizioni, con nomi, numero di membri, tipi di partecipante, stato del pagamento e data di iscrizione.
4. Dalla pagina di dettaglio puoi:
   - **Aggiungi partecipante** -- Registra manualmente qualcuno che si è iscritto di persona o per telefono.
   - **Annulla** le singole iscrizioni
   - **Elimina** le iscrizioni in modo permanente
   - **Promuovi** le iscrizioni in lista d'attesa quando si libera un posto
   - **Esporta CSV** -- Scarica tutte le iscrizioni, inclusi tipi di partecipante, selezioni, importi pagati e risposte alle domande

Se all'evento sono collegate domande di iscrizione, la pagina di dettaglio mostra anche un filtro **Solo domande senza risposta** per trovare rapidamente chi non ha ancora inviato le risposte, e un pulsante **Vedi risposte** su ogni iscrizione con risposte per visualizzarle. Gli eventi a pagamento aggiungono una colonna **Tipo**, una colonna **Pagati / Totale**, i conteggi per tipo e una finestra con il dettaglio dei pagamenti -- vedi [Iscrizioni a pagamento](./paid-registrations.md#the-registration-roster).

:::tip
Usa la barra di avanzamento della capienza per controllare quanto velocemente si stanno riempiendo gli eventi. La barra diventa rossa quando un evento raggiunge o supera la capienza.
:::

## Passi successivi

- [Calendario curato](./curated-calendar.md) -- Crea un calendario che raccoglie eventi da più gruppi
- [Iscrizioni a pagamento](./paid-registrations.md) -- Tipi di partecipante, selezioni extra, codici sconto, pagamenti e liste d'attesa
- [Guida alle iscrizioni agli eventi](../guides/event-registration.md) -- Guida passo passo per configurare le iscrizioni agli eventi
- [Panoramica dei calendari](./index.md) -- Torna alla panoramica dei calendari
