---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Koble ChatGPT til menighetens B1-data og still spørsmål på vanlig språk -- den svarer ut fra menighetens oppdaterte registre. Du kan også be den hjelpe deg med ting som ville tatt flere steg i B1 Admin.

**Noe du kan spørre om:**
- *"Vis meg alle som var på gudstjeneste forrige uke, men som ikke er knyttet til en smågruppe"*
- *"Oppsummer denne månedens gaver etter fond"*
- *"Hvem er de nyeste medlemmene våre, og har vi fulgt opp dem?"*
- *"Jeg får ikke til å gjøre X i B1 -- kan du gå meg gjennom det?"*

</div>

<div class="prereqs">
<h4>Det du trenger</h4>

- **ChatGPT-skrivebordsappen** for Mac eller Windows
- **En betalt ChatGPT-plan** (Plus eller høyere). Gratiskontoer i ChatGPT kan ikke koble til B1.
- **Din B1-innlogging** med tillatelse til å administrere menighetsinnstillinger (nødvendig for å lage en nøkkel). Har du ikke dette? Spør menighetens B1-administrator.

</div>

:::tip Anbefalt: prøv Claude først -- det er gratis
[Claude](./claude) kobles til B1 på **gratisplanen** og settes opp på under 3 minutter -- legg bare til B1 som en connector og logg inn med B1-kontoen din. Ingen nøkkel trengs. Det er den enkleste måten for menigheten din å prøve KI med B1 før dere betaler for noe.
:::

## Slik setter du det opp

Skjermbildene kan se litt annerledes ut i din versjon av ChatGPT.

---

**Steg 1 — Lag din B1-nøkkel**

Nøkkelen er det som slipper ChatGPT inn i *din* menighets B1 -- tenk på den som et passord bare for ChatGPT.

1. Logg inn på [B1 Admin](https://admin.b1.church) og gå til [Settings → Developer](https://admin.b1.church/settings/developer).
2. På fanen **API Keys** klikker du på **New API Key** og gir den navnet `ChatGPT`.
3. **Scopes:** kryss av for hva ChatGPT har lov til å gjøre. Hvert område har en boks for **read** (kun se) og en boks for **write** (gjøre endringer). Er du usikker? Kryss av bare for **read**-boksene for å starte.
4. Klikk på **Save**, og deretter **Copy** for nøkkelen (den begynner med `cak_`). Den vises bare én gang.

---

**Steg 2 — Klikk på navnet ditt nederst til venstre i ChatGPT**

![Click your profile name](/img/guides/chatgpt-mcp/01.png)

---

**Steg 3 — Klikk på Settings**

![Click Settings from the menu](/img/guides/chatgpt-mcp/02.png)

---

**Steg 4 — Klikk på Plugins i venstre sidemeny**

![Click Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Steg 5 — Klikk på fanen MCPs**

![Click the MCPs tab](/img/guides/chatgpt-mcp/04.png)

Du ser eventuelle MCP-servere du allerede har lagt til her.

---

**Steg 6 — Klikk på Add → Add MCP server**

![Click Add then Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Steg 7 — Fyll ut skjemaet og klikk på Save**

![Connect to a custom MCP form](/img/guides/chatgpt-mcp/07.png)

Klikk på **Streamable HTTP**, og fyll deretter inn:

| Felt | Hva du skal skrive |
|---|---|
| **Name** | `B1 Church` (eller et hvilket som helst navn du liker) |
| **Type** | Klikk på **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | La stå tomt |
| **Headers** | Klikk på **+ Add header** → Key: `Authorization` → Value: se nedenfor |

![Filled in example showing Authorization in Key and Bearer key in Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey` -- ordet Bearer, et mellomrom, og så nøkkelen din

Klikk på **Save**.

Det var alt! Gå tilbake til en samtale og spør noe sånt som *"Hvor mange personer er det i menigheten vår?"*, så henter ChatGPT svaret direkte fra B1.

---

## Er det trygt?

- ChatGPT kan bare se **din menighets** data.
- Den kan bare gjøre det nøkkelen din tillater -- en nøkkel med bare **read**-bokser avkrysset kan se, men aldri endre noe.
- For å slå det av, slett nøkkelen i B1 Admin under **Settings → Developer**. Tilgangen stopper med en gang.

## Hva koster det?

B1-tilkoblingen er gratis -- den er en del av ChurchApps. ChatGPT krever en betalt plan (Plus eller høyere) for å koble til; se OpenAIs prisside.

## Tekniske detaljer

Resten av denne siden er for tekniske brukere og KI-assistenter. B1s MCP-server finnes på `https://api.churchapps.org/mcp` (Streamable HTTP), og tar imot API-nøkkelen som en `Authorization: Bearer cak_…`-header. Se [MCP Server-referansen for utviklere](/docs/developer/api/mcp).

### Custom GPT med Actions

En Custom GPT lar deg lage en dedikert assistent som hele teamet ditt kan dele -- de åpner en lenke og begynner å stille spørsmål uten noe oppsett på sin side. Det krever en ChatGPT Plus-, Team- eller Enterprise-konto og omtrent 10 minutter.

#### 1. Lag en API-nøkkel

Følg Steg 1 under Slik setter du det opp ovenfor, hvis du ikke har gjort det allerede.

#### 2. Bygg Custom GPT-en

1. I ChatGPT klikker du på profilen din → **My GPTs** → **Create a GPT**.
2. Gå til fanen **Configure**, gi GPT-en et navn (f.eks. "B1 Assistant") og legg til instruksjoner:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Bla til **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** lim inn din `cak_…`-nøkkel
   - **Auth Type:** Bearer
   - Lagre.

4. I boksen **Schema** limer du inn denne startspesifikasjonen i OpenAPI:

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

5. Lagre handlingen. Test den: *"hvor mange personer er det i menigheten?"* -- ChatGPT kaller `listPeople` og svarer.
6. **Publish** GPT-en (Only me / Anyone with link / Organization) og del lenken med teamet ditt.

#### 3. Bruk den

Alle med lenken kan stille spørsmål på vanlig språk. Nøklens tillatelser gjelder fortsatt -- en nøkkel med bare lesetilgang avviser skriveoperasjoner uansett hva handlingsskjemaet sier.

---

### Sikkerhet og begrensninger

- **Isolasjon per menighet.** API-nøkkelen knyttes til bare én menighet. ChatGPT kan ikke se andre menigheters data.
- **Tillatelsesbasert.** Nøkkelen bærer bare de tillatelsene du har gitt. Å fjerne en tillatelse (ved å slette og lage nøkkelen på nytt) kutter tilgangen ved neste kall.
- **Kan tilbakekalles umiddelbart.** Slett nøkkelen under **Settings → Developer → API Keys**, så opphører tilgangen øyeblikkelig.
- **Å dele en Custom GPT deler dataene.** Alle med tilgang til GPT-en kan se alt nøkkelens tillatelser tillater. Velg smalere tillatelser (f.eks. utelat `donations:read`) for GPT-er som deles bredt.
- **Revisjonslogg.** Alle endringer som gjøres gjennom ChatGPT, går gjennom den samme revisjonsloggen som handlinger i B1 Admin -- finn dem under **Settings → Audit Log**.

### Feilsøking

**MCP-connectoren sier "Unauthorized" eller viser en 401-feil:** API-nøkkelen din mangler eller er feil. Åpne innstillingene for connectoren og sjekk **Authorization**-headeren: verdien skal være ordet `Bearer`, ett mellomrom, og så hele `cak_…`-nøkkelen uten ekstra mellomrom.

**ChatGPT sier at den ikke finner visse data:** nøkkelen mangler kanskje de riktige tillatelsene. Lag en ny nøkkel under **Settings → Developer → API Keys** med de ekstra tillatelsene, og oppdater connectoren.

**Custom GPT-handling returnerer 401:** i autentiseringspanelet for handlingen, bekreft at **Auth Type: Bearer** er valgt, og at nøkkelen ikke inneholder ordet `Bearer` (ChatGPT legger det til automatisk).

**Custom GPT-handling returnerer 403:** nøkkelen mangler tillatelsen for det endepunktet. Lag en ny nøkkel med riktige tillatelser, og oppdater GPT-en.

**Handlingsskjemaet blir avvist:** ChatGPT krever OpenAPI 3.1 med minst én `paths`-oppføring og en `servers`-nettadresse. Valider YAML-en på [editor.swagger.io](https://editor.swagger.io) før du limer den inn.

## Relatert

- [API Keys](/docs/developer/api/api-keys) — fullstendig referanse for tillatelser
- [MCP Server (utviklerreferanse)](/docs/developer/api/mcp) — protokolldetaljer og verktøyskjemaer
- [Claude](./claude) — samme idé, for Anthropics modeller
- [REST API-referanse](/docs/developer/api/endpoints) — alle endepunkter en Custom GPT-handling kan kalle
