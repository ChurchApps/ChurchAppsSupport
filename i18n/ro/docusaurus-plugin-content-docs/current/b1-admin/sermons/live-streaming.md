---
title: "Ore și configurare transmisiuni live în B1 Admin"
sidebar_label: "Transmisiuni live"
description: "Programează transmisiuni live săptămânale sau unice, setează timpii pentru chat și video, conectează un canal YouTube și rezolvă probleme de încorporare."
---

# Transmisiuni live

<div class="article-intro">

Pagina Live Stream Times vă permite să configurați programul de transmisie al bisericii, să gestionați orele serviciilor și să personalizați experiența spectatorilor. Configurați servicii săptămânale recurente sau evenimente unice, setați opțiunile de chat și video și controlați momentul în care transmisiunea începe.

</div>

## Videoclip de instruire

<YouTube id="tpEY-sEYW6A" title="Configurarea transmisiunilor live în B1" next="Personalizarea aplicației pentru membri a bisericii tale în B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea **contentApi.streamingServices.edit**. Consultați [Roluri și permisiuni](../settings/roles-permissions.md) dacă nu aveți acces.
- Pregătiți ID-ul canalului dvs. YouTube dacă intenționați să utilizați transmisiunea live automată
- Adăugați cel puțin o [predică](./managing-sermons.md) sau un URL live permanent pentru a folosi ca sursă a transmisiunii

</div>

Transmisiunile live sunt gestionate din două pagini din secțiunea **Predici** din meniul Jump: **Live Stream Times** pentru gestionarea programului transmisiunilor live și **Settings** pentru configurarea filelor paginii dvs. de transmisie.

## Gestionarea serviciilor

### Adăugarea unui serviciu

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga-sus), extindeți **Predici** și faceți clic pe **Live Stream Times**.
2. Faceți clic pe butonul **Add Service** din partea de sus a paginii pentru a crea un serviciu programat nou. Serviciile existente sunt listate într-un tabel care arată numele, ora, furnizorul și durata fiecărui serviciu; faceți clic pe pictograma de editare de pe un rând pentru a-l modifica.
3. Introduceți un **Service Name** (de exemplu, "Duminică dimineața").
4. Setați **Service Time** -- alegeți ziua și ora la care începe serviciul.
5. Setați **Recurs Weekly** la **Yes** pentru serviciile săptămânale regulate sau **No** pentru un eveniment unic.

### Configurarea opțiunilor de chat și video

6. Sub **Chat Settings**, setați cu câte minute înainte și după serviciu trebuie activat chatul. Acest lucru le permite vizitatorilor să înceapă să discute înainte de începerea serviciului și să continue după aceea.
7. Sub **Video Settings**, setați cu cât timp înainte să înceapă transmisia video pentru conținutul de numărătoare inversă sau de dinainte de serviciu. Chatul se deschide cu atâtea minute *înainte* de începerea videoclipului timpuriu, deci ora afișată lângă setarea de minute înainte a chatului include ambele numere. De exemplu, un serviciu la ora 10:00 cu 15 minute de chat înainte și un start timpuriu de 5 minute deschide chatul la 9:40.
8. Selectați din meniul derulant predica pe care doriți să o redați:
   - **Latest Sermon** -- Redă automat cel mai recent videoclip adăugat.
   - **Current Live Service** -- Redă transmisiunea live curentă de pe YouTube, folosind ID-ul canalului dvs.
   - Puteți alege și orice predică specifică pe care ați salvat-o deja.
9. Faceți clic pe **Save** pentru a programa serviciul.

:::info
Serviciul dvs. se va actualiza automat în fiecare săptămână dacă este setat ca recurent. Rămâne la aceeași oră locală când începe sau se termină ora de vară. Puteți adăuga câte servicii aveți nevoie. Vizitatorii vor vedea următoarea oră programată a serviciului când accesează pagina dvs. de transmisie.
:::

## Setările paginii de transmisie

Pentru a personaliza filele și linkurile care apar alături de transmisiunea live, deschideți meniul Jump, extindeți **Predici** și faceți clic pe **Settings**. Pagina **Stream Settings** afișează lista **Content Tabs**.

### Adăugarea filelor

1. Faceți clic pe butonul **Add** pentru a adăuga o filă nouă pe pagina dvs. de transmisie live.
2. Alegeți un **Link Type**: **External URL** pentru un link personalizat sau una dintre filele predefinite **Chat** sau **Prayer**.
3. Pentru fila Chat, pur și simplu dați-i un nume în câmpul **Tab Text**, iar configurarea este completă.
4. Pentru o filă cu link, introduceți numele filei, alegeți o pictogramă făcând clic pe butonul de pictogramă și introduceți URL-ul.
5. Filele configurate vor apărea pe pagina de transmisie live, pentru ca spectatorii să acceseze resurse suplimentare și funcții interactive.

### Previzualizarea transmisiunii

Pe pagina **Live Stream Times**, faceți clic pe **View Your Stream** din partea de sus a paginii pentru a vedea exact cum va arăta pagina de transmisie live pentru vizitatori, inclusiv logo-ul, orele serviciilor și filele configurate.

## Configurarea transmisiunii live pe YouTube

Pentru a conecta canalul dvs. YouTube pentru transmisiune live automată:

1. Accesați **Predici** și faceți clic pe **Add Sermon**, apoi selectați **Add Permanent Live URL**.
2. Furnizorul video este implicit **Current YouTube Live Stream**. Introduceți **YouTube Channel ID**.
3. Adăugați un titlu și o descriere, apoi faceți clic pe **Save**.
4. În **Live Stream Times**, creați un serviciu și selectați URL-ul live permanent din meniul derulant al predicilor.

:::tip
Pentru a găsi ID-ul canalului dvs. YouTube, accesați setările avansate ale canalului dvs. YouTube și copiați valoarea Channel ID.
:::

## Personalizarea culorilor și a logo-ului

Pagina dvs. de transmisie live folosește setările [Appearance](../website/appearance.md) ale site-ului dvs. web:

- **Culoarea accent deschisă** cu text închis este folosită pentru antet.
- **Culoarea accent închisă** cu text deschis este folosită pentru bara laterală.
- **Light Background Logo** apare pe pagina de transmisie. Folosiți o imagine cu fundal transparent și un raport de aspect de 4:1.

Pentru a schimba aceste setări, accesați **Website**, apoi **Appearance**, și actualizați setările [Color Palette](../website/appearance.md#color-palette) și [Logo](../website/appearance.md#logo-and-branding).

## Adăugarea gazdelor transmisiunii

Pentru a oferi membrilor echipei acces la chatul rezervat gazdelor, alături de chatul public:

1. În meniul Jump, alegeți **Settings > Roles**.
2. Faceți clic pe butonul plus și selectați **Add Custom Role**.
3. Denumiți rolul "Streaming Host" și faceți clic pe **Save**.
4. Faceți clic pe rolul nou, apoi faceți clic pe **Add** în secțiunea Members pentru a adăuga persoane.
5. Derulați până la **Edit Permissions**, extindeți secțiunea **Content** și bifați **Host Chat**.

Când gazdele se conectează la pagina de transmisie live, apare o filă privată **Host Chat** alături de chatul public, pentru conversații doar pentru personal în timpul transmisiunii.

:::info
Pentru mai multe detalii despre crearea rolurilor și gestionarea permisiunilor, consultați [Roluri și permisiuni](../settings/roles-permissions.md).
:::

## Depanare

Dacă transmisiunea live automată de pe YouTube nu se afișează corect atunci când folosiți opțiunea "Current YouTube Live Stream" cu ID-ul canalului dvs., încercați următoarele:

**Simptome:**
- Inserarea transmisiunii live afișează "Video unavailable"
- Pagina se încarcă, dar nu apare niciun videoclip
- Inserările directe de pe YouTube funcționează, dar transmisiunea automată de pe canal nu

**Soluție:**
Verificați canalul dvs. YouTube pentru transmisiuni live vechi sau programate viitoare și ștergeți-le:

1. Accesați YouTube Studio.
2. Navigați la **Content**, apoi la **Live**.
3. Căutați transmisiunile live vechi programate sau transmisiunile programate viitoare.
4. Ștergeți aceste intrări vechi sau programate.
5. Testați din nou pagina de transmisie live.

:::warning
Inserarea automată a transmisiunii live de pe canalul YouTube poate fi blocată atunci când există mai multe intrări de transmisiuni live programate sau trecute pe canalul dvs. Eliminarea acestora permite YouTube să identifice și să difuzeze corect transmisiunea live curentă.
:::

**Cerințe suplimentare:**
- Transmisiunea live trebuie să fie setată la **Public** (nu Unlisted sau Private).
- Inserarea trebuie permisă în setările transmisiunii dvs. YouTube.
- Asigurați-vă că folosiți furnizorul **Current YouTube Live Stream** (cu Channel ID), nu furnizorul **YouTube** (cu Video ID).

## Pașii următori

- [Gestionarea predicilor](./managing-sermons.md) -- Adăugați predici în biblioteca dvs.
- [Liste de redare](./playlists.md) -- Organizați predicile în serii
