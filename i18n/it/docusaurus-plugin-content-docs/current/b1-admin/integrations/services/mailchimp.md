---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Inserisci i nuovi persone B1, donatori o membri del gruppo in un'audience Mailchimp in modo che la prossima serie di benvenuto, appello di fine anno o newsletter dei volontari provenga da un elenco sempre aggiornato. B1 non ha una sincronizzazione Mailchimp integrata -- il cablaggio vive interamente in Zapier (o Make): B1 attiva l'evento, Mailchimp ingerisce il sottoscrittore.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Mailchimp](https://mailchimp.com) con almeno un'audience in cui desideri che le persone B1 vengano inserite
- Un account [Zapier](https://zapier.com) (il livello gratuito copre le piccole chiese)
- Un utente B1Admin con autorizzazione **Modifica impostazioni** in modo da poter creare una chiave API

</div>

## Cosa puoi collegare

| Direzione | B1 trigger | Azione Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Aggiungi/Aggiorna sottoscrittore |
| B1 → Mailchimp | `donation.created` | Aggiungi sottoscrittore al tag (ad es. "Ha dato nel 2026") |
| B1 → Mailchimp | `group.member.added` | Aggiungi sottoscrittore al tag relativo a quel gruppo |
| Mailchimp → B1 | Nuovo sottoscrittore | B1 *Crea persona* |

Il lato Mailchimp espone molto di più (campagne, segmenti, automazioni) -- vedi i [trigger Zapier di Mailchimp](https://zapier.com/apps/mailchimp/integrations) per l'elenco completo. Qualsiasi cosa mappabile dall'inviluppo B1 è accettabile.

## Configurazione

### 1. Crea una chiave API B1

In B1Admin vai a **Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Assegnagli gli ambiti di cui lo Zap ha bisogno:

- `settings:write` — obbligatorio affinché il trigger registri il suo webhook
- `people:read` — in modo che lo Zap possa leggere il nome/cognome, l'email, ecc.
- (Opzionale) `people:write` se pianifichi anche una direzione Mailchimp → B1

Salva e copia la stringa `cak_…` -- viene mostrata solo una volta.

### 2. Costruisci lo Zap

1. **Trigger:** `B1.church — Nuova persona`. Al primo utilizzo, Zapier ti chiede di *Accedi a B1.church*; incolla la chiave API.
2. **Azione:** `Mailchimp — Aggiungi/Aggiorna sottoscrittore`. Mappa l'output del trigger:
   - `data.contactInfo.email` → Indirizzo email
   - `data.name.first` → Nome
   - `data.name.last` → Cognome
   - (Opzionale) `data.id` → un campo di fusione Mailchimp se desideri mantenere l'id della persona B1 accanto.
3. Attiva lo Zap. Zapier registra un webhook `person.created` su B1 -- verifica in **Impostazioni → Sviluppatore → Webhook** che appaia una riga denominata "Zapier — person.created".

Questo è tutto. Aggiungi una persona in B1Admin per confermare -- il nuovo sottoscrittore appare in Mailchimp entro pochi secondi.

## Ricette comuni

### Tag dei donatori automaticamente

- **Trigger** — B1: Nuova donazione
- **Azione** — B1: Trova persona (cercata per `personId`) per ottenere l'email
- **Azione** — Mailchimp: Aggiungi sottoscrittore al tag (tag `Gave-2026`)

### Elimina una serie di benvenuto specifica del gruppo

- **Trigger** — B1: Nuovo membro del gruppo, filtrato per `data.groupId`
- **Azione** — Mailchimp: Aggiungi sottoscrittore al tag denominato dal gruppo; attiva il tuo'automazione esistente al di fuori di quel tag

### Bidirezionale: i nuovi iscritti Mailchimp diventano contatti B1

- **Trigger** — Mailchimp: Nuovo sottoscrittore
- **Azione** — B1: Crea persona (mappa Nome/Cognome/Email)

## Alternativa Make

L'app [Mailchimp di Make](https://www.make.com/en/integrations/mailchimp) copre 44 moduli -- il cablaggio è identico, con il trigger B1 *Watch Events* che sostituisce quello di Zapier. Vedi il [documento di panoramica Make](../make) per il lato B1.

## Limiti e note

- **Il livello gratuito di Mailchimp limita contatti e audience** -- uno Zap che allaga un'audience gratuita oltre il suo limite inizierà a dare errori con `4xx Member limit reached`. I registri di Mailchimp rendono questo ovvio.
- **Mailchimp deduplicates per email**, quindi re-eseguire uno Zap sulla stessa persona B1 li aggiorna sul posto; non crea duplicati.
- **Gli iscritti di Mailchimp non tornano a B1.** Se desideri che gli iscritti di Mailchimp cancellino la preferenza "Invia posta" di B1, costruisci esplicitamente lo Zap inverso.

## Risoluzione dei problemi

- **Lo Zap non si attiva mai** -- controlla `Impostazioni → Sviluppatore → Webhook` per la riga `Zapier — person.created`. Se assente, la chiave API mancava `settings:write` quando lo Zap si è acceso. Ricrea, ricollega, attiva/disattiva lo Zap.
- **avviso `Member exists` su Aggiungi/Aggiorna** -- cambia l'azione da *Aggiungi sottoscrittore* a *Aggiungi/Aggiorna sottoscrittore* (il verbo conta). La variante upsert è idempotente.
- **Il nome / cognome viene fornito vuoto** -- B1 `data.name.first` e `data.name.last` vengono popolati solo se questi campi sono impostati sulla persona. Mappa `data.name.display` come fallback.

## Vedi anche

- [Zapier (overview)](../zapier) -- il lato B1 di ogni ricetta Zapier
- [Make (overview)](../make) -- stessa idea, generatore visuale
- [Webhooks (developer reference)](/docs/developer/api/webhooks#event-catalog)
