---
title: "Dodeljevanje vlog"
description: "Dodelite vloge v B1 Admin, da osebju in prostovoljcem omogočite dostop le do oseb, darov, prisotnosti in skupin, ki jih potrebujejo."
---

# Dodeljevanje vlog

<div class="article-intro">

B1 Admin uporablja sistem dovoljenj, ki temelji na vlogah, da nadzoruje, kaj lahko vsak uporabnik v vaši ekipi vidi in kaj lahko naredi. Z dodeljevanjem vlog lahko zaposlenim in prostovoljcem dodelite dostop prav do tistih področij, ki jih potrebujejo, in nič več. Ustrezno upravljanje vlog varuje podatke vaše cerkve in hkrati omogoča, da ekipa dela učinkoviteje.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete dostop **Domain Admin** ali vlogo s pravico za upravljanje **nastavitev** v B1 Admin.
- Osebe, ki jim želite dodeliti vloge, morajo že obstajati v vašem imeniku. Če jih še morate dodati, si oglejte [Dodajanje oseb](adding-people.md).

</div>

## Razumevanje vlog

Vloga je nabor dovoljenj, ki jih dodelite enemu ali več uporabnikom. Na primer, lahko ustvarite vlogo »Finančna ekipa«, ki omogoča dostop do [evidenc darovanj](../donations/recording-donations.md), ali vlogo »Prostovoljec za prijavo«, ki dovoljuje dostop le do [funkcij obiskovanja](../attendance/check-in.md).

Vsaka vloga nadzoruje dostop do določenih področij B1 Admin, vključno z:

- **Osebe** -- ogled in urejanje profilov članov. Za razdelek Opombe na zapisu osebe je potrebno dovoljenje **Urejanje oseb**, ločeno dovoljenje **Ogled zaupnih opomb** pa nadzoruje dostop do razdelka Zaupne opombe (za pastoralno skrb, osebno zgodovino in podobne občutljive opombe). **Ogled le imen oseb** omogoča iskanje oseb po imenu (vidni so le ime, fotografija in status članstva), brez dostopa do celotnega imenika. V kombinaciji z **Ogled obiskovanja** ali **Urejanje obiskovanja** lahko prostovoljec odpre **Skupine** in po imenih vidi ssezname udeležencev razredov; z **Urejanje obiskovanja** lahko tudi [beleži obiskovanje](../attendance/recording-attendance.md). Glejte [Samo imena oseb](../settings/roles-permissions.md#people-names-only).
- **Darovanja** -- upravljanje prispevkov in finančnih poročil. **Vnos darovanj** je ožja možnost za ekipe za štetje: omogoča vnašanje darov, vendar le v [serijah](../donations/batches.md#who-can-change-a-batch), ki so še odprte.
- **Obiskovanje** -- beleženje in ogled podatkov o obiskovanju
- **Obrazci** -- ustvarjanje in upravljanje [obrazcev po meri](../forms/creating-forms.md)
- **Skupine** -- upravljanje [članstev v skupinah](../groups/group-members.md) in koledarjev
- **Nastavitve** -- konfiguriranje nastavitev za celotno cerkev

:::warning
**Domain Admin** ima poln dostop do vseh področij B1 Admin. Njegovih dovoljenj ni mogoče urejati ali omejiti. To vlogo uporabite le za glavne skrbnike.
:::

## Ogled in upravljanje vlog

1. Odprite [meni za hitri skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu B1 Admin) in razširite **Nastavitve**.
2. Kliknite **Vloge**.
3. Prikazal se bo seznam vseh vlog, nastavljenih za vašo cerkev, s stolpcem **Člani**, ki prikazuje, koliko uporabnikov je v posamezni vlogi.
4. Kliknite katero koli vlogo, da si ogledate njene člane in dovoljenja.

## Dodajanje uporabnikov v vlogo

1. V meniju za hitri skok izberite **Nastavitve > Vloge**.
2. Kliknite vlogo, v katero želite dodati uporabnika.
3. V razdelku **Člani** poiščite osebo po imenu.
4. Kliknite **Dodaj**, da jo dodelite v vlogo.

Uporabnik bo imel vsa dovoljenja, povezana z vlogo, ob naslednji prijavi.

## Urejanje dovoljenj vloge

1. V meniju za hitri skok izberite **Nastavitve > Vloge**.
2. Kliknite vlogo, ki jo želite spremeniti.
3. V razdelku **Dovoljenja** označite ali odznačite področja, do katerih naj ima vloga dostop. Vsaka skupina dovoljenj prikazuje, koliko njenih dovoljenj je označenih (na primer **2 od 5**).
4. Vsaka sprememba se shrani takoj, ko označite ali odznačite polje.

:::tip
Upoštevajte načelo najmanjših pravic -- vsaki vlogi dodelite le dovoljenja, ki jih res potrebuje. Tako ostanejo podatki varni, zmanjša pa se tveganje za nenamerne spremembe.
:::

## Pogosti primeri vlog

- **Pisarniško osebje** -- dostop do Oseb, Darovanj, Obiskovanja in Obrazcev
- **Vodje skupin** -- dostop samo do [Skupin](../groups/creating-groups.md)
- **Prostovoljci za prijavo** -- dovoljenje za obiskovanje **Prijava**, ki ga potrebuje račun, prijavljen na [kiosk za prijavo](../attendance/check-in.md)
- **Finančna ekipa** -- dostop do [Darovanj](../donations/recording-donations.md) in poročil
- **Ekipa za štetje** -- **Vnos darovanj** in **Ogled darovanj**, tako da lahko prostovoljci vnašajo darove v odprte serije, ne da bi videli povzetke darovanj

Za podrobnejši pregled dovoljenj za darovanja in osebe si oglejte [Vloge in dovoljenja](../settings/roles-permissions.md).
