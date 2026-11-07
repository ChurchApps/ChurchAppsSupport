---
title: "Exportovanie údajov"
---

# Exportovanie údajov

<div class="article-intro">

B1 Admin vám umožňuje exportovať údaje vašej cirkvi, aby ste ich mohli použiť v tabuľkových procesoroch, zdieľať s tímom alebo si ich uložiť ako zálohu. Či už potrebujete rýchly zoznam mien a e-mailov, alebo úplný export databázy, máme možnosti, ktoré vyhovujú vašim potrebám.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Potrebujete aktívny účet B1 Admin s oprávnením na zobrazenie údajov, ktoré chcete exportovať. Ak si nie ste istí svojím prístupom, pozrite si [Roly a oprávnenia](roles-permissions.md).
- Na úplný export databázy potrebujete prístup k oblasti **Settings**.

</div>

## Export zo stránky People

Najrýchlejší spôsob, ako exportovať adresár, je priamo zo stránky **People**:

1. Otvorte [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu B1 Admin), rozbaľte **People** a kliknite na **People**.
2. Pomocou vyhľadávacieho panela alebo filtrov zúžte výsledky, ktoré chcete exportovať (alebo ponechajte zobrazenie bez filtrov, ak chcete exportovať všetkých). Tipy na filtrovanie nájdete v časti [Vyhľadávanie ľudí](searching-people.md).
3. Kliknite na tlačidlo **Export** v hlavičke stránky People.
4. Do počítača sa stiahne súbor CSV s ľuďmi z aktuálnych výsledkov vrátane mena, kontaktných údajov, adresy a ďalších štandardných polí.

:::tip
Export obsahuje všetkých ľudí z aktuálnych výsledkov. Najprv spustite vyhľadávanie, načítajte [Uložený zoznam](./lists.md) alebo použite vyhľadávanie **Advanced**, aby ste exportovali len ľudí, ktorých potrebujete.
:::

## Úplný export údajov z Nastavení

Na úplný export všetkých údajov B1 (nielen ľudí) použite nástroj na export v Nastaveniach:

1. V Jump menu vyberte **Settings > Settings**.
2. Kliknite na odkaz **Import/Export** pod názvom vašej cirkvi v hornej časti ľavej ponuky nastavení.
3. V rozbaľovacom zozname **Data Source** vyberte **B1 Database**.
4. Skontrolujte náhľad údajov a kliknite na **Continue to Destination**.
5. Ako cieľ exportu vyberte **B1 Export Zip**.
6. Sledujte priebeh exportu, kým všetky položky nezobrazia zelené značky.
7. Exportný súbor sa stiahne automaticky. Hľadajte súbor `B1Export` vo vašom priečinku na stiahnuté súbory.
8. Rozbaľte súbor, aby ste získali jednotlivé CSV súbory (napríklad `people.csv`), ktoré môžete otvoriť v Exceli, Tabuľkách Google alebo Numbers.

:::info
B1 Export Zip je úplná záloha údajov vašej cirkvi. Obsahuje:

- ľudí (vrátane fotografií) a domácnosti, vrátane kontaktov na vyzdvihnutie detí z domácnosti
- kampusy, bohoslužby a časy bohoslužieb
- skupiny a členov skupín
- fondy a dary vrátane darov rozdelených medzi viacero fondov
- účasť
- formuláre, otázky, odoslania a odpovede
- vlastné polia a ich hodnoty
- uložené zoznamy ľudí

Ak sa fotografiu osoby počas exportu nepodarí stiahnuť alebo prečítať, táto fotografia sa preskočí a export pokračuje bez nej.

Na obnovenie vyberte ako zdroj **B1 Import Zip** a ako cieľ **B1 Database** (pozrite si [Import údajov](./importing-data.md)). Domácnosti, kontakty na vyzdvihnutie a uložené zoznamy sa obnovia spolu s ľuďmi. Filtre uložených zoznamov sa nasmerujú na obnovené skupiny, fondy, kampusy a vlastné polia.
:::

## Export údajov skupiny

Členské zoznamy jednotlivých skupín môžete exportovať aj. Na stránke **Groups** otvorte skupinu a kliknutím na **ikonu sťahovania** exportujte zoznam jej členov. Ďalšie podrobnosti nájdete v časti [Členovia skupiny](../groups/group-members.md).

:::info
Exportované CSV súbory fungujú so všetkými hlavnými tabuľkovými aplikáciami vrátane Microsoft Excel, Tabuliek Google a Apple Numbers.
:::
