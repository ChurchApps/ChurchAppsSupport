---
title: "Személyek hozzáadása"
description: "Személy hozzáadása a B1 Admin adatbázisához, adatok kitöltése, családtagok háztartásba kötése a bejelentkezéshez és jelentésekhez."
---

# Személyek hozzáadása

<div class="article-intro">

A Személyek szakasz a B1 Admin alapja: ez a gyülekezeted tagjainak adatbázisa. Minden más funkció (csoportok, jelenlét, adományok, űrlapok) személyi adatlapokhoz kapcsolódik. Ez az útmutató végigvezet azon, hogyan adhatsz hozzá valakit az adatbázisodhoz, hogyan szerkesztheted az adatait, és hogyan kapcsolhatsz családtagokat háztartásokba.

</div>

## Oktatóvideó

<YouTube id="NTL1UDQpx8s" title="Személyek és háztartások hozzáadása a B1-ben" next="Személyadatbázis importálása a B1-ben" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Szükséged van egy aktív B1 Admin fiókra, amellyel jogosult vagy a személyek kezelésére. Ha nem vagy biztos a hozzáférési szintedben, nézd meg a [Szerepkörök és jogosultságok](roles-permissions.md) oldalt.
- Ha néhánynál több embert szeretnél hozzáadni, érdemes inkább a [CSV-importálás](importing-data.md) eszközt használnod.

</div>

## Személy hozzáadása

1. Nyisd meg a B1.church Admin irányítópultját.
2. Nyisd meg a [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsd ki a **People** menüpontot, majd kattints a **People** elemre.
3. Kattints az oldal fejlécében található **Add Person** gombra. Az oldal lefelé gördül az **Add New Person** űrlaphoz, amely a névjegyzék alatt található.
4. Töltsd ki a személy **First Name** (keresztnév), **Last Name** (vezetéknév) és **Email** (e-mail) mezőit, majd kattints az **Add** gombra.

A személy profiloldala megnyílik, és készen áll arra, hogy további adatokat adj hozzá.

:::tip
Ha egy másik gyülekezeti nyilvántartó rendszerből váltasz, az [Adatok importálása](importing-data.md) funkcióval a teljes névjegyzéket betöltheted egy CSV-fájlból. Ez sokkal gyorsabb, mint az embereket egyesével felvenni.
:::

### Duplikáció-figyelmeztetések

Ha az e-mail-cím (vagy a teljes Szerkesztés űrlapon való létrehozáskor a telefonszám, illetve az egyező keresztnév, vezetéknév és születési dátum) már szerepel az adatbázisodban, az új rekord mentése előtt megjelenik a **Possible Duplicate** párbeszédpanel. Ez minden egyező személyt felsorol az e-mail-címével, telefonszámával és születési dátumával, hogy össze tudd hasonlítani őket.

- Kattints a találat melletti **Use Existing** gombra, ha a meglévő rekordot szeretnéd használni, és nem új rekordot hozni létre.
- Kattints a **Create Anyway** gombra, ha az új személyt akkor is hozzá szeretnéd adni, ha egyező találatot észleltek.

Ez az ellenőrzés csak akkor fut, amikor teljesen új személyt hozol létre. Egy meglévő rekord szerkesztésekor soha nem jelenik meg. Csak az új duplikációkat akadályozza meg; a már létező két rekordot nem egyesíti.

## Adatok szerkesztése

1. A személy profiloldalán kattints a bal oldalon, az elérhetőségi adatai alatt található **Edit** gombra.
2. A **Personal Details** űrlapon add meg a további adatokat, például a **Title** (megszólítás) mezőt (válassz a listából: Mr, Mrs, Miss, Ms, Dr, Prof, Rev vagy Pastor, vagy írj be sajátot, legfeljebb 10 karakterig), a második keresztnevet, a tagsági státuszt (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** vagy **Deceased**), a dátumokat, a címet, a telefonszámokat, valamint (gyermekek és tanulók esetén) az évfolyamot és az iskolát.
3. Kattints a **Save** gombra a személyes adatok mentéséhez.

A profil bal oldalán látszik a személy fényképe, neve, tagsági státusza, elérhetőségi adatai, az esetleges [egyéni mezők](../settings/custom-fields.md) értékei és a háztartása. A háztartás alatt a **Added** mutatja a rekord létrehozásának dátumát (csak azoknál a személyeknél, akiket 2026. október vége óta adtak hozzá). A fényképre kattintva módosíthatod a képet. Az **Edit** gomb alatt további műveletek találhatók: **Workflow** (a személy hozzáadása egy [munkafolyamathoz](../serving/workflows.md)), **Merge**, **Export** és **Export Data**.

A profil többi része minden kapcsolódó adattípushoz összefoglaló szakaszt mutat:

- **Attendance** (jelenlét) – Megmutatja, hogy az utóbbi néhány hét közül melyiken volt jelen a személy, valamint a legutóbbi látogatásait. A teljes látogatási előzményekért kattints az **All years** gombra. Ez tartalmazza a campust, az istentiszteletet, az időpontot, a csoportot és a **Checked In** oszlopot a kioszkos bejelentkezés idejével (azoknál a látogatásoknál, amelyekhez nem tartozik kioszkos bejelentkezés, kötőjel látszik). Nyomtatáshoz kattints a **Print** gombra; a nyomtatványon a gyülekezeted logója és neve a középen, a személy neve felett jelenik meg. A gyülekezet egészének trendjeiért, nem egyetlen személy előzményeiért lásd a [Jelenlét követése](../attendance/tracking-attendance.md) oldalt.
- **Donations** (adományok) – Megmutatja az idei adományokat, beleértve a nem levonható alapokba tett adományokat is. A teljes [adománytörténetért](../donations/recording-donations.md) kattints az **All years** gombra, új adomány rögzítéséhez pedig a **Log a gift** gombra. Ha a gyülekezeted bekapcsolta az [Adományozási adatvédelmet](../settings/church-settings.md#giving-privacy), az összegek rejtve maradnak, amíg nem kattintasz a **Show giving** gombra.
- **Groups** (csoportok) – Felsorolja a személy [csoporttagságait](../groups/group-members.md), és ha rögzítve van, megmutatja a **Joined** oszlopban az egyes csoportokhoz való csatlakozás dátumát.
- **Notes** (jegyzetek) – Megmutatja a személyről készült legutóbbi jegyzeteket (lelkigondozás, nyomon követés stb.). A jegyzetek olvasásához és hozzáadásához kattints az **All notes** gombra. Minden jegyzet megmutatja, ki írta, és mikor került rögzítésre. Az összes személy legutóbbi jegyzeteinek együttes megtekintéséhez használd a [Jegyzetek](./notes.md) oldalt.
- **Forms** (űrlapok) – Felsorolja a személy űrlapjait, és azt, hogy mindegyiket elküldték-e (lásd lent: [Űrlapok kezelése](#working-with-forms)).

Ha ezek valamelyik teljes nézetét megnyitod, a profilra a személy nevével ellátott **Back to** hivatkozásra kattintva térhetsz vissza.

## Személy e-mailezése

Ha a személyhez van e-mail-cím rögzítve, a profil bal oldalán, az elérhetőségi adatai alatt megjelenik az **Email** gomb.

1. A személy profilján kattints az **Email** gombra.
2. Megnyílik az **Email** párbeszédpanel, amelynek címében a személy neve szerepel. Itt a **Sending to** mező mutatja a személy címét.
3. Opcionálisan válassz egy mentett sablont a **Load Template (optional)** mezőből.
4. Add meg a **Subject** (tárgy) mezőt, és írd meg az üzenetet.
5. Kattints a **Send Email** gombra.

Ha az üzenetet inkább a saját levelezőprogramodban szeretnéd megírni, kattints az **Open in my email app** gombra.

:::info
A B1-ből történő küldésre ugyanazok a jóváhagyási és napi korlátok vonatkoznak, mint a csoportos e-mailekre. Ha a gyülekezeted még nincs jóváhagyva, a párbeszédpanel arra kéri, hogy kérj felülvizsgálatot. Addig is az **Open in my email app** gombra kattintva továbbra is küldhetsz üzenetet. Lásd a [Csoportos e-mail bekapcsolása a gyülekezeted számára](../groups/group-members.md#turning-on-group-email-for-your-church) részt. Azok a felhasználók, akiknek nincs jogosultságuk a csoporttagok szerkesztéséhez, az **Email** gombra kattintva közvetlenül a saját e-mail-programjukba kerülnek.
:::

## Űrlapok kezelése

Egyedi űrlapokat közvetlenül a személy profiljáról is kitölthetsz. Ezek felhasználó által létrehozott űrlapok, amelyeket a [Űrlapok létrehozása](../forms/creating-forms.md) útmutató szerint építhetsz fel.

1. A személy profilján keresd meg a **Forms** szakaszt. Itt felsorolásra kerül minden űrlap, és az is, hogy a **Submitted** (beküldve) vagy a **Not submitted** (nincs beküldve) állapotban van-e.
2. Az űrlap megnyitásához kattints a nevére (vagy a teljes lista megtekintéséhez kattints az **All forms** gombra).
3. Kattints az űrlapon található **edit icon** (ceruza) ikonra, töltsd ki az adatokat, majd kattints a **Save** gombra.

Miután az űrlapot beküldték, kattints mellette a **print icon** (nyomtató) ikonra, hogy kinyomtasd a személy kitöltött válaszait. Ha a személynek egy űrlapból csak egy beküldése van, az űrlap a válaszok felett a **Submitted** állapotot és a dátumot mutatja.

Ha egy beküldés rossz személyhez került, kattints mellette a **Change person** (két nyíl) ikonra, hogy másik személyhez rendeld, vagy szüntesd meg a hozzárendelést. Lásd a [Beküldés személyének módosítása](../forms/managing-submissions.md#changing-the-person-on-a-submission) részt.

:::info
A személy profiljához kapcsolt űrlapok **People** űrlaptípust használnak. Ha önálló űrlapra van szükséged (például eseményregisztrációhoz), lásd az űrlapok útmutatóban a [Önálló űrlap lehetőséget](../forms/creating-forms.md).
:::

:::tip
Ha csak egy-két plusz adatot szeretnél nyomon követni a személyeknél, például egy dátumot, egy számot vagy igen/nem választ, használd inkább az [Egyéni mezőket](../settings/custom-fields.md) az űrlap helyett. Ezek gyorsabban kitölthetők, és közvetlenül a Speciális keresésben is kereshetők.
:::

## Háztartások kezelése {#managing-households}

A háztartások lehetővé teszik, hogy családtagokat kapcsolj egymáshoz. Ez különösen hasznos a [bejelentkezésnél](../attendance/check-in.md), ahol a szülő egyszerre jelentkezhet be az összes gyermekével.

1. A személy profilján kattints a bal oldalon, a **Household** címsor melletti **Edit** gombra.
2. Megnyílik a háztartásszerkesztő. Válaszd ki az aktuális személy **household role** (háztartási szerepkör) értékét (például Head, Spouse, Child vagy Other).
3. Kattints a **Add** ikonra, ha másik háztartási tagot szeretnél hozzáadni.
4. Az **Add Household Member** alatt írd be a személy nevét a keresőmezőbe, majd nyomd meg az **Enter** billentyűt, vagy kattints a nagyító ikonra. (Gépelés előtt a **Recent people** (legutóbbi személyek) rövid listája látszik.)
5. Amikor a személy megjelenik a találatok között, kattints a nevére vagy a mellette lévő hozzáadás ikonra.
6. Válaszd ki a háztartási szerepkörét, majd kattints a **Save** gombra a háztartás beállításának befejezéséhez.
