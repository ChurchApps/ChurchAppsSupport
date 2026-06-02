---
title: "Integrazioni"
---

# Integrazioni

<div class="article-intro">

B1 si collega agli strumenti che il tuo team utilizza già. Collega Slack o Discord per notifiche del personale, automatizza i flussi di lavoro in Zapier o Make, o esporta dati su richiesta a Google Sheets — senza pagare una piattaforma di integrazione separata e senza ChurchApps che ospita nulla di extra. Ogni integrazione viene eseguita sull'infrastruttura del terzo e comunica con la tua chiesa tramite i webhook o l'API REST di B1.

</div>

## Cosa è disponibile

| Integrazione | Cosa fa | Direzione | Sforzo per configurare |
|---|---|---|---|
| **[Slack](./slack-discord)** | Pubblica notifiche leggibili (nuove persone, donazioni, iscrizioni, …) a un canale Slack | B1 → Slack | 2 minuti |
| **[Discord](./slack-discord)** | Lo stesso, in un canale Discord | B1 → Discord | 2 minuti |
| **[Zapier](./zapier)** | Usa gli eventi B1 come trigger e le azioni B1 in uno qualsiasi dei 7000+ app di Zapier | Entrambe | 5–10 min per Zap |
| **[Make](./make)** | Stessa idea di Zapier, nel builder di scenari visivi di Make | Entrambe | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | Esporta Persone / Donazioni / Gruppi / Presenze a un foglio di calcolo su richiesta | B1 → Foglio | 5 minuti |
| **[Claude](./claude)** | Chiedi ai modelli Claude di Anthropic domande sui dati della tua chiesa, limitate alle tue autorizzazioni | Entrambe | 5 minuti |
| **[ChatGPT](./chatgpt)** | Stessa idea con ChatGPT di OpenAI, tramite un Custom GPT o strumenti MCP-aware di OpenAI | Entrambe | 10 minuti |
| **[Servizi connessi](./services/)** | Ricette curate per Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varia | 5–10 min ciascuno |

## Come scegliere

- **Vuoi solo una notifica in chat?** Usa **Slack** o **Discord** — nessun account di terze parti, nessun Zap da mantenere. Configurato interamente all'interno di B1Admin.
- **Vuoi automatizzare qualcosa tra app** (ad es. "quando qualcuno dona, aggiungilo al mio elenco Mailchimp e al #donazioni di Slack")? Usa **Zapier** o **Make**. Zapier è più intuitivo; Make è più economico su larga scala e ha una logica più flessibile.
- **Hai bisogno di un pull di dati una tantum o di un report programmato?** Usa **Google Sheets** — incolla una chiave API nella barra laterale del componente aggiuntivo e fai clic su Esporta.
- **Vuoi fare domande in inglese semplice** ("quanti visitatori per la prima volta domenica scorsa?", "riassumi le donazioni di questo mese")? Usa **[Claude](./claude)** o **[ChatGPT](./chatgpt)** — entrambi si collegano a B1 con una singola chiave API.
- **Stai costruendo la tua integrazione personalizzata?** Nessuno dei precedenti — parla direttamente all'[API REST](/docs/developer/api) con una [chiave API](/docs/developer/api/api-keys), o sottoscrivi un server che controlli ai [webhook](/docs/developer/api/webhooks).

## Cosa hanno in comune

Ogni integrazione si autentica con una **chiave API B1**, creata in B1Admin sotto **Impostazioni → Sviluppatore → Chiavi API**. La chiave:

- È vincolata a una persona specifica nella tua chiesa e eredita i permessi di quella persona
- Può essere ristretta con **ambiti** — ad esempio un'esportazione di Google Sheets ha bisogno solo di `people:read`, non di `settings:write`
- Può essere revocata in qualsiasi momento, tagliando istantaneamente l'accesso dell'integrazione senza influire su nient'altro

Alcuni connettori (Zapier, Make) registrano anche un [webhook](/docs/developer/api/webhooks) per tuo conto quando il Zap o lo scenario viene attivato, e lo rimuovono quando lo disattivi — non gestisci tu stesso l'URL del webhook.

:::tip
Affinché Zapier e Make registrino webhook automaticamente, la chiave API ha bisogno dell'ambito **`settings:write`** (più gli ambiti della risorsa per qualsiasi cosa toccata dall'integrazione). Una chiave di sola lettura funziona per azioni ed esportazioni ma non per trigger.
:::

## Costo

ChurchApps è gratuito e open-source. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), e i connettori Zapier / Make / Google Sheets ufficiali sono anche gratuiti dal nostro lato. Le terze parti potrebbero addebitare per le loro piattaforme (Zapier e Make hanno entrambi livelli gratuiti generosi; Slack, Discord e Google Sheets sono gratuiti per questo scopo).

## Costruire i tuoi

Se niente di quanto sopra si adatta, ogni superficie B1 è aperta:

- **[API REST](/docs/developer/api)** — chiama B1 da qualsiasi linguaggio con un'intestazione `Authorization: Bearer cak_…`
- **[Webhook](/docs/developer/api/webhooks)** — sottoscrivi un endpoint HTTPS pubblico a uno o più tipi di evento e ricevi payload JSON firmati
- **[OAuth + App connesse](/docs/developer/api/connected-apps)** — se stai costruendo un prodotto SaaS utilizzato da molte chiese

## Prossimi passi

- [Slack e Discord](./slack-discord) — pubblica notifiche di chat
- [Zapier](./zapier) — connetti a 7000+ app
- [Make](./make) — automazione del flusso di lavoro visivo
- [Google Sheets](./google-sheets) — esporta a fogli di calcolo
- [Claude](./claude) — chiedi al Claude di Anthropic sui dati della tua chiesa
- [ChatGPT](./chatgpt) — chiedi al ChatGPT di OpenAI sui dati della tua chiesa
- [Servizi connessi](./services/) — ricette per servizio (Mailchimp, Donorbox, Clearstream, …)
