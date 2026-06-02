---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) raggruppa SMS più flussi di lavoro goccia e automazioni di schede di contatto. La sua app Zapier espone entrambe le direzioni — inserisci gli eventi B1 in un flusso di lavoro Text In Church, e tira i trigger di scheda di contatto o nuovo contatto dall'altro lato in B1.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account [Text In Church](https://textinchurch.com) su un piano che include l'integrazione Zapier
- Un account [Zapier](https://zapier.com)
- Un utente B1Admin con autorizzazione **Modifica impostazioni**

</div>

## Cosa puoi collegare

| Direzione | Trigger | Azione |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Crea/aggiorna persona + Aggiungi al gruppo |
| B1 → Text In Church | B1 `form.submission.created` | Invia messaggio di testo tramite il team pertinente |
| B1 → Text In Church | B1 `group.member.added` | Aggiungi al gruppo (specchia l'iscrizione al gruppo) |
| Text In Church → B1 | Scheda di contatto inviata | B1: Crea persona + Aggiungi membro del gruppo |
| Text In Church → B1 | Persona creata | B1: Crea persona |
| Text In Church → B1 | Persona aderita al gruppo | B1: Aggiungi membro del gruppo |

Le azioni di Text In Church includono anche *Invia messaggio di testo*, *Invia broadcast vocale*, *Crea attività*, *Trova persona/gruppo*, e aggiungi/rimuovi iscrizione al gruppo.

## Configurazione

### 1. Crea una chiave API B1

**Impostazioni → Sviluppatore → Chiavi API → Nuova chiave API**:

- `settings:write` — richiesto per Zap attivati da B1
- `people:read`, `people:write` — per trovare o creare la persona
- `groups:write` — per la sincronizzazione dei gruppi
- (Facoltativo) `donations:write` se collegi le conferme di regali a TIC

### 2. Collega Text In Church a Zapier

Segui la [guida di integrazione Zapier di Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Generano un token API dal dashboard di TIC.

### 3. Costruisci lo Zap di scheda di contatto a B1

La direzione più comune. Le schede di contatto sparate da TIC diventano automaticamente nuove persone B1.

1. **Trigger** — Text In Church: Scheda di contatto inviata.
2. **Azione** — B1.church: Trova persona (per email).
3. **Percorso** — biforca su trovato / non trovato:
   - Non trovato → B1.church: Crea persona.
   - Trovato → continua.
4. **Azione** — B1.church: Aggiungi membro del gruppo a un gruppo "Nuovo contatto".

Attiva lo Zap. La prossima scheda di contatto inviata tramite TIC entra in **B1Admin → Persone** automaticamente.

## Ricette comuni

### Attiva un flusso di lavoro di tipo scheda di contatto da un modulo B1

- **Trigger** — B1.church: Nuovo invio di modulo (filtro sull'id del modulo "Sono nuovo qui")
- **Azione** — Text In Church: Crea/aggiorna persona, mappando le risposte email / telefono / nome del modulo
- **Azione** — Text In Church: Aggiungi al gruppo, dove il gruppo ha un flusso di lavoro di benvenuto pre-costruito allegato

### Specchia l'iscrizione al gruppo

- **Trigger** — B1.church: Nuovo membro del gruppo, filtrato su un `groupId` specifico
- **Azione** — Text In Church: Aggiungi al gruppo (stessa persona, specchio gruppo). Abbinare con uno Zap `group.member.removed` se desideri la sincronizzazione completa.

### Pagina un leader quando qualcuno si unisce

- **Trigger** — B1.church: Nuovo membro del gruppo
- **Azione** — Text In Church: Invia messaggio di testo, destinatario = numero di telefono del leader del gruppo, corpo = `"{first} {last} ha appena unito {group}"`.

## Limiti e note

- **L'app Zapier di TIC è gated dietro il livello del piano.** Se l'integrazione Zapier è in grigio nel dashboard di TIC, contatta l'assistenza TIC per abilitarla sul tuo piano.
- **Gli id dei gruppi sono TIC, non B1.** Quando specchi, manterrai una tabella di mappatura da qualche parte (una *Lookup Table* di Zapier, o hard-coded per Zap).
- **Invia messaggio di testo costa crediti.** Ogni Zap che attiva *Invia testo* consuma dalla tua indennità SMS di TIC.

## Risoluzione dei problemi

- **Il trigger di scheda di contatto non si attiva** — TIC ha bisogno che l'interruttore di integrazione Zapier sia attivo. Inoltre verifica che il modulo che hai testato sia configurato come "Scheda di contatto", non come un sondaggio generico.
- **Crea persona in B1 non riesce con 401** — la chiave API è sbagliata, revocata o manca `people:write`. Ri-crea.
- **Persone B1 duplicate** — TIC invia sia *Persona creata* che *Scheda di contatto inviata* per lo stesso evento. Scegli uno come fonte di verità e aggiungi un filtro Zapier sull'altro.

## Vedi anche

- [Clearstream](./clearstream) — piattaforma SMS alternativa con forma Zapier simile
- [Zapier (panoramica)](../zapier) — lato B1 di ogni ricetta Zapier
- [Guida Zapier di Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentazione di TIC)
