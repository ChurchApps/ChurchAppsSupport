---
title: "Počáteční nastavení"
---

# Počáteční nastavení

<div class="article-intro">

Každý účet B1 přichází s připraveným webem. Tento průvodce vás provede nastavením domény vaší církve, úpravou vzhledu webu, vytvořením prvních stránek a uspořádáním navigace.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete účet B1.church s administrátorským přístupem
- Pokud používáte vlastní doménu, připravte si přihlašovací údaje k poskytovateli DNS (např. GoDaddy, Cloudflare nebo AWS)
- Připravte si logo církve ve formátu PNG s průhledným pozadím, abyste dosáhli nejlepšího výsledku

</div>

## Nastavení domény

Vaše církev automaticky dostane subdoménu na B1.church (například `vaseckrev.b1.church`). Na svůj web B1 můžete také nasměrovat vlastní doménu.

1. Přejděte na **B1.church Admin** tak, že navštívíte admin.b1.church, nebo kliknete na rozbalovací nabídku profilu a zvolíte **Přepnout aplikaci**.
2. Otevřete [rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Nastavení** a klikněte na **Nastavení**.
3. Otevřete sekci **Informace o církvi**, kde uvidíte svou subdoménu. Nastavte ji na něco krátkého a snadno rozpoznatelného bez mezer.
4. Chcete-li použít vlastní doménu, přihlaste se ke svému poskytovateli DNS (například GoDaddy, Cloudflare nebo AWS) a přidejte dva záznamy:
   - Záznam **A** pro kořenovou doménu směřující na `3.23.251.61`
   - Záznam **CNAME** pro `www` směřující na `proxy.b1.church`
5. Vraťte se do B1.church Admin, na stejné stránce Nastavení otevřete sekci **Domény**, přidejte svou vlastní doménu do seznamu a klikněte na **Přidat** a poté na **Uložit**. Váš web bude dostupný přes vlastní doménu během několika minut.

:::tip
Pokud nevidíte možnost Nastavení, požádejte osobu, která nastavila účet vaší církve, aby vám udělila oprávnění „Upravit nastavení církve“. Podrobnosti najdete v článku [Role a oprávnění](../settings/roles-permissions.md).
:::

## Vytvoření první stránky

1. V B1 Admin otevřete [rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Web** a klikněte na **Stránky**.
2. Vpravo nahoře klikněte na **Přidat stránku**.
3. Jako typ stránky zvolte **Prázdná** a pojmenujte ji „Domů“.
4. Klikněte na **Nastavení stránky** a u domovské stránky nastavte cestu URL na `/` (lomítko bez dalšího textu). Ostatní stránky používají tvar `/nazev-stranky`.
5. Klikněte na **Upravit obsah** a začněte stránku vytvářet. Každá stránka musí začínat **sekcí**, která slouží jako kontejner pro všechny ostatní prvky.
6. Po přidání sekce znovu klikněte na **Přidat obsah** a vložte text, obrázky, videa, karty, formuláře a další prvky tak, že je přetáhnete do sekce.

:::info
Podrobné pokyny k práci se stránkami a navigací najdete v článku [Správa stránek](managing-pages). Úplného průvodce vizuálním editorem najdete v článku [Použití editoru stránek](page-editor).
:::

## Úprava vzhledu webu

1. V rychlé nabídce zvolte **Web > Vzhled**.
2. Pomocí **Barevné palety** nastavte barvy své značky pro primární, sekundární a zvýrazňující tóny.
3. V sekci **Písma** vyberte z prohlížeče písem font pro nadpisy a font pro běžný text.
4. V nastavení stylu nahrajte logo církve v sekci **Logo**. Nahrajte verzi pro světlé pozadí i verzi pro tmavé pozadí.
5. Nastavte **Patičku webu** s kontaktními údaji a odkazy vaší církve.

:::info
Změny provedené v sekci Vzhled se projeví na celém vašem webu. Podrobné pokyny k jednotlivým nastavením najdete na stránce [Vzhled](appearance).
:::

## Nastavení navigace

Odkazy navigace se zobrazují v zobrazení Stránky webu. Chcete-li je uspořádat:

1. Klikněte na **Přidat** a vytvořte nový odkaz v navigaci, který bude směřovat na jednu z vašich stránek.
2. Odkazy přetažením seřadíte nebo je vnoříte pod nadřazené položky.
3. Zobrazte náhled webu a ověřte, že navigace vypadá správně.

## Další kroky

- [Správa stránek](managing-pages) -- Podrobně se naučte pracovat se stránkami a navigací
- [Vzhled](appearance) -- Doladěte barvy, písma a rozvržení webu
- [Soubory](files) -- Nahrávejte obrázky a dokumenty pro svůj web
