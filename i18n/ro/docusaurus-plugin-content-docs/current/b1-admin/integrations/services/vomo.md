---
title: "VOMO"
description: "Conectați înscrierile de voluntari VOMO și check-in-urile de la chioșc la persoanele și grupurile din B1 Admin prin Zapier, cu scopurile cheii API și pașii."
---

# VOMO

<div class="article-intro">

VOMO este o platformă de implicare a voluntarilor: oamenii se înscriu la proiecte, fac check-in la chioșc și acumulează ore. Dacă folosești VOMO pentru programarea voluntarilor, dar B1 pentru fișele persoanelor, Zapier poate sincroniza apartenența și check-in-urile între cele două, astfel încât niciuna să nu rămână în urmă.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [VOMO](https://vomo.org) pe un plan care include Zapier (verifică la suportul VOMO dacă nu ești sigur)
- Un cont [Zapier](https://zapier.com)
- Un utilizator B1Admin cu permisiunea **Edit Settings**

</div>

## Ce poți conecta

Aplicația VOMO pentru Zapier oferă patru declanșatoare instant și patru acțiuni. Rețetele pe care le doresc cele mai multe biserici:

| Direcție | Declanșator | Acțiune |
|---|---|---|
| VOMO → B1 | Membru VOMO (creat) | B1: Find Person → Create Person (dacă este nou) |
| VOMO → B1 | Check-in la chioșcul VOMO | B1: Add Group Member într-un grup „Currently Serving” sau înregistrare ca prezență |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (după e-mail); altfel un pas personalizat |
| Oricare | Participare VOMO (înscrieri) | B1: Add Group Member într-un grup specific proiectului |

Acțiunile VOMO se limitează la **schițarea proiectelor** și **căutarea** organizatorilor sau proiectelor existente. Momentan nu există o acțiune de tipul „adaugă această persoană într-un proiect VOMO”. Conectarea cea mai utilă este, în mare parte, de la VOMO către B1.

## Configurare

### 1. Creează o cheie API B1

**Settings → Developer → API Keys → New API Key**. Permisiuni (scopes):

- `people:read`, `people:write`: pentru a căuta și a crea voluntarii ca persoane în B1
- `groups:write`: pentru a-i adăuga în grupurile echipelor de slujire
- (Opțional) `attendance:write`, dacă tratezi check-in-urile de la chioșc ca prezență

### 2. Construiește Zap-ul de sincronizare a membrilor

1. **Declanșator**: VOMO: Membership (eveniment = `created`).
2. **Acțiune**: B1.church: Find Person, potrivit după e-mail.
3. **Filtru / Cale**: ramificație în funcție de găsit sau negăsit:
   - Negăsit → B1.church: Create Person, apoi Add Group Member în grupul de voluntari potrivit.
   - Găsit → B1.church: Add Group Member direct.
4. Activează. Voluntarii noi din VOMO apar acum în B1, cu apartenența corectă la grup.

### 3. (Opțional) Construiește Zap-ul pentru check-in la chioșc

1. **Declanșator**: VOMO: Kiosk
2. **Acțiune**: B1.church: Find Person (după e-mail)
3. **Acțiune**: alegerea ta:
   - *Dacă îl tratezi ca prezență*: Webhooks by Zapier trimite o cerere POST către endpoint-ul `/attendance/visits` al B1 (aplicația Zapier a B1 nu are încă o acțiune nativă *Record Attendance*). [Cheia API](/docs/developer/api/api-keys) B1 se trimite în antetul `Authorization: Bearer cak_…`.
   - *Dacă îl tratezi ca apartenență la grup*: B1.church: Add Group Member cu un grup „Currently Serving (Today)”, iar un al doilea Zap, rulat mai târziu în cursul zilei, îi scoate din grup printr-o curățare programată.

## Rețete frecvente

### Sincronizarea pe proiect a grupurilor

- **Declanșator**: VOMO: Participation (created)
- **Acțiune**: Filter by Zapier după ID-ul proiectului, apoi
- **Acțiune**: B1.church: Add Group Member într-un grup B1 al cărui nume reflectă proiectul din VOMO.

Când proiectul din VOMO se încheie, golește manual grupul din B1 (sau asociază acest pas cu un declanșator *Participation deleted*, care îi scoate din grup).

### Trimite un SMS de mulțumire pentru înscriere

Înlănțuiește în același Zap pașii VOMO Participation → Clearstream Send Text sau Text In Church Send Message. Ambele au acțiuni native în Zapier. Vezi [Clearstream](./clearstream.md) și [Text In Church](./text-in-church.md).

### Detectează abandonul

Rulează zilnic un declanșator *Schedule* din Zapier, care apelează Find Organizer în VOMO pentru o listă de persoane din B1 care au intrat în echipa de slujire în luna curentă. Dacă VOMO răspunde „not found”, înseamnă că nu și-au activat contul VOMO și au nevoie de un memento.

## Limite și observații

- **E-mailul este cheia de legătură.** Datele VOMO includ adresa de e-mail a utilizatorului, dar nu un ID de persoană din B1. Donatorii care folosesc adrese diferite în fiecare sistem vor crea duplicate.
- **Nu există o acțiune „Add to Project” în aplicația VOMO pentru Zapier.** Dacă ai nevoie de înscrierea din B1 într-un proiect VOMO, trebuie să trimiți o cerere POST către API-ul REST al VOMO dintr-un pas *Webhooks by Zapier*. Aceasta este o integrare personalizată.
- **Planurile gratuite sau de nivel inferior ale VOMO este posibil să nu includă Zapier.** Confirmă la suportul VOMO înainte de a promite o dată pentru conectare.

## Depanare

- **Declanșatorul nu se activează niciodată**: declanșatoarele instant ale VOMO necesită ca tokenul API să rămână valid. Testează din nou Zap-ul; reconectează VOMO dacă tokenul a fost rotit.
- **B1 *Add Group Member* eșuează cu 422**: ID-ul grupului din acțiune nu există. Deschide **B1Admin → Groups**, apasă pe grup și copiază segmentul de ID din URL în pasul Zap-ului.
- **Persoane duplicate în B1 dintr-un singur voluntar VOMO**: probabil s-au înscris cu o altă adresă de e-mail decât cea pe care o aveau deja în B1. Fie standardizează adresele de e-mail, fie adaugă o *Cale* în Zapier care caută și după numărul de telefon înainte de a crea persoana.

## Vezi și

- [Zapier (prezentare generală)](../zapier.md): partea B1 a fiecărei rețete Zapier
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): asociază înscrierile voluntarilor cu confirmări prin SMS
- [Webhooks (referință pentru dezvoltatori)](/docs/developer/api/webhooks): evenimentele pe care le poate declanșa VOMO
