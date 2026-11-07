---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) står for baggrundstjek af medarbejdere og frivillige, et næsten universelt behov for enhver kirke, der driver et børne- eller ungdomsprogram. B1 har **ingen indbygget funktion til baggrundstjek**. Bestilling af tjek, opfølgning på resultater og overholdelse af screeningskrav foregår alt sammen i Checkr. Opskriften nedenfor forbinder kun B1-hændelser med Checkr. Checkr har ingen Zapier-app, men [Make.coms Checkr-integration](https://www.make.com/en/integrations/checkr) er verificeret og indeholder de handlinger, du skal bruge for at starte et tjek ud fra en B1-hændelse.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En [Checkr](https://checkr.com)-konto med API-adgang og mindst én konfigureret screeningpakke
- En [Make](https://www.make.com)-konto
- En B1Admin-bruger med tilladelsen **Edit Settings**

</div>

## Hvad du kan koble op

Make's Checkr-app indeholder 1 trigger og 6 handlinger:

| Retning | B1-/Make-trigger | Handling |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtreret til en frivilliggruppe) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr-webhook (invitation-/rapporthændelse) | B1: Opdater personens profil (f.eks. tagget "Checkr cleared") |

Make's Checkr-handlinger: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA og Get an Invitation. Derudover 4 søgemoduler.

## Opsætning

### 1. Opret en B1 API-nøgle

**Settings → Developer → API Keys → New API Key**:

- `settings:write`, til trigger-webhooken
- `people:read`, til at slå personens navn og e-mail op, når et tjek startes
- (Valgfrit) `people:write`, hvis du vil skrive rapportstatus tilbage som et brugerdefineret felt eller et tag

### 2. Byg scenariet "start et tjek ved tilmelding som frivillig" i Make

1. **Trigger**: B1.church: Watch Events (`group.member.added`).
2. **Filter**: Fortsæt kun, hvis `data.groupId` matcher din gruppe "Children's Volunteers" (eller tilsvarende).
3. **Handling**: B1.church: Find Person (med `data.personId`) for at hente e-mail og for- og efternavn.
4. **Handling**: Checkr: Create Candidate. Map for- og efternavn samt e-mail fra trin 3.
5. **Handling**: Checkr: Create Background Check Invitation. Map det nye kandidat-id fra trin 4 til feltet *candidate_id*. Vælg screeningpakken (f.eks. `tasker_standard` eller det, din konto stiller til rådighed).
6. (Valgfrit) **Handling**: Slack: Giv din koordinator for sikker tjeneste besked om, at et tjek er startet.

Slå scenariet til. Nye frivillige i den valgte gruppe får automatisk en Checkr-invitation på e-mail. De gennemfører den på telefon eller computer, og Checkr udfører screeningen.

### 3. (Valgfrit) Modtag rapporten tilbage

1. **Trigger**: Checkr: Watch Events (webhook). Make registrerer en Checkr-webhook, når scenariet aktiveres.
2. **Filter**: Fortsæt kun, hvis `event_type = report.completed`.
3. **Handling**: Checkr: Get Report (brug rapport-id'et fra webhooken).
4. **Handling**: B1.church: Find Person (med kandidatens e-mail).
5. **Handling**: Betinget Slack/e-mail: Giv koordinatoren besked med status `clear` / `consider` / `suspended`.

Bemærk: B1 har i dag ikke et indbygget felt til status for baggrundstjek. De praktiske muligheder er (a) at sende resultatet til en privat Slack-kanal til gennemgang, (b) at skrive det til et Google Sheet til revision, eller (c) at tilføje personen til en B1-gruppe "Cleared volunteers" ved `clear`.

## Almindelige opskrifter

### Gentjek frivillige hvert 2. år

Kombiner ovenstående med en tidsplanstrigger i Make:

- **Trigger**: Make: Schedule (månedligt)
- **Handling**: B1.church: List Group Members for "Cleared volunteers"
- **Handling**: Filter i Make: godkendelsesdato ældre end 22 måneder
- **Handling**: Checkr: Create Background Check Invitation (samme flow som den første opsætning)

### Bloker adgang på trin 1, indtil tjekket er færdigt

Hvis din kirke bruger B1-gruppemedlemskab til at styre adgang (f.eks. at kun medlemmer af gruppen "Cleared" vises i tjeneseplaner), kan du holde nye frivillige i en midlertidig gruppe, indtil Checkr-hændelsen `report.completed` flytter dem.

## Begrænsninger og noter

- **Checkr er kun for USA** for de fleste screeningpakker. Kirker i Australien, Storbritannien og Canada skal bruge en anden løsning.
- **Priser** beregnes pr. tjek. Hver Create Invitation i Make bruger et rigtigt tjek. Test først i Checkrs sandbox- eller staging-konto. Make's Checkr-app bruger de legitimationsoplysninger, du angiver i forbindelsen, så du kan skifte mellem sandbox og live ved at skifte oplysningerne.
- **Adgang til Checkr API kræver en bestemt plan.** Mindre Checkr-konti kan være på et niveau med kun brugerflade. Kontakt Checkr for at aktivere API'et.

## Fejlfinding

- **Create Candidate fejler med `403`**: Checkr API-tokenet er skrivebeskyttet eller mangler de rigtige kontotilladelser. Udsted det igen fra Checkr-dashboardet med skrivetilladelse.
- **Invitationen kommer aldrig frem**: Kontroller kandidatens e-mail i trin 3. B1 kan have et tomt e-mailfelt for personen. Tilføj et filter, der kræver e-mail, før Checkr-trinnet.
- **Webhook-triggeren starter ikke**: Checkrs webhook-registrering fejler nogle gange stille, hvis din Make-konto ikke er på en betalt plan, der understøtter udgående webhooks. Kontroller på siden *Webhooks* i Checkrs dashboard, at Make's URL er angivet.

## Se også

- [Make (oversigt)](../make): B1-siden af alle Make-scenarier
- [Mobile Message](./mobile-message): til sms-udbydere uden Zapier-apps, med samme Webhooks/HTTP-mønster som Checkr-opsætningen i Make
- [Checkr API-dokumentation](https://docs.checkr.com/)
