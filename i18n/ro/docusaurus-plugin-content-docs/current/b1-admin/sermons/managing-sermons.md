---
title: "Gestionarea predicilor"
description: "Administrează biblioteca de predici din B1 Admin: adaugă predici de pe YouTube, Vimeo sau Facebook, editează detaliile și obține un flux de podcast."
---

# Gestionarea predicilor

<div class="article-intro">

Pagina Predici afișează întreaga bibliotecă de predici a bisericii. De aici puteți adăuga predici noi, edita înregistrările existente și vă puteți organiza conținutul pe liste de redare. Fiecare predică poate avea un link către video sau audio găzduit pe YouTube, Vimeo, Facebook sau pe un URL personalizat.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea **contentApi.streamingServices.edit**. Consultați [Roluri și permisiuni](../settings/roles-permissions.md) dacă nu aveți acces.
- Creați cel puțin o [listă de redare](./playlists.md) în care să vă organizați predicile
- Pregătiți ID-urile sau URL-urile videoclipurilor de pe YouTube, Vimeo sau Facebook

</div>

## Vizualizarea bibliotecii de predici

1. În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus), extindeți **Sermons** și faceți clic pe **Sermons**.
2. Pagina Predici afișează înregistrările de predici într-un tabel, cu **Playlist**-ul, titlul și **Publish Date** pentru fiecare predică. Folosiți caseta de căutare de deasupra tabelului pentru a filtra lista. Listele de redare sunt afișate în panoul **Playlists**, lângă tabel.
3. Faceți clic pe **Edit** de pe orice rând de predică pentru a vedea sau edita detaliile acesteia.

## Adăugarea unei predici

1. Faceți clic pe butonul **Add Sermon** din colțul din dreapta sus și selectați **Add Sermon** din meniul derulant.
2. Selectați un **Playlist** la care să asociați predica.
3. Alegeți **Video Provider** -- YouTube, Vimeo, Facebook sau Custom URL. Recomandăm YouTube, deoarece funcționează cel mai bine cu sistemul B1.
4. Introduceți ID-ul videoclipului sau URL-ul și faceți clic pe **Fetch**. Pentru YouTube, ID-ul videoclipului este șirul de caractere de după `v=` din URL-ul YouTube.
5. Când faceți clic pe **Fetch**, detaliile predicii sunt importate automat, inclusiv data publicării, durata, titlul, descrierea și miniatura.
6. Faceți modificările dorite și faceți clic pe **Save**.

:::tip
Puteți adăuga și un link permanent pentru transmisiune în direct selectând **Add Permanent Live URL** din meniul derulant **Add Sermon**. Acesta creează o conexiune persistentă la transmisiunea live a canalului dvs. de YouTube, folosind ID-ul canalului. Pentru mai multe detalii, consultați [Transmisiunea în direct](./live-streaming.md).
:::

## Editarea unei predici

1. Faceți clic pe **Edit** de pe orice rând de predică din bibliotecă pentru a deschide detaliile acesteia.
2. Actualizați titlul, vorbitorul, data, descrierea, miniatura sau linkurile media, după necesitate.
3. Faceți clic pe **Save** pentru a aplica modificările.

## Detaliile predicii

Fiecare înregistrare de predică poate include:

- **Title** -- Numele predicii, afișat vizitatorilor
- **Speaker** -- Persoana care a susținut predica
- **Date** -- Data publicării sau a susținerii
- **Description** -- Un rezumat al conținutului predicii
- **Thumbnail** -- O imagine de previzualizare afișată în biblioteca de predici
- **Video/Audio Links** -- URL-uri către media predicii de pe YouTube, Vimeo, Facebook sau de pe o gazdă personalizată
- **Audio File URL (for podcast)** -- Un link direct către un fișier MP3/M4A pentru această predică. Lipiți un URL sau faceți clic pe **Upload Audio** pentru a încărca un fișier, care va completa câmpul automat. Doar predicile cu acest câmp (sau cu un link direct către un fișier video) completat sunt incluse în fluxul dvs. de podcast.

## Fluxul dvs. de podcast

Odată ce cel puțin o predică are atașat un fișier audio sau video, B1 Admin generează automat un flux RSS de podcast pentru biserica dvs. Nu trebuie să activați nimic. Îl găsiți în panoul **Podcast Feed** de sub lista de predici: faceți clic pe pictograma de copiere pentru a copia URL-ul fluxului, apoi trimiteți acest URL la Apple Podcasts, Spotify sau orice alt catalog de podcasturi.

:::info
Predicile care doar au un link către un player încorporat (cum este un ID de videoclip de pe YouTube sau Vimeo) nu vor apărea în fluxul de podcast, deoarece aplicațiile de podcast au nevoie de un fișier media direct, care poate fi descărcat. Adăugați un **Audio File URL** pentru a include o predică.
:::

## Programarea unei predici pentru transmisiunea în direct

După ce adăugați o predică, o puteți programa pentru difuzare pe pagina dvs. de transmisiune în direct:

1. În meniul Jump, alegeți **Sermons > Live Stream Times**.
2. Editați un serviciu și, la **Video Settings**, selectați predica din meniul derulant.
3. Predica va fi redată la ora serviciului programat.

:::info
Pentru a importa mai multe predici deodată, în loc să le adăugați una câte una, folosiți instrumentul [Import în masă](./bulk-import.md), care preia videoclipurile direct din contul dvs. de YouTube sau Vimeo.
:::

## Pașii următori

- [Liste de redare](./playlists.md) -- Organizați predicile în serii
- [Transmisiunea în direct](./live-streaming.md) -- Configurați programul de transmisiune
- [Import în masă](./bulk-import.md) -- Importați mai multe predici deodată
