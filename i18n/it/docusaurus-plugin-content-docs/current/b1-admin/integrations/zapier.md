---
title: "Zapier"
---

# Zapier

<div class="article-intro">

L'app ufficiale B1.church su Zapier permette a uno Zap di reagire agli eventi nella tua chiesa (nuova persona, nuova donazione, nuovo membro di gruppo, …) e scrivere record di ritorno su B1. Nessun codice, nessuna infrastruttura — lo colleghi nell'editor drag-and-drop di Zapier, incolli una chiave API e attivi lo Zap.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Zapier](https://zapier.com) (il piano gratuito è sufficiente per una manciata di Zap)
- Un amministratore della chiesa con il permesso **Modifica impostazioni** in B1Admin (creerai una chiave API)
- Un'idea di cosa vuoi fare — ad es. "quando una persona viene aggiunta in B1, aggiungila alla mia lista Mailchimp"

</div>

## Trigger e azioni

| Tipo | Cosa | Evento/endpoint B1 |
|---|---|---|
| **Trigger** | Nuova persona | `person.created` |
| **Trigger** | Persona aggiornata | `person.updated` |
| **Trigger** | Nuova donazione | `donation.created` |
| **Trigger** | Nuovo membro di gruppo | `group.member.added` |
| **Trigger** | Nuovo invio modulo | `form.submission.created` |
| **Azione** | Crea persona | aggiunge una nuova persona |
| **Azione** | Aggiungi donazione | registra una donazione |
| **Azione** | Aggiungi membro di gruppo | aggiunge una persona a un gruppo |
| **Azione** | Trova persona | cerca una persona per id, email o nome; fa fallire l'attività se nessuno corrisponde |

Combina liberamente queste con qualsiasi delle oltre 7.000 app supportate da Zapier.

## Configurazione

### 1. Crea una chiave API B1

1. In B1Admin vai su **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova chiave API**, dalle un nome come "Zapier" e seleziona gli ambiti di cui lo Zap ha bisogno.
3. **Importante:** i trigger Zapier registrano un webhook per tuo conto quando lo Zap viene attivato, il che richiede l'ambito **`settings:write`**. Includi sempre `settings:write` se uno qualsiasi dei tuoi Zap usa un trigger B1.
4. Concedi anche gli ambiti di cui le azioni hanno bisogno — ad esempio un'azione "Aggiungi donazione" richiede `donations:write`, "Crea persona" richiede `people:write`.
5. Salva. La chiave completa `cak_…` viene mostrata **una sola volta** — copiala.

### 2. Collega Zapier a B1

1. In Zapier, costruisci un nuovo Zap.
2. Quando scegli un trigger o un'azione B1 per la prima volta, Zapier ti chiede di **Accedere a B1.church**.
3. Incolla la chiave API dal passaggio 1 e fai clic su **Sì, continua**. Zapier la valida rispetto alla tua chiesa.

La connessione viene salvata in Zapier e riutilizzata da ogni Zap del tuo account.

### 3. Costruisci lo Zap

Scegli un trigger, poi aggiungi uno o più passaggi di azione. Esempi qui sotto.

## Ricette comuni

### Aggiungi le nuove persone di B1 a Mailchimp

- **Trigger** — B1: Nuova persona
- **Azione** — Mailchimp: Aggiungi/Aggiorna iscritto. Mappa `name__first`, `name__last`, `contactInfo__email` di B1 nei campi Nome / Cognome / Email di Mailchimp.

### Pubblica le donazioni su un canale Slack con una card più ricca del connettore integrato

- **Trigger** — B1: Nuova donazione
- **Azione** — Slack: Invia messaggio al canale. Componi qualsiasi layout — pulsanti, allegati, ecc. — che il [connettore Slack integrato](./slack-discord) non può fare.

### Aggiungi i nuovi membri di gruppo a un Google Group

- **Trigger** — B1: Nuovo membro di gruppo (filtrato su un `groupId` specifico)
- **Azione** — Filtra tramite Zapier: continua solo se il gruppo B1 è quello che ti interessa
- **Azione** — B1: Trova persona (usa il `personId` del trigger per recuperare l'email)
- **Azione** — Google Groups: Aggiungi membro

### Inoltra gli invii di moduli a un tracker di progetti

- **Trigger** — B1: Nuovo invio modulo
- **Azione** — Notion / Linear / Asana / Trello: Crea pagina / issue / attività

## Come funzionano i trigger internamente

I trigger sono **REST hook**, non polling — Zapier non contatta B1 ogni 15 minuti. Quando attivi lo Zap, Zapier chiede a B1 di registrare un webhook che punta a un URL privato di Zapier; quando l'evento si verifica, B1 invia la busta a Zapier tramite POST e il tuo Zap parte **entro pochi secondi**. Disattiva lo Zap e Zapier chiede a B1 di eliminare il webhook — nessuna sottoscrizione orfana.

Questo significa che il trigger si attiva solo per eventi che accadono **dopo** che lo Zap è stato attivato. Non c'è retroazione — attivare uno Zap non riproduce le donazioni di ieri.

## Limiti e note

- **Più Zap con lo stesso trigger** registrano ciascuno il proprio webhook B1 — non c'è conflitto, ma vale la pena saperlo se stai ispezionando **Impostazioni → Sviluppatore → Webhook** e ti chiedi perché ci sono tre righe identiche `Zapier — donation.created`.
- **Dati di test nella configurazione dello Zap** — quando costruisci uno Zap, Zapier chiede dati di esempio per mappare i campi. Recupererà l'evento corrispondente più recente da B1 se ce n'è uno; altrimenti usa un esempio sintetico dalla definizione dell'app.
- **I fallimenti delle azioni appaiono come errori dello Zap** nella cronologia attività di Zapier. Causa comune: una chiave API senza l'ambito giusto (ad es. un'azione "Aggiungi donazione" richiede `donations:write`). Rigenera la chiave con gli ambiti corretti e riconnettila in Zapier.
- **Quote delle chiamate API in uscita** — ogni chiamata API B1 da un'azione conta ai fini della tua quota di attività Zapier, non ai fini di nulla sul lato B1.

## Risoluzione dei problemi

- **"Autenticazione fallita"** durante la connessione — la chiave API è sbagliata, revocata o priva degli ambiti di cui lo Zap ha bisogno. Rigenerala in B1Admin con almeno `settings:write` più qualsiasi ambito di risorsa toccato dallo Zap, poi aggiorna la connessione.
- **Il trigger non si attiva mai** — conferma che il webhook sia stato effettivamente registrato: in B1Admin, **Impostazioni → Sviluppatore → Webhook** dovrebbe ora mostrare una riga chiamata "Zapier — &lt;evento&gt;". Se non c'è, la chiave API probabilmente mancava di `settings:write` quando hai attivato lo Zap. Correggi la chiave, disattiva e riattiva lo Zap.
- **Il trigger si attiva due volte** — Zapier a volte reinvia se la sua conferma è andata persa. Usa un passaggio "Filtra tramite Zapier" su un id univoco (ad es. l'`id` della persona) se hai bisogno di una deduplicazione rigorosa.

## Vedi anche

- [Make](./make) — stesso schema, piattaforma diversa
- [Slack e Discord](./slack-discord) — notifiche chat più semplici senza Zapier
- [Webhook (riferimento sviluppatore)](/docs/developer/api/webhooks)
