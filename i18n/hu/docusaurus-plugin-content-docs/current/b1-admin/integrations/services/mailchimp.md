---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

A B1 automatikusan szinkronban tartja a Mailchimp-közönséget: az emberek a nevükkel, e-mail-címükkel és telefonszámukkal kerülnek át, a csoport- és listatagság Mailchimp-címkékké alakul, a törölt személyek pedig archiválásra kerülnek. A szinkronizálás a B1-be van beépítve, nincs szükség harmadik féltől származó szolgáltatásra és feladatonkénti díjazásra, a változások pedig közel valós időben érkeznek meg, nem egy éjszakai ütemezés szerint.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Egy [Mailchimp](https://mailchimp.com)-fiók, amely tartalmazza azt a közönséget, amelyet a B1 kezeljen
- Egy Mailchimp **API-kulcs** (Mailchimp: profilikon → **Account & billing → Extras → API keys**)
- A **közönség-azonosítója** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Egy B1Admin-felhasználó **Edit Settings** jogosultsággal

</div>

## Mi szinkronizálódik

| B1-beli változás | Hatás a Mailchimpben |
|---|---|
| Személy hozzáadása vagy frissítése | Feliratkozó hozzáadása vagy frissítése (keresztnév, vezetéknév, telefonszám; az új feliratkozók `subscribed` állapotban érkeznek) |
| Személy törlése (vagy GDPR szerinti törlése) | Feliratkozó archiválása |
| Személy belép egy csoportba | A csoport nevéről elnevezett címke hozzáadása |
| Személy kilép egy csoportból | Az adott címke eltávolítása |
| Személy belép egy mentett listába | A lista nevéről elnevezett címke hozzáadása |
| Személy kilép egy mentett listából | Az adott címke eltávolítása |

**A mentett listák általában jobb címkeforrások.** A B1 [mentett lista](/docs/b1-admin/people/lists) szabályalapú közönség, amely magától frissül: például „a főegyházközség összes tagja” vagy „azok a tagok, akik lelkipásztori e-mailekre iratkoztak fel”. Ha a Mailchimp-szegmenseit a lista-címkékre építi, a szinkronizálás karbantartja őket. A csoportcímkéket pedig a szolgálati csapatok részére küldött levelekhez használhatja.

A szinkronizálás **egyirányú** (B1 → Mailchimp), és csak a Mailchimp szabványos mezőit érinti, így nem ütközhet a Mailchimpen belül kezelt egyesítő mezőkkel vagy szegmensekkel.

## Beállítás

1. A B1Admin felületen lépjen a **Settings → Developer → Webhooks → New Webhook** menüpontra.
2. A **Connector Type** mezőben válassza a **Mailchimp** lehetőséget.
3. Illessze be a **Mailchimp API Key** és az **Audience ID** értékeket. A kulcs titkosítva tárolódik, és többé nem jelenik meg.
4. A releváns események már ki vannak jelölve. Törölje a jelölést azoknál, amelyekre nincs szükség (például hagyja bekapcsolva a személyekre vonatkozó eseményeket, de a csoportcímkéket hagyja ki).
5. Mentse el. A B1 a fogadás előtt ellenőrzi a kulcsot és a közönséget a Mailchimpnél. Az elírás azonnal hibát jelez, megadva az okot.

A **Send Test** gombbal bármikor újra ellenőrizheti a kapcsolatot. Minden szinkronizálási kísérlet naplózódik a webhook kézbesítési előzményei között, a Mailchimp tényleges válaszával együtt. A sikertelen kézbesítések körülbelül öt napig automatikusan, növekvő várakozási idővel újrapróbálkoznak.

## Kezdeti importálás

A csatlakozó a bekapcsolás pillanatától kezdve a *változásokat* szinkronizálja, a már meglévő névjegyzékét nem tölti vissza. A beállítás napján:

1. A B1Admin felületen lépjen a **People** menüpontra, keresse meg a kívánt személyeket (vagy futtasson egy mentett listát), majd kattintson az **Export** gombra egy CSV-fájl letöltéséhez.
2. A Mailchimpben az **Audience → Import contacts** menüponttal töltse be a CSV-fájlt, és az importálás során alkalmazza a szükséges címkéket.

A kezdeti betöltést a Mailchimp importálójával végezve Ön megtartja az irányítást a hozzájárulás kérdésében: csak olyan személyeket importáljon, akik ténylegesen beleegyeztek abba, hogy e-mailt kapjanak Öntől. Egy teljes névjegyzék feliratkozott kontaktokként történő tömeges importálása sértheti a Mailchimp feltételeit és a spamellenes jogszabályokat (CAN-SPAM/GDPR).

## Korlátok és megjegyzések

- **Egyirányú szinkronizálás.** A leiratkozások, a visszapattanások és a Mailchimpben végzett szerkesztések nem jutnak vissza a B1-be. Aki a Mailchimpben iratkozik le, attól a B1-ből közvetlenül küldött levelek továbbra is megérkezhetnek. A tömeges levelezésre vonatkozó hozzájárulás forrásaként a Mailchimpet kezelje.
- **Az e-mail-cím nélküli személyek kimaradnak** (ezt a kézbesítési előzmények naplózzák), mivel a Mailchimp-feliratkozókat az e-mail-cím azonosítja.
- **Az e-mail-cím módosítása új feliratkozót hoz létre.** A Mailchimp az e-mail-cím alapján azonosítja a személyeket, ezért ha valakinek a B1-ben megváltoztatja az e-mail-címét, az új címmel kerül be. A régi feliratkozó addig marad meg, amíg Ön a Mailchimpben nem archiválja.
- **Csak a szabványos mezők szinkronizálódnak:** keresztnév, vezetéknév, telefonszám. A tagsági státusz, a helyszín és az egyedi B1-mezők ebben a verzióban nem képeződnek le Mailchimp-egyesítő mezőkre. Szegmentáláshoz használja inkább a lista-címkéket.
- **A címkenevek a csoport- és listanevek.** Ha átnevez egy csoportot vagy listát, az új néven kezdődik a címkézés. A régi címke a meglévő feliratkozókon marad, amíg el nem távolítja a Mailchimpben.
- **A Mailchimp kontaktlimitjei továbbra is érvényesek.** Ha a szinkronizálás egy ingyenes csomagú közönséget a határán túlra visz, a kézbesítési előzményekben `Member limit reached` hibák jelennek meg.

## További receptek (Zapier / Make)

A közönségszinkronizáláson túli feladatok, például adakozók címkézése a `donation.created` eseményre, fordított irányú szinkronizálás Mailchimpből a B1-be, vagy teljesen más e-mail-platformra (Constant Contact, Brevo stb.) történő szinkronizálás továbbra is elérhetők a [Zapier](../zapier) vagy a [Make](../make) segítségével. Ezek ugyanazokra a webhook-eseményekre indulnak:

- **Adakozók címkézése:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Kétirányú:** Mailchimp *New Subscriber* → B1 *Create Person*

Ha korábban a személy- és csoportszinkronizálást Zapier-en keresztül állította be, a natív csatlakozó bekapcsolása után kapcsolja ki ezeket a Zapeket. Ha mindkettő fut, minden esemény kétszer dolgozódik fel, és feleslegesen fogyasztja a Zapier-feladatokat.

## Hibaelhárítás

- **A mentés ezzel a hibával meghiúsul: „Mailchimp rejected the API key”** — a kulcsot visszavonták, vagy elgépelték. A kulcsoknak olyan adatközpont-utótaggal kell végződniük, mint a `-us21`.
- **A mentés ezzel a hibával meghiúsul: „audience not found”** — a közönség-azonosító nem létezik ezen a fiókon. A **Audience → Settings → Audience name and defaults** menüpontból másolja ki (ez nem a közönség neve).
- **Egy személy soha nem jelent meg a Mailchimpben** — ellenőrizze a webhook kézbesítési előzményeit. A „Skipped: person has no email address” üzenet pontosan azt jelenti, amit mond. A Mailchimp `4xx` válasza a válasz törzsében közli az okot.
- **A kézbesítés teljesen leállt** — több sikertelen kézbesítés után a webhook automatikusan kikapcsol. Hárítsa el az okot (általában egy visszavont kulcs), kapcsolja vissza a webhookot, majd a **Send Test** gombbal ellenőrizze.

## Lásd még

- [Webhooks (fejlesztői referencia)](/docs/developer/api/webhooks) — a háttérben működő motor, az eseménykatalógus, a kézbesítés és az újrapróbálkozás működése
- [Mentett listák](/docs/b1-admin/people/lists) — szabályalapú közönségek, amelyek természetesen illeszkednek a Mailchimp-címkékhez
- [Zapier (áttekintés)](../zapier) — a közönségszinkronizáláson túli receptekhez
