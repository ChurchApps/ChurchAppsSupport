---
title: "Chiavi API"
---

# Chiavi API

<div class="article-intro">

Le chiavi API (token di accesso personali) sono il modo più semplice per autenticarsi con l'API B1 da uno script lato server, da un connettore di terze parti (Zapier, Make, Google Sheets) o in qualsiasi situazione in cui un flusso OAuth completo sarebbe eccessivo. Una chiave è associata a una persona specifica in una specifica chiesa ed eredita i permessi di quella persona, limitati da un eventuale insieme di scope opzionali.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni** crea e gestisce le chiavi
- La chiave in chiaro viene mostrata **una sola volta** al momento della creazione — conservala subito in un luogo sicuro
- Tutte le richieste API devono usare **HTTPS**

</div>

## Formato della chiave

Una chiave API B1 ha questo aspetto:

```
cak_<prefix>.<secret>
```

- `cak_` — identificatore fisso (il prefisso della chiave API a cui il livello di autenticazione fa riferimento)
- `<prefix>` — segmento pubblico di ricerca di 8 caratteri
- `<secret>` — segreto di 48 caratteri; sul server viene memorizzato solo un hash SHA-256

La chiave completa viene presentata al server nell'header bearer standard:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Il livello di autenticazione dell'API instrada qualsiasi token che inizia con `cak_` verso il percorso delle chiavi API, calcola l'hash del segreto, lo cerca tramite il prefisso e risolve i permessi attuali della persona associata alla chiave — quindi revocare un permesso in B1Admin ha effetto alla richiesta successiva, e la chiave non si disallinea mai dal ruolo.

## Creare una chiave (B1Admin)

1. Accedi a B1Admin come utente con il permesso **Modifica impostazioni**.
2. Apri **Impostazioni → Sviluppatore → Chiavi API**.
3. Fai clic su **Nuova chiave API**, assegna un nome riconoscibile (ad esempio "Zapier — sincronizzazione donazioni"), seleziona gli scope che la chiave deve avere e fai clic su **Salva**.
4. La chiave `cak_…` completa viene mostrata **una sola volta** in una finestra di dialogo. Copiala nella configurazione della tua integrazione prima di chiudere — non è possibile recuperarla in seguito. Puoi sempre creare una nuova chiave.

## Scope

Uno scope **limita** ciò che una chiave può fare — non può mai concedere un permesso che la persona sottostante non ha. Nessuno scope (o scope vuoti) significa che la chiave ha l'intero insieme di permessi della persona.

| Scope | Consente |
|---|---|
| `people:read` / `people:write` | Visualizzare / modificare persone, nuclei familiari, membri dei gruppi |
| `groups:read` / `groups:write` | Visualizzare / modificare gruppi e relative iscrizioni |
| `donations:read` / `donations:write` | Visualizzare / registrare donazioni |
| `attendance:read` / `attendance:write` | Visualizzare / registrare presenze, sessioni, check-in |
| `forms:write` | Gestire i moduli (l'accesso in lettura è implicito in scrittura) |
| `content:read` / `content:write` | Visualizzare / modificare i contenuti del sito, iscrizioni, streaming |
| `messaging:read` / `messaging:write` | Leggere i messaggi; la scrittura consente anche di inviare SMS |
| `roles:read` / `roles:write` | Visualizzare / modificare le definizioni dei ruoli |
| `settings:read` / `settings:write` | Visualizzare / modificare le impostazioni della chiesa (**necessario** per registrare webhook in modo programmatico) |
| `workflows:read` / `workflows:write` | Visualizzare flussi di lavoro e attività / eseguire e modificare flussi di lavoro. L'esecuzione di un flusso di lavoro può inviare email e SMS, attivare webhook e modificare l'appartenenza ai gruppi |
| `offline_access` | Consente refresh token di lunga durata (solo flussi OAuth — non ha effetto sulle chiavi API) |

Gli scope `write` includono implicitamente il corrispondente `read`. I permessi di amministratore del server e del dominio non sono volutamente esposti come scope — una credenziale con scope non può mai elevarsi all'amministrazione del sito.

:::tip
Se userai la chiave per registrare webhook (ad esempio per un'integrazione Zapier o Make), la chiave richiede `settings:write`. Una chiave con solo `people:read` restituisce silenziosamente 403 su `POST /membership/webhooks`.
:::

## Usare una chiave

Come qualsiasi token bearer — ogni endpoint autenticato accetta le chiavi API esattamente come accetta i JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Una richiesta la cui chiave ha scope insufficienti riceve una risposta **403 Forbidden** con la stessa struttura usata per qualsiasi errore di permesso negato.

## Gestire le chiavi tramite API

Tutti gli endpoint si trovano sotto il percorso `/membership/apiKeys` del modulo Membership e richiedono un JWT (non una chiave API) di un amministratore della chiesa con il permesso **Modifica impostazioni**.

| Metodo e percorso | Scopo |
|---|---|
| `GET /membership/apiKeys` | Elenca le chiavi della chiesa (senza segreto — solo `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Elenco di tutti i nomi di scope disponibili — per un'interfaccia di creazione delle chiavi |
| `POST /membership/apiKeys` | Crea una nuova chiave. Corpo: `{ "name": "...", "scopes": ["people:read"] }`. La risposta include la chiave `cak_…` in chiaro **una sola volta**. |
| `DELETE /membership/apiKeys/:id` | Revoca una chiave — ha effetto alla richiesta successiva |

Una chiave revocata viene eliminata immediatamente — non c'è alcun periodo di tolleranza.

## Buone pratiche

- **Una chiave per integrazione.** Se qualcosa viene compromesso, revochi una sola chiave senza interrompere le altre.
- **Crea gli scope più ristretti che funzionano.** Un export su Google Sheets richiede solo `people:read`, non `settings:write`.
- **Associa la chiave a un account di servizio, non a un membro reale del personale.** Se un membro del personale lascia la chiesa, il suo accesso a B1 termina — e con esso anche le chiavi create con la sua identità.
- **Conserva le chiavi in un gestore di segreti** (le variabili d'ambiente del tuo provider di hosting, AWS Secrets Manager, ecc.) — mai nel controllo di versione.
- **Ruota le chiavi** se sospetti un'esposizione: crea una nuova chiave, aggiorna l'integrazione, poi elimina quella vecchia.

## Differenze rispetto a OAuth

Le chiavi API sono appropriate quando **la tua chiesa è l'unica a usare l'integrazione**. Per un connettore che deve accedere a molte chiese, ciascuna con il proprio consenso esplicito — come un'app SaaS condivisa nella comunità B1 — usa invece [OAuth e App connesse](./connected-apps).

| | Chiave API | OAuth |
|---|---|---|
| Chi la installa | Un amministratore della chiesa | Ogni amministratore della chiesa autorizza l'app |
| Header di autenticazione | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durata del token | Fino alla revoca | Accesso ≈ 7 giorni, refresh ≈ 90 giorni |
| Ideale per | Script interni, connettori Zapier/Make/Sheets | App di terze parti multi-tenant |
