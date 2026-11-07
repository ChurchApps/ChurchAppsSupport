---
title: "Jurnal de audit"
description: "Consultă jurnalul de audit din B1 Admin: cine s-a conectat, a editat fișe de persoane sau a schimbat permisiuni. Exportă intrările filtrate în CSV."
---

# Jurnal de audit

<div class="article-intro">

Jurnalul de audit înregistrează toate acțiunile și modificările semnificative din sistemul de gestionare a bisericii. Folosiți-l pentru a verifica activitatea de autentificare, pentru a urmări cine a modificat fișele persoanelor, pentru a monitoriza actualizările de permisiuni și pentru a menține responsabilitatea în cadrul echipei.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Cont B1 Admin cu acces de administrator al serverului
- Accesați **Setări** pentru a găsi Jurnalul de audit

</div>

## Vizualizarea jurnalului de audit

1. Deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus al B1 Admin) și extindeți **Setări**.
2. Faceți clic pe **Jurnal de audit**.
3. Jurnalul afișează intrările recente într-un tabel cu următoarele coloane:
   - **Data** -- Momentul în care a avut loc acțiunea.
   - **Categoria** -- Tipul acțiunii (codificat prin culori pentru o scanare rapidă).
   - **Acțiunea** -- Ce s-a făcut (de exemplu, create, update, delete, login_success).
   - **Entitatea** -- Tipul și ID-ul înregistrării afectate.
   - **Adresa IP** -- Adresa IP a utilizatorului care a efectuat acțiunea.
   - **Detalii** -- Un rezumat al modificărilor specifice efectuate.

## Filtrarea jurnalului

Folosiți filtrele din partea de sus a paginii pentru a restrânge rezultatele:

- **Categoria** -- Filtrați după tipul acțiunii:
  - **Toate categoriile** -- Afișează toate intrările.
  - **Autentificare** -- Autentificările reușite și eșuate.
  - **Persoane** -- Crearea, actualizarea sau ștergerea fișelor de persoane.
  - **Permisiuni** -- Acordarea și revocarea permisiunilor.
  - **Donații** -- Modificările înregistrărilor de donații.
  - **Grupuri** -- Acțiunile de gestionare a grupurilor.
  - **Formulare** -- Activitatea de trimitere a formularelor.
  - **Setări** -- Modificările de configurare.
- **Data de început** -- Afișează intrările de la această dată încoace.
- **Data de sfârșit** -- Afișează intrările până la această dată.

Faceți clic pe **Căutare** după ce ați setat filtrele pentru a actualiza rezultatele.

## Înțelegerea categoriilor

Fiecare categorie este codificată prin culori pentru identificare rapidă:

- **Autentificare** -- Cip albastru. Urmărește încercările de autentificare reușite și eșuate.
- **Persoane** -- Cip mov. Urmărește crearea, actualizarea și ștergerea fișelor de persoane.
- **Permisiuni** -- Cip roșu. Urmărește momentul în care drepturile de acces sunt acordate sau revocate.
- **Donații** -- Cip verde. Urmărește modificările înregistrărilor de donații.
- **Grupuri** -- Cip gri. Urmărește operațiunile de gestionare a grupurilor.
- **Formulare** -- Cip portocaliu. Urmărește activitatea de trimitere a formularelor.
- **Setări** -- Cip galben. Urmărește modificările de configurare.

## Exportarea jurnalului

Atunci când intrările din jurnal sunt afișate, apare un buton de descărcare **CSV**. Faceți clic pe el pentru a exporta rezultatele filtrate curente într-o foaie de calcul, pentru verificare offline sau pentru evidență.

## Paginarea

Folosiți controalele de paginare din partea de jos a tabelului pentru a naviga prin rezultate. Puteți afișa 25, 50 sau 100 de intrări pe pagină.

:::info
Intrările din jurnalul de audit sunt păstrate automat timp de un an. Intrările mai vechi de 365 de zile sunt eliminate pentru a menține sistemul performant.
:::

:::tip
Verificați jurnalul de audit în mod regulat, mai ales după integrarea de noi membri în echipă sau după efectuarea unor modificări semnificative de configurare. Acest lucru ajută la identificarea timpurie a activității neobișnuite.
:::

## Articole conexe

- [Roluri și permisiuni](../settings/roles-permissions.md) -- Gestionați cine are acces la ce
- [Securitatea datelor](../settings/data-security.md) -- Aflați cum sunt protejate datele dumneavoastră
- [Prezentare generală a rapoartelor](./index.md) -- Consultați toate rapoartele disponibile
