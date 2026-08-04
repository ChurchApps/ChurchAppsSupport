---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Convoglia le nuove persone, i donatori o i membri di gruppo di B1 in un pubblico Mailchimp in modo che la prossima serie di benvenuto, appello di fine anno o newsletter per volontari attinga da un elenco sempre aggiornato. B1 non ha una sincronizzazione integrata con Mailchimp — il collegamento vive interamente in Zapier (o Make): B1 attiva l'evento, Mailchimp acquisisce l'iscritto.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Mailchimp](https://mailchimp.com) con almeno un pubblico in cui vuoi che le persone di B1 vengano inviate
- Un account [Zapier](https://zapier.com) (il piano gratuito copre le chiese piccole)
- Un utente B1Admin con il permesso **Modifica impostazioni** in modo da poter generare una chiave API

</div>

## Cosa puoi collegare

| Direzione | Trigger B1 | Azione Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Aggiungi/Aggiorna iscritto |
| B1 → Mailchimp | `donation.created` | Aggiungi iscritto a tag (ad es. "Ha donato nel 2026") |
| B1 → Mailchimp | `group.member.added` | Aggiungi iscritto a tag associato a quel gruppo |
| Mailchimp → B1 | Nuovo iscritto | B1 *Crea persona* |

Il lato Mailchimp espone molto di più (campagne, segmenti, automazioni) — consulta i [trigger Zapier di Mailchimp](https://zapier.com/apps/mailchimp/integrations) per l'elenco completo. Qualsiasi cosa mappabile dalla busta di B1 è utilizzabile.

## Configurazione

### 1. Genera una chiave API B1

In B1Admin vai su **Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**. Assegnale gli ambiti di cui lo Zap ha bisogno:

- `settings:write` — richiesto perché il trigger registri il suo webhook
- `people:read` — così lo Zap può leggere nome, cognome, email, ecc.
- (Facoltativo) `people:write` se prevedi anche una direzione Mailchimp → B1

Salva e copia la stringa `cak_…` — viene mostrata una sola volta.

### 2. Costruisci lo Zap

1. **Trigger:** `B1.church — Nuova persona`. Al primo utilizzo Zapier ti chiede di *Accedere a B1.church*; incolla la chiave API.
2. **Azione:** `Mailchimp — Aggiungi/Aggiorna iscritto`. Mappa l'output del trigger:
   - `data.contactInfo.email` → Indirizzo email
   - `data.name.first` → Nome
   - `data.name.last` → Cognome
   - (Facoltativo) `data.id` → un campo di unione Mailchimp se vuoi mantenere l'id della persona di B1 associato.
3. Attiva lo Zap. Zapier registra un webhook `person.created` su B1 — verifica in **Impostazioni → Sviluppatore → Webhook** che appaia una riga chiamata "Zapier — person.created".

Ed è tutto. Aggiungi una persona in B1Admin per confermare — il nuovo iscritto appare in Mailchimp in pochi secondi.

## Ricette comuni

### Etichetta automaticamente i donatori

- **Trigger** — B1: Nuova donazione
- **Azione** — B1: Trova persona (ricerca tramite `personId`) per ottenere l'email
- **Azione** — Mailchimp: Aggiungi iscritto a tag (tag `Gave-2026`)

### Avvia una serie di benvenuto specifica per gruppo

- **Trigger** — B1: Nuovo membro del gruppo, filtrato per `data.groupId`
- **Azione** — Mailchimp: Aggiungi iscritto a tag intitolato al gruppo; attiva la tua automazione esistente da quel tag

### Bidirezionale: le nuove iscrizioni Mailchimp diventano contatti B1

- **Trigger** — Mailchimp: Nuovo iscritto
- **Azione** — B1: Crea persona (mappa Nome/Cognome/Email)

## Alternativa Make

L'[app Mailchimp](https://www.make.com/en/integrations/mailchimp) di Make copre 44 moduli — il collegamento è identico, con il trigger *Osserva eventi* di B1 che sostituisce quello di Zapier. Consulta il [documento di panoramica Make](../make) per il lato B1.

## Limiti e note

- **Il piano gratuito di Mailchimp limita contatti e pubblici** — uno Zap che inonda un pubblico gratuito oltre il suo limite inizierà a generare errori `4xx Member limit reached`. I log di Mailchimp lo rendono evidente.
- **Mailchimp deduplica per email**, quindi rieseguire uno Zap sulla stessa persona di B1 la aggiorna sul posto; non crea duplicati.
- **Le disiscrizioni da Mailchimp non tornano indietro verso B1.** Se vuoi che le disiscrizioni Mailchimp cancellino la preferenza "Invia email" di B1, costruisci esplicitamente lo Zap inverso.

## Risoluzione dei problemi

- **Lo Zap non si attiva mai** — controlla `Impostazioni → Sviluppatore → Webhook` per la riga `Zapier — person.created`. Se assente, alla chiave API mancava `settings:write` quando lo Zap è stato attivato. Rigenera, riconnetti, disattiva e riattiva lo Zap.
- **Avviso `Member exists` su Aggiungi/Aggiorna** — cambia l'azione da *Aggiungi iscritto* a *Aggiungi/Aggiorna iscritto* (il verbo conta). La variante upsert è idempotente.
- **Nome / cognome arrivano vuoti** — `data.name.first` e `data.name.last` di B1 sono popolati solo se quei campi sono impostati sulla persona. Mappa `data.name.display` come alternativa.

## Vedi anche

- [Zapier (panoramica)](../zapier) — il lato B1 di ogni ricetta Zapier
- [Make (panoramica)](../make) — stessa idea, builder visuale
- [Webhook (riferimento sviluppatore)](/docs/developer/api/webhooks#event-catalog)
