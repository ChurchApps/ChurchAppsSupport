---
title: "Bezpečnosť pri prihlasovaní"
description: "Nastavte ochranu detí v B1 Admin: kapacitu miestností, počet dobrovoľníkov, zoznam dôveryhodných osôb na vyzdvihnutie a správy pre rodičov pri check-ine."
---

# Bezpečnosť pri prihlasovaní

<div class="article-intro">

B1 obsahuje súbor bezpečnostných nástrojov pre detí pri prihlasovaní: limity kapacity miestností a pomer dospelých a detí, pokyny podľa veku a ročníka na kiosku, typy prihlásenia, ktoré rozlišujú členov, hostí a dobrovoľníkov, a zoznam dôveryhodných osôb na vyzdvihnutie pre každú domácnosť, ktorý sa overuje pri odhlasovaní. Táto stránka popisuje, ako nastaviť každú bezpečnostnú funkciu v B1 Admin.

</div>

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Nastavte si [štruktúru dochádzky](setup.md) a [kiosky na prihlasovanie](check-in.md)
- Miestnosti sú [skupiny](../groups/creating-groups.md) prepojené s časmi bohoslužieb – bezpečnostné nastavenia uvedené nižšie sa nachádzajú na skupine
- Upozornenie rodičov a núdzové hromadné správy vyžadujú pripojeného poskytovateľa textových správ ([Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md) alebo Mutual Ministry)

</div>

## Kapacita miestnosti a uzavretie miestnosti

Každá miestnosť na prihlasovanie (skupina) môže uplatňovať vlastné limity. Otvorte skupinu, kliknite na **Upraviť** a nájdite sekciu **Kapacita prihlásenia**:

- **Kapacita** -- Maximálny počet ľudí, ktorí môžu byť naraz prihlásení do tejto miestnosti. Keď je miestnosť plná, prihlásenie do nej je zablokované a kiosk zobrazí názov plnej miestnosti.
- **Kapacita pre hostí** -- Voliteľný samostatný limit počtu hostí, ktorých môže miestnosť prijať.
- **Uzavreté pre prihlasovanie** -- Nastavte na **Áno**, ak chcete okamžite zastaviť všetky prihlásenia do tejto miestnosti (napríklad keď je hodina zrušená alebo miestnosť nie je k dispozícii). Odhlasovanie funguje aj naďalej.

## Pomer dobrovoľníkov

Rovnaká sekcia **Kapacita prihlásenia** na skupine obsahuje pravidlá pre obsadenie:

- **Deti na jedného dobrovoľníka** -- Maximálny počet detí, ktoré môže každý prihlásený dobrovoľník zabezpečiť (napr. 5 znamená jedného dobrovoľníka na päť detí).
- **Minimálny počet dobrovoľníkov** -- Najmenší počet dobrovoľníkov, ktorí musia byť prihlásení, skôr než sa deti môžu prihlásiť do miestnosti.

Dobrovoľníci sa do týchto pravidiel počítajú, keď sa na kiosku prihlásia s typom **Dobrovoľník** (pozri [Typy prihlásenia](#check-in-types) nižšie).

### Výber medzi upozornením a blokovaním

To, ako prísne sa pomery presadzujú, je nastavenie platné pre celý zbor:

1. V B1 Admin prejdite do **Nastavenia** a otvorte sekciu **Prihlasovanie**.
2. Nastavte **Presadzovanie pomeru dobrovoľníkov**:
   - **Upozorniť (povoliť s potvrdením)** -- Kiosk zobrazí upozornenie, keď je miestnosť nad pomerom alebo pod minimálnym počtom dobrovoľníkov, a zodpovedný pracovník môže potvrdiť pokračovanie. Toto je predvolená hodnota.
   - **Blokovať (zabrániť prihláseniu)** -- Prihlásenie do miestnosti je odmietnuté, kým nie je prihlásený dostatočný počet dobrovoľníkov.

:::info
Kapacita a Uzavreté pre prihlasovanie sú vždy pevné limity – voľba upozorniť/blokovať sa týka len pomerov dobrovoľníkov.
:::

## Typy prihlásenia

Každé prihlásenie zaznamenáva, či je osoba **Člen**, **Hosť** alebo **Dobrovoľník**. Typ sa vyberie pomocou štítkov na obrazovke domácnosti na kiosku (predvolene je zvolený Člen). Typy napájajú bezpečnostné pravidlá – dobrovoľníci zabezpečujú pomer a hostia sa počítajú proti kapacite pre hostí miestnosti.

## Pokyny k miestnosti podľa veku a ročníka

Každej miestnosti môžete nastaviť vekové alebo ročníkové hranice, aby kiosk rodinám navrhol vhodné miestnosti:

- V nastaveniach skupiny použite sekciu **Vek a ročník** a nastavte minimálny/maximálny vek (roky a mesiace) a/alebo ročník pre miestnosť.
- Na kiosku sa miestnosti, do ktorých dieťa patrí, zvýraznia a miestnosti, do ktorých nepatrí, sa stlmia. Stlmenú miestnosť možno stále vybrať po potvrdení zodpovedným pracovníkom – pokyny nikdy úplne nezablokujú výber.

Ročníky sa prechádzajú k novému ročníku v **dátume postupu do vyššieho ročníka** vašej cirkvi:

1. V B1 Admin prejdite do **Nastavenia** a otvorte sekciu **Postup do vyššieho ročníka**.
2. Nastavte mesiac a deň, keď vaša cirkev žiakov postupuje (napríklad 1. august). Vek a ročník na kiosku sa počítajú k poslednému dátumu postupu.

## Dôveryhodné a neoprávnené osoby na vyzdvihnutie

Každá domácnosť môže mať zoznam osôb, ktoré smú – alebo nesmú – vyzdvihnúť jej deti.

1. Otvorte stránku osoby v sekcii **Ľudia** a nájdite kartu **Vyzdvihnutie**.
2. Kliknite na **Pridať**. Vyhľadajte existujúcu osobu alebo pridajte osobu, ktorá nie je v systéme, zadaním jej **Mena**, **Vzťahu** a fotografie.
3. Nastavte **Stav**:
   - **Dôveryhodná** -- Pri odhlasovaní sa táto osoba zobrazí ako kartička na vyzdvihnutie s fotografiou, čo umožní rýchle overené vyzdvihnutie.
   - **Neoprávnená** -- Ak sa niekto pokúsi vyzdvihnúť dieťa pod týmto menom, kiosk odhlásenie zablokuje s upozornením. Zodpovedný pracovník môže zablokovanie prepísať a prepísanie sa zaznamená v zázname dochádzky.

Kliknutím na štítok stavu osoby na karte prepnete medzi stavmi Dôveryhodná a Neoprávnená.

:::tip
Ak je to možné, pridajte fotografie dôveryhodným osobám na vyzdvihnutie – obrazovka odhlasovania zobrazuje fotografiu, aby dobrovoľníci mohli vizuálne overiť osobu, ktorá stojí pred nimi.
:::

## Upozornenie rodičov a núdzové hromadné správy

Obe funkcie odosielajú textové správy cez pripojeného poskytovateľa textových správ cirkvi – neexistuje žiadna vstavaná služba SMS, preto musí byť najskôr nastavený jeden z podporovaných poskytovateľov.

- **Upozorniť rodiča** -- Zo obrazovky odhlasovania na obsadenom kiosku môže pracovník poslať textovú správu rodičom/zákonným zástupcom prihláseného dieťaťa (napríklad „Prosím, príďte do detskej izby“).
- **Núdzová hromadná správa** -- Z administračných nastavení kiosku môže pracovník naraz poslať textovú správu zákonným zástupcom každej prihlásenej domácnosti pre vybranú bohoslužbu. Odoslanie vyžaduje napísanie **EMERGENCY** na potvrdenie.

Osoby, ktoré sa odhlásili z odosielania správ alebo nemajú uložené mobilné číslo, sa automaticky preskočia – kiosk oznámi, koľko správ bolo odoslaných a koľko preskočených.

Podrobný postup na strane kiosku nájdete v [Odhlasovanie a bezpečnosť detí](../../b1-checkin/check-in/checking-out.md).

## Súvisiace články

- [Prihlasovanie](check-in.md) — nastavenie kiosku a hardvéru
- [Odhlasovanie a bezpečnosť detí](../../b1-checkin/check-in/checking-out.md) — odhlasovanie na kiosku, overenie vyzdvihnutia a postupy upozorňovania
- [Vytvorenie skupín](../groups/creating-groups.md) — kde sa nachádzajú nastavenia miestností
- [Nastavenie dochádzky](setup.md) — bohoslužby, časy bohoslužieb a priradenie miestností
- [Minimálny vek pre súkromné správy](../settings/mobile-app.md#member-directory--messaging-settings) — blokuje nové konverzácie so súkromnými správami s deťmi, pričom ich ponecháva v adresári
