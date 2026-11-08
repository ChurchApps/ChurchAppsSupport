---
title: "Preverjanje načrta in obvestila"
description: "Preverite servisne načrte v B1 Admin za nezasedena mesta, časovne konflikte in prostovoljce, ki so si označili nedostopnost, nato z enim klikom potisno obvestite celotno ekipo."
---

# Preverjanje servisnega načrta in obveščanje prostovoljcev

<div class="article-intro">

B1 Admin samodejno preveri vaše načrte za težave pred nedeljo: nezasedena mesta, časovne konflikte in prostovoljce, ki so si označili datum kot nedosegljiv. Ko je vse v redu, lahko celotno ekipo obvestite z enim klikom.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Ustvarite [servisni načrt](./plans.md) in dodelite prostovoljce na mesta
- Dodajte [servisne čase](./plans.md) k načrtu, da lahko zaznavanje konfliktov preveri prekrivanja
- Poskrbite, da imajo prostovoljci [nameščeno B1 aplikacijo](../../b1-church/getting-started/installing-pwa.md), da lahko prejemajo potisna obvestila

</div>

## Plošča za preverjanje

Vsak načrt ima ploščo **Preverjanje**, ki se izvaja samodejno med sestavljanjem načrta. Preverja tri stvari:

### Nezasedena mesta
Če mesto zahteva več ljudi, kot jih je trenutno dodeljenih, plošča za preverjanje natančno navede, kaj še manjka, na primer *„Zvočni tehnik: potrebna je še 1 oseba."* Na prvi pogled vidite, ali je načrt pred začetkom tedna popolnoma zaseden.

### Časovni konflikti
Če je prostovoljec dodeljen dvema mestoma, ki se časovno prekrivata znotraj istega načrta, plošča za preverjanje označi konflikt, na primer *„Jane Smith: časovni konflikt med Vodjo bogoslužja in Prijavo otrok med nedeljskim servisom."* Tako se dvojna zasedba odkrije, preden postane problem v nedeljo zjutraj.

### Datumi nedosegljivosti
Prostovoljci lahko v B1 aplikaciji nastavijo datume, na katere niso na voljo. Če je nekdo dodeljen načrtu, ki pade v enega od teh datumov, plošča za preverjanje konflikt samodejno prikaže, da lahko poiščete nadomestno osebo.

### Konflikti med načrti
Preverjanje hkrati pregleda vse vaše načrte. Če je isti prostovoljec dodeljen dvema različnima načrtoma, ki se časovno prekrivata, na primer 9.00 servis in 10.00 servis, ki oba trajata do 10.30, bo B1 Admin to osebo označil kot dvojno zasedeno med načrti.

:::tip
Preverjanja vam ni treba posebej zagnati. Posodablja se samodejno ob vsakem dodajanju ali spremembi dodelitve. Med sestavljanjem načrta samo spremljajte ploščo.
:::

## Obveščanje prostovoljcev

Ko je načrt pripravljen, lahko vse dodeljene prostovoljce obvestite naenkrat neposredno iz plošče za preverjanje.

1. Odprite načrt in se pomaknite do plošče **Preverjanje**
2. Če so prisotni neobveščeni prostovoljci, boste videli povezavo s številom oseb, ki jih je treba obvestiti (npr. *„Obvesti 8 prostovoljcev"*)
3. Kliknite povezavo, da pošljete potisna obvestila vsem, ki še niso bili obveščeni
4. Prostovoljci prejmejo obvestilo na telefonu, ki jih obvesti, da so razporejeni, in jih pozove, naj potrdijo svojo dodelitev

:::info
Vključeni so samo prostovoljci, ki še niso bili obveščeni. Če boste kasneje v načrt dodali novo osebo, se povezava ponovno prikaže, da lahko obvestite samo njo, ne pa tudi preostale ekipe.
:::

### Načrti s potrditvenim delovnim tokom

Če v nastavitvah načrta določite [potrditveni delovni tok](./workflows.md#serving-assignment-confirmations), plošča prikaže *„Nove zahteve uporabljajo potrditveni delovni tok. Obvestila v aplikaciji ostanejo vklopljena. Nadaljnji opomniki se ustavijo, ko je vsaka zahteva sprejeta ali zavrnjena."* V tem primeru:

- Povezava za obveščanje šteje samo prostovoljce, ki še niso bili obveščeni in se še niso odzvali.
- Ob kliku se pošlje običajno obvestilo v aplikaciji, na tabli delovnega toka pa se ustvari po ena kartica za vsako zahtevo. Delovni tok nato pošlje e-poštne in SMS opomnike ter, če je potrebno, zahtevo preda nekomu, ki prostovoljca pokliče.
- Načrt mora biti objavljen (ne le v osnutku), delovni tok pa mora biti aktiven. Sicer plošča prikaže *„Zahtev ni bilo mogoče poslati. Preverite, ali je izbrani delovni tok aktiven in ali je načrt objavljen, nato poskusite znova."*

:::warning
Da bodo prostovoljci prejemali potisna obvestila, morajo imeti B1 aplikacijo nameščeno na začetnem zaslonu in omogočena obvestila. Navodila za nastavitev najdete v članku [Namestitev kot aplikacija (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Sorodni članki

- [Servisni načrti](./plans.md)
- [Delovni tokovi](./workflows.md)
- [Namestitev B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
