---
title: "Google Táblázatok"
description: "B1 Admin csatlakoztatása Google Táblázatokhoz a B1 Export bővítménnyel: személyek, adományok, csoportok, részvétel igény szerinti lehúzása."
---

# Google Táblázatok

<div class="article-intro">

A **B1 Export** a B1.church hivatalos Google Táblázatok-kiegészítője. Bármely táblázathoz hozzáad egy oldalsávot, amellyel a B1 gyülekezetének adatai – személyek, adományok, csoportok vagy jelenlét – egy gombnyomással, igény szerint exportálhatók a megnevezett lapokra. A kiegészítő teljes egészében a felhasználó Google-fiókján belül fut; a minden exporthoz szükséges, csak olvasási API-hívásokon kívül nem kommunikál a ChurchApps szervereivel.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Google-fiók, amellyel szerkesztési jogosultsága van abba a táblázatba, amelybe exportálni szeretne
- Egyházi adminisztrátor (vagy olyan személy, akinek van olvasási joga az exportálni kívánt adatokhoz), aki B1 API-kulcsot tud létrehozni
- A B1 Export kiegészítő telepítve a Google Workspace Marketplace-ről

</div>

## Mit exportál

| Menüpont | Táblázatlap | Adatok |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Minden export **lecseréli** a megnevezett lap tartalmát – az exportálás újraindítása friss pillanatképet ad, nem pedig új sorokat fűz a meglévőkhöz. A táblázat többi lapja érintetlen marad.

## Beállítás

### 1. B1 API-kulcs létrehozása a megfelelő hatókörökkel

1. A B1Admin felületen lépjen a **Beállítások → Fejlesztő → API-kulcsok** menüpontra.
2. Kattintson az **Új API-kulcs** gombra, nevezze el „Sheets Export”-nak, és adja meg azokhoz az adatokhoz a **read** (olvasási) hatóköröket, amelyeket exportálni szeretne:
   - `people:read` a személyek exportálásához
   - `donations:read` az adományokhoz
   - `groups:read` a csoportokhoz
   - `attendance:read` a jelenléthez
3. Csak exportáláshoz használt kulcshoz **nincs szükség** `settings:write` hatókörre – ez csak a webhookokat regisztráló összekötőknek (Zapier / Make) kell. Tartsa szűken ezt a kulcsot.
4. Mentse, és másolja ki a `cak_…` kulcsot.

### 2. A kiegészítő telepítése

1. Nyissa meg a táblázatot, amelybe exportálni szeretne.
2. **Bővítmények → Kiegészítők → Kiegészítők beszerzése**.
3. Keressen rá a **B1 Export** kiegészítőre, és telepítse. A Google kéri, hogy engedélyezze a táblázatokhoz való hozzáférést és a külső HTTP-kéréseket (hogy a kiegészítő hívhassa a B1 API-t).

A telepítés után a **B1 Export** menüpont megjelenik a **Bővítmények** menü alatt minden olyan táblázatban, amelyet ezzel a Google-fiókkal megnyit.

### 3. A kulcs csatlakoztatása

1. **Bővítmények → B1 Export → Csatlakozás…** (vagy a **B1 Export → Csatlakozás…** a menüsoron, az első megnyitás után).
2. Illessze be az API-kulcsot az oldalsávba, hagyja a Base URL mezőt `https://api.churchapps.org` értéken (kivéve, ha tesztkörnyezetben dolgozik), majd kattintson a **Mentés** gombra.
3. Kattintson a **Kapcsolat tesztelése** gombra – a zöld „Connection OK” üzenet jelzi, hogy a kulcs működik.

A kulcs a **felhasználónkénti tulajdonságok** (`PropertiesService.getUserProperties()`) között tárolódik – a Google-fiókjához kötődik, soha nem íródik a táblázatba, és a táblázat többi szerkesztője sem láthatja.

## Exportálás futtatása

Az alábbi módok egyikével:

- **A menüből** – **Bővítmények → B1 Export → Export People** (vagy Export Donations / Export Groups / Export Attendance)
- **Az oldalsávból** – nyissa meg az oldalsávot (Csatlakozás…), és kattintson a megfelelő adathalmaz gombjára

Egy értesítés (toast) jelzi, amikor az exportálás kész – „_N_ sor íródott ide: 'B1 People'.”

## Jelentések építése az exportra

Az exportált lapok egyszerű Google Táblázatok-adatok. Saját elemzéseit úgy építheti fel, hogy hivatkozik ezekre a lapokra:

- Egy **összesítő lap** a `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` képlettel, amellyel összesítheti a kártyás adományokat
- Egy **szűrt nézet** csak a tagokról: `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Egy **diagram** a jelenléti trendekről, amely a `B1 Attendance` lapból dolgozik

Az exportálás újrafuttatása frissíti a mögöttes lapot; a képletei automatikusan frissülnek.

## Ismétlődő exportok ütemezése

A kiegészítő alapértelmezés szerint igény szerint működik. Heti vagy havi exporthoz használja az Apps Script beépített, időalapú eseményindítóit:

1. A táblázatban nyissa meg a **Bővítmények → Apps Script** menüpontot (ez a kiegészítő hozzá kötött szkriptjét nyitja meg).
2. Kattintson a bal oldalsávban látható **⏰ Eseményindítók** ikonra.
3. Kattintson az **Eseményindító hozzáadása** gombra az `exportPeople` függvényhez (vagy bármely más exportfüggvényhez) – válassza az *Időalapú* típust, a *Heti időzítőt*, például *Minden hétfőn reggel 6 órakor*.

Az exportálás a háttérben fut a Google-fiókja alatt. Ha az API-kulcsot cserélik vagy visszavonják, az eseményindító e-mailben értesíti, a következő sikertelen futás után.

## Engedélyek és adatvédelem

- A kiegészítő csak a `spreadsheets.currentonly` engedélyt kéri (csak azt a táblázatot érheti el, amelyben megnyitották), és a `script.external_request` engedélyt (hogy a `UrlFetchApp` hívhassa a B1 API-t). **Nem** lát a Drive-ban, a Gmailben vagy más Google-adatokban.
- A B1 API-kulcs felhasználónként tárolódik – a táblázat többi szerkesztője nem láthatja.
- Minden B1 API-hívás HTTPS-en keresztül, `Authorization: Bearer cak_…` fejléccel történik.

## Hibaelhárítás

- **„No API key set”** – nyissa meg a **Bővítmények → B1 Export → Csatlakozás…** menüpontot, és illessze be a kulcsot.
- **„B1 rejected the API key (401)”** – a kulcsot visszavonták, vagy hibás. Hozzon létre újat, és illessze be.
- **„This API key lacks permission for /giving/donations (403)”** – a kulcsnak nincs `donations:read` hatóköre. Módosítsa a kulcs hatóköreit a B1Admin felületen.
- **A lap nem frissül** a futtatás után – ellenőrizze, hogy a *helyes* lapnevet nézi (`B1 People` stb.). Az exportálás létrehozza a lapot, ha az még nem létezett.
- **„Quota exceeded”** – az Apps Script felhasználónkénti napi kvótát szab a `UrlFetchApp` hívásokra (jellemzően több ezer hívás naponta). Nagy gyülekezetek sok rekorddal több napra oszthatják el az exportokat, vagy a nagy mennyiségű szinkronizációhoz használhatnak [Make](./make.md) integrációt vagy egyedi megoldást.

## Testreszabás

A kiegészítő nyílt forráskódú – az Apps Script projekt a `B1Integrations/GoogleSheetsAddon/` tárolóban található. Ha olyan oszlopra van szüksége, amelyet nem exportálunk, egy további adathalmazra vagy más kimeneti formátumra, nyisson ott egy hibajegyet (issue) vagy egy pull requestet.

## Lásd még

- [Zapier](./zapier.md) – valós idejű szinkronizációhoz, nem igény szerinti exporthoz
- [Make](./make.md) – összetettebb átalakításokkal járó szinkronizációhoz
- [API-kulcsok (fejlesztői referencia)](/docs/developer/api/api-keys)
