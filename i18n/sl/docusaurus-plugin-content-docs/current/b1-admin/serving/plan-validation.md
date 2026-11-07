---
title: "Preverjanje načrtov in obvestila"
description: "V B1 Admin preverite načrte bogoslužij glede nezasedenih položajev, časovnih konfliktov in prostovoljcev, ki so označeni kot nedosegljivi, nato pa z enim klikom obvestite celotno ekipo."
---

# Preverjanje načrtov in obvestila prostovoljcem

<div class="article-intro">

B1 Admin pred nedeljo samodejno preveri vaše načrte za težave: nezasedena mesta, časovne kolizije in prostovoljce, ki so označili datum kot nedosegljiv. Ko je vse v redu, lahko celotni ekipi pošljete obvestilo z enim klikom.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Ustvarite [bogoslužni načrt](./plans.md) in dodelite prostovoljce na položaje
- Dodajte [čase bogoslužij](./plans.md) v načrt, da lahko zaznavanje kolizij preveri prekrivanja
- Poskrbite, da imajo prostovoljci nameščeno aplikacijo B1 Mobile, da lahko prejemajo potisna obvestila

</div>

## Plošča za preverjanje

Vsak načrt ima ploščo **Preverjanje**, ki se med sestavljanjem načrta izvaja samodejno. Preverja tri stvari:

### Nezasedeni položaji
Če položaj zahteva več ljudi, kot je trenutno dodeljenih, plošča za preverjanje natančno navede, kaj še manjka, na primer *"Zvočni tehnik: potrebna je še 1 oseba."* Na prvi pogled vidite, ali je načrt pred tednom v celoti zaseden.

### Časovne kolizije
Če je prostovoljec dodeljen na dva položaja, ki se v istem načrtu časovno prekrivata, plošča za preverjanje označi kolizijo, na primer *"Jane Smith: časovna kolizija med vodjo bogoslužja in prijavo otrok med nedeljskim bogoslužjem."* Tako preprečite dvojne rezervacije, preden postanejo težava v nedeljskem jutru.

### Datumi nedosegljivosti
Prostovoljci lahko v aplikaciji B1 Mobile nastavijo datume, na katere niso na voljo. Če je nekdo dodeljen načrtu, ki pade na enega od teh datumov, plošča za preverjanje kolizijo prikaže samodejno, da lahko poiščete nadomestnega prostovoljca.

### Kolizije med načrti
Preverjanje hkrati preveri tudi vse vaše načrte. Če je isti prostovoljec dodeljen v dva različna načrta, ki se časovno prekrivata, na primer 9.00 bogoslužje in 10.00 bogoslužje, ki oba trajata do 10.30, bo B1 Admin to osebo označil kot dvojno zasedeno med načrti.

:::tip
Za zagon preverjanja ni treba storiti ničesar. Posodobi se samodejno vsakič, ko dodate ali spremenite dodelitev. Med sestavljanjem načrta samo spremljajte ploščo.
:::

## Obveščanje prostovoljcev

Ko je načrt pripravljen, lahko vse dodeljene prostovoljce hkrati obvestite neposredno iz plošče za preverjanje.

1. Odprite načrt in se pomaknite do plošče **Preverjanje**
2. Če so prisotni prostovoljci, ki še niso bili obveščeni, boste videli povezavo, ki prikazuje, koliko jih je treba obvestiti (npr. *"Obvesti 8 prostovoljcev"*)
3. Kliknite povezavo, da pošljete potisna obvestila vsem, ki še niso bili obveščeni
4. Prostovoljci na telefonu prejmejo obvestilo, ki jih obvesti, da so bili razporejeni, in jih pozove, naj potrdijo svojo dodelitev

:::info
Vključeni so samo prostovoljci, ki še niso bili obveščeni. Če v načrt kasneje dodate nekoga, se povezava ponovno prikaže, tako da lahko obvestite novega člana, ne da bi ponovno obveščali preostanek ekipe.
:::

### Načrti s potrditvenim postopkom

Če nastavitve načrta navajajo [potrditveni postopek](./workflows.md#serving-assignment-confirmations), plošča prikaže *"Nove zahteve uporabljajo potrditveni postopek. Obvestila v aplikaciji ostanejo omogočena. Opomniki se ustavijo, ko je vsaka zahteva sprejeta ali zavrnjena."* V tem primeru:

- Povezava za obveščanje šteje samo prostovoljce, ki še niso bili obveščeni in se še niso odzvali.
- Ob kliku se pošlje običajno obvestilo v aplikaciji in za vsako zahtevo se na tablo postopka doda ena kartica. Postopek nato pošlje e-poštne in SMS opomnike ter, če je potrebno, zahtevo preda nekomu, ki prostovoljca pokliče.
- Načrt mora biti objavljen (ne samo v pripravi), postopek pa mora biti aktiven. Sicer plošča prikaže *"Zahtev ni bilo mogoče poslati. Preverite, ali je izbrani postopek aktiven in ali je načrt objavljen, nato poskusite znova."*

:::warning
Prostovoljci morajo imeti nameščeno mobilno izkušnjo B1.church (PWA na začetnem zaslonu ali zastarelo nativno aplikacijo B1 Mobile za uporabnike, ki jo še imajo) z omogočenimi obvestili, da lahko prejemajo potisna obvestila. Navodila za nastavitev najdete v [Namestitev kot aplikacija (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Sorodni članki

- [Bogoslužni načrti](./plans.md)
- [Postopki](./workflows.md)
- [Namestitev aplikacije B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
