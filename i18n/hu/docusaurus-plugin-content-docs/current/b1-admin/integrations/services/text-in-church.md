---
title: "Text In Church"
description: "A B1 Admin és a Text In Church összekapcsolása Zapier-rel: API-kulcs létrehozása, kapcsolókártyából B1-be író Zap készítése, és csoporttagság tükrözése."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) SMS-üzeneteket, fokozatos (drip) munkafolyamatokat és connect-card automatizmusokat kínál. Zapier-alkalmazása mindkét irányt lefedi: a B1-események továbbíthatók egy Text In Church munkafolyamatba, a connect-card vagy új kapcsolat eseményei pedig visszafelé a B1-be is eljuthatnak.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Egy [Text In Church](https://textinchurch.com) fiók olyan csomaggal, amely tartalmazza a Zapier-integrációt
- Egy [Zapier](https://zapier.com) fiók
- Egy B1Admin felhasználó **Beállítások szerkesztése** (Edit Settings) jogosultsággal

</div>

## Mit köthet össze

| Irány | Trigger | Művelet |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Személy létrehozása/frissítése + hozzáadás csoporthoz |
| B1 → Text In Church | B1 `form.submission.created` | SMS küldése a megfelelő csapaton keresztül |
| B1 → Text In Church | B1 `group.member.added` | Hozzáadás csoporthoz (csoporttagság tükrözése) |
| Text In Church → B1 | Connect Card beküldve | B1: Személy létrehozása + csoporttag hozzáadása |
| Text In Church → B1 | Személy létrehozva | B1: Személy létrehozása |
| Text In Church → B1 | Személy csatlakozott egy csoporthoz | B1: Csoporttag hozzáadása |

A Text In Church műveletei között szerepel még a *SMS küldése*, a *Hangüzenet-szórás küldése*, a *Feladat létrehozása*, a *Személy/csoport keresése*, valamint a csoporttagság hozzáadása és eltávolítása.

## Beállítás

### 1. B1 API-kulcs létrehozása

**Beállítások → Fejlesztő → API-kulcsok → Új API-kulcs**:

- `settings:write` — a B1 által indított Zapekhez szükséges
- `people:read`, `people:write` — személy megkereséséhez vagy létrehozásához
- `groups:write` — csoportszinkronizáláshoz
- (Opcionális) `donations:write`, ha az adománymegerősítéseket is a TIC-be köti

### 2. Text In Church összekapcsolása a Zapierrel

Kövesse a [Text In Church Zapier-integrációs útmutatóját](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Ezek a lépések a TIC-irányítópultból generálnak API-tokent.

### 3. A connect-card → B1 Zap létrehozása

Ez a leggyakoribb irány. A TIC-ből beküldött connect cardok automatikusan új B1-személyekké válnak.

1. **Trigger** — Text In Church: Connect Card beküldve.
2. **Művelet** — B1.church: Személy keresése (e-mail alapján).
3. **Elágazás** — megtalálva / nem találva szerint:
   - Nem található → B1.church: Személy létrehozása.
   - Megtalálva → folytatás.
4. **Művelet** — B1.church: Csoporttag hozzáadása egy „Új kapcsolat” csoporthoz.

Kapcsolja be a Zapet. A következő, TIC-en keresztül beküldött connect card automatikusan megjelenik a **B1Admin → Személyek** menüpontban.

## Gyakori receptek

### Connect card-szerű munkafolyamat indítása egy B1 űrlapról

- **Trigger** — B1.church: Új űrlapbeküldés (szűrés az „Új vagyok itt” űrlap azonosítójára)
- **Művelet** — Text In Church: Személy létrehozása/frissítése, az űrlap e-mail-, telefon- és névmezőinek megfeleltetésével
- **Művelet** — Text In Church: Hozzáadás csoporthoz, ahol a csoporthoz előre elkészített üdvözlő munkafolyamat van csatolva

### Csoporttagság tükrözése

- **Trigger** — B1.church: Új csoporttag, szűrve egy adott `groupId`-ra
- **Művelet** — Text In Church: Hozzáadás csoporthoz (ugyanaz a személy, tükrözött csoport). Teljes szinkronhoz párosítsa egy `group.member.removed` Zappal.

### Vezető értesítése, ha valaki csatlakozik

- **Trigger** — B1.church: Új csoporttag
- **Művelet** — Text In Church: SMS küldése, címzett = a csoportvezető telefonszáma, szöveg = `"{first} {last} just joined {group}"`.

## Korlátok és megjegyzések

- **A TIC Zapier-alkalmazása csomagszinthez kötött.** Ha a Zapier-integráció szürkén jelenik meg a TIC-irányítópultban, forduljon a TIC ügyfélszolgálatához, hogy engedélyezzék a csomagjában.
- **A csoportazonosítók a TIC-é, nem a B1-é.** Tükrözéskor valahol egy megfeleltetési táblát kell karbantartania (például egy Zapier *Keresőtáblát*, vagy Zapenként kódba írva).
- **Az SMS küldése kreditbe kerül.** Minden olyan Zap, amely *SMS küldése* műveletet hajt végre, levonja a TIC SMS-keretéből.

## Hibaelhárítás

- **A Connect Card trigger nem indul el** — a TIC-ben be kell kapcsolni a Zapier-integrációt. Ellenőrizze azt is, hogy a tesztelt űrlap „Connect Card”-ként van-e beállítva, nem pedig általános kérdőívként.
- **A személy létrehozása a B1-ben 401-es hibával meghiúsul** — az API-kulcs hibás, visszavont, vagy hiányzik a `people:write` jogosultság. Hozzon létre új kulcsot.
- **Duplikált B1-személyek** — a TIC ugyanarra az eseményre elküldi a *Személy létrehozva* és a *Connect Card beküldve* eseményeket is. Válasszon egyet forrásként, a másikra pedig tegyen Zapier-szűrőt.

## Lásd még

- [Clearstream](./clearstream.md) — alternatív SMS-platform hasonló Zapier-felépítéssel
- [Zapier (áttekintés)](../zapier.md) — minden Zapier-recept B1-oldala
- [Text In Church Zapier-útmutató](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (a TIC dokumentációja)
