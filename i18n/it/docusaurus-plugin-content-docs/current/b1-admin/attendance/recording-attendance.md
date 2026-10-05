---
title: "Registrazione delle presenze"
---

# Registrazione delle presenze

<div class="article-intro">

Una volta configurati i campus, gli orari dei servizi e i gruppi, potete registrare manualmente le presenze dopo ogni riunione. B1 Admin organizza le presenze attorno alle **sessioni** -- una sessione per gruppo per data di riunione. Create la sessione, segnate chi ha partecipato, e i dati alimentano direttamente i vostri report di presenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I vostri campus, orari dei servizi e gruppi devono essere configurati. Vedere [Configurazione delle presenze](setup.md) se non lo avete ancora fatto.
- I gruppi che volete tracciare devono avere **Monitoraggio delle presenze** abilitato. Vedere [Configurazione delle presenze](setup.md) per i dettagli.

</div>

## Creazione di una sessione

Una sessione rappresenta un'occorrenza di una riunione di gruppo -- ad esempio, la vostra classe di K-3° elementare una specifica domenica.

1. Aprite **B1 Admin**, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandete **Persone**, e fate clic su **Gruppi**.
2. Selezionate il gruppo per il quale volete registrare le presenze.
3. Fate clic sulla scheda **Sessioni**.
4. Fate clic su **Nuovo** per creare una nuova sessione.
5. Se il gruppo è assegnato a un orario di servizio, scegliete l'**Orario del servizio**. Se è un gruppo non programmato, questo campo non apparirà.
6. Selezionate la **Data della sessione** -- può essere oggi, una data passata, o una data futura.
7. Fate clic su **Salva**.

### Aggiunta di sessioni per ogni classe in un orario di servizio

Se altri gruppi si incontrano nello stesso orario di servizio (ad esempio, tutte le vostre lezioni per bambini alla domenica ore 9:00), potete creare le loro sessioni in un passaggio invece di visitare ogni gruppo.

1. Seguite i passaggi di cui sopra e scegliete un **Orario del servizio**.
2. Spuntate **Aggiungi anche per gli altri _N_ gruppi in _orario del servizio_**. La casella di controllo mostra quanti altri gruppi sono assegnati a quell'orario di servizio. Appare solo quando si aggiunge una nuova sessione e almeno un altro gruppo si incontra in quel momento.
3. Fate clic su **Salva**.

Una sessione viene creata per il gruppo corrente e per ognuno degli altri gruppi sulla stessa data e orario di servizio. I gruppi che hanno già una sessione per quella data e orario di servizio vengono saltati, quindi non otterrete duplicati.

:::tip
Potete creare sessioni per date passate per recuperare le presenze che non avete ancora registrato, o crearle in anticipo in modo che siano pronte quando il vostro gruppo si incontra.
:::

## Marcatura delle presenze

Selezionate una sessione per vedere il suo elenco di presenze. Ogni membro del gruppo è elencato con una casella di controllo, ordinato per cognome, e chiunque sia già registrato come presente è controllato.

1. Spuntate la casella accanto a ogni persona che ha frequentato. Utilizzate **Seleziona tutto** o **Deseleziona tutto** per cambiare tutti contemporaneamente.
2. Il conteggio sopra l'elenco (ad esempio, "12 di 15 presenti") si aggiorna mentre spuntate le caselle.
3. Fate clic su **Salva presenze**. Nulla viene registrato fino a quando non salvate, e un messaggio conferma quando il salvataggio è fatto.

Deselezionare qualcuno che era già registrato come presente e poi salvare lo rimuove dalla sessione.

### Aggiunta di visitatori

Per registrare qualcuno che non è un membro del gruppo, cercatelo nella ricerca persona accanto all'elenco delle presenze. Se non sono ancora nel vostro database, potete crearli dalla ricerca. Vengono aggiunti all'elenco già selezionati. Fate clic su **Salva presenze** per registrarli.

Le persone che hanno fatto il check-in a un chiosco mostrano un chip **Volontario** o **Ospite**. Le persone che non sono membri del gruppo mostrano un chip **Ospite**.

## Controllo dei gruppi che ancora necessitano di presenze

Quando diverse classi si incontrano nello stesso orario di servizio, potete vedere a colpo d'occhio quali ancora necessitano di presenze inserite per quella data.

1. Aprite una sessione che ha un orario di servizio.
2. Fate clic su **Chi ancora necessita di presenze** in cima all'elenco delle presenze.
3. Una finestra di dialogo elenca ogni gruppo assegnato a quell'orario di servizio, con un riepilogo come "5 di 8 gruppi inseriti" in cima.

I gruppi senza nessuno marcato come presente per quella data mostrano un chip **Non inserito** e sono elencati per primi. I gruppi che hanno presenze mostrano **Inserito** con il numero di persone marcate come presenti (ad esempio, "Inserito (12)"). Fate clic sul nome di un gruppo per passare a quel gruppo e registrare le sue presenze.

:::tip
Abbinate questo a **Stampa tutte le classi** e [aggiunta di sessioni per ogni classe in un orario di servizio](#adding-sessions-for-every-class-in-a-service-time): create le sessioni, distribuite i fogli di controllo, poi utilizzate **Chi ancora necessita di presenze** per vedere quali fogli non sono stati ancora inseriti.
:::

## Stampa di un foglio di controllo

Un foglio di controllo è un elenco di classe stampabile che gli insegnanti possono segnare a mano e riconsegnarvi per inserire in seguito. Ogni foglio mostra il nome della chiesa, la classe, una grande riga **Data** sotto il nome della classe, e l'orario del servizio. I membri sono elencati in due colonne (leggi la colonna sinistra, poi la destra) in modo che più nomi si adattino a una pagina, e ogni membro ha caselle **Presente** e **Assente**. Ci sono righe vuote per i visitatori e un'area **Insegnante / Note**.

- **Da una sessione** -- Fate clic sull'icona **Stampa foglio di controllo** (stampante) in cima all'elenco delle presenze della sessione. Il foglio è datato con la data della sessione.
- **Tutte le classi per un servizio** -- Se la sessione ha un orario di servizio, fate clic su **Stampa tutte le classi** per stampare un foglio per classe assegnata a quell'orario di servizio. Ogni classe stampa sulla sua propria pagina.
- **Dalla scheda Membri** -- Fate clic sull'icona **Stampa foglio di controllo** sopra l'elenco dei membri del gruppo per stampare un foglio senza data.

Il foglio si apre in una nuova scheda e la finestra di dialogo di stampa del vostro browser appare automaticamente.

## Esportazione delle presenze in un foglio di calcolo

Potete scaricare un record della sessione come file CSV da utilizzare in Excel, Numbers, o Google Sheets.

1. Aprite la sessione che volete esportare.
2. Fate clic sul pulsante **Esporta** in cima all'elenco delle presenze.
3. Aprite il file scaricato nella vostra applicazione di foglio di calcolo.

## Visualizzazione delle presenze registrate

Dopo la registrazione delle sessioni, i dati appaiono nei vostri report di presenze.

- **Scheda Andamento presenze** -- mostra tendenze a livello di chiesa nel tempo. Vedere [Monitoraggio delle presenze](tracking-attendance.md).
- **Scheda Presenze per gruppo** -- mostra le presenze suddivise per singolo gruppo. Vedere [Report di presenze](../reports/attendance-reports.md#group-attendance).

:::tip
Se una sessione appena creata non appare nei report subito, assicuratevi che la data della sessione rientri nell'intervallo di date selezionato nei filtri del report.
:::
