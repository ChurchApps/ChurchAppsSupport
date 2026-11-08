---
title: "Používání editoru stránek"
description: "Nastavte editor stránek v B1 Admin přidáním sekcí a prvků, jejich stylováním, náhledem na mobilu a publikováním konceptů. Popisuje také vrácení změn a historii verzí."
---

Tohle je český překlad, ne rumunský. Níže je správný rumunský text.

---
title: "Utilizarea editorului de pagini"
description: "Configurați un editor de pagini în B1 Admin prin adăugarea de secțiuni și elemente, stilizarea acestora, previzualizarea pe mobil și publicarea ciornelor. Acoperă și anularea modificărilor și istoricul versiunilor."
---

# Utilizarea editorului de pagini

<div class="article-intro">

Editorul de pagini B1 este un constructor vizual, cu funcția drag-and-drop, care vă permite să vă creați paginile site-ului bisericii fără a scrie cod. Puteți adăuga secțiuni și blocuri de conținut, personaliza stilurile, previzualiza lucrarea și anula modificările -- totul din browserul dvs.

</div>

## Videoclip de instruire

<YouTube id="m2B_JxmfFm4" title="Editarea paginilor și a navigării în B1" next="Conectarea unui domeniu personalizat în B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Finalizați [Configurarea inițială](./initial-setup.md) pentru a vă configura site-ul
- Creați cel puțin o pagină în [Gestionarea paginilor](./managing-pages.md)
- Aveți nevoie de permisiunea **content.edit** pentru a accesa editorul

</div>

## Deschiderea editorului

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga-sus), extindeți **Website** și faceți clic pe **Pages**.
2. Găsiți pagina pe care doriți să o editați în tabelul Pages și faceți clic pe **Edit Content**.

Editorul se deschide în modul ecran complet. Panoul din stânga arată structura paginii și elementele de conținut disponibile; zona centrală afișează o previzualizare live a paginii.

:::info
Editorul se afișează întotdeauna în mod luminos, indiferent de setarea temei din B1 Admin, și utilizează fonturile pentru titluri și text pe care le-ați ales în [Aspect](./appearance.md). Acest lucru asigură că previzualizarea corespunde exact modului în care va arăta pagina pentru vizitatorii site-ului.
:::

## Structura paginii: secțiuni și elemente

Fiecare pagină este construită din două niveluri:

- **Secțiuni** -- Containerele de nivel superior care împart pagina în benzi orizontale (de exemplu, o secțiune hero, un bloc de conținut sau o bandă de subsol). Fiecare pagină trebuie să aibă cel puțin o secțiune înainte de a putea adăuga conținut.
- **Elemente** -- Piesele individuale de conținut plasate în interiorul unei secțiuni, cum ar fi text, imagini, butoane, carduri, formulare și calendare.

### Adăugarea unei secțiuni

1. Faceți clic pe **Add Section** (sau pe butonul **+** din partea de sus a panoului din stânga).
2. Alegeți modul de start:
   - **Dintr-un șablon** — parcurgeți galeria de șabloane de secțiuni, organizată pe categorii (Hero, About, Services, Giving etc.), și faceți clic pe unul pentru a-l insera ca secțiune complet stilizată și pre-completată. Puteți personaliza totul după ce a fost adăugată.
   - **Secțiune goală** — alegeți o structură de coloane (o coloană, două coloane, trei coloane etc.) și construiți de la zero.
3. Noua secțiune apare în previzualizare. Faceți clic pe ea pentru a o selecta și configurați culoarea de fundal, spațierea interioară și celelalte opțiuni de stil.

### Schimbarea structurii unei secțiuni

Ați construit deja o secțiune, dar doriți o altă structură? Utilizați comutatorul de structură din secțiunea respectivă pentru a schimba aranjamentul coloanelor cu unul diferit din galerie, păstrând în același timp conținutul și elementele existente.

### Adăugarea elementelor într-o secțiune

1. Faceți clic în interiorul unei secțiuni din previzualizare pentru a o selecta.
2. Faceți clic pe **Add Content** și alegeți un tip de element din listă:
   - **Text** -- Titluri, paragrafe și text îmbogățit
   - **Image** -- Încărcați o fotografie sau creați un link către ea
   - **Button** -- Un link de tip îndemn la acțiune, pe care se poate face clic
   - **Card** -- O imagine cu un titlu și o descriere
   - **Form** -- Inserați un [formular](../forms/creating-forms.md) direct în pagină. Dacă formularul are o [fotografie de antet](../forms/creating-forms.md#adding-a-header-photo), aceasta apare deasupra întrebărilor
   - **Calendar** -- Afișează un calendar de evenimente
   - **FAQ** -- Blocuri de întrebări și răspunsuri în stil acordeon
   - **Video** -- Inserează un videoclip prin URL
   - **Groups Browser** -- Un catalog filtrabil al tuturor grupurilor bisericii, cu căutare opțională, filtru după categorie și filtru după etichetă. **Layout**-ul poate fi **Grid** (implicit) sau **Scrolling (automatic)** -- consultați [Structuri cu derulare](#scrolling-layouts)
   - **Group List** -- Plăcuțe pentru grupurile dvs. publice, opțional doar pentru grupurile cu o anumită etichetă. **Layout**-ul poate fi **Grid** (implicit; până la trei plăcuțe pe rând) sau **Scrolling (automatic)** -- consultați [Structuri cu derulare](#scrolling-layouts)
   - **Icon Feature** -- O pictogramă cu un titlu și o scurtă descriere, pentru evidențierea unor funcționalități sau a unor servicii
   - **Gallery** -- O grilă sau un aranjament de tip masonry cu mai multe fotografii
   - **Testimonial** -- Una sau mai multe citate, cu numele autorului, rolul și fotografia
   - **Social Icons** -- Pictograme cu link către profilurile de social media ale bisericii: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo și Podcast. Completați un link pentru fiecare pe care doriți să o afișați; pentru **WhatsApp**, folosiți un link `https://wa.me/` cu numărul dvs. sau un link de invitație la grup
   - **Countdown** -- Un cronometru care numără inversul până la o dată sau până la ora unui serviciu săptămânal
   - **Stats** -- Un rând de cifre mari, cu etichete (membri, ani, campusuri)
   - **Campaign Progress** -- O bară de progres live pentru o campanie de donații, care arată suma totală strânsă pentru un obiectiv de fond
   - **Staff Grid** -- Carduri cu fotografii pentru membrii unui grup; grupul trebuie să aibă activată opțiunea **public roster**
   - **Service Times** -- Programul serviciilor religioase ale campusurilor dvs., preluat automat din configurarea prezenței
   - **Sermons** -- Biblioteca dvs. de predici, sub formă de browser complet sau de aranjament grilă, listă sau „cea mai recentă în evidență”
   - **Map** -- O hartă încorporată, centrată pe adresa bisericii dvs.
   - **Table** -- O grilă simplă de rânduri și coloane pentru conținut tabelar
   - **Text with Photo** -- Text și o imagine una lângă alta
   - **Logo** -- Logo-ul bisericii dvs., preluat din [Aspect](./appearance.md)
   - **Live Stream** -- Playerul dvs. de transmisiune live, încorporat direct în pagină
   - **Podcast** -- O listă de episoade preluate dintr-un flux RSS de podcast extern, al cărui URL îl furnizați, cu setări pentru numărul de episoade afișate și pentru afișarea sau nu a datelor și a descrierilor. Fiecare episod de pe site-ul live are un player audio și un link **Download**, care salvează fișierul audio al episodului sub titlul acestuia. Acesta este destinat evidențierii oricărui flux de podcast pe site-ul dvs.; pentru a publica propriile predici ca podcast, consultați în schimb [Gestionarea predicilor](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Un buton de donații sau un formular de donație încorporat
   - **HTML** -- Propriul dvs. cod HTML brut, pentru utilizări avansate, cum ar fi încorporarea unui widget de la un terț (consultați [Utilizarea elementului HTML](#using-the-html-element))
   - **iFrame** -- Încorporează conținut extern prin URL
3. Configurați elementul folosind panoul de setări care apare.

### Utilizarea elementului HTML

Elementul **HTML** are două casete:

- **HTML Content** -- Codul de marcare care se afișează pe pagină. Orice etichete `<script>` incluse aici rulează pe site-ul dvs. live.
- **JavaScript (exclude script tag)** -- Cod de script care rulează la încărcarea paginii. Puteți lipi aici și un fragment de încorporare furnizat de un vânzător, cu etichetele `<script>` incluse, iar acesta va rula pe site-ul live.

Dacă lipiți în caseta JavaScript doar o adresă web (de exemplu, un link către o imagine), caseta devine roșie, cu avertismentul *„This is a web address, not JavaScript.”* O adresă simplă în acea casetă nu face nimic. Pentru a afișa o imagine, utilizați un element **Image** sau puneți `<img src="...">` în **HTML Content**.

### Utilizarea elementului Calendar {#using-the-calendar-element}

Elementul **Calendar** afișează evenimente dintr-unul dintre calendarele dvs.:

1. Sub **Select**, alegeți **Group Calendar** (evenimentele unui singur grup -- lista arată grupurile din care faceți parte) sau **Curated Calendar** (un calendar pe care l-ați creat la **Calendars**; consultați [Calendarul curatoriat](../calendars/curated-calendar.md)).
2. Sub **Select Calendar**, alegeți grupul sau calendarul.
3. Sub **Display**, alegeți modul de afișare:
   - **Month calendar** -- O grilă lunară pe care vizitatorii o pot parcurge. Fiecare eveniment este colorat după grupul căruia îi aparține, astfel încât evenimentele unui grup au aceeași culoare în fiecare calendar. B1 alege culorile automat; nu trebuie configurat nimic.
   - **Upcoming events** -- O grilă de plăcuțe pentru următoarele 12 evenimente, un eveniment recurent fiind afișat o singură dată, la următoarea sa dată. Fiecare plăcuță arată fotografia evenimentului (sau titlul, pe culoarea închisă a temei dvs., dacă nu are fotografie), un indicator de dată, ziua și ora și prima linie din descriere. Un buton **Subscribe** deasupra plăcuțelor le permite vizitatorilor să copieze linkul ICS al calendarului sau să îl descarce. Pentru această afișare apare o setare **Layout**: **Grid** (implicit) sau **Scrolling (automatic)**, care pune plăcuțele pe un singur rând ce se derulează singur (consultați [Structuri cu derulare](#scrolling-layouts)). Pentru un **Curated Calendar**, activați setarea **Group badge** pentru a afișa numele grupului fiecărui eveniment în colțul din dreapta sus al plăcuței, în culoarea calendarului grupului respectiv. Evenimentele din grupurile arhivate sau confidențiale nu primesc o insignă.
4. Pentru a afișa doar unele evenimente, scrieți o etichetă în **Only events tagged** -- de exemplu, `youth`. Apar doar evenimentele ale căror **Tags** includ acel cuvânt. Lăsați câmpul gol pentru a afișa toate evenimentele. Etichetele se setează pentru fiecare eveniment; consultați [Adăugarea și editarea evenimentelor](../calendars/creating-calendars.md#adding-and-editing-events).

În oricare dintre moduri, un clic pe un eveniment deschide propria pagină de pe site-ul dvs. Pagina evenimentului arată fotografia, titlul, data și ora evenimentului și descrierea, precum și o casetă cu **When** (inclusiv modelul de repetare, pentru un eveniment recurent) și **Where** (sălile rezervate pentru acesta). Are și un buton **Register for this Event**, când înscrierea este activată, și un link **Add to my calendar**, care descarcă evenimentul ca fișier de calendar. Pagina este configurată astfel încât motoarele de căutare să poată afișa data și detaliile evenimentului în rezultate. Paginile de evenimente din calendarele curatoriate, afișate pe paginile dvs. (pentru evenimente din următoarele șase luni), sunt de asemenea incluse în harta site-ului, pentru ca motoarele de căutare să le poată găsi.

### Structuri cu derulare {#scrolling-layouts}

Structura **Scrolling (automatic)** din **Groups Browser**, **Group List** și din afișarea **Upcoming events** a elementului Calendar pune plăcuțele pe un singur rând, în loc de grilă. Pe telefon, fiecare plăcuță ocupă întreg rândul; pe calculator, două plăcuțe încap una lângă alta. Când sunt mai multe plăcuțe decât încap, rândul:

- Avansează cu o plăcuță aproximativ la fiecare patru secunde, revenind la prima plăcuță după ultima.
- Se oprește atunci când vizitatorul trece cu mouse-ul peste el, îl atinge sau navighează cu tasta Tab până la el, și reia după câteva secunde.
- Afișează un șir de puncte dedesubt, câte unul pentru fiecare plăcuță, punctul plăcuței curente fiind umplut. Vizitatorii pot face clic pe un punct pentru a sări la plăcuța respectivă.

Pe dispozitivele setate să reducă animațiile, rândul rămâne fix, iar vizitatorii îl derulează singuri, prin glisare sau cu scroll-ul. Dacă toate plăcuțele încap, rândul nu se mișcă și nu apar puncte.

### Reordonarea conținutului

Trageți secțiunile sau elementele folosind pictograma de prindere (șase puncte) din partea stângă a fiecărui element, pentru a le reordona. Puteți trage elementele în interiorul unei secțiuni sau le puteți muta între secțiuni.

## Stilizarea paginii

### Stilurile secțiunilor

Faceți clic pe orice secțiune pentru a deschide panoul ei de stil. Puteți seta:

- **Background** -- Culoare solidă, gradient sau imagine. Când folosiți o imagine de fundal, un selector **Focal Point** vă permite să faceți clic pentru a stabili ce parte a imaginii rămâne centrată atunci când secțiunea se redimensionează, iar opțiunea de culoare **Overlay** vă permite să adăugați o nuanță semitransparentă peste imagine, pentru a îmbunătăți lizibilitatea textului
- **Padding** -- Spațierea de sus și de jos din interiorul secțiunii
- **Width** -- Lățime completă sau centrată/limitată
- **Dividers** -- Separatoare decorative în formă de figuri (val, înclinat, curbă, triunghi și altele) pe marginea de sus sau de jos a secțiunii, cu opțiuni de culoare, înălțime și întoarcere

### Stilurile elementelor

Faceți clic pe orice element pentru a deschide panoul său de stil. Opțiunile comune includ dimensiunea fontului, culoarea, alinierea, marginea și spațierea interioară. Pentru imagini, puteți seta textul alternativ (alt) și destinațiile linkurilor.

### CSS personalizat

Pentru stilizare avansată, fiecare secțiune și fiecare element are un câmp **Custom CSS**, în care puteți scrie propriile reguli CSS. Acestea sunt limitate la elementul respectiv, astfel încât nu afectează accidental restul paginii.

:::tip
Dacă trebuie să aplicați stiluri în întregul site -- de exemplu, un font personalizat sau o culoare globală -- folosiți setările [Aspect](./appearance.md) în loc de CSS personalizat pe paginile individuale.
:::

## Previzualizarea paginii

Folosiți comenzile de previzualizare din bara de instrumente pentru a verifica modul în care arată pagina la diferite dimensiuni de ecran:

- **Desktop** -- Vizualizare de browser pe lățime completă
- **Mobile** -- Vizualizare îngustă, de dimensiunea unui telefon

Pe telefoane, coloanele dintr-un rând se așază unele peste altele, pe lățime completă, cu excepția cazului în care setați o **Mobile Width** pentru ele în setările rândului. Listele de predici și de podcasturi aranjează, de asemenea, textul fiecărui episod sub miniatura sa, pe telefoane.

Pentru a vedea pagina live exact cum o vor vedea vizitatorii, reveniți la lista Pages și faceți clic pe calea paginii. Aceasta se deschide într-un nou tab al browserului.

## Verificarea accesibilității

Faceți clic pe pictograma **Accessibility** din bara de instrumente pentru a rula o verificare rapidă a problemelor frecvente -- imagini fără text alternativ, contrast slab al culorilor sau titluri în ordine greșită. Fiecare problemă are un link direct către elementul care necesită atenție, astfel încât să o puteți corecta pe loc.

## Anularea modificărilor

Editorul păstrează automat istoricul modificărilor. Folosiți butoanele din bara de instrumente sau combinațiile de taste pentru a naviga:

- **Undo** (Ctrl+Z / Cmd+Z) -- Anulează ultima acțiune
- **Redo** (Ctrl+Shift+Z sau Ctrl+Y / Cmd+Shift+Z) -- Reaplică o acțiune anulată

Puteți, de asemenea, să restaurați pagina la o versiune anterioară salvată. Faceți clic pe **View history** din bara de instrumente pentru a vedea o listă de versiuni salvate, cu descrieri, și faceți clic pe orice intrare pentru a reveni la acel punct.

:::warning
Restaurarea unei versiuni salvate înlocuiește conținutul curent al paginii cu versiunea salvată. Acest lucru nu poate fi anulat cu butonul standard de anulare. Salvați o versiune a stării curente înainte de a restaura una veche, dacă doriți să păstrați posibilitatea de a reveni.
:::

## Salvarea și publicarea

Modificările se salvează automat pe măsură ce lucrați. Un indicator de stare din bara de instrumente arată dacă modificările au fost salvate.

### Starea de ciornă și de publicare

Paginile pot avea o stare **published**, care controlează momentul în care vizitatorii văd modificările dvs. Bara de instrumente afișează o etichetă de stare cu starea curentă:

- **Live on save** -- Pagina nu folosește un flux de publicare. Fiecare modificare salvată devine vizibilă imediat. Aceasta este setarea implicită pentru paginile noi.
- **Unpublished changes** -- Pagina a fost publicată anterior, dar ați făcut modificări de la ultima publicare. Vizitatorii văd în continuare versiunea publicată anterior.
- **Published** -- Pagina este live, iar conținutul salvat corespunde cu ceea ce văd vizitatorii.

Pentru a publica modificările, faceți clic pe butonul **Publish** din bara de instrumente. Pagina devine live imediat.

Pentru a reveni la ultima versiune publicată, fără a afecta ce văd vizitatorii, deschideți meniul extins (⋮) și faceți clic pe **Discard unpublished changes**.

Pentru a nu mai folosi fluxul de publicare, deschideți meniul extins și faceți clic pe **Turn off publishing**. Modificările vor deveni din nou live imediat.

:::tip
Folosiți fluxul de ciornă/publicare atunci când doriți să pregătiți o pagină -- de exemplu, pentru un eveniment viitor -- și să o faceți live doar la momentul potrivit. Construiți și previzualizați pagina, apoi faceți clic pe Publish atunci când sunteți gata.
:::

## Articole conexe

- [Gestionarea paginilor](./managing-pages.md) -- Creați pagini, setați adresele URL și gestionați navigarea site-ului
- [Aspect](./appearance.md) -- Setați culorile, fonturile și brandingul la nivelul întregului site
- [Fișiere](./files.md) -- Încărcați imagini și documente pentru a le folosi în editor
- [Crearea formularelor](../forms/creating-forms.md) -- Construiți formulare pe care le puteți încorpora în pagini
