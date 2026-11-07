---
title: "Gestionarea ecranelor și a grupurilor"
description: "Verificați ce TV-uri FreePlay sunt online și pregătite pentru duminică, editați setările ecranelor și creați grupuri cu un calendar comun în FreePlay Admin."
---

# Gestionarea ecranelor și a grupurilor

<div class="article-intro">

Pagina **Ecrane** din FreePlay Admin listează fiecare televizor asociat bisericii tale, cu ce redă în acest moment și dacă este pregătit pentru duminică. Aici gestionezi și **grupurile de ecrane**. Ecranele din același grup au un singur calendar și o singură buclă implicită.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Autentifică-te în FreePlay Admin la [admin.freeplay.church](https://admin.freeplay.church)
- [Asociază cel puțin un ecran](./pairing-a-screen.md)

</div>

## Pagina Ecrane

În partea de sus, trei cifre îți oferă o verificare rapidă a stării:

- **Online acum** - Ecrane care s-au conectat în ultimele 15 minute
- **Pregătite pentru duminică** - Câte ecrane programate au descărcat totul până la duminica viitoare
- **Necesită atenție** - Ecrane care sunt offline sau le lipsesc fișiere

Mai jos, folosește **Caută ecrane** pentru a găsi un ecran după etichetă, grup sau după ce redă. Filtrele-etichetă restrâng lista la **Toate**, **Programate**, **Manuale**, **Necesită atenție** sau un singur grup. Comută între vizualizările **Tabel** și **Grilă** cu butonul din dreapta.

Fiecare ecran afișează:

- **Eticheta** și modelul dispozitivului
- **Grupul**
- **Modul** - **Programat** sau **Manual**
- **Se redă acum** - Ce apare pe ecran chiar acum. Ecranele manuale afișează **Clasă · profesorul apasă Start**
- **Pregătit până la** - Data până la care ecranul a descărcat conținutul. Dacă fișierele nu s-au descărcat, afișează în schimb **N fișiere lipsă**. Un ecran nou afișează **Se așteaptă prima sincronizare**
- **Ultima conectare** - Momentul în care ecranul s-a conectat ultima dată. Un ecran care nu s-a conectat de ceva vreme afișează **Offline**, iar unul care nu s-a conectat niciodată afișează **Niciodată văzut**

Folosește **Prezintă** pentru a reda calendarul ecranului în browser sau **Editează** pentru a modifica setările.

## Vizualizarea unui ecran

Fă clic pe eticheta unui ecran pentru a deschide pagina lui. În stânga, vei găsi:

- **Prezintă în browser** - Redă calendarul acestui ecran pe tot ecranul în browser, așa cum ar arăta pe televizor. Vezi [Prezentarea dintr-un browser](./scheduled-playback.md#presenting-from-a-browser)
- **Editează** - Modifică eticheta, grupul sau modul
- **Mai multe** > **Deconectează** - Deconectează televizorul. Acesta revine la afișarea unui cod de asociere

Restul paginii conține aceste secțiuni:

- **Acum și urmează** - Ce se redă acum și până când, urmat de tot ce este programat pentru următoarele 7 zile. Fă clic pe **Deschide calendarul** pentru a merge direct la calendarul acestui grup
- **Descărcări** - **Pregătit până la** o dată, când totul este descărcat, sau o listă cu fișierele care lipsesc
- **Dispozitiv** - ID-ul dispozitivului, platforma, modelul, versiunea aplicației FreePlay, adresa IP, spațiul de stocare folosit și liber, ultima conectare și modul
- **Recente** - Cele mai recente activități raportate de ecran

:::tip
Dacă un ecran afișează fișiere lipsă, asigură-te că este online și că are spațiu de stocare liber. Televizorul descarcă singur fișierele lipsă data următoare când se conectează.
:::

## Editarea unui ecran

1. Fă clic pe **Editează** lângă ecran sau pe pagina lui.
2. Modifică **Eticheta**, **Grupul** sau **Modul** (**Programat** sau **Manual**).
3. Fă clic pe **Salvează**.

Mutarea unui ecran într-un alt grup îl trece pe calendarul acelui grup.

## Grupurile de ecrane

Un grup de ecrane este un set de ecrane care redau același conținut în același timp, de exemplu „Holul” sau „Aripa copiilor”. Fiecare grup are propriul calendar și poate avea o **buclă implicită** care rulează ori de câte ori nu este programat nimic.

Pentru a gestiona grupurile, fă clic pe **Grupuri** în partea de sus a paginii **Ecrane**. Lista **Grupuri de ecrane** arată numele fiecărui grup, câte ecrane are și bucla implicită. Fă clic pe **Ecrane** pentru a te întoarce.

### Adăugarea unui grup

1. În vizualizarea **Grupuri de ecrane**, fă clic pe **Adaugă grup**.
2. Introdu un **Nume**, de exemplu „Holul”.
3. Alege o listă de redare pentru **Bucla implicită** sau lasă opțiunea **Niciunul — ecranul rămâne negru**.
4. Fă clic pe **Salvează**.

Poți crea un grup și în timp ce asociezi un ecran, alegând **＋ Grup nou…** în câmpul **Grup**.

### Editarea sau ștergerea unui grup

1. Fă clic pe **Editează** lângă grup.
2. Modifică numele sau bucla implicită, apoi fă clic pe **Salvează**.
3. Pentru a elimina grupul, fă clic pe **Șterge** și confirmă.

:::warning
Ștergerea unui grup îi șterge și programul. Ecranele din acel grup rămân negre până le muți într-un alt grup.
:::

## Articole înrudite

- **[Asocierea unui ecran](./pairing-a-screen.md)** - Adaugă un televizor nou
- **[Programarea calendarului](./scheduling-the-calendar.md)** - Stabilește ce redă fiecare grup și bucla lui implicită
- **[Redarea programată pe televizor](./scheduled-playback.md)** - Ce înseamnă data „Pregătit până la” chiar pe televizor
