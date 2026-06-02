---
title: "Chiavi API"
---

# Chiavi API

<div class="article-intro">

Le chiavi API (token di accesso personali) sono il modo più semplice per autenticarsi rispetto all'API B1 da uno script lato server, un connettore di terze parti (Zapier, Make, Google Sheets), o ovunque un flusso OAuth completo sia eccessivo. Una chiave è vincolata a una persona specifica in una chiesa specifica e eredita i permessi di quella persona, limitati da un set facoltativo di ambiti.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni** crea e gestisce le chiavi
- La chiave grezza viene visualizzata **una volta** alla creazione — archiviala subito da qualche parte al sicuro
- Tutte le richieste API devono utilizzare **HTTPS**

</div>

## Formato della chiave

Una chiave API B1 assomiglia a:

```
cak_<prefix>.<secret>
```

- `cak_` — identificatore fisso (il prefisso della chiave API su cui il livello di autenticazione corrisponde)
- `<prefix>` — segmento di ricerca pubblico a 8 caratteri
- `<secret>` — segreto a 48 caratteri; solo un hash SHA-256 viene archiviato lato server

La chiave completa viene presentata al server nell'intestazione del portatore standard:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Il livello di autenticazione API instrada qualsiasi token che inizia con `cak_` al percorso della chiave API, esegue l'hash del segreto, lo cerca per prefisso e risolve i permessi attuali della persona della chiave — quindi revocare un permesso in B1Admin ha effetto sulla richiesta successiva, e la chiave non si desincronizza mai dal ruolo.

## Creazione di una chiave (B1Admin)

1. Accedi a B1Admin come utente con **Modifica impostazioni**.
2. Apri **Impostazioni → Sviluppatore → Chiavi API**.
3. Fai clic su **Nuova chiave API**, assegnagli un nome riconoscibile (ad es. "Zapier — donations sync"), seleziona gli ambiti che la chiave dovrebbe avere, e **Salva**.
4. La chiave completa `cak_…` viene visualizzata **una volta** in una finestra di dialogo. Copiala nella configurazione della tua integrazione prima di chiudere — non c'è modo di recuperarla in seguito. Puoi sempre creare una nuova chiave.

## Ambiti

Un ambito **limita** quello che una chiave può fare — non può mai concedere un permesso che la persona sottostante non ha. Ambiti vuoti / assenti significa che la chiave porta il set di permessi completo della persona.

| Ambito | Consente |
|---|---|
| `people:read` / `people:write` | Visualizzare / modificare persone, nuclei familiari, membri del gruppo |
| `groups:read` / `groups:write` | Visualizzare / modificare gruppi e la loro iscrizione |
| `donations:read` / `donations:write` | Visualizzare / registrare donazioni |
| `attendance:read` / `attendance:write` | Visualizzare / registrare presenza, sessioni, check-in |
| `forms:write` | Gestire moduli (accesso in lettura è implicito in scrittura) |
| `content:read` / `content:write` | Visualizzare / modificare contenuto del sito web, registrazioni, streaming |
| `messaging:read` / `messaging:write` | Messaggistica in lettura; scrittura consente anche invio SMS |
| `roles:read` / `roles:write` | Visualizzare / modificare definizioni di ruoli |
| `settings:read` / `settings:write` | Visualizzare / modificare impostazioni della chiesa (**obbligatorio** per registrare i webhook a livello di programmazione) |
| `offline_access` | Consenti token di aggiornamento a lunga durata (solo flussi OAuth — non ha effetto sulle chiavi API) |

Gli ambiti `write` includono implicitamente la corrispondenza `read`. I permessi di amministratore del server e del dominio non sono deliberatamente esposti come ambiti — una credenziale con scopo non può mai elevarsi all'amministrazione del sito.

:::tip
Se utilizzerai la chiave per registrare webhook (ad es. per un'integrazione Zapier o Make), la chiave ha bisogno di `settings:write`. Una chiave di sola lettura `people:read` risponde silenziosamente con 403 su `POST /membership/webhooks`.
:::

## Utilizzo di una chiave

Uguale a qualsiasi token bearer — ogni endpoint autenticato accetta le chiavi API esattamente come accetta i JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Una richiesta la cui chiave ha ambiti insufficienti risponde **403 Forbidden** con la stessa forma di qualsiasi errore di permesso negato.

## Gestione delle chiavi tramite API

Tutti gli endpoint si trovano nel percorso `/membership/apiKeys` del modulo Membership e richiedono un JWT (non una chiave API) da un amministratore della chiesa con **Modifica impostazioni**.

| Metodo e percorso | Scopo |
|---|---|
| `GET /membership/apiKeys` | Elencare le chiavi della chiesa (nessun segreto — solo `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Elenco di tutti i nomi di ambiti disponibili — per un'interfaccia utente di creazione chiave |
| `POST /membership/apiKeys` | Creare una nuova chiave. Corpo: `{ "name": "...", "scopes": ["people:read"] }`. La risposta include la chiave grezza `cak_…` **una volta**. |
| `DELETE /membership/apiKeys/:id` | Revocare una chiave — ha effetto sulla richiesta successiva |

Una chiave revocata è scomparsa immediatamente — non c'è periodo di grazia.

## Pratiche consigliate

- **Una chiave per integrazione.** Se qualcosa viene compromesso revochi una sola chiave senza rompere le altre.
- **Conia gli ambiti più ristretti che funzionano.** Un'esportazione di Google Sheets ha bisogno solo di `people:read`, non di `settings:write`.
- **Vincola la chiave a un account di servizio, non a un vero membro dello staff.** Se un membro dello staff se ne va, il loro accesso B1 finisce — e così anche le chiavi coniate sotto la loro identità.
- **Archivia le chiavi in un gestore di segreti** (le variabili di ambiente del tuo provider di hosting, AWS Secrets Manager, ecc.) — mai nel controllo del codice sorgente.
- **Ruota le chiavi** se sospetti esposizione: crea una nuova chiave, aggiorna l'integrazione, quindi elimina la vecchia.

## Come differisce da OAuth

Le chiavi API sono appropriate quando **la tua chiesa è l'unica a utilizzare l'integrazione**. Per un connettore che ha bisogno di accedere a molte chiese con il consenso esplicito di ognuna — come un'app SaaS condivisa nella comunità B1 — utilizza [OAuth e app connesse](./connected-apps).

| | Chiave API | OAuth |
|---|---|---|
| Chi la installa | Un amministratore della chiesa | Ogni amministratore della chiesa autorizza l'app |
| Intestazione Auth | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durata del token | Fino alla revoca | Accesso ≈ 7 giorni, aggiornamento ≈ 90 giorni |
| Meglio per | Script interni, connettori Zapier/Make/Sheets | App multi-tenant di terze parti |
