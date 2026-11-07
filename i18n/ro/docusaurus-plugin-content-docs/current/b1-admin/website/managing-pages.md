---
title: "Gestionarea paginilor"
---

# Gestionarea paginilor

<div class="article-intro">

Vizualizarea Pagini web este centrul dvs. pentru crearea, editarea și organizarea tuturor paginilor de pe site-ul bisericii. Puteți gestiona atât conținutul paginilor, cât și navigarea site-ului din acest singur ecran.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Finalizați [Configurarea inițială](initial-setup) pentru a vă configura domeniul și setările de bază ale site-ului
- Pregătiți conținutul și imaginile. Folosiți mai întâi managerul [Fișiere](files) pentru a încărca resursele media.

</div>

:::info
Dacă biserica dvs. are mai mult de un site web (de exemplu, site-uri separate pentru fiecare campus), folosiți comutatorul de site din partea de sus a vizualizării Pagini web pentru a trece de la unul la altul. Fiecare site are propriile pagini, navigare și setări de [aspect](appearance).
:::

## Înțelegerea tipurilor de pagini

Tabelul **Pagini** enumeră fiecare pagină de pe site după **Cale** și **Titlu**. Există două tipuri de pagini:

- **Generată** -- Pagini create automat de sistem pe baza datelor bisericii dvs. (de exemplu, o pagină Grupuri, o pagină Predici sau o pagină individuală pentru fiecare predică din bibliotecă). Aceste pagini afișează o insignă **Generată** și se actualizează singure pe măsură ce datele dvs. se schimbă.
- **Personalizată** -- Pagini pe care le-ați creat singur, cu propriul conținut și propriul layout.

Puteți converti orice pagină generată automat într-o pagină personalizată dacă doriți control total asupra conținutului și designului său. Faceți clic pe **Convertește** lângă pagina generată și confirmați.

## Adăugarea și editarea paginilor

1. Faceți clic pe butonul **Adaugă pagină** din dreapta sus a vizualizării Pagini web.
2. Alegeți un tip de pagină (goală sau un șablon) și dați-i un nume.
3. Faceți clic pe **Editează conținutul** lângă orice pagină pentru a deschide [editorul de pagini](page-editor), unde puteți adăuga secțiuni, text, imagini și alte elemente.
4. Faceți clic pe **Setările paginii** lângă o pagină pentru a actualiza titlul paginii, calea URL și alte metadate.
5. Faceți clic pe calea unei pagini din coloana **Cale** pentru a deschide pagina live într-un tab nou și a vedea exact cum va arăta pentru vizitatori.

:::tip
Pentru pagina de start, setați calea URL doar ca `/`. Pentru toate celelalte pagini, folosiți o cale descriptivă, cum ar fi `/about` sau `/contact`.
:::

### Setările paginii

Deschideți **Setările paginii** la orice pagină pentru a configura:

- **Titlu și cale URL** -- Numele paginii și adresa acesteia pe site.
- **Vizibilitate** -- Alegeți cine poate vedea pagina: toată lumea, doar membrii, doar personalul sau membrii unor grupuri specifice. Este o modalitate rapidă de a restricționa o pagină privată (cum ar fi o pagină de resurse pentru personal) fără o parolă separată.
- **Descriere meta** -- Un scurt rezumat afișat în rezultatele motoarelor de căutare și în previzualizările linkurilor de pe rețelele sociale.
- **Redirecționări** -- Indicați o cale URL veche către această pagină, astfel încât linkurile și marcajele către o pagină retrasă să continue să funcționeze.

## Gestionarea navigării

Panoul **Navigare principală** din partea dreaptă a vizualizării Pagini web afișează linkurile de navigare. Aceste linkuri controlează meniul pe care îl văd vizitatorii pe site-ul dvs.

1. Faceți clic pe **Adaugă** pentru a crea un nou link de navigare. Îl puteți indica către orice pagină de pe site sau către un URL extern.
2. Pentru a reordona linkurile, trageți-le și plasați-le în ordinea dorită. Puteți, de asemenea, să cuibăriți linkuri sub un element părinte pentru a crea meniuri derulante.
3. Faceți clic pe orice link pentru a deschide **Setările linkului**, unde puteți schimba textul, URL-ul sau pagina părinte.
4. Pentru a elimina un link din navigare, deschideți **Setările linkului** și faceți clic pe **Șterge**.

:::info
Eliminarea unui link de navigare nu șterge pagina în sine. Pagina există în continuare și poate fi accesată direct prin URL-ul său -- pur și simplu nu va mai apărea în meniu.
:::

## Comutatoare la nivel de site

Sub linkurile din panoul **Navigare principală** se află două comutatoare care se aplică întregului site al bisericii:

- **Afișează autentificarea** -- Afișează un buton **Autentificare** în bara de navigare a site-ului dvs.
- **Dezactivează site-ul public** -- Oprește site-ul public. Folosiți-l dacă biserica dvs. folosește B1 doar pentru portalul membrilor, donații și înscrieri și își păstrează site-ul principal în altă parte.

### Ce face dezactivarea site-ului public

Când **Dezactivează site-ul public** este activat:

- Fiecare pagină publică, inclusiv pagina de start și paginile personalizate, trimite vizitatorii neautentificați către ecranul de autentificare. După ce se autentifică, se întorc la pagina pe care au cerut-o.
- Membrii autentificați văd site-ul complet, ca de obicei, inclusiv navigarea și paginile **Generate** integrate (cum ar fi Grupuri și Predici). Paginile generate nu mai apar în tabelul Pagini.
- Motoarele de căutare primesc instrucțiunea să nu indexeze site-ul. Harta site-ului este goală, iar `robots.txt` blochează toată indexarea.

Aceste linkuri continuă să funcționeze, astfel încât membrii și oaspeții să poată ajunge în continuare la ele:

- Autentificare și deconectare
- Portalul membrilor (tot ce se află sub `/mobile`)
- Linkurile de [înscriere la evenimente](../guides/event-registration.md) și înscrierea oaspeților

Un avertisment apare sub comutator cât timp site-ul public este oprit. Reactivați comutatorul pentru a readuce paginile. Nimic nu se șterge cât timp site-ul este dezactivat.

:::info
Această setare se aplică întregii biserici. Dacă aveți mai mult de un site, le dezactivează pe toate, nu doar pe cel selectat în comutatorul de site.
:::

## Sfaturi pentru organizarea site-ului

- Păstrați navigarea de nivel superior la cinci sau șase elemente, pentru ca vizitatorii să găsească rapid lucrurile.
- Folosiți linkuri cuibărite pentru subpagini înrudite (de exemplu, un meniu derulant „Despre" cu „Echipa noastră", „Credințe" și „Istoric").
- Verificați navigarea pe telefon pentru a vă asigura că funcționează bine pe ecrane mai mici.
- Dați paginilor nume clare și descriptive, care ajută vizitatorii să înțeleagă ce vor găsi.

:::tip
Puteți adăuga [formulare](../forms/creating-forms.md) pe paginile dvs. pentru a colecta înscrieri, cereri de rugăciune sau alte informații de la vizitatori.
:::

## Pornirea de la un șablon de site

Dacă vă construiți site-ul de la zero, îl puteți crea folosind un **Șablon de site** în loc să creați paginile una câte una. Un șablon de site creează un set de pagini pre-construite -- acasă, despre, conectare, donează și altele -- cu conținut de exemplu și linkuri de navigare deja configurate.

1. Pe ecranul Pagini, faceți clic pe butonul **Pornește de la un șablon** (lângă butonul **Adaugă pagină**).
2. Răsfoiți șabloanele disponibile și faceți clic pe unul pentru a previzualiza structura sa de pagini.
3. Când găsiți unul care vă place, faceți clic pe **Aplică șablonul**.
4. Paginile care nu există deja sunt create și adăugate în navigare. Paginile existente rămân neschimbate.

După aplicarea unui șablon, deschideți fiecare pagină în [editorul de pagini](page-editor) pentru a înlocui textul și imaginile de exemplu cu conținutul real al bisericii dvs.

:::info
Șabloanele de site creează structura paginilor și navigarea. Ele nu suprascriu schema de culori sau fonturile site-ului -- acestea sunt controlate de [Aspect](appearance).
:::

## Lightbox pentru imagini

Când vizitatorii fac clic pe o imagine de pe site-ul dvs., aceasta se deschide într-un overlay lightbox pe tot ecranul. Astfel, oamenii pot vedea fotografiile la dimensiune mai mare fără a părăsi pagina. Nu este necesară nicio configurare -- lightbox-ul este activat automat pentru imaginile din conținutul paginilor.

## Pașii următori

- [Configurarea inițială](initial-setup) -- Instrucțiuni de configurare pentru prima dată
- [Utilizarea editorului de pagini](page-editor) -- Aflați cum să construiți și să stilizați conținutul paginilor
- [Aspect](appearance) -- Personalizați tema vizuală a site-ului
- [Fișiere](files) -- Încărcați și gestionați resursele media pentru paginile dvs.
