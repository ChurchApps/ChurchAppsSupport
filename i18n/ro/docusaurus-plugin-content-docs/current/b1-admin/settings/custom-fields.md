---
title: "Câmpuri personalizate"
---

# Câmpuri personalizate

<div class="article-intro">

**Câmpurile personalizate** vă permit să urmăriți propriile informații pentru fiecare înregistrare de persoană, lucruri pentru care B1 nu are un câmp încorporat, cum ar fi data de expirare a verificării antecedentelor, mărimea tricoului sau starea cursului de botez. Definiți un câmp o singură dată în Setări, apoi completați o valoare în profilul fiecărei persoane și căutați sau creați liste pe baza lui. Aceasta înlocuiește soluția veche de a crea un formular pentru persoane doar pentru a stoca o singură informație personalizată.

</div>

## Video de instruire

<YouTube id="yUfDEbp2HQ4" title="Câmpuri personalizate, editare în masă și export în B1" next="Crearea grupurilor și adăugarea membrilor în B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea de editare pentru **Persoane** pentru a defini câmpuri și a completa valori, precum și de acces la zona **Setări**. Oricine are permisiunea de vizualizare a Persoanelor poate vedea valorile. Consultați [Roluri și permisiuni](./roles-permissions.md).
- Înainte de a începe, decideți ce doriți să urmăriți și ce tip se potrivește cel mai bine (text, un număr, o dată, un răspuns da/nu sau o listă de selecție).

</div>

## Deschiderea câmpurilor personalizate

În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus-stânga), alegeți **Setări > Setări** și faceți clic pe **Câmpuri personalizate** în lista din stânga, pentru a derula până la secțiunea **Câmpuri personalizate**. Puteți ajunge direct acolo și la adresa **/settings/custom-fields**. Veți vedea o listă cu toate câmpurile definite, afișând **Nume** și **Tip de câmp**. Dacă nu ați creat încă niciunul, panoul afișează mesajul *„No custom fields have been added yet.”*

## Adăugarea unui câmp

1. Faceți clic pe **Adaugă câmp**.
2. În editorul care se deschide în dreapta, introduceți un **Nume**. Acesta este eticheta pe care o vor vedea membrii personalului în profilurile persoanelor și în căutare (de exemplu, *Verificarea antecedentelor expiră*).
3. Alegeți un **Tip de câmp**:
   - **Casetă text**: text scurt, liber.
   - **Număr întreg**: numere fără zecimale (de exemplu, un număr de persoane).
   - **Zecimal**: numere care pot include zecimale.
   - **Dată**: o dată calendaristică.
   - **Da/Nu**: un răspuns simplu, da sau nu.
   - **Alegere multiplă**: o listă de selecție. Când alegeți acest tip, apare un **editor de opțiuni**, în care puteți adăuga fiecare opțiune din care pot alege persoanele.
4. Faceți clic pe **Salvează**.

Câmpul este acum disponibil în profilul fiecărei persoane.

:::info
Tipurile de câmp sunt aceleași ca tipurile de [întrebări din formulare](../forms/creating-forms.md), astfel încât valorile se comportă în mod consecvent în B1.
:::

## Editarea unui câmp

Faceți clic pe orice rând din listă pentru a redeschide câmpul în editor. Modificați numele, tipul sau opțiunile și faceți clic pe **Salvează**.

:::warning
Modificarea **Tipului de câmp** pentru un câmp care are deja valori (de exemplu, de la Casetă text la Dată) poate lăsa valorile introduse anterior într-un format care nu mai corespunde noului tip. Schimbați tipurile cu atenție după ce membrii personalului au început să completeze câmpul.
:::

## Ștergerea unui câmp

Deschideți un câmp pentru editare și faceți clic pe **Șterge**. Vi se va cere confirmarea: *„Are you sure you wish to delete this custom field? Its stored values will also be removed.”* Ștergerea unui câmp elimină definitiv câmpul **și fiecare valoare stocată pentru acesta** la toate persoanele. Acest lucru nu poate fi anulat.

## Completarea valorilor pentru o persoană

Odată ce există cel puțin un câmp personalizat, valorile acestuia apar alături de detaliile încorporate din înregistrarea fiecărei persoane. Le vedeți împreună cu datele de contact ale persoanei, în partea stângă a profilului, și le editați în același formular pe care îl folosiți pentru restul informațiilor despre persoană. Nu apare nimic în plus până nu definiți primul câmp.

1. Deschideți înregistrarea unei persoane din **Persoane**.
2. Faceți clic pe butonul **Editează** din partea stângă a profilului, sub datele de contact ale persoanei.
3. Derulați până la zona **Câmpuri personalizate** din partea de jos a formularului de editare și completați o valoare pentru fiecare câmp. Fiecare câmp afișează elementul de introducere potrivit tipului său: un selector de dată pentru câmpurile Dată, un meniu derulant da/nu pentru câmpurile Da/Nu, o listă de selecție pentru Alegere multiplă și așa mai departe.
4. Faceți clic pe **Salvează**. Valorile câmpurilor personalizate sunt salvate împreună cu restul detaliilor persoanei.

Înapoi în profil, orice câmp cu o valoare apare acum sub datele de contact ale persoanei, în forma *Nume câmp: valoare* (răspunsurile Da/Nu sunt afișate ca *Da* sau *Nu*, iar Alegerea multiplă afișează eticheta opțiunii). Câmpurile lăsate necompletate sunt pur și simplu ascunse. Pentru a elimina o valoare, editați persoana, goliți câmpul și salvați. O valoare goală este ștearsă din înregistrare, nu stocată ca gol.

:::tip
Cazul clasic de utilizare este siguranța voluntarilor. Creați un câmp de tip **Dată** numit *Verificarea antecedentelor expiră*, introduceți data pentru fiecare voluntar, apoi creați o [listă salvată](../people/lists.md) care semnalează persoanele a căror dată a trecut.
:::

## Căutarea și crearea listelor pe baza câmpurilor personalizate

Câmpurile personalizate pot fi căutate complet:

1. Pe pagina **Persoane**, deschideți [Căutarea avansată](../people/searching-people.md).
2. Extindeți categoria **Câmpuri personalizate**.
3. Bifați câmpul după care doriți să filtrați, alegeți un operator și introduceți o valoare. Operatorii disponibili corespund tipului câmpului:
   - **Casetă text**: conține, este egal cu, începe cu, se termină cu.
   - **Număr întreg / Zecimal**: este egal cu, mai mare decât, mai mare sau egal cu, mai mic decât, mai mic sau egal cu.
   - **Dată**: este egal cu, după (mai mare decât), înainte de (mai mic decât).
   - **Da/Nu**: este egal cu Da sau Nu.
   - **Alegere multiplă**: este egal cu sau conține una dintre opțiuni.

Salvați orice căutare pe câmpuri personalizate ca [listă](../people/lists.md). Listele sunt interogări active, astfel încât o listă creată pe baza *Verificarea antecedentelor expiră este înainte de azi* verifică din nou fiecare persoană de fiecare dată când o deschideți. Nu este necesară nicio întreținere manuală.

## Afișarea unui câmp personalizat ca o coloană

Pentru a vedea valorile unui câmp pentru toată lumea deodată, adăugați-l ca o coloană pe pagina **Persoane**. Schimbați **Afișare ca** la **Tabel**, faceți clic pe pictograma **Selectare coloane** din antetul paginii, treceți la fila **Personalizat** și bifați câmpul. Valoarea fiecărei persoane apare într-o coloană separată, lângă cele încorporate. Consultați [Afișarea câmpurilor personalizate ca coloane](../people/searching-people.md#showing-custom-fields-as-columns).

## Ce se întâmplă la îmbinare

Când [îmbinați două înregistrări de persoane](../people/adding-people.md), valorile câmpurilor personalizate se transferă automat. Persoana pe care o păstrați își păstrează propriile valori. Pentru orice câmp la care avea valoare doar persoana eliminată, acea valoare este copiată, astfel încât să nu se piardă nimic.

## Articole conexe

- [Căutarea persoanelor](../people/searching-people.md): căutarea avansată, inclusiv categoria Câmpuri personalizate, și afișarea câmpurilor personalizate ca coloane
- [Liste salvate](../people/lists.md): salvați o căutare pe câmpuri personalizate și rulați-o din nou în timp real
- [Roluri și permisiuni](./roles-permissions.md): cine poate defini câmpuri și edita valori
- [Crearea formularelor](../forms/creating-forms.md): pentru colectarea datelor prin mai multe întrebări, unde un formular complet se potrivește mai bine decât câmpuri individuale
