---
title: "Psaní blogových příspěvků pro web v B1 Admin"
sidebar_label: "Blog"
description: "Vytvářejte, plánujte a publikujte blogové příspěvky na webu církve v B1 Admin, včetně perexů, kategorií, štítků, záhlavních fotek a vkládání komentářů."
---

# Blog

<div class="article-intro">

Stránka Blog slouží k publikování novinek, aktualizací a zamyšlení na webu vaší církve. Příspěvky se zobrazují jako seznam karet na adrese `/blog`, každý na vlastní URL adrese a také v kanálu RSS, který mohou sledovat další nástroje (například Zapier) a reagovat na nové příspěvky.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [počáteční nastavení](./initial-setup.md) svého webu
- Pokud chcete, aby návštěvníci našli váš blog v menu, přidejte odkaz na `/blog` ze stránky [Správa stránek](./managing-pages.md)

</div>

## Přístup k blogu

1. V aplikaci B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu) a rozbalte položku **Website**.
2. Klikněte na **Blog**.
3. Stránka Blog zobrazuje všechny příspěvky spolu s jejich stavem a datem publikování.

## Přidání příspěvku

1. Klikněte na **Add Post** v pravém horním rohu.
2. Zadejte **Title**. Při psaní se automaticky vytvoří **Web address** (slug) vhodný pro URL. Pokud chcete jinou adresu, můžete ji přímo upravit.
3. Přidejte **Excerpt** – krátké shrnutí, které se zobrazuje ve výpisu příspěvků, v meta popisech a v kanálu RSS. Pokud pole necháte prázdné, vytvoří se automaticky z začátku obsahu příspěvku.
4. Napište text příspěvku v editoru **Content** pomocí Markdownu. Kliknutím na **Preview** zobrazíte, jak bude naformátovaný příspěvek vypadat.
5. Vyberte **Category** (existující nebo zadejte novou) a volitelně zadejte **Tags** oddělené čárkami.
6. Kliknutím na **Select Image** vyberte fotografii z galerie [Soubory](./files.md), nebo nahrajte novou. Nahrané fotografie se otevřou ve vestavěném nástroji pro ořez s pevným poměrem 16:9, takže můžete libovolnou fotku upravit tak, aby se hodila do záhlaví příspěvku i do karet ve výpisu.
7. Nastavte **Author** – výchozí hodnotou jste vy, ale můžete vyhledat a vybrat kohokoli z databáze.
8. Až budete připraveni příspěvek zveřejnit, zapněte **Published** a nastavte **Publish Date**. Pokud chcete příspěvek uložit jako koncept, nechte přepínač vypnutý.

:::tip
Nastavením **Publish Date** v budoucnosti můžete příspěvek naplánovat. Až do daného data zůstane skrytý před návštěvníky a v seznamu blogu se zobrazí štítek **Scheduled**.
:::

## Stavy příspěvků

Každý příspěvek v seznamu má jeden ze tří stavů:

- **Draft** – Nepublikováno. Vidí jej pouze správci v administraci.
- **Scheduled** – Přepínač **Published** je zapnutý, ale datum publikování je v budoucnosti.
- **Published** – Zveřejněno na vašem webu a zahrnuto v kanálu RSS.

## Úpravy, náhled a mazání příspěvků

- Kliknutím na **Edit** vedle příspěvku provedete změny.
- Kliknutím na **View on Site** (zobrazeno u publikovaných příspěvků) otevřete živý příspěvek na webu v nové záložce.
- Kliknutím na **Delete** příspěvek trvale odstraníte.

## Jak návštěvníci vidí váš blog

Publikované příspěvky se zobrazují na adrese `{yoursite}/blog`, po 10 na stránku, s odkazy **Older**/**Newer** pro procházení archivu. Součástí je také filtr kategorií a u každého příspěvku jméno autora a fotografie. Štítky jsou rovněž klikatelné, takže návštěvníci mohou seznam filtrovat i podle nich. Jednotlivé příspěvky jsou na adrese `{yoursite}/blog/{slug}` a zahrnují související příspěvky ze stejné kategorie. Stránka blogu také publikuje kanál RSS, který mohou čtečky a automatizační nástroje jako Zapier automaticky najít.

:::info
Blogové příspěvky jsou jiný typ obsahu než běžné stránky webu. Nevytvářejí se v [editoru stránek](./page-editor.md) a neobjevují se v seznamu stránek. Díky tomu je psaní příspěvků rychlé a soustředěné na samotný text.
:::

## Přidání komentářů pod příspěvky

B1 nenabízí vlastní komentáře k blogu, ale můžete přidat externí službu pro komentáře. Pod každý příspěvek můžete vložit i cokoli jiného, například formulář pro odběr newsletteru nebo tlačítko pro dary.

1. Zaregistrujte se u služby pro komentáře, například [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) nebo [Disqus](https://disqus.com), a zkopírujte její vkládací kód.
2. Na stránce Blog přejděte dolů k sekci **Below Every Post**.
3. Vložte vkládací kód a klikněte na **Save**.

Kód se zobrazí pod obsahem každého publikovaného příspěvku. Moderování a filtrování spamu zajišťuje vaše služba pro komentáře, proto pravidelně kontrolujte její administraci.

:::tip
Vymazáním obsahu pole a kliknutím na **Save** kód odstraníte ze všech příspěvků. Toto pole vidí pouze uživatelé, kteří mohou upravovat nastavení církve.
:::

## Další kroky

- [Správa stránek](./managing-pages.md) – Přidání odkazu na blog do menu
- [Soubory](./files.md) – Nahrání fotografií pro použití v příspěvcích
- [Integrace se Zapier](../integrations/zapier.md) – Spouštění automatizací při zveřejnění nových příspěvků
