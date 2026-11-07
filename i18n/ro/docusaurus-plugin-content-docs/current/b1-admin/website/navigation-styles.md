---
title: "Stiluri de navigare"
description: "Personalizează culorile barelor de navigare pline sau transparente din B1 Admin, cu stările pentru link, la trecerea cursorului și activ."
---

# Stiluri de navigare

<div class="article-intro">

Personalizați culorile barei de navigare a site-ului bisericii dvs. pentru a se potrivi cu identitatea vizuală. Puteți configura culorile atât pentru fundaluri pline, cât și pentru suprapuneri transparente, având control complet asupra aspectului navigării pe diferite pagini.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea de a gestiona site-ul bisericii dvs. Consultați [Roluri și permisiuni](../people/roles-permissions.md) pentru detalii.
- Pregătiți culorile identității vizuale, inclusiv codurile hexadecimale de culoare (de exemplu, #03A9F4).
- Înțelegeți diferența dintre stilurile de navigare plină și transparentă de pe site-ul dvs.

</div>

## Înțelegerea modurilor de navigare

Navigarea site-ului dvs. poate apărea în două stiluri diferite, în funcție de pagină:

- **Navigare plină** -- Bară de navigare cu o culoare de fundal, utilizată de obicei pe paginile de conținut
- **Navigare transparentă** -- Navigare suprapusă peste conținutul paginii, utilizată de obicei pe pagini cu imagini mari de fundal sau fundaluri pe tot ecranul

Puteți personaliza culorile pentru ambele moduri, independent unul de celălalt.

## Accesarea stilurilor de navigare

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus) și extindeți **Website**
2. Faceți clic pe **Appearance**
3. În lista **Style Settings**, faceți clic pe **Navigation**

Editorul **Navigation Styling** are două carduri: **Header (solid)** și **Header over hero (transparent)**.

## Configurarea navigării pline

Navigarea plină apare cu o culoare de fundal în spatele barei de navigare. Aceste setări se află în cardul **Header (solid)**. Puteți personaliza:

### Culoarea de fundal

1. Activați comutatorul **Override** pentru **Background color**
2. Faceți clic pe selectorul de culori
3. Alegeți culoarea de fundal dorită
4. Valoarea implicită este alb (#FFFFFF)

### Culoarea linkurilor

1. Activați comutatorul **Override** pentru **Link color**
2. Alegeți culoarea textului linkurilor de navigare
3. Aceasta afectează linkurile în starea lor implicită
4. Valoarea implicită este gri închis (#555555)

### Culoarea linkurilor la trecerea cursorului

1. Activați comutatorul **Override** pentru **Link hover color**
2. Alegeți culoarea în care se schimbă linkurile atunci când utilizatorii trec cursorul peste ele
3. Aceasta oferă un feedback vizual pentru linkurile care pot fi apăsate
4. Valoarea implicită este albastru deschis (#03A9F4)

### Culoarea activă

1. Activați comutatorul **Override** pentru **Active link color**
2. Alegeți culoarea pentru linkul paginii curente
3. Aceasta ajută utilizatorii să știe pe ce pagină se află
4. Valoarea implicită este albastru deschis (#03A9F4)

## Configurarea navigării transparente

Navigarea transparentă se suprapune peste conținutul paginii, fără fundal. Aceste setări se află în cardul **Header over hero (transparent)**. Puteți personaliza:

### Culoarea linkurilor

1. Activați comutatorul **Override** pentru **Link color**
2. Alegeți o culoare care contrastează bine cu fundalul paginii
3. Adesea, culorile albe sau deschise funcționează cel mai bine peste fundaluri întunecate
4. Valoarea implicită este gri închis (#555555)

### Culoarea linkurilor la trecerea cursorului

1. Activați comutatorul **Override** pentru **Link hover color**
2. Alegeți culoarea pentru starea de trecere a cursorului
3. Asigurați-vă că este vizibilă pe fundalul paginii
4. Valoarea implicită este albastru deschis (#03A9F4)

### Culoarea activă

1. Activați comutatorul **Override** pentru **Active link color**
2. Alegeți culoarea indicatorului paginii active
3. Ar trebui să se evidențieze, dar să se potrivească în continuare cu designul dvs.
4. Valoarea implicită este albastru deschis (#03A9F4)

:::info
Navigarea transparentă nu are o setare pentru culoarea de fundal, deoarece se suprapune direct peste conținutul paginii.
:::

## Salvarea modificărilor

1. După ce configurați culorile, faceți clic pe **Save Navigation**
2. Modificările se aplică imediat pe site-ul dvs. live
3. Vizitați site-ul dvs. pentru a vedea navigarea în ambele moduri

## Revenirea la valorile implicite

Dacă doriți să reveniți la culorile implicite:

1. Dezactivați comutatoarele **Override** pentru orice culori personalizate
2. Faceți clic pe **Save Navigation**
3. Navigarea revine la schema de culori implicită

Sau faceți clic pe **Cancel** pentru a renunța la toate modificările fără a le salva.

## Bune practici

### Contrastul culorilor

- **Lizibilitate** -- Asigurați-vă că culorile linkurilor au suficient contrast față de fundal
- **Conformitate WCAG** -- Urmăriți un raport de contrast de cel puțin 4,5:1 pentru accesibilitate
- **Testați ambele moduri** -- Previzualizați site-ul cu navigarea plină și cu cea transparentă

### Coerența identității vizuale

- **Folosiți culorile identității vizuale** -- Potriviți-le cu logo-ul și tema site-ului
- **Limitați paleta** -- Rămâneți la 2-3 culori pentru un aspect coerent
- **Luați în considerare imaginile** -- Dacă folosiți navigarea transparentă, testați-o pe fundalurile tipice ale paginilor

### Stările de trecere a cursorului și stările active

- **Feedback clar** -- Faceți stările de trecere a cursorului vizibil diferite de linkurile implicite
- **Evidențiați paginile active** -- Folosiți o culoare distinctă, pentru ca utilizatorii să știe unde se află
- **Tranziții line** -- Sistemul animează automat schimbările de culoare

## Depanare

### Culorile nu arată corect

- **Ștergeți memoria cache** -- Memoria cache a browserului poate afișa culori vechi
- **Verificați codurile hexadecimale** -- Asigurați-vă că ați introdus coduri hexadecimale de culoare valide
- **Testați pe fundaluri diferite** -- Culorile pot arăta diferit în funcție de pagină

### Navigarea nu este vizibilă

- **Modul transparent** -- Dacă folosiți navigarea transparentă peste imagini deschise, textul închis poate fi greu de văzut
- **Soluție** -- Ajustați culorile linkurilor sau folosiți fundaluri de pagină mai închise
- **Alternativă** -- Adăugați o umbră discretă sau o suprapunere de fundal în zona de navigare

## Detalii tehnice

Stilurile de navigare sunt stocate în format JSON și aplicate folosind variabile CSS:

- Modificările intră în vigoare imediat, fără a reconstrui site-ul
- Culorile se aplică în cascadă tuturor elementelor de navigare
- Suprascrierile sunt opționale; culorile nesetate folosesc valorile implicite ale temei

## Articole conexe

- [Aspect](./appearance.md) -- Personalizați aspectul general și senzația site-ului dvs.
- [Gestionarea paginilor](./managing-pages.md) -- Creați și organizați paginile site-ului dvs.
- [Editorul de pagini](./page-editor.md) -- Proiectați structurile și conținutul paginilor
