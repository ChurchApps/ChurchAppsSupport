---
title: "Navigarea în B1App"
---

# Navigarea în B1App

<div class="article-intro">

Portalul pentru membri din B1.church este o aplicație web optimizată pentru telefon, care se află sub `/mobile`. Funcționează în orice browser și poate fi instalată pe ecranul principal. Această pagină explică tabloul de bord Acasă, bara de navigare din partea de jos, pagina Mai multe și pagina Eu.

</div>

## Videoclip de prezentare

<YouTube id="8XKRZvvAbXg" title="Prezentare generală a aplicației pentru membri B1.church" next="Prezentare generală a B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Trebuie să fii [conectat](./logging-in.md) ca să vezi informațiile tale personale. Vizitatorii neconectați pot în continuare să navige prin conținutul public și li se afișează un buton **Conectare** acolo unde o funcție necesită un cont.

</div>

## Acasă {#home}

Deschiderea adresei `https://yourchurchname.b1.church/mobile` te duce la tabloul de bord **Acasă**, de la `/mobile/dashboard`. Acasă este pagina de start a portalului pentru membri. Începe cu un salut („Bună dimineața”, „Bună ziua” sau „Bună seara”, urmat de prenumele tău) și data de azi, apoi urmează secțiuni care apar doar atunci când sunt relevante:

- **Plăci cu fotografii** -- filele cărora biserica ta le-a atribuit o fotografie (inclusiv Versetul zilei) apar ca plăci cu fotografii sub numele bisericii tale. În funcție de alegerea bisericii, sunt aranjate fie într-o grilă cu două coloane, fie într-un rând pe care îl derulezi lateral (care se poate și deplasa singur), fie într-o listă cu o miniatură mică lângă fiecare nume -- vezi [Plăcile din ecranul principal](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Fiecare filă cu fotografie apare aici, chiar și cea care are și un loc în bara de navigare.
- **Ultima predică** -- cea mai nouă predică a bisericii tale, cu un link **Toate predicile**
- **Versetul zilei** -- versetul de azi; atinge-l ca să deschizi pagina completă [Versetul zilei](../content/verse-of-the-day.md)
- **Slujești** -- următoarele tale atribuiri de slujire, cu un link **Toate planurile**. Dacă o atribuire mai așteaptă răspunsul tău, acestea apar primele, cu o insignă **Necesită răspuns** și butoanele **Acceptă** / **Refuză**, ca să poți răspunde direct din Acasă (**Refuză** îți cere mai întâi o confirmare); altfel, următoarele tale atribuiri afișează o insignă **Acceptată** sau **Confirmată**. Atinge o atribuire ca să deschizi planul ei.
- **Grupurile tale** -- până la trei dintre grupurile tale, cu ora și locul întâlnirii, și un link **Toate grupurile**
- **Evenimente viitoare** -- când ești conectat, următoarele trei evenimente viitoare din grupurile din care faci parte, fiecare cu data și ora sale (și o miniatură dacă evenimentul are o fotografie). Atinge un eveniment ca să deschizi evenimentele grupului său. Atinge **Toate evenimentele viitoare** ca să deschizi lista completă de pe [pagina Eu](./me-page.md#upcoming), care include și atribuirile tale de slujire și înscrierile.
- **Prezența mea** și **Formularele mele** -- dacă biserica ta le activează, de câte ori ai participat în ultimele 90 de zile, cu ultimele tale două vizite, și ultimele tale două formulare trimise, cu linkuri către listele complete. Acestea apar întotdeauna pe [pagina Eu](./me-page.md), indiferent de setare -- vezi [Secțiunile ecranului principal](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Donații** -- cât ai donat anul acesta („Donat în” anul curent), un buton **Donează** (afișat doar dacă biserica oferă donații online) și un link **Istoric** către [istoricul donațiilor](../giving/donation-history.md). Este ascuns dacă biserica a limitat istoricul donațiilor membrilor la un an anterior sau l-a ascuns; în acest caz, instrumentul de donații al bisericii apare ca buton sub **Mai mult de la**
- **Mai mult de la** *biserica ta* -- butoane pentru celelalte instrumente activate de biserica ta care nu se află deja în bara de navigare sau afișate mai sus. Cele pe care le folosești cel mai des trec primele.

Secțiunile pentru slujire, grupuri, prezență, formulare și donații apar doar când ești conectat, biserica ta a activat instrumentul respectiv și ai ce afișa -- de exemplu, o atribuire viitoare sau cel puțin un grup. Pe calculator, Acasă este aranjată pe două coloane.

Dacă ești deconectat, Acasă afișează un titlu **Bun venit** în locul salutului, cu un scurt îndemn („Conectează-te ca să vezi grupurile, donațiile și altele.”) și un buton **Conectare**. Îndemnul apare chiar și atunci când biserica ta nu a configurat încă nimic altceva pentru Acasă. Biserica ta poate reformula acest îndemn sau îl poate ascunde -- vezi [Setările aplicației mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Când este ascuns, te poți conecta în continuare din pagina **Mai multe** sau din pagina **Eu**.

## Bara de navigare din partea de jos

Pe telefon, o bară de navigare este fixată în partea de jos a ecranului:

- **Acasă** -- mereu prima filă
- Până la trei dintre filele configurate de biserica ta
- **Mai multe** -- deschide pagina Mai multe

Ecranele încorporate (cum sunt Grupuri, Donații sau Planuri) primesc primele locuri în bară; locurile rămase libere merg către paginile personalizate ale bisericii. Doar linkurile către site-uri externe și Versetul zilei nu primesc niciodată o filă. Dacă biserica ta a configurat mai multe file decât încap, restul nu se pierd: apar pe pagina **Mai multe** și în secțiunea **Mai mult de la** din Acasă. Administratorii bisericii stabilesc ordinea filelor în B1 Admin, la **Mobil → Navigare**.

## Pe calculator

Pe un ecran mai larg, cum este cel de calculator sau o tabletă mare, bara de navigare din partea de jos este înlocuită cu un antet în partea de sus a ecranului, în culoarea bisericii tale. Acesta afișează sigla bisericii, sau numele ei dacă nu este setată nicio siglă (dă clic pe el ca să revii la Acasă), **Acasă**, până la cinci dintre filele configurate de biserica ta, și **Mai multe**, cu clopoțelul și fotografia ta de profil în dreapta. Când deschizi un ecran cu detalii, deasupra conținutului paginii apare un link **Înapoi**.

## Pagina Mai multe

Atingerea lui **Mai multe** deschide pagina Mai multe, de la `/mobile/more`. Conține:

- Numele și fotografia ta, cu un link **Editează profilul** -- vezi [Editarea profilului tău](./editing-your-profile.md)
- Toate filele configurate de biserica ta, în ordine, sub numele bisericii tale. Linkurile către site-uri externe se deschid într-o filă nouă a browserului.
- O secțiune **Cont** cu:
  - **Eu** -- pagina ta personală (doar pentru utilizatorii conectați)
  - **Aspect** -- comută între **Mod luminos** și **Mod întunecat**
  - **Portalul administratorului** -- apare doar dacă ai permisiuni de administrator în biserica ta; deschide B1 Admin într-o filă nouă
  - **Instalează aplicația** -- deschide [instrucțiunile de instalare](./installing-pwa.md) de la `/mobile/install` (dispare odată ce aplicația este instalată)
- **Deconectare**, sau un buton **Conectare** dacă ești deconectat
- Numele bisericii tale și un link către politica de confidențialitate

## Bara aplicației

Pe telefon, bara de sus a fiecărui ecran afișează:

- Sigla bisericii tale (sau numele ei, dacă biserica nu a încărcat o siglă) pe Acasă și pe celelalte ecrane principale, ori o săgeată înapoi când ai intrat într-un ecran cu detalii. Titlul ecranului apare în partea de sus a paginii.
- O pictogramă **clopoțel** pentru notificări și mesaje, cu o insignă pentru elementele necitite -- vezi [Notificări și mesaje](#notifications-and-messages) mai jos
- **Fotografia ta de profil**, care deschide profilul tău de la `/mobile/profileEdit` -- vezi [Editarea profilului tău](./editing-your-profile.md)

Clopoțelul și fotografia de profil apar doar când ești conectat.

## Notificări și mesaje

Atingerea clopoțelului deschide un panou cu două secțiuni:

- **Mesaje** -- cele mai recente conversații private, cu un link **Mesaj nou** pentru a începe una nouă
- **Notificări** -- cele mai recente notificări, cu o insignă **Nou** pe cele necitite. Atinge o notificare ca să mergi la grupul, planul sau conversația din care provine.

Fiecare secțiune arată câte elemente necitite are. Atinge **Vezi tot** din partea de jos ca să deschizi întreaga cutie de intrare, de la `/mobile/notifications`.

## Pagini cu secțiuni

Paginile cu detalii -- un grup, un plan, pagina ta Eu, ecranele Planuri și Donații -- sunt aranjate ca o pagină formată din secțiuni, nu din file. Fiecare secțiune arată o scurtă previzualizare, iar un link din antetul secțiunii (cum sunt **Toți membrii**, **Toate evenimentele** sau **Ordinea completă a serviciului**) deschide lista completă. Un link **Înapoi la** din partea de sus a acestei vizualizări te întoarce la pagina de unde ai venit.

## Pagina Eu

**Eu** (`/mobile/me`) este centrul tău personal. Afișează numele și fotografia ta, cu butoanele **Editează profilul** și **Setări** ([preferințele de notificare](./notification-preferences.md)), apoi ce urmează pentru tine -- atribuirile de slujire, înscrierile la evenimente și evenimentele grupurilor -- urmate de gospodăria ta, grupurile tale, [donațiile](../giving/) din acest an, formularele trimise, istoricul prezenței, [înscrierile](../events/my-registrations.md) tale și notificările și mesajele recente. Vezi [Pagina Eu](./me-page) pentru detalii.

Dacă ești deconectat, pagina Eu afișează în schimb un buton **Conectare**.

## Instalarea pe ecranul principal

Portalul pentru membri este o aplicație web progresivă (PWA). Accesează `/mobile/install` (sau alege **Instalează aplicația** de pe pagina Mai multe) pentru instrucțiuni pas cu pas pentru dispozitivul tău. Odată instalată, se deschide pe tot ecranul din ecranul principal, fără elementele browserului. Vezi [Instalarea ca aplicație (PWA)](./installing-pwa.md).

## Site-ul public al bisericii tale

În afara portalului pentru membri, site-ul public al bisericii tale are propria navigare din antet, cu linkuri configurate de administratorii tăi -- pagini precum [predicile](../content/sermons.md), [Biblia](../content/bible.md), [transmisiunile live](../content/live-streaming.md) și o listă publică de grupuri. Pe telefon, aceste linkuri se află în spatele pictogramei cu trei linii din colțul din dreapta sus al antetului.

:::info
Filele și instrumentele pe care le vezi diferă de la o biserică la alta. Administratorii controlează ce secțiuni sunt vizibile pentru membri prin B1 Admin, așa că dacă nu vezi o funcție descrisă aici, este posibil ca biserica ta să n-o fi activat.
:::
