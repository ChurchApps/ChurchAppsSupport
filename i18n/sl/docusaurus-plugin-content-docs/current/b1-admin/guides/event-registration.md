---
title: "Vodnik: Nastavitev prijave na dogodek"
description: "Nastavite obrazec za prijavo na dogodek v B1 Admin, da zbirate podatke udeležencev in morebitna plačila, ga vdelate na spletno stran cerkve in spremljate prijave."
---

# Nastavitev prijave na dogodek

<div class="article-intro">

Ustvarite obrazec za prijavo na dogodek, zbirajte podatke o udeležencih in morebitna plačila, ga vdelajte na spletno stran cerkve ter sproti upravljajte prispele prijave. Na koncu boste imeli stran za prijavo, ki jo lahko delite pri katerem koli cerkvenem dogodku.

</div>

:::info
**Dva načina za prijavo na dogodke:** Ta vodnik obravnava **prijavo prek obrazca**, ki vam daje popoln nadzor nad prilagojenimi polji in zbiranjem plačil. Za preprostejše dogodke, kjer želite le slediti, kdo bo prišel, uporabite **vgrajeno prijavo na dogodek** v koledarju. Navodila za nastavitev najdete v razdelku [Ustvarjanje koledarjev](../calendars/creating-calendars.md#enabling-event-registration). Z vgrajeno prijavo se člani lahko prijavijo neposredno prek [B1.church ali aplikacije B1 App](../../b1-church/events/registering.md), z nadzorom zmogljivosti, časovnimi okni in potrditvami po e-pošti.
:::

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun B1 Admin z administratorskim dostopom
- Za zbiranje plačil: najprej [morate nastaviti Stripe](../donations/online-giving-setup.md)

</div>

## 1. korak: Ustvarjanje samostojnega obrazca

Samostojni obrazci imajo svoj javni naslov URL, do katerega lahko dostopa kdorkoli – idealno za prijavo na dogodek.

Sledite vodniku [Ustvarjanje obrazcev](../forms/creating-forms.md), da:

1. Se pomaknete do razdelka Obrazci in kliknete Dodaj obrazec
2. Izberete vrsto »Samostojni« – tako bo obrazec imel svoj javni naslov URL
3. Ga poimenujete po dogodku (npr. »Prijava na moški izlet«, »Prijava na VBS«)

## 2. korak: Dodajanje vprašanj

Oblikujte polja, ki jih potrebujete od prijavljencev.

Sledite vodniku [Ustvarjanje obrazcev](../forms/creating-forms.md#adding-questions), da dodate vprašanja:

1. Pojdite na zavihek Vprašanja in dodajte polja za podatke, ki jih potrebujete: ime, e-pošto, telefon, prehranske omejitve, velikost majice, stik za nujne primere itd.
2. Za možnosti, kot so izbira obroka ali udeležba na delavnicah, uporabite Izbira med več možnostmi

:::warning
Vrsta polja Plačilo zahteva nastavljen Stripe. Če še niste nastavili spletnega darovanja, si preberite [Nastavitev spletnega darovanja](../donations/online-giving-setup.md), preden dodate polja za plačilo.
:::

## 3. korak: Nastavitev obrazca

Določite, kdaj in kako je prijavni obrazec na voljo.

1. Če naj bo prijava odprta le omejen čas, nastavite datume razpoložljivosti
2. Kopirajte javni naslov URL – to lahko delite neposredno
3. Dodajte člane obrazca z vlogama Administrator ali Samo ogled, ki bodo pomagali pri upravljanju prijav

## 4. korak: Vdelava na spletno stran

Poskrbite, da bo prijavni obrazec enostavno dosegljiv, tako da ga dodate na spletno stran cerkve.

Sledite vodniku [Upravljanje strani](../website/managing-pages.md), da:

1. V urejevalniku spletne strani B1 dodate nov razdelek na stran in izberete element Obrazec
2. Iz seznama izberete svoj prijavni obrazec

:::tip
Samostojni naslov URL delite tudi prek e-pošte, družbenih omrežij in cerkvenih biltenov – čim več mest, kjer je viden, tem več prijav boste dobili.
:::

## 5. korak: Upravljanje prijav

Spremljajte prijave, ko prispejo, in po potrebi izvozite podatke.

Sledite vodniku [Upravljanje prijav](../forms/managing-submissions.md), da:

1. Pregledujete odgovore, ko prispejo, na zavihku Prijave
2. Izvozite v CSV za preglednice, štetje udeležencev ali deljenje z organizatorji dogodka

## Konec!

Vaša prijava na dogodek je zdaj aktivna. Delite povezavo, jo vdelajte na spletno stran in spremljajte prijave v B1 Admin. Ko se dogodek konča, izvozite končni seznam za svojo evidenco.

## Sorodni članki

- [Ustvarjanje obrazcev](../forms/creating-forms.md) — izdelava obrazcev z različnimi vrstami polj
- [Upravljanje prijav](../forms/managing-submissions.md) — pregledovanje in izvoz odgovorov na obrazec
- [Upravljanje strani](../website/managing-pages.md) — vdelava obrazcev na spletno stran
- [Nastavitev spletnega darovanja](../donations/online-giving-setup.md) — potrebno za polja plačila
