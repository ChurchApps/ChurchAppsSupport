---
title: "Ghid: Configurarea donațiilor online"
description: "Configurați donațiile online în B1 Admin: creați fonduri, conectați Stripe și adăugați o pagină Donate pe site-ul B1.church pentru membri."
---

# Configurarea donațiilor online

<div class="article-intro">

Parcurgeți tot ce este necesar pentru a primi donații online în biserica dumneavoastră — de la crearea fondurilor de donații, la conectarea Stripe pentru procesarea plăților, până la distribuirea paginii de donații către comunitate. Până la final, membrii vor putea dona online prin site-ul web și aplicația mobilă.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Cont B1 Admin cu acces de administrator — consultați [Roluri și permisiuni](../people/roles-permissions.md)
- Un cont Stripe (creați unul gratuit la [stripe.com](https://stripe.com), dacă este necesar)

</div>

## Pasul 1: Creați fonduri de donații

Fondurile sunt categoriile la care donatorii pot dona. Aveți nevoie de cel puțin un fond înainte de a putea primi donații.

Urmați ghidul [Fonduri](../donations/funds.md) pentru a configura categoriile de donații:

1. Creați fondurile cele mai frecvente (de exemplu, „Fond general", „Fond pentru clădire", „Misiuni")
2. Marcați corespunzător fondurile deductibile fiscal — aceasta influențează extrasele de donații de la sfârșitul anului

:::tip
Puteți adăuga oricând alte fonduri. Începeți cu cele mai frecvente categorii de donații.
:::

## Pasul 2: Conectați Stripe

Stripe gestionează toate procesările de plăți. Veți conecta contul Stripe la B1 Admin, astfel încât donațiile să ajungă în contul dumneavoastră bancar.

Urmați ghidul [Configurarea donațiilor online](../donations/online-giving-setup.md) pentru a conecta Stripe:

1. Conectați-vă la panoul Stripe și obțineți cheia publicabilă (Publishable Key) și cheia secretă (Secret Key)
2. În B1 Admin, accesați Setări și introduceți ambele chei

:::warning
Stripe afișează cheia secretă o singură dată. Copiați-o și salvați-o înainte de a părăsi panoul Stripe. Dacă o pierdeți, va trebui să generați una nouă.
:::

## Pasul 3: Adăugați o pagină de donații pe site-ul dumneavoastră

Faceți donațiile accesibile adăugând o pagină de donații pe site-ul B1.

Urmați ghidurile [Configurarea donațiilor online](../donations/online-giving-setup.md) și [Gestionarea paginilor](../website/managing-pages.md) pentru a:

1. Adăuga un tab „Donează" pe site-ul B1.church
2. Adresa URL pentru donații va fi: `https://yoursubdomain.b1.church/donate`
3. Membrii pot dona fără autentificare (pagină publică) sau se pot autentifica pentru a salva metodele de plată și istoricul donațiilor

## Pasul 4: Efectuați o donație de test

Înainte de a anunța comunitatea, verificați dacă totul funcționează.

1. Efectuați o donație de test de valoare mică pentru a verifica funcționarea completă a procesului
2. Verificați dacă donația apare în B1 Admin, la secțiunea Donații

:::tip
Folosiți mai întâi modul de test al Stripe dacă doriți să verificați fără tranzacții reale, apoi treceți la modul live înainte de a anunța comunitatea.
:::

## Pasul 5: Anunțați comunitatea

Vestiți membrii, astfel încât aceștia să știe că pot dona online.

1. Distribuiți adresa URL pentru donații prin site-ul web, buletinele informative prin e-mail, buletinele parohiale și rețelele sociale
2. Membrii pot dona și prin [aplicația B1 Mobile](../../b1-church/giving/index.md) — funcția de donații este integrată

:::info
Membrii autentificați pot salva metode de plată, pot configura donații recurente și pot consulta istoricul donațiilor. Donațiile anonime sunt și ele posibile — nu este necesară autentificarea.
:::

## Pasul 6: Gestionarea continuă

Mențineți evidențele de donații actualizate și generați rapoarte pe parcursul anului.

1. [Importați tranzacțiile Stripe](../donations/stripe-import.md) periodic (săptămânal sau lunar) pentru a menține evidențele actualizate
2. [Consultați rapoartele de donații](../donations/donation-reports.md) pentru a urmări tendințele și totalurile pe fond
3. [Generați extrasele de donații de la sfârșitul anului](../donations/giving-statements.md) pentru evidențele fiscale ale donatorilor

:::tip
Rulați importurile Stripe cel puțin lunar, pentru ca evidențele să rămână actualizate. Consultați [Ghidul rapoartelor de sfârșit de an](./year-end-reports.md) pentru procesul complet de sfârșit de an.
:::

## Ați terminat!

Biserica dumneavoastră acceptă acum donații online. Membrii pot dona prin site-ul web, aplicația B1 Mobile sau orice dispozitiv cu browser web. Toate donațiile sunt înregistrate automat în B1 Admin.

## Articole conexe

- [Fonduri](../donations/funds.md) — creați și gestionați categoriile de donații
- [Loturi](../donations/batches.md) — organizați donațiile în grupuri
- [Înregistrarea donațiilor](../donations/recording-donations.md) — introduceți manual donațiile în numerar și cu cec
- [Importul Stripe](../donations/stripe-import.md) — preluați tranzacțiile online în B1 Admin
- [Rapoarte de donații](../donations/donation-reports.md) — consultați tendințele și totalurile donațiilor
- [Extrase de donații](../donations/giving-statements.md) — generați extrasele fiscale de sfârșit de an
- [Efectuarea donațiilor (web)](../../b1-church/giving/making-donations.md) — experiența de donare a membrilor
- [Efectuarea donațiilor (mobil)](../../b1-church/giving/making-donations.md) — donarea din aplicația mobilă
