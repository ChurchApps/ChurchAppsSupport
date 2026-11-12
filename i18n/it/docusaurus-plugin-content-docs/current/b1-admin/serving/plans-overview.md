---
title: "Panoramica dei piani"
description: "Ottieni una visione d'insieme delle assegnazioni dei volontari su molte date di servizio in B1 Admin, individua le posizioni non coperte e assegna o invia un'email al team da un'unica griglia."
---

# Panoramica dei piani

<div class="article-intro">

La Panoramica dei piani ti offre una visione d'insieme di tutte le assegnazioni dei volontari su più date di servizio contemporaneamente. Invece di aprire ogni piano singolarmente, puoi vedere chi sta servendo in ogni posizione nelle settimane future in un'unica griglia, e individuare rapidamente eventuali lacune ancora da coprire.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea almeno un Ministero e un Tipo di piano nell'area Servizio
- Crea i [piani di servizio](./plans.md) con date e assegnazioni dei volontari
- Assicurati che i tuoi volontari siano stati aggiunti alla [rubrica delle persone](../people/adding-people.md)

</div>

## Accedere alla panoramica {#accessing-the-overview}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Servizio** e fai clic su **Piani**.
2. Seleziona una **scheda del ministero** in cima alla pagina.
3. Fai clic su **Panoramica** accanto al tipo di piano nell'elenco **Tipi di piano**, oppure apri il tipo di piano e fai clic su **Panoramica** in cima alla pagina.

La panoramica riguarda il tipo di piano da cui l'hai aperta. Fai clic sul nome del tipo di piano in cima alla panoramica per tornare al suo elenco di piani.

## Leggere la griglia della panoramica {#reading-the-overview-grid}

La panoramica mostra una griglia in cui:

- Le **righe** rappresentano ogni posizione (ad esempio, "Musica: Chitarra", "Tecnica: Proiezione") raggruppate per categoria
- Le **colonne** rappresentano le prossime date di servizio (ad esempio, "14 apr", "21 apr")
- Le **celle** mostrano il nome del volontario assegnato a quella posizione in quella data

Le celle evidenziate in **rosso** non sono coperte: nessun volontario è ancora stato assegnato. Così puoi vedere a colpo d'occhio le lacune nel personale senza aprire ogni piano singolarmente.

:::tip
I nomi dei volontari sono mostrati in forma abbreviata (nome e iniziale del cognome, ad esempio "Giovanni R.") per mantenere la griglia compatta quando hai molte posizioni.
:::

## Assegnare i volontari direttamente dalla panoramica {#assigning-volunteers-directly-from-the-overview}

Non devi aprire i singoli piani per riempire gli spazi vuoti. Fai clic su una cella qualsiasi della griglia per aprire un pannello di assegnazione per quella posizione e quella data. Da lì puoi:

- Fare clic sul nome di un membro del team per assegnarlo alla posizione (oppure, per una posizione senza Gruppo di volontari, cercare chiunque nella tua chiesa)
- Fare clic sull'icona **Rimuovi** (X) accanto a chi è già assegnato, e confermare, per toglierlo da quello spazio
- Fare clic su **Fatto** per chiudere il pannello senza lasciare la panoramica

In questo modo è possibile organizzare un intero calendario in un unico passaggio, lavorando su settimane e posizioni senza entrare e uscire dai singoli piani.

## Pianificazione automatica dalla panoramica {#auto-scheduling-from-the-overview}

Fai clic su **Pianifica automaticamente** e conferma per far sì che B1 riempia contemporaneamente ogni spazio aperto e non coperto nella griglia corrente. Per ogni piano visualizzato, prende i candidati dal gruppo collegato a ciascuna posizione e riempie automaticamente gli spazi vuoti, indicando quanti dei piani visibili è riuscito a coprire (ad esempio, "Pianificati automaticamente 3 piani su 4"). Le posizioni senza Gruppo di volontari vengono saltate. I piani vengono riempiti uno alla volta, così lo stesso volontario non viene prenotato due volte in due date diverse durante la stessa operazione.

:::info
La pianificazione automatica riempie solo gli spazi già vuoti: non sostituisce mai un'assegnazione esistente.
:::

## Inviare un'email a tutti i pianificati {#emailing-everyone-scheduled}

Fai clic su **Invia email ai volontari** e conferma per inviare una notifica a ogni volontario assegnato in qualsiasi punto dell'intervallo di date e del ministero attualmente filtrati, con un'unica azione, invece di scrivere piano per piano. B1 indica quante email sono state inviate e quante non sono riuscite.

## Inviare un SMS a tutti i pianificati {#texting-everyone-scheduled}

Se la tua chiesa ha collegato un [fornitore di SMS](../settings/church-settings.md#texting) e puoi sia modificare i piani sia inviare messaggi, in cima alla panoramica compare il pulsante **Invia SMS ai volontari**.

1. Fai clic su **Invia SMS ai volontari**.
2. La finestra mostra quanti volontari riceveranno il messaggio (ad esempio, "12 volontari su 14 riceveranno questo SMS"), oltre a quanti hanno annullato l'iscrizione agli SMS e quanti non hanno un numero di telefono registrato.
3. Scrivi il tuo **Messaggio**. Puoi fare clic su un segnaposto per inserire il nome di ciascun volontario o il nome della tua chiesa.
4. Fai clic su **Invia**. B1 indica quanti SMS sono stati inviati.

Ogni volontario assegnato nell'intervallo di date riceve un solo SMS al numero di cellulare presente nel suo profilo, anche se serve in più date. Le persone che condividono lo stesso numero di telefono (ad esempio, un telefono di famiglia) ricevono un solo SMS. I volontari che hanno risposto STOP a un messaggio precedente vengono saltati.

:::info
Gli SMS vengono inviati tramite il fornitore di SMS della tua chiesa, quindi si applicano le sue tariffe. Se la tua chiesa ha esaurito i crediti SMS, l'invio si interrompe e la finestra te lo segnala. Un singolo invio raggiunge al massimo 200 volontari: se ne hai di più, restringi l'intervallo di date.
:::

## Evidenziare il calendario di un volontario {#highlighting-a-volunteers-schedule}

Usa il menu a discesa **Evidenzia** per scegliere una persona del tuo team: ogni cella in cui è assegnata viene messa in evidenza nella griglia, così puoi vedere dove sta già servendo prima di aggiungerla a un altro spazio. Scegli **Tutti** per disattivare l'evidenziazione.

## Filtrare la panoramica {#filtering-the-overview}

Puoi modificare ciò che la panoramica mostra usando i controlli sopra la griglia. La griglia si aggiorna non appena li cambi.

- **Tutte le posizioni / Solo non coperte** -- Scegli **Solo non coperte** per nascondere le righe in cui ogni data è già coperta, così puoi concentrarti solo sulle posizioni che hanno ancora bisogno di un volontario.
- **Data di inizio / Data di fine** -- Per impostazione predefinita la panoramica mostra le 12 settimane future. Inserisci date personalizzate per ampliare o restringere l'intervallo.

## Esportare in CSV {#exporting-to-csv}

Fai clic su **Esporta CSV** per scaricare la griglia corrente come foglio di calcolo. L'esportazione include tutte le posizioni e le assegnazioni dei volontari per l'intervallo di date filtrato, rendendo facile condividerla con i responsabili dei ministeri o stamparla per le riunioni di pianificazione.

:::info
L'esportazione CSV riflette i filtri attualmente applicati: nel download sono incluse solo le date e il tipo di piano mostrati nella griglia.
:::

## Articoli correlati {#related-articles}

- [Piani di servizio](./plans.md) -- Crea e gestisci i singoli piani di servizio
- [Ordine del servizio](./service-order.md) -- Costruisci l'ordine del servizio all'interno di un piano
- [Pianificare le lezioni](./scheduling-lessons.md) -- Pianifica le lezioni insieme ai tuoi piani di servizio
