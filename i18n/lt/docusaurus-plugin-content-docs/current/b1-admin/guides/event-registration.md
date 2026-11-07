---
title: "Vodič: Podešavanje registracije na događaj"
description: "Nustatykite renginio registracijos formą B1 Admin dalyvių duomenims ir pasirinktinai mokėjimams rinkti, įdėkite ją į bažnyčios svetainę ir sekite registracijas."
---

# Podešavanje registracije na događaj

<div class="article-intro">

Kreirajte obrazac za registraciju na događaj, prikupljajte podatke o učesnicima i opcionalne uplate, ugradite ga na svoj crkveni veb-sajt i upravljajte prijavama kako stižu. Na kraju ćete imati stranicu za registraciju koju možete podeliti za bilo koji crkveni događaj.

</div>

:::info
**Dva načina za registraciju na događaje:** Ovaj vodič obrađuje **registraciju putem obrazaca**, koja vam daje punu kontrolu nad prilagođenim poljima i prikupljanjem uplata. Za jednostavnije događaje na kojima samo treba da pratite ko dolazi, koristite **izvornu registraciju na događaje** ugrađenu u kalendar -- uputstva za podešavanje potražite u odeljku [Kreiranje kalendara](../calendars/creating-calendars.md#enabling-event-registration). Izvorna registracija omogućava članovima da se prijave direktno preko [B1 veb-sajta](../../b1-church/events/registering.md) i [mobilne aplikacije](../../b1-church/events/registering.md), uz praćenje kapaciteta, vremenske periode za prijavu i potvrde putem e-pošte.
:::

<div class="prereqs">
<h4>Pre nego što počnete</h4>

- B1 Admin nalog sa administratorskim pristupom
- Za prikupljanje uplata: prvo [morate podesiti Stripe](../donations/online-giving-setup.md)

</div>

## Korak 1: Kreirajte samostalni obrazac

Samostalni obrasci imaju sopstvenu javnu adresu kojoj može pristupiti bilo ko -- savršeno za registraciju na događaje.

Pratite vodič [Kreiranje obrazaca](../forms/creating-forms.md) da biste:

1. Otišli na Forms i kliknuli na Add Form
2. Izabrali tip "Stand Alone" -- time vaš obrazac dobija sopstvenu javnu adresu
3. Dali mu ime po događaju (npr. "Registracija za muški duhovni vikend", "Prijava za VBS")

## Korak 2: Dodajte pitanja

Napravite polja koja su vam potrebna za prikupljanje podataka od prijavljenih.

Pratite vodič [Kreiranje obrazaca](../forms/creating-forms.md#adding-questions) da biste dodali pitanja:

1. Idite na karticu Questions i dodajte polja za podatke koji su vam potrebni: ime, e-poštu, telefon, ishranu, veličinu majice, kontakt za hitne slučajeve itd.
2. Koristite Multiple Choice za opcije poput izbora obroka ili sesija

:::warning
Polje tipa Payment zahteva da je Stripe podešen. Ako još niste podesili online davanje, pogledajte [Podešavanje online davanja](../donations/online-giving-setup.md) pre nego što dodate polja za plaćanje.
:::

## Korak 3: Podesite postavke obrasca

Kontrolišite kada i kako je vaš obrazac za registraciju dostupan.

1. Podesite datume dostupnosti ako registracija treba da bude otvorena samo ograničeno vreme
2. Kopirajte javnu adresu -- možete je direktno podeliti
3. Dodajte članove obrasca sa ulogama Admin ili View Only da pomognu u upravljanju prijavama

## Korak 4: Ugradite na svoj veb-sajt

Olakšajte pronalaženje obrasca za registraciju dodavanjem na svoj crkveni veb-sajt.

Pratite vodič [Upravljanje stranicama](../website/managing-pages.md) da biste:

1. U uređivaču B1 veb-sajta dodali novi odeljak na stranicu i izabrali element Form
2. Izabrali obrazac za registraciju sa liste

:::tip
Podelite samostalnu adresu i putem e-pošte, društvenih mreža i crkvenih biltena -- što je više mesta na kojima je vidljiva, to ćete dobiti više prijava.
:::

## Korak 5: Upravljajte prijavama

Pratite registracije kako stižu i izvezite podatke kada su vam potrebni.

Pratite vodič [Upravljanje prijavama](../forms/managing-submissions.md) da biste:

1. Pregledali odgovore kako stižu na kartici Submissions
2. Izvezli u CSV za tabele, praćenje broja učesnika ili deljenje sa koordinatorima događaja

## Gotovo je!

Vaša registracija na događaj je aktivna. Podelite link, ugradite ga na svoj veb-sajt i pratite prijave iz B1 Admin-a. Kada se događaj završi, izvezite konačnu listu za svoju evidenciju.

## Povezani članci

- [Kreiranje obrazaca](../forms/creating-forms.md) -- pravljenje obrazaca sa različitim tipovima polja
- [Upravljanje prijavama](../forms/managing-submissions.md) -- pregled i izvoz odgovora na obrasce
- [Upravljanje stranicama](../website/managing-pages.md) -- ugrađivanje obrazaca na veb-sajt
- [Podešavanje online davanja](../donations/online-giving-setup.md) -- potrebno za polja za plaćanje
