---
title: "Příručka: Nastavení registrace na akce"
description: "Nastavte formulář pro registraci na akce v B1 Admin, shromažďujte údaje o účastnících a volitelné platby, vložte jej na webové stránky sboru a sledujte přihlášky."
---

# Nastavení registrace na akce

<div class="article-intro">

Vytvořte formulář pro registraci na akci, shromažďujte informace o účastnících a volitelné platby, vložte jej na webové stránky sboru a průběžně spravujte došlé přihlášky. Na konci budete mít sdílitelnou registrační stránku pro libovolnou církevní akci.

</div>

:::info
**Dva způsoby, jak řešit registraci na akce:** Tato příručka popisuje **registraci pomocí formulářů**, která vám dává plnou kontrolu nad vlastními poli a shromažďováním plateb. U jednodušších akcí, kde potřebujete jen evidovat, kdo přijde, použijte **nativní registraci na akce** zabudovanou do kalendáře -- pokyny k nastavení najdete v článku [Vytváření kalendářů](../calendars/creating-calendars.md#enabling-event-registration). Nativní registrace umožňuje členům přihlásit se přímo z [B1.church nebo aplikace B1 App](../../b1-church/events/registering.md) se sledováním kapacity, časovými okny a potvrzovacími e-maily.
:::

<div class="prereqs">
<h4>Než začnete</h4>

- Účet B1 Admin s přístupem správce
- Pro shromažďování plateb je nejprve nutné nastavit [Stripe](../donations/online-giving-setup.md)

</div>

## Krok 1: Vytvoření samostatného formuláře

Samostatné formuláře mají vlastní veřejnou adresu URL, ke které má přístup kdokoli -- ideální pro registraci na akce.

Postupujte podle příručky [Vytváření formulářů](../forms/creating-forms.md):

1. Přejděte do sekce Formuláře a klikněte na Přidat formulář
2. Zvolte typ „Stand Alone“ -- tím formulář získá vlastní veřejnou adresu URL
3. Pojmenujte jej podle akce (např. „Registrace na mužský víkend“, „Přihláška na VBS“)

## Krok 2: Přidání otázek

Vytvořte pole, která od účastníků potřebujete získat.

Postupujte podle příručky [Vytváření formulářů](../forms/creating-forms.md#adding-questions) a přidejte otázky:

1. Přejděte na kartu Otázky a přidejte pole pro informace, které potřebujete: jméno, e-mail, telefon, dietní omezení, velikost trička, kontakt pro případ nouze apod.
2. Pro možnosti, jako jsou preference jídla nebo výběr programu, použijte typ Výběr z možností

:::warning
Typ pole Platba vyžaduje nastavený Stripe. Pokud jste ještě nenastavili online dary, než přidáte platební pole, přečtěte si článek [Nastavení online darování](../donations/online-giving-setup.md).
:::

## Krok 3: Nastavení formuláře

Určete, kdy a jak bude registrační formulář dostupný.

1. Nastavte data dostupnosti, pokud má být registrace otevřena jen po omezenou dobu
2. Zkopírujte veřejnou adresu URL -- můžete ji sdílet přímo
3. Přidejte členy formuláře s rolí Správce nebo Pouze prohlížení, aby pomohli spravovat přihlášky

## Krok 4: Vložení na webové stránky

Usnadněte nalezení registračního formuláře tím, že jej přidáte na webové stránky sboru.

Postupujte podle příručky [Správa stránek](../website/managing-pages.md):

1. Ve webovém editoru B1 přidejte na stránku novou sekci a zvolte prvek Formulář
2. Ze seznamu vyberte svůj registrační formulář

:::tip
Samostatnou adresu URL sdílejte také e-mailem, na sociálních sítích a v církevních oznamovatelích -- čím více míst, kde je viditelná, tím více přihlášek získáte.
:::

## Krok 5: Správa přihlášek

Sledujte registrace, jak přicházejí, a v případě potřeby exportujte data.

Postupujte podle příručky [Správa přihlášek](../forms/managing-submissions.md):

1. Průběžně kontrolujte odpovědi na kartě Přihlášky
2. Exportujte do CSV pro tabulkové procesory, sledování počtu účastníků nebo sdílení s koordinátory akce

## Hotovo!

Vaše registrace na akci je spuštěna. Sdílejte odkaz, vložte jej na webové stránky a sledujte přihlášky v B1 Admin. Po skončení akce exportujte konečný seznam pro své záznamy.

## Související články

- [Vytváření formulářů](../forms/creating-forms.md) — tvorba formulářů s různými typy polí
- [Správa přihlášek](../forms/managing-submissions.md) — kontrola a export odpovědí z formulářů
- [Správa stránek](../website/managing-pages.md) — vkládání formulářů na webové stránky
- [Nastavení online darování](../donations/online-giving-setup.md) — nutné pro platební pole
