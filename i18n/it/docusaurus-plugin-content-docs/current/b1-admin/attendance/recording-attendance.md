---
title: "Registrare le presenze"
---

# Registrare le presenze

<div class="article-intro">

Una volta configurati campus, orari delle funzioni e gruppi, puoi registrare manualmente le presenze dopo ogni raduno. B1 Admin organizza le presenze attorno alle **sessioni** -- una sessione per gruppo per ogni data di incontro. Crei la sessione, segni chi era presente, e i dati alimentano direttamente i tuoi report sulle presenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, orari delle funzioni e gruppi devono essere configurati. Vedi [Configurazione delle presenze](setup.md) se non l'hai ancora fatto.
- I gruppi che vuoi monitorare devono avere **Tieni traccia delle presenze** attivo. Vedi [Configurazione delle presenze](setup.md) per i dettagli.
- Ti serve il permesso **Modifica presenze** per salvare le presenze. I volontari che hanno solo **Visualizza solo i nomi delle persone** per le persone possono comunque registrare le presenze in questo modo -- aprono i corsi da **Gruppi** e vedono i membri solo per nome. Vedi [Solo nomi delle persone](../settings/roles-permissions.md#people-names-only).

</div>

## Creare una sessione

Una sessione rappresenta un'occorrenza di un incontro di gruppo -- ad esempio la tua classe di 1ª-3ª elementare in una specifica domenica.

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Gruppi**.
2. Seleziona il gruppo per cui vuoi registrare le presenze.
3. Nella sezione **Sessioni** della pagina del gruppo, fai clic su **Tutte le sessioni**.
4. Fai clic su **Nuovo** per creare una nuova sessione.
5. Se il gruppo è assegnato a un orario di funzione, scegli l'**Orario della funzione**. Se è un gruppo non programmato, questo campo non compare.
6. Seleziona la **Data della sessione** -- può essere oggi, una data passata o una data futura.
7. Fai clic su **Salva**.

### Aggiungere sessioni per ogni classe di un orario di funzione

Se altri gruppi si riuniscono nello stesso orario di funzione (ad esempio tutte le classi dei bambini alle 9:00 di domenica), puoi creare le loro sessioni in un solo passaggio invece di visitare ogni gruppo.

1. Segui i passaggi sopra e scegli un **Orario della funzione**.
2. Seleziona **Aggiungi anche per gli altri _N_ gruppi in _orario della funzione_**. La casella indica quanti altri gruppi sono assegnati a quell'orario. Compare solo quando si aggiunge una nuova sessione e almeno un altro gruppo si riunisce in quell'orario.
3. Fai clic su **Salva**.

Viene creata una sessione per il gruppo corrente e per ciascuno degli altri gruppi nella stessa data e nello stesso orario di funzione. I gruppi che hanno già una sessione per quella data e quell'orario vengono saltati, così non ottieni duplicati.

:::tip
Puoi creare sessioni per date passate per recuperare le presenze che non hai ancora registrato, oppure crearle in anticipo così sono pronte quando il tuo gruppo si riunisce.
:::

## Note della sessione {#session-notes}

Ogni sessione può avere delle note -- un riepilogo di ciò che è stato trattato, annunci o richieste di preghiera.

1. Quando aggiungi una sessione, o dopo aver fatto clic sull'icona **Modifica** (matita) accanto a una sessione nell'elenco, scrivi nella casella **Note (cosa è stato trattato, annunci, richieste di preghiera)** sotto la data. La barra degli strumenti ti permette di aggiungere testo in grassetto, elenchi e link.
2. Fai clic su **Salva**.

Le note compaiono in cima alla lista di presenze della sessione. Sono anche le note dell'incontro che i membri del gruppo leggono nella sezione **Incontri** della pagina del gruppo su B1.church, dove anche i leader del gruppo possono scriverle e modificarle. Vedi [Dettagli del gruppo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Segnare le presenze

Seleziona una sessione per vedere la sua lista di presenze. Ogni membro del gruppo è elencato con una casella di controllo, ordinato per cognome, e chiunque risulti già presente è spuntato.

1. Spunta la casella accanto a ciascuna persona che ha partecipato. Usa **Seleziona tutti** o **Deseleziona tutti** per modificare tutti insieme.
2. Il conteggio sopra la lista (ad esempio "12 di 15 presenti") si aggiorna man mano che spunti le caselle.
3. Fai clic su **Salva presenze**. Non viene registrato nulla finché non salvi, e un messaggio conferma quando il salvataggio è completato. Se provi a chiudere o ricaricare la scheda del browser mentre un salvataggio è ancora in corso, il browser ti avvisa prima così le modifiche non vanno perse.

Deselezionare una persona che era già registrata come presente e poi salvare la rimuove dalla sessione.

### Aggiungere visitatori

Per registrare qualcuno che non è membro del gruppo, cercalo nella ricerca persone accanto alla lista delle presenze. Se non è ancora nel tuo database, puoi crearlo dalla ricerca. In entrambi i casi viene aggiunto alla lista già spuntato. Fai clic su **Salva presenze** per registrarlo.

Le persone che hanno effettuato il check-in al chiosco mostrano un'etichetta **Volontario** o **Ospite**. Le persone che non sono membri del gruppo mostrano un'etichetta **Ospite**.

## Verificare quali gruppi devono ancora registrare le presenze

Quando più classi si riuniscono nello stesso orario di funzione, puoi vedere a colpo d'occhio quali devono ancora inserire le presenze per quella data.

1. Apri una sessione che ha un orario di funzione.
2. Fai clic su **Chi deve ancora registrare le presenze** in cima alla lista delle presenze.
3. Una finestra elenca ogni gruppo assegnato a quell'orario di funzione, con un riepilogo come "5 di 8 gruppi inseriti" in alto.

I gruppi senza nessuno segnato come presente per quella data mostrano un'etichetta **Non inserito** e sono elencati per primi. I gruppi che hanno delle presenze mostrano **Inserito** con il numero di persone segnate come presenti (ad esempio "Inserito (12)"). Fai clic sul nome di un gruppo per aprire le sessioni di quel gruppo con la sessione della stessa data già selezionata, così puoi registrare subito le sue presenze. Se il gruppo non ha ancora una sessione per quella data, si apre il suo elenco di sessioni così puoi aggiungerne una.

:::tip
Abbinalo a **Stampa tutte le classi** e [all'aggiunta di sessioni per ogni classe di un orario di funzione](#adding-sessions-for-every-class-in-a-service-time): crea le sessioni, consegna i fogli di appello, poi usa **Chi deve ancora registrare le presenze** per vedere quali fogli non sono ancora stati inseriti.
:::

## Stampare un foglio di appello

Un foglio di appello è un elenco della classe stampabile che gli insegnanti possono segnare a mano e restituirti per inserirlo in seguito. Ogni foglio mostra il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, la classe, una grande riga **Data** sotto il nome della classe e l'orario della funzione. I membri sono elencati in due colonne (si legge prima la colonna di sinistra, poi quella di destra) così entrano più nomi in una pagina, e ogni membro ha le caselle **Presente** e **Assente**. Ci sono righe vuote per i visitatori e un'area **Insegnante / Note**.

- **Da una sessione** -- Fai clic sull'icona **Stampa foglio di appello** (stampante) in cima alla lista delle presenze della sessione. Il foglio riporta la data della sessione.
- **Tutte le classi di una funzione** -- Se la sessione ha un orario di funzione, fai clic su **Stampa tutte le classi** per stampare un foglio per ogni classe assegnata a quell'orario di funzione. Ogni classe viene stampata nella sua pagina.
- **Dall'elenco dei membri** -- Nella pagina del gruppo, fai clic su **Tutti i membri**, poi fai clic sull'icona **Stampa foglio di appello** sopra l'elenco dei membri e scegli **Foglio presenze** per stampare un foglio senza data. Lo stesso menu ha un layout **Elenco contatti** con il telefono, l'email e l'indirizzo di ogni membro -- vedi [Stampare l'elenco dei membri](../groups/group-members.md#printing-the-member-list).

Il foglio si apre in una nuova scheda e la finestra di stampa del browser compare automaticamente.

## Esportare le presenze in un foglio di calcolo

Puoi scaricare un registro della sessione come file CSV da usare in Excel, Numbers o Google Sheets.

1. Apri la sessione che vuoi esportare.
2. Fai clic sul pulsante **Esporta** in cima alla lista delle presenze.
3. Apri il file scaricato nella tua applicazione di fogli di calcolo.

## Visualizzare le presenze registrate

Dopo aver registrato le sessioni, i dati compaiono nei tuoi report sulle presenze.

- **Scheda Andamento presenze** (sotto **Tutti gli anni** nella pagina Presenze) -- mostra le tendenze complessive della chiesa nel tempo. Vedi [Monitorare le presenze](tracking-attendance.md).
- **Scheda Presenze per gruppo** -- mostra le presenze suddivise per singolo gruppo. Vedi [Report sulle presenze](../reports/attendance-reports.md#group-attendance).

:::tip
Se una sessione appena creata non compare subito nei report, assicurati che la data della sessione rientri nell'intervallo di date selezionato nei filtri del report.
:::
