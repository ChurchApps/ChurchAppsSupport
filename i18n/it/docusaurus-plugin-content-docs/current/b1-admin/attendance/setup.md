---
title: "Configurazione delle presenze"
---

# Configurazione delle presenze

<div class="article-intro">

Prima di poter tracciare le presenze, dovete dire a B1 Admin le ubicazioni fisiche della vostra chiesa, quando avvengono i servizi, e quali gruppi si incontrano a ogni servizio. Questa configurazione una tantum crea la struttura che alimenta tutto il tracciamento e la segnalazione delle presenze in tutta la vostra chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Avete bisogno di un account B1 Admin attivo con il permesso di gestire le presenze. Vedere [Ruoli e permessi](../people/roles-permissions.md) se siete incerti sul vostro livello di accesso.
- Se intendete assegnare gruppi agli orari dei servizi, assicuratevi che i vostri [gruppi siano creati](../groups/creating-groups.md) prima.

</div>

## Concetti chiave

- **Campus** -- un'ubicazione fisica dove la vostra chiesa si incontra (ad es., "Campus principale", "Campus nord"). I campus vengono gestiti in **Impostazioni**.
- **Servizio** -- una riunione ricorrente presso un campus (ad es., "Servizio domenicale", "Infrasettimanale").
- **Orario del servizio** -- un'ora specifica in cui avviene un servizio (ad es., "9:00 AM", "11:00 AM").
- **Gruppo programmato** -- un gruppo assegnato a un orario di servizio specifico. Le presenze vengono tracciato nel contesto di quel servizio.
- **Gruppo non programmato** -- un gruppo che traccia le presenze su suo conto, senza essere legato a un orario di servizio.

## Configurazione della struttura delle presenze

1. Aprite **B1 Admin**, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), ed espandete **Persone**.
2. Fate clic su **Presenze**, quindi fate clic su **Configurazione** nella colonna di sinistra. Si apre la tabella **Struttura del servizio**, con in alto i conteggi dei vostri campus, orari dei servizi e gruppi programmati e non programmati.
3. Fate clic su **Gestisci campus** (in alto a destra del pannello **Struttura del servizio**). Questo vi porta a **Impostazioni → Campus**. Fate clic su **Aggiungi campus**, inserite il nome della vostra ubicazione (l'indirizzo e il fuso orario sono opzionali), e fate clic su **Salva**.
4. Tornate a **Persone → Presenze** e fate clic su **Configurazione**. Il vostro campus appare ora nella tabella di configurazione.
5. Fate clic sul **pulsante + nella colonna Servizio** sotto il vostro campus. Inserite un nome di servizio come "Servizio domenicale" e fate clic su **Salva**.
6. Fate clic sul **pulsante + nella colonna Ora** sotto il servizio. Inserite un **nome dell'orario del servizio** come "9:00 AM", facoltativamente compilate il [programma di check-in](#setting-a-check-in-schedule), e fate clic su **Salva**. Ripetete per ogni orario di servizio.
7. Per collegare un gruppo a un orario di servizio, aprite il gruppo da **Persone > Gruppi**, fate clic su **Modifica**, e utilizzate **Aggiungi orario del servizio** -- vedere la sezione successiva.

### Abilitazione del tracciamento delle presenze su un gruppo

Prima che un gruppo possa avere le presenze registrate, il tracciamento delle presenze deve essere attivato per quel gruppo.

1. Nel menu Jump, scegliete **Persone > Gruppi** e selezionate il gruppo.
2. Fate clic sul pulsante **Modifica** sotto il nome del gruppo.
3. Impostate **Monitoraggio delle presenze** su **Sì**.
4. Fate clic su **Salva**.

:::tip
Se avete assegnato il gruppo a un orario di servizio nel passaggio precedente, utilizzate anche l'opzione **Aggiungi orario del servizio** sulla schermata di modifica del gruppo per collegarlo al servizio corretto. Questo assicura che le sessioni siano collegate al campus e all'ora corretti.
:::

:::tip
Se un gruppo si incontra al di fuori di un servizio regolare -- come un piccolo gruppo infrasettimanale che traccia le proprie presenze -- potete lasciarlo come gruppo non programmato. Apparirà comunque nel rapporto **Presenze per gruppo** per la segnalazione delle presenze.
:::

## Impostazione di un programma di check-in {#setting-a-check-in-schedule}

Ogni orario di servizio può avere un programma di check-in facoltativo, in modo che il [check-in automatico](check-in.md) si apra e si chiuda da solo ogni settimana. Senza un programma, il check-in per quell'orario di servizio resta disponibile in qualsiasi momento (purché la stanza non sia chiusa per altri motivi, come quando è piena).

1. Nella vista **Configurazione**, fate clic sul nome di un orario di servizio nella colonna **Ora** (oppure aggiungetene uno nuovo).
2. In **Programma di check-in**, scegliete il **Giorno** della settimana in cui si tiene l'orario di servizio.
3. Impostate l'**Ora di inizio** e, facoltativamente, l'**Ora di fine**.
4. Inserite **Apri check-in (minuti prima dell'inizio)** -- ad esempio, `30` apre il check-in mezz'ora prima dell'inizio del servizio.
5. Inserite **Chiudi check-in (minuti dopo la fine)** -- ad esempio, `15` mantiene aperto il check-in per 15 minuti dopo l'ora di fine. Se non avete impostato un'ora di fine, il conteggio parte dall'ora di inizio.
6. Fate clic su **Salva**.

Il programma utilizza l'ora locale della vostra chiesa e si ripete ogni settimana. Per rimuovere un programma, impostate di nuovo il **Giorno** su **Nessun programma** e fate clic su **Salva**. Un programma diventa effettivo solo quando sono impostati sia il **Giorno** sia l'**Ora di inizio**.

Mentre la finestra di check-in di un orario di servizio è chiusa:

- Il **check-in automatico su B1.church** nasconde quell'orario di servizio. Se nessuno degli orari di un servizio è aperto, le famiglie vedono "Il check-in non è aperto per questo servizio in questo momento."
- L'app **B1 Checkin** per chiosco non completa un check-in nei gruppi di quell'orario di servizio; il chiosco mostra una schermata **Impossibile registrarsi ancora** che elenca la stanza interessata, così la famiglia può sceglierne un'altra.

:::tip
Impostate una finestra di apertura generosa (ad esempio, 45 minuti prima dell'inizio) in modo che le famiglie e i volontari che arrivano in anticipo possano registrarsi, e una finestra di chiusura breve in modo che chi arriva in ritardo possa comunque registrarsi una volta iniziato il servizio.
:::

## Modifica della vostra configurazione

Potete aggiornare la vostra configurazione in qualsiasi momento. Selezionate un campus, un orario di servizio, o un gruppo e fate clic su **Modifica** per cambiare i dettagli, o **Elimina** per rimuoverlo.

:::info
La rimozione di un orario di servizio non elimina i record di presenze passati. I vostri dati storici vengono preservati anche se cambiate la vostra pianificazione.
:::

## Cosa fare dopo

Una volta che i vostri campus, orari dei servizi, e gruppi sono al loro posto, siete pronti a iniziare [registrazione delle presenze](recording-attendance.md) manualmente o configurare [auto check-in](check-in.md) per i vostri servizi.
