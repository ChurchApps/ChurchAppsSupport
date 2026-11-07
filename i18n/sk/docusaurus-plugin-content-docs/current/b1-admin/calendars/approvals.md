---
title: "Schválenia kalendára"
---

# Schválenia kalendára

<div class="article-intro">

Stránka Schválenia slúži na to, aby administrátori mohli prezerať a spracovávať čakajúce žiadosti o rezerváciu miestností a zdrojov, ako aj udalosti kalendára, ktoré pred zverejnením vyžadujú schválenie.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Nastavte miestnosti alebo zdroje so **skupinou schválenia** v časti [Miestnosti a zdroje](rooms-resources)
- Potrebujete oprávnenie **Správca kalendárov** alebo oprávnenie **content.edit**

</div>

## Otvorenie schválení

V aplikácii B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole vľavo hore), rozbaľte položku **Kalendáre** a kliknite na **Schválenia**. Tu sa zobrazia čakajúce žiadosti o rezerváciu a udalosti, ktoré čakajú na posúdenie.

## Žiadosti o rezerváciu

Keď skupina vytvorí udalosť a požiada o miestnosť alebo zdroj, žiadosť sa zobrazí v sekcii **Žiadosti o miestnosti a zdroje**. Každý riadok zobrazuje:

- Názov udalosti a dátum/čas
- Požadovanú miestnosť alebo zdroj (pri zdrojoch s viacerými kusmi aj požadované množstvo)
- Stavový štítok, ktorý ukazuje, či žiadosť má konflikty

### Indikátory konfliktov

Ak sa žiadosť prekrýva s inou rezerváciou alebo blokovaním tej istej miestnosti alebo zdroja, jej stav zobrazuje štítok **Konflikty**; podrobnosti zobrazíte po najazdení myšou. Žiadosti bez prekrytia zobrazujú **Bez konfliktov**. Pred schválením ktorejkoľvek z konfliktných žiadostí ich dôkladne preskúmajte.

### Schválenie alebo zamietnutie

Pri ľubovoľnej žiadosti o rezerváciu kliknite na **Schváliť** alebo **Zamietnuť** (pri zamietnutí sa najprv vyžaduje potvrdenie). Žiadajúca skupina je o rozhodnutí informovaná. Schválené rezervácie sa pre danú udalosť zamknú na túto miestnosť alebo zdroj; zamietnuté rezervácie uvoľnia termín pre ostatných.

Po kliknutí na **Schváliť** sa otvorí dialógové okno **Schváliť rezerváciu**, v ktorom môžete udalosť v tom istom kroku aj zverejniť:

1. Začiarknite **Zverejniť vo verejnom kalendári**, aby bola udalosť viditeľná v kalendári jej skupiny. Ak ponecháte políčko nezačiarknuté, rezerváciu schválite bez zmeny viditeľnosti udalosti.
2. Keď je začiarknuté **Zverejniť vo verejnom kalendári**, môžete voliteľne v položke **Pridať aj do kalendára** vybrať kurátorský kalendár, aby sa udalosť pridala aj do jedného z vašich [kurátorských kalendárov](curated-calendar). Ak chcete tento krok preskočiť, ponechajte možnosť na **Žiadny**. (Táto možnosť sa zobrazí iba vtedy, ak máte oprávnenie **content.edit**.)
3. Kliknite na **Schváliť**.

## Čakajúce udalosti

Ak váš pracovný postup v kalendári vyžaduje schválenie udalostí skôr, než budú pre verejnosť viditeľné, čakajúce udalosti sa zobrazia v sekcii **Žiadosti o udalosti**. Kliknutím na **Schváliť** zverejníte udalosť v kalendári alebo kliknutím na **Zamietnuť** upozorníte odosielateľa, že sú potrebné úpravy.

:::tip
Ak chcete, aby pre určitú miestnosť bolo potrebné schválenie, nastavte na nej skupinu schválenia v časti [Miestnosti a zdroje](rooms-resources). Skupiny s prístupom potom môžu o miestnosť žiadať pri vytváraní udalostí a tieto žiadosti sa zobrazia na tejto stránke.
:::

## Súvisiace články

- [Miestnosti, zdroje a plánovanie](rooms-resources) — nastavenie rezervovateľných miestností a zdrojov
- [Vytváranie kalendárov](creating-calendars) — správa kalendárov a udalostí
