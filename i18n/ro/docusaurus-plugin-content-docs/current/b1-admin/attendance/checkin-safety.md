---
title: "Bezpieczeństwo przy zameldowaniu"
---

Wait, I need to correct myself: the file I'm translating is into **Romanian**, not Polish. Here is the translation:

---
title: "Siguranța la check-in"
---

# Siguranța la check-in

<div class="article-intro">

B1 include un set de controale de siguranță pentru copii la check-in: limite de capacitate pentru săli și raporturi voluntar-copil, recomandări după vârstă și clasă la chioșc, tipuri de check-in care diferențiază membrii, oaspeții și voluntarii și o listă de persoane de încredere pentru ridicare, pe gospodărie, verificată la check-out. Această pagină explică cum să configurezi fiecare funcție de siguranță în B1 Admin.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurează [structura de prezență](setup.md) și [chioșcurile de check-in](check-in.md)
- Sălile sunt [grupuri](../groups/creating-groups.md) legate de orele serviciilor — setările de siguranță de mai jos se află la nivelul grupului
- Pagina către părinte și difuzarea de urgență necesită un furnizor de mesaje text conectat ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) sau Mutual Ministry)

</div>

## Capacitatea sălii și închiderea unei săli

Fiecare sală de check-in (grup) poate impune propriile limite. Deschide grupul, apasă **Edit** pentru a-i modifica setările și găsește secțiunea **Check-In Capacity**:

- **Capacity** -- Numărul maxim de persoane care pot fi check-in-ate în această sală simultan. Când sala este plină, check-in-ul în ea este blocat, iar chioșcul indică sala plină.
- **Guest Capacity** -- O limită separată, opțională, pentru numărul de oaspeți pe care îi poate găzdui sala.
- **Closed for Check-In** -- Setează la **Yes** pentru a opri imediat toate check-in-urile în această sală (de exemplu, când un curs este anulat sau o sală nu este disponibilă). Check-out-urile funcționează în continuare.

## Raporturile voluntarilor

Aceeași secțiune **Check-In Capacity** de la nivelul grupului include regulile de personal:

- **Children per Volunteer** -- Numărul maxim de copii pe care îi poate supraveghea fiecare voluntar check-in-at (de exemplu, 5 înseamnă un voluntar la cinci copii).
- **Minimum Volunteers** -- Numărul minim de voluntari care trebuie să fie check-in-ați înainte ca copiii să poată face check-in în sală.

Voluntarii sunt luați în calcul la aceste reguli atunci când fac check-in cu tipul **Volunteer** la chioșc (vezi [Tipuri de check-in](#check-in-types) mai jos).

### Alegerea între avertisment și blocare

Cât de strict sunt aplicate raporturile este o setare la nivel de biserică:

1. În B1 Admin, mergi la **Settings** și deschide secțiunea **Check-In**.
2. Setează **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- Chioșcul afișează un avertisment când o sală depășește raportul sau are sub numărul minim de voluntari, iar un membru al personalului poate confirma pentru a continua oricum. Aceasta este valoarea implicită.
   - **Block (prevent check-in)** -- Check-in-ul în sală este refuzat până când sunt check-in-ați suficienți voluntari.

:::info
Capacity și Closed for Check-In sunt întotdeauna limite stricte — alegerea între avertisment și blocare se aplică doar raporturilor voluntarilor.
:::

## Tipuri de check-in

Fiecare check-in înregistrează dacă persoana este **Member** (membru), **Guest** (oaspete) sau **Volunteer** (voluntar). Tipul se alege din butoanele de pe ecranul gospodăriei de la chioșc (Member este valoarea implicită). Tipurile alimentează regulile de siguranță — voluntarii asigură acoperirea raporturilor, iar oaspeții se iau în calcul la Guest Capacity a sălii.

## Recomandări de vârstă și clasă pentru săli

Poți stabili pentru fiecare sală limite de vârstă sau de clasă, astfel încât chioșcul să îndrume familiile spre sălile potrivite:

- În setările grupului, folosește secțiunea **Age & Grade** pentru a stabili vârsta minimă și maximă (ani și luni) și/sau clasa pentru sală.
- La chioșc, sălile pentru care copilul se califică sunt evidențiate, iar cele pentru care nu se califică sunt estompate. O sală estompată poate fi totuși aleasă cu confirmarea personalului — recomandările nu blochează niciodată complet.

Clasele trec la nivel nou la **data promovării claselor** din biserica ta:

1. În B1 Admin, mergi la **Settings** și deschide secțiunea **Grade Promotion**.
2. Setează luna și ziua în care biserica ta promovează elevii (de exemplu, 1 august). Vârstele și clasele de la chioșc sunt calculate la data celei mai recente promovări.

## Persoane de încredere și persoane neautorizate pentru ridicare

Fiecare gospodărie poate avea o listă de persoane care au sau nu voie să ridice copiii.

1. Deschide pagina unei persoane din **People** și găsește cardul **Pickup**.
2. Apasă **Add**. Caută o persoană existentă sau adaugă o persoană care nu este în sistem, introducând **Name** (nume), **Relationship** (relație) și o fotografie.
3. Setează **Status**:
   - **Trusted** -- La check-out, această persoană apare ca un card de ridicare pe care se poate apăsa, cu fotografia ei, ceea ce face ridicarea verificată rapidă.
   - **Not Authorized** -- Dacă cineva încearcă să ridice copilul sub acest nume, chioșcul blochează check-out-ul cu un avertisment. Un membru al personalului poate anula blocarea, iar anularea este înregistrată în fișa de prezență.

Apasă butonul de stare de pe cardul persoanei pentru a comuta între Trusted și Not Authorized.

:::tip
Adaugă fotografii persoanelor de încredere pentru ridicare ori de câte ori este posibil — ecranul de check-out afișează fotografia, astfel încât voluntarii pot verifica vizual persoana care stă în fața lor.
:::

## Pagina către părinte și difuzarea de urgență

Ambele funcții trimit mesaje text prin furnizorul de mesaje text conectat al bisericii tale — nu există un serviciu SMS integrat, așa că unul dintre furnizorii suportați trebuie configurat mai întâi.

- **Page a parent** -- De pe ecranul de check-out al unui chioșc cu personal, membrii personalului pot trimite un mesaj text părinților/tutorilor unui copil check-in-at (de exemplu, „Te rugăm să vii la sala de bebeluși”).
- **Emergency broadcast** -- Din setările de administrare ale chioșcului, membrii personalului pot trimite simultan un mesaj text tuturor tutorilor din toate gospodăriile check-in-ate pentru serviciul selectat. Trimiterea necesită scrierea cuvântului **EMERGENCY** pentru confirmare.

Persoanele care s-au dezabonat de la mesajele text sau care nu au un număr de telefon mobil înregistrat sunt omise automat — chioșcul raportează câte mesaje au fost trimise și câte au fost omise.

Pentru ghidul de pe partea chioșcului, vezi [Check-Out și siguranța copiilor](../../b1-checkin/check-in/checking-out).

## Articole conexe

- [Check-In](check-in.md) — configurarea chioșcului și hardware-ul
- [Check-Out și siguranța copiilor](../../b1-checkin/check-in/checking-out) — check-out-ul de la chioșc, verificarea ridicării și fluxurile de paginare
- [Crearea grupurilor](../groups/creating-groups.md) — unde se află setările sălilor
- [Configurarea prezenței](setup.md) — servicii, orele serviciilor și alocarea sălilor
- [Vârsta minimă pentru mesajele private](../settings/mobile-app.md#member-directory--messaging-settings) — blochează conversațiile private noi cu copiii, păstrându-i în director
