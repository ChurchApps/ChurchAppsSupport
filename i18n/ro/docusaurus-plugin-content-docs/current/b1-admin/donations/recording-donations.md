---
title: "Înregistrarea donațiilor"
---

# Înregistrarea donațiilor

<div class="article-intro">

Înregistrarea donațiilor în B1 Admin se face prin sistemul de loturi (Batches). Creați un lot care să reprezinte o colectă (de exemplu, ofranda de duminică), apoi adăugați donațiile individuale în acel lot. Astfel, evidența donațiilor rămâne organizată și ușor de reconciliat.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați [fondurile](funds.md), ca să puteți atribui donațiile categoriilor corecte
- Creați un [lot](batches.md) care să conțină donațiile pe care urmează să le introduceți
- Asigurați-vă că donatorii se află în [registrul de persoane](../people/adding-people.md), ca să îi puteți căuta când introduceți donațiile
- Aveți nevoie de permisiunea **Edit Donations** sau de **Enter Donations** împreună cu **View Donations** pentru a introduce donații într-un lot (vezi [Cine poate modifica un lot](batches.md#who-can-change-a-batch))

</div>

## Crearea unui lot și adăugarea donațiilor

1. În **B1 Admin**, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus), extindeți **Donations** și faceți clic pe **Batches**.
2. Faceți clic pe **Add Batch** din partea de sus a paginii.
3. Introduceți un nume pentru lot (de exemplu, „Ofranda de duminică - 5 ian.”) și selectați data. Faceți clic pe **Save**.
4. Noul lot apare în listă, cu zero donații și 0,00 $.
5. Faceți clic pe **numele lotului** pentru a-l deschide.

## Introducerea donațiilor individuale

1. Pe pagina de detalii a lotului, panoul de introducere a donațiilor apare lângă lista donațiilor. Sub **Select Person or Anonymous**, tastați numele donatorului în câmpul de căutare pentru a-l găsi, sau faceți clic pe **Anonymous**. (Faceți clic pe **Add Donation** din partea de sus a paginii pentru a ajunge direct la acest panou.)
2. După ce selectați o persoană, formularul afișează câmpurile **Date**, **Method** (Check, Cash, Card sau In-Kind), **Fund**, **Notes**, **Amount** și **Check #** (sau **Last 4 digits** pentru donațiile cu cardul, ori **Item** pentru a descrie o donație în natură). Faceți clic pe **Change** lângă numele donatorului pentru a alege altă persoană.
3. Completați detaliile și faceți clic pe **Add Donation** (sau apăsați Enter).
4. Donația este adăugată în lista donațiilor, iar formularul se golește, ca să puteți introduce următoarea.

:::info
Dacă lotul a fost [închis](batches.md#closing-and-reopening-a-batch), panoul de introducere și linkurile **Edit** sunt ascunse pentru cei care nu au permisiunea **Edit Donations**, iar în partea de sus a lotului apare o notificare care indică faptul că este închis. Cereți cuiva care are permisiunea **Edit Donations** să îl redeschidă.
:::

:::tip
Puteți introduce rapid mai multe donații una după alta, fără să părăsiți pagina lotului. Formularul se golește după fiecare înregistrare, ceea ce vă permite să parcurgeți eficient un teanc de cecuri sau de plicuri.
:::

## Importul donațiilor dintr-un fișier CSV {#importing-donations-from-a-csv-file}

Dacă donațiile se află deja într-o foaie de calcul, de exemplu un export dintr-un alt sistem de donații sau un tabel de numărare întocmit de echipa care numără banii, le puteți importa într-un lot, în loc să le introduceți una câte una.

1. Deschideți lotul și faceți clic pe **Import CSV** din partea de sus a paginii. (Butonul apare atunci când puteți modifica lotul și biserica dvs. are cel puțin un [fond](funds.md).)
2. Faceți clic pe **Choose CSV File** și selectați fișierul. Fișierul trebuie să aibă un rând de antet, iar coloanele pot fi în orice ordine:
   - **Amount** (obligatoriu; funcționează și `Total`) -- Simbolurile monetare și virgulele sunt ignorate, deci `$1,250.00` este acceptat. Suma trebuie să fie mai mare decât zero.
   - **Date** -- Folosiți un format precum `2026-10-25` sau `10/25/2026`. Dacă este gol, se folosește data lotului.
   - **Fund** -- Numele fondului, fără a ține cont de majuscule sau minuscule. Dacă este gol, se folosește primul fond.
   - **Method** -- **Check**, **Cash**, **Card** sau **In-Kind**. Dacă este gol, se folosește **Check**.
   - **Check Number** -- Numărul cecului (sau alt detaliu al plății).
   - **Notes**
   - **Email**, **Name** sau **First Name** și **Last Name** -- Folosite pentru a potrivi donatorul cu o persoană din baza de date. Un nume scris ca „Smith, John” este citit ca „John Smith”.
3. Verificați previzualizarea. Fiecare rând afișează numărul liniei, donatorul din fișier, **Match**, fondul și suma:
   - Numele unei persoane înseamnă că donatorul a fost identificat. B1 caută mai întâi după adresa de e-mail, apoi după numele exact și doar dacă există o singură persoană potrivită.
   - **Not found — anonymous** înseamnă că nu a fost găsită nicio potrivire unică. Donația este importată ca anonimă, iar în notele ei se adaugă „Importat ca:” urmat de numele donatorului, ca să o puteți atribui ulterior.
   - Un mesaj roșu, precum **Invalid amount**, **Unknown fund**, **Unknown method** sau **Invalid date**, înseamnă că rândul respectiv va fi omis. Corectați fișierul și selectați-l din nou pentru a include rândul.
4. Faceți clic pe **Import** (butonul arată câte rânduri vor fi importate). Donațiile sunt adăugate în lot.

:::tip
După import, folosiți **Edit** la orice donație anonimă pentru a selecta persoana corectă. Notița „Importat ca:” vă indică cine figura în fișier drept donator.
:::

## Înregistrarea unei donații din fișa unei persoane

Pentru a înregistra o singură donație fără a deschide un lot, deschideți fișa donatorului din **People** și faceți clic pe **Log a gift** (în rezumatul donațiilor sau în vizualizarea donațiilor persoanei).

1. Setați **Date** și **Amount**.
2. Alegeți **Fund** și **Method** (Check, Cash, Card sau In-Kind), apoi introduceți **Check #**, **Last 4 digits** sau **Item** (pentru donațiile în natură), dacă este cazul.
3. Adăugați opțional **Notes**, apoi faceți clic pe **Save**.

Donația este salvată în lotul corespunzător acelei date. Dacă nu există încă un lot pentru data respectivă, se creează unul automat, cu data drept nume.

## Împărțirea unei donații între mai multe fonduri

Uneori, un donator oferă, într-o singură tranzacție, sume către mai multe fonduri. Pentru a gestiona această situație:

1. Sub panoul de introducere, faceți clic pe linkul **full donation editor** (sau faceți clic pe **Edit** la rândul unei donații existente).
2. În editorul complet, adăugați sume către fonduri diferite. Totalul se calculează automat din sumele pe fonduri.
3. Faceți clic pe **Save** pentru a actualiza donația.

:::info
Împărțirea donațiilor între mai multe fonduri este obișnuită atunci când un donator scrie un singur cec destinat mai multor scopuri, de exemplu Fondul General și Misiunile.
:::

## Editarea sau ștergerea donațiilor

Pentru a edita o donație, faceți clic pe butonul **Edit** de pe rândul ei din lot. Puteți modifica data, suma, fondul, metoda de plată (Check, Cash, Card sau In-Kind) sau orice alt detaliu. Pentru o donație în natură, editorul denumește câmpul de detaliu **Item**, ca să puteți descrie ce s-a dat. Faceți clic pe **Save** când ați terminat.

:::tip
Linia de sub numele lotului din partea de sus a paginii se actualizează automat și arată data lotului, numărul de donații și suma totală, pe măsură ce adăugați sau modificați înregistrări. Folosiți-o pentru a verifica totalul în raport cu bordereul de depunere.
:::

## Rambursarea unei donații

Dacă un donator a fost taxat din greșeală sau cere să i se restituie banii, puteți rambursa o donație finalizată direct din ecranul ei de editare, fără să mergeți în panoul de control al procesatorului de plăți.

1. Deschideți donația și faceți clic pe **Edit**.
2. Faceți clic pe butonul **Refund**, aflat lângă Delete, în partea de jos a formularului.
3. Confirmați caseta de dialog: „Rambursați integral această donație prin procesatorul de plăți? Această acțiune nu poate fi anulată.”

Donația este rambursată integral prin procesatorul de plăți original și apare marcată cu **Refunded** în listele de donații.

:::warning
Rambursările sunt doar integrale. Din B1 Admin nu se poate rambursa o sumă parțială. Odată confirmată, rambursarea nu poate fi anulată.
:::

:::info
Butonul **Refund** apare doar pentru donațiile plătite online (care au o tranzacție în procesatorul de plăți) și care se află încă în statusul **Complete**. Donațiile introduse manual (numerar, cec) nu au o tranzacție în procesatorul de plăți care să poată fi rambursată. Pentru acestea, editați sau ștergeți înregistrarea.
:::

## Tipărirea unei chitanțe pentru o singură donație

Atunci când cineva predă un cec, plătește pentru un eveniment sau pentru un tricou sau când o organizație în vizită aduce o donație, puteți tipări o chitanță doar pentru acea donație, în loc de un lot întreg sau de un extras anual.

1. Deschideți lotul care conține donația.
2. Faceți clic pe **Receipt**, lângă **Edit**, pe rândul donației. Puteți face clic și pe **Receipt** din partea de jos a formularului Edit Donation.
3. Faceți clic pe **Print** sau pe **Close** pentru a reveni.

Chitanța folosește același format ca extrasul de donații: biserica și donatorul (sau „Anonymous”), data și metoda donației, fiecare fond și suma aferentă, nota, Giving Note-ul bisericii și blocul oficial de chitanță, dacă ați configurat un **Statement format** (vezi [Extrasele de donații](giving-statements.md)). Numărul chitanței din acest bloc este ID-ul donației.

:::info
Mențiunea „fără bunuri sau servicii” este tipărită doar atunci când toate fondurile din donație sunt marcate ca deductibile fiscal. Dacă o parte din donație a mers către un fond care nu este deductibil fiscal, de exemplu o taxă de eveniment sau o achiziție, chitanța nu conține această mențiune, astfel încât să apară ca plată și nu ca donație caritabilă.
:::

:::tip
Donațiile online primesc deja automat un e-mail de mulțumire, deci chitanța este utilă în special pentru donațiile pe care le introduceți manual.
:::

## Pașii următori

- Verificați înregistrările folosind [Rapoartele de donații](donation-reports.md), pentru a confirma acuratețea
- La sfârșitul anului, generați [Extrasele de donații](giving-statements.md) pentru donatori
