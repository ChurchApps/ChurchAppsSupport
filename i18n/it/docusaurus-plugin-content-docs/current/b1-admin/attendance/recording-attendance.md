---
title: "Registrare le presenze"
---

# Registrare le presenze {#recording-attendance}

<div class="article-intro">

Una volta configurati campus, orari dei culti e gruppi, puoi registrare manualmente le presenze dopo ogni adunanza. B1 Admin organizza le presenze per **sessioni** -- una sessione per gruppo per ogni data di incontro. Crei la sessione, segni chi era presente, e i dati alimentano direttamente i tuoi rapporti sulle presenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, gli orari dei culti e i gruppi devono essere configurati. Vedi [Configurazione delle presenze](setup.md) se non l'hai ancora fatto.
- I gruppi che vuoi monitorare devono avere attivata l'opzione **Monitora presenze**. Vedi [Configurazione delle presenze](setup.md) per i dettagli.
- Ti serve il permesso **Modifica presenze** per salvare le presenze. I volontari che hanno solo **Visualizza solo i nomi delle persone** possono comunque registrare le presenze in questo modo: aprono le classi da **Gruppi** e vedono i membri solo per nome. Vedi [Solo nomi delle persone](../settings/roles-permissions.md#people-names-only).

</div>

## Creare una sessione {#creating-a-session}

Una sessione rappresenta un'occorrenza di un incontro di gruppo -- ad esempio, la tua classe dalla K alla 3ª elementare in una specifica domenica.

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Gruppi**.
2. Seleziona il gruppo per cui vuoi registrare le presenze.
3. Nella sezione **Sessioni** della pagina del gruppo, fai clic su **Tutte le sessioni**.
4. Fai clic su **Nuovo** per creare una nuova sessione.
5. Se il gruppo è assegnato a un orario di culto, scegli l'**Orario del culto**. Se si tratta di un gruppo non programmato, questo campo non compare.
6. Seleziona la **Data della sessione** -- può essere oggi, una data passata o una data futura.
7. Fai clic su **Salva**.

### Aggiungere sessioni per ogni classe di un orario di culto {#adding-sessions-for-every-class-in-a-service-time}

Se altri gruppi si riuniscono nello stesso orario di culto (ad esempio, tutte le classi dei bambini alle 9:00 di domenica), puoi creare le loro sessioni in un solo passaggio invece di visitare ogni gruppo.

1. Segui i passaggi sopra e scegli un **Orario del culto**.
2. Seleziona **Aggiungi anche per gli altri _N_ gruppi in _orario del culto_**. La casella indica quanti altri gruppi sono assegnati a quell'orario di culto. Compare solo quando si aggiunge una nuova sessione e almeno un altro gruppo si riunisce in quell'orario.
3. Fai clic su **Salva**.

Viene creata una sessione per il gruppo corrente e per ciascuno degli altri gruppi nella stessa data e nello stesso orario di culto. I gruppi che hanno già una sessione per quella data e quell'orario vengono saltati, quindi non otterrai duplicati.

:::tip
Puoi creare sessioni per date passate per recuperare presenze che non hai ancora registrato, oppure crearle in anticipo così sono pronte quando il tuo gruppo si riunisce.
:::

## Note della sessione {#session-notes}

Ogni sessione può avere delle note -- un riepilogo di ciò che è stato trattato, annunci o richieste di preghiera.

1. Quando aggiungi una sessione, oppure dopo aver fatto clic sull'icona **Modifica** (matita) accanto a una sessione nell'elenco, scrivi nella casella **Note (cosa è stato trattato, annunci, richieste di preghiera)** sotto la data. La barra degli strumenti ti permette di aggiungere testo in grassetto, elenchi e link.
2. Fai clic su **Salva**.

Le note compaiono in cima all'elenco delle presenze della sessione. Sono anche le note di incontro che i membri del gruppo leggono nella sezione **Incontri** della pagina del gruppo su B1.church, dove anche i leader del gruppo possono scriverle e modificarle. Vedi [Dettagli del gruppo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Registrare le presenze {#marking-attendance}

Seleziona una sessione per vedere il suo elenco di presenze. Ogni membro del gruppo è elencato con una casella di controllo, ordinato per cognome, e chi è già registrato come presente è spuntato.

1. Spunta la casella accanto a ogni persona presente. Usa **Seleziona tutti** o **Deseleziona tutti** per cambiare tutti insieme.
2. Il conteggio sopra l'elenco (ad esempio, "12 di 15 presenti") si aggiorna man mano che spunti le caselle.
3. Fai clic su **Salva presenze**. Nulla viene registrato finché non salvi, e un messaggio conferma quando il salvataggio è completato.

Se deselezioni una persona già registrata come presente e poi salvi, questa viene rimossa dalla sessione.

### Aggiungere visitatori {#adding-visitors}

Per registrare qualcuno che non è membro del gruppo, cercalo nella ricerca persone accanto all'elenco delle presenze. Se non è ancora nel tuo database, puoi crearlo dalla ricerca. In entrambi i casi viene aggiunto all'elenco già spuntato. Fai clic su **Salva presenze** per registrarlo.

Le persone che hanno effettuato il check-in al chiosco mostrano un badge **Volontario** o **Ospite**. Le persone che non sono membri del gruppo mostrano un badge **Ospite**.

## Verificare quali gruppi devono ancora registrare le presenze {#checking-which-groups-still-need-attendance}

Quando più classi si riuniscono nello stesso orario di culto, puoi vedere a colpo d'occhio quali devono ancora avere le presenze inserite per quella data.

1. Apri una sessione che ha un orario di culto.
2. Fai clic su **Chi deve ancora registrare le presenze** in cima all'elenco delle presenze.
3. Una finestra di dialogo elenca ogni gruppo assegnato a quell'orario di culto, con un riepilogo come "5 di 8 gruppi inseriti" in alto.

I gruppi senza nessuna persona segnata come presente per quella data mostrano un badge **Non inserito** e sono elencati per primi. I gruppi che hanno delle presenze mostrano **Inserito** con il numero di persone segnate come presenti (ad esempio, "Inserito (12)"). Fai clic sul nome di un gruppo per aprire le sessioni di quel gruppo con già selezionata la sessione della stessa data, così puoi registrarne subito le presenze. Se il gruppo non ha ancora una sessione per quella data, si apre il suo elenco di sessioni così puoi aggiungerne una.

:::tip
Abbina questa funzione a **Stampa tutte le classi** e [all'aggiunta di sessioni per ogni classe di un orario di culto](#adding-sessions-for-every-class-in-a-service-time): crea le sessioni, consegna i fogli di appello, poi usa **Chi deve ancora registrare le presenze** per vedere quali fogli non sono ancora stati inseriti.
:::

## Stampare un foglio di appello {#printing-a-roll-sheet}

Un foglio di appello è un elenco stampabile della classe che gli insegnanti possono segnare a mano e restituirti per inserire i dati in un secondo momento. Ogni foglio mostra il logo della chiesa (il **Logo per sfondo chiaro** dalla sezione [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, la classe, una grande riga **Data** sotto il nome della classe e l'orario del culto. I membri sono elencati su due colonne (si legge prima la colonna di sinistra, poi quella di destra) così entrano più nomi in una pagina, e ogni membro ha le caselle **Presente** e **Assente**. Ci sono righe vuote per i visitatori e un'area **Insegnante / Note**.

- **Da una sessione** -- Fai clic sull'icona **Stampa foglio di appello** (stampante) in cima all'elenco delle presenze della sessione. Il foglio riporta la data della sessione.
- **Tutte le classi di un culto** -- Se la sessione ha un orario di culto, fai clic su **Stampa tutte le classi** per stampare un foglio per ogni classe assegnata a quell'orario di culto. Ogni classe viene stampata nella propria pagina.
- **Dall'elenco dei membri** -- Nella pagina del gruppo, fai clic su **Tutti i membri**, poi sull'icona **Stampa foglio di appello** sopra l'elenco dei membri e scegli **Foglio presenze** per stampare un foglio senza data. Lo stesso menu ha un layout **Elenco contatti** con telefono, email e indirizzo di ciascun membro -- vedi [Stampare l'elenco dei membri](../groups/group-members.md#printing-the-member-list).

Il foglio si apre in una nuova scheda e la finestra di stampa del browser compare automaticamente.

## Esportare le presenze in un foglio di calcolo {#exporting-attendance-to-a-spreadsheet}

Puoi scaricare un record della sessione come file CSV da usare in Excel, Numbers o Fogli Google.

1. Apri la sessione che vuoi esportare.
2. Fai clic sul pulsante **Esporta** in cima all'elenco delle presenze.
3. Apri il file scaricato nella tua applicazione per fogli di calcolo.

## Visualizzare le presenze registrate {#viewing-recorded-attendance}

Dopo aver registrato le sessioni, i dati compaiono nei tuoi rapporti sulle presenze.

- **Scheda Andamento presenze** (sotto **Tutti gli anni** nella pagina Presenze) -- mostra le tendenze di tutta la chiesa nel tempo. Vedi [Monitoraggio delle presenze](tracking-attendance.md).
- **Scheda Presenze per gruppo** -- mostra le presenze suddivise per singolo gruppo. Vedi [Rapporti di Presenza](../reports/attendance-reports.md#group-attendance).

:::tip
Se una sessione appena creata non compare subito nei rapporti, assicurati che la data della sessione rientri nell'intervallo di date selezionato nei filtri del rapporto.
:::
