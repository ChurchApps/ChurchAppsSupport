---
title: "Vodnik: Nastavitev prijave na dogodek"
description: "Nastavite obrazec za prijavo na dogodek v B1 Admin, zberite podatke udeležencev in po želji plačila, vdelajte ga na spletno mesto in spremljajte prijave."
---

# Nastavitev prijave na dogodek

<div class="article-intro">

Ustvarite obrazec za prijavo na dogodek, zbirajte podatke o udeležencih in po želji plačila, ga vdelajte na spletno stran vaše cerkve in upravljajte prijave, ko prispejo. Na koncu boste imeli stran za prijavo, ki jo lahko delite, za kateri koli cerkveni dogodek.

</div>

:::info
**Dva načina za prijavo na dogodke:** Ta vodnik obravnava **prijavo prek obrazcev**, ki vam daje popoln nadzor nad prilagojenimi polji in zbiranjem plačil. Za preprostejše dogodke, kjer samo želite slediti, kdo bo prišel, uporabite **prijavo na dogodek prek koledarja**, ki je vgrajena v koledar -- navodila za nastavitev najdete v razdelku [Ustvarjanje koledarjev](../calendars/creating-calendars.md#enabling-event-registration). Prijava prek koledarja omogoča članom, da se prijavijo neposredno na [spletni strani B1](../../b1-church/events/registering.md) in v [mobilni aplikaciji](../../b1-mobile/events/registering.md), ob sledenju zasedenosti, časovnih oknih in e-poštnih potrditvah.
:::

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun B1 Admin z administratorskim dostopom
- Za zbiranje plačil: najprej mora biti nastavljen [Stripe](../donations/online-giving-setup.md)

</div>

## 1. korak: Ustvarite samostojni obrazec

Samostojni obrazci imajo svoj javni naslov URL, do katerega lahko dostopa kdorkoli -- idealno za prijavo na dogodek.

Sledite vodniku [Ustvarjanje obrazcev](../forms/creating-forms.md), da:

1. Se pomaknete do Forms in kliknete Add Form
2. Izberete vrsto "Stand Alone" -- s tem bo vaš obrazec dobil lasten javni naslov URL
3. Ga poimenujete po dogodku (npr. "Prijava na moško duhovno obnovo", "Prijava na VBS")

## 2. korak: Dodajte vprašanja

Oblikujte polja, ki jih potrebujete od prijavljencev.

Sledite vodniku [Ustvarjanje obrazcev](../forms/creating-forms.md#adding-questions), da dodate vprašanja:

1. Pojdite na zavihek Questions in dodajte polja za podatke, ki jih potrebujete: ime, e-pošto, telefonsko številko, prehranske omejitve, velikost majice, kontakt za primer nujnosti itd.
2. Uporabite Multiple Choice za možnosti, kot so prehranske želje ali izbira sklopov

:::warning
Vrsta polja Payment zahteva nastavljen Stripe. Če še niste nastavili spletnega darovanja, si oglejte [Nastavitev spletnega darovanja](../donations/online-giving-setup.md), preden dodate polja za plačilo.
:::

## 3. korak: Nastavite možnosti obrazca

Nadzorujte, kdaj in kako je vaš obrazec za prijavo na voljo.

1. Če naj bo prijava odprta le omejen čas, nastavite datume razpoložljivosti
2. Kopirajte javni naslov URL -- lahko ga delite neposredno
3. Dodajte člane obrazca z vlogama Admin ali View Only, da pomagajo upravljati prijave

## 4. korak: Vdelajte na vašo spletno stran

Poskrbite, da bo obrazec za prijavo enostavno najti, tako da ga dodate na spletno stran vaše cerkve.

Sledite vodniku [Upravljanje strani](../website/managing-pages.md), da:

1. V urejevalniku spletne strani B1 dodate nov razdelek na stran in izberete element Form
2. Iz seznama izberete svoj obrazec za prijavo

:::tip
Samostojni naslov URL delite tudi prek e-pošte, družbenih omrežij in cerkvenih biltenov -- več mest, kjer je viden, več prijav boste dobili.
:::

## 5. korak: Upravljajte prijave

Spremljajte prijave, ko prispejo, in po potrebi izvozite podatke.

Sledite vodniku [Upravljanje prijav](../forms/managing-submissions.md), da:

1. Pregledujete odgovore, ko prispejo, na zavihku Submissions
2. Izvozite v CSV za preglednice, sledenje številu udeležencev ali deljenje z organizatorji dogodka

## Končano!

Vaša prijava na dogodek je aktivna. Delite povezavo, jo vdelajte na svojo spletno stran in spremljajte prijave v B1 Admin. Ko se dogodek zaključi, izvozite končni seznam za svojo evidenco.

## Sorodni članki

- [Ustvarjanje obrazcev](../forms/creating-forms.md) -- izdelava obrazcev z različnimi vrstami polj
- [Upravljanje prijav](../forms/managing-submissions.md) -- pregled in izvoz odgovorov obrazca
- [Upravljanje strani](../website/managing-pages.md) -- vdelava obrazcev na spletno stran
- [Nastavitev spletnega darovanja](../donations/online-giving-setup.md) -- potrebno za polja plačil
