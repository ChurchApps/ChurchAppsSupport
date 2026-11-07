---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Anslut ChatGPT till din kyrkas B1-data och ställ frågor på vanlig svenska. Den svarar utifrån dina aktuella kyrkuppgifter. Du kan också be den hjälpa dig med sådant som annars skulle kräva flera steg i B1 Admin.

**Några exempel på frågor:**
- *"Visa alla som var med förra veckan men som inte har fått en smågrupp"*
- *"Sammanfatta den här månadens gåvor per fond"*
- *"Vilka är våra nyaste medlemmar, och har vi följt upp dem?"*
- *"Jag förstår inte hur jag gör X i B1. Kan du gå igenom det med mig?"*

</div>

<div class="prereqs">
<h4>Det här behöver du</h4>

- **ChatGPT-appen för skrivbordet** för Mac eller Windows
- **En betald ChatGPT-plan** (Plus eller högre). Kostnadsfria ChatGPT-konton kan inte anslutas till B1.
- **Din B1-inloggning** med behörighet att hantera kyrkans inställningar (behövs för att skapa en nyckel). Har du inte det? Fråga din kyrkas B1-administratör.

</div>

:::tip Rekommenderat: prova Claude först, det är gratis
[Claude](./claude) ansluts till B1 i **gratisplanen** och är klart på under 3 minuter. Lägg bara till B1 som en koppling och logga in med ditt B1-konto. Ingen nyckel behövs. Det är det enklaste sättet för din kyrka att prova AI tillsammans med B1 innan ni betalar för något.
:::

## Så här ställer du in det

Skärmbilderna kan se lite annorlunda ut i din version av ChatGPT.

---

**Steg 1: Skapa din B1-nyckel**

Nyckeln är det som släpper in ChatGPT i *din* kyrkas B1. Tänk på den som ett lösenord bara för ChatGPT.

1. Logga in på [B1 Admin](https://admin.b1.church) och gå till [Inställningar → Utvecklare](https://admin.b1.church/settings/developer).
2. Under fliken **API Keys** klickar du på **New API Key** och namnger den `ChatGPT`.
3. **Behörigheter (scopes):** markera vad ChatGPT får göra. Varje område har en ruta för **read** (bara läsa) och en ruta för **write** (göra ändringar). Är du osäker? Markera bara rutorna för **read** för att börja.
4. Klicka på **Save** och sedan på **Copy** för att kopiera nyckeln (den börjar med `cak_`). Den visas bara en gång.

---

**Steg 2: Klicka på ditt namn nere till vänster i ChatGPT**

![Klicka på ditt profilnamn](/img/guides/chatgpt-mcp/01.png)

---

**Steg 3: Klicka på Settings (Inställningar)**

![Klicka på Settings i menyn](/img/guides/chatgpt-mcp/02.png)

---

**Steg 4: Klicka på Plugins i den vänstra sidomenyn**

![Klicka på Plugins under Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Steg 5: Klicka på fliken MCPs**

![Klicka på fliken MCPs](/img/guides/chatgpt-mcp/04.png)

Här ser du eventuella MCP-servrar du redan har lagt till.

---

**Steg 6: Klicka på Add → Add MCP server**

![Klicka på Add och sedan Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Steg 7: Fyll i formuläret och klicka på Save**

![Formulär för att ansluta till en anpassad MCP](/img/guides/chatgpt-mcp/07.png)

Klicka på **Streamable HTTP** och fyll sedan i:

| Fält | Vad du ska ange |
|---|---|
| **Name** | `B1 Church` (eller valfritt namn) |
| **Type** | Klicka på **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Lämna tomt |
| **Headers** | Klicka på **+ Add header** → Key: `Authorization` → Value: se nedan |

![Exempel med Authorization i Key och Bearer-nyckeln i Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_dinnyckel`: ordet Bearer, ett mellanslag och sedan din nyckel

Klicka på **Save**.

Det var allt! Gå tillbaka till en chatt och fråga något i stil med *"Hur många personer finns i vår kyrka?"*. ChatGPT hämtar då svaret direkt från B1.

---

## Är det säkert?

- ChatGPT kan bara se **din kyrkas** data.
- Den kan bara göra det din nyckel tillåter. En nyckel med bara **read**-rutorna ikryssade kan titta men aldrig ändra något.
- Vill du stänga av åtkomsten tar du bort nyckeln i B1 Admin under **Inställningar → Utvecklare**. Åtkomsten upphör direkt.

## Vad kostar det?

B1-anslutningen är gratis. Den ingår i ChurchApps. ChatGPT kräver en betald plan (Plus eller högre) för att kunna anslutas. Se OpenAI:s prissida.

## Tekniska detaljer

Resten av den här sidan riktar sig till tekniskt kunniga användare och AI-assistenter. B1:s MCP-server finns på `https://api.churchapps.org/mcp` (Streamable HTTP) och tar API-nyckeln som en `Authorization: Bearer cak_…`-header. Se [MCP-serverns utvecklarreferens](/docs/developer/api/mcp).

### Anpassad GPT med Actions

En anpassad GPT låter dig skapa en dedikerad assistent som hela teamet kan dela. De öppnar en länk och kan börja ställa frågor utan någon egen inställning. Det kräver ett ChatGPT Plus-, Team- eller Enterprise-konto och tar ungefär 10 minuter.

#### 1. Skapa en API-nyckel

Följ steg 1 under Så här ställer du in det ovan, om du inte redan har gjort det.

#### 2. Bygg den anpassade GPT:n

1. I ChatGPT klickar du på din profil → **My GPTs** → **Create a GPT**.
2. Byt till fliken **Configure**, ge GPT:n ett namn (t.ex. "B1-assistent") och lägg till instruktioner:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Scrolla till **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** klistra in din `cak_…`-nyckel
   - **Auth Type:** Bearer
   - Spara.

4. Klistra in det här startschemat i OpenAPI-rutan under **Schema**:

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

5. Spara actionen. Testa den med: *"hur många personer finns i kyrkan?"*. ChatGPT anropar `listPeople` och svarar.
6. **Publicera** GPT:n (Only me / Anyone with link / Organization) och dela länken med ditt team.

#### 3. Använd den

Vem som helst med länken kan ställa frågor på vanligt språk. Nyckelns behörigheter gäller fortfarande. En nyckel med bara läsbehörighet nekar skrivningar oavsett vad actionschemat säger.

---

### Säkerhet och begränsningar

- **Isolering per kyrka.** API-nyckeln kopplas till bara en kyrka. ChatGPT kan inte se andra kyrkors data.
- **Behörighetsstyrd.** Nyckeln bär bara de behörigheter du gav den. Om du tar bort en behörighet (genom att radera och skapa om nyckeln) upphör åtkomsten vid nästa anrop.
- **Återkallas direkt.** Ta bort nyckeln under **Inställningar → Utvecklare → API Keys** så upphör åtkomsten omedelbart.
- **Att dela en anpassad GPT delar datan.** Alla med åtkomst till GPT:n kan se allt som nyckelns behörigheter tillåter. Välj smalare behörigheter (t.ex. utelämna `donations:read`) för GPT:er som delas brett.
- **Granskningslogg.** Ändringar som görs via ChatGPT går genom samma granskningslogg som åtgärder i B1 Admin. Hittar du dem under **Inställningar → Granskningslogg**.

### Felsökning

**MCP-kopplingen säger "Unauthorized" eller visar ett 401-fel:** din API-nyckel saknas eller är felaktig. Öppna kopplingens inställningar och kontrollera headern **Authorization**. Värdet ska vara ordet `Bearer`, ett mellanslag och sedan hela `cak_…`-nyckeln utan extra mellanslag.

**ChatGPT säger att den inte hittar vissa uppgifter:** nyckeln kan sakna rätt behörigheter. Skapa en ny nyckel under **Inställningar → Utvecklare → API Keys** med de extra behörigheterna och uppdatera kopplingen.

**Anpassad GPT-action ger 401:** kontrollera i actionens autentiseringspanel att **Auth Type: Bearer** är valt och att nyckeln inte innehåller ordet `Bearer` (ChatGPT lägger till det automatiskt).

**Anpassad GPT-action ger 403:** nyckeln saknar behörighet för den endpointen. Skapa en ny nyckel med rätt behörigheter och uppdatera GPT:n.

**Actionschemat avvisas:** ChatGPT kräver OpenAPI 3.1 med minst en `paths`-post och en `servers`-URL. Validera YAML:en på [editor.swagger.io](https://editor.swagger.io) innan du klistrar in den.

## Relaterat

- [API-nycklar](/docs/developer/api/api-keys): fullständig referens för behörigheter
- [MCP-server (utvecklarreferens)](/docs/developer/api/mcp): protokolldetaljer och verktygsscheman
- [Claude](./claude): samma idé, för Anthropics modeller
- [REST API-referens](/docs/developer/api/endpoints): alla endpoints som en anpassad GPT-action kan anropa
