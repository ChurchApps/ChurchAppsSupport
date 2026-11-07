---
title: "Soubory"
description: "Nahrávejte, procházejte a spravujte obrázky a dokumenty pro web církve v B1 Admin, včetně propojení externího úložiště pro více místa."
---

# Soubory

<div class="article-intro">

Stránka Soubory je centrálním úložištěm všech médií a dokumentů, které váš církevní web používá. Odtud můžete nahrávat, procházet a spravovat každý obrázek, dokument a mediální soubor, který váš web potřebuje.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [počáteční nastavení](./initial-setup.md) pro váš web
- Před nahráním optimalizujte obrázky, aby se stránky načítaly rychleji
- Připravte soubory v běžných webových formátech (PNG, JPG, PDF apod.)

</div>

## Nahrávání souborů

1. V aplikaci B1 Admin otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte položku **Web** a klikněte na **Soubory**.
2. V panelu **Nahrát soubory** vpravo klikněte na **Vybrat soubor** a zvolte soubor z počítače. (Tlačítko **Nahrát soubory** v horní části stránky otevře stejný panel.)
3. Soubor se nahraje a zobrazí se v tabulce souborů.

V panelu Nahrát soubory je také vidět, kolik úložného prostoru využíváte. 100 MB je k dispozici zdarma; chcete-li získat více, propojte si vlastní Disk Google, Dropbox, OneDrive nebo bucket S3 v nastavení v sekci **Úložiště souborů**.

:::tip
Nejlepších výsledků dosáhnete, když obrázky před nahráním optimalizujete. Menší velikost souborů pomůže tomu, aby se váš web návštěvníkům načítal rychleji. Nástroje jako TinyPNG nebo Squoosh dokážou obrázky komprimovat bez znatelné ztráty kvality.
:::

## Procházení souborů

Tabulka souborů uvádí každý nahraný soubor se sloupci **Název** a **Velikost**. Kliknutím na název souboru jej otevřete v nové kartě. Než soubory nahrajete, pojmenujte je jasně a výstižně, aby je váš tým mohl rychle najít.

## Použití souborů na webu

1. Najděte soubor v tabulce souborů.
2. Klikněte na **Kopírovat odkaz**, čímž zkopírujete URL adresu souboru. Tuto adresu můžete vložit do prvků s obrázky, odkazů ke stažení nebo kamkoli jinam, kde se používá adresa souboru.
3. Soubory nahrané sem jsou k dispozici na všech stránkách webu a v obsahových blocích.

:::info
Při tvorbě stránek v [Správě stránek](./managing-pages.md) můžete na kterýkoli zde nahraný soubor odkázat pomocí jeho URL adresy. Díky tomu zůstanou všechna vaše média uspořádána na jednom centrálním místě.
:::

## Mazání souborů

1. Najděte soubor, který chcete odstranit, v tabulce souborů.
2. Klikněte vedle něj na **Smazat** a potvrďte, že chcete soubor trvale odstranit z knihovny.
3. Před smazáním se ujistěte, že soubor momentálně není použit na žádné stránce, protože by tím přestaly fungovat odkazy nebo obrázky, které na něj odkazují.

:::warning
Smazané soubory nelze obnovit. Před odstraněním si dvakrát ověřte, že soubor není na žádné stránce používán.
:::

## Další kroky

- [Správa stránek](./managing-pages.md) -- Přidejte nahrané soubory na stránky webu
- [Vzhled](./appearance.md) -- Přizpůsobte vizuální motiv vašeho webu
