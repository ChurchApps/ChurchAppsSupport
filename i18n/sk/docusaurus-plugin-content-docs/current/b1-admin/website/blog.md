---
title: "Blog"
---

# Blog

<div class="article-intro">

Stránka Blog vám umožňuje publikovať novinky, aktualizácie a duchovné zamyslenia na webovú stránku vašej cirkvi. Príspevky sa zobrazujú ako prehľad kariet na adrese `/blog`, na vlastnej URL adrese a v kanáli RSS, ktorý môžu iné nástroje (napríklad Zapier) sledovať kvôli novým príspevkom.

</div>

<div class="prereqs">
<h4>Prv než začnete</h4>

- Dokončite [Počiatočné nastavenie](initial-setup) pre vašu webovú stránku
- Ak chcete, aby návštevníci našli váš blog v menu, pridajte odkaz na `/blog` v [Správe stránok](managing-pages)

</div>

## Prístup k blogu

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel vľavo hore) a rozbaľte **Webová stránka**.
2. Kliknite na **Blog**.
3. Stránka Blog zobrazuje všetky príspevky spolu s ich stavom a dátumom publikovania.

## Pridanie príspevku

1. Kliknite na **Pridať príspevok** v pravom hornom rohu.
2. Zadajte **Názov**. Počas písania sa automaticky vytvorí **Webová adresa** (slug) vhodná pre URL. Ak chcete inú adresu, môžete ju priamo upraviť.
3. Pridajte **Úryvok** -- krátke zhrnutie, ktoré sa zobrazuje v prehľade príspevkov, v meta popisoch a v kanáli RSS. Ak ho necháte prázdne, automaticky sa vytvorí z úvodu obsahu príspevku.
4. Napíšte telo príspevku v editore **Obsah** pomocou Markdownu. Kliknutím na **Náhľad** zobrazíte, ako bude formátovaný príspevok vyzerať.
5. Vyberte **Kategóriu** (existujúcu alebo napíšte novú) a voliteľne **Značky** oddelené čiarkami.
6. Kliknite na **Vybrať obrázok**, aby ste vybrali fotografiu z galérie [Súbory](files), alebo nahrajte novú. Nahrané fotografie sa otvoria v zabudovanom nástroji na orezanie uzamknutom na pomer 16:9, takže môžete ľubovoľnú fotografiu upraviť tak, aby sa hodila do hlavičky príspevku a kariet v prehľade.
7. Nastavte **Autora** -- predvolene ste to vy, ale môžete vyhľadať a vybrať ľubovoľnú osobu z vašej databázy.
8. Keď budete pripravení zverejniť príspevok, zapnite **Publikované** a nastavte **Dátum publikovania**. Ak ho necháte vypnuté, príspevok sa uloží ako koncept.

:::tip
Nastavte **Dátum publikovania** na budúci dátum, aby ste naplánovali príspevok. Až do tohto dátumu zostane skrytý pre návštevníkov a v zozname blogu sa zobrazí štítok **Naplánované**.
:::

## Stavy príspevkov

Každý príspevok v zozname zobrazuje jeden z troch stavov:

- **Koncept** -- Nepublikovaný. Viditeľný iba v administrácii.
- **Naplánovaný** -- Publikovanie je zapnuté, ale dátum publikovania je v budúcnosti.
- **Publikovaný** -- Živý na vašej webovej stránke a zahrnutý v kanáli RSS.

## Úprava, náhľad a mazanie príspevkov

- Kliknutím na **Upraviť** vedľa príspevku ho zmeníte.
- Kliknutím na **Zobraziť na webe** (zobrazuje sa pri publikovaných príspevkoch) otvoríte živý príspevok na vašej webovej stránke v novej karte.
- Kliknutím na **Vymazať** trvalo odstránite príspevok.

## Ako návštevníci vidia váš blog

Publikované príspevky sa zobrazujú na `{yoursite}/blog`, po 10 na stránke, s odkazmi **Staršie**/**Novšie** na listovanie v archíve, spolu s filtrom kategórií a autorom a fotografiou každého príspevku. Značky sa zobrazujú aj ako klikateľné štítky, takže návštevníci môžu zoznam filtrovať podľa značky rovnakým spôsobom. Jednotlivé príspevky sú na `{yoursite}/blog/{slug}` a obsahujú súvisiace príspevky z tej istej kategórie. Stránka blogu tiež publikuje kanál RSS, ktorý čítačky kanálov a automatizačné nástroje ako Zapier dokážu automaticky nájsť.

:::info
Blogové príspevky sú iný typ obsahu ako bežné stránky webu -- nevytvárajú sa v [editore stránok](page-editor) a nezobrazujú sa v zozname stránok. Vďaka tomu je písanie blogu rýchle a sústredené na samotný text.
:::

## Pridanie komentárov pod príspevky

B1 nehostuje komentáre k blogu sám, ale môžete pridať službu na komentáre. Pod každý príspevok môžete umiestniť aj čokoľvek iné, napríklad prihlásenie na newsletter alebo tlačidlo na darovanie.

1. Zaregistrujte sa do služby na komentáre, ako je [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) alebo [Disqus](https://disqus.com), a skopírujte jej vkladací kód.
2. Na stránke Blog prejdite nadol k **Pod každým príspevkom**.
3. Vložte vkladací kód a kliknite na **Uložiť**.

Kód sa zobrazí pod obsahom každého publikovaného príspevku. Vaša služba na komentáre zabezpečuje moderovanie a filtrovanie spamu, preto pravidelne kontrolujte jej správu.

:::tip
Vymažte obsah poľa a kliknite na **Uložiť**, aby sa kód odstránil zo všetkých príspevkov. Toto pole vidia iba ľudia, ktorí môžu upravovať nastavenia cirkvi.
:::

## Ďalšie kroky

- [Správa stránok](managing-pages) -- Pridanie odkazu na váš blog do navigácie
- [Súbory](files) -- Nahrajte fotografie na použitie vo vašich príspevkoch
- [Integrácia so Zapier](../integrations/zapier.md) -- Spúšťajte automatizácie pri publikovaní nových príspevkov
