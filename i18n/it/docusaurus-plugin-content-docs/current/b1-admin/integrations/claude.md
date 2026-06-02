---
title: "Claude"
---

# Claude

<div class="article-intro">

Collegare Claude di Anthropic ai dati di B1 della tua chiesa. Con una chiave API e alcuni minuti di configurazione, puoi fare a Claude domande come "quanti visitatori per la prima volta sono venuti domenica?" oppure "scrivi un'email di ringraziamento per le persone che hanno donato al fondo per la costruzione questo mese" — e Claude leggerà le risposte direttamente dai registri della tua chiesa, limitate alle tue autorizzazioni.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore di chiesa con autorizzazione **Modifica impostazioni** (per creare una chiave API)
- Uno di questi: **Claude Code** (CLI / estensione IDE), **Claude Desktop** (Mac/Windows), o un account **Claude Pro/Max/Team**
- L'URL completo della tua API B1 — solitamente `https://api.churchapps.org` per le chiese ospitate, o il tuo host Api self-hosted

</div>

## Cosa può vedere Claude

Claude comunica con B1 tramite il **server del Protocollo di contesto del modello (MCP)** integrato nell'API B1. Ogni chiamata che Claude effettua passa attraverso le stesse regole di autenticazione, permessi e ambito della chiesa di una richiesta da B1Admin — il che significa che Claude:

- Vede solo i dati della **tua** chiesa
- È limitato ai **permessi e agli ambiti** che la chiave API che gli dai ha
- Non può raggiungere webhook, endpoint amministrativi OAuth o altri percorsi solo per operatori (quelli sono bloccati)

Una chiave con `donations:read` consente a Claude di riepilogare le donazioni ma non può registrare un regalo. Una chiave con `people:write` può aggiungere una persona ma non può vedere le donazioni. Scegli gli ambiti che corrispondono al lavoro.

## Configurazione

### 1. Crea una chiave API

1. In B1Admin vai a **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova chiave API**, chiamala `Claude`, e seleziona gli ambiti che Claude dovrebbe avere. Set di partenza comuni:
   - **Assistente di sola lettura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lettura + aggiungi note / attività:** aggiungi `people:write`
   - **Assistente operativo completo:** aggiungi gli ambiti `:write` corrispondenti che desideri
3. Salva. La chiave completa `cak_…` è mostrata **una sola volta** — copiarla.

Vedi [Chiavi API](/docs/developer/api/api-keys) per quello che ogni ambito permette.

### 2. Collega Claude

Scegli il client Claude che usi:

#### Claude Code (CLI)

In un terminale:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

È tutto. All'interno di qualsiasi sessione Claude Code, digita `/mcp` per confermare che il server `b1` è connesso, quindi poni a Claude qualsiasi domanda sulla tua chiesa.

#### Claude Desktop

Modifica il file di configurazione di Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Aggiungi una voce server `b1`. Le versioni più recenti di Claude Desktop parlano nativamente HTTP MCP:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

Se la tua versione di Claude Desktop supporta solo server stdio, collega tramite `mcp-remote`:

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Riavvia Claude Desktop. L'icona del connettore nel compositore di chat mostrerà `b1` con tre strumenti (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Connettore personalizzato

La funzione "Aggiungi connettore personalizzato" di Claude.ai richiede OAuth, che il server MCP B1 non supporta oggi. Usa Claude Code o Claude Desktop invece.

### 3. Chiedi a Claude qualcosa

Una volta connesso, non è necessaria alcuna sintassi speciale — Claude scopre cosa è disponibile al volo. Esempi:

- *"Quante persone ci sono nella mia chiesa e quali sono i gruppi attivi?"*
- *"Riassumi le donazioni di questo mese per fondo."*
- *"Elenca le persone che hanno frequentato il servizio delle 10 domenica scorsa ma non sono state a un gruppo del mercoledì negli ultimi 60 giorni."*
- *"Scrivi un'email di benvenuto per le quattro persone aggiunte questa settimana, indirizzate per nome."*

Dietro le quinte Claude chiamerà gli strumenti MCP — prima per scoprire l'endpoint giusto, poi per recuperare i dati — e risponderà in linguaggio naturale.

## Come funziona

L'API B1 espone un singolo endpoint MCP a `/mcp`. Claude si connette, si autentica con la tua chiave `cak_…`, e ottiene accesso a tre strumenti:

| Strumento | Cosa fa |
|---|---|
| `list_endpoints` | Elenca gli endpoint REST che Claude può chiamare, filtrabile per percorso. Usato per la scoperta. |
| `describe_endpoint` | Restituisce un breve riassunto e un esempio di richiesta/risposta per un endpoint specifico. |
| `api_call` | Invoca effettivamente un endpoint REST come utente autenticato. |

Questa è la stessa superficie `/membership/people`, `/giving/donations`, `/attendance/visits` ecc. che usa B1Admin — ogni regola di autorizzazione si applica in modo identico.

## Sicurezza e limiti

- **Isolamento per chiesa.** La chiave API si risolve in una sola chiesa. Claude non ha modo di vedere i dati di altre chiese.
- **Scoped per permessi.** Se rimuovi un permesso dalla persona che ha creato la chiave in B1Admin, Claude lo perde alla chiamata successiva — istantaneamente.
- **Revocabile.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API** e l'accesso di Claude termina immediatamente.
- **Blocklist.** I webhook dei provider, gli endpoint amministrativi dei client OAuth e la route `apiEmails` solo per operatori non sono richiamabili tramite MCP.
- **Limite di dimensione della risposta.** Una singola risposta dello strumento è limitata a 64 KB in modo che gli elenchi lunghi non esauriscano il contesto di Claude — Claude restringerà la query con filtri quando questo accade.
- **Pista di audit.** Le mutazioni passano attraverso lo stesso registro di audit delle azioni B1Admin; puoi esaminarle sotto **Report → Registro di audit**.

## Costo

ChurchApps è gratuito e open-source — il server MCP fa parte dell'API che la tua chiesa esegue già. Anthropic addebita l'utilizzo di Claude secondo i suoi piani. Non c'è alcun costo per chiamata da parte di ChurchApps.

## Risoluzione dei problemi

**Claude riporta "Non autorizzato" o 401:** il token bearer è mancante, malformato, oppure la chiave è stata revocata. Ri-controlla l'intestazione `Authorization: Bearer cak_…` (nota lo spazio e il letterale `Bearer`).

**Una chiamata dello strumento restituisce 403:** la chiave API non ha l'ambito per quell'endpoint. Aggiungi l'ambito in **Impostazioni → Sviluppatore → Chiavi API** (dovrai creare una nuova chiave — gli ambiti non possono essere modificati in posizione) e aggiorna la configurazione di Claude.

**Claude non riesce a trovare un endpoint:** chiedigli di chiamare `list_endpoints` con un filtro, ad esempio *"usa list_endpoints con filtro 'donazioni' per trovare il percorso giusto"*. L'inventario dei percorsi viene generato dall'API live, quindi tutto quello che puoi raggiungere con `curl` è lì.

**Sviluppo locale:** sostituisci `https://api.churchapps.org/mcp` con `http://localhost:8084/mcp` — stesso auth, stessi strumenti.

## Correlati

- [Chiavi API](/docs/developer/api/api-keys) — riferimento completo dell'ambito
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) — dettagli del protocollo e schemi degli strumenti
- [ChatGPT](./chatgpt) — stessa idea, per i modelli di OpenAI
