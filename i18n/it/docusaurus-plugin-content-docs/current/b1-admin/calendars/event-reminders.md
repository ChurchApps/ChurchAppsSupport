---
title: "Promemoria Eventi"
---

# Promemoria Eventi

<div class="article-intro">

I promemoria degli eventi notificano automaticamente le persone giuste prima che si verifichi un evento, ad esempio "Non perderlo! Il workshop sanitario inizia domani alle 9:00 AM". Configuri un promemoria una volta sull'evento e B1 lo invia secondo il programma tramite notifiche push e email. I membri possono controllare quali promemoria ricevono dalle loro [Preferenze di Notifica](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Crea l'evento di cui desideri ricordare alle persone (vedi [Creazione di Calendari](creating-calendars))
- Per raggiungere i partecipanti registrati, [abilita la registrazione](creating-calendars) sull'evento
- Per raggiungere un intero gruppo, assicurati che l'evento appartenga a un [gruppo](../groups/creating-groups) con membri

</div>

## Configurazione di un Promemoria

Configuri i promemoria nella sezione **Reminders** dell'evento.

- Quando **crei un nuovo evento**, espandi la sezione **Reminders** nell'editor di eventi prima di salvare.
- Per un **evento esistente**, apri la pagina **Registration Details** dell'evento (dalla sezione **Registrations**) per aggiungere o modificare il suo promemoria.

1. Attiva **Enable reminders**.
2. Scegli **When** per inviare. Scegli fino a tre tempi: **7 days before**, **3 days before**, **1 day before** e **Day of**.
3. Imposta il **Time of day** in cui il promemoria deve essere inviato (l'impostazione predefinita è **9:00 AM**, nel fuso orario locale della chiesa).
4. Scegli **Who** dovrebbe essere ricordato (vedi [Chi Riceve il Promemoria](#chi-riceve-il-promemoria) di seguito).
5. Facoltativamente aggiungi un **Message**. Lascialo vuoto per usare la formulazione predefinita, oppure scrivi la tua — puoi includere `{{eventTitle}}` e verrà sostituito con il nome dell'evento.
6. Scegli i **Channels**: notifica **Push**, **Email** o entrambi.
7. Salva l'evento.

Man mano che apporti modifiche, un'**anteprima dal vivo** mostra approssimativamente quante persone verranno ricordate, quanti partecipanti non possono essere raggiunti e i tempi di invio programmati successivi — così puoi confermare che il promemoria sia corretto prima di salvare.

## Chi Riceve il Promemoria

L'impostazione **Who** controlla a chi va il promemoria:

- **Registrants only** -- Tutti coloro che sono registrati per l'evento e collegati a un record di persona. Questa è l'impostazione predefinita quando l'evento ha la registrazione abilitata, quindi un promemoria per un piccolo evento registrato non va mai accidentalmente a un intero gruppo.
- **Heads / registrants only** -- Un promemoria per registrazione (la persona che ha registrato), anziché ogni membro della famiglia sulla registrazione.
- **Group members** -- Tutti i membri del gruppo dell'evento. Questa è l'impostazione predefinita quando l'evento non utilizza la registrazione.
- **Auto** -- Utilizza i registrati quando la registrazione è abilitata, altrimenti il gruppo.

:::info
Gli ospiti aggiunti solo per nome (senza un record di persona collegato) non possono ricevere un promemoria, perché non c'è un account, dispositivo o email a cui inviare. L'anteprima ti dice quanti partecipanti rientrano in questo gruppo, quindi non ci sono sorprese. Anche i membri che hanno rinunciato alla comunicazione vengono saltati.
:::

## Quando Vengono Inviati i Promemoria

- I promemoria vengono inviati all'**ora del giorno che scegli**, nel fuso orario locale della chiesa, su ciascuno degli offset selezionati.
- Se **modifichi la data o l'ora dell'evento**, i promemoria in sospeso vengono automaticamente riprogrammati — non è necessario modificare il promemoria.
- Se **elimini l'evento** (o annulli una singola occorrenza di un evento ricorrente), i suoi promemoria in sospeso vengono automaticamente annullati.
- Gli eventi ricorrenti vengono gestiti automaticamente: ogni occorrenza futura riceve il suo promemoria.

:::tip
I promemoria vengono inviati **push prima, con email come fallback**. Se un membro ha le notifiche push abilitate, riceverà un push; se no, riceverà un'email invece. I membri scelgono quali canali desiderano per tipo di notifica nelle loro [Preferenze di Notifica](../../b1-church/getting-started/notification-preferences).
:::

## Cosa Possono Controllare i Membri

I promemoria rispettano sempre le [Preferenze di Notifica](../../b1-church/getting-started/notification-preferences) di ogni membro. Un membro può:

- Disattivare **Event Reminders** per push o email mantenendo attive altre notifiche.
- Impostare **quiet hours** in modo che le notifiche non urgenti aspettino un orario ragionevole.

Non puoi ignorare la scelta di un membro di rinunciare ai promemoria degli eventi — ciò mantiene B1 conforme alle regole anti-spam e mantiene i membri in controllo della loro casella di posta.

## Promemoria di Servizio

I volontari programmati in un piano ricevono un **promemoria di servizio** separato con i dettagli del piano e, quando non hanno ancora risposto, i pulsanti **Accept / Decline** direttamente nell'email. Questi promemoria sono configurati sul tipo di piano piuttosto che su un evento del calendario — vedi [Sunday Volunteers](../guides/sunday-volunteers) per il funzionamento della programmazione e dei promemoria dei volontari.

## Prossimi Passaggi

- [Preferenze di Notifica](../../b1-church/getting-started/notification-preferences) -- Cosa possono controllare i membri
- [Guida alla Registrazione agli Eventi](../guides/event-registration) -- Configura la registrazione in modo che i promemoria possano raggiungere i partecipanti
- [Creazione di Calendari](creating-calendars) -- Torna alla configurazione del calendario
