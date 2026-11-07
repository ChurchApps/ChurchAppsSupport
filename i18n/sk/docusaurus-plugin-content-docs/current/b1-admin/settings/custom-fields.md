---
title: "Vlastné polia"
---

# Vlastné polia

<div class="article-intro">

**Vlastné polia** vám umožňujú sledovať vlastné informácie na každom zázname osoby, napríklad údaje, pre ktoré B1 nemá vstavané pole, ako je dátum expirácie preverenia v registri trestov, veľkosť tričkov alebo stav absolvovania krstnej prípravy. Pole definujete raz v Nastaveniach, potom vyplníte hodnotu v profile každej osoby a podľa nej môžete vyhľadávať alebo vytvárať zoznamy. Tým sa nahrádza starší postup, pri ktorom ste na uloženie jedného údaju vytvárali formulár pre ľudí.

</div>

## Video s návodom

<YouTube id="yUfDEbp2HQ4" title="Vlastné polia, hromadné úpravy a export v B1" next="Vytváranie skupín a pridávanie členov v B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Pred začiatkom</h4>

- Na definovanie polí a vypĺňanie hodnôt potrebujete oprávnenie na úpravu sekcie **Ľudia** a prístup do oblasti **Nastavenia**. Každý, kto má oprávnenie na zobrazenie sekcie Ľudia, môže hodnoty vidieť. Pozri [Roly a oprávnenia](./roles-permissions.md).
- Pred začiatkom si ujasnite, čo chcete sledovať, a vyberte typ, ktorý najlepšie zodpovedá údaju (text, číslo, dátum, áno/nie alebo výber z možností).

</div>

## Otvorenie vlastných polí

V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel vľavo hore), vyberte **Nastavenia > Nastavenia** a v ľavom zozname kliknite na **Vlastné polia**, čím sa posuniete do sekcie **Vlastné polia**. Môžete tiež prejsť priamo na adresu **/settings/custom-fields**. Zobrazí sa zoznam všetkých definovaných polí s ich **názvom** a **typom poľa**. Ak ste zatiaľ žiadne nevytvorili, panel zobrazí správu *„Zatiaľ neboli pridané žiadne vlastné polia.“*

## Pridanie poľa

1. Kliknite na **Pridať pole**.
2. V editore, ktorý sa otvorí vpravo, zadajte **Názov**. Tento názov uvidia zamestnanci na profiloch osôb a vo vyhľadávaní (napríklad *Preverenie v registri trestov expiruje*).
3. Vyberte **Typ poľa**:
   - **Textové pole** – voľný krátky text.
   - **Celé číslo** – čísla bez desatinných miest (napríklad počet).
   - **Desatinné číslo** – čísla, ktoré môžu obsahovať desatinné miesta.
   - **Dátum** – kalendárny dátum.
   - **Áno/Nie** – jednoduchá odpoveď áno alebo nie.
   - **Výber z možností** – zoznam na výber. Pri tomto type sa zobrazí **editor možností**, v ktorom pridáte každú možnosť, ktorú môžu ľudia zvoliť.
4. Kliknite na **Uložiť**.

Pole je teraz dostupné na profile každej osoby.

:::info
Typy polí sú rovnaké ako typy [otázok vo formulároch](../forms/creating-forms.md), takže hodnoty sa správajú v celej aplikácii B1 jednotne.
:::

## Úprava poľa

Kliknite na ľubovoľný riadok poľa v zozname a otvorte ho v editore. Zmeňte názov, typ alebo možnosti a kliknite na **Uložiť**.

:::warning
Zmena **typu poľa** pri poli, ktoré už má uložené hodnoty (napríklad z textového poľa na dátum), môže spôsobiť, že doterajšie hodnoty budú v formáte, ktorý nezodpovedá novému typu. Keď zamestnanci začnú pole vypĺňať, meňte typy opatrne.
:::

## Odstránenie poľa

Otvorte pole na úpravu a kliknite na **Odstrániť**. Budete požiadaní o potvrdenie správou: *„Naozaj chcete odstrániť toto vlastné pole? Jeho uložené hodnoty budú tiež odstránené.“* Odstránením poľa sa natrvalo odstráni **pole a všetky hodnoty uložené v ňom** pri všetkých osobách. Túto akciu nie je možné vrátiť späť.

## Vyplnenie hodnôt pri osobe

Keď existuje aspoň jedno vlastné pole, jeho hodnoty sa zobrazujú priamo spolu so základnými údajmi v zázname každej osoby. Zobrazíte ich pri kontaktných údajoch osoby na ľavej strane profilu a upravujete ich vo formulári, ktorý používate na ostatné údaje osoby. Kým nedefinujete prvé pole, nezobrazí sa nič navyše.

1. V sekcii **Ľudia** otvorte záznam osoby.
2. Kliknite na tlačidlo **Upraviť** na ľavej strane profilu, pod kontaktnými údajmi osoby.
3. Posuňte sa do oblasti **Vlastné polia** v spodnej časti formulára na úpravu a vyplňte hodnotu pre každé pole. Každé pole zobrazuje vstup zodpovedajúci svojmu typu – výber dátumu pri poliach typu Dátum, rozbaľovací zoznam Áno/Nie pri poliach Áno/Nie, zoznam na výber pri type Výber z možností a podobne.
4. Kliknite na **Uložiť**. Hodnoty vlastných polí sa uložia spolu so zvyškom údajov osoby.

Na profile sa teraz pod kontaktnými údajmi osoby zobrazí každé pole, ktoré má hodnotu, v tvare *Názov poľa: hodnota* (odpovede Áno/Nie sa zobrazia ako *Áno* alebo *Nie* a pri výbere z možností sa zobrazí označenie možnosti). Prázdne polia sa jednoducho skryjú. Ak chcete hodnotu odstrániť, upravte osobu, vymažte pole a uložte zmeny. Prázdna hodnota sa zo záznamu odstráni a neuloží sa ako prázdna.

:::tip
Typickým použitím je bezpečnosť dobrovoľníkov: vytvorte pole typu **Dátum** s názvom *Preverenie v registri trestov expiruje*, zaznamenajte dátum pri každom dobrovoľníkovi a potom vytvorte [uložený zoznam](../people/lists.md), ktorý označí každého, komu dátum uplynul.
:::

## Vyhľadávanie a vytváranie zoznamov podľa vlastných polí

Vlastné polia sa dajú plne prehľadávať:

1. Na stránke **Ľudia** otvorte [Rozšírené vyhľadávanie](../people/searching-people.md).
2. Rozbaľte kategóriu **Vlastné polia**.
3. Označte pole, podľa ktorého chcete filtrovať, vyberte operátor a zadajte hodnotu. Ponúkané operátory zodpovedajú typu poľa:
   - **Textové pole** – obsahuje, sa rovná, začína na, končí na.
   - **Celé číslo / Desatinné číslo** – sa rovná, väčšie ako, väčšie alebo rovné, menšie ako, menšie alebo rovné.
   - **Dátum** – sa rovná, po (väčšie ako), pred (menšie ako).
   - **Áno/Nie** – sa rovná Áno alebo Nie.
   - **Výber z možností** – sa rovná jednej z možností alebo obsahuje jednu z nich.

Každé vyhľadávanie podľa vlastného poľa môžete uložiť ako [zoznam](../people/lists.md). Zoznamy sú dynamické dotazy, takže zoznam vytvorený pre *Preverenie v registri trestov expiruje je pred dnešným dňom* pri každom otvorení znovu skontroluje všetky osoby a nevyžaduje ručnú údržbu.

## Zobrazenie vlastného poľa ako stĺpca

Ak chcete naraz vidieť hodnoty poľa pri všetkých osobách, pridajte ho ako stĺpec na stránke **Ľudia**. Prepnite **Zobraziť ako** na **Tabuľka**, kliknite na ikonu **Vybrať stĺpce** v hlavičke stránky, prepnite na kartu **Vlastné** a označte pole. Hodnota každej osoby sa zobrazí v samostatnom stĺpci vedľa vstavaných stĺpcov. Pozri [Zobrazenie vlastných polí ako stĺpcov](../people/searching-people.md#showing-custom-fields-as-columns).

## Čo sa stane pri zlúčení

Keď [zlúčite dva záznamy osôb](../people/adding-people.md), hodnoty vlastných polí sa prenesú automaticky. Ponechaná osoba si zachová svoje hodnoty. Pri každom poli, pri ktorom mala hodnotu iba odstránená osoba, sa táto hodnota skopíruje, aby sa nič nestratilo.

## Súvisiace články

- [Vyhľadávanie osôb](../people/searching-people.md) – rozšírené vyhľadávanie vrátane kategórie Vlastné polia a zobrazenia vlastných polí ako stĺpcov
- [Uložené zoznamy](../people/lists.md) – uloženie vyhľadávania podľa vlastného poľa a jeho opätovné spustenie
- [Roly a oprávnenia](./roles-permissions.md) – kto môže definovať polia a upravovať hodnoty
- [Vytváranie formulárov](../forms/creating-forms.md) – na zber údajov z viacerých otázok, keď je celý formulár vhodnejší ako jednotlivé polia
