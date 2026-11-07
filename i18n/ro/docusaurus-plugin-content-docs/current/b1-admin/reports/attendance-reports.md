---
title: "Rapoarte de prezență"
---

# Rapoarte de prezență

<div class="article-intro">

B1 Admin oferă trei rapoarte de prezență care vă ajută să înțelegeți cum interacționează oamenii cu serviciile și grupurile dumneavoastră. Fiecare raport oferă o perspectivă diferită asupra datelor de prezență, de la tendințe generale până la defalcări zilnice.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Asigurați-vă că prezența este [urmărită constant](../attendance/tracking-attendance.md) pentru serviciile și grupurile dumneavoastră
- Verificați că [grupurile](../groups/creating-groups.md) și serviciile sunt configurate în B1 Admin
- Aveți nevoie de [permisiunile](../settings/roles-permissions.md) corespunzătoare pentru a accesa rapoartele

</div>

## Tendința prezenței

Raportul **Tendința prezenței** arată cum se modifică prezența în timp pentru serviciile dumneavoastră.

1. Accesați direct **admin.b1.church/reports/attendanceTrend** în browser (rapoartele nu au o intrare în meniul de navigare, deci salvarea adresei în marcaje este cel mai simplu mod de a reveni la ele). Același raport se află și pe pagina Prezență: faceți clic pe **Toți anii**, apoi alegeți fila **Tendința prezenței**.
2. Opțional, selectați un **Campus**, **Serviciu**, **Ora serviciului** sau **Grup** pentru a filtra rezultatele.
3. Setați **Data de început** și **Data de sfârșit**. Implicit, raportul acoperă ultimul an, de la acum un an până astăzi, iar data de sfârșit este inclusă integral. Faceți clic pe **Rulează raportul**.
4. Raportul afișează un grafic cu bare și un tabel cu totalul vizitelor pe săptămână. Fiecare săptămână este etichetată cu data duminicii respective, iar coloana **Datele sesiunilor** din tabel listează datele efective din acea săptămână care au avut prezență (de exemplu, „9/27, 9/30”).

Acest raport este util pentru identificarea unor modele precum scăderile sezoniere, tendințele de creștere sau impactul evenimentelor speciale.

## Prezența în grupuri

Raportul **Prezența în grupuri** arată cine a participat la fiecare sesiune de grup dintr-un interval de date.

1. Accesați direct **admin.b1.church/reports/groupAttendance** în browser sau, pe pagina Prezență, faceți clic pe **Toți anii** și alegeți fila **Prezența în grupuri**.
2. Opțional, selectați un **Campus** și un **Serviciu**.
3. Setați **Data de început** și **Data de sfârșit**. Implicit, raportul acoperă de la ultima duminică până astăzi, iar data de sfârșit este inclusă integral.
4. Faceți clic pe **Rulează raportul**.

Rezultatele sunt grupate după data sesiunii, apoi după ora serviciului, apoi după grup, cu persoanele care au participat listate sub fiecare grup. Orele serviciilor, grupurile și numele sunt sortate alfabetic. Lângă numele fiecărei persoane, coloana **Check-in** arată ora la care a fost înregistrată prezența (gol dacă nu există o oră salvată), iar coloana **Statutul de membru** arată statutul acesteia, de exemplu Membru sau Vizitator. Sunt incluse și sesiunile pentru grupurile care nu se întâlnesc la o oră de serviciu; acestea apar fără oră de serviciu.

Pentru a descărca o foaie de calcul, faceți clic pe **Opțiuni de descărcare** și alegeți **Sumar**. Fișierul CSV conține:

- Un rând pentru fiecare membru al fiecărui grup care s-a întâlnit în intervalul de date, sortat după grup și apoi după nume.
- Numele persoanei și numele grupului în primele coloane.
- Câte o coloană pentru fiecare sesiune datată, denumită cu serviciul, ora serviciului și data (de exemplu, „Duminică - 9:00 AM (2026-09-27)”), iar fiecare persoană este marcată **prezent** sau **absent**. O sesiune fără oră de serviciu este denumită doar după dată.

Folosiți acest raport pentru a compara prezența între grupuri și pentru a identifica ce grupuri cresc sau necesită atenție.

## Prezența zilnică în grupuri

Raportul Prezența zilnică în grupuri (intitulat **Prezența în grupuri pe zi**) oferă un număr zi de zi al persoanelor care au participat la un grup.

1. Accesați direct **admin.b1.church/reports/dailyGroupAttendance** în browser.
2. Folosiți listele derulante **Campus**, **Serviciu** și **Ora serviciului** pentru a restrânge lista, apoi alegeți **Grupul** pe care doriți să îl analizați.
3. Rulați raportul. Acesta listează fiecare zi în care s-a întâlnit grupul, de la cea mai veche la cea mai recentă, cu **Data** și numărul de **Participanți** înregistrați în acea zi.

Acest raport oferă detalii granulare, util pentru înțelegerea variațiilor de la o săptămână la alta sau pentru identificarea unor zile cu prezență neobișnuit de mare sau de mică.

:::tip
Folosiți raportul Tendința prezenței pentru o imagine de ansamblu și raportul Prezența zilnică în grupuri atunci când aveți nevoie să analizați în detaliu anumite date.
:::

## Utilizări practice

- **Planificare** -- Folosiți tendințele de prezență pentru a planifica locurile, personalul și resursele pentru serviciile viitoare.
- **Activități de sensibilizare** -- Identificați din timp modelele de scădere a prezenței, pentru a putea contacta membrii.
- **Rapoarte pentru consiliu** -- Includeți datele de prezență în rapoartele regulate ale conducerii pentru a arăta starea activității din slujire.
- **Evaluarea evenimentelor** -- Comparați prezența înainte și după evenimentele speciale pentru a măsura impactul acestora.

:::warning
Datele de prezență sunt înregistrate prin procesele de check-in ale grupurilor și serviciilor dumneavoastră. Dacă prezența nu este urmărită constant, rapoartele nu vor reflecta cu acuratețe participarea reală. Consultați [Urmărirea prezenței](../attendance/tracking-attendance.md) pentru instrucțiunile de configurare.
:::
