---
title: "Creazione dei calendari"
---

# Creazione dei calendari

<div class="article-intro">

Creare un calendario in B1 Admin ti permette di costruire una vista curata degli eventi collegando uno o più gruppi. Gli eventi sono gestiti dai leader dei gruppi all'interno dei loro gruppi, e il tuo calendario mostra quegli eventi in un unico posto. Anche un amministratore di dominio non può aggiungere o modificare eventi direttamente nella sezione calendario a meno che non sia un leader del gruppo a cui appartengono gli eventi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i [gruppi](../groups/creating-groups.md) i cui eventi vuoi includere nel tuo calendario
- Hai bisogno dell'accesso amministrativo alla sezione Calendari in B1 Admin

</div>

## Creazione di un nuovo calendario

1. In B1 Admin, vai su **Sito web**, poi alla sezione **Calendari**.
2. Fai clic su **Aggiungi calendario**.
3. Inserisci un **nome** per il tuo calendario (ad esempio, "Eventi Ministero Giovanile" o "Calendario Principale della Chiesa").
4. Aggiungi una **descrizione** facoltativa per aiutare il tuo team a capire a cosa serve questo calendario.
5. Fai clic su **Crea** per salvare il tuo nuovo calendario.

## La pagina di dettaglio del calendario

Dopo aver creato un calendario, fai clic su di esso per aprire la pagina di dettaglio. Questa pagina ha due aree principali:

- **Colonna sinistra** -- Una vista del calendario che mostra gli eventi provenienti dai gruppi collegati.
- **Colonna destra** -- L'elenco dei gruppi associati. Qui gestisci quali gruppi sono inclusi in questo calendario.

## Collegamento dei gruppi

I gruppi che hanno eventi nel calendario appaiono automaticamente nell'elenco dei gruppi sul lato destro della pagina di dettaglio.

1. Fai clic su **Aggiungi** nella sezione gruppi per associare un gruppo al tuo calendario.
2. Seleziona il gruppo dal menu a tendina.
3. Scegli se includere **tutti gli eventi** di quel gruppo o solo **eventi specifici**.
4. Fai clic su **Salva**.

:::tip
Collegare i gruppi al tuo calendario è un modo potente per aggregare automaticamente gli eventi. Quando un leader di gruppo aggiunge un evento al proprio [gruppo](../groups/creating-groups.md), questo può confluire nel calendario dell'intera chiesa senza alcun lavoro aggiuntivo da parte tua.
:::

:::info
Se vuoi creare un unico calendario che raccoglie eventi da molti gruppi della tua chiesa, consulta [Calendario curato](curated-calendar) per un approccio semplificato.
:::

## Abilitazione della registrazione agli eventi

Puoi abilitare la registrazione per qualsiasi evento del calendario in modo che i membri possano iscriversi tramite il sito web B1 o l'app mobile.

1. Fai clic su un evento esistente o creane uno nuovo.
2. Nell'editor dell'evento, attiva **Registrazione** per abilitarla.
3. Configura le impostazioni di registrazione:
   - **Capacità** (facoltativo) -- Imposta un numero massimo di registrazioni. Lascia vuoto per illimitato.
   - **Apertura registrazione** -- La data e l'ora in cui la registrazione diventa disponibile.
   - **Chiusura registrazione** -- La data e l'ora in cui la registrazione si chiude.
   - **Tag** -- Etichette separate da virgola (ad es. "giovani, ritiro, vbs") per aiutare a categorizzare gli eventi registrabili.
   - **Domande di registrazione** -- Facoltativamente allega un [modulo](../forms/creating-forms.md) in modo che gli iscritti rispondano a domande aggiuntive (restrizioni alimentari, taglia della maglietta, contatto di emergenza, ecc.) durante l'iscrizione. Scegli **Nessuno** per saltare le domande.
   - **Abilita lista d'attesa** -- Quando l'evento raggiunge il completo, permetti ad altri iscritti di unirsi a una lista d'attesa invece di essere respinti. Consulta [Registrazioni a pagamento](paid-registrations#waitlist).
4. Salva l'evento.

Per gli eventi a pagamento, la stessa pagina delle impostazioni ti permette di definire **Tipi di partecipante** con prezzo, **Selezioni** facoltative (extra) e **Codici sconto**, con il pagamento raccolto tramite il provider di donazioni della tua chiesa. Consulta [Registrazioni a pagamento](paid-registrations) per la guida completa.

Una volta abilitata la registrazione, i membri vedranno un pulsante **Registrati per questo evento** quando visualizzano l'evento sul [sito web B1](../../b1-church/events/registering) o sull'[app B1 Mobile](../../b1-mobile/events/registering). Se hai allegato un modulo, gli iscritti vedranno un passaggio **Domande** durante la registrazione e le loro risposte verranno salvate insieme alla loro iscrizione.

:::info
Le Domande di registrazione funzionano solo con moduli che **non** sono contrassegnati come Riservati. Un modulo riservato viene saltato automaticamente durante la registrazione anziché mostrato, quindi usa un modulo non riservato quando alleghi domande a un evento.
:::

### Gestione delle registrazioni

Per visualizzare e gestire le registrazioni per i tuoi eventi:

1. Vai alla pagina **Registrazioni** in B1 Admin.
2. Vedrai una tabella di tutti gli eventi con la registrazione abilitata, che mostra il titolo dell'evento, la data, il conteggio attuale delle registrazioni rispetto alla capacità e i tag.
3. Fai clic su un evento per vedere l'elenco completo delle registrazioni, inclusi nomi, numero di membri, tipi di partecipante, stato del pagamento e data di registrazione.
4. Dalla pagina di dettaglio, puoi:
   - **Aggiungi partecipante** -- Registra manualmente qualcuno che si è iscritto offline o per telefono.
   - **Annulla** singole registrazioni
   - **Elimina** le registrazioni permanentemente
   - **Promuovi** le registrazioni in lista d'attesa quando si libera un posto
   - **Esporta CSV** -- Scarica tutte le registrazioni, inclusi tipi di partecipante, selezioni, importi pagati e risposte alle domande

Se l'evento ha Domande di registrazione allegate, la pagina di dettaglio mostra anche un filtro **Solo domande senza risposta** per trovare rapidamente gli iscritti che non hanno ancora inviato risposte, e un pulsante **Visualizza risposte** su ogni registrazione con risposta per vedere le loro risposte. Gli eventi a pagamento aggiungono una colonna **Tipo**, una colonna **Pagato / Totale**, conteggi per tipo, e una finestra di dettaglio dei pagamenti -- consulta [Registrazioni a pagamento](paid-registrations#the-registration-roster).

:::tip
Usa la barra di progresso della capacità per monitorare quanto velocemente si stanno riempiendo gli eventi. La barra diventa rossa quando un evento è al completo o oltre la capacità.
:::

## Prossimi passi

- [Calendario curato](curated-calendar) -- Crea un calendario che raccoglie eventi da più gruppi
- [Registrazioni a pagamento](paid-registrations) -- Tipi di partecipante, selezioni extra, codici sconto, pagamenti e liste d'attesa
- [Guida alla registrazione eventi](../guides/event-registration) -- Guida passo-passo per configurare la registrazione agli eventi
- [Panoramica calendari](./) -- Torna alla panoramica dei calendari
