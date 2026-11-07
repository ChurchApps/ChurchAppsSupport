---
title: "Ütemezett mód"
description: "FreePlay TV-k lejátszólistákat játszanak naptár szerint (FreePlay Admin): automatikus indulás és leállás, Wi-Fi-kiesésnél is folytatódó lejátszás."
---

# Ütemezett mód

<div class="article-intro">

Az ütemezett mód lehetővé teszi, hogy a FreePlay TV magától működjön. Lejátszási listákat állítasz össze, és ezeket a **FreePlay Adminban** ütemezed naptárba a [admin.freeplay.church](https://admin.freeplay.church) oldalon. Minden, a naptárhoz párosított TV letölti a következő hét tartalmát, és az ütemezés szerint, az órának megfelelően játssza le azt, anélkül hogy bárkinek meg kellene nyomnia a Start gombot. Mivel a fájlok már le vannak töltve, a lejátszás akkor is folytatódik, ha megszakad a Wi-Fi kapcsolat.

</div>

:::tip
A FreePlay Admin a ChurchApps-bejelentkezésedet használja, ugyanazt, amelyet a B1 Adminhoz is használsz. Nincs szükség külön fiók létrehozására.
:::

## Hogyan illeszkednek össze a részek

A FreePlay Adminnak négy fő oldala van, amelyek az oldal tetején találhatók:

- **[Képernyők](./managing-screens.md)** - A párosított TV-k, állapotuk és a **képernyőcsoportok**, amelyekhez tartoznak. Egy csoporton belüli képernyők egy közös naptárat és egy közös alapértelmezett hurkot használnak
- **[Lejátszási listák](./building-playlists.md)** - Képekből és videókból álló hurkok, amelyeket a tartalomszolgáltatóid közül választasz ki
- **[Naptár](./scheduling-the-calendar.md)** - Hogy mit és mikor játszik le az egyes képernyőcsoportok
- **[Szolgáltatók](./building-playlists.md#connecting-providers)** - Azok a tartalomforrások, ahonnan a lejátszási listáid az anyagot húzzák. Mindegyiket egyszer kell csatlakoztatnod az egész gyülekezet számára

Ha semmi nincs ütemezve, a csoport képernyői az **alapértelmezett hurkukat** játsszák le. Ha a csoportnak nincs alapértelmezett hurka, a képernyők elsötétülnek.

## Különbség a tervezési módtól

- A **[Tervezési mód](../plan-mode/index.md)** a B1 Adminból egyetlen istentiszteleti tervtípust követ. Valaki megnyomja a **Terv indítása** gombot a TV-n, és a lecke akkor kezd el futni, amikor ezt megteszik
- Az **ütemezett mód** egy naptárat követ. A tartalom a megadott időpontokban indul és áll le, ezért jól működik gyülekezeti terem kijelzőkhöz, bejelentési hurkokhoz és olyan osztálytermekhez, ahol a leckének már a belépés előtt ki kell lennie vetítve

Egy naptárbejegyzés továbbra is játszhat istentiszteleti tervet. Az ütemezés hozzáadásakor a **Istentiszteleti tervek** alatt válaszd ki a tervtípust, és a képernyő azt a tervet játssza le, amely az adott héten a B1 Adminban aktuális. Ide tartoznak a Go Curriculum leckék is, még azok is, amelyeket a tervben testreszabtál. A képernyő a tervtípus szolgálatához a B1 Adminban csatolt Go Curriculum-bejelentkezést használja, vagy ha a szolgálathoz nincs ilyen, a gyülekezet Go Curriculum-kapcsolatát.

## Első lépések

Amíg nem végzed el mindegyik lépést, a **Képernyők** oldalon egy **Első lépések** ellenőrzőlista látható, minden lépéshez hivatkozással:

1. **Szolgáltató csatlakoztatása** - Kapcsold össze a Dropboxot, a OneDrive-ot, a Lessons.churchöt vagy más forrást a **Szolgáltatók** oldalon
2. **Lejátszási lista összeállítása** - Válassz képeket és videókat egy szolgáltatóról
3. **Helyezd a naptárba** - Válaszd ki, mit mikor játsszon le, vagy állíts be alapértelmezett hurkot a csoportnak
4. **Képernyő párosítása** - Add meg a TV-n látható négybetűs kódot

Kattints az **Elrejtés** gombra az ellenőrzőlista bezárásához.

:::tip
Nyomd meg a **Ctrl+K** billentyűkombinációt (Mac-en a **⌘K**), vagy kattints a fejlécben lévő keresőmezőre a parancspaletta megnyitásához. Innen bármelyik oldalra ugorhatsz, vagy elindíthatsz egy műveletet, például a **Képernyő párosítása**, a **Lejátszási lista hozzáadása** vagy a **Ütemezés hozzáadása** műveletet.
:::

## Ebben a szakaszban

- **[Képernyő párosítása](./pairing-a-screen.md)** - Jelenítsd meg a kódot a TV-n, és párosítsd a FreePlay Adminban
- **[Képernyők és csoportok kezelése](./managing-screens.md)** - Ellenőrizd az állapotot és a letöltéseket, és rendezd a képernyőket csoportokba
- **[Szolgáltatók csatlakoztatása és lejátszási listák összeállítása](./building-playlists.md)** - Kapcsold össze a tartalomforrásokat, és állíts össze képekből és videókból álló hurkokat
- **[A naptár ütemezése](./scheduling-the-calendar.md)** - Döntsd el, mit mikor játsszon le, és mi történjen, ha a tartalom korábban fejeződik be
- **[Ütemezett lejátszás a TV-n](./scheduled-playback.md)** - Mit csinál a TV magától, és hogyan használd a távirányítót lejátszás közben
