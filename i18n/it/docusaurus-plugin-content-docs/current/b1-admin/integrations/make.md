---
title: "Make"
description: "Collega B1 Admin a Make per automatizzare i flussi di lavoro: crea una chiave API, configura il trigger e le azioni di B1.church e risolvi gli errori più comuni."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (in precedenza Integromat) è una piattaforma visuale di automazione dei flussi di lavoro, simile per impostazione a Zapier, con una logica più flessibile e un costo più contenuto su larga scala. L'app ufficiale B1.church per Make ti permette di creare "scenari" che reagiscono istantaneamente agli eventi di B1 e scrivono i record in B1.

</div>

:::caution Non ancora disponibile
L'app B1.church per Make non è ancora pubblicata nel catalogo delle app di Make, quindi oggi non puoi aggiungere i moduli **B1.church** descritti qui sotto a uno scenario. Fino ad allora, usa [Zapier](./zapier.md), oppure chiama la [REST API](/docs/developer/api) di B1 dal modulo **HTTP — Effettua una richiesta** di Make con una [chiave API](/docs/developer/api/api-keys). Tutto quello che segue descrive come funzionerà l'app una volta rilasciata.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Make](https://www.make.com) (il piano gratuito copre i flussi di lavoro semplici)
- Un amministratore della chiesa con il permesso **Modifica impostazioni** in B1Admin
- Un'idea di massima dello scenario che vuoi costruire

</div>

## Moduli {#modules}

| Tipo | Cosa | Evento / endpoint di B1 |
|---|---|---|
| **Trigger istantaneo** | Osserva eventi | qualsiasi evento di B1 a cui ti iscrivi (`person.created`, `donation.created`, …) |
| **Azione** | Crea persona | aggiunge una nuova persona |
| **Azione** | Aggiungi donazione | registra una donazione |
| **Azione** | Aggiungi membro al gruppo | aggiunge una persona a un gruppo |
| **Ricerca** | Cerca persone | trova persone per nome o email |

Il trigger istantaneo ti permette di scegliere quale evento ascoltare: un solo modulo trigger per scenario, configurato per ogni evento.

## Configurazione {#setup}

### 1. Crea una chiave API B1 {#1-create-a-b1-api-key}

1. In B1Admin vai su **Impostazioni → Sviluppatori → Chiavi API**.
2. Clicca su **Nuova chiave API**, chiamala "Make" e concedi gli ambiti di cui hai bisogno.
3. **Includi `settings:write`** se uno dei tuoi scenari usa il trigger istantaneo: Make registra un webhook per tuo conto quando lo scenario si attiva.
4. Concedi anche gli ambiti richiesti dai moduli di azione (ad esempio `donations:write` per il modulo Aggiungi donazione).
5. Salva e copia la chiave `cak_…`.

### 2. Installa la connessione {#2-install-the-connection}

1. In Make, crea un nuovo scenario e trascina il modulo trigger **B1.church** nell'area di lavoro.
2. Quando richiesto, scegli **Crea una connessione**. Incolla la chiave API nel campo *API Key* e lascia *API Base URL* come `https://api.churchapps.org` (a meno che tu non stia facendo test sull'ambiente di staging).
3. Clicca su **Salva**: Make verifica la chiave leggendo il profilo della tua chiesa.

La connessione viene salvata nel tuo account Make e riutilizzata in tutti gli scenari.

### 3. Configura il trigger {#3-configure-the-trigger}

1. Apri le impostazioni del modulo **Osserva eventi**.
2. Scegli l'evento che ti interessa, ad esempio `donation.created`.
3. Salva. Make genera un URL di webhook univoco e lo memorizza internamente.

### 4. Aggiungi i moduli successivi {#4-add-downstream-modules}

Trascina nell'area di lavoro uno qualsiasi dei centinaia di moduli app di Make: Mailchimp, Google Sheets, Slack, HubSpot, un tuo endpoint HTTP, ecc. Collega l'output del trigger (`event`, `churchId`, `data.id`, `data.amount`, …) ai campi di input. I moduli flatten / iterator / router / aggregator di Make ti permettono di costruire flussi ramificati e paralleli che sarebbero difficili in Zapier.

### 5. Attiva lo scenario {#5-turn-the-scenario-on}

Attiva **Attivo** nell'intestazione dello scenario. Make chiama `POST /membership/webhooks` di B1 per registrare l'URL. Da quel momento, ogni evento di B1 corrispondente passa attraverso lo scenario in tempo reale.

Disattivando lo scenario viene chiamato `DELETE /membership/webhooks/{id}`, così non restano iscrizioni orfane.

## Ricette comuni {#common-recipes}

### Sincronizza le donazioni con un Google Sheet per la revisione contabile {#sync-donations-to-a-google-sheet-for-finance-review}

- **Trigger**: B1: Osserva eventi (`donation.created`)
- **Azione**: Google Sheets: Aggiungi una riga. Collega `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` alle colonne del foglio.

### Notifica Slack condizionale in base all'importo della donazione {#conditional-slack-notification-by-donation-amount}

- **Trigger**: B1: Osserva eventi (`donation.created`)
- **Router**:
  - Ramo A: Filtro `data.amount >= 1000` → Slack: pubblica in `#major-gifts`
  - Ramo B: altrimenti → Slack: pubblica in `#donations`

### Nuova persona → CRM + email di benvenuto + Slack {#new-person--crm--welcome-email--slack}

- **Trigger**: B1: Osserva eventi (`person.created`)
- **Azione**: HubSpot: Crea contatto
- **Azione**: Mailgun: Invia email di benvenuto
- **Azione**: Slack: avvisa `#new-people` (in parallelo, usando il router di Make)

## Come funziona il trigger istantaneo {#how-the-instant-trigger-works}

Il trigger istantaneo è basato su webhook, non su polling: quando viene attivato, Make chiama `POST /membership/webhooks` con l'URL generato e l'evento scelto. Quando l'evento si verifica in B1, B1 invia il messaggio all'URL di Make e il tuo scenario viene eseguito in pochi secondi. Disattivare lo scenario rimuove il webhook.

Il trigger si attiva solo per gli eventi che si verificano **mentre lo scenario è attivo**. Non c'è recupero retroattivo.

## Limiti e note {#limits--notes}

- **Un evento per modulo Osserva eventi.** Per ascoltare più eventi, crea uno scenario per ogni evento.
- **La verifica della firma non è esposta**: Make non passa `X-B1-Signature` allo scenario; il limite di fiducia è l'URL del webhook per scenario, difficile da indovinare. È una pratica normale in Make. Se ti servono controlli espliciti della firma, crea un'integrazione personalizzata con l'[SDK](/docs/developer/api/webhooks#sdk-support).
- **Conteggio delle operazioni**: ogni chiamata API di un modulo di azione conta sulla quota di operazioni di Make, non su nulla lato B1.

## Risoluzione dei problemi {#troubleshooting}

- **Il test della connessione fallisce**: nella maggior parte dei casi è un errore di battitura nella chiave API. Copiala di nuovo da B1Admin (la chiave completa viene mostrata una sola volta; se l'hai persa, crea una nuova chiave).
- **Il modulo trigger non si attiva**: controlla **Impostazioni → Sviluppatori → Webhook** in B1Admin. Se dopo l'attivazione dello scenario non vedi una riga "Make — &lt;evento&gt;", la chiave non ha `settings:write`. Aggiorna la chiave e riattiva lo scenario.
- **Un'azione restituisce `403 Forbidden`**: la chiave API non ha l'ambito per quell'endpoint. Ad esempio, Aggiungi donazione richiede `donations:write`. Aggiorna la chiave in B1Admin e ripeti il test.

## Manca un modulo? {#missing-a-module}

Se ti serve un modulo che non esiste (ad esempio, una nuova azione per un endpoint che non abbiamo ancora coperto), scrivi a [support@churchapps.org](mailto:support@churchapps.org). Nel frattempo, il modulo **HTTP — Effettua una richiesta** di Make può chiamare qualsiasi endpoint di B1 con un'intestazione `Authorization: Bearer cak_…`.

## Vedi anche {#see-also}

- [Zapier](./zapier.md): stesso schema con un'interfaccia più semplice e un catalogo di app più ampio
- [Slack e Discord](./slack-discord.md): notifiche in chat integrate, senza Make
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks)
