---
title: "Adăugarea persoanelor"
description: "Adăugați o persoană în baza de date a bisericii în B1 Admin, completați detaliile și legați membrii familiei în gospodării pentru check-in și rapoarte."
---

# Adăugarea persoanelor

<div class="article-intro">

Secțiunea Persoane este baza B1 Admin, adică baza de date a membrilor bisericii tale. Toate celelalte funcții (grupuri, prezență, donații, formulare) se leagă de fișele persoanelor. Acest ghid te îndrumă cum să adaugi o persoană în baza de date, cum să-i editezi datele și cum să legi membrii familiei în gospodării.

</div>

## Videoclip de instruire

<YouTube id="NTL1UDQpx8s" title="Adăugarea persoanelor și a gospodăriilor în B1" next="Importarea bazei de date a persoanelor în B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Ai nevoie de un cont activ B1 Admin cu permisiunea de a gestiona persoanele. Consultă [Roluri și permisiuni](roles-permissions.md) dacă nu ești sigur de nivelul tău de acces.
- Dacă adaugi mai mult de câteva persoane, ia în considerare utilizarea instrumentului [Import CSV](importing-data.md).

</div>

## Adăugarea unei persoane

1. Accesează panoul de control B1.church Admin.
2. Deschide [meniul Salt](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus), extinde **Persoane** și apasă pe **Persoane**.
3. Apasă butonul **Adaugă persoană** din antetul paginii. Pagina derulează în jos până la formularul **Adaugă o persoană nouă**, aflat sub director.
4. Completează **Prenumele**, **Numele de familie** și **E-mailul** persoanei, apoi apasă pe **Adaugă**.

Pagina de profil a persoanei se va deschide, pregătită pentru a adăuga mai multe detalii.

:::tip
Dacă migrezi de la un alt sistem de gestionare a bisericii, funcția [Importă datele](importing-data.md) îți permite să aduci întregul director dintr-un fișier CSV, mult mai rapid decât adăugarea persoanelor una câte una.
:::

### Avertismente de duplicat

Dacă adresa de e-mail (sau, când creezi o persoană din formularul complet de editare, numărul de telefon sau aceeași combinație de prenume, nume de familie și data nașterii) corespunde cuiva deja existent în baza de date, apare un dialog **Posibil duplicat** înainte ca noua înregistrare să fie salvată. Acesta listează fiecare persoană potrivită, împreună cu e-mailul, telefonul și data nașterii, pentru a le putea compara.

- Apasă **Folosește existentul** lângă o potrivire pentru a folosi fișa acelei persoane în locul uneia noi.
- Apasă **Creează oricum** pentru a adăuga persoana nouă, chiar dacă a fost găsită o posibilă potrivire.

Verificarea duplicatelor se face doar când creezi o persoană nouă. Editarea unei înregistrări existente nu declanșează niciodată acest dialog. Funcția previne doar apariția de noi duplicate; nu îmbină două înregistrări care există deja.

## Editarea datelor

1. Pe pagina de profil a persoanei, apasă butonul **Editează** de sub datele de contact, în partea stângă.
2. În formularul **Date personale**, completează informații suplimentare, cum ar fi **Titlul** (alege Mr, Mrs, Miss, Ms, Dr, Prof, Rev sau Pastor din listă, sau scrie propriul titlu, de cel mult 10 caractere), al doilea prenume, statutul de membru (**Vizitator**, **Oaspete**, **Participant obișnuit**, **Membru**, **Personal**, **Inactiv** sau **Decedat**), datele, adresa, numerele de telefon și, pentru copii și elevi, clasa și școala.
3. Apasă **Salvează** pentru a stoca informațiile personale.

În partea stângă a profilului apar fotografia persoanei, numele, statutul de membru, datele de contact, valorile oricăror [câmpuri personalizate](../settings/custom-fields.md) și gospodăria. Sub gospodărie, **Adăugat** arată data la care a fost creată înregistrarea (doar pentru persoanele adăugate după sfârșitul lunii octombrie 2026). Apasă pe fotografie pentru a o schimba. Sub butonul **Editează** sunt câteva acțiuni suplimentare: **Flux de lucru** (adaugă persoana într-un [flux de lucru](../serving/workflows.md)), **Îmbină**, **Exportă** și **Exportă datele**.

Restul profilului afișează o secțiune de sinteză pentru fiecare tip de informații conexe:

- **Prezență** — Arată în care dintre ultimele săptămâni a participat persoana și vizitele cele mai recente. Apasă **Toți anii** pentru istoricul complet al vizitelor, care include campusul, serviciul, ora serviciului, grupul și coloana **Înregistrat la check-in**, cu ora check-in-ului de la chioșc (afișată ca o liniuță pentru vizitele fără check-in de la chioșc), sau apasă **Tipărește** pentru a imprima istoricul (documentul tipărit are în partea de sus, centrat, logo-ul și numele bisericii tale, deasupra numelui persoanei). Pentru tendințele la nivelul întregii biserici, în loc de istoricul unei singure persoane, consultă [Urmărirea prezenței](../attendance/tracking-attendance.md).
- **Donații** — Arată darurile din acest an, inclusiv cele către fonduri nedeductibile fiscal. Apasă **Toți anii** pentru [istoricul complet al donațiilor](../donations/recording-donations.md) sau **Înregistrează un dar** pentru a adăuga unul nou. Dacă biserica ta a activat [Confidențialitatea donațiilor](../settings/church-settings.md#giving-privacy), sumele rămân ascunse până când apeși **Afișează donațiile**.
- **Grupuri** — Listează [apartenențele la grupuri](../groups/group-members.md) persoanei, cu **Înscris la** și data înscrierii în fiecare grup, atunci când aceasta este înregistrată.
- **Note** — Afișează notele recente despre persoană (îngrijire pastorală, urmăriri etc.). Apasă **Toate notele** pentru a citi și adăuga note. Fiecare notă arată cine a scris-o și data și ora la care a fost postată. Pentru a vedea notele recente ale tuturor persoanelor deodată, folosește pagina [Note](./notes.md).
- **Formulare** — Listează formularele persoanei și dacă fiecare a fost trimis sau nu (vezi mai jos [Lucrul cu formularele](#working-with-forms)).

Când deschizi una dintre aceste vederi complete, apasă linkul **Înapoi la** cu numele persoanei, din partea de sus, pentru a reveni la profil.

## Trimiterea unui e-mail unei persoane

Dacă persoana are o adresă de e-mail înregistrată, sub datele de contact din partea stângă a profilului apare un buton **E-mail**.

1. Pe profilul persoanei, apasă **E-mail**.
2. Se deschide un dialog **E-mail**, intitulat cu numele persoanei, care afișează **Trimite către** cu adresa persoanei.
3. Opțional, alege un șablon salvat din **Încarcă un șablon (opțional)**.
4. Introdu un **Subiect** și scrie mesajul.
5. Apasă **Trimite e-mailul**.

Pentru a scrie mesajul în propriul program de e-mail, apasă **Deschide în aplicația mea de e-mail**.

:::info
Trimiterea din B1 folosește aceleași aprobări și limite zilnice ca e-mailul pentru grupuri. Dacă biserica ta nu a fost încă aprobată, dialogul îți cere să soliciți o verificare. Între timp, poți apăsa în continuare **Deschide în aplicația mea de e-mail**. Consultă [Activarea e-mailului pentru grupuri în biserica ta](../groups/group-members.md#turning-on-group-email-for-your-church). Utilizatorii fără permisiunea de a edita membrii grupurilor trec direct în aplicația lor de e-mail atunci când apasă **E-mail**.
:::

## Lucrul cu formularele

Poți completa formulare personalizate direct din profilul unei persoane. Acestea sunt formulare definite de utilizator, pe care le poți construi urmând ghidul [Crearea formularelor](../forms/creating-forms.md).

1. Pe profilul persoanei, găsește secțiunea **Formulare**. Aceasta listează fiecare formular, împreună cu statusul **Trimis** sau **Netrimis**.
2. Apasă pe numele unui formular pentru a-l deschide (sau apasă **Toate formularele** pentru a vedea lista completă).
3. Apasă pe **pictograma de editare** (creionul) de lângă formular, completează detaliile și apasă **Salvează**.

Odată ce un formular a fost trimis, apasă pe **pictograma de imprimare** de lângă el pentru a tipări răspunsurile completate ale persoanei. Când persoana are o singură trimitere pentru un formular, acesta afișează **Trimis** împreună cu data, deasupra răspunsurilor.

Dacă o trimitere a ajuns la persoana greșită, apasă pe pictograma **Schimbă persoana** (două săgeți) de lângă ea pentru a o muta la altcineva sau pentru a o dezlega. Consultă [Schimbarea persoanei asociate unei trimiteri](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formularele legate de profilul unei persoane folosesc tipul de formular **Persoane**. Dacă ai nevoie de un formular independent (cum ar fi o înscriere la un eveniment), consultă opțiunea [Formular independent](../forms/creating-forms.md) din ghidul despre formulare.
:::

:::tip
Dacă ai nevoie doar să urmărești una sau două informații suplimentare despre persoane, cum ar fi o dată, un număr sau un răspuns da/nu, folosește [Câmpuri personalizate](../settings/custom-fields.md) în loc de un formular. Acestea se completează mai rapid și pot fi căutate direct în Căutarea avansată.
:::

## Gestionarea gospodăriilor {#managing-households}

Gospodăriile îți permit să legi împreună membrii familiei. Acest lucru este deosebit de util pentru [check-in](../attendance/check-in.md), unde un părinte își poate face check-in pentru toți copiii deodată.

1. Pe profilul unei persoane, apasă **Editează** de lângă titlul **Gospodărie**, din partea stângă.
2. Se va deschide editorul de gospodărie. Selectează **rolul în gospodărie** pentru persoana curentă (de exemplu, Cap de gospodărie, Partener, Copil sau Altul).
3. Apasă pe pictograma **Adaugă** pentru a adăuga un alt membru al gospodăriei.
4. Sub **Adaugă un membru al gospodăriei**, scrie numele persoanei în câmpul de căutare și apasă **Enter** sau apasă pe pictograma de căutare. (Înainte să scrii, se afișează o scurtă listă de **Persoane recente**.)
5. Când persoana apare în rezultate, apasă pe numele ei sau pe pictograma de adăugare de lângă acesta.
6. Alege rolul ei în gospodărie și apasă **Salvează** pentru a finaliza configurarea gospodăriei.
