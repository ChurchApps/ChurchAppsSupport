---
title: "Správa odoslaní"
description: "Prezerajte, tlačte a presúvajte odpovede formulárov v B1 Admin k správnej osobe a sledujte návštevnícke karty a modlitebné prosby."
---

# Správa odoslaní

<div class="article-intro">

Keď bude váš formulár spustený, začnú prichádzať odoslania. Karta **Odoslania formulára** vám umožňuje prezerať každú odpoveď, sledovať, kto formulár odoslal, a využiť tieto údaje na včasné oslovenie vášho zboru.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- [Vytvorte formulár](./creating-forms.md) aspoň s jednou otázkou
- Zdieľajte formulár cez jeho verejnú adresu URL alebo ho vložte na svoju [webovú stránku](../website/managing-pages.md)

</div>

## Zobrazenie odoslaní

1. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu B1 Admin), rozbaľte **People** a kliknite na **Forms**.
2. Kliknite na formulár, ktorý chcete skontrolovať.
3. Prejdite na kartu **Odoslania formulára**.

Zobrazí sa zoznam všetkých odpovedí prijatých pre daný formulár. Každé odoslanie zobrazuje údaje o respondentovi a dátum odoslania, nasleduje stĺpec pre každú otázku vo formulári. Ak má váš formulár veľa otázok, posúvajte tabuľku do strán, aby ste videli ostatné stĺpce.

## Kontrola jednotlivých odoslaní

Kliknutím na ľubovoľné odoslanie zobrazíte jeho úplné podrobnosti. Uvidíte všetky odpovede, ktoré osoba poskytla na jednotlivé otázky vo formulári.

Kliknutím na **ikonu tlače** vedľa odoslania vytlačíte vyplnené odpovede danej osoby. Je to užitočné pre papierovú evidenciu alebo podpísaný súhlas, ktorý potrebujete mať po ruke. Výtlačok zobrazuje logo vášho zboru (**logo pre svetlé pozadie** z [Web > Vzhľad](../website/appearance.md), ak ste ho nahrali) vycentrované v hornej časti s názvom vášho zboru pod ním. Výtlačky vždy používajú tmavý text na bielej strane, aj keď používate B1 Admin v tmavom režime. Toto je odlišné od [tlače prázdneho formulára](./creating-forms.md#printing-a-blank-form); tlačí odpovede jednej osoby, ktoré už boli odoslané, nie prázdnu kópiu. Ikona tlače sa zobrazuje všade, kde je odoslanie zobrazené, vrátane [profilu osoby](../people/adding-people.md#working-with-forms).

## Zmena osoby priradenej k odoslaniu

Ak je odoslanie priradené k nesprávnej osobe, napríklad keď dvaja členovia rodiny zdieľajú rovnakú e-mailovú adresu, môžete ho presunúť k správnej osobe alebo ho odpojiť.

1. Na karte **Odoslania formulára** kliknite na ikonu **Zmeniť osobu** (dve šípky) vedľa mena osoby. Rovnaká ikona sa zobrazuje vedľa odoslania aj na [profile osoby](../people/adding-people.md#working-with-forms).
2. V dialógovom okne **Zmeniť osobu** vyhľadajte správnu osobu a kliknite na **Presunúť k tejto osobe**.
3. Alebo kliknite na **Odpojiť (Anonymné)**, čím odpojíte odoslanie od ktorejkoľvek osoby. Potom sa zobrazí ako **Anonymné**.

Mení sa iba prepojenie. Odpovede zostávajú rovnaké a nie sú znovu odosielané žiadne e-maily s potvrdením.

:::info
Pri formulároch nastavených na vytvorenie záznamu osoby, ak je niekto počas odosielania prihlásený na webovej stránke vášho zboru, odoslanie sa prepojí s jeho vlastným záznamom, aj keď iná osoba vo vašej databáze zdieľa jeho e-mailovú adresu. Keď [zlúčite dva záznamy osôb](../people/adding-people.md), odoslania formulárov odstránenej osoby sa presunú k osobe, ktorú ponecháte.
:::

## Ako sa odoslania zhromažďujú

Odoslania môžu prichádzať cez niekoľko kanálov:

- **Verejná adresa URL** -- Ak má váš formulár verejnú adresu URL (samostatné formuláre), ktokoľvek s odkazom môže odoslať odpoveď. Adresu URL zdieľajte e-mailom, na sociálnych sieťach alebo prostredníctvom textových správ.
- **Vložené na vašu webovú stránku** -- Formuláre vložené na vašu webovú stránku B1 zhromažďujú odoslania automaticky, keď ich návštevníci vyplnia.
- **Interné použitie** -- Zamestnanci a dobrovoľníci môžu odosielať formuláre aj v mene iných priamo v rámci B1 Admin.

:::tip
Pravidelne kontrolujte kartu **Odoslania formulára** pri formulároch, ako sú návštevnícke karty alebo prosby o modlitbu, aby ste mohli rýchlo reagovať.
:::

## Využitie údajov z odoslaní

Údaje zhromaždené cez formuláre vám môžu pomôcť:

- Sledovať registrácie na podujatia a podľa toho plánovať
- Oslovovať návštevníkov alebo nových členov
- Zbierať spätnú väzbu z prieskumov pre plánovanie služieb
- Spracovávať platby za podujatia alebo programy

:::info
Členovia formulárov s rolou **Admin** alebo **View Only** môžu pristupovať ku karte **Odoslania formulára**. Uistite sa, že správni ľudia vo vašom tíme majú prístup k formulárom, ktoré potrebujú, a spravujte roly na karte **Členovia formulára**.
:::

:::info
Ak je samostatný formulár [prepojený so skupinou](./creating-forms.md#linking-a-form-to-a-group), vedúci tejto skupiny môžu čítať a tlačiť jeho odoslania zo stránky skupiny na B1.church bez toho, aby boli členmi formulára. Vedúci tam môžu čítať aj odpovede na registračné otázky pre podujatia svojej skupiny. Pozri [Podrobnosti skupiny](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Ak je samostatný formulár nastavený na vytvorenie záznamu osoby, všetky odoslania priradené k existujúcej osobe sa zobrazia aj v sekcii **Formuláre** na stránke tejto osoby v sekcii People, nielen formuláre typu People.
:::

## Ďalšie kroky

- Naučte sa, ako vytvárať a prispôsobovať formuláre, v článku [Vytváranie formulárov](./creating-forms.md)
- Pridajte osoby z odoslaní formulárov do svojho [adresára osôb](../people/adding-people.md) na ďalšie sledovanie
- [Prepojte formulár so skupinou](./creating-forms.md#linking-a-form-to-a-group), aby jej vedúci mohli čítať odpovede, alebo [automaticky pridajte odosielateľov do skupiny](./creating-forms.md#automatically-adding-submitters-to-a-group), aby si samostatný prihlasovací formulár vytvoril vlastný zoznam členov
