---
title: "Časy živých přenosů a nastavení v B1 Admin"
sidebar_label: "Live Streaming"
description: "Naplánujte týdenní i jednorázové živé přenosy, nastavte čas chatu a videa, propojte kanál YouTube a řešte vkládání v B1 Admin."
---

# Živé vysílání

<div class="article-intro">

Stránka Časy živého vysílání vám umožňuje nastavit harmonogram streamování vaší církve, spravovat časy bohoslužeb a přizpůsobit prostředí pro diváky. Nastavte opakující se týdenní bohoslužby nebo jednorázové události, nakonfigurujte nastavení chatu a videa a určete, kdy se vaše vysílání spustí.

</div>

## Školicí video

<YouTube id="tpEY-sEYW6A" title="Nastavení živého vysílání v B1" next="Přizpůsobení aplikace pro členy vaší církve v B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění **contentApi.streamingServices.edit**. Pokud k němu nemáte přístup, podívejte se na [Role a oprávnění](../settings/roles-permissions.md).
- Pokud plánujete automatické živé vysílání, připravte si ID vašeho kanálu YouTube
- Přidejte alespoň jedno [kázání](./managing-sermons.md) nebo trvalou adresu URL živého vysílání jako zdroj streamu

</div>

Živé vysílání se spravuje ze dvou stránek v sekci **Kázání** v nabídce Jump: **Časy živého vysílání** pro správu harmonogramu živého vysílání a **Nastavení** pro konfiguraci záložek na vaší streamovací stránce.

## Správa bohoslužeb

### Přidání bohoslužby

1. V aplikaci B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Kázání** a klikněte na **Časy živého vysílání**.
2. Kliknutím na tlačítko **Přidat bohoslužbu** v horní části stránky vytvoříte novou naplánovanou bohoslužbu. Existující bohoslužby jsou uvedeny v tabulce, která zobrazuje název, čas, poskytovatele a délku každé bohoslužby; chcete-li ji změnit, klikněte na ikonu úprav u příslušného řádku.
3. Zadejte **název bohoslužby** (například „Nedělní dopoledne“).
4. Nastavte **čas bohoslužby** – vyberte den a čas, kdy bohoslužba začíná.
5. Nastavte **Opakovat každý týden** na **Ano** u pravidelných týdenních bohoslužeb, nebo na **Ne** u jednorázové události.

### Nastavení chatu a videa

6. V části **Nastavení chatu** nastavte, kolik minut před a po bohoslužbě má být chat povolen. Návštěvníci tak mohou začít chatovat před zahájením bohoslužby a pokračovat po jejím skončení.
7. V části **Nastavení videa** nastavte, jak brzy má začít video stream pro odpočet nebo obsah před bohoslužbou. Chat se otevře o tolik minut *před* začátkem včasného videa, takže čas zobrazený vedle nastavení minut před bohoslužbou v chatu zahrnuje obě hodnoty. Například u bohoslužby v 10:00 s 15 minutami chatu před ní a včasným startem 5 minut se chat otevře v 9:40.
8. Z rozbalovacího seznamu vyberte kázání, které se má přehrát:
   - **Nejnovější kázání** – automaticky přehraje vaše nejnověji přidané video.
   - **Aktuální živá bohoslužba** – přehraje vaše aktuální živé vysílání z YouTube pomocí ID vašeho kanálu.
   - Můžete také vybrat libovolné konkrétní kázání, které jste již uložili.
9. Kliknutím na **Uložit** naplánujete bohoslužbu.

:::info
Pokud je bohoslužba nastavena jako opakující se, bude se každý týden automaticky aktualizovat. Zachovává stejný místní čas i při začátku nebo konci letního času. Můžete přidat tolik bohoslužeb, kolik potřebujete. Návštěvníci uvidí čas další naplánované bohoslužby, až navštíví vaši streamovací stránku.
:::

## Nastavení streamovací stránky

Chcete-li upravit záložky a odkazy, které se zobrazují vedle vašeho živého vysílání, otevřete nabídku Jump, rozbalte **Kázání** a klikněte na **Nastavení**. Stránka **Nastavení streamu** zobrazuje seznam vašich **Záložek obsahu**.

### Přidání záložek

1. Kliknutím na tlačítko **Přidat** přidáte na stránku živého vysílání novou záložku.
2. Zvolte **Typ odkazu**: **Externí URL** pro vlastní odkaz, nebo jednu z předem připravených záložek **Chat** nebo **Modlitba**.
3. U záložky Chat stačí zadat název do pole **Text záložky** a nastavení je hotové.
4. U záložky s odkazem zadejte název záložky, vyberte ikonu kliknutím na tlačítko ikony a zadejte URL.
5. Nakonfigurované záložky se zobrazí na stránce živého vysílání, aby k nim diváci mohli získat přístup a využít další zdroje a interaktivní funkce.

### Náhled vašeho vysílání

Na stránce **Časy živého vysílání** klikněte na **Zobrazit vaše vysílání** v horní části stránky a uvidíte přesně, jak bude vaše stránka živého vysílání vypadat pro návštěvníky, včetně loga, časů bohoslužeb a nakonfigurovaných záložek.

## Nastavení živého vysílání na YouTube

Chcete-li propojit svůj kanál YouTube pro automatické živé vysílání:

1. Přejděte do **Kázání** a klikněte na **Přidat kázání**, poté vyberte **Přidat trvalou adresu URL živého vysílání**.
2. Poskytovatel videa je výchozí nastaven na **Aktuální živé vysílání z YouTube**. Zadejte své **ID kanálu YouTube**.
3. Přidejte název a popis a klikněte na **Uložit**.
4. V **Časy živého vysílání** vytvořte bohoslužbu a z rozbalovacího seznamu kázání vyberte svou trvalou adresu URL živého vysílání.

:::tip
ID kanálu YouTube najdete v pokročilém nastavení svého kanálu na YouTube – zkopírujte hodnotu ID kanálu.
:::

## Přizpůsobení barev a loga

Vaše stránka živého vysílání používá nastavení [Vzhled](../website/appearance.md) vašich webových stránek:

- Pro záhlaví se používá **světlá zvýrazňující barva** s tmavým textem.
- Pro postranní panel se používá **tmavá zvýrazňující barva** se světlým textem.
- Vaše **logo pro světlé pozadí** se zobrazí na streamovací stránce. Použijte obrázek s průhledným pozadím a poměrem stran 4:1.

Chcete-li tato nastavení změnit, přejděte na **Web** a poté na **Vzhled** a upravte nastavení [Barevné schéma](../website/appearance.md#color-palette) a [Logo](../website/appearance.md#logo-and-branding).

## Přidání hostitelů streamu

Chcete-li týmovým členům umožnit přístup k chatu pouze pro hostitele vedle veřejného chatu:

1. V nabídce Jump zvolte **Nastavení > Role**.
2. Klikněte na tlačítko plus a vyberte **Přidat vlastní roli**.
3. Pojmenujte roli „Hostitel streamu“ a klikněte na **Uložit**.
4. Klikněte na novou roli a poté v sekci Členové klikněte na **Přidat**, abyste přidali osoby.
5. Přejděte dolů na **Upravit oprávnění**, rozbalte sekci **Obsah** a zaškrtněte **Chat pro hostitele**.

Když se hostitelé přihlásí na stránku živého vysílání, vedle veřejného chatu se objeví soukromá záložka **Chat pro hostitele** pro konverzaci pouze pro zaměstnance během vysílání.

:::info
Další podrobnosti o vytváření rolí a správě oprávnění najdete v článku [Role a oprávnění](../settings/roles-permissions.md).
:::

## Řešení potíží

Pokud se vaše automatické živé vysílání na YouTube nezobrazuje správně při použití možnosti „Aktuální živé vysílání z YouTube“ s ID vašeho kanálu, zkuste následující:

**Příznaky:**
- Vložené živé vysílání zobrazuje „Video není k dispozici“
- Stránka se načte, ale žádné video se nezobrazí
- Přímé vložení z YouTube funguje, ale automatické živé vysílání z kanálu nikoli

**Řešení:**
Zkontrolujte svůj kanál YouTube, zda neobsahuje staré nebo nadcházející naplánované živé přenosy, a smažte je:

1. Přejděte do YouTube Studia.
2. Otevřete **Obsah** a poté **Živě**.
3. Vyhledejte všechny staré naplánované živé přenosy nebo nadcházející naplánované streamy.
4. Smažte tyto staré nebo naplánované záznamy živých přenosů.
5. Znovu otestujte stránku živého vysílání.

:::warning
Automatické vložení živého vysílání kanálu na YouTube může být zablokováno, pokud je ve vašem kanálu více naplánovaných nebo minulých živých přenosů. Jejich odstranění umožní YouTube správně identifikovat a přehrát váš aktuální živý přenos.
:::

**Další požadavky:**
- Váš živý přenos musí být nastaven na **Veřejný** (ne Nezveřejněný nebo Soukromý).
- Vkládání musí být povoleno v nastavení streamů na YouTube.
- Ujistěte se, že používáte poskytovatele **Aktuální živé vysílání z YouTube** (s ID kanálu), nikoli poskytovatele **YouTube** (s ID videa).

## Další kroky

- [Správa kázání](./managing-sermons.md) – přidávejte kázání do své knihovny
- [Playlisty](./playlists.md) – uspořádejte kázání do sérií
