---
title: "Crearea calendarelor"
description: "Creați un calendar în B1 Admin, conectați grupuri sau importați fișiere .ics și gestionați evenimentele, înregistrările și notele acestuia dintr-un singur loc."
---

# Crearea calendarelor

<div class="article-intro">

Crearea unui calendar în B1 Admin vă permite să construiți o vizualizare selectată a evenimentelor, conectând unul sau mai multe grupuri. Evenimentele sunt gestionate de liderii de grupuri în cadrul propriilor grupuri, iar calendarul dumneavoastră afișează aceste evenimente într-un singur loc. Administratorii cu acces de editare pot adăuga sau modifica evenimente pentru orice grup. Liderii de grupuri care nu sunt administratori pot gestiona doar evenimentele grupurilor pe care le conduc.

</div>

## Videoclip de instruire

<YouTube id="Ko3kgsCSLFs" title="Crearea calendarelor, evenimentelor și rezervărilor de spații în B1" next="Înregistrarea la evenimente și evenimentele cu plată în B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați [grupurile](../groups/creating-groups.md) ale căror evenimente doriți să le includeți în calendar
- Aveți nevoie de acces administrativ la secțiunea Calendare din B1 Admin

</div>

## Crearea unui calendar nou

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus), extindeți **Calendars** și faceți clic pe **Calendars**.
2. Faceți clic pe **Add Calendar** din partea de sus a paginii. Formularul pentru un calendar nou se deschide sub lista calendarelor.
3. Introduceți un **nume** pentru calendar (de exemplu, „Evenimente pentru tineret” sau „Calendarul principal al bisericii”).
4. Adăugați o **descriere** opțională, pentru a ajuta echipa să înțeleagă scopul acestui calendar.
5. Faceți clic pe **Create** pentru a salva noul calendar.

## Pagina de detalii a calendarului

După ce ați creat un calendar, faceți clic pe **Manage Events** de pe rândul acestuia pentru a deschide pagina de detalii. Această pagină are două zone principale:

- **Coloana din stânga** -- Numele calendarului împreună cu acțiunile sale (**New Event**, **Edit**, **Import .ics** și **Print**), urmate de lista **Groups in Calendar**, care arată ce grupuri sunt incluse în acest calendar. Faceți clic pe **Remove** lângă un grup pentru a-l scoate din calendar.
- **Zona principală** -- Vizualizarea **Calendar Events**, care afișează evenimentele preluate din grupurile conectate, cu butoanele **Subscribe** și **Add Group** deasupra ei.

## Conectarea grupurilor

Grupurile care au evenimente în calendar apar automat în lista **Groups in Calendar**, din partea stângă a paginii de detalii.

1. Faceți clic pe **Add Group** deasupra calendarului pentru a asocia un grup cu calendarul dumneavoastră.
2. Selectați grupul din lista derulantă. Lista include toate grupurile din biserica dumneavoastră, nu doar grupurile din care faceți parte.
3. Alegeți dacă să includeți **toate evenimentele** din grupul respectiv sau doar **evenimente specifice**.
4. Faceți clic pe **Save**.

Fiecare eveniment apare în calendar o singură dată. Dacă adăugați un grup întreg, orice eveniment al acestuia pe care l-ați adăugat deja individual este inclus în intrarea grupului, iar alegerea unor evenimente specifice dintr-un grup deja prezent în calendar nu adaugă nimic nou. Doar grupurile adăugate integral sunt listate sub **Groups in Calendar**.

### Importarea unui fișier .ics

Faceți clic pe **Import .ics** pentru a importa evenimente dintr-un alt calendar. Alegeți **Grupul** căruia ar trebui să îi aparțină evenimentele, apoi faceți clic pe **Choose .ics file** sau lipiți conținutul fișierului, și faceți clic pe **Import**. Evenimentele sunt create în acel grup, iar grupul este adăugat la calendarul din care ați importat, astfel încât evenimentele apar acolo imediat.

### Eliminarea unui eveniment din calendar

Faceți clic pe un eveniment din calendar, apoi faceți clic pe **Remove from Calendar**. Aceasta scoate evenimentul doar din acest calendar -- evenimentul rămâne în grupul său. Dacă evenimentul apare în calendar deoarece întregul grup a fost adăugat, eliminarea lui scoate din calendar toate evenimentele acelui grup (evenimentele rămân însă în grup). Pentru a șterge definitiv un eveniment, ștergeți-l din [calendarul grupului](../groups/group-calendar.md).

:::tip
Conectarea grupurilor la calendarul dumneavoastră este o modalitate eficientă de a agrega automat evenimentele. Atunci când un lider de grup adaugă un eveniment în [grupul](../groups/creating-groups.md) său, acesta poate ajunge în calendarul la nivelul întregii biserici fără niciun efort suplimentar din partea dumneavoastră.
:::

:::info
Dacă doriți să creați un singur calendar care preia evenimente din multe grupuri din cadrul bisericii, consultați [Calendarul curatoriat](./curated-calendar.md) pentru o abordare simplificată.
:::

## Adăugarea și editarea evenimentelor {#adding-and-editing-events}

Faceți clic pe **New Event** în pagina de detalii a calendarului pentru a adăuga un eveniment, sau faceți clic pe un eveniment din calendar și apoi pe **Edit** pentru a-l modifica. Formularul **New Event** / **Edit Event** conține următoarele câmpuri:

- **Group** -- Grupul căruia îi aparține evenimentul. Dacă biserica dumneavoastră are șabloane de evenimente, puteți alege și un **Template** pentru a completa formularul.
- **Title**
- **Event photo** -- Faceți clic pe **Add Photo** (sau pe caseta goală pentru fotografie) pentru a alege sau încărca o imagine, decupată într-un format lat de 16:9. Faceți clic pe **Change Photo** pentru a o înlocui. Fotografia este afișată în partea de sus a paginii evenimentului de pe site-ul dumneavoastră și ca miniatură atunci când un element Calendar afișează **Upcoming events** (consultați [Afișarea evenimentelor pe site-ul dumneavoastră](#showing-events-on-your-website)).
- **Description** -- Afișată pe pagina evenimentului de pe site-ul dumneavoastră. Sunt acceptate text îngroșat, liste și linkuri.
- **Start** și **End**, **Repeats** și **Visibility** (**Public** sau **Private**).
- **Tags** -- Etichete separate prin virgulă, de exemplu `youth, students`. Un element Calendar de pe site-ul dumneavoastră poate fi configurat să afișeze doar evenimentele cu o anumită etichetă. Acesta este același câmp **Tags** afișat în setările de înregistrare ale evenimentului.
- **Who can view notes** și **Who can post notes** -- Cine poate citi și adăuga note la eveniment (consultați [Notele evenimentului](#event-notes)). Alegeți **Staff only** (implicit), **Group leaders** (liderii grupului evenimentului) sau **Group members** (toți membrii grupului evenimentului, inclusiv liderii).
- **Rooms** și **Resources** -- Rezervați spațiu și echipamente pentru eveniment. Consultați [Săli, resurse și programare](./rooms-resources.md).

Faceți clic pe **Save**. Dacă evenimentul se repetă, B1 vă cere confirmarea, deoarece salvarea actualizează fiecare apariție din serie.

### Notele evenimentului {#event-notes}

Fiecare eveniment are propriul fir de note pentru planificare și urmărire. Faceți clic pe un eveniment din pagina de detalii a calendarului; dialogul afișează detaliile evenimentului, reamintirile sale și **Notes** de mai jos. Scrieți o notă și publicați-o pentru a o adăuga în fir.

Membrii personalului cu permisiunea de a edita conținutul sau de a administra calendarele pot întotdeauna să citească și să publice note la evenimente. Setările **Who can view notes** și **Who can post notes** ale evenimentului stabilesc dacă liderii sau membrii grupului evenimentului pot face și ei acest lucru.

### Afișarea evenimentelor pe site-ul dumneavoastră {#showing-events-on-your-website}

Pentru a afișa un calendar pe site-ul dumneavoastră, adăugați un element **Calendar** pe o pagină și alegeți acest calendar. Elementul poate afișa un calendar lunar sau o grilă de miniaturi cu evenimente viitoare și poate fi limitat la evenimentele cu o singură etichetă. Vizitatorii care fac clic pe un eveniment deschid pagina proprie a evenimentului. Consultați [Utilizarea elementului Calendar](../website/page-editor.md#using-the-calendar-element).

## Activarea înregistrării la evenimente {#enabling-event-registration}

Puteți activa înregistrarea pentru orice eveniment din calendar, astfel încât membrii să se poată înscrie prin site-ul B1 sau aplicația mobilă B1.

1. Faceți clic pe un eveniment existent sau creați unul nou.
2. În editorul de evenimente, activați **Registration**.
3. Configurați setările de înregistrare:
   - **Capacity** (opțional) -- Setați un număr maxim de înregistrări. Lăsați gol pentru un număr nelimitat.
   - **Registration Opens** -- Data și ora la care înregistrarea devine disponibilă.
   - **Registration Closes** -- Data și ora la care se încheie înregistrarea.
   - **Tags** -- Etichete separate prin virgulă (de exemplu, „youth, retreat, vbs”) pentru a ajuta la clasificarea evenimentelor la care se poate înscrie cineva.
   - **Registration Questions** -- Opțional, atașați un [formular](../forms/creating-forms.md), astfel încât cei înscriși să răspundă la întrebări suplimentare (restricții alimentare, mărimea tricoului, persoană de contact în caz de urgență etc.) ca parte a procesului de înscriere. Alegeți **None** pentru a nu adăuga întrebări.
   - **Enable Waitlist** -- Când evenimentul se ocupă, permiteți cursanților suplimentari să se înscrie pe o listă de așteptare, în loc să fie refuzați. Consultați [Înregistrările cu plată](./paid-registrations.md#waitlist).
4. Salvați evenimentul.

Pentru evenimentele cu plată, aceeași pagină de setări vă permite să definiți **Attendee Types** cu preț, **Selections** opționale (produse suplimentare) și **Discount Codes**, plata fiind colectată prin furnizorul de donații al bisericii dumneavoastră. Consultați [Înregistrările cu plată](./paid-registrations.md) pentru ghidul complet.

Odată ce înregistrarea este activată, membrii vor vedea un buton **Register for this Event** atunci când vizualizează evenimentul pe [B1.church sau în aplicația B1](../../b1-church/events/registering.md). Dacă ați atașat un formular, cei înscriși vor vedea un pas **Questions** în timpul înregistrării, iar răspunsurile lor sunt salvate împreună cu înregistrarea.

:::info
Întrebările de înregistrare funcționează doar cu formulare care **nu** sunt marcate ca Restricted. Un formular restricționat este omis automat în timpul înregistrării, în loc să fie afișat, așa că folosiți un formular nerestricționat atunci când atașați întrebări unui eveniment.
:::

### Gestionarea înregistrărilor

Pentru a vizualiza și gestiona înregistrările la evenimentele dumneavoastră:

1. În meniul Jump, alegeți **Calendars > Registrations**.
2. Veți vedea un tabel cu toate evenimentele care au înregistrarea activată, care afișează titlul evenimentului, data, numărul actual de înregistrări față de capacitate și etichetele.
3. Faceți clic pe un eveniment pentru a vedea lista completă a înregistrărilor, inclusiv nume, numărul de membri, tipurile de participanți, starea plății și data înregistrării.
4. Din pagina de detalii, puteți:
   - **Add Attendee** -- Înregistrați manual o persoană care s-a înscris offline sau telefonic.
   - **Cancel** înregistrări individuale
   - **Delete** înregistrări definitiv
   - **Promote** înregistrările de pe lista de așteptare atunci când se eliberează un loc
   - **Export CSV** -- Descărcați toate înregistrările, inclusiv tipurile de participanți, selecțiile, sumele plătite și răspunsurile la întrebări

Dacă evenimentul are întrebări de înregistrare atașate, pagina de detalii afișează și un filtru **Unanswered questions only**, pentru a găsi rapid persoanele înscrise care nu au trimis încă răspunsuri, precum și un buton **View Answers** pe fiecare înregistrare cu răspunsuri, pentru a vedea răspunsurile acestora. Evenimentele cu plată adaugă o coloană **Type**, o coloană **Paid / Total**, numărători pe tip și un dialog cu detaliile plăților -- consultați [Înregistrările cu plată](./paid-registrations.md#the-registration-roster).

:::tip
Folosiți bara de progres a capacității pentru a monitoriza cât de repede se ocupă evenimentele. Bara devine roșie când un eveniment ajunge la capacitate sau o depășește.
:::

## Pașii următori

- [Calendarul curatoriat](./curated-calendar.md) -- Creați un calendar care preia date din mai multe grupuri
- [Înregistrările cu plată](./paid-registrations.md) -- Tipuri de participanți, selecții suplimentare, coduri de reducere, plăți și liste de așteptare
- [Ghidul de înregistrare la evenimente](../guides/event-registration.md) -- Ghid pas cu pas pentru configurarea înregistrării la evenimente
- [Prezentarea generală a calendarelor](./index.md) -- Reveniți la prezentarea generală a calendarelor
