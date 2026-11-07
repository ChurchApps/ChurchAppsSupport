---
title: "Igehirdetések kezelése"
description: "Igehirdetési könyvtár kezelése a B1 Adminban: YouTube, Vimeo vagy Facebook igehirdetések hozzáadása, részletek szerkesztése és podcast-hírcsatorna."
---

# Igehirdetések kezelése

<div class="article-intro">

Az Igehirdetések oldalon jelenik meg a teljes igehirdetés-gyűjteményed. Itt új igehirdetéseket adhatsz hozzá, meglévő bejegyzéseket szerkeszthetsz, és lejátszási listák szerint rendezheted a tartalmaidat. Minden igehirdetés hivatkozhat a YouTube, a Vimeo, a Facebook vagy egy egyéni URL-cím alatt tárolt videóra vagy hangfelvételre.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdenéd</h4>

- Szükséged van a **contentApi.streamingServices.edit** jogosultságra. Ha nincs hozzáférésed, nézd meg a [Szerepkörök és jogosultságok](../settings/roles-permissions.md) oldalt.
- Hozz létre legalább egy [lejátszási listát](./playlists.md), amelybe az igehirdetéseket rendezheted
- Készítsd elő a videóazonosítóidat vagy URL-címeidet a YouTube-ról, a Vimeóról vagy a Facebookról

</div>

## Az igehirdetés-gyűjtemény megtekintése

1. A B1 Adminban nyisd meg az [Ugrás menüt](../introduction.md#getting-around-with-the-jump-menu) (a keresősáv a bal felső sarokban), bontsd ki a **Sermons** menüpontot, majd kattints a **Sermons** elemre.
2. Az Igehirdetések oldalon a bejegyzések táblázatban jelennek meg, minden igehirdetésnél feltüntetve a **Playlist**, a címet és a **Publish Date** értéket. A táblázat fölötti keresőmezővel szűrheted a listát. A lejátszási listáid a táblázat melletti **Playlists** panelen találhatók.
3. Kattints bármelyik igehirdetés sorában az **Edit** gombra a részletek megtekintéséhez vagy szerkesztéséhez.

## Igehirdetés hozzáadása

1. Kattints a jobb felső sarokban található **Add Sermon** gombra, majd válaszd az **Add Sermon** lehetőséget a legördülő menüből.
2. Válassz egy **Playlist** elemet, amelyhez hozzárendeled az igehirdetést.
3. Válaszd ki a **Video Provider** szolgáltatót: YouTube, Vimeo, Facebook vagy Custom URL. A YouTube-ot javasoljuk, mert ezzel működik legjobban a B1 rendszer.
4. Add meg a videóazonosítót vagy az URL-címet, majd kattints a **Fetch** gombra. YouTube esetén a videóazonosító a YouTube-URL-ben a `v=` után álló karaktersorozat.
5. A **Fetch** gombra kattintva az igehirdetés adatai automatikusan importálódnak, beleértve a közzétételi dátumot, a hosszúságot, a címet, a leírást és a bélyegképet.
6. Végezd el a kívánt módosításokat, majd kattints a **Save** gombra.

:::tip
Állandó élő közvetítési URL-t is megadhatsz, ha az **Add Sermon** legördülő menüben az **Add Permanent Live URL** lehetőséget választod. Ez a YouTube-csatornád élő közvetítéséhez állandó kapcsolatot hoz létre a csatornaazonosítód segítségével. További részletekért lásd: [Élő közvetítés](./live-streaming.md).
:::

## Igehirdetés szerkesztése

1. Kattints a gyűjteményedben bármelyik igehirdetés sorában az **Edit** gombra a részletek megnyitásához.
2. Szükség szerint frissítsd a címet, az előadót, a dátumot, a leírást, a bélyegképet vagy a médiahivatkozásokat.
3. Kattints a **Save** gombra a módosítások mentéséhez.

## Az igehirdetés részletei

Minden igehirdetés bejegyzése tartalmazhatja a következőket:

- **Title** – A látogatóknak megjelenő igehirdetés-cím
- **Speaker** – Aki az igehirdetést tartotta
- **Date** – A közzétételi vagy elhangzási dátum
- **Description** – Az igehirdetés tartalmának összefoglalása
- **Thumbnail** – Az előnézeti kép, amely az igehirdetés-gyűjteményedben látszik
- **Video/Audio Links** – Az igehirdetés médiafájljaira mutató URL-címek a YouTube-on, a Vimeón, a Facebookon vagy egy egyéni tárhelyen
- **Audio File URL (for podcast)** – Az igehirdetéshez tartozó MP3/M4A fájl közvetlen hivatkozása. Beillesztheted az URL-címet, vagy kattinthatsz az **Upload Audio** gombra egy fájl feltöltéséhez, amely automatikusan kitöltődik. Csak azok az igehirdetések kerülnek be a podcast-hírfolyamba, amelyeknél ez a mező (vagy közvetlen videófájl-hivatkozás) meg van adva.

## A podcast-hírfolyamod

Amint legalább egy igehirdetéshez hangfelvétel vagy videófájl kapcsolódik, a B1 Admin automatikusan létrehoz egy podcast RSS-hírfolyamot a gyülekezeted számára – ehhez nincs szükség külön beállításra. A hírfolyamot az igehirdetéslista alatti **Podcast Feed** panelen találod: kattints a másolás ikonra a hírfolyam URL-címének másolásához, majd küldd be ezt az URL-t az Apple Podcastsnek, a Spotify-nak vagy bármely más podcast-könyvtárnak.

:::info
Azok az igehirdetések, amelyek csak beágyazott lejátszóra mutatnak (például egy YouTube- vagy Vimeo-videóazonosító), nem jelennek meg a podcast-hírfolyamban, mert a podcast-alkalmazásokhoz közvetlenül letölthető médiafájl szükséges. Az igehirdetés belefoglalásához adj meg egy **Audio File URL** értéket.
:::

## Igehirdetés ütemezése élő közvetítéshez

Az igehirdetés hozzáadása után ütemezheted a közvetítésre az élő közvetítési oldaladon:

1. Az Ugrás menüben válaszd a **Sermons > Live Stream Times** lehetőséget.
2. Szerkessz egy istentiszteletet, és a **Video Settings** alatt válaszd ki a legördülő menüből az igehirdetést.
3. Az igehirdetés az ütemezett istentiszteleti időpontban fog lejátszódni.

:::info
Ha egyszerre több igehirdetést szeretnél importálni, ahelyett hogy egyenként adnád hozzá őket, használd a [Tömeges importálás](./bulk-import.md) eszközt, amellyel a videókat közvetlenül a YouTube- vagy Vimeo-fiókodból húzhatod be.
:::

## Következő lépések

- [Lejátszási listák](./playlists.md) – Igehirdetések rendezése sorozatokba
- [Élő közvetítés](./live-streaming.md) – A közvetítési menetrended beállítása
- [Tömeges importálás](./bulk-import.md) – Több igehirdetés importálása egyszerre
