---
title: "Creazione di Calendari"
---

# Creazione di Calendari

<div class="article-intro">

La creazione di un calendario in B1 Admin ti consente di creare una visualizzazione curata degli eventi collegando uno o più gruppi. Gli eventi sono gestiti dai leader del gruppo all'interno dei loro gruppi, e il tuo calendario mostra questi eventi in un unico luogo. Gli amministratori con accesso in modifica possono aggiungere o modificare gli eventi per qualsiasi gruppo. I leader del gruppo non amministratori possono gestire solo gli eventi dei gruppi che guidano.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i [gruppi](../groups/creating-groups.md) i cui eventi vuoi includere nel tuo calendario
- Hai bisogno dell'accesso amministrativo alla sezione Calendari in B1 Admin

</div>

## Creazione di un Nuovo Calendario

1. In B1 Admin, apri il [Menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Calendari**, e fai clic su **Calendari**.
2. Fai clic su **Aggiungi Calendario**.
3. Inserisci un **nome** per il tuo calendario (ad esempio, "Eventi di Youth Ministry" o "Calendario Principale della Chiesa").
4. Aggiungi una **descrizione** facoltativa per aiutare il tuo team a capire a cosa serve questo calendario.
5. Fai clic su **Crea** per salvare il tuo nuovo calendario.

## La Pagina di Dettaglio del Calendario

Dopo aver creato un calendario, fai clic su di esso per aprire la pagina di dettaglio. Questa pagina ha due aree principali:

- **Colonna sinistra** -- Una visualizzazione del calendario che mostra gli eventi provenienti dai gruppi collegati.
- **Colonna destra** -- L'elenco dei gruppi associati. Qui gestisci quali gruppi sono inclusi in questo calendario.

## Collegamento di Gruppi

I gruppi che hanno eventi nel calendario appaiono automaticamente nell'elenco dei gruppi sul lato destro della pagina di dettaglio.

1. Fai clic su **Aggiungi** nella sezione dei gruppi per associare un gruppo al tuo calendario.
2. Seleziona il gruppo dal menu a discesa.
3. Scegli se includere **tutti gli eventi** da quel gruppo o solo **eventi specifici**.
4. Fai clic su **Salva**.

:::tip
Il collegamento dei gruppi al tuo calendario è un modo potente per aggregare automaticamente gli eventi. Quando un leader del gruppo aggiunge un evento al suo [gruppo](../groups/creating-groups.md), può fluire nel tuo calendario della chiesa senza alcun lavoro aggiuntivo da parte tua.
:::

:::info
Se vuoi creare un singolo calendario che estrae gli eventi da molti gruppi in tutta la tua chiesa, vedi [Calendario Curato](curated-calendar) per un approccio semplificato.
:::

## Abilitazione della Registrazione degli Eventi

Puoi abilitare la registrazione per qualsiasi evento del calendario in modo che i membri possano iscriversi tramite il sito Web B1 o l'app mobile.

1. Fai clic su un evento esistente o creane uno nuovo.
2. Nell'editor degli eventi, attiva/disattiva **Registrazione** per abilitarla.
3. Configura le impostazioni di registrazione:
   - **Capacità** (facoltativo) -- Imposta il numero massimo di registrazioni. Lascia vuoto per illimitato.
   - **Registrazione Aperta** -- La data e l'ora in cui la registrazione diventa disponibile.
   - **Registrazione Chiude** -- La data e l'ora in cui la registrazione si chiude.
   - **Tag** -- Etichette separate da virgole (ad esempio, "giovani, ritiro, vbs") per aiutare a categorizzare gli eventi registrabili.
   - **Domande di Registrazione** -- Allega facoltativamente un [modulo](../forms/creating-forms.md) in modo che i registranti rispondano a domande aggiuntive (restrizioni dietetiche, taglia della maglietta, contatto di emergenza, ecc.) come parte dell'iscrizione. Scegli **Nessuno** per saltare le domande.
   - **Abilita Lista d'Attesa** -- Quando l'evento si riempie, consenti ai registranti aggiuntivi di unirsi a una lista d'attesa invece di essere rifiutati. Vedi [Registrazioni a Pagamento](paid-registrations#waitlist).
4. Salva l'evento.

Per gli eventi a pagamento, la stessa pagina di impostazioni ti consente di definire i **Tipi di Partecipanti** con prezzo, **Selezioni** facoltative (componenti aggiuntivi) e **Codici di Sconto**, con il pagamento raccolto attraverso il provider di donazioni della tua chiesa. Vedi [Registrazioni a Pagamento](paid-registrations) per la procedura completa.

Una volta abilitata la registrazione, i membri vedranno un pulsante **Registrati per questo Evento** quando visualizzano l'evento sul [sito Web B1](../../b1-church/events/registering) o [app mobile B1](../../b1-mobile/events/registering). Se hai allegato un modulo, i registranti vedono un passaggio **Domande** durante la registrazione e le loro risposte vengono salvate con la loro registrazione.

:::info
Le Domande di Registrazione funzionano solo con moduli che **non** sono contrassegnati come Limitati. Un modulo limitato viene saltato automaticamente durante la registrazione anziché essere mostrato, quindi usa un modulo non limitato quando allega le domande a un evento.
:::

### Gestione delle Registrazioni

Per visualizzare e gestire le registrazioni per i tuoi eventi:

1. Nel Menu Jump, scegli **Calendari > Registrazioni**.
2. Vedrai una tabella di tutti gli eventi con registrazione abilitata, che mostra il titolo dell'evento, la data, il numero di registrazione attuale rispetto alla capacità e i tag.
3. Fai clic su un evento per vedere l'elenco completo delle registrazioni, inclusi nomi, numero di membri, tipi di partecipanti, stato del pagamento e data della registrazione.
4. Dalla pagina di dettaglio, puoi:
   - **Aggiungi Partecipante** -- Registra manualmente qualcuno che si è iscritto offline o al telefono.
   - **Annulla** singole registrazioni
   - **Elimina** registrazioni permanentemente
   - **Promuovi** registrazioni in lista d'attesa quando si apre un posto
   - **Esporta CSV** -- Scarica tutte le registrazioni, inclusi tipi di partecipanti, selezioni, importi di pagamento e risposte alle domande

Se l'evento ha Domande di Registrazione allegate, la pagina di dettaglio mostra anche un filtro **Solo domande senza risposta** per trovare rapidamente i registranti che non hanno ancora inviato risposte, e un pulsante **Visualizza Risposte** su ogni registrazione completata per vedere le loro risposte. Gli eventi a pagamento aggiungono una colonna **Tipo**, una colonna **Pagato / Totale**, conteggi per tipo e una finestra di dialogo dei dettagli dei pagamenti -- vedi [Registrazioni a Pagamento](paid-registrations#the-registration-roster).

:::tip
Usa la barra di progresso della capacità per monitorare la velocità con cui gli eventi si stanno riempiendo. La barra diventa rossa quando un evento è a o oltre la capacità.
:::

## Passaggi Successivi

- [Calendario Curato](curated-calendar) -- Crea un calendario che estrae da più gruppi
- [Registrazioni a Pagamento](paid-registrations) -- Tipi di partecipanti, selezioni di componenti aggiuntivi, codici di sconto, pagamenti e liste d'attesa
- [Guida alla Registrazione degli Eventi](../guides/event-registration) -- Guida passo dopo passo per configurare la registrazione degli eventi
- [Panoramica dei Calendari](./) -- Torna alla panoramica dei calendari
