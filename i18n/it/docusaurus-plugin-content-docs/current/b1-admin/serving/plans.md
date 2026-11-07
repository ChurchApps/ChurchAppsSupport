---
title: "Piani di servizio"
description: "Configura i turni dei volontari in B1 Admin: crea piani per data, copia da settimane precedenti, assegna i membri alle posizioni e gestisci scadenze e promemoria."
---

# Piani di servizio

<div class="article-intro">

I piani di servizio organizzano chi presta servizio e quando. Ogni piano è legato a una data e a un ministero specifici, rendendo facile coordinare le squadre di volontari settimana per settimana e assicurarsi che ogni culto sia completamente coperto.

</div>

## Video di formazione

<YouTube id="47DstBXKl74" title="Creare piani e programmare i volontari in B1" next="Costruire l'ordine del culto e la libreria dei canti in B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi ministeri e le squadre nell'area Servizio
- Assicurati che i volontari siano stati aggiunti alla tua [rubrica persone](../people/adding-people.md) e assegnati alle squadre

</div>

## Accedere ai piani

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Servizio** e clicca su **Piani**.
2. Seleziona una **scheda ministero** in cima alla pagina.
3. Clicca su un **tipo di piano** per vedere l'elenco dei piani di quel tipo. Usa **Prossimi** e **Passati** sopra l'elenco per passare dai piani futuri a quelli precedenti. **Prossimi** elenca i piani da oggi in poi, dal più vicino, con i piani senza data alla fine. **Passati** elenca solo i piani precedenti, dal più recente.
4. Clicca su un piano specifico per aprirlo.

Ogni pagina del piano mostra dei link per tornare al suo tipo di piano e a **Piani**, così puoi risalire senza usare il pulsante indietro del browser.

:::info
Non serve l'accesso amministrativo completo per gestire i piani. Chiunque sia membro di un ministero può accedere a Servizio e creare, modificare e programmare i piani del proprio ministero senza bisogno del permesso Modifica piani. Gli editor con il ruolo Modifica piani possono gestire i piani di tutti i ministeri.
:::

## Creare un piano

1. Dalla pagina del tipo di piano, clicca su **Nuovo piano** in cima alla pagina.
2. Assegna al piano un nome oppure usa la data come nome. Seleziona la **data** del servizio.
3. Se il tuo ministero ha dei [modelli](./plan-templates.md), puoi sceglierne uno in **Inizia da modello** per compilare in un solo passaggio l'ordine del culto, le posizioni e le note.
4. Altrimenti, se vuoi copiare da un piano precedente, usa **Copia dal piano precedente** per scegliere **Solo posizioni** oppure **Posizioni e assegnazioni**. Se non vuoi copiare, scegli **Niente**. Puoi anche spuntare **Copia ordine del culto**. Quando copi da un piano precedente, il nuovo piano mantiene anche le **Note**, la **Scadenza iscrizioni**, l'opzione **Mostra i nomi dei volontari nella pagina di iscrizione** e l'impostazione di sostituzione automatica di quel piano, così non devi reinserirle ogni settimana. Puoi modificarle tutte nelle impostazioni del nuovo piano.
5. Per creare più piani in una volta mentre copi, scegli **Ripeti ogni** e **Frequenza** (Giorno, Settimana o Mese), poi inserisci il **Numero di piani** (fino a 12). Per il Mese, **Il** ti permette di mantenere lo stesso giorno del mese oppure lo stesso giorno della settimana, ad esempio il secondo sabato. B1 elenca le date prima del salvataggio e crea un piano per ogni data, ciascuno copiato da quello precedente. Se il piano prende il nome dalla sua data, ogni nuovo piano prende il nome della propria data.
6. Facoltativamente imposta la **Scadenza iscrizioni (ore prima del servizio)**. Un nuovo piano parte con la scadenza del piano precedente, che puoi modificare qui. Lascia vuoto per nessuna scadenza. Vedi [Impostazioni del piano](#plan-settings) per capire come viene calcolata la scadenza.
7. Salva il piano. Ora puoi iniziare ad assegnare i membri della squadra e a costruire l'[ordine del culto](./service-order.md).

:::tip
Le impostazioni di ripetizione sono disponibili solo mentre stai copiando qualcosa dal piano precedente (posizioni, assegnazioni o ordine del culto).
:::

## La pagina di dettaglio del piano

Quando apri un piano, in cima compaiono il nome del piano, il ministero, il tipo di piano e la data del servizio, con i pulsanti **Modifica** e **Stampa**. Sotto, tutto è su un'unica pagina:

- **[Ordine del culto](./service-order.md)** -- Costruisci l'ordine del culto con elementi come canti di lode, preghiere, annunci e la predica.
- **Assegnazioni della squadra di servizio** -- Gestisci quali membri della squadra sono assegnati a questo piano. Puoi aggiungere persone dalle squadre esistenti e vedere chi ha confermato o è ancora in attesa. I link sopra le posizioni ti permettono di aprire le **Note** e gli **Orari** del piano.

## Assegnare i membri della squadra {#assigning-team-members}

1. Apri un piano e scorri fino a **Assegnazioni della squadra di servizio**.
2. Clicca su **Aggiungi posizione**. Compila le informazioni nel modulo di aggiunta posizione. Per il nome della categoria, inserisci la categoria che preferisci. Per permettere a chiunque nella chiesa di ricoprire la posizione (non solo ai membri di una squadra), lascia **Gruppo volontari** impostato su **Nessuno**.
3. Clicca su **Persone necessarie** e scegli i volontari per coprire quella posizione. Se la posizione ha un **Gruppo volontari**, scegli tra i membri di quel gruppo. Se il suo Gruppo volontari è impostato su **Nessuno**, puoi invece cercare chiunque nella chiesa.
4. Aggiungi i membri dall'elenco della tua squadra cliccando su **Aggiungi**.
5. I membri assegnati compaiono sotto la loro squadra con lo stato della loro assegnazione.
6. Clicca su notifica volontari per avvisarli tramite l'app B1 oppure via email. Se il piano usa un [flusso di conferma](#plan-settings), la notifica avvia anche una scheda del flusso di lavoro che segue ogni richiesta finché il volontario non risponde.

Ogni posizione mostra un chip con il conteggio (ad esempio "2/3") così puoi vedere a colpo d'occhio quanti posti sono coperti. Sotto il titolo **Assegnazioni della squadra di servizio**, un riepilogo ("X posizioni su Y coperte") mostra la copertura complessiva del piano, insieme a quante ne mancano ancora, passando a **Completamente coperto** quando ogni posizione è occupata.

:::tip
Imposta le tue squadre nelle impostazioni del ministero prima di creare i piani. In questo modo avrai un gruppo pronto di volontari da cui assegnare.
:::

### Copiare le posizioni in un piano vuoto

Se un piano non ha ancora posizioni e c'è un piano precedente dello stesso tipo, nella sezione **Assegnazioni della squadra di servizio** compare un link **Copia dal piano precedente**. Scegli **Solo posizioni** oppure **Posizioni e assegnazioni** per riempire il piano aperto con le posizioni (e i volontari) del piano precedente. La copia va nel piano corrente; non crea un secondo piano per la stessa data.

## Impostazioni del piano {#plan-settings}

Ogni piano ha impostazioni aggiuntive che puoi configurare cliccando su **Modifica** accanto al piano nell'elenco del tipo di piano, oppure sul pulsante **Modifica** in cima alla pagina del piano. Clicca su **Fatto** (oppure sul nome del piano) per tornare al piano. Tra queste:

- **Scadenza iscrizioni (ore prima del servizio)** -- il numero di ore prima del servizio in cui chiudono le iscrizioni dei volontari. Le ore si contano a ritroso dal primo orario di **Servizio** del piano (le prove e gli altri orari vengono saltati, a meno che il piano non abbia nient'altro), quindi una scadenza di 2 ore per un culto alle 10:00 chiude le iscrizioni alle 8:00 di quella mattina. Se il piano non ha orari, la scadenza si conta dalle 9:00 della data del servizio nel fuso orario della tua chiesa. Una volta trascorsa, i volontari non possono né iscriversi né ritirarsi. Inserisci un numero negativo per tenere aperte le iscrizioni oltre l'inizio del culto. Lascia vuoto, oppure cancella il contenuto, per nessuna scadenza.
- **Flusso di conferma** -- scegli un [flusso di lavoro di conferma delle assegnazioni di servizio](./workflows.md#serving-assignment-confirmations) per seguire via email e SMS le richieste di servizio di questo piano, finché ogni volontario non accetta o rifiuta. Quando **Notifica** i volontari sul piano pubblicato, ogni nuova richiesta ottiene una propria scheda nella bacheca di quel flusso di lavoro, e una nota sopra il link di notifica dice *"Le nuove richieste usano il flusso di conferma."* Lascia su **Usa le notifiche di assegnazione esistenti** per mantenere le notifiche abituali. Nell'elenco compaiono solo i flussi di conferma attivi; creane uno prima in **Servizio > Flussi di lavoro**.
- **Mostra i nomi dei volontari nella pagina di iscrizione** -- se selezionata, i volontari che hanno effettuato l'accesso possono vedere chi altro si è già iscritto a ciascuna posizione nella pagina di iscrizione di B1.church. I nomi non vengono mai mostrati ai visitatori che non hanno effettuato l'accesso.
- **A matita** -- nasconde le assegnazioni ai volontari finché non sei pronto a pubblicare il calendario.
- **Programma automaticamente una sostituzione quando un volontario rifiuta** -- se selezionata, se un volontario assegnato rifiuta la propria posizione, B1 contatta automaticamente la prossima persona disponibile nell'elenco della squadra e chiede se può prestare servizio. Continua lungo l'elenco finché qualcuno accetta, mantenendo le posizioni coperte senza follow-up manuale.

:::tip
Nella pagina di iscrizione per i membri, le posizioni aperte di ogni piano sono elencate per categoria e poi per nome. I membri vedono ogni settimana futura con posizioni aperte, a meno che tu non attivi **Mostra solo la settimana successiva per ogni tipo di piano** in [Impostazioni > Iscrizione dei volontari](../settings/church-settings.md#volunteer-signup).
:::

## Promemoria per i volontari {#volunteer-reminders}

B1 può ricordare automaticamente ai volontari i culti per cui sono programmati, così non devi rincorrere la tua squadra ogni settimana. I promemoria vanno a **tutti i programmati** -- sia quelli che hanno confermato sia quelli che non hanno ancora risposto. L'eccezione è una richiesta inviata tramite un [flusso di conferma](./workflows.md#serving-assignment-confirmations): quel volontario riceve i promemoria solo dopo aver accettato, dato che fino ad allora ci pensa il flusso di lavoro a fare follow-up. Ogni email di promemoria include la posizione (o le posizioni) del volontario, la data del servizio, le note del piano e il tuo messaggio personalizzato.

Tempi e contenuti dei promemoria si impostano per **tipo di piano**, così ogni tipo di servizio può avere il proprio calendario.

1. Dall'area **Servizio**, seleziona il ministero che contiene il tipo di piano.
2. Nell'elenco **Tipi di piano**, clicca su **Modifica** accanto al tipo di piano.
3. Espandi la sezione **Promemoria** e attiva **Invia promemoria per i piani di questo tipo**.
4. Sotto **Quando devono partire i promemoria?**, scegli fino a tre tempistiche: **7 giorni prima**, **3 giorni prima**, **2 giorni prima**, **1 giorno prima** oppure **Il giorno stesso**.
5. Imposta l'**Ora del giorno** a cui partono i promemoria.
6. Facoltativamente aggiungi un **Messaggio**. Lascialo vuoto per usare il testo predefinito del promemoria.
7. Sotto **Invia tramite**, scegli **Notifica push**, **Email** e, se la tua chiesa ha un [fornitore di SMS](../settings/church-settings.md#texting) collegato, **SMS**.
8. Clicca su **Salva promemoria**.

I promemoria sono disattivati per un tipo di piano finché non li attivi.

:::tip
I volontari che non hanno ancora confermato trovano i pulsanti **Accetta** e **Rifiuta** direttamente nell'email di promemoria, così possono rispondere senza accedere.
:::

### Promemoria via SMS {#text-reminders}

L'opzione **SMS** compare solo quando la tua chiesa ha un fornitore di SMS collegato. Gli SMS vengono inviati tramite il fornitore di SMS della tua chiesa, e ogni SMS può avere un costo per la chiesa. Un volontario riceve un promemoria via SMS solo se ha attivato **Messaggi di testo** nelle sue [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) e ha un numero di cellulare nel suo profilo. Ogni SMS inizia con il nome della tua chiesa, è contenuto in un singolo messaggio e termina con "Rispondi STOP per disiscriverti." Chi risponde STOP smette di ricevere SMS dalla tua chiesa. Perché le risposte STOP arrivino a B1, incolla l'**URL del webhook dei messaggi in arrivo (STOP)** dalle tue [impostazioni SMS](../settings/church-settings.md#texting) nel webhook dei messaggi in entrata del tuo fornitore.

Per inviare subito un SMS a tutti i programmati in un intervallo di date, usa **Invia SMS ai volontari** nella [Panoramica dei piani](./plans-overview.md#texting-everyone-scheduled).

:::info
Ogni promemoria viene inviato una sola volta. I promemoria via SMS vengono inviati in aggiunta alle notifiche push ed email, non al loro posto.
:::

## Associare gruppi a un tipo di piano

Sotto l'elenco dei piani nella pagina del tipo di piano, la sezione **Gruppi associati** ti permette di decidere quali gruppi possono vedere i piani di questo tipo dal portale dei membri. È un modo rapido per portare i culti in programma alle squadre giuste senza dare loro l'accesso amministrativo.

1. Nella pagina del tipo di piano, clicca su **Gruppi associati** in cima alla pagina (oppure scorri fino a quella sezione).
2. Clicca su **Aggiungi gruppo** e scegli un gruppo dal menu a tendina.
3. Nella colonna **Mostra**, scegli se i membri di quel gruppo devono vedere **Solo piani passati**, **Solo piani futuri** oppure **Piani passati e futuri** per questo tipo di piano.
4. Ripeti per associare altri gruppi, oppure clicca sull'icona del cestino per rimuovere un gruppo.

:::info
Nel selettore compaiono solo i gruppi contrassegnati come **Standard**. I membri di un gruppo associato vedono automaticamente i piani di questo tipo nella pagina del gruppo nel portale dei membri B1 -- limitati alla finestra temporale che hai selezionato.
:::

Se i piani sono lezioni di Lessons.church, i membri del gruppo associato vedono anche una scheda **La lezione di questa settimana** nella pagina del gruppo (riga finale, versetto e una domanda per i genitori). Associa qui un gruppo di genitori e imposta il filtro su **Solo piani passati** così la lezione di oggi è inclusa. I team di volontari di solito usano **Solo piani futuri** oppure **Piani passati e futuri**.

## Stampare i piani {#printing-plans}

Puoi stampare un piano per distribuirlo alla tua squadra. Apri il piano e clicca su **Stampa** in cima alla pagina per generare una versione stampabile che include le assegnazioni e l'ordine del culto. In cima alla stampa compaiono il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, e il nome del piano, così le pagine sciolte sono facili da identificare. È utile da distribuire alle prove o da affiggere in un'area comune.

La stampa omette tutto ciò che sarebbe vuoto. Se non ci sono volontari assegnati, non c'è il riquadro della squadra e l'ordine del culto usa tutta la larghezza della pagina. Se nessun elemento ha una durata, la colonna **Durata** viene omessa, e se il piano non ha orari di servizio né durate, si omette anche la colonna **Orario**. Per rimuovere la barra nera con il titolo **Ordine del culto** e la data del servizio, deseleziona **Mostra intestazione Ordine del culto** in cima alla pagina di stampa; B1 Admin ricorda la tua scelta su quel browser.

:::info
I piani sono organizzati per ministero. Assicurati di essere sulla scheda del ministero corretta prima di creare o visualizzare i piani.
:::

## Passi successivi

- Usa la [Panoramica dei piani](./plans-overview.md) per vedere tutte le assegnazioni future su più settimane in un'unica griglia, individuare le posizioni scoperte e assegnare i volontari direttamente dalla griglia
- Salva la struttura di un piano come [Modello di piano](./plan-templates.md) così puoi applicarla ai piani futuri con un clic
- Costruisci il tuo [Ordine del culto](./service-order.md) con canti, letture e altri elementi
- Aggiungi [canti](./songs.md) dalla tua libreria direttamente nell'ordine del culto
- Usa le [Attività](./tasks.md) per assegnare ai membri della squadra i passi di follow-up
- Mostra il contenuto della lezione attuale su una TV dell'atrio con la [Segnaletica digitale](./digital-signage.md)
