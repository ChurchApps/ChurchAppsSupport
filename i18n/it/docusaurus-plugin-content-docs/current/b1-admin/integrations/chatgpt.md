---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connetti ChatGPT di OpenAI ai dati B1 della tua chiesa in modo da poter fare domande come "chi non è stato in un gruppo questo trimestre?" o "riassumi le donazioni per il fondo di costruzione questo mese" e lasciare che ChatGPT estragga le risposte direttamente da B1. Sono supportati due percorsi: un **Custom GPT** che funziona su qualsiasi piano ChatGPT Plus, e il **server MCP** per strumenti per sviluppatori che lo supportano.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Un amministratore della chiesa con l'autorizzazione **Edit Settings** (per creare una chiave API)
- Un account **ChatGPT Plus, Pro, Team, o Enterprise** (il piano gratuito non può utilizzare Custom GPT o Connectors)
- L'URL completo della tua B1 API — solitamente `https://api.churchapps.org` per le chiese ospitate, o il tuo host Api self-hosted

</div>

## Scegli il Percorso Giusto

| Percorso | Piano Necessario | Impegno | Cosa Ottieni |
|---|---|---|---|
| **Custom GPT con Actions** | ChatGPT Plus / Team / Enterprise | 10 minuti | Un GPT condivisibile che chiama l'API REST di B1 per qualsiasi membro del team |
| **MCP via OpenAI tooling** | Developer / Agent SDK / Pro Connectors | Più | Scoperta completa tramite il server MCP, adatto ai tool di codifica e alle piattaforme di agenti |

Per la maggior parte delle chiese il percorso **Custom GPT** è la risposta giusta — non richiede alcuna configurazione per sviluppatori, funziona all'interno dell'app ChatGPT regolare e dei client mobili, e può essere condiviso con il tuo team. Il percorso MCP è documentato di seguito per il personale tecnico che utilizza gli strumenti per sviluppatori di OpenAI o le piattaforme di agenti.

## Percorso A — Custom GPT con Actions

Questo collega ChatGPT direttamente all'API REST di B1. Il tuo Custom GPT sarà in grado di leggere e (facoltativamente) scrivere record B1 per conto di chiunque lo utilizzi.

### 1. Crea una chiave API

1. In B1Admin vai a **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova Chiave API**, denominala `ChatGPT` e scegli gli scope. Set di avviamento comuni:
   - **Assistente di sola lettura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Lettura + scrittura:** aggiungi i matching scope `:write`
3. Salva e copia la chiave completa `cak_…`.

Vedi [Chiavi API](/docs/developer/api/api-keys) per l'elenco completo degli scope.

### 2. Crea il Custom GPT

1. In ChatGPT, fai clic sul tuo profilo → **I Miei GPT** → **Crea un GPT**.
2. Passa alla scheda **Configura** e dai al GPT un nome (ad es. "Assistente B1") e istruzioni come:

   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.

3. Scorri fino a **Actions** → **Crea nuova action** → **Autenticazione**.
   - **Tipo di autenticazione:** Chiave API
   - **Chiave API:** `cak_<prefix>.<secret>`
   - **Tipo di Autenticazione:** Bearer
   - Salva.
4. Nella casella **Schema**, incolla una specifica OpenAPI minima che descrive gli endpoint che desideri che il GPT utilizzi.

5. Salva l'action. Testala con un prompt come "quante persone ci sono nella chiesa?" — ChatGPT chiamerà listPeople e risponderà.
6. **Pubblica** il GPT (Solo io / Chiunque abbia il link / Organizzazione) e condividi con il tuo team.

### 3. Usalo

Chiunque condividi il GPT con può fare domande in linguaggio naturale — ChatGPT sceglie l'action giusta, chiama B1 e risponde. Gli scope della chiave si applicano comunque: una chiave di sola lettura rifiuterà le scritture indipendentemente dall'action definita nello schema.

## Percorso B — MCP via OpenAI tooling

L'API B1 include un server MCP in `/mcp` che qualsiasi tool OpenAI consapevole di MCP può utilizzare — ad esempio l'OpenAI Agents SDK, lo strumento MCP dell'API Responses, o piattaforme di agenti di terze parti che consumono server MCP.

Autentica con la stessa chiave `cak_…` nell'intestazione Authorization: Bearer. Tre strumenti sono esposti: list_endpoints, describe_endpoint e api_call. Vedi il riferimento per sviluppatori del Server MCP per il protocollo, il trasporto e gli schemi degli strumenti.

I "Connectors" integrati di ChatGPT (Pro/Business/Enterprise) attualmente si aspettano server MCP con specifiche forme di strumenti search e fetch e autenticazione basata su OAuth, che il server MCP B1 non pubblica. Per ChatGPT all'interno dell'app consumer, il percorso Custom GPT sopra è la scelta pratica.

## Sicurezza e Limiti

- **Isolamento per chiesa.** La chiave API si risolve in una chiesa. ChatGPT non può vedere i dati di altre chiese.
- **Permesso-scoped.** Se rimuovi un'autorizzazione dalla persona che ha creato la chiave, ChatGPT la perde alla prossima chiamata — istantaneamente.
- **Revocabile.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API** e l'accesso di ChatGPT termina immediatamente.
- **Condividere un Custom GPT condivide i dati.** Chiunque abbia accesso al GPT può fargli domande e vedere qualsiasi cosa per cui la chiave ha scope. Limita la condivisione al personale che dovrebbe vedere quei dati, e preferisci scope più stretti (ad es. ometti `donations:read` per un GPT condiviso ampiamente).
- **Audit trail.** Le mutazioni passano attraverso lo stesso audit log delle azioni B1Admin; revisionalo sotto **Rapporti → Registro Di Controllo**.

## Costo

ChurchApps è gratuito e open-source — l'API che il tuo Custom GPT chiama fa parte dell'API che la tua chiesa esegue già. OpenAI addebita l'utilizzo di ChatGPT secondo i loro piani. Non c'è alcun costo per chiamata da ChurchApps.

## Risoluzione dei Problemi

**Action restituisce 401:** l'intestazione bearer non è impostata correttamente. Nel pannello di autenticazione dell'action assicurati che **Auth Type: Bearer** sia selezionato e il valore della chiave non includa la parola `Bearer` (ChatGPT la prepone per te).

**Action restituisce 403:** la chiave non ha lo scope per quell'endpoint. Crea una nuova chiave con gli scope giusti e aggiorna il GPT.

**ChatGPT chiama l'action sbagliata:** stringi i campi `summary` e `description` nello schema OpenAPI in modo che il modello scelga quello giusto. Aggiungere query di esempio alle istruzioni del GPT aiuta anche.

**Il pannello di action rifiuta lo schema:** ChatGPT richiede OpenAPI 3.1 con almeno una voce `paths` e un URL `servers`. Valida l'YAML in qualsiasi validatore OpenAPI online prima di incollarlo.

**Sviluppo locale:** punta l'URL dei `servers` dell'action al tuo Api locale (ad es. `http://localhost:8084`) — ma nota che le actions di ChatGPT chiamano solo URL pubblici, quindi per test locali usa un tunnel come ngrok o colpisci l'API direttamente con curl per confermare prima la chiave.

## Correlati

- Chiavi API — riferimento completo degli scope
- Server MCP (riferimento per sviluppatori) — dettagli del protocollo e schemi degli strumenti
- Claude — la stessa idea, per i modelli di Anthropic
- Riferimento all'API REST — ogni endpoint che un'action di Custom GPT può colpire
