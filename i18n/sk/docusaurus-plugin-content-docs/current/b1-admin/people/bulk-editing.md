---
title: "Hromadné úpravy osôb"
description: "Hromadne upravte stav členstva, rodinný stav, pohlavie, odhlásenie, vlastné polia Áno/Nie alebo členstvo v skupinách pre mnoho ľudí naraz v B1 Admin."
---

# Hromadné úpravy osôb

<div class="article-intro">
Hromadné úpravy vám umožňujú aktualizovať viacero osôb naraz, čo šetrí čas pri vykonávaní rovnakej zmeny u mnohých ľudí. Môžete upraviť stav členstva, rodinný stav, pohlavie, preferencie odhlásenia a členstvo v skupinách v jednej operácii.
</div>

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Potrebujete oprávnenie na správu údajov o osobách. Podrobnosti nájdete v časti [Roly a oprávnenia](./roles-permissions.md).
- Osoby, ktoré chcete upraviť, by ste už mali mať pridané alebo importované. V prípade potreby pozrite [Pridávanie osôb](./adding-people.md).
</div>

## Výber osôb na hromadnú úpravu

1. Prejdite na **Osoby** v B1 Admin
2. Pomocou vyhľadávania alebo filtrov nájdite osoby, ktoré chcete aktualizovať
3. Začiarknite políčka pri osobách, ktoré chcete vybrať
   - V zobrazení **Domácnosti** označením domácnosti vyberiete všetkých jej členov
   - V zobrazení **Tabuľka** (prepínanie pomocou prepínača **Zobraziť ako**) môžete vyberať osoby jednotlivo
   - Alebo použite začiarkavacie políčko nad zoznamom a vyberte všetky zobrazené osoby
4. Akonáhle vyberiete aspoň jednu osobu, lišta nad zoznamom zobrazí počet vybraných osôb spolu s tlačidlami **Zrušiť výber** a **Akcie**

:::tip
Ak potrebujete aktualizovať veľkú skupinu osôb na základe konkrétnych kritérií, použite funkciu [AI vyhľadávanie](./ai-search.md) alebo filtre na zúženie zoznamu a potom vyberte všetky zodpovedajúce osoby.
:::

## Dostupné hromadné akcie

Ponuka **Akcie** obsahuje niekoľko možností:

### Aktualizácia stavu členstva

Aktualizujte stav členstva pre všetky vybrané osoby:

1. Kliknite na **Akcie** → **Nastaviť stav členstva**
2. Vyberte nový stav:
   - **Návštevník** -- Prví alebo príležitostní návštevníci
   - **Hosť** -- Hostia, napríklad rodiny zaregistrované na check-in kiosku
   - **Pravidelný účastník** -- Časté návštevy, ktoré nie sú členmi
   - **Člen** -- Oficiálni členovia cirkvi
   - **Zamestnanec** -- Zamestnanci cirkvi
   - **Neaktívny** -- Osoby, ktoré už nenavštevujú
   - **Zosnulý** -- Osoby, ktoré zomreli
3. Vyberte režim aktualizácie:
   - **Prepísať všetko** -- Nahradí aktuálny stav u všetkých vybraných osôb
   - **Aktualizovať iba prázdne** -- Nastaví stav iba osobám, ktoré ho nemajú
4. Kliknite na **Aktualizovať**

### Aktualizácia rodinného stavu

Hromadne aktualizujte rodinný stav:

1. Kliknite na **Akcie** → **Nastaviť rodinný stav**
2. Vyberte nový stav:
   - **Neznámy**
   - **Slobodný/Slobodná**
   - **Ženatý/Vydatá**
   - **Rozvedený/Rozvedená**
   - **Ovdovený/Ovdovená**
3. Vyberte, či chcete prepísať existujúce hodnoty, alebo aktualizovať iba prázdne polia
4. Kliknite na **Aktualizovať**

### Aktualizácia pohlavia

Aktualizujte údaj o pohlaví u viacerých osôb:

1. Kliknite na **Akcie** → **Nastaviť pohlavie**
2. Vyberte hodnotu:
   - **Neurčené**
   - **Muž**
   - **Žena**
3. Vyberte režim aktualizácie (prepísať všetko alebo iba prázdne)
4. Kliknite na **Aktualizovať**

### Aktualizácia stavu odhlásenia

Určite, či osoby odmietli komunikáciu:

1. Kliknite na **Akcie** → **Nastaviť odhlásenie z adresára**
2. Vyberte:
   - **Nie** -- Povoliť komunikáciu (zrušiť odhlásenie)
   - **Áno** -- Blokovať komunikáciu (nastaviť odhlásenie)
3. Vyberte režim aktualizácie
4. Kliknite na **Aktualizovať**

:::warning
Buďte opatrní pri zmene stavu odhlásenia. Osoby, ktoré sa výslovne odhlásili, by nemali dostávať správy, pokiaľ neudelili nový súhlas.
:::

### Nastaviť vlastné pole

Nastavte hodnotu áno/nie [vlastného poľa](../settings/custom-fields.md) naraz pre všetky vybrané osoby:

1. Kliknite na **Akcie** → **Nastaviť vlastné pole**.
2. Vyberte vlastné pole typu áno/nie, ktoré chcete nastaviť.
3. Vyberte hodnotu (**Áno** alebo **Nie**), ktorú chcete použiť.
4. Kliknite na **Aktualizovať**.

:::info
Pre túto hromadnú akciu sú dostupné iba vlastné polia typu áno/nie. Ak chcete nastaviť polia iných typov, upravte každú osobu samostatne.
:::

### Pridať do skupiny

Pridajte všetky vybrané osoby do jednej alebo viacerých skupín:

1. Kliknite na **Akcie** → **Pridať do skupiny**
2. Vyhľadajte a vyberte skupinu(y), do ktorých chcete osoby pridať
3. Môžete vybrať viacero skupín a pridať osoby do všetkých z nich
4. Kliknite na **Pridať do skupín**

Každá osoba bude pridaná ako bežný člen vybranej skupiny(í). Neskôr môžete jednotlivcov v prípade potreby povýšiť na vedúcich skupiny na stránke [Členovia skupiny](../groups/group-members.md).

### Odobrať zo skupiny

Odstráňte všetky vybrané osoby z jednej alebo viacerých skupín:

1. Kliknite na **Akcie** → **Odobrať zo skupiny**
2. Vyhľadajte a vyberte skupinu(y), z ktorých chcete osoby odobrať
3. Môžete vybrať viacero skupín
4. Kliknite na **Odobrať zo skupín**

:::info
Táto akcia iba odstráni osoby z uvedených skupín. Nevymaže ich záznamy osôb.
:::

### Vymazať osoby

Natrvalo vymažte vybrané osoby z databázy vašej cirkvi:

1. Kliknite na **Akcie** → **Vymazať**
2. Dialóg **Vymazať vybrané osoby** vás vyzve na potvrdenie počtu osôb, ktoré budú vymazané
3. Kliknite na **Vymazať**

:::danger
Vymazanie osôb je trvalé a nedá sa vrátiť späť. Týmto sa odstránia všetky ich údaje vrátane:
- Osobných údajov
- Členstva v skupinách
- Záznamov o účasti
- Histórie darov
- Odoslaných formulárov

Túto akciu použite iba vtedy, ak ste si úplne istí, že chcete tieto osoby odstrániť zo systému.
:::

## Výsledky hromadnej úpravy

Po dokončení hromadnej akcie uvidíte súhrn, ktorý zobrazuje:

- **Celkom vybraných** -- Koľko osôb bolo zahrnutých do operácie
- **Úspešne aktualizované** -- Koľko záznamov bolo zmenených
- **Neúspešné** -- Záznamy, ktoré sa nepodarilo aktualizovať (ak je to relevantné)
- **Bez zmeny** -- Záznamy, ktoré nevyžadovali zmenu (napr. pri režime „aktualizovať iba prázdne“)

Ak nejaké aktualizácie zlyhali, uvidíte podrobnosti o chybách, ktoré vysvetľujú dôvod.

## Odporúčané postupy

- **Začnite v malom** -- Najprv otestujte hromadné operácie na niekoľkých záznamoch, aby ste sa uistili, že robíte správne zmeny
- **Používajte filtre** -- Pred výberom osôb zúžte zoznam pomocou filtrov alebo AI vyhľadávania, aby ste aktualizovali iba správnych jednotlivcov
- **Dvakrát skontrolujte výber** -- Pred použitím hromadných zmien si prezrite vybrané osoby
- **Používajte režim „aktualizovať iba prázdne“** -- Ak chcete doplniť chýbajúce údaje bez prepísania existujúcich informácií
- **Dokumentujte väčšie zmeny** -- Uchovávajte poznámky o hromadných aktualizáciách, aby ste ich mohli neskôr použiť ako referenciu
- **Koordinujte sa s tímom** -- Informujte ostatných administrátorov, keď robíte veľké hromadné zmeny

## Bežné prípady použitia

### Aktualizácia nových členov

Po absolvovaní kurzu členstva aktualizujte všetkých účastníkov na stav Člen:

1. Vyhľadajte osoby, ktoré sa kurzu zúčastnili
2. Vyberte ich všetkých
3. Použite **Akcie** → **Nastaviť stav členstva** → **Člen**

### Organizovanie malých skupín

Pridajte viacero osôb do novej malej skupiny:

1. Vyhľadajte osoby, ktoré chcete v skupine
2. Vyberte ich
3. Použite **Akcie** → **Pridať do skupiny** a vyberte malú skupinu

### Čistenie údajov

Doplňte chýbajúci rodinný stav pre manželské páry:

1. Filtrujte osoby, ktoré sú ženaté/vydaté (pomocou informácií o domácnosti)
2. Vyberte tie, ktoré majú prázdny rodinný stav
3. Použite **Akcie** → **Nastaviť rodinný stav** → **Ženatý/Vydatá** → **Aktualizovať iba prázdne**

## Súvisiace články

- [Vyhľadávanie osôb](./searching-people.md) -- Nájdite osoby na úpravu
- [AI vyhľadávanie](./ai-search.md) -- Použite prirodzený jazyk na nájdenie konkrétnych skupín osôb
- [Členovia skupiny](../groups/group-members.md) -- Spravujte členstvo v skupine
- [Export údajov](./exporting-data.md) -- Exportujte údaje o osobách pred hromadnými zmenami
