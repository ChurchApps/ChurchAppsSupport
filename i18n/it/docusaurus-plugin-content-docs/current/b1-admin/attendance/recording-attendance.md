---
title: "Registrare le presenze"
---

# Registrare le presenze

<div class="article-intro">

Una volta configurati campus, orari delle funzioni e gruppi, puoi registrare manualmente le presenze dopo ogni adunanza. B1 Admin organizza le presenze per **sessioni** -- una sessione per gruppo per ogni data di incontro. Crei la sessione, segni chi era presente, e i dati alimentano direttamente i tuoi report sulle presenze.

</div>

## Video tutorial

<YouTube id="gS8h2rhyMys" title="Registrare e monitorare le presenze in B1" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, gli orari delle funzioni e i gruppi devono essere configurati. Vedi [Configurazione presenze](setup.md) se non l'hai ancora fatto.
- I gruppi che vuoi monitorare devono avere **Monitora presenze** attivo. Vedi [Configurazione presenze](setup.md) per i dettagli.
- Ti serve il permesso **Modifica presenze** per salvare le presenze. I volontari che hanno solo **Visualizza solo i nomi delle persone** per le persone possono comunque registrare le presenze in questo modo -- aprono le classi da **Gruppi** e vedono i membri solo per nome. Vedi [Solo nomi delle persone](../settings/roles-permissions.md#people-names-only).

</div>

## Creare una sessione

Una sessione rappresenta un'occorrenza dell'incontro di un gruppo -- ad esempio, la tua classe della 1ª-3ª elementare in una specifica domenica.

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e clicca su **Gruppi**.
2. Seleziona il gruppo per cui vuoi registrare le presenze.
3. Nella sezione **Sessioni** della pagina del gruppo, clicca su **Tutte le sessioni**.
4. Clicca su **Nuova** per creare una nuova sessione.
5. Se al gruppo è assegnato un orario di funzione, scegli **Orario di funzione**. Se si tratta di un gruppo non programmato, questo campo non comparirà.
6. Seleziona la **Data della sessione** -- può essere oggi, una data passata o una data futura.
7. Clicca su **Salva**.

### Aggiungere le sessioni per ogni classe di un orario di funzione

Se altri gruppi si riuniscono nello stesso orario di funzione (ad esempio, tutte le classi dei bambini alle 9:00 di domenica), puoi creare le loro sessioni in un solo passaggio invece di visitare ogni gruppo.

1. Segui i passaggi sopra e scegli un **Orario di funzione**.
2. Seleziona **Aggiungi anche per gli altri _N_ gruppi in _orario di funzione_**. La casella indica quanti altri gruppi sono assegnati a quell'orario di funzione. Compare solo quando stai aggiungendo una nuova sessione e almeno un altro gruppo si riunisce in quell'orario.
3. Clicca su **Salva**.

Viene creata una sessione per il gruppo corrente e per ciascuno degli altri gruppi nella stessa data e allo stesso orario di funzione. I gruppi che hanno già una sessione per quella data e quell'orario vengono saltati, così non ottieni dei duplicati.

:::tip
Puoi creare sessioni per date passate per recuperare presenze che non hai ancora registrato, oppure crearle in anticipo così sono pronte quando il tuo gruppo si riunisce.
:::

## Note della sessione {#session-notes}

Ogni sessione può avere delle note -- un riepilogo di ciò che è stato trattato, annunci o richieste di preghiera.

1. Quando aggiungi una sessione, oppure dopo aver cliccato sull'icona **Modifica** (matita) accanto a una sessione nell'elenco, scrivi nella casella **Note (cosa è stato trattato, annunci, richieste di preghiera)** sotto la data. La barra degli strumenti ti permette di aggiungere testo in grassetto, elenchi e link.
2. Clicca su **Salva**.

Le note compaiono in cima alla lista delle presenze della sessione. Sono anche le note dell'incontro che i membri del gruppo leggono nella sezione **Incontri** della pagina del gruppo su B1.church, dove anche i leader del gruppo possono scriverle e modificarle. Vedi [Dettagli del gruppo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Segnare le presenze

Seleziona una sessione per vedere la sua lista di presenze. Ogni membro del gruppo è elencato con una casella di controllo, ordinato per cognome, e chiunque sia già registrato come presente è selezionato.

1. Seleziona la casella accanto a ogni persona presente. Usa **Seleziona tutti** o **Deseleziona tutti** per cambiare tutti in una volta.
2. Il conteggio sopra la lista (ad esempio "12 di 15 presenti") si aggiorna man mano che selezioni le caselle.
3. Clicca su **Salva presenze**. Nulla viene registrato finché non salvi, e un messaggio conferma quando il salvataggio è completato. Se provi a chiudere o ricaricare la scheda del browser mentre un salvataggio è ancora in corso, il browser ti avvisa prima, così le modifiche non vanno perse.

Deselezionare una persona già registrata come presente e poi salvare la rimuove dalla sessione.

### Aggiungere visitatori

Per registrare qualcuno che non è membro del gruppo, cercalo nella ricerca persone accanto alla lista delle presenze. Se non è ancora nel tuo database, puoi crearlo direttamente dalla ricerca. In entrambi i casi, viene aggiunto alla lista già selezionato. Clicca su **Salva presenze** per registrarlo.

Le persone che hanno effettuato il check-in a un kiosk mostrano un'etichetta **Volontario** o **Ospite**. Le persone che non sono membri del gruppo mostrano un'etichetta **Ospite**.

## Verificare quali gruppi devono ancora registrare le presenze

Quando più classi si riuniscono nello stesso orario di funzione, puoi vedere a colpo d'occhio quali devono ancora inserire le presenze per quella data.

1. Apri una sessione che ha un orario di funzione.
2. Clicca su **Chi deve ancora registrare le presenze** in cima alla lista delle presenze.
3. Una finestra elenca ogni gruppo assegnato a quell'orario di funzione, con un riepilogo come "5 di 8 gruppi inseriti" in alto.

I gruppi senza nessuno segnato come presente per quella data mostrano un'etichetta **Non inserito** e compaiono per primi. I gruppi che hanno delle presenze mostrano **Inserito** con il numero di persone segnate come presenti (ad esempio, "Inserito (12)"). Clicca sul nome di un gruppo per aprire le sue sessioni con la sessione della stessa data già selezionata, così puoi registrare subito le sue presenze. Se il gruppo non ha ancora una sessione per quella data, si apre il suo elenco di sessioni così puoi aggiungerne una.

:::tip
Abbinalo a **Stampa tutte le classi** e a [l'aggiunta di sessioni per ogni classe di un orario di funzione](#adding-sessions-for-every-class-in-a-service-time): crea le sessioni, consegna i fogli di appello, poi usa **Chi deve ancora registrare le presenze** per vedere quali fogli non sono ancora stati inseriti.
:::

## Stampare un foglio di appello

Un foglio di appello è un elenco di classe stampabile che gli insegnanti possono segnare a mano e restituirti per inserire i dati in un secondo momento. Ogni foglio mostra il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, il nome della classe, una grande riga **Data** sotto il nome della classe e l'orario della funzione. I membri sono elencati su due colonne (si legge prima la colonna di sinistra, poi quella di destra) così che entrino più nomi in una pagina, e ogni membro ha le caselle **Presente** e **Assente**. Ci sono righe vuote per i visitatori e un'area **Insegnante / Note**.

- **Da una sessione** -- Clicca sull'icona **Stampa foglio di appello** (stampante) in cima alla lista delle presenze della sessione. Il foglio riporta la data della sessione e mostra l'orario di funzione di quella sessione.
- **Tutte le classi di una funzione** -- Se la sessione ha un orario di funzione, clicca su **Stampa tutte le classi** per stampare un foglio per ogni classe assegnata a quell'orario di funzione. Ogni classe viene stampata nella propria pagina.
- **Dall'elenco dei membri** -- Nella pagina del gruppo, clicca su **Tutti i membri**, poi clicca sull'icona **Stampa foglio di appello** sopra l'elenco dei membri e scegli **Foglio presenze** per stampare un foglio senza data. Lo stesso menu ha un layout **Elenco contatti** con il telefono, l'email e l'indirizzo di ogni membro -- vedi [Stampare l'elenco dei membri](../groups/group-members.md#printing-the-member-list).

Il foglio si apre in una nuova scheda e la finestra di stampa del browser compare automaticamente.

## Esportare le presenze in un foglio di calcolo

Puoi scaricare un registro della sessione come file CSV da usare in Excel, Numbers o Fogli Google.

1. Apri la sessione che vuoi esportare.
2. Clicca sul pulsante **Esporta** in cima alla lista delle presenze.
3. Apri il file scaricato nella tua applicazione di fogli di calcolo.

## Visualizzare le presenze registrate

Dopo aver registrato le sessioni, i dati compaiono nei tuoi report sulle presenze.

- **Scheda Andamento presenze** (sotto **Tutti gli anni** nella pagina Presenze) -- mostra le tendenze di presenza dell'intera chiesa nel tempo. Vedi [Monitorare le presenze](tracking-attendance.md).
- **Scheda Presenze per gruppo** -- mostra le presenze suddivise per singolo gruppo. Vedi [Report sulle presenze](../reports/attendance-reports.md#group-attendance).

:::tip
Se una sessione che hai appena creato non compare subito nei report, assicurati che la data della sessione rientri nell'intervallo di date selezionato nei filtri del report.
:::
