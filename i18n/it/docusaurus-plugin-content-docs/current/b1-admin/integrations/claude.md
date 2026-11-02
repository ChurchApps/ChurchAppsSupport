---
title: "Claude"
---

# Claude

<div class="article-intro">

Chiedi a Claude della tua chiesa in linguaggio naturale e risponderà con i dati presenti in B1 -- comprese le tue lezioni e le classi di FreePlay. Domande come *"quanti visitatori alla prima volta sono venuti domenica?"* o *"chi si è unito a un piccolo gruppo questo mese?"* -- oppure chiedigli di fare delle cose, come *"aggiungi una nuova pagina al nostro sito web chiamata Eventi."* La configurazione richiede meno di 3 minuti e non servono competenze tecniche né software da installare.

</div>

<div class="prereqs">
<h4>Di cosa hai bisogno</h4>

- **Un account Claude.** Il **piano gratuito funziona** -- un buon modo per provarlo. Gli account gratuiti hanno però un limite giornaliero di messaggi, e cercare informazioni in B1 consuma messaggi in fretta, quindi se lo usi regolarmente ti consigliamo **Claude Pro** (circa 20 $/mese).
- **Il tuo accesso a B1** -- lo stesso che usi per B1 Admin.

</div>

:::tip Consigliato -- gratis per provarlo
Claude è il modo più semplice per collegare B1 all'IA, e funziona con il **piano gratuito** di Claude -- un modo perfetto per la tua chiesa di provarlo prima di pagare qualsiasi cosa.
:::

Ci sono due modi per collegarlo. **L'Opzione 1 è la più semplice** -- nessuna chiave e nessuna installazione.

## Opzione 1 -- Accedi con B1 (il più semplice)

Funziona sul sito di Claude, nell'app desktop di Claude e nell'app di Claude per il telefono -- configuralo una volta e sarà disponibile su tutti.

### Passo 1 -- Apri le impostazioni dei connettori di Claude

1. Vai su [claude.ai](https://claude.ai) e accedi (oppure crea un account gratuito).
2. Clicca sul tuo nome nell'angolo in basso a sinistra, poi **Impostazioni** → **Connettori**.

### Passo 2 -- Aggiungi B1

1. Clicca su **Aggiungi**, poi su **Aggiungi connettore personalizzato**.
2. **Nome:** scrivi `B1`.
3. **URL:** incolla `https://api.churchapps.org/mcp`
4. Lascia invariate le altre opzioni e clicca su **Aggiungi**.

### Passo 3 -- Accedi a B1

1. Clicca su **Connetti**. Si apre una pagina di accesso di B1.
2. Accedi con il tuo account B1. Se appartieni a più di una chiesa, controlla che in alto sia mostrata quella giusta.
3. B1 elenca ciò che Claude chiede di fare e conferma che verrai rimandato su **claude.ai**. Clicca su **Consenti**.

Sei di nuovo in Claude, e B1 risulta collegato.

### Passo 4 -- Fagli una domanda

Apri una **nuova chat** e prova:

- *"Quante persone ci sono nella nostra chiesa?"*
- *"Elenca i nostri gruppi attivi."*
- *"Riassumi le donazioni di questo mese per fondo."*
- *"Chi si è unito alla chiesa negli ultimi 30 giorni?"*

La prima volta, Claude chiede il permesso di usare B1 -- clicca su **Consenti**.

## Opzione 2 -- Estensione desktop con una chiave B1

Usala se preferisci dare a Claude una chiave con permessi limitati (ad esempio solo lettura). Funziona nell'app desktop di Claude per Mac o Windows, e per creare una chiave ti serve il permesso di gestire le impostazioni della chiesa in B1.

### Passo 1 -- Installa l'app di Claude

Scarica l'app di Claude da [claude.com/download](https://claude.com/download), installala, aprila e accedi.

### Passo 2 -- Crea la tua chiave B1

La chiave è ciò che permette a Claude di accedere a B1 *della tua* chiesa -- pensala come una password dedicata solo a Claude.

1. Accedi a [B1 Admin](https://admin.b1.church) e vai su [Impostazioni → Sviluppatore](https://admin.b1.church/settings/developer).
2. Nella scheda **Chiavi API**, clicca su **Nuova chiave API**.
3. **Nome:** scrivi `Claude`.
4. **Ambiti:** seleziona ciò che Claude può fare. Ogni area ha una casella **lettura** (solo visualizzazione) e una casella **scrittura** (apportare modifiche). Non sei sicuro? Seleziona solo le caselle **lettura** per iniziare -- potrai creare in seguito una nuova chiave con più permessi.
5. Clicca su **Salva**, poi su **Copia** la chiave. Viene mostrata una sola volta, quindi passa subito al Passo 3.

### Passo 3 -- Aggiungi B1 a Claude

1. [Scarica l'estensione B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Fai doppio clic** sul file scaricato (`b1-churchapps.mcpb`). Claude si apre e mostra **B1 (ChurchApps)**.
3. Clicca su **Installa**.
4. Quando ti chiede la tua **chiave API di B1**, incolla la chiave del Passo 2 e salva.
5. **Chiudi completamente Claude** (Mac: **Cmd+Q** · Windows: clic destro sull'icona di Claude nella barra delle applicazioni → **Esci**) e riaprilo.

Se il doppio clic non apre Claude, vai su **Impostazioni → Estensioni → Impostazioni avanzate → Installa estensione…** in Claude e scegli il file scaricato. Poi apri una nuova chat e fagli una domanda.

:::tip Hai già installato l'estensione?
Non c'è nulla da fare -- FreePlay funziona con la stessa connessione. Unica eccezione: la versione 1.1.0 chiedeva un'email e una password di B1; scarica e installa di nuovo l'estensione per aggiornarla. La tua chiave resta valida.
:::

## È sicuro?

- Claude può vedere solo i dati **della tua chiesa**.
- **Con accesso (Opzione 1):** Claude non può mai fare più di quanto possa fare il tuo accesso personale a B1. La pagina di accesso di B1 elenca tutto ciò che Claude può fare prima che tu clicchi su **Consenti**.
- **Con una chiave (Opzione 2):** Claude può fare solo ciò che la chiave consente in B1 -- una chiave con solo le caselle **lettura** selezionate può consultare ma non modificare nulla. FreePlay funziona allo stesso modo, con la stessa chiave.
- **Per disattivarlo:** in B1 Admin vai su **Impostazioni → Sviluppatore** e revoca l'app in **App collegate** (Opzione 1) oppure elimina la chiave in **Chiavi API** (Opzione 2). L'accesso si interrompe subito. Puoi anche cliccare su **Disconnetti** sul connettore B1 in Claude.

## Quanto costa?

La connessione a B1 è gratuita -- fa parte di ChurchApps. Claude ha un piano gratuito; Claude Pro (circa 20 $/mese) offre molto più utilizzo. Vedi [claude.com/pricing](https://claude.com/pricing).

## Dettagli tecnici

Il resto di questa pagina è per gli utenti tecnici e per gli assistenti IA: ambiti, altri modi di collegarsi e come funziona.

### Ambiti {#scopes}

Claude comunica con B1 tramite il **server Model Context Protocol (MCP)** integrato nell'API di B1 (`https://api.churchapps.org/mcp`). Ogni chiamata passa attraverso le stesse regole di autenticazione, permessi e isolamento per chiesa di una richiesta da B1 Admin. Claude è limitato ai **permessi e agli ambiti** della chiave API e non può accedere a webhook, endpoint amministrativi OAuth né ad altri percorsi riservati agli operatori.

Set di ambiti iniziali comuni:

- **Assistente di sola lettura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lettura + aggiunta di note / attività:** aggiungi `people:write`
- **Assistente operativo completo:** aggiungi i relativi ambiti `:write` che desideri

Una chiave `donations:read` permette a Claude di riassumere le offerte ma non di registrare un dono. Una chiave `people:write` può aggiungere una persona ma non vedere le donazioni. Vedi [Chiavi API](/docs/developer/api/api-keys) per sapere cosa consente ciascun ambito.

### Altri modi di collegarsi

#### Claude Code (CLI)

In un terminale:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Tutto qui. In una qualsiasi sessione di Claude Code, digita `/mcp` per verificare che il server `b1` sia collegato, poi fai a Claude qualsiasi domanda sulla tua chiesa.

#### Claude Desktop -- configurazione manuale (avanzata)

Se preferisci non usare l'estensione, modifica il file di configurazione di Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Aggiungi una voce di server `b1` che si collega a B1 tramite `mcp-remote` (richiede [Node.js](https://nodejs.org)):

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

Riavvia Claude Desktop. Il menu dei connettori nella casella della chat mostrerà `b1` con i suoi strumenti.

#### Claude.ai (web) -- Connettore personalizzato

Vedi l'**Opzione 1** sopra. Il connettore usa OAuth 2.1: Claude individua il server di autorizzazione di B1 da `https://api.churchapps.org/.well-known/oauth-protected-resource`, si registra con la Dynamic Client Registration e accede con PKCE. Con i piani Team ed Enterprise, un proprietario potrebbe dover prima aggiungere il connettore per l'organizzazione. Claude non richiede ambiti specifici, quindi la pagina di consenso offre tutto ciò a cui l'account B1 con cui hai effettuato l'accesso può accedere. Revocalo in **Impostazioni → Sviluppatore → App collegate** in B1 Admin.

### Come funziona

L'API di B1 espone un unico endpoint MCP su `/mcp`. Claude vi si collega, si autentica con la tua chiave `cak_…` e ottiene accesso a quattro strumenti:

| Strumento | Cosa fa |
|---|---|
| `list_endpoints` | Elenca gli endpoint REST che Claude può chiamare, filtrabili per percorso. Usato per la scoperta. |
| `describe_endpoint` | Restituisce una breve descrizione e un esempio di richiesta/risposta per un endpoint specifico. |
| `api_call` | Invoca effettivamente un endpoint REST come utente autenticato. |
| `describe_page_builder` | Una guida alla creazione e modifica delle pagine del sito web della chiesa, che Claude legge prima di lavorare sui contenuti del sito. |

Si tratta della stessa superficie `/membership/people`, `/giving/donations`, `/attendance/visits` ecc. che usa B1 Admin -- si applicano identicamente tutte le regole di autorizzazione. Gli endpoint di FreePlay (lessons.church) sono elencati sotto `/lessons/*`; le chiamate di Claude verso di essi vengono inoltrate a FreePlay come stesso utente, con gli stessi permessi.

### Sicurezza e limiti

- **Isolamento per chiesa.** La chiave API corrisponde a una sola chiesa. Claude non ha modo di vedere i dati di altre chiese.
- **Limitato dai permessi.** Se rimuovi un permesso alla persona che ha creato la chiave in B1 Admin, Claude lo perde alla chiamata successiva -- immediatamente.
- **Revocabile.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API** e l'accesso di Claude termina subito.
- **Lista di blocco.** I webhook dei fornitori, gli endpoint di amministrazione dei client OAuth e la rotta riservata agli operatori `apiEmails` non sono richiamabili tramite MCP.
- **Limite di dimensione della risposta.** Una singola risposta di uno strumento è limitata a 64 KB, così le liste lunghe non saturano il contesto di Claude -- in questo caso Claude restringe la query con dei filtri.
- **Registro di controllo.** Le modifiche passano dallo stesso registro delle azioni di B1 Admin; puoi consultarle in **Impostazioni → Registro di controllo**.

### Risoluzione dei problemi

**Claude chiede un'email e una password di B1 per usare FreePlay:** hai la versione 1.1.0 dell'estensione desktop. Scaricala e installala di nuovo per aggiornarla -- le versioni più recenti usano solo la tua chiave.

**Claude segnala "Unauthorized" o 401:** il token bearer manca, è malformato oppure la chiave è stata revocata. Se hai usato l'estensione, apri **Impostazioni → Estensioni → B1 (ChurchApps)** in Claude e incolla di nuovo la chiave. Altrimenti ricontrolla l'intestazione `Authorization: Bearer cak_…` (fai attenzione allo spazio e alla parola `Bearer` così com'è).

**Una chiamata allo strumento restituisce 403:** la chiave API non ha l'ambito per quell'endpoint. Aggiungi l'ambito in **Impostazioni → Sviluppatore → Chiavi API** (dovrai creare una nuova chiave -- gli ambiti non si possono modificare sul posto) e incolla la nuova chiave nelle impostazioni dell'estensione o nella configurazione di Claude.

**Claude non trova un endpoint:** chiedigli di chiamare `list_endpoints` con un filtro, ad esempio *"usa list_endpoints con il filtro 'donations' per trovare il percorso giusto"*. L'elenco delle rotte è generato dall'API in tempo reale, quindi tutto ciò che puoi raggiungere con `curl` è presente.

**Sviluppo locale:** sostituisci `https://api.churchapps.org/mcp` con `http://localhost:8084/mcp` -- stessa autenticazione, stessi strumenti.

## Correlati

- [Chiavi API](/docs/developer/api/api-keys) -- riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) -- dettagli del protocollo e schemi degli strumenti
- [ChatGPT](./chatgpt) -- stessa idea, per i modelli di OpenAI
