---
title: "Podpora viacerých mien"
---

# Podpora viacerých mien

<div class="article-intro">

Funkcia viacerých mien v B1 umožňuje vašej cirkvi prijímať a evidovať dary v rôznych menách. Je to užitočné najmä pre cirkvi s medzinárodnými členmi, misionármi alebo viacerými pobočkami v rôznych krajinách.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete oprávnenie na správu darov. Podrobnosti nájdete v článku [Roly a oprávnenia](../people/roles-permissions.md).
- Nastavte [online darovanie](./online-giving-setup.md) cez Stripe, ktorý podporuje transakcie vró viacerých menách.
- Ujasnite si účtovné potreby vašej cirkvi pri práci s viacerými menami.

</div>

## Zapnutie viacerých mien

Podpora viacerých mien je v B1 teraz štandardne zapnutá. Po zapnutí:

- Členovia môžu pri online darovaní dávať v svojej miestnej mene
- Dary môžete ručne zaznamenávať v ľubovoľnej mene
- Výkazy darov zobrazujú sumy v pôvodnej mene
- Stripe automaticky zabezpečuje prepočet mien pri online darovaní

## Podporované meny

Systém podporuje všetky hlavné svetové meny, vrátane:

- **USD** -- americký dolár
- **EUR** -- euro
- **GBP** -- britská libra
- **CAD** -- kanadský dolár
- **AUD** -- austrálsky dolár
- **MXN** -- mexické peso
- **BRL** -- brazílsky real
- **INR** -- indická rupia
- **CNY** -- čínsky jüan
- **JPY** -- japonský jen
- A mnohé ďalšie...

Meny dostupné pre online darovanie závisia od podporovaných mien vášho účtu Stripe.

## Zaznamenávanie darov v rôznych menách

### Online dary

Keď člen daruje online cez Stripe:

1. Pri pokladni si vyberie preferovanú menu
2. Stripe spracuje platbu v tejto mene
3. Dar sa zaznamená v B1 s sumou v pôvodnej mene
4. Stripe automaticky zabezpečí prípadný potrebný prepočet na štandardnú menu vášho účtu

### Ručné zadanie

Ak chcete zaznamenať hotovostný alebo šekový dar v inej mene:

1. V B1 Admin prejdite na **Donations > Batches** a otvorte dávku
2. Na hornej časti stránky dávky kliknite na **Add Donation**
3. Z rozbaľovacieho zoznamu mien vyberte menu
4. Zadajte sumu v tejto mene
5. Doplňte ostatné údaje o darе
6. Kliknite na **Save**

## Zobrazenie darov v rôznych menách

### Výkazy darov

Výkazy darov zobrazujú sumy v pôvodnej mene:

- Jednotlivé záznamy darov zobrazujú kód meny (napr. „$100.00 USD")
- Súčty sa počítajú osobitne pre každú menu
- Môžete filtrovať podľa konkrétnych mien

### Prepočítané súčty

Všade tam, kde B1 zobrazuje jeden spoločný súčet -- karty kľúčových ukazovateľov prehľadu darovania, súčet dávky darov a celkový súčet fondu -- sú dary zaznamenané v inej mene, než je štandardná mena vašej cirkvi, prepočítané do meny vašej cirkvi podľa aktuálnych výmenných kurzov. Vďaka tomu je súčet jedným zmysluplným číslom a nesčítavajú sa nesúmerateľné meny. Pod súčtom sa zobrazí poznámka **Prepočítané podľa aktuálnych výmenných kurzov**, kedykoľvek bol prepočet uplatnený. Jednotlivé položky darov sa stále zobrazujú v pôvodnej mene.

### Výpisy darovania

Pri generovaní výpisov darovania:

- Každý dar sa zobrazí v pôvodnej mene
- Súčty sú rozpísané podľa mien
- Členovia presne vidia, čo dali v každej mene

## Integrácia so Stripe

Pri online darovaní Stripe zabezpečuje transakcie v� viacerých menách:

- **Automatický prepočet** -- Stripe prepočítava meny na štandardnú menu vášho účtu
- **Výmenné kurzy** -- Stripe používa aktuálne trhové výmenné kurzy
- **Poplatky** -- Prepočet mien môže spôsobiť dodatočné poplatky Stripe
- **Mena výplaty** -- Prostriedky sa pripisujú na účet v štandardnej mene vášho účtu

:::info
V dashboarde Stripe si skontrolujte aktuálne prepočtové kurzy a poplatky spojené s transakciami v rôznych menách.
:::

## Účtovné aspekty

Pri práci s viacerými menami:

- **Evidencia** -- Sledujte pôvodné sumy darov a meny kvôli presnému výkazníctvu
- **Výmenné kurzy** -- Majte na pamäti, že kurzy Stripe sa môžu líšiť od kurzov vašej banky
- **Daňové potvrdenia** -- Poraďte sa s účtovníkom, ako uvádzať dary v rôznych menách na daňové účely
- **Priradenie do fondov** -- Dary môžete priradiť k určitým fondom bez ohľadu na menu

## Osvedčené postupy

- **Štandardná mena** -- Nastavte hlavnú menu vašej cirkvi ako predvolenú pre väčšinu transakcií
- **Jasná komunikácia** -- Povedzte darcom, v akej mene darujú, počas procesu platby
- **Konzistentné výkazníctvo** -- Súhrnné súčty sa vždy automaticky prepočítavajú do meny vašej cirkvi; ak potrebujete vidieť pôvodné sumy, použite filter darov podľa meny
- **Pravidelné zosúlaďovanie** -- Porovnávajte výplaty Stripe s evidenciou darov a zohľadňujte prepočty mien

## Obmedzenia

- Prepočet mien pri spracovaní platieb zabezpečuje Stripe len pri online darovaní; ručne zadané dary sa zaznamenávajú presne tak, ako boli zadané, bez automatického prepočtu
- Historické výkazy a jednotlivé položky darov vždy zobrazujú pôvodnú menu, v ktorej bol dar zaznamenaný
- Súhrnné súčty (karty kľúčových ukazovateľov, súčty dávok, súčty fondov) sa prepočítavajú do meny vašej cirkvi podľa aktuálnych výmenných kurzov -- tieto kurzy sa môžu mierne líšiť od kurzov vašej banky alebo Stripe v čase vysporiadania prostriedkov

## Súvisiace články

- [Nastavenie online darovania](./online-giving-setup.md) -- Konfigurácia Stripe na prijímanie darov
- [Zaznamenávanie darov](./recording-donations.md) -- Ručné zadávanie záznamov darov
- [Výkazy darov](./donation-reports.md) -- Generovanie a zobrazenie súhrnov darov
- [Výpisy darovania](./giving-statements.md) -- Vytváranie ročných výpisov darovania
