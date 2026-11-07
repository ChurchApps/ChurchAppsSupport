---
title: "Roly a oprávnenia"
---

# Roly a oprávnenia

<div class="article-intro">

Roly vám umožňujú riadiť, k čomu majú rôzni používatelia prístup v rámci vášho účtu ChurchApps. Môžete vytvoriť vlastné roly pre zamestnancov, dobrovoľníkov a ďalších členov tímu, pričom každá rola bude mať vlastnú úroveň prístupu, aby ostali vaše údaje v bezpečí.

</div>

## Školiace video

<YouTube id="ZzCIkinVMnE" title="Roly, oprávnenia a pozývanie tímu v B1" next="Nastavenie služieb a dochádzky v B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete prístup Domain Admin alebo rolu s oprávnením spravovať roly
- Pripravte si zoznam členov tímu a oblastí, do ktorých potrebujú prístup
- Pozrite si nižšie dostupné kategórie oprávnení, aby ste mohli roly naplánovať

</div>

## Prístup k rolám

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel vľavo hore) a rozbaľte **Nastavenia**.
2. Kliknite na **Roly**.
3. Stránka Roly zobrazuje všetky roly definované pre váš kostol. Stĺpec **Členovia** ukazuje, koľko používateľov je v každej role, a riadok **(Všetci)** zobrazuje **Všetci používatelia**.

## Prehľad stránky Roly

Stránka Roly je rozdelená na dva panely:

- **Ľavá strana** -- Zobrazuje zoznam členov priradených k vybranej role.
- **Pravá strana** -- Zobrazuje nastavenia oprávnení, ktoré môžete pre túto rolu nakonfigurovať.

Kliknutím na názov ľubovoľnej roly zobrazíte a spravujete jej členov a oprávnenia.

## Pridanie používateľov do roly

1. Vyberte rolu, do ktorej chcete pridať členov.
2. Pomocou **vyhľadávacieho poľa** na ľavej strane vyhľadajte osobu, ktorú chcete pridať.
3. Vyberte osobu z výsledkov vyhľadávania.
4. Osoba sa okamžite pridá do roly.

## Odstránenie používateľov z roly

1. Vyberte rolu, ktorá obsahuje používateľa, ktorého chcete odstrániť.
2. Nájdite osobu v zozname členov na ľavej strane.
3. Kliknite na **tlačidlo odstránenia** vedľa jej mena.

## Nastavenie oprávnení

Každá rola môže mať prístup k určitým oblastiam B1 Admin. V paneli **Upraviť oprávnenia** sú oprávnenia zoskupené do sekcií, ktoré môžete rozbaliť, napríklad **Dochádzka**, **Obsah**, **Dary**, **Formuláre a plány**, **Lekcie**, **Správy**, **Ľudia a skupiny** a **Úlohy**. Ak chcete zobraziť iba zodpovedajúce oprávnenia, napíšte text do poľa **Filtrovať oprávnenia**.

Začiarknutím alebo odznačením oprávnenia ho pridelíte alebo odoberiete danej role. Každý nadpis sekcie ukazuje, koľko oprávnení z nej rola má, napríklad **2 z 5**, a tento počet sa aktualizuje pri zaškrtávaní a odškrtávaní políčok.

### Oprávnenia pre dary

Sekcia **Dary** obsahuje tieto oprávnenia:

- **Zobraziť súhrny darov** -- zobrazenie sekcie Dary vrátane stránok Súhrn, Dávky, Fondy, Kampane a Výpisy darov.
- **Zobraziť dary** -- zobrazenie jednotlivých darov, napríklad darov v rámci dávky.
- **Upraviť dary** -- plná kontrola: pridávanie, úprava a mazanie darov a dávok a [uzatváranie a znovuotváranie dávok](../donations/batches.md#closing-and-reopening-a-batch).
- **Zadávať dary** -- pridávanie dávok a zadávanie, úprava alebo mazanie darov, ale len v dávkach, ktoré sú ešte otvorené. Ľudia, ktorí majú iba toto oprávnenie, nemôžu mazať dávky, uzatvárať ich ani znovuotvárať, ani meniť dary prijaté cez online darovanie.
- **Upraviť nastavenia** -- správa nastavení darov.

Ak niekto má oprávnenie **Zadávať dary**, ale nie **Zobraziť súhrny darov**, vidí v sekcii **Dary** iba stránku **Dávky**. Tímu, ktorý počíta peniaze, pridelte rolu s oprávneniami **Zadávať dary** aj **Zobraziť dary**, aby mohli otvoriť dávku a vidieť dary, ktoré zadali. Podrobnosti nájdete v časti [Kto môže meniť dávku](../donations/batches.md#who-can-change-a-batch).

### Iba mená ľudí

Sekcia **Ľudia a skupiny** obsahuje oprávnenie **Zobraziť iba mená ľudí**. Použite ho pre dobrovoľníkov, ktorí potrebujú vyhľadávať ľudí podľa mena -- napríklad na výber osoby vo vyhľadávacom poli -- bez prístupu k úplnému adresáru. Iba s týmto oprávnením osoba:

- Môže vyhľadávať ľudí podľa mena a vidieť zoznam nedávno pridaných osôb, ale vidí len meno, fotografiu a stav členstva každej osoby
- Nemôže vyhľadávať podľa e-mailu, vidieť kontaktné údaje ani otvoriť adresár **Ľudia**

Oprávnenie **Zobraziť iba mená ľudí** kombinujte s **Zobraziť dochádzku** alebo **Upraviť dochádzku** pre dobrovoľníkov, ktorí zaznamenávajú dochádzku na hodinách. Položka **Ľudia** v ich menu potom otvorí **Skupiny**, kde môžu otvoriť zoznam **Všetky skupiny** a vidieť mená členov a stretnutia každej triedy. S oprávnením **Upraviť dochádzku** môžu tiež [zaznamenávať dochádzku](../attendance/recording-attendance.md) a pridávať návštevníkov vyhľadávaním ich mien. Mená nie sú odkazy na záznamy osôb a dôverné skupiny zostávajú skryté, pokiaľ dobrovoľník nie je ich členom.

B1 Admin skrýva odkazy a tlačidlá, ktoré vyžadujú oprávnenia, ktoré rola nemá. Napríklad zoznam **Všetky skupiny** je dostupný iba ľuďom, ktorí môžu upravovať skupiny, zobrazovať členov skupín alebo zobrazovať ľudí, prípadne ľuďom s oprávnením **Zobraziť iba mená ľudí** spolu s **Zobraziť dochádzku** alebo **Upraviť dochádzku** (ostatní sú presmerovaní na Prehľad). Nastavenie dochádzky sa zobrazí iba s oprávnením **Upraviť služby**. Tlačidlo **E-mail** skupiny sa zobrazí len osobám s oprávnením **Upraviť členov skupiny** (potrebným na odosielanie e-mailov skupine), tlač zoznamu skupiny vyžaduje **Zobraziť členov skupiny** alebo vedenie danej skupiny a odstránenie udalosti z kalendára vyžaduje **Upraviť obsah** (alebo stiahnutie vašej vlastnej čakajúcej žiadosti).

### Účty check-in kiosku

Účet, ktorým sa prihlasuje [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) kiosk, potrebuje oprávnenie **Checkin** v sekcii **Dochádzka** (alebo **Upraviť dochádzku**). S oprávnením **Checkin** samotným kiosk dokáže vyhľadávať rodiny podľa mena alebo telefónneho čísla, prihlasovať a odhlasovať ich a zobraziť, kto môže dieťa vyzdvihnúť, bez prístupu k adresáru Ľudia.

Oprávnenie Checkin sa už neudeľuje cez riadok **(Všetci)**. Byť v role s inými oprávneniami neumožňuje niekomu obsluhovať kiosk; pridajte **Checkin** do roly, napríklad „Dobrovoľníci pri check-in“, a účty kiosku zaraďte do nej.

:::warning
**Domain Admins** majú plný prístup do všetkých oblastí vášho účtu ChurchApps. Ich oprávnenia nemožno upravovať ani obmedzovať. Túto rolu používajte iba pre najdôveryhodnejších správcov.
:::

:::tip
Vytvorte špecifické roly, napríklad „Pokladník“ iba s prístupom k **Dary**, „Tím na počítanie“ s **Zadávať dary** a **Zobraziť dary**, alebo „Dobrovoľník pri check-in“ iba s prístupom k **Dochádzka**. Takto dodržiavate princíp najmenších oprávnení a vaše údaje zostávajú v bezpečí. Viac o tom, ako ChurchApps chráni vaše informácie, nájdete v časti [Bezpečnosť údajov](./data-security.md).
:::
