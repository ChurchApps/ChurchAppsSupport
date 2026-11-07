---
title: "Vodník: Nastavení registrace na akci"
description: "Nastavte v B1 Admin formulář pro registraci na akci, který sbírá údaje účastníků a volitelné platby, vložte ho na web sboru a sledujte přihlášky."
---

# Nastavení registrace na akci

<div class="article-intro">

Vytvořte formulář pro registraci na akci, shromažďujte údaje o účastnících a volitelné platby, vložte jej na webové stránky vašeho sboru a spravujte přihlášky, jak přicházejí. Na konci budete mít sdílitelnou registrační stránku pro libovolnou církevní akci.

</div>

:::info
**Dva způsoby, jak řešit registraci na akci:** Tento návod popisuje **registraci pomocí formulářů**, která vám dává plnou kontrolu nad vlastními poli a výběrem plateb. U jednodušších akcí, kde potřebujete jen evidovat, kdo přijde, použijte **nativní registraci na akci** zabudovanou do kalendáře -- pokyny k nastavení najdete v článku [Vytváření kalendářů](../calendars/creating-calendars.md#enabling-event-registration). Nativní registrace umožňuje členům přihlásit se přímo na [webu B1](../../b1-church/events/registering.md) a v [mobilní aplikaci](../../b1-mobile/events/registering.md) s sledováním kapacity, časovými okny a potvrzovacími e-maily.
:::

<div class="prereqs">
<h4>Než začnete</h4>

- Účet B1 Admin s přístupem správce
- Pro shromažďování plateb: nejprve musí být nastaven [Stripe](../donations/online-giving-setup.md)

</div>

## Krok 1: Vytvoření samostatného formuláře

Samostatné formuláře mají vlastní veřejnou adresu URL, ke které má přístup kdokoli -- ideální pro registraci na akci.

Postupujte podle návodu [Vytváření formulářů](../forms/creating-forms.md):

1. Přejděte na Formuláře a klikněte na Přidat formulář
2. Zvolte typ „Samostatný“ -- tím váš formulář získá vlastní veřejnou adresu URL
3. Pojmenujte jej podle akce (např. „Registrace na mužský víkend“, „Přihlášení na VBS“)

## Krok 2: Přidání otázek

Vytvořte pole, která potřebujete od účastníků shromáždit.

Postupujte podle návodu [Vytváření formulářů](../forms/creating-forms.md#adding-questions) a přidejte své otázky:

1. Přejděte na kartu Otázky a přidejte pole pro informace, které potřebujete: jméno, e-mail, telefon, stravovací omezení, velikost trička, kontakt pro případ nouze atd.
2. Pro možnosti, jako jsou preference jídla nebo výběr programu, použijte Výběr z možností

:::warning
Typ pole Platba vyžaduje nastavený Stripe. Pokud jste ještě nenastavili online dary, než přidáte platební pole, podívejte se na [Nastavení online darů](../donations/online-giving-setup.md).
:::

## Krok 3: Nastavení formuláře

Určete, kdy a jak bude váš registrační formulář dostupný.

1. Pokud má být registrace otevřena jen omezenou dobu, nastavte data dostupnosti
2. Zkopírujte veřejnou adresu URL -- můžete ji sdílet přímo
3. Přidejte členy formuláře s rolí Správce nebo Pouze prohlížení, aby pomohli spravovat přihlášky

## Krok 4: Vložení na webové stránky

Usnadněte nalezení registračního formuláře tím, že jej přidáte na webové stránky vašeho sboru.

Postupujte podle návodu [Správa stránek](../website/managing-pages.md):

1. Ve vašem editoru webu B1 přidejte na stránku novou sekci a vyberte prvek Formulář
2. Ze seznamu zvolte svůj registrační formulář

:::tip
Samostatnou adresu URL sdílejte také e-mailem, na sociálních sítích a v církevních oznámeních -- čím více míst, kde je viditelná, tím více přihlášek získáte.
:::

## Krok 5: Správa přihlášek

Sledujte registrace, jak přicházejí, a v případě potřeby exportujte údaje.

Postupujte podle návodu [Správa přihlášek](../forms/managing-submissions.md):

1. Procházejte odpovědi, jak přicházejí, na kartě Přihlášky
2. Exportujte do CSV pro tabulky, sledování počtu účastníků nebo předání koordinátorům akce

## Hotovo!

Vaše registrace na akci je spuštěna. Sdílejte odkaz, vložte jej na webové stránky a sledujte přihlášky v B1 Admin. Po skončení akce exportujte konečný seznam pro své záznamy.

## Související články

- [Vytváření formulářů](../forms/creating-forms.md) — tvorba formulářů s různými typy polí
- [Správa přihlášek](../forms/managing-submissions.md) — prohlížení a export odpovědí z formulářů
- [Správa stránek](../website/managing-pages.md) — vkládání formulářů na webové stránky
- [Nastavení online darů](../donations/online-giving-setup.md) — nutné pro platební pole
