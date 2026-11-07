---
title: "Saját üzemeltetés a Railway-en"
description: "Telepíts privát ChurchApps-példányt a Railway-re körülbelül 15 perc alatt, majd állítsd be az e-mailt, az egyedi domaineket, a több gyülekezetes útválasztást, az adakozást és a fájltárolást a B1 Adminhoz és a B1App-hoz."
---

# Saját üzemeltetés a Railway-en

<div class="article-intro">

A ChurchApps egykattintásos [Railway](https://railway.com) sablont tesz közzé, amellyel gyülekezete saját, privát példányt kap a B1 Adminból, a B1 tagi portálból, az API-ból és egy MySQL-adatbázisból. Mindez az Ön által birtokolt és közvetlenül fizetett infrastruktúrán fut. Ez az útmutató körülbelül 15 perc alatt éles állapotba hozza a rendszert, majd végigvezet azokon a telepítés utáni beállításokon, amelyekre a legtöbb gyülekezetnek idővel szüksége van.

</div>

## Gyors indítás

[![Telepítés a Railway-en](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Kattintson a fenti **Telepítés a Railway-en** gombra.
2. Jelentkezzen be a Railway-be (vagy hozzon létre ingyenes fiókot), és adjon meg fizetési módot.
3. Kattintson a **Deploy** gombra anélkül, hogy bármit módosítana. Minden változónak van ésszerű alapértelmezett értéke.
4. Várjon 5–10 percet, amíg a négy szolgáltatás zöldre vált.
5. Nyissa meg a **B1Admin** szolgáltatás URL-jét, kattintson a **Register** gombra, és hozza létre a fiókját. Az első fiók automatikusan szerveradminisztrátor lesz.
6. Kövesse az alkalmazáson belüli utasításokat az első gyülekezet létrehozásához.

Ennyi. Most már teljesen működő ChurchApps-példánya van. Az alábbiak mind opcionális finomhangolások.

:::tip
A telepítés jelenleg **béta** állapotban van. Ha olyasmivel találkozik, amit a dokumentáció nem fed le, kérjük, nyisson hibajelentést itt: [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues), és csatolja a telepítési naplókat.
:::

<div class="prereqs">
<h4>Amire szüksége lesz</h4>

- Egy ingyenes [Railway](https://railway.com) fiók
- Railway-nél tárolt bankkártya (havi ~$15–25 egy kisebb gyülekezet esetén; lásd: [Költségek](#costs))
- Körülbelül 15 perc a kezdeti telepítéshez
- *Opcionális, de később erősen ajánlott:* SMTP-hitelesítő adatok és egyéni domain

</div>

## Mit telepít a rendszer

A sablon négy szolgáltatást hoz létre egyetlen Railway-projektben:

| Szolgáltatás | Cél | URL a telepítés után |
|--------------|-----|----------------------|
| **MySQL** | Minden adatot tárol (egy példány, több séma) | csak belső |
| **Api** | Háttérrendszer a tagsághoz, tartalomhoz, adakozáshoz, részvételhez stb. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Munkatársi és adminisztrációs webalkalmazás | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Tagoknak szánt webalkalmazás és gyülekezeti weboldal | `https://b1app-<id>.up.railway.app` |

Az adatbázis-sémákat az API indulási migrációja automatikusan hozza létre az első indításkor.

## Első beállítások

Most, hogy a rendszer fut, íme azok a dolgok, amelyeket a legtöbb gyülekezet ezután állít be, nagyjából prioritási sorrendben.

### 1. E-mail (erősen ajánlott)

E-mail nélkül a tagok továbbra is regisztrálhatnak és használhatják a rendszert, de **nem tudják visszaállítani elfelejtett jelszavukat**. Ezt helyettük egy adminisztrátornak kell elvégeznie. Az SMTP beállítása körülbelül 5 percet vesz igénybe.

A Railway irányítópultján nyissa meg az **Api** szolgáltatást → **Variables**, és adja hozzá a következőket:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Három szolgáltató érdemel említést:

#### Resend: a legegyszerűbb ingyenes lehetőség (napi 100 e-mail)

1. Regisztráljon a [resend.com](https://resend.com) oldalon.
2. Ellenőrizzen egy küldő domaint, vagy a kezdéshez használja az `onboarding@resend.dev` tesztküldőt.
3. Hozzon létre egy API-kulcsot.
4. Állítsa be: `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail: személyes használatra ingyenes (napi ~500)

1. Engedélyezze a kétlépcsős azonosítást a Google-fiókon.
2. Hozzon létre egy [alkalmazásjelszót](https://myaccount.google.com/apppasswords).
3. Állítsa be: `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<a 16 karakteres alkalmazásjelszó>`.

#### AWS SES: nagy mennyiségnél a legolcsóbb

1. Ellenőrizzen egy küldő domaint az AWS-ben.
2. Ha nem ellenőrzött címekre is szeretne küldeni, lépjen ki az SES sandbox módból.
3. Hozzon létre SMTP-hitelesítő adatokat itt: **SES → SMTP Settings → Create credentials**.
4. Állítsa be: `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<SES SMTP password>`.

A változók mentése után az Api szolgáltatás automatikusan újratelepül. Teszteléshez indítson jelszó-visszaállítást egy tesztfiókon.

:::warning
Ha `MAIL_SYSTEM=SMTP` értéket állít be hibás hitelesítő adatokkal, a regisztráció sikeresnek tűnik majd, de az ellenőrző e-mail soha nem érkezik meg. Javítsa ki a hitelesítő adatokat, vagy törölje a `MAIL_SYSTEM` változót, hogy visszaálljon az e-mail nélküli működésre.
:::

### 2. Egyéni domainek

Az alapértelmezett `*.up.railway.app` URL-ek működnek, de a legtöbb gyülekezet saját címet szeretne.

Minden webes szolgáltatáshoz (B1Admin és B1App):

1. Nyissa meg a szolgáltatást a Railway-ben → **Settings** → **Networking**.
2. Kattintson a **+ Custom Domain** gombra, és adja meg a gépnevet:
   - `admin.yourchurch.org` a B1Admin-hoz
   - `app.yourchurch.org` (vagy `www`) a B1App-hoz
3. Adja hozzá a Railway által megjelenített CNAME-rekordot a DNS-szolgáltatójánál.
4. Várjon néhány percet, amíg a DNS terjed. A Railway automatikusan kiállítja a TLS-tanúsítványt.

Ezután frissítse az **Api** szolgáltatás változóit, hogy az e-mailekben lévő linkek az új domaineket használják:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

A **B1Admin** szolgáltatáson:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (if you also set a custom API domain)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

A `{subdomain}` tokent szó szerint kell megadni. Futásidőben minden gyülekezet alterületének nevével helyettesítődik (lásd lent: Több webhely).

### 3. Több webhely (több gyülekezet egy példányon)

A ChurchApps eleve több bérlős (multi-tenant) rendszer. Egyetlen telepítésen tetszőleges számú gyülekezet futhat, mindegyik saját tagokkal, csoportokkal és weboldallal. Új gyülekezeteket teljes egészében az adminfelületen keresztül lehet hozzáadni, infrastruktúra-módosításra nincs szükség.

#### További gyülekezetek hozzáadása

1. A **B1 Admin**-ban lépjen a **Settings → Manage Church → Switch Church → Create New** menüpontra.
2. Minden gyülekezetnek egyedi **alterület-azonosítója** van (pl. `firstchurch`, `gracecommunity`).
3. Az új gyülekezet saját adatokat, tagokat, weboldalt és adakozási beállításokat kap, teljesen elkülönítve a példány többi gyülekezetétől.

#### Minden gyülekezet saját URL-re irányítása

Kétféleképpen lehet a gyülekezeteket nyilvánosan elérhetővé tenni:

| Minta | Példa | Beállítás |
|-------|-------|-----------|
| **Útvonal-alapú** (azonnal működik) | `app.yourchurch.org/firstchurch` | Nincs szükség extra beállításra |
| **Alterület-alapú** (tisztább URL-ek) | `firstchurch.yourchurch.org` | Helyettesítő karakteres DNS és helyettesítő karakteres egyéni domain |

Alterület-alapú útválasztáshoz a Railway-en:

1. A DNS-szolgáltatónál hozzon létre egy helyettesítő karakteres CNAME-rekordot: `*.yourchurch.org → <b1app railway target>`.
2. A Railway-ben, a B1App szolgáltatásnál → **Settings → Networking** menüpontban adja hozzá a `*.yourchurch.org` címet egyéni domainként.
3. A **B1Admin** szolgáltatáson állítsa be: `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Az újratelepítés után minden gyülekezet weboldala automatikusan a `<az-alterület>.yourchurch.org` címen lesz elérhető.

:::info
A helyettesítő karakteres egyéni domainekhez fizetős Railway-csomag szükséges. Az útvonal-alapú útválasztás minden csomagban működik, funkcionálisan azonos, csak a böngészősávban kevésbé szép az URL.
:::

### 4. Online adakozás (Stripe / PayPal)

Az adakozás **gyülekezetenként, az adminfelületen belül** állítható be, nem környezeti változókkal. Így minden gyülekezet saját kereskedői fiókot használhat.

1. Szerezzen fejlesztői hitelesítő adatokat a [Stripe](https://dashboard.stripe.com/) (Developers → API keys) vagy a [PayPal](https://developer.paypal.com/) (My Apps & Credentials) oldalon.
2. A B1 Adminban lépjen a **Settings → Giving Settings** menüpontra.
3. Válassza ki a szolgáltatót, illessze be a nyilvános és a titkos kulcsot, majd állítsa be a díjkezelést.
4. Opcionálisan adja hozzá a `GOOGLE_RECAPTCHA_SECRET_KEY` változót az **Api** szolgáltatáshoz a Railway-en, hogy a nyilvános adományozási űrlapokat védje a botok ellen.

### 5. Fájltárolás

A sablon egy **1 GB-os tartós kötetet** hoz létre, amely az Api szolgáltatáshoz csatolódik. Ez tárolja a tagi fotókat, az igehirdetési fájlokat és a feltöltött dokumentumokat.

A méret növeléséhez nyissa meg az Api szolgáltatást → **Volumes**, és állítsa be a méretcsúszkát.

Nagyobb telepítéseknél (100 GB felett vagy sok egyidejű feltöltésnél) térjen át S3-ra. Ehhez állítsa be ezeket az **Api** szolgáltatáson:

```
FILE_STORE=S3
AWS_S3_BUCKET=<your-bucket>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

A kötetben lévő meglévő fájlok nem migrálódnak automatikusan. A változó átállítása előtt másolja át őket a bucketbe.

### 6. Opcionális funkcióintegrációk

Ezek specifikus funkciókat oldanak fel, és később is hozzáadhatók a Railway irányítópultján. Az **Api** szolgáltatáson állítsa be őket.

| Változó | Engedélyezett funkció |
|---------|-----------------------|
| `OPENAI_API_KEY` *vagy* `OPENROUTER_API_KEY` | AI-alapú keresés és tartalomjavaslatok |
| `YOUTUBE_API_KEY` | YouTube-igehirdetések keresése és beágyazása |
| `PEXELS_KEY` | Állományképválasztó a weboldal-szerkesztőhöz |
| `VIMEO_TOKEN` | Vimeo-igehirdetés-támogatás |
| `API_BIBLE_KEY` | Bibliaversek keresése leckékben és tartalmakban |
| `YOUVERSION_API_KEY` | YouVersion Biblia-integráció |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Böngészőbeli push-értesítések ([VAPID-kulcspár létrehozása](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Opcionális CRM-szinkronizálás az új regisztrációkhoz |

## Frissítés

Minden szolgáltatás a megfelelő GitHub-tárolóhoz kapcsolódik. A `ChurchApps/Api`, `ChurchApps/B1Admin` vagy `ChurchApps/B1App` `main` ágára történő push automatikus újratelepítést indít.

Egy adott verzió rögzítéséhez módosítsa minden szolgáltatáson a **Branch** beállítást egy címkére vagy kiadási ágra. Éles környezethez ez az ajánlott beállítás, mert a `main`-ről történő automatikus telepítés az éppen folyamatban lévő munkát is átveszi.

## Költségek

Valós tartományok egy kisebb gyülekezet esetén (200 tag alatt, kis forgalommal):

| Összetevő | Hozzávetőleges havi költség |
|-----------|-----------------------------|
| Railway alap | $5 |
| MySQL plugin | $5 + ~$1 tárhely |
| 3 webes szolgáltatás számítási kapacitása | $3–10 együtt |
| 1 GB kötet | $0.25 |
| **Összesen** | **~$15–25/hó** |

A költségek a forgalommal, a fotófeltöltésekkel és az adatbázis méretével arányosan nőnek. A Railway az aktuális használatot a projekt **Usage** lapján mutatja. Ott állítson be költési korlátokat a kitettség korlátozására.

## Hibaelhárítás

| Tünet | Valószínű ok | Megoldás |
|-------|--------------|----------|
| Az építés `EBUSY: rmdir '/app/node_modules/.cache'` hibával meghiúsul | Nixpacks-gyorsítótár csatolási ütközés | Állítsa be a `NIXPACKS_NO_CACHE=true` értéket az érintett szolgáltatáson |
| A B1Admin építése `Missing: @types/...` hibával meghiúsul | Nem szinkronizált `package-lock.json` | Húzza le a legfrissebb `main` ágat |
| Az Api telepítése a "Deploying" állapotnál leáll | Az állapotellenőrzés sikertelen, a `/health` nem ad 200-as választ | Nézze meg a telepítési naplókat. Általában hiányzik egy kötelező környezeti változó. |
| A B1Admin "ellenőrizze az e-mailjeit" üzenetet jelenít meg, de nem érkezik e-mail | A `MAIL_SYSTEM=SMTP` be van állítva, de a hitelesítő adatok hiányoznak vagy hibásak | Javítsa a hitelesítő adatokat, vagy törölje a `MAIL_SYSTEM` változót az e-mail kikapcsolásához |
| A bejelentkezés `api.churchapps.org` címre irányít | A `REACT_APP_STAGE` értéke `prod` | Állítsa be a `REACT_APP_STAGE=custom` értéket a B1Admin szolgáltatáson |
| Az alterületes gyülekezetek mind ugyanazt a tartalmat mutatják | A `REACT_APP_B1_WEBSITE_URL` nem tartalmazza a `{subdomain}` tokent | Állítsa például `https://{subdomain}.yourchurch.org` értékre |
| Az egyéni domain "Application not found" üzenetet jelenít meg | A DNS még nem terjedt el, vagy a Railway-tanúsítvány függőben van | Várjon 5 percet, majd ellenőrizze a DNS-t a `dig admin.yourchurch.org` paranccsal |

Ha olyan problémával találkozik, amely nincs a listán, nyisson hibajelentést itt: [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues), és csatolja a telepítési naplókat.

## Kapcsolódó cikkek

- **[Docker-rel történő saját üzemeltetés](./docker.md)**: ugyanaz a verem a saját hardverén vagy VPS-en
- **[Kezdeti beállítás](../../getting-started/initial-setup.md)**: az első lépések a gyülekezet létrehozása után
- **[Weboldal kezdeti beállítása](../../b1-admin/website/initial-setup.md)**: a gyülekezet nyilvános weboldalának beállítása
- **[Adakozási beállítások](../../b1-admin/donations/online-giving-setup.md)**: Stripe vagy PayPal összekötése
- **[Helyi API-beállítás](../api/local-setup.md)**: a verem helyi futtatása fejlesztéshez
- **[API-telepítés (AWS)](./apis.md)**: a hivatalos ChurchApps SaaS telepítésének módja
