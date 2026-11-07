---
title: "Úlohy"
description: "Vytvárajte, priraďujte a uzatvárajte úlohy v B1 Admin, nájdite ich v Služby > Moja práca a nastavte pripomienky termínov, aby žiadna úloha nezapadla."
---

# Úlohy

<div class="article-intro">

Úlohy vám umožňujú priraďovať akčné položky jednotlivcom alebo skupinám vo vašom zbore. Či ide o jednorazovú úlohu alebo o opakujúcu sa zodpovednosť, úlohy vám pomôžu sledovať, čo treba urobiť a kto za to zodpovedá, aby sa nič nezabudlo.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Uistite sa, že osoby alebo [skupiny](../groups/creating-groups.md), ktorým chcete priradiť úlohy, existujú v B1 Admin
- V [ponuke Jump](../introduction.md#getting-around-with-the-jump-menu) vyberte **Serving > My Work**, aby ste zobrazili úlohy

</div>

## Zobrazenie úloh

V ponuke Jump vyberte **Serving > My Work** (alebo vyhľadajte „My Work“). Zoznam **Tasks** zobrazuje názov každej úlohy, s kým súvisí, komu je priradená, kedy bola otvorená a jej stav. Vaše [pracovné postupy](./workflows.md) sa zobrazia vedľa nej pod **My Cards**. Priradené osoby môžu vidieť a spracovávať svoje karty a otvorené úlohy aj na obrazovke **Me** v aplikácii B1.

Pomocou kariet nad zoznamom prepínajte medzi úlohami **Assigned to Me**, **Assigned to My Groups** a **Requested by Me**. Každá karta zobrazuje počet úloh, ktoré obsahuje.

:::tip
Predvolene sa zobrazujú iba otvorené úlohy. Ak chcete namiesto toho vidieť dokončené úlohy, vyberte **Closed** nad zoznamom.
:::

## Vytvorenie úlohy

1. Na stránke **My Work** kliknite na **Add Task**. Otvorí sa formulár **New Task**.
2. Voliteľne kliknite na pole **Associate with** a vyberte osobu alebo skupinu, ktorej sa úloha týka. Ak ide o jednoduchú úlohu, ktorá sa nikoho netýka, napríklad pripomienku pre seba, pole nechajte prázdne.
3. Kliknite na pole **Assign to**. V okne **Select a Person or Group** vyhľadajte na karte **Person**, alebo prepnite na kartu **Group**, vyhľadajte skupinu a vyberte výsledok.
4. Zadajte **Title** úlohy.
5. Voliteľne vyberte **Due date**.
6. Pridajte **Notes** s podrobnosťami alebo pokynmi pre priradenú osobu.
7. Kliknite na **Save**.

Úloha sa teraz zobrazí v zozname úloh a priradená osoba ju uvidí na svojom prehľade a v mobilnej aplikácii.

## Správa úlohy

Kliknutím na ľubovoľnú úlohu otvoríte jej podrobnú stránku. Odtiaľ môžete:

- **Uzavrieť alebo znovu otvoriť úlohu** -- Keď je práca hotová, kliknite na **Close task**, alebo na **Reopen task**, ak ju chcete znovu otvoriť.
- **Preradiť úlohu** -- Kliknite na **Assign** a vyberte inú osobu alebo skupinu.
- **Zmeniť, koho sa týka** -- Kliknite na **Associate** a vyberte inú osobu alebo skupinu, alebo zvoľte **No person or group**, ak chcete údaj odstrániť.
- **Zmeniť termín splnenia** -- Vyberte dátum v poli **Due**; uloží sa, keď kliknete mimo poľa. (Úlohy vytvorené na [potvrdenie služobného priradenia](./workflows.md#serving-assignment-confirmations) zobrazujú termín splnenia, ale tu sa nedá zmeniť.)
- **Pridať poznámky** -- Pridajte do poznámok úlohy aktualizácie alebo podrobnosti pre priradenú osobu.
- **Nastaviť pripomienky** -- Pozrite si [Pripomienky úloh](#task-reminders) nižšie.

## Pripomienky úloh

Úloha s termínom splnenia môže priradenú osobu upozorniť ešte pred jej splnením.

1. Na stránke úlohy kliknite na **Edit** vedľa **Reminders**.
2. Zapnite **Send reminders for this task**.
3. V časti **When should reminders go out?** vyberte najviac tri časy: **7 days before**, **3 days before**, **1 day before** alebo **Day of**.
4. Nastavte **Time of Day** a voliteľne **Message**.
5. V časti **Send By** vyberte **Push**, **Email** a, ak je vaš zbor pripojený k [poskytovateľovi SMS](../settings/church-settings.md#texting), aj **Text**.
6. Kliknite na **Save Reminders**.

Ak úloha nemá termín splnenia, B1 vás upozorní, že kým ho nenastavíte v poli **Due**, nebudú sa odosielať žiadne pripomienky. Textové pripomienky dorazia iba osobám, ktoré zapli **Text messages** vo svojich [nastaveniach upozornení](../../b1-church/getting-started/notification-preferences.md), a každá správa môže vášmu zboru stáť peniaze.

## Životný cyklus úlohy

1. Nová úloha začína so stavom **Open**.
2. Priradená osoba dostane upozornenie a môže úlohu zobraziť na svojom prehľade, v **Serving > My Work** alebo v mobilnej aplikácii.
3. Po dokončení práce priradená osoba (alebo správca) kliknite na **Close task**.
4. Uzavreté úlohy sa zo štandardného zobrazenia odstránia, ale stále ich možno nájsť výberom **Closed** nad zoznamom úloh.

:::info
B1 Admin už nevytvára opakujúce sa úlohy podľa plánu. Na opakované sledovanie ľudí použite [pracovný postup](./workflows.md) s [spúšťačom plánu](./workflows.md#schedule-triggers).
:::

:::tip
Keď potrebujete preniesť veľa ľudí cez rovnaké fázy -- napríklad sledovanie nových návštevníkov alebo proces členstva -- použite [Pracovné postupy](./workflows.md). Pracovné postupy premieňajú úlohy na karty na doske s presúvaním, s krokmi, termínmi a smerovaním.
:::

:::info
Niektoré úlohy vytvárajú iné časti B1 automaticky a otvárajú sa na špeciálnej karte na kontrolu namiesto štandardného zobrazenia poznámky/preradenia -- [žiadosti o pripojenie ku skupine](../groups/group-join-requests.md#approving-from-the-tasks-page), [žiadosti o zmenu profilu](../profile/approving-profile-changes.md) a [žiadosti o zrušenie účtu](../profile/account-deletion.md) fungujú všetky takto.
:::

## Ďalšie kroky

- Posúvať ľudí cez viacstupňový proces pomocou [Pracovných postupov](./workflows.md)
- Používať [Pracovné postupy](./workflows.md) na automatický posun ľudí cez opakovateľné procesy
- Používať úlohy spolu s [Plánmi bohoslužieb](./plans.md) na sledovanie akčných položiek pri príprave bohoslužieb
