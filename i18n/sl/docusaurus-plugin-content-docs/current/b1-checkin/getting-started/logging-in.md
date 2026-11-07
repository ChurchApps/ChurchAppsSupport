---
title: "Prijava v B1 Church Checkin"
sidebar_label: "Prijava"
description: "Prijavite se v aplikacijo kioska B1 Church Checkin, izberite svojo cerkev ter razumite samodejno prijavo, skrbniške nastavitve in odjavo na tablici za prijavo."
---

# Prijava

<div class="article-intro">

Preden lahko kiosk uporabite za prijavo obiskovalcev, se morate prijaviti z računom ChurchApps, ki ima dostop do vaše cerkve. Ta stran opisuje postopek prve prijave, izbiro cerkve, samodejno prijavo in odjavo.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite B1 Church Checkin na svoj tablični računalnik Android (glejte [Začetek uporabe](./index.md))
- Pripravite e-poštni naslov in geslo za svoj račun ChurchApps
- Račun potrebuje dovoljenje **Checkin** (ali **Edit Attendance**) v vaši cerkvi. Skrbnik ga doda v B1 Admin pod **Settings > Roles** — glejte [Računi kioska za prijavo](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Prva prijava

1. Odprite aplikacijo B1 Church Checkin. Po zaslonu s pozdravom se bo prikazal zaslon za prijavo z logotipom B1 Church Checkin.
2. V prvo polje vnesite svoj **e-poštni naslov**.
3. V drugo polje vnesite svoje **geslo**.
4. Tapnite gumb **Prijava**.

Aplikacija preveri vaše podatke in vas prijavi. Če sta e-poštni naslov ali geslo napačna, se na dnu zaslona prikaže sporočilo o napaki.

Če ima račun vklopljeno [dvostopenjsko prijavo](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikacija nato zahteva kodo. Vnesite 6-mestno kodo iz aplikacije za overjanje lastnika računa ali eno od njegovih rezervnih kod ter ponovno tapnite **Prijava**. Kodo potrebujete samo ob prvi prijavi; kasneje kiosk ostane prijavljen.

:::info
To sta isti e-poštni naslov in geslo, ki ju uporabljate za B1 Admin ali katerikoli drug izdelek ChurchApps. Za kiosk za prijavo ne potrebujete ločenega računa.
:::

## Izbira cerkve

Po uspešni prijavi aplikacija naloži cerkve, v katerih ima vaš račun dovoljenje **Checkin** ali **Edit Attendance**. Cerkve, v katerih imate samo druga dovoljenja, so izpuščene. Če ni nobene, aplikacija prikaže **No check-in access** in vas prosi, naj skrbnik cerkve doda dovoljenje Checkin eni od vaših vlog. Vsaka cerkev je prikazana kot kartica z imenom in logotipom cerkve (če je bil nastavljen v B1 Admin).

- Če je vaš račun povezan **samo z eno cerkvijo**, se vseeno prikaže zaslon za izbiro. Tapnite svojo cerkev, da nadaljujete.
- Če je vaš račun povezan **z več cerkvami**, tapnite cerkev, ki naj jo ta kiosk streže.

Ko izberete cerkev, aplikacija naloži njene nastavitve blagovne znamke in videza. Logotip vaše cerkve se bo nato prikazal v glavi na vseh naslednjih zaslonih.

## Samodejna prijava ob ponovnih obiskih

Po prvi uspešni prijavi aplikacija na tabličnem računalniku hrani varen žeton za prijavo in izbrano cerkev. Vašega gesla ne shranjuje. Ob naslednjih zagonih:

- Aplikacija vas samodejno prijavi s shranjenim žetonom.
- Če ste prej izbrali cerkev, jo obnovi in vas neposredno pripelje na **zaslon storitev**.
- Če shranjena prijava ni več veljavna, se aplikacija vrne na zaslon za prijavo, da se lahko ponovno prijavite.

:::tip
Ker se kiosk samodejno prijavlja, morate podatke vnesti samo enkrat med začetno nastavitvijo. Potem lahko tablični računalnik vklopite in je pripravljen za uporabo.
:::

## Nastavitve skrbnika

Nastavitve skrbnika so namenoma skrite, da člani cerkve, ki uporabljajo kiosk, ne bi po nesreči spremenili konfiguracije. Do njih dostopate takole:

1. V glavi **sedemkrat** zapored hitro tapnite na **logotip cerkve** (v dveh sekundah).
2. Če je nastavljena PIN koda kioska, jo vnesite, ko vas aplikacija pozove.
3. Odpre se zaslon **Admin Settings** z naslednjimi možnostmi:
   - **Change Service** — preklop na izbrani čas storitve
   - **Change Printer** — odpre [nastavitve tiskalnika](./printer-setup.md), kjer poiščete in izberete tiskalnik
   - **Set/Change PIN** — nastavi ali posodobi PIN kod kioska, ki ščiti dostop skrbnika
   - **Logout** — odjavi vas in vrne na zaslon za prijavo

:::warning
Odjava izbriše vse shranjene podatke za prijavo in izbiro cerkve. Če želite kiosk znova uporabljati, morate ponovno vnesti e-poštni naslov in geslo. Odjavite se samo, ko želite zamenjati račun ali znova konfigurirati kiosk.
:::

## Naslednji koraki

Ko se prijavite, lahko [nastavite tiskalnik](./printer-setup.md) ali pa neposredno preidete na [potek prijave](../check-in/index.md).
