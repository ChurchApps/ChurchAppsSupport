---
title: "Programación del calendario"
---

Nope, I need to stop here and re-check the task. The request is to translate into Romanian, not Spanish. Let me write the correct translation.

---
title: "Programarea calendarului"
---

# Programarea calendarului

<div class="article-intro">

Pagina **Calendar** din FreePlay Admin controlează ce redă fiecare grup de ecrane și când. Adăugați un program pentru o listă de redare, un plan de slujbă sau un dosar de furnizor și setați-l să se repete săptămânal sau să se redea o singură dată. Când nu este programat nimic, se redă bucla implicită a grupului.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Creați cel puțin un grup de ecrane. Consultați [Gestionarea ecranelor și a grupurilor](./managing-screens#screen-groups)
- [Creați o listă de redare](./building-playlists), sau aveți configurat un tip de plan în B1 Admin

</div>

## Citirea calendarului

1. Accesați **Calendar**.
2. Alegeți un grup de ecrane din filele din partea de sus. Fiecare filă arată câte programe are grupul.
3. Vizualizarea săptămânală merge de luni până duminică, de la 6 AM la 10 PM. O linie roșie marchează ora curentă.
4. Folosiți săgețile pentru a trece la săptămâna anterioară sau următoare, sau faceți clic pe **Today** pentru a reveni la săptămâna curentă.

Subtitlul paginii afișează fusul orar folosit pentru calendar. Programele respectă fusul orar al bisericii dvs., pe care îl setați în B1 Admin, la [Church Information](../../b1-admin/settings/church-settings.md#time-zone). Dacă biserica dvs. nu are setat un fus orar, FreePlay folosește fusul orar al campusului dvs. Calendarul și televizoarele folosesc același fus orar, astfel încât un bloc plasat la 9:00 AM în calendar se redă la 9:00 AM pe ecran, chiar dacă computerul dvs. este setat pe alt fus orar.

Programele sunt colorate în funcție de tip. O legendă explică culorile:

- **Default loop** - Fundal hașurat, afișat în spatele tuturor celorlalte când grupul are o buclă implicită
- **Playlist** (Listă de redare)
- **Service plan** (Plan de slujbă)
- **Provider folder** (Dosar de furnizor)

Fiecare bloc afișează numele său, iar blocurile mai înalte afișează și orele, dacă se repetă (**weekly** sau **once**) și ce se întâmplă când se termină mai devreme.

## Setarea buclei implicite

Bucla implicită se redă pe ecranele grupului ori de câte ori nu este programat nimic.

1. Pe pagina **Calendar**, faceți clic pe **Default loop…** în antet. Dacă o buclă implicită este deja setată, butonul afișează **Default loop:** urmat de numele listei de redare.
2. Alegeți o **Playlist** sau alegeți **None — screen goes dark**.
3. Faceți clic pe **Save**.

## Adăugarea unui program

Există trei moduri de a începe un program nou:

- Faceți clic pe un spațiu gol din calendar. Formularul se deschide cu ziua și jumătatea de oră deja completate.
- Faceți clic pe **Add schedule** în antet.
- Alegeți **Add schedule** din paleta de comenzi (**Ctrl+K** sau **⌘K**).

Apoi completați formularul:

1. **Play** - Alegeți ce se redă:
   - **Playlists** - Orice listă de redare pe care ați creat-o
   - **Service plans** - Un tip de plan din B1 Admin, marcat **(current plan)**. Ecranul redă planul curent pentru acel tip de plan în fiecare săptămână, inclusiv lecțiile Go Curriculum (și cele personalizate), care folosesc autentificarea Go legată de ministerul tipului de plan
   - **Provider folder…** - Deschide **Choose a provider folder**. Navigați la un dosar și faceți clic pe **Use this folder**. Pentru a alege ulterior un alt dosar, faceți clic pe **Change**
2. **Repeats** - Selectați zilele săptămânii în care se redă acest program. Pentru o singură dată, activați **One time** și alegeți **Date**.
3. **Start** și **End** - Orele la care programul începe și se oprește.
4. **If it finishes early** - Ce se întâmplă când conținutul se termină înainte de ora de sfârșit:
   - **Loop until the end time** - Reia de la început. Potrivit pentru bucle de afișaj, anunțuri și numărători inverse
   - **Teacher paced** - Diapozitivele așteaptă telecomanda profesorului. Lecția rămâne afișată după ora de sfârșit până la ultimul diapozitiv
   - **Play once, then go back to the default loop** - Redă o singură dată, apoi revine la bucla implicită
5. Pentru programele repetitive, setați **Starts** la prima dată. Sub **Ends**, alegeți **Never** sau alegeți **On date** și introduceți o **End date**.
6. Faceți clic pe **Save**.

:::info
**Teacher paced** a înlocuit opțiunea mai veche „hold the last slide”. Programele salvate cu acea opțiune se redau acum ca teacher paced.
:::

## Editarea sau ștergerea unui program

1. Faceți clic pe blocul programului din calendar.
2. Modificați orice câmp și faceți clic pe **Save**, sau faceți clic pe **Delete** pentru a elimina programul.

## Programe care se suprapun

Dacă două programe se suprapun, formularul afișează un avertisment: **Overlaps another schedule. The one that starts later wins.** Cât timp programul mai târziu rulează, ecranele îl redau. Când acesta se termină, ecranele revin la programul anterior, dacă acesta mai rulează.

## Cum preiau ecranele modificările

Ecranele asociate descarcă tot ce este programat pentru următoarele 7 zile și verifică singure dacă există modificări. Nu trebuie să atingeți televizorul după ce editați calendarul. Pentru a vedea când un ecran are tot ce are nevoie, verificați **Ready through** pe [pagina Screens](./managing-screens).

## Articole conexe

- **[Building Playlists](./building-playlists)** - Creați listele de redare pe care le programați
- **[Scheduled Playback on the TV](./scheduled-playback)** - Cum funcționează lecțiile teacher paced și telecomanda pe televizor
- **[Managing Screens and Groups](./managing-screens)** - Adăugați grupuri și verificați descărcările fiecărui ecran
- **[Keeping Only Part of Every Lesson](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Reduceți fiecare lecție programată dintr-un tip de plan la părțile pe care le redă sala dvs.
