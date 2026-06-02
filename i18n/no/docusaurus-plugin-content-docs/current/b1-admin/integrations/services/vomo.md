---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO er en frivillig engasjementplattform — mennesker melder seg på prosjekter, sjekker inn ved kiosken, og akkumulerer timer. Hvis du bruker VOMO for frivillig planlegging men B1 for menneske-poster, kan Zapier synkronisere medlemskap og innsjekk mellom dem slik at ingen side driver.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [VOMO](https://vomo.org)-konto på en plan som viser Zapier (sjekk med VOMO-support hvis usikker)
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan lede opp

VOMs Zapier-app viser fire øyeblikkelige utløsere og fire handlinger. Oppskriftene de fleste kirker vil:

| Retning | Utløser | Handling |
|---|---|---|
| VOMO → B1 | VOMO medlemskap (opprettet) | B1: finn person → opprett person (hvis ny) |
| VOMO → B1 | VOMO kiosk insjekk | B1: legg gruppemedalem til "for øyeblikket servering"-gruppe, eller record som frammøte |
| B1 → VOMO | B1 `person.created` | VOMO: finn organisator (etter e-post); ellers tilpasset trinn |
| Enten | VOMO deltakelse (påmeldinger) | B1: legg gruppemedalem til prosjekt-spesifikk gruppe |

VOMO-handlingene er begrenset til **prosjekter for utkasting** og **finne** eksisterende organisatorer/prosjekter — der er ingen "legg denne personen til VOMO-prosjekt"-handling i dag. Den interessante ledelsen er mest VOMO → B1.

## Oppsett

### 1. Lag en B1 API-nøkkel

**Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**. Scoper:

- `people:read`, `people:write` — for å slå opp og opprette frivillige som B1-mennesker
- `groups:write` — for å legge dem til serving-team-grupper
- (Valgfritt) `attendance:write` hvis du behandler kiosk insjekk som frammøte

### 2. Bygg medlemskap-sync Zap

1. **Utløser** — VOMO: medlemskap (hendelse = `opprettet`).
2. **Handling** — B1.church: Finn person, matchet på e-post.
3. **Filter / path** — fork på funnet vs. ikke funnet:
   - Ikke funnet → B1.church: opprett person, deretter legg gruppemedalem til passende frivilliggruppe.
   - Funnet → B1.church: legg gruppemedalem direkte.
4. Slå på. Nye VOMO-frivillige vises nå i B1 med riktig gruppemedalemskap.

### 3. (Valgfritt) Bygg kiosk-insjekk Zap

1. **Utløser** — VOMO: kiosk
2. **Handling** — B1.church: Finn person (etter e-post)
3. **Handling** — ditt valg:
   - *Hvis behandlet som frammøte* — webhooks av Zapier POST til B1s `/attendance/visits`-endepunkt (B1s Zapier-app har ikke ennå en førsteklasses *recordframmøte*-handling). B1 [API-nøkkel](/docs/developer/api/api-keys) går i `authorization: bærer cak_…` overskrift.
   - *Hvis behandlet som gruppemedalemskap* — B1.church: legg gruppemedalem med en "for øyeblikket servering (i dag)"-gruppe, og et andre Zap senere på dagen fjerner dem via planlagt opprydding.

## Vanlige oppskrifter

### Per-prosjekt gruppesync

- **Utløser** — VOMO: deltakelse (opprettet)
- **Handling** — Filter av Zapier på prosjekt-id, deretter
- **Handling** — B1.church: legg gruppemedalem til en B1-gruppe hvis navn speilbildet VOMO-prosjekt.

Når VOMO-prosjektet slutter, manuelt klare B1-gruppen (eller pair det med en *deltakelse slettet* utløser som fjerner dem).

### Send en "takk for påmelding"-tekst via SMS

kjede VOMO deltakelse → clearstream send tekst eller text in church send melding i samme Zap. Begge har førsteklasses Zapier-handlinger — se [Clearstream](./clearstream) og [text in church](./text-in-church).

### oppdage drop-off

kjøre en daglig Zapier *tidsplan* utløser som ringer Finn organisator i VOMO for en liste av B1-mennesker som sluttet seg til serving-teamet denne måneden — hvis VOMO returnerer "ikke funnet", de aktiverte ikke VOMO og trenger en dytt.

## Grenser og merknader

- **e-post er sammenføyingsnøkkelen.** VOMs nyttelaster viser bruker-e-post men ingen B1-person-id. Givere som bruker ulike e-poster i hvert system oppretter duplikater.
- **Ingen "Legg til prosjekt"-handling i VOMs Zapier-app i dag.** Hvis du trenger B1 → VOMO-prosjektregistrering, vil du POST til VOMs REST API fra et *webhooks av Zapier*-trinn, noe som er en tilpasset integrasjon.
- **VOMs gratis / lavere nivåer kan ikke inkludere Zapier.** Bekreft med VOMO-support før du lover en ledelsesdato.

## Problemløsing

- **Utløseren avfyres aldri** — VOMs øyeblikkelige utløsere krever at API-tokenet forblir gyldig. Re-test Zap; gjen-koble VOMO hvis tokenet ble rotert.
- **B1 *legg gruppemedalem* mislykkes med 422** — gruppe-id-en i handlingen eksisterer ikke. Åpne **B1Admin → grupper**, klikk gruppe, og kopier ID-en i URL-en til Zap-trinnet.
- **duplikat B1-mennesker fra en enkelt VOMO-frivillig** — de meldte seg sannsynligvis opp under en annen e-post enn de allerede hadde i B1. Enten standardiser e-poster, eller legg til en Zapier *path* som også søker etter telefon før opprettelse.

## Se også

- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Clearstream](./clearstream), [text in church](./text-in-church) — pair frivillig-påmeldinger med SMS-bekreftelser
- [webhooks (utviklerreferanse)](/docs/developer/api/webhooks) — hendelsene VOMO kan utløse på
