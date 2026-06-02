---
title: "Zapier"
---

# Zapier

<div class="article-intro">

L'app ufficiale B1.church su Zapier permette a un Zap di reagire agli eventi nella tua chiesa (nuova persona, nuova donazione, nuovo membro del gruppo, …) e di scrivere i record su B1. Nessuna programmazione, nessuna infrastruttura — colleghi tutto nell'editor drag-and-drop di Zapier, incolla una chiave API e attiva lo Zap.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Un account [Zapier](https://zapier.com) (il livello gratuito è sufficiente per alcuni Zap)
- Un amministratore della chiesa con il permesso **Modifica Impostazioni** in B1Admin (creerai una chiave API)
- Un'idea di quello che vuoi fare — ad es. "quando una persona viene aggiunta in B1, aggiungila alla mia lista Mailchimp"

</div>

## Trigger e Azioni

| Tipo | Cosa | Evento / endpoint B1 |
|---|---|---|
| **Trigger** | Nuova Persona | `person.created` |
| **Trigger** | Persona Aggiornata | `person.updated` |
| **Trigger** | Nuova Donazione | `donation.created` |
| **Trigger** | Nuovo Membro Gruppo | `group.member.added` |
| **Trigger** | Nuovo Invio Modulo | `form.submission.created` |
| **Azione** | Crea Persona | aggiunge una nuova persona |
| **Azione** | Aggiungi Donazione | registra una donazione |
| **Azione** | Aggiungi Membro Gruppo | aggiunge una persona a un gruppo |
| **Ricerca** | Trova Persona | cerca una persona per nome o email |

Combina questi liberamente con uno qualsiasi dei 7.000+ app supportate di Zapier.

## Configurazione

### 1. Crea una chiave API B1

1. In B1Admin vai a **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova Chiave API**, assegnagli un nome come "Zapier" e seleziona gli ambiti che lo Zap necessita.
3. **Importante:** i trigger Zapier registrano un webhook per tuo conto quando attivi lo Zap, il che richiede l'ambito **`settings:write`**. Includi sempre `settings:write` se uno qualsiasi dei tuoi Zap utilizza un trigger B1.
4. Concedi anche gli ambiti necessari alle azioni — ad esempio un'azione "Aggiungi Donazione" richiede `donations:write`, "Crea Persona" richiede `people:write`.
5. Salva. La chiave completa `cak_…` viene mostrata **una sola volta** — copiala.

### 2. Connetti Zapier a B1

1. In Zapier, costruisci un nuovo Zap.
2. Quando scegli un trigger o un'azione B1 per la prima volta, Zapier ti chiede di **Accedi a B1.church**.
3. Incolla la chiave API dal passaggio 1 e fai clic su **Sì, Continua**. Zapier la convalida rispetto alla tua chiesa.

La connessione è salvata in Zapier e riutilizzata da ogni Zap sul tuo account.

### 3. Costruisci lo Zap

Scegli un trigger, quindi aggiungi uno o più passaggi di azione. Esempi sotto.

## Ricette Comuni

### Aggiungi le nuove persone B1 a Mailchimp

- **Trigger** — B1: Nuova Persona
- **Azione** — Mailchimp: Aggiungi/Aggiorna Sottoscritto. Mappa `name__first`, `name__last`, `contactInfo__email` di B1 nei campi Nome / Cognome / Email di Mailchimp.

### Pubblica le donazioni in un canale Slack con una scheda più ricca del connettore integrato

- **Trigger** — B1: Nuova Donazione
- **Azione** — Slack: Invia Messaggio Canale. Componi qualsiasi layout — pulsanti, allegati, ecc. — che il [connettore Slack](./slack-discord) integrato non può.

### Aggiungi i nuovi membri del gruppo a un Google Group

- **Trigger** — B1: Nuovo Membro Gruppo (filtrato a uno specifico `groupId`)
- **Azione** — Filtra per Zapier: continua solo se il gruppo B1 è quello che ti interessa
- **Azione** — B1: Trova Persona (usa il `personId` del trigger per recuperare l'email)
- **Azione** — Google Groups: Aggiungi Membro

### Inoltri gli invii di moduli a un project tracker

- **Trigger** — B1: Nuovo Invio Modulo
- **Azione** — Notion / Linear / Asana / Trello: Crea pagina / problema / attività

## Come Funzionano i Trigger Dietro le Quinte

I trigger sono **REST hook**, non polling — Zapier non effettua il ping a B1 ogni 15 minuti. Quando attivi lo Zap, Zapier chiede a B1 di registrare un webhook che punta a un URL privato di Zapier; quando l'evento si verifica, B1 effettua un POST dell'envelope a Zapier e il tuo Zap si avvia **entro pochi secondi**. Disattiva lo Zap e Zapier chiede a B1 di eliminare il webhook — nessun'iscrizione orfana.

Ciò significa che il trigger si attiva solo per gli eventi che si verificano **dopo** l'attivazione dello Zap. Non c'è backfill — attivare uno Zap non riproduce le donazioni di ieri.

## Limiti e Note

- **Più Zap con lo stesso trigger** registrano ciascuno il loro proprio webhook B1 — non c'è conflitto, ma è utile saperlo se stai ispezionando **Impostazioni → Sviluppatore → Webhook** e ti chiedi perché ci sono tre righe identiche `Zapier — donation.created`.
- **Dati di test nella configurazione dello Zap** — quando costruisci uno Zap, Zapier richiede dati di esempio per mappare i campi. Estrarrà l'evento corrispondente più recente da B1 se ce n'è uno; altrimenti utilizza un campione sintetico della definizione dell'app.
- **I fallimenti dell'azione si presentano come errori dello Zap** nella cronologia delle attività di Zapier. Causa comune: una chiave API senza l'ambito corretto (ad es. un'azione "Aggiungi Donazione" richiede `donations:write`). Crea di nuovo la chiave con gli ambiti corretti e ricollega in Zapier.
- **Quote di chiamate API in uscita** — ogni chiamata API B1 da un'azione conta verso la tua quota di attività Zapier, non verso nulla dal lato B1.

## Risoluzione dei Problemi

- **"Autenticazione non riuscita"** al collegamento — la chiave API è sbagliata, revocata o priva degli ambiti che lo Zap necessita. Crea di nuovo in B1Admin con almeno `settings:write` più tutti gli ambiti di risorsa che lo Zap tocca, quindi aggiorna la connessione.
- **Il trigger non si attiva mai** — conferma che il webhook sia stato effettivamente registrato: in B1Admin, **Impostazioni → Sviluppatore → Webhook** dovrebbe ora mostrare una riga denominata "Zapier — &lt;evento&gt;". Se non c'è, la chiave API probabilmente mancava di `settings:write` quando hai attivato lo Zap. Correggi la chiave, attiva e disattiva di nuovo lo Zap.
- **Il trigger si attiva due volte** — Zapier occasionalmente consegna nuovamente se il suo riconoscimento è stato perso. Usa un passaggio "Filtra per Zapier" su un id univoco (ad es. `id` della persona) se hai bisogno di una deduplicazione rigorosa.

## Vedi Anche

- [Make](./make) — stesso modello, piattaforma diversa
- [Slack e Discord](./slack-discord) — notifiche di chat più semplici senza Zapier
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks)
