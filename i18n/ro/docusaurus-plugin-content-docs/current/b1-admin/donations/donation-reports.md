---
title: "Rapoarte despre donații"
---

# Rapoarte despre donații

<div class="article-intro">

B1 Admin îți oferă mai multe moduri de a vizualiza și analiza datele despre donațiile bisericii tale. Tabloul de bord al donațiilor, de pe pagina **Sumar** din secțiunea Donații, oferă o imagine de ansamblu vizuală, cu grafice și filtre, iar secțiunea Rapoarte oferă un raport detaliat, **Sumarul donațiilor**. Folosește aceste instrumente pentru a urmări tendințele donațiilor, a te pregăti pentru întâlnirile consiliului sau pentru a verifica evidențele.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Asigură-te că donațiile au fost [înregistrate în loturi](recording-donations.md) sau [importate din Stripe](stripe-import.md)
- Verifică dacă [fondurile](funds.md) sunt configurate corect, pentru ca donațiile să fie clasificate corespunzător

</div>

## Tabloul de bord al donațiilor

Tabloul de bord al donațiilor este vizualizarea **Tablou de bord** a paginii **Sumar**, prima pagină pe care o vezi când deschizi secțiunea **Donații**.

1. Deschide [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din partea de sus-stânga a B1 Admin), extinde **Donații** și fă clic pe **Sumar**. Pagina **Sumar** se deschide în vizualizarea **Tablou de bord**. Comutatorul **Vizualizare** din dreapta sus schimbă între **Tablou de bord** și **Donatori inactivi**.
2. Folosește comutatorul **Săptămânal**, **Lunar** și **Trimestrial** de deasupra raportului pentru a alege modul de grupare a donațiilor.
3. În panoul **Filtrează raportul**, setează **Data de început** și **Data de sfârșit** (implicit, anul trecut până ieri) și, opțional, alege un **Fond**, apoi fă clic pe **Rulează raportul**. Raportul se rulează automat cu valorile implicite când se deschide pagina.
4. Patru **carduri KPI** afișează indicatorii de donații pentru intervalul selectat:
   - **Total donat** -- Suma totală donată.
   - **Donație medie** -- Valoarea medie a unei donații.
   - **Donatori unici** -- Numărul de persoane distincte care au donat.
   - **Număr total de donații** -- Numărul total de donații individuale.
5. Sub indicatorii KPI, un grafic cu bare arată donațiile pe săptămână, lună sau trimestru, defalcate pe fond.
6. Fă clic pe **Opțiuni de descărcare** și alege **Sumar** pentru a exporta un fișier CSV cu totalurile pe perioadă și fond, sau fă clic pe pictograma de imprimare pentru a tipări raportul. Logo-ul bisericii tale (**Logo pentru fundal deschis** din [Site web > Aspect](../website/appearance.md), dacă ai încărcat unul) și numele apar centrate în partea de sus a raportului imprimat. Versiunea tipărită folosește text închis la culoare și un grafic deschis la culoare, chiar dacă folosești B1 Admin în modul întunecat.

Dacă donațiile din perioadă au fost făcute în mai multe monede, totalurile KPI sunt convertite în moneda bisericii tale, iar sub carduri apare o notă **Convertit la cursurile de schimb actuale**. Pentru detalii, consultă [Suport multi-valutar](./multi-currency.md#converted-totals).

:::info
Tabloul de bord afișează date agregate despre donații. Nu include numele donatorilor individuali. Pentru detalii la nivel de donator, folosește pagina [Loturi](batches.md).
:::

## Donatori inactivi

Alege **Donatori inactivi** din comutatorul **Vizualizare** pentru a afișa persoanele care au donat într-o perioadă, dar nu și de atunci. Implicit, compară anul calendaristic trecut cu anul curent până în prezent; schimbă oricare dintre intervalele de date pentru a extinde sau restrânge căutarea. Fiecare rând afișează persoana, data ultimei donații și totalul donat în perioada anterioară, iar **Opțiuni de descărcare > Sumar** descarcă lista ca fișier CSV, util pentru o campanie de corespondență sau o listă de apeluri de follow-up.

## Detalii despre donatori

Pentru o defalcare a celor care au donat, cât și pe ce fond:

1. Navighează la **Donații > Loturi**.
2. Fă clic pe **numele unui lot** pentru a-l deschide.
3. Pagina de detalii a lotului listează fiecare donație, cu metoda de plată (și numărul cecului sau ultimele cifre ale cardului), numele donatorului, data, notele și suma, cu totalul în partea de jos.
4. Fă clic pe **Editează** în rândul unei donații pentru a deschide detaliile complete ale acelei donații, inclusiv fondul.
5. Fă clic pe **Exportă** deasupra listei pentru a descărca un fișier CSV cu toate informațiile despre donatori și donații pentru acel lot.

## Raportul sumar al donațiilor

Raportarea donațiilor este integrată direct în secțiunea Donații: pagina Sumar servește drept raport sumar al donațiilor:

1. În meniul Jump, alege **Donații > Sumar**.
2. În vizualizarea **Tablou de bord**, setează **Data de început** și **Data de sfârșit** în panoul **Filtrează raportul** și fă clic pe **Rulează raportul**.
3. Fă clic pe **Opțiuni de descărcare** și alege **Sumar** pentru a exporta raportul ca fișier CSV.

## Exportul datelor

Poți exporta datele despre donații din mai multe locuri:

- **Pagina Sumar** -- descarcă un fișier CSV cu totalurile donațiilor pe săptămână, lună sau trimestru și fond
- **Pagina de detalii a lotului** -- descarcă un fișier CSV cu donațiile individuale și detaliile donatorilor
- **Pagina de detalii a fondului** -- descarcă istoricul donațiilor pentru un anumit fond

:::tip
Pentru raportarea de sfârșit de an, combină exportul de pe pagina Sumar cu instrumentul [Extrase de donații](giving-statements.md), pentru a obține atât tendințele agregate, cât și extrasele individuale ale donatorilor.
:::

## Pașii următori

- Generează [Extrase de donații](giving-statements.md) pentru donatorii tăi la sfârșitul anului
- Revizuiește [loturile](batches.md) individuale pentru a verifica detaliile donațiilor
- Consultă paginile de detalii ale [fondurilor](funds.md) pentru defalcarea donațiilor pe categorii
