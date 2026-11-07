---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) efectuează verificarea antecedentelor pentru angajați și voluntari, o nevoie aproape universală pentru orice biserică ce are un program pentru copii sau tineri. B1 **nu are o funcție integrată de verificare a antecedentelor**. Comandarea verificărilor, urmărirea rezultatelor și conformitatea cu regulile de screening se fac toate în Checkr. Pașii de mai jos conectează doar evenimentele din B1 cu Checkr. Checkr nu are o aplicație Zapier, dar [integrarea Checkr din Make.com](https://www.make.com/en/integrations/checkr) este verificată și oferă acțiunile necesare pentru a porni o verificare dintr-un eveniment B1.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Checkr](https://checkr.com) cu acces la API și cel puțin un pachet de screening configurat
- Un cont [Make](https://www.make.com)
- Un utilizator B1Admin cu permisiunea **Edit Settings**

</div>

## Ce puteți conecta

Aplicația Checkr din Make oferă 1 trigger și 6 acțiuni:

| Direcție | Trigger B1 / Make | Acțiune |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrat pe un grup de voluntari) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook Checkr (eveniment de invitație / raport) | B1: Actualizarea fișei persoanei (de exemplu, eticheta „Checkr cleared") |

Acțiunile Checkr din Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Plus 4 module de căutare.

## Configurare

### 1. Creați o cheie API pentru B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: pentru webhook-ul trigger-ului
- `people:read`: pentru a căuta numele și adresa de e-mail ale persoanei la pornirea unei verificări
- (Opțional) `people:write`, dacă doriți să scrieți înapoi starea raportului ca un câmp personalizat sau o etichetă

### 2. Construiți scenariul „pornește o verificare la înscrierea voluntarului" în Make

1. **Trigger**: B1.church: Watch Events (`group.member.added`).
2. **Filtru**: continuați doar dacă `data.groupId` corespunde grupului dumneavoastră „Voluntari pentru copii" (sau echivalent).
3. **Acțiune**: B1.church: Find Person (după `data.personId`) pentru a obține adresa de e-mail și numele și prenumele.
4. **Acțiune**: Checkr: Create Candidate. Mapați prenumele, numele și adresa de e-mail de la pasul 3.
5. **Acțiune**: Checkr: Create Background Check Invitation. Mapați ID-ul noului candidat de la pasul 4 în câmpul *candidate_id*. Alegeți pachetul de screening (de exemplu `tasker_standard` sau orice expune contul dumneavoastră).
6. (Opțional) **Acțiune**: Slack: notificați coordonatorul pentru siguranța în slujire că a fost inițiată o verificare.

Activați scenariul. Voluntarii noi din grupul vizat primesc automat o invitație Checkr prin e-mail. Ei completează formularul pe telefon sau laptop, iar Checkr efectuează verificarea.

### 3. (Opțional) Primirea raportului

1. **Trigger**: Checkr: Watch Events (webhook). Make înregistrează un webhook Checkr la activare.
2. **Filtru**: continuați doar dacă `event_type = report.completed`.
3. **Acțiune**: Checkr: Get Report (folosind ID-ul raportului din webhook).
4. **Acțiune**: B1.church: Find Person (după adresa de e-mail a candidatului).
5. **Acțiune condiționată**: Slack / e-mail: notificați coordonatorul cu starea `clear` / `consider` / `suspended`.

Notă: în prezent, B1 nu are un câmp integrat pentru „starea verificării antecedentelor". Opțiunile practice sunt (a) să publicați rezultatul pe un canal Slack privat pentru analiză, (b) să îl scrieți într-o foaie de calcul Google pentru audit sau (c) să adăugați persoana în grupul B1 „Voluntari verificați" la starea `clear`.

## Scenarii frecvente

### Reverificarea voluntarilor la fiecare 2 ani

Asociați cele de mai sus cu un trigger de programare din Make:

- **Trigger**: Make: Schedule (lunar)
- **Acțiune**: B1.church: List Group Members pentru „Voluntari verificați"
- **Acțiune**: Filtru Make: data verificării este mai veche de 22 de luni
- **Acțiune**: Checkr: Create Background Check Invitation (același flux ca la inițiere)

### Blocarea accesului din etapa 1 până la finalizarea verificării

Dacă biserica dumneavoastră folosește apartenența la grupurile B1 pentru a controla accesul (de exemplu, doar membrii grupului „Verificați" apar în programele de slujire), țineți voluntarii noi într-un grup de așteptare până când evenimentul Checkr `report.completed` îi mută.

## Limite și note

- **Checkr funcționează doar în SUA** pentru majoritatea pachetelor de screening. Bisericile din Australia, Regatul Unit și Canada vor avea nevoie de o alternativă.
- **Prețul** se calculează per verificare. Fiecare Create Invitation din Make consumă o verificare reală. Testați mai întâi în mediul sandbox sau de test al contului Checkr. Aplicația Checkr din Make respectă datele de autentificare pe care le transmiteți în conexiune, deci schimbarea acestora comută între sandbox și producție.
- **Accesul la API Checkr depinde de plan.** Conturile Checkr mai mici pot fi limitate la interfața web. Contactați Checkr pentru a activa API-ul.

## Depanare

- **Create Candidate eșuează cu `403`**: tokenul API Checkr este doar pentru citire sau nu are permisiunile de cont necesare. Reemiteți-l din panoul Checkr cu drepturi de scriere.
- **Invitația nu ajunge niciodată**: verificați adresa de e-mail a candidatului de la pasul 3. B1 poate avea un câmp de e-mail gol pentru acea persoană. Adăugați un filtru care cere adresa de e-mail înainte de pasul Checkr.
- **Trigger-ul webhook nu se declanșează**: înregistrarea webhook-ului Checkr eșuează uneori fără mesaj dacă contul Make nu are un plan plătit care permite webhook-uri de ieșire. Verificați pagina *Webhooks* din panoul Checkr și confirmați că URL-ul Make apare acolo.

## Vezi și

- [Make (prezentare generală)](../make): partea B1 a fiecărui scenariu Make
- [Mobile Message](./mobile-message): pentru furnizorii de SMS fără aplicații Zapier, cu același model Webhooks/HTTP ca la conectarea Checkr prin Make
- [Documentația API Checkr](https://docs.checkr.com/)
