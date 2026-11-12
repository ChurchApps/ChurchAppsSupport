---
title: "Chiavi API"
description: "Crea, limita e revoca le chiavi API di B1 in B1 Admin per script server e connettori Zapier, Make o Google Sheets, senza un flusso OAuth completo."
---

# Chiavi API

<div class="article-intro">

Le chiavi API (token di accesso personali) sono il modo più semplice per autenticarsi con l'API di B1 da uno script lato server, da un connettore di terze parti (Zapier, Make, Google Sheets) o in qualsiasi situazione in cui un flusso OAuth completo sarebbe eccessivo. Una chiave è legata a una persona specifica in una chiesa specifica ed eredita i permessi di quella persona, ristretti da un insieme facoltativo di ambiti (scope).

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni** crea e gestisce le chiavi
- La chiave completa viene mostrata **una sola volta** al momento della creazione -- conservala subito in un posto sicuro
- Tutte le richieste API devono usare **HTTPS**

</div>

## Formato della chiave {#key-format}

Una chiave API di B1 ha questo aspetto:

```
cak_<prefix>.<secret>
```

- `cak_` -- identificatore fisso (il prefisso delle chiavi API che il livello di autenticazione riconosce)
- `<prefix>` -- segmento pubblico di ricerca di 8 caratteri
- `<secret>` -- segreto di 48 caratteri; sul server viene memorizzato solo un hash SHA-256

La chiave completa viene presentata al server nell'intestazione bearer standard:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Il livello di autenticazione dell'API instrada qualsiasi token che inizia con `cak_` verso il percorso delle chiavi API, calcola l'hash del segreto, lo cerca tramite il prefisso e risolve i permessi attuali della persona associata alla chiave. Quindi revocare un permesso in B1Admin ha effetto già dalla richiesta successiva, e la chiave non si disallinea mai dal ruolo.

## Creare una chiave (B1Admin) {#creating-a-key-b1admin}

1. Accedi a B1Admin con un utente che ha il permesso **Modifica impostazioni**.
2. Apri **Impostazioni → Sviluppatore → Chiavi API**.
3. Clicca su **Nuova chiave API**, assegnale un **Nome** riconoscibile (ad esempio "Zapier -- sincronizzazione donazioni"), seleziona almeno uno degli **Ambiti** che la chiave deve avere, facoltativamente scegli una data di **Scadenza** (lasciala vuota per una chiave che non scade mai), poi **Salva**.
4. La chiave completa `cak_…` viene mostrata **una sola volta** in una finestra di dialogo. Copiala nella configurazione della tua integrazione prima di chiudere: non è possibile recuperarla in seguito. Puoi sempre crearne una nuova.

## Ambiti {#scopes}

Un ambito **restringe** ciò che una chiave può fare: non può mai concedere un permesso che la persona sottostante non ha. Nessun ambito significa che la chiave porta l'intero insieme di permessi della persona; B1Admin richiede sempre almeno un ambito, quindi una chiave senza ambiti può essere creata solo tramite l'API.

| Ambito | Consente |
|---|---|
| `people:read` / `people:write` | Visualizzare / modificare persone, nuclei familiari, membri dei gruppi |
| `groups:read` / `groups:write` | Visualizzare / modificare gruppi e relative iscrizioni |
| `donations:read` / `donations:write` | Visualizzare / registrare donazioni |
| `attendance:read` / `attendance:write` | Visualizzare / registrare presenze, sessioni, check-in |
| `forms:write` | Gestire i moduli (l'accesso in lettura è implicito nella scrittura) |
| `content:read` / `content:write` | Visualizzare / modificare contenuti del sito, iscrizioni, streaming |
| `messaging:read` / `messaging:write` | Leggere la messaggistica; la scrittura consente anche di inviare SMS |
| `roles:read` / `roles:write` | Visualizzare / modificare le definizioni dei ruoli |
| `settings:read` / `settings:write` | Visualizzare / modificare le impostazioni della chiesa (**necessario** per registrare webhook da programma) |
| `workflows:read` / `workflows:write` | Visualizzare flussi di lavoro e attività / eseguire e modificare flussi di lavoro. L'esecuzione di un flusso può inviare email e SMS, attivare webhook e modificare l'appartenenza ai gruppi |
| `offline_access` | Consente token di aggiornamento a lunga durata (solo flussi OAuth -- non ha effetto sulle chiavi API) |

Gli ambiti `write` includono implicitamente il corrispondente `read`. I permessi di amministratore del server e del dominio non sono volutamente esposti come ambiti: una credenziale con ambiti limitati non potrà mai ottenere privilegi di amministrazione del sito.

:::tip
Se userai la chiave per registrare webhook (ad esempio per un'integrazione Zapier o Make), la chiave deve avere `settings:write`. Una chiave con solo `people:read` riceve silenziosamente un errore 403 su `POST /membership/webhooks`.
:::

## Usare una chiave {#using-a-key}

Come per qualsiasi token bearer: ogni endpoint autenticato accetta le chiavi API esattamente come accetta i JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Una richiesta la cui chiave ha ambiti insufficienti risponde **403 Forbidden** con la stessa struttura usata per qualsiasi errore di permesso negato.

## Gestire le chiavi tramite l'API {#managing-keys-via-the-api}

Tutti gli endpoint si trovano sotto il percorso `/membership/apiKeys` del modulo Membership e richiedono un JWT (non una chiave API) di un amministratore della chiesa con **Modifica impostazioni**.

| Metodo e percorso | Scopo |
|---|---|
| `GET /membership/apiKeys` | Elenca le chiavi della chiesa (senza segreto -- solo `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Elenco di tutti i nomi di ambito disponibili -- per un'interfaccia di creazione delle chiavi |
| `POST /membership/apiKeys` | Crea una nuova chiave. Corpo: `{ "name": "...", "scopes": ["people:read"] }`. La risposta include la chiave `cak_…` completa **una sola volta**. |
| `DELETE /membership/apiKeys/:id` | Revoca una chiave -- ha effetto dalla richiesta successiva |

Una chiave revocata smette di funzionare immediatamente: non c'è alcun periodo di tolleranza.

## Buone pratiche {#best-practices}

- **Una chiave per integrazione.** Se una chiave viene compromessa, la revochi senza interrompere le altre.
- **Crea gli ambiti più ristretti possibili.** Un export su Google Sheets ha bisogno solo di `people:read`, non di `settings:write`.
- **Associa la chiave a un account di servizio, non a un membro dello staff reale.** Se un membro dello staff lascia la chiesa, il suo accesso a B1 termina -- e con esso anche le chiavi create con la sua identità.
- **Conserva le chiavi in un gestore di segreti** (le variabili d'ambiente del tuo provider di hosting, AWS Secrets Manager e simili) -- mai nel controllo di versione.
- **Ruota le chiavi** se sospetti una esposizione: crea una nuova chiave, aggiorna l'integrazione, poi elimina quella vecchia.

## Differenze rispetto a OAuth {#how-it-differs-from-oauth}

Le chiavi API sono adatte quando **la tua chiesa è l'unica a usare l'integrazione**. Per un connettore che deve accedere a molte chiese, ciascuna con il proprio consenso esplicito -- come un'app SaaS condivisa nella comunità B1 -- usa invece [OAuth e App connesse](./connected-apps.md).

| | Chiave API | OAuth |
|---|---|---|
| Chi la installa | Un amministratore di una sola chiesa | Ogni amministratore della chiesa autorizza l'app |
| Intestazione di autenticazione | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durata del token | Fino alla revoca | Accesso ≈ 7 giorni, aggiornamento ≈ 90 giorni |
| Ideale per | Script interni, connettori Zapier/Make/Sheets | App di terze parti multi-tenant |
