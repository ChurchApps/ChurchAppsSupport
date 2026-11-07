---
title: "Ghid: Configurarea înregistrării la evenimente"
description: "Configurați în B1 Admin un formular de înscriere la eveniment pentru date și plăți opționale, îl integrați pe site și urmăriți înscrierile."
---

# Configurarea înregistrării la evenimente

<div class="article-intro">

Creați un formular de înregistrare la eveniment, colectați informațiile participanților și plățile opționale, inserați formularul pe site-ul bisericii și gestionați înscrierile pe măsură ce sosesc. Până la final, veți avea o pagină de înregistrare care poate fi distribuită pentru orice eveniment al bisericii.

</div>

:::info
**Două moduri de a gestiona înregistrarea la evenimente:** Acest ghid acoperă **înregistrarea prin formulare**, care vă oferă control complet asupra câmpurilor personalizate și a colectării plăților. Pentru evenimente mai simple, în care trebuie doar să urmăriți cine participă, folosiți **înregistrarea nativă la eveniment**, integrată în calendar -- consultați [Crearea calendarelor](../calendars/creating-calendars.md#enabling-event-registration) pentru instrucțiuni de configurare. Înregistrarea nativă permite membrilor să se înscrie direct de pe [site-ul B1](../../b1-church/events/registering.md) și din [aplicația mobilă](../../b1-church/events/registering.md), cu urmărirea capacității, intervale de date și confirmări prin e-mail.
:::

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Cont B1 Admin cu acces de administrator
- Pentru colectarea plăților: [Stripe trebuie configurat](../donations/online-giving-setup.md) mai întâi

</div>

## Pasul 1: Creați un formular independent

Formularele „Stand Alone” au propriul URL public, accesibil oricui -- ideale pentru înregistrarea la evenimente.

Urmați ghidul [Crearea formularelor](../forms/creating-forms.md) pentru a:

1. Accesa secțiunea Forms și a face clic pe Add Form
2. Alege tipul „Stand Alone” -- acesta îi oferă formularului propriul URL public
3. Denumiți formularul după eveniment (de exemplu, „Înregistrare la retragerea bărbaților”, „Înscriere VBS”)

## Pasul 2: Adăugați întrebările

Construiți câmpurile de care aveți nevoie pentru a colecta informațiile de la participanți.

Urmați ghidul [Crearea formularelor](../forms/creating-forms.md#adding-questions) pentru a adăuga întrebările:

1. Mergeți la fila Questions și adăugați câmpuri pentru informațiile necesare: nume, e-mail, telefon, restricții alimentare, mărimea tricoului, persoană de contact în caz de urgență etc.
2. Folosiți Multiple Choice pentru opțiuni precum preferințele pentru masă sau alegerea sesiunilor

:::warning
Tipul de câmp Payment necesită configurarea Stripe. Dacă nu ați configurat încă donațiile online, consultați [Configurarea donațiilor online](../donations/online-giving-setup.md) înainte de a adăuga câmpuri de plată.
:::

## Pasul 3: Configurați setările formularului

Controlați când și cum este disponibil formularul de înregistrare.

1. Setați datele de disponibilitate dacă înregistrarea trebuie să fie deschisă doar pentru o perioadă limitată
2. Copiați URL-ul public -- îl puteți distribui direct
3. Adăugați membri ai formularului cu rolurile Admin sau View Only pentru a ajuta la gestionarea înscrierilor

## Pasul 4: Inserați formularul pe site-ul dvs.

Faceți ca formularul de înregistrare să fie ușor de găsit adăugându-l pe site-ul bisericii.

Urmați ghidul [Gestionarea paginilor](../website/managing-pages.md) pentru a:

1. În editorul site-ului B1, adăugați o secțiune nouă la o pagină și selectați elementul Form
2. Alegeți formularul de înregistrare din listă

:::tip
Distribuiți și URL-ul independent prin e-mail, rețele sociale și buletinele bisericii -- cu cât apare în mai multe locuri, cu atât veți primi mai multe înscrieri.
:::

## Pasul 5: Gestionați înscrierile

Urmăriți înregistrările pe măsură ce sosesc și exportați datele atunci când aveți nevoie.

Urmați ghidul [Gestionarea înscrierilor](../forms/managing-submissions.md) pentru a:

1. Verifica răspunsurile pe măsură ce sosesc, în fila Submissions
2. Exporta în format CSV pentru tabele, urmărirea numărului de participanți sau pentru a le trimite coordonatorilor evenimentului

## Gata!

Înregistrarea dvs. la eveniment este activă. Distribuiți linkul, inserați-l pe site-ul bisericii și urmăriți înscrierile din B1 Admin. După încheierea evenimentului, exportați lista finală pentru evidențele dvs.

## Articole conexe

- [Crearea formularelor](../forms/creating-forms.md) — construiți formulare cu diferite tipuri de câmpuri
- [Gestionarea înscrierilor](../forms/managing-submissions.md) — verificați și exportați răspunsurile la formulare
- [Gestionarea paginilor](../website/managing-pages.md) — inserați formulare pe site-ul dvs.
- [Configurarea donațiilor online](../donations/online-giving-setup.md) — necesar pentru câmpurile de plată
