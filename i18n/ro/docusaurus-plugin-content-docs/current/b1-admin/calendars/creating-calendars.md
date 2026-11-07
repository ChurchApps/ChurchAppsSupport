---
title: "Crearea calendarelor"
description: "Creați un calendar în B1 Admin, conectați grupuri sau importați fișiere .ics și gestionați evenimentele, înscrierile și notele dintr-un singur loc."
---

# Crearea calendarelor

<div class="article-intro">

Crearea unui calendar în B1 Admin îți permite să construiești o vizualizare selectată a evenimentelor, prin conectarea a unuia sau mai multor grupuri. Evenimentele sunt gestionate de liderii de grup în cadrul grupurilor lor, iar calendarul tău afișează aceste evenimente într-un singur loc. Administratorii cu acces de editare pot adăuga sau modifica evenimente pentru orice grup. Liderii de grup care nu sunt administratori pot gestiona doar evenimentele grupurilor pe care le conduc.

</div>

## Videoclip de instruire

<YouTube id="Ko3kgsCSLFs" title="Crearea calendarelor, evenimentelor și rezervărilor de spații în B1" next="Înregistrarea la evenimente și evenimentele cu plată în B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurează [grupurile](../groups/creating-groups.md) ale căror evenimente dorești să le incluzi în calendar
- Ai nevoie de acces de administrator la secțiunea Calendars din B1 Admin

</div>

## Crearea unui calendar nou

1. În B1 Admin, deschide [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus), extinde **Calendars** și apasă pe **Calendars**.
2. Apasă pe **Add Calendar** din partea de sus a paginii. Formularul pentru calendarul nou se deschide sub lista de calendare.
3. Introdu un **nume** pentru calendar (de exemplu, „Evenimente pentru tineret” sau „Calendarul principal al bisericii”).
4. Adaugă o **descriere** opțională, pentru a ajuta echipa ta să înțeleagă la ce folosește acest calendar.
5. Apasă pe **Create** pentru a salva noul calendar.

## Pagina de detalii a calendarului

După ce creezi un calendar, apasă pe **Manage Events** din rândul său pentru a deschide pagina de detalii. Această pagină are două zone principale:

- **Coloana din stânga** -- Numele calendarului împreună cu acțiunile sale (**New Event**, **Edit**, **Import .ics** și **Print**), urmate de lista **Groups in Calendar**, care arată ce grupuri sunt incluse în calendar. Apasă pe **Remove** lângă un grup pentru a-l scoate din calendar.
- **Zona principală** -- Vizualizarea **Calendar Events**, care afișează evenimentele preluate din grupurile conectate, cu butoanele **Subscribe** și **Add Group** deasupra ei.

## Conectarea grupurilor

Grupurile care au evenimente în calendar apar automat în lista **Groups in Calendar** din partea stângă a paginii de detalii.

1. Apasă pe **Add Group** deasupra calendarului pentru a asocia un grup cu calendarul.
2. Selectează grupul din lista derulantă. Lista include toate grupurile bisericii tale, nu doar grupurile din care faci parte.
3. Alege dacă include **all events** din acel grup sau doar **specific events**.
4. Apasă pe **Save**.

Fiecare eveniment apare în calendar o singură dată. Dacă adaugi un grup întreg, toate evenimentele din grup pe care le adăugaseși deja unul câte unul vor fi incluse în intrarea grupului. Alegerea unor evenimente specifice dintr-un grup care este deja în calendar nu adaugă nimic nou. În lista **Groups in Calendar** apar doar grupurile adăugate integral.

### Importul unui fișier .ics

Apasă pe **Import .ics** pentru a importa evenimente dintr-un alt calendar. Alege **Group** căruia ar trebui să îi aparțină evenimentele, apoi apasă pe **Choose .ics file** sau lipește conținutul fișierului și apasă pe **Import**. Evenimentele sunt create în acel grup, iar grupul este adăugat la calendarul din care ai importat, astfel încât evenimentele apar acolo imediat.

### Eliminarea unui eveniment din calendar

Apasă pe un eveniment din calendar, apoi apasă pe **Remove from Calendar**. Aceasta scoate evenimentul doar din acest calendar -- evenimentul rămâne în grupul său. Dacă evenimentul apare în calendar deoarece a fost adăugat întregul grup, eliminarea lui scoate din calendar toate evenimentele grupului (evenimentele rămân în continuare în grup). Pentru a șterge definitiv un eveniment, șterge-l din [calendarul grupului](../groups/group-calendar.md).

:::tip
Conectarea grupurilor la calendar este o modalitate eficientă de a agrega automat evenimentele. Când un lider de grup adaugă un eveniment în [grupul](../groups/creating-groups.md) său, acesta poate ajunge în calendarul bisericii fără niciun efort suplimentar din partea ta.
:::

:::info
Dacă vrei să creezi un singur calendar care preia evenimente din multe grupuri din cadrul bisericii, consultă [Calendarul selectat](./curated-calendar.md) pentru o abordare simplificată.
:::

## Adăugarea și modificarea evenimentelor {#adding-and-editing-events}

Apasă pe **New Event** în pagina de detalii a calendarului pentru a adăuga un eveniment sau apasă pe un eveniment din calendar, apoi pe **Edit**, pentru a-l modifica. Formularul **New Event** / **Edit Event** are următoarele câmpuri:

- **Group** -- Grupul căruia îi aparține evenimentul. Dacă biserica ta are șabloane de evenimente, poți alege și un **Template** pentru a completa formularul.
- **Title** -- Titlul evenimentului.
- **Event photo** -- Apasă pe **Add Photo** (sau pe caseta goală pentru fotografie) pentru a alege sau a încărca o imagine, decupată într-un format lat de 16:9. Apasă pe **Change Photo** pentru a o înlocui. Fotografia apare în partea de sus a paginii evenimentului de pe site-ul tău și ca miniatură atunci când un element Calendar afișează **Upcoming events** (vezi [Afișarea evenimentelor pe site-ul tău](#showing-events-on-your-website)).
- **Description** -- Afișată pe pagina evenimentului de pe site-ul tău. Sunt acceptate textul îngroșat, listele și linkurile.
- **Start** și **End**, **Repeats** și **Visibility** (**Public** sau **Private**).
- **Tags** -- Etichete separate prin virgulă, de exemplu `youth, students`. Un element Calendar de pe site-ul tău poate fi configurat să afișeze doar evenimentele cu o anumită etichetă. Acesta este același câmp **Tags** care apare în setările de înregistrare ale evenimentului.
- **Who can view notes** și **Who can post notes** -- Cine poate citi și adăuga note la eveniment (vezi [Notele evenimentului](#event-notes)). Alege **Staff only** (implicit), **Group leaders** (liderii grupului evenimentului) sau **Group members** (toți membrii grupului evenimentului, inclusiv liderii săi).
- **Rooms** și **Resources** -- Rezervă spațiu și echipamente pentru eveniment. Vezi [Săli, resurse și programare](./rooms-resources.md).

Apasă pe **Save**. Dacă evenimentul se repetă, B1 îți cere confirmare, deoarece salvarea actualizează fiecare apariție din serie.

### Notele evenimentului {#event-notes}

Fiecare eveniment are propriul fir de note pentru planificare și urmărire. Apasă pe un eveniment din pagina de detalii a calendarului; fereastra afișează detaliile evenimentului, reamintirile sale și **Notes** de mai jos. Scrie o notă și publică-o pentru a o adăuga în fir.

Membrii personalului cu permisiunea de a edita conținutul sau de a administra calendarele pot citi și publica întotdeauna note la evenimente. Setările **Who can view notes** și **Who can post notes** ale evenimentului stabilesc dacă liderii sau membrii grupului evenimentului pot face și ei acest lucru.

### Afișarea evenimentelor pe site-ul tău {#showing-events-on-your-website}

Pentru a afișa un calendar pe site-ul tău, adaugă un element **Calendar** pe o pagină și alege acest calendar. Elementul poate afișa un calendar lunar sau o grilă de miniaturi cu evenimentele viitoare și poate fi limitat la evenimentele cu o anumită etichetă. Vizitatorii care apasă pe un eveniment deschid pagina proprie a evenimentului. Vezi [Utilizarea elementului Calendar](../website/page-editor.md#using-the-calendar-element).

## Activarea înregistrării la evenimente {#enabling-event-registration}

Poți activa înregistrarea pentru orice eveniment din calendar, astfel încât membrii să se poată înscrie prin site-ul B1 sau prin aplicația mobilă.

1. Apasă pe un eveniment existent sau creează unul nou.
2. În editorul de evenimente, activează **Registration**.
3. Configurează setările de înregistrare:
   - **Capacity** (opțional) -- Stabilește un număr maxim de înregistrări. Lasă gol pentru un număr nelimitat.
   - **Registration Opens** -- Data și ora la care devine disponibilă înregistrarea.
   - **Registration Closes** -- Data și ora la care se închide înregistrarea.
   - **Tags** -- Etichete separate prin virgulă (de exemplu, „youth, retreat, vbs”) pentru a ajuta la clasificarea evenimentelor la care se poate înregistra.
   - **Registration Questions** -- Opțional, atașează un [formular](../forms/creating-forms.md), pentru ca cei înscriși să răspundă la întrebări suplimentare (restricții alimentare, mărimea tricoului, persoana de contact în caz de urgență etc.) în timpul înscrierii. Alege **None** pentru a sări peste întrebări.
   - **Enable Waitlist** -- Când evenimentul se umple, permite celor care se înscriu în plus să intre pe o listă de așteptare, în loc să fie refuzați. Vezi [Înregistrările cu plată](./paid-registrations.md#waitlist).
4. Salvează evenimentul.

Pentru evenimentele cu plată, aceeași pagină de setări îți permite să definești **Attendee Types** cu preț, **Selections** opționale (produse suplimentare) și **Discount Codes**, plățile fiind colectate prin furnizorul de donații al bisericii tale. Vezi [Înregistrările cu plată](./paid-registrations.md) pentru ghidul complet.

Odată ce înregistrarea este activată, membrii vor vedea butonul **Register for this Event** atunci când vizualizează evenimentul pe [site-ul B1](../../b1-church/events/registering.md) sau în [aplicația mobilă B1](../../b1-mobile/events/registering.md). Dacă ai atașat un formular, cei înscriși vor vedea un pas **Questions** în timpul înregistrării, iar răspunsurile lor sunt salvate împreună cu înregistrarea.

:::info
Întrebările de înregistrare funcționează doar cu formularele care **nu** sunt marcate ca Restricted. Un formular restricționat este omis automat în timpul înregistrării, în loc să fie afișat, așa că folosește un formular nerestricționat atunci când atașezi întrebări unui eveniment.
:::

### Gestionarea înregistrărilor

Pentru a vizualiza și gestiona înregistrările la evenimentele tale:

1. În meniul Jump, alege **Calendars > Registrations**.
2. Vei vedea un tabel cu toate evenimentele cu înregistrarea activată, care afișează titlul evenimentului, data, numărul actual de înregistrări față de capacitate și etichetele.
3. Apasă pe un eveniment pentru a vedea lista completă a înregistrărilor, inclusiv numele, numărul de membri, tipurile de participanți, starea plății și data înregistrării.
4. Din pagina de detalii, poți:
   - **Add Attendee** -- Înregistrează manual o persoană care s-a înscris offline sau telefonic.
   - **Cancel** înregistrări individuale.
   - **Delete** înregistrări definitiv.
   - **Promote** înregistrări de pe lista de așteptare atunci când se eliberează un loc.
   - **Export CSV** -- Descarcă toate înregistrările, inclusiv tipurile de participanți, selecțiile, sumele plătite și răspunsurile la întrebări.

Dacă evenimentul are atașate întrebări de înregistrare, pagina de detalii afișează și un filtru **Unanswered questions only**, pentru a găsi rapid persoanele înscrise care nu și-au trimis încă răspunsurile, precum și un buton **View Answers** pentru fiecare înregistrare cu răspunsuri, pentru a vedea răspunsurile. Evenimentele cu plată adaugă o coloană **Type**, o coloană **Paid / Total**, numărători pe tip și o fereastră cu detaliile plăților -- vezi [Înregistrările cu plată](./paid-registrations.md#the-registration-roster).

:::tip
Folosește bara de progres a capacității pentru a monitoriza cât de repede se umplu evenimentele. Bara devine roșie atunci când un eveniment ajunge la capacitate sau o depășește.
:::

## Pașii următori

- [Calendarul selectat](./curated-calendar.md) -- Creează un calendar care preia evenimente din mai multe grupuri
- [Înregistrările cu plată](./paid-registrations.md) -- Tipuri de participanți, selecții suplimentare, coduri de reducere, plăți și liste de așteptare
- [Ghidul înregistrării la evenimente](../guides/event-registration.md) -- Ghid pas cu pas pentru configurarea înregistrării la evenimente
- [Prezentarea generală a calendarelor](./index.md) -- Revino la prezentarea generală a calendarelor
