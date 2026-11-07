---
title: "Sprievodca: Spustenie webu vašej cirkvi"
---

# Spustenie webu vašej cirkvi

<div class="article-intro">

B1.church obsahuje kompletný nástroj na tvorbu webových stránok bez dodatočných poplatkov. Tento sprievodca vás krok za krokom prevedie vytvorením webu vašej cirkvi od začiatku: nastavením domovskej stránky, úpravou vzhľadu, pridaním kľúčových stránok a voliteľným pripojením online darovania a formulárov na registráciu na podujatia.

</div>

## Školiace video

<YouTube id="aA4UahZpmXg" title="Spustenie webu vašej cirkvi v B1" next="Úprava stránok a navigácie v B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Pripravte si logo vašej cirkvi (najlepšie vyzerá PNG s priehľadným pozadím)
- Vyberte 2 až 3 farby značky pre váš web
- Ak používate vlastnú doménu (napr. vasacirkev.sk), budete potrebovať prístup k poskytovateľovi DNS (GoDaddy, Cloudflare a podobne)
- Ak chcete na webe online darovanie, najprv dokončite [Nastavenie online darovania](../donations/online-giving-setup.md) (Stripe)

</div>

## Krok 1: Úvodné nastavenie webu

Začnite vytvorením domovskej stránky a základnej štruktúry webu.

Podľa sprievodcu [Úvodné nastavenie webu](../website/initial-setup.md) urobte nasledovné:

1. V B1 Admin prejdite na **Web**
2. Vytvorte domovskú stránku s hlavnou sekciou, uvítacím textom a kľúčovými informáciami
3. Pridajte názov vašej cirkvi a krátky slogan

## Krok 2: Nastavenie vzhľadu

Nastavte vizuálnu identitu webu: farby, písma, logo a pätičku.

Podľa sprievodcu [Vzhľad](../website/appearance.md) urobte nasledovné:

1. Nahrajte logo vašej cirkvi
2. Nastavte primárnu a doplnkovú farbu
3. Upravte navigačnú lištu a pätičku
4. Zobrazte si náhľad vašich zmien

:::tip
Farebnú paletu udržiavajte jednoduchú. Zvyčajne stačí jedna primárna farba a jedna doplnková. Zvyšok zvládne nástroj na tvorbu webu.
:::

## Krok 3: Pridanie obsahových stránok

Vytvorte stránky, ktoré vaši návštevníci potrebujú najčastejšie.

Podľa sprievodcu [Správa stránok](../website/managing-pages.md) vytvorte stránky, ako napríklad:

- **O nás** — Príbeh vašej cirkvi, vyznanie viery a vedenie
- **Kázne** — Odkaz na vašu [knižnicu kázní](../sermons/managing-sermons.md)
- **Podujatia** — Nadchádzajúce podujatia a registrácia
- **Darovať** — Stránka online darovania (vyžaduje [nastavenie Stripe](../donations/online-giving-setup.md))
- **Kontakt** — Miesto konania, časy bohoslužieb a kontaktné údaje

## Krok 4: Pripojenie vlastnej domény

Ak chcete namiesto predvolenej adresy B1 používať vlastný názov domény (napr. vasacirkev.sk):

1. V B1 Admin prejdite do **Nastavenia** a otvorte sekciu **Domény**
2. Zadajte svoju vlastnú doménu
3. Aktualizujte záznamy DNS u svojho poskytovateľa domén tak, aby smerovali na B1

:::info
Zmeny DNS sa môžu šíriť až 48 hodín. Váš web nemusí byť okamžite dostupný z vlastnej domény. Predvolená adresa B1 bude počas tejto doby stále fungovať.
:::

## Krok 5: Pridanie darovania a formulárov

Obohaťte svoj web o interaktívne prvky:

- **Online darovanie** — Pridajte sekciu darovania, aby mohli členovia priamo z vášho webu prispieť. Najprv si nastavte Stripe podľa [Nastavenie online darovania](../donations/online-giving-setup.md).
- **Registračné formuláre** — Vložte [samostatné formuláre](../forms/creating-forms.md) na prihlasovanie na podujatia, návštevnícke karty alebo prihlášky dobrovoľníkov. Ako pridať prvok formulára na ľubovoľnú stránku, nájdete v sprievodcovi [Správa stránok](../website/managing-pages.md).

## Hotovo!

Webová stránka vašej cirkvi je spustená. Zdieľajte jej adresu so zborom a na sociálnych sieťach. Obsah môžete kedykoľvek aktualizovať, pridávať nové stránky a upravovať vzhľad z panela B1 Admin.

## Súvisiace články

- [Úvodné nastavenie webu](../website/initial-setup.md) — podrobný postup nastavenia
- [Správa stránok](../website/managing-pages.md) — pridávanie a úprava stránok
- [Vzhľad](../website/appearance.md) — farby, logo a rozloženie
- [Správa súborov](../website/files.md) — nahrávanie obrázkov a dokumentov
- [Nastavenie online darovania](../donations/online-giving-setup.md) — nastavenie Stripe
- [Vytváranie formulárov](../forms/creating-forms.md) — tvorba registračných a dotazníkových formulárov
