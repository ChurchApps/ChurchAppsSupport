---
title: "Ověřování plánů a oznámení"
---

# Ověřování plánů a oznámení dobrovolníkům

<div class="article-intro">

B1 Admin před nedělí automaticky kontroluje vaše plány, jestli v nich nejsou problémy: neobsazené pozice, kolize v rozvrhu a dobrovolníci, kteří si v daný termín zablokovali volno. Když je vše v pořádku, můžete celý tým upozornit jediným kliknutím.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vytvořte [servisní plán](./plans.md) a přiřaďte dobrovolníky na pozice
- Přidejte do plánu [časy bohoslužeb](./plans.md), aby mohla detekce kolizí zkontrolovat překryvy
- Ujistěte se, že dobrovolníci mají nainstalovanou aplikaci B1 Mobile, aby mohli přijímat push oznámení

</div>

## Panel ověřování

Každý plán má panel **Ověřování**, který běží automaticky, jak plán sestavujete. Kontroluje tři věci:

### Neobsazené pozice
Pokud pozice vyžaduje více lidí, než je aktuálně přiřazeno, panel ověřování přesně vypíše, co ještě chybí, například *„Zvukař: chybí ještě 1 osoba.“* Na první pohled tak vidíte, zda je plán plně obsazený, než přijde příslušný týden.

### Kolize v rozvrhu
Pokud je dobrovolník přiřazen na dvě pozice, které se v rámci stejného plánu časově překrývají, panel ověřování na konflikt upozorní, například *„Jana Nováková: časová kolize mezi Vedoucím chvály a Dětskou kontrolou během nedělní bohoslužby.“* Tím se dvojité obsazení odhalí dřív, než se z něj stane problém v nedělní ráno.

### Termíny blokování
Dobrovolníci mohou v aplikaci B1 Mobile nastavit termíny, kdy nejsou k dispozici. Pokud je někdo přiřazen k plánu, který spadá do jednoho z jeho blokovaných termínů, panel ověřování na konflikt automaticky upozorní, abyste mohli najít náhradu.

### Kolize mezi plány
Ověřování také prochází všechny vaše plány najednou. Pokud je stejný dobrovolník přiřazen ve dvou různých plánech, které se časově překrývají, například v bohoslužbě v 9:00 a v bohoslužbě v 10:00, které obě končí až v 10:30, B1 Admin tuto osobu označí jako dvojitě obsazenou napříč plány.

:::tip
Ověřování nemusíte nijak spouštět, protože se aktualizuje pokaždé, když přidáte nebo změníte přiřazení. Stačí sledovat panel, zatímco plán sestavujete.
:::

## Oznamování dobrovolníkům

Jakmile je plán hotový, můžete všechny přiřazené dobrovolníky upozornit najednou přímo z panelu ověřování.

1. Otevřete plán a přejděte na panel **Ověřování**
2. Pokud jsou nějací dobrovolníci, kteří ještě nedostali oznámení, uvidíte odkaz s počtem lidí, kterým je třeba oznámení poslat (například *„Oznámit 8 dobrovolníkům“*)
3. Kliknutím na odkaz odešlete push oznámení všem, kteří ho dosud nedostali
4. Dobrovolníci dostanou oznámení do telefonu, že byli naplánováni, a budou vyzváni, aby své přiřazení potvrdili

:::info
Zahrnuti budou pouze dobrovolníci, kteří ještě oznámení nedostali. Pokud do plánu přidáte někoho později, odkaz se znovu objeví, takže budete moct oznámit jen nového člena, aniž byste znovu oznamovali zbytku týmu.
:::

### Plány s potvrzovacím postupem

Pokud nastavení plánu odkazuje na [potvrzovací postup](./workflows.md#serving-assignment-confirmations), panel zobrazí text *„Nové žádosti používají potvrzovací postup. Upozornění v aplikaci zůstávají zapnutá. Připomínky se zastaví, jakmile je každá žádost přijata nebo odmítnuta.“* V takovém případě platí:

- Odkaz pro oznámení počítá pouze dobrovolníky, kterým ještě oznámení nebylo odesláno a kteří ještě nereagovali.
- Po kliknutí se odešle obvyklé upozornění v aplikaci a na nástěnce postupu se vytvoří jedna karta pro každou žádost. Postup pak odešle e-mailové a textové připomínky a v případě potřeby předá žádost někomu, kdo dobrovolníka zavolá.
- Plán musí být zveřejněný (ne pouze předběžný) a postup musí být aktivní. Jinak panel zobrazí text *„Žádosti nebylo možné odeslat. Zkontrolujte, zda je vybraný postup aktivní a plán zveřejněný, a zkuste to znovu.“*

:::warning
Aby dobrovolníci mohli přijímat push oznámení, musí mít nainstalovaný mobilní zážitek B1.church (PWA na domovské obrazovce nebo zastaralou nativní aplikaci B1 Mobile pro uživatele, kteří ji ještě používají) a zapnutá oznámení. Pokyny k nastavení najdete v článku [Instalace jako aplikace (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Související články

- [Servisní plány](./plans.md)
- [Postupy](./workflows.md)
- [Instalace B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
