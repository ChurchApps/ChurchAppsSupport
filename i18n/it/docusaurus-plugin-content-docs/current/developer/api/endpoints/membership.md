---
title: "Endpoint di Iscrizione"
---

# Endpoint di Iscrizione

<div class="article-intro">

Il modulo Membership gestisce le persone, le chiese, i gruppi, le famiglie, i ruoli, le autorizzazioni, i moduli e le impostazioni. È il modulo più grande e fornisce il layer di identità e autorizzazione di base per tutti gli altri moduli.

</div>

**Percorso di base:** `/membership`

## Persone

Percorso di base: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | Elenca tutte le persone |
| GET | `/:id` | JWT | People.View or own record | Ottenere una persona per ID |
| POST | `/` | JWT | People.Edit or EditSelf | Creare o aggiornare persone |
| DELETE | `/:id` | JWT | People.Edit | Eliminare una persona |

## Utenti

Percorso di base: `/membership/users`

Vedi Authentication & Permissions per i dettagli di accesso e registrazione.

## Chiese

Percorso di base: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Carica tutte le chiese per l'utente corrente |
| GET | `/:id` | JWT | — | Ottenere chiesa per ID |
| POST | `/` | JWT | Settings.Edit | Aggiorna i dettagli della chiesa |

## Articoli Correlati

- [Authentication & Permissions](./authentication)
- [Attendance Endpoints](./attendance)
