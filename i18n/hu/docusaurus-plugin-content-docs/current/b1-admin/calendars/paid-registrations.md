---
title: "Fizetős regisztrációk"
---

# Fizetős regisztrációk

<div class="article-intro">

Az eseményregisztráció több lehet, mint egy egyszerű létszámfelmérés. Megadhat árazott résztvevőtípusokat (például Felnőtt és Gyermek), opcionális kiegészítőket saját árakkal és mennyiségekkel, kedvezménykódokat hozhat létre, és a regisztrációnál fizetést gyűjthet a gyülekezete meglévő adományozási szolgáltatóján keresztül. Ha egy esemény betelik, egy opcionális várólista a várakozó tagokat sorban tartja, és a helyek felszabadulásakor automatikusan előreléptetésre kerülnek.

</div>

## Oktatóvideó

<YouTube id="eGSZv24Dlzk" title="Eseményregisztráció és fizetős események a B1-ben" next="Gyülekezeti weboldal indítása a B1-ben" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Először engedélyezze a regisztrációt az eseményen — lásd: [Naptárak létrehozása](creating-calendars#enabling-event-registration)
- Online fizetések gyűjtéséhez a gyülekezetének be kell állítania az [online adományozást](../donations/online-giving-setup.md) (Stripe, PayPal vagy Kingdom Funding). Az ingyenes eseményekhez nincs szükség adományozási beállításra. Online adományozás nélkül a fizetős regisztrációk is működnek, de az emberek közvetlenül a gyülekezetnek fizetnek — lásd: [Gyülekezetek online adományozás nélkül](#churches-without-online-giving).

</div>

## A regisztrációs beállítások megnyitása

1. A B1 Adminban nyissa meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), válassza a **Naptárak > Regisztrációk** menüpontot, majd nyissa meg az eseményt (vagy nyissa meg a naptárából).
2. A **Regisztrációs beállítások** kártya az alapokat mutatja — **Regisztráció engedélyezése**, **Kapacitás**, **Regisztráció nyitása/zárása**, **Címkék** és **Regisztrációs kérdések**.
3. Az alapbeállítások alatt három lenyíló panel található: **Résztvevőtípusok**, **Választások** és **Kedvezménykódok**.

## Résztvevőtípusok

A résztvevőtípusokkal különböző árakat számíthat fel a különböző típusú résztvevőkért, és mindegyikre külön korlátot állíthat.

1. Nyissa ki a **Résztvevőtípusok** panelt, és kattintson a **Típus hozzáadása** gombra.
2. Adjon meg egy **Nevet** (pl. „Felnőtt”, „Gyermek”, „Diák”).
3. Állítson be egy **Árat**. Ingyenes típushoz használjon 0-t.
4. Opcionálisan állítson be egy **Kapacitást** csak erre a típusra (pl. csak 20 gyermekhely). Hagyja üresen, ha nincs típusonkénti korlát.
5. Kattintson a **Mentés** gombra.

Regisztráció közben minden résztvevő választ egy típust; az elfogyott típusok **Elfogyott** felirattal jelennek meg, és nem választhatók ki. A névsor minden résztvevő típusát és a típusonkénti folyamatos darabszámokat mutatja.

## Választások

A választások opcionális, árazott kiegészítők — pólók, étkezési csomagok, programfejlesztések.

1. Nyissa ki a **Választások** panelt, és kattintson a **Választás hozzáadása** gombra.
2. Adjon meg egy **Nevet**, opcionálisan egy **Leírást**, és egy **Árat** (a 0 „Ingyenes”-ként jelenik meg).
3. Opcionálisan állítson be egy **Kapacitást** (az összes regisztráció együttes elérhető mennyisége) és egy **Max. mennyiséget** (a legtöbb, amennyit egy regisztráció rendelhet).
4. Kattintson a **Mentés** gombra.

A regisztrálók a jelentkezés során választják ki a mennyiségeket, és az összegek a kapacitásba számítanak, így soha nem adnak el többet, mint amennyi van.

## Kedvezménykódok

1. Nyissa ki a **Kedvezménykódok** panelt, és kattintson a **Kedvezménykód hozzáadása** gombra.
2. Adja meg a **Kódot**, amelyet a regisztrálók beírnak.
3. Válassza ki a **Típust** — **Százalék** vagy **Összeg** — és adja meg az **Értékét**.
4. Opcionálisan korlátozhatja a kódot egy **Kezdő dátummal** / **Záró dátummal**, egy **Min. tagszámmal** (a regisztrációban szereplő résztvevők minimális száma) és a **Max. felhasználással**.
5. Kattintson a **Mentés** gombra.

Minden kód mutatja a **Felhasználások** számát, így láthatja, hányszor váltották be. A regisztrálók azonnali visszajelzést kapnak, amikor kódot alkalmaznak — beleértve az egyértelmű üzeneteket, ha a kód lejárt, még nem kezdődött el, vagy több résztvevőt igényel.

## Várólista

Kapcsolja be az **Engedélyezett várólista** opciót a Regisztrációs beállítások kártyán. Amikor az esemény eléri a kapacitását:

- Az új regisztrálók várólistás helyet kapnak az elutasítás helyett. Ugyanazt a jelentkezést töltik ki (várólistán fizetés nélkül).
- Ha valaki lemond, a legrégebbi várólistás regisztrációt **automatikusan előreléptetjük**, és e-mailt kap, hogy felszabadult egy hely. Ha tartozása van, az e-mail a gyülekezete B1 oldalán található [Regisztrációim](../../b1-church/events/my-registrations) oldalra irányítja, ahol kifizetheti.
- Bármikor manuálisan előreléptethet valakit a várólistás soron lévő **Előléptetés** műveletével — ez hasznos a kapacitás emelése után.

:::info
Az előreléptetett regisztrációk addig *függőben* maradnak, amíg a tartozást ki nem fizetik; a fizetés (vagy ha nincs fizetnivaló) megerősíti őket.
:::

## A regisztrációs névsor

Nyissa meg az eseményt a Regisztrációk oldalról, hogy lássa az összes regisztrációt. A kártya címe mutatja, hány regisztráció foglal helyet a kapacitáshoz képest (például *Regisztrációk (18 / 20)*). Csak a függőben lévő és megerősített regisztrációk számítanak; ha vannak várólistások, a cím hozzáadja a számot (például *· 3 várólistán*), és ugyanez a szám megjelenik a kapacitássáv alatt. A táblázat megmutatja a **Nevet**, a **Tagokat**, a **Típust** (minden résztvevő típusát), a **Fizetett / Összes** oszlopot (figyelmeztetéssel, ha még tartozik pénz), az **Állapotot** és a **Dátumot**, valamint a táblázat fölött a típusonkénti darabszám-jelzőket.

- Kattintson a sor részletek ikonjára a **Regisztráció részletei** párbeszédpanel megnyitásához — tagok, választások, fizetett/tartozás, és egy **Fizetések** táblázat, amely minden díjat listáz (összeg, mód, dátum).
- A **CSV exportálása** letölti a teljes névsort a tagok, résztvevőtípusok, választások, fizetett/összes/tartozás és állapot oszlopokkal, valamint minden regisztrációs kérdéshez egy oszloppal.
- A **Résztvevő hozzáadása** offline vagy telefonos jelentkezést rögzít bármely személynek a gyülekezetében. Válassza ki a személyt, és fizetős eseménynél a résztvevőtípusát. Nem terhelik meg a kártyáját: a fizetős regisztráció **függőben** lévőként mentődik, a teljes összeggel mint fizetendő tartozással. Ha a gyülekezetnek van online adományozása, a személy a [Regisztrációim](../../b1-church/events/my-registrations) oldalon fizethet; különben személyesen kell beszedni. A résztvevők hozzáadásához a Regisztrációk szerkesztési jogosultságra van szüksége.

:::info
A visszatérítéseket a B1-en belül nem dolgozzuk fel. Ha vissza kell térítenie egy lemondott fizetős regisztrációt, a visszatérítést az adományozási szolgáltató irányítópultján (pl. Stripe) indítsa.
:::

## Hogyan működik a fizetés

A fizetések ugyanazon az adományozási átjárón keresztül történnek, amelyet a gyülekezete már az adományokhoz használ — a kártyaadatok közvetlenül a szolgáltatóhoz kerülnek, és soha nem érintik a B1 szervereit. Az árakat mindig a szerver számítja ki a beállított típusok, választások és kedvezménykódok alapján, így a regisztráló nem tudja módosítani az összeget. A bejelentkezett tagok mentett kártyával fizethetnek. A vendégek a fizetéskor adják meg a kártyájukat, és fizetés előtt be kell jelölniük a **Nem vagyok robot** jelölőnégyzetet.

### Gyülekezetek online adományozás nélkül

Ha a gyülekezetnek nincs beállított adományozási szolgáltatója, a fizetős események akkor is fogadhatnak regisztrációkat. A fizetési lépés tájékoztatja a regisztrálókat, hogy online fizetés nem érhető el, és közvetlenül a gyülekezetnek fizethetnek. A **Regisztráció és fizetés később** gomb pedig elmenti a regisztrációt. Ez **függőben** lévőként kerül mentésre a teljes összeggel mint fizetendő tartozással, és figyelmeztetéssel jelenik meg a névsorban. A pénzt úgy gyűjtse be, ahogy a gyülekezete szokásosan teszi.

:::info
A B1-ben nincs mód arra, hogy egy offline fizetést beérkezettként jelöljön meg. A fizetendő tartozás a névsorban és a regisztráló [Regisztrációim](../../b1-church/events/my-registrations) kártyáján marad, miután beszedte, ezért vezessen saját nyilvántartást arról, ki fizetett.
:::

## Kapcsolódó cikkek

- [Naptárak létrehozása](creating-calendars#enabling-event-registration) — regisztráció engedélyezése és az alapbeállítások
- [Online adományozás beállítása](../donations/online-giving-setup.md) — a fizetésnél használt fizetési átjáró beállítása
- [Regisztráció eseményekre](../../b1-church/events/registering) — amit a tagok látnak jelentkezéskor
- [Regisztrációim](../../b1-church/events/my-registrations) — hogyan fizetik ki a tagok a tartozásukat és szerkesztik a regisztrációikat
