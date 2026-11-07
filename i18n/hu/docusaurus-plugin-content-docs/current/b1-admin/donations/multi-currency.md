---
title: "Hỗ trợ đa tiền tệ"
---

Tôi cần dịch sang tiếng Hungary chứ không phải tiếng Việt, nên xin lỗi về tiêu đề trên. Bản dịch đúng như sau:

---
title: "Többpénznemű támogatás"
---

# Többpénznemű támogatás

<div class="article-intro">

A B1 többpénznemű funkciója lehetővé teszi, hogy gyülekezete különböző pénznemekben fogadjon el és kövessen nyomon adományokat. Ez különösen hasznos olyan gyülekezetek számára, amelyeknek nemzetközi tagjaik, misszionáriusaik vagy több, különböző országban lévő gyülekezeti helyszínük van.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdené</h4>

- Szüksége van jogosultságra az adományok kezeléséhez. A részletekért lásd: [Szerepkörök és jogosultságok](../people/roles-permissions.md).
- Állítsa be az [online adakozást](./online-giving-setup.md) a Stripe-pal, amely támogatja a többpénznemű tranzakciókat.
- Értse meg gyülekezete könyvelési igényeit a több pénznem kezelésével kapcsolatban.

</div>

## Többpénznemű működés engedélyezése

A többpénznemű támogatás mostantól alapértelmezés szerint engedélyezve van a B1-ben. Engedélyezés után:

- A tagok online adakozáskor a helyi pénznemükben adakozhatnak
- Kézzel bármilyen pénznemben rögzíthet adományokat
- Az adománykimutatások az eredeti pénznemben jelenítik meg az összegeket
- Az online adakozás esetén a Stripe automatikusan elvégzi a valutaváltást

## Támogatott pénznemek

A rendszer a világ összes jelentős pénznemét támogatja, többek között:

- **USD** -- amerikai dollár
- **EUR** -- euró
- **GBP** -- font sterling
- **CAD** -- kanadai dollár
- **AUD** -- ausztrál dollár
- **MXN** -- mexikói peso
- **BRL** -- brazil real
- **INR** -- indiai rúpia
- **CNY** -- kínai jüan
- **JPY** -- japán jen
- És még sok más...

Az online adakozáshoz elérhető pénznemek a Stripe-fiókja által támogatott pénznemektől függnek.

## Adományok rögzítése különböző pénznemekben

### Online adományok

Amikor valaki online, a Stripe-on keresztül adakozik:

1. A fizetésnél kiválasztja a kívánt pénznemet
2. A Stripe az adott pénznemben dolgozza fel a fizetést
3. Az adomány az eredeti pénznemben érkező összeggel kerül rögzítésre a B1-ben
4. A Stripe automatikusan elvégzi a szükséges valutaváltást a fiókja alapértelmezett pénznemére

### Kézi rögzítés

Készpénz- vagy csekkadomány rögzítéséhez más pénznemben:

1. Lépjen a **Donations > Batches** menüpontra a B1 Adminban, és nyissa meg a tételt
2. Kattintson az oldal tetején lévő **Add Donation** gombra
3. Válassza ki a pénznemet a pénznem legördülő listából
4. Adja meg az összeget abban a pénznemben
5. Töltse ki az adomány többi adatát
6. Kattintson a **Save** gombra

## Többpénznemű adományok megtekintése

### Adománykimutatások

Az adománykimutatások az összegeket az eredeti pénznemben jelenítik meg:

- Az egyes adományrekordok feltüntetik a pénznem kódját (pl. "$100.00 USD")
- Az összegek pénznemenként kerülnek kiszámításra
- Szűrhet konkrét pénznemekre

### Átszámított összegek

Ahol a B1 egyetlen összesített összeget mutat -- az adakozási összesítő KPI-kártyákon, egy adománytétel összegén vagy egy alap teljes összegén --, ott a gyülekezete alapértelmezett pénznemétől eltérő pénznemben rögzített adományok az aktuális árfolyamok szerint átváltásra kerülnek a gyülekezet pénznemére, így az összeg egyetlen, értelmes szám lesz, és nem különböző pénznemeket ad össze. Az összeg alatt **Az aktuális árfolyamon átszámítva** megjegyzés jelenik meg, amikor átváltás történt. Az egyes adománytételek továbbra is az eredeti pénznemben jelennek meg.

### Adománybizonylatok

Adománybizonylatok készítésekor:

- Minden adomány az eredeti pénznemével jelenik meg
- Az összegek pénznemenként kerülnek bontásra
- A tagok pontosan láthatják, mennyit adtak az egyes pénznemekben

## Stripe-integráció

Az online adakozáshoz a Stripe kezeli a többpénznemű tranzakciókat:

- **Automatikus átváltás** -- A Stripe a pénznemeket a fiókja alapértelmezett pénznemére váltja át
- **Árfolyamok** -- A Stripe az aktuális piaci árfolyamokat használja
- **Díjak** -- A valutaváltás további Stripe-díjakat vonhat maga után
- **Kifizetési pénznem** -- Az összegek a fiókja alapértelmezett pénznemében érkeznek meg

:::info
Ellenőrizze a Stripe irányítópultján az aktuális átváltási árfolyamokat és a többpénznemű tranzakciókhoz kapcsolódó díjakat.
:::

## Könyvelési szempontok

Több pénznem kezelésekor:

- **Nyilvántartás** -- Vezesse nyilván az eredeti adományösszegeket és pénznemeket a pontos kimutatások érdekében
- **Árfolyamok** -- Vegye figyelembe, hogy a Stripe átváltási árfolyamai eltérhetnek a bankjáéitól
- **Adóigazolások** -- Konzultáljon könyvelőjével arról, hogyan kell különböző pénznemben érkező adományokat az adózás szempontjából bejelenteni
- **Alapok hozzárendelése** -- Az adományokat a pénznemtől függetlenül hozzárendelheti konkrét alapokhoz

## Bevált gyakorlatok

- **Alapértelmezett pénznem** -- Állítsa be gyülekezete elsődleges pénznemét alapértelmezettként a legtöbb tranzakcióhoz
- **Egyértelmű kommunikáció** -- Tájékoztassa az adakozókat arról, milyen pénznemben adakoznak a fizetési folyamat során
- **Következetes kimutatás** -- Az összesített összegek mindig automatikusan a gyülekezet pénznemére váltódnak át; az eredeti összegek megtekintéséhez használja az adományonkénti pénznemszűrőt
- **Rendszeres egyeztetés** -- Egyeztesse a Stripe-kifizetéseket az adatbázisában lévő adományokkal, figyelembe véve a valutaváltásokat

## Korlátozások

- A fizetésfeldolgozás során a valutaváltást kizárólag az online adakozás esetén a Stripe végzi; a kézzel rögzített adományok a megadott összeggel kerülnek rögzítésre, automatikus átváltás nélkül
- A korábbi kimutatások és az egyes adománytételek mindig azt a pénznemet mutatják, amelyben az adományt rögzítették
- Az összesített összegek (KPI-kártyák, tételösszegek, alapösszegek) az aktuális árfolyamok szerint kerülnek átváltásra a gyülekezet pénznemére -- ezek az árfolyamok kismértékben eltérhetnek a bankja vagy a Stripe által a források elszámolásakor alkalmazott árfolyamoktól

## Kapcsolódó cikkek

- [Online adakozás beállítása](./online-giving-setup.md) -- A Stripe beállítása az adományok fogadásához
- [Adományok rögzítése](./recording-donations.md) -- Adományrekordok kézi bevitele
- [Adománykimutatások](./donation-reports.md) -- Összefoglalók készítése és megtekintése
- [Adakozási bizonylatok](./giving-statements.md) -- Éves adakozási bizonylatok létrehozása
