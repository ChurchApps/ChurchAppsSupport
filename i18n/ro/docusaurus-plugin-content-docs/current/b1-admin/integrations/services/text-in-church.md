---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) reunește mesaje SMS și fluxuri de lucru programate, precum și automatizări pentru cardurile de conectare. Aplicația sa Zapier acoperă ambele direcții: puteți trimite evenimentele B1 către un flux de lucru Text In Church și puteți prelua declanșatori de tip card de conectare sau persoană nouă din Text In Church în B1.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Text In Church](https://textinchurch.com) cu un plan care include integrarea Zapier
- Un cont [Zapier](https://zapier.com)
- Un utilizator B1Admin cu permisiunea **Editare setări**

</div>

## Ce puteți configura

| Direcție | Declanșator | Acțiune |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Creare/actualizare persoană + adăugare în grup |
| B1 → Text In Church | B1 `form.submission.created` | Trimitere mesaj text prin echipa relevantă |
| B1 → Text In Church | B1 `group.member.added` | Adăugare în grup (oglindire a apartenenței la grup) |
| Text In Church → B1 | Connect Card Submitted | B1: Creare persoană + adăugare membru în grup |
| Text In Church → B1 | Person Created | B1: Creare persoană |
| Text In Church → B1 | Person Joined Group | B1: Adăugare membru în grup |

Acțiunile Text In Church includ și *Send Text Message* (trimitere mesaj text), *Send Voice Broadcast* (difuzare vocală), *Create Task* (creare sarcină), *Find Person/Group* (găsire persoană/grup) și adăugare sau eliminare din grup.

## Configurare

### 1. Generați o cheie API B1

**Setări → Dezvoltator → Chei API → Cheie API nouă**:

- `settings:write` — necesar pentru Zap-urile declanșate de B1
- `people:read`, `people:write` — pentru a găsi sau crea persoana
- `groups:write` — pentru sincronizarea grupurilor
- (Opțional) `donations:write` dacă doriți să trimiteți confirmările de donații către TIC

### 2. Conectați Text In Church la Zapier

Urmați [ghidul de integrare Zapier al Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Aceștia generează un token API din panoul de control TIC.

### 3. Construiți Zap-ul de la cardul de conectare la B1

Este cea mai frecventă direcție. Cardurile de conectare trimise din TIC devin automat persoane noi în B1.

1. **Declanșator** — Text In Church: Connect Card Submitted.
2. **Acțiune** — B1.church: Find Person (după e-mail).
3. **Ramură** — ramificare în funcție de rezultat (găsit / negăsit):
   - Negăsit → B1.church: Create Person.
   - Găsit → continuați.
4. **Acțiune** — B1.church: Add Group Member într-un grup „New Contact”.

Activați Zap-ul. Următorul card de conectare trimis prin TIC ajunge automat în **B1Admin → Persoane**.

## Rețete comune

### Declanșarea unui flux de tip card de conectare dintr-un formular B1

- **Declanșator** — B1.church: New Form Submission (filtrat după ID-ul formularului „I'm new here”)
- **Acțiune** — Text In Church: Create/Update Person, mapând răspunsurile din formular pentru e-mail, telefon și nume
- **Acțiune** — Text In Church: Add to Group, unde grupul are atașat un flux de bun venit pregătit

### Oglindirea apartenenței la grup

- **Declanșator** — B1.church: New Group Member, filtrat după un `groupId` specific
- **Acțiune** — Text In Church: Add to Group (aceeași persoană, grup oglindă). Asociați-l cu un Zap `group.member.removed` dacă doriți o sincronizare completă.

### Notificarea unui lider când cineva se alătură

- **Declanșator** — B1.church: New Group Member
- **Acțiune** — Text In Church: Send Text Message, destinatar = telefonul liderului grupului, corp = `"{first} {last} just joined {group}"`.

## Limite și note

- **Aplicația Zapier a TIC este disponibilă doar în anumite planuri.** Dacă integrarea Zapier apare inactivă în panoul TIC, contactați suportul TIC pentru a o activa pentru planul dumneavoastră.
- **ID-urile grupurilor sunt cele ale TIC, nu ale B1.** La oglindire veți avea nevoie de un tabel de corespondență undeva (un *Lookup Table* din Zapier sau valori fixe în fiecare Zap).
- **Trimiterea mesajelor text consumă credite.** Fiecare Zap care declanșează *Send Text* consumă din alocația dumneavoastră de SMS TIC.

## Depanare

- **Declanșatorul Connect Card nu se activează** — TIC are nevoie ca opțiunea de integrare Zapier să fie activată. Verificați și că formularul testat este configurat ca „Connect Card”, nu ca sondaj generic.
- **Crearea persoanei în B1 eșuează cu eroarea 401** — cheia API este greșită, revocată sau îi lipsește `people:write`. Generați o cheie nouă.
- **Persoane duplicate în B1** — TIC trimite atât *Person Created*, cât și *Connect Card Submitted* pentru același eveniment. Alegeți unul drept sursă de adevăr și adăugați un Filter Zapier pe celălalt.

## Vezi și

- [Clearstream](./clearstream) — platformă SMS alternativă, cu o structură Zapier similară
- [Zapier (prezentare generală)](../zapier) — partea B1 a fiecărei rețete Zapier
- [Ghidul Zapier al Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentația TIC)
