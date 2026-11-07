---
title: "Pridávanie osôb"
---

# Pridávanie osôb

<div class="article-intro">

Sekcia Osoby je základom B1 Admin, je to databáza členov vašej cirkvi. Každá ďalšia funkcia (skupiny, dochádzka, dary, formuláre) sa viaže na záznamy osôb. Tento návod vás prevedie pridaním osoby do databázy, úpravou jej údajov a prepojením členov rodiny do domácností.

</div>

## Školiace video

<YouTube id="NTL1UDQpx8s" title="Pridávanie osôb a domácností v B1" next="Import databázy osôb v B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete aktívny účet B1 Admin s oprávnením spravovať osoby. Ak si nie ste istí svojou úrovňou prístupu, pozrite si [Roly a oprávnenia](roles-permissions.md).
- Ak pridávate viac než zopár osôb, zvážte použitie nástroja [CSV import](importing-data.md).

</div>

## Pridanie osoby

1. Prejdite na nástenku správy B1.church.
2. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Osoby** a kliknite na **Osoby**.
3. Kliknite na tlačidlo **Pridať osobu** v hlavičke stránky. Stránka sa posunie nadol k formuláru **Pridať novú osobu** pod adresárom.
4. Vyplňte **Meno**, **Priezvisko** a **E-mail**, potom kliknite na **Pridať**.

Otvorí sa profil osoby, kde môžete pridať ďalšie podrobnosti.

:::tip
Ak prechádzate z iného systému na správu cirkvi, funkcia [Import údajov](importing-data.md) vám umožní nahrať celý adresár zo súboru CSV. Je to oveľa rýchlejšie ako pridávať osoby jednu po druhej.
:::

### Upozornenia na duplicity

Ak e-mailová adresa (alebo pri vytváraní osoby z úplného formulára Upraviť telefónne číslo alebo zhodné meno, priezvisko a dátum narodenia) zodpovedá niekomu, kto už je vo vašej databáze, pred uložením nového záznamu sa zobrazí dialógové okno **Možný duplikát**. Zobrazuje každú zhodnú osobu spolu s jej e-mailom, telefónom a dátumom narodenia, aby ste ich mohli porovnať.

- Kliknutím na **Použiť existujúcu** pri zhode použijete záznam tejto osoby namiesto vytvorenia nového.
- Kliknutím na **Vytvoriť aj tak** pridáte novú osobu, aj keď sa našla možná zhoda.

Kontrola duplicít prebehne len pri vytváraní úplne novej osoby. Úprava existujúceho záznamu ju nikdy nespustí. Slúži len na zabránenie vzniku nových duplicít; nezlučuje dva už existujúce záznamy.

## Úprava údajov

1. Na profile osoby kliknite na tlačidlo **Upraviť** pod jej kontaktnými údajmi vľavo.
2. Vo formulári **Osobné údaje** doplňte ďalšie informácie, napríklad **Titul** (vyberte Mr, Mrs, Miss, Ms, Dr, Prof, Rev alebo Pastor zo zoznamu, alebo zadajte vlastný, najviac 10 znakov), stredné meno, stav členstva (**Návštevník**, **Hosť**, **Pravidelný účastník**, **Člen**, **Zamestnanec**, **Neaktívny** alebo **Zosnulý**), dátumy, adresu, telefónne čísla a (pre deti a študentov) ročník a školu.
3. Kliknutím na **Uložiť** uložte osobné údaje.

Ľavá strana profilu zobrazuje fotografiu osoby, meno, stav členstva, kontaktné údaje, hodnoty [vlastných polí](../settings/custom-fields.md) a jej domácnosť. Pod domácnosťou sa zobrazuje **Pridané**, čo je dátum vytvorenia záznamu (iba pre osoby pridané od konca októbra 2026). Kliknutím na fotografiu ju zmeníte. Pod tlačidlom **Upraviť** sú ďalšie akcie: **Pracovný postup** (pridanie osoby do [pracovného postupu](../serving/workflows.md)), **Zlúčiť**, **Exportovať** a **Exportovať údaje**.

Zvyšok profilu obsahuje súhrnnú sekciu pre každý typ súvisiacich údajov:

- **Dochádzka**: Ukazuje, ktorých z posledných niekoľkých týždňov sa osoba zúčastnila, a jej najnovšie návštevy. Kliknutím na **Všetky roky** zobrazíte úplnú históriu návštev vrátane kampusu, bohoslužby, času bohoslužby, skupiny a stĺpca **Prihlásený** s časom prihlásenia na kiosku (pri návštevách bez prihlásenia na kiosku sa zobrazuje pomlčka). Kliknutím na **Tlačiť** históriu vytlačíte. Výtlačok má na vrchu v strede logo a názov vašej cirkvi, nad menom osoby. Celocirkevné trendy namiesto histórie jednej osoby nájdete v časti [Sledovanie dochádzky](../attendance/tracking-attendance.md).
- **Dary**: Zobrazuje dary za tento rok vrátane darov do fondov, ktoré nie sú daňovo odpočítateľné. Kliknutím na **Všetky roky** zobrazíte úplnú [históriu darov](../donations/recording-donations.md), alebo kliknutím na **Zaznamenať dar** zapíšete nový. Ak vaša cirkev zapla [Ochranu súkromia darov](../settings/church-settings.md#giving-privacy), sumy zostanú skryté, kým nekleknete na **Zobraziť dary**.
- **Skupiny**: Zobrazuje [členstvá osoby v skupinách](../groups/group-members.md) s **Pripojená** a dátumom pripojenia do každej skupiny, ak je zaznamenaný.
- **Poznámky**: Zobrazuje nedávne poznámky o osobe (pastoračná starostlivosť, následné kroky a pod.). Kliknutím na **Všetky poznámky** poznámky čítate a pridávate. Každá poznámka ukazuje, kto ju napísal, a dátum a čas zápisu. Ak chcete naraz vidieť nedávne poznámky všetkých osôb, použite stránku [Poznámky](./notes.md).
- **Formuláre**: Zobrazuje formuláre osoby a to, či bol každý odoslaný (pozri nižšie [Práca s formulármi](#working-with-forms)).

Keď otvoríte niektoré z týchto úplných zobrazení, kliknutím na odkaz **Späť na** s menom osoby v hornej časti sa vrátite na profil.

## Odoslanie e-mailu osobe

Ak má osoba uvedenú e-mailovú adresu, pod jej kontaktnými údajmi vľavo na profile sa zobrazí tlačidlo **E-mail**.

1. Na profile osoby kliknite na **E-mail**.
2. Otvorí sa dialógové okno **E-mail** s menom osoby v názve, ktoré zobrazuje **Odoslať na** s adresou osoby.
3. Voliteľne vyberte uloženú šablónu z **Načítať šablónu (voliteľné)**.
4. Zadajte **Predmet** a napíšte správu.
5. Kliknite na **Odoslať e-mail**.

Ak chcete správu napísať vo svojom e-mailovom programe, kliknite na **Otvoriť v mojej e-mailovej aplikácii**.

:::info
Odosielanie z B1 podlieha rovnakým schvaľovacím a denným limitom ako e-mail skupinám. Ak vaša cirkev ešte nebola schválená, dialógové okno vás vyzve na požiadanie o kontrolu. Dovtedy môžete kliknúť na **Otvoriť v mojej e-mailovej aplikácii**. Pozri [Zapnutie e-mailu skupinám pre vašu cirkev](../groups/group-members.md#turning-on-group-email-for-your-church). Používatelia bez oprávnenia upravovať členov skupín po kliknutí na **E-mail** prejdú priamo do svojej e-mailovej aplikácie.
:::

## Práca s formulármi

Vlastné formuláre môžete vyplniť priamo z profilu osoby. Ide o formuláre definované používateľom, ktoré môžete vytvoriť podľa návodu [Vytváranie formulárov](../forms/creating-forms.md).

1. Na profile osoby nájdite sekciu **Formuláre**. Zobrazuje každý formulár spolu s tým, či bol **Odoslaný** alebo **Neodoslaný**.
2. Kliknutím na názov formulára ho otvoríte (alebo kliknutím na **Všetky formuláre** zobrazíte úplný zoznam).
3. Kliknite na **ikonu úpravy** (ceruzku) pri formulári, doplňte údaje a kliknite na **Uložiť**.

Keď je formulár odoslaný, kliknutím na **ikonu tlače** vedľa neho vytlačíte vyplnené odpovede danej osoby. Ak má osoba jedno odoslanie daného formulára, formulár zobrazuje nad odpoveďami **Odoslaný** a dátum.

Ak sa odoslanie dostalo k nesprávnej osobe, kliknite na ikonu **Zmeniť osobu** (dve šípky) vedľa neho a presuňte ho k inej osobe alebo ho odpojte. Pozri [Zmena osoby pri odoslaní](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formuláre prepojené s profilom osoby používajú typ formulára **Osoby**. Ak potrebujete samostatný formulár (napríklad registráciu na podujatie), pozri možnosť [Samostatný formulár](../forms/creating-forms.md) v návode k formulárom.
:::

:::tip
Ak potrebujete sledovať len jeden alebo dva ďalšie údaje o osobách, napríklad dátum, číslo alebo áno/nie, použite namiesto formulára [Vlastné polia](../settings/custom-fields.md). Vypĺňajú sa rýchlejšie a dajú sa vyhľadávať priamo v Rozšírenom vyhľadávaní.
:::

## Správa domácností {#managing-households}

Domácnosti umožňujú prepojiť členov rodiny. Je to užitočné najmä pre [prihlasovanie na kiosku](../attendance/check-in.md), kde môže rodič prihlásiť všetky svoje deti naraz.

1. Na profile osoby kliknite na **Upraviť** vedľa nadpisu **Domácnosť** vľavo.
2. Otvorí sa editor domácnosti. Vyberte **rolu v domácnosti** pre aktuálnu osobu (napr. Hlava, Manžel/Manželka, Dieťa, Iný).
3. Kliknutím na ikonu **Pridať** pridajte ďalšieho člena domácnosti.
4. V časti **Pridať člena domácnosti** zadajte meno osoby do vyhľadávacieho poľa a stlačte **Enter** alebo kliknite na ikonu lupy. (Pred písaním sa zobrazí krátky zoznam **Nedávne osoby**.)
5. Keď sa osoba zobrazí vo výsledkoch, kliknite na jej meno alebo na ikonu pridania vedľa neho.
6. Vyberte jej rolu v domácnosti a kliknutím na **Uložiť** dokončite nastavenie domácnosti.
