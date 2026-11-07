---
title: "Editarea în bloc a persoanelor"
description: "Actualizați în masă în B1 Admin statutul de membru, starea civilă, genul, renunțarea, câmpurile Da/Nu sau apartenența la grupuri."
---

# Editarea în bloc a persoanelor

<div class="article-intro">
Editarea în bloc vă permite să actualizați mai multe persoane deodată, economisind timp atunci când aplicați aceeași modificare mai multor persoane. Puteți actualiza starea de membru, starea civilă, genul, preferințele de renunțare la comunicări și apartenența la grupuri într-o singură operațiune.
</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea de a gestiona datele persoanelor. Consultați [Roluri și permisiuni](./roles-permissions.md) pentru detalii.
- Ar trebui să fi adăugat sau importat deja persoanele pe care doriți să le editați. Consultați [Adăugarea persoanelor](./adding-people.md), dacă este necesar.
</div>

## Selectarea persoanelor pentru editarea în bloc

1. Accesați **Persoane** în B1 Admin
2. Folosiți instrumentele de căutare sau de filtrare pentru a găsi persoanele pe care doriți să le actualizați
3. Bifați casetele pentru a selecta persoane
   - În vizualizarea **Gospodării**, bifarea unei gospodării selectează toate persoanele din ea
   - În vizualizarea **Tabel** (comutată cu butonul **Afișare ca**), puteți selecta persoanele individual
   - Sau utilizați caseta de bifare de deasupra listei pentru a selecta toate persoanele vizibile
4. Odată ce ați selectat cel puțin o persoană, bara de deasupra listei arată câte persoane sunt selectate, împreună cu **Golire selecție** și un buton **Acțiuni**

:::tip
Dacă trebuie să actualizați un grup mare de persoane pe baza unor criterii specifice, utilizați funcția [Căutare AI](./ai-search.md) sau filtrele pentru a restrânge mai întâi lista, apoi selectați toate persoanele care se potrivesc.
:::

## Acțiuni în bloc disponibile

Meniul **Acțiuni** oferă mai multe opțiuni:

### Actualizarea stării de membru

Actualizați starea de membru pentru toate persoanele selectate:

1. Faceți clic pe **Acțiuni** → **Setează starea de membru**
2. Alegeți noua stare:
   - **Vizitator** -- Persoane care vin pentru prima dată sau ocazional
   - **Oaspete** -- Oaspeți, cum ar fi familiile înregistrate la un chioșc de check-in
   - **Participant regulat** -- Participanți frecvenți care nu sunt membri
   - **Membru** -- Membri oficiali ai bisericii
   - **Personal** -- Angajați ai bisericii
   - **Inactiv** -- Persoane care nu mai participă
   - **Decedat** -- Persoane care au trecut în neființă
3. Alegeți modul de actualizare:
   - **Suprascrie tot** -- Înlocuiește starea actuală pentru toate persoanele selectate
   - **Actualizează doar cele necompletate** -- Setează starea doar pentru persoanele care nu au una
4. Faceți clic pe **Actualizează**

### Actualizarea stării civile

Actualizați starea civilă în bloc:

1. Faceți clic pe **Acțiuni** → **Setează starea civilă**
2. Selectați noua stare:
   - **Necunoscută**
   - **Necăsătorit/ă**
   - **Căsătorit/ă**
   - **Divorțat/ă**
   - **Văduv/ă**
3. Alegeți dacă doriți să suprascrieți valorile existente sau să actualizați doar câmpurile necompletate
4. Faceți clic pe **Actualizează**

### Actualizarea genului

Actualizați informațiile despre gen pentru mai multe persoane:

1. Faceți clic pe **Acțiuni** → **Setează genul**
2. Selectați valoarea:
   - **Nespecificat**
   - **Masculin**
   - **Feminin**
3. Alegeți modul de actualizare (suprascrie tot sau doar necompletate)
4. Faceți clic pe **Actualizează**

### Actualizarea stării de renunțare la comunicări

Controlați dacă persoanele au renunțat la comunicări:

1. Faceți clic pe **Acțiuni** → **Setează renunțarea din director**
2. Alegeți:
   - **Nu** -- Permite comunicările (elimină renunțarea)
   - **Da** -- Blochează comunicările (activează renunțarea)
3. Alegeți modul de actualizare
4. Faceți clic pe **Actualizează**

:::warning
Fiți atenți când modificați starea de renunțare. Persoanele care au renunțat în mod explicit nu ar trebui să primească comunicări decât dacă și-au dat un nou consimțământ.
:::

### Setarea unui câmp personalizat

Setați o valoare Da/Nu pentru un [câmp personalizat](../settings/custom-fields.md) pentru toate persoanele selectate deodată:

1. Faceți clic pe **Acțiuni** → **Setează câmp personalizat**.
2. Alegeți câmpul personalizat Da/Nu pe care doriți să îl setați.
3. Alegeți valoarea (**Da** sau **Nu**) de aplicat.
4. Faceți clic pe **Actualizează**.

:::info
Pentru această acțiune în bloc sunt disponibile doar câmpurile personalizate Da/Nu. Pentru a seta alte tipuri de câmpuri, editați fiecare persoană în parte.
:::

### Adăugarea în grup

Adăugați toate persoanele selectate la unul sau mai multe grupuri:

1. Faceți clic pe **Acțiuni** → **Adaugă în grup**
2. Căutați și selectați grupul (grupurile) în care doriți să adăugați persoanele
3. Puteți selecta mai multe grupuri pentru a adăuga persoanele în toate
4. Faceți clic pe **Adaugă în grupuri**

Fiecare persoană va fi adăugată ca membru obișnuit al grupului (grupurilor) selectat(e). Ulterior, puteți promova persoane la rolul de lider de grup, dacă este necesar, din pagina [Membrii grupului](../groups/group-members.md).

### Eliminarea din grup

Eliminați toate persoanele selectate din unul sau mai multe grupuri:

1. Faceți clic pe **Acțiuni** → **Elimină din grup**
2. Căutați și selectați grupul (grupurile) din care doriți să eliminați persoanele
3. Puteți selecta mai multe grupuri
4. Faceți clic pe **Elimină din grupuri**

:::info
Această acțiune elimină persoanele doar din grupurile specificate. Nu șterge fișele persoanelor.
:::

### Ștergerea persoanelor

Ștergeți definitiv persoanele selectate din baza de date a bisericii:

1. Faceți clic pe **Acțiuni** → **Șterge**
2. Caseta de dialog **Șterge persoanele selectate** vă cere să confirmați câte persoane vor fi șterse
3. Faceți clic pe **Șterge**

:::danger
Ștergerea persoanelor este permanentă și nu poate fi anulată. Vor fi eliminate toate datele lor, inclusiv:
- Informații personale
- Apartenența la grupuri
- Înregistrările de prezență
- Istoricul donațiilor
- Trimiterile de formulare

Utilizați această acțiune doar dacă sunteți absolut sigur că doriți să eliminați aceste persoane din sistem.
:::

## Rezultatele editării în bloc

După finalizarea unei acțiuni în bloc, veți vedea un rezumat care arată:

- **Total selectate** -- Câte persoane au fost incluse în operațiune
- **Actualizate cu succes** -- Câte înregistrări au fost modificate
- **Eșuate** -- Înregistrările care nu au putut fi actualizate (dacă este cazul)
- **Neschimbate** -- Înregistrările care nu au necesitat modificări (de exemplu, în modul „actualizează doar cele necompletate")

Dacă unele actualizări au eșuat, veți vedea detalii despre erori care explică motivul.

## Bune practici

- **Începeți cu puțin** -- Testați operațiunile în bloc pe câteva înregistrări mai întâi, pentru a vă asigura că faceți modificările corecte
- **Folosiți filtrele** -- Restrângeți lista cu filtre sau căutare AI înainte de a selecta persoane, pentru a fi siguri că actualizați doar persoanele potrivite
- **Verificați din nou selecția** -- Revizuiți persoanele selectate înainte de a aplica modificările în bloc
- **Folosiți modul „actualizează doar cele necompletate"** -- Atunci când doriți să completați datele lipsă fără a suprascrie informațiile existente
- **Documentați modificările importante** -- Păstrați notițe despre actualizările în bloc, în caz că trebuie să le consultați mai târziu
- **Coordonați-vă cu echipa** -- Anunțați ceilalți administratori atunci când faceți modificări în bloc de mari dimensiuni

## Cazuri de utilizare frecvente

### Actualizarea noilor membri

După un curs pentru membri, actualizați toți participanții la starea de Membru:

1. Căutați persoanele care au participat la curs
2. Selectați-le pe toate
3. Utilizați **Acțiuni** → **Setează starea de membru** → **Membru**

### Organizarea grupurilor mici

Adăugați mai multe persoane într-un grup mic nou:

1. Căutați persoanele pe care doriți să le includeți în grup
2. Selectați-le
3. Utilizați **Acțiuni** → **Adaugă în grup** și selectați grupul mic

### Curățarea datelor

Completați starea civilă lipsă pentru cuplurile căsătorite:

1. Filtrați persoanele care sunt căsătorite (folosind informațiile despre gospodărie)
2. Selectați-le pe cele cu starea civilă necompletată
3. Utilizați **Acțiuni** → **Setează starea civilă** → **Căsătorit/ă** → **Actualizează doar cele necompletate**

## Articole conexe

- [Căutarea persoanelor](./searching-people.md) -- Găsiți persoane pentru editare
- [Căutare AI](./ai-search.md) -- Utilizați limbaj natural pentru a găsi grupuri specifice de persoane
- [Membrii grupului](../groups/group-members.md) -- Gestionați apartenența la grup
- [Exportul datelor](./exporting-data.md) -- Exportați datele persoanelor înainte de modificările în bloc
