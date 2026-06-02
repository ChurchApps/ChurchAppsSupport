---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (precedentemente Integromat) è una piattaforma di automazione del flusso di lavoro visuale — simile nello spirito a Zapier, con una logica più flessibile e un conto più economico su larga scala. L'app Make ufficiale di B1.church ti consente di costruire "scenari" che reagiscono istantaneamente agli eventi B1 e scrivono i record indietro a B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Make](https://www.make.com) (il livello gratuito copre piccoli flussi di lavoro)
- Un amministratore di chiesa con autorizzazione **Modifica impostazioni** in B1Admin
- Un'idea approssimativa dello scenario che desideri costruire

</div>

## Moduli

| Tipo | Cosa | Evento / endpoint B1 |
|---|---|---|
| **Trigger istantaneo** | Monitora eventi | qualsiasi evento B1 sottoscritto (`person.created`, `donation.created`, …) |
| **Azione** | Crea persona | aggiunge una nuova persona |
| **Azione** | Aggiungi donazione | registra una donazione |
| **Azione** | Aggiungi membro del gruppo | aggiunge una persona a un gruppo |
| **Ricerca** | Cerca persone | trova persone per nome o email |

Il trigger istantaneo ti consente di scegliere quale evento ascoltare — un modulo trigger per scenario, configurato per evento.

## Configurazione

### 1. Crea una chiave API B1

1. In B1Admin vai a **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova chiave API**, chiamala "Make", e concedi gli ambiti di cui hai bisogno.
3. **Includi `settings:write`** se uno qualsiasi dei tuoi scenari utilizza il trigger istantaneo — Make registra un webhook per tuo conto quando lo scenario viene attivato.
4. Concedi anche gli ambiti di cui i moduli di azione hanno bisogno (ad es. `donations:write` per il modulo Aggiungi donazione).
5. Salva e copia la chiave `cak_…`.

### 2. Installa la connessione

1. In Make, costruisci un nuovo scenario e rilascia il modulo trigger **B1.church** sulla tela.
2. Quando richiesto, **Crea una connessione**. Incolla la chiave API nel campo *Chiave API* e lascia *URL di base API* come `https://api.churchapps.org` (a meno che non stia testando contro il staging).
3. Fai clic su **Salva** — Make prova la chiave leggendo il profilo della tua chiesa.

La connessione viene salvata nel tuo account Make e riutilizzata tra gli scenari.

### 3. Configura il trigger

1. Apri le impostazioni del modulo **Monitora eventi**.
2. Scegli l'evento che desideri — ad es. `donation.created`.
3. Salva. Make genera un URL webhook univoco e lo memorizza internamente.

### 4. Aggiungi moduli a valle

Rilascia uno qualsiasi dei cento app moduli di Make sulla tela — Mailchimp, Google Sheets, Slack, HubSpot, il tuo endpoint HTTP, ecc. Mappa l'output del trigger (`event`, `churchId`, `data.id`, `data.amount`, …) nei campi di input. I moduli flattenizza / iteratore / router / aggregatore di Make ti consentono di costruire flussi ramificati e paralleli che sarebbero difficili in Zapier.

### 5. Attiva lo scenario

Attiva **Attivo** nell'intestazione dello scenario. Make chiama B1's `POST /membership/webhooks` per registrare l'URL. Da quel momento in poi, ogni evento B1 corrispondente fluisce attraverso lo scenario in tempo reale.

Disattivando lo scenario viene chiamato `DELETE /membership/webhooks/{id}` in modo che non ci siano sottoscrizioni orfane.

## Ricette comuni

### Sincronizza donazioni a un Google Sheet per la revisione finanziaria

- **Trigger** — B1: Monitora eventi (`donation.created`)
- **Azione** — Google Sheets: Aggiungi una riga. Mappa `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` nelle colonne del foglio.

### Notifica Slack condizionale per importo di donazione

- **Trigger** — B1: Monitora eventi (`donation.created`)
- **Router**:
  - Ramo A — Filtro: `data.amount >= 1000` → Slack: pubblica su `#major-gifts`
  - Ramo B — passthrough → Slack: pubblica su `#donazioni`

### Nuova persona → CRM + email di benvenuto + Slack

- **Trigger** — B1: Monitora eventi (`person.created`)
- **Azione** — HubSpot: Crea contatto
- **Azione** — Mailgun: Invia email di benvenuto
- **Azione** — Slack: Notifica `#new-people` (in parallelo — usa il router di Make)

## Come funziona il trigger istantaneo

Il trigger istantaneo è supportato da webhook, non da polling — quando attivato, Make chiama `POST /membership/webhooks` con il suo URL generato e l'evento che hai scelto. Quando l'evento si verifica in B1, B1 invia l'envelope all'URL di Make e il tuo scenario viene eseguito entro pochi secondi. Disattivare lo scenario rimuove il webhook.

Il trigger si attiva solo per gli eventi che accadono **mentre lo scenario è attivo**. Non c'è backfill.

## Limiti e note

- **Un evento per modulo Monitora eventi.** Per ascoltare più eventi in uno scenario, rilascia più moduli trigger in scenari separati (o usa un singolo modulo con l'elenco degli eventi uniti — vedi sotto).
- **La verifica della firma non è esposta** — Make non trasmette `X-B1-Signature` allo scenario; il confine di fiducia è l'URL webhook indovinabile per scenario di Make. Questa è la pratica normale di Make. Se hai bisogno di controlli di firma espliciti, costruisci un'integrazione personalizzata con l'[SDK](/docs/developer/api/webhooks#sdk-support) invece.
- **Conteggio delle operazioni** — ogni chiamata API da un modulo di azione conta rispetto alla quota di operazioni di Make, non rispetto a nulla sul lato B1.

## Risoluzione dei problemi

- **Il test di connessione non riesce** — il più delle volte un errore di digitazione nella chiave API. Ri-copia da B1Admin (la chiave completa viene mostrata una sola volta; se l'hai persa, crea una nuova chiave).
- **Il modulo trigger non si attiva** — controlla **Impostazioni → Sviluppatore → Webhook** in B1Admin. Se non vedi una riga "Make — &lt;evento&gt;" dopo l'attivazione dello scenario, la chiave manca `settings:write`. Aggiorna la chiave e riattiva.
- **L'azione restituisce `403 Forbidden`** — la chiave API manca dell'ambito per quell'endpoint. Ad esempio, Aggiungi donazione ha bisogno di `donations:write`. Aggiorna la chiave in B1Admin e ri-testa.

## Personalizzazione dell'app

L'app Make di B1.church è open source — le definizioni JSON vivono nel repository `B1Integrations/Make/`. Se hai bisogno di un modulo che non esiste (ad es. una nuova azione per un endpoint che non abbiamo coperto), apri un problema o una richiesta pull lì.

## Vedi anche

- [Zapier](./zapier) — stesso pattern con un'interfaccia più semplice e un catalogo app più grande
- [Slack e Discord](./slack-discord) — notifiche di chat integrate senza Make
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks)
