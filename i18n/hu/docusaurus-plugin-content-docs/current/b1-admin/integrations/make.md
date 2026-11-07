---
title: "Make"
description: "B1 Admin csatlakoztatása a Make-hez: API-kulcs létrehozása, B1.church-trigger és műveletek beállítása, gyakori hibák elhárítása."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (korábbi nevén Integromat) egy vizuális munkafolyamat-automatizálási platform. Szellemiségében hasonlít a Zapierhez, de rugalmasabb logikát kínál, és nagyobb méretben olcsóbb. A hivatalos B1.church Make alkalmazással „forgatókönyveket" építhet, amelyek azonnal reagálnak a B1 eseményekre, és rekordokat írhatnak vissza a B1-be.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Egy [Make](https://www.make.com) fiók (az ingyenes csomag kisebb munkafolyamatokhoz elegendő)
- Egy egyházi adminisztrátor, akinek van **Beállítások szerkesztése** jogosultsága a B1Admin felületen
- Nagyjából elképzelés arról, milyen forgatókönyvet szeretne létrehozni

</div>

## Modulok

| Típus | Mit csinál | B1 esemény / végpont |
|---|---|---|
| **Azonnali indító** | Események figyelése | bármely feliratkozott B1 esemény (`person.created`, `donation.created`, …) |
| **Művelet** | Személy létrehozása | új személyt ad hozzá |
| **Művelet** | Adomány hozzáadása | rögzít egy adományt |
| **Művelet** | Csoporttag hozzáadása | személyt ad hozzá egy csoporthoz |
| **Keresés** | Személyek keresése | név vagy e-mail-cím alapján talál személyeket |

Az azonnali indító modullal kiválasztható, melyik eseményre figyeljen. Forgatókönyvenként egy indító modul van, és eseményenként állítható be.

## Beállítás

### 1. B1 API-kulcs létrehozása

1. A B1Admin felületen nyissa meg a **Beállítások → Fejlesztő → API-kulcsok** menüpontot.
2. Kattintson az **Új API-kulcs** gombra, nevezze el „Make"-nek, és adja meg a szükséges hatásköröket.
3. **Vegye fel a `settings:write` hatáskört**, ha bármelyik forgatókönyve az azonnali indítót használja. A Make a forgatókönyv bekapcsolásakor webhookot regisztrál az Ön nevében.
4. Adja meg a műveleti modulokhoz szükséges hatásköröket is (pl. a Adomány hozzáadása modulhoz a `donations:write` hatáskört).
5. Mentse el, és másolja ki a `cak_…` kulcsot.

### 2. Kapcsolat telepítése

1. A Make-ben hozzon létre egy új forgatókönyvet, és húzza a **B1.church** indító modult a vászonra.
2. Amikor a rendszer kéri, válassza a **Kapcsolat létrehozása** lehetőséget. Illessze be az API-kulcsot az *API-kulcs* mezőbe, és az *API alap URL* mezőt hagyja `https://api.churchapps.org` értéken (hacsak nem tesztelési környezetben dolgozik).
3. Kattintson a **Mentés** gombra. A Make az egyházi profil lekérdezésével ellenőrzi a kulcsot.

A kapcsolat a Make-fiókjában mentésre kerül, és az összes forgatókönyv újra felhasználja.

### 3. Az indító beállítása

1. Nyissa meg az **Események figyelése** modul beállításait.
2. Válassza ki a kívánt eseményt, például `donation.created`.
3. Mentse el. A Make egyedi webhook-URL-t generál, és belsőleg tárolja.

### 4. További modulok hozzáadása

Húzzon a vászonra bármely, a Make több százas alkalmazás-modulkínálatából származó modult, például Mailchimp, Google Sheets, Slack, HubSpot vagy saját HTTP-végpont. Az indító kimenetét (`event`, `churchId`, `data.id`, `data.amount`, …) képezze le a bemeneti mezőkre. A Make lapító, iterátor, útválasztó és összesítő moduljaival elágazó és párhuzamos folyamatokat építhet, amelyek a Zapierben nehezen volnának megvalósíthatók.

### 5. A forgatókönyv bekapcsolása

Kapcsolja be az **Aktív** kapcsolót a forgatókönyv fejlécében. A Make meghívja a B1 `POST /membership/webhooks` végpontját, és regisztrálja az URL-t. Ettől a pillanattól kezdve minden egyező B1 esemény valós időben átfolyik a forgatókönyvön.

A forgatókönyv kikapcsolásakor a rendszer meghívja a `DELETE /membership/webhooks/{id}` végpontot, így nem marad árva feliratkozás.

## Gyakori receptek

### Adományok szinkronizálása Google Táblázatba pénzügyi átvizsgáláshoz

- **Indító** — B1: Események figyelése (`donation.created`)
- **Művelet** — Google Sheets: Sor hozzáadása. Képezze le a `data.donationDate`, `data.amount`, `data.personId`, `data.method` és `data.batchId` mezőket a táblázat oszlopaira.

### Feltételes Slack-értesítés az adomány összege alapján

- **Indító** — B1: Események figyelése (`donation.created`)
- **Útválasztó**:
  - A ág — Szűrő: `data.amount >= 1000` → Slack: közzététel a `#major-gifts` csatornán
  - B ág — alapértelmezett → Slack: közzététel a `#donations` csatornán

### Új személy → CRM + üdvözlő e-mail + Slack

- **Indító** — B1: Események figyelése (`person.created`)
- **Művelet** — HubSpot: Kapcsolat létrehozása
- **Művelet** — Mailgun: Üdvözlő e-mail küldése
- **Művelet** — Slack: értesítés a `#new-people` csatornára (párhuzamosan — használja a Make útválasztóját)

## Az azonnali indító működése

Az azonnali indító webhook-alapú, nem lekérdezés-alapú. Aktiváláskor a Make a generált URL-jével és a kiválasztott eseménnyel meghívja a `POST /membership/webhooks` végpontot. Amikor az esemény bekövetkezik a B1-ben, a B1 elküldi az adatcsomagot a Make URL-jére, és a forgatókönyv másodperceken belül lefut. A forgatókönyv kikapcsolása eltávolítja a webhookot.

Az indító csak azokra az eseményekre reagál, amelyek **a forgatókönyv aktív állapotában** történnek. Visszamenőleges feldolgozás nincs.

## Korlátok és megjegyzések

- **Egy esemény Események figyelése modulonként.** Ha egy forgatókönyvben több eseményre szeretne figyelni, helyezzen több indító modult külön forgatókönyvekbe, vagy használjon egyetlen modult az egyesített eseménylistával (lásd lentebb).
- **Az aláírás-ellenőrzés nem érhető el** — a Make nem továbbítja az `X-B1-Signature` fejlécet a forgatókönyvnek. A bizalmi határt a Make kitalálhatatlan, forgatókönyvenkénti webhook-URL-je jelenti. Ez a Make szokásos gyakorlata. Ha kifejezett aláírás-ellenőrzésre van szüksége, építsen egyedi integrációt a [SDK](/docs/developer/api/webhooks#sdk-support) segítségével.
- **Műveletszám** — minden API-hívás, amelyet egy műveleti modul végez, a Make műveletkvótáját terheli, a B1 oldalán semmi nem számolódik el.

## Hibaelhárítás

- **A kapcsolat tesztelése sikertelen** — leggyakrabban az API-kulcsban van elírás. Másolja ki újra a B1Admin felületről (a teljes kulcs csak egyszer látható; ha elveszett, hozzon létre új kulcsot).
- **Az indító modul nem aktiválódik** — ellenőrizze a B1Admin felületen a **Beállítások → Fejlesztő → Webhookok** menüpontot. Ha a forgatókönyv aktiválása után nem látja a „Make — &lt;esemény&gt;" sort, az API-kulcsból hiányzik a `settings:write` hatáskör. Frissítse a kulcsot, majd aktiválja újra a forgatókönyvet.
- **A művelet `403 Forbidden` hibát ad** — az API-kulcsnak nincs hatásköre az adott végponthoz. Például az Adomány hozzáadása művelethez `donations:write` szükséges. Frissítse a kulcsot a B1Admin felületen, majd tesztelje újra.

## Az alkalmazás testreszabása

A B1.church Make alkalmazás nyílt forráskódú. A JSON-definíciók a `B1Integrations/Make/` tárolóban találhatók. Ha olyan modulra van szüksége, amely még nem létezik (például egy olyan végponthoz tartozó új művelet, amelyet még nem fedtünk le), nyisson ott egy hibajegyet vagy egy pull requestet.

## Lásd még

- [Zapier](./zapier.md) — ugyanez a minta egyszerűbb felülettel és nagyobb alkalmazáskatalógussal
- [Slack és Discord](./slack-discord.md) — beépített csevegési értesítések Make nélkül
- [Webhookok (fejlesztői referencia)](/docs/developer/api/webhooks)
