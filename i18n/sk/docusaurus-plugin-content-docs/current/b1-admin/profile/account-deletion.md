---
title: "Kontrola žiadostí o vymazanie účtu"
---

# Kontrola žiadostí o vymazanie účtu

<div class="article-intro">

Ak má cirkev nakonfigurovanú skupinu na schvaľovanie adresára, vymazanie účtu už neprebieha okamžite. Žiadosť člena sa stane úlohou, ktorú pred odstránením čohokoľvek skontroluje vaša schvaľovacia skupina. Táto stránka vysvetľuje, ako sa žiadosť podáva, ako ju schváliť alebo zamietnuť a čo sa stane v každom prípade.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Skupina **Directory Approval Group** musí byť nakonfigurovaná v časti **Mobile &rarr; Member portal**. Bez nej kliknutie na **Delete my account** na stránke Profil účet stále okamžite vymaže, bez kroku kontroly. Pozri [Nastavenia mobilnej aplikácie](../settings/mobile-app.md).
- Na schválenie alebo zamietnutie žiadosti je potrebné oprávnenie **People &gt; Edit**.

</div>

## Ako člen žiada o vymazanie

Vymazanie účtu sa žiada na stránke **My Profile** — tej istej spoločnej stránke účtu, ktorú popisuje [Správa vášho profilu](./managing-profile.md) — v sekcii **Account Deletion**. Ak je nakonfigurovaná schvaľovacia skupina, potvrdenie žiadosti nič hneď nevymaže. Namiesto toho:

1. Vytvorí sa otvorená úloha s názvom **„Account deletion request“**, priradená skupine Directory Approval Group, v časti **Serving &rarr; My Work**.
2. Tlačidlo **Delete my account** sa pre danú osobu deaktivuje a zobrazí sa upozornenie, že žiadosť čaká na kontrolu.

Ak je už otvorená ďalšia žiadosť, odoslanie novej len znovu otvorí tú istú úlohu — jedna osoba môže mať naraz len jednu čakajúcu žiadosť o vymazanie.

## Kontrola žiadosti

1. Prejdite do **Serving &rarr; My Work** (alebo do **Assigned to My Groups** na vašom prehľade, kde sa zobrazujú aj [žiadosti o zmenu profilu](./approving-profile-changes.md)).
2. Otvorte úlohu s názvom **„Account deletion request from *Name*“**.
3. Uvidíte dve akcie: **Approve deletion** a **Decline**.

### Schválenie

Potvrďte výzvu **„Permanently anonymize this person's record and remove their login? This cannot be undone.“** Tým sa osobné údaje danej osoby nahradia všeobecnými hodnotami (rovnaká anonymizácia, ktorú používa akcia **Data Management &gt; Anonymize** na zázname osoby — pozri [Bezpečnosť údajov](../settings/data-security.md)) a odstráni sa jej prihlásenie. Úloha sa automaticky uzavrie a člen dostane oznámenie, že jeho žiadosť bola schválená.

### Zamietnutie

Zamietnutie vyžaduje uvedenie dôvodu, pretože GDPR umožňuje odmietnuť žiadosť o vymazanie len na základe zákonnej výnimky:

- **Zákonná povinnosť uchovávať údaje** (záznamy o daroch, daňové alebo pracovné záznamy)
- **Potrebné na uplatnenie právneho nároku**
- **Iné** — vysvetlite v textovom poli (najmenej 10 znakov)

Člen dostane oznámenie o rozhodnutí spolu s dôvodom, ktorý ste uviedli, a ak s ním nesúhlasí, môže žiadosť znovu podať alebo sa obrátiť na dozorný orgán.

:::info
Cirkvi majú na reakciu na žiadosť o vymazanie 30 dní. Úloha má termín o 28 dní a schvaľovacia skupina dostane automatické pripomienky, ak bude stále otvorená po 21 a 27 dňoch.
:::

:::tip
Žiadosti o vymazanie a žiadosti o zmenu profilu využívajú tú istú skupinu Directory Approval Group a rovnaký postup kontroly cez úlohy — ak potrebujete skontrolovať aj žiadosti o aktualizáciu adresára, pozri [Schvaľovanie zmien profilu](./approving-profile-changes.md).
:::

## Súvisiace články

- [Správa vášho profilu](./managing-profile.md) — Kde členovia žiadajú o vymazanie vlastného účtu
- [Schvaľovanie zmien profilu](./approving-profile-changes.md) — Podobný postup kontroly pre žiadosti o aktualizáciu adresára
- [Bezpečnosť údajov](../settings/data-security.md) — Súlad s GDPR a anonymizácia iniciovaná správcom
- [Nastavenia mobilnej aplikácie](../settings/mobile-app.md) — Konfigurácia skupiny Directory Approval Group
