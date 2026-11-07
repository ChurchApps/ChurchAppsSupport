---
title: "Oblikovalnik nalepk za prijavo"
---

# Oblikovalnik nalepk za prijavo

<div class="article-intro">

Oblikovalnik nalepk vam omogoča, da ustvarite in prilagodite predloge značk z imenom in listkov za prevzem, ki se natisnejo, ko družine prijavijo svoje otroke. Natančno lahko nadzirate, katere podatke vsaka nalepka vsebuje, kje so postavljeni in kako izgledajo.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite [Udeležbo](setup) in konfigurirajte vsaj en čas bogoslužja z omogočeno prijavo
- Nastavite [Prijavo](check-in), da se nalepke tiskajo
- Potrebujete skrbniški dostop do razdelka Udeležba

</div>

## Odpiranje oblikovalnika nalepk

V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), razširite **Mobile** in kliknite **B1 CheckIn**. Nato kliknite gumb **Design Labels** na kartici Check-in Labels. Prikaže se seznam shranjenih predlog nalepk, ločenih po vrsti: **Nametag** in **Pickup Slip**.

## Vrste nalepk

- **Nametag** — natisne se in pritrdi na otroka. Običajno vsebuje otrokovo ime, njegov razred ali termin in varnostno kodo.
- **Pickup Slip** — dobi ga starš ali skrbnik. Običajno vsebuje varnostno kodo in seznam otrok, ki so bili prijavljeni.

B1 vam ponudi privzeto predlogo značke in privzeto predlogo listka za prevzem, velikosti za standardne termalne nalepke 3,5 × 1,1 palca.

## Ustvarjanje predloge nalepke

1. Kliknite **Add** in v meniju izberite izhodišče: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** ali **Blank**.
2. Nova predloga se odpre v urejevalniku nalepk.

### Urejevalnik nalepk

Urejevalnik prikazuje pomanjšan predogled nalepke v nastavljeni velikosti. Na levi plošči lahko nastavite:

- **Name** — ime predloge (samo za vašo evidenco)
- **Label Type** — Nametag ali Pickup Slip
- **Width / Height** — širina in višina nalepke v palcih

### Dodajanje blokov

Nalepka je sestavljena iz blokov, to so posamezni deli vsebine, postavljeni na platno nalepke. Kliknite **Add Block**, da vstavite nov blok, in izberite njegovo vrsto:

- **Field** — ob tiskanju vstavi podatek:
  - `person.displayName` — polno ime osebe
  - `sessions` — storitev ali razred, v katerega je bila oseba prijavljena
  - `securityCode` — naključno ustvarjena varnostna koda za prevzem
  - `children` — seznam otrok (za listke za prevzem)
  - `person.nametagNotes` — posebne opombe v evidenci osebe
  - `person.isBirthdayWeek` — vrednost true, če je rojstni dan osebe (mesec in dan) do 3 dni pred ali po datumu prijave
  - `campus` — ime kampusa
- **Text** — statično besedilo, ki ga vnesete (za naslove, oznake ali navodila)
- **Barcode** — črtna koda, ki vsebuje varnostno kodo

### Postavitev blokov

Vsak blok ima polja **X**, **Y**, **Width** in **Height**, izražena kot odstotki platna nalepke (0–100). Vrednosti prilagodite, da vsebino natančno postavite. Nastavite lahko tudi:

- **Font Size** — velikost besedila v točkah
- **Bold** — vklop ali izklop krepkega sloga
- **Align** — poravnava besedila levo, na sredino ali desno
- **Condition** — po želji skrijte blok, če je polje prazno (na primer prikaži nametagNotes samo, če ima vrednost). To deluje tudi s `person.isBirthdayWeek`, tako da se grafika ali besedilo za rojstni dan prikažeta samo na značkah za otroke, katerih rojstni dan je nekaj dni pred prijavo ali po njej.

### Shranjevanje

Kliknite **Save**, da shranite predlogo. Posodobljena predloga se bo uporabila, ko naslednjič natisnete nalepke v B1 Checkin.

## Razvrščanje predlog

Če imate več predlog značk ali listkov za prevzem, B1 Checkin privzeto uporabi prvo predlogo na seznamu. Predloge razvrstite tako, da jih povlečete na želeni položaj.

## Brisanje predloge

Kliknite ikono za brisanje v vrstici predloge in potrdite. Če izbrišete zadnjo predlogo določene vrste, se obnovi privzeta vgrajena predloga.

:::tip
Po urejanju predloge natisnite preizkusno nalepko, da preverite, ali je postavitev pravilna, preden se začne naslednje bogoslužje.
:::

## Sorodni članki

- [Nastavitev prijave](setup) — konfiguracija storitev in skupin za prijavo
- [Dokončanje prijave](check-in) — postopek prijave za družine
- [Začetek dela z B1 Checkin](../../b1-checkin/getting-started/) — aplikacija za prijavo na kiosku
