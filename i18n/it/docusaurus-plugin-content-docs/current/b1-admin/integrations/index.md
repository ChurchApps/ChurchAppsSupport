---
title: "Integrazioni"
---

# Integrazioni {#integrations}

<div class="article-intro">

B1 si collega agli strumenti che il tuo team già usa. Collega Slack o Discord per le notifiche allo staff, automatizza i flussi di lavoro con Zapier o Make, oppure esporta i dati su richiesta in Fogli Google -- senza pagare una piattaforma di integrazione separata e senza che ChurchApps ospiti nulla in più. Ogni integrazione viene eseguita sull'infrastruttura del fornitore terzo e comunica con la tua chiesa tramite i webhook o l'API REST di B1.

</div>

## Cosa è disponibile {#whats-available}

| Integrazione | Cosa fa | Direzione | Impegno di configurazione |
|---|---|---|---|
| **[Slack](./slack-discord)** | Pubblica notifiche leggibili (nuove persone, donazioni, iscrizioni, …) in un canale Slack | B1 → Slack | 2 minuti |
| **[Discord](./slack-discord)** | Lo stesso, in un canale Discord | B1 → Discord | 2 minuti |
| **[Zapier](./zapier)** | Usa gli eventi di B1 come trigger e le azioni di B1 in una qualsiasi delle oltre 7.000 app di Zapier | Entrambe | 5–10 min per Zap |
| **[Make](./make)** | Stessa idea di Zapier, nel generatore visuale di scenari di Make | Entrambe | 5–10 min per scenario |
| **[Fogli Google](./google-sheets)** | Esporta Persone / Donazioni / Gruppi / Presenze in un foglio di calcolo su richiesta | B1 → Foglio | 5 minuti |
| **[Claude](./claude)** | Fai domande a Claude di Anthropic sui dati della tua chiesa, nei limiti dei tuoi permessi | Entrambe | 5 minuti |
| **[ChatGPT](./chatgpt)** | Stessa idea con ChatGPT di OpenAI, tramite un GPT personalizzato o strumenti OpenAI compatibili con MCP | Entrambe | 10 minuti |
| **[Servizi connessi](./services/)** | Ricette curate per Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varia | 5–10 min ciascuna |

## Come scegliere {#how-to-pick}

- **Vuoi solo una notifica in chat?** Usa **Slack** o **Discord** -- nessun account di terze parti, nessuno Zap da mantenere. Si configura interamente dentro B1Admin.
- **Vuoi automatizzare qualcosa tra più app** (ad esempio, "quando qualcuno dona, aggiungilo alla mia lista Mailchimp e pubblica in #donazioni su Slack")? Usa **Zapier** o **Make**. Zapier è più semplice; Make è più economico su larga scala e ha una logica più flessibile.
- **Ti serve un'estrazione dati una tantum o un rapporto programmato?** Usa **Fogli Google** -- incolla una chiave API nella barra laterale dell'add-on e fai clic su Esporta.
- **Vuoi fare domande in linguaggio naturale** ("quanti visitatori alla prima volta sono venuti domenica scorsa?", "riassumi le donazioni di questo mese")? Usa **[Claude](./claude)** o **[ChatGPT](./chatgpt)**. Entrambi si collegano a B1 con una singola chiave API, e Claude può anche collegarsi da claude.ai accedendo a B1.
- **Stai costruendo una tua integrazione personalizzata?** Nessuna delle opzioni sopra -- parla direttamente con l'[API REST](/docs/developer/api) con una [chiave API](/docs/developer/api/api-keys), oppure iscrivi un server che controlli ai [webhook](/docs/developer/api/webhooks).

## Cosa hanno in comune {#what-they-have-in-common}

Ogni integrazione si autentica con una **chiave API di B1**, creata in B1Admin sotto **Impostazioni → Sviluppatore → Chiavi API**. La chiave:

- È legata a una persona specifica della tua chiesa ed eredita i permessi di quella persona
- Può essere limitata con **ambiti** -- ad esempio, un'esportazione in Fogli Google richiede solo `people:read`, non `settings:write`
- Può essere revocata in qualsiasi momento, interrompendo immediatamente l'accesso dell'integrazione senza influire su nient'altro

Alcuni connettori (Zapier, Make) registrano anche un [webhook](/docs/developer/api/webhooks) per tuo conto quando lo Zap o lo scenario viene attivato, e lo rimuovono quando disattivi lo Zap -- non devi gestire tu l'URL del webhook.

:::tip
Perché Zapier e Make registrino i webhook automaticamente, la chiave API deve avere l'ambito **`settings:write`** (più gli ambiti delle risorse su cui opera l'integrazione). Una chiave di sola lettura funziona per le azioni e le esportazioni, ma non per i trigger.
:::

## Costi {#cost}

ChurchApps è gratuito e open-source. Slack/Discord, l'[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) e i connettori ufficiali per Zapier / Make / Fogli Google sono anch'essi gratuiti da parte nostra. Le terze parti possono addebitare i costi delle proprie piattaforme (Zapier e Make hanno entrambe piani gratuiti generosi; Slack, Discord e Fogli Google sono gratuiti per questo uso).

## Costruire la tua integrazione {#building-your-own}

Se nessuna delle opzioni sopra fa al caso tuo, ogni superficie di B1 è aperta:

- **[API REST](/docs/developer/api)** -- chiama B1 da qualsiasi linguaggio con un'intestazione `Authorization: Bearer cak_…`
- **[Webhook](/docs/developer/api/webhooks)** -- iscrivi un endpoint HTTPS pubblico a uno o più tipi di evento e ricevi payload JSON firmati
- **[OAuth + App collegate](/docs/developer/api/connected-apps)** -- se stai costruendo un prodotto SaaS usato da molte chiese

## Passaggi successivi {#next-steps}

- [Slack e Discord](./slack-discord) -- pubblica notifiche in chat
- [Zapier](./zapier) -- collegati a oltre 7.000 app
- [Make](./make) -- automazione visuale dei flussi di lavoro
- [Fogli Google](./google-sheets) -- esporta in fogli di calcolo
- [Claude](./claude) -- chiedi a Claude di Anthropic dei dati della tua chiesa
- [ChatGPT](./chatgpt) -- chiedi a ChatGPT di OpenAI dei dati della tua chiesa
- [Servizi connessi](./services/) -- ricette per singolo servizio (Mailchimp, Donorbox, Clearstream, …)
