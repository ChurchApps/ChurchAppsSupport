---
title: "Căutarea persoanelor"
---

# Căutarea persoanelor

<div class="article-intro">

Pagina **Persoane** afișează directorul bisericii ca o listă căutabilă de gospodării sau ca un tabel sortabil cu persoane individuale. Puteți găsi rapid pe oricine din comunitate, personaliza informațiile afișate și exporta rezultatele. Căutarea eficientă este esențială pentru sarcinile zilnice de administrare a bisericii, cum ar fi urmărirea vizitatorilor, pregătirea listelor de contact și gestionarea fișelor membrilor.

</div>

## Videoclip de instruire

<YouTube id="7Y-tN9RmnDQ" title="Căutarea persoanelor și crearea listelor în B1" next="Câmpuri personalizate, editarea în masă și exportul în B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de un cont activ B1 Admin cu permisiunea de a vedea persoane. Consultați [Roluri și permisiuni](roles-permissions.md) dacă nu sunteți sigur de nivelul dvs. de acces.
- Directorul bisericii ar trebui să conțină persoane. Dacă nu ați adăugat încă pe nimeni, consultați [Adăugarea persoanelor](adding-people.md) sau [Importarea datelor](importing-data.md).

</div>

## Gospodării și vizualizările de tabel

Pagina Persoane listează directorul pe **gospodării**, grupate alfabetic. Fiecare rând afișează fotografiile gospodăriei, numele acesteia (de exemplu, „Familia Smith”) și numele tuturor membrilor. Faceți clic pe o gospodărie pentru a deschide profilul capului de familie sau faceți clic pe numele unui membru pentru a deschide profilul acelei persoane. Un contor deasupra listei arată câte gospodării și persoane sunt afișate.

Folosiți comutatorul **Vizualizare ca** de deasupra listei pentru a trece între **Gospodării** și **Tabel**. Vizualizarea **Tabel** listează câte o persoană pe rând și este locul unde puteți sorta și alege coloanele (vezi mai jos). B1 reține alegerea dvs. pe acest dispozitiv.

În vizualizarea **Tabel**, statusul de membru al fiecărei persoane apare sub nume, iar fiecare dintre cele șapte statusuri are propria culoare, aceeași folosită pe profilul persoanei. Oricine are rolul din gospodărie setat la **Copil** are, de asemenea, o etichetă **Copil** lângă status. Pentru a marca cineva ca fiind copil, setați rolul acestuia din [panoul gospodăriei](./adding-people.md#managing-households) de pe profilul său.

Implicit, pagina încarcă prima parte a directorului. Dacă aveți mai multe persoane, faceți clic pe **Afișează toți membrii** de sub listă pentru a le încărca pe toate.

## Căutare rapidă

Caseta **Găsiți o gospodărie sau o persoană** din partea de sus a paginii Persoane vă permite să găsiți membrii în timp real:

1. Faceți clic pe **caseta de căutare** din partea de sus a paginii Persoane.
2. Începeți să scrieți un nume.
3. Rezultatele se filtrează automat pe măsură ce scrieți (există o scurtă întârziere de aproximativ o jumătate de secundă, astfel încât căutarea să nu se execute la fiecare apăsare de tastă).
4. Lista de dedesubt se actualizează și afișează doar rezultatele potrivite.

Faceți clic pe **Șterge** (sub caseta de căutare) pentru a reseta căutarea și a afișa din nou întregul director.

:::tip
Nu trebuie să apăsați Enter. Căutarea se execută automat după ce încetați să scrieți.
:::

## Sortarea rezultatelor

În vizualizarea **Tabel**, persoanele sunt listate după numele de familie, apoi după prenume. Puteți sorta directorul altfel făcând clic pe orice antet de coloană:

1. Faceți clic pe un **antet de coloană** (de exemplu, **Nume** sau **E-mail**) pentru a sorta după acea coloană.
2. Faceți clic din nou pe același antet pentru a inversa ordinea sortării.

Astfel, este ușor să găsiți persoane în ordine alfabetică, după vârstă sau după orice altă coloană vizibilă.

## Personalizarea coloanelor

Nu toate informațiile trebuie să fie vizibile deodată. Puteți alege ce coloane apar în tabel:

1. Faceți clic pe pictograma **Selectați coloanele** din antetul paginii Persoane. (Coloanele se aplică vizualizării **Tabel**.)
2. Bifați sau debifați coloanele pentru a le afișa sau ascunde. Coloanele disponibile includ:
   - **Fotografie**
   - **Nume**
   - **E-mail**
   - **Telefon**
   - **Adresă**
   - **Data nașterii**
   - **Vârstă**
   - **Gen**
   - **Statusul de membru**
   - **Campus**
   - **Data adăugării** -- când a fost creată fișa persoanei
3. Tabelul se actualizează imediat pentru a reflecta selecțiile dvs. Faceți clic pe **Gata** pentru a închide fereastra **Selectați coloanele**.

### Afișarea câmpurilor personalizate ca coloane

Selectorul de coloane are două file: **Standard** conține coloanele integrate listate mai sus, iar **Personalizate** conține [Câmpurile personalizate](../settings/custom-fields.md) ale bisericii dvs., împreună cu întrebările din eventualele formulare pentru persoane. Bifați un câmp personalizat din fila **Personalizate** pentru a-l adăuga ca coloană, iar valoarea fiecărei persoane pentru acest câmp va apărea în tabel. Valorile sunt afișate la fel ca pe profilul persoanei: câmpurile Da/Nu afișează *Da* sau *Nu*, câmpurile cu alegere multiplă afișează eticheta opțiunii, iar datele sunt afișate ca date scurte. Persoanele fără valoare pentru câmp au o celulă goală.


## Exportarea rezultatelor căutării

Puteți descărca rezultatele curente ale căutării ca fișier CSV în orice moment:

1. Aplicați orice căutare sau filtre doriți.
2. Faceți clic pe butonul **Exportă** din antetul paginii Persoane.
3. Un fișier CSV se va descărca pe calculatorul dvs., gata de deschis în Excel, Google Sheets sau orice altă aplicație pentru foi de calcul.

Pentru mai multe detalii despre export, consultați [Exportarea datelor](./exporting-data.md).

:::tip
Pentru interogări mai avansate -- cum ar fi găsirea tuturor persoanelor care nu au participat în ultimele trei luni -- încercați funcția [Căutare AI](./ai-search.md), care vă permite să căutați folosind întrebări formulate în limbaj natural.
:::

## Căutare avansată

Căutarea avansată vă permite să construiți filtre precise combinând condiții. Deschideți-o făcând clic pe **Avansat** sub caseta de căutare de pe pagina Persoane, apoi extindeți o categorie și bifați câmpurile după care doriți să filtrați (puteți face clic pe numele câmpului sau pe caseta sa de bifare), alegând pentru fiecare un operator și o valoare. Categoriile includ **Nume**, **Demografie**, **Contact**, **Membru**, **Activitate** (donații și prezență) și **Câmpuri personalizate**.

Pentru a găsi persoane noi, deschideți **Membru** și bifați **Data adăugării**. Filtrul pornește cu **în ultimele N zile** și valoarea 30 completată, astfel încât să găsiți dintr-un singur clic pe toți cei adăugați în ultima lună. Puteți schimba numărul de zile sau puteți trece la *este egal cu / după / înainte de* pentru a alege o dată. **Data nașterii** și **Aniversarea** oferă, de asemenea, opțiunea **în ultimele N zile**. Data adăugării este înregistrată doar pentru persoanele create de la sfârșitul lunii octombrie 2026; persoanele adăugate mai devreme nu au dată, deci acest filtru nu le va găsi.

Categoria **Câmpuri personalizate** listează [Câmpurile personalizate](../settings/custom-fields.md) ale bisericii dvs. -- câmpurile pe care le definiți în Setări pentru a urmări informații proprii (cum ar fi data expirării verificării cazierului). Operatorii oferiți corespund tipului fiecărui câmp: câmpurile text acceptă *conține / este egal cu / începe cu / se termină cu*, câmpurile numerice acceptă operatorii de comparație, câmpurile de dată acceptă *este egal cu / după / înainte de*, iar câmpurile Da/Nu și cu alegere multiplă vă permit să selectați o valoare. Orice câmp după care puteți filtra aici poate fi salvat ca o [Listă](./lists.md) activă.

## Salvarea căutărilor ca liste

După ce efectuați o căutare, butonul **Salvează ca listă** apare în antetul paginii Persoane. Faceți clic pe el pentru a salva interogarea curentă sub un nume și, opțional, o categorie, astfel încât să o puteți reîncărca instant în sesiunile viitoare. Consultați [Liste salvate](./lists.md) pentru detalii complete.
