---
title: "Calendarul de disponibilitate"
description: "Configurați în B1 Admin săli și echipamente rezervabile, adăugați pauze de pregătire și curățenie și gestionați rezervările recurente sau cu aprobare."
---

# Calendarul de disponibilitate

<div class="article-intro">

Calendarul de disponibilitate vă oferă o imagine de ansamblu asupra tuturor rezervărilor de săli și resurse din biserica dumneavoastră. De aici puteți vedea ce este programat, puteți identifica conflictele înainte ca acestea să apară și puteți rezerva o sală sau o resursă direct pentru orice eveniment.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați cel puțin o [sală sau resursă](./rooms-resources.md) în secțiunea Săli și resurse
- Aveți nevoie de acces de editare la secțiunea Calendare din B1 Admin

</div>

## Deschiderea calendarului de disponibilitate

În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea stângă sus), extindeți **Calendare** și faceți clic pe **Disponibilitate**.

## Citirea calendarului

Calendarul afișează implicit luna curentă. Puteți naviga înainte și înapoi cu ajutorul săgeților din partea de sus sau puteți comuta între vizualizările pe lună, săptămână și zi.

Fiecare eveniment este colorat în funcție de starea rezervării:

| Culoare | Semnificație |
|-------|---------|
| Verde | Aprobată |
| Portocaliu | În așteptarea aprobării |
| Gri | Blocată (nedisponibilă) |

Dacă treceți cu mouse-ul peste un eveniment, se afișează titlul evenimentului și sala sau resursa asociată.

## Filtrarea după sală sau resursă

Folosiți lista derulantă **Sală / Resursă** din partea stângă sus pentru a restrânge calendarul la o singură sală sau resursă. Selectați **Toate sălile și resursele** pentru a reveni la vizualizarea completă.

## Rezervarea unei săli sau resurse

1. Faceți clic pe butonul **Rezervă** din partea de sus a paginii.
2. În fereastra care se deschide, completați detaliile evenimentului:
   - **Titlu** — numele evenimentului
   - **Început** și **Sfârșit** — data și ora
   - **Vizibilitate** — Publică sau Privată
   - **Săli** — selectați una sau mai multe săli pentru rezervare
   - **Resurse** — selectați una sau mai multe resurse pentru rezervare
3. Opțional, setați orele de **Pregătire** și **Curățenie** (în minute). Acestea extind rezervarea la ambele capete, astfel încât spațiul rămâne rezervat pentru pregătire și curățenie, chiar dacă orele de început și de sfârșit ale evenimentului rămân neschimbate.
4. Pentru a repeta rezervarea, bifați **Se repetă** și configurați recurența:
   - **Repetă la fiecare** -- stabiliți intervalul (de exemplu, la fiecare 2 săptămâni).
   - **Frecvență** -- Zilnic, Săptămânal sau Lunar. Opțiunea Săptămânal vă permite să alegeți una sau mai multe zile din săptămână; opțiunea Lunar vă permite să alegeți o zi fixă a lunii sau un model relativ, cum ar fi „a doua marți”.
   - **Se termină** -- Niciodată, la o dată specifică sau după un număr stabilit de apariții.
5. Pentru a specifica o fereastră de rezervare personalizată (diferită de ora de început și de sfârșit a evenimentului), activați **Fereastră de rezervare personalizată** și introduceți orele de început și de sfârșit ale ferestrei. Folosiți această opțiune atunci când o sală trebuie să fie accesibilă în afara intervalului orar al evenimentului.
6. Faceți clic pe **Salvează** pentru a trimite rezervarea.

:::info
Dacă sala sau resursa are configurat un **Grup de aprobare**, rezervarea va apărea ca **În așteptare** până când un lider al acelui grup o aprobă. Consultați [Aprobările din calendar](./approvals.md) pentru fluxul de aprobare.
:::

:::tip
Calendarul va evidenția orice conflict înainte de a salva. Dacă vedeți un avertisment de conflict, ajustați orele sau alegeți o altă sală.
:::

## Articole conexe

- [Săli, resurse și programare](./rooms-resources.md) — configurarea spațiilor și echipamentelor care pot fi rezervate
- [Aprobările din calendar](./approvals.md) — aprobarea sau refuzarea cererilor de rezervare
- [Crearea calendarelor](./creating-calendars.md) — gestionarea calendarelor de evenimente
