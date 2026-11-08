---
title: "Plánování a upozornění"
description: "Kontrolujte servisní plány v B1 Admin kvůli neobsazeným pozicím, časovým kolizím a dobrovolníkům s blokovanými termíny a poté všechny členy týmu upozorněte push notifikací jediným kliknutím."
---

# Kontrola plánů a upozornění dobrovolníkům

<div class="article-intro">

B1 Admin automaticky kontroluje vaše plány ještě před nedělí – hledá neobsazené pozice, časové kolize a dobrovolníky, kteří si označili daný termín jako nedostupný. Když je vše v pořádku, můžete celý tým upozornit jediným kliknutím.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vytvořte [servisní plán](./plans.md) a přiřaďte dobrovolníky na pozice
- Přidejte do plánu [časy bohoslužeb](./plans.md), aby kontrola kolizí mohla ověřit překryvy
- Ujistěte se, že dobrovolníci mají nainstalovanou [aplikaci B1 App](../../b1-church/getting-started/installing-pwa.md), aby mohli přijímat push notifikace

</div>

## Panel kontroly

Každý plán má panel **Validace**, který běží automaticky, jak plán sestavujete. Kontroluje tři věci:

### Neobsazené pozice
Pokud pozice vyžaduje více lidí, než je aktuálně přiřazeno, panel validace přesně vypíše, co ještě chybí – například *„Zvukař: chybí ještě 1 osoba.“* Ještě před začátkem týdne tak na první pohled vidíte, zda je plán plně obsazen.

### Časové kolize
Pokud je dobrovolník přiřazen na dvě pozice, které se v rámci stejného plánu časově překrývají, panel validace na to upozorní – například *„Jana Nováková: časová kolize mezi vedoucím chvály a dětskou registrací během nedělní bohoslužby.“* Díky tomu se dvojité obsazení odhalí dřív, než se z něj stane problém v nedělní ránu.

### Blokované termíny
Dobrovolníci mohou v aplikaci B1 App nastavit termíny, kdy nejsou k dispozici. Pokud je někdo přiřazen k plánu, který spadá do jeho blokovaného termínu, panel validace na konflikt automaticky upozorní, abyste mohli najít náhradníka.

### Kolize napříč plány
Validace kontroluje i všechny vaše plány najednou. Pokud je stejný dobrovolník přiřazen ke dvěma různým plánům, které se časově překrývají – například k bohoslužbě v 9:00 a k bohoslužbě v 10:00, které obě končí až v 10:30 – B1 Admin tuto osobu označí jako dvojitě obsazenou napříč plány.

:::tip
Validaci není potřeba nijak spouštět – aktualizuje se automaticky pokaždé, když přidáte nebo změníte přiřazení. Stačí při sestavování plánu sledovat panel.
:::

## Upozornění dobrovolníkům

Jakmile je plán hotový, můžete všechny přiřazené dobrovolníky upozornit najednou přímo z panelu validace.

1. Otevřete plán a přejděte na panel **Validace**
2. Pokud existují dobrovolníci, kteří ještě nebyli upozorněni, uvidíte odkaz s počtem osob, které je potřeba upozornit (např. *„Upozornit 8 dobrovolníků“*)
3. Kliknutím na odkaz odešlete push notifikace všem, kdo ještě upozorněni nebyli
4. Dobrovolníci dostanou na telefonu oznámení, že byli naplánováni, a jsou vyzváni, aby své přiřazení potvrdili

:::info
Zahrnuti jsou pouze dobrovolníci, kteří dosud upozorněni nebyli. Pokud do plánu přidáte někoho později, odkaz se znovu objeví, abyste mohli upozornit jen nově přidanou osobu, aniž byste znovu oslovili zbytek týmu.
:::

### Plány s potvrzovacím postupem

Pokud nastavení plánu odkazuje na [potvrzovací postup](./workflows.md#serving-assignment-confirmations), panel zobrazí text *„Nové žádosti používají potvrzovací postup. Upozornění v aplikaci zůstávají zapnutá. Připomínky se zastaví, jakmile je každá žádost přijata nebo odmítnuta.“* V takovém případě:

- Odkaz na upozornění počítá pouze dobrovolníky, kteří ještě upozorněni nebyli a dosud nereagovali.
- Po kliknutí se odešle obvyklé upozornění v aplikaci a na nástěnce postupu se vytvoří jedna karta pro každou žádost. Postup následně odešle e-mailové a textové připomínky a v případě potřeby předá žádost někomu k telefonickému kontaktu.
- Plán musí být zveřejněn (nikoli pouze předběžně naplánován) a postup musí být aktivní. Jinak panel zobrazí text *„Žádosti nebylo možné odeslat. Zkontrolujte, zda je vybraný postup aktivní a plán zveřejněn, a zkuste to znovu.“*

:::warning
Aby dobrovolníci mohli přijímat push notifikace, musí mít na domovské obrazovce nainstalovanou aplikaci B1 App a povolená oznámení. Pokyny k nastavení najdete v článku [Instalace jako aplikace (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Související články

- [Servisní plány](./plans.md)
- [Postupy](./workflows.md)
- [Instalace PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
