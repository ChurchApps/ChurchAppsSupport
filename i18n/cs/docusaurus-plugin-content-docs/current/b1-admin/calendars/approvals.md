---
title: "Schvalování kalendáře"
---

# Schvalování kalendáře

<div class="article-intro">

Stránka Schválení slouží administrátorům k prohlížení a vyřizování čekajících žádostí o rezervaci místností a zdrojů a také událostí v kalendáři, které musí být před zveřejněním schváleny.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte místnostem nebo zdrojům **skupinu schválení** (Approval Group) v sekci [Místnosti a zdroje](rooms-resources)
- Potřebujete oprávnění **Správce kalendářů** (Calendars Admin) nebo oprávnění **content.edit**

</div>

## Otevření schválení

V aplikaci B1 Admin otevřete [Rychlý přechod](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Kalendáře** a klikněte na **Schválení**. Zde jsou uvedeny čekající žádosti o rezervaci a události, které čekají na kontrolu.

## Žádosti o rezervaci

Když skupina vytvoří událost a požádá o místnost nebo zdroj, žádost se zobrazí v sekci **Žádosti o místnosti a zdroje**. Každý řádek obsahuje:

- Název události a datum a čas
- Místnost nebo zdroj, o který se žádá (u zdrojů s více kusy také počet)
- Stavový štítek, který ukazuje, zda žádost má konflikty

### Indikátory konfliktů

Pokud se žádost překrývá s jinou rezervací nebo blokací pro stejnou místnost nebo zdroj, zobrazí se u ní štítek **Konflikty**; po najetí myší uvidíte podrobnosti. U žádostí bez překryvů se zobrazí **Bez konfliktů**. Než některou z konfliktních žádostí schválíte, pečlivě ji zkontrolujte.

### Schválení nebo zamítnutí

Klikněte na **Schválit** nebo **Zamítnout** u libovolné žádosti o rezervaci (zamítnutí nejprve vyžaduje potvrzení). Skupina žadatele je o rozhodnutí informována. Schválené rezervace jsou pro danou událost uzamčeny na tuto místnost nebo zdroj; zamítnuté rezervace uvolní termín pro ostatní.

Když kliknete na **Schválit**, otevře se dialog **Schválit rezervaci**, ve kterém můžete událost zároveň zveřejnit:

1. Zaškrtněte **Zveřejnit v kalendáři pro veřejnost**, aby se událost zobrazila v kalendáři její skupiny veřejně. Pokud ji nezaškrtnete, rezervace se schválí bez změny viditelnosti události.
2. Jakmile je zaškrtnuto **Zveřejnit v kalendáři pro veřejnost**, můžete volitelně v nabídce **Také přidat do kalendáře** vybrat [kurátorský kalendář](curated-calendar) a přidat do něj událost také. Ponecháte-li možnost **Žádný**, tento krok se přeskočí. (Tato volba se zobrazí jen u oprávnění **content.edit**.)
3. Klikněte na **Schválit**.

## Čekající události

Pokud váš pracovní postup vyžaduje, aby byly události před zveřejněním pro veřejnost schváleny, čekající události se zobrazí v sekci **Žádosti o události**. Kliknutím na **Schválit** zveřejníte událost v kalendáři; kliknutím na **Zamítnout** odesílatele upozorníte, že je potřeba provést změny.

:::tip
Nastavte skupinu schválení u místnosti v sekci [Místnosti a zdroje](rooms-resources), aby pro tuto místnost bylo vyžadováno schválení. Skupiny s přístupem pak mohou místnost žádat při vytváření událostí a tyto žádosti se objeví na této stránce.
:::

## Související články

- [Místnosti, zdroje a plánování](rooms-resources) — nastavení rezervovatelných místností a zdrojů
- [Vytváření kalendářů](creating-calendars) — správa kalendářů a událostí
