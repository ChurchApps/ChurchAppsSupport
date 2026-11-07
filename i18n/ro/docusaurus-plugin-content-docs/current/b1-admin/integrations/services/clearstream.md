---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Declanșați un mesaj text [Clearstream](https://clearstream.io) din orice eveniment B1 (persoană nouă, donație nouă, trimitere de formular, actualizare în calendar) și preluați răspunsurile ca înregistrări B1. Aplicația Zapier a Clearstream acceptă ambele direcții, așa că întreaga configurare este o rețetă, nu cod personalizat.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Un cont [Clearstream](https://clearstream.io) cu cel puțin o listă și un plan de mesaje SMS
- Un cont [Zapier](https://zapier.com)
- Un utilizator B1Admin cu permisiunea **Edit Settings**

</div>

## Ce puteți configura

| Direcție | Declanșator | Acțiune |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (de exemplu, pentru a notifica echipa financiară) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (de exemplu, echipa de cereri de rugăciune) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; etichetați cu cuvântul-cheie trimis în mesaj |

Acțiunile Zapier ale Clearstream: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Configurare

### 1. Generați o cheie API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — necesară pentru ca B1 să înregistreze webhook-ul declanșatorului
- `people:read` — necesară pentru a căuta persoana din eveniment (`personId` → nume/telefon/e-mail)
- (Opțional) `people:write` dacă răspunsurile Clearstream ar trebui să creeze contacte B1

### 2. Creați Zap-ul „trimite text la o donație nouă”

1. **Declanșator** — B1.church: New Donation
2. **Acțiune** — B1.church: Find Person (`personId` din donație)
3. **Acțiune** — Clearstream: Send Text to Number. Folosiți telefonul persoanei de la pasul 2 ca destinatar și compuneți mesajul (`"Mulțumim pentru donație, {first}! …"`).

Activați Zap-ul. B1 înregistrează webhook-ul pentru donații la activare; veți vedea `Zapier — donation.created` apărând în **Settings → Developer → Webhooks**.

### 3. (Opțional) Preluați răspunsurile ca înregistrări B1

1. **Declanșator** — Clearstream: New Incoming Text
2. **Acțiune** — Filter by Zapier pe cuvântul-cheie — de exemplu, continuați doar dacă textul mesajului începe cu `PRAY`
3. **Acțiune** — B1.church: Find Person (după telefon)
4. **Acțiune** — Filter / Path — dacă persoana nu este găsită, o creați; în ambele cazuri, salvați textul mesajului undeva (Slack, un Google Sheet sau o trimitere de formular B1 prin Webhooks by Zapier).

## Rețete frecvente

### Alertarea echipei de voluntari

- **Declanșator** — B1.church: New Form Submission (filtrat după ID-ul formularului de cereri de rugăciune)
- **Acțiune** — Clearstream: Send Text to List, unde lista este echipa pastorală de serviciu. Compuneți mesajul astfel: `Cerere nouă de rugăciune: {data.questions.0.answer}`.

### Secvență de urmărire pentru vizitatorii noi

- **Declanșator** — B1.church: New Person, filtrat după eticheta persoanei din B1 „First-time visitor”
- **Acțiune** — Clearstream: Add Subscriber to Automated Workflow. Asociați ID-ul fluxului de lucru cu o serie prestabilită de mesaje text pe 7 zile.

### Înscriere în grup prin cuvânt-cheie

- **Declanșator** — Clearstream: New Incoming Text (filtrat pentru cuvântul-cheie `MENS`)
- **Acțiune** — B1.church: Find Person (după telefon); ramificați pe cazul „nu a fost găsit” → Create Person
- **Acțiune** — B1.church: Add Group Member la grupul Men's Ministry

## Limite și observații

- **Clearstream taxează SMS-urile per mesaj.** Fiecare acțiune Send Text consumă unul sau mai multe credite, în funcție de lungime și de numărul de destinatari — verificați planul disponibil.
- **Numărul de telefon trebuie să fie în format E.164** (de exemplu, `+15555550199`) pentru *Send Text to Number*. Înregistrarea persoanei din B1 stochează orice a fost introdus; folosiți un pas *Formatter by Zapier — Numbers → Format Phone Number* dacă nu puteți garanta formatul.
- **Din partea B1 nu este necesar niciun antet** — autentificarea Clearstream se află integral în conexiunea sa Zapier.

## Depanare

- **Declanșatorul nu se activează niciodată** — `Settings → Developer → Webhooks` ar trebui să afișeze un rând `Zapier — <event>` după ce Zap-ul este activat. Dacă nu, cheia API B1 nu are permisiunea `settings:write`. Generați din nou cheia și reconectați.
- **Clearstream returnează „Invalid phone number”** — câmpul destinatarului nu este în format E.164. Adăugați un pas Format Phone Number.
- **Send Text to List eșuează cu `403`** — utilizatorul API Clearstream nu are permisiune pentru acea listă, sau ID-ul listei este greșit. ID-urile listelor sunt vizibile pe pagina de detalii a listei din Clearstream.

## Vezi și

- [Text In Church](./text-in-church) — platformă SMS alternativă, cu o structură de configurare similară
- [Mobile Message](./mobile-message) — pentru bisericile din afara SUA
- [Zapier (prezentare generală)](../zapier) — partea B1 din fiecare rețetă Zapier
- [Documentația API Clearstream](https://api-docs.clearstream.io/) — pentru integrări personalizate dincolo de aplicația Zapier
