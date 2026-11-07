---
title: "Înregistrarea prezenței"
---

# Înregistrarea prezenței

<div class="article-intro">

Odată ce campusurile, orele de slujbă și grupele sunt configurate, puteți înregistra manual prezența după fiecare întâlnire. B1 Admin organizează prezența în jurul **sesiunilor** -- câte o sesiune pentru fiecare grupă, la fiecare dată de întâlnire. Creați sesiunea, marcați cine a participat, iar datele ajung direct în rapoartele de prezență.

</div>

## Video de instruire

<YouTube id="gS8h2rhyMys" title="Înregistrarea și urmărirea prezenței în B1" next="Crearea planurilor și programarea voluntarilor în B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Campusurile, orele de slujbă și grupele trebuie să fie configurate. Consultați [Configurarea prezenței](setup.md) dacă nu ați făcut încă acest lucru.
- Grupele pe care doriți să le urmăriți trebuie să aibă activată opțiunea **Urmărește prezența**. Consultați [Configurarea prezenței](setup.md) pentru detalii.
- Aveți nevoie de permisiunea **Editare prezență** pentru a salva prezența. Voluntarii care au doar permisiunea **Vezi doar numele persoanelor** pot totuși să înregistreze prezența în acest mod -- deschid clasele din **Grupe** și văd membrii doar după nume. Consultați [Doar numele persoanelor](../settings/roles-permissions.md#people-names-only).

</div>

## Crearea unei sesiuni

O sesiune reprezintă o apariție a unei întâlniri de grupă -- de exemplu, clasa voastră de clasele I--a III-a de duminica respectivă.

1. Deschideți **B1 Admin**, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus), extindeți **Persoane** și faceți clic pe **Grupe**.
2. Selectați grupa pentru care doriți să înregistrați prezența.
3. În secțiunea **Sesiuni** de pe pagina grupei, faceți clic pe **Toate sesiunile**.
4. Faceți clic pe **Nou** pentru a crea o sesiune nouă.
5. Dacă grupa este asociată unui interval orar de slujbă, alegeți **Interval orar**. Dacă este o grupă neprogramată, acest câmp nu va apărea.
6. Selectați **Data sesiunii** -- poate fi astăzi, o dată din trecut sau o dată viitoare.
7. Faceți clic pe **Salvează**.

### Adăugarea sesiunilor pentru fiecare clasă dintr-un interval orar

Dacă alte grupe se întâlnesc în același interval orar (de exemplu, toate clasele copiilor voștri la ora 9:00 duminica), puteți crea sesiunile lor dintr-un singur pas, în loc să vizitați fiecare grupă.

1. Urmați pașii de mai sus și alegeți un **Interval orar**.
2. Bifați **Adaugă și pentru celelalte _N_ grupe din _intervalul orar_**. Caseta de validare arată câte alte grupe sunt asociate acelui interval orar. Apare doar la adăugarea unei sesiuni noi și dacă cel puțin o altă grupă se întâlnește în acel moment.
3. Faceți clic pe **Salvează**.

Se creează o sesiune pentru grupa curentă și pentru fiecare dintre celelalte grupe din aceeași dată și același interval orar. Grupele care au deja o sesiune pentru acea dată și interval orar sunt omise, deci nu vor apărea duplicate.

:::tip
Puteți crea sesiuni pentru date din trecut ca să recuperați prezența pe care nu ați înregistrat-o încă, sau le puteți crea din timp, ca să fie pregătite când se întâlnește grupa.
:::

## Note la sesiune {#session-notes}

Fiecare sesiune poate avea note -- un rezumat al celor discutate, anunțuri sau cereri de rugăciune.

1. Când adăugați o sesiune sau după ce faceți clic pe iconița **Editare** (creion) de lângă o sesiune din listă, scrieți în caseta **Note (ce s-a discutat, anunțuri, cereri de rugăciune)** de sub dată. Bara de instrumente vă permite să adăugați text îngroșat, liste și linkuri.
2. Faceți clic pe **Salvează**.

Notele apar în partea de sus a listei de prezență a sesiunii. Ele sunt, de asemenea, notele de întâlnire pe care membrii grupei le citesc în secțiunea **Întâlniri** de pe pagina grupei din B1.church, unde liderii de grupă le pot scrie și edita. Consultați [Detaliile grupei](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marcarea prezenței

Selectați o sesiune pentru a vedea lista de prezență. Fiecare membru al grupei este listat cu o casetă de validare, sortat după numele de familie, iar cei deja înregistrați ca prezenți sunt bifați.

1. Bifați caseta de lângă fiecare persoană care a participat. Folosiți **Selectează tot** sau **Deselectează tot** pentru a modifica toate persoanele deodată.
2. Numărul de deasupra listei (de exemplu, „12 din 15 prezenți") se actualizează pe măsură ce bifați casetele.
3. Faceți clic pe **Salvează prezența**. Nimic nu este înregistrat până nu salvați, iar un mesaj confirmă când salvarea s-a încheiat. Dacă încercați să închideți sau să reîncărcați fila browserului cât timp o salvare este încă în curs, browserul vă avertizează mai întâi, pentru ca modificările să nu se piardă.

Debifarea unei persoane care fusese deja înregistrată ca prezentă și salvarea elimină persoana respectivă din sesiune.

### Adăugarea vizitatorilor

Pentru a înregistra o persoană care nu este membră a grupei, căutați-o în căutarea de persoane de lângă lista de prezență. Dacă nu se află încă în baza de date, o puteți crea din căutare. În ambele cazuri, persoana este adăugată în listă deja bifată. Faceți clic pe **Salvează prezența** pentru a o înregistra.

Persoanele care s-au înregistrat la un chioșc afișează un marcaj **Voluntar** sau **Oaspete**. Persoanele care nu sunt membre ale grupei afișează un marcaj **Oaspete**.

## Verificarea grupelor care mai au nevoie de prezență

Când mai multe clase se întâlnesc în același interval orar, puteți vedea dintr-o privire care dintre ele au încă nevoie ca prezența lor să fie introdusă pentru acea dată.

1. Deschideți o sesiune care are un interval orar.
2. Faceți clic pe **Cine mai are nevoie de prezență** în partea de sus a listei de prezență.
3. O fereastră listează fiecare grupă asociată acelui interval orar, cu un rezumat precum „5 din 8 grupe introduse" în partea de sus.

Grupele fără nicio persoană marcată ca prezentă pentru acea dată afișează un marcaj **Neintrodus** și sunt listate primele. Grupele care au prezență afișează **Introdus** cu numărul de persoane marcate ca prezente (de exemplu, „Introdus (12)"). Faceți clic pe numele unei grupe pentru a deschide sesiunile acelei grupe, cu sesiunea pentru aceeași dată deja selectată, ca să puteți înregistra prezența imediat. Dacă grupa nu are încă o sesiune pentru acea dată, se deschide lista sesiunilor ei, unde puteți adăuga una.

:::tip
Combinați aceasta cu **Tipărește toate clasele** și [adăugarea sesiunilor pentru fiecare clasă dintr-un interval orar](#adding-sessions-for-every-class-in-a-service-time): creați sesiunile, distribuiți foile de prezență, apoi folosiți **Cine mai are nevoie de prezență** ca să vedeți ce foi nu au fost introduse încă.
:::

## Tipărirea unei foi de prezență

O foaie de prezență este o listă de clasă care poate fi tipărită, pe care profesorii o pot marca de mână și o pot returna ca să o introduceți mai târziu. Fiecare foaie afișează logo-ul bisericii (**Logo pentru fundal deschis** din [Site web > Aspect](../website/appearance.md), dacă ați încărcat unul), cu numele bisericii dedesubt, clasa, o linie mare **Dată** sub numele clasei și intervalul orar. Membrii sunt listați în două coloane (citiți în jos coloana din stânga, apoi pe cea din dreapta), astfel încât încap mai multe nume pe pagină, iar fiecare membru are casetele **Prezent** și **Absent**. Există linii goale pentru vizitatori și o zonă **Profesor / Note**.

- **Dintr-o sesiune** -- Faceți clic pe iconița **Tipărește foaia de prezență** (imprimantă) din partea de sus a listei de prezență a sesiunii. Foaia are data sesiunii și afișează intervalul orar al acelei sesiuni.
- **Toate clasele pentru o slujbă** -- Dacă sesiunea are un interval orar, faceți clic pe **Tipărește toate clasele** pentru a imprima câte o foaie pentru fiecare clasă asociată acelui interval orar. Fiecare clasă se tipărește pe pagina ei.
- **Din lista membrilor** -- Pe pagina grupei, faceți clic pe **Toți membrii**, apoi faceți clic pe iconița **Tipărește foaia de prezență** de deasupra listei de membri și alegeți **Foaie de prezență** pentru a imprima o foaie fără dată. Același meniu are un aspect **Lista de contacte**, cu telefonul, adresa de e-mail și adresa fiecărui membru -- consultați [Tipărirea listei membrilor](../groups/group-members.md#printing-the-member-list).

Foaia se deschide într-o filă nouă, iar fereastra de tipărire a browserului apare automat.

## Exportul prezenței într-o foaie de calcul

Puteți descărca o evidență a sesiunii sub formă de fișier CSV, pentru a o folosi în Excel, Numbers sau Google Sheets.

1. Deschideți sesiunea pe care doriți să o exportați.
2. Faceți clic pe butonul **Exportă** de deasupra listei de prezență.
3. Deschideți fișierul descărcat în aplicația de calcul tabelar.

Fișierul are un rând pentru fiecare membru al grupei, cu numele său și dacă a fost prezent sau absent, plus data sesiunii și notele sesiunii.

## Vizualizarea prezenței înregistrate

După înregistrarea sesiunilor, datele apar în rapoartele de prezență.

- **Fila Tendința prezenței** (sub **Toti anii** de pe pagina Prezență) -- arată tendințele la nivelul întregii biserici în timp. Consultați [Urmărirea prezenței](tracking-attendance.md).
- **Fila Prezența pe grupe** -- arată prezența defalcată pe fiecare grupă în parte. Consultați [Rapoartele de prezență](../reports/attendance-reports.md#group-attendance).

:::tip
Dacă o sesiune pe care tocmai ați creat-o nu apare imediat în rapoarte, asigurați-vă că data sesiunii se încadrează în intervalul de date selectat în filtrele raportului.
:::
