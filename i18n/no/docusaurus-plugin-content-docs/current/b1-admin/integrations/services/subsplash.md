---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Hvis du bruker Subsplash for kirkeappen din, gaver eller skjemaer, men vil ha B1 som hovedregister for personer og gaver, kan Subsplashs Zapier-app sende gaver, nye profiler og skjemasvar inn i B1 i sanntid. Merk at Subsplashs Zapier-app for øyeblikket er **kun utløsere** — koblingen går bare én vei (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En Subsplash-konto på et abonnement som inkluderer **API + Zapier**-tilgang (spør Subsplashs kundeansvarlige — dette er låst til abonnementsnivå)
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruker med tillatelsen **Edit Settings**

</div>

## Hva du kan koble opp

Alle utløserne under er Subsplashs. Handlingene er B1s.

| Subsplash-utløser | B1-handling |
|---|---|
| Ny gave | Finn person → Legg til gave (Opprett person hvis den mangler) |
| Ny løfte | Legg til gave (med `notes` = «Pledge: …») |
| Ny person opprettet | Opprett person |
| Person oppdaterte profil | (ingen direkte B1-handling — logg til et Google-regneark for manuell gjennomgang) |
| Nytt skjemasvar | Opprett person + (valgfritt) Legg til gruppemedlem basert på skjemaet |

Subsplash → B1 er den eneste retningen Subsplashs app støtter akkurat nå.

## Oppsett

### 1. Lag en B1 API-nøkkel

I B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read` — for å slå opp giveren på e-post
- `people:write` — for å opprette vedkommende hvis de ikke finnes
- `donations:write` — for å registrere gaven
- (Ikke nødvendig med `settings:write` — Subsplash, ikke B1, eier utløseren her.)

### 2. Koble Subsplash til Zapier

Følg [Subsplashs veiledning for Zapier-integrasjon](https://support.subsplash.com/en/articles/9825926-zapier-integration). De utsteder et API-token fra Subsplash-dashbordet, som Zapier bruker for å autentisere utløsersiden.

### 3. Bygg Zap-en «registrer en gave»

1. **Utløser** — Subsplash: Ny gave
2. **Handling** — B1.church: Finn person (på e-post)
3. **Filter / Sti** — forgren på «person funnet»:
   - **Funnet:** B1.church: Legg til gave. Map beløp, dato, fond, metode = «Online», og notes = Subsplash-transaksjons-ID.
   - **Ikke funnet:** B1.church: Opprett person → B1.church: Legg til gave (med den nyopprettede personens ID).

Slå på Zap-en. Fremtidige gaver fra Subsplash flyter inn under **B1Admin → Donations** i løpet av sekunder.

## Vanlige oppskrifter

### Send en takk når en førstegangsgave kommer inn

- **Utløser** — Subsplash: Ny gave
- **Handling** — Filter i Zapier: fortsett kun hvis det er giverens første gave (bruk en *Lookup Table* på giverens e-post mot et Google-regneark med tidligere givere, eller et Zapier *Paths*-steg på giverens opprettelsesdato)
- **Handling** — Mailchimp / SMTP / SendGrid: send takkemelding for første gave
- **Handling** — B1.church: Legg til gave (som vanlig)

### Filtrer løfter bort fra den vanlige givingsflyten

- **Utløser** — Subsplash: Ny løfte
- **Handling** — B1.church: Legg til gave med `notes = "Pledge — Subsplash"` og et fond som heter `Pledges` (separat fra driftsfondet ditt), slik at du kan rapportere på løfter separat under **B1Admin → Donations → Summary**.

### Synkroniser nye appbrukere som B1-personer

- **Utløser** — Subsplash: Ny person opprettet
- **Handling** — B1.church: Opprett person, med fylte inn navn, e-post og telefon. Merk personen i B1 ved å legge dem til i en gruppe som «Subsplash App Users».

## Begrensninger og merknader

- **Subsplashs Zapier-app har kun utløsere.** Hvis du vil ha endringer på B1-siden (f.eks. at en ny B1-person også skal havne i Subsplash), må du bygge den broen fra B1s Zapier-app-utløsere som kaller Subsplashs REST-API via en egendefinert *Webhooks by Zapier — POST*-handling. Det er en egen integrasjon, ikke en oppskrift.
- **API-tilgang er låst til abonnement.** Hvis Zapier-tilkoblingen feiler med `403 Forbidden`, inkluderer sannsynligvis ikke Subsplash-abonnementet ditt API-tilgang — kontakt kundeansvarlig.
- **Kartlegging av fond gjøres manuelt.** Subsplash sender et kampanje- eller kategorinavn; B1 trenger en numerisk fond-ID. Enten hardkoder du fondet i Zap-en, eller du vedlikeholder en Zapier *Lookup Table* som kobler Subsplash-kampanjer til B1-fond.

## Feilsøking

- **Ingen utløser starter etter en gave** — bekreft i Subsplashs Zapier-dashbord at tilkoblingen fortsatt viser *Connected*. Hvis API-tokenet er rotert på Subsplash-siden, stopper Zap-en stille; koble til på nytt.
- **B1 *Add Donation* feiler med 422** — oftest mangler `fundId` eller er ukjent. List opp fondene dine under **B1Admin → Donations → Funds** og kopier den eksakte ID-en inn i Zap-steget.
- **Første gave utløses to ganger** — Subsplash sender noen ganger en utløser på nytt hvis Zapier ikke fikk bekreftelsen. Legg til et *Filter by Zapier* på gave-ID-en (Subsplash sender en med i nyttelasten) for å fjerne duplikater.

## Se også

- [Donorbox](./donorbox) — samme oppskriftsform, annen givingsplattform
- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Subsplashs veiledning for Zapier-integrasjon](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashs dokumentasjon)
