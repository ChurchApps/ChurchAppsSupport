---
title: "Piani di servizio"
description: "Configura la pianificazione dei volontari in B1 Admin: crea piani di servizio per data, copia dalle settimane precedenti, assegna i membri del team alle posizioni e gestisci scadenze di iscrizione e promemoria."
---

# Piani di servizio {#service-plans}

<div class="article-intro">

I piani di servizio organizzano chi serve e quando. Ogni piano è legato a una data e a un ministero specifici, rendendo facile coordinare i tuoi team di volontari settimana per settimana e assicurare che ogni servizio sia completamente coperto.

</div>

## Video di formazione {#training-video}

<YouTube id="47DstBXKl74" title="Creare piani e pianificare i volontari in B1" next="Creare l'ordine del servizio e la libreria dei canti in B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura i tuoi ministeri e i team nell'area Servizio
- Assicurati che i volontari siano stati aggiunti alla tua [rubrica delle persone](../people/adding-people.md) e assegnati ai team

</div>

## Accedere ai piani {#accessing-plans}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Servizio** e clicca su **Piani**.
2. Seleziona una **scheda del ministero** in cima alla pagina.
3. Clicca su un **tipo di piano** per vedere l'elenco dei piani di quel tipo. Usa **Prossimi** e **Passati** sopra l'elenco per passare dai piani futuri a quelli precedenti. **Prossimi** elenca i piani da oggi in avanti, dal più vicino, con i piani senza data alla fine. **Passati** elenca solo i piani precedenti, dal più recente.
4. Clicca su un piano specifico per aprirlo.

Ogni pagina di piano mostra dei collegamenti per tornare al suo tipo di piano e a **Piani**, così puoi risalire senza usare il pulsante Indietro del browser.

:::info
Per gestire i piani non serve l'accesso amministrativo completo. Chiunque sia membro di un ministero può accedere a Servizio e creare, modificare e pianificare i piani del proprio ministero senza bisogno dell'autorizzazione Modifica piani. Gli editor con il ruolo Modifica piani possono gestire i piani di tutti i ministeri.
:::

## Creare un piano {#creating-a-plan}

1. Dalla pagina del tipo di piano, clicca su **Nuovo piano** in cima alla pagina. Si apre il modulo **Aggiungi un piano**.
2. Dai al piano un nome oppure usa la data come nome. Seleziona la **Data del servizio**. Se la tua chiesa ha più di un campus, puoi anche scegliere il **Campus** del piano.
3. Se il tuo ministero ha dei [modelli](./plan-templates.md), puoi sceglierne uno in **Inizia da un modello** per compilare in un solo passaggio l'ordine del servizio, le posizioni e le note.
4. Altrimenti, se vuoi copiare da un piano precedente, usa **Copia dal piano precedente** per scegliere **Solo posizioni** oppure **Posizioni e assegnazioni**. Se non vuoi copiare, scegli **Niente**. Puoi anche selezionare **Copia ordine del servizio**. Quando copi da un piano precedente, il nuovo piano conserva anche le **Note**, la **Scadenza iscrizioni**, l'impostazione **Mostra i nomi dei volontari nella pagina di iscrizione** e l'impostazione di sostituzione automatica di quel piano, così non devi reinserirle ogni settimana. Puoi modificarle tutte nelle impostazioni del nuovo piano.
5. Per creare più piani in una volta mentre copi, scegli **Ripeti ogni** e la **Frequenza** (Giorno, Settimana o Mese), quindi inserisci il **Numero di piani** (fino a 12). Per il mese, **Il** ti permette di mantenere lo stesso giorno del mese oppure lo stesso giorno della settimana, come il secondo sabato. B1 elenca le date prima del salvataggio e crea un piano per ogni data, ciascuno copiato da quello precedente. Se il piano prende il nome dalla sua data, ogni nuovo piano prende il nome dalla propria data.
6. Se vuoi, imposta la **Scadenza iscrizioni (ore prima del servizio)**. Un nuovo piano parte con la scadenza del piano precedente, che puoi modificare qui. Lascia il campo vuoto per nessuna scadenza. Vedi [Impostazioni del piano](#plan-settings) per capire come viene calcolata la scadenza.
7. Salva il piano. Ora puoi iniziare ad assegnare i membri del team e a costruire l'[ordine del servizio](./service-order.md).

:::tip
Le impostazioni di ripetizione sono disponibili solo quando stai copiando qualcosa dal piano precedente (posizioni, assegnazioni o ordine del servizio).
:::

## La pagina del piano {#the-plan-page}

Quando apri un piano, in cima compaiono il suo ministero e il tipo di piano, il nome e la data del servizio, con i pulsanti **Stampa** e **Modifica dettagli**. La pagina ti offre una panoramica dell'intero piano:

- I riquadri **Durata**, **Team di servizio** e **Risposte** mostrano la lunghezza dell'ordine del servizio, quante posizioni sono coperte (ad esempio, "10 su 13 coperte") e quanti volontari hanno accettato, sono in attesa o hanno rifiutato.
- **Ordine del servizio** mostra i primi elementi dell'[ordine del servizio](./service-order.md) con le rispettive durate. Clicca su **Modifica ordine del servizio** per aprire l'ordine completo nella sua pagina.
- **Team di servizio** elenca ogni posizione per categoria, con i volontari assegnati e quanti ne servono ancora. Se qualcosa richiede attenzione, compare una riga come "1 conflitto · 3 non notificati" con un collegamento **Verifica**. Clicca su **Gestisci il team di servizio** per aprire la pagina completa del team.
- **Orari** elenca gli orari del servizio e delle prove del piano. Vedi [Orari del servizio](#service-times).
- **Note** contiene le note per l'intero team. Clicca su **Modifica**, scrivi le tue note e clicca su **Salva note**.

Le pagine dell'ordine del servizio e del team di servizio hanno ciascuna un collegamento **Torna al piano** che ti riporta alla panoramica.

## Orari del servizio {#service-times}

Gli orari indicano a B1 quando si svolgono il servizio e le eventuali prove. Vengono usati per la scadenza delle iscrizioni, la [verifica del piano](./plan-validation.md), i promemoria per i volontari e gli orari effettivi nell'ordine del servizio.

1. Nella pagina del piano, clicca su **Aggiungi orario** accanto a **Orari**.
2. Scegli il **Tipo**: **Servizio**, **Prova** oppure **Altro**.
3. Inserisci un **Nome visualizzato** (ad esempio, "Servizio domenicale" oppure "Prova").
4. Imposta l'**Orario di inizio** e l'**Orario di fine**.
5. Sotto **Team di servizio necessari**, seleziona le categorie di posizioni (ad esempio, Lode o Tecnica) che prestano servizio in quell'orario.
6. Clicca su **Salva**.

Clicca sul nome di un orario per modificarlo o eliminarlo.

## Assegnare i membri del team {#assigning-team-members}

1. Apri un piano e clicca su **Gestisci il team di servizio**.
2. Clicca su **Aggiungi posizione**. Nella finestra **Aggiungi una posizione**, scegli o digita un **Nome categoria** (ad esempio, Lode o Accoglienza), inserisci il **Nome** della posizione e il **Numero di volontari**, poi scegli un **Gruppo di volontari**. Per permettere a chiunque della chiesa di coprire la posizione (non solo ai membri di un team), lascia il **Gruppo di volontari** impostato su **Nessuno**. Seleziona **Consenti l'autoiscrizione** per permettere ai volontari di iscriversi autonomamente ai posti liberi, e aggiungi una **Descrizione** facoltativa che i volontari vedono quando sfogliano le opportunità di iscrizione. Clicca su **Salva**.
3. Clicca sul collegamento **Persone necessarie** accanto alla posizione (ad esempio, "2 persone necessarie").
4. Nella finestra **Assegna posizione**, clicca sul nome di un membro del team per assegnarlo. Per un team numeroso, digita parte di un nome in **Cerca nel team** per restringere l'elenco; l'elenco scorre da solo, così **Fatto** resta visibile. I membri del team che hanno una [data di indisponibilità](./plan-validation.md#blockout-dates) nella data del piano mostrano un badge **Non disponibile** e sono elencati per ultimi. Se il Gruppo di volontari della posizione è impostato su **Nessuno**, cerca chiunque nella tua chiesa e clicca sull'icona di aggiunta persona accanto al nome. Clicca su **Fatto** quando hai finito.
5. I volontari assegnati compaiono accanto alla posizione. Un puntino verde sulla loro foto indica che hanno accettato, mentre un puntino rosso indica che hanno rifiutato. Un badge **Non disponibile** indica che hanno bloccato la data del piano.
6. Notifica i volontari dal pannello **Verifica** (vedi [Notificare i volontari](./plan-validation.md#notifying-volunteers)). Se il piano usa un [flusso di conferma](#plan-settings), la notifica avvia anche una scheda del flusso di lavoro che segue ogni richiesta fino a quando il volontario risponde.

Per modificare o rimuovere un'assegnazione, clicca sul nome del volontario e poi su **Elimina** nella finestra **Modifica assegnazione**. Per modificare una posizione, clicca sul suo nome; **Elimina** nella finestra **Modifica posizione** rimuove la posizione e annulla la pianificazione di chiunque vi fosse assegnato.

Ogni posizione mostra un'etichetta con il conteggio (ad esempio, "2/3", oppure "1/2 iscrizione" per le posizioni ad autoiscrizione), così puoi vedere a colpo d'occhio quanti posti sono coperti. In cima alla pagina del team di servizio, un riepilogo ("X posizioni su Y coperte") mostra la copertura complessiva del piano, insieme a quante ne servono ancora; diventa **Completamente coperto** quando ogni posizione è assegnata.

:::tip
Configura i tuoi team nelle impostazioni del ministero prima di creare i piani. In questo modo avrai già un gruppo di volontari da cui attingere per le assegnazioni.
:::

### Assegnazione automatica {#auto-assign}

Clicca su **Assegna automaticamente** nella pagina del team di servizio per riempire ogni posto libero con il Gruppo di volontari della posizione. Le posizioni senza Gruppo di volontari vengono saltate. Per annullare i volontari appena aggiunti, clicca su **Annulla assegnazione automatica**. Puoi anche riempire molti piani in una volta sola dalla [Panoramica dei piani](./plans-overview.md#auto-scheduling-from-the-overview).

### Preferenze di pianificazione {#scheduling-preferences}

Nella finestra **Assegna posizione**, clicca sull'icona dei cursori accanto a un membro del team per impostare le sue **Preferenze di pianificazione**: **Massimo di volte al mese**, **Orari di servizio preferiti** e **Pianificazione per nucleo familiare** (pianifica il nucleo familiare insieme, oppure non nello stesso giorno). La [verifica del piano](./plan-validation.md) ti avvisa quando un'assegnazione va contro queste preferenze.

### Copiare le posizioni in un piano vuoto {#copying-positions-into-an-empty-plan}

Se un piano non ha ancora posizioni e c'è un piano precedente dello stesso tipo, nella pagina del team di servizio compare un collegamento **Copia dal piano precedente**. Scegli **Solo posizioni** oppure **Posizioni e assegnazioni** per riempire il piano aperto con le posizioni (e i volontari) del piano precedente. La copia va nel piano corrente; non crea un secondo piano per la stessa data.

## Impostazioni del piano {#plan-settings}

Ogni piano ha delle impostazioni aggiuntive che puoi configurare cliccando su **Modifica** accanto al piano nell'elenco del tipo di piano, oppure su **Modifica dettagli** in cima alla pagina del piano. Clicca su **Fatto** (oppure sul nome del piano sopra il modulo) per tornare al piano. Lo stesso modulo ha un pulsante **Elimina** che elimina il piano, incluse le sue posizioni, le assegnazioni e l'ordine del servizio. Le impostazioni includono:

- **Scadenza iscrizioni (ore prima del servizio)** — il numero di ore prima del servizio in cui si chiudono le iscrizioni dei volontari. Le ore vengono conteggiate a ritroso dal primo orario di **Servizio** del piano (le prove e gli altri orari vengono saltati, a meno che il piano non abbia nient'altro), quindi una scadenza di 2 ore per un servizio alle 10:00 chiude le iscrizioni alle 8:00 di quella mattina. Se il piano non ha orari, la scadenza viene conteggiata dalle 9:00 della data del servizio, nel fuso orario della tua chiesa. Una volta trascorsa, i volontari non possono né iscriversi né ritirarsi. Inserisci un numero negativo per tenere aperte le iscrizioni anche dopo l'inizio del servizio. Lascia il campo vuoto, o cancellalo, per nessuna scadenza.
- **Flusso di conferma** — scegli un [flusso di lavoro di conferma delle assegnazioni di servizio](./workflows.md#serving-assignment-confirmations) per seguire via email e SMS le richieste di servizio di questo piano, finché ogni volontario non accetta o rifiuta. Quando **Notifichi** i volontari di un piano pubblicato, ogni nuova richiesta ottiene una propria scheda nella bacheca di quel flusso di lavoro, e una nota sopra il collegamento di notifica dice *"Le nuove richieste usano il flusso di conferma."* Lascia su **Usa le notifiche di assegnazione esistenti** per mantenere le notifiche abituali. Nell'elenco compaiono solo i flussi di conferma attivi; creane uno prima da **Servizio > Flussi di lavoro**.
- **Mostra i nomi dei volontari nella pagina di iscrizione** — quando è selezionata, i volontari che hanno effettuato l'accesso possono vedere chi è già iscritto a ciascuna posizione nella pagina di iscrizione di B1.church. I nomi non vengono mai mostrati ai visitatori che non hanno effettuato l'accesso. Controlla anche se i volontari che coprono ogni elemento dell'ordine del servizio vengono stampati accanto a esso (vedi [Stampare i piani](#printing-plans)).
- **In bozza** — nasconde le assegnazioni ai volontari finché non sei pronto a pubblicare il calendario. Mentre un piano è in bozza, il pannello **Verifica** nella pagina del team di servizio mostra un pulsante **Pubblica piano** (oppure **Pubblica e notifica** se i volontari non sono ancora stati notificati) che rende visibili le assegnazioni.
- **Sostituzione automatica in caso di rifiuto** — quando è selezionata, se un volontario assegnato rifiuta la propria posizione, B1 contatta automaticamente la persona disponibile successiva nell'elenco del team e le chiede se può prestare servizio. Il processo continua nell'elenco finché qualcuno non accetta, mantenendo le posizioni coperte senza necessità di follow-up manuali.

:::tip
Nella pagina di iscrizione per i membri, le posizioni aperte di ogni piano sono elencate per categoria e poi per nome. I membri vedono tutte le settimane future con posizioni aperte, a meno che tu non attivi **Mostra solo la settimana successiva di ogni tipo di piano** in [Impostazioni > Iscrizione dei volontari](../settings/church-settings.md#volunteer-signup).
:::

## Promemoria per i volontari {#volunteer-reminders}

B1 può inviare automaticamente promemoria ai volontari prima dei servizi per cui sono programmati, così non devi rincorrere il team ogni settimana. I promemoria vanno a **tutti i programmati** — sia a quelli che hanno confermato sia a quelli che non hanno ancora risposto. Fa eccezione una richiesta inviata tramite un [flusso di conferma](./workflows.md#serving-assignment-confirmations): quel volontario riceve i promemoria solo dopo aver accettato, poiché fino ad allora il flusso di lavoro si occupa dei solleciti. Ogni email di promemoria include la posizione (o le posizioni) del volontario, la data del servizio, le note del piano e il tuo messaggio personalizzato.

Tempistica e contenuto dei promemoria si impostano per **tipo di piano**, così ogni tipo di servizio può avere la propria programmazione.

1. Dall'area **Servizio**, seleziona il ministero che contiene il tipo di piano.
2. Nell'elenco **Tipi di piano**, clicca su **Modifica** accanto al tipo di piano.
3. Espandi la sezione **Promemoria** e attiva **Invia promemoria per i piani di questo tipo**.
4. Sotto **Quando devono essere inviati i promemoria?**, scegli fino a tre tempistiche: **7 giorni prima**, **3 giorni prima**, **2 giorni prima**, **1 giorno prima** oppure **Il giorno stesso**.
5. Imposta l'**Orario del giorno** in cui vengono inviati i promemoria.
6. Se vuoi, aggiungi un **Messaggio**. Lascialo vuoto per usare il testo predefinito del promemoria.
7. Sotto **Invia tramite**, scegli **Notifica push**, **Email** e, se la tua chiesa ha collegato un [fornitore di SMS](../settings/church-settings.md#texting), **SMS**.
8. Clicca su **Salva promemoria**.

I promemoria sono disattivati per un tipo di piano finché non li attivi.

:::tip
I volontari che non hanno ancora confermato trovano i pulsanti **Accetta** e **Rifiuta** direttamente nell'email di promemoria, così possono rispondere senza accedere.
:::

### Promemoria via SMS {#text-reminders}

L'opzione **SMS** compare solo quando la tua chiesa ha collegato un fornitore di SMS. Gli SMS vengono inviati tramite il fornitore di SMS della tua chiesa, e ogni messaggio può comportare un costo per la chiesa. Un volontario riceve un promemoria via SMS solo se ha attivato **Messaggi di testo** nelle sue [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) e ha un numero di cellulare nel suo profilo. Ogni SMS inizia con il nome della tua chiesa, è contenuto in un unico messaggio e termina con "Rispondi STOP per disiscriverti." Chi risponde STOP smette di ricevere SMS dalla tua chiesa. Perché le risposte STOP arrivino a B1, incolla l'**URL del webhook per i messaggi in arrivo (STOP)** dalle tue [impostazioni SMS](../settings/church-settings.md#texting) nel webhook dei messaggi in arrivo del tuo fornitore.

Per inviare subito un SMS a tutti i programmati in un intervallo di date, usa **Invia SMS ai volontari** nella [Panoramica dei piani](./plans-overview.md#texting-everyone-scheduled).

:::info
Ogni promemoria viene inviato una sola volta. I promemoria via SMS si aggiungono a quelli via notifica push ed email, non li sostituiscono.
:::

## Associare gruppi a un tipo di piano {#associating-groups-with-a-plan-type}

Sotto l'elenco dei piani nella pagina del tipo di piano, la sezione **Gruppi associati** ti permette di decidere quali gruppi possono vedere i piani di questo tipo dal loro portale membri. È un modo rapido per mostrare i prossimi servizi ai team giusti senza concedere l'accesso amministrativo.

1. Nella pagina del tipo di piano, clicca su **Gruppi associati** in cima alla pagina (oppure scorri fino a quella sezione).
2. Clicca su **Aggiungi gruppo** e scegli un gruppo dal menu a discesa.
3. Nella colonna **Mostra**, scegli se i membri di quel gruppo devono vedere **Solo i piani passati**, **Solo i piani futuri** oppure **Piani passati e futuri** per questo tipo di piano.
4. Ripeti per associare altri gruppi, oppure clicca sull'icona del cestino per rimuovere un gruppo.

:::info
Nel selettore compaiono solo i gruppi contrassegnati come **Standard**. I membri di un gruppo associato vedono automaticamente i piani di questo tipo nella pagina del gruppo nel portale membri di B1, limitati alla finestra temporale che hai selezionato.
:::

Se i piani sono lezioni di Lessons.church, i membri del gruppo associato vedono anche una scheda **La lezione di questa settimana** nella pagina del gruppo (riga finale, versetto e una domanda per i genitori). Associa qui un gruppo di genitori e imposta il filtro su **Solo i piani passati**, così la lezione di oggi viene inclusa. I team dei volontari di solito usano **Solo i piani futuri** oppure **Piani passati e futuri**.

## Stampare i piani {#printing-plans}

Puoi stampare un piano da distribuire al team. Apri il piano e clicca su **Stampa** in cima alla pagina per generare una versione stampabile che include le assegnazioni e l'ordine del servizio. In cima alla stampa compaiono il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) con il nome della chiesa sotto, e il nome del piano, così i fogli sciolti si riconoscono facilmente. È utile da distribuire alle prove o da affiggere in un'area comune.

Quando il piano ha più di un orario del servizio, la stampa contiene una colonna degli orari per ogni servizio, intestata con il suo orario di inizio. Un elemento escluso da un servizio (vedi [Includere gli elementi in orari di servizio specifici](./service-order.md#including-items-in-specific-service-times)) mostra un trattino nella colonna di quel servizio.

La stampa omette tutto ciò che sarebbe vuoto. Se non ci sono volontari assegnati, non c'è un riquadro del team e l'ordine del servizio usa tutta la larghezza della pagina. Se nessun elemento ha una durata, la colonna **Durata** viene omessa, e se il piano non ha orari del servizio né durate, viene omessa anche la colonna **Orario**. Per eliminare la barra nera di intestazione **Ordine del servizio** con la data del servizio, deseleziona **Mostra intestazione Ordine del servizio** in cima alla pagina di stampa; B1 Admin ricorda la tua scelta in quel browser.

:::info
I piani sono organizzati per ministero. Assicurati di essere sulla scheda del ministero corretta prima di creare o visualizzare i piani.
:::

## Passaggi successivi {#next-steps}

- Usa la [Panoramica dei piani](./plans-overview.md) per vedere tutte le assegnazioni future su più settimane in un'unica griglia, individuare le posizioni non coperte e assegnare i volontari direttamente dalla griglia
- Salva la struttura di un piano come [Modello di piano](./plan-templates.md) per applicarla ai piani futuri con un solo clic
- Completa il tuo [Ordine del servizio](./service-order.md) con canti, letture e altri elementi
- Aggiungi i [canti](./songs.md) dalla tua libreria direttamente all'ordine del servizio
- Usa le [Attività](./tasks.md) per assegnare ai membri del team le azioni di follow-up
- Mostra i contenuti della lezione in corso su una TV nell'atrio con la [Segnaletica digitale](./digital-signage.md)
