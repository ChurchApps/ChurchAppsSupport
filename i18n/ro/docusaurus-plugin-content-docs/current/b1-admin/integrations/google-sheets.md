---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** este suplimentul oficial Google Sheets pentru B1.church. Adaugă o bară laterală în orice foaie de calcul care exportă persoane, donații, grupuri sau prezențe din biserica ta B1 în file denumite, la cerere, cu un singur clic. Suplimentul rulează integral în contul Google al utilizatorului. Nimic din el nu atinge serverele ChurchApps, în afară de apelurile API doar-citire pe care le face fiecare export.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont Google cu drept de editare la foaia de calcul în care vrei să exporți
- Un administrator al bisericii (sau cineva cu drept de citire asupra datelor pe care vrei să le exporți), care poate genera o cheie API B1
- Suplimentul B1 Export instalat din Google Workspace Marketplace

</div>

## Ce exportă

| Element de meniu | Filă din foaie | Date |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Fiecare export **înlocuiește** conținutul filei sale denumite. Rularea din nou a unui export îți oferă un instantaneu nou, nu rânduri adăugate la final. Celelalte file din foaia de calcul rămân neatinse.

## Configurare

### 1. Creează o cheie API B1 cu scopurile potrivite

1. În B1Admin, mergi la **Settings → Developer → API Keys**.
2. Apasă **New API Key**, numește-o „Sheets Export” și acordă scopurile de **citire** pentru ceea ce plănuiești să exporți:
   - `people:read` pentru exportul de persoane
   - `donations:read` pentru donații
   - `groups:read` pentru grupuri
   - `attendance:read` pentru prezențe
3. O cheie care face doar exporturi **nu** are nevoie de `settings:write`. Acel scop este doar pentru conectorii care înregistrează webhook-uri (Zapier / Make). Păstrează cheia cât mai restrânsă.
4. Salvează și copiază cheia `cak_…`.

### 2. Instalează suplimentul

1. Deschide foaia de calcul în care vrei să exporți.
2. **Extensions → Add-ons → Get add-ons**.
3. Caută **B1 Export** și instalează-l. Google îți cere acces la foile tale și la HTTP extern, pentru ca suplimentul să poată apela API-ul B1.

După instalare, o intrare **B1 Export** apare în meniul **Extensions** al fiecărei foi de calcul pe care o deschizi cu acest cont Google.

### 3. Conectează cheia

1. **Extensions → B1 Export → Connect…** (sau **B1 Export → Connect…** din bara de meniu, după prima deschidere).
2. Lipește cheia API în bara laterală, lasă Base URL ca `https://api.churchapps.org` (decât dacă testezi pe staging) și apasă **Save**.
3. Apasă **Test Connection**. Un mesaj verde „Connection OK” confirmă că cheia funcționează.

Cheia este stocată în **proprietățile per utilizator** (`PropertiesService.getUserProperties()`). Este legată de contul tău Google, nu este scrisă niciodată în foaie și nu este vizibilă pentru ceilalți editori ai foii de calcul.

## Rularea unui export

Fie:

- **Din meniu**: **Extensions → B1 Export → Export People** (sau Donations / Groups / Attendance)
- **Din bara laterală**: deschide bara laterală (Connect…) și apasă butonul setului de date potrivit

O notificare confirmă când exportul s-a terminat: „S-au scris _N_ rând(uri) în „B1 People”.”

## Construirea rapoartelor pe baza datelor

Filele exportate sunt date Google Sheets obișnuite. Poți construi propriile analize făcând referire la file:

- O **filă de sumar** cu `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` pentru a totaliza darurile făcute cu cardul
- O **vizualizare filtrată** doar cu membrii: `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- O **diagramă** a tendințelor de prezență, cu date din `B1 Attendance`

Rularea din nou a exportului reîmprospătează fila de bază, iar formulele tale se actualizează automat.

## Programarea exporturilor recurente

Suplimentul funcționează implicit la cerere. Pentru exporturi săptămânale sau lunare, folosește trigger-ele cu declanșare temporală integrate în Apps Script:

1. **Extensions → Apps Script** în foaia de calcul (aceasta deschide scriptul asociat suplimentului).
2. Apasă pe iconița **⏰ Triggers** din bara laterală din stânga.
3. **Add Trigger** pentru `exportPeople` (sau orice altă funcție de export). Alege *Time-driven*, *Week timer*, de exemplu *Every Monday 6am*.

Exportul rulează în fundal, sub contul tău Google. Dacă cheia API este rotită sau revocată, trigger-ul îți trimite un e-mail data viitoare când eșuează.

## Permisiuni și confidențialitate

- Suplimentul cere doar `spreadsheets.currentonly` (poate atinge doar foaia de calcul în care este deschis) și `script.external_request` (ca `UrlFetchApp` să poată apela API-ul B1). Nu vede Drive-ul, Gmail-ul sau alte date Google ale tale.
- Cheia API B1 este stocată per utilizator. Ceilalți editori ai aceleiași foi de calcul nu o pot vedea.
- Toate apelurile API B1 se fac prin HTTPS, cu `Authorization: Bearer cak_…`.

## Depanare

- **„No API key set”**: deschide **Extensions → B1 Export → Connect…** și lipește cheia.
- **„B1 rejected the API key (401)”**: cheia a fost revocată sau este greșită. Generează-o din nou și lipește-o.
- **„This API key lacks permission for /giving/donations (403)”**: cheia nu are `donations:read`. Actualizează scopurile cheii în B1Admin.
- **Foaia nu se reîmprospătează** după rulare: verifică dacă te uiți la numele *corect* al filei (`B1 People` etc.). Exportul creează fila dacă nu există.
- **„Quota exceeded”**: Apps Script impune cote zilnice per utilizator pentru `UrlFetchApp` (de obicei mii de apeluri pe zi). O biserică mare cu multe înregistrări poate avea nevoie să împartă exporturile pe mai multe zile sau să folosească [Make](./make) ori o integrare personalizată pentru sincronizare cu volum mare.

## Personalizarea suplimentului

Suplimentul este open source. Proiectul Apps Script se află în repository-ul `B1Integrations/GoogleSheetsAddon/`. Dacă vrei o coloană pe care nu o exportăm, un set de date suplimentar sau un alt format de ieșire, deschide un issue sau un PR acolo.

## Vezi și

- [Zapier](./zapier): pentru sincronizare în timp real, nu export la cerere
- [Make](./make): pentru sincronizare cu transformări mai complexe
- [Chei API (referință pentru dezvoltatori)](/docs/developer/api/api-keys)
