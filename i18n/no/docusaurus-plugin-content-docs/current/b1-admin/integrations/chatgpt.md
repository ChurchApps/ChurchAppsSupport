---
title: "ChatGPT"
description: "Koble ChatGPT til kirkens B1-data med en API-nøkkel, slik at du kan stille spørsmål på vanlig språk om personer, gaver og oppmøte i B1 Admin."
---

# ChatGPT

<div class="article-intro">

Koble ChatGPT til kirkens B1-data og still spørsmål på vanlig språk. Det svarer ut fra de levende kirkeregistreringene dine. Du kan også be det hjelpe med ting som ellers ville krevd flere steg i B1 Admin.

**Noen ting du kan spørre om:**
- *«Vis meg alle som deltok forrige uke, men som ikke er plassert i en smågruppe»*
- *«Oppsummer denne månedens gaver per fond»*
- *«Hvem er våre nyeste medlemmer, og har vi fulgt opp dem?»*
- *«Jeg finner ikke ut hvordan jeg gjør X i B1, kan du vise meg?»*

</div>

<div class="prereqs">
<h4>Det du trenger</h4>

- **ChatGPT-skrivebordsappen** for Mac eller Windows
- **Et betalt ChatGPT-abonnement** (Plus eller høyere). Gratiskontoer i ChatGPT kan ikke kobles til B1.
- **B1-innloggingen din** med tillatelse til å administrere kirkeinnstillinger (nødvendig for å lage en nøkkel). Har du ikke det? Spør B1-administratoren i kirken din.

</div>

:::tip Anbefalt: prøv Claude først, det er gratis
[Claude](./claude.md) kobles til B1 på **gratisabonnementet** og settes opp på under 3 minutter. Legg til B1 som en connector og logg inn med B1-kontoen din. Ingen nøkkel er nødvendig. Det er den enkleste måten for kirken din å prøve KI med B1 før dere betaler for noe.
:::

## Slik setter du det opp {#set-it-up}

Skjermbildene kan se litt annerledes ut i din versjon av ChatGPT.

---

**Steg 1 — Lag B1-nøkkelen din**

Nøkkelen er det som gir ChatGPT tilgang til *kirkens* B1. Tenk på den som et passord bare for ChatGPT.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Innstillinger → Utvikler](https://admin.b1.church/settings/developer).
2. Under fanen **API-nøkler** klikker du på **Ny API-nøkkel** og gir den navnet `ChatGPT`.
3. **Omfang:** kryss av for hva ChatGPT har lov til å gjøre. Hvert område har en boks for **lesing** (bare se) og en boks for **skriving** (gjøre endringer). Er du usikker? Kryss av bare for **lesing** til å begynne med.
4. Klikk på **Lagre**, og deretter **Kopier** nøkkelen (den starter med `cak_`). Den vises bare én gang.

---

**Steg 2 — Klikk på navnet ditt nederst til venstre i ChatGPT**

![Klikk på profilnavnet ditt](/img/guides/chatgpt-mcp/01.png)

---

**Steg 3 — Klikk på Innstillinger**

![Klikk på Innstillinger i menyen](/img/guides/chatgpt-mcp/02.png)

---

**Steg 4 — Klikk på Plugins i venstre sidemeny**

![Klikk på Plugins under Integrasjoner](/img/guides/chatgpt-mcp/03.png)

---

**Steg 5 — Klikk på fanen MCPs**

![Klikk på fanen MCPs](/img/guides/chatgpt-mcp/04.png)

Du ser eventuelle MCP-servere du allerede har lagt til her.

---

**Steg 6 — Klikk på Legg til → Legg til MCP-server**

![Klikk på Legg til og deretter Legg til MCP-server](/img/guides/chatgpt-mcp/06.png)

---

**Steg 7 — Fyll ut skjemaet og klikk på Lagre**

![Skjema for å koble til en egendefinert MCP](/img/guides/chatgpt-mcp/07.png)

Klikk på **Streamable HTTP**, og fyll deretter inn:

| Felt | Hva du skal skrive |
|---|---|
| **Navn** | `B1 Church` (eller et annet navn du liker) |
| **Type** | Klikk på **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Miljøvariabel for bærertoken** | La stå tomt |
| **Headere** | Klikk på **+ Legg til header** → Nøkkel: `Authorization` → Verdi: se under |

![Utfylt eksempel som viser Authorization i Nøkkel og Bearer-nøkkel i Verdi](/img/guides/chatgpt-mcp/08.png)

- **Nøkkel:** `Authorization`
- **Verdi:** `Bearer cak_yourkey` — ordet Bearer, et mellomrom, og deretter nøkkelen din

Klikk på **Lagre**.

Det var alt! Gå tilbake til en chat og spør noe slikt som *«Hvor mange personer er det i kirken vår?»*, så henter ChatGPT svaret direkte fra B1.

---

## Er det trygt? {#is-it-safe}

- ChatGPT kan bare se **kirkens** data.
- Den kan bare gjøre det nøkkelen din tillater. En nøkkel med bare **lesing** avkrysset kan se på data, men aldri endre noe.
- For å slå det av, slett nøkkelen i B1 Admin under **Innstillinger → Utvikler**. Tilgangen stopper med en gang.

## Hva koster det? {#what-does-it-cost}

B1-tilkoblingen er gratis. Den er en del av ChurchApps. ChatGPT krever et betalt abonnement (Plus eller høyere) for å koble seg til. Se OpenAIs priser.

## Tekniske detaljer {#technical-details}

Resten av denne siden er for tekniske brukere og KI-assistenter. B1s MCP-server ligger på `https://api.churchapps.org/mcp` (Streamable HTTP), og tar imot API-nøkkelen som en `Authorization: Bearer cak_…`-header. Se [MCP-server-referansen for utviklere](/docs/developer/api/mcp).

### Egendefinert GPT med handlinger {#custom-gpt-with-actions}

En egendefinert GPT lar deg lage en dedikert assistent som hele teamet ditt kan dele. De åpner en lenke og begynner å stille spørsmål uten noe oppsett på sin side. Det krever en ChatGPT Plus-, Team- eller Enterprise-konto og omtrent 10 minutter.

#### 1. Lag en API-nøkkel {#1-create-an-api-key}

Følg steg 1 under Slik setter du det opp ovenfor hvis du ikke har gjort det allerede.

#### 2. Bygg den egendefinerte GPT-en {#2-build-the-custom-gpt}

1. I ChatGPT klikker du på profilen din → **Mine GPT-er** → **Lag en GPT**.
2. Bytt til fanen **Konfigurer**, gi GPT-en et navn (f.eks. «B1-assistent») og legg til instruksjoner:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scroll til **Handlinger** → **Opprett ny handling** → **Autentisering**.
   - **Type autentisering:** API Key
   - **API Key:** lim inn `cak_…`-nøkkelen din
   - **Auth Type:** Bearer
   - Lagre.

4. I boksen **Schema**, lim inn denne OpenAPI-startspesifikasjonen:

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

5. Lagre handlingen. Test den: *«Hvor mange personer er det i kirken?»* — ChatGPT kaller `listPeople` og svarer.
6. **Publiser** GPT-en (Bare meg / Alle med lenken / Organisasjon) og del lenken med teamet ditt.

#### 3. Bruk den {#3-use-it}

Alle som har lenken kan stille spørsmål på naturlig språk. Nøkkelens omfang gjelder fortsatt. En skrivebeskyttet nøkkel avviser skriveoperasjoner uansett hva handlingsskjemaet sier.

---

### Sikkerhet og begrensninger {#safety-and-limits}

- **Isolasjon per kirke.** API-nøkkelen peker til én kirke. ChatGPT kan ikke se andre kirkers data.
- **Begrenset av tillatelser.** Nøkkelen har bare de omfangene du ga den. Fjerner du et omfang (ved å slette og lage nøkkelen på nytt), stopper tilgangen ved neste kall.
- **Kan trekkes tilbake umiddelbart.** Slett nøkkelen under **Innstillinger → Utvikler → API-nøkler**, så stopper tilgangen med en gang.
- **Deling av en egendefinert GPT deler dataene.** Alle med tilgang til GPT-en kan se det nøkkelens omfang tillater. Velg smalere omfang (f.eks. utelat `donations:read`) for GPT-er som deles bredt.
- **Revisjonsspor.** Alle endringer gjort via ChatGPT går gjennom samme revisjonslogg som handlinger i B1 Admin. Finn dem under **Innstillinger → Revisjonslogg**.

### Feilsøking {#troubleshooting}

**MCP-connectoren sier «Unauthorized» eller viser en 401-feil:** API-nøkkelen mangler eller er feil. Åpne innstillingene for connectoren og sjekk **Authorization**-headeren: verdien skal være ordet `Bearer`, ett mellomrom, og deretter hele `cak_…`-nøkkelen uten ekstra mellomrom.

**ChatGPT sier at den ikke finner visse data:** nøkkelen har kanskje ikke riktige omfang. Lag en ny nøkkel under **Innstillinger → Utvikler → API-nøkler** med de ekstra omfangene, og oppdater connectoren.

**Handlingen i egendefinert GPT gir 401:** kontroller i autentiseringspanelet for handlingen at **Auth Type: Bearer** er valgt, og at nøkkelen ikke inneholder ordet `Bearer` (ChatGPT legger til det automatisk).

**Handlingen i egendefinert GPT gir 403:** nøkkelen har ikke omfanget for det endepunktet. Lag en ny nøkkel med riktige omfang, og oppdater GPT-en.

**Handlingsskjemaet blir avvist:** ChatGPT krever OpenAPI 3.1 med minst én `paths`-oppføring og en `servers`-URL. Valider YAML-en på [editor.swagger.io](https://editor.swagger.io) før du limer den inn.

## Relatert {#related}

- [API-nøkler](/docs/developer/api/api-keys) — fullstendig referanse for omfang
- [MCP-server (referanse for utviklere)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [Claude](./claude.md) — samme idé, for Anthropics modeller
- [REST API-referanse](/docs/developer/api/endpoints) — alle endepunkter en egendefinert GPT-handling kan kalle
