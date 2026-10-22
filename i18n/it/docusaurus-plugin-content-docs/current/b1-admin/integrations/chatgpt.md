---
title: "ChatGPT"
---

# ChatGPT {#chatgpt}

<div class="article-intro">

Collega ChatGPT di OpenAI ai dati B1 della tua chiesa e lascia che svolga il lavoro più pesante. Una volta collegato, ChatGPT può vedere le tue registrazioni in tempo reale e aiutarti a fare cose che richiederebbero diversi passaggi in B1 Admin -- o che non sapresti proprio come fare.

**Alcune cose che puoi chiedergli di fare:**
- *"Imposta le aule della scuola domenicale e assegna ogni insegnante all'aula giusta in base al suo gruppo"*
- *"Mostrami tutti quelli che hanno partecipato la settimana scorsa ma non sono ancora stati assegnati a un piccolo gruppo"*
- *"Riassumi le donazioni di questo mese per fondo"*
- *"Chi sono i nostri membri più recenti e abbiamo già fatto un follow-up con loro?"*
- *"Non riesco a capire come fare X in B1 -- puoi guidarmi o farlo per me?"*

ChatGPT recupera le risposte ed esegue le azioni direttamente dai tuoi dati B1, limitato alla sola tua chiesa.

:::tip Consigliato: Claude Code
Per l'esperienza MCP più fluida, [Claude Code](./claude) è il client consigliato -- la configurazione richiede un solo comando e funziona subito. ChatGPT funziona anch'esso ed è un'ottima scelta se il tuo team lo usa già.
:::

Sono supportati due percorsi: il **Connettore MCP** (integrato in ChatGPT) e un **GPT personalizzato** per i team che vogliono un assistente condivisibile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un amministratore della chiesa con il permesso **Modifica impostazioni** in B1 Admin (necessario per creare una chiave API)
- Un account **ChatGPT Plus, Pro, Team o Enterprise**

</div>

## Guida rapida alla configurazione {#quick-setup-guide}

Segui questi passaggi nell'**app desktop di ChatGPT** (Mac/Windows). Le schermate possono apparire leggermente diverse in altre versioni.

---

**Passaggio 1 — Ottieni prima la chiave API da B1 Admin**

Prima di toccare ChatGPT, crea una chiave API in B1 Admin così la hai pronta da incollare:

1. Vai su **Impostazioni → Sviluppatore → Chiavi API** in B1 Admin
2. Fai clic su **Nuova chiave API**, dalle il nome `ChatGPT`, scegli gli ambiti (inizia con `people:read`, `groups:read`, `attendance:read`, `donations:read`) e fai clic su **Salva**
3. Copia la chiave `cak_…` -- viene mostrata una sola volta

---

**Passaggio 2 — Fai clic sul tuo nome nell'angolo in basso a sinistra di ChatGPT**

![Fai clic sul nome del profilo](/img/guides/chatgpt-mcp/01.png)

---

**Passaggio 3 — Fai clic su Impostazioni**

![Fai clic su Impostazioni dal menu](/img/guides/chatgpt-mcp/02.png)

---

**Passaggio 4 — Fai clic su Plugin nella barra laterale sinistra**

![Fai clic su Plugin sotto Integrazioni](/img/guides/chatgpt-mcp/03.png)

---

**Passaggio 5 — Fai clic sulla scheda MCP**

![Fai clic sulla scheda MCP](/img/guides/chatgpt-mcp/04.png)

Qui vedrai gli eventuali server MCP che hai già aggiunto.

---

**Passaggio 6 — Fai clic su Aggiungi → Aggiungi server MCP**

![Fai clic su Aggiungi poi su Aggiungi server MCP](/img/guides/chatgpt-mcp/06.png)

---

**Passaggio 7 — Compila il modulo e fai clic su Salva**

![Modulo Connetti a un MCP personalizzato](/img/guides/chatgpt-mcp/07.png)

Fai clic su **Streamable HTTP**, poi compila:

| Campo | Cosa inserire |
|---|---|
| **Nome** | `B1 Church` (o un nome a tua scelta) |
| **Tipo** | Fai clic su **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variabile d'ambiente del token Bearer** | Lascia vuoto |
| **Intestazioni** | Fai clic su **+ Aggiungi intestazione** → Chiave: `Authorization` → Valore: vedi sotto |

![Esempio compilato con Authorization nella Chiave e la chiave Bearer nel Valore](/img/guides/chatgpt-mcp/08.png)

- **Chiave:** `Authorization`
- **Valore:** `Bearer cak_latuachiave` -- la parola Bearer, uno spazio, poi la tua chiave

Fai clic su **Salva**.

Fatto! Torna in una chat e chiedi qualcosa come *"Quante persone ci sono nella nostra chiesa?"* e ChatGPT recupererà la risposta direttamente da B1.

---

## Passaggio 1 — Crea una chiave API in B1 Admin

Ogni collegamento a B1 usa una chiave API che crei tu. Questa chiave identifica la tua chiesa, controlla ciò che ChatGPT può vedere e può essere revocata in qualsiasi momento.

1. Apri **B1 Admin** e vai su **Impostazioni → Sviluppatore → Chiavi API**.
2. Fai clic su **Nuova chiave API**.
3. Dai alla chiave un nome -- `ChatGPT` va bene.
4. Seleziona gli ambiti (permessi) che ChatGPT dovrebbe avere. Un buon insieme di partenza per un assistente di sola lettura:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Fai clic su **Salva**.
6. Copia la chiave completa che compare -- inizia con `cak_` e viene mostrata **una sola volta**. Conservala in un posto sicuro.

:::tip
Se in futuro devi revocare l'accesso di ChatGPT, torna su **Impostazioni → Sviluppatore → Chiavi API** ed elimina la chiave. L'accesso termina immediatamente.
:::

---

## Percorso A — Connettore MCP di ChatGPT (consigliato)

È il modo più semplice per collegarsi. ChatGPT ha una finestra integrata "Connetti a un MCP personalizzato" che funziona direttamente con il server MCP di B1 -- non serve un GPT personalizzato.

### Cosa ti serve

- La tua chiave `cak_…` dal Passaggio 1

### Apri il connettore MCP in ChatGPT

In ChatGPT, vai su **Impostazioni → Plugin → MCP** e fai clic su **Aggiungi → Aggiungi server MCP**.

### Compila la finestra

Fai clic su **Streamable HTTP**, poi usa questi valori:

| Campo | Valore |
|---|---|
| **Nome** | `B1 Church` (o un nome a tua scelta) |
| **Tipo** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variabile d'ambiente del token Bearer** | Lascia vuoto |
| **Intestazioni** | Chiave: `Authorization` / Valore: `Bearer cak_tuoprefisso.tuosegreto` |

Nel campo Valore, digita la parola `Bearer`, uno spazio, poi incolla la tua chiave -- tutto nella stessa casella. Esempio: `Bearer cak_prefisso.segreto`.

Fai clic su **Salva**.

### Fai una domanda a ChatGPT

Una volta collegato, chiedi pure in linguaggio naturale -- non servono comandi speciali:

- *"Quante persone ci sono nella nostra chiesa?"*
- *"Chi si è iscritto negli ultimi 30 giorni?"*
- *"Quali gruppi sono attivi in questo momento?"*
- *"Riassumi le donazioni di questo mese per fondo."*

ChatGPT interroga B1 in background e risponde con i tuoi dati in tempo reale.

---

## Percorso B — GPT personalizzato con Azioni

Un GPT personalizzato ti permette di creare un assistente dedicato che tutto il team può condividere -- aprono un link e iniziano a fare domande senza alcuna configurazione. Richiede un account ChatGPT Plus, Team o Enterprise e circa 10 minuti.

### 1. Crea una chiave API

Segui il Passaggio 1 sopra se non l'hai ancora fatto.

### 2. Costruisci il GPT personalizzato

1. In ChatGPT, fai clic sul tuo profilo → **I miei GPT** → **Crea un GPT**.
2. Passa alla scheda **Configura**, dai al GPT un nome (ad esempio "Assistente B1") e aggiungi le istruzioni:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scorri fino a **Azioni** → **Crea nuova azione** → **Autenticazione**.
   - **Tipo di autenticazione:** Chiave API
   - **Chiave API:** incolla la tua chiave `cak_…`
   - **Tipo di autenticazione:** Bearer
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
6. **Pubblica** il GPT (Solo io / Chiunque con il link / Organizzazione) e condividi il link con il tuo team.

### 3. Usalo

Chiunque abbia il link può fare domande in linguaggio naturale. Gli ambiti della chiave restano validi -- una chiave di sola lettura rifiuta le scritture indipendentemente da ciò che dice lo schema delle azioni.

---

## Sicurezza e limiti {#safety-and-limits}

- **Isolamento per chiesa.** La chiave API risolve una sola chiesa. ChatGPT non può vedere i dati di altre chiese.
- **Limitato dai permessi.** La chiave ha solo gli ambiti che le hai concesso. Rimuovere un ambito (eliminando e ricreando la chiave) interrompe quell'accesso alla chiamata successiva.
- **Revocabile immediatamente.** Elimina la chiave in **Impostazioni → Sviluppatore → Chiavi API** e l'accesso termina subito.
- **Condividere un GPT personalizzato significa condividere i dati.** Chiunque abbia accesso al GPT può vedere tutto ciò che consentono gli ambiti della chiave. Preferisci ambiti più ristretti (ad esempio, ometti `donations:read`) per GPT condivisi in modo ampio.
- **Registro delle attività.** Le modifiche apportate tramite ChatGPT passano dallo stesso registro delle attività delle azioni di B1 Admin -- trovalo in **Impostazioni → Registro attività**.

## Costi {#cost}

ChurchApps è gratuito e open-source -- l'API che ChatGPT chiama fa parte di ciò che la tua chiesa già utilizza. OpenAI addebita l'uso di ChatGPT secondo i propri piani. Non c'è alcun costo per chiamata da parte di ChurchApps.

## Risoluzione dei problemi {#troubleshooting}

**Il connettore MCP dice "Non autorizzato" o mostra un errore 401:** la tua chiave API manca o è errata. Apri le impostazioni del connettore e verifica che la chiave nell'argomento `Authorization:Bearer` sia il valore `cak_…` completo, senza spazi in più.

**ChatGPT dice di non trovare alcuni dati:** la chiave potrebbe non avere gli ambiti giusti. Crea una nuova chiave in **Impostazioni → Sviluppatore → Chiavi API** con gli ambiti aggiuntivi e aggiorna il connettore.

**Il comando `npx` fallisce:** Node.js potrebbe non essere installato. Scaricalo e installalo da [nodejs.org](https://nodejs.org), poi prova di nuovo a salvare il connettore.

**L'azione del GPT personalizzato restituisce 401:** nel pannello di autenticazione dell'azione, verifica che sia selezionato **Tipo di autenticazione: Bearer** e che la chiave non contenga la parola `Bearer` (ChatGPT la aggiunge automaticamente).

**L'azione del GPT personalizzato restituisce 403:** la chiave non ha l'ambito per quell'endpoint. Crea una nuova chiave con gli ambiti corretti e aggiorna il GPT.

**Lo schema dell'azione viene rifiutato:** ChatGPT richiede OpenAPI 3.1 con almeno una voce `paths` e un URL `servers`. Valida lo YAML su [editor.swagger.io](https://editor.swagger.io) prima di incollarlo.

## Correlati {#related}

- [Chiavi API](/docs/developer/api/api-keys) -- riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) -- dettagli del protocollo e schemi degli strumenti
- [Claude](./claude) -- stessa idea, per i modelli di Anthropic
- [Riferimento API REST](/docs/developer/api/endpoints) -- ogni endpoint che un'azione di GPT personalizzato può chiamare
