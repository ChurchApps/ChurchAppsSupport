---
title: "Aprobări în calendar"
description: "Revizuiți cererile de rezervare pentru săli și resurse în B1 Admin, verificați conflictele, apoi aprobați sau respingeți, opțional publicând evenimentul."
---

# Aprobări în calendar

<div class="article-intro">

Pagina Aprobări este locul unde administratorii analizează și acționează asupra cererilor în așteptare de rezervare a sălilor și resurselor, precum și asupra evenimentelor din calendar care necesită aprobare înainte de a fi publicate.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați săli sau resurse cu un **Grup de aprobare** în [Săli și resurse](./rooms-resources.md)
- Aveți nevoie de permisiunea **Calendars Admin** sau de permisiunea **content.edit**

</div>

## Deschiderea paginii Aprobări

În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul de sus-stânga), extindeți **Calendars** și faceți clic pe **Approvals**. Aici sunt listate cererile de rezervare și evenimentele care așteaptă analiză.

## Cereri de rezervare

Atunci când un grup creează un eveniment și solicită o sală sau o resursă, cererea apare în secțiunea **Room & Resource Requests**. Fiecare rând afișează:

- Numele evenimentului și data/ora
- Sala sau resursa solicitată (cu cantitatea, pentru resursele cu mai multe unități)
- O etichetă de stare care indică dacă cererea are conflicte

### Indicatori de conflict

Dacă o cerere se suprapune cu o altă rezervare sau cu o perioadă blocată pentru aceeași sală sau resursă, starea acesteia afișează eticheta **Conflicts**; treceți cursorul peste ea pentru a vedea detaliile. Cererile fără suprapuneri afișează **No conflicts**. Analizați cu atenție cererile conflictuale înainte de a aproba oricare dintre ele.

### Aprobarea sau respingerea

Faceți clic pe **Approve** sau **Reject** pentru orice cerere de rezervare (respingerea vă cere mai întâi o confirmare). Grupul solicitant este notificat cu privire la decizie. Rezervările aprobate blochează sala sau resursa respectivă pentru eveniment; rezervările respinse eliberează intervalul pentru alții.

Când faceți clic pe **Approve**, se deschide dialogul **Approve booking**, prin care puteți publica evenimentul în același pas:

1. Bifați **Publish to public calendar** pentru a face evenimentul public în calendarul grupului său. Lăsați caseta nebifată pentru a aproba rezervarea fără a modifica vizibilitatea evenimentului.
2. Odată ce **Publish to public calendar** este bifat, puteți alege opțional un calendar curatoriat din lista **Also add to calendar**, pentru a adăuga evenimentul și în unul dintre [calendarele curatoriate](./curated-calendar.md). Lăsați opțiunea pe **None** pentru a sări peste acest pas. (Această opțiune apare doar dacă aveți permisiunea **content.edit**.)
3. Faceți clic pe **Approve**.

## Evenimente în așteptare

Dacă fluxul de lucru al calendarului dvs. necesită aprobarea evenimentelor înainte ca acestea să devină vizibile publicului, evenimentele în așteptare apar în secțiunea **Event Requests**. Faceți clic pe **Approve** pentru a publica un eveniment în calendar sau pe **Reject** pentru a notifica expeditorul că sunt necesare modificări.

:::tip
Configurați un Grup de aprobare pentru o sală din [Săli și resurse](./rooms-resources.md) pentru a cere aprobarea pentru acea sală. Grupurile cu acces pot solicita apoi sala la crearea evenimentelor, iar aceste cereri ajung în această pagină.
:::

## Articole conexe

- [Săli, resurse și programare](./rooms-resources.md) — configurarea sălilor și resurselor care pot fi rezervate
- [Crearea calendarelor](./creating-calendars.md) — gestionarea calendarelor și a evenimentelor
