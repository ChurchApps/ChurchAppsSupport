---
title: "Configurarea prezenței"
description: "Configurați în B1 Admin campusuri, servicii, ore și grupuri, pentru ca urmărirea prezenței și programele de check-in să funcționeze în toată biserica."
---

# Configurarea prezenței

<div class="article-intro">

Înainte de a putea urmări prezența, trebuie să îi spui lui B1 Admin unde se află locațiile fizice ale bisericii tale, când au loc serviciile și ce grupuri se întâlnesc la fiecare serviciu. Această configurare, făcută o singură dată, creează structura care stă la baza tuturor urmăririlor și rapoartelor de prezență din biserica ta.

</div>

## Videoclip de instruire

<YouTube id="LQPc2gVlXvQ" title="Configurarea serviciilor și a prezenței în B1" next="Configurarea check-in-ului pentru copii în B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Ai nevoie de un cont activ în B1 Admin cu permisiunea de prezență **Editare servicii**. Opțiunea **Configurare** apare doar pentru persoanele care o au; simpla vizualizare a prezenței nu este suficientă. Consultă [Roluri și permisiuni](../people/roles-permissions.md) dacă nu ești sigur de nivelul tău de acces.
- Dacă intenționezi să atribui grupuri unor ore de serviciu, asigură-te mai întâi că [grupurile tale sunt create](../groups/creating-groups.md).

</div>

## Concepte-cheie

- **Campus** -- o locație fizică în care biserica ta se adună (de exemplu, „Campusul principal", „Campusul de nord"). Campusurile se gestionează din **Setări**.
- **Serviciu** -- o adunare recurentă dintr-un campus (de exemplu, „Serviciul de duminică", „Miercuri seara").
- **Oră de serviciu** -- un moment specific în care are loc un serviciu (de exemplu, „9:00", „11:00").
- **Grup programat** -- un grup atribuit unei anumite ore de serviciu. Prezența se urmărește în contextul acelui serviciu.
- **Grup neprogramat** -- un grup care își urmărește prezența independent, fără a fi legat de o oră de serviciu.

## Configurarea structurii de prezență

1. Deschide **B1 Admin**, deschide [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus) și extinde **Persoane**.
2. Fă clic pe **Prezență**, apoi fă clic pe **Configurare** din coloana din stânga. Se deschide tabelul **Structura serviciilor**, cu numărul de campusuri, de ore de serviciu și de grupuri programate și neprogramate afișat în partea de sus. Numerele se actualizează imediat ce adaugi, editezi sau ștergi ceva din tabel.
3. Fă clic pe **Gestionează campusurile** (în dreapta sus, în panoul **Structura serviciilor**). Aceasta te duce la **Setări → Campusuri**. Fă clic pe **Adaugă campus**, introdu numele locației (adresa și fusul orar sunt opționale) și fă clic pe **Salvează**.
4. Revino la **Persoane → Prezență** și fă clic pe **Configurare**. Campusul tău apare acum în tabelul de configurare.
5. Fă clic pe butonul **+ din coloana Serviciu**, sub campusul tău. Introdu un nume de serviciu, cum ar fi „Serviciul de duminică", și fă clic pe **Salvează**.
6. Fă clic pe butonul **+ din coloana Oră**, sub serviciu. Introdu un nume pentru **ora de serviciu**, cum ar fi „9:00", completează opțional [programul de check-in](#setarea-programului-de-check-in) și fă clic pe **Salvează**. Repetă pentru fiecare oră de serviciu.
7. Pentru a lega un grup de o oră de serviciu, deschide grupul din **Persoane > Grupuri**, fă clic pe **Editare** și folosește **Adaugă oră de serviciu** — vezi secțiunea următoare.

### Activarea urmăririi prezenței pentru un grup

Înainte ca un grup să poată avea prezența înregistrată, trebuie activată opțiunea Urmărește prezența pentru acel grup.

1. În meniul Jump, alege **Persoane > Grupuri** și selectează grupul.
2. Fă clic pe butonul **Editare** de sub numele grupului.
3. Setează **Urmărește prezența** la **Da**.
4. Fă clic pe **Salvează**.

:::tip
Dacă ai atribuit grupul unei ore de serviciu la pasul anterior, folosește și opțiunea **Adaugă oră de serviciu** de pe ecranul de editare al grupului pentru a-l lega de serviciul corect. Astfel te asiguri că sesiunile sunt conectate la campusul și ora potrivite.
:::

:::tip
Dacă un grup se întâlnește în afara unui serviciu obișnuit -- de exemplu, un grup mic de miercuri care își urmărește propria prezență -- îl poți lăsa ca grup neprogramat. Va apărea în continuare în raportul **Prezența grupurilor** pentru raportarea prezenței.
:::

## Setarea programului de check-in

Fiecare oră de serviciu poate avea un program opțional de check-in, astfel încât [auto-check-in-ul](check-in.md) să se deschidă și să se închidă singur în fiecare săptămână. Fără un program, check-in-ul pentru acea oră de serviciu rămâne disponibil oricând (atât timp cât sala nu este închisă din alte motive, de exemplu pentru că este plină).

1. În vizualizarea **Configurare**, fă clic pe numele unei ore de serviciu din coloana **Oră** (sau adaugă una nouă).
2. Sub **Program check-in**, alege **Ziua** săptămânii în care se întâlnește ora de serviciu.
3. Setează **Ora de început** și, opțional, **Ora de sfârșit**.
4. Introdu **Deschide check-in-ul (minute înainte de început)** -- de exemplu, `30` deschide check-in-ul cu o jumătate de oră înainte de începerea serviciului.
5. Introdu **Închide check-in-ul (minute după sfârșit)** -- de exemplu, `15` menține check-in-ul deschis încă 15 minute după ora de sfârșit. Dacă nu ai setat o oră de sfârșit, această valoare se calculează de la ora de început. Dacă lași necompletate atât **Ora de sfârșit**, cât și **Închide check-in-ul**, check-in-ul rămâne deschis până la sfârșitul zilei respective.
6. Fă clic pe **Salvează**.

Programul se repetă în fiecare săptămână și este măsurat în fusul orar al campusului serviciului. Dacă acel campus nu are un fus orar, se folosește [Fusul orar](../settings/church-settings.md#time-zone) al bisericii tale, apoi fusul orar al primului campus care are unul și, în cele din urmă, ora estică (America/New_York). Dacă check-in-ul se deschide la o oră greșită, verifică **Fusul orar** de pe campus, în [Campusuri](../settings/campuses.md). Pentru a elimina un program, setează **Ziua** înapoi la **Fără program** și fă clic pe **Salvează**. Un program intră în vigoare doar când sunt setate atât **Ziua**, cât și **Ora de început**.

Cât timp fereastra de check-in a unei ore de serviciu este închisă:

- **Auto-check-in-ul pe B1.church** afișează ora de serviciu ca **Închis** (sau, de exemplu, **Închis · se deschide duminică la 9:30**) și nu poate fi selectată. Dacă niciuna dintre orele unui serviciu nu este deschisă, familiile văd când se deschide check-in-ul, de exemplu „Check-in-ul se deschide duminică la 9:30".
- **Aplicația kiosc B1 Checkin** afișează, de asemenea, ora de serviciu ca **Închis**, împreună cu momentul în care se deschide. Dacă toate orele unui serviciu sunt închise, kiosc-ul afișează când se deschide check-in-ul pentru acel serviciu. Cineva deja înregistrat la o oră de serviciu închisă vede în schimb grupul său cu **Înregistrat**. Dacă o fereastră se închide în timpul unui check-in, kiosc-ul nu îl finalizează și afișează un ecran **Nu te poți înregistra încă**, cu sala afectată, ca familia să poată alege alta.

O familie care s-a înregistrat deja pentru o oră de serviciu anterioară se poate întoarce și adăuga o oră de serviciu ulterioară care este deschisă, chiar și după ce fereastra celei anterioare s-a închis. Check-in-urile existente se păstrează.

:::tip
Setează o fereastră de deschidere generoasă (de exemplu, cu 45 de minute înainte de început), ca familiile și voluntarii care sosesc devreme să se poată înregistra, și o fereastră de închidere scurtă, ca persoanele întârziate să se poată înregistra și după ce serviciul a început.
:::

## Editarea configurării

Poți actualiza configurarea oricând. Selectează un campus, o oră de serviciu sau un grup și fă clic pe **Editare** pentru a-i modifica detaliile, sau pe **Șterge** pentru a-l elimina.

:::info
Ștergerea unei ore de serviciu nu șterge înregistrările de prezență din trecut. Datele tale istorice se păstrează chiar dacă îți modifici programul.
:::

## Ce urmează

Odată ce campusurile, orele de serviciu și grupurile sunt configurate, ești gata să începi [înregistrarea prezenței](recording-attendance.md) manual sau să configurezi [auto-check-in-ul](check-in.md) pentru serviciile tale.
