---
title: "Promemoria degli eventi"
description: "Configura in B1 Admin i promemoria degli eventi per notifiche push, email e SMS, scegliendo tempistica, destinatari e un messaggio personalizzato così le persone vengono avvisate in tempo."
---

# Promemoria degli eventi {#event-reminders}

<div class="article-intro">

I promemoria degli eventi avvisano automaticamente le persone giuste prima che un evento abbia luogo -- ad esempio, "Non mancare! Il workshop di salute inizia domani alle 9:00." Configuri un promemoria una sola volta sull'evento, e B1 lo invia nei tempi previsti tramite notifiche push, email e, se la tua chiesa ha attivato l'invio di SMS, messaggi di testo. I membri possono controllare quali promemoria ricevere dalle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea l'evento per cui vuoi inviare i promemoria (vedi [Creare calendari](./creating-calendars.md))
- Per raggiungere gli iscritti, [attiva le iscrizioni](./creating-calendars.md) per l'evento
- Per raggiungere un intero gruppo, assicurati che l'evento appartenga a un [gruppo](../groups/creating-groups.md) con dei membri

</div>

## Configurare un promemoria {#setting-up-a-reminder}

Configuri i promemoria nella sezione **Promemoria** dell'evento. Espandila per vedere le impostazioni.

- Quando **crei un nuovo evento**, espandi la sezione **Promemoria** in fondo all'editor **Nuovo evento**; il promemoria viene salvato quando salvi l'evento.
- Per un **evento già esistente**, usa la sezione **Promemoria** in uno di questi punti, e fai clic sul pulsante **Salva** all'interno della sezione: la finestra che si apre quando fai clic sull'evento in un calendario, l'editor **Modifica evento** oppure la pagina di iscrizione dell'evento (**Calendari > Iscrizioni**, poi l'evento).

1. Attiva **Abilita promemoria**.
2. Scegli **Quando (fino a 3)** per l'invio: **7 giorni prima**, **3 giorni prima**, **1 giorno prima** e **Il giorno stesso**. Una volta scelti tre, gli altri sono disabilitati finché non ne deselezioni uno.
3. Imposta l'**Ora del giorno** in cui deve partire il promemoria (il valore predefinito è **9:00 AM**, nel [fuso orario](../settings/church-settings.md#time-zone) della tua chiesa).
4. Scegli **Chi** deve ricevere il promemoria (vedi [Chi riceve il promemoria](#who-gets-reminded) più sotto).
5. Facoltativamente aggiungi un **Messaggio (facoltativo)**. Lascialo vuoto per usare il testo predefinito, oppure scrivi il tuo -- puoi includere `{{eventTitle}}` e verrà sostituito con il nome dell'evento.
6. Scegli i **Canali**: notifica **Push** ed **Email** (entrambi attivi per impostazione predefinita) e, se la tua chiesa ha collegato un [fornitore di SMS](../settings/church-settings.md#texting), **SMS**.
7. Fai clic su **Salva** (oppure salva il nuovo evento).

Per interrompere i promemoria di un evento, disattiva **Abilita promemoria** e salva.

### Inviare subito un promemoria {#sending-a-reminder-now}

Su un evento già salvato, fai clic su **Invia ora** accanto a **Salva** per inviare subito il promemoria -- ad esempio dopo una modifica last-minute. Usa le impostazioni salvate e raggiunge le stesse persone, per la prossima data dell'evento. B1 mostra poi quante persone ha raggiunto, ad esempio **Inviato a 12 persone**. I promemoria programmati continuano a essere inviati come previsto.

**Invia ora** è disponibile solo quando i promemoria sono attivi e salvati, quindi salva prima eventuali modifiche. Se il promemoria include **SMS**, ti serve anche il permesso di inviare SMS.

Su un evento già salvato, un'**anteprima in tempo reale** mostra approssimativamente quante persone riceveranno il promemoria, quanti partecipanti non possono essere raggiunti e i prossimi orari di invio previsti mentre apporti modifiche -- così puoi verificare che il promemoria sia corretto prima di salvarlo. Un evento appena creato non ha anteprima finché non viene salvato.

## Chi riceve il promemoria {#who-gets-reminded}

L'impostazione **Chi** determina a chi viene inviato il promemoria:

- **Solo iscritti** -- Tutte le persone iscritte all'evento collegate a una scheda persona. Questo è il valore predefinito quando per l'evento sono attive le iscrizioni, così un promemoria per un piccolo evento con iscrizione non finisce mai per sbaglio a un intero gruppo.
- **Capifamiglia / solo iscritti** -- Un promemoria per ogni iscrizione (la persona che si è iscritta), invece di ogni membro della famiglia presente nell'iscrizione.
- **Membri del gruppo** -- Tutti nel gruppo dell'evento. Questo è il valore predefinito quando l'evento non usa le iscrizioni.
- **Automatico** -- Usa gli iscritti quando le iscrizioni sono attive, altrimenti il gruppo.

:::info
Gli ospiti aggiunti solo con il nome (senza una scheda persona collegata) non possono ricevere un promemoria, perché non c'è un account, un dispositivo o un'email a cui inviarlo. L'anteprima ti indica quanti partecipanti rientrano in questa categoria, così non ci sono sorprese. Anche i membri che hanno rinunciato alle comunicazioni vengono saltati.
:::

## Quando vengono inviati i promemoria {#when-reminders-are-sent}

- I promemoria partono all'**ora del giorno che hai scelto**, nel fuso orario locale della tua chiesa, per ciascuno dei tempi selezionati.
- Se **cambi la data o l'ora dell'evento**, i promemoria in attesa vengono riprogrammati automaticamente -- non devi modificare il promemoria.
- Se **elimini l'evento** (oppure annulli una singola occorrenza di un evento ricorrente), i suoi promemoria in attesa vengono annullati automaticamente.
- Gli eventi ricorrenti sono gestiti automaticamente: ogni occorrenza futura riceve il proprio promemoria.

:::tip
I promemoria vengono inviati **prima tramite push, con l'email come alternativa**. Se un membro ha attive le notifiche push, riceverà una push; altrimenti riceverà un'email. I membri scelgono per ciascun tipo di notifica quali canali vogliono nelle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md).
:::

## Promemoria via SMS {#text-reminders}

Il canale **SMS** compare solo quando la tua chiesa ha collegato un fornitore di SMS. Gli SMS vengono inviati tramite il fornitore di SMS della tua chiesa, e ogni messaggio può avere un costo per la chiesa. Vengono inviati in aggiunta a eventuali promemoria push o email, e solo alle persone che:

- Hanno attivato **Messaggi di testo** nelle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md), e
- Hanno un numero di cellulare nel proprio profilo.

Ogni SMS inizia con il nome della tua chiesa, è contenuto in un singolo messaggio e termina con "Rispondi STOP per disiscriverti." Chi risponde STOP smette di ricevere SMS dalla tua chiesa. Perché le risposte STOP arrivino a B1, incolla l'**URL del webhook dei messaggi in arrivo (STOP)** dalle tue [impostazioni SMS](../settings/church-settings.md#texting) nel webhook dei messaggi in arrivo del tuo fornitore.

## Cosa possono controllare i membri {#what-members-can-control}

I promemoria rispettano sempre le [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) di ciascun membro. Un membro può:

- Disattivare i **Promemoria eventi** per push, email o SMS, mantenendo attive le altre notifiche.
- Attivare o disattivare i promemoria via SMS con **Messaggi di testo**.
- Impostare le **ore di silenzio** così le notifiche non urgenti attendono un orario ragionevole.

Non puoi sostituirti alla scelta di un membro di non ricevere i promemoria degli eventi -- questo mantiene B1 conforme alle regole anti-spam e lascia ai membri il controllo della propria casella di posta.

## Promemoria per il servizio {#serving-reminders}

I volontari programmati in un piano ricevono un **promemoria di servizio** separato con i dettagli del piano e, se non hanno ancora risposto, i pulsanti **Accetta / Rifiuta** direttamente nell'email. Questi promemoria si configurano sul tipo di piano anziché su un evento del calendario, e possono anche essere inviati via SMS -- vedi [Promemoria per i volontari](../serving/plans.md#volunteer-reminders) e [Volontari della domenica](../guides/sunday-volunteers.md) per capire come funzionano la programmazione dei volontari e i promemoria.

## Prossimi passi {#next-steps}

- [Preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) -- Cosa possono controllare i membri
- [Guida alle iscrizioni agli eventi](../guides/event-registration.md) -- Configura le iscrizioni così i promemoria possono raggiungere i partecipanti
- [Creare calendari](./creating-calendars.md) -- Torna alla configurazione dei calendari
