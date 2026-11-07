---
title: "Înregistrări cu plată"
description: "Configurați în B1 Admin înscrieri plătite: tipuri de participanți cu preț, extra-opțiuni, coduri de reducere, liste de așteptare și plăți online."
---

# Înregistrări cu plată

<div class="article-intro">

Înregistrarea la un eveniment poate depăși simpla numărare a participanților. Poți defini tipuri de participanți cu preț (de exemplu Adult și Copil), poți oferi suplimente opționale cu propriile prețuri și cantități, poți crea coduri de reducere și poți colecta plata la înregistrare prin furnizorul de donații pe care biserica ta îl folosește deja. Când un eveniment se ocupă complet, o listă de așteptare opțională păstrează membrii interesați în șir și îi promovează automat pe măsură ce se eliberează locuri.

</div>

## Video de instruire

<YouTube id="eGSZv24Dlzk" title="Înregistrarea la evenimente și evenimentele cu plată în B1" next="Lansarea site-ului bisericii tale în B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Activează mai întâi înregistrarea pentru eveniment — vezi [Crearea calendarelor](./creating-calendars.md#enabling-event-registration)
- Pentru a colecta plăți online, biserica ta trebuie să aibă [donațiile online configurate](../donations/online-giving-setup.md) (Stripe, PayPal sau Kingdom Funding). Evenimentele gratuite nu necesită configurarea donațiilor. Fără donații online, înregistrările cu plată funcționează în continuare, dar oamenii plătesc direct bisericii — vezi [Biserici fără donații online](#churches-without-online-giving).

</div>

## Deschiderea setărilor de înregistrare

1. În B1 Admin, deschide [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul de sus-stânga), alege **Calendars > Registrations** și deschide evenimentul tău (sau deschide evenimentul din calendarul său).
2. Cardul **Registration Settings** afișează elementele de bază — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** și **Registration Questions**.
3. Sub elementele de bază sunt trei acordeoane: **Attendee Types**, **Selections** și **Discount Codes**.

## Tipuri de participanți

Tipurile de participanți îți permit să percepi prețuri diferite pentru categorii diferite de participanți și să limitezi fiecare categorie separat.

1. Extinde acordeonul **Attendee Types** și apasă **Add Type**.
2. Introdu un **Name** (de exemplu „Adult", „Copil", „Student").
3. Setează un **Price**. Folosește 0 pentru un tip gratuit.
4. Opțional, setează o **Capacity** doar pentru acest tip (de exemplu, doar 20 de locuri pentru copii). Lasă necompletat pentru a nu avea o limită pe tip.
5. Apasă **Save**.

În timpul înregistrării, fiecare participant alege un tip; tipurile epuizate apar ca **Sold out** și nu pot fi selectate. Lista participanților arată tipul fiecărui participant și numărătorii curente pe tip.

## Selecții

Selecțiile sunt suplimente opționale cu preț — tricouri, pachete de masă, upgrade-uri pentru activități.

1. Extinde acordeonul **Selections** și apasă **Add Selection**.
2. Introdu un **Name**, o **Description** opțională și un **Price** (0 apare ca „Free").
3. Opțional, setează o **Capacity** (numărul total disponibil pentru toate înregistrările) și un **Max Qty** (numărul maxim pe care o singură înregistrare îl poate comanda).
4. Apasă **Save**.

Persoanele înscrise își aleg cantitățile în timpul înregistrării, iar totalurile se scad din capacitate, astfel încât să nu vinzi niciodată mai mult decât ai.

## Coduri de reducere

1. Extinde acordeonul **Discount Codes** și apasă **Add Discount Code**.
2. Introdu **Code**-ul pe care îl vor tasta persoanele înscrise.
3. Alege **Type** — **Percent** sau **Amount** — și **Value**-ul acestuia.
4. Opțional, limitează codul cu o **Start Date** / **End Date**, un **Min Members** (numărul minim de participanți din înregistrare) și **Max Uses**.
5. Apasă **Save**.

Fiecare cod afișează un contor **Uses**, ca să vezi de câte ori a fost folosit. Persoanele înscrise primesc feedback imediat când aplică un cod — inclusiv mesaje clare atunci când un cod a expirat, nu a început încă sau necesită mai mulți participanți.

## Lista de așteptare

Activează **Enable Waitlist** în cardul Registration Settings. Când evenimentul ajunge la capacitate:

- Persoanelor care se înscriu li se oferă un loc pe lista de așteptare în loc să fie refuzate. Ele completează aceeași înregistrare (plata este omisă cât timp sunt pe lista de așteptare).
- Când cineva anulează, înregistrarea cea mai veche de pe lista de așteptare este **promovată automat** și primește un e-mail care anunță că s-a eliberat un loc. Dacă datorează un sold, e-mailul le oferă un link către [Înregistrările mele](../../b1-church/events/my-registrations.md) de pe site-ul B1 al bisericii, unde pot finaliza plata.
- Poți promova manual pe cineva oricând, cu acțiunea **Promote** de pe rândul de pe lista de așteptare — util după ce mărești capacitatea evenimentului.

:::info
Înregistrările promovate rămân *în așteptare* până când se plătește orice sold; plata (sau faptul că nu există nimic de plătit) le confirmă.
:::

## Lista înregistrărilor

Deschide un eveniment din pagina Registrations pentru a vedea toate înregistrările. Titlul cardului arată câte înregistrări ocupă un loc din capacitate (de exemplu, *Registrations (18 / 20)*). Sunt numărate doar înregistrările în așteptare și cele confirmate; când există persoane pe lista de așteptare, titlul adaugă numărul acestora (de exemplu, *· 3 waitlisted*), iar același număr apare sub bara de capacitate. Tabelul afișează **Name**, **Members**, **Type** (tipul fiecărui participant), **Paid / Total** (cu un avertisment de sold când mai este de plătit), **Status** și **Date**, precum și insigne cu numărul pe tip deasupra tabelului.

- Apasă iconița de detalii de pe un rând pentru a deschide dialogul **Registration Details** — membri, selecții, plătit/sold și un tabel **Payments** cu fiecare plată (sumă, metodă, dată).
- **Export CSV** descarcă lista completă, cu coloane pentru membri, tipuri de participanți, selecții, plătit/total/sold, status și câte o coloană pentru fiecare întrebare de înregistrare.
- **Add Attendee** înregistrează o persoană înscrisă offline sau telefonic, pentru orice persoană din biserica ta. Alege persoana și, la un eveniment cu plată, tipul ei de participant. Cardul ei nu este debitat: o înregistrare cu plată se salvează ca **pending**, cu suma integrală ca sold de plată. Dacă biserica ta are donații online, persoana poate plăti din [Înregistrările mele](../../b1-church/events/my-registrations.md); altfel, încasează suma personal. Pentru a adăuga participanți ai nevoie de permisiunea Registrations Edit.

:::info
Rambursările nu se procesează în B1. Dacă trebuie să rambursezi o înregistrare cu plată anulată, emite rambursarea din panoul furnizorului tău de donații (de exemplu, Stripe).
:::

## Cum funcționează plata

Plățile trec prin același gateway de donații pe care biserica ta îl folosește deja pentru donații — datele cardului merg direct la furnizor și nu ajung niciodată pe serverele B1. Prețurile sunt calculate întotdeauna pe server, pe baza tipurilor, selecțiilor și codurilor de reducere configurate, astfel încât o persoană înscrisă nu poate modifica totalul. Membrii autentificați pot plăti cu un card salvat. Oaspeții introduc un card la finalizarea comenzii și trebuie să bifeze **Nu sunt un robot** înainte de a plăti.

### Biserici fără donații online

Dacă biserica ta nu are configurat un furnizor de donații, evenimentele cu plată pot primi în continuare înregistrări. Pasul de plată le spune persoanelor înscrise că plata online nu este disponibilă și că pot plăti direct bisericii, iar un buton **Register and Pay Later** salvează înregistrarea. Aceasta se salvează ca **pending**, cu suma integrală ca sold de plată, și apare pe listă cu un avertisment de sold. Încasează banii în modul obișnuit al bisericii tale.

:::info
B1 nu are o modalitate de a marca o plată offline ca fiind primită. Soldul rămâne pe listă și pe cardul [Înregistrările mele](../../b1-church/events/my-registrations.md) al persoanei înscrise și după ce îl încasezi, așa că ține propria evidență a celor care au plătit.
:::

## Articole conexe

- [Crearea calendarelor](./creating-calendars.md#enabling-event-registration) — activează înregistrarea și setările de bază
- [Configurarea donațiilor online](../donations/online-giving-setup.md) — configurează gateway-ul de plată folosit la finalizarea comenzii
- [Înscrierea la evenimente](../../b1-church/events/registering.md) — ce văd membrii când se înscriu
- [Înregistrările mele](../../b1-church/events/my-registrations.md) — cum plătesc membrii soldurile și își modifică înregistrările
