---
title: "Ghid: Configurarea donațiilor online"
description: "Configurați donațiile online în B1 Admin prin crearea fondurilor de donații, conectarea Stripe și adăugarea unei pagini Donează pe site-ul dvs. B1.church pentru membri."
---

# Configurarea donațiilor online

<div class="article-intro">

Parcurgeți tot ce este necesar pentru a primi donații online în biserica dvs. — de la crearea fondurilor de donații, la conectarea Stripe pentru procesarea plăților, până la distribuirea paginii de donații către comunitate. Până la final, membrii vor putea dona online prin site-ul dvs. web și aplicația mobilă.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Cont B1 Admin cu acces de administrator — consultați [Roluri și permisiuni](../people/roles-permissions.md)
- Un cont Stripe (creați unul gratuit pe [stripe.com](https://stripe.com), dacă este necesar)

</div>

## Pasul 1: Creați fonduri de donații

Fondurile sunt categoriile la care donatorii pot dona. Aveți nevoie de cel puțin un fond înainte de a putea primi donații.

Urmați ghidul [Fonduri](../donations/funds.md) pentru a configura categoriile de donații:

1. Creați fondurile cele mai frecvente (de exemplu, „Fond general", „Fond pentru clădire", „Misiuni")
2. Marcați corespunzător fondurile deductibile fiscal — acest lucru influențează extrasele de donații de sfârșit de an

:::tip
Puteți adăuga oricând alte fonduri. Începeți cu cele mai frecvente categorii de donații.
:::

## Pasul 2: Conectați Stripe

Stripe gestionează toată procesarea plăților. Veți conecta contul Stripe la B1 Admin, astfel încât donațiile să ajungă în contul bancar.

Urmați ghidul [Configurarea donațiilor online](../donations/online-giving-setup.md) pentru a conecta Stripe:

1. Autentificați-vă în tabloul de bord Stripe și obțineți cheia publicabilă (Publishable Key) și cheia secretă (Secret Key)
2. În B1 Admin, accesați Setări și introduceți ambele chei

:::warning
Stripe afișează cheia secretă o singură dată. Copiați-o și salvați-o înainte de a părăsi tabloul de bord Stripe. Dacă o pierdeți, va trebui să generați una nouă.
:::

## Pasul 3: Adăugați o pagină de donații pe site-ul dvs.

Faceți donațiile accesibile adăugând o pagină de donații pe site-ul dvs. B1.

Urmați ghidurile [Configurarea donațiilor online](../donations/online-giving-setup.md) și [Gestionarea paginilor](../website/managing-pages.md) pentru a:

1. Adăuga un tab „Donează" pe site-ul dvs. B1.church
2. Adresa URL pentru donații va fi: `https://yoursubdomain.b1.church/donate`
3. Membrii pot dona fără autentificare (pagină publică) sau se pot autentifica pentru a salva metodele de plată și istoricul donațiilor

## Pasul 4: Efectuați o donație de test

Înainte de a anunța comunitatea, verificați că totul funcționează.

1. Efectuați o donație mică de test pentru a verifica funcționarea completă a procesului
2. Verificați că donația apare în B1 Admin, la secțiunea Donații

:::tip
Utilizați mai întâi modul de test al Stripe dacă doriți să verificați fără plăți reale, apoi treceți la modul live înainte de a anunța comunitatea.
:::

## Pasul 5: Anunțați comunitatea

Informați membrii că pot dona online.

1. Distribuiți adresa URL pentru donații prin site-ul web, buletinele informative prin e-mail, buletinele de duminică și rețelele sociale
2. Membrii pot dona și prin [aplicația B1](../../b1-church/giving/index.md) — funcția de donații este deja integrată

:::info
Membrii autentificați pot salva metodele de plată, pot configura donații recurente și pot vizualiza istoricul donațiilor. Donațiile anonime sunt, de asemenea, posibile — nu este necesară autentificarea.
:::

## Pasul 6: Gestionarea continuă

Mențineți evidențele de donații actualizate și generați rapoarte pe parcursul anului.

1. [Importați tranzacțiile Stripe](../donations/stripe-import.md) periodic (săptămânal sau lunar) pentru a menține evidențele actualizate
2. [Consultați rapoartele de donații](../donations/donation-reports.md) pentru a urmări tendințele și totalurile de donații pe fond
3. [Generați extrasele de donații de sfârșit de an](../donations/giving-statements.md) pentru evidențele fiscale ale donatorilor

:::tip
Efectuați importurile Stripe cel puțin lunar, pentru ca evidențele să rămână actualizate. Consultați [Ghidul rapoartelor de sfârșit de an](./year-end-reports.md) pentru procesul complet de sfârșit de an.
:::

## Gata!

Biserica dvs. primește acum donații online. Membrii pot dona prin site-ul dvs. web, aplicația B1 sau orice dispozitiv cu browser web. Toate donațiile sunt urmărite automat în B1 Admin.

## Articole înrudite

- [Fonduri](../donations/funds.md) — crearea și gestionarea categoriilor de donații
- [Loturi](../donations/batches.md) — organizarea donațiilor în grupuri
- [Înregistrarea donațiilor](../donations/recording-donations.md) — introducerea manuală a donațiilor în numerar și prin cec
- [Importul Stripe](../donations/stripe-import.md) — preluarea tranzacțiilor online în B1 Admin
- [Rapoarte de donații](../donations/donation-reports.md) — vizualizarea tendințelor și totalurilor de donații
- [Extrase de donații](../donations/giving-statements.md) — generarea extraselor fiscale de sfârșit de an
- [Efectuarea donațiilor](../../b1-church/giving/making-donations.md) — experiența de donare a membrilor pe B1.church și în aplicația B1
