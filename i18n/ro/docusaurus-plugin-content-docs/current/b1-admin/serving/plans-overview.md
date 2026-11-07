---
title: "Prezentarea generală a planurilor"
description: "Vezi alocările voluntarilor pe mai multe date din B1 Admin, identifică pozițiile neocupate și completează sau trimite email echipei dintr-un singur tabel."
---

# Prezentarea generală a planurilor

<div class="article-intro">

Prezentarea generală a planurilor vă oferă o vedere de ansamblu asupra tuturor atribuirilor voluntarilor pentru mai multe date de slujbă, simultan. În loc să deschideți fiecare plan separat, puteți vedea cine slujește în fiecare poziție pentru săptămânile viitoare, într-un singur tabel, și puteți identifica rapid golurile care mai trebuie completate.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Creați cel puțin un minister și un tip de plan în zona Slujire
- Creați [planuri de slujbă](./plans.md) cu date și atribuiri de voluntari
- Asigurați-vă că voluntarii dvs. au fost adăugați în [directorul de persoane](../people/adding-people.md)

</div>

## Accesarea prezentării generale

1. În B1 Admin, deschideți [meniul de navigare rapidă](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus), extindeți **Slujire** și faceți clic pe **Planuri**.
2. Selectați o **filă de minister** din partea de sus a paginii.
3. Faceți clic pe **Prezentare generală** de lângă tipul de plan din lista **Tipuri de plan**, sau deschideți tipul de plan și faceți clic pe **Prezentare generală** din partea de sus a paginii.

Prezentarea generală se referă la tipul de plan din care ați deschis-o. Faceți clic pe numele tipului de plan din partea de sus a prezentării generale pentru a reveni la lista sa de planuri.

## Citirea tabelului prezentării generale

Prezentarea generală afișează un tabel în care:

- **Rândurile** reprezintă fiecare poziție (de exemplu, „Muzică: Chitară”, „Tehnic: Proiecție”), grupate pe categorii
- **Coloanele** reprezintă datele de slujbă viitoare (de exemplu, „14 apr.”, „21 apr.”)
- **Celulele** afișează numele voluntarului atribuit acelei poziții în acea dată

Celulele evidențiate cu **roșu** nu sunt completate: niciun voluntar nu a fost încă atribuit. Acest lucru vă permite să vedeți cu o privire golurile de personal, fără a deschide fiecare plan în parte.

:::tip
Numele voluntarilor sunt afișate într-un format scurtat (prenumele și inițiala numelui de familie, de exemplu „Ion D.”), pentru ca tabelul să rămână compact atunci când aveți multe poziții.
:::

## Atribuirea voluntarilor direct din prezentarea generală

Nu trebuie să deschideți planuri individuale pentru a completa locurile libere. Faceți clic pe orice celulă din tabel pentru a deschide un panou de atribuire pentru acea poziție și acea dată. De acolo puteți:

- Selecta o persoană din echipa dvs. pentru a o atribui poziției
- Face clic pe **Elimină** de lângă oricine este deja atribuit, pentru a-l scoate din acel loc
- Salva modificarea fără a părăsi prezentarea generală

Astfel, puteți completa un întreg program dintr-o singură trecere: lucrați pe mai multe săptămâni și poziții fără a intra și a ieși din planurile individuale.

## Programarea automată din prezentarea generală

Faceți clic pe **Programare automată** pentru ca B1 să completeze simultan toate celulele libere din tabelul curent. Pentru fiecare plan vizibil, aplicația caută candidați din grupul asociat fiecărei poziții și completează automat locurile libere, raportând câte dintre planurile vizibile a reușit să le completeze. Planurile sunt completate pe rând, astfel încât același voluntar să nu fie programat din greșeală în două date diferite în aceeași trecere.

:::info
Programarea automată completează doar locurile care sunt deja libere. Nu înlocuiește niciodată o atribuire existentă.
:::

## Trimiterea e-mailurilor tuturor persoanelor programate

Faceți clic pe **Trimite e-mail voluntarilor** pentru a trimite o notificare fiecărui voluntar atribuit oriunde în intervalul de date și ministerul filtrate, dintr-o singură acțiune, în loc să trimiteți e-mailuri plan cu plan. B1 raportează câte e-mailuri au fost trimise și câte au eșuat.

## Trimiterea de SMS-uri tuturor persoanelor programate

Dacă biserica dvs. are conectat un [furnizor de SMS](../settings/church-settings.md#texting) și aveți dreptul atât să editați planuri, cât și să trimiteți mesaje, în partea de sus a prezentării generale apare butonul **Trimite SMS voluntarilor**.

1. Faceți clic pe **Trimite SMS voluntarilor**.
2. Dialogul afișează câți voluntari vor primi mesajul (de exemplu, „12 din 14 voluntari vor primi acest mesaj”), precum și câți s-au dezabonat de la mesaje și câți nu au un număr de telefon înregistrat.
3. Scrieți **Mesajul** dvs. Puteți face clic pe un marcaj de înlocuire pentru a insera numele fiecărui voluntar sau numele bisericii dvs.
4. Faceți clic pe **Trimite**. B1 raportează câte mesaje au fost trimise.

Fiecare voluntar atribuit în intervalul de date primește un singur SMS, la numărul de mobil din profilul său, chiar dacă slujește în mai multe date. Persoanele care au același număr de telefon (de exemplu, un telefon de familie) primesc un singur SMS. Voluntarii care au răspuns STOP la un mesaj anterior sunt omiși.

:::info
Mesajele sunt trimise prin furnizorul de SMS al bisericii dvs., deci se aplică tarifele acestuia. Dacă biserica dvs. nu mai are credite pentru SMS, trimiterea se oprește, iar dialogul vă informează. Un singur mesaj poate ajunge la cel mult 200 de voluntari; restrângeți intervalul de date dacă aveți mai mulți.
:::

## Evidențierea programului unui voluntar

Folosiți lista derulantă **Evidențiază** pentru a alege o persoană din echipa dvs. Fiecare celulă în care este atribuită va fi marcată în tabel, astfel încât să vedeți unde slujește deja înainte de a o adăuga la alt loc. Alegeți **Toți** pentru a dezactiva evidențierea.

## Filtrarea prezentării generale

Puteți ajusta ce afișează prezentarea generală folosind comenzile de deasupra tabelului. Tabelul se actualizează imediat ce le modificați.

- **Toate pozițiile / Doar neocupate**: alegeți **Doar neocupate** pentru a ascunde rândurile în care toate datele sunt deja completate, ca să vă concentrați doar pe pozițiile care mai au nevoie de un voluntar.
- **Data de început / Data de sfârșit**: implicit, prezentarea generală afișează 12 săptămâni în viitor. Introduceți date personalizate pentru a extinde sau a restrânge intervalul.

## Exportul în CSV

Faceți clic pe **Exportă CSV** pentru a descărca tabelul curent ca foaie de calcul. Exportul include toate pozițiile și atribuirile voluntarilor pentru intervalul de date filtrat, ceea ce facilitează partajarea cu liderii ministerelor sau tipărirea pentru întâlnirile de planificare.

:::info
Exportul CSV reflectă filtrele aplicate în momentul respectiv: în descărcare sunt incluse doar datele și tipul de plan afișate în tabel.
:::

## Articole înrudite

- [Planuri de slujbă](./plans.md): creați și gestionați planuri de slujbă individuale
- [Ordinea slujbei](./service-order.md): construiți ordinea slujbei în cadrul unui plan
- [Programarea lecțiilor](./scheduling-lessons.md): programați lecțiile alături de planurile de slujbă
