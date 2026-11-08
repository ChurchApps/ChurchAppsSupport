---
title: "Vodnik: Ustvarjanje letnih poročil o darilih"
description: "V B1 Admin dokončajte evidenco donacij za leto, preverite davčne nastavitve skladov in ustvarite potrdila o davčno odbitnih darilih za vsakega darovalca."
---

# Ustvarjanje letnih poročil o darilih

<div class="article-intro">

Sledite postopku ob koncu leta: dokončajte evidenco donacij, preverite nastavitve skladov in ustvarite potrdila o davčno odbitnih darilih za vsakega darovalca. To se običajno opravi na začetku januarja za preteklo koledarsko leto.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun B1 Admin s finančnim dostopom
- Donacije, zabeležene skozi vse leto (prek Stripe in/ali ročno vnesene)
- Dostop do vašega računa Stripe, če sprejemate spletne donacije

</div>

## 1. korak: Uvoz zadnjih transakcij Stripe

Poskrbite, da so vse spletne donacije iz konca leta v vašem sistemu.

Sledite vodniku [Uvoz Stripe](../donations/stripe-import.md), da:

1. Odprete Donacije > Uvoz Stripe
2. Izberete časovno obdobje, ki zajema konec leta (npr. 1. december – 31. december)
3. Kliknete Predogled, da pregledate podatke, nato Uvozi manjkajoče, da zaključite uvoz

:::warning
Ta uvoz izvedite pred ustvarjanjem potrdil. Transakcije, ki jih niste uvozili, se ne bodo pojavile na potrdilih darovalcev.
:::

## 2. korak: Pregled poročil o donacijah

Pred ustvarjanjem potrdil preverite, ali so vaši podatki točni.

Sledite vodniku [Poročila o donacijah](../donations/donation-reports.md), da:

1. Preverite povzetek donacij za celotno leto
2. Pregledate skupne zneske po skladih in jih primerjate z bančnimi izpiski, da odkrijete morebitna odstopanja
3. Po potrebi kliknete na posamezne sklope (batch), da preverite podrobnosti o darovalcih

## 3. korak: Preverjanje davčnega statusa skladov

Preverite, ali je davčna odbitnost pri vsakem skladu pravilno nastavljena, da bodo potrdila točna.

Sledite vodniku [Skladi](../donations/funds.md), da:

1. Odprete vsak sklad in potrdite, da je nastavitev davčne odbitnosti pravilna

:::info
Na potrdilih o darilih se bodo prikazale samo donacije za sklade, označene kot davčno odbitni. Če bi moral biti sklad davčno odbitni, a ni tako označen, ga pred ustvarjanjem potrdil posodobite.
:::

## 4. korak: Ustvarjanje potrdil o darilih

Ustvarite uradna potrdila o darilih za svoje darovalce.

Sledite vodniku [Potrdila o darilih](../donations/giving-statements.md), da:

1. Odprete **Donacije > Potrdila o darilih**
2. Na spustnem seznamu izberete leto in preglejte povzetne statistike
3. Izberete način prenosa:
   - **Prenesi ZIP** — posamezne datoteke CSV, ena za vsakega darovalca
   - **Natisni vse** — pregledna oblika za tisk, pri čemer je vsako potrdilo na svoji strani, z logotipom vaše cerkve na vrhu (če ste ga naložili)

:::tip
Potrdila ustvarite zgodaj v januarju, dokler so podatki sveži. Tako boste imeli čas odpraviti morebitne težave, preden jih pošljete.
:::

## 5. korak: Dostava darovalcem

Poskrbite, da potrdila pridejo do vaših darovalcev.

1. Potrdila natisnite in pošljite po pošti ali posamezne datoteke CSV pošljite darovalcem po e-pošti
2. Člani lahko tudi sami pregledajo zgodovino svojih darov in natisnejo potrdila na [B1.church ali v aplikaciji B1 App](../../b1-church/giving/donation-history.md)

## Konec!

Vaša letna poročila o darilih so končana. Darovalci so prejeli potrdila o davčno odbitnih darilih, vaša finančna evidenca za leto pa je zaključena.

## Sorodni članki

- [Uvoz Stripe](../donations/stripe-import.md) — uvoz spletnih transakcij
- [Poročila o donacijah](../donations/donation-reports.md) — ogled trendov in skupnih zneskov darov
- [Skladi](../donations/funds.md) — upravljanje skladov in nastavitev davčne odbitnosti
- [Potrdila o darilih](../donations/giving-statements.md) — ustvarjanje letnih potrdil
- [Beleženje donacij](../donations/recording-donations.md) — ročni vnos gotovinskih/čekovnih donacij
- [Zgodovina donacij (spletno)](../../b1-church/giving/donation-history.md) — samopostrežni pregled za člane
- [Vodnik za nastavitev spletnega darovanja](./online-giving.md) — začetna nastavitev Stripe in darovanja
