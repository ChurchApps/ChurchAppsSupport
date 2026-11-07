---
title: "Zapier"
description: "B1 Admin csatlakoztatása Zapier-hez: automatizmusok új személyekre, adományokra és csoporttagokra, visszaírás a B1-be kódolás nélkül."
---

# Zapier

<div class="article-intro">

A B1.church hivatalos alkalmazása a Zapier-en lehetővé teszi, hogy egy Zap reagáljon a gyülekezetében történő eseményekre (új személy, új adomány, új csoporttag, …), és visszaírjon rekordokat a B1-be. Nincs szükség programozásra vagy saját infrastruktúrára: a Zapier húzd-és-ejtsd szerkesztőjében állítod be, beillesztesz egy API-kulcsot, majd bekapcsolod a Zap-et.

</div>

:::caution Várakozás a Zapier jóváhagyására
A B1.church alkalmazás elkészült és működik, de még a Zapier felülvizsgálatára vár, mielőtt megjelenne nyilvánosan a Zap szerkesztő alkalmazáskönyvtárában. Addig csak meghívott fiókok használhatják. Az alábbi leírás arra vonatkozik, ahogyan működni fog a jóváhagyás után.
:::

<div class="prereqs">
<h4>Mielőtt elkezded</h4>

- Egy [Zapier](https://zapier.com) fiók (a Zapier ingyenes csomagja néhány Zap-hez elegendő)
- Egy gyülekezeti adminisztrátor, akinek van **Beállítások szerkesztése** jogosultsága a B1Admin-ban (itt fogsz API-kulcsot létrehozni)
- Elképzelés arról, mit szeretnél elérni, pl. „amikor egy személyt felveszek a B1-be, adja hozzá a Mailchimp-listámhoz”

</div>

## Triggerek és műveletek

| Típus | Mi | B1 esemény / végpont |
|---|---|---|
| **Trigger** | Új személy | `person.created` |
| **Trigger** | Frissített személy | `person.updated` |
| **Trigger** | Új adomány | `donation.created` |
| **Trigger** | Új csoporttag | `group.member.added` |
| **Trigger** | Új űrlapbeküldés | `form.submission.created` |
| **Művelet** | Személy létrehozása | új személyt ad hozzá |
| **Művelet** | Adomány hozzáadása | adományt rögzít |
| **Művelet** | Csoporttag hozzáadása | személyt ad hozzá egy csoporthoz |
| **Művelet** | Személy keresése | személyt keres azonosító, e-mail-cím vagy név alapján; ha senki sem egyezik, a feladat sikertelen lesz |

Ezeket szabadon kombinálhatod a Zapier több mint 7000 támogatott alkalmazásának bármelyikével.

## Beállítás

### 1. B1 API-kulcs létrehozása

1. A B1Admin-ban nyisd meg a **Beállítások → Fejlesztő → API-kulcsok** menüpontot.
2. Kattints az **Új API-kulcs** gombra, adj neki olyan nevet, mint „Zapier”, és válaszd ki a Zap-hez szükséges hatóköröket.
3. **Fontos:** A Zapier triggerei a Zap bekapcsolásakor webhookot regisztrálnak a nevedben, ehhez a **`settings:write`** hatókör szükséges. Ha bármelyik Zap-ed B1-triggert használ, mindig add hozzá a `settings:write` hatókört.
4. Add meg a műveletekhez szükséges hatóköröket is, például az „Adomány hozzáadása” művelethez `donations:write`, a „Személy létrehozása” művelethez `people:write` kell.
5. Mentés. A teljes `cak_…` kulcs **egyszer** jelenik meg – másold ki.

### 2. A Zapier összekapcsolása a B1-gyel

1. A Zapier-ben hozz létre egy új Zap-et.
2. Amikor először választasz B1-triggert vagy -műveletet, a Zapier kéri, hogy **jelentkezz be a B1.church-be**.
3. Illeszd be az 1. lépésben kapott API-kulcsot, és kattints a **Igen, folytatás** gombra. A Zapier ellenőrzi a kulcsot a gyülekezetedhez.

A kapcsolat a Zapier-ben mentésre kerül, és a fiókodon belül minden Zap újra felhasználja.

### 3. A Zap felépítése

Válassz egy triggert, majd adj hozzá egy vagy több műveleti lépést. Az alábbiakban példák találhatók.

## Gyakori receptek

### Új B1-személyek hozzáadása a Mailchimp-hez

- **Trigger** — B1: Új személy
- **Művelet** — Mailchimp: Feliratkozó hozzáadása/frissítése. Az összerendelés: B1 `name__first` → Mailchimp Keresztnév, B1 `name__last` → Vezetéknév, B1 `contactInfo__email` → E-mail mező.

### Adományok közzététele Slack-csatornán, a beépített összekötőnél gazdagabb kártyával

- **Trigger** — B1: Új adomány
- **Művelet** — Slack: Üzenet küldése csatornára. Állíts össze bármilyen elrendezést – gombokat, mellékleteket stb. –, amelyre a beépített [Slack-összekötő](./slack-discord.md) nem képes.

### Új csoporttagok hozzáadása Google-csoporthoz

- **Trigger** — B1: Új csoporttag (egy adott `groupId`-ra szűrve)
- **Művelet** — Szűrő a Zapier-ből: csak akkor folytatódjon, ha a B1-csoport az, amely téged érdekel
- **Művelet** — B1: Személy keresése (a trigger `personId` értékét használva lekéri az e-mail-címet)
- **Művelet** — Google-csoportok: Tag hozzáadása

### Űrlapbeküldések továbbítása projektkövető rendszerbe

- **Trigger** — B1: Új űrlapbeküldés
- **Művelet** — Notion / Linear / Asana / Trello: Oldal / hibajegy / feladat létrehozása

## Hogyan működnek a triggerek a háttérben

A triggerek **REST-hookok**, nem lekérdezés (polling) – a Zapier nem kérdezi le 15 percenként a B1-et. Amikor bekapcsolod a Zap-et, a Zapier arra kéri a B1-et, hogy regisztráljon egy webhookot, amely egy privát Zapier-URL-re mutat; amikor az esemény bekövetkezik, a B1 elküldi a csomagot a Zapier-nek, és a Zap **másodperceken belül** elindul. Ha kikapcsolod a Zap-et, a Zapier arra kéri a B1-et, hogy törölje a webhookot – nem maradnak árva feliratkozások.

Ez azt jelenti, hogy a trigger csak azokra az eseményekre aktiválódik, amelyek a Zap bekapcsolása **után** történnek. Nincs visszamenőleges feldolgozás – a Zap bekapcsolása nem játssza le a tegnapi adományokat.

## Korlátok és megjegyzések

- **Több, azonos triggert használó Zap** mindegyike saját B1-webhookot regisztrál – nincs ütközés, de érdemes tudni, ha a **Beállítások → Fejlesztő → Webhookok** menüpontban három azonos „Zapier — donation.created” sort látsz, és azon tanakodsz, miért.
- **Teszadatok a Zap beállításakor** – a Zap felépítésekor a Zapier mintaadatokat kér a mezők összerendeléséhez. Ha van legutóbbi megfelelő esemény a B1-ben, azt húzza be; ellenkező esetben az alkalmazásdefinícióból származó szintetikus mintát használja.
- **A műveletek hibái Zap-hibaként jelennek meg** a Zapier feladattörténetében. Gyakori ok: olyan API-kulcs, amelyből hiányzik a megfelelő hatókör (pl. az „Adomány hozzáadása” művelethez `donations:write` kell). Hozz létre új kulcsot a megfelelő hatókörökkel, majd csatlakoztasd újra a Zapier-ben.
- **Kimenő API-hívások kvótái** – minden B1 API-hívás egy műveletből a Zapier feladatkvótádba számít be, nem a B1 oldalán lévő bármibe.

## Hibaelhárítás

- **„Authentication failed”** csatlakozáskor – az API-kulcs hibás, visszavonták, vagy hiányoznak belőle a Zap-hez szükséges hatókörök. Hozz létre újat a B1Admin-ban legalább `settings:write` hatókörrel, plusz a Zap által érintett erőforrások hatóköreivel, majd frissítsd a kapcsolatot.
- **A trigger soha nem indul el** – ellenőrizd, hogy a webhook valóban regisztrálódott-e: a B1Admin-ban a **Beállítások → Fejlesztő → Webhookok** menüpontban meg kell jelennie egy „Zapier — &lt;esemény&gt;” nevű sornak. Ha nincs ott, valószínűleg az API-kulcsból hiányzott a `settings:write` hatókör, amikor bekapcsoltad a Zap-et. Javítsd a kulcsot, majd kapcsold ki és vissza a Zap-et.
- **A trigger kétszer indul el** – a Zapier időnként újraküldheti az eseményt, ha a nyugtázása elveszett. Ha szigorú duplikációszűrésre van szükséged, használj „Szűrő a Zapier-ből” lépést egyedi azonosítón (pl. a személy `id`-ján).

## Lásd még

- [Make](./make.md) – ugyanez a minta, más platformon
- [Slack és Discord](./slack-discord.md) – egyszerűbb csevegési értesítések Zapier nélkül
- [Webhookok (fejlesztői referencia)](/docs/developer/api/webhooks)
