---
title: "Evaluarea riscurilor transferului"
---

# Evaluarea riscurilor transferului

<div class="article-intro">

Acest document consemnează evaluarea realizată de ChurchApps cu privire la riscurile asociate transferurilor internaționale de date cu caracter personal din Regatul Unit/SEE către Statele Unite, conform cerințelor din UK GDPR și GDPR-ul UE. Este o evidență internă de conformitate, păstrată de ChurchApps în calitate de persoană împuternicită de operator (procesator de date).

</div>

**Ultima revizuire:** aprilie 2026

## 1. Detaliile transferului

| Element | Detalii |
|---|---|
| **Exportator de date** | Bisericile care utilizează ChurchApps (operatori de date), situate în Regatul Unit/SEE |
| **Importator de date** | ChurchApps (procesator de date), care funcționează din Statele Unite |
| **Categorii de persoane vizate** | Membri ai bisericii, participanți, vizitatori, donatori, voluntari, copii (gestionați de părinți/administratori) |
| **Categorii de date cu caracter personal** | Nume, adrese de e-mail, numere de telefon, adrese poștale, date de naștere, gen, stare civilă, fotografii de profil, înregistrări de donații, evidențe de prezență, apartenența la grupuri, atribuirea de sarcini voluntare, istoricul mesajelor |
| **Date sensibile** | Nu sunt colectate intenționat. Nu sunt stocate date privind sănătatea, date biometrice sau cazierul judiciar. Datele conturilor financiare (carduri de credit, conturi bancare) nu sunt niciodată stocate de ChurchApps — acestea sunt gestionate direct de Stripe. |
| **Scopul transferului** | Furnizarea de servicii software de administrare a bisericii (gestionarea membrilor, donații, evidența prezenței, comunicări, programarea voluntarilor, înregistrarea la evenimente) |
| **Țara de destinație** | Statele Unite |
| **Mecanismul de transfer** | Clauzele contractuale standard (SCC) ale UE și Addendumul privind transferul internațional de date din Regatul Unit (IDTA), încorporate prin Addendumul de prelucrare a datelor AWS |

## 2. Subprocesatori

| Subprocesator | Rol | Locație | Mecanismul de transfer |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Găzduire infrastructură, stocare date, livrare de conținut (regiunea us-east-2) | Statele Unite | DPA AWS cu SCC (incluse automat în Termenii serviciilor AWS) |
| **Stripe** | Procesarea plăților pentru donații | Statele Unite | DPA Stripe cu SCC |

Datele cardurilor de credit și ale conturilor bancare sunt transmise direct din browserul utilizatorului către Stripe și nu sunt stocate pe serverele ChurchApps și nici nu trec prin acestea.

## 3. Evaluarea riscurilor

### 3.1 Criptarea

- **În tranzit:** Toate datele sunt criptate prin TLS/HTTPS pentru toate comunicările dintre utilizatori și serverele ChurchApps.
- **În repaus:** Datele stocate pe AWS sunt criptate în repaus, folosind criptarea gestionată de AWS.

### 3.2 Controlul accesului

- Accesul la serverele de producție este limitat la două persoane, care sunt membri ai consiliului de administrație ChurchApps.
- Dezvoltatorii, voluntarii și ceilalți membri ai consiliului nu au acces la serverele sau bazele de date de producție.
- Serverele bazelor de date se află în spatele unui firewall și nu sunt accesibile direct din internet.
- Datele bisericilor sunt separate logic — fiecare biserică poate accesa doar propriile date, prin controale de acces la nivel de aplicație.

### 3.3 Segregarea datelor

Datele sunt distribuite în șase baze de date independente (Membership, Giving, Attendance, Messaging, Doing, Content). Compromiterea uneia dintre baze nu expune datele celorlalte. De exemplu, baza Giving conține sumele și datele donațiilor, dar nu și numele sau datele de contact ale donatorilor (care sunt stocate în Membership).

### 3.4 Minimizarea datelor

- Nu sunt stocate informații despre cardurile de credit sau conturile bancare (gestionate de Stripe).
- Parolele sunt stocate folosind hashing unidirecțional și nu pot fi recuperate.
- Bisericile controlează ce date colectează de la membrii lor.

### 3.5 Drepturile persoanelor vizate

ChurchApps oferă instrumente tehnice care permit bisericilor să răspundă cererilor persoanelor vizate:

- **Acces și portabilitate:** Export complet al datelor, în format JSON citibil de mașină.
- **Ștergere:** Anonimizarea în toate cele șase baze de date, prin înlocuirea datelor cu caracter personal cu valori generice, păstrând totodată înregistrările agregate necesare raportării financiare.
- **Restricționare:** Statutul de membru inactiv exclude persoanele din căutări, din director, din rapoarte și din mesagerie, păstrându-le totodată înregistrarea.
- **Rectificare:** Membrii și administratorii pot edita informațiile personale prin intermediul aplicației.

### 3.6 Notificarea privind încălcările de securitate

ChurchApps se angajează să notifice bisericile afectate în termen de 72 de ore de la momentul în care ia cunoștință de o încălcare a securității datelor cu caracter personal, așa cum este documentat în [Termenii de utilizare](https://churchapps.org/terms) (Secțiunea 11.6).

### 3.7 Riscul accesului guvernamental din SUA

Principalul risc asociat datelor găzduite în SUA este posibilitatea accesului de către autoritățile guvernamentale americane în temeiul Secțiunii 702 din FISA sau al Ordinului executiv 12333. Acest risc este evaluat ca fiind **scăzut**, din următoarele motive:

- ChurchApps prelucrează date despre apartenența și prezența la biserică, nu date cu valoare informativă pentru serviciile de informații.
- Persoanele vizate sunt membri și participanți ai bisericii — nu sunt categorii vizate în mod obișnuit de programele de supraveghere.
- Nu sunt prelucrate date personale sensibile (sănătate, conturi financiare, opinii politice).
- DPA-ul AWS include angajamente privind cererile de acces guvernamental și raportarea transparenței.
- Cadrul UE-SUA pentru confidențialitatea datelor (Data Privacy Framework, stabilit în 2023) oferă garanții suplimentare pentru transferurile de date către organizațiile americane certificate.

## 4. Concluzia generală privind riscul

Riscul pentru persoanele vizate în urma acestui transfer internațional este evaluat ca fiind **scăzut**. Combinația dintre:

- Clauzele contractuale standard ca mecanism juridic de transfer
- Criptarea în tranzit și în repaus
- Controale stricte de acces, cu doar două persoane autorizate
- Segregarea datelor în baze de date independente
- Lipsa stocării detaliilor conturilor financiare
- Sensibilitatea scăzută și valoarea informativă redusă a datelor prelucrate
- Instrumente tehnice pentru exercitarea tuturor drepturilor persoanelor vizate

oferă măsuri suplimentare adecvate pentru a asigura că datele transferate beneficiază de un nivel de protecție în esență echivalent cu cel garantat în Regatul Unit/SEE.

## 5. Calendarul revizuirii

Această evaluare va fi revizuită anual sau ori de câte ori intervine o modificare semnificativă a prelucrării datelor, a subprocesatorilor sau a cadrului juridic care reglementează transferurile internaționale de date.
