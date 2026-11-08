---
title: "Nastavenia mobilnej aplikácie"
description: "Nakonfigurujte navigačné karty, dlaždice na domovskej obrazovke, výzvu na prihlásenie a nastavenia súkromia adresára členov pre mobilnú aplikáciu B1.church v B1 Admin."
---

# Nastavenia mobilnej aplikácie

<div class="article-intro">

Stránka Nastavenia mobilnej aplikácie vám umožňuje nakonfigurovať navigačné karty, ktoré sa zobrazujú v **mobilnom prostredí B1.church (PWA)** pre vaších členov cirkvi. Môžete určiť, ktoré karty sú viditeľné, kam odkazujú a ako sa zobrazujú.

</div>

## Školiace video

<YouTube id="ydY7WGK16fE" title="Prispôsobenie aplikácie pre členov vašej cirkvi v B1" />

:::info
Karty nakonfigurované tu sa zobrazia v aplikácii B1 App, ktorú môžu členovia [nainštalovať ako progresívnu webovú aplikáciu (PWA)](../../b1-church/getting-started/installing-pwa.md). Zdieľajte s členmi stránku s inštaláciou vašej cirkvi — `https://yourchurchname.b1.church/mobile/install`. Prevedie ich inštaláciou aplikácie do ich zariadenia bez potreby sťahovania z App Store alebo Google Play.
:::

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete oprávnenie „Upraviť nastavenia cirkvi“. Ak nemáte prístup, pozrite si [Roly a oprávnenia](./roles-permissions.md).
- Najskôr nakonfigurujte [Nastavenia cirkvi](./church-settings.md), vrátane názvu cirkvi a brandingu

</div>

## Prístup k nastaveniam navigácie

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu) a rozbaľte položku **Mobile**.
2. Kliknite na **Navigation** (`/mobile/navigation`).
3. Stránka Navigation zobrazuje vaše aktuálne karty aplikácie.

## Pridanie novej karty

1. Kliknite na tlačidlo **Add Tab** v hornej časti stránky.
2. Vyplňte údaje o karte:
   - **Name** -- Názov, ktorý sa zobrazí na karte (napríklad „Kázne“ alebo „Dary“).
   - **Icon** -- Kliknutím na výber ikony zvoľte ikonu pre kartu.
   - **Image** -- Kliknite na **Select Image** (alebo **Change Image**) a pridajte karte fotografiu. Karty s fotografiou sa zobrazia ako fotodlaždice na domovskej obrazovke aplikácie -- pozrite si [Dlaždice domovskej obrazovky](#home-screen-tiles).
   - **Tab Type** -- Vyberte z možností, ako sú Bible, Live Stream, Donation, Website a ďalšie.
   - **URL** -- Zadajte webovú adresu, na ktorú má karta odkazovať.
   - **Visibility** -- Určite, kto môže kartu vidieť (každý, iba členovia a podobne). Pri karte **Member Directory** toto nastavenie ovplyvňuje len to, kto vidí samotnú kartu; to, kto môže adresár otvoriť, nastavuje možnosť **Show in Directory** na stránke Member portal (pozrite si [Nastavenia adresára členov a správ](#member-directory--messaging-settings)).
3. Kliknite na **Save Tab**, čím kartu pridáte do aplikácie.

## Úprava existujúcej karty

1. Kliknite na ľubovoľnú existujúcu kartu v zozname **App Tabs**.
2. Upravte názov, ikonu, URL, typ alebo nastavenia viditeľnosti karty.
3. Kliknite na **Save Tab**, čím uplatníte zmeny.

## Zmena poradia kariet

Môžete zmeniť poradie, v akom sa karty zobrazujú v mobilnej aplikácii. Kartami v zozname presúvajte myšou (drag and drop). Poradie zobrazené na tejto stránke zodpovedá poradiu, ktoré uvidia vaši členovia v aplikácii.

:::info
Niektoré karty sa môžu zobraziť automaticky, keď sú splnené určité podmienky -- napríklad karta Live Stream sa môže zobraziť, keď je stream aktívny. Ručne pridané karty vám dávajú úplnú kontrolu nad tým, čo vaši členovia vidia v každom okamihu.
:::

:::tip
Udržujte počet kariet zvládnuteľný. Pre väčšinu cirkví sa osvedčia tri až päť kariet. Príliš veľa kariet môže členom sťažiť orientáciu.
:::

## Nastavenia adresára členov a správ

Položka **Member portal** v rovnakej sekcii Mobile obsahuje nastavenia, ktoré riadia adresár členov a súkromné správy v prostredí B1.church:

- **Directory Approval Group** -- Skupina, ktorá kontroluje aktualizácie adresára členov a [žiadosti o zrušenie účtu](../profile/account-deletion.md), skôr než nadobudnú účinnosť.
- **Show in Directory** -- Kto môže otvoriť adresár členov a kto je v ňom uvedený: **Admins Only**, **Members and Above** (predvolené), **Regular Attendees and Above** alebo **Visitors and Above**. Osoby, ktorých stav členstva je pod úrovňou, ktorú zvolíte, adresár nevidia a nie sú v ňom uvedené. **Admins Only** uzavrie adresár pre všetkých okrem zamestnancov s oprávnením People &gt; View (samotný stav členstva Staff nestačí), ktorí môžu adresár vždy otvoriť a vidieť všetkých, bez ohľadu na toto nastavenie. Hostia sa nikdy nezahŕňajú, pretože každý, kto sa online zaregistruje sám, začína ako hosť.
- **Visibility Preference** -- Nastavuje predvolenú hodnotu pre celú cirkev pre členov, ktorí si ešte nezvolili vlastné nastavenie. **Address**, **Phone Number** a **Email** majú každý vlastnú rozbaľovaciu ponuku s rovnakými piatimi úrovňami, ktoré sú dostupné všade, kde sa viditeľnosť nastavuje:
  - **Everyone** -- viditeľné pre každého vrátane anonymných návštevníkov
  - **Members** -- viditeľné iba pre osoby so záznamom Member alebo Staff
  - **Groups Only** -- viditeľné iba pre osoby, ktoré s touto osobou zdieľajú skupinu, a pre zamestnancov
  - **My Group Leaders and Staff** -- viditeľné iba pre vedúcich skupiny, do ktorej táto osoba patrí, a pre zamestnancov
  - **Staff Only** -- viditeľné iba pre zamestnancov (ktokoľvek so stavom členstva Staff alebo s oprávnením People &gt; View) a pre samotnú osobu

  „Zamestnanec“ v týchto úrovniach znamená každého, kto má stav členstva Staff alebo oprávnenie People &gt; View. Zmeny skupín platia okamžite: niekto, kto sa pridá do skupiny alebo sa stane vedúcim skupiny, vidí zodpovedajúce údaje úrovní **Groups Only** alebo **My Group Leaders and Staff** o členoch tejto skupiny, bez odhlásenia a opätovného prihlásenia.

  Členovia môžu tieto predvolené hodnoty prepísať pre svoj vlastný záznam na karte **Privacy** vo svojom profile v PWA B1.church -- pozrite si [Úprava vášho profilu](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Ochrana detí. B1 neotvorí **novú** súkromnú konverzáciu, ak je niektorá z oboch osôb mladšia ako tento vek, na základe dátumu narodenia (ako záložná možnosť sa použije rola v domácnosti, ak dátum narodenia nie je evidovaný). Osoby mladšie ako tento vek zostávajú v adresári plne viditeľné -- blokované je iba priame posielanie správ, a to **v oboch smeroch**, pre všetkých vrátane zamestnancov. Skupinové konverzácie a posielanie správ rodičom dieťaťa stále fungujú. Možnosti sú Off, 13, 16 alebo 18; predvolená hodnota je **18**. Existujúce konverzácie nie sú ovplyvnené.

:::tip
Keďže kontrola minimálneho veku sa opiera o dátumy narodenia, uistite sa, že sú vyplnené dátumy narodenia detí vo vašom zbore. Toto nastavenie patrí do rovnakej skupiny ochrany detí ako [bezpečnostné nástroje pri check-in](../attendance/checkin-safety.md).
:::

### Výzva na prihlásenie na domovskej obrazovke

Návštevníci, ktorí otvoria [domovskú obrazovku](/docs/b1-church/getting-started/navigating#home) aplikácie bez prihlásenia, uvidia krátku výzvu -- predvolene *„Prihláste sa, aby ste videli svoje skupiny, dary a ďalšie.“* -- vedľa tlačidla **Sign In**. Nastavenia **Home screen sign-in prompt** na rovnakej stránke Member portal (`/mobile/b1-mobile`) vám umožňujú ich zmeniť:

- **Show sign-in prompt on the app home screen** -- Vypnutím skryjete výzvu aj tlačidlo **Sign In** z domovskej obrazovky. Návštevníci sa môžu prihlásiť aj naďalej z ponuky aplikácie.
- **Sign-in prompt text** -- Nahraďte predvolené znenie vlastnou správou (až 150 znakov). Ak necháte pole prázdne, použije sa predvolené znenie. Toto pole je deaktivované, keď je výzva vypnutá.

Kliknutím na **Save** uplatníte zmeny. Správa **Saved** potvrdí zmenu. Uloženie obnoví uložené nastavenia aplikácie, takže sa zmena zobrazí pri ďalšom načítaní domovskej obrazovky.

### Dlaždice domovskej obrazovky

Karty, ktoré majú fotografiu (pozrite si **Image** v časti [Pridanie novej karty](#adding-a-new-tab)), sa zobrazujú na [domovskej obrazovke](/docs/b1-church/getting-started/navigating#home) aplikácie ako fotodlaždice v sekcii s názvom vašej cirkvi. Patrí sem aj karta Verse of the Day, ak jej pridáte fotografiu. Karty s fotografiou sa zobrazujú aj na lište kariet.

Nastavenie **Home screen tiles** na rovnakej stránke Member portal (`/mobile/b1-mobile`) určuje, ako sú tieto dlaždice rozložené. Zvoľte **Layout**:

- **Grid** -- Dve dlaždice v riadku (predvolené). Ak je počet dlaždíc nepárny, prvá dlaždica zaberá celú šírku.
- **Scrolling row** -- Jeden riadok dlaždíc, ktorý členovia posúvajú do strán.
- **Scrolling (automatic)** -- Rovnaký riadok posúvaný do strán, ktorý sa však pohybuje aj sám: približne každé štyri sekundy posunie o jednu dlaždicu a po poslednej dlaždici sa vráti na prvú. Pozastaví sa, keď sa ho člen dotkne, nad ním podrží kurzorom alebo sa doňho prepne tabulátorom, a o niekoľko sekúnd sa znova rozbehne. Na zariadeniach s obmedzeným pohybom riadok zostáva nehybný a funguje ako **Scrolling row**.
- **List** -- Zoznam s malou náhľadovou fotografiou vedľa názvu každej karty.

V oboch posúvateľných rozloženiach, keď je dlaždíc viac, než sa zmestí na šírku obrazovky, sa pod dlaždicami zobrazí rad bodiek, jedna za každú dlaždicu; bodka aktuálnej dlaždice je vyplnená. Členovia môžu klepnutím na bodku prejsť na danú dlaždicu.

Kliknutím na **Save** uplatníte zmeny.

### Sekcie domovskej obrazovky

Prihlásení členovia vždy vidia svoju históriu návštev a odoslané formuláre na [stránke Me](/docs/b1-church/getting-started/me-page). Prepínače **Home screen sections** na rovnakej stránke Member portal (`/mobile/b1-mobile`) ich môžu zobraziť aj na domovskej obrazovke:

- **Show My Attendance on Home** -- Pridá sekciu **My Attendance** s počtom návštev člena za posledných 90 dní, jeho dvoma najnovšími návštevami a odkazom **History** na jeho úplný zoznam účasti.
- **Show My Forms on Home** -- Pridá sekciu **My Forms** s dvoma najnovšími odoslanými formulármi člena a odkazom **All forms**.

Obe sú predvolene vypnuté. Sekcia sa zobrazí iba prihláseným členom, ktorí majú aspoň jeden záznam na zobrazenie. Kliknutím na **Save** uplatníte zmeny.

## Kde sa tieto karty zobrazujú

Karty, ktoré tu nakonfigurujete, sa zobrazujú v **PWA B1.church**, ktorú si členovia nainštalujú z ľubovoľnej stránky na `https://yourchurchname.b1.church`. Zmeny, ktoré na tejto stránke urobíte, sa prejavia pri ďalšom otvorení aplikácie členom.

Na telefóne spodná lišta kariet zobrazuje **Home**, najviac tri vaše karty a **More**; na počítači hlavička zobrazuje najviac päť kariet. Vstavané obrazovky (ako Sermons, Giving alebo Groups) dostanú miesta ako prvé a karty **Internal Page** vyplnia všetky voľné miesta. Karty **External URL** a **Verse of the Day** nikdy nedostanú miesto na lište. Každá karta vrátane tých, ktoré sa nezmestia, je uvedená na stránke **More** v aplikácii.

Výnimkou sú karty umiestnené vnútri karty **Folder**: zobrazia sa iba na vlastnej obrazovke priečinka, ktorú členovia otvoria klepnutím na priečinok. Táto obrazovka zobrazuje karty ako fotodlaždice, ak majú všetky obrázok, inak ako zoznam. Priečinok, ktorý neobsahuje karty viditeľné pre daného člena, je pre tohto člena skrytý. Pozrite si [Karty priečinkov](../../b1-church/getting-started/navigating.md#folder-tabs). Čo vidia členovia, nájdete v časti [Navigácia v B1App](../../b1-church/getting-started/navigating.md).

## Ďalšie kroky

- [Nastavenia cirkvi](./church-settings.md) -- Nakonfigurujte informácie o cirkvi a branding
- [Roly a oprávnenia](./roles-permissions.md) -- Spravujte prístup pre váš tím
