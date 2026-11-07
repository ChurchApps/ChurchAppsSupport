---
title: "Checkr"
description: "Önkéntes-jelentkezések összekötése a Checkr háttérellenőrzéssel Make.com-mal a B1 Admin-ban, riasztásokkal a biztonsági koordinátornak."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) háttérellenőrzést végez az alkalmazottak és önkéntesek számára, ami szinte minden olyan egyháznál szükséges, amely gyermek- vagy ifjúsági programot működtet. A B1-ben **nincs beépített háttérellenőrzési funkció**. Az ellenőrzések megrendelése, az eredmények nyomon követése és a megfelelőség kezelése mind a Checkrben történik. Az alábbi útmutató csak a B1 eseményeit köti össze a Checkrrel. A Checkrnek nincs Zapier-alkalmazása, de a [Make.com Checkr-integrációja](https://www.make.com/en/integrations/checkr) ellenőrzött, és megadja azokat a műveleteket, amelyekkel B1 eseményből el lehet indítani egy ellenőrzést.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Egy [Checkr](https://checkr.com)-fiók API-hozzáféréssel és legalább egy beállított ellenőrzési csomaggal
- Egy [Make](https://www.make.com)-fiók
- Egy B1Admin-felhasználó **Beállítások szerkesztése** jogosultsággal

</div>

## Mit köthet össze

A Make Checkr-alkalmazása 1 indító eseményt és 6 műveletet tesz elérhetővé:

| Irány | B1 / Make indító esemény | Művelet |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (egy önkéntes csoportra szűrve) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (meghívó / jelentés esemény) | B1: A személy rekordjának frissítése (pl. „Checkr cleared” címke) |

A Make Checkr-műveletei: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA és Get an Invitation. Emellett 4 keresőmodul is van.

## Beállítás

### 1. B1 API-kulcs létrehozása

**Beállítások → Fejlesztő → API-kulcsok → Új API-kulcs**:

- `settings:write`: az indító webhookhoz
- `people:read`: a személy nevének és e-mail-címének lekérdezéséhez az ellenőrzés indításakor
- (Opcionális) `people:write`, ha az jelentés állapotát egyéni mezőként vagy címkeként vissza szeretné írni a B1-be

### 2. „Ellenőrzés indítása önkéntessé váláskor” forgatókönyv létrehozása a Make-ben

1. **Indító esemény**: B1.church: Watch Events (`group.member.added`).
2. **Szűrő**: csak akkor folytatódjon, ha a `data.groupId` megegyezik a „Gyermekprogram önkéntesei” (vagy annak megfelelő) csoporttal.
3. **Művelet**: B1.church: Find Person (a `data.personId` alapján), hogy megkapja a személy e-mail-címét és keresztnevét és vezetéknevét.
4. **Művelet**: Checkr: Create Candidate. Feltérképezze a keresztnevet, a vezetéknevet és az e-mail-címet a 3. lépésből.
5. **Művelet**: Checkr: Create Background Check Invitation. Feltérképezze a 4. lépésben létrehozott jelölt azonosítóját a *candidate_id* mezőhöz. Válassza ki az ellenőrzési csomagot (pl. `tasker_standard`, vagy amit a fiókja kínál).
6. (Opcionális) **Művelet**: Slack: értesítse a biztonságos szolgálatért felelős koordinátort, hogy ellenőrzés indult.

Kapcsolja be a forgatókönyvet. Az érintett csoportba került új önkéntesek automatikus Checkr-meghívót kapnak e-mailben. Ezt telefonon vagy laptopon töltik ki, a Checkr pedig lefuttatja az ellenőrzést.

### 3. (Opcionális) Az eredmény visszaküldése

1. **Indító esemény**: Checkr: Watch Events (webhook). A Make a bekapcsoláskor regisztrál egy Checkr-webhookot.
2. **Szűrő**: csak akkor folytatódjon, ha az `event_type = report.completed`.
3. **Művelet**: Checkr: Get Report (a webhookból kapott jelentésazonosítóval).
4. **Művelet**: B1.church: Find Person (a jelölt e-mail-címe alapján).
5. **Feltételes művelet**: Slack / e-mail: értesítse a koordinátort a `clear` / `consider` / `suspended` állapottal.

Megjegyzés: A B1-ben jelenleg nincs beépített „háttérellenőrzés állapota” mező. A gyakorlatban három lehetőség közül lehet választani: (a) az eredményt egy zárt Slack-csatornára küldi áttekintésre, (b) egy Google Táblázatba írja a nyomon követhetőség érdekében, vagy (c) `clear` eredmény esetén felveszi a személyt a B1 „Ellenőrzött önkéntesek” csoportjába.

## Gyakori receptek

### Önkéntesek újraellenőrzése kétévente

Kösse össze a fenti folyamatot egy Make-ütemezett indítóval:

- **Indító esemény**: Make: Schedule (havonta)
- **Művelet**: B1.church: List Group Members az „Ellenőrzött önkéntesek” csoportra
- **Művelet**: Szűrés a Make-ben: az ellenőrzés dátuma 22 hónapnál régebbi
- **Művelet**: Checkr: Create Background Check Invitation (ugyanaz, mint a kezdeti folyamatban)

### Az 1. fokozatú hozzáférés blokkolása az ellenőrzés befejezéséig

Ha az egyház a B1 csoporttagságot használja a hozzáférés szabályozására (pl. csak az „Ellenőrzött” csoport tagjai jelennek meg a szolgálati beosztásokban), tartsa az új önkénteseket egy várakozó csoportban, amíg a Checkr `report.completed` eseménye át nem helyezi őket.

## Korlátok és megjegyzések

- **A Checkr a legtöbb ellenőrzési csomag esetében csak az Egyesült Államokban érhető el.** Ausztráliai, brit és kanadai egyházaknak alternatív megoldásra lesz szükségük.
- **Az árazás ellenőrzésenként történik.** A Make minden meghívó-létrehozása egy valódi ellenőrzést indít el. Először a Checkr sandbox vagy tesztfiókjában tesztelje (a Make Checkr-alkalmazása a kapcsolatban megadott hitelesítő adatokat használja, így a hitelesítő adatok cseréje váltja a sandbox és az éles mód között).
- **A Checkr API-hozzáférése csomagfüggő.** A kisebb Checkr-fiókok csak felhasználói felületre korlátozott szintet használhatnak. Az API engedélyezéséhez vegye fel a kapcsolatot a Checkr-rel.

## Hibaelhárítás

- **A Create Candidate `403`-as hibával meghiúsul**: a Checkr API-token csak olvasható, vagy nincs meg hozzá a megfelelő fiókjogosultság. Állítsa ki újra a Checkr irányítópultjáról, írási hatókörrel.
- **A meghívó nem érkezik meg**: ellenőrizze a jelölt e-mail-címét a 3. lépésben. Lehet, hogy a B1-ben üres az e-mail-mező az adott személynél. Adjon hozzá egy e-mail-cím megléte szerinti szűrőt a Checkr-lépés elé.
- **A webhook-indító nem indul el**: a Checkr webhook-regisztrációja néha csendben meghiúsul, ha a Make-fiókja nem olyan fizetős csomagon van, amely támogatja a kimenő webhookokat. Ellenőrizze a Checkr irányítópultjának *Webhooks* oldalán, hogy szerepel-e a Make URL-je.

## Lásd még

- [Make (áttekintés)](../make.md): a B1 oldala minden Make-forgatókönyvnek
- [Mobile Message](./mobile-message.md): olyan SMS-szolgáltatókhoz, amelyekhez nincs Zapier-alkalmazás; ugyanaz a Webhook/HTTP minta, mint a Checkr Make-beállítása
- [Checkr API-dokumentáció](https://docs.checkr.com/)
