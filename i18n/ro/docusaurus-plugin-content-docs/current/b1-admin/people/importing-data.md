---
title: "Importarea datelor"
description: "Aduceți persoane, grupuri, prezență și donații existente în B1 Admin cu instrumentul B1 Transfer sau exportați oricând o copie de rezervă a datelor."
---

# Importarea datelor

<div class="article-intro">

Instrumentul B1 Transfer îți permite să aduci cu ușurință datele existente în B1, indiferent dacă începi de la zero dintr-o foaie de calcul, migrezi de pe o altă platformă de administrare a bisericii sau importi înregistrările de donații. Poate fi folosit și pentru a exporta sau a face o copie de rezervă a datelor tale oricând.

</div>

## Videoclip de instruire

<YouTube id="G-VnhzACYIU" title="Importarea bazei de date cu persoane în B1" next="Căutarea persoanelor și crearea listelor în B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Ai nevoie de un cont activ B1 Admin cu acces la **Setări**.
- Ai nevoie ca datele tale să fie exportate și pregătite din sistemul anterior, înainte de a începe.
- Acest instrument este destinat migrării inițiale a datelor. Dacă folosești deja B1 de ceva timp, o nouă importare poate crea înregistrări duplicate.

</div>

## Accesarea instrumentului de transfer

1. Autentifică-te în **B1 Admin**.
2. Deschide [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus), extinde **Setări** și fă clic pe **Setări**.
3. Fă clic pe linkul **Import/Export** de sub numele bisericii tale, în partea de sus a meniului de setări din stânga.
4. Aceasta va deschide instrumentul **B1 Transfer** într-o filă nouă, la adresa [transfer.b1.church](https://transfer.b1.church).

Instrumentul de transfer te ghidează prin patru pași: Sursă, Previzualizare, Destinație și Rulare.

---

## Pasul 1 - Alege sursa

Selectează de unde provin datele tale. Există șapte opțiuni:

- **Baza de date B1** — Preia datele direct din biserica ta existentă în B1. Este utilă pentru a face o copie de rezervă sau pentru a converti datele într-un alt format. Trebuie să fii autentificat pentru a folosi această opțiune.
- **Arhivă ZIP de import B1** — Un fișier zip în formatul propriu B1. Este folosită în principal pentru a restaura un export anterior din B1. Încărcarea unei arhive ZIP de export B1 înapoi în **Baza de date B1** restabilește tot ce conține exportul (vezi [Exportarea datelor](./exporting-data.md#full-data-export-from-settings)). Dacă fișierul nu poate fi citit, instrumentul afișează eroarea în loc să pornească de la început.
- **Arhivă ZIP de import Breeze** — Un fișier zip care conține fișiere exportate din Breeze ChMS.
- **Arhivă ZIP Planning Center** — Un fișier zip sau CSV exportat din Planning Center.
- **CSV / Excel personalizat** — Orice fișier CSV sau Excel care conține date despre persoane. După încărcare, vei potrivi coloanele cu câmpurile B1 înainte ca importul să continue.
- **CSV Tithe.ly** — Un fișier de export cu persoane sau donații din Tithe.ly (sunt acceptate formatele CSV sau Excel).
- **CSV CCB / Pushpay** — Un fișier CSV de export cu persoane sau donații din Church Community Builder sau Pushpay.

Poți trage fișierul în zona de încărcare sau poți face clic pentru a-l căuta.

---

## Pasul 1b - Mapează câmpurile (doar pentru CSV / Excel personalizat)

Dacă ai selectat **CSV / Excel personalizat**, după ce încarci fișierul, instrumentul afișează un ecran de mapare a câmpurilor înainte de a trece la previzualizare.

Fiecare coloană din fișierul tău este listată alături de o valoare de exemplu. Pentru fiecare coloană, folosește meniul derulant pentru a alege câmpul B1 corespunzător. Instrumentul detectează automat denumirile comune ale coloanelor, precum „First Name”, „Email” sau „Zip Code”, dar ar trebui să verifici fiecare rând și să corectezi ce a ratat.

Câmpurile B1 disponibile includ:

- First Name (Prenume), Last Name (Nume), Middle Name (Al doilea prenume), Nickname (Poreclă), Display Name (Nume afișat), Title/Prefix (Titlu/Prefix), Suffix (Sufix)
- Email, Home Phone (Telefon acasă), Mobile Phone (Telefon mobil), Work Phone (Telefon de serviciu)
- Address Line 1 (Adresa, rândul 1), Address Line 2 (Adresa, rândul 2), City (Oraș), State (Județ/Stat), Zip Code (Cod poștal)
- Birth Date (Data nașterii), Anniversary (Aniversare), Gender (Gen), Marital Status (Starea civilă), Membership Status (Statutul de membru)
- Household/Family Name (Numele gospodăriei/familiei)
- Group Name (Numele grupului) — atribuie persoana unui grup după nume
- **Custom Field (match by name)** — salvează coloana într-unul dintre [câmpurile personalizate pentru persoane](../settings/custom-fields.md) ale bisericii tale. Apare o casetă **B1 field name** (Numele câmpului B1), completată cu antetul coloanei. Modific-o astfel încât să fie exact numele câmpului așa cum apare în B1 (literele mari și mici nu contează).
- **Form Answer (custom field)** — salvează valoarea acelei coloane ca un câmp personalizat atașat înregistrării persoanei. Dacă folosești această opțiune, ți se va cere să dai un nume formularului.

Datele pot fi în formate comune, precum `9/17/1994`, și sunt convertite automat. Pentru câmpurile personalizate, câmpurile Da/Nu acceptă valori precum Yes, No, Y, N, True, False, 1 și 0, iar câmpurile cu alegere multiplă acceptă fie textul alegerii, fie valoarea acesteia.

:::info
Creează-ți câmpurile personalizate pentru persoane în B1 Admin înainte de import. Când importul se termină, pasul **Câmpuri personalizate** listează toate denumirile de coloane care nu corespund unui câmp B1 și numără valorile care nu se potrivesc cu tipul câmpului. Aceste valori sunt omise, iar restul importului se finalizează normal.
:::

Coloanele pe care nu dorești să le imporți pot fi setate la **(Omite)**. Cel puțin un câmp de nume (First Name sau Last Name) trebuie mapat înainte de a putea continua.

Fă clic pe **Confirmă maparea și importă** pentru a trece la previzualizare.

---

## Pasul 2 - Previzualizează datele

După încărcare, instrumentul afișează o previzualizare a tuturor datelor care vor fi importate. Folosește filele pentru a verifica fiecare tip de date:

- **Persoane** — Listate pe gospodărie, cu fotografii, dacă au fost incluse.
- **Grupuri** — Organizate pe campus, serviciu, oră și categorie.
- **Prezențe** — Datele sesiunilor, grupurile și numărul de vizite.
- **Donații** — Loturi, fonduri, donatori și sume.
- **Formulare** — Denumirile formularelor și tipurile de conținut.

Verifică cu atenție înainte de a continua. Dacă ceva nu arată bine, fă clic pe **Începe din nou** și corectează fișierul sursă.

---

## Pasul 3 - Alege destinația

Selectează unde vrei să ajungă datele:

- **Baza de date B1** — Importă direct în baza de date B1 a bisericii tale. După ce selectezi această opțiune, instrumentul afișează numărul final de înregistrări care vor fi adăugate. Fă clic pe **Începe transferul** pentru a confirma.
- **Arhivă ZIP de export B1** — Descarcă datele tale ca fișier zip în format B1, care poate fi restaurat ulterior cu **Arhivă ZIP de import B1**. Este potrivită pentru copii de rezervă.
- **Arhivă ZIP de export Breeze** — Convertește datele tale în format Breeze.
- **Arhivă ZIP Planning Center** — Convertește datele tale în format Planning Center.

:::warning
Sursa și destinația nu pot fi același format. Dacă sunt identice, instrumentul te va avertiza pentru a preveni duplicarea accidentală.
:::

---

## Pasul 4 - Rulare

Instrumentul procesează transferul și afișează progresul pentru fiecare pas:

- Campusuri, Servicii și Ore
- Persoane
- Fotografii
- Grupuri și membrii grupurilor
- Donații
- Prezențe
- Formulare, Întrebări, Răspunsuri și Trimiteri de formulare
- Câmpuri personalizate (când ai mapat orice coloane de tip Câmp personalizat)
- Comprimare (doar pentru destinațiile de tip arhivă zip)

Când destinația este **Baza de date B1**, cardul de progres se numește **Progres import** și se termină cu **Import finalizat!** (sau **Import finalizat cu erori**). Pentru destinațiile de tip arhivă zip, aceleași mesaje folosesc cuvântul **Export**.

:::info
Când restaurezi o **Arhivă ZIP de import B1**, înregistrările care indică spre ceva ce nu mai există în fișier sunt omise, în loc să oprească importul: apartenențele la grupuri ale unor persoane sau grupuri care nu există în arhivă, prezențele pentru grupuri sau persoane șterse și legăturile dintre grupuri și orele de serviciu șterse. Sesiunile de prezență care nu au fost niciodată legate de o oră de serviciu sunt totuși restaurate. De asemenea, la export, o fotografie care nu poate fi descărcată sau citită este lăsată deoparte, astfel încât pasul **Fotografii** să continue.
:::

:::warning
Nu închide browserul în timp ce transferul rulează. Așteaptă până când toți pașii apar ca finalizați.
:::

---

## Pregătirea unei arhive ZIP de import Breeze

1. În Breeze, mergi la **Setări** și fă clic pe **Export** în bara laterală din stânga.
2. Exportă trei fișiere separate: **People** (Persoane), **Tags** (Etichete) și **Contributions** (Contribuții).
3. Selectează toate cele trei fișiere, fă clic dreapta și comprimă-le într-un singur fișier zip.
   - Pe Mac: selectează fișierele, fă clic dreapta și alege **Compress** (Comprimă).
   - Pe PC: selectează fișierele, fă clic dreapta, alege **Send to** (Trimite către), apoi **Compressed (zipped) folder** (Folder comprimat (zip)).
4. Încarcă fișierul zip folosind opțiunea **Arhivă ZIP de import Breeze** din Pasul 1.

Importul din Breeze transferă automat persoanele, grupurile (etichetele) și înregistrările de donații.

---

## Pregătirea unui export din Planning Center

1. Autentifică-te în Planning Center și deschide produsul **People** (Persoane).
2. În bara laterală din stânga, fă clic pe **Lists** (Liste) și creează o listă care include toate persoanele pe care vrei să le transferi. (Dacă ai deja o listă cu întreaga congregație, folosește-o pe aceasta.)
3. Deschide lista și folosește opțiunea sa **export** pentru a descărca persoanele ca fișier **CSV**. Include câmpurile pe care vrei să le păstrezi: numele, emailul, telefonul, adresa, data nașterii, genul și statutul de membru se mapează toate către B1.
4. Dacă Planning Center îți oferă mai multe fișiere, selectează-le pe toate, fă clic dreapta și comprimă-le într-un singur zip.
   - Pe Mac: selectează fișierele, fă clic dreapta și alege **Compress** (Comprimă).
   - Pe PC: selectează fișierele, fă clic dreapta, alege **Send to** (Trimite către), apoi **Compressed (zipped) folder** (Folder comprimat (zip)).
5. Încarcă fișierul CSV sau zip folosind opțiunea **Arhivă ZIP Planning Center** din Pasul 1.

După încărcare, continuă la previzualizare și confirmă că persoanele și gospodăriile tale arată corect înainte de a rula importul.

---

## Pregătirea unui export din Tithe.ly

1. În Tithe.ly, exportă datele **People** (Persoane) ca fișier CSV sau Excel. Poți exporta și un fișier separat **Giving** (Donații), dacă dorești să importi și înregistrările de donații.
2. Instrumentul va detecta automat dacă fișierul conține date despre persoane sau despre donații, pe baza denumirilor coloanelor.
3. Încarcă fișierul folosind opțiunea **CSV Tithe.ly** din Pasul 1.

:::info
Exporturile din Tithe.ly pot fi importate câte un fișier pe rând. Rulează procesul de două ori dacă trebuie să imporți separat persoanele și donațiile.
:::

---

## Pregătirea unui export din CCB sau Pushpay

1. În Church Community Builder sau Pushpay, exportă datele **People** (Persoane) ca fișier CSV. Poți exporta și un fișier separat cu donații sau contribuții.
2. Instrumentul va detecta automat dacă fișierul conține date despre persoane sau despre donații, pe baza denumirilor coloanelor.
3. Încarcă fișierul folosind opțiunea **CSV CCB / Pushpay** din Pasul 1.

---

## După import

Odată ce transferul s-a încheiat, dedică câteva minute verificării datelor:

1. Parcurge pagina [Persoane](../people/adding-people.md) și verifică la întâmplare câteva profiluri.
2. Confirmă că numele, adresele de email, numerele de telefon și adresele au fost importate corect.
3. Verifică dacă legăturile dintre gospodării sunt intacte. Rolul fiecărei persoane în gospodărie (Head, Spouse, Child sau Other) este preluat atunci când sursa îl conține: coloana **householdRole** dintr-o arhivă ZIP de import B1, **Family Role** din Breeze sau Tithe.ly și **Family Position** din CCB / Pushpay. Roluri precum „Head of Household”, „Primary”, „Wife” sau „Son” sunt convertite în rolul B1 corespunzător. Importurile din Planning Center și din CSV / Excel personalizat nu au o coloană de rol, așa că acele persoane sunt setate la **Other**; poți schimba rolul din gospodăria persoanei, din pagina [Persoane](../people/adding-people.md#managing-households).
4. Verifică grupurile importate și înregistrările de donații.

Dacă observi probleme, poți edita profilurile individuale din pagina Persoane. Poți, de asemenea, rula din nou instrumentul de transfer pentru a [exporta datele](exporting-data.md) ca o copie de rezervă.
