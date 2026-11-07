---
title: "Podpora více měn"
---

# Podpora více měn

<div class="article-intro">

Funkce více měn v B1 umožňuje vaší církvi přijímat a evidovat dary v různých měnách. Je to užitečné zejména pro církve s mezinárodními členy, misionáři nebo sbory ve více zemích.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění ke správě darů. Podrobnosti najdete v článku [Role a oprávnění](../people/roles-permissions.md).
- Nastavte [online dary](./online-giving-setup.md) pomocí Stripe, který podporuje transakce ve více měnách.
- Ujasněte si účetní potřeby vaší církve pro práci s více měnami.

</div>

## Zapnutí více měn

Podpora více měn je v B1 nyní ve výchozím nastavení zapnutá. Jakmile je zapnutá:

- Členové mohou při online darování dát v místní měně
- Dary můžete ručně zaznamenat v libovolné měně
- Výkazy darů zobrazují částky v původní měně
- Stripe automaticky zajišťuje přepočet měn u online darů

## Podporované měny

Systém podporuje všechny hlavní světové měny, mezi nimi například:

- **USD** -- americký dolar
- **EUR** -- euro
- **GBP** -- britská libra
- **CAD** -- kanadský dolar
- **AUD** -- australský dolar
- **MXN** -- mexické peso
- **BRL** -- brazilský real
- **INR** -- indická rupie
- **CNY** -- čínský jüan
- **JPY** -- japonský jen
- A mnoho dalších...

Měny dostupné pro online dary závisí na měnách podporovaných vaším účtem Stripe.

## Zaznamenávání darů v různých měnách

### Online dary

Když člen daruje online přes Stripe:

1. Při pokladně si zvolí preferovanou měnu
2. Stripe platbu zpracuje v této měně
3. Dar se v B1 zaznamená s částkou v původní měně
4. Stripe automaticky provede případný nutný přepočet na výchozí měnu vašeho účtu

### Ruční zadání

Chcete-li zaznamenat hotovostní nebo šekový dar v jiné měně:

1. V B1 Admin přejděte na **Dary > Dávky** a otevřete dávku
2. Nahoře na stránce dávky klikněte na **Přidat dar**
3. Z rozbalovacího seznamu měn vyberte měnu
4. Zadejte částku v této měně
5. Vyplňte zbývající údaje o daru
6. Klikněte na **Uložit**

## Zobrazení darů ve více měnách

### Výkazy darů

Výkazy darů zobrazují částky v původní měně:

- Jednotlivé záznamy darů zobrazují kód měny (např. „$100.00 USD")
- Součty se počítají zvlášť pro každou měnu
- Můžete filtrovat podle konkrétních měn

### Přepočtené součty

Všude tam, kde B1 zobrazuje jeden souhrnný součet -- karty s přehledem darování, součet dávky darů a součet fondu -- jsou dary zaznamenané v jiné měně, než je výchozí měna vaší církve, přepočteny na měnu církve podle aktuálních směnných kurzů. Součet je tak jedno smysluplné číslo, a ne sečtení nesouměrných měn. Pod součtem se vždy zobrazí poznámka **Přepočteno podle aktuálních směnných kurzů**, pokud bylo přepočtení provedeno. Jednotlivé položky darů se stále zobrazují v původní měně.

### Potvrzení o darech

Při vytváření potvrzení o darech:

- Každý dar se zobrazí v původní měně
- Součty jsou rozepsány podle měn
- Členové přesně uvidí, co dali v jednotlivých měnách

## Integrace se Stripe

U online darů Stripe zpracovává transakce ve více měnách:

- **Automatický přepočet** -- Stripe přepočítá měny na výchozí měnu vašeho účtu
- **Směnné kurzy** -- Stripe používá aktuální tržní směnné kurzy
- **Poplatky** -- Přepočet měny může být zpoplatněn dalšími poplatky Stripe
- **Měna výplat** -- Prostředky se připisují na váš účet ve výchozí měně

:::info
Aktuální kurzy přepočtu a případné poplatky spojené s transakcemi ve více měnách zjistíte na svém přehledu ve Stripe.
:::

## Účetní aspekty

Při práci s více měnami:

- **Evidence** -- Sledujte původní částky darů a měny kvůli přesnému vykazování
- **Směnné kurzy** -- Mějte na paměti, že kurzy Stripe se mohou lišit od kurzů vaší banky
- **Daňová potvrzení** -- Poraďte se s účetním, jak u daňových účelů vykazovat dary v různých měnách
- **Přidělení do fondů** -- Dary můžete přidělit konkrétním fondům bez ohledu na měnu

## Doporučené postupy

- **Výchozí měna** -- Nastavte hlavní měnu církve jako výchozí pro většinu transakcí
- **Jasná komunikace** -- Řekněte dárcům při pokladně, v jaké měně dávají
- **Konzistentní vykazování** -- Součty ve více měnách se vždy automaticky přepočítají na měnu církve; když potřebujete vidět původní částky, použijte filtr měny u jednotlivých darů
- **Pravidelné porovnávání** -- Porovnávejte výplaty ze Stripe se svými záznamy darů a zohledněte přepočty měn

## Omezení

- Přepočet měn při zpracování plateb zajišťuje Stripe pouze u online darů; ruční dary se zaznamenají tak, jak byly zadány, bez automatického přepočtu
- Historické výkazy a jednotlivé položky darů vždy zobrazují původní měnu, ve které byl dar zaznamenán
- Souhrnné součty (karty s přehledem, součty dávek, součty fondů) se přepočítávají na měnu církve podle aktuálních kurzů -- tyto kurzy se mohou mírně lišit od kurzů vaší banky nebo Stripe v době připsání prostředků

## Související články

- [Nastavení online darů](./online-giving-setup.md) -- Nastavení Stripe pro přijímání darů
- [Zaznamenávání darů](./recording-donations.md) -- Ruční zadávání záznamů darů
- [Výkazy darů](./donation-reports.md) -- Vytváření a zobrazení přehledů darů
- [Potvrzení o darech](./giving-statements.md) -- Vytváření ročních potvrzení o darech
