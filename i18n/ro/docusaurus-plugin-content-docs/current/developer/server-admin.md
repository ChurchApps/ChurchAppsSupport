---
title: "Administrarea serverului"
description: "Doar pentru utilizatorii Server.Admin: resetați autentificarea în doi pași, impersonați conturi, moderați Commons și aprobați e-mailul bisericii în B1 Admin."
---

# Administrarea serverului

<div class="article-intro">

Funcțiile de administrare a serverului din ChurchApps sunt disponibile numai utilizatorilor cu permisiunea **Server.Admin**. Aceste instrumente sunt folosite pentru operațiunile platformei, asistență și depanare pentru toate bisericile din sistem.

</div>

:::warning Acces restricționat
Funcțiile descrise pe această pagină necesită permisiunea **Server.Admin** și nu sunt disponibile administratorilor obișnuiți ai bisericilor. Sunt destinate exclusiv operatorilor platformei și personalului de asistență.
:::

## Accesarea Server Admin

Utilizatorii cu permisiunea Server.Admin pot accesa panoul de administrare a serverului din B1 Admin:

1. Conectați-vă la [admin.b1.church](https://admin.b1.church)
2. Deschideți [meniul Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), extindeți **Setări** și faceți clic pe **Server Admin**. (Puteți ajunge direct și la `admin.b1.church/admin`.)
3. Panoul Server Admin afișează secțiunile în partea stângă, grupate în trei categorii: **Director** (Biserici, Utilizatori, Impersonare utilizator), **Operațiuni** (Joburi în fundal, Commons, Tendințe de utilizare) și **Sistem** (Căutări de traduceri, Starea serverului, Migrările bazei de date)

## Resetarea autentificării în doi pași

Dacă un utilizator are activată [autentificarea în doi pași](../b1-admin/profile/managing-profile.md#two-factor-sign-in) și și-a pierdut atât telefonul, cât și codurile de rezervă, un administrator de server o poate dezactiva:

1. Deschideți secțiunea **Utilizatori** din panoul Server Admin și căutați utilizatorul.
2. Utilizatorii cu autentificare în doi pași afișează o insignă **Two-factor on**. Faceți clic pe **Reset 2FA** lângă aceasta.
3. Confirmați solicitarea. Efectuați această acțiune numai după ce ați verificat identitatea persoanei cu care comunicați.

Utilizatorul se poate conecta apoi doar cu parola și poate configura din nou autentificarea în doi pași din profilul său. Resetările sunt înregistrate în jurnalul de audit ca `mfa_reset`. Endpoint-ul este `POST /membership/users/mfa/reset/:userId` și necesită permisiunea Server.Admin.

## Impersonarea utilizatorului

Funcția de impersonare le permite administratorilor de server să se conecteze ca alt utilizator, în scopul asistenței și depanării. Este utilă pentru investigarea problemelor raportate de utilizatori sau pentru a ajuta bisericile să-și configureze sistemele.

### Cum să impersonați un utilizator

1. Deschideți secțiunea **Impersonare utilizator** din panoul Server Admin
2. Introduceți numele sau adresa de e-mail a utilizatorului în câmpul de căutare
3. Faceți clic pe **Caută** sau apăsați Enter
4. Din rezultatele căutării, faceți clic pe utilizatorul pe care doriți să-l impersonați
5. Confirmați impersonarea în caseta de dialog care apare
6. Veți fi conectat ca acel utilizator și redirecționat către contul său

### Note importante

- Impersonarea creează o sesiune nouă cu permisiunile și accesul la biserici ale utilizatorului țintă
- Sesiunea dvs. originală de administrator se încheie atunci când impersonați alt utilizator
- Toate acțiunile efectuate în timpul impersonării sunt înregistrate în jurnalul de audit
- Pentru a reveni la contul dvs. de administrator, deconectați-vă și conectați-vă din nou cu datele dvs.
- Folosiți impersonarea doar atunci când este necesar pentru asistență și informați întotdeauna utilizatorii când accesați conturile lor în scopul asistenței

### Endpoint API

Funcția de impersonare se bazează pe endpoint-ul `/users/:userId/impersonate` din API-ul Membership. Consultați [Endpoint-urile Membership](/docs/developer/api/endpoints/membership#users) pentru detalii tehnice.

### Considerente de securitate

- Impersonarea necesită permisiunea Server.Admin. Această permisiune trebuie acordată cu moderație și numai operatorilor de platformă de încredere
- Toate evenimentele de impersonare sunt înregistrate cu ID-ul administratorului și ID-ul utilizatorului țintă
- Bisericile nu sunt notificate când are loc o impersonare, așa că stabiliți politici clare privind momentul și modul în care trebuie folosită această funcție
- Luați în considerare documentarea evenimentelor de impersonare în sistemul dvs. de tichete de asistență, pentru responsabilitate

## Moderarea Commons

Commons este coada comună de moderare pentru conținutul trimis de utilizatori în toate produsele. Cântecele WorshipCommons, lecțiile Lessons.church, șabloanele FreeShow și șabloanele constructorului de site-uri B1 trec toate prin aceeași coadă, în loc de instrumente separate de revizuire pentru fiecare produs.

### Accesarea Commons

1. Accesați fila **Commons** din panoul Server Admin.
2. Veți vedea trei subfile: **Coadă**, **Rapoarte** și **Resurse**.

Un rol limitat de **editor muzical** poate vedea și fila Coadă, dar nu poate aproba trimiterile care modifică drepturile sau licența unui cântec.

### Coadă

Coada listează toate trimiterile în așteptare din toate produsele, care pot fi filtrate după produs și tipul resursei. Fiecare rând arată dacă trimiterea este o resursă nouă, o modificare făcută de autorul original sau o modificare făcută de o terță parte, împreună cu istoricul de aprobare al expeditorului și perioada de așteptare. Trimiterile care așteaptă mai mult de 72 de ore sunt marcate.

Faceți clic pe **Revizuiește** pentru a deschide un panou cu diferențele pe câmpuri, previzualizările fișierelor și o previzualizare încorporată, numai în citire, a elementului. Folosiți scurtăturile de tastatură **a**/**r** pentru a aproba sau respinge și **j**/**k** pentru a trece la trimiterea următoare sau anterioară fără a părăsi panoul. Pentru respingere trebuie să selectați un motiv (de exemplu calitate, duplicat, licențiere, ccli, ai sau nelegat de subiect) și o notă.

### Rapoarte

Fila Rapoarte gestionează rapoartele privind drepturile de autor și politicile sau calitatea, depuse împotriva resurselor deja publicate. Acestea sunt împărțite în cozile separate Drepturi de autor și Politici și altele, plus un istoric Rezolvate. Preluați un raport pentru a începe să lucrați la el, apoi rezolvați-l cu o soluție (menținut, respins sau duplicat) și o acțiune (nicio acțiune, retragere sau eliminare).

### Resurse

Fila Resurse este un catalog căutabil cu conținutul publicat, care conține acțiuni pentru a **Evidenția** o resursă (o afișează pe pagina principală a produsului), pentru **Retrage** sau **Republică** și pentru **Elimină** (cu un motiv legat de drepturi de autor sau de politici).

Pentru cântece, aici un cântec devine **pregătit pentru duminică** și poate apărea în căutarea de cântece B1 Admin a unei biserici. Un revizor deschide resursa și marchează fiecare tonalitate publicată ca **Ascultat** după ce a ascultat-o integral și a confirmat că partitura, acordurile și diapozitivele sunt prezente. Un cântec devine pregătit pentru duminică numai după ce toate tonalitățile sunt bifate.

:::info
Moderarea Commons este rezervată personalului. Bisericile individuale nu văd niciodată această coadă. Singurul loc în care B1 Admin al unei biserici utilizează datele Commons este secțiunea „WorshipCommons — gratuit” din [căutarea de cântece](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), care afișează doar cântecele care au trecut deja prin acest proces de revizuire.
:::

Consultați pagina [Arhitectura Content Commons](/docs/developer/architecture/commons) pentru modelul de date de bază și ciclul de viață al trimiterilor.

## Aprobarea e-mailurilor de grup

Bisericile nu pot trimite e-mailuri scrise de biserică (e-mailuri de grup, urmăriri de formulare, e-mailuri de fluxuri de lucru și invitații de cont) până când un administrator de server nu le aprobă. Astfel se previne folosirea adresei comune de expediere ChurchApps pentru spam de către bisericile înregistrate prin boți.

1. Deschideți fila **Biserici** din panoul Server Admin.
2. Fiecare biserică afișează un indicator **Group Email**: **Approved** (verde) sau **Not approved** (conturat).
3. Faceți clic pe indicator și confirmați pentru a aproba biserica sau pentru a revoca o aprobare.

Personalul bisericii solicită aprobarea cu butonul **Request review** din caseta de dialog Send Email din B1 Admin. Solicitarea este trimisă prin e-mail la adresa de asistență și include numele bisericii, ID-ul, data înregistrării, locația și persoana care a făcut solicitarea. O biserică poate trimite o solicitare pe săptămână. Consultați [Limitele e-mailurilor scrise de biserică](/docs/developer/architecture/notifications#church-authored-email-limits) pentru limita zilnică și pentru pauza automată în cazul returnărilor și reclamațiilor.

## Migrările bazei de date

Fluxul de lucru **Deploy Prod** aplică singur migrările în așteptare. Bazele de date găzduite acceptă conexiuni numai din rețeaua Api-ului, deci un runner GitHub nu le poate accesa. În schimb, imediat după `serverless deploy`, fluxul de lucru invocă funcția Lambda `migrate` a Api-ului (`api-Prod-migrate`), care rulează toate migrările în așteptare ale fiecărui modul cu același runner ca această filă și eșuează implementarea dacă vreun modul generează o eroare sau este refuzat. **Rollback Prod** revine doar codul Lambda; migrările deja aplicate rămân aplicate. Fila **Migrările bazei de date** servește la verificarea stării, la rularea oricăror migrări pe care implementarea nu le-a rulat (de exemplu în mediul demo, a cărui implementare nu rulează migrări) și la marcarea de referință a modulelor fără istoric.

Instalările self-hosted Docker rulează migrările automat la pornirea containerului Api.

Fila afișează mediul curent și câte un rând pentru fiecare modul (membership, attendance, giving etc.), cu starea sa, numărul de migrări aplicate și în așteptare și ultima migrare aplicată.

- **Run Pending Migrations** aplică fiecare migrare în așteptare, câte un modul pe rând, în ordine. Se oprește la prima eroare și afișează ce a fost aplicat pentru fiecare modul.
- Un modul marcat **No history** are o bază de date mai veche decât urmărirea migrărilor. Nu este rulat niciodată automat, deoarece ar reexecuta migrări vechi de date peste tabelele live. În schimb, faceți clic pe **Check Schema** pentru acel modul. Api-ul compară tabelele, coloanele și indexurile create de fiecare migrare cu baza de date live și marchează fiecare migrare ca **Already applied**, **Missing**, **Partly applied** sau **Data only**. Verificarea nu modifică nimic.
- În rezultatele verificării, **Record as Already Applied** scrie migrările detectate în istoricul migrărilor fără a le rula (după confirmare). Sunt înregistrate toate migrările până la ultima migrare **Already applied**, inclusiv cele **Data only** din acel interval. Migrările **Missing** rămân în așteptare și pot fi apoi rulate normal cu **Run Pending Migrations**.
- O migrare **Partly applied** blochează înregistrarea. Dacă migrarea poate fi rulată din nou în siguranță (citiți-o mai întâi), bifați **Re-run** pentru ca ea să rămână în așteptare și să fie rulată din nou de la început.

Panoul Server Admin și CLI-ul (`yarn migrate:up`) folosesc același migrator Kysely și tabelul `kysely_migration`, deci întotdeauna sunt de acord asupra migrărilor aplicate. Endpoint-urile corespunzătoare sunt `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` și `POST .../:module/baseline`, toate accesibile numai cu Server.Admin.

## Pagini conexe

- [Autentificare și permisiuni](/docs/developer/api/endpoints/authentication): modelul de permisiuni și autentificarea JWT
- [Endpoint-urile Membership](/docs/developer/api/endpoints/membership): API-ul de gestionare a utilizatorilor și bisericilor
- [Jurnalul de audit](/docs/b1-admin/reports/audit-log): vizualizați jurnalele de activitate pentru o biserică
- [Arhitectura Content Commons](/docs/developer/architecture/commons): modelul comun de resurse și ciclul de moderare
