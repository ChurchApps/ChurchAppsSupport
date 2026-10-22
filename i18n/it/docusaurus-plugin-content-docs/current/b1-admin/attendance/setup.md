---
title: "Configurazione delle presenze"
---

# Configurazione delle presenze {#attendance-setup}

<div class="article-intro">

Prima di poter monitorare le presenze, devi comunicare a B1 Admin le sedi fisiche della tua chiesa, quando si tengono i culti e quali gruppi si riuniscono in ciascun culto. Questa configurazione una tantum crea la struttura che alimenta tutto il monitoraggio e i rapporti sulle presenze della chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1 Admin attivo con il permesso di gestire le presenze. Vedi [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se prevedi di assegnare i gruppi agli orari dei culti, assicurati che i tuoi [gruppi siano creati](../groups/creating-groups.md) prima.

</div>

## Concetti chiave {#key-concepts}

- **Campus** -- una sede fisica in cui si riunisce la tua chiesa (ad esempio, "Campus principale", "Campus Nord"). I campus si gestiscono in **Impostazioni**.
- **Culto** -- un'adunanza ricorrente in un campus (ad esempio, "Culto della domenica", "Infrasettimanale").
- **Orario del culto** -- un orario specifico in cui si tiene un culto (ad esempio, "9:00", "11:00").
- **Gruppo programmato** -- un gruppo assegnato a un orario di culto specifico. Le presenze vengono monitorate nel contesto di quel culto.
- **Gruppo non programmato** -- un gruppo che monitora le presenze per conto proprio, senza essere legato a un orario di culto.

## Configurare la struttura delle presenze {#setting-up-your-attendance-structure}

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Persone**.
2. Fai clic su **Presenze**, poi su **Configurazione** nella colonna a sinistra. Si apre la tabella **Struttura dei culti**, con in alto il conteggio dei campus, degli orari dei culti e dei gruppi programmati e non programmati.
3. Fai clic su **Gestisci campus** (in alto a destra del pannello **Struttura dei culti**). Questo ti porta a **Impostazioni → Campus**. Fai clic su **Aggiungi campus**, inserisci il nome della sede (indirizzo e fuso orario sono facoltativi) e fai clic su **Salva**.
4. Torna in **Persone → Presenze** e fai clic su **Configurazione**. Il tuo campus ora compare nella tabella di configurazione.
5. Fai clic sul pulsante **+ nella colonna Culto** sotto il tuo campus. Inserisci un nome per il culto, come "Culto della domenica", e fai clic su **Salva**.
6. Fai clic sul pulsante **+ nella colonna Orario** sotto il culto. Inserisci un nome per l'**Orario del culto**, come "9:00", facoltativamente compila la [pianificazione del check-in](#setting-a-check-in-schedule) e fai clic su **Salva**. Ripeti per ogni orario di culto.
7. Per collegare un gruppo a un orario di culto, apri il gruppo da **Persone > Gruppi**, fai clic su **Modifica** e usa **Aggiungi orario del culto** -- vedi la sezione successiva.

### Attivare il monitoraggio delle presenze per un gruppo {#enabling-track-attendance-on-a-group}

Prima che un gruppo possa avere le presenze registrate, il monitoraggio delle presenze deve essere attivato per quel gruppo.

1. Nel menu Jump, scegli **Persone > Gruppi** e seleziona il gruppo.
2. Fai clic sul pulsante **Modifica** sotto il nome del gruppo.
3. Imposta **Monitora presenze** su **Sì**.
4. Fai clic su **Salva**.

:::tip
Se hai assegnato il gruppo a un orario di culto nel passaggio precedente, usa anche l'opzione **Aggiungi orario del culto** nella schermata di modifica del gruppo per collegarlo al culto corretto. Così le sessioni risultano collegate al campus e all'orario giusti.
:::

:::tip
Se un gruppo si riunisce al di fuori di un culto regolare -- come un piccolo gruppo infrasettimanale che monitora le presenze per conto suo -- puoi lasciarlo come gruppo non programmato. Comparirà comunque nel rapporto **Presenze per gruppo** per i rapporti sulle presenze.
:::

## Impostare una pianificazione del check-in {#setting-a-check-in-schedule}

Ogni orario di culto può avere una pianificazione facoltativa del check-in, in modo che il [self check-in](check-in.md) si apra e si chiuda da solo ogni settimana. Senza una pianificazione, il check-in per quell'orario di culto resta disponibile in qualsiasi momento (purché la sala non sia chiusa per altri motivi, come essere al completo).

1. Nella vista **Configurazione**, fai clic sul nome di un orario di culto nella colonna **Orario** (oppure aggiungine uno nuovo).
2. Sotto **Pianificazione del check-in**, scegli il **Giorno** della settimana in cui si tiene l'orario di culto.
3. Imposta l'**Ora di inizio** e, facoltativamente, l'**Ora di fine**.
4. Inserisci **Apri il check-in (minuti prima dell'inizio)** -- ad esempio, `30` apre il check-in mezz'ora prima dell'inizio del culto.
5. Inserisci **Chiudi il check-in (minuti dopo la fine)** -- ad esempio, `15` mantiene aperto il check-in per 15 minuti dopo l'ora di fine. Se non hai impostato un'ora di fine, il conteggio parte dall'ora di inizio.
6. Fai clic su **Salva**.

La pianificazione si ripete ogni settimana ed è misurata nel fuso orario del campus del culto. Se quel campus non ha un fuso orario, viene usato il [Fuso orario](../settings/church-settings.md#time-zone) della tua chiesa, poi il fuso orario del primo campus che ne ha uno, e infine l'ora della costa orientale degli Stati Uniti (America/New_York). Se il check-in si apre all'ora sbagliata, controlla il **Fuso orario** del campus in [Campus](../settings/campuses.md). Per rimuovere una pianificazione, riporta **Giorno** su **Nessuna pianificazione** e fai clic su **Salva**. Una pianificazione entra in vigore solo quando sono impostati sia **Giorno** sia **Ora di inizio**.

Mentre la finestra di check-in di un orario di culto è chiusa:

- **Self check-in su B1.church** mostra quell'orario di culto come **Chiuso** (oppure, ad esempio, **Chiuso · apre dom 9:30**) e non può essere selezionato. Se nessuno degli orari di un culto è aperto, le famiglie vedono quando il check-in si apre, ad esempio "Il check-in apre dom 9:30".
- **L'app del chiosco B1 Checkin** mostra anche l'orario di culto come **Chiuso** con l'indicazione di quando si apre. Se ogni orario di un culto è chiuso, il chiosco indica quando si apre il check-in per quel culto. Chi ha già effettuato il check-in per un orario di culto chiuso vede invece il proprio gruppo con **Registrato**. Se una finestra si chiude a metà di un check-in, il chiosco non lo completa e mostra una schermata **Impossibile effettuare il check-in ora** con l'elenco della sala interessata, così la famiglia può scegliere un'altra sala.

Un nucleo familiare che ha già effettuato il check-in per un orario di culto precedente può comunque tornare e aggiungere un orario di culto successivo che sia aperto, anche dopo che la finestra precedente si è chiusa. I check-in già effettuati vengono mantenuti.

:::tip
Imposta una finestra di apertura generosa (ad esempio, 45 minuti prima dell'inizio) così le famiglie e i volontari che arrivano in anticipo possono fare il check-in, e una finestra di chiusura breve così chi arriva in ritardo può comunque fare il check-in una volta iniziato il culto.
:::

## Modificare la configurazione {#editing-your-setup}

Puoi aggiornare la configurazione in qualsiasi momento. Seleziona un campus, un orario di culto o un gruppo e fai clic su **Modifica** per cambiarne i dettagli, oppure su **Elimina** per rimuoverlo.

:::info
Rimuovere un orario di culto non elimina i record di presenza passati. I tuoi dati storici vengono conservati anche se cambi la pianificazione.
:::

## Passaggi successivi {#whats-next}

Una volta che campus, orari dei culti e gruppi sono pronti, sei pronto a iniziare a [registrare le presenze](recording-attendance.md) manualmente oppure a configurare il [self check-in](check-in.md) per i tuoi culti.
