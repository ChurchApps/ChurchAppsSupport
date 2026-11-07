---
title: "Utilizarea editorului de pagini"
description: "Configurează editorul de pagini din B1 Admin: adaugă secțiuni și elemente, stilizează-le, previzualizează pe mobil și publică. Include anulare și istoric."
---

# Utilizarea editorului de pagini

<div class="article-intro">

Editorul de pagini al B1 este un constructor vizual, cu funcție de glisare și plasare, care vă permite să vă proiectați paginile site-ului bisericii fără a scrie cod. Puteți adăuga secțiuni și blocuri de conținut, personaliza stilurile, previzualiza lucrarea și anula modificările -- totul din browserul dumneavoastră.

</div>

## Video de instruire

<YouTube id="m2B_JxmfFm4" title="Editarea paginilor și a navigării în B1" next="Conectarea unui domeniu personalizat în B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Finalizați [Configurarea inițială](./initial-setup.md) pentru a vă configura site-ul web
- Creați cel puțin o pagină în [Gestionarea paginilor](./managing-pages.md)
- Aveți nevoie de permisiunea **content.edit** pentru a accesa editorul

</div>

## Deschiderea editorului

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga-sus), extindeți **Website** și faceți clic pe **Pages**.
2. Găsiți pagina pe care doriți să o editați în tabelul Pages și faceți clic pe **Edit Content**.

Editorul se deschide în modul ecran complet. Panoul din stânga arată structura paginii și elementele de conținut disponibile; zona centrală afișează o previzualizare live a paginii.

:::info
Editorul se afișează întotdeauna în modul luminos, indiferent de setarea temei din B1 Admin, și utilizează fonturile pentru titluri și text pe care le-ați ales în [Aspect](./appearance.md). Acest lucru asigură că previzualizarea corespunde exact modului în care pagina va arăta vizitatorilor site-ului.
:::

## Structura paginii: secțiuni și elemente

Fiecare pagină este construită din două niveluri:

- **Secțiuni** -- Containerele de nivel superior care împart pagina în benzi orizontale (de exemplu, o secțiune principală, un bloc de conținut sau o bandă de subsol). Fiecare pagină trebuie să aibă cel puțin o secțiune înainte de a putea adăuga conținut.
- **Elemente** -- Piesele individuale de conținut plasate în interiorul unei secțiuni, cum ar fi text, imagini, butoane, carduri, formulare și calendare.

### Adăugarea unei secțiuni

1. Faceți clic pe **Add Section** (sau pe butonul **+** din partea de sus a panoului din stânga).
2. Alegeți cum să începeți:
   - **Dintr-un șablon** -- Răsfoiți galeria de șabloane de secțiuni, organizată pe categorii (Hero, About, Services, Giving etc.), și faceți clic pe unul pentru a-l insera ca secțiune complet stilizată și pre-completată. Puteți personaliza totul după ce este adăugată.
   - **Secțiune goală** -- Alegeți un aspect pe coloane (o coloană, două coloane, trei coloane etc.) și construiți de la zero.
3. Noua secțiune apare în previzualizare. Faceți clic pe ea pentru a o selecta și a configura culoarea de fundal, spațierea interioară și celelalte opțiuni de stil.

### Schimbarea aspectului unei secțiuni

Ați construit deja o secțiune, dar doriți o altă structură? Folosiți comutatorul de aspect al secțiunii pentru a schimba aranjamentul coloanelor cu unul diferit din galerie, păstrând în același timp conținutul și elementele existente.

### Adăugarea elementelor într-o secțiune

1. Faceți clic în interiorul unei secțiuni din previzualizare pentru a o selecta.
2. Faceți clic pe **Add Content** și alegeți un tip de element din listă:
   - **Text** -- Titluri, paragrafe și text formatat
   - **Image** -- Încărcați o fotografie sau adăugați un link către ea
   - **Button** -- Un link de tip îndemn la acțiune, pe care se poate face clic
   - **Card** -- O imagine cu un titlu și o descriere
   - **Form** -- Inserați un [formular](../forms/creating-forms.md) direct în pagină. Dacă formularul are o [fotografie de antet](../forms/creating-forms.md#adding-a-header-photo), aceasta apare deasupra întrebărilor
   - **Calendar** -- Afișați un calendar de evenimente
   - **FAQ** -- Blocuri de întrebări și răspunsuri de tip acordeon
   - **Video** -- Inserați un videoclip după adresa URL
   - **Groups Browser** -- Un director filtrabil cu toate grupurile bisericii, cu căutare opțională, filtru după categorie și filtru după etichetă
   - **Icon Feature** -- O pictogramă cu un titlu și o scurtă descriere, pentru evidențierea funcțiilor sau a serviciilor
   - **Gallery** -- O grilă sau un aspect de tip masonry cu mai multe fotografii
   - **Testimonial** -- Una sau mai multe citate, cu numele autorului, rolul și fotografia
   - **Social Icons** -- Pictograme cu link către profilurile de social media ale bisericii: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo și Podcast. Completați un link pentru fiecare pe care doriți să o afișați; pentru **WhatsApp**, folosiți un link `https://wa.me/` cu numărul dumneavoastră sau un link de invitație la un grup
   - **Countdown** -- Un cronometru care numără invers până la o dată sau până la ora unui serviciu săptămânal
   - **Stats** -- Un rând de cifre mari, cu etichete (membri, ani, campusuri)
   - **Campaign Progress** -- O bară de progres live pentru o campanie de donații, care arată suma totală strânsă către un obiectiv de fond
   - **Staff Grid** -- Carduri cu fotografii pentru membrii unui grup; grupul trebuie să aibă opțiunea **public roster** activată
   - **Service Times** -- Programul serviciilor campusurilor dumneavoastră, preluat automat din configurarea prezenței
   - **Sermons** -- Biblioteca dumneavoastră de predici, sub formă de navigator complet sau de grilă, listă ori aspect evidențiat cu cea mai recentă predică
   - **Map** -- O hartă încorporată, centrată pe adresa bisericii dumneavoastră
   - **Table** -- O grilă simplă de rânduri și coloane pentru conținut tabelar
   - **Text with Photo** -- Text și o imagine una lângă alta
   - **Logo** -- Logo-ul bisericii dumneavoastră, preluat din [Aspect](./appearance.md)
   - **Live Stream** -- Playerul transmisiunii dumneavoastră live, inserat direct în pagină
   - **Podcast** -- O listă de episoade preluate dintr-un flux RSS de podcast extern, pe care îl furnizați, cu setări pentru numărul de episoade afișate și pentru afișarea sau nu a datelor și descrierilor. Fiecare episod de pe site-ul live are un player audio și un link **Download**, care salvează fișierul audio al episodului sub titlul episodului. Acesta servește la prezentarea oricărui flux de podcast pe site-ul dumneavoastră; pentru a publica propriile predici ca podcast, consultați în schimb [Gestionarea predicilor](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Un buton de donație sau un formular de donație inserat
   - **HTML** -- Propriul cod HTML brut, pentru utilizări avansate, cum ar fi inserarea unui widget de la un terț (consultați [Utilizarea elementului HTML](#using-the-html-element))
   - **iFrame** -- Inserați conținut extern după adresa URL
3. Configurați elementul folosind panoul de setări care apare.

### Utilizarea elementului HTML

Elementul **HTML** are două casete:

- **HTML Content** -- Codul de marcare care se afișează pe pagină. Orice etichete `<script>` pe care le includeți aici rulează pe site-ul dumneavoastră live.
- **JavaScript (exclude script tag)** -- Cod de script care rulează la încărcarea paginii. Puteți lipi aici și un fragment de inserare furnizat de un furnizor, cu etichetele sale `<script>` incluse, iar acesta va rula pe site-ul live.

Dacă lipiți în caseta JavaScript doar o adresă web (de exemplu, un link către o imagine), caseta devine roșie, cu avertismentul *"Aceasta este o adresă web, nu cod JavaScript."* O adresă simplă în această casetă nu face nimic. Pentru a afișa o imagine, folosiți un element **Image** sau puneți `<img src="...">` în **HTML Content**.

### Utilizarea elementului Calendar {#using-the-calendar-element}

Elementul **Calendar** afișează evenimentele dintr-unul dintre calendarele dumneavoastră:

1. Sub **Select**, alegeți **Group Calendar** (evenimentele unui singur grup -- lista afișează grupurile din care faceți parte) sau **Curated Calendar** (un calendar pe care l-ați creat la **Calendars**; consultați [Calendarul selectat](../calendars/curated-calendar.md)).
2. Sub **Select Calendar**, alegeți grupul sau calendarul.
3. Sub **Display**, alegeți modul de afișare:
   - **Month calendar** -- O grilă lunară prin care vizitatorii pot naviga.
   - **Upcoming events** -- O grilă de plăci pentru următoarele 12 evenimente, un eveniment recurent fiind afișat o singură dată, la următoarea sa dată. Fiecare placă arată fotografia evenimentului (sau titlul, pe culoarea închisă a temei, dacă nu are fotografie), o insignă cu data, ziua și ora și prima linie a descrierii. Un buton **Subscribe** deasupra plăcilor permite vizitatorilor să copieze linkul ICS al calendarului sau să îl descarce. Pentru acest mod de afișare apare o setare **Layout**: **Grid** (implicit) sau **Scrolling (automatic)**, care așază plăcile pe un singur rând ce se derulează automat.
4. Pentru a afișa doar unele evenimente, scrieți o etichetă în câmpul **Only events tagged** -- de exemplu, `youth`. Apar doar evenimentele ale căror **Tags** includ acel cuvânt. Lăsați câmpul gol pentru a afișa toate evenimentele. Etichetele se setează pentru fiecare eveniment; consultați [Adăugarea și editarea evenimentelor](../calendars/creating-calendars.md#adding-and-editing-events).

În oricare dintre moduri, un clic pe un eveniment deschide propria pagină a evenimentului pe site-ul dumneavoastră. Pagina evenimentului afișează fotografia, titlul, data și ora evenimentului și descrierea, precum și o casetă cu **When** (inclusiv modelul de repetare pentru un eveniment recurent) și **Where** (sălile rezervate pentru el). Pagina are și un buton **Register for this Event**, când înscrierea este activată, și un link **Add to my calendar**, care descarcă evenimentul ca fișier de calendar. Pagina este configurată astfel încât motoarele de căutare să poată afișa data și detaliile evenimentului în rezultate. Paginile evenimentelor din calendarele selectate, afișate pe paginile dumneavoastră (pentru evenimentele din următoarele șase luni), sunt de asemenea incluse în harta site-ului, astfel încât motoarele de căutare să le poată găsi.

### Reordonarea conținutului

Trageți secțiunile sau elementele folosind pictograma de prindere (șase puncte) din partea stângă a fiecărui element, pentru a le reordona. Puteți trage elementele în interiorul unei secțiuni sau le puteți muta între secțiuni.

## Stilizarea paginii

### Stilurile secțiunilor

Faceți clic pe orice secțiune pentru a deschide panoul ei de stil. Puteți seta:

- **Background** -- Culoare uniformă, gradient sau imagine. Când folosiți o imagine ca fundal, un selector de **Focal Point** vă permite să faceți clic pentru a stabili ce parte a imaginii rămâne centrată pe măsură ce secțiunea se redimensionează, iar opțiunea de culoare **Overlay** vă permite să adăugați o nuanță semitransparentă peste imagine, pentru a îmbunătăți lizibilitatea textului.
- **Padding** -- Spațierea de sus și de jos din interiorul secțiunii
- **Width** -- Lățime completă sau centrată/încadrată
- **Dividers** -- Separatoare decorative cu forme (val, diagonală, curbă, triunghi și altele) pe marginea de sus sau de jos a secțiunii, cu opțiuni de culoare, înălțime și întoarcere

### Stilurile elementelor

Faceți clic pe orice element pentru a deschide panoul său de stil. Opțiunile comune includ dimensiunea fontului, culoarea, alinierea, marginea și spațierea interioară. Pentru imagini, puteți seta textul alternativ și destinațiile linkurilor.

### CSS personalizat

Pentru stilizare avansată, fiecare secțiune și fiecare element are un câmp **Custom CSS**, unde puteți scrie propriile reguli CSS. Acestea se aplică doar elementului respectiv, astfel încât nu vor afecta involuntar restul paginii.

:::tip
Dacă doriți să aplicați stiluri pe întregul site -- cum ar fi un font personalizat sau o culoare globală -- folosiți setările [Aspect](./appearance.md) în loc de CSS personalizat pe pagini individuale.
:::

## Previzualizarea paginii

Folosiți comenzile de previzualizare din bara de instrumente pentru a verifica modul în care arată pagina la diferite dimensiuni ale ecranului:

- **Desktop** -- Vizualizare în browser pe toată lățimea
- **Mobile** -- Vizualizare îngustă, de dimensiunea unui telefon

Pe telefoane, coloanele dintr-un rând se așază unele sub altele, pe toată lățimea, dacă nu setați o **Mobile Width** pentru ele în setările rândului. Listele de predici și podcasturi afișează, de asemenea, textul fiecărui episod sub miniatură, pe telefoane.

Pentru a vedea pagina live exact așa cum o vor vedea vizitatorii, reveniți la lista Pages și faceți clic pe calea paginii. Aceasta se deschide într-o filă nouă a browserului.

## Verificarea accesibilității

Faceți clic pe pictograma **Accessibility** din bara de instrumente pentru a rula o verificare rapidă a problemelor frecvente -- imagini fără text alternativ, contrast redus al culorilor sau titluri în ordine greșită. Fiecare problemă are un link direct către elementul care necesită atenție, astfel încât să o puteți remedia pe loc.

## Anularea modificărilor

Editorul păstrează automat istoricul modificărilor. Folosiți butoanele din bara de instrumente sau combinațiile de taste pentru a naviga:

- **Undo** (Ctrl+Z / Cmd+Z) -- Anulează ultima acțiune
- **Redo** (Ctrl+Shift+Z sau Ctrl+Y / Cmd+Shift+Z) -- Reaplică o acțiune anulată

Puteți, de asemenea, să restaurați pagina la o stare anterioară salvată. Faceți clic pe **View history** din bara de instrumente pentru a vedea lista instantaneelor salvate, cu descrieri, și faceți clic pe orice intrare pentru a reveni la acel punct.

:::warning
Restaurarea unui instantaneu înlocuiește conținutul curent al paginii cu versiunea din instantaneu. Acest lucru nu poate fi anulat cu butonul standard de anulare. Salvați un instantaneu al stării curente înainte de a restaura unul vechi, dacă doriți să aveți posibilitatea de a vă întoarce.
:::

## Salvarea și publicarea

Modificările se salvează automat pe măsură ce lucrați. Un indicator de stare din bara de instrumente arată dacă modificările au fost salvate.

### Starea de ciornă și cea publicată

Paginile pot avea o stare **published**, care controlează momentul în care vizitatorii văd modificările. Bara de instrumente afișează o etichetă cu starea curentă:

- **Live on save** -- Pagina nu folosește un flux de publicare. Fiecare modificare salvată devine vizibilă imediat. Aceasta este setarea implicită pentru paginile noi.
- **Unpublished changes** -- Pagina a fost publicată anterior, dar ați făcut modificări de la ultima publicare. Vizitatorii văd în continuare versiunea publicată anterior.
- **Published** -- Pagina este live, iar conținutul salvat corespunde cu ceea ce văd vizitatorii.

Pentru a publica modificările, faceți clic pe butonul **Publish** din bara de instrumente. Pagina devine live imediat.

Pentru a reveni la ultima versiune publicată, fără a afecta ceea ce văd vizitatorii, deschideți meniul suplimentar (⋮) și faceți clic pe **Discard unpublished changes**.

Pentru a nu mai folosi fluxul de publicare, deschideți meniul suplimentar și faceți clic pe **Turn off publishing**. Modificările vor deveni apoi live imediat, ca înainte.

:::tip
Folosiți fluxul de ciornă/publicare atunci când doriți să pregătiți o pagină -- de exemplu, pentru un eveniment care urmează -- și să o faceți live doar în momentul potrivit. Construiți și previzualizați pagina, apoi faceți clic pe Publish când sunteți pregătit.
:::

## Articole conexe

- [Gestionarea paginilor](./managing-pages.md) -- Creați pagini, setați adresele URL și gestionați navigarea site-ului
- [Aspect](./appearance.md) -- Setați culorile, fonturile și identitatea vizuală la nivelul întregului site
- [Fișiere](./files.md) -- Încărcați imagini și documente pentru a le folosi în editor
- [Crearea formularelor](../forms/creating-forms.md) -- Construiți formulare pe care le puteți insera în pagini
