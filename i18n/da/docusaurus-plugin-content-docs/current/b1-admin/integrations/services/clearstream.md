---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Udløs en [Clearstream](https://clearstream.io)-sms fra enhver B1-begivenhed — ny person, ny gave, formularindsendelse, kalenderopdatering — og hent svar tilbage som B1-poster. Clearstreams Zapier-app understøtter begge retninger, så hele opsætningen er en opskrift og ikke tilpasset kode.

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- En [Clearstream](https://clearstream.io)-konto med mindst én liste og en sms-kvote
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruger med tilladelsen **Rediger indstillinger**

</div>

## Hvad du kan opsætte

| Retning | Udløser | Handling |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (f.eks. underret økonomiteamet) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (f.eks. bedeemnets team) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; tag med det nøgleord de sendte |

Clearstreams Zapier-handlinger: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Opsætning

### 1. Opret en B1-API-nøgle

**Indstillinger → Udvikler → API-nøgler → Ny API-nøgle**:

- `settings:write` — kræves, for at B1 kan registrere udløser-webhooken
- `people:read` — bruges til at slå personen op ud fra begivenheden (`personId` → navn/telefon/e-mail)
- (Valgfri) `people:write`, hvis Clearstream-svar skal oprette B1-kontakter

### 2. Opbyg Zap'en "send sms ved ny gave"

1. **Udløser** — B1.church: New Donation
2. **Handling** — B1.church: Find Person (donationens `personId`)
3. **Handling** — Clearstream: Send Text to Number. Brug personens telefonnummer fra trin 2 som modtager, og skriv beskeden (`"Tak for din gave, {first}! …"`).

Slå Zap'en til. B1 registrerer gave-webhooken ved aktivering; du vil se `Zapier — donation.created` under **Indstillinger → Udvikler → Webhooks**.

### 3. (Valgfrit) Hent svar tilbage som B1-poster

1. **Udløser** — Clearstream: New Incoming Text
2. **Handling** — Filter by Zapier på nøgleordet — f.eks. fortsæt kun, hvis sms'ens tekst begynder med `PRAY`
3. **Handling** — B1.church: Find Person (efter telefon)
4. **Handling** — Filter / Path — hvis personen ikke findes, opret vedkommende; gem under alle omstændigheder sms'ens tekst et sted (Slack, et Google Sheet eller en B1-formularindsendelse via Webhooks by Zapier).

## Almindelige opskrifter

### Udsendelse til frivilligteam

- **Udløser** — B1.church: New Form Submission (filtreret på bedeemne-formularens id)
- **Handling** — Clearstream: Send Text to List, hvor listen er dit vagthavende sjælesorgsteam. Skriv beskeden som `Ny bedeanmodning: {data.questions.0.answer}`.

### Opfølgningsforløb for førstegangsgæster

- **Udløser** — B1.church: New Person, filtreret på en B1-persontag "Førstegangsgæst"
- **Handling** — Clearstream: Add Subscriber to Automated Workflow. Knyt workflow-id'et til et forudbygget 7-dages sms-forløb.

### Nøgleordsstyret gruppetilmelding

- **Udløser** — Clearstream: New Incoming Text (filtrer på nøgleordet `MENS`)
- **Handling** — B1.church: Find Person (efter telefon); forgren ved ikke fundet → Create Person
- **Handling** — B1.church: Add Group Member til gruppen Mænds Ministerium

## Begrænsninger og noter

- **Clearstream måler sms'er pr. besked.** Hver Send Text-handling bruger et eller flere kreditter afhængigt af længde og antal modtagere — kontrollér din plans kvote.
- **Telefonnummeret skal være i E.164-format** (f.eks. `+15555550199`) til *Send Text to Number*. B1's personpost gemmer det, der blev indtastet; brug et *Formatter by Zapier — Numbers → Format Phone Number*-trin, hvis du ikke kan garantere formatet.
- **B1's side kræver ingen header** — Clearstreams godkendelse ligger helt i dens Zapier-forbindelse.

## Fejlfinding

- **Udløseren affyres aldrig** — `Indstillinger → Udvikler → Webhooks` bør vise en række `Zapier — <event>`, når Zap'en er slået til. Hvis ikke, mangler API-nøglen `settings:write`. Opret en ny nøgle og forbind igen.
- **Clearstream returnerer "Invalid phone number"** — modtagerfeltet er ikke i E.164. Tilføj et Format Phone Number-trin.
- **Send Text to List fejler med `403`** — Clearstream-API-brugeren mangler tilladelse til listen, eller listens id er forkert. List-id'er vises på Clearstreams listedetaljeside.

## Se også

- [Text In Church](./text-in-church) — alternativ sms-platform med lignende opsætning
- [Mobile Message](./mobile-message) — til kirker uden for USA
- [Zapier (oversigt)](../zapier) — B1-siden af alle Zapier-opskrifter
- [Clearstream API-dokumentation](https://api-docs.clearstream.io/) — til tilpassede integrationer ud over Zapier-appen
