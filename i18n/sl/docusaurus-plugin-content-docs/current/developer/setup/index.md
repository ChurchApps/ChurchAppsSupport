---
title: "Nastavitev"
---

# Nastavitev

<div class="article-intro">

Ta razdelek vas vodi skozi nastavitev lokalnega razvojnega okolja za projekte ChurchApps. Svojo spletno aplikacijo lahko za hiter razvoj usmerite na skupne demo API-je ali pa za delo na zaledju zaženete celoten sklad lokalno.

</div>

## Dva pristopa

Lokalno razvijate lahko na dva načina, odvisno od tega, koliko sklada potrebujete:

### 1. Usmeritev na demo API-je (najlažje)

Če delate na **projektu za sprednji del** (spletna, mobilna ali namizna aplikacija), je najhitrejša pot, da svojo lokalno aplikacijo usmerite na skupne demo API-je. Ni potrebna nobena nastavitev baze podatkov ali zaledja.

Osnovni naslov demo API-ja je:

```
https://api.demo.churchapps.org
```

Vsak modul API-ja je dostopen na poti pod tem naslovom, na primer:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Demo okolje poganja najnovejšo kodo iz veje `main`, njegovi vzorčni podatki pa se vsako noč ponovno napolnijo, zato ne pričakujte, da bo tam ustvarjeno ostalo. (Nekdanje testno okolje, `api.staging.churchapps.org`, je bilo ukinjeno. Nekatere datoteke `.env` z vzorčnimi vrednostmi morda še vedno navajajo testne naslove -- zamenjajte jih z demo ali lokalnimi naslovi.)

:::tip
Ta pristop vam omogoča, da začnete z urejanjem sprednjega dela v nekaj minutah. Priporočamo ga večini sodelavcev.
:::

### 2. Zaženite vse lokalno

Če morate spremeniti kodo API-ja ali delati brez povezave, lahko celoten sklad zaženete lokalno. Za to potrebujete MySQL 8.0 ali novejši in dodatno nastavitev. Podrobna navodila najdete v vodniku [lokalna nastavitev API-ja](../api/local-setup).

## Začetek

Sledite tem straneh v navedenem vrstnem redu:

1. **[Predpogoji](prerequisites)** -- Namestite potrebna orodja (Node.js, Git, MySQL itd.)
2. **[Pregled projektov](project-overview)** -- Spoznajte, kateri projekti obstajajo in kaj počnejo
3. **[Spremenljivke okolja](environment-variables)** -- Nastavite svoje datoteke `.env`, da vse povežete med seboj

:::info
Vsak projekt ChurchApps je samostojen repozitorij Git. Klonirati morate le tiste projekte, na katerih želite delati.
:::
