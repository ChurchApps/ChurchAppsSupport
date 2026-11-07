---
title: "VOMO"
---

# VOMO

<div class="article-intro">

A VOMO egy önkéntes-bevonási platform: az emberek projektekre jelentkeznek, a kioszknál jelentkeznek be, és órákat gyűjtenek. Ha az önkéntes-beosztáshoz a VOMO-t, a személyek nyilvántartásához pedig a B1-et használják, a Zapier szinkronizálhatja a tagságot és a bejelentkezéseket a két rendszer között, így egyik sem tér el a másiktól.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Egy [VOMO](https://vomo.org) fiók olyan csomagon, amely elérhetővé teszi a Zapiert (ha nem biztos benne, kérdezze a VOMO ügyfélszolgálatát)
- Egy [Zapier](https://zapier.com) fiók
- Egy B1Admin felhasználó **Beállítások szerkesztése** jogosultsággal

</div>

## Mit köthet össze

A VOMO Zapier-alkalmazása négy azonnali triggert és négy műveletet kínál. A legtöbb gyülekezet által keresett forgatókönyvek:

| Irány | Trigger | Művelet |
|---|---|---|
| VOMO → B1 | VOMO tagság (létrehozva) | B1: személy keresése → személy létrehozása (ha új) |
| VOMO → B1 | VOMO kioszk-bejelentkezés | B1: csoporttag hozzáadása a „Jelenleg szolgál” csoporthoz, vagy jelenlétként rögzítés |
| B1 → VOMO | B1 `person.created` | VOMO: szervező keresése (e-mail alapján); különben egyéni lépés |
| Bármelyik | VOMO részvétel (jelentkezések) | B1: csoporttag hozzáadása a projektspecifikus csoporthoz |

A VOMO-műveletek jelenleg csak **projektek vázlatának készítésére** és a meglévő szervezők, illetve projektek **megkeresésére** korlátozódnak. Jelenleg nincs olyan művelet, amellyel valakit egy VOMO-projekthez lehetne hozzáadni. A legérdekesebb összekötés főként a VOMO → B1 irányban van.

## Beállítás

### 1. B1 API-kulcs létrehozása

**Beállítások → Fejlesztő → API-kulcsok → Új API-kulcs**. Hatókörök:

- `people:read`, `people:write`: önkéntesek keresése és létrehozása B1-személyekként
- `groups:write`: hozzáadás a szolgálócsoportokhoz
- (Opcionális) `attendance:write`, ha a kioszk-bejelentkezéseket jelenlétként kezeli

### 2. A tagság-szinkronizáló Zap létrehozása

1. **Trigger**: VOMO: Tagság (esemény = `created`).
2. **Művelet**: B1.church: Személy keresése, e-mail cím alapján.
3. **Szűrő / Útvonal**: elágazás aszerint, hogy megtalálható-e a személy:
   - Nem található: B1.church: Személy létrehozása, majd csoporttag hozzáadása a megfelelő önkéntes csoporthoz.
   - Megtalálható: B1.church: csoporttag hozzáadása közvetlenül.
4. Kapcsolja be. Az új VOMO-önkéntesek ezután megjelennek a B1-ben a megfelelő csoporttagsággal.

### 3. (Opcionális) A kioszk-bejelentkezést kezelő Zap létrehozása

1. **Trigger**: VOMO: Kioszk
2. **Művelet**: B1.church: Személy keresése (e-mail alapján)
3. **Művelet**: az Ön választása szerint:
   - *Ha jelenlétként kezeli*: a Webhooks by Zapier POST kérést küld B1 `/attendance/visits` végpontjára. (A B1 Zapier-alkalmazásában még nincs önálló *Jelenlét rögzítése* művelet.) A B1 [API-kulcs](/docs/developer/api/api-keys) a `Authorization: Bearer cak_…` fejlécben adható meg.
   - *Ha csoporttagságként kezeli*: B1.church: csoporttag hozzáadása a „Jelenleg szolgál (ma)” csoporthoz. Egy későbbi, a nap során futó második Zap ütemezett takarítással eltávolítja őket.

## Gyakori forgatókönyvek

### Projektenkénti csoportszinkronizálás

- **Trigger**: VOMO: Részvétel (létrehozva)
- **Művelet**: Zapier-szűrő a projektazonosítóra, majd
- **Művelet**: B1.church: csoporttag hozzáadása egy olyan B1-csoporthoz, amelynek neve tükrözi a VOMO-projektet.

Amikor a VOMO-projekt véget ér, kézzel ürítse ki a B1-csoportot, vagy párosítsa ezt egy *Részvétel törölve* triggerrel, amely eltávolítja őket.

### „Köszönjük a jelentkezést” SMS küldése

Fűzze a VOMO Részvételt követően a Clearstream Szöveg küldése vagy a Text In Church Üzenet küldése lépést ugyanabban a Zapben. Mindkettőnek van önálló Zapier-művelete. Lásd: [Clearstream](./clearstream) és [Text In Church](./text-in-church).

### Lemorzsolódás észlelése

Futtasson napi Zapier *Ütemezés* triggert, amely a VOMO-ban meghívja a Szervező keresése műveletet azokra a B1-személyekre, akik ebben a hónapban csatlakoztak a szolgálócsapathoz. Ha a VOMO „nem található” választ ad, akkor nem aktiválták a VOMO-fiókjukat, és emlékeztetőre van szükségük.

## Korlátok és megjegyzések

- **Az e-mail az összekapcsoló kulcs.** A VOMO adatai tartalmaznak felhasználói e-mail címet, de B1 személyazonosítót nem. Ha az adományozók mindkét rendszerben más e-mail címet használnak, duplikátumok keletkeznek.
- **Nincs „Hozzáadás projekthez” művelet a VOMO Zapier-alkalmazásában.** Ha B1 → VOMO projektbe való beiratkozásra van szükség, a Webhooks by Zapier lépésből kell POST kérést küldeni a VOMO REST API-jának. Ez egyedi integráció.
- **A VOMO ingyenes vagy alsóbb csomagjai nem biztos, hogy tartalmazzák a Zapiert.** Mielőtt időpontot ígér, erősítse meg a VOMO ügyfélszolgálatánál.

## Hibaelhárítás

- **A trigger soha nem indul el.** A VOMO azonnali triggereihez szükséges, hogy az API-token érvényes maradjon. Tesztelje újra a Zapet. Ha a tokent cserélték, csatlakoztassa újra a VOMO-t.
- **A B1 *Csoporttag hozzáadása* művelet 422-es hibával meghiúsul.** A műveletben megadott csoportazonosító nem létezik. Nyissa meg a **B1Admin → Csoportok** menüpontot, kattintson a csoportra, és másolja az URL azonosító szegmensét a Zap lépésbe.
- **Több B1-személy keletkezik ugyanabból a VOMO-önkéntesből.** Valószínűleg más e-mail címmel regisztrált, mint amellyel már szerepelt a B1-ben. Egységesítse az e-mail címeket, vagy adjon hozzá egy Zapier *Útvonalat*, amely létrehozás előtt telefonszám alapján is keres.

## Lásd még

- [Zapier (áttekintés)](../zapier): a B1 oldala minden Zapier-forgatókönyvhöz
- [Clearstream](./clearstream), [Text In Church](./text-in-church): az önkéntes-jelentkezések párosítása SMS-megerősítéssel
- [Webhookok (fejlesztői referencia)](/docs/developer/api/webhooks): azok az események, amelyekre a VOMO triggerelhet
