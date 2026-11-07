---
title: "Začíname s webstránkou B1 Admin"
sidebar_label: "Počiatočné nastavenie"
description: "Nastavte webstránku zboru v B1 Admin: priraďte subdoménu alebo vlastnú doménu, vytvorte domovskú stránku, vyberte farby značky a logo a zostavte navigáciu."
---

# Počiatočné nastavenie

<div class="article-intro">

Každý účet B1 obsahuje pripravenú webovú stránku. Tento návod vás prevedie nastavením domény vašej cirkvi, úpravou vzhľadu stránky, vytvorením prvých stránok a organizáciou navigácie.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete účet B1.church s administrátorským prístupom
- Ak používate vlastnú doménu, pripravte si prihlasovacie údaje k vášmu poskytovateľovi DNS (napr. GoDaddy, Cloudflare alebo AWS)
- Pre čo najlepší výsledok si pripravte logo cirkvi vo formáte PNG s priehľadným pozadím

</div>

## Nastavenie domény

Vaša cirkev automaticky dostane subdoménu na B1.church (napríklad `vasacirkev.b1.church`). Ku svojej webovej stránke B1 môžete pripojiť aj vlastnú doménu.

1. Prejdite na **B1.church Admin** tak, že navštívite admin.b1.church, alebo kliknete na rozbaľovaciu ponuku svojho profilu a vyberiete **Switch App**.
2. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Settings** a kliknite na **Settings**.
3. Otvorte sekciu **Church Information**, kde uvidíte svoju subdoménu. Nastavte ju tak, aby bola krátka a ľahko zapamätateľná, bez medzier.
4. Ak chcete použiť vlastnú doménu, prihláste sa k svojmu poskytovateľovi DNS (napríklad GoDaddy, Cloudflare alebo AWS) a pridajte dva záznamy:
   - Záznam **A** pre svoju koreňovú doménu smerujúci na `3.23.251.61`
   - Záznam **CNAME** pre `www` smerujúci na `proxy.b1.church`
5. Vráťte sa do B1.church Admin, na tej istej stránke Settings otvorte sekciu **Domains**, pridajte svoju vlastnú doménu do zoznamu a kliknite na **Add** a potom na **Save**. Vaša stránka bude dostupná z vlastnej domény počas niekoľkých minút.

:::tip
Ak nevidíte možnosť Settings, požiadajte osobu, ktorá nastavila účet vašej cirkvi, aby vám udelila oprávnenie „Upraviť nastavenia cirkvi“. Podrobnosti nájdete v časti [Roly a oprávnenia](../settings/roles-permissions.md).
:::

## Vytvorenie prvej stránky

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Website** a kliknite na **Pages**.
2. Kliknite na **Add Page** v pravom hornom rohu.
3. Ako typ stránky vyberte **Blank** a pomenujte ju „Domov“.
4. Kliknite na **Page Settings** a ako cestu URL domovskej stránky nastavte `/` (lomka bez ďalšieho textu). Ostatné stránky používajú formát `/nazov-stranky`.
5. Kliknutím na **Edit Content** začnite s tvorbou obsahu. Každá stránka musí začínať sekciou **Section** -- je to kontajner pre všetky ostatné prvky.
6. Po pridaní sekcie znova kliknite na **Add Content**, aby ste vložili text, obrázky, videá, karty, formuláre a ďalšie prvky presunutím do svojej sekcie.

:::info
Podrobné pokyny k práci so stránkami a navigáciou nájdete v časti [Správa stránok](./managing-pages.md). Úplného sprievodcu vizuálnym editorom nájdete v časti [Použitie editora stránok](./page-editor.md).
:::

## Nastavenie vzhľadu stránky

1. V ponuke Jump vyberte **Website > Appearance**.
2. Pomocou **Color Palette** nastavte farby svojej značky pre primárne, sekundárne a zvýrazňujúce tóny.
3. V časti **Fonts** vyberte nadpisové a textové písma z prehliadača písem.
4. V časti **Logo** v nastaveniach štýlu nahrajte logo svojej cirkvi. Poskytnite verziu pre svetlé aj tmavé pozadie.
5. Nakonfigurujte **Site Footer** s kontaktnými informáciami a odkazmi vašej cirkvi.

:::info
Zmeny, ktoré urobíte v sekcii Appearance, sa uplatnia na celú vašu webovú stránku. Podrobné pokyny k jednotlivým nastaveniam nájdete na stránke [Vzhľad](./appearance.md).
:::

## Nastavenie navigácie

Vaše navigačné odkazy sa zobrazujú v zobrazení Website Pages. Ak ich chcete usporiadať:

1. Kliknite na **Add** a vytvorte nový navigačný odkaz, ktorý bude smerovať na jednu z vašich stránok.
2. Odkazy presúvajte myšou, čím zmeníte ich poradie, alebo ich vnorte pod nadradené položky.
3. Zobrazte náhľad svojej stránky a overte, že navigácia vyzerá správne.

## Ďalšie kroky

- [Správa stránok](./managing-pages.md) -- Podrobne sa naučte pracovať so stránkami a navigáciou
- [Vzhľad](./appearance.md) -- Doladte farby, písma a rozloženie svojej stránky
- [Súbory](./files.md) -- Nahrajte obrázky a dokumenty pre svoju webovú stránku
