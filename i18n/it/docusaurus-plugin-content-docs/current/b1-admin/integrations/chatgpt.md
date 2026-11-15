---
title: "ChatGPT"
description: "Collega ChatGPT ai dati B1 della tua chiesa con una chiave API, così puoi fare domande in linguaggio semplice su persone, donazioni e presenze in B1 Admin."
---

# ChatGPT

<div class="article-intro">

Collega ChatGPT ai dati B1 della tua chiesa e fagli domande in linguaggio semplice: risponderà con le informazioni presenti nei tuoi registri in tempo reale. Puoi anche chiedergli di aiutarti con operazioni che in B1 Admin richiederebbero diversi passaggi.

**Alcune cose che puoi chiedere:**
- *"Mostrami tutti quelli che sono venuti la settimana scorsa ma non sono ancora stati assegnati a un piccolo gruppo"*
- *"Riassumi le donazioni di questo mese per fondo"*
- *"Chi sono i nostri membri più recenti e abbiamo già fatto un follow-up con loro?"*
- *"Non riesco a capire come fare X in B1, mi puoi guidare passo passo?"*

</div>

<div class="prereqs">
<h4>Cosa ti serve</h4>

- **L'app desktop di ChatGPT** per Mac o Windows
- **Un abbonamento ChatGPT a pagamento** (Plus o superiore). Gli account ChatGPT gratuiti non possono collegarsi a B1.
- **Il tuo accesso a B1** con il permesso di gestire le impostazioni della chiesa (necessario per creare una chiave). Non ce l'hai? Chiedi all'amministratore B1 della tua chiesa.

</div>

:::tip Consigliato: prova prima Claude, è gratuito
[Claude](./claude.md) si collega a B1 con il **piano gratuito** e si configura in meno di 3 minuti: basta aggiungere B1 come connettore e accedere con il tuo account B1. Non serve nessuna chiave. È il modo più semplice per la tua chiesa di provare l'intelligenza artificiale con B1 prima di pagare qualsiasi cosa.
:::

## Configurazione {#set-it-up}

Le schermate potrebbero apparire leggermente diverse nella tua versione di ChatGPT.

---

**Passaggio 1 — Crea la tua chiave B1**

La chiave è ciò che permette a ChatGPT di accedere a *B1 della tua chiesa*: pensala come una password dedicata solo a ChatGPT.

1. Accedi a [B1 Admin](https://admin.b1.church) e vai su [Impostazioni → Sviluppatori](https://admin.b1.church/settings/developer).
2. Nella scheda **Chiavi API**, clicca su **Nuova chiave API** e chiamala `ChatGPT`.
3. **Ambiti:** seleziona cosa può fare ChatGPT. Ogni area ha una casella **lettura** (solo consultazione) e una casella **scrittura** (per apportare modifiche). Non sei sicuro? Per iniziare, seleziona solo le caselle **lettura**.
4. Clicca su **Salva**, poi su **Copia** la chiave (inizia con `cak_`). Viene mostrata una sola volta.

---

**Passaggio 2 — Clicca sul tuo nome nell'angolo in basso a sinistra di ChatGPT**

![Clicca sul nome del tuo profilo](/img/guides/chatgpt-mcp/01.png)

---

**Passaggio 3 — Clicca su Impostazioni**

![Clicca su Impostazioni dal menu](/img/guides/chatgpt-mcp/02.png)

---

**Passaggio 4 — Clicca su Plugin nella barra laterale sinistra**

![Clicca su Plugin sotto Integrazioni](/img/guides/chatgpt-mcp/03.png)

---

**Passaggio 5 — Clicca sulla scheda MCP**

![Clicca sulla scheda MCP](/img/guides/chatgpt-mcp/04.png)

Qui vedrai gli eventuali server MCP che hai già aggiunto.

---

**Passaggio 6 — Clicca su Aggiungi → Aggiungi server MCP**

![Clicca su Aggiungi, poi su Aggiungi server MCP](/img/guides/chatgpt-mcp/06.png)

---

**Passaggio 7 — Compila il modulo e clicca su Salva**

![Modulo Connetti a un server MCP personalizzato](/img/guides/chatgpt-mcp/07.png)

Clicca su **Streamable HTTP**, poi compila:

| Campo | Cosa inserire |
|---|---|
| **Nome** | `B1 Church` (oppure un nome a tua scelta) |
| **Tipo** | Clicca su **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variabile d'ambiente per il token Bearer** | Lascia vuoto |
| **Intestazioni** | Clicca su **+ Aggiungi intestazione** → Chiave: `Authorization` → Valore: vedi sotto |

![Esempio compilato con Authorization nella Chiave e la chiave Bearer nel Valore](/img/guides/chatgpt-mcp/08.png)

- **Chiave:** `Authorization`
- **Valore:** `Bearer cak_yourkey` — la parola Bearer, uno spazio, poi la tua chiave

Clicca su **Salva**.

Fatto! Torna in una chat e chiedi qualcosa del tipo *"Quante persone ci sono nella nostra chiesa?"*: ChatGPT prenderà la risposta direttamente da B1.

---

## È sicuro? {#is-it-safe}

- ChatGPT può vedere solo i dati **della tua chiesa**.
- Può fare solo ciò che consente la tua chiave: una chiave con solo le caselle **lettura** selezionate può consultare ma non modificare nulla.
- Per disattivarlo, elimina la chiave in B1 Admin in **Impostazioni → Sviluppatori**. L'accesso si interrompe subito.

## Quanto costa? {#what-does-it-cost}

Il collegamento a B1 è gratuito: fa parte di ChurchApps. ChatGPT richiede un piano a pagamento (Plus o superiore) per collegarsi; consulta i prezzi di OpenAI.

## Dettagli tecnici {#technical-details}

Il resto di questa pagina è rivolto a utenti tecnici e assistenti AI. Il server MCP di B1 si trova all'indirizzo `https://api.churchapps.org/mcp` (Streamable HTTP) e accetta la chiave API come intestazione `Authorization: Bearer cak_…`. Vedi il [riferimento per sviluppatori del server MCP](/docs/developer/api/mcp).

### GPT personalizzato con Azioni {#custom-gpt-with-actions}

Un GPT personalizzato ti permette di creare un assistente dedicato che tutto il tuo team può condividere: basta aprire un link e iniziare a fare domande, senza alcuna configurazione. Richiede un account ChatGPT Plus, Team o Enterprise e circa 10 minuti.

#### 1. Crea una chiave API {#1-create-an-api-key}

Segui il Passaggio 1 della sezione Configurazione qui sopra, se non l'hai già fatto.

#### 2. Costruisci il GPT personalizzato {#2-build-the-custom-gpt}

1. In ChatGPT, clicca sul tuo profilo → **I miei GPT** → **Crea un GPT**.
2. Passa alla scheda **Configura**, dai un nome al GPT (ad esempio "Assistente B1") e aggiungi le istruzioni:

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

4. Nella casella **Schema**, incolla questo schema OpenAPI di partenza:

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Salva l'azione. Per provarla, chiedi: *"quante persone ci sono in chiesa?"*: ChatGPT chiama `listPeople` e risponde.
6. **Pubblica** il GPT (Solo io / Chiunque abbia il link / Organizzazione) e condividi il link con il tuo team.

#### 3. Utilizzo {#3-use-it}

Chiunque abbia il link può fare domande in linguaggio naturale. Gli ambiti della chiave restano validi: una chiave in sola lettura rifiuta le scritture, indipendentemente da cosa dice lo schema delle azioni.

---

### Sicurezza e limiti {#safety-and-limits}

- **Isolamento per chiesa.** La chiave API è associata a una sola chiesa. ChatGPT non può vedere i dati di altre chiese.
- **Limitato dai permessi.** La chiave include solo gli ambiti che hai concesso. Rimuovere un ambito (eliminando e ricreando la chiave) interrompe quell'accesso alla chiamata successiva.
- **Revocabile subito.** Elimina la chiave in **Impostazioni → Sviluppatori → Chiavi API** e l'accesso termina immediatamente.
- **Condividere un GPT personalizzato significa condividere i dati.** Chiunque abbia accesso al GPT può vedere tutto ciò che consentono gli ambiti della chiave. Per i GPT condivisi in modo ampio, preferisci ambiti più ristretti (ad esempio, ometti `donations:read`).
- **Registro delle modifiche.** Le modifiche effettuate tramite ChatGPT passano attraverso lo stesso registro delle attività delle azioni di B1 Admin: le trovi in **Impostazioni → Registro delle attività**.

### Risoluzione dei problemi {#troubleshooting}

**Il connettore MCP dice "Unauthorized" o mostra un errore 401:** la tua chiave API manca o è errata. Apri le impostazioni del connettore e controlla l'intestazione **Authorization**: il valore deve essere la parola `Bearer`, uno spazio, poi l'intera chiave `cak_…` senza spazi extra.

**ChatGPT dice di non riuscire a trovare alcuni dati:** la chiave potrebbe non avere gli ambiti giusti. Crea una nuova chiave in **Impostazioni → Sviluppatori → Chiavi API** con gli ambiti aggiuntivi e aggiorna il connettore.

**L'azione del GPT personalizzato restituisce 401:** nel pannello di autenticazione dell'azione, verifica che sia selezionato **Tipo di autenticazione: Bearer** e che la chiave non contenga la parola `Bearer` (ChatGPT la aggiunge automaticamente).

**L'azione del GPT personalizzato restituisce 403:** la chiave non ha l'ambito per quell'endpoint. Crea una nuova chiave con gli ambiti corretti e aggiorna il GPT.

**Lo schema dell'azione viene rifiutato:** ChatGPT richiede OpenAPI 3.1 con almeno una voce `paths` e un URL `servers`. Verifica il YAML su [editor.swagger.io](https://editor.swagger.io) prima di incollarlo.

## Correlati {#related}

- [Chiavi API](/docs/developer/api/api-keys) — riferimento completo degli ambiti
- [Server MCP (riferimento per sviluppatori)](/docs/developer/api/mcp) — dettagli del protocollo e schemi degli strumenti
- [Claude](./claude.md) — stessa idea, per i modelli di Anthropic
- [Riferimento REST API](/docs/developer/api/endpoints) — ogni endpoint che un'azione di GPT personalizzato può chiamare
