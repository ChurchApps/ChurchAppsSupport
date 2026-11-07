---
title: "Selectarea unui serviciu"
---

# Selectarea unui serviciu

<div class="article-intro">

Primul pas al fiecărui check-in este alegerea serviciului la care participați. Ecranul cu servicii apare imediat după ce aplicația termină de încărcat și determină ce ore de serviciu și ce grupuri sunt disponibile pentru restul procesului de check-in.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- [Conectați-vă](../getting-started/logging-in) la aplicația B1 Church Checkin și selectați biserica dumneavoastră
- Asigurați-vă că administratorul bisericii a [configurat serviciile și orele serviciilor](../../b1-admin/attendance/setup.md) în B1 Admin

</div>

## Cum funcționează

1. După autentificare (sau după autentificarea automată la vizitele ulterioare), aplicația afișează **ecranul cu servicii**.
2. Veți vedea o listă cu toate serviciile configurate pentru biserica dumneavoastră. Fiecare serviciu apare ca un card care afișează numele serviciului (de exemplu, „Duminică dimineața” sau „Miercuri seara”).
3. Atingeți serviciul la care participați.

Aplicația încarcă orele și grupurile asociate acelui serviciu, apoi vă duce la [ecranul de căutare a membrilor](./looking-up-members).

## Când check-in-ul nu este deschis

Dacă administratorul dumneavoastră a atribuit unei ore de serviciu un [program de check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule), aplicația permite familiilor să aleagă acea oră de serviciu doar cât timp fereastra de check-in este deschisă. Orele de serviciu a căror fereastră este închisă în acest moment apar în continuare pe [ecranul gospodăriei](./household-review), dar sunt marcate cu **Închis** (de exemplu, **Închis · se deschide duminică la 9:30**) în loc să afișeze un buton pentru grupuri.

Dacă toate orele de serviciu pentru serviciul pe care l-ați atins sunt închise, aplicația vă spune când se deschide check-in-ul, de exemplu **„Check-in-ul pentru acest serviciu se deschide duminică la 9:30.”** (Dacă nu se poate afișa un moment de deschidere, apare mesajul **„Check-in-ul nu este deschis pentru acest serviciu în acest moment.”**) Atingeți **Înapoi** pentru a reveni la lista serviciilor și a alege alt serviciu sau așteptați până se deschide fereastra și încercați din nou.

:::info
Ferestrele de check-in urmează fusul orar al campusului serviciului. Dacă acel campus nu are un fus orar setat, se folosește fusul orar al bisericii dumneavoastră. Dacă o oră de serviciu pare să se deschidă la o oră greșită, rugați administratorul să verifice fusul orar din setările campusului sau ale bisericii. Pe ecranul gospodăriei, chioșcul folosește și ceasul tabletei pentru a deschide și a închide orele de serviciu, așa că asigurați-vă că tableta are ora și fusul orar corecte.
:::

:::info
Serviciile sunt configurate de administratorul bisericii dumneavoastră în B1 Admin, în secțiunea Attendance (Prezență). Dacă nu vedeți serviciul pe care îl așteptați, rugați administratorul să verifice dacă a fost creat în [configurarea prezenței](../../b1-admin/attendance/setup.md).
:::

## Ce se întâmplă în spate

Când selectați un serviciu, aplicația preia trei tipuri de date de pe server:

- **Orele de serviciu** pentru acel serviciu (de exemplu, un singur serviciu poate avea un interval la 9:00 și unul la 11:00).
- **Grupurile** disponibile la fiecare oră de serviciu (de exemplu, Nursery, Preschool, Elementary).
- **Legăturile dintre grupuri și orele de serviciu**, care determină ce grupuri sunt disponibile la ce ore.

Aceste date sunt stocate local, astfel încât restul procesului de check-in să fie rapid și receptiv.

:::tip
Dacă biserica dumneavoastră are configurat un singur serviciu, tot trebuie să îl atingeți pentru a continua. Aplicația nu selectează automat un singur serviciu.
:::

## Pasul următor

După ce selectați un serviciu, veți [căuta familia dumneavoastră](./looking-up-members) după numărul de telefon sau după nume.
