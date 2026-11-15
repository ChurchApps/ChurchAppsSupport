---
title: "Configurazione Presenze"
description: "Configura campus, culti, orari dei culti e assegnazioni dei gruppi in B1 Admin, così il monitoraggio delle presenze e i programmi di check-in funzionano in tutta la chiesa."
---

# Configurazione Presenze

<div class="article-intro">

Prima di poter monitorare le presenze, devi indicare a B1 Admin dove si trovano le sedi fisiche della tua chiesa, quando si svolgono i culti e quali gruppi si riuniscono in ciascun culto. Questa configurazione, da fare una sola volta, crea la struttura che alimenta tutto il monitoraggio e i report sulle presenze della tua chiesa.

</div>

## Video di formazione {#training-video}

<YouTube id="LQPc2gVlXvQ" title="Configurare culti e presenze in B1" next="Configurare il check-in dei bambini in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso presenze **Modifica culti**. L'opzione **Configurazione** compare solo per chi ha questo permesso; la sola visualizzazione delle presenze non basta. Consulta [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se prevedi di assegnare gruppi agli orari dei culti, assicurati prima che i tuoi [gruppi siano creati](../groups/creating-groups.md).

</div>

## Concetti chiave {#key-concepts}

- **Campus** -- una sede fisica in cui si riunisce la tua chiesa (ad esempio "Campus principale", "Campus Nord"). I campus si gestiscono in **Impostazioni**.
- **Culto** -- un raduno ricorrente in un campus (ad esempio "Culto domenicale", "Infrasettimanale").
- **Orario del culto** -- un orario specifico in cui si svolge un culto (ad esempio "9:00", "11:00").
- **Gruppo programmato** -- un gruppo assegnato a uno specifico orario del culto. Le presenze vengono monitorate nel contesto di quel culto.
- **Gruppo non programmato** -- un gruppo che monitora le presenze per conto proprio, senza essere legato a un orario del culto.

## Configurare la struttura delle presenze {#setting-up-your-attendance-structure}

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Persone**.
2. Fai clic su **Presenze**, poi su **Configurazione** nella colonna di sinistra. Si apre la tabella **Struttura dei culti**, con in alto i conteggi di campus, orari dei culti, gruppi programmati e non programmati e gruppi totali. I conteggi si aggiornano non appena aggiungi, modifichi o rimuovi qualcosa nella tabella. Ogni campus elenca i suoi culti, i relativi orari e i gruppi assegnati a ciascun orario, raggruppati per categoria (un team di servizio compare sotto il nome del suo ministero). I gruppi che monitorano le presenze ma non hanno un orario del culto sono elencati in fondo, sotto **Non assegnati**.
3. Fai clic su **Gestisci campus** (in alto a destra del pannello **Struttura dei culti**). Questo ti porta a **Impostazioni → Campus**. Fai clic su **Aggiungi campus**, inserisci il nome della tua sede (indirizzo e fuso orario sono facoltativi) e fai clic su **Salva**.
4. Torna a **Persone → Presenze** e fai clic su **Configurazione**. Il tuo campus ora compare nella tabella di configurazione.
5. Fai clic sul **pulsante +** nella colonna **Culto** sotto il tuo campus. Inserisci un nome di culto come "Culto domenicale" e fai clic su **Salva**.
6. Fai clic sul **pulsante +** nella colonna **Orario** sotto il culto. Inserisci un nome per l'**Orario del culto** come "9:00", facoltativamente compila il [programma di check-in](#setting-a-check-in-schedule) e fai clic su **Salva**. Ripeti per ogni orario del culto.
7. Per collegare un gruppo a un orario del culto, apri il gruppo da **Persone > Gruppi**, fai clic su **Modifica** e usa **Aggiungi orario del culto** -- vedi la sezione successiva.

### Attivare il tracciamento delle presenze per un gruppo {#enabling-track-attendance-on-a-group}

Prima che per un gruppo si possano registrare le presenze, il tracciamento delle presenze deve essere attivato per quel gruppo.

1. Nel menu Jump, scegli **Persone > Gruppi** e seleziona il gruppo.
2. Fai clic sul pulsante **Modifica** sotto il nome del gruppo.
3. Imposta **Traccia presenze** su **Sì**.
4. Fai clic su **Salva**.

:::tip
Se nel passaggio precedente hai assegnato il gruppo a un orario del culto, usa anche l'opzione **Aggiungi orario del culto** nella schermata di modifica del gruppo per collegarlo al culto corretto. Questo garantisce che le sessioni siano collegate al campus e all'orario giusti.
:::

:::tip
Se un gruppo si riunisce al di fuori di un culto regolare -- come un piccolo gruppo infrasettimanale che monitora le proprie presenze -- puoi lasciarlo come gruppo non programmato. Comparirà comunque nel report **Presenze per gruppo** per la rendicontazione delle presenze.
:::

## Impostare un programma di check-in {#setting-a-check-in-schedule}

Ogni orario del culto può avere un programma di check-in facoltativo, in modo che il [check-in self-service](check-in.md) si apra e si chiuda da solo ogni settimana. Senza un programma, il check-in per quell'orario del culto resta disponibile in qualsiasi momento (purché la sala non sia chiusa per altri motivi, ad esempio perché è piena).

1. Nella vista **Configurazione**, fai clic sul nome di un orario del culto nella colonna **Orario** (oppure aggiungine uno nuovo).
2. In **Programma di check-in**, scegli il **Giorno** della settimana in cui si riunisce l'orario del culto.
3. Imposta l'**Orario di inizio** e, facoltativamente, l'**Orario di fine**.
4. Inserisci **Apri check-in (minuti prima dell'inizio)** -- ad esempio `30` apre il check-in mezz'ora prima dell'inizio del culto.
5. Inserisci **Chiudi check-in (minuti dopo la fine)** -- ad esempio `15` mantiene il check-in aperto per 15 minuti dopo l'orario di fine. Se non hai impostato un orario di fine, il conteggio parte dall'orario di inizio. Se lasci vuoti sia **Orario di fine** sia **Chiudi check-in**, il check-in resta aperto fino alla fine di quel giorno.
6. Fai clic su **Salva**.

Il programma si ripete ogni settimana e viene misurato nel fuso orario del campus del culto. Se quel campus non ha un fuso orario, viene usato il [Fuso orario](../settings/church-settings.md#time-zone) della tua chiesa, poi il fuso orario del primo campus che ne ha uno e infine l'ora orientale (America/New_York). Se il check-in si apre all'ora sbagliata, controlla il **Fuso orario** del campus in [Campus](../settings/campuses.md). Per rimuovere un programma, riporta **Giorno** su **Nessun programma** e fai clic su **Salva**. Un programma ha effetto solo quando sono impostati sia un **Giorno** sia un **Orario di inizio**.

Mentre la finestra di check-in di un orario del culto è chiusa:

- **Check-in self-service su B1.church** mostra quell'orario del culto come **Chiuso** (oppure, ad esempio, **Chiuso · apre dom 9:30**) e non può essere selezionato. Se nessuno degli orari di un culto è aperto, le famiglie vedono quando apre il check-in, ad esempio "Il check-in apre dom 9:30."
- **L'app kiosk B1 Checkin** mostra anch'essa l'orario del culto come **Chiuso** con l'indicazione di quando apre. Se tutti gli orari di un culto sono chiusi, il kiosk indica quando apre il check-in per quel culto. Chi è già registrato a un orario del culto chiuso vede invece il proprio gruppo con **Registrato**. Se una finestra si chiude a metà di una registrazione, il kiosk non la completa e mostra una schermata **Non è ancora possibile registrarsi** che elenca la sala interessata, così la famiglia può sceglierne un'altra.

Un nucleo familiare già registrato per un orario del culto precedente può comunque tornare e aggiungere un orario successivo che sia aperto, anche dopo la chiusura della finestra precedente. Le registrazioni già esistenti vengono mantenute.

:::tip
Imposta una finestra di apertura generosa (ad esempio 45 minuti prima dell'inizio), così le famiglie e i volontari che arrivano in anticipo possono registrarsi, e una finestra di chiusura breve, così chi arriva in ritardo può ancora registrarsi una volta iniziato il culto.
:::

## Modificare la configurazione {#editing-your-setup}

Puoi aggiornare la configurazione in qualsiasi momento:

- **Culti e orari dei culti** -- Fai clic sul nome di un culto o di un orario del culto nella tabella per aprirne il modulo. Modifica i dettagli e fai clic su **Salva**, oppure fai clic su **Elimina** per rimuoverlo.
- **Campus** -- Fai clic su **Gestisci campus** per aggiungere, rinominare o rimuovere campus in **Impostazioni**.
- **Gruppi** -- Fai clic sul nome di un gruppo per aprirlo, poi fai clic su **Modifica** per cambiarne gli orari dei culti o attivare o disattivare **Traccia presenze**.

Il pulsante **Check-in kiosk, QR ed etichette** in cima alla tabella ti porta alle [impostazioni di B1 CheckIn](check-in.md).

:::info
Rimuovere un orario del culto non elimina le registrazioni di presenza passate. I tuoi dati storici vengono conservati anche se cambi il programma.
:::

## Cosa viene dopo {#whats-next}

Una volta che campus, orari dei culti e gruppi sono a posto, sei pronto a iniziare a [registrare le presenze](recording-attendance.md) manualmente oppure a configurare il [check-in self-service](check-in.md) per i tuoi culti.
