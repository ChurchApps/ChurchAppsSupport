---
title: "Slack e Discord"
description: "Pubblica in un canale Slack o Discord gli eventi di B1 Admin come nuove persone, donazioni e risposte ai moduli, con un webhook in ingresso e senza bisogno di Zapier."
---

# Slack e Discord

<div class="article-intro">

Pubblica notifiche leggibili da B1 direttamente in un canale Slack o Discord: nuove persone, donazioni, iscrizioni ai gruppi, risposte ai moduli, eventi del calendario e altro ancora. Nessun account di terze parti, nessuno Zap da mantenere: B1 riformatta gli eventi in messaggi di chat e li invia direttamente all'URL webhook del canale.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso **Modifica impostazioni** in B1Admin
- Un amministratore del tuo workspace Slack o del tuo server Discord che crei il Webhook in ingresso del canale
- Decidi in quale canale vuoi ricevere le notifiche (puoi usare lo stesso canale per più tipi di evento, oppure dividerli su canali diversi)

</div>

## Come funziona {#how-it-works}

B1 ha un **Tipo di connettore** integrato per le piattaforme di chat. Quando crei un webhook di tipo **Slack** o **Discord**, il motore dei webhook esegue la solita consegna + ripetizione + intestazioni firmate, ma il corpo inviato viene rimodellato dal normale involucro `{event,churchId,data}` di B1 nel piccolo messaggio `{text}` (Slack) o `{content}` (Discord) che questi servizi si aspettano.

Nessun server di B1 contatta Slack per una singola chiesa oltre al normale flusso dei webhook in uscita: non c'è nulla di nuovo da ospitare né da pagare.

## Slack — passo dopo passo {#slack--step-by-step}

### 1. Ottieni un URL di Webhook in ingresso di Slack {#1-get-a-slack-incoming-webhook-url}

1. Apri [api.slack.com/apps](https://api.slack.com/apps) nel workspace Slack in cui vuoi ricevere le notifiche.
2. Clicca su **Create New App → From scratch** (Crea nuova app → Da zero), chiamala qualcosa come "B1 Notifications" e scegli il workspace.
3. Nel menu a sinistra scegli **Incoming Webhooks** e imposta **Activate Incoming Webhooks** su *On*.
4. Clicca su **Add New Webhook to Workspace** (Aggiungi nuovo webhook al workspace), scegli il canale (ad esempio `#donations`), poi **Allow** (Consenti).
5. Slack ti riporta alla pagina con un nuovo **Webhook URL** simile a `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copialo: è l'unica informazione di cui B1 ha bisogno.

:::caution
Tratta l'URL del webhook di Slack come un segreto. Chiunque lo possieda può pubblicare messaggi arbitrari nel canale. Se lo esponi per errore, rigeneralo dalla pagina dell'app Slack (la rigenerazione cambia solo l'URL: aggiorna B1 di conseguenza).
:::

### 2. Collegalo in B1Admin {#2-connect-it-in-b1admin}

1. In B1Admin vai su **Impostazioni → Sviluppatori → Webhook**.
2. Clicca su **Nuovo webhook**.
3. Compila:
   - **Nome**: un'etichetta leggibile come "Donazioni → #donations". La vede solo il tuo team.
   - **Tipo di connettore**: scegli **Slack**.
   - **URL del payload**: incolla l'URL di Slack del passaggio 1.
   - **Eventi**: seleziona gli eventi che vuoi ricevere come messaggi. Per un canale delle donazioni, solo `donation.created`. Per un canale #people, prova `person.created` e `group.member.added`.
4. Clicca su **Salva**. Compare una finestra "Segreto di firma": per Slack puoi ignorarla (Slack non verifica le firme di B1) e chiuderla.

### 3. Verifica il funzionamento {#3-test-it}

Riapri il webhook dall'elenco e clicca su **Invia evento di prova**. B1 invia un esempio del primo evento che hai selezionato: entro un secondo o due compare nel canale Slack un messaggio come

> 💝 Nuova donazione: 50,00 $

e nella tabella **Consegne recenti** della stessa schermata appare una nuova riga con stato `succeeded` (riuscita). Fatto.

## Discord — passo dopo passo {#discord--step-by-step}

### 1. Ottieni un URL di Webhook di Discord {#1-get-a-discord-webhook-url}

1. Nel tuo server Discord, passa il mouse sul canale in cui vuoi ricevere le notifiche e clicca sull'**ingranaggio ⚙** (Modifica canale).
2. Apri **Integrazioni → Webhook → Nuovo webhook**.
3. Dagli un nome e, facoltativamente, un avatar, poi clicca su **Copia URL webhook**: avrai qualcosa come `https://discord.com/api/webhooks/123…/abc…`.

### 2. Collegalo in B1Admin {#2-connect-it-in-b1admin-1}

Identico al flusso di Slack descritto sopra, con la differenza che devi impostare **Tipo di connettore** su **Discord**. Incolla l'URL di Discord in **URL del payload** e salva.

:::tip
**Non** devi aggiungere `/slack` alla fine dell'URL di Discord: B1 invia payload nativi di Discord `{content}`, non quelli compatibili con Slack. Incolla semplicemente l'URL fornito da Discord.
:::

### 3. Verifica il funzionamento {#3-test-it-1}

Stesso pulsante **Invia evento di prova**: Discord mostra il messaggio nel canale scelto e il registro delle consegne passa a `succeeded`.

## Come appaiono i messaggi {#what-the-messages-look-like}

| Evento | Esempio di messaggio |
|---|---|
| `person.created` | 👤 Nuova persona aggiunta: Jordan Rivera |
| `person.updated` | 👤 Persona aggiornata: Jordan Rivera |
| `group.created` | 👥 Nuovo gruppo creato: Studio biblico del martedì |
| `group.member.added` | ➕ Qualcuno è stato aggiunto a un gruppo |
| `donation.created` | 💝 Nuova donazione: 50,00 $ |
| `donation.updated` | 💝 Donazione aggiornata: 75,00 $ |
| `attendance.recorded` | ✅ Presenza registrata |
| `form.submission.created` | 📝 Ricevuta una nuova risposta al modulo |
| `event.created` | 📅 Nuovo evento: Culto di Pasqua |

L'elenco completo si trova nel [catalogo degli eventi dei webhook](/docs/developer/api/webhooks#event-catalog): qualsiasi evento presente lì può essere inviato a Slack/Discord.

## Un canale per argomento {#one-channel-per-topic}

Non devi mettere tutti gli eventi in un unico posto. La maggior parte delle chiese configura alcuni webhook:

- Un canale **#donations** che ascolta solo `donation.created`
- Un canale **#new-people** per `person.created` e `group.member.added`
- Un canale **#admin-alerts** per eventi a basso volume come `form.submission.created`

Non c'è un limite al numero di webhook per chiesa. Ognuno è indipendente: eliminare o disattivare uno non influisce sugli altri.

## Controllare le consegne {#inspecting-deliveries}

La tabella **Consegne recenti** dell'editor dei webhook mostra gli ultimi 50 tentativi. Clicca su una riga per vedere il payload esatto inviato e la risposta ricevuta. Per un connettore Slack il payload è `{"text":"💝 New donation: $50.00"}` (non il normale involucro `{event,churchId,...}`), perché B1 lo rimodella prima dell'invio.

Se qualcosa non è andato a buon fine (un badge arancione `failed` mentre B1 sta ancora riprovando, oppure un badge rosso `exhausted` quando ha smesso), la colonna **Risposta** mostra lo stato HTTP e la finestra della riga mostra il corpo della risposta, così puoi vedere esattamente cosa non è piaciuto a Slack o Discord: di solito un errore di copia e incolla nell'URL. Clicca su **Rispedisci** per inviare di nuovo quella consegna.

## Risoluzione dei problemi {#troubleshooting}

- **Non compare alcun messaggio e lo stato della consegna è `400`**: di solito il Tipo di connettore è impostato su **Standard** ma l'URL è di Slack/Discord. Slack e Discord rifiutano l'involucro grezzo. Cambia il menu a tendina su **Slack** o **Discord** e reinvia il test.
- **Webhook disattivato automaticamente**: B1 ripete ogni consegna fallita per circa cinque giorni. Se tre consegne di seguito esauriscono i tentativi, B1 disattiva il webhook (lo stato diventa **Disattivato**). Correggi l'URL (oppure rigeneralo su Slack/Discord), riattiva **Attivo** e salva.
- **Il messaggio arriva ma mancano dettagli**: ogni piattaforma di chat limita la dimensione dei messaggi. I messaggi di B1 sono volutamente essenziali; per notifiche più ricche usa [Zapier](./zapier.md) o [Make](./make.md) per comporre un messaggio Slack più completo con le loro azioni Slack.

## Cambiare tipo di connettore in seguito {#switching-connector-types-later}

Puoi cambiare il Tipo di connettore di un webhook esistente: ha effetto alla consegna successiva. Se passi da Slack a Standard, punta l'URL al tuo endpoint HTTPS; lo stesso segreto di firma (emesso alla creazione del webhook) inizierà a essere verificabile come involucro grezzo.

## Vedi anche {#see-also}

- [Zapier](./zapier.md): per flussi di lavoro in più passaggi attivati dagli eventi di B1
- [Make](./make.md): generatore visuale di scenari
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks): il formato completo di payload e firma, se mai punterai un webhook al tuo server
