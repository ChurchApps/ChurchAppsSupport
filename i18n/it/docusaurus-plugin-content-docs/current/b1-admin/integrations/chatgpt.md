---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Collega ChatGPT ai dati di B1 della tua chiesa e fagli domande in linguaggio semplice — risponde usando i record live della tua chiesa. Puoi anche chiedergli di aiutarti con cose che richiederebbero diversi passaggi in B1 Admin.

**Alcune cose che puoi chiedere:**
- *"Mostrami tutti coloro che hanno partecipato la scorsa settimana ma non sono stati assegnati a un piccolo gruppo"*
- *"Riassumi le donazioni di questo mese per fondo"*
- *"Chi sono i nostri nuovi membri e li abbiamo contattati?"*
- *"Non riesco a capire come fare X in B1 — puoi guidarmi?"*

</div>

<div class="prereqs">
<h4>Cosa ti serve</h4>

- **L'app desktop di ChatGPT** per Mac o Windows
- **Un piano ChatGPT a pagamento** (Plus o superiore). Gli account ChatGPT gratuiti non possono connettersi a B1.
- **Il tuo accesso a B1** con l'autorizzazione a gestire le impostazioni della chiesa (necessaria per creare una chiave). Non ce l'hai? Chiedi all'amministratore B1 della tua chiesa.

</div>

:::tip Consigliato: prova prima Claude — è gratuito
[Claude](./claude) si collega a B1 con il suo **piano gratuito** e si configura in meno di 3 minuti — basta aggiungere B1 come connettore e accedere con il tuo account B1. Nessuna chiave necessaria. È il modo più semplice per la tua chiesa di provare l'intelligenza artificiale con B1 prima di pagare qualsiasi cosa.
:::

## Configurazione

Le schermate potrebbero apparire leggermente diverse nella tua versione di ChatGPT.

---

**Passaggio 1 — Crea la tua chiave B1**

La chiave è ciò che permette a ChatGPT di entrare nel B1 della *tua* chiesa — pensala come una password solo per ChatGPT.

1. Accedi a [B1 Admin](https://admin.b1.church) e vai a [Impostazioni → Sviluppatore](https://admin.b1.church/settings/developer).
2. Nella scheda **Chiavi API**, fai clic su **Nuova chiave API** e chiamala `ChatGPT`.
3. **Ambiti:** seleziona cosa può fare ChatGPT. Ogni area ha una casella **read** (solo visualizzazione) e una casella **write** (apportare modifiche). Non sei sicuro? Per iniziare seleziona solo le caselle **read**.
4. Fai clic su **Salva**, poi **Copia** la chiave (inizia con `cak_`). Viene mostrata una sola volta.

---

**Passaggio 2 — Fai clic sul tuo nome nell'angolo in basso a sinistra di ChatGPT**

![Fai clic sul tuo nome di profilo](/img/guides/chatgpt-mcp/01.png)

---

**Passaggio 3 — Fai clic su Settings (Impostazioni)**

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
| **Bearer token env var** | Lascia vuoto |
| **Headers** | Fai clic su **+ Add header** → Key: `Authorization` → Value: vedi sotto |

![Esempio compilato che mostra Authorization nella Key e Bearer key nel Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — la parola Bearer, uno spazio, quindi la tua chiave

Fai clic su **Save**.

Questo è tutto! Torna a una chat e chiedi qualcosa come *"Quante persone ci sono nella nostra chiesa?"* e ChatGPT estrarrà la risposta direttamente da B1.

---

## È sicuro?

- ChatGPT può vedere solo i dati della **tua chiesa**.
- Può fare solo ciò che la tua chiave consente — una chiave con solo le caselle **read** selezionate può guardare ma non modificare mai nulla.
- Per disattivarlo, elimina la chiave in B1 Admin in **Impostazioni → Sviluppatore**. L'accesso si interrompe immediatamente.

## Quanto costa?

Il collegamento a B1 è gratuito — fa parte di ChurchApps. ChatGPT richiede un piano a pagamento (Plus o superiore) per connettersi; consulta i prezzi di OpenAI.

## Dettagli tecnici

Il resto di questa pagina è per utenti tecnici e assistenti AI. Il server MCP di B1 si trova su `https://api.churchapps.org/mcp` (Streamable HTTP) e accetta la chiave API come intestazione `Authorization: Bearer cak_…`. Vedi il [riferimento per sviluppatori del server MCP](/docs/developer/api/mcp).

### Custom GPT con Azioni

Un Custom GPT ti permette di creare un assistente dedicato che il tuo intero team può condividere — aprono un link e iniziano a fare domande senza alcuna configurazione da parte loro. Richiede un account ChatGPT Plus, Team o Enterprise e circa 10 minuti.

#### 1. Crea una chiave API

Segui il Passaggio 1 di Configurazione qui sopra se non l'hai già fatto.

#### 2. Costruisci il Custom GPT

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
6. **Publish** (Pubblica) il GPT (Only me / Anyone with link / Organization) e condividi il link con il tuo team.

#### 3. Usalo

Chiunque abbia il link può fare domande in linguaggio naturale. Gli ambiti della chiave si applicano comunque — una chiave di sola lettura rifiuta le scritture indipendentemente da cosa dice lo schema di azione.

---

### Sicurezza e limiti

- **Isolamento per chiesa.** La chiave API si risolve in una sola chiesa. ChatGPT non può vedere i dati di altre chiese.
- **Limitato dai permessi.** La chiave porta solo gli ambiti che hai concesso. Rimuovere un ambito (eliminando e ricreando la chiave) taglia quell'accesso alla prossima chiamata.
- **Revocabile istantaneamente.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API** e l'accesso termina immediatamente.
- **Condividere un Custom GPT condivide i dati.** Chiunque abbia accesso al GPT può vedere tutto ciò che gli ambiti della chiave consentono. Preferisci ambiti più ristretti (ad esempio ometti `donations:read`) per i GPT condivisi ampiamente.
- **Traccia di audit.** Qualsiasi modifica apportata tramite ChatGPT passa attraverso lo stesso registro di audit delle azioni di B1 Admin — trovale in **Impostazioni → Registro di audit**.

### Risoluzione dei problemi

**Il connettore MCP dice "Unauthorized" o mostra un errore 401:** la tua chiave API manca o è errata. Apri le impostazioni del connettore e controlla l'intestazione **Authorization**: il valore deve essere la parola `Bearer`, uno spazio, quindi la chiave `cak_…` completa senza spazi extra.

**ChatGPT dice che non può trovare determinati dati:** la chiave potrebbe non avere gli ambiti giusti. Crea una nuova chiave in **Impostazioni → Sviluppatore → Chiavi API** con gli ambiti aggiuntivi e aggiorna il connettore.

**L'azione del Custom GPT restituisce 401:** nel pannello di autenticazione dell'azione conferma che **Auth Type: Bearer** sia selezionato e che la chiave non includa la parola `Bearer` (ChatGPT la aggiunge automaticamente).

**L'azione del Custom GPT restituisce 403:** la chiave non ha l'ambito per quell'endpoint. Crea una nuova chiave con gli ambiti corretti e aggiorna il GPT.

**Lo schema di azione viene rifiutato:** ChatGPT richiede OpenAPI 3.1 con almeno una voce `paths` e un URL `servers`. Convalida il YAML su [editor.swagger.io](https://editor.swagger.io) prima di incollarlo.

## Correlati

- [Chiavi API](/docs/developer/api/api-keys) — riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) — dettagli del protocollo e schemi degli strumenti
- [Claude](./claude) — stessa idea, per i modelli di Anthropic
- [Riferimento API REST](/docs/developer/api/endpoints) — ogni endpoint che un'azione di un Custom GPT può chiamare
