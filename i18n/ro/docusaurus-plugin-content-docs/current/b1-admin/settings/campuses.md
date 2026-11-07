---
title: "Campusuri"
---

# Campusuri

<div class="article-intro">

Dacă biserica dumneavoastră se întâlnește în mai multe locații, **Campusurile** vă permit să urmăriți ce sediu aparține fiecărei persoane și fiecărui grup. Odată configurate, campusurile apar ca opțiune în profilurile persoanelor, în configurarea prezenței și în panoul de bord Demografie. Bisericile cu mai multe sedii pot filtra, căuta și raporta după campus în toată aplicația B1 Admin.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea **Editare setări biserică** pentru a gestiona campusurile. Consultați [Roluri și permisiuni](./roles-permissions.md).

</div>

## Deschiderea setărilor pentru campusuri

În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea stângă sus), alegeți **Setări > Setări**, apoi faceți clic pe **Campusuri** în lista din stânga pentru a ajunge la secțiunea **Campusuri**. Puteți ajunge direct acolo și la adresa **/settings/campuses**. Veți vedea o listă cu toate campusurile configurate, împreună cu numele, locația și fusul orar al fiecăruia.

## Adăugarea unui campus

1. Faceți clic pe **Adăugați campus**.
2. Completați detaliile campusului:
   - **Nume** *(obligatoriu)* — numele afișat în toată aplicația B1 Admin (de exemplu, „Campusul principal” sau „Campusul nord”).
   - **Adresă** — adresa stradală a campusului (folosită doar pentru afișare informativă; nu este aceeași cu adresa principală a bisericii din Setările bisericii).
   - **Oraș / Județ / Cod poștal** — locația campusului.
   - **Fus orar** — fusul orar IANA pentru acest campus (de exemplu, *Europe/Bucharest*). [Programele de check-in](../attendance/setup.md#setting-a-check-in-schedule) pentru serviciile din acest campus se deschid și se închid în acest fus orar. Dacă este setat la **Niciunul**, se folosește în schimb [Fusul orar](./church-settings.md#time-zone) al bisericii. Este util atunci când campusurile se află în fusuri orare diferite.
   - **Site web** — o adresă URL opțională pentru prezența web proprie a acestui campus.
3. Faceți clic pe **Salvați**.

## Editarea unui campus

Faceți clic pe orice rând de campus din listă pentru a deschide editorul acestuia în panoul din dreapta. Actualizați câmpurile și faceți clic pe **Salvați**.

## Ștergerea unui campus

Deschideți un campus pentru editare și faceți clic pe **Șterge**. Vi se va cere să confirmați. Ștergerea unui campus nu elimină persoanele asociate cu acesta — câmpul lor de campus devine pur și simplu gol.

## Atribuirea persoanelor unui campus

După crearea campusurilor, membrii personalului pot atribui o persoană unui campus din profilul acesteia:

1. Deschideți fișa unei persoane în **Persoane**.
2. Faceți clic pe **Editare**.
3. Alegeți campusul din lista derulantă **Campus**.
4. Faceți clic pe **Salvați**.

De asemenea, puteți actualiza campusul în masă din pagina Persoane. Selectați mai multe persoane, folosiți **Editare în masă** și setați câmpul Campus pentru toate deodată.

## Filtrarea după campus

Odată configurate campusurile, puteți filtra în B1 Admin după campus:

- **Căutarea persoanelor** — adăugați o condiție Campus în căutarea avansată sau încărcați o [Listă salvată](../people/lists.md) limitată la un campus.
- **Demografie** — [panoul Demografie](../people/demographics.md) afișează o diagramă inelară Campus atunci când cel puțin o persoană are atribuit un campus.
- **Configurarea prezenței** — fiecare oră de serviciu din Prezență poate fi legată de un campus.

:::tip
Bisericile cu o singură locație nu au nevoie să configureze campusuri. Toate funcțiile pentru campusuri sunt opționale — dacă nu există campusuri, câmpurile și diagramele legate de campus pur și simplu nu apar.
:::

## Articole conexe

- [Setările bisericii](./church-settings.md) — adresa principală a bisericii și identitatea vizuală (separate de adresele campusurilor)
- [Demografie](../people/demographics.md) — diagrama de defalcare pe campusuri
- [Configurarea prezenței](../attendance/setup.md) — legarea orelor de serviciu de un campus
- [Editarea în masă](../people/bulk-editing.md) — atribuirea campusului mai multor persoane deodată
