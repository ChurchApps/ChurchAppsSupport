---
title: "Make"
description: "Conectați B1 Admin la Make pentru a automatiza fluxuri: creați o cheie API, configurați declanșatorul și acțiunile B1.church și rezolvați erorile comune."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (cunoscut anterior ca Integromat) este o platformă vizuală de automatizare a fluxurilor de lucru, asemănătoare cu Zapier, dar cu logică mai flexibilă și un cost mai mic la scară mare. Aplicația oficială B1.church pentru Make vă permite să creați „scenarii” care reacționează instant la evenimentele B1 și scriu înregistrări înapoi în B1.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Make](https://www.make.com) (planul gratuit acoperă fluxurile de lucru mici)
- Un administrator al bisericii cu permisiunea **Editare setări** în B1Admin
- O idee generală despre scenariul pe care doriți să îl creați

</div>

## Module

| Tip | Ce face | Eveniment / endpoint B1 |
|---|---|---|
| **Declanșator instant** | Urmărește evenimentele | orice eveniment B1 abonat (`person.created`, `donation.created`, …) |
| **Acțiune** | Creează persoană | adaugă o persoană nouă |
| **Acțiune** | Adaugă donație | înregistrează o donație |
| **Acțiune** | Adaugă membru în grup | adaugă o persoană într-un grup |
| **Căutare** | Caută persoane | găsește persoane după nume sau adresă de e-mail |

Declanșatorul instant vă permite să alegeți ce eveniment să urmăriți: câte un modul declanșator pentru fiecare scenariu, configurat pentru fiecare eveniment în parte.

## Configurare

### 1. Creați o cheie API B1

1. În B1Admin, mergeți la **Setări → Dezvoltator → Chei API**.
2. Faceți clic pe **Cheie API nouă**, denumiți-o „Make” și acordați domeniile de acces (scopes) de care aveți nevoie.
3. **Includeți `settings:write`** dacă vreunul dintre scenariile dvs. folosește declanșatorul instant. Make înregistrează un webhook în numele dvs. atunci când scenariul este activat.
4. Acordați și domeniile de acces necesare modulelor de acțiune (de exemplu, `donations:write` pentru modulul Adaugă donație).
5. Salvați și copiați cheia `cak_…`.

### 2. Instalați conexiunea

1. În Make, creați un scenariu nou și adăugați modulul declanșator **B1.church** pe pânză.
2. Când vi se solicită, alegeți **Create a connection**. Lipiți cheia API în câmpul *API Key* și lăsați *API Base URL* ca `https://api.churchapps.org` (cu excepția cazului în care testați pe mediul de staging).
3. Faceți clic pe **Save**. Make testează cheia citind profilul bisericii dvs.

Conexiunea este salvată în contul dvs. Make și este reutilizată în toate scenariile.

### 3. Configurați declanșatorul

1. Deschideți setările modulului **Watch Events**.
2. Alegeți evenimentul dorit, de exemplu `donation.created`.
3. Salvați. Make generează un URL unic de webhook și îl stochează intern.

### 4. Adăugați module în aval

Adăugați oricare dintre sutele de module de aplicații Make pe pânză: Mailchimp, Google Sheets, Slack, HubSpot, propriul dvs. endpoint HTTP etc. Mapați rezultatul declanșatorului (`event`, `churchId`, `data.id`, `data.amount`, …) în câmpurile de intrare ale acestora. Modulele Make de tip flatten, iterator, router și aggregator vă permit să construiți fluxuri ramificate și paralele, greu de realizat în Zapier.

### 5. Activați scenariul

Comutați **Active** în antetul scenariului. Make apelează `POST /membership/webhooks` din B1 pentru a înregistra URL-ul. De atunci, fiecare eveniment B1 corespunzător trece prin scenariu în timp real.

Dezactivarea scenariului apelează `DELETE /membership/webhooks/{id}`, astfel încât să nu rămână abonamente orfane.

## Rețete frecvente

### Sincronizați donațiile într-un Google Sheet pentru verificarea financiară

- **Declanșator** — B1: Watch Events (`donation.created`)
- **Acțiune** — Google Sheets: Add a Row. Mapați `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` în coloanele foii de calcul.

### Notificare Slack condiționată de suma donației

- **Declanșator** — B1: Watch Events (`donation.created`)
- **Router**:
  - Ramura A — Filtru: `data.amount >= 1000` → Slack: postează în `#major-gifts`
  - Ramura B — implicită → Slack: postează în `#donations`

### Persoană nouă → CRM + e-mail de bun venit + Slack

- **Declanșator** — B1: Watch Events (`person.created`)
- **Acțiune** — HubSpot: Create Contact
- **Acțiune** — Mailgun: Send Welcome Email
- **Acțiune** — Slack: Notifică `#new-people` (în paralel — folosiți routerul Make)

## Cum funcționează declanșatorul instant

Declanșatorul instant se bazează pe webhook, nu pe interogare periodică: la activare, Make apelează `POST /membership/webhooks` cu URL-ul generat și evenimentul ales. Când evenimentul se produce în B1, B1 trimite mesajul către URL-ul Make, iar scenariul rulează în câteva secunde. Dezactivarea scenariului elimină webhook-ul.

Declanșatorul se activează doar pentru evenimentele care au loc **cât timp scenariul este activ**. Nu există retroactivitate.

## Limite și observații

- **Un eveniment pentru fiecare modul Watch Events.** Pentru a asculta mai multe evenimente într-un singur scenariu, adăugați mai multe module declanșator în scenarii separate (sau folosiți un singur modul cu lista unificată de evenimente, vezi mai jos).
- **Verificarea semnăturii nu este expusă.** Make nu transmite `X-B1-Signature` către scenariu; limita de încredere este URL-ul de webhook unic și imposibil de ghicit pentru fiecare scenariu. Aceasta este o practică obișnuită în Make. Dacă aveți nevoie de verificări explicite ale semnăturii, construiți o integrare personalizată folosind [SDK-ul](/docs/developer/api/webhooks#sdk-support).
- **Numărul de operațiuni.** Fiecare apel API al unui modul de acțiune se consumă din cota dvs. de operațiuni Make, nu din resursele de pe partea B1.

## Depanare

- **Testul conexiunii eșuează** — cel mai adesea din cauza unei greșeli de scriere în cheia API. Copiați-o din nou din B1Admin (cheia completă este afișată o singură dată; dacă ați pierdut-o, creați o cheie nouă).
- **Modulul declanșator nu se activează** — verificați **Setări → Dezvoltator → Webhooks** în B1Admin. Dacă nu vedeți un rând „Make — &lt;event&gt;” după activarea scenariului, cheia nu are `settings:write`. Actualizați cheia și reactivați scenariul.
- **Acțiunea returnează `403 Forbidden`** — cheia API nu are domeniul de acces pentru acel endpoint. De exemplu, Adaugă donație necesită `donations:write`. Actualizați cheia în B1Admin și testați din nou.

## Personalizarea aplicației

Aplicația B1.church pentru Make este open source: definițiile JSON se află în repository-ul `B1Integrations/Make/`. Dacă aveți nevoie de un modul care nu există (de exemplu, o acțiune nouă pentru un endpoint pe care nu l-am acoperit încă), deschideți un issue sau un PR în acel repository.

## Vezi și

- [Zapier](./zapier.md) — același model, cu o interfață mai simplă și un catalog mai mare de aplicații
- [Slack și Discord](./slack-discord.md) — notificări de chat integrate, fără Make
- [Webhooks (referință pentru dezvoltatori)](/docs/developer/api/webhooks)
