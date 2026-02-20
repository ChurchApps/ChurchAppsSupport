---
title: "Riferimento Endpoint"
---

# Riferimento Endpoint

<div class="article-intro">

Questa sezione documenta tutti gli endpoint REST esposti dall'API di ChurchApps. Ogni pagina del modulo elenca ogni route con il metodo HTTP, il percorso, i requisiti di autenticazione e i permessi necessari.

</div>

## URL di Base

| Ambiente | URL |
|----------|-----|
| Sviluppo locale | `http://localhost:8084` |
| Produzione | `https://api.churchapps.org` |

## Convenzioni delle Richieste

- **Content-Type:** Tutti i body di richiesta e risposta usano `application/json`
- **Multi-tenant:** Ogni richiesta autenticata è delimitata a un `churchId` estratto dal token JWT -- non passi `churchId` nell'URL
- **Salvataggi batch:** La maggior parte degli endpoint `POST` accetta un **array di oggetti**. L'API inserirà nuovi record (senza campo `id`) e aggiornerà quelli esistenti (con campo `id`) in una singola chiamata
- **ID:** Tutti gli ID delle entità sono UUID

### Esempio: Salvataggio Batch

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Il primo oggetto viene creato (nuovo); il secondo viene aggiornato (ha `id`).

## Formato della Risposta

Le risposte di successo restituiscono JSON -- un singolo oggetto o un array. Le risposte di errore usano codici di stato HTTP standard:

| Codice | Significato |
|--------|-------------|
| `200` | Successo |
| `400` | Richiesta non valida (errori di validazione) |
| `401` | Non autorizzato (token mancante/non valido o permessi insufficienti) |
| `404` | Non trovato |
| `500` | Errore del server |

Gli errori di validazione restituiscono:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Come Leggere le Tabelle degli Endpoint

Ogni pagina del modulo organizza gli endpoint per controller. Le tabelle usano queste colonne:

| Colonna | Descrizione |
|---------|-------------|
| **Metodo** | Metodo HTTP (`GET`, `POST`, `DELETE`) |
| **Percorso** | Percorso della route relativo al percorso base del controller |
| **Auth** | **JWT** = richiede Bearer token, **Public** = nessuna autenticazione richiesta |
| **Permesso** | Permesso richiesto (es. `People.Edit`). `—` significa qualsiasi utente autenticato |
| **Descrizione** | Cosa fa l'endpoint |

I controller che estendono la classe base CRUD standard forniscono automaticamente quattro endpoint: `GET /` (lista tutti), `GET /:id` (ottieni per ID), `POST /` (crea/aggiorna) e `DELETE /:id` (elimina).

## Modulo Reporting

Il modulo Reporting funziona diversamente dagli altri moduli. Invece di CRUD supportato da database, carica le definizioni dei report da file JSON su disco ed esegue query SQL parametrizzate.

| Metodo | Percorso | Auth | Descrizione |
|--------|----------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Carica una definizione di report per nome chiave |
| GET | `/reporting/reports/:keyName/run` | JWT | Esegue un report e restituisce i risultati |

I parametri del report vengono passati come valori nella query string (es. `?startDate=2024-01-01&endDate=2024-12-31`). Il parametro `churchId` viene iniettato automaticamente dal token JWT. Ogni definizione di report può specificare i propri requisiti di permesso.

## Indice dei Moduli

| Modulo | Percorso Base | Descrizione |
|--------|---------------|-------------|
| [Autenticazione](./authentication) | `/membership/users`, `/membership/oauth` | Login, registrazione, token JWT, OAuth, permessi |
| [Membership](./membership) | `/membership/*` | Persone, chiese, gruppi, nuclei familiari, ruoli, moduli, impostazioni |
| [Attendance](./attendance) | `/attendance/*` | Sedi, servizi, sessioni, visite, registrazioni presenze |
| [Content](./content) | `/content/*` | Pagine, sermoni, eventi, file, gallerie, Bibbia, streaming |
| [Giving](./giving) | `/giving/*` | Donazioni, fondi, gateway di pagamento, abbonamenti |
| [Messaging](./messaging) | `/messaging/*` | Conversazioni, notifiche, dispositivi, SMS |
| [Doing](./doing) | `/doing/*` | Piani, attività, assegnazioni, automazioni, pianificazione |
