---
title: "Görünüm"
description: "Setează culori, fonturi, spațiere, logo și navigarea pentru site-ul bisericii în B1 Admin, plus widgeturi, analiză GA4, redirecționări și CSS personalizat."
---

Tôi không thể hoàn thành yêu cầu này. Bạn yêu cầu dịch tài liệu sang tiếng Romania (`ro`), nhưng bản dịch tôi vừa đưa ra lại là tiếng Việt, và đó là lỗi của tôi. Dưới đây là bản dịch tiếng Romania đúng yêu cầu:

---
title: "Aspect"
---

# Aspect

<div class="article-intro">

Pagina Aspect vă permite să personalizați aspectul general al site-ului bisericii dumneavoastră. De la culori și fonturi până la spațiere și CSS personalizat, puteți controla fiecare aspect vizual al site-ului dintr-un singur loc.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Finalizați [Configurarea inițială](./initial-setup.md) pentru site-ul dumneavoastră
- Pregătiți logo-ul bisericii în format PNG, cu fundal transparent și raport de aspect 4:1
- Cunoașteți culorile de brand ale bisericii (valori hex), dacă aveți deja un ghid de stil

</div>

## Accesarea setărilor de aspect

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus-stânga) și extindeți **Website**.
2. Faceți clic pe **Appearance**.
3. Se încarcă pagina **Site Styles**. Cardul **Theme, fonts & footer** afișează lista **Style Settings** în stânga și o previzualizare a unui site exemplu în dreapta. Dedesubt se află cardurile **Announcement & widgets** și **Redirects & analytics**.

## Paleta de culori {#color-palette}

1. Faceți clic pe **Color Palette** în panoul Style Settings.
2. Veți vedea **Base Colors** (nuanțe deschise, de accent și închise) și **Semantic Colors** (Primary, Secondary, Success, Warning și Error).
3. Faceți clic pe orice mostră de culoare pentru a deschide selectorul de culori. Trageți cursorul sau introduceți o valoare hex pentru a alege culoarea dorită.
4. **Color Combinations Preview** arată modul în care culorile selectate lucrează împreună.
5. Folosiți **Suggested Palettes** pentru a aplica rapid o schemă de culori predefinită.
6. Faceți clic pe **Save Palette** atunci când sunteți mulțumit.

## Tipografie

1. Faceți clic pe **Fonts** în panoul Style Settings.
2. Faceți clic pe butonul **Heading Font** sau **Body Font** pentru a deschide browserul de fonturi. Puteți căuta după nume sau puteți răsfoi categorii precum Serif, Sans Serif, Display, Handwriting și Monospace. De asemenea, puteți alege una dintre **Popular Font Combinations**.
3. Faceți clic pe **Save Fonts** pentru a aplica alegerile de fonturi.
4. Pentru a ajusta ierarhia dimensiunilor pentru Heading 1 până la Heading 4, faceți clic pe **Typography Scale** în panoul Style Settings. Folosiți câmpurile **Type Scale** (multiplicator), **Base Size** și **Line Height** pentru ajustări fine, apoi faceți clic pe **Save Typography**.

## Spațiere

1. Faceți clic pe **Spacing Scale** în panoul Style Settings.
2. Ajustați valorile de spațiere de la Extra Small până la Extra Large. Exemple practice arată modul în care fiecare valoare afectează aspectul paginii.
3. Faceți clic pe **Save Spacing** pentru a aplica valorile în tot site-ul.

## Logo și branding {#logo-and-branding}

1. Faceți clic pe **Logo** în panoul Style Settings.
2. Încărcați **Light Background Logo** și **Dark Background Logo**. Folosiți imagini cu fundal transparent și raport de aspect 4:1 pentru cele mai bune rezultate.
3. Încărcați o **Social Media Image** pentru previzualizările linkurilor și o **Favicon** pentru pictograma din fila browserului.
4. Faceți clic pe **Save Changes**. Imaginile încărcate nu sunt salvate până nu apăsați butonul de salvare, așa că, dacă încercați să închideți sau să reîncărcați fila browserului înainte de aceasta, browserul vă va avertiza că aveți modificări nesalvate.

:::tip
Pentru cele mai bune rezultate, folosiți un logo cu fundal transparent, în format PNG. Acest lucru asigură o afișare excelentă atât pe fundaluri deschise, cât și pe cele închise, pe site-ul dumneavoastră și în [aplicația mobilă](../settings/mobile-app.md).
:::

## Stiluri de navigare

Personalizați culorile barei de navigare a site-ului dumneavoastră, atât pentru modul opac, cât și pentru cel transparent:

1. Faceți clic pe **Navigation** în panoul Style Settings
2. Configurați culorile pentru **Header (solid)** și **Header over hero (transparent)**
3. Faceți clic pe **Save Navigation** pentru a aplica culorile de navigare

Pentru instrucțiuni detaliate, consultați [Stiluri de navigare](./navigation-styles.md).

## Anunțuri și widgeturi

Widgeturile site-ului apar pe fiecare pagină a site-ului, plutind deasupra conținutului paginii:

- **Announcement Banner** -- O bară care poate fi închisă, situată în partea de sus a site-ului, pentru mesaje cu caracter urgent, cum ar fi un eveniment apropiat sau o schimbare a programului de slujbe.
- **Launcher** -- Un buton plutitor care deschide un meniu de acces rapid, de exemplu linkuri către donații, check-in sau buletinul bisericii.

1. Găsiți cardul **Announcement & widgets** de sub panoul Style Settings.
2. Activați widgeturile pe care le doriți și configurați textul, linkurile și culorile acestora.
3. Faceți clic pe **Save**.

## Redirecționări și analiză

Cardul **Redirects & analytics** (de sub panoul Style Settings) conține două setări independente, dar des necesare:

- **Analytics** -- Adăugați **GA4 Measurement ID** (format `G-XXXXXXXXXX`) pentru a urmări traficul vizitatorilor site-ului dumneavoastră. Același ID urmărește și vizualizările paginilor din aplicația B1 a bisericii (portalul membrilor de la `/mobile`, inclusiv aplicația instalată), fiind etichetat cu un `display_mode` de `installed` sau `browser`, astfel încât să puteți distinge vizitele din aplicația instalată de cele din browser în Google Analytics.
- **Redirects** -- Asociați o cale URL veche cu una nouă, astfel încât linkurile către o pagină mutată sau redenumită să continue să funcționeze în loc să afișeze eroarea 404. Introduceți calea veche în câmpul **From** și calea nouă în câmpul **To**, apoi faceți clic pe **Save**. O redirecționare are prioritate și față de paginile integrate în B1 (`/sermons`, `/stream`, `/donate`, `/bible` și `/votd`), astfel încât puteți trimite acea adresă în altă parte (de exemplu, către propria pagină cu predici sau către un canal YouTube). Nu înlocuiește o pagină pe care ați creat-o deja la aceeași adresă. Ștergeți mai întâi acea pagină dacă doriți ca redirecționarea să se aplice.

## CSS și JavaScript personalizate

1. Faceți clic pe **CSS & Javascript** în panoul Style Settings.
2. Adăugați **Custom CSS** pentru a suprascrie stilurile implicite, pentru personalizare avansată.
3. Adăugați **Custom HTML** pentru coduri de urmărire sau alte scripturi.
4. Folosiți secțiunea **Common JavaScript Examples** pentru fragmente precum integrarea Google Analytics.

:::warning
CSS-ul personalizat este puternic, dar poate strica aspectul site-ului dacă este folosit greșit. Majoritatea bisericilor pot obține aspectul dorit folosind controalele integrate pentru culori, fonturi și spațiere. Folosiți CSS personalizat doar dacă vă simțiți confortabil cu dezvoltarea web.
:::

:::info
Site-ul dumneavoastră aplică o politică de securitate a conținutului (Content Security Policy) care blochează scripturile inline provenite din alte surse. Câmpul **Custom HTML** de aici și [elementul HTML](./page-editor.md#using-the-html-element) de pe paginile individuale sunt excepțiile de încredere -- codul salvat acolo rulează nemodificat, așa că lipiți doar scripturi din surse de încredere (etichete de analiză, widgeturi de chat și inserări similare).
:::

## Teme de stil

Dacă doriți un punct de plecare rapid, **Suggested Palettes** din secțiunea Color Palette oferă teme predefinite care setează culori coordonate dintr-un singur clic. Puteți oricând ajusta fin setările individuale după aplicarea unei teme.

## Pașii următori

- [Gestionarea paginilor](./managing-pages.md) -- Creați și organizați paginile site-ului dumneavoastră
- [Fișiere](./files.md) -- Încărcați resurse media pentru site-ul dumneavoastră
