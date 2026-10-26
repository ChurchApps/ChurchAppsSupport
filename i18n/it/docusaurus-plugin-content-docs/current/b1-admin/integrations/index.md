---
title: "Integrazioni"
---

# Integrazioni

<div class="article-intro">

B1 si collega agli strumenti che il tuo team già usa. Collega Slack o Discord per le notifiche al personale, automatizza i flussi di lavoro con Zapier o Make, oppure esporta i dati su richiesta in Google Sheets — senza pagare una piattaforma di integrazione separata e senza che ChurchApps ospiti nulla in più. Ogni integrazione funziona sull'infrastruttura del fornitore terzo e comunica con la tua chiesa tramite i webhook o l'API REST di B1.

</div>

## Cosa è disponibile

| Integrazione | Cosa fa | Direzione | Impegno per la configurazione |
|---|---|---|---|
| **[Slack](./slack-discord)** | Pubblica notifiche leggibili (nuove persone, donazioni, iscrizioni, …) in un canale Slack | B1 → Slack | 2 minuti |
| **[Discord](./slack-discord)** | Lo stesso, in un canale Discord | B1 → Discord | 2 minuti |
| **[Zapier](./zapier)** | Usa gli eventi di B1 come trigger e le azioni di B1 in una qualsiasi delle oltre 7.000 app di Zapier | Entrambe | 5–10 min per Zap |
| **[Make](./make)** | Stessa idea di Zapier, nel generatore visuale di scenari di Make | Entrambe | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | Esporta Persone / Donazioni / Gruppi / Presenze in un foglio di calcolo su richiesta | B1 → Foglio | 5 minuti |
| **[Claude](./claude)** | Poni al Claude di Anthropic domande sui dati della tua chiesa, limitate ai tuoi permessi — gratuito da provare, consigliato | Entrambe | Meno di 3 minuti |
| **[ChatGPT](./chatgpt)** | Stessa idea con ChatGPT di OpenAI (richiede un piano ChatGPT a pagamento) | Entrambe | 10 minuti |
| **[Servizi collegati](./services/)** | Ricette selezionate per Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varia | 5–10 min ciascuna |

## Come scegliere

- **Vuoi solo una notifica in chat?** Usa **Slack** o **Discord** — nessun account di terze parti, nessuno Zap da mantenere. Si configura interamente in B1Admin.
- **Vuoi automatizzare qualcosa tra più app** (ad esempio "quando qualcuno fa un'offerta, aggiungilo alla mia lista Mailchimp e al canale Slack #donazioni")? Usa **Zapier** o **Make**. Zapier è più semplice; Make costa meno su larga scala e ha una logica più flessibile.
- **Ti servono un'estrazione dati una tantum o un report pianificato?** Usa **Google Sheets** — incolla una chiave API nella barra laterale del componente aggiuntivo e clicca su Esporta.
- **Vuoi fare domande in linguaggio naturale** ("quanti visitatori per la prima volta ci sono stati domenica scorsa?", "riassumi le offerte di questo mese")? Inizia con **[Claude](./claude)** — è gratuito da provare e si configura in meno di 3 minuti. Anche **[ChatGPT](./chatgpt)** funziona, con un piano a pagamento. Claude si collega accedendo con il tuo account B1; ChatGPT usa una chiave API di B1.
- **Vuoi costruire un'integrazione personalizzata?** Nessuna delle opzioni sopra — usa direttamente l'[API REST](/docs/developer/api) con una [chiave API](/docs/developer/api/api-keys), oppure collega un server che controlli ai [webhook](/docs/developer/api/webhooks).

## Caratteristiche comuni

Ogni integrazione si autentica con una **chiave API di B1**, creata in B1Admin in **Impostazioni → Sviluppatore → Chiavi API**. La chiave:

- È associata a una persona specifica della tua chiesa ed eredita i suoi permessi
- Può essere ristretta con degli **ambiti** — ad esempio un'esportazione in Google Sheets richiede solo `people:read`, non `settings:write`
- Può essere revocata in qualsiasi momento, interrompendo immediatamente l'accesso dell'integrazione senza influire su nient'altro

Alcuni connettori (Zapier, Make) registrano anche un [webhook](/docs/developer/api/webhooks) per tuo conto quando lo Zap o lo scenario viene attivato, e lo rimuovono quando lo disattivi — non devi gestire tu l'URL del webhook.

:::tip
Perché Zapier e Make registrino automaticamente i webhook, la chiave API deve avere l'ambito **`settings:write`** (più gli ambiti delle risorse su cui opera l'integrazione). Una chiave di sola lettura funziona per azioni ed esportazioni, ma non per i trigger.
:::

## Costi

ChurchApps è gratuito e open source. Slack/Discord, l'[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) e i connettori ufficiali di Zapier / Make / Google Sheets sono anch'essi gratuiti da parte nostra. Le terze parti possono addebitare i costi delle proprie piattaforme (Zapier e Make hanno piani gratuiti generosi; Slack, Discord e Google Sheets sono gratuiti per questo scopo).

## Creare la tua integrazione

Se nessuna delle opzioni sopra fa al caso tuo, ogni superficie di B1 è aperta:

- **[REST API](/docs/developer/api)** — richiama B1 da qualsiasi linguaggio con un'intestazione `Authorization: Bearer cak_…`
- **[Webhook](/docs/developer/api/webhooks)** — iscrivi un endpoint HTTPS pubblico a uno o più tipi di evento e ricevi payload JSON firmati
- **[OAuth + App collegate](/docs/developer/api/connected-apps)** — se stai costruendo un prodotto SaaS usato da molte chiese

## Passi successivi

- [Slack e Discord](./slack-discord) — pubblica notifiche in chat
- [Zapier](./zapier) — collegati a oltre 7.000 app
- [Make](./make) — automazione visuale dei flussi di lavoro
- [Google Sheets](./google-sheets) — esporta in fogli di calcolo
- [Claude](./claude) — chiedi a Claude dei dati della tua chiesa
- [ChatGPT](./chatgpt) — chiedi a ChatGPT di OpenAI dei dati della tua chiesa
- [Servizi collegati](./services/) — ricette per servizio (Mailchimp, Donorbox, Clearstream, …)
