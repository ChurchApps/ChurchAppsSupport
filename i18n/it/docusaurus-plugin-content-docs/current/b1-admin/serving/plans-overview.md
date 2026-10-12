---
title: "Panoramica dei Piani"
---

# Panoramica dei Piani

<div class="article-intro">

La Panoramica dei Piani ti dà una visione complessiva di tutti i tuoi incarichi per i volontari su più date di servizio contemporaneamente. Invece di aprire ogni piano individualmente, puoi vedere chi sta servendo in ogni posizione su diverse settimane in una singola griglia -- e individuare rapidamente eventuali lacune che devono ancora essere colmate.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Crea almeno un Ministero e Tipo di Piano nell'area Servizio
- Crea [piani di servizio](./plans.md) con date e incarichi per i volontari
- Assicurati che i tuoi volontari siano stati aggiunti alla tua [directory dei contatti](../people/adding-people.md)

</div>

## Accesso alla Panoramica

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Servizio** e fai clic su **Piani**.
2. Seleziona una **scheda ministero** nella parte superiore della pagina.
3. Fai clic su **Overview** accanto al tipo di piano nell'elenco **Plan Types**, oppure apri il tipo di piano e fai clic su **Overview** in alto nella pagina.

La panoramica riguarda il tipo di piano da cui l'hai aperta. Fai clic sul nome del tipo di piano in alto nella panoramica per tornare al suo elenco di piani.

## Lettura della Griglia Panoramica

La panoramica mostra una griglia dove:

- **Righe** rappresentano ogni posizione (ad esempio, "Musica: Chitarra", "Tecnologia: Proiezione") raggruppate per categoria
- **Colonne** rappresentano le prossime date di servizio (ad esempio, "14 apr", "21 apr")
- **Celle** mostrano il nome del volontario assegnato a quella posizione in quella data

Le celle evidenziate in **rosso** sono vuote -- nessun volontario è stato assegnato ancora. Questo rende facile vedere le lacune di personale a colpo d'occhio senza aprire ogni piano individualmente.

:::tip
I nomi dei volontari sono mostrati in un formato abbreviato (nome e iniziale cognome, ad esempio, "John D.") per mantenere la griglia compatta quando hai molte posizioni.
:::

## Assegnazione di Volontari Direttamente dalla Panoramica

Non devi aprire i piani individuali per riempire gli slot vuoti. Fai clic su qualsiasi cella nella griglia per aprire un pannello di incarico per quella posizione e data. Da lì puoi:

- Selezionare una persona dal tuo team per assegnare alla posizione
- Fai clic su **Rimuovi** accanto a chiunque sia già assegnato per allontanarlo da quello slot
- Salva la modifica senza lasciare la panoramica

Questo rende possibile staffare un intero programma in una sola volta -- lavora su settimane e posizioni senza navigare dentro e fuori dai piani individuali.

## Pianificazione Automatica dalla Panoramica

Fai clic su **Pianificazione Automatica** per far sì che B1 riempia ogni slot aperto e vuoto nella griglia corrente contemporaneamente. Per ogni piano in vista, estrae i candidati dal gruppo collegato a ogni posizione e riempie gli slot vuoti automaticamente, segnalando quanti dei piani visibili è stato in grado di riempire. I piani vengono riempiti uno alla volta in modo che lo stesso volontario non sia prenotato due volte su due date nello stesso passaggio.

:::info
La Pianificazione Automatica riempie solo gli slot che sono già vuoti -- non sostituisce mai un incarico esistente.
:::

## Invio di Email a Tutti i Programmati

Fai clic su **Email Volontari** per inviare una notifica a ogni volontario assegnato da qualsiasi parte nell'intervallo di date e ministeri attualmente filtrati, in un'azione sola, piuttosto che inviare email piano per piano. B1 segnala quante email sono state inviate e quante non riuscite.

## Invio di SMS a Tutti i Programmati {#texting-everyone-scheduled}

Se la tua chiesa ha collegato un [provider SMS](../settings/church-settings.md#texting) e puoi sia modificare i piani sia inviare SMS, nella parte superiore della panoramica compare il pulsante **Text Volunteers**.

1. Fai clic su **Text Volunteers**.
2. La finestra di dialogo mostra quanti volontari riceveranno il messaggio (ad esempio, "12 of 14 volunteers will receive this text"), oltre a quanti hanno annullato l'iscrizione agli SMS e quanti non hanno un numero di telefono registrato.
3. Scrivi il tuo **Message**. Puoi fare clic su un segnaposto per inserire il nome di ciascun volontario o il nome della tua chiesa.
4. Fai clic su **Send**. B1 segnala quanti SMS sono stati inviati.

Ogni volontario assegnato nell'intervallo di date riceve un solo SMS al numero di cellulare del suo profilo, anche se presta servizio in più date. Le persone che condividono un numero di telefono (come il telefono di famiglia) ricevono un solo SMS. I volontari che hanno risposto STOP a un SMS precedente vengono saltati.

:::info
Gli SMS vengono inviati tramite il provider SMS della tua chiesa, quindi si applicano le sue tariffe. Se la tua chiesa esaurisce i crediti SMS, l'invio si interrompe e la finestra di dialogo te lo segnala. Un singolo invio raggiunge al massimo 200 volontari; restringi l'intervallo di date se ne hai di più.
:::

## Evidenziazione del Programma di un Volontario

Utilizza il menu a discesa **Evidenzia** per scegliere una persona dal tuo team -- ogni cella dove sono assegnati è evidenziata nella griglia, in modo da poter vedere ovunque stiano già servendo prima di aggiungerli a un altro slot. Scegli **Tutti** per disattivare l'evidenziazione.

## Filtraggio della Panoramica

Puoi regolare ciò che la panoramica mostra utilizzando i controlli sopra la griglia. La griglia si aggiorna non appena li modifichi:

- **All positions / Unfilled only** -- Scegli **Unfilled only** per nascondere le righe in cui ogni data è già riempita, in modo da poterti concentrare solo sulle posizioni che hanno ancora bisogno di un volontario.
- **Data Inizio / Data Fine** -- Per impostazione predefinita, la panoramica mostra 12 settimane nel futuro. Inserisci date personalizzate per espandere o restringere l'intervallo.

## Esportazione in CSV

Fai clic su **Esporta CSV** per scaricare la griglia corrente come foglio di calcolo. L'esportazione include tutte le posizioni e gli incarichi dei volontari per l'intervallo di date filtrato, rendendo facile condividere con i leader dei ministeri o stampare per le riunioni di pianificazione.

:::info
L'esportazione CSV riflette tutti i filtri attualmente applicati -- solo le date e il tipo di piano mostrati nella griglia sono inclusi nel download.
:::

## Articoli Correlati

- [Piani di Servizio](./plans.md) -- Crea e gestisci i piani di servizio individuali
- [Ordine di Servizio](./service-order.md) -- Costruisci l'ordine di servizio all'interno di un piano
- [Pianificazione delle Lezioni](./scheduling-lessons.md) -- Pianifica le lezioni insieme ai tuoi piani di servizio
