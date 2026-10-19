---
title: "Registrare le presenze"
---

# Registrare le presenze

<div class="article-intro">

Una volta configurati sedi, orari di culto e gruppi, puoi registrare manualmente le presenze dopo ogni raduno. B1 Admin organizza le presenze attorno alle **sessioni** — una sessione per gruppo per ogni data di incontro. Crei la sessione, segni chi è presente e i dati confluiscono direttamente nei tuoi report sulle presenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Le tue sedi, gli orari di culto e i gruppi devono essere configurati. Consulta [Configurazione delle presenze](setup.md) se non l'hai ancora fatto.
- I gruppi che vuoi monitorare devono avere **Tieni traccia delle presenze** attivo. Consulta [Configurazione delle presenze](setup.md) per i dettagli.

</div>

## Creare una sessione

Una sessione rappresenta un'occorrenza di un incontro di gruppo — ad esempio, la tua classe della 1ª–3ª elementare in una specifica domenica.

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Gruppi**.
2. Seleziona il gruppo per cui vuoi registrare le presenze.
3. Nella sezione **Sessioni** della pagina del gruppo, fai clic su **Tutte le sessioni**.
4. Fai clic su **Nuovo** per creare una nuova sessione.
5. Se il gruppo è assegnato a un orario di culto, scegli l'**Orario di culto**. Se è un gruppo non programmato, questo campo non comparirà.
6. Seleziona la **Data della sessione** — può essere oggi, una data passata o una data futura.
7. Fai clic su **Salva**.

### Aggiungere sessioni per ogni classe di un orario di culto {#adding-sessions-for-every-class-in-a-service-time}

Se altri gruppi si riuniscono nello stesso orario di culto (ad esempio, tutte le classi dei bambini alla domenica alle 9:00), puoi creare le loro sessioni in un solo passaggio invece di visitare ogni gruppo.

1. Segui i passaggi sopra e scegli un **Orario di culto**.
2. Seleziona **Aggiungi anche per gli altri _N_ gruppi in _orario di culto_**. La casella indica quanti altri gruppi sono assegnati a quell'orario di culto. Compare solo quando aggiungi una nuova sessione e almeno un altro gruppo si riunisce in quell'orario.
3. Fai clic su **Salva**.

Viene creata una sessione per il gruppo corrente e per ciascuno degli altri gruppi nella stessa data e allo stesso orario di culto. I gruppi che hanno già una sessione per quella data e quell'orario vengono saltati, quindi non otterrai duplicati.

:::tip
Puoi creare sessioni per date passate per recuperare presenze che non hai ancora registrato, oppure crearle in anticipo così saranno pronte quando il tuo gruppo si riunisce.
:::

## Note della sessione {#session-notes}

Ogni sessione può avere delle note — un riepilogo di ciò che è stato trattato, annunci o richieste di preghiera.

1. Quando aggiungi una sessione, oppure dopo aver fatto clic sull'icona **Modifica** (matita) accanto a una sessione nell'elenco, scrivi nella casella **Note (cosa è stato trattato, annunci, richieste di preghiera)** sotto la data. La barra degli strumenti ti permette di aggiungere testo in grassetto, elenchi e link.
2. Fai clic su **Salva**.

Le note compaiono in cima all'elenco delle presenze della sessione. Sono anche le note dell'incontro che i membri del gruppo leggono nella sezione **Incontri** della pagina del gruppo su B1.church, dove anche i leader del gruppo possono scriverle e modificarle. Consulta [Dettagli del gruppo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Registrare le presenze

Seleziona una sessione per vedere il suo elenco di presenze. Ogni membro del gruppo è elencato con una casella di controllo, ordinato per cognome, e chi è già registrato come presente è selezionato.

1. Seleziona la casella accanto a ciascuna persona presente. Usa **Seleziona tutti** o **Deseleziona tutti** per modificare tutti insieme.
2. Il conteggio sopra l'elenco (ad esempio, "12 di 15 presenti") si aggiorna mentre selezioni le caselle.
3. Fai clic su **Salva presenze**. Non viene registrato nulla finché non salvi, e un messaggio conferma quando il salvataggio è completato.

Deselezionare una persona già registrata come presente e poi salvare la rimuove dalla sessione.

### Aggiungere visitatori

Per registrare qualcuno che non è membro del gruppo, cercalo nella ricerca persone accanto all'elenco delle presenze. Se non è ancora nel tuo database, puoi crearlo dalla ricerca. In entrambi i casi viene aggiunto all'elenco già selezionato. Fai clic su **Salva presenze** per registrarlo.

Le persone che hanno fatto il check-in a un chiosco mostrano un badge **Volontario** o **Ospite**. Le persone che non sono membri del gruppo mostrano un badge **Ospite**.

## Verificare quali gruppi hanno ancora bisogno delle presenze

Quando più classi si riuniscono nello stesso orario di culto, puoi vedere a colpo d'occhio quali devono ancora avere le presenze inserite per quella data.

1. Apri una sessione che ha un orario di culto.
2. Fai clic su **Chi deve ancora inserire le presenze** in cima all'elenco delle presenze.
3. Una finestra elenca tutti i gruppi assegnati a quell'orario di culto, con un riepilogo come "5 di 8 gruppi inseriti" in alto.

I gruppi senza persone segnate come presenti per quella data mostrano un badge **Non inserito** e compaiono per primi. I gruppi con presenze mostrano **Inserito** con il numero di persone segnate come presenti (ad esempio, "Inserito (12)"). Fai clic sul nome di un gruppo per aprire le sessioni di quel gruppo con la sessione della stessa data già selezionata, così puoi registrarne subito le presenze. Se il gruppo non ha ancora una sessione per quella data, si apre il suo elenco di sessioni così puoi aggiungerne una.

:::tip
Abbinalo a **Stampa tutte le classi** e [all'aggiunta di sessioni per ogni classe di un orario di culto](#adding-sessions-for-every-class-in-a-service-time): crea le sessioni, distribuisci i fogli di appello, quindi usa **Chi deve ancora inserire le presenze** per vedere quali fogli non sono ancora stati inseriti.
:::

## Stampare un foglio di appello {#printing-a-roll-sheet}

Un foglio di appello è un elenco della classe stampabile che gli insegnanti possono segnare a mano e restituirti per inserirlo in seguito. Ogni foglio mostra il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, la classe, una grande riga **Data** sotto il nome della classe e l'orario di culto. I membri sono elencati su due colonne (si legge dall'alto in basso la colonna di sinistra, poi quella di destra) così entrano più nomi in una pagina, e ogni membro ha le caselle **Presente** e **Assente**. Ci sono righe vuote per i visitatori e un'area **Insegnante / Note**.

- **Da una sessione** — Fai clic sull'icona **Stampa foglio di appello** (stampante) in cima all'elenco delle presenze della sessione. Il foglio riporta la data della sessione.
- **Tutte le classi per un culto** — Se la sessione ha un orario di culto, fai clic su **Stampa tutte le classi** per stampare un foglio per ogni classe assegnata a quell'orario di culto. Ogni classe viene stampata nella propria pagina.
- **Dall'elenco dei membri** — Nella pagina del gruppo, fai clic su **Tutti i membri**, poi fai clic sull'icona **Stampa foglio di appello** sopra l'elenco dei membri e scegli **Foglio presenze** per stampare un foglio senza data. Lo stesso menu offre un layout **Elenco contatti** con telefono, email e indirizzo di ciascun membro — vedi [Stampare l'elenco dei membri](../groups/group-members.md#printing-the-member-list).

Il foglio si apre in una nuova scheda e la finestra di stampa del browser compare automaticamente.

## Esportare le presenze in un foglio di calcolo

Puoi scaricare una registrazione della sessione come file CSV da usare in Excel, Numbers o Fogli Google.

1. Apri la sessione che vuoi esportare.
2. Fai clic sul pulsante **Esporta** in cima all'elenco delle presenze.
3. Apri il file scaricato nella tua applicazione di fogli di calcolo.

## Visualizzare le presenze registrate

Dopo aver registrato le sessioni, i dati compaiono nei tuoi report sulle presenze.

- **Scheda Andamento presenze** (sotto **Tutti gli anni** nella pagina Presenze) — mostra le tendenze di tutta la chiesa nel tempo. Consulta [Monitorare le presenze](tracking-attendance.md).
- **Scheda Presenze per gruppo** — mostra le presenze suddivise per singolo gruppo. Consulta [Report sulle presenze](../reports/attendance-reports.md#group-attendance).

:::tip
Se una sessione appena creata non compare subito nei report, assicurati che la data della sessione rientri nell'intervallo di date selezionato nei filtri del report.
:::
