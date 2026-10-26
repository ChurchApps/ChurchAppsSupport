---
title: "Piani di servizio"
---

# Piani di servizio

<div class="article-intro">

I piani di servizio organizzano chi presta servizio e quando. Ogni piano è legato a una data e a un ministero specifici, rendendo più semplice coordinare settimana per settimana i team di volontari e assicurarsi che ogni servizio sia completamente coperto.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi ministeri e i tuoi team nell'area Serving
- Assicurati che i volontari siano stati aggiunti alla tua [rubrica delle persone](../people/adding-people.md) e assegnati ai team

</div>

## Accesso ai piani

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Serving** e clicca su **Plans**.
2. Seleziona una **scheda del ministero** in alto nella pagina.
3. Clicca su un **tipo di piano** per vedere l'elenco dei piani di quel tipo. Usa **Upcoming** e **Past** sopra l'elenco per passare dai piani futuri a quelli precedenti. **Upcoming** elenca i piani da oggi in poi, dal più vicino, con i piani senza data alla fine. **Past** elenca solo i piani precedenti, dal più recente.
4. Clicca su un piano specifico per aprirlo.

Ogni pagina del piano mostra collegamenti che riportano al suo tipo di piano e a **Plans**, così puoi tornare indietro senza usare il pulsante Indietro del browser.

:::info
Non serve l'accesso amministratore completo per gestire i piani. Chiunque sia membro di un ministero può accedere a Serving e creare, modificare e pianificare i piani per il proprio ministero senza il permesso Plans Edit. Gli editor con il ruolo Plans Edit possono gestire i piani di tutti i ministeri.
:::

## Creare un piano

1. Dalla pagina del tipo di piano, clicca su **New Plan** in alto nella pagina.
2. Assegna al piano un nome oppure usa la data come nome. Seleziona la **data** del servizio.
3. Se il tuo ministero dispone di [modelli](./plan-templates.md), puoi sceglierne uno in **Start from template** per compilare in un solo passaggio l'ordine del servizio, le posizioni e le note.
4. In alternativa, se vuoi copiare da un piano precedente, usa **Copy from Previous Plan** per scegliere **Positions Only** o **Positions and Assignments**. Se non vuoi copiare, scegli **Nothing**. Puoi anche selezionare **Copy Order of Service**. Quando copi da un piano precedente, il nuovo piano mantiene anche le **Notes**, la **Signup Deadline**, l'opzione **Show volunteer names on signup page** e l'impostazione di sostituzione automatica di quel piano, così non devi reinserirle ogni settimana. Puoi modificare ciascuna di queste impostazioni nelle impostazioni del nuovo piano.
5. Per configurare più settimane in una volta mentre copi, inserisci un numero in **Repeat weekly for this many weeks** (fino a 12). B1 crea un piano per ogni settimana, ciascuno copiato da quello precedente. Se il piano prende il nome dalla sua data, ogni nuovo piano prende il nome della propria data.
6. Facoltativamente, imposta la **Signup Deadline (hours before service)**. Un nuovo piano eredita la scadenza del piano precedente, che puoi modificare qui. Lascia vuoto per non avere alcuna scadenza. Consulta [Impostazioni del piano](#plan-settings) per sapere come viene calcolata la scadenza.
7. Salva il piano. Ora puoi iniziare ad assegnare i membri del team e a costruire l'[ordine del servizio](./service-order.md).

:::tip
**Repeat weekly for this many weeks** è disponibile solo mentre stai copiando qualcosa dal piano precedente (posizioni, assegnazioni o ordine del servizio).
:::

## La pagina di dettaglio del piano

Quando apri un piano, il nome del piano, il ministero, il tipo di piano e la data del servizio compaiono in alto, insieme ai pulsanti **Edit** e **Print**. Più in basso, tutto si trova in un'unica pagina:

- **[Order of Service](./service-order.md)** -- Costruisci l'ordine del servizio con elementi come canti di lode, preghiere, annunci e il sermone.
- **Serving Team Assignments** -- Gestisci i membri del team assegnati a questo piano. Puoi aggiungere persone dai team esistenti e vedere chi ha confermato o è ancora in attesa. I link sopra le posizioni ti permettono di aprire le **Notes** e gli **Times** del piano.

## Assegnare i membri del team

1. Apri un piano e scorri fino a **Serving Team Assignments**.
2. Clicca su **Add Position**. Compila le informazioni nel modulo per aggiungere una posizione. Per il nome della categoria, inserisci qualsiasi categoria tu preferisca. Per permettere a chiunque nella chiesa di ricoprire la posizione (e non solo ai membri di un team), lascia **Volunteer Group** impostato su **None**.
3. Clicca su **People Needed** e scegli i volontari che ricopriranno quella posizione. Se la posizione ha un **Volunteer Group**, scegli tra i membri di quel gruppo. Se il suo Volunteer Group è impostato su **None**, puoi invece cercare chiunque nella tua chiesa.
4. Aggiungi i membri dalla lista del tuo team cliccando su **Add**.
5. I membri assegnati compariranno sotto il loro team con il relativo stato di assegnazione.
6. Clicca su notify volunteers per avvisarli all'interno dell'app B1 o via email. Se il piano usa un [flusso di conferma](#plan-settings), la notifica avvia anche una scheda del flusso di lavoro che segue ogni richiesta finché il volontario non risponde.

Ogni posizione mostra un contatore (ad esempio "2/3") così puoi vedere a colpo d'occhio quanti posti sono occupati. Sotto l'intestazione **Serving Team Assignments** compare un riepilogo ("X di Y posizioni coperte") che mostra la copertura complessiva del piano e quante persone mancano ancora. Quando tutte le posizioni sono coperte, il riepilogo diventa **Fully staffed**.

:::tip
Configura i tuoi team nelle impostazioni del ministero prima di creare i piani. In questo modo avrai già pronto un gruppo di volontari da cui assegnare.
:::

### Copiare le posizioni in un piano vuoto

Se un piano non ha ancora posizioni e c'è un piano precedente dello stesso tipo, in **Serving Team Assignments** compare un link **Copy from Previous Plan**. Scegli **Positions Only** o **Positions and Assignments** per riempire il piano aperto con le posizioni (e i volontari) del piano precedente. La copia va nel piano corrente; non crea un secondo piano per la stessa data.

## Impostazioni del piano

Ogni piano ha impostazioni aggiuntive che puoi configurare cliccando su **Edit** accanto al piano nell'elenco del tipo di piano, oppure sul pulsante **Edit** in cima alla pagina del piano. Clicca su **Done** (o sul nome del piano) per tornare al piano. Tra le impostazioni figurano:

- **Signup Deadline (hours before service)** — il numero di ore prima del servizio in cui chiudono le iscrizioni dei volontari. Le ore vengono conteggiate a ritroso dal primo orario **Service** del piano (le prove e gli altri orari vengono ignorati, a meno che il piano non contenga solo quelli), quindi una scadenza di 2 ore per un servizio alle 10:00 chiude le iscrizioni alle 8:00 di quella mattina. Se il piano non ha orari, la scadenza viene conteggiata dalle 9:00 del giorno del servizio, nel fuso orario della tua chiesa. Una volta trascorsa, i volontari non possono né iscriversi né cancellarsi. Inserisci un numero negativo per tenere aperte le iscrizioni anche dopo l'inizio del servizio. Lascia vuoto il campo, o cancellalo, per non avere alcuna scadenza.
- **Confirmation workflow** — scegli un [flusso di lavoro di conferma dell'assegnazione di servizio](./workflows.md#serving-assignment-confirmations) per seguire le richieste di servizio di questo piano via email e SMS finché ogni volontario non accetta o rifiuta. Quando **Notify** i volontari di un piano pubblicato, ogni nuova richiesta riceve una propria scheda nella bacheca di quel flusso di lavoro, e una nota sopra il link di notifica indica *"Le nuove richieste usano il flusso di conferma."* Lascia l'opzione **Use existing assignment notifications** per mantenere le notifiche abituali. Nell'elenco compaiono solo i flussi di conferma attivi; crearne uno è necessario prima, in **Serving > Workflows**.
- **Show volunteer names on signup page** — se selezionata, i volontari che hanno effettuato l'accesso possono vedere chi è già iscritto a ciascuna posizione nella pagina di iscrizione di B1.church. I nomi non vengono mai mostrati ai visitatori che non hanno effettuato l'accesso.
- **Penciled in** — nasconde le assegnazioni ai volontari finché non sei pronto a pubblicare il programma.
- **Automatically schedule a replacement when a volunteer declines** — se selezionata, quando un volontario assegnato rifiuta la propria posizione, B1 contatta automaticamente la successiva persona disponibile nell'elenco del team e chiede se può prestare servizio. Il processo continua lungo l'elenco finché qualcuno non accetta, mantenendo coperte le posizioni senza ulteriori solleciti manuali.

:::tip
Nella pagina di iscrizione dei membri, le posizioni aperte di ogni piano sono elencate per categoria e poi per nome. I membri vedono tutte le settimane future con posizioni aperte, a meno che tu non attivi **Show only the next week of each plan type** in [Impostazioni > Volunteer Signup](../settings/church-settings.md#volunteer-signup).
:::

## Promemoria per i volontari {#volunteer-reminders}

B1 può inviare automaticamente ai volontari dei promemoria prima dei servizi per cui sono pianificati, così non devi rincorrere il team ogni settimana. I promemoria vanno a **tutti i pianificati**, sia a quelli che hanno confermato sia a quelli che non hanno ancora risposto. Fa eccezione una richiesta inviata tramite un [flusso di conferma](./workflows.md#serving-assignment-confirmations): quel volontario riceve i promemoria solo dopo aver accettato, dato che fino ad allora se ne occupa il flusso di lavoro. Ogni email di promemoria include la posizione o le posizioni del volontario, la data del servizio, le note del piano e il tuo messaggio personalizzato.

Tempistiche e contenuto dei promemoria si impostano per **tipo di piano**, così ogni tipo di servizio può avere una propria pianificazione.

1. Dall'area **Serving**, seleziona il ministero che contiene il tipo di piano.
2. Nell'elenco **Plan Types**, clicca su **Edit** accanto al tipo di piano.
3. Espandi la sezione **Reminders** e attiva **Send reminders for plans of this type**.
4. In **When should reminders go out?**, scegli fino a tre tempistiche: **7 days before**, **3 days before**, **2 days before**, **1 day before** oppure **Day of**.
5. Imposta l'**Time of Day** in cui vengono inviati i promemoria.
6. Facoltativamente, aggiungi un **Message**. Lascialo vuoto per usare il testo predefinito del promemoria.
7. In **Send By**, scegli **Push**, **Email** e, se la tua chiesa ha collegato un [servizio di messaggistica](../settings/church-settings.md#texting), **Text**.
8. Clicca su **Save Reminders**.

I promemoria restano disattivati per un tipo di piano finché non li attivi.

:::tip
I volontari che non hanno ancora confermato ricevono i pulsanti **Accept** e **Decline** direttamente nell'email di promemoria, così possono rispondere senza effettuare l'accesso.
:::

### Promemoria via SMS

L'opzione **Text** compare solo se la tua chiesa ha collegato un servizio di messaggistica. Gli SMS vengono inviati tramite il servizio di messaggistica della tua chiesa e ciascuno può comportare un costo per la chiesa. Un volontario riceve un promemoria via SMS solo se ha attivato **Text messages** nelle sue [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) e ha un numero di cellulare nel proprio profilo. Ogni SMS inizia con il nome della tua chiesa, è contenuto in un singolo messaggio e termina con "Reply STOP to opt out." Chi risponde STOP smette di ricevere SMS dalla tua chiesa. Perché le risposte STOP arrivino a B1, incolla l'**Inbound (STOP) webhook URL** dalle tue [impostazioni di messaggistica](../settings/church-settings.md#texting) nel webhook dei messaggi in arrivo del tuo fornitore.

Per inviare subito un SMS a tutti i pianificati in un intervallo di date, usa **Text Volunteers** nella [Panoramica dei piani](./plans-overview.md#texting-everyone-scheduled).

:::info
Ogni promemoria viene inviato una sola volta. I promemoria via SMS si aggiungono a quelli push ed email, non li sostituiscono.
:::

## Associare gruppi a un tipo di piano

Sotto l'elenco dei piani nella pagina del tipo di piano, la sezione **Associated Groups** ti permette di decidere quali gruppi possono vedere i piani di questo tipo dal portale dei membri. È un modo rapido per portare all'attenzione dei team giusti i prossimi servizi, senza concedere loro l'accesso da amministratore.

1. Nella pagina del tipo di piano, clicca su **Associated Groups** in alto nella pagina (oppure scorri fino a quella sezione).
2. Clicca su **Add Group** e scegli un gruppo dal menu a discesa.
3. Nella colonna **Shows**, scegli se i membri di quel gruppo devono vedere **Past plans only**, **Upcoming plans only** oppure **Past and upcoming plans** per questo tipo di piano.
4. Ripeti per associare altri gruppi, oppure clicca sull'icona del cestino per rimuovere un gruppo.

:::info
Nel selettore compaiono solo i gruppi contrassegnati come **Standard**. I membri di un gruppo associato vedono automaticamente i piani di questo tipo nella pagina del gruppo, nel portale membri di B1, limitatamente all'intervallo che hai selezionato.
:::

Se i piani sono lezioni di Lessons.church, i membri del gruppo associato vedono anche una scheda **This week's lesson** nella pagina del gruppo (riga finale, versetto e una domanda per i genitori). Associa qui un gruppo di genitori e imposta il filtro su **Past plans only** così che sia inclusa la lezione di oggi. I team di volontari di solito usano **Upcoming plans only** oppure **Past and upcoming plans**.

## Stampare i piani

Puoi stampare un piano da distribuire al tuo team. Apri il piano e clicca su **Print** in alto nella pagina per generare una versione stampabile che include assegnazioni e ordine del servizio. In cima alla stampa compaiono il logo della tua chiesa (il **Light Background Logo** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno), con sotto il nome della chiesa, e il nome del piano, così i fogli sciolti sono facili da riconoscere. È utile da distribuire alle prove o da affiggere in uno spazio comune.

:::info
I piani sono organizzati per ministero. Assicurati di essere sulla scheda del ministero corretto prima di creare o visualizzare i piani.
:::

## Prossimi passi

- Usa la [Panoramica dei piani](./plans-overview.md) per vedere tutte le assegnazioni future su più settimane in un'unica griglia, individuare le posizioni scoperte e assegnare i volontari direttamente dalla griglia
- Salva la struttura di un piano come [Modello di piano](./plan-templates.md) per applicarla ai piani futuri con un solo clic
- Costruisci il tuo [Ordine del servizio](./service-order.md) con canti, letture e altri elementi
- Aggiungi [canti](./songs.md) dalla tua libreria direttamente nell'ordine del servizio
- Usa [Tasks](./tasks.md) per assegnare ai membri del team le attività di follow-up
- Mostra i contenuti delle lezioni correnti su una TV dell'atrio con la [Segnaletica digitale](./digital-signage.md)
