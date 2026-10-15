---
title: "Registrare le presenze"
---

# Registrare le presenze

<div class="article-intro">

Una volta configurati i campus, gli orari di culto e i gruppi, puoi registrare manualmente le presenze dopo ogni incontro. B1 Admin organizza le presenze attorno alle **sessioni**: una sessione per gruppo per ogni data di incontro. Crei la sessione, segni chi era presente e i dati confluiscono direttamente nei tuoi report sulle presenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, orari di culto e gruppi devono essere configurati. Consulta [Configurazione delle presenze](setup.md) se non l'hai ancora fatto.
- I gruppi che vuoi monitorare devono avere attiva l'opzione **Monitora presenze**. Consulta [Configurazione delle presenze](setup.md) per i dettagli.

</div>

## Creare una sessione

Una sessione rappresenta un singolo incontro di un gruppo, ad esempio la classe K-3ª elementare in una specifica domenica.

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Gruppi**.
2. Seleziona il gruppo per cui vuoi registrare le presenze.
3. Nella sezione **Sessioni** della pagina del gruppo, fai clic su **Tutte le sessioni**.
4. Fai clic su **Nuova** per creare una nuova sessione.
5. Se al gruppo è assegnato un orario di culto, scegli l'**Orario di culto**. Se si tratta di un gruppo non programmato, questo campo non compare.
6. Seleziona la **Data della sessione**: può essere oggi, una data passata o una data futura.
7. Fai clic su **Salva**.

### Aggiungere sessioni per tutte le classi di un orario di culto

Se altri gruppi si riuniscono nello stesso orario di culto (ad esempio tutte le classi dei bambini alla domenica alle 9:00), puoi creare le loro sessioni in un solo passaggio invece di visitare ogni gruppo.

1. Segui i passaggi sopra e scegli un **Orario di culto**.
2. Seleziona **Aggiungi anche per gli altri _N_ gruppi in _orario di culto_**. La casella indica quanti altri gruppi sono assegnati a quell'orario di culto. Compare solo quando si aggiunge una nuova sessione e almeno un altro gruppo si riunisce in quell'orario.
3. Fai clic su **Salva**.

Viene creata una sessione per il gruppo corrente e per ciascuno degli altri gruppi nella stessa data e allo stesso orario di culto. I gruppi che hanno già una sessione per quella data e quell'orario vengono saltati, così non otterrai dei duplicati.

:::tip
Puoi creare sessioni per date passate per recuperare le presenze che non hai ancora registrato, oppure crearle in anticipo così sono pronte quando il tuo gruppo si riunisce.
:::

## Segnare le presenze

Seleziona una sessione per vedere il suo elenco di presenze. Ogni membro del gruppo è elencato con una casella di controllo, ordinato per cognome, e chi è già stato registrato come presente risulta selezionato.

1. Seleziona la casella accanto a ogni persona che ha partecipato. Usa **Seleziona tutti** o **Deseleziona tutti** per modificare tutti insieme.
2. Il conteggio sopra l'elenco (ad esempio "12 presenti su 15") si aggiorna mano a mano che selezioni le caselle.
3. Fai clic su **Salva presenze**. Nulla viene registrato finché non salvi, e un messaggio conferma quando il salvataggio è completato.

Se deselezioni una persona che era già registrata come presente e poi salvi, questa viene rimossa dalla sessione.

### Aggiungere visitatori

Per registrare una persona che non è membro del gruppo, cercala con la ricerca persone accanto all'elenco delle presenze. Se non è ancora presente nel tuo database, puoi crearla dalla ricerca. In entrambi i casi, viene aggiunta all'elenco già selezionata. Fai clic su **Salva presenze** per registrarla.

Le persone registrate a un kiosk mostrano un'etichetta **Volontario** o **Ospite**. Le persone che non sono membri del gruppo mostrano un'etichetta **Ospite**.

## Verificare quali gruppi devono ancora inserire le presenze

Quando più classi si riuniscono nello stesso orario di culto, puoi vedere a colpo d'occhio quali devono ancora inserire le presenze per quella data.

1. Apri una sessione che ha un orario di culto.
2. Fai clic su **Chi deve ancora inserire le presenze** in cima all'elenco delle presenze.
3. Una finestra elenca ogni gruppo assegnato a quell'orario di culto, con un riepilogo come "5 gruppi su 8 inseriti" in alto.

I gruppi senza persone segnate come presenti per quella data mostrano un'etichetta **Non inserito** e compaiono per primi. I gruppi con presenze mostrano **Inserito** con il numero di persone segnate come presenti (ad esempio "Inserito (12)"). Fai clic sul nome di un gruppo per aprire le sessioni di quel gruppo con la sessione della stessa data già selezionata, così puoi registrarne subito le presenze. Se il gruppo non ha ancora una sessione per quella data, si apre il suo elenco di sessioni così puoi aggiungerne una.

:::tip
Abbina questa funzione a **Stampa tutte le classi** e [all'aggiunta di sessioni per tutte le classi di un orario di culto](#adding-sessions-for-every-class-in-a-service-time): crea le sessioni, distribuisci i fogli presenze, poi usa **Chi deve ancora inserire le presenze** per vedere quali fogli non sono ancora stati inseriti.
:::

## Stampare un foglio presenze

Un foglio presenze è un elenco stampabile della classe che gli insegnanti possono segnare a mano e restituirti per inserirlo in seguito. Ogni foglio mostra il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, il nome della classe, una grande riga **Data** sotto il nome della classe e l'orario di culto. I membri sono elencati su due colonne (si legge prima la colonna di sinistra, poi quella di destra) così entrano più nomi in una pagina, e ogni membro ha le caselle **Presente** e **Assente**. Ci sono righe vuote per i visitatori e un'area **Insegnante / Note**.

- **Dalla sessione** -- Fai clic sull'icona della stampante **Stampa foglio presenze** in cima all'elenco delle presenze della sessione. Il foglio riporta la data della sessione.
- **Tutte le classi per un culto** -- Se la sessione ha un orario di culto, fai clic su **Stampa tutte le classi** per stampare un foglio per ogni classe assegnata a quell'orario di culto. Ogni classe viene stampata nella propria pagina.
- **Dall'elenco dei membri** -- Nella pagina del gruppo, fai clic su **Tutti i membri**, poi sull'icona **Stampa foglio presenze** sopra l'elenco dei membri e scegli **Foglio presenze** per stampare un foglio senza data. Lo stesso menu ha un layout **Elenco contatti** con telefono, email e indirizzo di ciascun membro -- consulta [Stampare l'elenco dei membri](../groups/group-members.md#printing-the-member-list).

Il foglio si apre in una nuova scheda e compare automaticamente la finestra di stampa del browser.

## Esportare le presenze in un foglio di calcolo

Puoi scaricare un registro della sessione come file CSV da usare in Excel, Numbers o Fogli Google.

1. Apri la sessione che vuoi esportare.
2. Fai clic sul pulsante **Esporta** in cima all'elenco delle presenze.
3. Apri il file scaricato con la tua applicazione per fogli di calcolo.

## Visualizzare le presenze registrate

Dopo aver registrato le sessioni, i dati compaiono nei tuoi report sulle presenze.

- **Scheda Andamento presenze** (sotto **Tutti gli anni** nella pagina Presenze) -- mostra le tendenze generali della chiesa nel tempo. Consulta [Monitorare le presenze](tracking-attendance.md).
- **Scheda Presenze per gruppo** -- mostra le presenze suddivise per singolo gruppo. Consulta [Report sulle presenze](../reports/attendance-reports.md#group-attendance).

:::tip
Se una sessione appena creata non compare subito nei report, assicurati che la data della sessione rientri nell'intervallo di date selezionato nei filtri del report.
:::
