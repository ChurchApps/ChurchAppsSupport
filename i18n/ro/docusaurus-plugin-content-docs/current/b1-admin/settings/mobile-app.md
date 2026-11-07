---
title: "Cài đặt ứng dụng di động"
description: "Configurează filele de navigare, plăcile de pe ecranul principal, solicitarea de autentificare și confidențialitatea directorului pentru aplicația B1.church din B1 Admin."
---

Ghi chú: Đây là bản dịch, không phải nội dung gốc. Yêu cầu của bạn là dịch sang tiếng Romania (`ro`), nên đoạn trên đã được viết sai ngôn ngữ. Xin lỗi về điều đó. Bản dịch đúng nằm bên dưới.

---
title: "Setări aplicație mobilă"
---

# Setări aplicație mobilă

<div class="article-intro">

Pagina Setări aplicație mobilă vă permite să configurați filele de navigare care apar în **experiența mobilă B1.church (PWA)** pentru membrii bisericii dumneavoastră. Puteți controla ce file sunt vizibile, unde trimit acestea și cum sunt afișate.

</div>

## Videoclip de instruire

<YouTube id="ydY7WGK16fE" title="Personalizarea aplicației pentru membri a bisericii dumneavoastră în B1" />

:::info Aplicația nativă B1 Mobile este depreciată
Filele configurate aici sunt livrate prin [aplicația web progresivă (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), care a înlocuit aplicația nativă B1 Mobile. Trimiteți membrilor pagina de instalare a bisericii dumneavoastră — `https://yourchurchname.b1.church/mobile/install`. Aceasta îi va ghida prin instalarea aplicației pe dispozitivul lor, fără a fi necesară descărcarea din App Store sau Google Play.
:::

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea „Edit Church Settings”. Consultați [Roluri și permisiuni](./roles-permissions.md) dacă nu aveți acces.
- Configurați mai întâi [Setările bisericii](./church-settings.md), inclusiv numele bisericii și identitatea vizuală

</div>

## Accesarea setărilor de navigare

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus-stânga) și extindeți **Mobile**.
2. Faceți clic pe **Navigation** (`/mobile/navigation`).
3. Pagina Navigation afișează filele actuale ale aplicației.

## Adăugarea unei file noi

1. Faceți clic pe butonul **Add Tab** din partea de sus a paginii.
2. Completați detaliile filei:
   - **Name** -- Eticheta care apare pe filă (de exemplu, „Sermons” sau „Give”).
   - **Icon** -- Faceți clic pe selectorul de pictograme pentru a alege o pictogramă pentru fila dumneavoastră.
   - **Image** -- Faceți clic pe **Select Image** (sau **Change Image**) pentru a atribui filei o fotografie. Filele cu fotografie apar ca plăci fotografice pe ecranul de pornire al aplicației -- consultați [Plăci pentru ecranul de pornire](#home-screen-tiles).
   - **Tab Type** -- Selectați dintre opțiuni precum Bible, Live Stream, Donation, Website și altele.
   - **URL** -- Introduceți adresa web către care trebuie să trimită fila.
   - **Visibility** -- Controlați cine poate vedea această filă (toată lumea, doar membrii etc.). Pentru o filă **Member Directory**, aceasta controlează doar cine vede fila în sine; cine poate deschide agenda este stabilit de **Show in Directory** de pe pagina Member portal (consultați [Setările agendei membrilor și ale mesageriei](#member-directory--messaging-settings)).
3. Faceți clic pe **Save Tab** pentru a adăuga fila în aplicație.

## Editarea unei file existente

1. Faceți clic pe orice filă existentă din lista **App Tabs**.
2. Actualizați numele, pictograma, URL-ul, tipul sau setările de vizibilitate ale filei.
3. Faceți clic pe **Save Tab** pentru a aplica modificările.

## Reordonarea filelor

Puteți schimba ordinea în care apar filele în aplicația mobilă. Trageți și plasați filele în listă pentru a le rearanja. Ordinea afișată pe această pagină corespunde ordinii în care membrii dumneavoastră o vor vedea în aplicație.

:::info
Unele file pot apărea automat când sunt îndeplinite anumite condiții -- de exemplu, o filă Live Stream poate apărea când un flux este activ. Filele adăugate manual vă oferă control deplin asupra a ceea ce văd membrii dumneavoastră în orice moment.
:::

:::tip
Mențineți un număr gestionabil de file. Între trei și cinci file funcționează bine pentru majoritatea bisericilor. Prea multe file pot face navigarea confuză pentru membri.
:::

## Setările agendei membrilor și ale mesageriei

Elementul **Member portal** din aceeași secțiune Mobile conține setările care reglementează agenda membrilor și mesageria privată din experiența B1.church:

- **Directory Approval Group** -- Grupul care analizează actualizările agendei membrilor și [cererile de ștergere a contului](../profile/account-deletion.md) înainte ca acestea să producă efecte.
- **Show in Directory** -- Cine poate deschide agenda membrilor și cine figurează în ea: **Admins Only**, **Members and Above** (implicit), **Regular Attendees and Above**, sau **Visitors and Above**. Persoanele al căror statut de membru este sub nivelul ales nu văd agenda și nu sunt înscrise în ea. **Admins Only** închide agenda pentru toată lumea, cu excepția personalului cu permisiunea People > View (un statut de membru Staff singur nu este suficient); aceștia pot deschide mereu agenda și pot vedea pe toată lumea, indiferent de această setare. Oaspeții nu sunt niciodată incluși, deoarece oricine se înregistrează online începe ca oaspete.
- **Visibility Preference** -- Stabilește setarea implicită la nivelul întregii biserici pentru membrii care nu și-au ales încă propria setare. **Address**, **Phone Number** și **Email** au fiecare propriul meniu derulant, cu aceleași cinci niveluri disponibile oriunde se configurează vizibilitatea:
  - **Everyone** -- vizibil pentru oricine, inclusiv vizitatorii anonimi
  - **Members** -- vizibil doar pentru persoanele cu o înregistrare de Member sau Staff
  - **Groups Only** -- vizibil doar pentru persoanele care împart un grup cu această persoană, plus personalul
  - **My Group Leaders and Staff** -- vizibil doar pentru liderii unui grup din care face parte această persoană, plus personalul
  - **Staff Only** -- vizibil doar pentru personal (oricine are statutul de membru Staff sau permisiunea People > View) și pentru persoana în cauză

  „Personal” în aceste niveluri înseamnă oricine are statutul de membru Staff sau permisiunea People > View. Modificările de grup au efect imediat: cineva care se alătură unui grup sau este numit lider de grup poate vedea detaliile **Groups Only** sau **My Group Leaders and Staff** ale membrilor acelui grup, fără a se deconecta și reconecta.

  Membrii pot înlocui aceste valori implicite pentru propria înregistrare din fila **Privacy** a profilului lor din PWA-ul B1.church -- consultați [Editarea profilului dumneavoastră](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Un control pentru siguranța copiilor. B1 nu va deschide o conversație privată **nouă** dacă oricare dintre cele două persoane are sub această vârstă, pe baza datei nașterii (rolul din gospodărie este folosit ca rezervă când nu există o dată a nașterii înregistrată). Persoanele sub această vârstă rămân pe deplin vizibile în agendă -- doar mesageria directă este blocată, în **ambele sensuri**, pentru toată lumea, inclusiv personalul. Conversațiile de grup și mesajele către părinții unui copil funcționează în continuare. Opțiunile sunt Off, 13, 16 sau 18; implicit este **18**. Conversațiile existente nu sunt afectate.

:::tip
Deoarece verificarea vârstei minime se bazează pe datele nașterii, asigurați-vă că datele nașterii sunt completate pentru copiii din congregația dumneavoastră. Această setare aparține aceleiași familii de controale de siguranță ca [controalele de siguranță la check-in](../attendance/checkin-safety.md).
:::

### Mesajul de autentificare de pe ecranul de pornire

Vizitatorii care deschid [ecranul de pornire](/docs/b1-church/getting-started/navigating#home) al aplicației fără să se autentifice văd un scurt mesaj -- implicit, *„Sign in to see your groups, giving, and more.”* -- lângă un buton **Sign In**. Setările **Home screen sign-in prompt** de pe aceeași pagină Member portal (`/mobile/b1-mobile`) vă permit să le modificați:

- **Show sign-in prompt on the app home screen** -- Dezactivați pentru a ascunde atât mesajul, cât și butonul **Sign In** de pe ecranul de pornire. Vizitatorii se pot autentifica în continuare din meniul aplicației.
- **Sign-in prompt text** -- Înlocuiți formularea implicită cu propriul mesaj (până la 150 de caractere). Lăsați gol pentru a folosi formularea implicită. Această casetă este dezactivată cât timp mesajul este oprit.

Faceți clic pe **Save** pentru a aplica. Un mesaj **Saved** confirmă modificarea. Salvarea reîmprospătează setările din cache ale aplicației, astfel încât modificarea apare data următoare când se încarcă ecranul de pornire.

### Plăcile de pe ecranul de pornire

Filele care au o fotografie (consultați **Image** sub [Adăugarea unei file noi](#adding-a-new-tab)) apar pe [ecranul de pornire](/docs/b1-church/getting-started/navigating#home) al aplicației ca plăci fotografice, într-o secțiune cu numele bisericii dumneavoastră. Aceasta include și o filă Verse of the Day, dacă îi atribuiți o fotografie. Filele cu fotografie apar și în bara de file.

Setarea **Home screen tiles** de pe aceeași pagină Member portal (`/mobile/b1-mobile`) controlează modul în care sunt aranjate aceste plăci. Alegeți un **Layout**:

- **Grid** -- Două plăci pe rând (implicit). Când numărul de plăci este impar, prima placă se întinde pe toată lățimea.
- **Scrolling row** -- Un singur rând de plăci pe care membrii le derulează lateral.
- **Scrolling (automatic)** -- Același rând derulabil lateral, dar care se mișcă și singur, avansând cu o placă la aproximativ patru secunde și revenind la început la final. Se oprește când un membru atinge, trece cu cursorul peste rând sau navighează în el cu tasta Tab, și reia după câteva secunde. Pe dispozitivele setate să reducă animațiile, rândul rămâne fix și funcționează ca **Scrolling row**.
- **List** -- O listă cu o miniatură mică a fotografiei lângă numele fiecărei file.

Faceți clic pe **Save** pentru a aplica.

### Secțiunile ecranului de pornire

Membrii autentificați văd mereu propriul istoric de prezență și formularele trimise pe [pagina Me](/docs/b1-church/getting-started/me-page). Comutatoarele **Home screen sections** de pe aceeași pagină Member portal (`/mobile/b1-mobile`) pot afișa și acestea pe ecranul de pornire:

- **Show My Attendance on Home** -- Adaugă o secțiune **My Attendance** cu numărul de prezențe ale membrului în ultimele 90 de zile, cele mai recente două vizite și un link **History** către lista completă a prezențelor.
- **Show My Forms on Home** -- Adaugă o secțiune **My Forms** cu ultimele două formulare trimise de membru și un link **All forms**.

Ambele sunt dezactivate implicit. O secțiune apare doar pentru membrii autentificați care au cel puțin o înregistrare de afișat. Faceți clic pe **Save** pentru a aplica.

## Unde apar aceste file

Filele pe care le configurați aici sunt afișate în **PWA-ul B1.church** pe care membrii dumneavoastră îl instalează de pe orice pagină de la `https://yourchurchname.b1.church`. Modificările pe care le faceți pe această pagină se reflectă data următoare când un membru deschide aplicația.

Pe telefon, bara de file din partea de jos afișează **Home**, până la trei dintre filele dumneavoastră și **More**; pe calculator, antetul afișează până la cinci. Ecranele integrate (precum Sermons, Giving sau Groups) primesc primele sloturi, iar filele **Internal Page** umplu sloturile rămase libere. Filele **External URL** și **Verse of the Day** nu primesc niciodată un slot. Fiecare filă, inclusiv cele care nu încap, este listată pe pagina **More** a aplicației. Consultați [Navigarea în B1App](/docs/b1-church/getting-started/navigating) pentru ce văd membrii. (Filele sunt redate și de aplicația nativă veche [B1 Mobile](/docs/b1-church/index.md) pentru membrii care o mai folosesc încă, dar aceasta este depreciată și nu mai este actualizată.)

## Pașii următori

- [Setările bisericii](./church-settings.md) -- Configurați informațiile și identitatea vizuală ale bisericii
- [Roluri și permisiuni](./roles-permissions.md) -- Gestionați accesul pentru echipa dumneavoastră
