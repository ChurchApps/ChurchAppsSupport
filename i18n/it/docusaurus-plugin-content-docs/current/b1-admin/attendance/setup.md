---
title: "Configurazione presenze"
---

# Configurazione presenze

<div class="article-intro">

Prima di poter monitorare le presenze, devi indicare a B1 Admin le sedi fisiche della tua chiesa, quando si svolgono le funzioni e quali gruppi si riuniscono in ciascuna funzione. Questa configurazione, da fare una sola volta, crea la struttura che alimenta tutto il monitoraggio e la reportistica delle presenze nella tua chiesa.

</div>

## Video tutorial

<YouTube id="LQPc2gVlXvQ" title="Configurare funzioni e presenze in B1" next="Configurare il check-in dei bambini in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire le presenze. Vedi [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se prevedi di assegnare dei gruppi agli orari delle funzioni, assicurati prima che i tuoi [gruppi siano creati](../groups/creating-groups.md).

</div>

## Concetti chiave

- **Campus** -- una sede fisica in cui la tua chiesa si riunisce (ad esempio, "Campus principale", "Campus Nord"). I campus si gestiscono in **Impostazioni**.
- **Funzione** -- un'adunanza ricorrente in un campus (ad esempio, "Funzione domenicale", "Infrasettimanale").
- **Orario di funzione** -- un orario specifico in cui si svolge una funzione (ad esempio, "9:00", "11:00").
- **Gruppo programmato** -- un gruppo assegnato a un orario di funzione specifico. Le presenze vengono monitorate nel contesto di quella funzione.
- **Gruppo non programmato** -- un gruppo che monitora le presenze in autonomia, senza essere legato a un orario di funzione.

## Impostare la struttura delle presenze

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Persone**.
2. Clicca su **Presenze**, poi clicca su **Configurazione** nella colonna di sinistra. Si apre la tabella **Struttura delle funzioni**, con in alto i conteggi dei tuoi campus, degli orari delle funzioni e dei gruppi programmati e non programmati. I conteggi si aggiornano non appena aggiungi, modifichi o rimuovi qualcosa nella tabella.
3. Clicca su **Gestisci campus** (in alto a destra del pannello **Struttura delle funzioni**). Verrai portato a **Impostazioni → Campus**. Clicca su **Aggiungi campus**, inserisci il nome della tua sede (indirizzo e fuso orario sono facoltativi) e clicca su **Salva**.
4. Torna su **Persone → Presenze** e clicca su **Configurazione**. Il tuo campus ora compare nella tabella di configurazione.
5. Clicca sul **pulsante +** nella colonna **Funzione** sotto il tuo campus. Inserisci un nome per la funzione, come "Funzione domenicale", e clicca su **Salva**.
6. Clicca sul **pulsante +** nella colonna **Orario** sotto la funzione. Inserisci un nome per l'**Orario di funzione**, come "9:00", facoltativamente compila la [pianificazione del check-in](#setting-a-check-in-schedule), e clicca su **Salva**. Ripeti per ogni orario di funzione.
7. Per collegare un gruppo a un orario di funzione, apri il gruppo da **Persone > Gruppi**, clicca su **Modifica** e usa **Aggiungi orario di funzione** -- vedi la sezione successiva.

### Attivare il monitoraggio delle presenze su un gruppo

Prima che si possano registrare le presenze di un gruppo, il monitoraggio delle presenze deve essere attivato per quel gruppo.

1. Nel menu Jump, scegli **Persone > Gruppi** e seleziona il gruppo.
2. Clicca sul pulsante **Modifica** sotto il nome del gruppo.
3. Imposta **Monitora presenze** su **Sì**.
4. Clicca su **Salva**.

:::tip
Se nel passaggio precedente hai assegnato il gruppo a un orario di funzione, usa anche l'opzione **Aggiungi orario di funzione** nella schermata di modifica del gruppo per collegarlo alla funzione corretta. Questo garantisce che le sessioni siano collegate al campus e all'orario giusti.
:::

:::tip
Se un gruppo si riunisce al di fuori di una funzione regolare -- come un piccolo gruppo infrasettimanale che monitora le proprie presenze -- puoi lasciarlo come gruppo non programmato. Comparirà comunque nel report **Presenze per gruppo** per la reportistica delle presenze.
:::

## Impostare una pianificazione del check-in

Ogni orario di funzione può avere una pianificazione del check-in facoltativa, in modo che il [self check-in](check-in.md) si apra e si chiuda da solo ogni settimana. Senza una pianificazione, il check-in per quell'orario di funzione resta disponibile in ogni momento (purché la sala non sia chiusa per altri motivi, come essere al completo).

1. Nella vista **Configurazione**, clicca sul nome di un orario di funzione nella colonna **Orario** (oppure aggiungine uno nuovo).
2. In **Pianificazione del check-in**, scegli il **Giorno** della settimana in cui si riunisce l'orario di funzione.
3. Imposta l'**Orario di inizio** e, facoltativamente, l'**Orario di fine**.
4. Inserisci **Apri il check-in (minuti prima dell'inizio)** -- ad esempio, `30` apre il check-in mezz'ora prima dell'inizio della funzione.
5. Inserisci **Chiudi il check-in (minuti dopo la fine)** -- ad esempio, `15` mantiene il check-in aperto per 15 minuti dopo l'orario di fine. Se non hai impostato un orario di fine, il conteggio parte dall'orario di inizio.
6. Clicca su **Salva**.

La pianificazione si ripete ogni settimana ed è calcolata nel fuso orario del campus della funzione. Se quel campus non ha un fuso orario, viene usato il [Fuso orario](../settings/church-settings.md#time-zone) della tua chiesa, poi il fuso orario del primo campus che ne ha uno, e infine l'ora orientale (America/New_York). Se il check-in si apre all'ora sbagliata, controlla il **Fuso orario** del campus in [Campus](../settings/campuses.md). Per rimuovere una pianificazione, riporta **Giorno** su **Nessuna pianificazione** e clicca su **Salva**. Una pianificazione entra in vigore solo quando sono impostati sia un **Giorno** sia un **Orario di inizio**.

Mentre la finestra di check-in di un orario di funzione è chiusa:

- Il **self check-in su B1.church** elenca quell'orario di funzione come **Chiuso** (oppure, ad esempio, **Chiuso · apre dom 9:30**) e non può essere selezionato. Se nessuno degli orari di una funzione è aperto, le famiglie vedono quando si apre il check-in, ad esempio "Il check-in apre dom 9:30".
- **L'app kiosk B1 Checkin** mostra anch'essa l'orario di funzione come **Chiuso**, insieme a quando si apre. Se ogni orario di una funzione è chiuso, il kiosk comunica quando si apre il check-in per quella funzione. Una persona già registrata per un orario di funzione chiuso vede invece il proprio gruppo con **Check-in effettuato**. Se una finestra si chiude a metà di un check-in, il kiosk non lo completa e mostra una schermata **Impossibile effettuare il check-in ora** che elenca la sala interessata, così la famiglia può sceglierne un'altra.

Un nucleo familiare che ha già effettuato il check-in per un orario di funzione precedente può comunque tornare e aggiungere un orario di funzione successivo che sia aperto, anche dopo che la finestra precedente si è chiusa. I check-in già effettuati vengono mantenuti.

:::tip
Imposta una finestra di apertura generosa (ad esempio, 45 minuti prima dell'inizio) così che le famiglie e i volontari che arrivano in anticipo possano effettuare il check-in, e una finestra di chiusura breve così che i ritardatari possano comunque registrarsi una volta iniziata la funzione.
:::

## Modificare la configurazione

Puoi aggiornare la configurazione in qualsiasi momento. Seleziona un campus, un orario di funzione o un gruppo e clicca su **Modifica** per cambiarne i dettagli, oppure su **Elimina** per rimuoverlo.

:::info
Rimuovere un orario di funzione non elimina i record di presenza passati. I tuoi dati storici vengono conservati anche se modifichi la pianificazione.
:::

## Prossimi passi

Una volta che campus, orari delle funzioni e gruppi sono impostati, sei pronto a iniziare a [registrare le presenze](recording-attendance.md) manualmente oppure a configurare il [self check-in](check-in.md) per le tue funzioni.
