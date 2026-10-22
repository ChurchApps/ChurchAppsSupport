---
title: "Claude"
---

# Claude

<div class="article-intro">

Fai domande a Claude sulla tua chiesa in linguaggio semplice e lui risponde usando i tuoi dati di B1. Domande come *"quanti visitatori per la prima volta sono venuti domenica?"* o *"chi si è unito a un piccolo gruppo questo mese?"* — oppure chiedigli di fare delle cose, come *"aggiungi una nuova pagina al nostro sito web chiamata Eventi."* La configurazione richiede meno di 3 minuti e non servono competenze tecniche né software da installare.

</div>

<div class="prereqs">
<h4>Cosa ti serve</h4>

- **Un account Claude.** Il **piano gratuito funziona** — un buon modo per provarlo. Gli account gratuiti hanno però un limite giornaliero di messaggi, e cercare informazioni in B1 consuma messaggi rapidamente, quindi se lo usi regolarmente ti consigliamo **Claude Pro** (circa $20/mese).
- **Il tuo accesso a B1** — lo stesso che usi per B1 Admin.

</div>

:::tip Consigliato — gratuito da provare
Claude è il modo più semplice per collegare B1 all'intelligenza artificiale, e funziona con il **piano gratuito** di Claude — un modo perfetto per la tua chiesa di provarlo prima di pagare qualsiasi cosa.
:::

Ci sono due modi per collegarsi. **L'Opzione 1 è la più semplice** — nessuna chiave e niente da installare.

## Opzione 1 — Accedi con B1 (la più semplice)

Funziona sul sito web di Claude, nell'app desktop di Claude e nell'app di Claude per telefono — configuralo una volta ed è disponibile su tutti.

### Passaggio 1 — Apri le impostazioni dei connettori di Claude

1. Vai su [claude.ai](https://claude.ai) e accedi (oppure crea un account gratuito).
2. Fai clic sul tuo nome nell'angolo in basso a sinistra, poi su **Settings** (Impostazioni) → **Connectors** (Connettori).

### Passaggio 2 — Aggiungi B1

1. Fai clic su **Add** (Aggiungi), poi su **Add custom connector** (Aggiungi connettore personalizzato).
2. **Name** (Nome): digita `B1`.
3. **URL:** incolla `https://api.churchapps.org/mcp`
4. Lascia le altre opzioni come sono e fai clic su **Add** (Aggiungi).

### Passaggio 3 — Accedi a B1

1. Fai clic su **Connect** (Connetti). Si apre una pagina di accesso di B1.
2. Accedi con il tuo account B1. Se fai parte di più di una chiesa, controlla che in alto sia mostrata la chiesa giusta.
3. B1 elenca cosa Claude chiede di poter fare e conferma che verrai riportato su **claude.ai**. Fai clic su **Allow** (Consenti).

Sei di nuovo in Claude, e B1 risulta connesso.

### Passaggio 4 — Chiedigli qualcosa

Avvia una **nuova chat** e prova:

- *"Quante persone ci sono nella nostra chiesa?"*
- *"Elenca i nostri gruppi attivi."*
- *"Riassumi le donazioni di questo mese per fondo."*
- *"Chi si è unito alla chiesa negli ultimi 30 giorni?"*

La prima volta, Claude chiede il permesso di usare B1 — fai clic su **Allow** (Consenti).

## Opzione 2 — Estensione desktop con una chiave B1

Usa questa opzione se preferisci dare a Claude una chiave con permessi limitati (ad esempio, solo visualizzazione). Funziona nell'app desktop di Claude per Mac o Windows, e per creare una chiave ti serve l'autorizzazione a gestire le impostazioni della chiesa in B1.

### Passaggio 1 — Scarica l'app di Claude

Scarica l'app di Claude da [claude.com/download](https://claude.com/download), installala, aprila e accedi.

### Passaggio 2 — Crea la tua chiave B1

La chiave è ciò che permette a Claude di entrare nel B1 della *tua* chiesa — pensala come una password solo per Claude.

1. Accedi a [B1 Admin](https://admin.b1.church) e vai a [Impostazioni → Sviluppatore](https://admin.b1.church/settings/developer).
2. Nella scheda **Chiavi API**, fai clic su **Nuova chiave API**.
3. **Nome:** digita `Claude`.
4. **Ambiti:** seleziona cosa può fare Claude. Ogni area ha una casella **read** (solo visualizzazione) e una casella **write** (apportare modifiche). Non sei sicuro? Per iniziare seleziona solo le caselle **read** — potrai creare una nuova chiave con più permessi in seguito.
5. Fai clic su **Salva**, poi **Copia** la chiave. Viene mostrata una sola volta, quindi passa subito al Passaggio 3.

### Passaggio 3 — Aggiungi B1 a Claude

1. [Scarica l'estensione B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. Fai **doppio clic** sul file scaricato (`b1-churchapps.mcpb`). Claude si apre e mostra **B1 (ChurchApps)**.
3. Fai clic su **Install** (Installa).
4. Quando ti chiede la tua **B1 API key** (chiave API B1), incolla la chiave del Passaggio 2 e salva.
5. **Chiudi completamente Claude** (Mac: **Cmd+Q** · Windows: clic destro sull'icona di Claude nella barra delle applicazioni → **Quit** (Esci)) e riaprilo.

Se il doppio clic non apre Claude, vai su **Settings → Extensions → Advanced settings → Install Extension…** (Impostazioni → Estensioni → Impostazioni avanzate → Installa estensione…) in Claude e scegli il file scaricato. Poi avvia una nuova chat e chiedigli qualcosa.

## È sicuro?

- Claude può vedere solo i dati della **tua chiesa**.
- **Con l'accesso (Opzione 1):** Claude non può mai fare più di quanto consenta il tuo accesso a B1. La pagina di accesso di B1 elenca tutto ciò che Claude può fare prima che tu faccia clic su **Allow** (Consenti).
- **Con una chiave (Opzione 2):** Claude può fare solo ciò che la chiave consente — una chiave con solo le caselle **read** selezionate può guardare ma non modificare mai nulla.
- **Per disattivarlo:** in B1 Admin vai a **Impostazioni → Sviluppatore** e revoca l'app in **App connesse** (Opzione 1) oppure elimina la chiave in **Chiavi API** (Opzione 2). L'accesso si interrompe immediatamente. Puoi anche fare clic su **Disconnect** (Disconnetti) sul connettore B1 in Claude.

## Quanto costa?

Il collegamento a B1 è gratuito — fa parte di ChurchApps. Claude stesso ha un piano gratuito; Claude Pro (circa $20/mese) ti offre un utilizzo molto maggiore. Vedi [claude.com/pricing](https://claude.com/pricing).

## Dettagli tecnici

Il resto di questa pagina è per utenti tecnici e assistenti AI: ambiti, altri modi per connettersi e come funziona.

### Ambiti

Claude comunica con B1 tramite il **server del Protocollo di contesto del modello (MCP)** integrato nell'API B1 (`https://api.churchapps.org/mcp`). Ogni chiamata passa attraverso le stesse regole di autenticazione, permessi e ambito della chiesa di una richiesta da B1 Admin. Claude è limitato ai **permessi e agli ambiti** della chiave API, e non può raggiungere webhook, endpoint amministrativi OAuth o altri percorsi solo per operatori.

Set di ambiti di partenza comuni:

- **Assistente di sola lettura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lettura + aggiungi note / attività:** aggiungi `people:write`
- **Assistente operativo completo:** aggiungi gli ambiti `:write` corrispondenti che desideri

Una chiave con `donations:read` consente a Claude di riepilogare le donazioni ma non può registrare un dono. Una chiave con `people:write` può aggiungere una persona ma non può vedere le donazioni. Vedi [Chiavi API](/docs/developer/api/api-keys) per quello che ogni ambito permette.

### Altri modi per connettersi

#### Claude Code (CLI)

In un terminale:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

È tutto. All'interno di qualsiasi sessione Claude Code, digita `/mcp` per confermare che il server `b1` è connesso, quindi poni a Claude qualsiasi domanda sulla tua chiesa.

#### Claude Desktop — configurazione manuale (avanzata)

Se preferisci non usare l'estensione, modifica il file di configurazione di Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Aggiungi una voce server `b1` che si collega a B1 tramite `mcp-remote` (richiede [Node.js](https://nodejs.org)):

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

Riavvia Claude Desktop. Il menu dei connettori nel compositore di chat mostrerà `b1` con i suoi strumenti.

#### Claude.ai (web) — Connettore personalizzato

Vedi l'**Opzione 1** sopra. Il connettore usa OAuth 2.1: Claude individua il server di autorizzazione di B1 da `https://api.churchapps.org/.well-known/oauth-protected-resource`, si registra con la Dynamic Client Registration (registrazione dinamica del client) e accede con PKCE. Nei piani Team ed Enterprise potrebbe essere necessario che un proprietario aggiunga prima il connettore per l'organizzazione. Claude non richiede ambiti specifici, quindi la pagina di consenso offre tutto ciò a cui può accedere l'account B1 con cui si è effettuato l'accesso. Revocalo in **Impostazioni → Sviluppatore → App connesse** in B1 Admin.

### Come funziona

L'API B1 espone un singolo endpoint MCP a `/mcp`. Claude si connette, si autentica con la tua chiave `cak_…`, e ottiene accesso a quattro strumenti:

| Strumento | Cosa fa |
|---|---|
| `list_endpoints` | Elenca gli endpoint REST che Claude può chiamare, filtrabile per percorso. Usato per la scoperta. |
| `describe_endpoint` | Restituisce un breve riassunto e un esempio di richiesta/risposta per un endpoint specifico. |
| `api_call` | Invoca effettivamente un endpoint REST come utente autenticato. |
| `describe_page_builder` | Una guida per creare e modificare le pagine del sito web della tua chiesa, che Claude legge prima di lavorare sui contenuti del sito. |

Questa è la stessa superficie `/membership/people`, `/giving/donations`, `/attendance/visits` ecc. che usa B1Admin — ogni regola di autorizzazione si applica in modo identico.

### Sicurezza e limiti

- **Isolamento per chiesa.** La chiave API si risolve in una sola chiesa. Claude non ha modo di vedere i dati di altre chiese.
- **Limitato dai permessi.** Se rimuovi un permesso dalla persona che ha creato la chiave in B1Admin, Claude lo perde alla chiamata successiva — istantaneamente.
- **Revocabile.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API** e l'accesso di Claude termina immediatamente.
- **Blocklist.** I webhook dei provider, gli endpoint amministrativi dei client OAuth e la route `apiEmails` solo per operatori non sono richiamabili tramite MCP.
- **Limite di dimensione della risposta.** Una singola risposta dello strumento è limitata a 64 KB in modo che gli elenchi lunghi non esauriscano il contesto di Claude — Claude restringerà la query con filtri quando questo accade.
- **Traccia di audit.** Le modifiche passano attraverso lo stesso registro di audit delle azioni di B1Admin; puoi esaminarle sotto **Impostazioni → Registro di audit**.

### Risoluzione dei problemi

**Claude riporta "Unauthorized" o 401:** il token bearer è mancante, malformato, oppure la chiave è stata revocata. Se hai usato l'estensione, apri **Settings → Extensions → B1 (ChurchApps)** in Claude e incolla di nuovo la chiave. Altrimenti ricontrolla l'intestazione `Authorization: Bearer cak_…` (nota lo spazio e il letterale `Bearer`).

**Una chiamata dello strumento restituisce 403:** la chiave API non ha l'ambito per quell'endpoint. Aggiungi l'ambito in **Impostazioni → Sviluppatore → Chiavi API** (dovrai creare una nuova chiave — gli ambiti non possono essere modificati in posizione) e incolla la nuova chiave nelle impostazioni dell'estensione o nella configurazione di Claude.

**Claude non riesce a trovare un endpoint:** chiedigli di chiamare `list_endpoints` con un filtro, ad esempio *"usa list_endpoints con filtro 'donations' per trovare il percorso giusto"*. L'inventario dei percorsi viene generato dall'API live, quindi tutto quello che puoi raggiungere con `curl` è lì.

**Sviluppo locale:** sostituisci `https://api.churchapps.org/mcp` con `http://localhost:8084/mcp` — stessa autenticazione, stessi strumenti.

## Correlati

- [Chiavi API](/docs/developer/api/api-keys) — riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) — dettagli del protocollo e schemi degli strumenti
- [ChatGPT](./chatgpt) — stessa idea, per i modelli di OpenAI
