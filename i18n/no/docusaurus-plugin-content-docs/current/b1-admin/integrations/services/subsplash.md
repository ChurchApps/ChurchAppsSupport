---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Hvis du bruker Subsplash for kirkaappen, giver, eller skjemaer din men vil B1 som systemposten for mennesker og donasjoner, kan Subsplashs Zapier-app pipe donasjoner, nye profiler og skjemaresponser til B1 i sanntid. Merk at Subsplashs Zapier-app for øyeblikket er **bare utløsere** — ledelsen er enveis (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En Subsplash-konto på en plan som inkluderer **API + Zapier**-tilgang (sjekk med Subsplash-klientsuksessleder — disse gate bak planlag)
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan lede opp

Alle utløsere nedenfor er Subsplashs. Handlingene er B1s.

| Subsplash utløser | B1 handling |
|---|---|
| Ny donasjon | Finn person → legg til donasjon (opprett person hvis manglende) |
| Ny løfte | Legg til donasjon (med `merknader` = "løfte: …") |
| Ny person opprettet | Opprett person |
| Person oppdatert profil | (ingen direkte B1-handling — log til et Google Sheet for manuell gjennomgang) |
| Ny skjemarespons | opprett person + (valgfritt) legg gruppemedalem basert på skjemaet |

Subsplash → B1 er den eneste retningen Subsplashs app støtter akkurat nå.

## Oppsett

### 1. Lag en B1 API-nøkkel

I B1Admin: **Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**. Scoper:

- `people:read` — for å slå opp donoren etter e-post
- `people:write` — for å opprette dem hvis de ikke eksisterer
- `donations:write` — for å registrere gaven
- (Ingen `settings:write` nødvendig — Subsplash, ikke B1, eier utløseren her.)

### 2. Koble Subsplash til Zapier

Følg [Subsplashs Zapier-integrasjonsguide](https://support.subsplash.com/en/articles/9825926-zapier-integration). De utsteder en API-token fra innvendig Subsplash-dashbordet som Zapier bruker til å godkjenne utløsersiden.

### 3. Bygg "registrer en donasjon" Zap

1. **Utløser** — Subsplash: ny donasjon
2. **Handling** — B1.church: Finn person (etter e-post)
3. **Filter / path** — branch på "person funnet":
   - **funnet:** B1.church: legg til donasjon. Map beløp, dato, fond, metode = "Online", merknader = Subsplash transaksjon-id.
   - **ikke funnet:** B1.church: opprett person → B1.church: legg til donasjon (ved hjelp av den nyopprettede personens id).

Slå Zap-en på. Fremtidlige Subsplash-donasjoner flyter til **B1Admin → donasjoner** innen sekunder.

## Vanlige oppskrifter

### Send takk når en første-gave lander

- **Utløser** — Subsplash: ny donasjon
- **Handling** — Filter av Zapier: fortsett bare hvis det er donorens første gave (bruk et *oppslag-bord* på donor-e-post mot et Google Sheet med tidligere givere, eller et Zapier *paths*-trinn på donoren opprettet dato)
- **Handling** — Mailchimp / SMTP / SendGrid: send første-gave takk-melding
- **Handling** — B1.church: legg til donasjon (som vanlig)

### Filter løfter av normal giver-flyt

- **Utløser** — Subsplash: ny løfte
- **Handling** — B1.church: legg til donasjon med `merknader = "løfte — Subsplash"` og et fond kalt `løfter` (separat fra ditt driftsfond) slik at du kan rapportere løfter uavhengig i **B1Admin → donasjoner → rapporter**.

### Synkroniser nye app-brukere som B1-mennesker

- **Utløser** — Subsplash: ny person opprettet
- **Handling** — B1.church: opprett person, fylle navn, e-post, telefon. Tag i B1 ved å legge den nye personen til en gruppe som "Subsplash app-brukere".

## Grenser og merknader

- **Subsplashs Zapier-app er bare utløsere.** Hvis du vil B1-sidendringer (f.eks. en ny B1-person til lande i Subsplash også), må du bygge den broen fra B1s Zapier-app-utløsere som ringer Subsplashs REST API via en tilpasset *webhooks av Zapier — POST*-handling. Det er en tilpasset integrasjon, ikke en oppskrift.
- **API-tilgang er plan-gate.** Hvis Zapier-forbindelse mislykkes med `403 forbudt`, er Subsplash-planen din sannsynligvis ikke inkludert API-tilgang — kontakt klientsuksessleder.
- **Fond-kartlegging er manuell.** Subsplash sender et kampanje- eller kategorinavn; B1 trenger en numerisk fond-id. Enten hardkode fondet i Zap eller oppretthold et Zapier *oppslag-bord* kartlegging Subsplash-kampanjer til B1-fonder.

## Problemløsing

- **Ingen utløser avfyres etter donasjon** — bekreft i Subsplashs Zapier-dashbord at forbindelsen fortsatt viser *tilkoblet*. Hvis API-tokenet ble rotert på Subsplash-siden, stopper Zap stille; gjen-koble.
- **B1 *legg til donasjon* mislykkes med 422** — oftest en manglende eller ukjent `fundId`. List dine fonder via **B1Admin → donasjoner → fonder** og kopier den nøyaktige ID-en til Zap-trinnet.
- **Første gave utløser to ganger** — Subsplash re-leverer noen ganger en utløser hvis Zapier miste sin kvittering. Legg til et *filter av Zapier* på donasjon-id-en (Subsplash sender en i nyttelast) for å slippe duplikater.

## Se også

- [Donorbox](./donorbox) — samme oppskriftsform, annen donasjon-plattform
- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Subsplash Zapier-integrasjonsguide](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashs docs)
