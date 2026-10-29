---
title: "Piani di servizio"
---

# Piani di servizio

<div class="article-intro">

I piani di servizio organizzano chi presta servizio e quando. Ogni piano è legato a una data e a un ministero specifici, così è facile coordinare le tue squadre di volontari settimana dopo settimana e assicurarti che ogni servizio sia completamente coperto.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi ministeri e le squadre nell'area Serving
- Assicurati che i volontari siano stati aggiunti alla tua [rubrica delle persone](../people/adding-people.md) e assegnati alle squadre

</div>

## Accedere ai piani

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Serving** e clicca su **Plans**.
2. Seleziona una **scheda del ministero** in alto nella pagina.
3. Clicca su un **tipo di piano** per vedere l'elenco dei piani di quel tipo. Usa **Upcoming** e **Past** sopra l'elenco per passare dai piani futuri a quelli precedenti. **Upcoming** elenca i piani da oggi in poi, dal più vicino, con i piani senza data alla fine. **Past** elenca solo i piani precedenti, dal più recente.
4. Clicca su un piano specifico per aprirlo.

Ogni pagina del piano mostra link al suo tipo di piano e a **Plans**, così puoi tornare indietro senza usare il pulsante Indietro del browser.

:::info
Non è necessario l'accesso amministrativo completo per gestire i piani. Chiunque sia membro di un ministero può accedere a Serving e creare, modificare e pianificare i piani per il proprio ministero senza bisogno del permesso Plans Edit. Gli editor con il ruolo Plans Edit possono gestire i piani di tutti i ministeri.
:::

## Creare un piano

1. Dalla pagina del tipo di piano, clicca su **New Plan** in alto nella pagina.
2. Assegna al piano un nome oppure usa la data come nome. Seleziona la **data** del servizio.
3. Se il tuo ministero ha dei [modelli](./plan-templates.md), puoi sceglierne uno in **Start from template** per compilare in un solo passaggio l'ordine del servizio, le posizioni e le note.
4. In alternativa, se vuoi copiare da un piano precedente, usa **Copy from Previous Plan** per scegliere **Positions Only** o **Positions and Assignments**. Se non vuoi copiare, scegli **Nothing**. Puoi anche selezionare **Copy Order of Service**. Quando copi da un piano precedente, il nuovo piano mantiene anche le **Notes**, la **Signup Deadline**, l'opzione **Show volunteer names on signup page** e l'impostazione di sostituzione automatica di quel piano, così non devi reinserirle ogni settimana. Puoi modificare ognuna di queste impostazioni nelle impostazioni del nuovo piano.
5. Per configurare più settimane in una volta copiando, inserisci un numero in **Repeat weekly for this many weeks** (fino a 12). B1 crea un piano per ogni settimana, ciascuno copiato da quello precedente. Se il piano prende il nome dalla data, ogni nuovo piano prende il nome della propria data.
6. Facoltativamente, imposta la **Signup Deadline (hours before service)**. Un nuovo piano inizia con la scadenza del piano precedente, che puoi modificare qui. Lascia vuoto il campo per non avere una scadenza. Vedi [Impostazioni del piano](#plan-settings) per capire come viene calcolata la scadenza.
7. Salva il piano. Ora puoi iniziare ad assegnare i membri della squadra e a costruire l'[ordine del servizio](./service-order.md).

:::tip
**Repeat weekly for this many weeks** è disponibile solo mentre stai copiando qualcosa dal piano precedente (posizioni, assegnazioni o ordine del servizio).
:::

## La pagina di dettaglio del piano

Quando apri un piano, in alto compaiono il nome del piano, il ministero, il tipo di piano e la data del servizio, con i pulsanti **Edit** e **Print**. Più sotto, tutto si trova in un'unica pagina:

- **[Order of Service](./service-order.md)** -- Costruisci l'ordine del servizio con elementi come canti di adorazione, preghiere, annunci e il sermone.
- **Serving Team Assignments** -- Gestisci i membri della squadra assegnati a questo piano. Puoi aggiungere persone dalle tue squadre esistenti e vedere chi ha confermato o chi è ancora in attesa. I link sopra le posizioni ti permettono di aprire le **Notes** e gli **Times** del piano.

## Assegnare i membri della squadra {#assigning-team-members}

1. Apri un piano e scorri fino a **Serving Team Assignments**.
2. Clicca su **Add Position**. Compila le informazioni nel modulo per aggiungere una posizione. Come nome della categoria, inserisci quello che preferisci. Per permettere a chiunque nella tua chiesa di ricoprire la posizione (non solo ai membri di una squadra), lascia **Volunteer Group** impostato su **None**.
3. Clicca su **People Needed** e scegli i volontari che ricopriranno quella posizione. Se la posizione ha un **Volunteer Group**, scegli tra i membri di quel gruppo. Se il suo Volunteer Group è impostato su **None**, puoi invece cercare chiunque nella tua chiesa.
4. Aggiungi i membri dall'elenco della tua squadra cliccando su **Add**.
5. I membri assegnati compariranno sotto la loro squadra con il loro stato di assegnazione.
6. Clicca su notify volunteers per avvisarli tramite l'app B1 o via email. Se il piano usa un [flusso di conferma](#plan-settings), la notifica avvia anche una scheda di workflow che segue ogni richiesta finché il volontario non risponde.

Ogni posizione mostra un piccolo contatore (per esempio "2/3") che ti permette di vedere a colpo d'occhio quanti posti sono occupati. Sotto il titolo **Serving Team Assignments** compare un riepilogo ("X of Y positions filled") che mostra la copertura complessiva del piano, insieme al numero di posti ancora necessari. Quando ogni posizione è coperta, il riepilogo passa a **Fully staffed**.

:::tip
Configura le tue squadre nelle impostazioni del ministero prima di creare i piani. In questo modo avrai già pronto un gruppo di volontari da cui assegnare.
:::

### Copiare le posizioni in un piano vuoto

Se un piano non ha ancora posizioni e c'è un piano precedente dello stesso tipo, in **Serving Team Assignments** compare un link **Copy from Previous Plan**. Scegli **Positions Only** o **Positions and Assignments** per riempire il piano aperto con le posizioni (e i volontari) del piano precedente. La copia va nel piano attuale; non crea un secondo piano per la stessa data.

## Impostazioni del piano {#plan-settings}

Ogni piano ha impostazioni aggiuntive che puoi configurare cliccando su **Edit** accanto al piano nell'elenco del tipo di piano, oppure sul pulsante **Edit** in alto nella pagina del piano. Clicca su **Done** (o sul nome del piano) per tornare al piano. Tra queste impostazioni ci sono:

- **Signup Deadline (hours before service)** — il numero di ore prima del servizio in cui chiudono le iscrizioni dei volontari. Le ore vengono conteggiate a ritroso dall'orario **Service** principale del piano (le prove e gli altri orari vengono ignorati, a meno che il piano non abbia solo quelli), quindi una scadenza di 2 ore per un servizio alle 10:00 chiude le iscrizioni alle 8:00 di quella mattina. Se il piano non ha orari, la scadenza viene conteggiata dalle 9:00 della data del servizio, nel fuso orario della tua chiesa. Una volta trascorsa, i volontari non possono né iscriversi né rimuovere sé stessi. Inserisci un numero negativo per tenere aperte le iscrizioni oltre l'inizio del servizio. Lascia il campo vuoto, o cancellane il contenuto, per non avere una scadenza.
- **Confirmation workflow** — scegli un [workflow di conferma delle assegnazioni di servizio](./workflows.md#serving-assignment-confirmations) per seguire via email e SMS le richieste di servizio di questo piano, finché ogni volontario non accetta o rifiuta. Quando **Notify** i volontari sul piano pubblicato, ogni nuova richiesta riceve una propria scheda nella bacheca di quel workflow, e sopra il link di notifica compare una nota con la scritta *"New requests use the confirmation workflow."* Lascia l'opzione **Use existing assignment notifications** per mantenere le notifiche abituali. Nell'elenco compaiono solo i workflow di conferma attivi; creane uno prima da **Serving > Workflows**.
- **Show volunteer names on signup page** — se selezionata, i volontari che hanno effettuato l'accesso possono vedere chi è già iscritto a ogni posizione nella pagina di iscrizione di B1.church. I nomi non vengono mai mostrati ai visitatori che non hanno effettuato l'accesso.
- **Penciled in** — nasconde le assegnazioni ai volontari finché non sei pronto a pubblicare il calendario.
- **Automatically schedule a replacement when a volunteer declines** — se selezionata, quando un volontario assegnato rifiuta la sua posizione, B1 contatta automaticamente la persona successiva disponibile nell'elenco della squadra e chiede se può prestare servizio. Il processo continua nell'elenco finché qualcuno non accetta, così le posizioni restano coperte senza necessità di follow-up manuali.

:::tip
Nella pagina di iscrizione per i membri, le posizioni aperte di ogni piano sono elencate per categoria e poi per nome. I membri vedono ogni settimana futura con posizioni aperte, a meno che non attivi **Show only the next week of each plan type** in [Impostazioni > Volunteer Signup](../settings/church-settings.md#volunteer-signup).
:::

## Promemoria per i volontari {#volunteer-reminders}

B1 può inviare automaticamente promemoria ai volontari prima dei servizi per cui sono programmati, così non devi rincorrere la tua squadra ogni settimana. I promemoria vanno a **tutti i programmati** — sia a chi ha confermato sia a chi non ha ancora risposto. L'eccezione è una richiesta inviata tramite un [workflow di conferma](./workflows.md#serving-assignment-confirmations): quel volontario riceve i promemoria solo dopo aver accettato, dato che fino ad allora se ne occupa il workflow. Ogni email di promemoria include la o le posizioni del volontario, la data del servizio, le note del piano e il tuo messaggio personalizzato.

Il momento e il contenuto dei promemoria si impostano per **tipo di piano**, così ogni tipo di servizio può avere una propria pianificazione.

1. Dall'area **Serving**, seleziona il ministero che contiene il tipo di piano.
2. Nell'elenco **Plan Types**, clicca su **Edit** accanto al tipo di piano.
3. Espandi la sezione **Reminders** e attiva **Send reminders for plans of this type**.
4. In **When should reminders go out?**, scegli fino a tre tempistiche: **7 days before**, **3 days before**, **2 days before**, **1 day before** oppure **Day of**.
5. Imposta l'**Time of Day** in cui inviare i promemoria.
6. Facoltativamente, aggiungi un **Message**. Lascialo vuoto per usare il testo predefinito del promemoria.
7. In **Send By**, scegli **Push**, **Email** e, se la tua chiesa ha collegato un [provider di messaggistica](../settings/church-settings.md#texting), **Text**.
8. Clicca su **Save Reminders**.

I promemoria sono disattivati per un tipo di piano finché non li attivi.

:::tip
I volontari che non hanno ancora confermato trovano i pulsanti **Accept** e **Decline** direttamente nell'email di promemoria, così possono rispondere senza effettuare l'accesso.
:::

### Promemoria via SMS

L'opzione **Text** compare solo quando la tua chiesa ha collegato un provider di messaggistica. Gli SMS vengono inviati tramite il provider di messaggistica della tua chiesa, e ogni SMS può comportare un costo per la chiesa. Un volontario riceve un promemoria via SMS solo se ha attivato **Text messages** nelle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) e ha un numero di cellulare nel profilo. Ogni SMS inizia con il nome della tua chiesa, è contenuto in un singolo messaggio e termina con "Reply STOP to opt out." Chi risponde STOP smette di ricevere SMS dalla tua chiesa. Perché le risposte STOP arrivino a B1, incolla l'**Inbound (STOP) webhook URL** dalle tue [impostazioni di messaggistica](../settings/church-settings.md#texting) nel webhook dei messaggi in entrata del tuo provider.

Per inviare subito un SMS a tutti i programmati in un intervallo di date, usa **Text Volunteers** nella [Panoramica dei piani](./plans-overview.md#texting-everyone-scheduled).

:::info
Ogni promemoria viene inviato una sola volta. I promemoria via SMS vengono inviati in aggiunta a push ed email, non al posto di essi.
:::

## Associare gruppi a un tipo di piano

Sotto l'elenco dei piani nella pagina del tipo di piano, la sezione **Associated Groups** ti permette di decidere quali gruppi possono vedere i piani di questo tipo dal loro portale membri. È un modo rapido per mostrare i prossimi servizi alle squadre giuste senza dare loro l'accesso amministrativo.

1. Nella pagina del tipo di piano, clicca su **Associated Groups** in alto nella pagina (oppure scorri fino a quella sezione).
2. Clicca su **Add Group** e scegli un gruppo dal menu a tendina.
3. Nella colonna **Shows**, scegli se i membri di quel gruppo devono vedere solo i **Past plans only**, solo gli **Upcoming plans only** oppure **Past and upcoming plans** per questo tipo di piano.
4. Ripeti l'operazione per associare altri gruppi, oppure clicca sull'icona del cestino per rimuovere un gruppo.

:::info
Nel selettore compaiono solo i gruppi contrassegnati come **Standard**. I membri di un gruppo associato vedono automaticamente i piani di questo tipo nella pagina del gruppo, nel portale membri di B1, limitatamente all'intervallo selezionato.
:::

Se i piani sono lezioni di Lessons.church, i membri del gruppo associato vedono anche una scheda **This week's lesson** nella pagina del gruppo (riga finale, versetto e una domanda per i genitori). Associa qui un gruppo di genitori e imposta il filtro su **Past plans only**, così la lezione di oggi è inclusa. I team di volontari di solito usano **Upcoming plans only** oppure **Past and upcoming plans**.

## Stampare i piani

Puoi stampare un piano da distribuire alla tua squadra. Apri il piano e clicca su **Print** in alto nella pagina per generare una versione stampabile che include le assegnazioni e l'ordine del servizio. In cima alla stampa compaiono il logo della tua chiesa (il **Light Background Logo** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, e il nome del piano, così i fogli sciolti sono facili da riconoscere. Questo è utile per distribuirlo alle prove o affiggerlo in uno spazio comune.

La stampa non include ciò che sarebbe vuoto. Se non ci sono volontari assegnati, non compare il riquadro della squadra e l'ordine del servizio usa tutta la larghezza della pagina. Se nessun elemento ha una durata, la colonna **Length** viene omessa, e se il piano non ha orari di servizio né durate, viene omessa anche la colonna **Time**. Per eliminare la barra nera del titolo **Service Order** con la data del servizio, deseleziona **Show Service Order heading** in alto nella pagina di stampa; B1 Admin ricorda la tua scelta in quel browser.

:::info
I piani sono organizzati per ministero. Assicurati di essere nella scheda del ministero corretto prima di creare o visualizzare i piani.
:::

## Prossimi passi

- Usa la [Panoramica dei piani](./plans-overview.md) per vedere tutte le assegnazioni future su più settimane in un'unica griglia e individuare le posizioni non coperte — e assegna i volontari direttamente dalla griglia
- Salva la struttura di un piano come [Modello di piano](./plan-templates.md) per applicarla ai piani futuri con un solo clic
- Completa il tuo [Ordine del servizio](./service-order.md) con canti, letture e altri elementi
- Aggiungi [canti](./songs.md) dalla tua libreria direttamente nell'ordine del servizio
- Usa le [Attività](./tasks.md) per assegnare ai membri della squadra azioni di follow-up
- Mostra i contenuti della lezione attuale su una TV nell'atrio con la [Segnaletica digitale](./digital-signage.md)
