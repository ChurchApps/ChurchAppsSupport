---
title: "Check-in"
---

# Check-in

<div class="article-intro">

B1 Admin acceptă auto-check-in la slujbe prin aplicația complementară **B1 Checkin**. Membrii își pot face check-in singuri, împreună cu familiile lor, la chioșcuri sau pe dispozitive dedicate, atunci când ajung. Procesul este rapid și reduce volumul de muncă al voluntarilor. Fiecare check-in este înregistrat automat ca prezență.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Campusurile, orele slujbelor și grupurile trebuie configurate în [Configurarea prezenței](setup.md).
- Trebuie să aveți [persoane în baza de date](../people/adding-people.md) cu [gospodării](../people/adding-people.md#managing-households) configurate, ca familiile să poată face check-in împreună.
- Veți avea nevoie de o tabletă și, opțional, de o imprimantă de etichete Brother (vezi [recomandările hardware](#recommended-hardware) de mai jos).

</div>

## Cum funcționează

Aplicația B1 Checkin se conectează la configurarea prezenței din B1 Admin. Când un membru face check-in, prezența sa este înregistrată automat la campusul, ora slujbei și grupul corecte. Nu trebuie să introduceți manual prezența pentru persoanele care folosesc sistemul de check-in.

## Configurarea check-in-ului

1. **Configurați mai întâi structura prezenței.** În B1 Admin, mergeți la **People > Attendance** și faceți clic pe **Setup**, pentru a vă asigura că există campusurile, orele slujbelor și grupurile. Aplicația de check-in se bazează pe această configurare. Opțional, puteți atribui fiecărei ore a slujbei un [program de check-in](setup.md#setting-a-check-in-schedule), astfel încât check-in-ul să se deschidă și să se închidă automat în fiecare săptămână. Programele folosesc fusul orar al campusului slujbei sau fusul orar al bisericii dvs., dacă campusul nu are unul setat. Chioșcul afișează ca **Closed** orele slujbelor a căror fereastră este închisă și le indică familiilor când se deschide check-in-ul. Pentru detalii, consultați [Configurarea prezenței](setup.md).
2. **Instalați aplicația B1 Checkin** pe dispozitivele pe care intenționați să le folosiți. Aplicația este disponibilă pe următoarele platforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablete Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablete Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Conectați-vă în aplicația B1 Checkin** folosind un cont care are permisiunea de prezență **Checkin** (sau **Edit Attendance**). Consultați [Conturile de chioșc pentru check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Selectați campusul și ora slujbei** pentru adunarea curentă.
5. Membrii pot acum să își caute numele pe dispozitiv și să facă check-in.

:::tip
Amplasați dispozitivele de check-in în locuri vizibile și ușor accesibile, precum intrările din hol sau birourile de primire. Un scurt anunț în timpul slujbelor ajută membrii să știe că această opțiune există.
:::

:::tip
Dacă biserica dvs. are mai multe campusuri, va trebui să repetați configurarea pentru fiecare campus în [Configurarea prezenței](setup.md). Fiecare dispozitiv de check-in poate fi configurat pentru un alt campus.
:::

## Recomandări hardware

**Tablete** — oricare dintre acestea funcționează bine cu aplicația:

- **Compactă:** Samsung Galaxy Tab A7 Lite 8.7"
- **Ecran mare:** Samsung Galaxy Tab A8 10.5"
- **Economică:** Amazon Fire HD 10

**Imprimante** — check-in-ul funcționează cu imprimante de etichete Brother pentru tipărirea insignelor cu nume:

- **Cea mai bună:** Brother QL-1110NWB (acceptă mai multe tablete prin Bluetooth și WiFi)
- **Bună:** Brother QL-810W (acceptă mai multe tablete prin WiFi)
- **Economică:** Brother QL-1100 (doar WiFi)

**Etichete:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Doar imprimantele de etichete Brother sunt compatibile cu aplicația B1 Checkin. Alte mărci de imprimante nu vor funcționa pentru tipărirea insignelor cu nume.
:::

:::info
Urmați instrucțiunile de configurare ale imprimantei pentru a o conecta la aceeași rețea WiFi ca tableta. Puteți găsi driverele și ghidurile de configurare pentru imprimantele Brother pe [site-ul de suport Brother](https://support.brother.com).
:::

## Personalizarea aspectului chioșcului

Puteți personaliza aspectul aplicației B1 Checkin pentru a se potrivi cu identitatea vizuală a bisericii dvs. În B1 Admin, mergeți la **Mobile > B1 CheckIn** și folosiți cardul **Kiosk Theme** pentru a configura:

### Culori

Personalizați cele opt setări de culoare pentru a se potrivi cu identitatea vizuală a bisericii:

- **Primary** și **Primary Contrast** — culoarea principală a brandului și culoarea textului său.
- **Secondary** și **Secondary Contrast** — culoarea de accent și culoarea textului său.
- **Header Background** și **Subheader Background** — culorile zonelor de antet ale chioșcului.
- **Button Background** și **Button Text** — culorile butoanelor interactive.

### Imagine de fundal

Încărcați o imagine de fundal opțională pentru ecranele de bun venit și de căutare ale chioșcului. Dimensiunea recomandată este de 1920x1080 de pixeli.

### Ecran de repaus / Screensaver

Configurați un screensaver care se activează după o perioadă de inactivitate:

1. Activați sau dezactivați ecranul de repaus.
2. Setați **timeout** (câte secunde de inactivitate trec înainte ca screensaver-ul să pornească, minimum 10 secunde).
3. Adăugați unul sau mai multe **slide-uri** — fiecare slide are o imagine și o durată de afișare (minimum 3 secunde).

:::tip
Folosiți ecranul de repaus pentru a afișa anunțuri, evenimente viitoare sau mesaje de bun venit atunci când chioșcul nu este folosit activ.
:::

## Înregistrarea oaspeților prin cod QR

Chioșcul de check-in poate afișa un cod QR pe care vizitatorii îl scanează pentru a se înregistra singuri, împreună cu familiile lor, pe propriul telefon. Acest lucru accelerează procesul de check-in pentru oaspeții care vin pentru prima dată.

Când un oaspete scanează codul QR, este dus la o [pagină de înregistrare a oaspeților](../../b1-church/checkin/guest-registration), unde introduce numele membrilor familiei sale și alte detalii pe care decideți să le solicitați. Un voluntar îl poate apoi căuta pe chioșc și îl poate înregistra.

### Activarea înregistrării oaspeților prin QR

Pentru a activa afișarea codului QR:

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus) și extindeți **Mobile**.
2. Faceți clic pe **B1 CheckIn**.
3. Activați **QR Guest Registration** și faceți clic pe **Save**.

:::note
Această setare se află la **Mobile > B1 CheckIn** (aceeași pagină cu cardul **Kiosk Theme**), nu la Attendance. Acțiunea **Kiosk** din pagina Attendance are un link către această pagină.
:::

Odată ce comutatorul este activat, celelalte opțiuni de mai jos apar în același card **QR Guest Registration**. Faceți clic pe **Save** pe card după ce modificați oricare dintre ele.

### Alegerea câmpurilor de înscriere

Lista **Sign-up fields** controlează ce solicită formularul de înregistrare. **First Name** și **Last Name** sunt întotdeauna prezente în formular și sunt obligatorii pentru fiecare membru al familiei. Pentru fiecare alt câmp, activați **Include** pentru a-l adăuga în formular, apoi activați **Required** dacă oaspeții trebuie să îl completeze. **Required** poate fi activat doar pentru un câmp inclus, iar dezactivarea **Include** îl golește.

| Câmp | Solicitat pentru | Inclus implicit |
|-------|-----------|---------------------|
| **Email** | Doar persoana de contact principală | Da (opțional) |
| **Phone** | Doar persoana de contact principală | Da (opțional) |
| **Home address** | O singură dată pentru familie — strada, linia de adresă 2, orașul, statul și codul poștal. Când este obligatorie, trebuie completate toate câmpurile, cu excepția liniei de adresă 2. Adresa este salvată pentru fiecare membru al familiei. | Nu |
| **Birth date** | Fiecare membru al familiei | Nu |
| **Gender** | Fiecare membru al familiei | Nu |
| **Marital status** | Doar persoana de contact principală | Nu |
| **Grade** | Fiecare membru al familiei (de la PreK până la 12, sau Graduated) | Nu |
| **Comments** | O singură dată, într-un câmp sub membrii familiei (până la 1.000 de caractere) | Nu |

Câmpurile dezactivate nu sunt salvate niciodată, chiar dacă cineva le trimite către înscriere pe altă cale. Comentariile sunt salvate ca o notă în fișa persoanei de contact principale (postată ca „Guest sign-up”), astfel încât le puteți citi în secțiunea **Notes** a profilului acesteia.

### Adăugarea oaspeților într-un grup

Folosiți **Add new guests to group** pentru a include automat toate persoanele care se înscriu într-unul dintre grupurile dvs. — de exemplu, un grup „Newcomers” sau un grup pentru evenimentul din acest weekend. Alegeți **None** (implicit) pentru a sări peste acest pas. Oaspeții nu văd și nu aleg grupul; acesta este setat doar aici. Schimbați-l înainte de fiecare eveniment, pentru a putea urmări împreună oaspeții acelui eveniment.

### Înregistrarea prezenței

Când este selectat un grup, apare un comutator **Also record attendance**. Activați-l pentru a marca oaspeții ca prezenți chiar în momentul înscrierii, astfel încât să nu fie nevoie să îi înregistrați separat.

Prezența este înregistrată doar dacă înscrierea are loc în timpul unei ore **programate** a slujbei grupului selectat:

- Grupul trebuie să fie legat de una sau mai multe ore ale slujbelor, iar acele ore trebuie să aibă un [program de check-in](setup.md#setting-a-check-in-schedule) (o **Day** și un **Start Time**).
- „În timpul” înseamnă în fereastra de check-in a orei slujbei — de la numărul de minute din **Open check-in** dinaintea începerii până la numărul de minute din **Close check-in** după sfârșit (sau după începere, dacă nu este setată o oră de sfârșit; fără oră de sfârșit și fără minute de închidere, până la sfârșitul acelei zile), în același fus orar folosit de programul de check-in.
- Fiecare membru al familiei este marcat prezent în grup pentru fiecare dintre orele sale de slujbă care este deschisă în acel moment, în data de azi.
- Înscrierile în alt moment sau pentru un grup ale cărui ore de slujbă nu au program sunt adăugate în grup, dar nu sunt contorizate ca prezente.

### Fotografia de antet

Sub **Header photo**, faceți clic pe **Change photo** pentru a alege sau a încărca o imagine (decupată la un format 16:9), care va apărea în partea de sus a paginii de înregistrare în locul pictogramei implicite. Faceți clic pe **Remove** pentru a reveni la pictogramă.

### Distribuirea linkului de înregistrare

Odată ce QR Guest Registration este activat, apare o secțiune **Share registration QR code** în partea de jos a cardului. Aceasta vă oferă două modalități de a ajunge cu oaspeții la formularul de înregistrare, în afara codului QR de la chioșc:

- **Copy link** — copiază URL-ul de înregistrare, ca să îl puteți lipi pe site-ul bisericii, în e-mailuri sau oriunde online.
- **Download PNG** — descarcă codul QR ca imagine, pe care o puteți tipări pe fluturași, buletine sau afișe.

:::tip
Adăugați linkul de înregistrare pe pagina „Plan Your Visit” sau „I'm New” a site-ului bisericii, pentru ca oaspeții să se poată înregistra chiar înainte de a ajunge.
:::

### Ce se întâmplă după ce un oaspete se înscrie

B1 caută mai întâi persoanele care există deja în **People**. Un membru al familiei este asociat unei persoane existente atunci când există exact o persoană cu același prenume și același e-mail sau telefon. Un copil introdus fără e-mail sau telefon este asociat după prenume, în cadrul gospodăriei asociate. Persoanele asociate sunt reutilizate așa cum sunt — înscrierea nu modifică niciodată datele sau statusul lor de membru — iar oricine este nou se alătură gospodăriei asociate.

Când nu se găsește nicio potrivire, înscrierea creează o gospodărie nouă, numită după numele de familie al persoanei de contact principale, cu o fișă de persoană pentru fiecare membru al familiei. Toți cei noi sunt adăugați în **People** cu statusul de membru **Visitor**, persoana de contact principală fiind capul familiei.

Persoanele asociate și cele noi sunt adăugate în grupul ales (dacă nu sunt deja în el) și li se înregistrează prezența, dacă este activată această opțiune. Comentariile sunt salvate ca notă la persoana de contact principală.

Pentru a face follow-up automat, adăugați un [declanșator de flux de lucru](../serving/workflows.md#triggers), cum ar fi **Person · Created** cu condiția *Membership Status is Visitor*, sau **Group · Member Joined** pentru grupul ales mai sus.

## Ce se înregistrează

Fiecare check-in creează o înregistrare de prezență în B1 Admin. Puteți vedea aceste înregistrări pe pagina [Attendance](tracking-attendance.md) și în [sesiunile fiecărui grup](../groups/group-members.md), exact ca pe prezențele introduse manual. Nu există nicio diferență în modul în care apar datele — ambele metode alimentează aceleași rapoarte.
