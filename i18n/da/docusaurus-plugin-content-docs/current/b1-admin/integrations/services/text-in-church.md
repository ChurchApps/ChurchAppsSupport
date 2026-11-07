---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) samler SMS, drip-workflows og automatiseringer til connect-kort. Deres Zapier-app understøtter begge retninger: Du kan sende B1-hændelser ind i en Text In Church-workflow, og trække connect-kort- eller nye-kontakt-udløsere den anden vej over i B1.

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- En [Text In Church](https://textinchurch.com)-konto på et abonnement, der inkluderer Zapier-integrationen
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruger med tilladelsen **Edit Settings**

</div>

## Hvad du kan koble op

| Retning | Udløser | Handling |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message via den relevante gruppe |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (spejl gruppemedlemskab) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Handlinger i Text In Church omfatter også *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* og tilføjelse eller fjernelse af gruppemedlemskab.

## Opsætning

### 1. Opret en B1 API-nøgle

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — påkrævet for Zaps, der udløses af B1
- `people:read`, `people:write` — til at finde eller oprette personen
- `groups:write` — til gruppesynkronisering
- (Valgfrit) `donations:write`, hvis du vil koble gavebekræftelser til TIC

### 2. Forbind Text In Church til Zapier

Følg [Text In Churchs vejledning til Zapier-integrationen](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). De genererer et API-token i TIC-dashboardet.

### 3. Byg Zap'en fra connect-kort til B1

Dette er den mest almindelige retning. Connect-kort, der sendes fra TIC, bliver automatisk til nye personer i B1.

1. **Udløser** — Text In Church: Connect Card Submitted.
2. **Handling** — B1.church: Find Person (by email).
3. **Sti** — forgren efter fundet / ikke fundet:
   - Ikke fundet → B1.church: Create Person.
   - Fundet → fortsæt.
4. **Handling** — B1.church: Add Group Member til en gruppe kaldet "New Contact".

Slå Zap'en til. Det næste connect-kort, der indsendes via TIC, havner automatisk under **B1Admin → People**.

## Almindelige opskrifter

### Udløs en connect-kort-lignende workflow fra en B1-formular

- **Udløser** — B1.church: New Form Submission (filtrer på formular-id'et "I'm new here")
- **Handling** — Text In Church: Create/Update Person, med mapping af formularens svar for e-mail, telefon og navn
- **Handling** — Text In Church: Add to Group, hvor gruppen har en forudbygget velkomst-workflow knyttet til sig

### Spejl gruppemedlemskab

- **Udløser** — B1.church: New Group Member, filtreret på en bestemt `groupId`
- **Handling** — Text In Church: Add to Group (samme person, spejlgruppe). Kombiner med en `group.member.removed`-Zap, hvis du vil have fuld synkronisering.

### Send besked til en leder, når nogen tilmelder sig

- **Udløser** — B1.church: New Group Member
- **Handling** — Text In Church: Send Text Message, modtager = gruppelederens telefonnummer, tekst = `"{first} {last} er lige blevet medlem af {group}"`.

## Begrænsninger og noter

- **TIC's Zapier-app kræver et bestemt abonnementsniveau.** Hvis Zapier-integrationen er nedtonet i TIC-dashboardet, skal du kontakte TIC support for at få den aktiveret på dit abonnement.
- **Gruppe-id'er er TIC's, ikke B1's.** Når du spejler grupper, skal du vedligeholde en mappingtabel et sted (enten en Zapier *Lookup Table* eller hårdkodet pr. Zap).
- **Send Text Message koster kreditter.** Hver Zap, der udfører *Send Text*, bruger fra din SMS-kvote i TIC.

## Fejlfinding

- **Connect Card-udløseren aktiveres ikke** — TIC kræver, at Zapier-integrationen er slået til. Kontrollér også, at formularen, du testede med, er konfigureret som "Connect Card" og ikke som en almindelig spørgeundersøgelse.
- **Create Person i B1 fejler med 401** — API-nøglen er forkert, tilbagekaldt eller mangler `people:write`. Opret en ny nøgle.
- **Dubletter af personer i B1** — TIC sender både *Person Created* og *Connect Card Submitted* for samme hændelse. Vælg den ene som din kilde til sandhed, og tilføj et Zapier Filter på den anden.

## Se også

- [Clearstream](./clearstream) — alternativ SMS-platform med lignende Zapier-opbygning
- [Zapier (overblik)](../zapier) — B1-siden af alle Zapier-opskrifter
- [Text In Church Zapier-vejledning](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC's dokumentation)
