---
title: "Roluri și permisiuni"
---

# Roluri și permisiuni

<div class="article-intro">

Rolurile vă permit să controlați ce pot accesa diferiții utilizatori din contul dvs. ChurchApps. Puteți crea roluri personalizate pentru personal, voluntari și alți membri ai echipei, fiecare cu propriul nivel de acces, pentru a vă păstra datele în siguranță.

</div>

## Videoclip de instruire

<YouTube id="ZzCIkinVMnE" title="Roluri, permisiuni și invitarea echipei dvs. în B1" next="Configurarea serviciilor și a prezenței în B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de acces Domain Admin sau de un rol cu permisiunea de a gestiona rolurile
- Pregătiți o listă cu membrii echipei și zonele la care au nevoie de acces
- Consultați categoriile de permisiuni disponibile mai jos pentru a vă planifica rolurile

</div>

## Accesarea rolurilor

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus) și extindeți **Settings**.
2. Faceți clic pe **Roles**.
3. Pagina Roles afișează toate rolurile definite pentru biserica dvs. Coloana **Members** arată câți utilizatori se află în fiecare rol, iar rândul **(Everyone)** arată **All users**.

## Înțelegerea paginii Roles

Pagina Roles este împărțită în două panouri:

- **Partea stângă** -- Afișează lista membrilor atribuiți rolului selectat.
- **Partea dreaptă** -- Afișează setările de permisiuni pe care le puteți configura pentru acel rol.

Faceți clic pe numele oricărui rol pentru a vedea și a gestiona membrii și permisiunile acestuia.

## Adăugarea utilizatorilor într-un rol

1. Selectați rolul la care doriți să adăugați membri.
2. Folosiți **câmpul de căutare** din partea stângă pentru a găsi persoana dorită.
3. Selectați persoana din rezultatele căutării.
4. Persoana va fi adăugată în rol imediat.

## Eliminarea utilizatorilor dintr-un rol

1. Selectați rolul care conține utilizatorul pe care doriți să îl eliminați.
2. Găsiți persoana în lista de membri din partea stângă.
3. Faceți clic pe **butonul de eliminare** de lângă numele său.

## Configurarea permisiunilor

Fiecare rol poate primi acces la anumite zone din B1 Admin. În panoul **Edit Permissions**, permisiunile sunt grupate în secțiuni pe care le puteți extinde, precum **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups** și **Tasks**. Scrieți în caseta **Filter permissions** pentru a afișa doar permisiunile care corespund.

Bifați sau debifați o permisiune pentru a o acorda sau a o elimina din rol. Fiecare titlu de secțiune arată câte dintre permisiunile sale are rolul, de exemplu **2 of 5**, iar numărul se actualizează pe măsură ce bifați și debifați casetele.

### Permisiuni pentru donații

Secțiunea **Donations** include următoarele permisiuni:

- **View Donation Summaries** -- vizualizarea secțiunii Donations, inclusiv paginile Summary, Batches, Funds, Campaigns și Giving Statements.
- **View Donations** -- vizualizarea donațiilor individuale, precum darurile dintr-un lot.
- **Edit Donations** -- control total: adăugarea, editarea și ștergerea donațiilor și a loturilor, precum și [închiderea și redeschiderea loturilor](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- adăugarea de loturi și introducerea, editarea sau ștergerea donațiilor, dar doar în loturile care sunt încă deschise. Persoanele care au doar această permisiune nu pot șterge loturi, nu pot să le închidă sau să le redeschidă și nu pot modifica daruri primite prin donații online.
- **Edit Settings** -- gestionarea setărilor pentru donații.

Cineva care are **Enter Donations**, dar nu are **View Donation Summaries**, vede doar pagina **Batches** din secțiunea **Donations**. Acordați unei echipe de numărare a banilor atât **Enter Donations**, cât și **View Donations**, astfel încât membrii echipei să poată deschide un lot și să vadă darurile pe care le-au introdus. Pentru detalii, consultați [Cine poate modifica un lot](../donations/batches.md#who-can-change-a-batch).

### Doar numele persoanelor

Secțiunea **People and Groups** include permisiunea **View People Names Only**. Folosiți-o pentru voluntarii care trebuie să caute persoane după nume -- de exemplu, pentru a selecta pe cineva într-o casetă de căutare -- fără acces la directorul complet. Doar cu această permisiune, o persoană:

- Poate căuta persoane după nume și poate vedea lista persoanelor adăugate recent, dar vede doar numele, fotografia și starea de membru a fiecărei persoane
- Nu poate căuta după adresa de e-mail, nu poate vedea datele de contact și nu poate deschide directorul **People**

Combinați **View People Names Only** cu **View Attendance** sau **Edit Attendance** pentru voluntarii care țin evidența prezenței la clase. Atunci, **People** din meniul lor deschide **Groups**, unde pot deschide lista **All groups** și pot vedea numele membrilor fiecărei clase și sesiunile acesteia. Cu **Edit Attendance**, pot, de asemenea, [înregistra prezența](../attendance/recording-attendance.md) și pot adăuga vizitatori căutându-i după nume. Numele nu sunt link-uri către fișele persoanelor, iar grupurile confidențiale rămân ascunse, cu excepția cazului în care voluntarul este membru.

B1 Admin ascunde linkurile și butoanele care necesită permisiuni pe care un rol nu le are. De exemplu, lista **All groups** este disponibilă doar persoanelor care pot edita grupuri, vizualiza membrii grupurilor sau vizualiza persoane ori care au **View People Names Only** împreună cu **View Attendance** sau **Edit Attendance** (ceilalți sunt trimiși înapoi la Dashboard). Configurarea prezenței apare doar cu **Edit Services**. Butonul **Email** al unui grup apare doar pentru persoanele cu **Edit Group Members** (permisiunea necesară pentru a trimite e-mailuri grupului). Tipărirea listei unui grup necesită **View Group Members** sau conducerea acelui grup. Ștergerea unui eveniment din calendar necesită **Edit Content** (sau retragerea propriei cereri în așteptare).

### Conturi pentru chioșcul de check-in

Contul care se conectează la un chioșc [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) are nevoie de permisiunea **Checkin** din secțiunea **Attendance** (sau de **Edit Attendance**). Cu doar **Checkin**, chioșcul poate căuta familii după nume sau telefon, poate face check-in și check-out pentru acestea și poate afișa cine poate ridica un copil, fără acces la directorul People.

**Checkin** nu mai este acordată prin rândul **(Everyone)**. Faptul că cineva se află într-un rol cu alte permisiuni nu îi permite să utilizeze chioșcul. Adăugați **Checkin** la un rol precum „Check-In Volunteers” și includeți conturile chioșcului în acel rol.

:::warning
**Domain Admins** au acces complet la toate zonele contului dvs. ChurchApps. Permisiunile lor nu pot fi modificate sau restricționate. Folosiți acest rol doar pentru cei mai de încredere administratori.
:::

:::tip
Creați roluri specifice, precum „Treasurer” cu acces doar la **Donations**, „Counting Team” cu **Enter Donations** și **View Donations** sau „Check-In Volunteer” cu acces doar la **Attendance**. Aceasta respectă principiul celui mai mic privilegiu și vă păstrează datele în siguranță. Consultați [Securitatea datelor](./data-security.md) pentru mai multe informații despre modul în care ChurchApps vă protejează informațiile.
:::
