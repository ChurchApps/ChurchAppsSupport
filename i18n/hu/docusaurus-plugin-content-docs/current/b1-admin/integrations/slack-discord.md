---
title: "Slack és Discord"
---

# Slack és Discord

<div class="article-intro">

Küldjön olvasható értesítéseket a B1-ből közvetlenül egy Slack- vagy Discord-csatornába: új személyek, adományok, csoportregisztrációk, űrlapbeküldések, naptáresemények és egyebek. Nincs szükség harmadik féltől származó fiókra, és nincs Zap, amit karban kellene tartani. A B1 átalakítja az eseményeket csevegőüzenetekké, és maga küldi el őket a csatorna webhook URL-jére.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Szüksége van a **Beállítások szerkesztése** jogosultságra a B1Admin felületen
- Egy adminisztrátorra a Slack-munkaterületén vagy Discord-kiszolgálón, aki létrehozhatja a csatorna bejövő webhookját (Incoming Webhook)
- Döntse el, melyik csatornába szeretne értesítéseket kapni (használhat ugyanazt a csatornát több eseménytípushoz, vagy szétoszthatja őket több csatorna között)

</div>

## Hogyan működik

A B1 beépített **kapcsolattípussal** (Connector Type) rendelkezik a csevegőplatformokhoz. Ha **Slack** vagy **Discord** típusú webhookot hoz létre, a webhook-motor továbbra is elvégzi a szokásos kézbesítést, újrapróbálkozást és aláírt fejlécek küldését, de a küldött törzs átalakul: a B1 szokásos `{event,churchId,data}` borítékja helyett a szolgáltatások által elvárt rövid `{text}` (Slack) vagy `{content}` (Discord) üzenet lesz belőle.

Az egyházanként érkező Slack-kapcsolaton kívül a B1 szerverei a meglévő kimenő webhook-folyamaton túl nem lépnek kapcsolatba a Slackkel. Nincs új üzemeltetendő rendszer és nincs többletköltség.

## Slack — lépésről lépésre

### 1. Slack bejövő webhook URL-jének beszerzése

1. Nyissa meg az [api.slack.com/apps](https://api.slack.com/apps) oldalt abban a Slack-munkaterületen, ahová az értesítéseket szeretné kapni.
2. Kattintson a **Create New App → From scratch** (Új alkalmazás létrehozása → Létrehozás nulláról) gombra, adjon neki olyan nevet, mint például „B1 Notifications”, és válassza ki a munkaterületet.
3. A bal oldali menüben válassza az **Incoming Webhooks** (Bejövő webhookok) menüpontot, és kapcsolja be az **Activate Incoming Webhooks** (Bejövő webhookok aktiválása) opciót *Be* állásba.
4. Kattintson az **Add New Webhook to Workspace** (Új webhook hozzáadása a munkaterülethez) gombra, válassza ki a csatornát (például `#donations`), majd kattintson az **Allow** (Engedélyezés) gombra.
5. A Slack visszairányítja az oldalra, ahol megjelenik egy új **Webhook URL**, ami valahogy így néz ki: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Másolja ki, mert ez az egyetlen adat, amire a B1-nek szüksége van.

:::caution
A Slack webhook URL-t kezelje titokként. Bárki, akinek birtokában van, tetszőleges üzeneteket küldhet a csatornába. Ha véletlenül nyilvánosságra kerül, generáljon újat a Slack-alkalmazás oldalán (az újragenerálás csak lecseréli az URL-t, ezután frissítse a B1-ben is).
:::

### 2. Csatlakoztatás a B1Admin felületen

1. A B1Admin felületen lépjen a **Beállítások → Fejlesztő → Webhookok** menüpontra.
2. Kattintson az **Új webhook** gombra.
3. Töltse ki a mezőket:
   - **Név** — olyan könnyen érthető név, mint például „Adományok → #donations”. Csak az Ön csapata látja.
   - **Kapcsolattípus** (Connector Type) — válassza a **Slack** lehetőséget.
   - **Payload URL** — illessze be az 1. lépésben kapott Slack URL-t.
   - **Események** — jelölje be azokat az eseményeket, amelyeket üzenetként szeretne kapni. Egy adománycsatornához elegendő a `donation.created`. Egy #people csatornához próbálja ki a `person.created` és a `group.member.added` eseményeket.
4. Kattintson a **Mentés** gombra. Megjelenik egy „Signing Secret” (aláírási titok) párbeszédablak. Slack esetében figyelmen kívül hagyhatja, mert a Slack nem ellenőrzi a B1 aláírásait, így bezárhatja.

### 3. Tesztelés

Nyissa meg újra a webhookot a listából, és kattintson a **Teszteseményes küldés** (Send Test Event) gombra. Pár másodpercen belül egy ehhez hasonló üzenet jelenik meg a Slack-csatornában:

> 💝 New donation: $50.00

Ugyanebben a nézetben a **Legutóbbi kézbesítések** (Recent Deliveries) táblázatban új sor jelenik meg `succeeded` (sikeres) állapottal. Ezzel készen is van.

## Discord — lépésről lépésre

### 1. Discord webhook URL-jének beszerzése

1. A Discord-kiszolgálón vigye az egérmutatót arra a csatornára, amelyhez az értesítéseket szeretné kapni, majd kattintson a **⚙ fogaskerék** ikonra (Csatorna szerkesztése).
2. Nyissa meg az **Integrations → Webhooks → New Webhook** (Integrációk → Webhookok → Új webhook) menüpontot.
3. Adjon nevet a webhooknak, és ha szeretné, válasszon avatárt, majd kattintson a **Copy Webhook URL** (Webhook URL másolása) gombra. Az URL valahogy így néz ki: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Csatlakoztatás a B1Admin felületen

Ugyanaz, mint a fenti Slack-folyamat, azzal a különbséggel, hogy a **Kapcsolattípus** (Connector Type) mezőben a **Discord** lehetőséget kell kiválasztani. Illessze be a Discord URL-t a **Payload URL** mezőbe, majd mentse.

:::tip
A Discord URL végére **nem** kell `/slack` részt írnia. A B1 Discord-natív `{content}` tartalmú adatokat küld, nem Slack-kompatibilis formátumúakat. Egyszerűen illessze be azt az URL-t, amelyet a Discord adott.
:::

### 3. Tesztelés

Ugyanazt a **Teszteseményes küldés** (Send Test Event) gombot használja. A Discord megjeleníti az üzenetet a kiválasztott csatornában, a kézbesítési napló pedig `succeeded` állapotra vált.

## Hogyan néznek ki az üzenetek

| Esemény | Példa üzenetre |
|---|---|
| `person.created` | 👤 Új személy hozzáadva: Jordan Rivera |
| `person.updated` | 👤 Személy frissítve: Jordan Rivera |
| `group.created` | 👥 Új csoport létrehozva: Keddi bibliatanulmányozás |
| `group.member.added` | ➕ Valaki csoporthoz lett adva |
| `donation.created` | 💝 Új adomány: $50.00 |
| `donation.updated` | 💝 Adomány frissítve: $75.00 |
| `attendance.recorded` | ✅ Részvétel rögzítve |
| `form.submission.created` | 📝 Új űrlapbeküldés érkezett |
| `event.created` | 📅 Új esemény: Húsvéti istentisztelet |

A teljes listát a [webhook eseménykatalógus](/docs/developer/api/webhooks#event-catalog) tartalmazza. Ott szereplő bármely esemény továbbítható Slackbe vagy Discordba.

## Témánként külön csatorna

Nem kell minden eseményt egy helyre küldenie. A legtöbb gyülekezet néhány webhookot állít be:

- Egy **#donations** csatornát, amely csak a `donation.created` eseményre figyel
- Egy **#new-people** csatornát a `person.created` és a `group.member.added` eseményekhez
- Egy **#admin-alerts** csatornát a kisebb forgalmú eseményekhez, például a `form.submission.created` eseményhez

Egy gyülekezetnek nincs korlátja a webhookok számára. Mindegyik független: egy webhook törlése vagy letiltása nem befolyásolja a többit.

## Kézbesítések ellenőrzése

A webhook-szerkesztő **Legutóbbi kézbesítések** (Recent Deliveries) táblázata az utolsó 50 próbálkozást mutatja. Kattintson egy sorra, hogy lássa a pontosan elküldött adatokat és a visszakapott választ. Slack-kapcsolat esetén a törzs `{"text":"💝 New donation: $50.00"}` lesz, nem a nyers `{event,churchId,...}` boríték, mert a B1 a kézbesítés előtt átalakítja.

Ha valami hibás volt (piros `failed` vagy `exhausted` jelvény), a párbeszédablak megmutatja a HTTP-állapotkódot és a válasz törzsét, így pontosan láthatja, mit nem fogadott el a Slack vagy a Discord. Ez általában másolási hiba az URL-ben.

## Hibaelhárítás

- **Nem jelenik meg üzenet, a kézbesítés állapota `400`** — általában azért, mert a Kapcsolattípus **Standard**, de az URL Slack- vagy Discord-URL. A Slack és a Discord elutasítja a nyers borítékot. Állítsa a legördülő menüt **Slack** vagy **Discord** értékre, és küldje el újra a tesztet.
- **A webhook automatikusan letiltódott** — 3 egymást követő sikertelen kézbesítés után a B1 kikapcsolja a webhookot. Javítsa az URL-t (vagy generáljon újat a Slackben/Discordban), majd kapcsolja vissza az **Aktív** opciót.
- **Az üzenet megérkezett, de hiányzik belőle a részlet** — minden csevegőplatform korlátozza az üzenetek méretét. A B1 üzenetei szándékosan egysorosak. Gazdagabb értesítésekhez használja a [Zapier](./zapier) vagy a [Make](./make) szolgáltatást, amellyel a Slack-műveleteken keresztül összetettebb Slack-üzenet állítható össze.

## Kapcsolattípus módosítása később

A meglévő webhook kapcsolattípusát később is megváltoztathatja. A módosítás a következő kézbesítéstől lép életbe. Ha Slackről Standard típusra vált, állítsa az URL-t a saját HTTPS-végpontjára. Az eredeti aláírási titok (amelyet a webhook létrehozásakor adtak ki) ezután a nyers boríték ellenőrzésére is használható lesz.

## Lásd még

- [Zapier](./zapier) — többlépéses munkafolyamatokhoz, amelyeket B1-események indítanak
- [Make](./make) — vizuális forgatókönyv-szerkesztő
- [Webhookok (fejlesztői referencia)](/docs/developer/api/webhooks) — a teljes adatformátum és aláírási formátum, ha valaha a saját szerveréhez szeretne webhookot csatlakoztatni
