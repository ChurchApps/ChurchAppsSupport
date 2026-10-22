---
title: "Subsplash"
---

# Subsplash {#subsplash}

<div class="article-intro">

Hvis du bruker Subsplash for kirkens app, giving eller skjemaer, men vil ha B1 som systemet for personer og gaver, kan Subsplashs Zapier-app sende gaver, nye profiler og skjemasvar inn i B1 i sanntid. Merk at Subsplashs Zapier-app for øyeblikket bare har **utløsere** -- koblingen går bare én vei (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En Subsplash-konto på en plan som inkluderer **API + Zapier**-tilgang (spør din Client Success Manager hos Subsplash -- dette er låst til plannivå)
- En [Zapier](https://zapier.com)-konto
- En bruker i B1Admin med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble opp {#what-you-can-wire-up}

Alle utløserne nedenfor er Subsplashs. Handlingene er B1s.

| Subsplash-utløser | B1-handling |
|---|---|
| Ny gave | Finn person → Legg til gave (Opprett person hvis den mangler) |
| Ny løfte | Legg til gave (med `notes` = «Løfte: …») |
| Ny person opprettet | Opprett person |
| Personprofil oppdatert | (ingen direkte B1-handling -- logg til et Google-ark for manuell gjennomgang) |
| Nytt skjemasvar | Opprett person + (eventuelt) Legg til gruppemedlem basert på skjemaet |

Subsplash → B1 er den eneste retningen Subsplashs app støtter akkurat nå.

## Oppsett {#setup}

### 1. Opprett en B1 API-nøkkel {#1-mint-a-b1-api-key}

I B1Admin: **Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**. Omfang:

- `people:read` — for å slå opp giveren med e-post
- `people:write` — for å opprette dem hvis de ikke finnes
- `donations:write` — for å registrere gaven
- (Ingen `settings:write` nødvendig -- Subsplash, ikke B1, eier utløseren her.)

### 2. Koble Subsplash til Zapier {#2-connect-subsplash-to-zapier}

Følg [Subsplashs integrasjonsguide for Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). De utsteder et API-token fra Subsplash-dashbordet, som Zapier bruker til å autentisere utløsersiden.

### 3. Bygg Zapen «registrer en gave» {#3-build-the-record-a-donation-zap}

1. **Utløser** — Subsplash: Ny gave
2. **Handling** — B1.church: Finn person (etter e-post)
3. **Filter / sti** — forgren på «person funnet»:
   - **Funnet:** B1.church: Legg til gave. Map beløp, dato, fond, metode = «Online», notes = Subsplash-transaksjons-ID.
   - **Ikke funnet:** B1.church: Opprett person → B1.church: Legg til gave (ved å bruke den nyopprettede personens ID).

Slå på Zapen. Fremtidige gaver fra Subsplash flyter inn under **B1Admin → Gaver** i løpet av sekunder.

## Vanlige oppskrifter {#common-recipes}

### Send en takk når en førstegangsgave kommer inn {#send-a-thank-you-when-a-first-time-gift-lands}

- **Utløser** — Subsplash: Ny gave
- **Handling** — Filter i Zapier: fortsett bare hvis det er giverens første gave (bruk en *oppslagstabell* på giverens e-post mot et Google-ark med tidligere givere, eller et Zapier *Paths*-steg på giverens opprettelsesdato)
- **Handling** — Mailchimp / SMTP / SendGrid: send takkemelding for første gave
- **Handling** — B1.church: Legg til gave (som vanlig)

### Filtrer løfter ut av den vanlige givingflyten {#filter-pledges-off-the-regular-giving-flow}

- **Utløser** — Subsplash: Nytt løfte
- **Handling** — B1.church: Legg til gave med `notes = "Løfte — Subsplash"` og et fond kalt `Løfter` (adskilt fra driftsfondet ditt), slik at du kan rapportere på løfter uavhengig i **B1Admin → Gaver → Sammendrag**.

### Synkroniser nye appbrukere som B1-personer {#sync-new-app-users-as-b1-people}

- **Utløser** — Subsplash: Ny person opprettet
- **Handling** — B1.church: Opprett person, med navn, e-post og telefon. Merk i B1 ved å legge den nye personen til en gruppe som «Subsplash-appbrukere».

## Begrensninger og merknader {#limits--notes}

- **Subsplashs Zapier-app er bare utløsere.** Hvis du vil ha endringer på B1-siden (f.eks. at en ny B1-person også skal havne i Subsplash), må du bygge den broen fra B1s Zapier-utløsere som kaller Subsplashs REST API via en egendefinert handling *Webhooks by Zapier — POST*. Det er en egendefinert integrasjon, ikke en oppskrift.
- **API-tilgang er låst til plan.** Hvis Zapier-tilkoblingen mislykkes med `403 Forbidden`, inkluderer sannsynligvis ikke Subsplash-planen din API-tilgang -- kontakt din Client Success Manager.
- **Fondsmapping gjøres manuelt.** Subsplash sender et kampanje- eller kategorinavn; B1 trenger en numerisk fond-ID. Enten hardkoder du fondet i Zapen, eller du vedlikeholder en *oppslagstabell* i Zapier som kobler Subsplash-kampanjer til B1-fond.

## Feilsøking {#troubleshooting}

- **Ingen utløser aktiveres etter en gave** — kontroller i Subsplashs Zapier-dashbord at tilkoblingen fortsatt viser *Connected*. Hvis API-tokenet ble rotert på Subsplash-siden, stopper Zapen stille; koble til på nytt.
- **B1 *Legg til gave* mislykkes med 422** — oftest mangler `fundId`, eller den er ukjent. List fondene dine under **B1Admin → Gaver → Fond** og kopier den nøyaktige ID-en inn i Zap-steget.
- **Første gave utløser to ganger** — Subsplash leverer noen ganger en utløser på nytt hvis Zapier gikk glipp av bekreftelsen. Legg til et *Filter by Zapier* på gave-ID-en (Subsplash sender en i nyttelasten) for å fjerne duplikater.

## Se også {#see-also}

- [Donorbox](./donorbox) — samme oppskriftsform, annen givingplattform
- [Zapier (oversikt)](../zapier) — B1-siden av alle Zapier-oppskrifter
- [Subsplashs integrasjonsguide for Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashs dokumentasjon)
