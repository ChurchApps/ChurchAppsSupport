---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Collega ChatGPT di OpenAI ai dati di B1 della tua chiesa e lascia che faccia il lavoro pesante. Una volta connesso, ChatGPT può vedere i tuoi record di chiesa live e aiutarti a fare cose che altrimenti richiederebbero diversi passaggi in B1 Admin — o che non potresti capire come fare affatto.

**Alcune cose che puoi chiedere:**
- *"Configura le aule della Scuola Domenicale e metti ogni insegnante nella stanza giusta in base al loro gruppo"*
- *"Mostrami tutti coloro che hanno partecipato la scorsa settimana ma non sono stati assegnati a un piccolo gruppo"*
- *"Riassumi le donazioni di questo mese per fondo"*
- *"Chi sono i nostri nuovi membri e li abbiamo contattati?"*
- *"Non riesco a capire come fare X in B1 — puoi guidarmi o farlo per me?"*

ChatGPT estrae le risposte e intraprende le azioni direttamente dai tuoi dati di B1, con ambito limitato alla sola tua chiesa.

:::tip Consigliato: Claude Code
Per l'esperienza MCP più fluida, [Claude Code](./claude) è il client consigliato — la configurazione richiede un comando e funziona pronta all'uso. ChatGPT funziona bene ed è un'ottima scelta se il tuo team lo sta già utilizzando.
:::

Due percorsi sono supportati: il **MCP Connector** (integrato in ChatGPT) e un **Custom GPT** per i team che desiderano un assistente condivisibile.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Un admin di chiesa con il permesso **Edit Settings** in B1 Admin (necessario per creare una chiave API)
- Un account **ChatGPT Plus, Pro, Team o Enterprise**

</div>

## Guida di Configurazione Veloce

Segui questi passaggi nell'**app desktop di ChatGPT** (Mac/Windows). Le schermate potrebbe apparire leggermente diverse in altre versioni.

---

**Passaggio 1 — Ottieni la tua chiave API da B1 Admin prima**

Prima di toccare ChatGPT, crea una chiave API in B1 Admin in modo da averla pronta per incollare:

1. Vai a **Settings → Developer → API Keys** in B1 Admin
2. Fai clic su **New API Key**, nomina la chiave `ChatGPT`, scegli i tuoi ambiti (inizia con `people:read`, `groups:read`, `attendance:read`, `donations:read`) e fai clic su **Save**
3. Copia la chiave `cak_…` — viene mostrata solo una volta

---

**Passaggio 2 — Fai clic sul tuo nome nell'angolo in basso a sinistra di ChatGPT**

![Fai clic sul tuo nome di profilo](/img/guides/chatgpt-mcp/01.png)

---

**Passaggio 3 — Fai clic su Settings**

![Fai clic su Settings dal menu](/img/guides/chatgpt-mcp/02.png)

---

**Passaggio 4 — Fai clic su Plugins nella barra laterale sinistra**

![Fai clic su Plugins in Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Passaggio 5 — Fai clic sulla scheda MCPs**

![Fai clic sulla scheda MCPs](/img/guides/chatgpt-mcp/04.png)

Vedrai qui tutti i server MCP che hai già aggiunto.

---

**Passaggio 6 — Fai clic su Add → Add MCP server**

![Fai clic su Add e poi Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Passaggio 7 — Compila il modulo e fai clic su Save**

![Connetti a un modulo MCP personalizzato](/img/guides/chatgpt-mcp/07.png)

Fai clic su **Streamable HTTP**, quindi compila:

| Campo | Cosa inserire |
|---|---|
| **Name** | `B1 Church` (o qualsiasi nome tu preferisca) |
| **Type** | Fai clic su **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Lasciare vuoto |
| **Headers** | Fai clic su **+ Add header** → Key: `Authorization` → Value: vedi sotto |

![Esempio compilato che mostra Authorization nella Key e Bearer key nel Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — la parola Bearer, uno spazio, quindi la tua chiave

Fai clic su **Save**.

Questo è tutto! Torna a una chat e chiedi qualcosa come *"Quante persone ci sono nella nostra chiesa?"* e ChatGPT estrarrà la risposta direttamente da B1.

---

## Passaggio 1 — Crea una Chiave API in B1 Admin

Ogni connessione a B1 utilizza una chiave API che crei. Questa chiave identifica la tua chiesa, controlla cosa ChatGPT può vedere e può essere revocata in qualsiasi momento.

1. Apri **B1 Admin** e vai a **Settings → Developer → API Keys**.
2. Fai clic su **New API Key**.
3. Dai un nome alla chiave — `ChatGPT` funziona bene.
4. Seleziona gli ambiti (permessi) che ChatGPT dovrebbe avere. Un buon set iniziale per un assistente di sola lettura:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Fai clic su **Save**.
6. Copia la chiave completa che appare — inizia con `cak_` e viene mostrata **una sola volta**. Incollala da qualche parte al sicuro.

:::tip
Se hai mai bisogno di revocare l'accesso di ChatGPT, torna a **Settings → Developer → API Keys** e elimina la chiave. L'accesso termina immediatamente.
:::

---

## Percorso A — ChatGPT MCP Connector (Consigliato)

Questo è il modo più semplice per connettersi. ChatGPT ha una finestra di dialogo integrata "Connetti a un MCP personalizzato" che funziona direttamente con il server MCP di B1 — nessun Custom GPT richiesto.

### Cosa ti serve

- La tua chiave `cak_…` dal Passaggio 1

### Apri il connettore MCP in ChatGPT

In ChatGPT, vai a **Settings → Plugins → MCPs** e fai clic su **Add → Add MCP server**.

### Compila la finestra di dialogo

Fai clic su **Streamable HTTP**, quindi usa questi valori:

| Campo | Valore |
|---|---|
| **Name** | `B1 Church` (o qualsiasi nome tu preferisca) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Lasciare vuoto |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_yourprefix.yoursecret` |

Per il campo Value, digita la parola `Bearer`, uno spazio, quindi incolla la tua chiave — il tutto nella stessa casella. Esempio: `Bearer cak_prefix.secret`.

Fai clic su **Save**.

### Chiedi qualcosa a ChatGPT

Una volta connesso, chiedi semplicemente in linguaggio naturale — nessun comando speciale necessario:

- *"Quante persone ci sono nella nostra chiesa?"*
- *"Chi si è iscritto negli ultimi 30 giorni?"*
- *"Quali gruppi sono attivi in questo momento?"*
- *"Riassumi le donazioni di questo mese per fondo."*

ChatGPT chiamerà B1 dietro le quinte e risponderà dai tuoi dati live.

---

## Percorso B — Custom GPT con Azioni

Un Custom GPT ti permette di creare un assistente dedicato che il tuo intero team può condividere — apre un link e inizia a fare domande senza alcuna configurazione da parte loro. Richiede un account ChatGPT Plus, Team o Enterprise e circa 10 minuti.

### 1. Crea una chiave API

Segui il Passaggio 1 sopra se non l'hai già fatto.

### 2. Costruisci il Custom GPT

1. In ChatGPT, fai clic sul tuo profilo → **My GPTs** → **Create a GPT**.
2. Passa alla scheda **Configure**, dai al GPT un nome (ad esempio "B1 Assistant") e aggiungi istruzioni:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scorri fino a **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** incolla la tua chiave `cak_…`
   - **Auth Type:** Bearer
   - Salva.

4. Nella casella **Schema**, incolla questo spec OpenAPI iniziale:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Salva l'azione. Provala: *"how many people are in the church?"* — ChatGPT chiama `listPeople` e risponde.
6. **Pubblica** il GPT (Only me / Anyone with link / Organization) e condividi il link con il tuo team.

### 3. Usalo

Chiunque abbia il link può fare domande in linguaggio naturale. Gli ambiti della chiave si applicano comunque — una chiave di sola lettura rifiuta le scritture indipendentemente da cosa dice lo schema di azione.

---

## Sicurezza e Limiti

- **Isolamento per chiesa.** La chiave API si risolve in una sola chiesa. ChatGPT non può vedere i dati di altre chiese.
- **Ambito di permessi.** La chiave porta solo gli ambiti che hai concesso. Rimuovere un ambito (eliminando e ricreando la chiave) taglia quell'accesso alla prossima chiamata.
- **Revocabile istantaneamente.** Elimina la chiave in **Settings → Developer → API Keys** e l'accesso termina immediatamente.
- **Condividere un Custom GPT condivide i dati.** Chiunque abbia accesso al GPT può vedere tutto ciò che gli ambiti della chiave consentono. Preferisci ambiti più ristretti (ad esempio ometti `donations:read`) per i GPT condivisi ampiamente.
- **Audit trail.** Qualsiasi modifica apportata tramite ChatGPT passa attraverso lo stesso audit log delle azioni di B1 Admin — trovale in **Reports → Audit Log**.

## Costo

ChurchApps è gratuito e open-source — l'API che ChatGPT chiama fa parte di quello che la tua chiesa esegue già. OpenAI addebita l'utilizzo di ChatGPT secondo i loro piani. Non c'è un costo per chiamata da ChurchApps.

## Risoluzione dei Problemi

**Il connettore MCP dice "Unauthorized" o mostra un errore 401:** la tua chiave API manca o è errata. Apri le impostazioni del connettore e verifica che la chiave nell'argomento `Authorization:Bearer` sia il valore `cak_…` completo senza spazi extra.

**ChatGPT dice che non può trovare determinati dati:** la chiave potrebbe non avere gli ambiti giusti. Crea una nuova chiave in **Settings → Developer → API Keys** con gli ambiti aggiuntivi e aggiorna il connettore.

**Il comando `npx` non riesce:** Node.js potrebbe non essere installato. Scaricalo e installalo da [nodejs.org](https://nodejs.org), quindi prova a salvare il connettore di nuovo.

**L'azione Custom GPT restituisce 401:** nel pannello di autenticazione dell'azione conferma che **Auth Type: Bearer** sia selezionato e la chiave non includa la parola `Bearer` (ChatGPT la aggiunge automaticamente).

**L'azione Custom GPT restituisce 403:** la chiave non ha l'ambito per quell'endpoint. Crea una nuova chiave con gli ambiti corretti e aggiorna il GPT.

**Lo schema di azione viene rifiutato:** ChatGPT richiede OpenAPI 3.1 con almeno una voce `paths` e un URL `servers`. Convalida il YAML in [editor.swagger.io](https://editor.swagger.io) prima di incollare.

## Correlato

- [Chiavi API](/docs/developer/api/api-keys) — riferimento completo degli ambiti
- [MCP Server (riferimento sviluppatore)](/docs/developer/api/mcp) — dettagli del protocollo e schemi degli strumenti
- [Claude](./claude) — stessa idea, per i modelli di Anthropic
- [Riferimento API REST](/docs/developer/api/endpoints) — ogni endpoint che un'azione Custom GPT può chiamare
