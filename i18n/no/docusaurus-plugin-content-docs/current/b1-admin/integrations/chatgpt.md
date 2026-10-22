---
title: "ChatGPT"
---

# ChatGPT {#chatgpt}

<div class="article-intro">

Koble OpenAIs ChatGPT til kirkens B1-data og la den gjøre det tunge arbeidet. Når den er koblet til, kan ChatGPT se de levende kirkeregistrene dine og hjelpe deg med ting som ellers ville tatt flere steg i B1 Admin -- eller ting du ikke engang visste hvordan du skulle gjøre.

**Noe du kan be den om:**
- *«Sett opp søndagsskoleklasserom og plasser hver lærer i riktig rom basert på gruppen sin»*
- *«Vis meg alle som var med sist uke, men som ikke er tildelt en smågruppe»*
- *«Oppsummer denne månedens giving per fond»*
- *«Hvem er våre nyeste medlemmer, og har vi fulgt opp dem?»*
- *«Jeg finner ikke ut hvordan jeg gjør X i B1 -- kan du gå meg gjennom det eller gjøre det for meg?»*

ChatGPT henter svarene og utfører handlingene direkte fra B1-dataene dine, begrenset til bare din kirke.

:::tip Anbefalt: Claude Code
For den jevneste MCP-opplevelsen er [Claude Code](./claude) den anbefalte klienten -- oppsettet tar én kommando, og det fungerer rett ut av boksen. ChatGPT fungerer også og er et godt valg hvis teamet ditt allerede bruker det.
:::

Det støttes to veier: **MCP-konnektoren** (innebygd i ChatGPT) og en **egendefinert GPT** for team som vil ha en assistent de kan dele.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En kirkeadministrator med tillatelsen **Rediger innstillinger** i B1 Admin (nødvendig for å opprette en API-nøkkel)
- En konto for **ChatGPT Plus, Pro, Team eller Enterprise**

</div>

## Hurtigveiledning for oppsett {#quick-setup-guide}

Følg disse stegene i **ChatGPT-skrivebordsappen** (Mac/Windows). Skjermbildene kan se litt annerledes ut i andre versjoner.

---

**Steg 1 — Hent API-nøkkelen din fra B1 Admin først**

Før du rører ChatGPT, oppretter du en API-nøkkel i B1 Admin slik at du har den klar til å lime inn:

1. Gå til **Innstillinger → Utvikler → API-nøkler** i B1 Admin
2. Klikk **Ny API-nøkkel**, gi den navnet `ChatGPT`, velg omfangene (start med `people:read`, `groups:read`, `attendance:read`, `donations:read`), og klikk **Lagre**
3. Kopier `cak_…`-nøkkelen -- den vises bare én gang

---

**Steg 2 — Klikk på navnet ditt nederst til venstre i ChatGPT**

![Klikk på profilnavnet ditt](/img/guides/chatgpt-mcp/01.png)

---

**Steg 3 — Klikk på Innstillinger**

![Klikk på Innstillinger i menyen](/img/guides/chatgpt-mcp/02.png)

---

**Steg 4 — Klikk på Plugins i venstre sidefelt**

![Klikk på Plugins under Integrasjoner](/img/guides/chatgpt-mcp/03.png)

---

**Steg 5 — Klikk på fanen MCPs**

![Klikk på fanen MCPs](/img/guides/chatgpt-mcp/04.png)

Du ser eventuelle MCP-servere du allerede har lagt til her.

---

**Steg 6 — Klikk på Legg til → Legg til MCP-server**

![Klikk på Legg til og deretter Legg til MCP-server](/img/guides/chatgpt-mcp/06.png)

---

**Steg 7 — Fyll ut skjemaet og klikk Lagre**

![Skjema for å koble til en egendefinert MCP](/img/guides/chatgpt-mcp/07.png)

Klikk **Streamable HTTP**, og fyll deretter inn:

| Felt | Hva du skal skrive inn |
|---|---|
| **Navn** | `B1 Church` (eller et annet navn du liker) |
| **Type** | Klikk **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Miljøvariabel for bearer-token** | La stå tomt |
| **Headere** | Klikk **+ Legg til header** → Nøkkel: `Authorization` → Verdi: se nedenfor |

![Utfylt eksempel som viser Authorization i Nøkkel og Bearer-nøkkel i Verdi](/img/guides/chatgpt-mcp/08.png)

- **Nøkkel:** `Authorization`
- **Verdi:** `Bearer cak_dinnøkkel` -- ordet Bearer, et mellomrom, og så nøkkelen din

Klikk **Lagre**.

Det var alt! Gå tilbake til en chat og spør noe i stil med *«Hvor mange personer er det i kirken vår?»*, og ChatGPT henter svaret rett fra B1.

---

## Steg 1 — Opprett en API-nøkkel i B1 Admin

Hver tilkobling til B1 bruker en API-nøkkel som du oppretter. Denne nøkkelen identifiserer kirken din, styrer hva ChatGPT kan se, og kan når som helst tilbakekalles.

1. Åpne **B1 Admin** og gå til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk **Ny API-nøkkel**.
3. Gi nøkkelen et navn -- `ChatGPT` fungerer fint.
4. Velg omfangene (tillatelsene) ChatGPT skal ha. Et godt utgangspunkt for en assistent som bare leser:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Klikk **Lagre**.
6. Kopier hele nøkkelen som vises -- den begynner med `cak_` og vises **bare én gang**. Lim den inn et trygt sted.

:::tip
Hvis du noen gang må tilbakekalle ChatGPTs tilgang, går du tilbake til **Innstillinger → Utvikler → API-nøkler** og sletter nøkkelen. Tilgangen avsluttes umiddelbart.
:::

---

## Sti A — ChatGPT MCP-konnektor (anbefalt) {#path-a--chatgpt-mcp-connector-recommended}

Dette er den enkleste måten å koble til på. ChatGPT har en innebygd dialog «Koble til en egendefinert MCP» som fungerer direkte mot B1s MCP-server -- ingen egendefinert GPT er nødvendig.

### Hva du trenger {#what-you-need}

- `cak_…`-nøkkelen din fra steg 1

### Åpne MCP-konnektoren i ChatGPT {#open-the-mcp-connector-in-chatgpt}

I ChatGPT går du til **Innstillinger → Plugins → MCPs** og klikker **Legg til → Legg til MCP-server**.

### Fyll ut dialogen {#fill-in-the-dialog}

Klikk **Streamable HTTP**, og bruk deretter disse verdiene:

| Felt | Verdi |
|---|---|
| **Navn** | `B1 Church` (eller et annet navn du liker) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Miljøvariabel for bearer-token** | La stå tomt |
| **Headere** | Nøkkel: `Authorization` / Verdi: `Bearer cak_dinprefiks.dinhemmelighet` |

I verdifeltet skriver du ordet `Bearer`, ett mellomrom, og limer deretter inn nøkkelen din -- alt i den samme boksen. Eksempel: `Bearer cak_prefiks.hemmelighet`.

Klikk **Lagre**.

### Still ChatGPT et spørsmål {#ask-chatgpt-something}

Når den er koblet til, spør du bare med vanlig språk -- ingen spesielle kommandoer er nødvendig:

- *«Hvor mange personer er det i kirken vår?»*
- *«Hvem ble med de siste 30 dagene?»*
- *«Hvilke grupper er aktive akkurat nå?»*
- *«Oppsummer denne månedens giving per fond.»*

ChatGPT kaller B1 i bakgrunnen og svarer ut fra dataene dine i sanntid.

---

## Sti B — Egendefinert GPT med handlinger {#path-b--custom-gpt-with-actions}

En egendefinert GPT lar deg lage en dedikert assistent som hele teamet ditt kan dele -- de åpner en lenke og begynner å stille spørsmål uten noe oppsett på sin side. Det krever en ChatGPT Plus-, Team- eller Enterprise-konto og omtrent 10 minutter.

### 1. Opprett en API-nøkkel {#1-create-an-api-key}

Følg steg 1 ovenfor hvis du ikke har gjort det allerede.

### 2. Bygg den egendefinerte GPT-en {#2-build-the-custom-gpt}

1. I ChatGPT klikker du på profilen din → **Mine GPT-er** → **Opprett en GPT**.
2. Gå til fanen **Konfigurer**, gi GPT-en et navn (f.eks. «B1-assistent») og legg til instruksjoner:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Bla ned til **Handlinger** → **Opprett ny handling** → **Autentisering**.
   - **Autentiseringstype:** API-nøkkel
   - **API-nøkkel:** lim inn `cak_…`-nøkkelen din
   - **Auth-type:** Bearer
   - Lagre.

4. I boksen **Skjema** limer du inn denne startspesifikasjonen i OpenAPI:

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

5. Lagre handlingen. Test den: *«hvor mange personer er det i kirken?»* -- ChatGPT kaller `listPeople` og svarer.
6. **Publiser** GPT-en (Bare meg / Alle med lenken / Organisasjon) og del lenken med teamet ditt.

### 3. Bruk den {#3-use-it}

Alle med lenken kan stille spørsmål på vanlig språk. Omfangene til nøkkelen gjelder fortsatt -- en nøkkel som bare kan lese, avviser skriveoperasjoner uansett hva handlingsskjemaet sier.

---

## Sikkerhet og begrensninger {#safety-and-limits}

- **Isolasjon per kirke.** API-nøkkelen er knyttet til én kirke. ChatGPT kan ikke se andre kirkers data.
- **Begrenset av tillatelser.** Nøkkelen bærer bare de omfangene du ga den. Hvis du fjerner et omfang (ved å slette og opprette nøkkelen på nytt), kuttes tilgangen ved neste kall.
- **Kan tilbakekalles umiddelbart.** Slett nøkkelen under **Innstillinger → Utvikler → API-nøkler**, så avsluttes tilgangen umiddelbart.
- **Deling av en egendefinert GPT deler dataene.** Alle med tilgang til GPT-en kan se alt det nøkkelens omfang tillater. Bruk smalere omfang (f.eks. uten `donations:read`) for GPT-er som deles bredt.
- **Revisjonslogg.** Alle endringer som gjøres via ChatGPT, går gjennom samme revisjonslogg som handlinger i B1 Admin -- finn dem under **Innstillinger → Revisjonslogg**.

## Kostnad {#cost}

ChurchApps er gratis og åpen kildekode -- API-et ChatGPT kaller, er en del av det kirken din allerede kjører. OpenAI tar betalt for ChatGPT-bruk etter sine egne planer. Det er ingen kostnad per kall fra ChurchApps.

## Feilsøking {#troubleshooting}

**MCP-konnektoren sier «Unauthorized» eller viser en 401-feil:** API-nøkkelen din mangler eller er feil. Åpne konnektorinnstillingene og kontroller at nøkkelen i argumentet `Authorization:Bearer` er hele `cak_…`-verdien uten ekstra mellomrom.

**ChatGPT sier at den ikke finner visse data:** nøkkelen har kanskje ikke de riktige omfangene. Opprett en ny nøkkel under **Innstillinger → Utvikler → API-nøkler** med de ekstra omfangene, og oppdater konnektoren.

**Kommandoen `npx` mislykkes:** Node.js er kanskje ikke installert. Last det ned og installer det fra [nodejs.org](https://nodejs.org), og prøv å lagre konnektoren på nytt.

**Egendefinert GPT-handling gir 401:** i autentiseringspanelet for handlingen, bekreft at **Auth-type: Bearer** er valgt, og at nøkkelen ikke inneholder ordet `Bearer` (ChatGPT legger det til automatisk).

**Egendefinert GPT-handling gir 403:** nøkkelen mangler omfanget for det endepunktet. Opprett en ny nøkkel med riktige omfang, og oppdater GPT-en.

**Handlingsskjemaet avvises:** ChatGPT krever OpenAPI 3.1 med minst én `paths`-oppføring og en `servers`-URL. Valider YAML-en på [editor.swagger.io](https://editor.swagger.io) før du limer den inn.

## Relatert {#related}

- [API-nøkler](/docs/developer/api/api-keys) — fullstendig referanse for omfang
- [MCP-server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [Claude](./claude) — samme idé, for Anthropics modeller
- [REST API-referanse](/docs/developer/api/endpoints) — alle endepunkter en egendefinert GPT-handling kan kalle
