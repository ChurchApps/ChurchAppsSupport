---
title: "Prijava v B1 Church Checkin"
sidebar_label: "Prijava"
description: "Prijavite se v aplikacijo kiosk B1 Church Checkin, izberite svojo cerkev ter spoznajte samodejno prijavo, skrbniške nastavitve in odjavo na tablici za prijavo."
---

# Prijava

<div class="article-intro">

Preden lahko kiosk uporabite za prijavo obiskovalcev, se morate prijaviti z računom ChurchApps, ki ima dostop do vaše cerkve. Ta stran opisuje postopek prve prijave, izbiro cerkve, obnašanje samodejne prijave in odjavo.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite B1 Church Checkin na svojo Android tablico (glejte [Začetek dela](./index.md))
- Pripravite e-poštni naslov in geslo za račun ChurchApps
- Račun potrebuje dovoljenje **Checkin** (ali **Urejanje prisotnosti**) v vaši cerkvi. Skrbnik ga doda v B1 Admin pod **Nastavitve > Vloge** – glejte [Računi kioska za prijavo](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Prva prijava

1. Odprite aplikacijo B1 Church Checkin. Po zaslonu za zagon se prikaže zaslon za prijavo z logotipom B1 Church Checkin.
2. V prvo polje vnesite svoj **e-poštni naslov**.
3. V drugo polje vnesite svoje **geslo**.
4. Pritisnite gumb **Prijava**.

Aplikacija preveri vaše podatke in vas prijavi. Če sta e-poštni naslov ali geslo napačna, se na dnu zaslona prikaže sporočilo o napaki.

Če pri računu vklopite [dvostopenjsko prijavo](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikacija nato zahteva kodo. Vnesite 6-mestno kodo iz aplikacije za overjanje lastnika računa ali eno od njegovih rezervnih kod ter ponovno pritisnite **Prijava**. Kodo potrebujete samo za to prvo prijavo; po tem kiosk ostane prijavljen.

:::info
To je isti e-poštni naslov in geslo, ki ju uporabljate za B1 Admin ali katerikoli drug izdelek ChurchApps. Za kiosk za prijavo ne potrebujete ločenega računa.
:::

## Izbira cerkve

Po uspešni prijavi aplikacija naloži cerkve, v katerih ima vaš račun dovoljenje **Checkin** ali **Urejanje prisotnosti**. Cerkve, v katerih imate samo druga dovoljenja, so izpuščene. Če nobena ne ostane, aplikacija prikaže **Ni dostopa do prijave** in vas prosi, naj skrbnik cerkve doda dovoljenje Checkin eni od vaših vlog. Vsaka cerkev je prikazana kot kartica z imenom cerkve in logotipom (če ste ga nastavili v B1 Admin).

- Če je vaš račun povezan **samo z eno cerkvijo**, se vseeno prikaže zaslon za izbiro. Za nadaljevanje tapnite svojo cerkev.
- Če je vaš račun povezan z **več cerkvami**, tapnite cerkev, ki naj jo ta kiosk servisira.

Ko izberete cerkev, aplikacija naloži njeno celostno podobo in nastavitve videza. Logotip vaše cerkve se bo prikazal v glavi vseh naslednjih zaslonov.

## Samodejna prijava ob ponovnih obiskih

Po prvi uspešni prijavi aplikacija na tablici shrani varen žeton za prijavo in izbrano cerkev. Vašega gesla ne shranjuje. Ob naslednjih zagonih:

- Aplikacija vas samodejno prijavi s shranjenim žetonom.
- Če ste prej izbrali cerkev, jo obnovi in vas neposredno popelje na **zaslon storitev**.
- Če shranjena prijava ni več veljavna, se aplikacija vrne na zaslon za prijavo, da se lahko znova prijavite.

:::tip
Ker se kiosk samodejno prijavlja, morate poverilnice vnesti le enkrat med začetno namestitvijo. Po tem lahko tablico vklopite in je takoj pripravljena za uporabo.
:::

## Skrbniške nastavitve

Skrbniške nastavitve so namenoma skrite, da člani cerkve, ki uporabljajo kiosk, slučajno ne spremenijo konfiguracije. Do njih dostopate takole:

1. Hitro zaporedoma tapnite **logotip cerkve** v glavi **sedemkrat** (v dveh sekundah).
2. Če je nastavljena PIN koda kioska, jo vnesite, ko vas aplikacija pozove.
3. Odpre se zaslon **Skrbniške nastavitve** z naslednjimi možnostmi:
   - **Spremeni storitev** – preklopite na izbrani čas storitve
   - **Spremeni tiskalnik** – odprite [nastavitve tiskalnika](./printer-setup.md), da poiščete in izberete tiskalnik
   - **Nastavi skrbniško PIN kodo** (ali **Spremeni skrbniško PIN kodo**, ko je nastavljena) – nastavite ali posodobite PIN kodo kioska, ki varuje skrbniški dostop
   - **Nujno obvestilo** – pošljite sporočilo SMS skrbnikom vseh prijavljenih gospodinjstev (glejte [Nujno obvestilo](../check-in/checking-out.md#emergency-broadcast))
   - **Način ročne postaje** – stikalo, ki tej postaji doda odjavo, klicanje, ponovni tisk in urejanje profilov (glejte [Odjava](../check-in/checking-out.md))
   - **Odjava** – odjavite se in se vrnite na zaslon za prijavo

   Za vrnitev na prijavo tapnite **Nazaj na kiosk**.

:::warning
Z odjavo se izbrišejo vse shranjene poverilnice in izbira cerkve. Za ponovno uporabo kioska boste morali znova vnesti e-poštni naslov in geslo. Odjavite se samo, ko želite zamenjati račun ali znova konfigurirati kiosk.
:::

## Naslednji koraki

Ko se prijavite, lahko [nastavite tiskalnik](./printer-setup.md) ali pa neposredno preidete na [potek prijave](../check-in/index.md).
