---
title: "Chiavi API"
---

# Chiavi API {#api-keys}

<div class="article-intro">

Le chiavi API (token di accesso personali) sono il modo più semplice per autenticarsi con l'API di B1 da uno script lato server, da un connettore di terze parti (Zapier, Make, Google Sheets) o in qualsiasi situazione in cui un intero flusso OAuth sarebbe eccessivo. Una chiave è associata a una specifica persona in una specifica chiesa ed eredita i permessi di quella persona, limitati da un insieme facoltativo di ambiti.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni** crea e gestisce le chiavi
- La chiave grezza viene mostrata **una sola volta** al momento della creazione -- conservala subito in un luogo sicuro
- Tutte le richieste API devono usare **HTTPS**

</div>

## Formato della chiave {#key-format}

Una chiave API di B1 ha questo aspetto:

```
cak_<prefix>.<secret>
```

- `cak_` — identificatore fisso (il prefisso della chiave API a cui il livello di autenticazione fa corrispondenza)
- `<prefix>` — segmento pubblico di ricerca di 8 caratteri
- `<secret>` — segreto di 48 caratteri; sul server viene memorizzato solo un hash SHA-256

La chiave completa viene presentata al server nell'intestazione bearer standard:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Il livello di autenticazione dell'API instrada qualsiasi token che inizia con `cak_` al percorso delle chiavi API, calcola l'hash del segreto, lo cerca tramite il prefisso e risolve i permessi attuali della persona associata alla chiave. Quindi, revocare un permesso in B1Admin ha effetto alla richiesta successiva, e la chiave non si disallinea mai dal ruolo.

## Creare una chiave (B1Admin) {#creating-a-key-b1admin}

1. Accedi a B1Admin come utente con il permesso **Modifica impostazioni**.
2. Apri **Impostazioni → Sviluppatore → Chiavi API**.
3. Clicca **Nuova chiave API**, assegna un nome riconoscibile (ad esempio "Zapier — sincronizzazione donazioni"), seleziona gli ambiti che la chiave deve avere e clicca **Salva**.
4. La chiave completa `cak_…` viene mostrata **una sola volta** in una finestra di dialogo. Copiala nella configurazione della tua integrazione prima di chiudere: non è possibile recuperarla in seguito. Puoi sempre crearne una nuova.

## Ambiti {#scopes}

Un ambito **limita** ciò che una chiave può fare: non può mai concedere un permesso che la persona sottostante non possiede. Nessun ambito (o nessun valore) significa che la chiave ha l'intero insieme di permessi della persona.

| Ambito | Consente |
|---|---|
| `people:read` / `people:write` | Visualizzare / modificare persone, nuclei familiari, membri dei gruppi |
| `groups:read` / `groups:write` | Visualizzare / modificare gruppi e relative appartenenze |
| `donations:read` / `donations:write` | Visualizzare / registrare donazioni |
| `attendance:read` / `attendance:write` | Visualizzare / registrare presenze, sessioni, check-in |
| `forms:write` | Gestire i moduli (l'accesso in lettura è implicito in quello in scrittura) |
| `content:read` / `content:write` | Visualizzare / modificare contenuti del sito, iscrizioni, streaming |
| `messaging:read` / `messaging:write` | Leggere i messaggi; la scrittura consente anche di inviare SMS |
| `roles:read` / `roles:write` | Visualizzare / modificare le definizioni dei ruoli |
| `settings:read` / `settings:write` | Visualizzare / modificare le impostazioni della chiesa (**necessario** per registrare i webhook in modo programmatico) |
| `workflows:read` / `workflows:write` | Visualizzare flussi di lavoro e attività / eseguire e modificare i flussi di lavoro. L'esecuzione di un flusso di lavoro può inviare email e SMS, attivare webhook e modificare l'appartenenza ai gruppi |
| `offline_access` | Consente token di aggiornamento di lunga durata (solo nei flussi OAuth -- non ha effetto sulle chiavi API) |

Gli ambiti `write` includono implicitamente il corrispondente `read`. I permessi di amministratore del server e del dominio non sono intenzionalmente esposti come ambiti: una credenziale con ambiti limitati non può mai ottenere privilegi di amministrazione del sito.

:::tip
Se userai la chiave per registrare webhook (ad esempio per un'integrazione con Zapier o Make), la chiave richiede `settings:write`. Una chiave con solo `people:read` riceve silenziosamente un errore 403 su `POST /membership/webhooks`.
:::

## Usare una chiave {#using-a-key}

Come per qualsiasi token bearer: ogni endpoint autenticato accetta le chiavi API esattamente come accetta i JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Una richiesta la cui chiave ha ambiti insufficienti riceve una risposta **403 Forbidden** con la stessa struttura di qualsiasi errore di permesso negato.

## Gestire le chiavi tramite l'API {#managing-keys-via-the-api}

Tutti gli endpoint si trovano sotto il percorso `/membership/apiKeys` del modulo Membership e richiedono un JWT (non una chiave API) da parte di un amministratore della chiesa con il permesso **Modifica impostazioni**.

| Metodo e percorso | Scopo |
|---|---|
| `GET /membership/apiKeys` | Elenca le chiavi della chiesa (senza segreto -- solo `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Elenco di tutti i nomi di ambito disponibili -- per un'interfaccia di creazione delle chiavi |
| `POST /membership/apiKeys` | Crea una nuova chiave. Corpo: `{ "name": "...", "scopes": ["people:read"] }`. La risposta include la chiave grezza `cak_…` **una sola volta**. |
| `DELETE /membership/apiKeys/:id` | Revoca una chiave -- ha effetto alla richiesta successiva |

Una chiave revocata smette di funzionare immediatamente: non c'è alcun periodo di tolleranza.

## Buone pratiche {#best-practices}

- **Una chiave per integrazione.** Se qualcosa viene compromesso, revochi una sola chiave senza interrompere le altre.
- **Crea gli ambiti più ristretti che funzionano.** Un'esportazione verso Google Sheets richiede solo `people:read`, non `settings:write`.
- **Associa la chiave a un account di servizio, non a un membro reale del personale.** Se un membro del personale lascia la chiesa, il suo accesso a B1 termina -- e con esso anche tutte le chiavi create con la sua identità.
- **Conserva le chiavi in un gestore di segreti** (le variabili d'ambiente del tuo provider di hosting, AWS Secrets Manager, ecc.) -- mai nel controllo di versione.
- **Ruota le chiavi** se sospetti un'esposizione: crea una nuova chiave, aggiorna l'integrazione, poi elimina la vecchia.

## Differenze rispetto a OAuth {#how-it-differs-from-oauth}

Le chiavi API sono adatte quando **la tua chiesa è l'unica a usare l'integrazione**. Per un connettore che deve accedere a molte chiese, ciascuna con il proprio consenso esplicito -- come un'app SaaS condivisa nella comunità B1 -- usa invece [OAuth e App connesse](./connected-apps).

| | Chiave API | OAuth |
|---|---|---|
| Chi la installa | Un solo amministratore della chiesa | Ogni amministratore di chiesa autorizza l'app |
| Intestazione di autenticazione | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durata del token | Fino alla revoca | Accesso ≈ 7 giorni, aggiornamento ≈ 90 giorni |
| Ideale per | Script interni, connettori Zapier/Make/Sheets | App di terze parti multi-tenant |
