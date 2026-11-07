---
title: "Kijelentkezés és gyermekbiztonság"
---

# Kijelentkezés és gyermekbiztonság

<div class="article-intro">

A kijelentkezés zárja le a gyermekek bejelentkezését: a szülő bemutatja az átvételi címkéjén lévő biztonsági kódot, a kioszk ellenőrzi, ki viszi haza a gyermeket, majd a gyermekek kijelentkeztetésre kerülnek. A személyzettel működtetett állomásokhoz biztonsági eszközök is tartoznak: megbízható átvevő ellenőrzése, üzenet küldése a szülőnek, biztonsági címkék újranyomtatása és vészhelyzeti közlemény.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- A kijelentkezés azokon az állomásokon érhető el, amelyek a kioszk-adminisztrációs beállításokban **személyzettel működtetett** módra vannak állítva
- A gyermekeket a biztonsági kódot tartalmazó, nyomtatott átvételi címkével kell [bejelentkeztetni](./completing-checkin)
- Az üzenetküldéshez és a vészhelyzeti közleményekhez a gyülekezetnek össze kell kötnie egy SMS-szolgáltatót a B1 Adminban

</div>

## Kijelentkezés indítása

1. Személyzettel működtetett állomáson koppintson a **Kijelentkezés** gombra a keresési képernyőn.
2. Írja be a család átvételi címkéjén lévő 4 karakteres **biztonsági kódot**. Begépelheti, használhatja a képernyőn megjelenő billentyűzetet, vagy USB- vagy Bluetooth-vonalkódolvasóval beolvashatja a címke vonalkódját. A kód automatikusan elküldésre kerül, amint mind a 4 karaktert megadta.
   - Nincs vonalkódolvasója? Koppintson a kódmező alatti **Beolvasás** gombra, hogy a táblagép kameráját használja. Tartsa az átvételi címke QR-kódját vagy vonalkódját a kamera elé a **Átvételi kód beolvasása** ablakban, és a kód automatikusan kitöltődik. Alapértelmezés szerint a hátsó kamera működik. A váltógombra koppintva kamerát válthat, a **Mégse** gombbal pedig visszatérhet a gépeléshez.
3. A kioszk megjeleníti a kód alatt bejelentkeztetett gyermekeket.

## Az átvevő személyének ellenőrzése

A kijelentkezési képernyő megkérdezi, ki viszi haza a gyermekeket:

- A háztartáshoz tartozó **megbízható átvevők** fényképpel és rokonsági fokkal megjelenő, koppintható kártyákként láthatók. Koppintson arra a személyre, aki előtte áll.
- A **háztartási felnőttek** is fényképes rácsban jelennek meg.
- Az **Egyéb** lehetőséggel a listán nem szereplő személy nevét írhatja be.

Ha a beírt név egy olyan személyével egyezik, akit az adott háztartásnál **Nem jogosult** jelöléssel láttak el, a kioszk figyelmeztetéssel blokkolja a kijelentkezést. Egy munkatárs a **Felülbírálás** lehetőséget választva mégis folytathatja a műveletet. A felülbírálás a személy nevével együtt rögzítésre kerül a részvételi bejegyzésen.

Miután az átvevőt megerősítette, koppintson a kijelentkezésre. Az átvevő neve a részvételi bejegyzéshez kerül mentésre.

:::info
A megbízható és a nem jogosult átvevőket az egyházi munkatársak kezelik az egyes személyek oldalán a B1 Adminban. Lásd: [Bejelentkezési biztonság](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Szülő értesítése

Szükség van a szülőre az istentisztelet alatt? Pelenkázás, sírós gyermek? A kijelentkezési képernyőről, személyzettel működtetett állomáson a munkatársak **üzenetet** küldhetnek: SMS-t a gyermek szüleinek vagy gondviselőinek a gyülekezet SMS-szolgáltatóján keresztül. Azok a szülők, akik lemondták az SMS-eket, vagy akiknek nincs mobilszámuk, kimaradnak. A kioszk megjeleníti, hány üzenet ment ki.

## Címkék újranyomtatása

Ha névkitűző vagy átvételi címke elveszett vagy megsérült, a munkatársak egy személyzettel működtetett állomáson, a kijelentkezési képernyőn, a biztonsági kód megadása után **újranyomtathatják** a család címkéit. Az újranyomtatás ugyanazt a nyomtatót és címkesablonokat használja, mint az eredeti bejelentkezés.

## Vészhelyzeti közlemény

Vészhelyzetben a munkatársak egyszerre SMS-t küldhetnek az aktuális istentiszteleten **bejelentkeztetett minden gyermek** gondviselőinek:

1. Nyissa meg a kioszk **adminisztrációs beállításait** (7 gyors koppintás a fejléc logóján, és a PIN-kód, ha be van állítva).
2. Koppintson a **Vészhelyzeti közlemény** gombra.
3. Írja be az üzenetet, majd a megerősítő mezőbe gépelje be: **VÉSZHELYZET**. A **Közlemény küldése** gomb addig inaktív marad, amíg ezt meg nem tette.
4. A kioszk jelenti, hány telefon kapta meg az üzenetet, és hány személy maradt ki (lemondták, vagy nincs mobilszámuk).

:::warning
A közlemény a kiválasztott istentiszteleten bejelentkeztetett minden háztartásba eljut. Csak valódi vészhelyzetben használja, például evakuálás, zárlat vagy súlyos időjárás esetén.
:::

## Kapcsolódó cikkek

- [Bejelentkezés befejezése](./completing-checkin): honnan származnak a biztonsági kódok és az átvételi címkék
- [Bejelentkezési biztonság](../../b1-admin/attendance/checkin-safety): kapacitások, arányok, átvevők és az SMS-szolgáltatóra vonatkozó követelmény beállítása
- [Nyomtató beállítása](../getting-started/printer-setup): címkenyomtató konfigurálása
