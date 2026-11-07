---
title: "Cereri de înscriere în grupuri"
description: "Revizuiți și aprobați sau refuzați cererile de înscriere în grupuri în B1 Admin, găsiți cererile în așteptare și adăugați un motiv la refuz."
---

# Cereri de înscriere în grupuri

<div class="article-intro">

Când un grup este configurat cu o politică de înscriere bazată pe aprobare, persoanele pot trimite cereri de înscriere. Liderii de grup și administratorii analizează aceste cereri și le aprobă sau le refuză. Astfel, biserica dvs. păstrează controlul asupra componenței grupurilor, iar persoanele interesate pot exprima ușor dorința de a se alătura.

</div>

## Video de instruire

<YouTube id="1vj-suCiIsE" title="Cereri de înscriere în grup și calendarele grupurilor în B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea de a gestiona grupurile sau trebuie să fiți liderul grupului respectiv. Pentru detalii, consultați [Roluri și permisiuni](../people/roles-permissions.md).
- Grupul trebuie să aibă politica de înscriere setată la **Cerere** (aprobare necesară). Pentru a afla cum se configurează politicile de înscriere, consultați [Crearea grupurilor](./creating-groups.md).

</div>

## Înțelegerea politicilor de înscriere

Grupurile pot avea trei politici diferite de înscriere:

- **Deschisă** -- Oricine se poate alătura imediat, fără aprobare
- **Cerere** -- Persoanele trimit o cerere de înscriere care necesită aprobare
- **Închisă** -- Nimeni nu poate solicita înscrierea (membrii trebuie adăugați manual)

Când un grup folosește politica **Cerere**, toate încercările de înscriere trec prin fluxul de aprobare descris pe această pagină.

## Vizualizarea cererilor în așteptare

### Pentru liderii de grup

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) și alegeți **People > Groups** (Persoane > Grupuri)
2. Faceți clic pe numele grupului
3. Secțiunea **Members** (Membri) arată câte cereri sunt în așteptare. Faceți clic pe **All members** (Toți membrii) -- cererile în așteptare pentru acest grup apar în partea de sus a listei de membri

### Pentru administratori

Administratorii cu permisiuni de gestionare a grupurilor pot vedea cererile în așteptare din toate grupurile:

1. În meniul Jump, alegeți **People > Groups** (Persoane > Grupuri)
2. Faceți clic pe butonul **pending requests** (cereri în așteptare) din antetul paginii (de exemplu, „3 pending requests"). Acesta apare doar când există cereri în așteptare.
3. Analizați toate cererile în așteptare la nivelul întregii biserici

## Analizarea unei cereri de înscriere

Fiecare cerere de înscriere afișează:

- **Numele și fotografia persoanei** -- Persoana care solicită înscrierea
- **Mesaj opțional** -- Un mesaj personal în care persoana explică de ce dorește să se alăture (dacă a fost furnizat)
- **Data cererii** -- Momentul în care a fost trimisă cererea

Pentru a analiza o cerere:

1. Citiți mesajul persoanei, dacă l-a furnizat
2. Faceți clic pe numele persoanei pentru a vedea profilul, dacă este cazul
3. Decideți dacă aprobați sau refuzați cererea

## Aprobarea unei cereri

1. Faceți clic pe **Approve** (Aprobă) la cererea de înscriere
2. Persoana este adăugată imediat în grup ca membru
3. Solicitantul primește o notificare că cererea sa a fost aprobată
4. Cererea este marcată ca aprobată în sistem

:::tip
Când aprobați o cerere, persoana devine un membru obișnuit al grupului. Ulterior, o puteți promova ca lider de grup, dacă este necesar, din pagina [Membrii grupului](./group-members.md).
:::

## Refuzarea unei cereri

1. Faceți clic pe **Decline** (Refuză) la cererea de înscriere
2. Opțional, furnizați un motiv pentru refuz (de până la 500 de caractere)
3. Faceți clic pe **Confirm** (Confirmă)
4. Solicitantul primește o notificare cu motivul refuzului (dacă a fost furnizat)
5. Cererea este marcată ca refuzată

:::info
Furnizarea unui motiv pentru refuz îl ajută pe solicitant să înțeleagă de ce cererea nu a fost aprobată și îl poate încuraja să încerce din nou mai târziu sau să exploreze alte grupuri.
:::

## Aprobarea din pagina Sarcini

Fiecare cerere de înscriere creează și o sarcină în **Serving &rarr; My Work** (Serving &rarr; Lucrarea mea), cu titlul „*Persoana* a solicitat să se alăture grupului *Grup*.” Sarcina este atribuită liderilor grupului. Dacă grupul nu are încă un lider, sarcina este trimisă oricărui membru al personalului care are permisiunea **Group Members &gt; Edit** (Membri grup &gt; Editare) sau, dacă nimeni nu are această permisiune, administratorilor de domeniu ai bisericii dvs. Membrii personalului și administratorii care primesc sarcina în acest mod primesc, de asemenea, o notificare care duce direct la ea.

Deschiderea sarcinii afișează numele solicitantului, grupul și mesajul său opțional, cu butoanele **Approve** (Aprobă) și **Decline** (Refuză) direct pe cardul sarcinii. (Refuzul deschide același câmp opțional pentru motiv, descris mai sus.) Astfel, liderii au o a doua modalitate, bazată pe notificări, de a răspunde unei cereri, fără a deschide lista de membri a grupului.

Decizia luată pentru o cerere din oricare dintre aceste locuri -- lista de membri a grupului sau cardul de sarcină -- închide cererea peste tot, astfel încât liderii nu văd niciodată o sarcină depășită pentru o cerere deja rezolvată.

## Notificări

Sistemul de cereri de înscriere trimite automat notificări:

- **Când o cerere este trimisă** -- Toți liderii de grup primesc o notificare. Dacă grupul nu are un lider, sunt notificați în schimb membrii personalului sau administratorii cărora le este atribuită sarcina (vezi mai sus).
- **Când o cerere este aprobată** -- Solicitantul primește o confirmare
- **Când o cerere este refuzată** -- Solicitantul primește o notificare cu motivul refuzului, dacă există

Notificările apar în centrul de notificări al utilizatorului de pe B1.church și în aplicația mobilă. În clopotelul de notificări din B1 Admin, un clic pe o notificare de cerere de înscriere (sau pe **View Details** -- Vezi detaliile) deschide grupul pe site-ul B1.church al bisericii dvs., într-o filă nouă.

## Gestionarea cererilor din partea membrului

Persoanele își pot gestiona propriile cereri de înscriere de pe B1.church:

- Vizualizează starea cererilor lor în așteptare pe pagina cu detaliile grupului
- Anulează o cerere în așteptare, dacă își schimbă părerea
- Află dacă cererea lor a fost aprobată sau refuzată

## Bune practici

- **Răspundeți prompt** -- Încercați să analizați cererile în 24-48 de ore, pentru ca persoanele să nu rămână în așteptare
- **Fiți clari în motivele de refuz** -- Ajutați persoanele să înțeleagă pașii următori sau alternativele disponibile
- **Verificați profilurile** -- Analizați profilul persoanei pentru a vedea dacă se potrivește grupului
- **Comunicați așteptările** -- Asigurați-vă că descrierea grupului indică limpede pentru cine este grupul

## Articole conexe

- [Crearea grupurilor](./creating-groups.md) -- Aflați cum să configurați grupurile și politicile de înscriere
- [Membrii grupului](./group-members.md) -- Gestionați membrii existenți ai grupului
- [Calendarul grupului](./group-calendar.md) -- Programați întâlnirile și evenimentele grupului
