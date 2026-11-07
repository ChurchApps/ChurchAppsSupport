---
title: "Membrii grupului"
---

# Membrii grupului

<div class="article-intro">

După ce ai creat un grup, următorul pas este adăugarea membrilor. Din pagina de detalii a grupului poți căuta persoane, le poți adăuga în grup, poți desemna lideri, poți trimite mesaje și poți exporta lista membrilor. Gestionarea apartenenței la grup este esențială pentru coordonarea grupurilor mici, a comitetelor și a claselor.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Ai nevoie de cel puțin un grup configurat în B1 Admin. Consultă [Crearea grupurilor](creating-groups.md) dacă nu ai creat încă unul.
- Persoanele pe care vrei să le adaugi ar trebui să fie deja în directorul tău [Persoane](../people/adding-people.md). Dacă cineva nu este acolo, îl poți crea din căutarea de membri (vezi mai jos).

</div>

## Adăugarea membrilor într-un grup

1. În [meniul Jump](../introduction.md#getting-around-with-the-jump-menu), alege **People > Groups** și fă clic pe grupul pe care vrei să îl gestionezi.
2. În secțiunea **Members** a paginii grupului, fă clic pe **All members**. (Echipele și departamentele se deschid direct în lista lor de membri.)
3. În caseta **Add Person** de sub lista de membri, scrie numele persoanei pe care vrei să o adaugi și apasă **Enter** sau fă clic pe iconița de căutare.
4. Fă clic pe numele persoanei sau pe iconița de adăugare de lângă ea, în rezultatele căutării.
5. Persoana apare acum în lista de membri ai grupului.

:::tip
Înainte să scrii ceva, caseta **Add Person** afișează o scurtă listă de **Persoane recente** pe care le poți adăuga cu un singur clic.
:::

Când ai terminat, fă clic pe linkul **Back to** cu numele grupului pentru a reveni la pagina grupului. Pagina grupului afișează un rezumat al **Members**, **Sessions**, **Calendar** și **Health** ale grupului, fiecare cu un link către vizualizarea completă. Dacă ești unul dintre liderii grupului, afișează și **Leader notes** (vezi [Notele liderilor](#leader-notes) mai jos). Când sunt asociate formulare cu grupul, apare și o secțiune **Linked forms** (vezi [Formulare asociate](#linked-forms) mai jos).

### Adăugarea unei persoane care nu este încă în B1

Dacă căutarea nu găsește pe nimeni, aceasta afișează **No records found** cu un link **Add New Person**. Fă clic pe el, introdu prenumele, numele de familie și (opțional) adresa de e-mail, apoi fă clic pe **Add**. Persoana nouă este creată în directorul tău de persoane și adăugată în grup într-un singur pas -- nu trebuie să o cauți din nou.

## Desemnarea liderilor de grup {#designating-group-leaders}

Liderii de grup au privilegii speciale -- pot edita [calendarul grupului](group-calendar.md), pot gestiona evenimente și pot ajuta la coordonarea grupului.

1. În lista de membri ai grupului, găsește persoana pe care vrei să o faci lider.
2. Fă clic pe **iconița stea** (**Make Leader**) de lângă numele ei.
3. Persoana este acum desemnată ca lider de grup și afișează o insignă **Leader**.

Pentru a elimina statutul de lider, fă din nou clic pe iconița stea (**Remove Leader Access**).

:::info
Orice membru al grupului poate vedea calendarul și evenimentele grupului, dar doar liderii pot adăuga sau edita evenimente în calendar.
:::

## Formulare asociate {#linked-forms}

Când un formular Stand Alone este [asociat grupului](../forms/creating-forms.md#linking-a-form-to-a-group), pagina grupului afișează o secțiune **Linked forms** cu numele fiecărui formular, dacă este **Open** sau **Closed**, și câte formulare sunt asociate. Secțiunea apare doar pentru liderii grupului și pentru persoanele care pot administra formularele și doar dacă este asociat cel puțin un formular. Administratorii de formulare pot face clic pe numele unui formular pentru a-l deschide sau pot face clic pe **All forms** pentru a merge la pagina Formulare.

Liderii de grup citesc și tipăresc răspunsurile la aceste formulare din pagina grupului de pe [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Notele liderilor {#leader-notes}

Liderii de grup pot păstra note private despre grup -- de exemplu, urmăriri, nevoi de rugăciune sau preocupări pastorale -- pe care restul grupului nu le vede niciodată.

Secțiunea **Leader notes** apare pe pagina grupului doar pentru persoanele care sunt lideri ai acelui grup. Afișează cea mai recentă notă, cine a scris-o și când, precum și numărul total de note.

1. Pe pagina grupului, fă clic pe **All notes** în secțiunea **Leader notes**.
2. Scrie nota în casetă și publică-o. Notele sunt afișate cu numele și fotografia autorului, precum și cu data și ora publicării.
3. Fă clic pe linkul **Back to** cu numele grupului pentru a reveni la pagina grupului.

:::info
Notele liderilor sunt vizibile doar liderilor grupului. Ceilalți membri nu le pot vedea, iar nici personalul sau administratorii nu le pot vedea -- chiar dacă au permisiuni complete -- decât dacă sunt și ei lideri ai grupului respectiv. Pentru a oferi acces altei persoane, [fă-o lider](#designating-group-leaders). Liderii văd aceste note și în secțiunea **Leader notes** de pe pagina grupului din [B1.church](../../b1-church/groups/group-details.md#leader-notes), precum și în fila **Groups** a paginii [Note](../people/notes.md) din B1 Admin.
:::

## Trimiterea de mesaje membrilor grupului

Poți comunica direct cu toți membrii unui grup din B1 Admin:

1. În lista de membri ai grupului, fă clic pe iconița **Send a message to members** de deasupra listei.
2. Scrie mesajul în câmpul de text (sau alege unul din **Templates**).
3. Fă clic pe **Send**.

Mesajul tău va fi livrat tuturor membrilor grupului.

## Trimiterea de e-mailuri membrilor grupului

Poți trimite e-mailuri formatate tuturor membrilor unui grup:

1. Din pagina de detalii a grupului, fă clic pe butonul **Email** din partea stângă a paginii.
2. Se deschide dialogul Send Email, care arată câți membri vor primi e-mailul și câți nu au o adresă de e-mail înregistrată.
3. Opțional, selectează un **email template** din lista derulantă sau scrie un mesaj de la zero. Fă clic pe **Manage Templates** pentru a crea sau edita șabloane.
4. Introdu un **subject line** (subiect). Poți insera câmpuri de îmbinare făcând clic pe butoanele de câmpuri: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}` și **Group Name** (`{{groupName}}`), care este completat cu numele grupului.
5. Scrie **corpul e-mailului** folosind editorul HTML. Aceleași câmpuri de îmbinare sunt disponibile și aici.
6. Fă clic pe **Send**.
7. Un rezumat arată câte e-mailuri au fost trimise cu succes și câți membri au fost omiși (fără adresă de e-mail înregistrată).

:::tip
Creează șabloane de e-mail reutilizabile pentru comunicările recurente, cum ar fi actualizările săptămânale, anunțurile despre evenimente sau cererile de rugăciune. Șabloanele economisesc timp și asigură un mesaj consecvent.
:::

### Activarea e-mailului de grup pentru biserica ta {#turning-on-group-email-for-your-church}

Toate bisericile de pe B1 trimit e-mailuri de la aceeași adresă, deci au o reputație de expediere comună. Pentru ca e-mailurile tuturor să nu ajungă în folderele de spam, echipa ChurchApps verifică fiecare biserică o singură dată înainte ca aceasta să poată trimite e-mail de grup.

Dacă biserica ta nu a fost încă verificată, dialogul Send Email afișează **Group email needs a quick review** în loc de editorul de mesaje:

1. Fă clic pe **Request review**. Echipa de suport ChurchApps este notificată.
2. Dialogul se schimbă în **Review requested**. Îl poți închide.
3. E-mailul de grup este de obicei activat în termen de o zi lucrătoare. După aceea, deschide din nou dialogul Send Email pentru a trimite mesajul.

Până când biserica ta este aprobată, B1 nu trimite nici e-mailurile de urmărire ale [formularelor](../forms/creating-forms.md#sending-a-follow-up-email) și nici pasul **Send email** din [fluxurile de lucru](../serving/workflows.md).

:::info Limite de trimitere
După aprobare, o biserică poate trimite până la 150 de e-mailuri scrise de biserică pe zi. Limita crește pe măsură ce biserica acumulează un istoric curat de trimitere, până la 2.000 pe zi. Dacă mesajele recente au fost returnate sau marcate ca spam, trimiterea de e-mailuri de grup se oprește, iar dialogul îți cere să contactezi suportul. Dacă o trimitere ar depăși limita zilnică, B1 nu o trimite și afișează o eroare.
:::

## Trimiterea de mesaje text membrilor grupului

Odată ce biserica ta a conectat un [furnizor de mesaje text](../settings/church-settings.md#texting), un buton **Text** (**Text this group**) apare lângă butonul **Email** de pe pagina grupului.

1. Din pagina de detalii a grupului, fă clic pe **Text**.
2. Dialogul arată câți membri vor primi mesajul. Membrii fără număr de telefon mobil înregistrat sau cei care s-au dezabonat sunt omiși.
3. Opțional, alege un mesaj text salvat din **Load Template (optional)** pentru a completa mesajul. Selectorul apare după ce biserica ta are [șabloane de mesaje text](../settings/email-templates.md#text-templates); persoanele care pot edita setările văd și un link **Manage Templates**.
4. Scrie sau editează mesajul. Pentru a-l personaliza, fă clic pe un element de substituție de sub caseta de mesaj -- **First Name**, **Last Name**, **Display Name**, **Church Name** sau **Group Name** -- pentru a-l insera la cursor. Fiecare element este completat cu datele destinatarului atunci când mesajul este trimis; **Group Name** devine numele grupului.
5. Fă clic pe **Send**.

Consultă [Personalizarea mesajelor text cu câmpuri de îmbinare](../settings/church-settings.md#personalizing-texts-with-merge-fields) pentru mai multe detalii.

## Exportarea datelor grupului

Pentru a descărca lista membrilor grupului ca fișier:

1. În lista de membri ai grupului, fă clic pe **Export** de deasupra listei.
2. Un fișier CSV cu informațiile membrilor grupului se va descărca pe calculatorul tău.

Un export CSV este util pentru importul datelor în alte instrumente sau pentru păstrarea unor evidențe offline. Pentru mai multe opțiuni de export, consultă [Exportarea datelor](../people/exporting-data.md).

## Tipărirea listei de membri

În lista de membri ai grupului, fă clic pe iconița **Print Roll Sheet** (imprimantă) de deasupra listei și alege un format. Pagina se deschide într-un tab nou, iar dialogul de tipărire al browserului apare automat.

- **Attendance Sheet** -- o listă de clasă fără dată, cu casete **Present** și **Absent** pe care profesorii le pot marca manual. Consultă [Tipărirea unei liste de prezență](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Contact Roster** -- o listă de contact a grupului, datată cu ziua curentă și având în antet logo-ul bisericii (**Light Background Logo** din [Website > Appearance](../website/appearance.md), dacă ai încărcat unul), cu numele bisericii dedesubt și numele grupului. Fiecare membru are un rând cu **Name**, **Phone**, **Email** și **Address**. Liderii sunt listați primii și marcați cu **Leader**, apoi ceilalți membri, în ordine alfabetică după numele de familie. Telefonul afișat este numărul mobil al membrului sau, dacă nu are unul, numărul de acasă sau de la serviciu. Datele de contact sunt lăsate goale pentru persoanele care s-au dezabonat.

:::warning
O listă de contact conține informații personale de contact ale membrilor. Distribuie copiile tipărite doar liderilor grupului și altor persoane care au nevoie de ele.
:::

## Trimiterea de notificări push membrilor grupului

Poți trimite direct o notificare push tuturor membrilor grupului care au instalată aplicația B1.church pe dispozitiv și au notificările push activate.

1. Din pagina de detalii a grupului, fă clic pe **Notify** (sub butoanele **Email** și **Text** -- butonul **Text** apare după ce este conectat un [furnizor de mesaje text](../settings/church-settings.md#texting)).
2. Se deschide un dialog care arată câți membri ai grupului au notificările push activate.
3. Completează detaliile notificării:
   - **Title** *(obligatoriu)* -- Un rezumat scurt, de până la 80 de caractere.
   - **Message** *(obligatoriu)* -- Textul notificării, de până la 240 de caractere.
   - **Open link or flyer URL** *(opțional)* -- Un traseu relativ în aplicație (de exemplu, `/mobile/groups`) sau un URL complet `https://` pe care notificarea îl deschide când este apăsată.
   - **Image URL** *(opțional)* -- Un URL `https://` către o imagine care apare alături de notificare pe dispozitivele compatibile.
4. O previzualizare live arată cum va apărea notificarea pe dispozitiv.
5. Fă clic pe **Send Notification**.

:::info
Notificările push sunt livrate doar membrilor grupului care au instalată aplicația PWA B1.church și nu au dezactivat notificările push. Membrii fără un dispozitiv push înregistrat sau cu notificările push dezactivate sunt numărați ca omiși, iar rezumatul trimiterii arată câți au fost atinși și câți au fost omiși.
:::

:::tip
După trimitere, dialogul arată câte notificări au fost puse cu succes în coadă. Dacă majoritatea membrilor apar ca omiși, roagă-i să viziteze site-ul lor B1.church, să îl instaleze ca aplicație pe ecranul principal și să permită notificările atunci când li se cere.
:::

## Eliminarea membrilor

Pentru a elimina o persoană dintr-un grup, găsește numele ei în lista de membri și fă clic pe butonul **remove** de lângă înregistrarea ei.

:::info
Eliminarea unei persoane dintr-un grup nu o șterge din directorul bisericii. Ea va apărea în continuare în secțiunea [Persoane](../people/adding-people.md) și poate fi readăugată în grup oricând.
:::
