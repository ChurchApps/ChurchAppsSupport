---
title: "Správa kázání"
description: "Spravujte knihovnu kázání v B1 Admin: přidávejte kázání z YouTube, Vimeo nebo Facebooku, upravujte detaily a získejte podcastový kanál pro vaši církev."
---

# Správa kázání

<div class="article-intro">

Stránka Kázání zobrazuje celou vaši knihovnu kázání. Odtud můžete přidávat nová kázání, upravovat stávající záznamy a organizovat obsah podle playlistů. Každé kázání může odkazovat na video nebo audio hostované na YouTube, Vimeo, Facebooku nebo na vlastní URL.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění **contentApi.streamingServices.edit**. Pokud k němu nemáte přístup, podívejte se na [Role a oprávnění](../settings/roles-permissions.md).
- Vytvořte alespoň jeden [playlist](./playlists.md), do kterého kázání zařadíte
- Připravte si ID videí nebo URL z YouTube, Vimeo nebo Facebooku

</div>

## Zobrazení knihovny kázání

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Kázání** a klikněte na **Kázání**.
2. Stránka Kázání zobrazuje záznamy kázání v tabulce, u každého kázání s jeho **playlistem**, názvem a **datem zveřejnění**. K filtrování seznamu použijte vyhledávací pole nad tabulkou. Vaše playlisty jsou uvedeny v panelu **Playlisty** vedle tabulky.
3. Kliknutím na **Upravit** u libovolného řádku kázání zobrazíte nebo upravíte jeho podrobnosti.

## Přidání kázání

1. Klikněte na tlačítko **Přidat kázání** v pravém horním rohu a v rozbalovací nabídce vyberte **Přidat kázání**.
2. Vyberte **Playlist**, do kterého chcete kázání zařadit.
3. Zvolte **Poskytovatele videa** -- YouTube, Vimeo, Facebook nebo vlastní URL. Doporučujeme YouTube, protože nejlépe funguje se systémem B1.
4. Zadejte ID videa nebo URL a klikněte na **Načíst**. U YouTube je ID videa řetězec znaků za `v=` v URL YouTube.
5. Po kliknutí na **Načíst** se údaje o kázání automaticky naimportují, včetně data zveřejnění, délky, názvu, popisu a miniatury.
6. Proveďte požadované úpravy a klikněte na **Uložit**.

:::tip
Trvalou URL živého přenosu můžete přidat také výběrem možnosti **Přidat trvalou URL živého přenosu** v rozbalovací nabídce **Přidat kázání**. Tím vznikne stálé připojení k živému přenosu vašeho kanálu YouTube pomocí ID vašeho kanálu. Podrobnosti najdete v článku [Živé vysílání](./live-streaming.md).
:::

## Úprava kázání

1. Kliknutím na **Upravit** u libovolného řádku kázání v knihovně otevřete jeho podrobnosti.
2. Podle potřeby upravte název, kazatele, datum, popis, miniaturu nebo odkazy na média.
3. Kliknutím na **Uložit** změny použijete.

## Podrobnosti kázání

Každý záznam kázání může obsahovat:

- **Název** -- Název kázání zobrazovaný návštěvníkům
- **Kazatel** -- Osoba, která kázání přednesla
- **Datum** -- Datum zveřejnění nebo přednesení
- **Popis** -- Shrnutí obsahu kázání
- **Miniatura** -- Náhledový obrázek zobrazený ve vaší knihovně kázání
- **Odkazy na video/audio** -- URL k médiím kázání na YouTube, Vimeo, Facebooku nebo na vlastním hostingu
- **URL audio souboru (pro podcast)** -- Přímý odkaz na soubor MP3/M4A pro toto kázání. Můžete vložit URL, nebo kliknout na **Nahrát audio** a soubor nahrát, čímž se pole vyplní automaticky. Do vašeho podcastového kanálu se zahrnou pouze kázání, u nichž je vyplněno toto pole (nebo přímý odkaz na video soubor).

## Váš podcastový kanál

Jakmile má alespoň jedno kázání připojený audio nebo video soubor, B1 Admin pro váš kostel automaticky vygeneruje podcastový RSS kanál. Není potřeba nic zapínat. Najdete ho v panelu **Podcastový kanál** pod seznamem kázání: kliknutím na ikonu kopírování zkopírujete URL kanálu a poté ji odešlete do Apple Podcasts, Spotify nebo jiného podcastového adresáře.

:::info
Kázání, která pouze odkazují na vložený přehrávač (například pomocí ID videa z YouTube nebo Vimeo), se v podcastovém kanálu nezobrazí. Podcastové aplikace potřebují přímý, stažitelný mediální soubor. Chcete-li kázání zahrnout, přidejte **URL audio souboru**.
:::

## Naplánování kázání pro živý přenos

Po přidání kázání ho můžete naplánovat k vysílání na stránce živého přenosu:

1. V nabídce Jump zvolte **Kázání > Časy živého přenosu**.
2. Upravte bohoslužbu a v části **Nastavení videa** vyberte své kázání z rozbalovací nabídky.
3. Kázání se přehraje v naplánovaný čas bohoslužby.

:::info
Pokud chcete naimportovat více kázání najednou místo jejich přidávání jednotlivě, použijte nástroj [Hromadný import](./bulk-import.md), který stáhne videa přímo z vašeho účtu YouTube nebo Vimeo.
:::

## Další kroky

- [Playlisty](./playlists.md) -- Uspořádejte kázání do sérií
- [Živé vysílání](./live-streaming.md) -- Nastavte si plán vysílání
- [Hromadný import](./bulk-import.md) -- Naimportujte více kázání najednou
