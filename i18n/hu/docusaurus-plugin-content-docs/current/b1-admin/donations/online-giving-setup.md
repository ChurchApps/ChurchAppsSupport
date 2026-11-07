---
title: "Online adományozás beállítása"
description: "Stripe, PayPal, Kingdom Funding vagy Paystack csatlakoztatása a B1 Admin-hoz, hogy a tagok online adakozhassanak a B1.church oldalon át."
---

# Online adományozás beállítása

<div class="article-intro">

A B1 Admin integrálható a **Stripe**, a **PayPal**, a **Kingdom Funding** és a **Paystack** (afrikai egyházak számára) szolgáltatásokkal, így a tagok a B1.church oldalukon keresztül adakozhatnak online. Miután beállította, az online adományok automatikusan megjelennek az adománynyilvántartásban a kézzel rögzített ajándékok mellett, így minden egy rendszerben marad.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Állítsa be az [adományozási alapokat](funds.md), hogy az adakozók megjelölhessék ajándékaikat
- Hozzon létre Stripe-fiókot a [stripe.com](https://stripe.com) oldalon, és aktiválja (vegye ki a tesztmódból)
- Készítse elő a B1 Admin bejelentkezési adatait

</div>

## A Stripe beállítása

1. Ha még nincs fiókja, hozzon létre egyet a [stripe.com](https://stripe.com) oldalon. Ügyeljen arra, hogy **aktiválja a fiókját**, és vegye ki a tesztmódból.
2. A Stripe-ban lépjen a **Developers > API Keys** menüpontra.
3. Másolja ki a **Publishable Key** (nyilvános kulcs) értékét.
4. Jelentkezzen be a [B1 Adminba](https://admin.b1.church/).
5. Lépjen a **Settings** (Beállítások) menüpontra, és nyissa meg a **Giving** (Adakozás) szakaszt.
6. Kattintson az **Edit** (Szerkesztés) gombra a **Giving** szakaszban.
7. Állítsa a **Provider** (Szolgáltató) mezőt **Stripe**-ra.
8. Illessze be a nyilvános kulcsot a **Public Key** (Nyilvános kulcs) mezőbe.
9. Térjen vissza a Stripe-ba, és jelenítse meg a **Secret Key** (Titkos kulcs) értékét (ezt csak egyszer lehet megtekinteni, ezért mentse el biztonsági másolatban).
10. Illessze be a titkos kulcsot a **Secret Key** mezőbe, majd kattintson a **Save** (Mentés) gombra.

:::warning
A Stripe titkos kulcsa csak egyszer jelenik meg. Mielőtt elhagyja a Stripe irányítópultját, másolja ki egy biztonságos helyre. Ha elveszíti, új kulcsot kell generálnia.
:::

## A pénznem kiválasztása

A Stripe szolgáltatóként való kiválasztása után megjelenik egy **Currency** (Pénznem) legördülő menü az API-kulcsok mellett. Válassza ki azt a pénznemet, amely megegyezik a Stripe-fiókja elszámolási pénznemével, hogy az adományok helyesen legyenek terhelve.

A támogatott pénznemek közé tartozik az USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN és BRL. A fiók alapértelmezett pénznemét a [Stripe irányítópultján](https://dashboard.stripe.com/settings/currencies) ellenőrizheti vagy módosíthatja.

:::info
Az itt kiválasztott pénznemet használja a rendszer az egyszeri adományokhoz, a visszatérő előfizetésekhez, a díjszámításhoz és az adományjelentésekhez. Ha később módosítja a pénznemet, csak az új adományok és előfizetések használják az új pénznemet. A meglévő visszatérő ajándékok továbbra is abban a pénznemben maradnak, amelyben létrejöttek.
:::

:::warning
Győződjön meg arról, hogy a Stripe-fiókja elfogadja a kiválasztott pénznemet. Ha a Stripe-fiók nem támogatja a kiválasztott pénznemet, az adományok sikertelenek lesznek a fizetésnél.
:::

## Apple Pay és Google Pay

A Stripe-ot használó egyházak automatikusan Apple Pay és Google Pay gombokat kapnak a nyilvános adakozási oldalon. A gombok az egyszeri ajándékok kártyamezői felett jelennek meg, miután az adakozó kiválasztott egy alapot és összeget, és csak akkor, ha az adakozó böngészőjén vagy eszközén be van állítva digitális tárca. A visszatérő ajándékok továbbra is a kártya- vagy banki mezőket használják.

A Google Pay nem igényel beállítást. Az Apple Pay esetében viszont regisztrálni kell az adakozási oldal domainjét a Stripe-nál; a B1 ezt az első alkalommal regisztrálja, amikor az adakozási oldal betöltődik a domainjén. Ha az Apple Pay gomb nem jelenik meg iPhone-on, ellenőrizze a Stripe irányítópultján a **Settings > Payment method domains** (Beállítások > Fizetési mód domainjei) menüpontot, és győződjön meg arról, hogy a `yoursubdomain.b1.church` (vagy egyedi) domain szerepel és ellenőrzött.

## Névtelen ajándékok

A nyilvános adakozási oldalon az adakozók bejelölhetik a **Give anonymously** (Adakozás névtelenül) opciót. A névtelen ajándék adakozó nélkül kerül rögzítésre, továbbra is az adakozó által választott alapba megy, és a kötegekben és jelentésekben **Anonymous** (Névtelen) megjelöléssel szerepel. Az adakozó e-mail-címe továbbra is szükséges, hogy a nyugta el lehessen küldeni, de személyi nyilvántartás nem jön létre. A névtelen ajándékok csak egyszeriek lehetnek, és nem jelennek meg egyetlen adakozási kimutatásban sem.

## Sikertelen visszatérő ajándékok

Ha egy Stripe-on keresztüli visszatérő ajándék sikertelen (például lejárt vagy elutasított kártya miatt), a sikertelen terhelés a **Donations > Failed Gifts** (Adományok > Sikertelen ajándékok) alatt jelenik meg az adakozóval, az összeggel, a dátummal és az átjáró által megadott okkal együtt. Kattintson a **Retry** (Újrapróbálás) gombra, hogy újra megkíséreljen terhelést, miután az adakozó frissítette fizetési módját.

A B1 e-mailben is értesíti az adakozót, ha a terhelés sikertelen, majd három és hét nappal később újra, ha továbbra sem sikerült. Ezek az e-mailek hivatkoznak a B1.church oldalon elérhető linkre, ahol frissíthetik a fizetési módjukat.

:::info
Ha egyháza még azelőtt állította be a Stripe-ot, hogy ez a funkció létezett volna, nyissa meg a **Settings** > **Giving** (Beállítások > Adakozás) menüpontot, kattintson a szerkesztésre, majd egyszer kattintson a **Save** gombra. Ez frissíti a Stripe webhookot, így a sikertelen terhelések jelentésre kerülnek a B1 felé.
:::

## Adományoldal hozzáadása a B1.church oldalához

1. Lépjen a [b1.church](https://b1.church/) oldalra, és jelentkezzen be.
2. Kattintson a **Settings** (Beállítások) ikonra.
3. Kattintson az **Add Tab** (Lap hozzáadása) gombra.
4. Válassza a **Donation** (Adomány) típust.
5. Adjon meg egy nevet a lapnak (például „Give”), majd kattintson a **Save** gombra.
6. Opcionálisan módosíthatja a lap ikonját – írja be az ikonkeresőbe a „Giv” szót, hogy adakozáshoz kapcsolódó ikont találjon.

Az adományoldala most már elérhető. A tagok a `yoursubdomain.b1.church/donate` címen látogathatják meg.

## Adakozási link megosztása

Az adakozási URL megtalálásához lépjen a **B1 Adminba**, és kattintson a **Settings** ikonra, hogy lássa az aldomainjét. Az adakozási linkje a következő formátumot követi:

`https://yoursubdomain.b1.church/donate`

Ossza meg ezt a linket a weboldalán, e-mailekben vagy a hírlevélben, hogy a tagok tudják, hol adakozhatnak online.

### Előre beállított alappal és összeggel rendelkező linkek

Ahhoz, hogy az adakozókat közvetlenül egy adott alaphoz irányítsa, lépjen a **Donations > Funds** (Adományok > Alapok) menüpontra, és kattintson az alapnál található **Giving Link** (Adakozási link) gombra. Opcionálisan adjon meg egy összeget, majd másolja ki a linket. A párbeszédablak megjeleníti ugyanehhez a linkhez tartozó QR-kódot is; kattintson a **Download PNG** (PNG letöltése) gombra, hogy elmentse hírlevélhez, diához vagy plakáthoz. Amikor az adakozó megnyitja a linket vagy beolvassa a kódot, az alap és az összeg már ki lesz választva az adakozási oldalon. A link így néz ki:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Ugyanezek a paraméterek működnek a weboldal-szerkesztő **Donate Link** (Adakozási link) elemében is.

## Adománnyal kapcsolatos értesítések

A Stripe e-mail-értesítést küld minden beérkezett adományról. Az értesítési e-mail-cím módosításához lépjen a Stripe irányítópultjára, kattintson a jobb felső sarokban lévő profiljára, válassza a **Profile** (Profil) menüpontot, majd frissítse az e-mail-címét.

## Feldolgozási díjak kezelése

Beállíthatja az adakozási oldalt úgy, hogy az adakozók opcionálisan átvállalhassák a feldolgozási díjakat, így egyháza a teljes adományösszeget megkapja. Ez a beállítás a B1 Adminon belül, az egyházi beállításoknál kezelhető.

:::tip
A beállítás után tegyen egy kisebb próbaadományt, hogy megbizonyosodjon arról, minden működik, mielőtt bejelenti az online adakozást a gyülekezetének.
:::

## A Kingdom Funding beállítása

A Kingdom Funding egy keresztény fizetésfeldolgozó, amely bankkártyás fizetést és ACH banki átutalást támogat. Ha egyháza regisztrált a Kingdom Fundingnál, fizetési átjáróként csatlakoztathatja.

:::info
A Kingdom Funding integráció jelenleg béta fázisban van. Engedélyezéséhez vegye fel a kapcsolatot B1 ügyfélkapcsolattartójával.
:::

1. Regisztráljon vagy jelentkezzen be a [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply) oldalon.
2. A Kingdom Funding kereskedői portálján szerezze meg a **Security Key** (Biztonsági kulcs) (nyilvános) és a **Private Key** (Privát kulcs) értékét.
3. A B1 Adminban lépjen a **Settings** menüpontra, nyissa meg a **Giving** szakaszt, majd kattintson a szerkesztésre.
4. Állítsa a **Provider** mezőt **Kingdom Funding**-ra.
5. Illessze be a biztonsági kulcsot a **Security Key** mezőbe, a privát kulcsot pedig a **Private Key** mezőbe.
6. Állítsa be a **Webhook Key** értékét, amelyet a Kingdom Fundingtól kapott, majd másolja be a megjelenített webhook URL-t a Kingdom Funding kereskedői beállításaiba, hogy a Kingdom Funding értesíthesse a B1-et a lezajlott tranzakciókról.
7. Mentés.

Ha a kapcsolat létrejött, a tagok az adakozási oldalon kártya/banki váltókapcsolót látnak, és bankkártyával vagy ACH átutalással adakozhatnak.

## PayPal és Venmo gombok

Ha a **PayPal** szolgáltatót használó egyházak az adakozási oldalon az egyszeri ajándékok kártyamezői felett **PayPal** és **Venmo** gombokat kapnak. Az adakozók, akik az egyik gombra kattintanak, egy PayPal-ablakban fejezik be a fizetést, és az ajándék ugyanúgy rögzítésre kerül, mint bármely más online adomány. A Venmo kizárólag az Egyesült Államokban élő adakozók számára jelenik meg, a PayPal által jogosultnak ítélt eszközökön. A visszatérő ajándékok továbbra is a kártyamezőket használják.

## A Paystack beállítása (Afrika)

A Stripe nem nyit fiókot Ghánában, Nigériában, Kenyában, Dél-Afrikában és Elefántcsontparton működő egyházak számára. A [Paystack](https://paystack.com) viszont igen, és elfogadja a helyi kártyákat, a **mobilpénzt** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), a banki átutalást és a USSD-t – az adakozók a helyi pénznemen fizetnek (GHS, NGN, KES, ZAR, XOF).

1. Regisztráljon a [paystack.com](https://paystack.com) oldalon egyháza cégbejegyzési igazolásával és helyi bankszámlájával, majd végezze el a Paystack aktiválási (élesítési) ellenőrzését.
2. A Paystack irányítópultján nyissa meg a **Settings → API Keys & Webhooks** (Beállítások → API-kulcsok és webhookok) menüpontot, és másolja ki a **Public Key** (Nyilvános kulcs) és a **Secret Key** (Titkos kulcs) értékét (éles kulcsokat használjon, ne teszt kulcsokat).
3. A B1 Adminban lépjen a **Settings** menüpontra, nyissa meg a **Giving** szakaszt, majd kattintson a szerkesztésre.
4. Állítsa a **Provider** mezőt **Paystack**-re, illessze be a nyilvános és a titkos kulcsot, majd válassza ki a **Currency** (Pénznem) értékét.
5. Másolja ki a szolgáltató alatt megjelenő **webhook URL-t**, térjen vissza a Paystack irányítópultjára (**Settings → API Keys & Webhooks**), és illessze be a **Webhook URL** mezőbe. Ezen keresztül kerülnek rögzítésre a visszatérő ajándékok és a mobilpénzes fizetések.
6. Mentés.

Az adakozók a biztonságos Paystack-ablakban fejezik be a fizetést, és ott választhatnak kártyát, mobilpénzt vagy banki átutalást. Megjegyzések:

- **A visszatérő ajándékokhoz** kártya szükséges; a mobilpénz nem terhelhető újra automatikusan, ezért a Paystack csak egyszeri mobilpénzes ajándékot engedélyez.
- A Paystack-es visszatérő ajándékok a B1-ből törölhetők, de szüneteltetni vagy szerkeszteni nem lehet őket – az összeg módosításához törölje, és hozzon létre újat.
- A **Processing Fee** (Feldolgozási díj) alapértelmezett értékei a Paystack helyi kártyás díjait tükrözik az Ön pénznemére; ha az Ön által megállapodott díjak eltérnek, szerkessze őket.

## Következő lépések

- Használja a [Stripe importálást](stripe-import.md), hogy az online tranzakciókat betöltse a B1 Adminba, ha nem szinkronizálódnak automatikusan
- Ellenőrizze az [adományjelentéseket](donation-reports.md), hogy az online adományok helyesen jelennek-e meg
- Készítsen [adakozási kimutatásokat](giving-statements.md), amelyek az online és offline adományokat is tartalmazzák
