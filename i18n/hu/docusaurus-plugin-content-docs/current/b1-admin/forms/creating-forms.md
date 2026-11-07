---
title: "Űrlapok létrehozása"
---

# Űrlapok létrehozása

<div class="article-intro">

Készíthet egyéni űrlapokat, amelyekkel adatokat gyűjthet a gyülekezetétől. Űrlapokat hozhat létre eseményregisztrációhoz, felmérésekhez, látogatókártyákhoz, tagsági jelentkezésekhez és egyebekhez. Az űrlapok összekapcsolhatók az adatbázisában szereplő személyekkel, vagy önálló oldalként, saját nyilvános URL-címmel is használhatók.

</div>

## Oktatóvideó

<YouTube id="sr9wxEj9ghQ" title="Űrlapok létrehozása és a beküldések kezelése a B1-ben" next="Weboldal indítása a B1-ben" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A **Személyek** típusú űrlapokhoz (amelyek személyi nyilvántartásokhoz kapcsolódnak) először [személyeket kell felvennie az adatbázisába](../people/adding-people.md).
- A **fizetéseket** gyűjtő űrlapokhoz előbb be kell állítania a [Stripe-ot az online adakozáshoz](../donations/online-giving-setup.md).

</div>

## Új űrlap létrehozása

1. Nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a B1 Admin bal felső sarkában), bontsa ki a **Személyek** menüpontot, majd kattintson az **Űrlapok** elemre.
2. Kattintson az **Űrlap hozzáadása** gombra.
3. Adja meg az űrlap **nevét**.
4. Válassza ki az űrlap típusát a **Kapcsolódik ehhez** legördülő menüből:
   - **Személyek** — A beküldéseket az adatbázisban lévő [személyi nyilvántartásokhoz](../people/adding-people.md) rendeli. A Személyek típusú űrlapokat a személy nyilvántartásából töltik ki, ezért nincs megosztható hivatkozásuk.
   - **Önálló** — Saját nyilvános URL-címmel rendelkező, független űrlapot hoz létre, amely külső regisztrációkhoz ideális. Csak az Önálló űrlapok kínálnak [fejlécképet](#adding-a-header-photo), [QR-kódot](#sharing-a-form-with-a-qr-code), [összekapcsolt csoportot](#linking-a-form-to-a-group) és a **Személyi nyilvántartás létrehozása a beküldésekből** lehetőséget.
5. Kattintson a **Mentés** gombra az űrlap létrehozásához.

Az új űrlap megjelenik a listában. Kattintson rá a kérdések hozzáadásának megkezdéséhez.

## Üres űrlap nyomtatása {#printing-a-blank-form}

Papír alapú példányra van szüksége, amelyet kioszthat — például egy látogatókártyához a vendégfogadó asztalnál, vagy olyan űrlaphoz, amelyet internet-hozzáféréssel nem rendelkező személy kézzel tud kitölteni? Kattintson az űrlap melletti **Nyomtatás** gombra az Űrlapok főlistáján az előnézet megnyitásához, majd kattintson a **Nyomtatás** gombra. Az üres mezők minden kérdés mellett aláhúzást vagy jelölőnégyzetet kapnak, hogy az emberek kézzel tölthessék ki őket; a kötelező kérdések csillaggal vannak jelölve. Az oldal tetején gyülekezete logója látható (a [Weboldal > Megjelenés](../website/appearance.md) menüpontban feltöltött **Világos háttérhez használt logó**, ha töltött fel ilyet), alatta a gyülekezet neve, majd az űrlap neve. Egyéb nyomtatási beállítás nincs — vagy az egész űrlapot nyomtatja ki, vagy semmit.

## Űrlap megosztása QR-kóddal {#sharing-a-form-with-a-qr-code}

Az Önálló űrlapok mellett a főlistán van egy **QR-kód** hivatkozás (az archivált űrlapoknál nincs). Kattintson rá, hogy megnyissa az űrlap nyilvános URL-címéhez tartozó QR-kódot, alatta a hivatkozással. Kattintson a **PNG letöltése** gombra, hogy a kódot képként mentse, és kinyomtathassa a hirdetőlapokra vagy megjeleníthesse a diákon. Aki beolvassa, a telefonján nyitja meg az űrlapot.

## Kérdések hozzáadása {#adding-questions}

1. Nyissa meg az űrlapját, és lépjen a **Kérdések** fülre.
2. Kattintson a **Kérdés hozzáadása** gombra.
3. Válasszon **mezőtípust** a Szolgáltató legördülő menüből. Az elérhető típusok közé tartoznak:
   - **Szövegmező** — Rövid szöveges válaszokhoz
   - **Dátum** — Dátumválasztáshoz
   - **E-mail** — E-mail-címekhez
   - **Telefonszám** — Telefonszám megadásához
   - **Feleletválasztós** — Előre meghatározott lehetőségek közüli választáshoz
   - **Fizetés** — Fizetések gyűjtéséhez
4. Adja meg a kérdés **Címét**, és ha szeretné, a **Leírását**. A leírás a kérdés alatt jelenik meg, amikor az emberek kitöltik az űrlapot, ezért használja tippekhez, például: „Adja meg, ha van olyan allergiája, amiről tudnunk kell.”
5. Jelölje be a **Válasz megadása kötelező** lehetőséget, ha a mező kitöltése kötelező.
6. Kattintson a **Mentés** gombra.
7. Ismételje meg a lépéseket további kérdések hozzáadásához.

:::warning
A **Fizetés** mezőtípushoz a Stripe beállítása szükséges. Ha még nem állította be az online adakozást, a fizetési mezők hozzáadása előtt nézze meg az [Online adakozás beállítása](../donations/online-giving-setup.md) oldalt. Azoknak, akik bejelentkezés nélkül fizetnek az űrlapon, be kell jelölniük a **Nem vagyok robot** ellenőrzést, mielőtt a kártyát elfogadnák.
:::

## Űrlap tagjainak kezelése {#managing-form-members}

1. Nyissa meg az űrlapját, és lépjen az **Űrlap tagjai** fülre.
2. Keressen rá egy személyre, és adja hozzá szerepkörrel:
   - **Adminisztrátor** — Szerkesztheti az űrlapot, és megtekinthet minden beküldést.
   - **Csak megtekintés** — Megtekintheti a beküldéseket, de nem szerkesztheti az űrlapot.

## Űrlap összekapcsolása csoporttal {#linking-a-form-to-a-group}

Bármely Önálló űrlapot összekapcsolhat egy csoporttal — például egy kiscsoportnak készült imakérési űrlapot vagy egy ifjúsági kirándulás egészségügyi nyilatkozatát:

1. Nyissa meg az űrlap **Részleteit**.
2. Az **Összekapcsolt csoport** alatt válassza ki a csoportot, vagy hagyja a **Nincs** beállításon.
3. Kattintson a **Mentés** gombra.

Miután az űrlap összekapcsolásra került:

- A **csoporttagok** a B1.church-ön, a csoport oldalán, a **Űrlapok** szakaszban látják az űrlapot, amíg az nyitva van, egy **Kitöltés** gombbal, amely megnyitja (lásd: [Csoportadatok](../../b1-church/groups/group-details.md#linked-forms)).
- A **csoportvezetők** a lezárt űrlapokat is látják, és minden beküldés válaszait elolvashatják és kinyomtathatják (egy beküldést vagy az **Összes nyomtatása** lehetőséget). A vezetők csak megtekinthetik a válaszokat — az űrlapot csak akkor szerkeszthetik, ha egyben [űrlap tagjai](#managing-form-members) is.
- A **B1 Adminban** a csoport oldalán megjelenik az **Összekapcsolt űrlapok** szakasz, amely minden összekapcsolt űrlapot **Nyitva** vagy **Lezárva** állapottal sorol fel. Ez a csoport vezetőinek és azoknak látszik, akik kezelhetik az űrlapokat. Lásd: [Csoporttagok](../groups/group-members.md#linked-forms).

Az űrlap akkor zárt, ha a rendelkezésre állási időkereten kívül esik. Az archivált űrlapok nem jelennek meg a csoport oldalán.

### A beküldők automatikus hozzáadása csoporthoz {#automatically-adding-submitters-to-a-group}

Az űrlap csoporthoz kapcsolása önmagában senkit nem ad hozzá a csoporthoz. Ha minden beküldőt a csoport névsorába szeretne venni, kapcsolja be az űrlap részleteinél a **Személyi nyilvántartás létrehozása a beküldésekből** lehetőséget, majd kattintson a **Mentés** gombra.

Minden alkalommal, amikor valaki beküldi az űrlapot, az egyezésnek megfelelő vagy újonnan létrehozott személy hozzáadódik a csoporthoz (a meglévő csoporttagokat kihagyja a rendszer). Ez hasznos például egy táborjelentkezési űrlapnál, amely automatikusan felépíti a tábor csoportjának névsorát.

### Utánkövető e-mail küldése

Ha a **Személyi nyilvántartás létrehozása a beküldésekből** be van kapcsolva, minden beküldőnek e-mailt is küldhet. Töltse ki az űrlap részleteinél az **Utánkövető e-mail tárgya** és az **Utánkövető e-mail szövege** mezőt. Mindkettőben használhatja a `{firstName}` és a `{churchName}` jelölőket. Az e-mail csak akkor kerül elküldésre, ha mindkét mező ki van töltve.

:::info
Az utánkövető e-mailek csak akkor mennek ki, miután a gyülekezete jóváhagyást kapott csoportos e-mailek küldésére, és beleszámítanak a gyülekezete napi e-mail-korlátjába. Lásd: [Csoportos e-mail bekapcsolása a gyülekezetében](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Űrlap másolása

Ha egy meglévő űrlapot szeretne kiindulópontként használni egy újhoz, kattintson az űrlap melletti **Másolás** gombra az Űrlapok listájában, majd erősítse meg. A B1 pontos másolatot készít az űrlapról — az összes kérdéssel együtt —, amelyet utána átnevezhet és függetlenül szerkeszthet.

:::tip
A másolás ismétlődő eseményeknél hasznos, ahol a regisztrációs kérdések évről évre ugyanazok maradnak. Másolja le a tavalyi űrlapot, frissítse a nevet és a dátumokat, és máris készen áll.
:::

## Az űrlap tulajdonságainak beállítása

Az űrlap nevét és beállításait bármikor módosíthatja. Az Önálló űrlapoknál egy egyedi **nyilvános URL-cím** is látható, amelyet bárkivel megoszthat, valamint egy **Leírás** mező — ez a szöveg a kérdések előtt jelenik meg a nyilvános űrlapoldalon, és hasznos annak elmondására, mire való az űrlap, mielőtt az emberek kitöltenék.

### Fejléckép hozzáadása {#adding-a-header-photo}

Az Önálló űrlapok az űrlap tetején **fejlécképet** jeleníthetnek meg. Az űrlap részleteinél kattintson a képmezőre vagy az **Kép hozzáadása** gombra, majd válasszon vagy töltsön fel egy képet (a rendszer 16:9 arányúra vágja). Kattintson a **Mentés** gombra. A kép az űrlap neve alatt, a leírás fölött jelenik meg, az űrlap nyilvános URL-címén, valamint mindenhol, ahol az űrlap be van ágyazva a weboldal **Űrlap** elemével. A **Kép cseréje** gombbal cserélheti le, a **Eltávolítás** gombbal pedig törölheti.

A **Köszönő üzenet** mezővel állíthatja be, mit látnak az emberek az űrlap beküldése után, beleértve az űrlap nyilvános URL-címének oldalát is. Ha üresen hagyja, ez jelenik meg: „Köszönjük, hogy elküldte az űrlapot!”

:::tip
Az önálló űrlapok kiválóan alkalmasak eseményregisztrációkhoz. Ossza meg a nyilvános URL-címet e-mailben vagy a közösségi médiában, vagy ágyazza be az űrlapot közvetlenül a gyülekezeti weboldalába.
:::

:::info
Az űrlap B1 weboldalába való beágyazásához nyissa meg a weboldal-szerkesztőt, adjon hozzá új szakaszt, és válassza ki az **Űrlap** elemet. Ezután válassza ki a megjeleníteni kívánt űrlapot. A weboldal szerkesztéséről a [Oldalak kezelése](../website/managing-pages.md) oldalon olvashat bővebben.
:::
