---
title: "Setări aplicație mobilă"
description: "Configurați filele de navigare, plăcuțele de pe ecranul de pornire, mesajul de autentificare și setările de confidențialitate ale directorului de membri pentru aplicația membrilor B1.church din B1 Admin."
---

# Setări aplicație mobilă

<div class="article-intro">

Pagina Setări aplicație mobilă vă permite să configurați filele de navigare care apar în **experiența mobilă B1.church (PWA)** pentru membrii bisericii dumneavoastră. Controlați ce file sunt vizibile, unde trimit și cum sunt afișate.

</div>

## Video de instruire

<YouTube id="ydY7WGK16fE" title="Personalizarea aplicației pentru membri a bisericii dumneavoastră în B1" />

:::info
Filele configurate aici apar în aplicația B1, pe care membrii o pot [instala ca aplicație web progresivă (PWA)](../../b1-church/getting-started/installing-pwa.md). Trimiteți membrilor pagina de instalare a bisericii dumneavoastră — `https://yourchurchname.b1.church/mobile/install` — aceasta îi ghidează pas cu pas la instalarea aplicației pe dispozitiv, fără a fi nevoie de descărcare din App Store sau Google Play.
:::

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea „Editare setări biserică”. Consultați [Roluri și permisiuni](./roles-permissions.md) dacă nu aveți acces.
- Configurați mai întâi [Setările bisericii](./church-settings.md), inclusiv numele bisericii și identitatea vizuală

</div>

## Accesarea setărilor de navigare

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus-stânga) și extindeți **Mobil**.
2. Faceți clic pe **Navigare** (`/mobile/navigation`).
3. Pagina Navigare afișează filele actuale ale aplicației.

## Adăugarea unei file noi

1. Faceți clic pe butonul **Adaugă filă** din partea de sus a paginii.
2. Completați detaliile filei:
   - **Nume** -- Eticheta care apare pe filă (de exemplu, „Predici” sau „Donații”).
   - **Pictogramă** -- Faceți clic pe selectorul de pictograme pentru a alege o pictogramă pentru fila dumneavoastră.
   - **Imagine** -- Faceți clic pe **Selectați imaginea** (sau **Schimbați imaginea**) pentru a atribui filei o fotografie. Filele cu fotografie apar ca plăcuțe foto pe ecranul de pornire al aplicației — consultați [Plăcuțele de pe ecranul de pornire](#home-screen-tiles).
   - **Tip filă** -- Alegeți din opțiuni precum Biblie, Transmisiune live, Donație, Site web și altele.
   - **URL** -- Introduceți adresa web către care trebuie să trimită fila.
   - **Vizibilitate** -- Controlați cine poate vedea această filă (toată lumea, doar membrii etc.). Pentru o filă **Director membri**, aceasta controlează doar cine vede fila; cine poate deschide directorul se setează prin **Afișare în director** din pagina Portal membri (consultați [Setările directorului de membri și ale mesageriei](#member-directory--messaging-settings)).
3. Faceți clic pe **Salvați fila** pentru a adăuga fila în aplicație.

## Editarea unei file existente

1. Faceți clic pe orice filă existentă din lista **File aplicație**.
2. Actualizați numele, pictograma, URL-ul, tipul sau setările de vizibilitate ale filei.
3. Faceți clic pe **Salvați fila** pentru a aplica modificările.

## Reordonarea filelor

Puteți schimba ordinea în care apar filele în aplicația mobilă. Trageți și plasați filele în listă pentru a le reordona. Ordinea afișată pe această pagină este aceeași cu ordinea pe care o vor vedea membrii în aplicație.

:::info
Unele file pot apărea automat când sunt îndeplinite anumite condiții — de exemplu, o filă Transmisiune live poate apărea când o transmisiune este activă. Filele adăugate manual vă oferă control deplin asupra a ceea ce văd membrii în orice moment.
:::

:::tip
Mențineți un număr rezonabil de file. Între trei și cinci file funcționează bine pentru majoritatea bisericilor. Prea multe file pot face navigarea confuză pentru membri.
:::

## Setările directorului de membri și ale mesageriei

Elementul **Portal membri** din aceeași secțiune Mobil conține setările care guvernează directorul de membri și mesageria privată din experiența B1.church:

- **Grup de aprobare a directorului** -- Grupul care analizează actualizările directorului de membri și [cererile de ștergere a contului](../profile/account-deletion.md) înainte ca acestea să intre în vigoare.
- **Afișare în director** -- Cine poate deschide directorul de membri și cine este listat în el: **Doar administratorii**, **Membri și nivelurile superioare** (implicit), **Participanți obișnuiți și nivelurile superioare** sau **Vizitatori și nivelurile superioare**. Persoanele al căror statut de membru este sub nivelul ales nu văd directorul și nu sunt listate în el. **Doar administratorii** închide directorul pentru toți, cu excepția personalului cu permisiunea People &gt; View (statutul de membru Personal nu este suficient de unul singur), care poate deschide întotdeauna directorul și vedea pe toată lumea, indiferent de această setare. Invitații nu sunt niciodată incluși, deoarece oricine se înregistrează online începe ca invitat.
- **Preferința de vizibilitate** -- Stabilește valoarea implicită la nivelul întregii biserici pentru membrii care nu și-au ales încă propria setare. **Adresa**, **Numărul de telefon** și **E-mailul** au fiecare propriul meniu derulant, cu aceleași cinci niveluri disponibile oriunde se configurează vizibilitatea:
  - **Toată lumea** -- vizibil pentru oricine, inclusiv pentru vizitatorii anonimi
  - **Membri** -- vizibil doar pentru persoanele cu fișă de Membru sau Personal
  - **Doar grupuri** -- vizibil doar pentru persoanele care împart un grup cu această persoană, plus personalul
  - **Liderii mei de grup și personalul** -- vizibil doar pentru liderii unui grup din care face parte această persoană, plus personalul
  - **Doar personal** -- vizibil doar pentru personal (oricine are statutul de membru Personal sau permisiunea People &gt; View) și pentru persoana însăși

  „Personal” în aceste niveluri înseamnă oricine are statutul de membru Personal sau permisiunea People &gt; View. Modificările de grup au efect imediat: cineva care se alătură unui grup sau este numit lider de grup poate vedea detaliile **Doar grupuri** sau **Liderii mei de grup și personalul** ale membrilor acelui grup, fără să se delogheze și să se reconecteze.

  Membrii pot înlocui aceste valori implicite pentru propria fișă din fila **Confidențialitate** a profilului lor din PWA B1.church — consultați [Editarea profilului dumneavoastră](/docs/b1-church/getting-started/me-page).
- **Vârsta minimă pentru mesajele private** -- Un control de siguranță pentru copii. B1 nu va deschide o conversație privată **nouă** dacă oricare dintre cele două persoane are sub această vârstă, pe baza datei nașterii (rolul din gospodărie este folosit ca rezervă când nu există dată a nașterii în evidență). Persoanele sub această vârstă rămân complet vizibile în director — doar mesageria directă este blocată, în **ambele sensuri**, pentru toți, inclusiv pentru personal. Conversațiile de grup și mesajele către părinții unui copil funcționează în continuare. Opțiunile sunt Dezactivat, 13, 16 sau 18; implicit este **18**. Conversațiile existente nu sunt afectate.

:::tip
Deoarece verificarea vârstei minime se bazează pe datele nașterii, asigurați-vă că datele nașterii sunt completate pentru copiii din comunitate. Această setare face parte din aceeași familie de controale de siguranță pentru copii ca [controalele de siguranță la check-in](../attendance/checkin-safety.md).
:::

### Mesajul de autentificare de pe ecranul de pornire

Vizitatorii care deschid [ecranul de pornire](/docs/b1-church/getting-started/navigating#home) al aplicației fără să se autentifice văd un scurt mesaj — implicit, *„Autentificați-vă pentru a vedea grupurile, donațiile și altele.”* — lângă un buton **Autentificare**. Setările **Mesajul de autentificare de pe ecranul de pornire** de pe aceeași pagină Portal membri (`/mobile/b1-mobile`) vă permit să-l modificați:

- **Afișați mesajul de autentificare pe ecranul de pornire** -- Dezactivați această opțiune pentru a ascunde atât mesajul, cât și butonul **Autentificare** de pe ecranul de pornire. Vizitatorii se pot autentifica în continuare din meniul aplicației.
- **Textul mesajului de autentificare** -- Înlocuiți formularea implicită cu propriul mesaj (până la 150 de caractere). Lăsați câmpul gol pentru a folosi textul implicit. Această casetă este dezactivată cât timp mesajul este oprit.

Faceți clic pe **Salvați** pentru a aplica. Un mesaj **Salvat** confirmă modificarea. Salvarea reîmprospătează setările memorate în cache ale aplicației, astfel încât modificarea apare la următoarea încărcare a ecranului de pornire.

### Plăcuțele de pe ecranul de pornire

Filele care au o fotografie (consultați **Imagine** din [Adăugarea unei file noi](#adding-a-new-tab)) apar pe [ecranul de pornire](/docs/b1-church/getting-started/navigating#home) al aplicației ca plăcuțe foto, într-o secțiune cu numele bisericii dumneavoastră. Aceasta include și fila Versetul zilei, dacă îi atribuiți o fotografie. Filele cu fotografie apar și în bara de file.

Setarea **Plăcuțele de pe ecranul de pornire** de pe aceeași pagină Portal membri (`/mobile/b1-mobile`) controlează modul în care sunt aranjate aceste plăcuțe. Alegeți un **Aspect**:

- **Grilă** -- Două plăcuțe pe rând (implicit). Când numărul de plăcuțe este impar, prima plăcuță ocupă toată lățimea.
- **Rând derulant** -- Un singur rând de plăcuțe pe care membrii le derulează lateral.
- **Derulare automată** -- Același rând derulant lateral, dar se mișcă și singur, avansând cu o plăcuță aproximativ la patru secunde și revenind la prima plăcuță după ultima. Se oprește când un membru atinge, trece cu mouse-ul peste rând sau navighează în el cu tasta Tab, și reia după câteva secunde. Pe dispozitivele setate să reducă animațiile, rândul rămâne fix și funcționează ca **Rând derulant**.
- **Listă** -- O listă cu o mică miniatură foto lângă numele fiecărei file.

În ambele aspecte derulante, când sunt mai multe plăcuțe decât încap pe ecran, apare sub plăcuțe un șir de puncte, câte unul pentru fiecare plăcuță, cu punctul plăcuței curente umplut. Membrii pot atinge un punct pentru a trece direct la plăcuța respectivă.

Faceți clic pe **Salvați** pentru a aplica.

### Secțiunile ecranului de pornire

Membrii autentificați văd întotdeauna istoricul propriilor prezențe și formularele trimise pe [pagina Me](/docs/b1-church/getting-started/me-page). Comutatoarele **Secțiunile ecranului de pornire** de pe aceeași pagină Portal membri (`/mobile/b1-mobile`) pot afișa și acestea pe ecranul de pornire:

- **Afișați prezențele mele pe ecranul de pornire** -- Adaugă o secțiune **Prezențele mele** cu numărul de dăți în care membrul a participat în ultimele 90 de zile, cele mai recente două vizite și un link **Istoric** către lista completă a prezențelor.
- **Afișați formularele mele pe ecranul de pornire** -- Adaugă o secțiune **Formularele mele** cu ultimele două formulare trimise de membru și un link **Toate formularele**.

Ambele sunt dezactivate implicit. O secțiune apare doar pentru membrii autentificați care au cel puțin o înregistrare de afișat. Faceți clic pe **Salvați** pentru a aplica.

## Unde apar aceste file

Filele configurate aici sunt afișate în **PWA B1.church** pe care membrii o instalează de pe orice pagină de la `https://yourchurchname.b1.church`. Modificările făcute pe această pagină se reflectă data următoare când un membru deschide aplicația.

Pe telefon, bara de file din partea de jos afișează **Acasă**, până la trei dintre filele dumneavoastră și **Mai multe**; pe calculator, antetul afișează până la cinci. Ecranele integrate (precum Predici, Donații sau Grupuri) primesc primele sloturi, iar filele **Pagină internă** umplu sloturile rămase libere. Filele **URL extern** și **Versetul zilei** nu primesc niciodată un slot. Fiecare filă, inclusiv cele care nu încap, este listată pe pagina **Mai multe** a aplicației.

Filele plasate într-o filă **Dosar** fac excepție: apar doar pe ecranul dosarului, pe care membrii îl deschid atingându-l. Acel ecran afișează filele ca plăcuțe foto când toate au imagine, sau ca listă în caz contrar. Un dosar care nu conține file vizibile pentru un membru este ascuns pentru acel membru. Consultați [Filele dosar](../../b1-church/getting-started/navigating.md#folder-tabs). Consultați [Navigarea în B1App](../../b1-church/getting-started/navigating.md) pentru ce văd membrii.

## Pașii următori

- [Setările bisericii](./church-settings.md) -- Configurați informațiile și identitatea vizuală ale bisericii
- [Roluri și permisiuni](./roles-permissions.md) -- Gestionați accesul pentru echipa dumneavoastră
