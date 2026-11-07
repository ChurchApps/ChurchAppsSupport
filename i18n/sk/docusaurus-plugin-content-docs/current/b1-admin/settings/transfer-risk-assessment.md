---
title: "Hodnotenie rizík prenosu"
---

# Hodnotenie rizík prenosu

<div class="article-intro">

Tento dokument zaznamenáva hodnotenie rizík spojených s medzinárodnými prenosmi osobných údajov z Spojeného kráľovstva/EHP do Spojených štátov, ako to vyžaduje britské GDPR a európske GDPR. Ide o interný záznam o súlade, ktorý spoločnosť ChurchApps vedie ako spracovateľ údajov.

</div>

**Posledná revízia:** apríl 2026

## 1. Podrobnosti o prenose

| Položka | Podrobnosti |
|---|---|
| **Exportér údajov** | Cirkvi používajúce ChurchApps (prevádzkovatelia údajov) so sídlom v Spojenom kráľovstve/EHP |
| **Importér údajov** | ChurchApps (spracovateľ údajov) pôsobiaci v Spojených štátoch |
| **Kategórie dotknutých osôb** | Členovia cirkvi, návštevníci, hostia, darcovia, dobrovoľníci, deti (spravované rodičmi/administrátormi) |
| **Kategórie osobných údajov** | Mená, e-mailové adresy, telefónne čísla, poštové adresy, dátumy narodenia, pohlavie, rodinný stav, profilové fotografie, záznamy o daroch, záznamy o účasti, členstvo v skupinách, pridelenie dobrovoľníckych úloh, história správ |
| **Citlivé údaje** | Úmyselne sa nezhromažďujú. Neukladajú sa zdravotné údaje, biometrické údaje ani údaje o trestnej minulosti. Údaje o finančných účtoch (kreditné karty, bankové účty) ChurchApps nikdy neukladá – spracúva ich priamo spoločnosť Stripe. |
| **Účel prenosu** | Poskytovanie softvérových služieb na správu cirkvi (správa členov, dary, sledovanie účasti, komunikácia, plánovanie dobrovoľníkov, registrácia na podujatia) |
| **Cieľová krajina** | Spojené štáty |
| **Mechanizmus prenosu** | Štandardné zmluvné doložky EÚ (SCC) a Dodatok o medzinárodnom prenose údajov Spojeného kráľovstva (IDTA), začlenené prostredníctvom Dodatku o spracovaní údajov AWS |

## 2. Subprocesori

| Subprocesor | Úloha | Umiestnenie | Mechanizmus prenosu |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hostovanie infraštruktúry, ukladanie údajov, doručovanie obsahu (región us-east-2) | Spojené štáty | DPA AWS so SCC (automaticky zahrnuté v Podmienkach služieb AWS) |
| **Stripe** | Spracovanie platieb za dary | Spojené štáty | DPA Stripe so SCC |

Údaje o kreditných kartách a bankových účtoch sa prenášajú priamo z prehliadača používateľa do Stripe a nikdy sa neukladajú na serveroch ChurchApps ani cez ne neprechádzajú.

## 3. Hodnotenie rizík

### 3.1 Šifrovanie

- **Počas prenosu:** Všetky údaje sú šifrované pomocou TLS/HTTPS pri každej komunikácii medzi používateľmi a servermi ChurchApps.
- **V pokoji:** Údaje uložené v AWS sú šifrované v pokoji pomocou šifrovania spravovaného AWS.

### 3.2 Riadenie prístupu

- Prístup k produkčným serverom je obmedzený na dve osoby, ktoré sú členmi predstavenstva ChurchApps.
- Vývojári, dobrovoľníci a ostatní členovia predstavenstva nemajú prístup k produkčným serverom ani databázam.
- Databázové servery sú chránené firewallom a nie sú priamo dostupné z internetu.
- Údaje cirkví sú logicky oddelené – každá cirkev môže pristupovať iba k vlastným údajom prostredníctvom kontroly prístupu na úrovni aplikácie.

### 3.3 Oddelenie údajov

Údaje sú rozdelené do šiestich nezávislých databáz (Členstvo, Dary, Účasť, Správy, Úlohy, Obsah). Kompromitácia jednej databázy neodhalí údaje z ostatných. Napríklad databáza Dary obsahuje sumy a dátumy darov, ale nie mená ani kontaktné údaje darcov (tie sú uložené v databáze Členstvo).

### 3.4 Minimalizácia údajov

- Nie sú uložené žiadne informácie o kreditných kartách ani bankových účtoch (spracúva ich Stripe).
- Heslá sa ukladajú pomocou jednosmerného hashovania a nedajú sa obnoviť.
- Cirkvi kontrolujú, aké údaje o svojich členoch zhromažďujú.

### 3.5 Práva dotknutých osôb

ChurchApps poskytuje technické nástroje, ktoré cirkvám umožňujú vybavovať žiadosti dotknutých osôb:

- **Prístup a prenosnosť:** Úplný export údajov vo formáte JSON strojovo čitateľnom.
- **Vymazanie:** Anonymizácia vo všetkých šiestich databázach, pri ktorej sa osobné údaje nahradia všeobecnými hodnotami, pričom sa zachovajú súhrnné záznamy potrebné na finančné vykazovanie.
- **Obmedzenie:** Neaktívny stav členstva vylúči jednotlivcov z vyhľadávania, adresára, prehľadov a správ, pričom ich záznam sa zachová.
- **Oprava:** Členovia a administrátori môžu upravovať osobné údaje prostredníctvom aplikácie.

### 3.6 Oznamovanie porušenia

ChurchApps sa zaväzuje oznámiť dotknutým cirkvám porušenie ochrany osobných údajov do 72 hodín od okamihu, keď sa o ňom dozvie, ako je uvedené v [Podmienkach použitia](https://churchapps.org/terms) (časť 11.6).

### 3.7 Prístup vládnych orgánov USA

Hlavné riziko spojené s údajmi hostovanými v USA je možný prístup amerických vládnych orgánov podľa oddielu 702 zákona FISA alebo výkonného nariadenia 12333. Toto riziko je hodnotené ako **nízke** z týchto dôvodov:

- ChurchApps spracúva údaje o členstve v cirkvi a účasti, nie údaje so spravodajskou hodnotou.
- Dotknuté osoby sú členovia cirkvi a návštevníci – nie kategórie, na ktoré sa obvykle zameriavajú sledovacie programy.
- Nie sú uložené žiadne citlivé osobné údaje (zdravie, finančné účty, politické názory).
- DPA spoločnosti AWS obsahuje záväzky týkajúce sa žiadostí vládnych orgánov o prístup a správy o transparentnosti.
- Rámec ochrany údajov medzi EÚ a USA (zavedený v roku 2023) poskytuje dodatočné záruky pre prenosy údajov certifikovaným americkým organizáciám.

## 4. Celkový záver o riziku

Riziko pre dotknuté osoby v súvislosti s týmto medzinárodným prenosom je hodnotené ako **nízke**. Kombinácia:

- štandardných zmluvných doložiek ako právneho mechanizmu prenosu,
- šifrovania počas prenosu aj v pokoji,
- prísnej kontroly prístupu, pri ktorej majú prístup iba dve oprávnené osoby,
- oddelenia údajov v nezávislých databázach,
- neukladania údajov o finančných účtoch,
- nízkej citlivosti a nízkej spravodajskej hodnoty spracúvaných údajov,
- technických nástrojov na uplatňovanie všetkých práv dotknutých osôb

poskytuje primerané dodatočné opatrenia na zabezpečenie toho, aby prenesené údaje mali úroveň ochrany v podstate rovnocennú s tou, ktorá je zaručená v rámci Spojeného kráľovstva/EHP.

## 5. Harmonogram revízií

Toto hodnotenie sa bude revidovať ročne alebo vtedy, keď dôjde k podstatnej zmene spracovania údajov, subprocesorov alebo právneho rámca upravujúceho medzinárodné prenosy údajov.
