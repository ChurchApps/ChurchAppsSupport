---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Incanalare nuove persone B1, donatori o membri del gruppo in un'audience Mailchimp in modo che la prossima serie di benvenuto, appello di fine anno o newsletter per volontari attinga da un elenco sempre aggiornato. Il collegamento vive interamente in Zapier (o Make) — B1 attiva l'evento, Mailchimp ingerisce l'abbonato.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Mailchimp](https://mailchimp.com) con almeno un'audience in cui desideri spingere le persone B1
- Un account [Zapier](https://zapier.com) (il livello gratuito copre le piccole chiese)
- Un utente B1Admin con autorizzazione **Modifica impostazioni** in modo da poter creare una chiave API

</div>

## Cosa puoi collegare

| Direzione | Trigger B1 | Azione Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Aggiungi/aggiorna sottoscrittore |
| B1 → Mailchimp | `donation.created` | Aggiungi sottoscrittore al tag (ad es. "Donato nel 2026") |
| B1 → Mailchimp | `group.member.added` | Aggiungi sottoscrittore al tag scoped a quel gruppo |
| Mailchimp → B1 | Nuovo sottoscrittore | B1 *Crea persona* |

Il lato Mailchimp espone molto di più (campagne, segmenti, automazioni) — vedi i [trigger Zapier di Mailchimp](https://zapier.com/apps/mailchimp/integrations) per l'elenco completo. Tutto ciò che è mappabile dall'envelope B1 è un gioco corretto.

## Configurazione

### 1. Crea una chiave API B1

In B1Admin vai a **Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Dagli gli ambiti di cui lo Zap ha bisogno:

- `settings:write` — richiesto per il webhook del trigger per registrare
- `people:read` — in modo che lo Zap possa leggere nome/cognome, email, ecc.
- (Facoltativo) `people:write` se pianifichi anche una direzione Mailchimp → B1

Salva e copia la stringa `cak_…` — è mostrata solo una volta.

### 2. Costruisci lo Zap

1. **Trigger:** `B1.church — Nuova persona`. Al primo utilizzo Zapier ti chiede di *Accedi a B1.church*; incolla la chiave API.
2. **Azione:** `Mailchimp — Aggiungi/aggiorna sottoscrittore`. Mappa l'output del trigger:
   - `data.contactInfo.email` → Indirizzo email
   - `data.name.first` → Nome
   - `data.name.last` → Cognome
   - (Facoltativo) `data.id` → un campo di unione Mailchimp se desideri mantenere l'id della persona di B1 insieme.
3. Attiva lo Zap. Zapier registra un webhook `person.created` su B1 — verifica in **Impostazioni → Sviluppatore → Webhook** che appaia una riga denominata "Zapier — person.created".

È tutto. Aggiungi una persona in B1Admin per confermare — il nuovo sottoscrittore appare in Mailchimp entro pochi secondi.

## Ricette comuni

### Tagga i donatori automaticamente

- **Trigger** — B1: Nuova donazione
- **Azione** — B1: Trova persona (ricerca per `personId`) per ottenere l'email
- **Azione** — Mailchimp: Aggiungi sottoscrittore al tag (tag `Gave-2026`)

### Riduci una serie di benvenuto specifica del gruppo

- **Trigger** — B1: Nuovo membro del gruppo, filtrato da `data.groupId`
- **Azione** — Mailchimp: Aggiungi sottoscrittore al tag denominato dopo il gruppo; attiva la tua automazione esistente da quel tag

### Bidirezionale: i nuovi iscritti Mailchimp diventano contatti B1

- **Trigger** — Mailchimp: Nuovo sottoscrittore
- **Azione** — B1: Crea persona (mappa Nome/Cognome/Email)

## Alternativa Make

L'[app Mailchimp](https://www.make.com/en/integrations/mailchimp) di Make copre 44 moduli — il collegamento è identico, con il trigger B1 *Monitora eventi* che sostituisce quello di Zapier. Vedi il [documento di panoramica Make](../make) per il lato B1.

## Limiti e note

- **Il livello gratuito di Mailchimp limita i contatti e le audience** — uno Zap che allaga un'audience gratuita oltre il suo limite inizierà a errare con `4xx Limite membro raggiunto`. I log di Mailchimp rendono questo ovvio.
- **Mailchimp deduplicates per email**, quindi ri-eseguire uno Zap sulla stessa persona B1 li aggiorna in posizione; non crea duplicati.
- **Gli annullamenti dell'iscrizione da Mailchimp non fluiscono indietro a B1.** Se desideri che gli annullamenti dell'iscrizione di Mailchimp cancellino la preferenza "Invia mail" di B1, costruisci lo Zap inverso esplicitamente.

## Risoluzione dei problemi

- **Lo Zap non si attiva mai** — controlla `Impostazioni → Sviluppatore → Webhook` per la riga `Zapier — person.created`. Se assente, la chiave API mancava `settings:write` quando lo Zap era attivato. Ri-crea, ri-collega, disattiva e attiva lo Zap.
- **Avviso `Membro esiste` su Aggiungi/aggiorna** — cambia l'azione da *Aggiungi sottoscrittore* a *Aggiungi/aggiorna sottoscrittore* (il verbo è importante). La variante upsert è idempotente.
- **Nome / cognome arrivano in bianco** — `data.name.first` e `data.name.last` di B1 vengono popolati solo se quei campi sono impostati sulla persona. Mappa `data.name.display` come fallback.

## Vedi anche

- [Zapier (panoramica)](../zapier) — il lato B1 di ogni ricetta Zapier
- [Make (panoramica)](../make) — stessa idea, builder visivo
- [Webhook (riferimento per sviluppatori)](/docs/developer/api/webhooks#event-catalog)
