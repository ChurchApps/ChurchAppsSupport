---
title: "API-kulcsok"
---

# API-kulcsok

<div class="article-intro">

Az API-kulcsok (személyes hozzáférési tokenek) a legegyszerűbb módja a B1 API-hoz való hitelesítésnek szerveroldali szkriptekből, harmadik féltől származó összekötőkből (Zapier, Make, Google Sheets), illetve olyan helyzetekben, ahol a teljes OAuth-folyamat túlzás volna. A kulcs egy adott személyhez kötődik egy adott gyülekezetben, és örökli annak a személynek a jogosultságait, amelyeket opcionálisan hatókörök (scopes) szűkíthetnek.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A kulcsokat egy olyan gyülekezeti adminisztrátor hozza létre és kezeli, akinek van **Beállítások szerkesztése** jogosultsága
- A nyers kulcs létrehozáskor **egyszer** jelenik meg — azonnal tárolja biztonságos helyen
- Minden API-kérésnek **HTTPS**-t kell használnia

</div>

## A kulcs formátuma

Egy B1 API-kulcs így néz ki:

```
cak_<prefix>.<secret>
```

- `cak_` — rögzített azonosító (az API-kulcs előtag, amelyre a hitelesítési réteg illeszkedik)
- `<prefix>` — 8 karakteres nyilvános keresési szegmens
- `<secret>` — 48 karakteres titkos kód; a szerveroldalon csak annak SHA-256 hash-e tárolódik

A teljes kulcs a szabványos bearer fejlécben kerül át a szervernek:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Az API hitelesítési rétege minden `cak_`-kal kezdődő tokent az API-kulcs útvonalra irányít, hash-eli a titkos részt, előtag alapján keresi meg a kulcsot, majd feloldja a kulcs személyének aktuális jogosultságait. Ennek köszönhetően a B1Admin-ban visszavont jogosultság a következő kéréstől érvénybe lép, és a kulcs soha nem válik el a szerepkörtől.

## Kulcs létrehozása (B1Admin)

1. Jelentkezzen be a B1Admin-ba olyan felhasználóként, akinek van **Beállítások szerkesztése** jogosultsága.
2. Nyissa meg a **Beállítások → Fejlesztő → API-kulcsok** menüpontot.
3. Kattintson az **Új API-kulcs** gombra, adjon neki felismerhető nevet (pl. „Zapier — adományszinkronizálás”), jelölje ki a kulcsnak szánt hatóköröket, majd kattintson a **Mentés** gombra.
4. A teljes `cak_…` kulcs egyszer jelenik meg egy párbeszédpanelen. A bezárás előtt másolja be az integrációja konfigurációjába, mert később nincs mód visszakérni. Mindig létrehozhat új kulcsot.

## Hatókörök

A hatókör **szűkíti**, hogy mit tehet a kulcs. Soha nem adhat olyan jogosultságot, amellyel az alapul szolgáló személy nem rendelkezik. Ha nincs megadva hatókör, a kulcs a személy teljes jogosultságkészletével rendelkezik.

| Hatókör | Engedélyezi |
|---|---|
| `people:read` / `people:write` | Személyek, háztartások és csoporttagok megtekintése / szerkesztése |
| `groups:read` / `groups:write` | Csoportok és tagságuk megtekintése / szerkesztése |
| `donations:read` / `donations:write` | Adományok megtekintése / rögzítése |
| `attendance:read` / `attendance:write` | Részvétel, alkalmak és bejelentkezések megtekintése / rögzítése |
| `forms:write` | Űrlapok kezelése (az olvasási jog az írásból következik) |
| `content:read` / `content:write` | Weboldal-tartalom, regisztrációk és streaming megtekintése / szerkesztése |
| `messaging:read` / `messaging:write` | Üzenetek olvasása; az írási jog SMS küldését is engedélyezi |
| `roles:read` / `roles:write` | Szerepkör-definíciók megtekintése / szerkesztése |
| `settings:read` / `settings:write` | Gyülekezeti beállítások megtekintése / szerkesztése (**kötelező** a webhookok programozott regisztrálásához) |
| `workflows:read` / `workflows:write` | Munkafolyamatok és feladatok megtekintése / munkafolyamatok futtatása és szerkesztése. Egy munkafolyamat futtatása e-mailt és SMS-t küldhet, webhookokat indíthat, és módosíthatja a csoporttagságot |
| `offline_access` | Hosszú életű frissítő tokenek engedélyezése (csak OAuth-folyamatokban; API-kulcsoknál nincs hatása) |

Az írási (`write`) hatókörök magukba foglalják a megfelelő olvasási (`read`) hatókört. A szerver- és domain-adminisztrátori jogosultságok szándékosan nincsenek hatókörként megjelenítve: egy hatókörrel szűkített hitelesítő adat soha nem emelkedhet webhely-adminisztrátori szintre.

:::tip
Ha a kulcsot webhookok regisztrálására fogja használni (pl. Zapier vagy Make integrációhoz), a kulcsnak `settings:write` hatókör kell. Egy csak `people:read` hatókörű kulcs csendben 403-as hibát kap a `POST /membership/webhooks` végponton.
:::

## Kulcs használata

Ugyanúgy használható, mint bármely bearer token: minden hitelesített végpont pontosan úgy fogadja az API-kulcsokat, ahogy a JWT-ket:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Ha egy kérés kulcsának nincs elegendő hatóköre, a válasz **403 Forbidden** lesz, ugyanabban a formában, mint bármely jogosultság-megtagadási hiba.

## Kulcsok kezelése az API-n keresztül

Minden végpont a Membership modul `/membership/apiKeys` útvonala alatt érhető el. Ezek JWT-t igényelnek (nem API-kulcsot), és csak olyan gyülekezeti adminisztrátortól fogadják el, akinek van **Beállítások szerkesztése** jogosultsága.

| Metódus és útvonal | Célja |
|---|---|
| `GET /membership/apiKeys` | A gyülekezet kulcsainak listázása (titkos kód nélkül, csak `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Az összes elérhető hatókörnév listája, kulcslétrehozó felülethez |
| `POST /membership/apiKeys` | Új kulcs létrehozása. Törzs: `{ "name": "...", "scopes": ["people:read"] }`. A válasz **egyszer** tartalmazza a nyers `cak_…` kulcsot. |
| `DELETE /membership/apiKeys/:id` | Kulcs visszavonása; a következő kéréstől érvényesül |

A visszavont kulcs azonnal érvényét veszíti, nincs türelmi idő.

## Ajánlott gyakorlatok

- **Integrációnként egy kulcs.** Ha valami kompromittálódik, egyetlen kulcsot vonhat vissza anélkül, hogy a többit megzavarná.
- **A működő legszűkebb hatóköröket adja meg.** Egy Google Sheets-exporthoz csak `people:read` kell, nem `settings:write`.
- **Szolgáltatásfiókhoz kösse a kulcsot, ne valódi munkatárshoz.** Ha egy munkatárs távozik, B1-hozzáférése megszűnik, és vele együtt az ő személyazonossága alatt létrehozott kulcsok is.
- **Tárolja a kulcsokat titkos kezelőben** (tárhelyszolgáltatója környezeti változói, AWS Secrets Manager stb.), soha ne verziókezelőben.
- **Cserélje a kulcsokat**, ha kiszivárgásra gyanakszik: hozzon létre új kulcsot, frissítse vele az integrációt, majd törölje a régit.

## Az OAuth-tól való különbség

Az API-kulcsok akkor megfelelőek, ha **az Ön gyülekezete az egyetlen, amely használja az integrációt**. Olyan összekötőhöz, amely több gyülekezet eléréséhez kér kifejezett, gyülekezetenkénti hozzájárulást, például a B1-közösségben megosztott SaaS-alkalmazáshoz, inkább a [OAuth és csatlakoztatott alkalmazások](./connected-apps) oldalt használja.

| | API-kulcs | OAuth |
|---|---|---|
| Ki telepíti | Egy gyülekezeti adminisztrátor | Minden gyülekezeti adminisztrátor engedélyezi az alkalmazást |
| Hitelesítési fejléc | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Token élettartama | Visszavonásig | Hozzáférés ≈ 7 nap, frissítés ≈ 90 nap |
| Ideális a következőkhöz | Belső szkriptek, Zapier/Make/Sheets összekötők | Többbérlős harmadik féltől származó alkalmazások |
