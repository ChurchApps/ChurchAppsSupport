---
title: "Planuri de slujire"
description: "Configurează programarea voluntarilor în B1 Admin: creează planuri pe date, copiază din săptămâni anterioare, alocă echipa și gestionează termene și reamintiri."
---

# Planuri de slujire

<div class="article-intro">

Planurile de slujire organizează cine slujește și când. Fiecare plan este legat de o dată și un minister anume, ceea ce face mai ușoară coordonarea echipelor de voluntari săptămână de săptămână și asigurarea că fiecare slujbă are personal complet.

</div>

## Videoclip de instruire

<YouTube id="47DstBXKl74" title="Crearea planurilor și programarea voluntarilor în B1" next="Construirea ordinii slujbei și a bibliotecii de cântece în B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați ministerele și echipele în zona Slujire
- Asigurați-vă că voluntarii au fost adăugați în [directorul de persoane](../people/adding-people.md) și au fost repartizați în echipe

</div>

## Accesarea planurilor

1. În B1 Admin, deschideți [meniul Salt](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus), extindeți **Slujire** și faceți clic pe **Planuri**.
2. Selectați un **tab de minister** din partea de sus a paginii.
3. Faceți clic pe un **tip de plan** pentru a vedea lista planurilor din acel tip. Folosiți **Viitoare** și **Trecute** deasupra listei pentru a comuta între planurile viitoare și cele anterioare. **Viitoare** afișează planurile de la data de azi încolo, cele mai apropiate primele, iar planurile fără dată sunt la sfârșit. **Trecute** afișează doar planurile anterioare, cele mai recente primele.
4. Faceți clic pe un plan anume pentru a-l deschide.

Fiecare pagină de plan conține linkuri către tipul său de plan și către **Planuri**, astfel încât să puteți reveni fără să folosiți butonul de înapoi al browserului.

:::info
Nu este necesar acces complet de administrator pentru a gestiona planurile. Oricine este membru al unui minister poate accesa zona Slujire și poate crea, edita și programa planuri pentru propriul minister, fără a avea nevoie de permisiunea Plans Edit. Editorii cu rolul Plans Edit pot gestiona planurile din toate ministerele.
:::

## Crearea unui plan

1. De pe pagina tipului de plan, faceți clic pe **Plan nou** din partea de sus a paginii.
2. Dați planului un nume sau folosiți data ca nume. Selectați **data** slujbei.
3. Dacă ministerul dumneavoastră are [șabloane](./plan-templates.md), puteți alege unul la **Începe din șablon** pentru a completa ordinea slujbei, pozițiile și notele dintr-un singur pas.
4. Altfel, dacă doriți să copiați dintr-un plan anterior, folosiți **Copiază din planul anterior** pentru a alege **Doar poziții** sau **Poziții și atribuiri**. Dacă nu doriți să copiați, alegeți **Nimic**. Puteți bifa și **Copiază ordinea slujbei**. Când copiați dintr-un plan anterior, noul plan păstrează și **Notele**, **Termenul limită de înscriere**, opțiunea **Afișează numele voluntarilor pe pagina de înscriere** și setarea de înlocuire automată ale planului respectiv, astfel încât să nu le mai introduceți în fiecare săptămână. Le puteți modifica pe oricare în setările noului plan.
5. Pentru a configura mai multe planuri deodată în timp ce copiați, alegeți **Repetă la fiecare** și **Frecvența** (Zi, Săptămână sau Lună), apoi introduceți **Numărul de planuri** (până la 12). Pentru Lună, **În** vă permite să păstrați aceeași zi a lunii sau aceeași zi a săptămânii, de exemplu a doua sâmbătă. B1 afișează datele înainte de salvare și creează câte un plan pentru fiecare dată, fiecare copiat după cel dinainte. Dacă planul este denumit după dată, fiecare plan nou primește numele propriei date.
6. Opțional, setați **Termenul limită de înscriere (ore înainte de slujbă)**. Un plan nou pornește cu termenul limită al planului anterior, pe care îl puteți modifica aici. Lăsați câmpul gol dacă nu există termen limită. Consultați [Setările planului](#plan-settings) pentru modul în care se numără termenul limită.
7. Salvați planul. Acum puteți începe să atribuiți membrii echipei și să construiți [ordinea slujbei](./service-order.md).

:::tip
Setările de repetare sunt disponibile doar în timp ce copiați ceva din planul anterior (poziții, atribuiri sau ordinea slujbei).
:::

## Pagina de detalii a planului

Când deschideți un plan, numele planului, ministerul, tipul de plan și data slujbei apar în partea de sus, împreună cu butoanele **Editează** și **Tipărește**. Mai jos, totul se află pe o singură pagină:

- **[Ordinea slujbei](./service-order.md)** -- Construiți ordinea slujbei cu elemente precum cântări de laudă, rugăciuni, anunțuri și predica.
- **Atribuiri în echipa de slujire** -- Gestionați membrii echipei repartizați acestui plan. Puteți adăuga persoane din echipele existente și puteți vedea cine a confirmat și cine așteaptă încă un răspuns. Linkurile de deasupra pozițiilor vă permit să deschideți **Notele** și **Orele** planului.

## Atribuirea membrilor echipei

1. Deschideți un plan și derulați până la **Atribuiri în echipa de slujire**.
2. Faceți clic pe **Adaugă poziție**. Completați informațiile din formularul de adăugare a unei poziții. Pentru numele categoriei, adăugați orice categorie doriți. Pentru ca oricine din biserica dumneavoastră să poată ocupa poziția (nu doar membrii unei singure echipe), lăsați **Grupul de voluntari** setat pe **Niciunul**.
3. Faceți clic pe **Persoane necesare** și alegeți voluntarii care vor ocupa poziția. Dacă poziția are un **Grup de voluntari**, alegeți dintre membrii acelui grup. Dacă Grupul de voluntari este setat pe **Niciunul**, puteți căuta în schimb pe oricine din biserică.
4. Adăugați membri din lista echipei dumneavoastră făcând clic pe **Adaugă**.
5. Membrii atribuiți vor apărea sub echipa lor, cu starea atribuirii.
6. Faceți clic pe notificarea voluntarilor pentru a-i anunța în aplicația B1 sau prin e-mail. Dacă planul folosește un [flux de confirmare](#plan-settings), notificarea pornește și un card de flux de lucru care urmărește fiecare solicitare până când voluntarul răspunde.

Fiecare poziție afișează un indicator cu numărul de locuri (de exemplu „2/3”), astfel încât să vedeți dintr-o privire câte locuri sunt ocupate. Sub titlul **Atribuiri în echipa de slujire**, un rezumat („X din Y poziții ocupate”) arată gradul general de acoperire al planului, împreună cu numărul de locuri încă necesare, iar când toate pozițiile sunt acoperite, afișează **Personal complet**.

:::tip
Configurați echipele în setările ministerului înainte de a crea planuri. Astfel, veți avea deja un grup pregătit de voluntari din care să atribuiți.
:::

### Copierea pozițiilor într-un plan gol

Dacă un plan nu are încă poziții și există un plan anterior de același tip, în **Atribuiri în echipa de slujire** apare un link **Copiază din planul anterior**. Alegeți **Doar poziții** sau **Poziții și atribuiri** pentru a completa planul deschis cu pozițiile (și voluntarii) din planul anterior. Copia se face în planul curent; nu creează un al doilea plan pentru aceeași dată.

## Setările planului

Fiecare plan are setări suplimentare pe care le puteți configura făcând clic pe **Editează** lângă plan în lista tipului de plan sau pe butonul **Editează** din partea de sus a paginii planului. Faceți clic pe **Gata** (sau pe numele planului) pentru a reveni la plan. Acestea includ:

- **Termenul limită de înscriere (ore înainte de slujbă)** — numărul de ore înainte de slujbă la care se închid înscrierile voluntarilor. Orele se numără înapoi de la prima oră de **Slujbă** a planului (repetițiile și alte momente sunt ignorate, cu excepția cazului în care planul nu are altceva), așa că un termen de 2 ore pentru o slujbă de la 10:00 se închide la 8:00 dimineața în acea zi. Dacă planul nu are ore, termenul se numără de la ora 9:00 în ziua slujbei, conform fusului orar al bisericii dumneavoastră. După ce acesta trece, voluntarii nu se mai pot nici înscrie, nici retrage. Introduceți un număr negativ pentru a menține înscrierile deschise și după începutul slujbei. Lăsați câmpul gol, sau ștergeți-l, pentru a nu avea termen limită.
- **Flux de confirmare** — alegeți un [flux de lucru pentru confirmarea atribuirilor de slujire](./workflows.md#serving-assignment-confirmations) pentru a urmări cererile de slujire ale acestui plan prin e-mail și SMS, până când fiecare voluntar acceptă sau refuză. Când **notificați** voluntarii pentru planul publicat, fiecare cerere nouă primește propriul card pe tabloul acelui flux de lucru, iar deasupra linkului de notificare apare o notă cu textul *„Cererile noi folosesc fluxul de confirmare.”* Lăsați opțiunea **Folosește notificările de atribuire existente** pentru a păstra notificările obișnuite. În listă apar doar fluxurile de confirmare active; creați mai întâi unul din **Slujire > Fluxuri de lucru**.
- **Afișează numele voluntarilor pe pagina de înscriere** — când este bifată, voluntarii autentificați pot vedea cine este deja înscris la fiecare poziție pe pagina de înscriere B1.church. Numele nu sunt niciodată afișate vizitatorilor neautentificați.
- **Notat provizoriu** — ascunde atribuirile de la voluntari până când sunteți gata să publicați programul.
- **Programează automat un înlocuitor când un voluntar refuză** — când este bifată, dacă un voluntar atribuit refuză poziția, B1 va contacta automat următoarea persoană disponibilă din lista echipei și va întreba dacă poate sluji. Procesul continuă în listă până când cineva acceptă, menținând pozițiile ocupate fără urmărire manuală.

:::tip
Pe pagina de înscriere a membrilor, pozițiile libere ale fiecărui plan sunt listate pe categorii și apoi pe nume. Membrii văd fiecare săptămână viitoare cu poziții libere, cu excepția cazului în care activați **Afișează doar săptămâna următoare pentru fiecare tip de plan** în [Setări > Înscrierea voluntarilor](../settings/church-settings.md#volunteer-signup).
:::

## Memento-uri pentru voluntari {#volunteer-reminders}

B1 poate trimite automat memento-uri voluntarilor înainte de slujbele la care sunt programați, astfel încât să nu fie nevoie să urmăriți echipa în fiecare săptămână. Memento-urile merg către **toți cei programați** — atât către cei care au confirmat, cât și către cei care nu au răspuns încă. Excepția este o cerere trimisă printr-un [flux de confirmare](./workflows.md#serving-assignment-confirmations): acel voluntar primește memento-uri doar după ce acceptă, deoarece fluxul de lucru se ocupă de urmărire până atunci. Fiecare e-mail cu memento conține pozițiile voluntarului, data slujbei, notele planului și mesajul dumneavoastră personalizat.

Momentul și conținutul memento-urilor se configurează pentru fiecare **tip de plan**, astfel încât fiecare tip de slujire își poate păstra propriul program.

1. Din zona **Slujire**, selectați ministerul care conține tipul de plan.
2. În lista **Tipuri de plan**, faceți clic pe **Editează** lângă tipul de plan.
3. Extindeți secțiunea **Memento-uri** și activați **Trimite memento-uri pentru planurile de acest tip**.
4. Sub **Când ar trebui trimise memento-urile?**, alegeți până la trei momente: **cu 7 zile înainte**, **cu 3 zile înainte**, **cu 2 zile înainte**, **cu 1 zi înainte** sau **În ziua respectivă**.
5. Setați **Ora din zi** la care se trimit memento-urile.
6. Opțional, adăugați un **Mesaj**. Lăsați câmpul gol pentru a folosi formularea implicită a memento-ului.
7. Sub **Trimite prin**, alegeți **Push**, **E-mail** și, dacă biserica dumneavoastră are un [furnizor de mesaje text](../settings/church-settings.md#texting) conectat, **SMS**.
8. Faceți clic pe **Salvează memento-urile**.

Memento-urile sunt dezactivate pentru un tip de plan până când le activați.

:::tip
Voluntarii care nu au confirmat încă primesc butoanele **Acceptă** și **Refuză** chiar în e-mailul cu memento, astfel încât pot răspunde fără să se autentifice.
:::

### Memento-uri prin SMS

Opțiunea **SMS** apare doar când biserica dumneavoastră are conectat un furnizor de mesaje text. Mesajele se trimit prin furnizorul de mesaje text al bisericii și fiecare mesaj poate costa biserica. Un voluntar primește un memento SMS doar dacă a activat **Mesaje text** în [Preferințele de notificare](../../b1-church/getting-started/notification-preferences.md) și are un număr de telefon mobil în profil. Fiecare SMS începe cu numele bisericii, se păstrează într-un singur mesaj text și se încheie cu „Răspundeți STOP pentru a vă dezabona.” Cei care răspund STOP nu mai primesc mesaje text de la biserica dumneavoastră. Pentru ca răspunsurile STOP să ajungă în B1, lipiți **URL-ul webhook-ului pentru mesajele primite (STOP)** din [setările de mesaje text](../settings/church-settings.md#texting) în webhook-ul de mesaje primite al furnizorului.

Pentru a trimite imediat un mesaj text tuturor celor programați într-un interval de date, folosiți **Trimite SMS voluntarilor** din [Prezentarea generală a planurilor](./plans-overview.md#texting-everyone-scheduled).

:::info
Fiecare memento se trimite o singură dată. Memento-urile SMS se trimit în plus față de push și e-mail, nu în locul lor.
:::

## Asocierea grupurilor cu un tip de plan

Sub lista planurilor, pe pagina tipului de plan, secțiunea **Grupuri asociate** vă permite să decideți ce grupuri pot vedea planurile acestui tip din portalul lor de membru. Este o modalitate rapidă de a afișa slujbele viitoare echipelor potrivite, fără a le acorda acces de administrator.

1. Pe pagina tipului de plan, faceți clic pe **Grupuri asociate** din partea de sus a paginii (sau derulați până la această secțiune).
2. Faceți clic pe **Adaugă grup** și alegeți un grup din lista derulantă.
3. În coloana **Afișează**, alegeți dacă membrii acelui grup ar trebui să vadă **Doar planurile trecute**, **Doar planurile viitoare** sau **Planurile trecute și viitoare** pentru acest tip de plan.
4. Repetați pentru a asocia grupuri suplimentare sau faceți clic pe pictograma coșului de gunoi pentru a elimina un grup.

:::info
În selector apar doar grupurile etichetate ca **Standard**. Membrii unui grup asociat văd automat planurile acestui tip pe pagina grupului din portalul de membru B1, limitat la intervalul pe care l-ați selectat.
:::

Dacă planurile sunt lecții Lessons.church, membrii grupului asociat văd și un card **Lecția din această săptămână** pe pagina grupului (linia de final, versetul și o întrebare pentru părinți). Asociați aici un grup de părinți și setați filtrul pe **Doar planurile trecute**, astfel încât lecția de azi să fie inclusă. Echipele de voluntari folosesc de obicei **Doar planurile viitoare** sau **Planurile trecute și viitoare**.

## Tipărirea planurilor

Puteți tipări un plan pentru a-l distribui echipei. Deschideți planul și faceți clic pe **Tipărește** din partea de sus a paginii pentru a genera o versiune imprimabilă, care include atribuirile și ordinea slujbei. În partea de sus a documentului tipărit apar sigla bisericii (**Sigla pentru fundal deschis** din [Site web > Aspect](../website/appearance.md), dacă ați încărcat una), cu numele bisericii dedesubt, precum și numele planului, astfel încât foile separate să poată fi identificate ușor. Este util pentru distribuire la repetiții sau pentru afișare într-un spațiu comun.

Documentul tipărit omite orice ar fi gol. Dacă nu sunt atribuiți voluntari, nu există casetă pentru echipă, iar ordinea slujbei folosește toată lățimea paginii. Dacă niciun element nu are o durată, coloana **Durată** este omisă, iar dacă planul nu are ore de slujbă și nicio durată, este omisă și coloana **Oră**. Pentru a elimina bara neagră a titlului **Ordinea slujbei** cu data slujbei, debifați **Afișează titlul Ordinii slujbei** din partea de sus a paginii de tipărire; B1 Admin reține alegerea dumneavoastră în acel browser.

:::info
Planurile sunt organizate pe minister. Asigurați-vă că sunteți pe tab-ul ministerului corect înainte de a crea sau vizualiza planuri.
:::

## Pașii următori

- Folosiți [Prezentarea generală a planurilor](./plans-overview.md) pentru a vedea toate atribuirile viitoare din mai multe săptămâni într-un singur tabel și pentru a identifica pozițiile neocupate — și atribuiți voluntari direct din tabel
- Salvați structura unui plan ca [Șablon de plan](./plan-templates.md), pentru a-l aplica pe planuri viitoare dintr-un singur clic
- Construiți [Ordinea slujbei](./service-order.md) cu cântări, lecturi și alte elemente
- Adăugați [cântări](./songs.md) din biblioteca dumneavoastră direct în ordinea slujbei
- Folosiți [Sarcinile](./tasks.md) pentru a atribui acțiuni de urmărire membrilor echipei
- Afișați conținutul lecției curente pe un televizor din foaier cu [Afișaj digital](./digital-signage.md)
