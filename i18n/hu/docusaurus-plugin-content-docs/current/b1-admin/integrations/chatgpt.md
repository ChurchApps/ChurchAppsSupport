---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Csatlakoztassa a ChatGPT-t egyházának B1-adataihoz, és egyszerű magyar nyelven tehet fel kérdéseket neki — a válaszokat az egyház élő nyilvántartásából kapja. Arra is megkérheti, hogy segítsen olyan feladatokban, amelyekhez a B1 Adminban több lépésre van szükség.

**Néhány példakérdés:**
- *„Mutasd meg mindenkit, aki a múlt héten részt vett az alkalmon, de még nincs kiscsoporthoz rendelve”*
- *„Foglald össze a havi adományokat alaponként”*
- *„Kik a legújabb tagjaink, és felvettük velük a kapcsolatot?”*
- *„Nem tudom, hogyan csinálok X-et a B1-ben — tudnál végigvezetni?”*

</div>

<div class="prereqs">
<h4>Amire szüksége lesz</h4>

- **A ChatGPT asztali alkalmazás** Mac-re vagy Windowsra
- **Fizetős ChatGPT-csomag** (Plus vagy magasabb). Az ingyenes ChatGPT-fiókok nem tudnak csatlakozni a B1-hez.
- **B1-bejelentkezés**, amelyhez az egyházi beállítások kezeléséhez szükséges jogosultság tartozik (a kulcs létrehozásához kell). Nincs ilyen? Kérdezze meg egyházának B1-adminisztrátorát.

</div>

:::tip Ajánlott: próbálja ki előbb a Claude-ot — ingyenes
A [Claude](./claude) a **ingyenes csomagjával** is csatlakozik a B1-hez, és kevesebb mint 3 perc alatt beállítható: csak adja hozzá a B1-et összekötőként, és jelentkezzen be B1-fiókjával. Kulcsra nincs szükség. Ez a legegyszerűbb módja annak, hogy egyháza a B1-gyel mesterséges intelligenciát próbálhasson ki, mielőtt bármiért fizetne.
:::

## Beállítás

A képernyők a ChatGPT verziójától függően kissé eltérhetnek.

---

**1. lépés — Hozza létre B1-kulcsát**

A kulcs teszi lehetővé, hogy a ChatGPT belépjen *egyházának* B1-fiókjába — gondoljon rá úgy, mint egy jelszóra, amely kizárólag a ChatGPT-nek szól.

1. Jelentkezzen be a [B1 Adminba](https://admin.b1.church), és lépjen a [Beállítások → Fejlesztő](https://admin.b1.church/settings/developer) menüpontra.
2. Az **API-kulcsok** fülön kattintson az **Új API-kulcs** gombra, és nevezze el `ChatGPT`-nek.
3. **Hatókörök:** jelölje be, mit végezhet a ChatGPT. Minden területhez tartozik egy **olvasás** (csak megtekintés) és egy **írás** (módosítás) jelölőnégyzet. Nem biztos benne? Kezdésképpen csak az **olvasás** négyzeteket jelölje be.
4. Kattintson a **Mentés** gombra, majd másolja ki a **Másolás** gombbal a kulcsot (`cak_`-val kezdődik). Csak egyszer jelenik meg.

---

**2. lépés — Kattintson a nevére a ChatGPT bal alsó sarkában**

![Kattintson a profil nevére](/img/guides/chatgpt-mcp/01.png)

---

**3. lépés — Kattintson a Beállítások menüpontra**

![Kattintson a Beállításokra a menüben](/img/guides/chatgpt-mcp/02.png)

---

**4. lépés — Kattintson a Bővítmények menüpontra a bal oldalsávban**

![Kattintson a Bővítmények menüpontra az Integrációk alatt](/img/guides/chatgpt-mcp/03.png)

---

**5. lépés — Kattintson az MCP-k fülre**

![Kattintson az MCP-k fülre](/img/guides/chatgpt-mcp/04.png)

Itt jelennek meg a már hozzáadott MCP-kiszolgálók.

---

**6. lépés — Kattintson a Hozzáadás → MCP-kiszolgáló hozzáadása menüpontra**

![Kattintson a Hozzáadás, majd az MCP-kiszolgáló hozzáadása menüpontra](/img/guides/chatgpt-mcp/06.png)

---

**7. lépés — Töltse ki az űrlapot, majd kattintson a Mentés gombra**

![Egyéni MCP-hez való csatlakozás űrlapja](/img/guides/chatgpt-mcp/07.png)

Kattintson a **Streamable HTTP** lehetőségre, majd töltse ki a következő mezőket:

| Mező | Mit adjon meg |
|---|---|
| **Név** | `B1 Church` (vagy bármilyen más név) |
| **Típus** | Kattintson a **Streamable HTTP** lehetőségre |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer-token környezeti változó** | Hagyja üresen |
| **Fejlécek** | Kattintson a **+ Fejléc hozzáadása** gombra → Kulcs: `Authorization` → Érték: lásd lent |

![Kitöltött példa: az Authorization a Kulcs mezőben, a Bearer-kulcs az Érték mezőben](/img/guides/chatgpt-mcp/08.png)

- **Kulcs:** `Authorization`
- **Érték:** `Bearer cak_sajatkulcs` — a `Bearer` szó, egy szóköz, majd a kulcs

Kattintson a **Mentés** gombra.

Ennyi! Térjen vissza egy beszélgetéshez, és kérdezzen valami ilyesmit: *„Hány ember jár az egyházunkba?”* — a ChatGPT közvetlenül a B1-ből fogja lekérni a választ.

---

## Biztonságos?

- A ChatGPT csak **az Ön egyházának** adatait láthatja.
- Csak azt teheti meg, amit a kulcs engedélyez — az olyan kulcs, amelyen csak az **olvasás** négyzetek vannak bejelölve, csak megtekinteni tud, módosítani nem.
- A kikapcsoláshoz törölje a kulcsot a B1 Adminban a **Beállítások → Fejlesztő** menüpontban. A hozzáférés azonnal megszűnik.

## Mibe kerül?

A B1-kapcsolat ingyenes — az ChurchApps része. A ChatGPT-hez csatlakozáshoz fizetős csomag (Plus vagy magasabb) szükséges; lásd az OpenAI árait.

## Műszaki részletek

Az oldal többi része műszaki felhasználóknak és MI-asszisztenseknek szól. A B1 MCP-kiszolgálója a `https://api.churchapps.org/mcp` címen érhető el (Streamable HTTP), és az API-kulcsot `Authorization: Bearer cak_…` fejlécben várja. Lásd az [MCP-kiszolgáló fejlesztői referenciáját](/docs/developer/api/mcp).

### Egyéni GPT műveletekkel

Az egyéni GPT segítségével olyan dedikált asszisztenst hozhat létre, amelyet az egész csapata megoszthat — megnyitják a hivatkozást, és az ő oldalukon semmilyen beállítás nélkül kérdezhetnek. Ehhez ChatGPT Plus, Team vagy Enterprise fiók és körülbelül 10 perc szükséges.

#### 1. API-kulcs létrehozása

Ha még nem tette meg, kövesse a fenti Beállítás részének 1. lépését.

#### 2. Az egyéni GPT elkészítése

1. A ChatGPT-ben kattintson a profiljára → **Saját GPT-k** → **GPT létrehozása**.
2. Váltson a **Konfigurálás** fülre, adjon nevet a GPT-nek (pl. „B1 Assistant”), és adja meg az utasításokat:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Görgessen a **Műveletek** részhez → **Új művelet létrehozása** → **Hitelesítés**.
   - **Hitelesítés típusa:** API-kulcs
   - **API-kulcs:** illessze be a `cak_…` kulcsát
   - **Hitelesítés típusa:** Bearer
   - Mentés.

4. A **Séma** mezőbe illessze be ezt a kezdő OpenAPI-specifikációt:

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

5. Mentse a műveletet. Teszteljük: *„Hány ember jár az egyházba?”* — a ChatGPT meghívja a `listPeople` műveletet, és válaszol.
6. **Közzétegye** a GPT-t (Csak nekem / Bárki, akinek van hivatkozása / Szervezet), és ossza meg a hivatkozást csapatával.

#### 3. Használat

Bárki, akinek megvan a hivatkozás, természetes nyelvű kérdéseket tehet fel. A kulcs hatókörei továbbra is érvényesek — egy csak olvasásra jogosult kulcs minden módosítási kérést elutasít, függetlenül attól, mit mond a műveleti séma.

---

### Biztonság és korlátok

- **Egyházankénti elkülönítés.** Az API-kulcs csak egy egyházhoz tartozik. A ChatGPT nem láthatja más egyházak adatait.
- **Jogosultsághoz kötött.** A kulcs csak az Ön által megadott hatóköröket hordozza. Egy hatókör eltávolítása (a kulcs törlésével és újralétrehozásával) a következő híváskor megszünteti a hozzáférést.
- **Azonnal visszavonható.** A kulcsot a **Beállítások → Fejlesztő → API-kulcsok** menüpontban törölheti, és a hozzáférés azonnal megszűnik.
- **Az egyéni GPT megosztása az adatokat is megosztja.** Bárki, aki hozzáfér a GPT-hez, láthatja mindazt, amit a kulcs hatókörei engedélyeznek. Széles körben megosztott GPT-khez szűkebb hatóköröket adjon meg (pl. hagyja ki a `donations:read` hatókört).
- **Naplózás.** A ChatGPT-n keresztül végrehajtott módosítások ugyanabba a naplóba kerülnek, mint a B1 Adminban végzett műveletek — ezeket a **Beállítások → Naplózás** menüpontban találja.

### Hibaelhárítás

**Az MCP-összekötő „Unauthorized” üzenetet ad, vagy 401-es hibát mutat:** az API-kulcs hiányzik vagy hibás. Nyissa meg az összekötő beállításait, és ellenőrizze az **Authorization** fejlécet: az értéknek a `Bearer` szónak, egy szóköznek, majd a teljes `cak_…` kulcsnak kell lennie, extra szóközök nélkül.

**A ChatGPT szerint nem találja bizonyos adatokat:** lehet, hogy a kulcsnak nincsenek megfelelő hatókörei. Hozzon létre új kulcsot a **Beállítások → Fejlesztő → API-kulcsok** menüpontban a további hatókörökkel, és frissítse az összekötőt.

**Az egyéni GPT művelete 401-et ad vissza:** a művelet hitelesítési paneljén ellenőrizze, hogy a **Hitelesítés típusa: Bearer** van-e kiválasztva, és hogy a kulcs nem tartalmazza a `Bearer` szót (a ChatGPT automatikusan hozzáadja).

**Az egyéni GPT művelete 403-at ad vissza:** a kulcsnak nincs hatóköre az adott végponthoz. Hozzon létre új kulcsot a megfelelő hatókörökkel, és frissítse a GPT-t.

**A műveleti sémát elutasítja:** a ChatGPT OpenAPI 3.1-et vár, legalább egy `paths` bejegyzéssel és egy `servers` URL-lel. Beillesztés előtt ellenőrizze a YAML-t az [editor.swagger.io](https://editor.swagger.io) oldalon.

## Kapcsolódó oldalak

- [API-kulcsok](/docs/developer/api/api-keys) — a hatókörök teljes listája
- [MCP-kiszolgáló (fejlesztői referencia)](/docs/developer/api/mcp) — protokollrészletek és eszközsémák
- [Claude](./claude) — ugyanez az elv, az Anthropic modelljeihez
- [REST API-referencia](/docs/developer/api/endpoints) — minden végpont, amelyet egy egyéni GPT-művelet meghívhat
