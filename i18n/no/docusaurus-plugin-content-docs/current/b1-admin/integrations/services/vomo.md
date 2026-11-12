---
title: "VOMO"
description: "Koble VOMO-påmeldinger av frivillige og innsjekkinger ved kiosken til personer og grupper i B1 Admin med Zapier, med API-nøkkelomfang og oppsettstegene."
---

# VOMO

<div class="article-intro">

VOMO er en plattform for engasjement av frivillige. Folk melder seg på prosjekter, sjekker seg inn ved kiosken og samler timer. Hvis du bruker VOMO til planlegging av frivillige, men B1 til personregistrene, kan Zapier synkronisere medlemskap og innsjekkinger mellom dem, slik at ingen av sidene kommer ut av synk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [VOMO](https://vomo.org)-konto på et abonnement som gir tilgang til Zapier (spør VOMO-støtten hvis du er usikker)
- En [Zapier](https://zapier.com)-konto
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen {#what-you-can-wire-up}

VOMOs Zapier-app har fire øyeblikkelige utløsere og fire handlinger. Oppskriftene de fleste kirker ønsker seg:

| Retning | Utløser | Handling |
|---|---|---|
| VOMO → B1 | VOMO-medlemskap (opprettet) | B1: Finn person → Opprett person (hvis ny) |
| VOMO → B1 | VOMO-innsjekking ved kiosk | B1: Legg til gruppemedlem i gruppen «Tjener nå», eller registrer som oppmøte |
| B1 → VOMO | B1 `person.created` | VOMO: Finn organisator (etter e-post); ellers egendefinert steg |
| Begge | VOMO-deltakelse (påmeldinger) | B1: Legg til gruppemedlem i prosjektspesifikk gruppe |

VOMO-handlingene er begrenset til å **utarbeide prosjekter** og **finne** eksisterende organisatorer og prosjekter. Det finnes ingen handling for å legge en person til i et VOMO-prosjekt i dag. Det interessante oppsettet går i hovedsak fra VOMO → B1.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-mint-a-b1-api-key}

**Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**. Omfang:

- `settings:write`: Zapier sjekker hver B1-nøkkel mot B1s webhook-liste når du kobler den til. Tilkoblingen mislykkes uten dette
- `people:read`, `people:write`: for å slå opp og opprette frivillige som B1-personer
- `groups:write`: for å legge dem til i tjenesteteam-grupper
- (Valgfritt) `attendance:write` hvis du behandler innsjekkinger ved kiosken som oppmøte

### 2. Bygg Zapen for medlemskapssynkronisering {#2-build-the-membership-sync-zap}

1. **Utløser**: VOMO: Medlemskap (hendelse = `created`).
2. **Handling**: B1.church: Finn person, med treff på e-post.
3. **Handling**: B1.church: Legg til gruppemedlem, og legg til personen fra steg 2 i den riktige frivillig-gruppen.

   B1s *Finn person* stopper Zapen med feilen «No person found» når ingen samsvarer. For frivillige som ikke finnes i B1 ennå, slår du på Zapiers feilhåndtering for steget Finn person, og kjører B1.church: Opprett person og deretter Legg til gruppemedlem i feilbanen.
4. Slå på. Nye VOMO-frivillige vises nå i B1 med riktig gruppemedlemskap.

### 3. (Valgfritt) Bygg Zapen for innsjekking ved kiosk {#3-optional-build-the-kiosk-check-in-zap}

1. **Utløser**: VOMO: Kiosk
2. **Handling**: B1.church: Finn person (etter e-post)
3. **Handling**: ditt valg:
   - *Hvis du behandler det som oppmøte*: Webhooks by Zapier POST til B1s endepunkt `/attendance/visits` (B1s Zapier-app har ennå ingen førsteklasses handling *Registrer oppmøte*). B1-[API-nøkkelen](/docs/developer/api/api-keys) legges i headeren `Authorization: Bearer cak_…`.
   - *Hvis du behandler det som gruppemedlemskap*: B1.church: Legg til gruppemedlem med gruppen «Tjener nå (i dag)», og en andre Zap senere samme dag fjerner dem via en planlagt opprydding.

## Vanlige oppskrifter {#common-recipes}

### Synkronisering av gruppe per prosjekt {#per-project-group-sync}

- **Utløser**: VOMO: Deltakelse (opprettet)
- **Handling**: Filter by Zapier på prosjekt-ID, deretter
- **Handling**: B1.church: Legg til gruppemedlem i en B1-gruppe som speiler VOMO-prosjektets navn.

Når VOMO-prosjektet er avsluttet, tøm B1-gruppen manuelt (eller kombiner dette med en utløser for *Deltakelse slettet* som fjerner dem).

### Send en «takk for påmeldingen»-tekst via SMS {#send-a-thanks-for-signing-up-text-via-sms}

Kjed VOMO-deltakelse → Clearstream Send tekst eller Text In Church Send melding i samme Zap. Begge har førsteklasses Zapier-handlinger. Se [Clearstream](./clearstream.md) og [Text In Church](./text-in-church.md).

### Oppdag frafall {#detect-drop-off}

Kjør en daglig Zapier-utløser *Schedule* som kaller Finn organisator i VOMO for en liste over B1-personer som ble med i tjenesteteamet denne måneden. Hvis VOMO svarer «not found», har de ikke aktivert VOMO, og de trenger en påminnelse.

## Begrensninger og merknader {#limits--notes}

- **E-post er koblingsnøkkelen.** VOMOs nyttelaster inneholder en brukers e-post, men ingen B1-person-ID. Givere som bruker forskjellige e-poster i hvert system, vil opprette duplikater.
- **Ingen handling «Legg til i prosjekt» i VOMOs Zapier-app i dag.** Hvis du trenger påmelding fra B1 → VOMO-prosjekt, må du sende POST til VOMOs REST-API fra et *Webhooks by Zapier*-steg. Det er en egen integrasjon.
- **VOMOs gratis- eller lavere nivåer inkluderer kanskje ikke Zapier.** Bekreft med VOMO-støtten før du lover en dato for koblingen.

## Feilsøking {#troubleshooting}

- **Utløseren starter aldri**: VOMOs øyeblikkelige utløsere krever at API-tokenet forblir gyldig. Test Zapen på nytt, og koble til VOMO på nytt hvis tokenet er byttet ut.
- **B1 *Legg til gruppemedlem* mislykkes**: gruppen i handlingen finnes ikke lenger. Velg gruppen på nytt fra nedtrekksmenyen **Gruppe** i steget, eller åpne gruppen i B1 Admin (**Personer > Grupper**) og kopier ID-en fra slutten av nettadressen.
- **Dupliserte B1-personer fra én VOMO-frivillig**: de har sannsynligvis meldt seg på med en annen e-post enn den de allerede hadde i B1. Enten standardiser e-postadressene, eller legg til en Zapier *Path* som også søker etter telefon før den oppretter.

## Se også {#see-also}

- [Zapier (oversikt)](../zapier.md): B1-delen av hver Zapier-oppskrift
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): kombiner påmeldinger av frivillige med SMS-bekreftelser
- [Webhooks (referanse for utviklere)](/docs/developer/api/webhooks): hendelsene VOMO kan utløses av
