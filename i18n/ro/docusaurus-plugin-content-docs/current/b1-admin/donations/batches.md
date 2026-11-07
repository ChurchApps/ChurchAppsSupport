---
title: "Loturile de donații"
description: "Grupați ofrandele în loturi de donații în B1 Admin, apoi închideți, tipăriți sau exportați fiecare lot, ca totalurile să corespundă depozitelor bancare."
---

# Loturile de donații

<div class="article-intro">

Loturile grupează donațiile pentru a fi mai ușor de urmărit și de verificat. Un lot tipic reprezintă o singură colectă, cum ar fi ofranda de duminică sau un eveniment special. Folosirea loturilor vă ajută să rămâneți organizați și face mai simplă verificarea faptului că evidențele dvs. corespund depunerilor reale.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Asigurați-vă că ați [configurat fondurile](funds.md), astfel încât să fie disponibile atunci când înregistrați donații
- Aveți nevoie de permisiunea **Vizualizare rezumate donații**, **Editare donații** sau **Introducere donații** pentru a vedea pagina Loturi (consultați [Cine poate modifica un lot](#who-can-change-a-batch))

</div>

## Pagina Loturi

Când navigați la **Donații > Loturi**, veți vedea o listă cu loturile dvs. Fiecare rând afișează:

- **Nume** -- eticheta pe care ați dat-o lotului
- **Data** -- data colectei
- **Donații** -- numărul de donații individuale din lot
- **Total** -- suma totală în dolari
- **Stare** -- **Deschis** sau **Închis** (consultați [Închiderea și redeschiderea unui lot](#closing-and-reopening-a-batch))

Deasupra listei, butoanele cu ani vă permit să afișați doar loturile dintr-un singur an sau toate loturile, **Toate**. Un rezumat pe o singură linie indică numărul de loturi, numărul de daruri și suma totală pentru loturile afișate.

## Crearea unui lot nou

1. Faceți clic pe **Adaugă lot** în partea de sus a paginii.
2. Introduceți un nume descriptiv (de exemplu, „Ofrandă de duminică - 9 feb.”).
3. Selectați data colectei.
4. Faceți clic pe **Salvează**.

Noul dvs. lot apare în listă, gata pentru a adăuga donații.

## Lucrul cu loturile

- **Vizualizarea donațiilor** -- faceți clic pe numele unui lot pentru a-l deschide și a vedea toate donațiile individuale pe care le conține. De aici puteți adăuga, edita sau elimina donații ori puteți face clic pe **Importă CSV** pentru a adăuga rapid multe donații dintr-o foaie de calcul (consultați [Importarea donațiilor dintr-un fișier CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Editarea detaliilor lotului** -- faceți clic pe butonul **Editează** de pe rândul unui lot pentru a schimba numele sau data. Doar persoanele cu permisiunea **Editare donații** pot șterge un lot.
- **Sortare** -- folosiți antetele coloanelor pentru a sorta loturile după nume sau dată.
- **Export** -- faceți clic pe **Exportă** în partea de sus a paginii pentru a descărca loturile afișate ca foaie de calcul (CSV).
- **Evenimente eșuate** -- dacă procesatorul dvs. de plăți a raportat probleme, în partea de sus a paginii apare un buton **Evenimente eșuate** (cu numărul de evenimente nerezolvate). Faceți clic pe el pentru a afișa sau ascunde lista de evenimente de sub loturi.
- **Import din Stripe** -- faceți clic pe **Importă tranzacțiile Stripe lipsă** în partea de sus a paginii pentru a deschide instrumentul de [import Stripe](stripe-import.md). Butonul apare doar atunci când gateway-ul de donații al bisericii dvs. este Stripe.

## Cine a introdus fiecare dar

Fiecare dar introdus într-un lot afișează **Introdus de** și numele persoanei sub numele donatorului, astfel încât să puteți vedea cine l-a introdus, fără a folosi o foaie de semnături. B1 înregistrează automat acest lucru pe baza persoanei conectate, iar editarea ulterioară a darului nu o schimbă. Darurile aduse prin **Importă CSV** afișează persoana care a rulat importul.

Darurile online, darurile adăugate de instrumentul [import Stripe](stripe-import.md) și darurile introduse înainte de adăugarea acestei funcții în noiembrie 2026 nu afișează un nume.

## Închiderea și redeschiderea unui lot

Odată ce un lot a fost numărat și depus, închideți-l pentru ca donațiile să rămână exact așa cum erau când l-ați închis.

1. Deschideți lotul.
2. Faceți clic pe **Închide lotul** în partea de sus a paginii.

Eticheta de stare de lângă numele lotului se schimbă de la **Deschis** la **Închis**, lotul afișează **Închis** în coloana **Stare** de pe pagina Loturi, iar o notificare din partea de sus a lotului explică faptul că acesta este închis. Cât timp un lot este închis, persoanele cu permisiunea **Introducere donații** îl pot vizualiza, dar nu pot adăuga, edita sau șterge donațiile din el și nu pot modifica numele sau data lotului.

Pentru a face din nou modificări, deschideți lotul și faceți clic pe **Redeschide lotul**. Loturile noi încep întotdeauna deschise.

:::info
Doar persoanele cu permisiunea **Editare donații** văd butoanele **Închide lotul** și **Redeschide lotul**. Ele pot modifica în continuare donațiile dintr-un lot închis, dacă este nevoie de o corecție, fără a-l redeschide.
:::

## Cine poate modifica un lot

Două [permisiuni de rol](../settings/roles-permissions.md) permit cuiva să lucreze cu loturile:

- **Editare donații** -- acces complet: adăugarea și ștergerea loturilor, închiderea și redeschiderea acestora, precum și adăugarea, editarea sau ștergerea oricărei donații, indiferent dacă lotul este deschis sau închis.
- **Introducere donații** -- pentru echipele de numărare și voluntarii care introduc ofrandele. Ei pot adăuga loturi și pot adăuga, edita sau șterge donații, dar doar cât timp lotul este deschis. Nu pot șterge loturi, nu le pot închide sau redeschide și nu pot modifica daruri care au venit prin donațiile online.

Cineva cu permisiunea **Introducere donații**, dar fără **Vizualizare rezumate donații**, vede **Donații** în meniul B1 Admin, care duce direct la pagina Loturi. Opțiunile **Rezumat**, **Fonduri**, **Campanii** și **Declarații de donație** rămân ascunse pentru acestea. Pentru a deschide un lot și a vedea donațiile din el, rolul are nevoie și de permisiunea **Vizualizare donații**.

:::tip
O configurație frecventă este un rol „Echipa de numărare” cu permisiunile **Introducere donații** și **Vizualizare donații**, iar un trezorier cu permisiunea **Editare donații**, care închide fiecare lot după ce depunerea a fost verificată.
:::

## Tipărirea unui lot

Deschideți un lot și faceți clic pe **Tipărește** deasupra listei de donații pentru a imprima o copie pe hârtie pentru echipa dvs. de numărare sau pentru evidențele de depunere. Imprimarea include:

- Antetul bisericii dvs. -- logo-ul dvs. (**Logo pentru fundal deschis** din [Site web > Aspect](../website/appearance.md), dacă ați încărcat unul), urmat de numele bisericii dvs. -- apoi numele lotului și data lotului
- Fiecare donație din lot, cu numele donatorului, persoana care a introdus-o, metoda, notele, data și suma (darurile rambursate sunt tăiate și marcate ca rambursate)
- **Subtotaluri pe fonduri** -- totalul oferit fiecărui fond din lot
- **Total lot** -- suma combinată pentru întregul lot

Butonul **Tipărește** apare doar după ce lotul are cel puțin o donație.

### Tipărirea mai multor loturi odată

Pentru a imprima toate loturile dintr-o perioadă dintr-o singură dată -- de exemplu, toate depunerile din luna trecută -- faceți clic pe **Tipărește** în partea de sus a paginii **Loturi**, lângă **Exportă**. Se deschide pagina **Tipărire loturi**, cu o **Data de început** și o **Data de sfârșit** care corespund loturilor afișate pe ecran: de la 1 ianuarie până la 31 decembrie al anului selectat sau de la cea mai veche până la cea mai recentă dată a unui lot, când este selectată opțiunea **Toate**. Modificați oricare dintre date pentru a alege un alt interval.

Fiecare lot cu data în interval (inclusiv datele de început și de sfârșit) se imprimă în ordinea datelor, câte un lot pe pagină, folosind același aspect ca la imprimarea unui singur lot. Loturile fără donații sunt excluse, iar dacă niciunul dintre loturile din interval nu are donații, veți vedea mesajul „Niciun lot cu donații în acest interval de date.” Faceți clic pe **Tipărește** pentru a deschide dialogul de imprimare al browserului dvs. sau pe **Închide** pentru a reveni la lista de loturi.

## Exportul unui lot în QuickBooks Online

Deschideți un lot și faceți clic pe **Exportă pentru QuickBooks** pentru a descărca lotul ca înregistrare de jurnal, pe care QuickBooks Online o poate importa (**Setări > Importare date > Înregistrări de jurnal**). Fișierul conține o debitare către **Fonduri neconsemnate** pentru totalul lotului și o creditare pentru fiecare fond, folosind numele fiecărui fond ca nume de cont. QuickBooks vă cere, în timpul importului, să potriviți aceste nume cu planul dvs. de conturi, deci denumiți-vă fondurile în același mod în care contabilul dvs. denumește conturile de venituri sau realizați maparea o singură dată, la import.

:::tip
Denumiți loturile în mod consecvent, pentru a le găsi ușor mai târziu. Includerea datei și a tipului de colectă (de exemplu, „Duminică dimineața - 2025-02-09”) vă păstrează lista organizată pe măsură ce crește.
:::

## Pașii următori

Odată ce aveți un lot, consultați [Înregistrarea donațiilor](recording-donations.md) pentru a afla cum să adăugați donații individuale în el. De asemenea, puteți [importa tranzacțiile Stripe](stripe-import.md) pentru a crea automat loturi din donațiile online.
