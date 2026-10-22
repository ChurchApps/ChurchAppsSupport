---
title: "Promemoria per gli eventi"
---

# Promemoria per gli eventi {#event-reminders}

<div class="article-intro">

I promemoria per gli eventi avvisano automaticamente le persone giuste prima che un evento abbia luogo -- ad esempio, "Non mancare! Il workshop sulla salute inizia domani alle 9:00". Configuri un promemoria una volta sull'evento, e B1 lo invia nei tempi previsti tramite notifiche push, email e, se la tua chiesa ha configurato i messaggi di testo, SMS. I membri possono controllare quali promemoria ricevere dalle proprie [Preferenze di notifica](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea l'evento per cui vuoi inviare promemoria (vedi [Creare i calendari](creating-calendars))
- Per raggiungere gli iscritti, [abilita la registrazione](creating-calendars) per l'evento
- Per raggiungere un intero gruppo, assicurati che l'evento appartenga a un [gruppo](../groups/creating-groups) con dei membri

</div>

## Configurare un promemoria {#setting-up-a-reminder}

Configuri i promemoria nella sezione **Promemoria** dell'evento.

- Quando **crei un nuovo evento**, espandi la sezione **Promemoria** nell'editor dell'evento prima di salvare.
- Per un **evento esistente**, apri la pagina **Dettagli della registrazione** dell'evento (dalla sezione **Registrazioni**) per aggiungere o modificare il suo promemoria.

1. Attiva **Abilita promemoria**.
2. Scegli **Quando** inviare. Seleziona fino a tre tempistiche: **7 giorni prima**, **3 giorni prima**, **1 giorno prima** e **Il giorno stesso**.
3. Imposta l'**Ora del giorno** in cui inviare il promemoria (predefinita: **9:00**, nel [fuso orario](../settings/church-settings.md#time-zone) della tua chiesa).
4. Scegli **Chi** deve ricevere il promemoria (vedi [Chi riceve il promemoria](#who-gets-reminded) più sotto).
5. Facoltativamente aggiungi un **Messaggio**. Lascialo vuoto per usare il testo predefinito, oppure scrivi il tuo -- puoi includere `{{eventTitle}}` e verrà sostituito con il nome dell'evento.
6. Scegli i **Canali**: notifica **Push**, **Email** e, se la tua chiesa ha collegato un [fornitore di messaggi di testo](../settings/church-settings.md#texting), **SMS**.
7. Salva l'evento.

Mentre apporti modifiche, un'**anteprima in tempo reale** mostra indicativamente quante persone riceveranno il promemoria, quanti partecipanti non possono essere raggiunti e i prossimi orari di invio programmati, così puoi verificare che il promemoria sia corretto prima di salvare.

## Chi riceve il promemoria {#who-gets-reminded}

L'impostazione **Chi** controlla a chi viene inviato il promemoria:

- **Solo iscritti** -- Tutti coloro che si sono registrati all'evento e che sono collegati a una scheda persona. È l'impostazione predefinita quando l'evento ha la registrazione attiva, così un promemoria per un piccolo evento con iscrizioni non finisce per sbaglio a un intero gruppo.
- **Capifamiglia / solo iscritti** -- Un promemoria per ogni registrazione (la persona che si è registrata), invece che per ogni familiare presente nella registrazione.
- **Membri del gruppo** -- Tutti i membri del gruppo dell'evento. È l'impostazione predefinita quando l'evento non usa la registrazione.
- **Automatico** -- Usa gli iscritti quando la registrazione è attiva, altrimenti il gruppo.

:::info
Gli ospiti aggiunti solo con il nome (senza una scheda persona collegata) non possono ricevere un promemoria, perché non esistono un account, un dispositivo o un'email a cui inviarlo. L'anteprima ti indica quanti partecipanti rientrano in questa categoria, così non ci sono sorprese. I membri che hanno rinunciato alle comunicazioni vengono comunque esclusi.
:::

## Quando vengono inviati i promemoria {#when-reminders-are-sent}

- I promemoria partono all'**ora del giorno che scegli**, nel fuso orario locale della tua chiesa, per ciascuno degli anticipi selezionati.
- Se **cambi la data o l'ora dell'evento**, i promemoria in attesa vengono riprogrammati automaticamente -- non serve modificare il promemoria.
- Se **elimini l'evento** (o annulli una singola occorrenza di un evento ricorrente), i suoi promemoria in attesa vengono annullati automaticamente.
- Gli eventi ricorrenti vengono gestiti automaticamente: ogni occorrenza futura riceve il proprio promemoria.

:::tip
I promemoria vengono inviati **prima tramite push, con l'email come alternativa**. Se un membro ha attive le notifiche push, riceverà una push; altrimenti riceverà un'email. I membri scelgono quali canali vogliono per ciascun tipo di notifica nelle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences).
:::

## Promemoria via SMS {#text-reminders}

Il canale **SMS** compare solo quando la tua chiesa ha collegato un fornitore di messaggi di testo. Gli SMS vengono inviati tramite il fornitore di messaggi della tua chiesa, e ogni messaggio può avere un costo per la chiesa. Vengono inviati in aggiunta a eventuali promemoria push o email, e solo alle persone che:

- hanno attivato i **Messaggi di testo** nelle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences), e
- hanno un numero di cellulare nel proprio profilo.

Ogni SMS inizia con il nome della tua chiesa, rientra in un singolo messaggio di testo e termina con "Rispondi STOP per disattivare". Chi risponde STOP smette di ricevere SMS dalla tua chiesa. Perché le risposte STOP arrivino a B1, incolla l'**URL del webhook per i messaggi in arrivo (STOP)** dalle tue [impostazioni dei messaggi di testo](../settings/church-settings.md#texting) nel webhook dei messaggi in arrivo del tuo fornitore.

## Cosa possono controllare i membri {#what-members-can-control}

I promemoria rispettano sempre le [Preferenze di notifica](../../b1-church/getting-started/notification-preferences) di ciascun membro. Un membro può:

- Disattivare i **Promemoria per gli eventi** per push, email o SMS mantenendo attive le altre notifiche.
- Attivare o disattivare i promemoria via SMS con **Messaggi di testo**.
- Impostare le **ore di silenzio** così che le notifiche non urgenti attendano un orario ragionevole.

Non puoi annullare la scelta di un membro di non ricevere promemoria per gli eventi -- questo mantiene B1 conforme alle norme anti-spam e lascia ai membri il controllo della propria casella di posta.

## Promemoria per i volontari {#serving-reminders}

I volontari programmati in un piano ricevono un **promemoria di servizio** separato con i dettagli del piano e, se non hanno ancora risposto, i pulsanti **Accetta / Rifiuta** direttamente nell'email. Questi promemoria si configurano sul tipo di piano anziché su un evento del calendario, e possono anche essere inviati via SMS -- vedi [Promemoria per i volontari](../serving/plans#volunteer-reminders) e [Volontari della domenica](../guides/sunday-volunteers) per capire come funzionano la programmazione dei volontari e i promemoria.

## Passaggi successivi {#next-steps}

- [Preferenze di notifica](../../b1-church/getting-started/notification-preferences) -- Cosa possono controllare i membri
- [Guida alla registrazione agli eventi](../guides/event-registration) -- Configura la registrazione così che i promemoria possano raggiungere i partecipanti
- [Creare i calendari](creating-calendars) -- Torna alla configurazione del calendario
