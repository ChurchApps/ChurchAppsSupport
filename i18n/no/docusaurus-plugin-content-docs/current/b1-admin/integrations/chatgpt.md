---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Koble ChatGPT til kirkens B1-data og still det spørsmål på vanlig norsk — det svarer ut fra kirkens live-poster. Du kan også be det hjelpe deg med ting som ellers ville tatt flere trinn i B1 Admin.

**Noen ting du kan spørre om:**
- *"Vis meg alle som møtte opp forrige uke, men som ikke er tildelt en smågruppe"*
- *"Oppsummer denne månedens gaver etter fond"*
- *"Hvem er våre nyeste medlemmer, og har vi fulgt dem opp?"*
- *"Jeg finner ikke ut hvordan jeg gjør X i B1 — kan du lede meg gjennom det?"*

</div>

<div class="prereqs">
<h4>Dette trenger du</h4>

- **ChatGPT desktop-appen** for Mac eller Windows
- **En betalt ChatGPT-plan** (Plus eller høyere). Gratis ChatGPT-kontoer kan ikke kobles til B1.
- **B1-innloggingen din** med tillatelse til å administrere kirkeinnstillinger (trengs for å lage en nøkkel). Har du ikke det? Spør B1-administratoren i kirken din.

</div>

:::tip Anbefalt: prøv Claude først — det er gratis
[Claude](./claude) kobles til B1 på **gratisplanen** og settes opp på under 3 minutter — bare legg til B1 som en kobling og logg inn med B1-kontoen din. Ingen nøkkel trengs. Det er den enkleste måten for kirken din å prøve KI med B1 før dere betaler for noe.
:::

## Sett det opp

Skjermene kan se litt annerledes ut i din versjon av ChatGPT.

---

**Trinn 1 — Lag B1-nøkkelen din**

Nøkkelen er det som slipper ChatGPT inn i B1 for *kirken din* — tenk på den som et passord bare for ChatGPT.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Innstillinger → Utvikler](https://admin.b1.church/settings/developer).
2. På fanen **API-nøkler** klikker du **Ny API-nøkkel** og gir den navnet `ChatGPT`.
3. **Områder (scopes):** kryss av for hva ChatGPT får gjøre. Hvert område har en **read**-boks (bare se) og en **write**-boks (gjøre endringer). Usikker? Kryss bare av **read**-boksene til å begynne med.
4. Klikk **Lagre**, og deretter **Kopier** nøkkelen (den begynner med `cak_`). Den vises bare én gang.

---

**Trinn 2 — Klikk på navnet ditt i nedre venstre hjørne av ChatGPT**

![Klikk på profilnavnet ditt](/img/guides/chatgpt-mcp/01.png)

---

**Trinn 3 — Klikk Settings (Innstillinger)**

![Klikk Settings i menyen](/img/guides/chatgpt-mcp/02.png)

---

**Trinn 4 — Klikk Plugins (Programtillegg) i venstre sidefelt**

![Klikk Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Trinn 5 — Klikk fanen MCPs**

![Klikk fanen MCPs](/img/guides/chatgpt-mcp/04.png)

Her ser du eventuelle MCP-servere du allerede har lagt til.

---

**Trinn 6 — Klikk Add → Add MCP server (Legg til MCP-server)**

![Klikk Add og deretter Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Trinn 7 — Fyll ut skjemaet og klikk Save (Lagre)**

![Skjemaet for å koble til en tilpasset MCP](/img/guides/chatgpt-mcp/07.png)

Klikk **Streamable HTTP**, og fyll deretter inn:

| Felt | Hva du skal skrive |
|---|---|
| **Name** | `B1 Church` (eller et hvilket som helst navn du liker) |
| **Type** | Klikk **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | La det stå tomt |
| **Headers** | Klikk **+ Add header** → Key: `Authorization` → Value: se nedenfor |

![Utfylt eksempel som viser Authorization i Key og Bearer-nøkkelen i Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` — ordet Bearer, et mellomrom, deretter nøkkelen din

Klikk **Save** (Lagre).

Det er alt! Gå tilbake til en chat og spør noe som *"Hvor mange mennesker er det i kirken vår?"*, så henter ChatGPT svaret rett fra B1.

---

## Er det trygt?

- ChatGPT kan bare se data fra **kirken din**.
- Det kan bare gjøre det nøkkelen tillater — en nøkkel der bare **read**-boksene er avkrysset kan se, men aldri endre noe.
- For å slå det av sletter du nøkkelen i B1 Admin under **Innstillinger → Utvikler**. Tilgangen stopper med en gang.

## Hva koster det?

B1-tilkoblingen er gratis — den er en del av ChurchApps. ChatGPT krever en betalt plan (Plus eller høyere) for å koble til; se OpenAIs priser.

## Tekniske detaljer

Resten av denne siden er for tekniske brukere og KI-assistenter. B1s MCP-server ligger på `https://api.churchapps.org/mcp` (Streamable HTTP) og tar imot API-nøkkelen som en `Authorization: Bearer cak_…`-header. Se [utviklerreferansen for MCP-serveren](/docs/developer/api/mcp).

### Tilpasset GPT med handlinger (Custom GPT med Actions)

Et tilpasset GPT lar deg opprette en dedikert assistent hele laget ditt kan dele — de åpner en lenke og begynner å stille spørsmål uten noe oppsett på sin side. Det krever en ChatGPT Plus-, Team- eller Enterprise-konto og rundt 10 minutter.

#### 1. Opprett en API-nøkkel

Følg trinn 1 under Sett det opp ovenfor hvis du ikke allerede har gjort det.

#### 2. Bygg det tilpassede GPT-et

1. I ChatGPT klikker du profilen din → **My GPTs** → **Create a GPT**.
2. Bytt til fanen **Configure**, gi GPT-et et navn (f.eks. "B1 Assistant") og legg til instruksjoner:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Bla ned til **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** lim inn `cak_…`-nøkkelen din
   - **Auth Type:** Bearer
   - Lagre.

4. I **Schema**-boksen limer du inn denne OpenAPI-startspesifikasjonen:

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

5. Lagre handlingen. Test den: *"hvor mange mennesker er det i kirken?"* — ChatGPT kaller `listPeople` og svarer.
6. **Publish** (Publiser) GPT-et (Only me / Anyone with link / Organization) og del lenken med laget ditt.

#### 3. Bruk det

Alle med lenken kan stille spørsmål på naturlig språk. Nøkkelens områder gjelder fortsatt — en skrivebeskyttet nøkkel avviser skriving uansett hva handlingsskjemaet sier.

---

### Sikkerhet og grenser

- **Isolasjon per kirke.** API-nøkkelen hører til bare én kirke. ChatGPT kan ikke se andre kirkers data.
- **Begrenset av tillatelser.** Nøkkelen har bare områdene du ga den. Å fjerne et område (ved å slette og lage nøkkelen på nytt) kutter den tilgangen ved neste kall.
- **Kan tilbakekalles umiddelbart.** Slett nøkkelen i **Innstillinger → Utvikler → API-nøkler**, og tilgangen opphører umiddelbart.
- **Å dele et tilpasset GPT deler dataene.** Alle med tilgang til GPT-et kan se det nøkkelens områder tillater. Velg smalere områder (f.eks. utelat `donations:read`) for GPT-er som deles bredt.
- **Revisjonsspor.** Alle endringer gjort gjennom ChatGPT går gjennom den samme revisjonsloggen som B1 Admin-handlinger — finn dem under **Innstillinger → Revisjonsspor**.

### Problemløsing

**MCP-koblingen sier "Unauthorized" eller viser en 401-feil:** API-nøkkelen mangler eller er feil. Åpne koblingsinnstillingene og sjekk **Authorization**-headeren: verdien skal være ordet `Bearer`, ett mellomrom, deretter hele `cak_…`-nøkkelen uten ekstra mellomrom.

**ChatGPT sier at det ikke finner visse data:** nøkkelen har kanskje ikke de riktige områdene. Opprett en ny nøkkel i **Innstillinger → Utvikler → API-nøkler** med de ekstra områdene og oppdater koblingen.

**Handlingen i det tilpassede GPT-et returnerer 401:** i handlingens autentiseringspanel bekrefter du at **Auth Type: Bearer** er valgt og at nøkkelen ikke inneholder ordet `Bearer` (ChatGPT legger det til automatisk).

**Handlingen i det tilpassede GPT-et returnerer 403:** nøkkelen har ikke området for det endepunktet. Opprett en ny nøkkel med de riktige områdene og oppdater GPT-et.

**Handlingsskjemaet blir avvist:** ChatGPT krever OpenAPI 3.1 med minst én `paths`-oppføring og en `servers`-URL. Valider YAML-en på [editor.swagger.io](https://editor.swagger.io) før du limer den inn.

## Relatert

- [API-nøkler](/docs/developer/api/api-keys) — full referanse for områder
- [MCP-server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [Claude](./claude) — samme idé, for Anthropics modeller
- [REST API-referanse](/docs/developer/api/endpoints) — hvert endepunkt en handling i et tilpasset GPT kan kalle
