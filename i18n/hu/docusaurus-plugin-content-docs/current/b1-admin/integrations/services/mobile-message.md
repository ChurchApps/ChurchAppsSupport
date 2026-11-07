---
title: "Mobile Message"
description: "B1 Admin eseményeinek csatlakoztatása a Mobile Message ausztrál SMS API-hoz Zapier vagy Make webhookokkal üdvözlő, adomány- és emlékeztető SMS-ek küldéséhez."
---

# Mobile Message

<div class="article-intro">

A [Mobile Message](https://mobilemessage.com.au) egy ausztrál SMS API, amely népszerű az ausztrál gyülekezetek körében, mert helyi telefonszámokat kínál, és versenyképes ausztrál árakat, míg a Clearstream és a Text In Church inkább az Egyesült Államokra összpontosít. A Mobile Message-nek ma még nincs elsőosztályú Zapier alkalmazása, de nyilvános REST API-t tesz közzé, így néhány perc alatt összekötheti a B1 eseményeit a Mobile Message szövegüzeneteivel a **Webhooks by Zapier** (vagy a Make HTTP moduljának) segítségével.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Egy [Mobile Message](https://mobilemessage.com.au) fiók regisztrált feladóazonosítóval (Sender ID) és API-hitelesítő adatokkal (API felhasználónév + jelszó az *Account → API Settings* menüpont alatt)
- Egy [Zapier](https://zapier.com) fiók (vagy [Make](https://www.make.com))
- Egy B1Admin felhasználó **Edit Settings** jogosultsággal

</div>

## Mit köthet össze

A Mobile Message API „SMS küldése” típusú: nincsenek eseményindítók, csak kimenő szövegüzenetek. Ezért a receptek mind B1 → SMS irányúak:

| Irány | B1 eseményindító | Eredmény |
|---|---|---|
| B1 → Mobile Message | `person.created` | Üdvözlő üzenet az új személynek |
| B1 → Mobile Message | `donation.created` | Köszönő üzenet az adakozónak |
| B1 → Mobile Message | `form.submission.created` | Értesítés az ügyeletes csapatnak |
| B1 → Mobile Message | `event.created` | Emlékeztető üzenet egy listának |

## Beállítás

### 1. B1 API-kulcs létrehozása

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — az eseményindító webhook regisztrálásához
- `people:read` — a címzett telefonszámának lekérdezéséhez a `personId` alapján

### 2. Zap felépítése a Webhooks by Zapier segítségével

1. **Eseményindító** — B1.church: válassza ki a kívánt eseményt (pl. New Donation).
2. **Művelet** — B1.church: Find Person (a `data.personId` használatával), hogy megkapja a telefonszámot és a nevet.
3. **Művelet** — Webhooks by Zapier: **POST**. Állítsa be az alábbi módon.

A POST lépés beállításai:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (a Webhooks by Zapier automatikusan hozzáadja)
- **Basic Auth** — állítsa be a *Basic Auth* mezőt erre: `<api_username>|<api_password>` (a Zapier ezt a megfelelő `Authorization: Basic …` fejléccé alakítja)

Kapcsolja be a Zap-et. Küldjön egy tesztadományt a B1Admin felületen, hogy ellenőrizze, megérkezik-e a szövegüzenet.

## Gyakori receptek

### Eseményemlékeztetők reggelre

- **Eseményindító** — Schedule by Zapier (naponta, reggel 7-kor)
- **Művelet** — B1.church: Find Events a mai napra (vagy használjon Find lépést fix dátumszűrővel, vagy tárolja a mai eseménylistát egy Google Sheets táblázatban)
- **Művelet** — Webhooks by Zapier: POST a Mobile Message felé az eseménylistával, egy regisztrált feliratkozói csoportnak

### Kötegelt végpont használata listás üzenetküldéshez

A Mobile Message `/v1/messages` végpontja egy híváskor legfeljebb 10 000 üzenetet fogad el. Egy B1 csoport üzenetszórásához:

- **Eseményindító** — B1.church: New Form Submission (szűrve egy adott űrlapra)
- **Művelet** — B1.church: List Group Members egy célcsoporthoz (egy *Webhooks by Zapier — GET* lépésen keresztül, a `/membership/groupmembers?groupId=…` végponton)
- **Művelet** — Formatter by Zapier → Utilities → a válasz soronkénti feldolgozása egy `messages` tömbbe
- **Művelet** — Webhooks by Zapier: a teljes tömb POST-olása a `/v1/messages` végpontra

### Make alternatíva

Ha a Make-et részesíti előnyben, a **HTTP — Make a request** modult tegye a B1 Watch Events eseményindító után. Konfigurálja ugyanúgy (POST, Basic Auth, JSON törzs). A B1 oldalról lásd a [Make áttekintést](../make.md).

## Korlátok és megjegyzések

- **A Basic Auth az egyetlen hitelesítési módszer** — a Mobile Message a vezérlőpultról ad ki felhasználónevet és jelszót. Mindkettőt titokként kezelje.
- **A `sender` értékének regisztrált feladóazonosítónak kell lennie** a Mobile Message fiókjában, különben a küldés `400 Invalid sender` hibával tér vissza. Az ausztrál szabályozás megköveteli a feladóazonosító regisztrálását.
- **Az ausztrál telefonszámok** lehetnek `0412345678` (helyi) vagy `+61412345678` (nemzetközi) formátumban. Az API mindkettőt elfogadja, de ha külföldre is küld, érdemes `+61…` formátumra normalizálni.
- **Legfeljebb 10 000 üzenet kérésenként** — hasznos üzenetszórásokhoz, de egyetlen B1 webhook-kézbesítés ritkán generál ekkora listát; a kötegelt végpontot tartsa az ütemezett tömeges Zap-ekre.

## Hibaelhárítás

- **A POST `401 Unauthorized` választ ad** — a Basic Auth hitelesítő adatai hibásak. Másolja újra a Mobile Message vezérlőpult *Account → API Settings* részéből. Figyeljen arra, hogy a felhasználónév alapértelmezetten a fiókhoz tartozó e-mail-cím, nem pedig külön API-kulcs.
- **A POST `400 Invalid sender` választ ad** — a `sender` érték nincs regisztrálva a fiókjában. Először regisztrálja a Mobile Message vezérlőpultján.
- **A szövegüzenet megérkezik, de csonkolva van** — a Mobile Message a körülbelül 160 karakternél hosszabb üzeneteket több részre bontja, és részenként számláz. Ellenőrizze a válasz törzsét, mert ott látható a részek száma.

## Lásd még

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — alternatív SMS-szolgáltatók natív Zapier alkalmazásokkal (nincs szükség Webhooks by Zapier lépésre)
- [Zapier (áttekintés)](../zapier.md) — a B1 oldala minden Zapier recepthez
- [Mobile Message API dokumentáció](https://mobilemessage.com.au/api-documentation)
