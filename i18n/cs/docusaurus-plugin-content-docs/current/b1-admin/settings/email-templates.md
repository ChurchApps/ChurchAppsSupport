---
title: "Šablony e-mailů"
description: "Nastavte šablony e-mailů a textových zpráv v B1 Admin se slučovacími poli, možnostmi SMS a náhledy pro hromadnou komunikaci."
---

# Šablony e-mailů

<div class="article-intro">

Šablony e-mailů umožňují ukládat opakovaně použitelný obsah e-mailů, například uvítací zprávu, připomenutí akce nebo poděkování za dar. Vy (nebo [pracovní postup](../serving/workflows.md)) pak můžete odeslat kteroukoli z nich jedním kliknutím, aniž byste ji pokaždé psali znovu. Stejný seznam obsahuje i šablony textových zpráv pro okna Text u skupin a jednotlivých osob.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete přístup do oblasti Nastavení v aplikaci B1 Admin.

</div>

## Otevření šablon e-mailů

1. V aplikaci B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu) a rozbalte položku **Nastavení**.
2. Klikněte na **Šablony e-mailů**.
3. Zobrazí se seznam existujících šablon s jejich předmětem, kategorií a datem poslední úpravy.

## Vytvoření šablony

1. Klikněte na **Nová šablona**.
2. Zadejte **Název šablony**, podle kterého ji poznáte v seznamu, a vyberte **Kategorii** (Obecné, Akce, Skupiny, Dary, Uvítání nebo Text), která vám pomůže šablony uspořádat. Pokud chcete vytvořit šablonu textové zprávy, vyberte kategorii **Text** (viz níže [Textové šablony](#text-templates)).
3. Zadejte řádek **Předmět**.
4. Napište **Obsah** pomocí editoru formátovaného textu.
5. Klikněte na **Uložit**.

## Slučovací pole

Klikněte na štítek slučovacího pole nad předmětem nebo obsahem a vložte jej na místo kurzoru. Nejprve klikněte do textu na místo, kam chcete pole vložit, a teprve potom klikněte na štítek. Kurzor zůstane na místě, takže můžete ihned pokračovat v psaní za vloženým polem. Pokud kliknete na štítek obsahu, aniž byste nejprve klikli do textu, pole se přidá na konec obsahu. Při odeslání e-mailu se každé slučovací pole nahradí skutečnými údaji příjemce:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Jméno příjemce
- `{{email}}` -- E-mailová adresa příjemce
- `{{churchName}}` -- Název vašeho sboru

## Textové šablony

Šablona v kategorii **Text** je prostá textová zpráva určená pro SMS, nikoli pro e-mail:

- Nemá předmět. Editor formátovaného textu je nahrazen jednoduchým polem **Textová zpráva**, které pojme až 1 600 znaků.
- Štítky slučovacích polí nad tímto polem vloží na místo kurzoru `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` nebo `{{churchName}}`.
- Textové šablony se zobrazují ve výběru **Načíst šablonu (volitelné)** v okně Text pro [skupinu](../groups/group-members.md#texting-group-members) nebo jednotlivou osobu. Po výběru se šablona vloží do zprávy a před odesláním ji můžete ještě upravit.
- Nezobrazují se ve výběru šablon e-mailů, včetně akce **Odeslat e-mail** v pracovních postupech.

Odesílání textových zpráv vyžaduje připojení k [poskytovateli SMS](./church-settings.md#texting).

## Náhled šablony

Před uložením nebo odesláním klikněte na **Náhled**, abyste si zobrazili, jak budou předmět a obsah vypadat, když se do slučovacích polí doplní ukázková data.

## Použití šablony

Uložené šablony lze vybrat při psaní e-mailu osobám nebo skupině a také jako akci v [pracovních postupech](../serving/workflows.md). Než je váš sbor začne odesílat, tým ChurchApps musí jednorázově schválit odesílání skupinových e-mailů. Viz [Zapnutí skupinových e-mailů pro váš sbor](../groups/group-members.md#turning-on-group-email-for-your-church).

## Úprava a mazání

Pokud chcete šablonu upravit, klikněte u ní na ikonu **Upravit**. Chcete-li ji trvale odstranit, klikněte na ikonu **Smazat**.

## Další kroky

- [Pracovní postupy](../serving/workflows.md) -- Automatické odesílání e-mailů podle šablony na základě pravidel
