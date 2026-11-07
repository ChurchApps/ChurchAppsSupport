---
title: "Csatlakoztatott szolgáltatások"
description: "B1 Admin csatlakoztatása Mailchimphez, Donorboxhoz, Subsplashhez, VOMO-hoz és más eszközökhöz Zapier vagy Make receptekkel, eszközönkénti útmutatókkal."
---

# Csatlakoztatott szolgáltatások

<div class="article-intro">

A Zapier- vagy Make-recept általában a leggyorsabb módja annak, hogy a B1-et összekösd egy másik egyházi technológiai eszközzel. Nincs szükséged új B1-infrastruktúrára, a harmadik fél pedig üzemelteti a munkafolyamatot. Ez az oldal azoknak a szolgáltatásoknak a válogatott listája, amelyekről megerősítettük, hogy ma is összeköthetők, minden szolgáltatáshoz rövid, bemásolható beállítási útmutatóval.

</div>

## Első pillantásra

| Szolgáltatás | Kategória | Híd | Mit köthetsz össze |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Email | Zapier vagy Make | Új B1-es személyek és adakozók szinkronizálása egy Mailchimp-közönséggel |
| [Donorbox](./donorbox.md) | Adományozás | Zapier | Donorbox-adományok és -adakozók visszaküldése a B1-be |
| [Subsplash](./subsplash.md) | Alkalmazás / Adományozás | Zapier | Subsplash-adományok és személyek lehívása a B1-be |
| [VOMO](./vomo.md) | Önkéntesség | Zapier | Önkéntes-jelentkezések szinkronizálása a B1-csoportok és a VOMO-projektek között |
| [Clearstream](./clearstream.md) | SMS | Zapier | Clearstream-szöveges üzenet indítása B1-eseményekből; a válaszok B1-rekordként való rögzítése |
| [Text In Church](./text-in-church.md) | SMS / munkafolyamatok | Zapier | Text In Church-munkafolyamatok indítása a B1-ből; Connect Card adatok fogadása |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier vagy Make | SMS küldése bármely B1-eseményből |
| [Checkr](./checkr.md) | Háttérellenőrzés | Make | Háttérellenőrzés indítása, amikor valaki csatlakozik egy szolgálócsapathoz |

## Mindegyiknek közös vonása

1. **A B1 oldali beállítás mindenhol ugyanaz.** Hozz létre API-kulcsot a megfelelő hatókörökkel a **B1Admin → Settings → Developer → API Keys** menüpontban. Ezután vagy hagyd, hogy a híd webhookot regisztráljon az eseményindítóhoz (a Zapier és a Make ezt automatikusan megteszi, és a `settings:write` jogosultságot igényli), vagy egy későbbi lépésből hívd meg a B1 REST végpontjait.
2. **A hidat te fizeted, nem mi.** A ChurchApps ingyenes. A Zapier és a Make is kínál ingyenes csomagot, amely néhány recept futtatására elég.
3. **A bekötést élesítés nélkül is tesztelheted.** Mindkét híd rendelkezik „Test step” gombbal, amely egyszer kiváltja az eseményt a B1 felé, és megmutatja az adatszerkezetet, mielőtt bekapcsolnád a receptet.

## Híd kiválasztása

- A **Zapier** barátságosabb, és nagyobb alkalmazáskatalógussal rendelkezik. Alapértelmezettként ezt használd, hacsak a költség nem jelent problémát.
- A **Make** nagy mennyiségnél olcsóbb, és rugalmasabb útvonal- és szűrési logikával rendelkezik. Akkor használd, ha egy munkafolyamat elágazik, feltételeket vagy sok lépést tartalmaz.
- A **Webhooks by Zapier** (amelyet a Mobile Message dokumentáció használ) általános adapter. Segítségével egy Zapből HTTP-végpontra küldhetsz POST-kérést, ha a célalkalmazás nem első osztályú Zapier-alkalmazás.

Ha a listán nem szereplő megoldásra van szükséged, a B1 [REST API](/docs/developer/api) és [webhookjai](/docs/developer/api/webhooks) nyitottak. Néhány óra alatt építhetsz egyedi hidat a [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) segítségével.

## Mi nincs itt (és miért)

Számos népszerű egyházi technológiai eszköznek, például a Tithe.ly-nak, a Pushpay-nek, a Vancónak, a PastorsLine-nak, a Gloonak, a Notebirdnek, a KidChecknek és a MinistrySafe-nek, nincs közzétett Zapier-alkalmazása vagy Make-modulja. Saját API-jaik vannak, de a B1-hez való összekötésük egyedi kódolási feladat, nem recept, ezért nem férnek bele ebbe a listába. Ha egy szállító Zapier-alkalmazást vagy Make-modult ad hozzá, felvesszük a dokumentációt.

Szándékosan kihagytuk a Planning Center Services-specifikus eszközöket (zene, prezentáció), a versenytárs ChMS-termékeket, a migrációs tanácsadókat, valamint azokat az eszközöket, amelyek csak a PCO-specifikus adatokat tisztítják. Egyikük sem kínál hasznos B1-es összekötési lehetőséget.

## Lásd még

- [Zapier (áttekintés)](../zapier.md): minden Zapier-recept B1 oldala azonos, ezt a dokumentum egyszer tárgyalja.
- [Make (áttekintés)](../make.md): ugyanez a Make-forgatókönyvekre.
- [Slack és Discord](../slack-discord.md): csatornaértesítések bármilyen híd nélkül.
- [Google Sheets](../google-sheets.md): igény szerinti exportok.
- [Webhookok (fejlesztői referencia)](/docs/developer/api/webhooks): az eseménykatalógus, amelyre minden recept támaszkodik.
