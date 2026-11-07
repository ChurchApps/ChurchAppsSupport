---
title: "Kampusy"
description: "Nastavte pobočky v B1 Admin, aby ste sledovali, ku ktorej lokalite patrí každý človek a skupina, a potom filtrujte ľudí, účasť a demografiu podľa miesta."
---

# Kampusy

<div class="article-intro">

Ak sa vaša cirkev schádza na viacerých miestach, **Kampusy** vám umožňujú sledovať, ku ktorému miestu patrí každá osoba a každá skupina. Po nastavení sa kampusy zobrazia ako možnosť v profiloch osôb, pri nastavení dochádzky a na paneli Demografia. Cirkvi s viacerými miestami môžu v celej aplikácii B1 Admin filtrovať, vyhľadávať a vytvárať prehľady podľa kampusu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Na správu kampusov potrebujete oprávnenie **Upraviť nastavenia cirkvi**. Pozri [Roly a oprávnenia](./roles-permissions.md).

</div>

## Otvorenie nastavení kampusov

V aplikácii B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), vyberte **Nastavenia > Nastavenia** a kliknite na **Kampusy** v zozname vľavo, čím sa posuniete na sekciu **Kampusy**. Môžete sa tam dostať aj priamo na **/settings/campuses**. Zobrazí sa zoznam všetkých nastavených kampusov s ich názvom, umiestnením a časovým pásmom.

## Pridanie kampusu

1. Kliknite na **Pridať kampus**.
2. Vyplňte údaje o kampuse:
   - **Názov** *(povinné)* — zobrazovaný názov, ktorý sa používa v celej aplikácii B1 Admin (napríklad „Hlavný kampus“ alebo „Severný kampus“).
   - **Adresa** — ulicová adresa kampusu (slúži na informáciu; nie je to rovnaká adresa ako hlavná adresa vašej cirkvi v Nastaveniach cirkvi).
   - **Mesto / Štát / PSČ** — umiestnenie kampusu.
   - **Časové pásmo** — časové pásmo IANA pre tento kampus (napríklad *America/Chicago*). [Rozvrhy prihlasovania](../attendance/setup.md#setting-a-check-in-schedule) pre bohoslužby v tomto kampuse sa otvárajú a zatvárajú v tomto časovom pásme. Ak je nastavené na **Žiadne**, použije sa namiesto toho [Časové pásmo](./church-settings.md#time-zone) vašej cirkvi. Je to užitočné, keď sú kampusy v rôznych časových pásmach.
   - **Webová stránka** — voliteľná URL adresa webovej prezentácie tohto kampusu.
3. Kliknite na **Uložiť**.

## Úprava kampusu

Kliknutím na ľubovoľný riadok kampusu v zozname otvoríte jeho editor v paneli vpravo. Upravte polia a kliknite na **Uložiť**.

## Odstránenie kampusu

Otvorte kampus na úpravu a kliknite na **Odstrániť**. Budete požiadaní o potvrdenie. Odstránenie kampusu neodstráni osoby, ktoré mu sú priradené — ich pole Kampus sa jednoducho vyprázdni.

## Priradenie osôb ku kampusu

Po vytvorení kampusov môže personál priradiť osobu ku kampusu z jej profilu:

1. Otvorte záznam osoby v sekcii **Ľudia**.
2. Kliknite na **Upraviť**.
3. Vyberte kampus z rozbaľovacieho zoznamu **Kampus**.
4. Kliknite na **Uložiť**.

Kampus môžete aktualizovať aj hromadne na stránke Ľudia. Vyberte viacero osôb, použite **Hromadná úprava** a nastavte pole Kampus pre všetkých naraz.

## Filtrovanie podľa kampusu

Keď sú kampusy nastavené, môžete v celej aplikácii B1 Admin filtrovať podľa kampusu:

- **Vyhľadávanie osôb** — pridajte podmienku Kampus v rozšírenom vyhľadávaní alebo načítajte [uložený zoznam](../people/lists.md) obmedzený na konkrétny kampus.
- **Demografia** — [panel Demografia](../people/demographics.md) zobrazí koláčový graf Kampus, keď má aspoň jedna osoba priradený kampus.
- **Nastavenie dochádzky** — každý čas bohoslužby v Dochádzke možno priradiť ku kampusu.

:::tip
Cirkvi s jedným miestom nemusia kampusy nastavovať. Všetky funkcie kampusov sú voliteľné — ak neexistujú žiadne kampusy, polia a grafy kampusov sa jednoducho nezobrazia.
:::

## Súvisiace články

- [Nastavenia cirkvi](./church-settings.md) — hlavná adresa vašej cirkvi a branding (oddelené od adries kampusov)
- [Demografia](../people/demographics.md) — graf rozdelenia podľa kampusu
- [Nastavenie dochádzky](../attendance/setup.md) — priradenie časov bohoslužieb ku kampusu
- [Hromadná úprava](../people/bulk-editing.md) — priradenie kampusu viacerým osobám naraz
