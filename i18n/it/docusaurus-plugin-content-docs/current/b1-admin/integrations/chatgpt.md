---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Collega ChatGPT ai dati B1 della tua chiesa e fagli domande in linguaggio naturale -- risponderà basandosi sui tuoi registri aggiornati. Puoi anche chiedergli di aiutarti con operazioni che in B1 Admin richiederebbero diversi passaggi.

**Alcune cose che puoi chiedere:**
- *"Mostrami tutti quelli che hanno partecipato la settimana scorsa ma non sono stati assegnati a un piccolo gruppo"*
- *"Riassumi le offerte di questo mese per fondo"*
- *"Chi sono i nostri membri più recenti e abbiamo fatto un follow-up con loro?"*
- *"Non riesco a capire come fare X in B1 -- mi puoi guidare passo passo?"*

</div>

<div class="prereqs">
<h4>Cosa ti serve</h4>

- **L'app desktop di ChatGPT** per Mac o Windows
- **Un piano ChatGPT a pagamento** (Plus o superiore). Gli account ChatGPT gratuiti non possono collegarsi a B1.
- **Il tuo accesso a B1** con l'autorizzazione a gestire le impostazioni della chiesa (necessaria per creare una chiave). Non ce l'hai? Chiedi all'amministratore B1 della tua chiesa.

</div>

:::tip Consigliato: prova prima Claude -- è gratuito
[Claude](./claude) si collega a B1 nel **piano gratuito** e si configura in meno di 3 minuti -- basta aggiungere B1 come connettore e accedere con il tuo account B1. Non serve nessuna chiave. È il modo più semplice per la tua chiesa di provare l'IA con B1 prima di pagare qualsiasi cosa.
:::

## Configurazione

Le schermate potrebbero apparire leggermente diverse nella tua versione di ChatGPT.

---

**Passaggio 1 — Crea la tua chiave B1**

La chiave è ciò che permette a ChatGPT di accedere a B1 *della tua chiesa* -- pensala come una password dedicata solo a ChatGPT.

1. Accedi a [B1 Admin](https://admin.b1.church) e vai su [Settings → Developer](https://admin.b1.church/settings/developer).
2. Nella scheda **API Keys**, fai clic su **New API Key** e dai un nome `ChatGPT`.
3. **Scopes:** seleziona cosa può fare ChatGPT. Ogni area ha una casella **read** (solo lettura) e una casella **write** (modifica). Non sei sicuro? Per iniziare, seleziona solo le caselle **read**.
4. Fai clic su **Save**, quindi su **Copy** per copiare la chiave (inizia con `cak_`). Viene mostrata una sola volta.

---

**Passaggio 2 — Fai clic sul tuo nome in basso a sinistra in ChatGPT**

![Fai clic sul nome del tuo profilo](/img/guides/chatgpt-mcp/01.png)

---

**Passaggio 3 — Fai clic su Settings**

![Fai clic su Settings dal menu](/img/guides/chatgpt-mcp/02.png)

---

**Passaggio 4 — Fai clic su Plugins nella barra laterale sinistra**

![Fai clic su Plugins sotto Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Passaggio 5 — Fai clic sulla scheda MCPs**

![Fai clic sulla scheda MCPs](/img/guides/chatgpt-mcp/04.png)

Qui vedrai gli eventuali server MCP che hai già aggiunto.

---

**Passaggio 6 — Fai clic su Add → Add MCP server**

![Fai clic su Add, poi su Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Passaggio 7 — Compila il modulo e fai clic su Save**

![Modulo per connettersi a un server MCP personalizzato](/img/guides/chatgpt-mcp/07.png)

Fai clic su **Streamable HTTP**, quindi compila:

| Campo | Cosa inserire |
|---|---|
| **Name** | `B1 Church` (o un nome a tua scelta) |
| **Type** | Fai clic su **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Lascia vuoto |
| **Headers** | Fai clic su **+ Add header** → Key: `Authorization` → Value: vedi sotto |

![Esempio compilato con Authorization nel campo Key e la chiave Bearer nel campo Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_tuachiave` -- la parola Bearer, uno spazio, poi la tua chiave

Fai clic su **Save**.

Ecco fatto! Torna in una chat e chiedi qualcosa come *"Quante persone ci sono nella nostra chiesa?"* e ChatGPT recupererà la risposta direttamente da B1.

---

## È sicuro?

- ChatGPT può vedere solo **i dati della tua chiesa**.
- Può fare solo ciò che la tua chiave consente -- una chiave con solo le caselle **read** selezionate può consultare ma non modificare nulla.
- Per disattivarlo, elimina la chiave in B1 Admin sotto **Settings → Developer**. L'accesso si interrompe immediatamente.

## Quanto costa?

La connessione a B1 è gratuita -- fa parte di ChurchApps. ChatGPT richiede un piano a pagamento (Plus o superiore) per collegarsi; consulta i prezzi di OpenAI.

## Dettagli tecnici

Il resto di questa pagina è destinato agli utenti esperti e agli assistenti IA. Il server MCP di B1 si trova su `https://api.churchapps.org/mcp` (Streamable HTTP) e accetta la chiave API come intestazione `Authorization: Bearer cak_…`. Vedi il riferimento per sviluppatori [Server MCP](/docs/developer/api/mcp).

### GPT personalizzato con Actions

Un GPT personalizzato ti permette di creare un assistente dedicato che l'intero team può condividere -- aprono un link e iniziano a fare domande senza alcuna configurazione. Richiede un account ChatGPT Plus, Team o Enterprise e circa 10 minuti.

#### 1. Crea una chiave API

Segui il Passaggio 1 di Configurazione sopra, se non l'hai già fatto.

#### 2. Costruisci il GPT personalizzato

1. In ChatGPT, fai clic sul tuo profilo → **My GPTs** → **Create a GPT**.
2. Passa alla scheda **Configure**, assegna al GPT un nome (ad esempio "Assistente B1") e aggiungi le istruzioni:

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

4. Nella casella **Schema**, incolla questa specifica OpenAPI di partenza:

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

5. Salva l'azione. Verificala: *"quante persone ci sono nella chiesa?"* -- ChatGPT chiama `listPeople` e risponde.
6. **Pubblica** il GPT (Solo io / Chiunque abbia il link / Organizzazione) e condividi il link con il tuo team.

#### 3. Usalo

Chiunque abbia il link può fare domande in linguaggio naturale. Gli ambiti della chiave restano validi -- una chiave di sola lettura rifiuta le scritture indipendentemente da cosa dice lo schema delle azioni.

---

### Sicurezza e limiti

- **Isolamento per chiesa.** La chiave API corrisponde a una sola chiesa. ChatGPT non può vedere i dati di altre chiese.
- **Limitata dai permessi.** La chiave porta solo gli ambiti che hai concesso. Rimuovere un ambito (eliminando e ricreando la chiave) interrompe quell'accesso alla chiamata successiva.
- **Revocabile immediatamente.** Elimina la chiave in **Settings → Developer → API Keys** e l'accesso termina subito.
- **Condividere un GPT personalizzato significa condividere i dati.** Chiunque abbia accesso al GPT può vedere tutto ciò che consentono gli ambiti della chiave. Preferisci ambiti più ristretti (ad esempio ometti `donations:read`) per i GPT condivisi in modo ampio.
- **Registro delle modifiche.** Qualsiasi modifica apportata tramite ChatGPT passa dallo stesso registro delle azioni di B1 Admin -- lo trovi in **Settings → Audit Log**.

### Risoluzione dei problemi

**Il connettore MCP dice "Unauthorized" o mostra un errore 401:** la tua chiave API manca o non è corretta. Apri le impostazioni del connettore e controlla l'intestazione **Authorization**: il valore deve essere la parola `Bearer`, uno spazio, poi l'intera chiave `cak_…` senza spazi extra.

**ChatGPT dice di non riuscire a trovare alcuni dati:** la chiave potrebbe non avere gli ambiti giusti. Crea una nuova chiave in **Settings → Developer → API Keys** con gli ambiti aggiuntivi e aggiorna il connettore.

**L'azione del GPT personalizzato restituisce 401:** nel pannello di autenticazione dell'azione, verifica che **Auth Type: Bearer** sia selezionato e che la chiave non contenga la parola `Bearer` (ChatGPT la aggiunge automaticamente).

**L'azione del GPT personalizzato restituisce 403:** la chiave non ha l'ambito per quell'endpoint. Crea una nuova chiave con gli ambiti corretti e aggiorna il GPT.

**Lo schema dell'azione viene rifiutato:** ChatGPT richiede OpenAPI 3.1 con almeno una voce `paths` e un URL `servers`. Valida il YAML su [editor.swagger.io](https://editor.swagger.io) prima di incollarlo.

## Correlati

- [Chiavi API](/docs/developer/api/api-keys) — riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) — dettagli del protocollo e schemi degli strumenti
- [Claude](./claude) — stessa idea, per i modelli di Anthropic
- [Riferimento REST API](/docs/developer/api/endpoints) — ogni endpoint che un'azione di GPT personalizzato può chiamare
