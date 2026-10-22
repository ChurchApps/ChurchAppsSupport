---
title: "Claude"
---

# Claude {#claude}

<div class="article-intro">

Collega Claude di Anthropic ai dati B1 della tua chiesa. Aggiungi B1 come connettore personalizzato su claude.ai e accedi, oppure usa una chiave API con Claude Code o Claude Desktop. Dopo qualche minuto di configurazione, puoi fare a Claude domande come "quanti visitatori alla prima volta sono venuti domenica?" oppure "scrivi un'email di ringraziamento alle persone che questo mese hanno donato al fondo per l'edificio" -- e Claude leggerà le risposte direttamente dai registri della tua chiesa, nei limiti dei tuoi permessi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account **Claude Pro/Max/Team/Enterprise** (per il connettore personalizzato di claude.ai), oppure **Claude Code** (CLI / estensione IDE) o **Claude Desktop** (Mac/Windows)
- Per la configurazione con chiave API: un amministratore della chiesa con il permesso **Modifica impostazioni** (per generare una chiave API)
- L'URL completo della tua API B1 -- di solito `https://api.churchapps.org` per le chiese ospitate, oppure l'host API del tuo server self-hosted

</div>

## Cosa può vedere Claude {#what-claude-can-see}

Claude comunica con B1 tramite il **server Model Context Protocol (MCP)** integrato nell'API B1. Ogni chiamata che Claude effettua passa attraverso le stesse regole di autenticazione, permessi e isolamento per chiesa di una richiesta fatta da B1Admin -- il che significa che Claude:

- Vede solo i dati **della tua** chiesa
- È limitato a qualsiasi **permesso e ambito** che la chiave API o l'accesso che gli hai fornito possiedono
- Non può raggiungere webhook, endpoint di amministrazione OAuth o altri percorsi riservati agli operatori (sono bloccati)

Una chiave `donations:read` permette a Claude di riassumere le donazioni ma non di registrarne una. Una chiave `people:write` può aggiungere una persona ma non vedere le donazioni. Scegli gli ambiti che corrispondono al lavoro da svolgere.

## Configurazione {#setup}

Ci sono due modi per collegarsi:

- **Connettore personalizzato di Claude.ai** -- il più semplice. Accedi a B1 e autorizzi l'accesso nel browser, senza copiare nessuna chiave. Il connettore funziona anche in Claude Desktop e nelle app mobili di Claude una volta aggiunto al tuo account.
- **Chiave API** -- per Claude Code, o per un file di configurazione di Claude Desktop. Crei una chiave e la incolli nelle impostazioni di Claude.

### Claude.ai (web) -- Connettore personalizzato {#claudeai-web-custom-connector}

1. In Claude, apri **Impostazioni → Connettori** e fai clic su **Aggiungi connettore personalizzato**. (Sui piani Team ed Enterprise, un proprietario potrebbe dover prima aggiungerlo per l'organizzazione.)
2. Dagli il nome `B1` e inserisci l'URL del server `https://api.churchapps.org/mcp`, poi fai clic su **Aggiungi**.
3. Fai clic su **Connetti**. Si apre una finestra di accesso a B1. Accedi con il tuo account B1 e scegli la tua chiesa se richiesto.
4. La pagina **AUTORIZZAZIONE RICHIESTA** mostra il nome dell'app, i dati che richiede (ad esempio **Visualizza persone, nuclei familiari e dati di contatto**, oppure **Tutto ciò a cui il tuo account B1 può accedere** se non ha richiesto nulla di più specifico) e l'indirizzo a cui verrai rimandato dopo la scelta -- verifica che sia **claude.ai**.
5. Fai clic su **Consenti**. Torni a Claude e B1 compare come connesso.

Claude si registra presso B1 la prima volta che ti connetti, quindi la pagina segnala anche che l'app si è registrata da sola e che non può mai fare più di quanto possa fare il tuo account B1. Per disconnetterlo in seguito, vai su **Impostazioni → Sviluppatore → App collegate** in B1Admin e revocalo.

### Usare una chiave API {#using-an-api-key}

#### 1. Crea una chiave API {#1-create-an-api-key}

1. In B1Admin vai su **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova chiave API**, dalle il nome `Claude` e seleziona gli ambiti che Claude dovrebbe avere. Insiemi iniziali comuni:
   - **Assistente di sola lettura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lettura + aggiunta di note / attività:** aggiungi `people:write`
   - **Assistente operativo completo:** aggiungi gli ambiti `:write` corrispondenti che desideri
3. Salva. La chiave completa `cak_…` viene mostrata **una sola volta** -- copiala.

Vedi [Chiavi API](/docs/developer/api/api-keys) per sapere cosa consente ciascun ambito.

#### 2. Collega Claude {#2-connect-claude}

Scegli il client Claude che usi:

##### Claude Code (CLI) {#claude-code-cli}

In un terminale:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Fatto. In qualsiasi sessione di Claude Code, digita `/mcp` per verificare che il server `b1` sia connesso, poi fai a Claude qualsiasi domanda sulla tua chiesa.

##### Claude Desktop {#claude-desktop}

Modifica il file di configurazione di Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Aggiungi una voce di server `b1`. Le versioni più recenti di Claude Desktop supportano nativamente MCP via HTTP:

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

Se la tua versione di Claude Desktop supporta solo server stdio, passa per `mcp-remote`:

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

Riavvia Claude Desktop. L'icona del connettore nel campo di scrittura della chat mostrerà `b1` con tre strumenti (`list_endpoints`, `describe_endpoint`, `api_call`).

### Fai una domanda a Claude {#ask-claude-something}

Una volta collegato, non serve una sintassi speciale -- Claude scopre al volo ciò che è disponibile. Esempi:

- *"Quante persone ci sono nella mia chiesa e quali sono i gruppi attivi?"*
- *"Riassumi le donazioni di questo mese per fondo."*
- *"Elenca le persone che hanno partecipato al culto delle 10 dell'ultima domenica ma non sono state a un gruppo del mercoledì negli ultimi 60 giorni."*
- *"Scrivi un'email di benvenuto per le quattro persone aggiunte questa settimana, rivolgendoti a ciascuna con il nome."*

Dietro le quinte Claude chiamerà gli strumenti MCP -- prima per trovare l'endpoint giusto, poi per recuperare i dati -- e risponderà in linguaggio semplice.

## Come funziona {#how-it-works}

L'API B1 espone un unico endpoint MCP in `/mcp`. Claude vi si collega, si autentica con la tua chiave `cak_…` oppure con l'accesso che hai autorizzato, e ottiene accesso a tre strumenti:

| Strumento | Cosa fa |
|---|---|
| `list_endpoints` | Elenca gli endpoint REST che Claude può chiamare, filtrabili per percorso. Serve per la ricerca. |
| `describe_endpoint` | Restituisce un breve riepilogo e un esempio di richiesta/risposta per un endpoint specifico. |
| `api_call` | Invoca effettivamente un endpoint REST come utente autenticato. |

Si tratta della stessa superficie `/membership/people`, `/giving/donations`, `/attendance/visits` ecc. usata da B1Admin -- si applicano esattamente le stesse regole di autorizzazione.

## Sicurezza e limiti {#safety-and-limits}

- **Isolamento per chiesa.** La chiave API o l'accesso risolve a una sola chiesa. Claude non ha modo di vedere i dati di altre chiese.
- **Limitato dai permessi.** Se rimuovi un permesso alla persona che ha generato la chiave (o che ha effettuato l'accesso) in B1Admin, Claude lo perde alla chiamata successiva -- immediatamente.
- **Revocabile.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API**, oppure revoca la connessione di claude.ai in **Impostazioni → Sviluppatore → App collegate**, e l'accesso di Claude termina immediatamente.
- **Lista di blocco.** I webhook dei fornitori, gli endpoint di amministrazione dei client OAuth e la rotta `apiEmails`, riservata agli operatori, non sono richiamabili tramite MCP.
- **Limite di dimensione della risposta.** Una singola risposta di uno strumento è limitata a 64 KB, così le liste lunghe non saturano il contesto di Claude -- in questo caso Claude restringerà la query con dei filtri.
- **Registro di controllo.** Le modifiche passano dallo stesso registro delle attività delle azioni di B1Admin; puoi consultarle in **Impostazioni → Registro attività**.

## Costi {#cost}

ChurchApps è gratuito e open-source -- il server MCP fa parte dell'API che la tua chiesa già utilizza. Anthropic addebita l'uso di Claude secondo i propri piani. Non c'è alcun costo per chiamata da parte di ChurchApps.

## Risoluzione dei problemi {#troubleshooting}

**Claude segnala "Unauthorized" o errore 401:** il token bearer manca, è malformato oppure la chiave è stata revocata. Ricontrolla l'intestazione `Authorization: Bearer cak_…` (fai attenzione allo spazio e alla parola `Bearer` scritta così com'è). Su claude.ai, disconnetti e riconnetti il connettore B1 per accedere di nuovo.

**Una chiamata allo strumento restituisce 403:** la chiave API non ha l'ambito per quell'endpoint. Aggiungi l'ambito in **Impostazioni → Sviluppatore → Chiavi API** (dovrai creare una nuova chiave -- gli ambiti non si possono modificare sul posto) e aggiorna la configurazione di Claude.

**Claude non trova un endpoint:** chiedigli di chiamare `list_endpoints` con un filtro, ad esempio *"usa list_endpoints con il filtro 'donations' per trovare il percorso giusto"*. L'inventario delle rotte è generato dall'API in esecuzione, quindi tutto ciò che puoi raggiungere con `curl` è presente.

**Sviluppo locale:** sostituisci `https://api.churchapps.org/mcp` con `http://localhost:8084/mcp` -- stessa autenticazione, stessi strumenti.

## Correlati {#related}

- [Chiavi API](/docs/developer/api/api-keys) -- riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) -- dettagli del protocollo e schemi degli strumenti
- [ChatGPT](./chatgpt) -- stessa idea, per i modelli di OpenAI
