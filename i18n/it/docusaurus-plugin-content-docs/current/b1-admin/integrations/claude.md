---
title: "Claude"
description: "Collega B1 Admin a Claude per chiedere di presenze, donazioni e gruppi in linguaggio semplice, con l'opzione di accesso tramite login e quella di una chiave con permessi limitati."
---

# Claude

<div class="article-intro">

Chiedi a Claude della tua chiesa in linguaggio semplice e risponderà con i dati presenti in B1, comprese le tue lezioni FreePlay e le aule. Domande come *"quanti visitatori alla prima volta sono venuti domenica?"* o *"chi si è iscritto a un piccolo gruppo questo mese?"*, oppure chiedigli di fare delle cose, come *"aggiungi una nuova pagina al nostro sito chiamata Eventi."* La configurazione richiede meno di 3 minuti e non serve alcuna competenza tecnica né software da installare.

</div>

<div class="prereqs">
<h4>Cosa ti serve</h4>

- **Un account Claude.** Il **piano gratuito funziona**: un buon modo per provarlo. Gli account gratuiti hanno però un limite giornaliero di messaggi, e cercare informazioni in B1 consuma messaggi rapidamente, quindi se lo usi regolarmente ti consigliamo **Claude Pro** (circa 20 $ al mese).
- **Il tuo accesso a B1**, lo stesso che usi per B1 Admin.

</div>

:::tip Consigliato: prova gratuitamente
Claude è il modo più semplice per collegare B1 all'intelligenza artificiale, e funziona con il **piano gratuito** di Claude: un modo perfetto per la tua chiesa di provarlo prima di pagare qualsiasi cosa.
:::

Ci sono due modi per collegarsi. **L'opzione 1 è la più semplice**: nessuna chiave e nessuna installazione.

## Opzione 1 — Accedi con B1 (la più semplice) {#option-1--sign-in-with-b1-easiest}

Funziona sul sito di Claude, nell'app desktop di Claude e nell'app di Claude per il telefono: configuralo una volta sola e sarà attivo su tutti.

### Passaggio 1 — Apri le impostazioni dei connettori di Claude {#step-1--open-claudes-connector-settings}

1. Vai su [claude.ai](https://claude.ai) e accedi (oppure crea un account gratuito).
2. Clicca sul tuo nome nell'angolo in basso a sinistra, poi su **Impostazioni** → **Connettori**.

### Passaggio 2 — Aggiungi B1 {#step-2--add-b1}

1. Clicca su **Aggiungi**, poi su **Aggiungi connettore personalizzato**.
2. **Nome:** scrivi `B1`.
3. **URL:** incolla `https://api.churchapps.org/mcp`
4. Lascia invariate le altre opzioni e clicca su **Aggiungi**.

### Passaggio 3 — Accedi a B1 {#step-3--sign-in-to-b1}

1. Clicca su **Connetti**. Si apre una pagina di accesso di B1.
2. Accedi con il tuo account B1. Se appartieni a più di una chiesa, controlla che la pagina indichi la chiesa giusta ("Vuoi accedere ai seguenti dati di *la tua chiesa*…").
3. B1 elenca ciò che Claude sta chiedendo (**Tutto ciò a cui il tuo account B1 può accedere**), segnala che l'app si è registrata da sola in B1 e conferma che verrai riportato su **claude.ai**. Clicca su **Consenti**.

Torni in Claude e B1 risulta collegato.

### Passaggio 4 — Fagli una domanda {#step-4--ask-it-something}

Inizia una **nuova chat** e prova con:

- *"Quante persone ci sono nella nostra chiesa?"*
- *"Elenca i nostri gruppi attivi."*
- *"Riassumi le donazioni di questo mese per fondo."*
- *"Chi si è unito alla chiesa negli ultimi 30 giorni?"*

La prima volta, Claude chiede il permesso di usare B1: clicca su **Consenti**.

## Opzione 2 — Estensione per desktop con una chiave B1 {#option-2--desktop-extension-with-a-b1-key}

Usa questa opzione se preferisci dare a Claude una chiave con permessi limitati (ad esempio, solo lettura). Funziona nell'app desktop di Claude per Mac o Windows, e per creare la chiave ti serve il permesso di gestire le impostazioni della chiesa in B1.

### Passaggio 1 — Scarica l'app Claude {#step-1--get-the-claude-app}

Scarica l'app Claude da [claude.com/download](https://claude.com/download), installala, aprila e accedi.

### Passaggio 2 — Crea la tua chiave B1 {#step-2--make-your-b1-key}

La chiave è ciò che permette a Claude di accedere a *B1 della tua chiesa*: pensala come una password dedicata solo a Claude.

1. Accedi a [B1 Admin](https://admin.b1.church) e vai su [Impostazioni → Sviluppatori](https://admin.b1.church/settings/developer).
2. Nella scheda **Chiavi API**, clicca su **Nuova chiave API**.
3. **Nome:** scrivi `Claude`.
4. **Ambiti:** seleziona cosa può fare Claude. La maggior parte delle aree ha una casella **lettura** (solo consultazione) e una casella **scrittura** (per apportare modifiche); i moduli hanno solo **forms:write**. Non sei sicuro? Per iniziare, seleziona solo le caselle **lettura**: in seguito potrai creare una nuova chiave con più permessi.
5. Clicca su **Salva**, poi su **Copia** la chiave. Viene mostrata una sola volta, quindi passa direttamente al Passaggio 3.

### Passaggio 3 — Aggiungi B1 a Claude {#step-3--add-b1-to-claude}

1. [Scarica l'estensione B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Fai doppio clic** sul file scaricato (`b1-churchapps.mcpb`). Claude si apre e mostra **B1 (ChurchApps)**.
3. Clicca su **Installa**.
4. Quando ti chiede la tua **chiave API B1**, incolla la chiave del Passaggio 2 e salva.
5. **Chiudi completamente Claude** (Mac: **Cmd+Q** · Windows: fai clic destro sull'icona di Claude nella barra delle applicazioni → **Esci**) e riaprilo.

Se il doppio clic non apre Claude, vai su **Impostazioni → Estensioni → Impostazioni avanzate → Installa estensione…** in Claude e scegli il file scaricato. Poi inizia una nuova chat e fagli una domanda.

:::tip Hai già installato l'estensione?
Non c'è nulla da fare: FreePlay funziona con la stessa connessione. L'unica eccezione è la versione 1.1.0, che chiedeva un'email e una password di B1: scarica di nuovo l'estensione e installala per aggiornarla. La tua chiave resta valida.
:::

## È sicuro? {#is-it-safe}

- Claude può vedere solo i dati **della tua chiesa**.
- **Con accesso tramite login (Opzione 1):** Claude non può mai fare più di quanto possa fare il tuo stesso accesso a B1. La pagina di accesso di B1 mostra ciò che Claude chiede prima che tu clicchi su **Consenti**.
- **Con una chiave (Opzione 2):** Claude può fare solo ciò che la chiave consente in B1: una chiave con solo le caselle **lettura** selezionate può consultare ma non modificare nulla. FreePlay funziona allo stesso modo, con la stessa chiave.
- **Per disattivarlo:** in B1 Admin vai su **Impostazioni → Sviluppatori** e revoca l'app in **App collegate** (Opzione 1) oppure elimina la chiave in **Chiavi API** (Opzione 2). L'accesso si interrompe subito. Puoi anche cliccare su **Disconnetti** sul connettore B1 in Claude.

## Quanto costa? {#what-does-it-cost}

Il collegamento a B1 è gratuito: fa parte di ChurchApps. Claude stesso ha un piano gratuito; Claude Pro (circa 20 $ al mese) offre molto più utilizzo. Vedi [claude.com/pricing](https://claude.com/pricing).

## Dettagli tecnici {#technical-details}

Il resto di questa pagina è rivolto a utenti tecnici e assistenti AI: ambiti, altri modi per collegarsi e funzionamento.

### Ambiti {#scopes}

Claude comunica con B1 tramite il **server Model Context Protocol (MCP)** integrato nell'API di B1 (`https://api.churchapps.org/mcp`). Ogni chiamata passa attraverso le stesse regole di autenticazione, permessi e isolamento per chiesa di una richiesta da B1 Admin. Claude è limitato ai **permessi e agli ambiti** della chiave API e non può accedere ai webhook dei fornitori di pagamento, agli endpoint di amministrazione dei client OAuth né agli endpoint di accesso e password.

Set di ambiti iniziali più comuni:

- **Assistente in sola lettura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lettura + aggiunta di note / compiti:** aggiungi `people:write`
- **Assistente operativo completo:** aggiungi gli ambiti `:write` corrispondenti che desideri

Una chiave con `donations:read` permette a Claude di riassumere le donazioni, ma non di registrare un dono. Una chiave con `people:write` può aggiungere una persona, ma non vedere le donazioni. Vedi [Chiavi API](/docs/developer/api/api-keys) per ciò che consente ciascun ambito.

### Altri modi per collegarsi {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

In un terminale:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Fatto. In qualsiasi sessione di Claude Code, digita `/mcp` per verificare che il server `b1` sia connesso, poi fai a Claude una domanda qualsiasi sulla tua chiesa.

#### Claude Desktop — configurazione manuale (avanzata) {#claude-desktop--manual-config-advanced}

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

Riavvia Claude Desktop. Il menu dei connettori nella barra di scrittura della chat mostrerà `b1` con i suoi strumenti.

#### Claude.ai (web) — Connettore personalizzato {#claudeai-web--custom-connector}

Vedi l'**Opzione 1** qui sopra. Il connettore usa OAuth 2.1: Claude individua il server di autorizzazione di B1 partendo da `https://api.churchapps.org/.well-known/oauth-protected-resource`, si registra con la Dynamic Client Registration e accede con PKCE. Con i piani Team ed Enterprise, un proprietario potrebbe dover aggiungere prima il connettore per l'organizzazione. Claude non richiede ambiti specifici, quindi la pagina di consenso offre tutto ciò a cui può accedere l'account B1 con cui hai effettuato l'accesso. Per revocarlo, vai su **Impostazioni → Sviluppatori → App collegate** in B1 Admin.

### Come funziona {#how-it-works}

L'API di B1 espone un unico endpoint MCP su `/mcp`. Claude vi si collega, si autentica con la tua chiave `cak_…` e ottiene l'accesso a quattro strumenti:

| Strumento | Cosa fa |
|---|---|
| `list_endpoints` | Elenca gli endpoint REST che Claude può chiamare, filtrabili per percorso. Serve per la ricerca. |
| `describe_endpoint` | Restituisce un breve riepilogo e un esempio di richiesta/risposta per un endpoint specifico. |
| `api_call` | Invoca effettivamente un endpoint REST come utente autenticato. |
| `describe_page_builder` | Una guida per costruire e modificare le pagine del sito della tua chiesa, che Claude legge prima di lavorare sui contenuti del sito. |

Si tratta della stessa superficie `/membership/people`, `/giving/donations`, `/attendance/visits` ecc. che usa B1 Admin: ogni regola di autorizzazione si applica in modo identico. Gli endpoint di FreePlay (lessons.church) sono elencati sotto `/lessons/*`; le chiamate di Claude verso di essi vengono inoltrate a FreePlay come lo stesso utente, con gli stessi permessi.

### Sicurezza e limiti {#safety-and-limits}

- **Isolamento per chiesa.** La chiave API è associata a una sola chiesa. Claude non ha modo di vedere i dati di altre chiese.
- **Limitato dai permessi.** Se rimuovi un permesso alla persona che ha creato la chiave in B1 Admin, Claude lo perde alla chiamata successiva, all'istante.
- **Revocabile.** Elimina la chiave in **Impostazioni → Sviluppatori → Chiavi API** e l'accesso di Claude termina immediatamente.
- **Lista di blocco.** Gli endpoint dei webhook dei fornitori di pagamento, gli endpoint di amministrazione dei client OAuth e gli endpoint di accesso, registrazione, password e autenticazione a due fattori non sono richiamabili tramite MCP.
- **Limite di dimensione delle risposte.** Una singola risposta di uno strumento è limitata a 64 KB, così le liste lunghe non saturano il contesto di Claude: in questo caso Claude restringerà la query con dei filtri.
- **Registro delle modifiche.** Le modifiche passano attraverso lo stesso registro delle attività delle azioni di B1 Admin; puoi consultarle in **Impostazioni → Registro delle attività**.

### Risoluzione dei problemi {#troubleshooting}

**Claude chiede un'email e una password di B1 per usare FreePlay:** hai la versione 1.1.0 dell'estensione desktop. Scaricala e installala di nuovo per aggiornarla: le versioni più recenti usano solo la tua chiave.

**Claude segnala "Unauthorized" o 401:** il token Bearer manca, è malformato oppure la chiave è stata revocata. Se hai usato l'estensione, apri **Impostazioni → Estensioni → B1 (ChurchApps)** in Claude e incolla di nuovo la chiave. Altrimenti ricontrolla l'intestazione `Authorization: Bearer cak_…` (fai attenzione allo spazio e alla parola `Bearer` così com'è).

**Una chiamata a uno strumento restituisce 403:** la chiave API non ha l'ambito per quell'endpoint. Aggiungi l'ambito in **Impostazioni → Sviluppatori → Chiavi API** (dovrai creare una nuova chiave: gli ambiti non si possono modificare sul posto) e incolla la nuova chiave nelle impostazioni dell'estensione o nella configurazione di Claude.

**Claude non trova un endpoint:** chiedigli di chiamare `list_endpoints` con un filtro, ad esempio *"usa list_endpoints con il filtro 'donations' per trovare il percorso giusto"*. L'elenco delle rotte è generato dall'API in funzione, quindi tutto ciò che puoi raggiungere con `curl` è presente.

**Sviluppo locale:** sostituisci `https://api.churchapps.org/mcp` con `http://localhost:8084/mcp`: stessa autenticazione, stessi strumenti.

## Correlati {#related}

- [Chiavi API](/docs/developer/api/api-keys) — riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) — dettagli del protocollo e schemi degli strumenti
- [ChatGPT](./chatgpt.md) — stessa idea, per i modelli di OpenAI
