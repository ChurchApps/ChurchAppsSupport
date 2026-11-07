---
title: "Nastavenia mobilnej aplikácie"
description: "Nastavte karty navigácie, dlaždice domovskej obrazovky, výzvu na prihlásenie a súkromie adresára členov pre aplikáciu členov B1.church v B1 Admin."
---

# Nastavenia mobilnej aplikácie

<div class="article-intro">

Stránka Nastavenia mobilnej aplikácie vám umožňuje nakonfigurovať navigačné karty, ktoré sa zobrazujú v **mobilnom prostredí B1.church (PWA)** pre členov vašej cirkvi. Riadite, ktoré karty sú viditeľné, kam odkazujú a ako sa zobrazujú.

</div>

## Video s návodom

<YouTube id="ydY7WGK16fE" title="Prispôsobenie aplikácie pre členov vašej cirkvi v B1" />

:::info Natívna aplikácia B1 Mobile je zastaraná
Karty nakonfigurované tu sa doručujú cez [progresívnu webovú aplikáciu (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), ktorá nahradila natívnu aplikáciu B1 Mobile. Zdieľajte s členmi inštalačnú stránku vašej cirkvi — `https://yourchurchname.b1.church/mobile/install` — ktorá ich prevedie inštaláciou aplikácie na ich zariadení, bez potreby sťahovania z App Store alebo Google Play.
:::

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete oprávnenie „Upraviť nastavenia cirkvi". Ak nemáte prístup, pozrite si [Roly a oprávnenia](./roles-permissions.md).
- Najskôr nakonfigurujte [Nastavenia cirkvi](./church-settings.md), vrátane názvu cirkvi a brandingu

</div>

## Prístup k nastaveniam navigácie

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu) a rozbaľte **Mobilné**.
2. Kliknite na **Navigácia** (`/mobile/navigation`).
3. Stránka Navigácia zobrazuje vaše aktuálne karty aplikácie.

## Pridanie novej karty

1. Kliknite na tlačidlo **Pridať kartu** v hornej časti stránky.
2. Vyplňte údaje o karte:
   - **Názov** -- Popisok, ktorý sa zobrazí na karte (napríklad „Kázne" alebo „Dary").
   - **Ikona** -- Kliknutím na výber ikon vyberte ikonu pre kartu.
   - **Obrázok** -- Kliknite na **Vybrať obrázok** (alebo **Zmeniť obrázok**) a karte priraďte fotografiu. Karty s fotografiou sa na domovskej obrazovke aplikácie zobrazujú ako dlaždice s fotkou -- pozri [Dlaždice na domovskej obrazovke](#home-screen-tiles).
   - **Typ karty** -- Vyberte z možností ako Biblia, Živé vysielanie, Dary, Webová stránka a ďalšie.
   - **URL** -- Zadajte webovú adresu, na ktorú má karta odkazovať.
   - **Viditeľnosť** -- Určite, kto môže kartu vidieť (všetci, iba členovia atď.). Pri karte **Adresár členov** toto nastavenie riadi iba to, kto vidí samotnú kartu. Kto môže adresár otvoriť, nastavuje možnosť **Zobraziť v adresári** na stránke portálu člena (pozri [Nastavenia adresára členov a správ](#member-directory--messaging-settings)).
3. Kliknite na **Uložiť kartu**, aby sa pridala do vašej aplikácie.

## Úprava existujúcej karty

1. Kliknite na ľubovoľnú existujúcu kartu v zozname **Karty aplikácie**.
2. Upravte názov, ikonu, URL, typ alebo nastavenia viditeľnosti karty.
3. Kliknutím na **Uložiť kartu** použite zmeny.

## Zmena poradia kariet

Poradie, v akom sa karty zobrazujú v mobilnej aplikácii, môžete zmeniť. Karty presúvajte v zozname ťahaním a pustením. Poradie zobrazené na tejto stránke zodpovedá poradiu, ktoré uvidia vaši členovia v aplikácii.

:::info
Niektoré karty sa môžu zobraziť automaticky, keď nastanú určité podmienky -- napríklad karta Živé vysielanie sa môže objaviť, keď je vysielanie aktívne. Ručne pridané karty vám dávajú úplnú kontrolu nad tým, čo členovia vidia v každom čase.
:::

:::tip
Udržujte počet kariet v rozumnej miere. Pre väčšinu cirkví sa osvedčia tri až päť kariet. Príliš veľa kariet môže členom sťažiť orientáciu.
:::

## Nastavenia adresára členov a správ

Položka **Portál člena** v tej istej sekcii Mobilné obsahuje nastavenia, ktoré riadia adresár členov a súkromné správy v prostredí B1.church:

- **Skupina na schvaľovanie adresára** -- Skupina, ktorá kontroluje aktualizácie adresára členov a [žiadosti o vymazanie účtu](../profile/account-deletion.md), skôr ako nadobudnú účinnosť.
- **Zobraziť v adresári** -- Kto môže otvoriť adresár členov a kto je v ňom uvedený: **Iba správcovia**, **Členovia a vyššie** (predvolené), **Pravidelní návštevníci a vyššie** alebo **Návštevníci a vyššie**. Ľudia, ktorých stav členstva je pod úrovňou, ktorú vyberiete, adresár nevidia a nie sú v ňom uvedení. **Iba správcovia** uzavrie adresár pre všetkých okrem zamestnancov s oprávnením People &gt; View (samotný stav členstva Zamestnanec nestačí). Tí môžu adresár vždy otvoriť a vidia všetkých bez ohľadu na toto nastavenie. Hostia nie sú nikdy zahrnutí, pretože každý, kto sa online zaregistruje sám, začína ako hosť.
- **Predvoľba viditeľnosti** -- Nastavuje celocírkevnú predvolenú hodnotu pre členov, ktorí si ešte nezvolili vlastné nastavenie. **Adresa**, **Telefónne číslo** a **E-mail** majú každý vlastný rozbaľovací zoznam s rovnakými piatimi úrovňami dostupnými všade, kde sa viditeľnosť nastavuje:
  - **Všetci** -- viditeľné pre ktoréhokoľvek, vrátane anonymných návštevníkov
  - **Členovia** -- viditeľné iba pre osoby so záznamom Člen alebo Zamestnanec
  - **Iba skupiny** -- viditeľné iba pre osoby, ktoré zdieľajú skupinu s touto osobou, a pre zamestnancov
  - **Vedúci mojich skupín a zamestnanci** -- viditeľné iba pre vedúcich skupiny, do ktorej táto osoba patrí, a pre zamestnancov
  - **Iba zamestnanci** -- viditeľné iba pre zamestnancov (kohokoľvek so stavom členstva Zamestnanec alebo s oprávnením People &gt; View) a pre samotnú osobu

  „Zamestnanec" v týchto úrovniach znamená ktokoľvek so stavom členstva Zamestnanec alebo s oprávnením People &gt; View. Zmeny skupín nadobúdajú účinnosť okamžite: niekto, kto sa pridá do skupiny alebo sa stane vedúcim skupiny, vidí zodpovedajúce údaje **Iba skupiny** alebo **Vedúci mojich skupín a zamestnanci** o členoch tejto skupiny bez toho, aby sa musel odhlásiť a znova prihlásiť.

  Členovia môžu tieto predvolené hodnoty prepísať pre svoj vlastný záznam na karte **Súkromie** svojho profilu v PWA B1.church -- pozri [Úprava vášho profilu](/docs/b1-church/getting-started/me-page).
- **Minimálny vek pre súkromné správy** -- Ochrana detí. B1 neotvorí **novú** konverzáciu so súkromnou správou, ak je niektorá z osôb mladšia ako tento vek, a to na základe dátumu narodenia (ak dátum narodenia nie je uložený, použije sa ako záložná možnosť rola v domácnosti). Ľudia pod týmto vekom zostávajú plne viditeľní v adresári. Blokovaná je iba priama správa, a to **v oboch smeroch**, pre všetkých vrátane zamestnancov. Skupinové konverzácie a správy rodičom dieťaťa stále fungujú. Možnosti sú Vypnuté, 13, 16 alebo 18; predvolená hodnota je **18**. Existujúce konverzácie nie sú ovplyvnené.

:::tip
Keďže kontrola minimálneho veku sa opiera o dátumy narodenia, uistite sa, že sú vyplnené pre deti vo vašom zbore. Toto nastavenie patrí do rovnakej skupiny ochranných opatrení pre deti ako [bezpečnostné opatrenia pri prihlasovaní](../attendance/checkin-safety.md).
:::

### Výzva na prihlásenie na domovskej obrazovke

Návštevníci, ktorí otvoria [domovskú obrazovku](/docs/b1-church/getting-started/navigating#home) aplikácie bez prihlásenia, uvidia krátku výzvu -- štandardne *„Prihláste sa, aby ste videli svoje skupiny, dary a ďalšie."* -- vedľa tlačidla **Prihlásiť sa**. Nastavenia **Výzva na prihlásenie na domovskej obrazovke** na tej istej stránke portálu člena (`/mobile/b1-mobile`) vám umožňujú ju zmeniť:

- **Zobraziť výzvu na prihlásenie na domovskej obrazovke aplikácie** -- Vypnutím skryjete výzvu aj tlačidlo **Prihlásiť sa** z domovskej obrazovky. Návštevníci sa môžu stále prihlásiť z ponuky aplikácie.
- **Text výzvy na prihlásenie** -- Predvolené znenie nahraďte vlastnou správou (až 150 znakov). Ak necháte pole prázdne, použije sa predvolené znenie. Toto pole je deaktivované, kým je výzva vypnutá.

Kliknite na **Uložiť**, aby sa zmeny uplatnili. Správa **Uložené** potvrdí zmenu. Uložením sa obnovia cachované nastavenia aplikácie, takže sa zmena zobrazí pri ďalšom načítaní domovskej obrazovky.

### Dlaždice na domovskej obrazovke

Karty, ktoré majú fotografiu (pozri **Obrázok** v časti [Pridanie novej karty](#adding-a-new-tab)), sa zobrazujú na [domovskej obrazovke](/docs/b1-church/getting-started/navigating#home) aplikácie ako dlaždice s fotkou v sekcii s nadpisom názvu vašej cirkvi. Patrí sem aj karta Verš dňa, ak jej priradíte fotografiu. Karty s fotkami sa zobrazujú aj na lište kariet.

Nastavenie **Dlaždice na domovskej obrazovke** na tej istej stránke portálu člena (`/mobile/b1-mobile`) riadi usporiadanie týchto dlaždíc. Vyberte **Rozloženie**:

- **Mriežka** -- Dve dlaždice v riadku (predvolené). Ak je počet dlaždíc nepárny, prvá dlaždica zaberá celú šírku.
- **Posúvateľný riadok** -- Jeden riadok dlaždíc, ktorý členovia posúvajú do strán.
- **Posúvanie (automatické)** -- Rovnaký riadok, ale pohybuje sa sám: približne každé štyri sekundy posunie o jednu dlaždicu a na konci sa vráti na začiatok. Pozastaví sa, keď sa ho člen dotkne, nad ním podrží kurzor alebo sa doň prepne klávesom Tab, a o niekoľko sekúnd neskôr pokračuje. Na zariadeniach s obmedzenými animáciami riadok stojí a funguje ako **Posúvateľný riadok**.
- **Zoznam** -- Zoznam s malou fotkou náhľadu vedľa názvu každej karty.

Kliknite na **Uložiť**, aby sa zmeny uplatnili.

### Sekcie domovskej obrazovky

Prihlásení členovia vždy vidia svoju históriu návštevnosti a odoslané formuláre na [stránke Ja](/docs/b1-church/getting-started/me-page). Prepínače **Sekcie domovskej obrazovky** na tej istej stránke portálu člena (`/mobile/b1-mobile`) ich môžu zobraziť aj na domovskej obrazovke:

- **Zobraziť moju návštevnosť na domovskej obrazovke** -- Pridá sekciu **Moja návštevnosť** s počtom návštev člena za posledných 90 dní, jeho dvoma najnovšími návštevami a odkazom **História** na jeho úplný zoznam návštev.
- **Zobraziť moje formuláre na domovskej obrazovke** -- Pridá sekciu **Moje formuláre** s dvoma najnovšími odoslanými formulármi člena a odkazom **Všetky formuláre**.

Obe sú predvolene vypnuté. Sekcia sa zobrazí iba prihláseným členom, ktorí majú aspoň jeden záznam na zobrazenie. Kliknite na **Uložiť**, aby sa zmeny uplatnili.

## Kde sa tieto karty zobrazujú

Karty, ktoré tu nakonfigurujete, sa zobrazujú v **PWA B1.church**, ktorú si členovia nainštalujú z ľubovoľnej stránky na `https://yourchurchname.b1.church`. Zmeny urobené na tejto stránke sa prejavia, keď člen aplikáciu nabudúce otvorí.

Na telefóne spodná lišta kariet zobrazuje **Domov**, až tri vaše karty a **Viac**. Na počítači hlavička zobrazuje až päť kariet. Vstavané obrazovky (ako Kázne, Dary alebo Skupiny) dostanú miesta ako prvé a karty **Interná stránka** vyplnia zostávajúce voľné miesta. Karty **Externá URL** a **Verš dňa** nikdy nedostanú miesto na lište. Každá karta, vrátane tých, ktoré sa nezmestili, je uvedená na stránke **Viac** v aplikácii. Pozri [Navigácia v B1App](/docs/b1-church/getting-started/navigating), čo vidia členovia. (Karty sa tiež zobrazujú v zastaranej [natívnej aplikácii B1 Mobile](/docs/b1-church/index.md) pre členov, ktorí ju ešte používajú, no táto aplikácia je zastaraná a už sa neaktualizuje.)

## Ďalšie kroky

- [Nastavenia cirkvi](./church-settings.md) -- Nakonfigurujte informácie o cirkvi a branding
- [Roly a oprávnenia](./roles-permissions.md) -- Spravujte prístup pre váš tím
