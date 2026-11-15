---
title: "Dashboard"
description: "Scopri cosa mostra la Dashboard di B1 Admin: l'ordine di culto della settimana, chi serve e chi è registrato, le cose che richiedono attenzione e i tuoi compiti e gruppi."
---

# Dashboard

<div class="article-intro">

La Dashboard è la pagina iniziale di B1 Admin. Si apre quando accedi ed è costruita attorno al culto settimanale della tua chiesa: l'ordine di culto del prossimo piano, chi sta servendo, chi è presente in sala la domenica, tutto ciò che attende la tua attenzione e i tuoi compiti e gruppi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Accedi a [B1 Admin](https://admin.b1.church). Ogni utente che ha effettuato l'accesso ha una Dashboard, ma ciò che mostra dipende dal tuo [ruolo e dai tuoi permessi](./settings/roles-permissions.md).
- Le sezioni dedicate al culto si riempiono quando usi [Piani](./serving/plans.md) e [Presenze](./attendance/index.md) oppure [Check-In](./attendance/check-in.md).

</div>

## Aprire la Dashboard {#opening-the-dashboard}

- Accedi -- B1 Admin si apre sulla Dashboard.
- Fai clic sul piccolo logo della chiesa in alto a sinistra di qualsiasi pagina.
- Apri il [menu Jump](./introduction.md#getting-around-with-the-jump-menu) (fai clic sulla barra di ricerca oppure premi **Ctrl+K** / **Cmd+K**) e scegli **Dashboard**.

## Il culto di questa settimana {#this-weeks-service}

La grande scheda in alto mostra un piano di culto: il prossimo piano in programma tra la scorsa domenica e la prossima domenica, oppure il piano della scorsa domenica se non ce ne sono in arrivo. Se più piani cadono nello stesso giorno, prima viene un piano che usa un ordine di culto, poi quello con l'orario del culto più anticipato.

- **Riga della data** -- il giorno, la data e il primo orario del culto del piano (ad esempio *Domenica · 15 novembre · 9:00*).
- **Titolo** -- il nome del piano. Se puoi aprire il piano (puoi modificare i piani, fai parte del ministero del piano oppure stai servendo in quel piano), il titolo è un collegamento al [piano](./serving/plans.md).
- **Ordine di culto** -- ogni elemento dell'[ordine di culto](./serving/service-order.md) del piano con l'orario di inizio, calcolato a partire dal primo orario del culto e dalla durata di ciascun elemento. Mentre il culto è in corso, l'elemento attuale viene evidenziato.

Se questa settimana non c'è alcun piano, la scheda riporta **Nessun culto pianificato questa settimana.**, e se il piano non ha un ordine di culto riporta **Nessun ordine di culto per questo piano.** Chi può modificare i piani vede un collegamento **Piani** accanto a uno dei due messaggi.

### Chi serve e chi è in sala {#who-is-serving-and-who-is-in-the-room}

Accanto all'ordine di culto, la Dashboard aggiunge ciò che accade intorno al culto, una volta che ci sono dati disponibili:

| Sezione | Cosa mostra |
|---|---|
| **in sala** | Quante persone si sono registrate o sono state segnate come presenti. La domenica è il conteggio di oggi, con un indicatore **Live**; durante la settimana mostra il conteggio di **la scorsa domenica**. Se nessuno è stato registrato per nome, usa i [conteggi](./attendance/headcount-entry.md) di quel giorno. |
| **Servono la domenica** / **Servono in questo orario** | Tutti i programmati sul piano con la rispettiva posizione, collegati alla loro scheda persona. Le assegnazioni rifiutate vengono escluse. |
| **Prima volta** / **Prima volta la scorsa domenica** | Gli ospiti alla prima visita (persone con stato di membership *Visitatore* o *Ospite*, oppure registrate come ospiti), raggruppati per nucleo familiare. |
| **Sale** | Check-in per classe o sala di quella settimana, con una barra di capienza quando per il gruppo è impostata una **Capienza**. |

Finché non esistono dati, la scheda mostra un breve suggerimento con collegamenti a **Persone**, **Presenze** e **Piani** (solo quelli che puoi aprire).

:::info
I conteggi e i nomi provengono dai dati di presenze e di servizio, quindi compaiono solo per le persone che hanno il permesso di vederli. Ad esempio, i nomi degli ospiti e l'elenco dei servitori richiedono il permesso di visualizzare le persone, mentre i conteggi delle sale richiedono il permesso di visualizzare le presenze.
:::

## Richiede attenzione {#needs-attention}

Quando qualcosa attende la tua azione, una scheda **Richiede attenzione** lo elenca con un collegamento:

- **approvazioni di calendario in attesa** -- eventi e prenotazioni di sale o risorse che richiedono approvazione. Apre [Approvazioni](./calendars/approvals.md). Mostrato a chi può modificare i contenuti.
- **richieste di adesione ai gruppi in attesa** -- persone che chiedono di entrare in un gruppo. Apre l'elenco delle [richieste in attesa](./groups/group-join-requests.md). Mostrato a chi può modificare i membri dei gruppi.

La scheda è nascosta quando non c'è nulla da fare.

## I miei compiti e i miei gruppi {#my-tasks-and-my-groups}

In fondo alla pagina:

- **I miei compiti** elenca fino a quattro [compiti](./serving/tasks.md) aperti assegnati a te; fai clic su uno per aprirlo. Fai clic su **Aggiungi compito** per creare un compito direttamente qui (scegli a chi si riferisce e a chi è assegnato, poi inserisci un titolo, una scadenza e delle note), oppure su **Tutti i compiti** per aprire **Servizio > Il mio lavoro**.
- **I miei gruppi** elenca i gruppi di cui fai parte; fai clic su uno per aprirlo. Se puoi gestire i gruppi oppure visualizzare le persone, **Tutti i gruppi** apre l'elenco completo dei [Gruppi](./groups/index.md).

## Azioni rapide {#quick-actions}

Le scorciatoie di configurazione che un tempo comparivano nella Dashboard (come **Aggiungi il logo della tua chiesa**, **Configura le donazioni online** e **Crea il tuo primo gruppo**) ora si trovano nel menu Jump, sotto **Azioni rapide**. Vedi [Azioni rapide](./introduction.md#quick-actions).

## Articoli correlati {#related-articles}

- [Introduzione](./introduction.md) -- accesso e come orientarsi con il menu Jump
- [Notifiche e messaggi](./notifications.md) -- gli avvisi e i messaggi privati nel menu utente
- [Piani](./serving/plans.md) e [Ordine di culto](./serving/service-order.md) -- ciò che alimenta la scheda del culto
- [Check-In](./attendance/check-in.md) -- come le persone vengono conteggiate in sala
