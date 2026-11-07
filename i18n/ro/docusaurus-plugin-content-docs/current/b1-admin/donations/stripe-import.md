---
title: "Import Stripe"
description: "Importați donațiile Stripe în B1 Admin printr-o previzualizare care marchează fiecare plată ca nouă, deja importată sau omisă, înainte de confirmare."
---

# Import Stripe

<div class="article-intro">

Dacă accepți donații online prin Stripe, instrumentul Import Stripe îți permite să preiei aceste tranzacții în B1 Admin, astfel încât toate datele tale despre donații să fie păstrate într-un singur loc. Acest lucru este util în special pentru a identifica tranzacțiile care nu au fost sincronizate automat.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Finalizează [Configurarea donațiilor online](online-giving-setup.md) pentru a conecta contul tău Stripe la B1 Admin. Elementul de meniu **Import Stripe** și butonul din pagina Batches apar doar când gateway-ul de donații al bisericii tale este Stripe și doar pentru persoanele care pot edita donațiile
- Verifică dacă ai donații în tabloul de bord Stripe pentru intervalul de date pe care dorești să îl imporți

</div>

## Cum funcționează

Procesul de import folosește un flux de lucru în doi pași: mai întâi previzualizezi ce ar urma să fie importat, apoi confirmi importul. Această abordare de tip „dry-run” îți permite să verifici totul înainte ca vreo dată să fie creată.

## Importul tranzacțiilor

1. În **B1 Admin**, navighează la **Donations > Import Stripe**. (Poți, de asemenea, să faci clic pe **Importă tranzacțiile Stripe lipsă** din partea de sus a paginii **Batches**.)
2. Se deschide pagina **Import Stripe**.
3. Selectează un **interval de date** pentru tranzacțiile pe care dorești să le imporți.
4. Fă clic pe **Previzualizare** pentru a rula o verificare de tip dry-run.

## Verificarea previzualizării

Previzualizarea afișează fiecare tranzacție din Stripe, împreună cu un indicator de stare:

- **Nou** -- această tranzacție nu a fost importată încă și va fi inclusă dacă continui.
- **Deja importată** -- această tranzacție există deja în B1 Admin și va fi omisă.
- **Omisă** -- această tranzacție a fost exclusă dintr-un alt motiv (de exemplu, o rambursare sau o plată eșuată).

O secțiune de sumar din partea de sus arată numărul total de tranzacții din fiecare categorie și sumele în dolari implicate.

:::info
Pasul de previzualizare nu creează nicio înregistrare. Este o verificare doar pentru citire, care îți permite să vezi ce se va întâmpla înainte de a confirma.
:::

## Finalizarea importului

1. Verifică rezultatele previzualizării și totalurile din sumar.
2. Fă clic pe **Importă lipsă** pentru a importa toate tranzacțiile marcate ca **Nou**.
3. După ce importul se finalizează, insignele de stare de lângă fiecare tranzacție se actualizează pentru a arăta rezultatul.

## Sfaturi pentru utilizarea Import Stripe

- Rulează importul periodic (săptămânal sau lunar) pentru a-ți menține evidențele actualizate.
- Dacă o tranzacție apare ca **Deja importată**, înseamnă că B1 Admin are deja o înregistrare corespunzătoare -- nu este necesară nicio acțiune.
- Folosește filtrul de interval de date pentru a te concentra pe o perioadă specifică, dacă cauți anumite tranzacții.

:::tip
După import, accesează pagina [Batches](batches.md) pentru a verifica dacă donațiile importate apar corect și dacă totalurile corespund cu cele din tabloul de bord Stripe.
:::

## Pașii următori

- Consultă [Rapoartele de donații](donation-reports.md) pentru a analiza tranzacțiile importate alături de celelalte date despre donații
- Asigură-te că donațiile importate sunt atribuite [fondurilor](funds.md) corecte, pentru [declarațiile de donații](giving-statements.md) exacte
