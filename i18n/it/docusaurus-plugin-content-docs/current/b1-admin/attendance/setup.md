---
title: "Configurazione presenze"
description: "Imposta sedi, culti, orari e assegnazioni ai gruppi in B1 Admin, così il monitoraggio delle presenze e gli orari di check-in funzionano in tutta la chiesa."
---

# Configurazione presenze

<div class="article-intro">

Prima di poter monitorare le presenze, devi indicare a B1 Admin le sedi fisiche della tua chiesa, quando si tengono i culti e quali gruppi si incontrano in ciascun culto. Questa configurazione una tantum crea la struttura che alimenta il monitoraggio e i report delle presenze in tutta la tua chiesa.

</div>

## Video di formazione

<YouTube id="LQPc2gVlXvQ" title="Configurare i culti e le presenze in B1" next="Configurare il check-in dei bambini in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso per le presenze **Modifica culti**. L'opzione **Configurazione** compare solo per le persone che lo hanno; la sola visualizzazione delle presenze non basta. Vedi [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se prevedi di assegnare gruppi agli orari dei culti, assicurati prima che i tuoi [gruppi siano stati creati](../groups/creating-groups.md).

</div>

## Concetti chiave

- **Sede** -- un luogo fisico in cui la tua chiesa si incontra (ad esempio "Sede principale", "Sede Nord"). Le sedi si gestiscono in **Impostazioni**.
- **Culto** -- un incontro ricorrente in una sede (ad esempio "Culto della domenica", "Infrasettimanale").
- **Orario del culto** -- un orario specifico in cui si tiene un culto (ad esempio "9:00", "11:00").
- **Gruppo pianificato** -- un gruppo assegnato a uno specifico orario di culto. Le presenze vengono monitorate nel contesto di quel culto.
- **Gruppo non pianificato** -- un gruppo che monitora le presenze in autonomia, senza essere legato a un orario di culto.

## Configurare la struttura delle presenze

1. Apri **B1 Admin**, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Persone**.
2. Clicca su **Presenze**, poi clicca su **Configurazione** nella colonna a sinistra. Si apre la tabella **Struttura dei culti**, con in alto il conteggio delle tue sedi, degli orari dei culti e dei gruppi pianificati e non pianificati. I conteggi si aggiornano non appena aggiungi, modifichi o rimuovi qualcosa nella tabella.
3. Clicca su **Gestisci sedi** (in alto a destra del pannello **Struttura dei culti**). Ti porta a **Impostazioni → Sedi**. Clicca su **Aggiungi sede**, inserisci il nome della tua sede (indirizzo e fuso orario sono facoltativi) e clicca su **Salva**.
4. Torna a **Persone → Presenze** e clicca su **Configurazione**. La tua sede ora compare nella tabella di configurazione.
5. Clicca sul **pulsante +** nella colonna **Culto** sotto la tua sede. Inserisci un nome per il culto, ad esempio "Culto della domenica", e clicca su **Salva**.
6. Clicca sul **pulsante +** nella colonna **Orario** sotto il culto. Inserisci un nome per l'**Orario del culto**, ad esempio "9:00", facoltativamente compila la [pianificazione del check-in](#setting-a-check-in-schedule), e clicca su **Salva**. Ripeti per ogni orario di culto.
7. Per collegare un gruppo a un orario di culto, apri il gruppo da **Persone > Gruppi**, clicca su **Modifica** e usa **Aggiungi orario del culto** -- vedi la sezione successiva.

### Attivare Monitora presenze su un gruppo

Prima che per un gruppo si possano registrare le presenze, è necessario attivare Monitora presenze per quel gruppo.

1. Nel menu di navigazione rapida, scegli **Persone > Gruppi** e seleziona il gruppo.
2. Clicca sul pulsante **Modifica** sotto il nome del gruppo.
3. Imposta **Monitora presenze** su **Sì**.
4. Clicca su **Salva**.

:::tip
Se nel passaggio precedente hai assegnato il gruppo a un orario di culto, usa anche l'opzione **Aggiungi orario del culto** nella schermata di modifica del gruppo per collegarlo al culto corretto. Questo garantisce che le sessioni siano collegate alla sede e all'orario giusti.
:::

:::tip
Se un gruppo si incontra al di fuori di un culto regolare -- come un piccolo gruppo infrasettimanale che monitora le proprie presenze -- puoi lasciarlo come gruppo non pianificato. Comparirà comunque nel report **Presenze per gruppo** per il reporting delle presenze.
:::

## Impostare una pianificazione del check-in {#setting-a-check-in-schedule}

Ogni orario di culto può avere una pianificazione del check-in facoltativa, in modo che il [self check-in](check-in.md) si apra e si chiuda da solo ogni settimana. Senza una pianificazione, il check-in per quell'orario di culto resta disponibile in qualsiasi momento (purché la sala non sia chiusa per altri motivi, ad esempio perché è piena).

1. Nella vista **Configurazione**, clicca sul nome di un orario di culto nella colonna **Orario** (oppure aggiungine uno nuovo).
2. Sotto **Pianificazione del check-in**, scegli il **Giorno** della settimana in cui si tiene l'orario di culto.
3. Imposta l'**Orario di inizio** e, facoltativamente, l'**Orario di fine**.
4. Inserisci **Apri check-in (minuti prima dell'inizio)** -- ad esempio `30` apre il check-in mezz'ora prima dell'inizio del culto.
5. Inserisci **Chiudi check-in (minuti dopo la fine)** -- ad esempio `15` mantiene aperto il check-in per 15 minuti dopo l'orario di fine. Se non hai impostato un orario di fine, il conteggio parte dall'orario di inizio.
6. Clicca su **Salva**.

La pianificazione si ripete ogni settimana ed è misurata nel fuso orario della sede del culto. Se la sede non ha un fuso orario, viene usato il [Fuso orario](../settings/church-settings.md#time-zone) della tua chiesa, poi il fuso orario della prima sede che ne ha uno e infine l'ora della costa orientale (America/New_York). Se il check-in si apre all'ora sbagliata, controlla il **Fuso orario** della sede in [Sedi](../settings/campuses.md). Per rimuovere una pianificazione, imposta **Giorno** su **Nessuna pianificazione** e clicca su **Salva**. Una pianificazione entra in vigore solo quando sono impostati sia un **Giorno** sia un **Orario di inizio**.

Mentre la finestra di check-in di un orario di culto è chiusa:

- Il **self check-in su B1.church** elenca quell'orario di culto come **Chiuso** (oppure, ad esempio, **Chiuso · apre dom 9:30**) e non può essere selezionato. Se nessuno degli orari di un culto è aperto, le famiglie vedono quando si apre il check-in, ad esempio "Il check-in apre dom 9:30".
- Anche il **chiosco dell'app B1 Checkin** mostra l'orario di culto come **Chiuso** con l'indicazione di quando si apre. Se tutti gli orari di un culto sono chiusi, il chiosco indica quando si apre il check-in per quel culto. Chi è già stato registrato a un orario di culto chiuso vede invece il proprio gruppo con **Registrato**. Se una finestra si chiude a metà di un check-in, il chiosco non lo completa e mostra una schermata **Impossibile effettuare il check-in ora** con l'elenco della sala interessata, così la famiglia può sceglierne un'altra.

Un nucleo familiare che ha già effettuato il check-in per un orario di culto precedente può tornare e aggiungere un orario di culto successivo che sia aperto, anche dopo la chiusura della finestra precedente. I check-in già effettuati vengono mantenuti.

:::tip
Imposta una finestra di apertura generosa (ad esempio 45 minuti prima dell'inizio) così le famiglie e i volontari che arrivano in anticipo possono registrarsi, e una finestra di chiusura breve così chi arriva in ritardo può comunque effettuare il check-in una volta iniziato il culto.
:::

## Modificare la configurazione

Puoi aggiornare la configurazione in qualsiasi momento. Seleziona una sede, un orario di culto o un gruppo e clicca su **Modifica** per cambiarne i dettagli, oppure su **Elimina** per rimuoverlo.

:::info
Rimuovere un orario di culto non elimina i record di presenza passati. I tuoi dati storici vengono conservati anche se modifichi la pianificazione.
:::

## Cosa c'è dopo

Una volta che sedi, orari dei culti e gruppi sono in ordine, puoi iniziare a [registrare le presenze](recording-attendance.md) manualmente oppure configurare il [self check-in](check-in.md) per i tuoi culti.
