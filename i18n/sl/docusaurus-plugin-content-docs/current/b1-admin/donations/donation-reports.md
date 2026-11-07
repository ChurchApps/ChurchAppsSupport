---
title: "Izkazi o darovanjih"
description: "Pregledujte vsote darov, izgubljene darovalce in podrobnosti serij v B1 Admin s povzetkom darov, pogledom izgubljenih darovalcev in izvozi CSV."
---

# Izkazi o darovanjih

<div class="article-intro">

B1 Admin vam omogoča več načinov za ogled in analizo podatkov o darovanjih vaše cerkve. Nadzorna plošča darovanj na strani **Povzetek** v razdelku Darovanja ponuja vizualni pregled z grafikoni in filtri, medtem ko razdelek Poročila ponuja podrobnejše poročilo o povzetku darovanj. Ta orodja uporabite za spremljanje trendov darovanj, pripravo na seje upravnega odbora ali usklajevanje vaših evidenc.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Poskrbite, da so darovanja [zabeležena po serijah](recording-donations.md) ali [uvožena iz Stripe](stripe-import.md)
- Preverite, ali so vaši [skladi](funds.md) pravilno nastavljeni, da so darovanja ustrezno razvrščena

</div>

## Nadzorna plošča darovanj

Nadzorna plošča darovanj je pogled **Nadzorna plošča** na strani **Povzetek**, prvi strani, ki jo vidite, ko odprete razdelek **Darovanja**.

1. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu B1 Admin), razširite **Darovanja** in kliknite **Povzetek**. Stran **Povzetek** se odpre v pogledu **Nadzorna plošča**. Preklopnik **Pogled** v zgornjem desnem kotu preklaplja med **Nadzorna plošča** in **Izgubljeni darovalci**.
2. S preklopniki **Tedensko**, **Mesečno** in **Četrtletno** nad poročilom izberite, kako se darovanja združujejo.
3. V plošči **Filtriraj poročilo** nastavite **Začetni datum** in **Končni datum** (privzeto od prejšnjega leta do včeraj) in po želji izberite **Sklad**, nato kliknite **Zaženi poročilo**. Poročilo se ob odprtju strani samodejno zažene s privzetimi nastavitvami.
4. Štiri **kartice KPI** prikazujejo vaše meritve darovanj za izbrano obdobje:
   - **Skupna darovanja** -- Skupni znesek, ki je bil podarjen.
   - **Povprečni dar** -- Povprečni znesek darovanja.
   - **Edinstveni darovalci** -- Število različnih oseb, ki so darovale.
   - **Skupna darovanja (število)** -- Skupno število posameznih darovanj.
5. Pod kazalniki KPI stolpični grafikon prikazuje darovanja po tednih, mesecih ali četrtletjih, razčlenjena po skladih.
6. Kliknite **Možnosti prenosa** in izberite **Povzetek**, da izvozite CSV datoteko s skupnimi zneski po obdobjih in skladih, ali kliknite ikono tiskalnika, da natisnete poročilo. Logotip vaše cerkve (**logotip za svetle ozadje** iz [Spletna stran > Videz](../website/appearance.md), če ste ga naložili) in ime sta na vrhu natisnjenega poročila poravnana na sredino. Izpis uporablja temno besedilo in svetel grafikon, tudi če B1 Admin uporabljate v temnem načinu.

Če so bila darovanja v obdobju podarjena v več kot eni valuti, se zneski KPI pretvorijo v valuto vaše cerkve, pod karticami pa se prikaže opomba **Pretvorjeno po trenutnih menjalnih tečajih**. Podrobnosti najdete v [Podpora več valutam](./multi-currency.md#converted-totals).

:::info
Nadzorna plošča prikazuje skupne podatke o darovanjih. Ne vključuje imen posameznih darovalcev. Za podrobnosti o posameznih darovalcih uporabite stran [Serije](batches.md).
:::

## Izgubljeni darovalci

Izberite **Izgubljeni darovalci** v preklopniku **Pogled**, da prikažete osebe, ki so darovale v enem obdobju, potem pa ne več. Privzeto primerja lansko koledarsko leto s tem letom do danes; s spremembo katerega koli datumskega obsega razširite ali zožite iskanje. Vsaka vrstica prikazuje osebo, datum njenega zadnjega darila in njen skupni znesek v prejšnjem obdobju. **Možnosti prenosa > Povzetek** prenese seznam kot CSV za nadaljnje pošiljanje pošte ali seznam za klice.

## Ogled podrobnosti o darovalcih

Za razčlenitev tega, kdo je daroval, koliko in za kateri sklad:

1. Pojdite na **Darovanja > Serije**.
2. Kliknite **ime serije**, da jo odprete.
3. Stran s podrobnostmi serije navede vsako darovanje z načinom (in številko čeka ali zadnjimi štirimi številkami kartice), imenom darovalca, datumom, opombami in zneskom, na dnu pa je skupni znesek.
4. Kliknite **Uredi** v vrstici darovanja, da odprete celotne podrobnosti posameznega darovanja, vključno z njegovim skladom.
5. Kliknite **Izvozi** nad seznamom, da prenesete CSV datoteko z vsemi podatki o darovalcih in darovanjih za to serijo.

## Poročilo o povzetku darovanj

Poročanje o darovanjih je neposredno vgrajeno v razdelek Darovanja -- stran Povzetek služi kot vaše poročilo o povzetku darovanj:

1. V meniju Jump izberite **Darovanja > Povzetek**.
2. V pogledu **Nadzorna plošča** nastavite **Začetni datum** in **Končni datum** v plošči **Filtriraj poročilo** in kliknite **Zaženi poročilo**.
3. Kliknite **Možnosti prenosa** in izberite **Povzetek**, da poročilo izvozite kot CSV datoteko.

## Izvoz podatkov

Podatke o darovanjih lahko izvozite z več mest:

- **Stran Povzetek** -- prenesite CSV s skupnimi zneski darovanj po tednih, mesecih ali četrtletjih in skladih
- **Stran s podrobnostmi serije** -- prenesite CSV posameznih darovanj s podatki o darovalcih
- **Stran s podrobnostmi skladov** -- prenesite zgodovino darovanj za določen sklad

:::tip
Za poročanje ob koncu leta združite izvoz s strani Povzetek z orodjem [Izpiski darovanj](giving-statements.md), da dobite tako skupne trende kot izpiske posameznih darovalcev.
:::

## Naslednji koraki

- Ob koncu leta ustvarite [Izpiske darovanj](giving-statements.md) za svoje darovalce
- Pregledujte posamezne [serije](batches.md), da preverite podrobnosti darovanj
- Preverite podrobne strani [skladov](funds.md) za razčlenitev darovanj po kategorijah
