---
title: "Designer de etichete pentru check-in"
---

# Designer de etichete pentru check-in

<div class="article-intro">

Designerul de etichete vă permite să creați și să personalizați șabloanele pentru eticheta cu numele și talonul de ridicare, care se tipăresc atunci când familiile își fac check-in pentru copiii lor. Puteți controla exact ce informații apar pe fiecare etichetă, unde sunt poziționate și cum arată.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Configurați [Prezența](setup) și setați cel puțin o oră de serviciu cu check-in activat
- Configurați [Check-In](check-in) astfel încât etichetele să fie tipărite
- Aveți nevoie de acces administrativ la secțiunea Prezență

</div>

## Deschiderea designerului de etichete

În B1 Admin, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga-sus), extindeți **Mobile** și faceți clic pe **B1 CheckIn**. Apoi faceți clic pe butonul **Design Labels** din cardul Check-in Labels. Veți vedea o listă cu șabloanele de etichete salvate, separate pe tip: **Nametag** și **Pickup Slip**.

## Tipuri de etichete

- **Nametag** — tipărită și atașată copilului. De obicei include numele copilului, clasa sau sesiunea sa și un cod de securitate.
- **Pickup Slip** — înmânată părintelui sau tutorelui. De obicei include codul de securitate și o listă cu copiii pe care i-a înregistrat.

B1 vă oferă implicit un șablon de etichetă cu nume și un șablon de talon de ridicare, dimensionate pentru etichetele termice standard de 3,5 × 1,1 inci.

## Crearea unui șablon de etichetă

1. Faceți clic pe **Add** și alegeți un punct de plecare din meniu: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** sau **Blank**.
2. Un șablon nou se deschide în editorul de etichete.

### Editorul de etichete

Editorul afișează o previzualizare la scară a etichetei, în dimensiunea configurată. În panoul din stânga puteți configura:

- **Name** — numele șablonului (doar pentru referința dumneavoastră)
- **Label Type** — Nametag sau Pickup Slip
- **Width / Height** — dimensiunile etichetei, în inci

### Adăugarea blocurilor

O etichetă este construită din blocuri — piese individuale de conținut poziționate pe suprafața etichetei. Faceți clic pe **Add Block** pentru a insera un bloc nou și alegeți tipul acestuia:

- **Field** — extrage o valoare din date în momentul tipăririi:
  - `person.displayName` — numele complet al persoanei
  - `sessions` — serviciul sau clasa la care a făcut check-in
  - `securityCode` — codul de ridicare de securitate generat aleatoriu
  - `children` — lista copiilor (pentru talonele de ridicare)
  - `person.nametagNotes` — orice notițe speciale din fișa persoanei
  - `person.isBirthdayWeek` — true dacă ziua de naștere (lună și zi) a persoanei se află în intervalul de 3 zile înainte sau după data check-in-ului
  - `campus` — numele campusului
- **Text** — text static pe care îl introduceți (pentru titluri, etichete sau instrucțiuni)
- **Barcode** — un cod de bare care codifică codul de securitate

### Poziționarea blocurilor

Fiecare bloc are câmpurile **X**, **Y**, **Width** și **Height**, exprimate ca procente din suprafața etichetei (0–100). Ajustați-le pentru a poziționa conținutul cu precizie. Puteți seta și:

- **Font Size** — dimensiunea textului, în puncte
- **Bold** — activează sau dezactivează textul îngroșat
- **Align** — alinierea textului la stânga, centru sau dreapta
- **Condition** — opțional, ascunde blocul dacă un câmp este gol (de exemplu, afișează nametagNotes doar dacă are o valoare). Funcționează și cu `person.isBirthdayWeek`, pentru a afișa o grafică sau un text de ziua de naștere doar pe etichetele copiilor a căror zi de naștere este în câteva zile față de check-in.

### Salvarea

Faceți clic pe **Save** pentru a salva șablonul. Șablonul actualizat va fi folosit data viitoare când etichetele vor fi tipărite în B1 Checkin.

## Reordonarea șabloanelor

Dacă aveți mai multe șabloane de etichete cu nume sau de talon de ridicare, B1 Checkin va folosi implicit primul șablon din listă. Trageți șabloanele pentru a le reordona.

## Ștergerea unui șablon

Faceți clic pe pictograma de ștergere de pe rândul oricărui șablon și confirmați. Ștergerea ultimului șablon de un anumit tip restabilește șablonul implicit încorporat.

:::tip
Tipăriți o etichetă de test după ce editați un șablon, pentru a verifica dacă aspectul este corect înainte de următorul serviciu.
:::

## Articole conexe

- [Configurarea check-in-ului](setup) — configurați serviciile și grupurile pentru check-in
- [Finalizarea check-in-ului](check-in) — fluxul de check-in pentru familii
- [Primii pași cu B1 Checkin](../../b1-checkin/getting-started/) — aplicația de chioșc Checkin
