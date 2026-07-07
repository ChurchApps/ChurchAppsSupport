---
title: "Creazione di calendari"
---

# Creazione di calendari

<div class="article-intro">

La creazione di un calendario in B1 Admin ti consente di creare una visualizzazione curata degli eventi collegando uno o più gruppi. Gli eventi sono gestiti dai leader del gruppo all'interno dei loro gruppi e il tuo calendario visualizza quegli eventi in un unico posto. Anche un amministratore di dominio non può aggiungere o modificare eventi direttamente nella sezione calendario a meno che non sia un leader del gruppo a cui appartengono gli eventi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i [gruppi](../groups/creating-groups.md) i cui eventi desideri includere nel tuo calendario
- Hai bisogno dell'accesso amministrativo alla sezione Calendari in B1 Admin

</div>

## Creazione di un nuovo calendario

1. In B1 Admin, accedi a **Sito web**, quindi alla sezione **Calendari**.
2. Fai clic su **Aggiungi calendario**.
3. Inserisci un **nome** per il tuo calendario (ad esempio, "Eventi del ministero giovanile" o "Calendario della chiesa principale").
4. Aggiungi una **descrizione** opzionale per aiutare il tuo team a capire per cosa serve questo calendario.
5. Fai clic su **Crea** per salvare il tuo nuovo calendario.

## La pagina dei dettagli del calendario

Dopo la creazione di un calendario, fai clic su di esso per aprire la pagina dei dettagli. Questa pagina ha due aree principali:

- **Colonna sinistra** -- Una visualizzazione del calendario che mostra gli eventi estratti dai gruppi collegati.
- **Colonna destra** -- L'elenco dei gruppi associati. Qui è dove gestisci quali gruppi sono inclusi in questo calendario.

## Collegamento dei gruppi

I gruppi che hanno eventi nel calendario appaiono automaticamente nell'elenco dei gruppi sul lato destro della pagina dei dettagli.

1. Fai clic su **Aggiungi** nella sezione dei gruppi per associare un gruppo al tuo calendario.
2. Seleziona il gruppo dal menu a discesa.
3. Scegli se includere **tutti gli eventi** da quel gruppo o solo **eventi specifici**.
4. Fai clic su **Salva**.

:::tip
Collegare i gruppi al tuo calendario è un modo potente per aggregare automaticamente gli eventi. Quando un leader del gruppo aggiunge un evento al suo [gruppo](../groups/creating-groups.md), può fluire nel tuo calendario della chiesa senza alcun lavoro aggiuntivo da parte tua.
:::

:::info
Se desideri creare un singolo calendario che estrae eventi da molti gruppi nella tua chiesa, vedi [Calendario curato](curated-calendar) per un approccio semplificato.
:::

## Abilitazione della registrazione agli eventi

Puoi abilitare la registrazione per qualsiasi evento del calendario in modo che i membri possano iscriversi tramite il sito web B1 o l'app mobile.

1. Fai clic su un evento esistente o creane uno nuovo.
2. Nell'editor degli eventi, attiva **Registrazione**.
3. Configura le impostazioni di registrazione:
   - **Capacità** (opzionale) -- Imposta un numero massimo di registrazioni. Lascia vuoto per illimitato.
   - **Registrazione aperta** -- La data e l'ora in cui la registrazione diventa disponibile.
   - **Registrazione chiusa** -- La data e l'ora in cui la registrazione si chiude.
   - **Tag** -- Etichette separate da virgola (ad es. "giovani, ritiro, scuola biblica per bambini") per aiutare a categorizzare gli eventi registrabili.
   - **Domande di registrazione** -- Allega facoltativamente un [modulo](../forms/creating-forms.md) in modo che i registratori rispondano a domande aggiuntive (restrizioni dietetiche, taglia della maglietta, contatto di emergenza, ecc.) come parte dell'iscrizione. Scegli **Nessuno** per saltare le domande.
   - **Abilita lista d'attesa** -- Quando l'evento si riempie, consenti ai registratori aggiuntivi di unirsi a una lista d'attesa invece di essere rifiutati. Vedi [Registrazioni a pagamento](paid-registrations#waitlist).
4. Salva l'evento.

Per gli eventi a pagamento, la stessa pagina delle impostazioni ti consente di definire **Tipi di partecipante** con prezzo, **Selezioni** opzionali (add-on) e **Codici sconto**, con pagamento raccolto tramite il fornitore di donazioni della tua chiesa. Vedi [Registrazioni a pagamento](paid-registrations) per la procedura dettagliata completa.

Una volta abilitata la registrazione, i membri vedranno un pulsante **Iscriviti a questo evento** quando visualizzano l'evento sul [sito web B1](../../b1-church/events/registering) o [app mobile B1](../../b1-mobile/events/registering). Se hai allegato un modulo, i registratori vedono un passaggio **Domande** durante la registrazione e le loro risposte vengono salvate con la loro registrazione.

:::info
Le domande di registrazione funzionano solo con moduli che **non** sono contrassegnati come Limitati. Un modulo limitato viene saltato automaticamente durante la registrazione piuttosto che visualizzato, quindi usa un modulo illimitato quando allega domande a un evento.
:::

### Gestione delle registrazioni

Per visualizzare e gestire le registrazioni per i tuoi eventi:

1. Accedi alla pagina **Registrazioni** in B1 Admin.
2. Vedrai una tabella di tutti gli eventi con registrazione abilitata, che mostra il titolo dell'evento, la data, il numero di registrazioni attuale rispetto alla capacità e i tag.
3. Fai clic su un evento per visualizzare l'elenco completo delle registrazioni, inclusi nomi, conteggio dei membri, tipi di partecipanti, stato di pagamento e data di registrazione.
4. Dalla pagina dei dettagli, puoi:
   - **Aggiungi partecipante** -- Registra manualmente qualcuno che si è iscritto offline o per telefono.
   - **Annulla** registrazioni individuali
   - **Elimina** registrazioni in modo permanente
   - **Promuovi** registrazioni in lista d'attesa quando si apre un posto
   - **Esporta CSV** -- Scarica tutte le registrazioni, inclusi i tipi di partecipanti, le selezioni, gli importi di pagamento e le risposte alle domande

Se l'evento ha allegato Domande di registrazione, la pagina dei dettagli mostra anche un filtro **Solo domande senza risposta** per trovare rapidamente i registratori che non hanno ancora inviato risposte, e un pulsante **Visualizza risposte** su ogni registrazione con risposta per vedere le loro risposte. Gli eventi a pagamento aggiungono una colonna **Tipo**, una colonna **Pagato / Totale**, conteggi per tipo e una finestra di dialogo dei dettagli dei pagamenti -- vedi [Registrazioni a pagamento](paid-registrations#the-registration-roster).

:::tip
Usa la barra di avanzamento della capacità per monitorare la velocità con cui gli eventi si stanno riempiendo. La barra diventa rossa quando un evento è a capacità o superiore.
:::

## Passaggi successivi

- [Calendario curato](curated-calendar) -- Crea un calendario che estrae da più gruppi
- [Registrazioni a pagamento](paid-registrations) -- Tipi di partecipanti, selezioni di add-on, codici sconto, pagamenti e liste d'attesa
- [Guida alla registrazione degli eventi](../guides/event-registration) -- Guida passo passo per configurare la registrazione degli eventi
- [Panoramica dei calendari](./) -- Torna alla panoramica dei calendari
