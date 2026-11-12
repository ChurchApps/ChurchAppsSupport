---
title: "Integrazioni"
description: "Collega B1 Admin a Slack, Discord, Zapier, Make, Google Sheets e assistenti AI come Claude, con i passaggi di configurazione e gli ambiti delle chiavi API necessari per ciascuno."
---

# Integrazioni

<div class="article-intro">

B1 si integra con gli strumenti che il tuo team già usa. Collega Slack o Discord per le notifiche allo staff, automatizza i flussi di lavoro con Zapier o Make, oppure esporta i dati su richiesta in Google Sheets, senza pagare una piattaforma di integrazione separata e senza che ChurchApps ospiti nulla di aggiuntivo. Ogni integrazione funziona sull'infrastruttura del fornitore terzo e comunica con la tua chiesa tramite i webhook o l'API REST di B1.

</div>

## Cosa è disponibile {#whats-available}

| Integrazione | Cosa fa | Direzione | Impegno di configurazione |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Pubblica notifiche leggibili (nuove persone, donazioni, iscrizioni, …) in un canale Slack | B1 → Slack | 2 minuti |
| **[Discord](./slack-discord.md)** | Lo stesso, in un canale Discord | B1 → Discord | 2 minuti |
| **[Zapier](./zapier.md)** | Usa gli eventi di B1 come trigger e le azioni di B1 in una qualsiasi delle oltre 7.000 app di Zapier (in attesa dell'approvazione di Zapier) | Entrambe | 5–10 min per Zap |
| **[Make](./make.md)** | Stessa idea di Zapier, nel generatore visuale di scenari di Make (non ancora rilasciato) | Entrambe | 5–10 min per scenario |
| **[Google Sheets](./google-sheets.md)** | Esporta Persone / Donazioni / Gruppi / Presenze in un foglio di calcolo su richiesta (non ancora rilasciato) | B1 → Foglio | 5 minuti |
| **[Claude](./claude.md)** | Fai domande ai dati della tua chiesa a Claude di Anthropic, con i limiti dei tuoi permessi: si può provare gratuitamente, consigliato | Entrambe | Meno di 3 minuti |
| **[ChatGPT](./chatgpt.md)** | Stessa idea con ChatGPT di OpenAI (richiede un abbonamento ChatGPT a pagamento) | Entrambe | 10 minuti |
| **[Mailchimp](./services/mailchimp.md)** | Mantieni un pubblico Mailchimp sincronizzato con le tue persone, i gruppi e le liste salvate: integrato in B1 | B1 → Mailchimp | 5 minuti |
| **[Servizi collegati](./services/index.md)** | Ricette selezionate per Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varia | 5–10 min ciascuna |

## Come scegliere {#how-to-pick}

- **Ti basta una notifica in chat?** Usa **Slack** o **Discord**: nessun account di terze parti, nessuno Zap da mantenere. Si configura interamente dentro B1Admin.
- **Vuoi automatizzare qualcosa tra più app** (ad esempio, "quando qualcuno dona, aggiungilo alla mia lista Mailchimp e pubblica in #donazioni su Slack")? Usa **Zapier** o **Make**. Zapier è più semplice; Make costa meno su larga scala e offre una logica più flessibile.
- **Ti serve un'estrazione dati una tantum o un report pianificato?** Usa **Google Sheets**: incolla una chiave API nella barra laterale del componente e clicca su Esporta.
- **Vuoi fare domande in linguaggio semplice** ("quanti visitatori alla prima volta sono venuti domenica scorsa?", "riassumi le donazioni di questo mese")? Inizia con **[Claude](./claude.md)**: si può provare gratuitamente e si configura in meno di 3 minuti. **[ChatGPT](./chatgpt.md)** funziona altrettanto bene con un abbonamento a pagamento. Claude si collega con l'accesso tramite il tuo account B1; ChatGPT usa una chiave API di B1.
- **Stai costruendo un'integrazione personalizzata?** Nessuna delle precedenti: parla direttamente con la [REST API](/docs/developer/api) usando una [chiave API](/docs/developer/api/api-keys), oppure collega un server che controlli ai [webhook](/docs/developer/api/webhooks).

## Cosa hanno in comune {#what-they-have-in-common}

Tutto si configura in B1Admin in **Impostazioni → Sviluppatori**, che ha tre schede: **Chiavi API**, **Webhook** e **App collegate**.

- **Slack, Discord e Mailchimp** sono webhook che crei tu stesso nella scheda **Webhook** (scegliendo il **Tipo di connettore** corrispondente). Non richiedono una chiave API.
- **Claude** (con accesso tramite il tuo account B1) compare nella scheda **App collegate**, dove puoi revocarlo.
- **Zapier, Make, Google Sheets, ChatGPT e Claude con una chiave** si autenticano con una **chiave API B1**, creata nella scheda **Chiavi API**. La chiave:

  - È legata alla persona che l'ha creata ed eredita i permessi di quella persona
  - Può essere limitata con **ambiti**: ad esempio, un'esportazione verso Google Sheets ha bisogno solo di `people:read`, non di `settings:write`
  - Può essere eliminata in qualsiasi momento, interrompendo subito l'accesso dell'integrazione senza influire su nient'altro

Alcuni connettori (Zapier, Make) registrano anche un [webhook](/docs/developer/api/webhooks) per tuo conto quando lo Zap o lo scenario viene attivato, e lo rimuovono quando disattivi lo Zap: non devi gestire tu l'URL del webhook.

:::tip
Perché Zapier e Make registrino automaticamente i webhook, la chiave API deve avere l'ambito **`settings:write`** (oltre agli ambiti delle risorse coinvolte dall'integrazione). Una chiave in sola lettura funziona per azioni ed esportazioni, ma non per i trigger.
:::

## Costi {#cost}

ChurchApps è gratuito e open source. Slack/Discord, l'[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) e i connettori ufficiali di Zapier / Make / Google Sheets sono anch'essi gratuiti da parte nostra. I terzi possono addebitare costi per le proprie piattaforme (Zapier e Make hanno piani gratuiti generosi; Slack, Discord e Google Sheets sono gratuiti per questo uso).

## Costruire la propria integrazione {#building-your-own}

Se nessuna delle opzioni precedenti fa per te, ogni parte di B1 è accessibile:

- **[REST API](/docs/developer/api)**: chiama B1 da qualsiasi linguaggio con un'intestazione `Authorization: Bearer cak_…`
- **[Webhook](/docs/developer/api/webhooks)**: collega un endpoint HTTPS pubblico a uno o più tipi di evento e ricevi payload JSON firmati
- **[OAuth + App collegate](/docs/developer/api/connected-apps)**: se stai costruendo un prodotto SaaS usato da molte chiese

## Prossimi passi {#next-steps}

- [Slack e Discord](./slack-discord.md): pubblica notifiche in chat
- [Zapier](./zapier.md): collegati a oltre 7.000 app
- [Make](./make.md): automazione visuale dei flussi di lavoro
- [Google Sheets](./google-sheets.md): esporta in fogli di calcolo
- [Claude](./claude.md): chiedi a Claude di Anthropic dei dati della tua chiesa
- [ChatGPT](./chatgpt.md): chiedi a ChatGPT di OpenAI dei dati della tua chiesa
- [Servizi collegati](./services/index.md): ricette per singoli servizi (Mailchimp, Donorbox, Clearstream, …)
