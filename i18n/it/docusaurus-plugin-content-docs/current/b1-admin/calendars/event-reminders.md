---
title: "Promemoria di eventi"
---

# Promemoria di eventi

<div class="article-intro">

I promemoria di eventi notificano automaticamente le persone giuste prima che accada un evento -- ad esempio, "Non perderti! Il workshop di assistenza sanitaria inizia domani alle 9:00 AM." Configuri un promemoria una volta sull'evento, e B1 lo invia secondo il programma tramite notifiche push e email. I membri possono controllare quali promemoria ricevono dalle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Crea l'evento di cui vuoi ricordare alle persone (vedi [Creazione di calendari](creating-calendars))
- Per raggiungere i partecipanti registrati, [abilita la registrazione](creating-calendars) sull'evento
- Per raggiungere un intero gruppo, assicurati che l'evento appartiene a un [gruppo](../groups/creating-groups) con membri

</div>

## Configurazione di un promemoria

Configuri i promemoria nella sezione **Promemoria** dell'evento.

- Quando **crei un nuovo evento**, espandi la sezione **Promemoria** nell'editor di eventi prima di salvare.
- Per un **evento esistente**, apri la pagina **Dettagli della registrazione** dell'evento (dalla sezione **Registrazioni**) per aggiungere o modificare il suo promemoria.

1. Attiva **Abilita promemoria**.
2. Scegli **Quando** inviare. Scegli fino a tre tempi: **7 giorni prima**, **3 giorni prima**, **1 giorno prima** e **Giorno dell'evento**.
3. Imposta l'**Ora del giorno** in cui il promemoria dovrebbe andare (l'impostazione predefinita è **9:00 AM**, nel fuso orario locale della tua chiesa).
4. Scegli **Chi** dovrebbe essere ricordato (vedi [Chi viene ricordato](#chi-viene-ricordato) di seguito).
5. Facoltativamente aggiungi un **Messaggio**. Lascialo vuoto per utilizzare la formulazione predefinita, oppure scrivi il tuo personalizzato -- puoi includere `{{eventTitle}}` e verrà sostituito con il nome dell'evento.
6. Scegli i **Canali**: notifica **Push**, **Email**, o entrambi.
7. Salva l'evento.

Mentre effettui modifiche, un'**anteprima in diretta** mostra approssimativamente quante persone verranno richiamate, quanti partecipanti non possono essere raggiunti e i prossimi orari di invio programmati -- così puoi confermare che il promemoria appare corretto prima di salvare.

## Chi viene ricordato

L'impostazione **Chi** controlla a chi va il promemoria:

- **Solo registrati** -- Tutti coloro che sono registrati per l'evento e collegati a un record di persona. Questo è l'impostazione predefinita quando l'evento ha la registrazione abilitata, quindi un promemoria per un piccolo evento registrato non va mai accidentalmente a un intero gruppo.
- **Soli capi/registrati** -- Un promemoria per registrazione (la persona che si è registrata), piuttosto che ogni membro della famiglia sulla registrazione.
- **Membri del gruppo** -- Tutti nel gruppo dell'evento. Questo è l'impostazione predefinita quando l'evento non utilizza la registrazione.
- **Auto** -- Utilizza i registrati quando la registrazione è abilitata, altrimenti il gruppo.

:::info
I guest aggiunti solo per nome (senza un record di persona collegato) non possono ricevere un promemoria, perché non c'è un account, dispositivo o email a cui inviare. L'anteprima ti dice quanti partecipanti rientrano in questo gruppo quindi non ci sono sorprese. I membri che hanno rinunciato alla comunicazione vengono anche saltati.
:::

## Quando i promemoria vengono inviati

- I promemoria si attivano all'**ora del giorno che scegli**, nel fuso orario locale della tua chiesa, su ognuno degli offset che hai selezionato.
- Se **cambi la data o l'ora dell'evento**, i promemoria in sospeso vengono automaticamente riprogrammati -- non devi modificare il promemoria.
- Se **elimini l'evento** (o annulli una singola occorrenza di un evento ricorrente), i suoi promemoria in sospeso vengono automaticamente annullati.
- Gli eventi ricorrenti vengono gestiti automaticamente: ogni occorrenza imminente ottiene il suo promemoria.

:::tip
I promemoria vengono inviati **push per primo, con email come fallback**. Se un membro ha le notifiche push abilitate, riceverà un push; in caso contrario, riceverà un email. I membri scelgono quali canali vogliono per tipo di notifica nelle loro [Preferenze di notifica](../../b1-church/getting-started/notification-preferences).
:::

## Cosa possono controllare i membri

I promemoria rispettano sempre le [Preferenze di notifica](../../b1-church/getting-started/notification-preferences) di ogni membro. Un membro può:

- Attivare/disattivare **Promemoria di eventi** per push o email mentre mantiene altre notifiche attive.
- Impostare **ore silenziose** in modo che le notifiche non urgenti aspettino un momento ragionevole.

Non puoi ignorare la scelta di un membro di rinunciare ai promemoria di eventi -- questo mantiene B1 conforme alle regole anti-spam e mantiene i membri in controllo della loro inbox.

## Promemoria di servizio

I volontari pianificati su un piano ricevono un **promemoria di servizio** separato con i dettagli del piano e, quando non hanno ancora risposto, pulsanti **Accetta / Rifiuta** direttamente nell'email. Questi promemoria vengono configurati sul tipo di piano piuttosto che su un evento del calendario -- vedi [Volontari domenicali](../guides/sunday-volunteers) per come funzionano la pianificazione dei volontari e i promemoria.

## Passaggi successivi

- [Preferenze di notifica](../../b1-church/getting-started/notification-preferences) -- Cosa possono controllare i membri
- [Guida alla registrazione di eventi](../guides/event-registration) -- Configura la registrazione in modo che i promemoria possano raggiungere i partecipanti
- [Creazione di calendari](creating-calendars) -- Torna alla configurazione del calendario
