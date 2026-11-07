---
title: "Urmărirea prezenței"
---

# Urmărirea prezenței

<div class="article-intro">

Odată ce campusurile, orele de slujbă și grupurile sunt configurate, B1 Admin facilitează consultarea datelor despre prezență și identificarea tendințelor. Pagina Prezență se deschide cu un rezumat al prezenței din această săptămână, iar rapoartele **Toți anii** oferă două vizualizări principale -- fila **Tendința prezenței** pentru tendințele la nivelul întregii biserici și fila **Prezența pe grupuri** pentru detalii la nivel de grup. Folosiți aceste instrumente pentru a înțelege modelele de creștere, a identifica scăderea implicării și a lua decizii bazate pe date pentru biserica dumneavoastră.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Structura prezenței trebuie configurată cu cel puțin un campus și o oră de slujbă. Consultați [Configurarea prezenței](setup.md) dacă nu ați făcut acest lucru încă.
- Prezența trebuie înregistrată înainte ca rapoartele să afișeze rezultate. Datele pot proveni din [introducerea manuală](recording-attendance.md) sau din [check-in-ul automat](check-in.md).

</div>

## Vizualizarea tendințelor prezenței

1. Deschideți **B1 Admin**, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus), extindeți **Persoane** și faceți clic pe **Prezență**.
2. Faceți clic pe **Toți anii** în coloana din stânga. Fila **Tendința prezenței** este selectată implicit.
3. Raportul se rulează automat când se deschide fila și afișează prezența totală pentru fiecare săptămână.

:::tip
Pentru o privire rapidă asupra săptămânii curente, pagina principală Prezență arată câte persoane sunt în sală în această săptămână, o defalcare pe săli (grupuri), eventualii oaspeți și un grafic cu bare al check-in-urilor din ultimele 13 săptămâni -- fără a fi nevoie de un raport.
:::

## Filtrarea datelor

Folosiți filtrele din caseta **Filtrează raportul** pentru a restrânge rezultatele, apoi faceți clic pe **Rulează raportul**:

- **Campus** -- selectați un campus pentru a vedea prezența doar la acea locație.
- **Serviciu** -- limitați raportul la un singur serviciu.
- **Oră de slujbă** -- alegeți o oră de slujbă pentru a analiza o anumită adunare.
- **Grup** -- afișați prezența pentru un singur grup.
- **Data de început** și **Data de sfârșit** -- intervalul de date inclus. Implicit, raportul acoperă ultimul an, de la acum un an până astăzi, iar data de sfârșit este inclusă integral.

Raportul afișează un grafic cu bare și un tabel cu totalul vizitelor pe săptămână. Fiecare săptămână este etichetată cu data duminicii respective. Tabelul are și o coloană **Datele sesiunilor**, care enumeră datele efective din acea săptămână cu prezență (de exemplu, „9/27, 9/30”), astfel încât să puteți vedea când o adunare de mijlocul săptămânii este numărată în aceeași săptămână cu duminica.

:::info
Rapoartele se rulează automat de fiecare dată când deschideți fila Tendința prezenței, așa că veți vedea mereu cifre actualizate, fără a fi nevoie să apăsați un buton de reîmprospătare.
:::

## Prezența pe grupuri

Fila **Prezența pe grupuri** arată cine a participat la fiecare sesiune de grup. Este utilă când doriți să monitorizați o anumită clasă, o echipă de slujire sau un grup mic, în loc să analizați doar cifrele generale ale slujbelor.

1. În rapoartele **Toți anii**, selectați fila **Prezența pe grupuri**.
2. Opțional, alegeți un **Campus** și un **Serviciu**.
3. Setați **Data de început** și **Data de sfârșit**. Implicit, raportul acoperă de la ultima duminică până astăzi.
4. Faceți clic pe **Rulează raportul**.

Rezultatele sunt grupate după data sesiunii, apoi după ora de slujbă și grup, cu persoanele care au participat listate sub fiecare grup. Orele de slujbă, grupurile și numele sunt sortate alfabetic, astfel încât fiecare titlu apare o singură dată. Rândul fiecărei persoane afișează și o coloană **Check-in la** cu ora la care a fost înregistrată prezența (goală dacă nu există oră salvată) și o coloană **Statutul de membru** (de exemplu, Membru sau Vizitator), pentru a putea identifica rapid oaspeții.

Pentru a descărca datele, faceți clic pe **Opțiuni de descărcare** și alegeți **Rezumat**. Fișierul CSV conține un rând pentru fiecare membru al grupului, sortat după grup și apoi după nume, și câte o coloană pentru fiecare sesiune datată din interval (de exemplu, „Duminică - 9:00 AM (2026-09-27)”), marcată cu **prezent** sau **absent**.

:::tip
Prezența pe grupuri este deosebit de utilă pentru liderii [grupurilor mici](../groups/creating-groups.md) care doresc să urmărească implicarea din cadrul grupului lor în timp.
:::

## Sfaturi pentru utilizarea datelor despre prezență

- Analizați tendințele lunar pentru a identifica din timp modelele sezoniere.
- Comparați datele la nivel de campus pentru a înțelege ce locații cresc.
- Folosiți rapoartele la nivel de grup pentru a urmări [grupurile](../groups/group-members.md) cu prezență în scădere.
- Combinați informațiile despre prezență cu instrumentul [Căutare AI](../people/ai-search.md) pentru a găsi persoane care nu au mai participat recent.

## Pagini conexe

- [Înregistrarea prezenței](recording-attendance.md) -- introduceți manual prezența pentru o sesiune de grup
- [Introducerea numărului de participanți și tendința](headcount-entry.md) -- o alternativă mai simplă, bazată doar pe numărul total, cu propriul grafic săptămânal al tendinței
- [Check-in](check-in.md) -- configurați check-in-ul automat, astfel încât prezența să fie înregistrată automat
