---
title: "Autentificare în B1 Church Checkin"
sidebar_label: "Prijavljivanje"
description: "Conectează-te la aplicația chioșcului B1 Church Checkin, alege biserica și înțelege autentificarea automată, setările admin și deconectarea."
---

# Prijavljivanje

<div class="article-intro">

Prije nego što se kiosk može koristiti za prijavu, potrebno je da se prijavite s ChurchApps računom koji ima pristup vašoj crkvi. Ova stranica obuhvata postupak prvog prijavljivanja, odabir crkve, ponašanje automatske prijave i odjavu.

</div>

<div class="prereqs">
<h4>Prije nego što počnete</h4>

- Instalirajte B1 Church Checkin na svoj Android tablet (pogledajte [Početak rada](./index.md))
- Pripremite e-adresu i lozinku za svoj ChurchApps račun
- Račun mora imati dozvolu **Checkin** (ili **Edit Attendance**) u vašoj crkvi. Administrator je dodaje u B1 Admin pod **Settings > Roles** — pogledajte [Računi za kiosk za prijavu](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Prvo prijavljivanje

1. Otvorite aplikaciju B1 Church Checkin. Nakon ekrana za pokretanje vidjet ćete ekran za prijavu s logotipom B1 Church Checkin.
2. Unesite svoju **e-adresu** u prvo polje.
3. Unesite svoju **lozinku** u drugo polje.
4. Dodirnite dugme **Login**.

Aplikacija provjerava vaše podatke i prijavljuje vas. Ako su e-adresa ili lozinka netočne, na dnu ekrana ćete vidjeti poruku o grešci.

Ako je za račun uključena [dvostepena prijava](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), aplikacija tada traži kod. Unesite 6-cifreni kod iz aplikacije za autentifikaciju vlasnika računa ili jedan od njegovih rezervnih kodova, pa ponovo dodirnite **Login**. Kod je potreban samo za ovu prvu prijavu; nakon toga kiosk ostaje prijavljen.

:::info
Ovo su ista e-adresa i lozinka koje koristite za B1 Admin ili bilo koji drugi ChurchApps proizvod. Za kiosk za prijavu ne trebate poseban račun.
:::

## Odabir crkve

Nakon uspješne prijave, aplikacija učitava crkve u kojima vaš račun ima dozvolu **Checkin** ili **Edit Attendance**. Crkve u kojima imate samo druge dozvole se izostavljaju. Ako nijedna ne ostane, aplikacija prikazuje poruku **No check-in access** i traži da vaš administrator crkve doda dozvolu Checkin jednoj od vaših uloga. Svaka crkva prikazana je kao kartica s nazivom crkve i logotipom (ako je konfigurisan u B1 Admin).

- Ako je vaš račun povezan **samo s jednom crkvom**, i dalje ćete vidjeti ekran za odabir. Dodirnite svoju crkvu da nastavite.
- Ako je vaš račun povezan s **više crkava**, dodirnite crkvu kojoj želite da ovaj kiosk služi.

Nakon što odaberete crkvu, aplikacija učitava postavke brendiranja i izgleda te crkve. Logotip vaše crkve pojavit će se u zaglavlju na svim sljedećim ekranima.

## Automatska prijava pri ponovnim posjetama

Nakon prve uspješne prijave, aplikacija na tabletu čuva sigurni token za prijavu i odabranu crkvu. Ne čuva vašu lozinku. Pri narednim pokretanjima:

- Aplikacija vas ponovo prijavljuje sačuvanim tokenom.
- Ako ste ranije odabrali crkvu, vraća taj odabir i odmah vas vodi na **ekran službi**.
- Ako sačuvana prijava više nije važeća, aplikacija vraća ekran za prijavu kako biste se ponovo prijavili.

:::tip
Budući da se kiosk automatski prijavljuje, podatke trebate unijeti samo jednom tokom početnog podešavanja. Nakon toga tablet se može uključiti i bit će spreman za rad.
:::

## Postavke administratora

Postavke administratora namjerno su skrivene kako članovi crkve koji koriste kiosk slučajno ne bi promijenili konfiguraciju. Da biste im pristupili:

1. Dodirnite **logotip crkve** u zaglavlju **sedam puta** zaredom (u roku od dvije sekunde).
2. Ako je postavljen PIN za kiosk, unesite PIN kada se to zatraži.
3. Otvoriće se ekran **Admin Settings** sa sljedećim opcijama:
   - **Change Service** — promijenite odabrano vrijeme službe
   - **Change Printer** — otvorite [postavke štampača](./printer-setup.md) za pretragu i odabir štampača
   - **Set/Change PIN** — postavite ili ažurirajte PIN za kiosk koji štiti pristup administratora
   - **Logout** — odjavite se i vratite na ekran za prijavu

:::warning
Odjava briše sve sačuvane podatke za prijavu i odabir crkve. Da biste ponovo koristili kiosk, morat ćete ponovo unijeti svoju e-adresu i lozinku. Odjavite se samo kada trebate promijeniti račun ili ponovo konfigurisati kiosk.
:::

## Sljedeći koraci

Nakon prijave možete [podesiti štampač](./printer-setup.md) ili direktno otići na [tok prijave](../check-in/index.md).
