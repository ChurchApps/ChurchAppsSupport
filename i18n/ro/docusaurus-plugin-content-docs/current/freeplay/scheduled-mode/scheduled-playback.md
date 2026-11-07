---
title: "Redarea programată pe TV"
description: "Un TV FreePlay asociat descarcă săptămâna următoare și redă după ceas, chiar offline. Include panoul de informații, butoanele și fixarea unui playlist."
---

# Redarea programată pe TV

<div class="article-intro">

Odată ce un TV este asociat unui calendar, FreePlay îl rulează automat. Descarcă programul săptămânii următoare, schimbă conținutul la orele programate și continuă redarea din propria memorie dacă internetul se întrerupe. Un profesor sau un voluntar poate în continuare să pună pauză, să sară peste conținut și să navigheze cu telecomanda TV-ului.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- [Asociați TV-ul cu un calendar](./pairing-a-screen.md)
- [Adăugați ceva în calendar](./scheduling-the-calendar.md), sau setați o buclă implicită pentru grupul ecranului

</div>

## Ce face TV-ul singur

- **Se deschide direct la program** - Când un TV asociat pornește FreePlay, merge direct la playerul programat
- **Descarcă în avans** - FreePlay descarcă fiecare fișier programat pentru următoarele 7 zile, plus bucla implicită, și redă din aceste descărcări
- **Redă după ceas** - La fiecare oră de început programată, ecranul trece la conținutul respectiv. Când nu există nimic programat, redă bucla implicită a grupului
- **Verifică modificările** - FreePlay verifică periodic în FreePlay Admin dacă există modificări în calendar și descarcă orice element nou
- **Repară fișierele defecte** - Dacă un fișier descărcat nu poate fi redat, FreePlay îl sare și îl descarcă din nou

Înainte de sosirea primelor fișiere, ecranul afișează **Se încarcă programul...** sau **Se descarcă X din Y fișiere**. Dacă nu este programat nimic și grupul nu are o buclă implicită, afișează **Nimic programat momentan**.

## Panoul de informații

Apăsați **Selectare** pe telecomandă pentru a deschide panoul de informații. Acesta se închide singur după câteva secunde. Panoul afișează:

- **Dreapta sus** - **Pregătit până la** urmat de o dată, când tot conținutul până la acea dată este descărcat, sau **Se descarcă** în timp ce fișierele mai sosesc. Dedesubt, câte fișiere sunt descărcate și o bară de progres
- **Stânga jos** - Numele a ceea ce se redă (sau **Bucla implicită**), ce element este pe ecran și ce urmează, cu ora
- **Ultima verificare** - Momentul în care FreePlay a verificat ultima dată modificările programului

Panoul are și trei butoane:

- **Fixează această listă** - Păstrează conținutul curent redat în buclă și ignoră calendarul. Selectați **Anulează fixarea listei** pentru a reveni la program
- **Răsfoiește conținutul** - Părăsește playerul programat pentru a răsfoi furnizorii conectați
- **Setări** - Deschide setările FreePlay, unde puteți [să dezasociați sau să asociați un alt calendar](./pairing-a-screen.md#changing-or-unpairing-from-the-tv)

:::tip
Pentru a reveni la program după răsfoire, apăsați **Înapoi** pe telecomandă din ecranul **Furnizori de conținut**, sau deschideți **Setări**, selectați **Asociază cu un calendar** și alegeți **Înapoi la program**. Un TV asociat revine și el la playerul programat ori de câte ori FreePlay revine în prim-plan, și se deschide întotdeauna la playerul programat.
:::

## Comenzile telecomenzii

| Buton de pe telecomandă | Acțiune |
|---|---|
| **Selectare** | Deschide panoul de informații |
| **Redare/Pauză** | Pune pe pauză sau reia. Cât timp este pe pauză, apare o iconiță de redare |
| **Săgeata dreapta** | Slide-ul sau videoclipul următor |
| **Săgeata stânga** | Slide-ul sau videoclipul anterior |
| **Săgeata sus** | Deschide prezentarea generală a slide-urilor pentru a sări la oricare slide |
| **Derulare înainte** | Sare cu 10 secunde înainte într-un videoclip |
| **Derulare înapoi** | Sare cu 10 secunde înapoi într-un videoclip |
| **Înapoi** | Închide prezentarea generală a slide-urilor sau panoul de informații, sau deschide panoul de informații |

Butoanele pentru următorul și anteriorul rămân în conținutul care se redă acum. Trec de la ultimul element la primul doar când programul este setat să se repete în buclă. Derularea înainte și înapoi funcționează doar în timpul unui videoclip. Nu fac nimic în timpul unui slide.

### Săritul la un slide

Apăsați **Sus** pentru a deschide prezentarea generală a slide-urilor. Aceasta afișează fiecare element din lista de redare sau lecția curentă. Mutați-vă la cel dorit și apăsați **Selectare** pentru a sări direct la el.

## Lecții cu ritm stabilit de profesor

Când un program este setat la **Ritm stabilit de profesor**, slide-urile cu imagini nu trec singure la următorul. Profesorul trece înainte cu **săgeata dreapta**. Un videoclip se redă până la final și apoi trece la elementul următor.

O lecție cu ritm stabilit de profesor rămâne pe ecran după ora de sfârșit programată, până când profesorul ajunge la ultimul slide și aceasta se termină. Abia atunci ecranul trece la ce urmează în program. Așa se evită ca o clasă care depășește timpul să fie întreruptă în mijlocul lecției.

## Prezentarea dintr-un browser

Puteți reda și calendarul unui ecran într-un browser web. În FreePlay Admin, deschideți ecranul din pagina **Ecrane** și faceți clic pe **Prezintă în browser**. Browserul urmărește calendarul ecranului în același mod ca TV-ul, iar bara de control arată ce urmează. Folosiți **Bara de spațiu** pentru pauză, **←** / **→** pentru a sări înainte sau înapoi, **F** pentru ecran complet și **Esc** pentru a ieși.

## Articole conexe

- **[Programarea calendarului](./scheduling-the-calendar.md)** - Stabiliți ce se redă și ce se întâmplă când se termină mai devreme
- **[Gestionarea ecranelor și a grupurilor](./managing-screens.md)** - Verificați descărcările fiecărui ecran din FreePlay Admin
- **[Redarea conținutului](../content-providers/playing-content.md)** - Comenzile playerului atunci când redați conținut singur
