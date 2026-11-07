---
title: "Vyhľadávanie osôb"
description: "Hľadajte v adresári People v B1 Admin podľa mena, zoraďte a vyberte stĺpce v tabuľke, zostavte filtre cez Advanced Search a exportujte výsledky do CSV."
---

# Vyhľadávanie osôb

<div class="article-intro">

Stránka **Osoby** zobrazuje adresár vašej cirkvi ako prehľadný zoznam domácností alebo ako triediteľnú tabuľku jednotlivých osôb. Môžete rýchlo nájsť ktoréhokoľvek člena zboru, prispôsobiť, ktoré informácie sa zobrazujú, a exportovať výsledky. Efektívne vyhľadávanie je nevyhnutné pri každodenných úlohách cirkevnej správy, ako je nadväzovanie kontaktu s návštevníkmi, príprava zoznamov kontaktov a správa záznamov členov.

</div>

## Školiace video

<YouTube id="7Y-tN9RmnDQ" title="Vyhľadávanie osôb a tvorba zoznamov v B1" next="Vlastné polia, hromadné úpravy a export v B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete aktívny účet B1 Admin s oprávnením na zobrazenie osôb. Ak si nie ste istí svojím prístupom, pozrite si [Roly a oprávnenia](roles-permissions.md).
- Váš adresár cirkvi by mal obsahovať osoby. Ak ste ešte nikoho nepridali, pozrite si [Pridanie osôb](adding-people.md) alebo [Import údajov](importing-data.md).

</div>

## Domácnosti a zobrazenie tabuľky

Stránka Osoby zobrazuje adresár podľa **domácností**, zoradených podľa abecedy. Každý riadok zobrazuje fotografie domácnosti, jej názov (napríklad „The Smith Family“) a mená všetkých jej členov. Kliknutím na domácnosť otvoríte profil jej hlavy domácnosti alebo kliknutím na meno ľubovoľného člena otvoríte profil danej osoby. Nad zoznamom sa zobrazuje počet domácností a osôb, ktoré sa práve zobrazujú.

Pomocou prepínača **Zobraziť ako** nad zoznamom môžete prepnúť medzi zobrazením **Domácnosti** a **Tabuľka**. Zobrazenie **Tabuľka** uvádza jednu osobu na riadok a umožňuje triediť stĺpce a vyberať, ktoré stĺpce sa zobrazia (pozri nižšie). B1 si vašu voľbu pamätá na danom zariadení.

V zobrazení **Tabuľka** sa pod menom každej osoby zobrazuje jej stav členstva. Každý zo siedmich stavov má vlastnú farbu, rovnakú ako na profile danej osoby. Ak má niekto v domácnosti nastavenú rolu **Dieťa**, vedľa stavu sa zobrazí štítok **Dieťa**. Ak chcete niekoho označiť ako dieťa, nastavte jeho rolu v [paneli domácnosti](./adding-people.md#managing-households) na jeho profile.

Stránka sa predvolene načíta po častiach. Ak máte viac osôb, kliknutím na **Zobraziť všetkých členov** pod zoznamom načítate všetky osoby.

## Rýchle vyhľadávanie

Pole **Nájsť domácnosť alebo osobu** v hornej časti stránky Osoby vám umožňuje vyhľadávať členov v reálnom čase:

1. Kliknite na **vyhľadávacie pole** v hornej časti stránky Osoby.
2. Začnite písať meno.
3. Výsledky sa budú automaticky filtrovať, ako píšete (krátka pauza približne pol sekundy zabráni tomu, aby sa vyhľadávanie spúšťalo pri každom stlačení klávesu).
4. Zoznam pod ním sa aktualizuje a zobrazí iba zodpovedajúce výsledky.

Kliknutím na **Vymazať** (pod vyhľadávacím poľom) obnovíte vyhľadávanie a znovu zobrazíte celý adresár.

:::tip
Nemusíte stláčať Enter. Vyhľadávanie sa spustí automaticky, keď prestanete písať.
:::

## Triedenie výsledkov

V zobrazení **Tabuľka** sú osoby zoradené podľa priezviska a potom podľa mena. Adresár môžete zoradiť inak kliknutím na ľubovoľnú hlavičku stĺpca:

1. Kliknutím na **hlavičku stĺpca** (napríklad **Meno** alebo **E-mail**) zoradíte podľa tohto stĺpca.
2. Opätovným kliknutím na rovnakú hlavičku obrátite poradie triedenia.

Vďaka tomu môžete jednoducho hľadať osoby podľa abecedy, veku alebo podľa ktoréhokoľvek iného viditeľného stĺpca.

## Prispôsobenie stĺpcov

Nie všetky informácie musia byť viditeľné naraz. V tabuľke si môžete vybrať, ktoré stĺpce sa zobrazia:

1. Kliknite na ikonu **Vybrať stĺpce** v hlavičke stránky Osoby. (Stĺpce sa týkajú zobrazenia **Tabuľka**.)
2. Zaškrtnutím alebo odškrtnutím stĺpcov ich zobrazíte alebo skryjete. Dostupné stĺpce zahŕňajú:
   - **Fotografia**
   - **Meno**
   - **E-mail**
   - **Telefón**
   - **Adresa**
   - **Dátum narodenia**
   - **Vek**
   - **Pohlavie**
   - **Stav členstva**
   - **Kampus**
   - **Dátum pridania** -- kedy bol záznam osoby vytvorený
3. Tabuľka sa okamžite aktualizuje podľa vašich výberov. Kliknutím na **Hotovo** zatvoríte dialógové okno **Vybrať stĺpce**.

### Zobrazenie vlastných polí ako stĺpcov

Výber stĺpcov má dve karty: **Štandardné** obsahuje vstavané stĺpce uvedené vyššie a **Vlastné** obsahuje [vlastné polia](../settings/custom-fields.md) vašej cirkvi spolu s otázkami z formulárov pre osoby. Zaškrtnutím vlastného poľa na karte **Vlastné** ho pridáte ako stĺpec a v tabuľke sa zobrazí hodnota tohto poľa pre každú osobu. Hodnoty sa zobrazujú rovnako ako na profile danej osoby: polia Áno/Nie zobrazujú *Áno* alebo *Nie*, polia Výber z možností zobrazujú názov zvolenej možnosti a dátumy sa zobrazujú v krátkom formáte. Osoby bez hodnoty v danom poli majú prázdnu bunku.

## Export výsledkov vyhľadávania

Aktuálne výsledky vyhľadávania môžete kedykoľvek stiahnuť ako súbor CSV:

1. Použite akékoľvek vyhľadávanie alebo filtre, ktoré chcete.
2. Kliknite na tlačidlo **Exportovať** v hlavičke stránky Osoby.
3. Súbor CSV sa stiahne do vášho počítača a je pripravený na otvorenie v Exceli, Tabuľkách Google alebo v inej tabuľkovej aplikácii.

Ďalšie podrobnosti o exporte nájdete v časti [Export údajov](./exporting-data.md).

:::tip
Pre pokročilejšie dotazy -- napríklad na nájdenie všetkých, ktorí neboli na bohoslužbe posledné tri mesiace -- vyskúšajte funkciu [AI vyhľadávanie](./ai-search.md), ktorá umožňuje vyhľadávať pomocou otázok v bežnom jazyku.
:::

## Rozšírené vyhľadávanie

Rozšírené vyhľadávanie umožňuje vytvárať presné filtre kombináciou podmienok. Otvoríte ho kliknutím na **Rozšírené** pod vyhľadávacím poľom na stránke Osoby. Potom rozbaľte kategóriu a zaškrtnite polia, podľa ktorých chcete filtrovať (môžete kliknúť na názov poľa alebo na jeho zaškrtávacie políčko), a pri každom poli zvoľte operátor a hodnotu. Kategórie zahŕňajú **Mená**, **Demografia**, **Kontakt**, **Členstvo**, **Aktivita** (dary a účasť) a **Vlastné polia**.

Ak chcete nájsť nové osoby, otvorte **Členstvo** a zaškrtnite **Dátum pridania**. Predvolene je nastavené **za posledných N dní** s hodnotou 30, takže jedným kliknutím nájdete všetkých, ktorí boli pridaní za posledný mesiac. Počet dní môžete zmeniť alebo prepnúť na *rovná sa / po / pred*, aby ste vybrali konkrétny dátum. Možnosť **za posledných N dní** ponúkajú aj **Dátum narodenia** a **Výročie**. Dátum pridania sa zaznamenáva iba pre osoby vytvorené od konca októbra 2026; osoby pridané skôr nemajú dátum, a preto ich tento filter nenájde.

Kategória **Vlastné polia** obsahuje [vlastné polia](../settings/custom-fields.md) vašej cirkvi -- polia, ktoré definujete v Nastaveniach na sledovanie vlastných informácií (napríklad dátum vypršania platnosti overenia v registri trestov). Ponúkané operátory zodpovedajú typu každého poľa: textové polia podporujú *obsahuje / rovná sa / začína na / končí na*, číselné polia podporujú porovnávacie operátory, polia s dátumom podporujú *rovná sa / po / pred* a polia Áno/Nie a Výber z možností umožňujú vybrať hodnotu. Akékoľvek pole, podľa ktorého tu môžete filtrovať, môžete uložiť ako aktívny [zoznam](./lists.md).

## Ukladanie vyhľadávaní ako zoznamov

Po vykonaní vyhľadávania sa v hlavičke stránky Osoby zobrazí tlačidlo **Uložiť ako zoznam**. Kliknutím naň uložíte aktuálny dotaz pod názvom a voliteľnou kategóriou, aby ste ho mohli kedykoľvek neskôr okamžite znovu načítať. Podrobnosti nájdete v časti [Uložené zoznamy](./lists.md).
