---
title: "Configurarea check-in-ului automat cu B1 Checkin și B1 Admin"
sidebar_label: "Check-In"
description: "Configurați check-in-ul automat la servicii cu aplicația B1 Checkin din B1 Admin, incluzând dispozitive, conturi de chiosc, programări, identitate vizuală și înscrierea oaspeților prin cod QR."
---

# Check-In

<div class="article-intro">

B1 Admin acceptă check-in-ul automat la servicii prin aplicația complementară **B1 Checkin**. Membrii își pot face check-in singuri, împreună cu familiile lor, la chioșcuri sau pe dispozitive dedicate, la sosire, ceea ce face procesul rapid și reduce volumul de muncă al voluntarilor. Fiecare check-in este înregistrat automat ca prezență.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Campusurile, orele serviciilor și grupurile trebuie configurate în [Configurarea prezenței](setup.md).
- Trebuie să aveți [persoane în baza de date](../people/adding-people.md) cu [gospodării](../people/adding-people.md#managing-households) configurate, astfel încât familiile să poată face check-in împreună.
- Veți avea nevoie de o tabletă și, opțional, de o imprimantă de etichete Brother (consultați [recomandările hardware](#recommended-hardware) de mai jos).

</div>

## Cum funcționează

Aplicația B1 Checkin se conectează la configurarea prezenței din B1 Admin. Când un membru face check-in, prezența sa este înregistrată automat pe campusul, ora serviciului și grupul corecte. Nu trebuie să introduceți manual prezența pentru persoanele care utilizează sistemul de check-in.

## Configurarea check-in-ului

1. **Configurați mai întâi structura prezenței.** În B1 Admin, accesați **People > Attendance** și faceți clic pe **Setup** pentru a vă asigura că campusurile, orele serviciilor și grupurile sunt configurate. Aplicația de check-in se bazează pe această configurare. Opțional, atribuiți fiecărei ore a serviciului o [programare de check-in](setup.md#setting-a-check-in-schedule), astfel încât check-in-ul să se deschidă și să se închidă automat în fiecare săptămână. Programările folosesc fusul orar al campusului serviciului sau fusul orar al bisericii dvs., dacă campusul nu are unul setat; chioșcul afișează ca **Closed** orele serviciilor a căror fereastră este închisă și le informează pe familii când se deschide check-in-ul. Pentru detalii, consultați [Configurarea prezenței](setup.md).
2. **Instalați aplicația B1 Checkin** pe dispozitivele pe care intenționați să le utilizați. Aplicația este disponibilă pe următoarele platforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablete Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablete Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Conectați-vă în aplicația B1 Checkin** folosind un cont care are permisiunea de prezență **Checkin** (sau **Edit Attendance**). Consultați [Conturile de chioșc pentru check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Selectați campusul și ora serviciului** pentru adunarea curentă.
5. Membrii pot acum să își caute numele pe dispozitiv și să facă check-in.

:::tip
Plasați dispozitivele de check-in în locuri vizibile și ușor accesibile, cum ar fi intrările din hol sau birourile de primire. Un scurt anunț în timpul serviciilor ajută membrii să știe că această opțiune este disponibilă.
:::

:::tip
Dacă biserica dvs. are mai multe campusuri, va trebui să repetați configurarea pentru fiecare campus în [Configurarea prezenței](setup.md). Fiecare dispozitiv de check-in poate fi configurat pentru un campus diferit.
:::

## Hardware recomandat

**Tablete** — oricare dintre acestea funcționează bine cu aplicația:

- **Compactă:** Samsung Galaxy Tab A7 Lite 8.7"
- **Ecran mare:** Samsung Galaxy Tab A8 10.5"
- **Economică:** Amazon Fire HD 10

**Imprimante** — check-in-ul funcționează cu imprimante Brother de etichete pentru tipărirea ecusoanelor:

- **Cea mai bună:** Brother QL-1110NWB (acceptă mai multe tablete prin Bluetooth și WiFi)
- **Bună:** Brother QL-810W (acceptă mai multe tablete prin WiFi)
- **Economică:** Brother QL-1100 (doar WiFi)

**Etichete:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Doar imprimantele de etichete Brother sunt compatibile cu aplicația B1 Checkin. Imprimantele altor mărci nu vor funcționa pentru tipărirea ecusoanelor.
:::

:::info
Urmați instrucțiunile de configurare ale imprimantei pentru a o conecta la aceeași rețea WiFi ca tableta dvs. Puteți găsi driverele și ghidurile de configurare pentru imprimantele Brother pe [site-ul de suport Brother](https://support.brother.com).
:::

## Personalizarea aspectului chioșcului

Puteți personaliza aspectul aplicației B1 Checkin pentru a se potrivi identității vizuale a bisericii dvs. În B1 Admin, accesați **Mobile > B1 CheckIn** și utilizați cardul **Kiosk Theme** pentru a configura:

### Culori

Personalizați opt setări de culoare pentru a se potrivi identității vizuale a bisericii:

- **Primary** și **Primary Contrast** -- Culoarea principală a brandului și culoarea textului acesteia.
- **Secondary** și **Secondary Contrast** -- Culoarea de accent și culoarea textului acesteia.
- **Header Background** și **Subheader Background** -- Culorile zonelor de antet ale chioșcului.
- **Button Background** și **Button Text** -- Culorile butoanelor interactive.

### Imagine de fundal

Încărcați o imagine de fundal opțională pentru ecranele de bun venit și de căutare ale chioșcului. Dimensiunea recomandată este de 1920x1080 pixeli.

### Ecran inactiv / Economizor de ecran

Configurați un economizor de ecran care se activează după o perioadă de inactivitate:

1. Activați sau dezactivați ecranul inactiv.
2. Setați **timeout** (câte secunde de inactivitate trec înainte ca economizorul de ecran să pornească, minimum 10 secunde).
3. Adăugați una sau mai multe **slide-uri** -- fiecare slide are o imagine și o durată de afișare (minimum 3 secunde).

:::tip
Utilizați ecranul inactiv pentru a afișa anunțuri, evenimente viitoare sau mesaje de bun venit atunci când chioșcul nu este utilizat activ.
:::

## Înregistrarea oaspeților prin cod QR

Chioșcul de check-in poate afișa un cod QR pe care vizitatorii îl scanează pentru a se înregistra singuri, împreună cu familia lor, pe propriul telefon. Acest lucru accelerează procesul de check-in pentru oaspeții care vin prima dată.

Când un oaspete scanează codul QR, este dus la o [pagină de înregistrare a oaspeților](../../b1-church/checkin/guest-registration.md), unde își introduce numele familiei și orice alte detalii pe care decideți să le solicitați. Un voluntar îl poate căuta apoi pe chioșc și îi poate face check-in.

### Activarea înregistrării oaspeților prin cod QR

Pentru a activa afișarea codului QR:

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus, în stânga) și extindeți **Mobile**.
2. Faceți clic pe **B1 CheckIn**.
3. Activați **QR Guest Registration** și faceți clic pe **Save**.

:::note
Această setare se află la **Mobile > B1 CheckIn** (aceeași pagină cu cardul **Kiosk Theme**), nu la Attendance. Acțiunea **Kiosk** de pe pagina Attendance conține un link către această pagină.
:::

Odată ce comutatorul este activat, celelalte opțiuni de mai jos apar în același card **QR Guest Registration**. Faceți clic pe **Save** de pe card după ce modificați oricare dintre acestea.

### Alegerea câmpurilor de înscriere

Lista de verificare **Sign-up fields** controlează ce solicită formularul de înregistrare. **First Name** și **Last Name** sunt întotdeauna prezente în formular și sunt obligatorii pentru fiecare membru al familiei. Pentru fiecare alt câmp, activați **Include** pentru a-l adăuga în formular, apoi activați **Required** dacă oaspeții trebuie să îl completeze. **Required** poate fi activat doar pentru un câmp inclus, iar dezactivarea **Include** îl șterge.

| Câmp | Solicitat pentru | Inclus implicit |
|-------|-----------|---------------------|
| **Title** | Fiecare membru al familiei, ca listă derulantă în fața numelui (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nu |
| **Email** | Doar persoana de contact principală | Da (opțional) |
| **Phone** | Fiecare membru al familiei. Când este obligatoriu, doar persoana de contact principală trebuie să îl completeze. | Da (opțional) |
| **Household role** | Fiecare membru al familiei după persoana de contact principală -- Spouse, Child sau Other. Persoana de contact principală este capul unei noi gospodării. Cei fără rol sunt salvați ca Other. | Da (opțional) |
| **Home address** | O singură dată pentru familie -- strada, linia de adresă 2, orașul, statul și codul poștal. Când este obligatoriu, totul, cu excepția liniei de adresă 2, trebuie completat. Adresa este salvată pentru fiecare membru al familiei. | Nu |
| **Birth date** | Fiecare membru al familiei | Nu |
| **Gender** | Fiecare membru al familiei | Nu |
| **Marital status** | Doar persoana de contact principală | Nu |
| **Grade** | Fiecare membru al familiei (de la PreK până la 12, sau Graduated) | Nu |
| **Comments** | O singură dată, într-o casetă sub membrii familiei (până la 1.000 de caractere) | Nu |

Câmpurile dezactivate nu sunt salvate niciodată, chiar dacă cineva le trimite la înscriere pe altă cale. Comentariile sunt salvate ca notiță în fișa persoanei de contact principale (postată ca „Guest sign-up”), astfel încât le puteți citi în secțiunea **Notes** a profilului acesteia.

### Adăugarea oaspeților într-un grup

Utilizați **Add new guests to group** pentru a adăuga automat toate persoanele care se înscriu într-unul dintre grupurile dvs. -- de exemplu, un grup „Newcomers” sau un grup pentru evenimentul de weekendul acesta. Alegeți **None** (implicit) pentru a sări peste acest pas. Oaspeții nu văd și nu aleg niciodată grupul; acesta este setat doar aici. Schimbați-l înainte de fiecare eveniment, pentru a putea urmări împreună oaspeții acelui eveniment.

### Înregistrarea prezenței

Când este selectat un grup, apare un comutator **Also record attendance**. Activați-l pentru a marca oaspeții ca prezenți în momentul înscrierii, astfel încât să nu fie nevoie să îi faceți check-in separat.

Prezența este înregistrată doar dacă înscrierea are loc în timpul uneia dintre orele **programate** ale serviciilor grupului selectat:

- Grupul trebuie să fie asociat cu una sau mai multe ore de serviciu, iar acele ore trebuie să aibă o [programare de check-in](setup.md#setting-a-check-in-schedule) (o **Day** și o **Start Time**).
- „În timpul” înseamnă în interiorul ferestrei de check-in a acelei ore a serviciului -- de la numărul de minute **Open check-in** dinaintea începutului până la numărul de minute **Close check-in** de după sfârșit (sau după început, dacă nu este setată o oră de sfârșit; fără oră de sfârșit și fără minute de închidere, până la sfârșitul zilei respective), în același fus orar folosit de programarea de check-in.
- Fiecare membru al familiei este marcat ca prezent în grup pentru fiecare dintre orele sale de serviciu care este deschisă în acel moment, în data de azi.
- Înscrierile efectuate în orice alt moment, sau pentru un grup ale cărui ore de serviciu nu au programare, sunt adăugate în grup, dar nu sunt numărate ca prezență.

### Fotografia antetului

Sub **Header photo**, faceți clic pe **Change photo** pentru a alege sau încărca o imagine (decupată la un format 16:9) care să fie afișată în partea de sus a paginii de înregistrare, în locul iconiței implicite. Faceți clic pe **Remove** pentru a reveni la iconiță.

### Partajarea linkului de înregistrare

Odată ce înregistrarea oaspeților prin cod QR este activată, în partea de jos a cardului apare secțiunea **Share registration QR code**. Aceasta vă oferă două modalități de a ajunge la formularul de înregistrare, pe lângă codul QR de pe chioșc:

- **Copy link** — copiază URL-ul de înregistrare, ca să îl puteți lipi pe site-ul bisericii, în e-mailuri sau oriunde online.
- **Download PNG** — descarcă codul QR ca imagine, pe care o puteți tipări pe fluturași, buletine sau panouri.

:::tip
Adăugați linkul de înregistrare pe pagina „Plan Your Visit” sau „I'm New” a site-ului bisericii dvs., astfel încât oaspeții să se poată înregistra chiar înainte de a ajunge.
:::

### Ce se întâmplă după ce un oaspete se înscrie

B1 caută mai întâi persoanele care există deja în **People**. Un membru al familiei este asociat unei persoane existente atunci când există exact o persoană cu același prenume și același e-mail sau același număr de telefon. Un copil introdus fără e-mail sau telefon este asociat după prenume, în cadrul gospodăriei care a fost asociată. Persoanele asociate sunt reutilizate așa cum sunt -- înscrierea nu modifică niciodată datele sau statutul de membru ale acestora -- iar orice persoană nouă se alătură gospodăriei asociate.

Când nu există nicio potrivire, înscrierea creează o gospodărie nouă, denumită după numele de familie al persoanei de contact principale, cu o fișă pentru fiecare membru al familiei. Toate persoanele noi sunt adăugate în **People** cu statutul de membru **Visitor**, persoana de contact principală fiind capul gospodăriei.

Persoanele asociate și cele noi sunt adăugate în grupul ales (dacă nu sunt deja în el) și li se înregistrează prezența, dacă această opțiune este activată. Comentariile sunt salvate ca notiță la persoana de contact principală.

Pentru a face follow-up automat, adăugați un [declanșator de flux de lucru](../serving/workflows.md#triggers), de exemplu **Person · Created** cu condiția *Membership Status is Visitor*, sau **Group · Member Joined** pentru grupul ales mai sus.

## Ce se înregistrează

Fiecare check-in creează o înregistrare de prezență în B1 Admin. Puteți vedea aceste înregistrări pe pagina [Attendance](tracking-attendance.md) și în sesiunile fiecărui [grup](../groups/group-members.md), exact ca pe prezențele introduse manual. Nu există nicio diferență în modul în care datele apar -- ambele metode alimentează aceleași rapoarte.
