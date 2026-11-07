---
title: "Zapier"
description: "Collega B1 Admin a Zapier per avviare automazioni su nuove persone, donazioni e membri dei gruppi, e riscrivere i record in B1 senza programmare."
---

# Zapier

<div class="article-intro">

L'app ufficiale B1.church su Zapier permette a uno Zap di reagire agli eventi della tua chiesa (nuova persona, nuova donazione, nuovo membro del gruppo, …) e di scrivere record di ritorno in B1. Nessuna programmazione, nessuna infrastruttura -- lo configuri nell'editor drag-and-drop di Zapier, incolli una chiave API e attivi lo Zap.

</div>

:::caution In attesa dell'approvazione di Zapier
L'app B1.church è costruita e funziona, ma è ancora in attesa della revisione di Zapier prima di comparire pubblicamente nella directory delle app dell'editor degli Zap. Finché non sarà approvata, possono usarla solo gli account invitati. Tutto ciò che segue descrive come funzionerà una volta approvata.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Zapier](https://zapier.com) (il piano gratuito basta per qualche Zap)
- Un amministratore della chiesa con il permesso **Modifica impostazioni** in B1Admin (creerai una chiave API)
- Un'idea di cosa vuoi fare -- ad esempio "quando una persona viene aggiunta in B1, aggiungila alla mia lista Mailchimp"

</div>

## Trigger e azioni

| Tipo | Cosa | Evento / endpoint B1 |
|---|---|---|
| **Trigger** | Nuova persona | `person.created` |
| **Trigger** | Persona aggiornata | `person.updated` |
| **Trigger** | Nuova donazione | `donation.created` |
| **Trigger** | Nuovo membro del gruppo | `group.member.added` |
| **Trigger** | Nuova risposta a un modulo | `form.submission.created` |
| **Azione** | Crea persona | aggiunge una nuova persona |
| **Azione** | Aggiungi donazione | registra una donazione |
| **Azione** | Aggiungi membro al gruppo | aggiunge una persona a un gruppo |
| **Azione** | Trova persona | cerca una persona per id, email o nome; fa fallire l'attività se nessuno corrisponde |

Combinali liberamente con una qualsiasi delle oltre 7.000 app supportate da Zapier.

## Configurazione

### 1. Crea una chiave API di B1

1. In B1Admin vai su **Impostazioni → Sviluppatore → Chiavi API**.
2. Clicca su **Nuova chiave API**, dai un nome come "Zapier" e seleziona gli ambiti di cui lo Zap ha bisogno.
3. **Importante:** i trigger di Zapier registrano un webhook per conto tuo quando lo Zap viene attivato, il che richiede l'ambito **`settings:write`**. Includi sempre `settings:write` se uno dei tuoi Zap usa un trigger di B1.
4. Concedi anche gli ambiti richiesti dalle azioni -- ad esempio un'azione "Aggiungi donazione" richiede `donations:write`, "Crea persona" richiede `people:write`.
5. Salva. La chiave completa `cak_…` viene mostrata **una sola volta** -- copiala.

### 2. Collega Zapier a B1

1. In Zapier, crea un nuovo Zap.
2. Quando scegli per la prima volta un trigger o un'azione di B1, Zapier ti chiede di **Accedere a B1.church**.
3. Incolla la chiave API del passo 1 e clicca su **Sì, continua**. Zapier la verifica con la tua chiesa.

La connessione viene salvata in Zapier e riutilizzata da ogni Zap del tuo account.

### 3. Costruisci lo Zap

Scegli un trigger, poi aggiungi uno o più passaggi di azione. Esempi qui sotto.

## Ricette comuni

### Aggiungi le nuove persone di B1 a Mailchimp

- **Trigger** -- B1: Nuova persona
- **Azione** -- Mailchimp: Aggiungi/Aggiorna iscritto. Associa `name__first`, `name__last`, `contactInfo__email` di B1 ai campi Nome / Cognome / Email di Mailchimp.

### Pubblica le donazioni in un canale Slack con una scheda più ricca del connettore integrato

- **Trigger** -- B1: Nuova donazione
- **Azione** -- Slack: Invia messaggio nel canale. Componi qualsiasi layout -- pulsanti, allegati, ecc. -- che il [connettore Slack integrato](./slack-discord.md) non può creare.

### Aggiungi i nuovi membri dei gruppi a un Gruppo Google

- **Trigger** -- B1: Nuovo membro del gruppo (filtrato su un `groupId` specifico)
- **Azione** -- Filtro di Zapier: continua solo se il gruppo B1 è quello che ti interessa
- **Azione** -- B1: Trova persona (usa il `personId` del trigger per recuperare l'email)
- **Azione** -- Gruppi Google: Aggiungi membro

### Inoltra le risposte ai moduli a un gestore di progetti

- **Trigger** -- B1: Nuova risposta a un modulo
- **Azione** -- Notion / Linear / Asana / Trello: Crea pagina / problema / attività

## Come funzionano i trigger

I trigger sono **REST hook**, non polling -- Zapier non interroga B1 ogni 15 minuti. Quando attivi lo Zap, Zapier chiede a B1 di registrare un webhook che punta a un URL privato di Zapier; quando l'evento si verifica, B1 invia il messaggio a Zapier e il tuo Zap parte **in pochi secondi**. Se disattivi lo Zap, Zapier chiede a B1 di eliminare il webhook -- nessuna sottoscrizione orfana.

Questo significa che il trigger si attiva solo per gli eventi che si verificano **dopo** che lo Zap è stato attivato. Non c'è recupero retroattivo -- attivare uno Zap non riproduce le donazioni di ieri.

## Limiti e note

- **Più Zap con lo stesso trigger** registrano ciascuno il proprio webhook di B1 -- non c'è alcun conflitto, ma è utile saperlo se controlli **Impostazioni → Sviluppatore → Webhook** e ti chiedi perché ci siano tre righe identiche "Zapier — donation.created".
- **Dati di test nella configurazione dello Zap** -- quando costruisci uno Zap, Zapier chiede dei dati di esempio per mappare i campi. Recupera l'evento corrispondente più recente da B1 se esiste; altrimenti usa un campione sintetico dalla definizione dell'app.
- **Gli errori delle azioni compaiono come errori dello Zap** nella cronologia delle attività di Zapier. Causa comune: una chiave API senza l'ambito giusto (ad esempio un'azione "Aggiungi donazione" richiede `donations:write`). Genera di nuovo la chiave con gli ambiti corretti e ricollegala in Zapier.
- **Quote delle chiamate API in uscita** -- ogni chiamata API di B1 da un'azione conta sulla tua quota di attività di Zapier, non su qualcosa lato B1.

## Risoluzione dei problemi

- **"Autenticazione non riuscita"** durante il collegamento -- la chiave API è errata, revocata o non ha gli ambiti di cui lo Zap ha bisogno. Genera di nuovo la chiave in B1Admin con almeno `settings:write` più gli ambiti delle risorse toccate dallo Zap, poi aggiorna la connessione.
- **Il trigger non si attiva mai** -- verifica che il webhook sia stato registrato davvero: in B1Admin, **Impostazioni → Sviluppatore → Webhook** dovrebbe ora mostrare una riga chiamata "Zapier — &lt;evento&gt;". Se non c'è, probabilmente la chiave API non aveva `settings:write` quando hai attivato lo Zap. Correggi la chiave, disattiva lo Zap e riattivalo.
- **Il trigger si attiva due volte** -- Zapier a volte rinvia il messaggio se è andata persa la sua conferma. Usa un passaggio "Filtro di Zapier" su un id univoco (ad esempio l'`id` della persona) se ti serve una deduplicazione rigorosa.

## Vedi anche

- [Make](./make.md) -- stesso schema, piattaforma diversa
- [Slack & Discord](./slack-discord.md) -- notifiche di chat più semplici senza Zapier
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks)
