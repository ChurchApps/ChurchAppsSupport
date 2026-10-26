---
title: "Promemoria degli eventi"
---

# Promemoria degli eventi

<div class="article-intro">

I promemoria degli eventi avvisano automaticamente le persone giuste prima che un evento accada -- ad esempio "Non perderlo! Il workshop sulla salute inizia domani alle 9:00". Configuri un promemoria una volta sull'evento, e B1 lo invia nei tempi previsti tramite notifiche push, email e, se la tua chiesa ha attivato i messaggi di testo, SMS. I membri possono controllare quali promemoria ricevere dalle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea l'evento per cui vuoi inviare promemoria (vedi [Creare calendari](creating-calendars))
- Per raggiungere gli iscritti, [attiva le iscrizioni](creating-calendars) sull'evento
- Per raggiungere un intero gruppo, assicurati che l'evento appartenga a un [gruppo](../groups/creating-groups) con dei membri

</div>

## Impostare un promemoria

Configuri i promemoria nella sezione **Promemoria** dell'evento.

- Quando **crei un nuovo evento**, espandi la sezione **Promemoria** nell'editor dell'evento prima di salvare.
- Per un **evento esistente**, apri la pagina **Dettagli iscrizione** dell'evento (dalla sezione **Iscrizioni**) per aggiungere o modificare il suo promemoria.

1. Attiva **Abilita promemoria**.
2. Scegli **Quando** inviare. Seleziona fino a tre tempi: **7 giorni prima**, **3 giorni prima**, **1 giorno prima** e **Il giorno stesso**.
3. Imposta l'**Ora del giorno** in cui inviare il promemoria (predefinita alle **9:00**, nel [fuso orario](../settings/church-settings.md#time-zone) della tua chiesa).
4. Scegli **Chi** deve ricevere il promemoria (vedi [Chi riceve il promemoria](#who-gets-reminded) qui sotto).
5. Facoltativamente aggiungi un **Messaggio**. Lascialo vuoto per usare il testo predefinito, oppure scrivi il tuo -- puoi includere `{{eventTitle}}` e verrà sostituito con il nome dell'evento.
6. Scegli i **Canali**: notifica **Push**, **Email** e, se la tua chiesa ha collegato un [fornitore di messaggi di testo](../settings/church-settings.md#texting), **SMS**.
7. Salva l'evento.

Mentre apporti modifiche, un'**anteprima dal vivo** mostra circa quante persone riceveranno il promemoria, quanti partecipanti non possono essere raggiunti e i prossimi orari di invio previsti -- così puoi verificare che il promemoria sia corretto prima di salvare.

## Chi riceve il promemoria

L'impostazione **Chi** controlla a chi va il promemoria:

- **Solo gli iscritti** -- Tutti gli iscritti all'evento collegati a una scheda persona. Questo è il predefinito quando l'evento ha le iscrizioni attive, così il promemoria per un piccolo evento con iscrizione non finisce mai per sbaglio a un intero gruppo.
- **Responsabili / solo iscritti** -- Un promemoria per ogni iscrizione (la persona che si è iscritta), invece che per ogni membro della famiglia presente nell'iscrizione.
- **Membri del gruppo** -- Tutti nel gruppo dell'evento. Questo è il predefinito quando l'evento non usa le iscrizioni.
- **Automatico** -- Usa gli iscritti quando le iscrizioni sono attive, altrimenti il gruppo.

:::info
Gli ospiti aggiunti solo con il nome (senza una scheda persona collegata) non possono ricevere un promemoria, perché non c'è un account, un dispositivo o un'email a cui inviarlo. L'anteprima ti dice quanti partecipanti rientrano in questa categoria, così non ci sono sorprese. I membri che hanno scelto di non ricevere comunicazioni vengono anch'essi saltati.
:::

## Quando vengono inviati i promemoria

- I promemoria partono all'**orario del giorno che hai scelto**, nel fuso orario locale della tua chiesa, per ciascuno dei tempi selezionati.
- Se **cambi la data o l'orario dell'evento**, i promemoria in attesa vengono riprogrammati automaticamente -- non devi modificare il promemoria.
- Se **elimini l'evento** (oppure annulli una singola occorrenza di un evento ricorrente), i suoi promemoria in attesa vengono annullati automaticamente.
- Gli eventi ricorrenti sono gestiti automaticamente: ogni occorrenza futura riceve il proprio promemoria.

:::tip
I promemoria vengono inviati **prima come push, con l'email come alternativa**. Se un membro ha le notifiche push attive, riceverà una push; altrimenti riceverà un'email. I membri scelgono quali canali vogliono per ogni tipo di notifica nelle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences).
:::

## Promemoria via SMS

Il canale **SMS** compare solo quando la tua chiesa ha collegato un fornitore di messaggi di testo. Gli SMS vengono inviati tramite il fornitore di messaggi della tua chiesa, e ogni SMS può avere un costo per la chiesa. Vengono inviati in aggiunta a eventuali promemoria push o email, e solo alle persone che:

- Hanno attivato i **Messaggi di testo** nelle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences), e
- Hanno un numero di cellulare nel proprio profilo.

Ogni SMS inizia con il nome della tua chiesa, è contenuto in un singolo messaggio di testo e termina con "Rispondi STOP per disattivare." Chi risponde STOP smette di ricevere messaggi dalla tua chiesa. Perché le risposte STOP arrivino a B1, incolla l'**URL del webhook (STOP) in entrata** dalle tue [impostazioni dei messaggi di testo](../settings/church-settings.md#texting) nel webhook dei messaggi in entrata del tuo fornitore.

## Cosa possono controllare i membri

I promemoria rispettano sempre le [Preferenze di notifica](../../b1-church/getting-started/notification-preferences) di ogni membro. Un membro può:

- Disattivare i **Promemoria eventi** per push, email o SMS, mantenendo attive le altre notifiche.
- Attivare o disattivare i promemoria via SMS con **Messaggi di testo**.
- Impostare le **ore di silenzio** così le notifiche non urgenti aspettano un orario ragionevole.

Non puoi annullare la scelta di un membro di non ricevere promemoria per gli eventi -- questo mantiene B1 conforme alle norme anti-spam e lascia ai membri il controllo della propria casella di posta.

## Promemoria per il servizio

I volontari programmati in un piano ricevono un **promemoria di servizio** separato con i dettagli del piano e, se non hanno ancora risposto, i pulsanti **Accetta / Rifiuta** direttamente nell'email. Questi promemoria si configurano sul tipo di piano e non su un evento del calendario, e possono anche essere inviati via SMS -- vedi [Promemoria per i volontari](../serving/plans#volunteer-reminders) e [Volontari della domenica](../guides/sunday-volunteers) per capire come funzionano la programmazione dei volontari e i promemoria.

## Prossimi passi

- [Preferenze di notifica](../../b1-church/getting-started/notification-preferences) -- Cosa possono controllare i membri
- [Guida alle iscrizioni agli eventi](../guides/event-registration) -- Configura le iscrizioni così i promemoria possono raggiungere chi si è iscritto
- [Creare calendari](creating-calendars) -- Torna alla configurazione dei calendari
