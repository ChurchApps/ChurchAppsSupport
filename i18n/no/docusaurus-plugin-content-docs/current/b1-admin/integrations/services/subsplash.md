---
title: "Subsplash"
description: "Koble Subsplash-gaver, nye personer og skjemasvar til B1 med Zapier, slik at gaver og profiler havner i B1 Admin automatisk."
---

# Subsplash

<div class="article-intro">

Hvis du bruker Subsplash til kirkeappen, gaver eller skjemaer, men vil ha B1 som hovedregister for personer og gaver, kan Subsplashs Zapier-app sende gaver, nye profiler og skjemasvar til B1 i sanntid. Merk at Subsplashs Zapier-app for øyeblikket bare har **utløsere**. Koblingen går derfor bare én vei (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En Subsplash-konto på et abonnement som inkluderer **API + Zapier**-tilgang (spør din Subsplash Client Success Manager. Dette er knyttet til abonnementsnivå)
- En [Zapier](https://zapier.com)-konto
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen {#what-you-can-wire-up}

Alle utløserne under er fra Subsplash. Handlingene er fra B1.

| Subsplash-utløser | B1-handling |
|---|---|
| Ny gave | Finn person → Legg til gave (Opprett person hvis den mangler) |
| Nytt løfte | Legg til gave (med `notes` = «Pledge: …») |
| Ny person opprettet | Opprett person |
| Person oppdaterte profil | (ingen direkte B1-handling. Logg til et Google-regneark for manuell gjennomgang) |
| Nytt skjemasvar | Opprett person + (valgfritt) Legg til gruppemedlem basert på skjemaet |

Subsplash → B1 er den eneste retningen Subsplashs app støtter akkurat nå.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-mint-a-b1-api-key}

I B1 Admin: **Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**. Omfang:

- `people:read`: for å slå opp giveren etter e-post
- `people:write`: for å opprette dem hvis de ikke finnes
- `donations:write`: for å registrere gaven
- `settings:write`: Zapier sjekker hver B1-nøkkel mot B1s webhook-liste når du kobler den til. Tilkoblingen mislykkes uten dette, selv om det er Subsplash, ikke B1, som eier utløseren her

### 2. Koble Subsplash til Zapier {#2-connect-subsplash-to-zapier}

Følg [Subsplashs veiledning for Zapier-integrasjon](https://support.subsplash.com/en/articles/9825926-zapier-integration). De utsteder et API-token fra Subsplash-dashbordet, som Zapier bruker til å autentisere utløsersiden.

### 3. Bygg Zapen «registrer en gave» {#3-build-the-record-a-donation-zap}

1. **Utløser**: Subsplash: Ny gave
2. **Handling**: B1.church: Finn person (etter e-post)
3. **Handling**: B1.church: Legg til gave, med personens ID fra steg 2. Map beløp, dato, fond, metode = «Online», notes = Subsplash-transaksjons-ID-en.

B1s *Finn person* stopper Zapen med feilen «No person found» når ingen samsvarer. Et filter- eller Path-steg kan derfor ikke forgrene seg på det. For å håndtere førstegangsgivere slår du på Zapiers feilhåndtering for steget Finn person, og i feilbanen kjører du B1.church: Opprett person → B1.church: Legg til gave (med den nyopprettede personens ID).

Slå på Zapen. Fremtidige Subsplash-gaver havner i **B1 Admin → Gaver** i løpet av sekunder.

## Vanlige oppskrifter {#common-recipes}

### Send en takk når en førstegangsgave kommer inn {#send-a-thank-you-when-a-first-time-gift-lands}

- **Utløser**: Subsplash: Ny gave
- **Handling**: Filter by Zapier: fortsett bare hvis det er giverens første gave (bruk en *Lookup Table* på giverens e-post mot et Google-regneark med tidligere givere, eller et Zapier-steg *Paths* på giverens opprettelsesdato)
- **Handling**: Mailchimp / SMTP / SendGrid: send takkemelding for første gave
- **Handling**: B1.church: Legg til gave (som vanlig)

### Hold løfter utenfor den vanlige giveflyten {#filter-pledges-off-the-regular-giving-flow}

- **Utløser**: Subsplash: Nytt løfte
- **Handling**: B1.church: Legg til gave med `notes = "Pledge — Subsplash"` og et fond som heter `Pledges` (separat fra driftsfondet ditt), slik at du kan rapportere om løfter hver for seg i **B1 Admin → Gaver → Oppsummering**.

### Synkroniser nye appbrukere som B1-personer {#sync-new-app-users-as-b1-people}

- **Utløser**: Subsplash: Ny person opprettet
- **Handling**: B1.church: Opprett person, med navn, e-post og telefon. Merk i B1 ved å legge den nye personen til i en gruppe som «Subsplash-appbrukere».

## Begrensninger og merknader {#limits--notes}

- **Subsplashs Zapier-app har bare utløsere.** Hvis du vil ha endringer på B1-siden (f.eks. at en ny B1-person også skal havne i Subsplash), må du bygge den broen fra B1s Zapier-utløsere som kaller Subsplashs REST-API via en egen handling *Webhooks by Zapier: POST*. Det er en egen integrasjon, ikke en oppskrift.
- **API-tilgang er knyttet til abonnementet.** Hvis Zapier-tilkoblingen mislykkes med `403 Forbidden`, inkluderer sannsynligvis ikke Subsplash-abonnementet ditt API-tilgang. Kontakt din Client Success Manager.
- **Fondkoblingen gjøres manuelt.** Subsplash sender et kampanje- eller kategorinavn, mens B1 trenger et av sine egne fond. Velg fondet fra nedtrekksmenyen **Fond** i steget Legg til gave, eller vedlikehold en Zapier *Lookup Table* som kobler Subsplash-kampanjer til B1-fond.

## Feilsøking {#troubleshooting}

- **Ingen utløser starter etter en gave**: sjekk i Subsplashs Zapier-dashbord at tilkoblingen fortsatt viser *Connected*. Hvis API-tokenet er byttet ut på Subsplash-siden, stopper Zapen stille. Koble til på nytt.
- **B1 *Legg til gave* registrerer gaven uten fond**: feltet **Fond** var tomt, eller var koblet til en verdi som ikke er en B1-fond-ID. Velg fondet fra nedtrekksmenyen **Fond** i steget (den viser fondene under **Gaver → Fond** i B1 Admin), eller koble en Lookup Table som gir B1-fond-ID-er.
- **Første gave utløser to ganger**: Subsplash sender av og til en utløser på nytt hvis Zapier ikke fikk bekreftelsen. Legg til et *Filter by Zapier* på gave-ID-en (Subsplash sender en i nyttelasten) for å fjerne duplikater.

## Se også {#see-also}

- [Donorbox](./donorbox.md): samme oppskriftsform, en annen gaveplattform
- [Zapier (oversikt)](../zapier.md): B1-delen av hver Zapier-oppskrift
- [Subsplashs veiledning for Zapier-integrasjon](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashs dokumentasjon)
