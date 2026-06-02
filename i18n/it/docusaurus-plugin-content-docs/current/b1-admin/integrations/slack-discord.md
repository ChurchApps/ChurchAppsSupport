---
title: "Slack e Discord"
---

# Slack e Discord

<div class="article-intro">

Pubblica notifiche leggibili da B1 direttamente a un canale Slack o Discord — nuove persone, donazioni, iscrizioni a gruppi, invii di moduli, eventi del calendario e altro ancora. Nessun account di terze parti, nessuno Zap da mantenere: B1 riformatta gli eventi in messaggi di chat e li PUBBLICA all'URL del webhook del canale stesso.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'autorizzazione **Modifica impostazioni** in B1Admin
- Un amministratore nel tuo workspace Slack o server Discord per creare il webhook in arrivo del canale
- Decidi quale canale desideri le notifiche (puoi utilizzare lo stesso canale per diversi tipi di evento, o suddividerli tra i canali)

</div>

## Come funziona

B1 ha un **Tipo di connettore** incorporato per le piattaforme di chat. Quando crei un webhook con tipo **Slack** o **Discord**, il motore del webhook fa comunque il suo solito lavoro di consegna + nuovo tentativo + firma di intestazione, ma il corpo che invia viene rimodellato dall'envelope `{event,churchId,data}` normale di B1 nel piccolo `{text}` (Slack) o `{content}` (Discord) messaggio che quei servizi si aspettano.

Nessun server B1 raggiunge Slack su base per chiesa diverso dal flusso webhook in uscita esistente — non c'è nulla di nuovo da ospitare, nulla di extra da pagare.

## Slack — Passo dopo passo

### 1. Ottieni un URL webhook in arrivo di Slack

1. Apri [api.slack.com/apps](https://api.slack.com/apps) nel workspace Slack in cui desideri le notifiche.
2. Fai clic su **Crea nuova app → Da zero**, chiamala qualcosa come "Notifiche B1", e scegli il workspace.
3. Nel nav sinistro scegli **Webhook in arrivo** e attiva **Attiva webhook in arrivo** su *Attivo*.
4. Fai clic su **Aggiungi nuovo webhook al workspace**, scegli il canale (ad es. `#donazioni`), quindi **Consenti**.
5. Slack ti riporta sulla pagina con un fresco **URL webhook** che assomiglia a `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copialo — questo è l'unico pezzo di informazione di cui B1 ha bisogno.

:::caution
Tratta l'URL del webhook di Slack come un segreto. Chiunque lo abbia può pubblicare messaggi arbitrari al canale. Se lo esponi accidentalmente, rigeneralo dalla pagina dell'app Slack (rigenerare solo ruota l'URL; aggiorna B1 per corrispondere).
:::

### 2. Collegalo in B1Admin

1. In B1Admin vai a **Impostazioni → Sviluppatore → Webhook**.
2. Fai clic su **Nuovo webhook**.
3. Compila:
   - **Nome** — qualcosa di leggibile come "Donazioni → #donazioni". Solo il tuo team lo vede.
   - **Tipo di connettore** — scegli **Slack**.
   - **URL payload** — incolla l'URL Slack dal passaggio 1.
   - **Eventi** — tick degli eventi che desideri come messaggi. Per un canale di donazioni, giusto `donation.created`. Per un canale #persone, prova `person.created` e `group.member.added`.
4. Fai clic su **Salva**. Una finestra di dialogo "Segreto di firma" appare — puoi ignorarla per Slack (Slack non verifica le firme di B1) e chiuderla.

### 3. Testalo

Ri-apri il webhook dall'elenco e fai clic su **Invia evento di prova**. Entro un secondo o due un messaggio come

> 💝 Nuova donazione: $50.00

appare nel tuo canale Slack, e una nuova riga appare nella tabella **Consegne recenti** sulla stessa schermata con stato `succeeded`. Hai finito.

## Discord — Passo dopo passo

### 1. Ottieni un URL webhook di Discord

1. Nel tuo server Discord, passa il mouse sul canale in cui desideri le notifiche e fai clic sulla **⚙ marcia** (Modifica canale).
2. Apri **Integrazioni → Webhook → Nuovo webhook**.
3. Dagli un nome e (facoltativamente) un avatar, quindi fai clic su **Copia URL webhook** — assomiglia a `https://discord.com/api/webhooks/123…/abc…`.

### 2. Collegalo in B1Admin

Identico al flusso Slack di cui sopra, tranne impostare **Tipo di connettore** su **Discord**. Incolla l'URL di Discord in **URL payload** e salva.

:::tip
Tu **non** hai bisogno di aggiungere `/slack` alla fine dell'URL di Discord — B1 invia payload nativi Discord `{content}`, non compatibili con Slack. Basta incollare l'URL che Discord ti ha dato.
:::

### 3. Testalo

Stesso pulsante **Invia evento di prova** — Discord mostra il messaggio nel canale scelto e il registro di consegna gira su `succeeded`.

## Come appaiono i messaggi

| Evento | Messaggio di esempio |
|---|---|
| `person.created` | 👤 Nuova persona aggiunta: Jordan Rivera |
| `person.updated` | 👤 Persona aggiornata: Jordan Rivera |
| `group.created` | 👥 Nuovo gruppo creato: Studio biblico del martedì |
| `group.member.added` | ➕ Qualcuno è stato aggiunto a un gruppo |
| `donation.created` | 💝 Nuova donazione: $50.00 |
| `donation.updated` | 💝 Donazione aggiornata: $75.00 |
| `attendance.recorded` | ✅ Presenze registrate |
| `form.submission.created` | 📝 Nuovo invio di modulo ricevuto |
| `event.created` | 📅 Nuovo evento: Servizio di Pasqua |

L'elenco completo vive nel [catalogo degli eventi webhook](/docs/developer/api/webhooks#event-catalog) — qualsiasi evento lì può essere instradato a Slack/Discord.

## Un canale per argomento

Non devi mettere ogni evento in un posto. La maggior parte delle chiese configura una manciata di webhook:

- Un canale **#donazioni** che ascolta solo `donation.created`
- Un canale **#new-people** per `person.created` e `group.member.added`
- Un canale **#admin-alerts** per cose a basso volume come `form.submission.created`

Non c'è limite al numero di webhook per chiesa. Ciascuno è indipendente — eliminare o disabilitare uno non influisce sugli altri.

## Ispezione dei trasporti

La tabella **Consegne recenti** dell'editor webhook mostra gli ultimi 50 tentativi. Fai clic su una riga per vedere il payload esatto inviato e la risposta restituita. Per un connettore Slack il payload è `{"text":"💝 Nuova donazione: $50.00"}` — non l'envelope `{event,churchId,...}` grezzo — perché B1 lo rimodella prima della consegna.

Se qualcosa non è riuscito (badge rosso `failed` o `exhausted`), la finestra di dialogo mostra lo stato HTTP e il corpo della risposta in modo da poter vedere esattamente cosa Slack o Discord non ha fatto — di solito un errore di copia/incolla nell'URL.

## Risoluzione dei problemi

- **Nessun messaggio appare + stato di consegna `400`** — di solito il tipo di connettore è impostato su **Standard** ma l'URL è uno di Slack/Discord. Slack/Discord rifiutano l'envelope grezzo. Cambia il dropdown su **Slack** o **Discord** e rimanda il test.
- **Webhook disabilitato automaticamente** — dopo 3 consegne consecutive non riuscite B1 disattiva il webhook. Correggi l'URL (o ruotalo su Slack/Discord) e attiva **Attivo** di nuovo.
- **Il messaggio è arrivato ma manca dettagli** — ogni piattaforma di chat limita la dimensione del messaggio. I messaggi di B1 sono one-liner per progettazione; per notifiche più ricche usa [Zapier](./zapier) o [Make](./make) per comporre un messaggio Slack più completo tramite le loro azioni Slack.

## Cambio dei tipi di connettore in seguito

Puoi cambiare il tipo di connettore su un webhook esistente — ha effetto alla prossima consegna. Se passi da Slack a Standard, punti l'URL al tuo endpoint HTTPS e lo stesso segreto di firma (è stato emesso quando il webhook è stato creato) inizia a essere verificabile come l'envelope grezzo.

## Vedi anche

- [Zapier](./zapier) — per flussi di lavoro multi-step attivati da eventi B1
- [Make](./make) — builder di scenari visivi
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks) — il formato completo del payload + firma se mai punti un webhook al tuo server
