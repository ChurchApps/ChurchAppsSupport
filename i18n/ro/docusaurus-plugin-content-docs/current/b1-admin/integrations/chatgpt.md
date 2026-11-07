---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conectați ChatGPT la datele B1 ale bisericii dumneavoastră și puneți-i întrebări în limbaj obișnuit — răspunde pe baza evidențelor live ale bisericii. Îi puteți cere, de asemenea, ajutor pentru sarcini care ar necesita mai mulți pași în B1 Admin.

**Câteva exemple de întrebări:**
- *„Arată-mi toate persoanele care au participat săptămâna trecută, dar nu au fost înscrise într-un grup mic”*
- *„Rezumă donațiile din această lună pe fonduri”*
- *„Cine sunt cei mai noi membri și i-am contactat deja?”*
- *„Nu înțeleg cum să fac X în B1 — poți să mă ghidezi pas cu pas?”*

</div>

<div class="prereqs">
<h4>Ce aveți nevoie</h4>

- **Aplicația desktop ChatGPT** pentru Mac sau Windows
- **Un abonament plătit ChatGPT** (Plus sau superior). Conturile ChatGPT gratuite nu se pot conecta la B1.
- **Autentificarea în B1** cu permisiunea de a gestiona setările bisericii (necesară pentru a crea o cheie). Nu o aveți? Întrebați administratorul B1 al bisericii dumneavoastră.

</div>

:::tip Recomandat: încercați mai întâi Claude — este gratuit
[Claude](./claude) se conectează la B1 cu **planul gratuit** și se configurează în mai puțin de 3 minute — adăugați pur și simplu B1 caños conector și autentificați-vă cu contul B1. Nu este necesară nicio cheie. Este cea mai ușoară modalitate prin care biserica dumneavoastră poate încerca inteligența artificială împreună cu B1, înainte de a plăti pentru ceva.
:::

## Configurare

Ecranele pot arăta puțin diferit în versiunea dumneavoastră de ChatGPT.

---

**Pasul 1 — Creați-vă cheia B1**

Cheia este cea care permite ChatGPT să acceseze B1-ul *bisericii dumneavoastră* — gândiți-vă la ea ca la o parolă doar pentru ChatGPT.

1. Autentificați-vă în [B1 Admin](https://admin.b1.church) și mergeți la [Setări → Dezvoltator](https://admin.b1.church/settings/developer).
2. Pe fila **API Keys**, faceți clic pe **New API Key** și denumiți-o `ChatGPT`.
3. **Permisiuni (Scopes):** bifați ce poate face ChatGPT. Fiecare zonă are o casetă **read** (doar citire) și una **write** (modificare). Nu sunteți sigur? Bifați doar casetele **read** pentru început.
4. Faceți clic pe **Save**, apoi pe **Copy** pentru a copia cheia (începe cu `cak_`). Aceasta este afișată o singură dată.

---

**Pasul 2 — Faceți clic pe numele dumneavoastră din colțul din stânga jos al ChatGPT**

![Faceți clic pe numele profilului](/img/guides/chatgpt-mcp/01.png)

---

**Pasul 3 — Faceți clic pe Settings (Setări)**

![Faceți clic pe Settings din meniu](/img/guides/chatgpt-mcp/02.png)

---

**Pasul 4 — Faceți clic pe Plugins în bara laterală din stânga**

![Faceți clic pe Plugins sub Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Pasul 5 — Faceți clic pe fila MCPs**

![Faceți clic pe fila MCPs](/img/guides/chatgpt-mcp/04.png)

Aici veți vedea serverele MCP pe care le-ați adăugat deja.

---

**Pasul 6 — Faceți clic pe Add → Add MCP server**

![Faceți clic pe Add, apoi pe Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Pasul 7 — Completați formularul și faceți clic pe Save**

![Formularul Connect to a custom MCP](/img/guides/chatgpt-mcp/07.png)

Faceți clic pe **Streamable HTTP**, apoi completați:

| Câmp | Ce trebuie introdus |
|---|---|
| **Name** | `B1 Church` (sau orice nume doriți) |
| **Type** | Faceți clic pe **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Lăsați necompletat |
| **Headers** | Faceți clic pe **+ Add header** → Key: `Authorization` → Value: vezi mai jos |

![Exemplu completat, cu Authorization în Key și cheia Bearer în Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_cheiadumneavoastra` — cuvântul Bearer, un spațiu, apoi cheia dumneavoastră

Faceți clic pe **Save**.

Gata! Reveniți la o conversație și întrebați ceva de genul *„Câte persoane sunt în biserica noastră?”* — iar ChatGPT va extrage răspunsul direct din B1.

---

## Este sigur?

- ChatGPT poate vedea doar datele **bisericii dumneavoastră**.
- Poate face doar ceea ce permite cheia — o cheie cu doar casetele **read** bifate poate doar consulta, nu poate modifica nimic.
- Pentru a o dezactiva, ștergeți cheia în B1 Admin, la **Setări → Dezvoltator**. Accesul încetează imediat.

## Cât costă?

Conexiunea B1 este gratuită — face parte din ChurchApps. ChatGPT necesită un abonament plătit (Plus sau superior) pentru a se conecta; consultați prețurile OpenAI.

## Detalii tehnice

Restul acestei pagini este destinat utilizatorilor avansați și asistenților AI. Serverul MCP al B1 se află la `https://api.churchapps.org/mcp` (Streamable HTTP) și primește cheia API ca antet `Authorization: Bearer cak_…`. Consultați [documentația pentru dezvoltatori a serverului MCP](/docs/developer/api/mcp).

### Custom GPT cu Actions

Un Custom GPT vă permite să creați un asistent dedicat pe care întreaga echipă îl poate folosi — deschid un link și încep să pună întrebări, fără nicio configurare din partea lor. Necesită un cont ChatGPT Plus, Team sau Enterprise și aproximativ 10 minute.

#### 1. Creați o cheie API

Urmați Pasul 1 din Configurare de mai sus, dacă nu ați făcut-o deja.

#### 2. Construiți Custom GPT

1. În ChatGPT, faceți clic pe profilul dumneavoastră → **My GPTs** → **Create a GPT**.
2. Treceți la fila **Configure**, dați GPT-ului un nume (de ex. „B1 Assistant”) și adăugați instrucțiuni:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Derulați până la **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** lipiți cheia `cak_…`
   - **Auth Type:** Bearer
   - Salvați.

4. În caseta **Schema**, lipiți această specificație OpenAPI de pornire:

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

5. Salvați acțiunea. Testați-o: *„câte persoane sunt în biserică?”* — ChatGPT apelează `listPeople` și răspunde.
6. **Publicați** GPT-ul (Only me / Anyone with link / Organization) și trimiteți linkul echipei dumneavoastră.

#### 3. Utilizați-l

Oricine are linkul poate pune întrebări în limbaj natural. Permisiunile cheii se aplică în continuare — o cheie doar pentru citire refuză orice modificare, indiferent de ce spune schema acțiunii.

---

### Siguranță și limite

- **Izolare pe biserică.** Cheia API se referă la o singură biserică. ChatGPT nu poate vedea datele altor biserici.
- **Limitat prin permisiuni.** Cheia are doar permisiunile acordate. Eliminarea unei permisiuni (prin ștergerea și recrearea cheii) întrerupe accesul la următorul apel.
- **Revocare imediată.** Ștergeți cheia din **Setări → Dezvoltator → API Keys** și accesul încetează imediat.
- **Partajarea unui Custom GPT înseamnă partajarea datelor.** Oricine are acces la GPT poate vedea tot ce permit permisiunile cheii. Preferați permisiuni mai restrânse (de ex. omiteți `donations:read`) pentru GPT-urile partajate pe scară largă.
- **Jurnal de audit.** Orice modificare făcută prin ChatGPT trece prin același jurnal de audit ca acțiunile din B1 Admin — îl găsiți la **Setări → Jurnal de audit**.

### Depanare

**Conectorul MCP afișează „Unauthorized” sau o eroare 401:** cheia API lipsește sau este incorectă. Deschideți setările conectorului și verificați antetul **Authorization**: valoarea trebuie să fie cuvântul `Bearer`, un spațiu, apoi cheia `cak_…` completă, fără spații suplimentare.

**ChatGPT spune că nu poate găsi anumite date:** cheia poate să nu aibă permisiunile potrivite. Creați o cheie nouă la **Setări → Dezvoltator → API Keys**, cu permisiunile suplimentare, și actualizați conectorul.

**Acțiunea Custom GPT returnează 401:** în panoul de autentificare al acțiunii, verificați că este selectat **Auth Type: Bearer** și că cheia nu conține cuvântul `Bearer` (ChatGPT îl adaugă automat).

**Acțiunea Custom GPT returnează 403:** cheia nu are permisiunea pentru acel endpoint. Creați o cheie nouă cu permisiunile corecte și actualizați GPT-ul.

**Schema acțiunii este respinsă:** ChatGPT necesită OpenAPI 3.1 cu cel puțin o intrare `paths` și un URL `servers`. Validați YAML-ul la [editor.swagger.io](https://editor.swagger.io) înainte de a-l lipi.

## Vezi și

- [Chei API](/docs/developer/api/api-keys) — lista completă a permisiunilor
- [Server MCP (documentație pentru dezvoltatori)](/docs/developer/api/mcp) — detalii despre protocol și schemele uneltelor
- [Claude](./claude) — același lucru, pentru modelele Anthropic
- [Referința REST API](/docs/developer/api/endpoints) — fiecare endpoint pe care îl poate apela o acțiune Custom GPT
