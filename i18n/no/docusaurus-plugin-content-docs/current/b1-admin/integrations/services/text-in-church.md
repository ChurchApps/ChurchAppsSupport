---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) pakker SMS pluss drypp-arbeidsflyter og connect-card-automatiseringer. Dens Zapier-app viser begge retninger — pipe B1-hendelser inn i en Text In Church-arbeidsflyt, og trekk connect-card eller ny-kontakt-utløsere ut den andre siden til B1.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Text In Church](https://textinchurch.com)-konto på en plan som inkluderer Zapier-integrasjonen
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan lede opp

| Retning | Utløser | Handling |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Opprett/oppdater person + legg til gruppe |
| B1 → Text In Church | B1 `form.submission.created` | Send tekstmelding via relevante lag |
| B1 → Text In Church | B1 `group.member.added` | legg til gruppe (speil gruppemedalemskap) |
| Text In Church → B1 | Connect Card sendt | B1: opprett person + legg gruppemedalem |
| Text In Church → B1 | Person opprettet | B1: opprett person |
| Text In Church → B1 | Person tilsluttet gruppe | B1: legg gruppemedalem |

Text In Church-handlinger inkluderer også *send tekstmelding*, *send stemmesending*, *opprett oppgave*, *Finn person/gruppe*, og gruppemedalemskap add/remove.

## Oppsett

### 1. Lag en B1 API-nøkkel

**Innstillinger → Utviklernavn → API-nøkler → Ny API-nøkkel**:

- `settings:write` — påkrevd for B1-utløst Zapier
- `people:read`, `people:write` — for å finne eller opprette personen
- `groups:write` — for gruppesykronisering
- (Valgfritt) `donations:write` hvis du leder gave-bekrefter til TIC

### 2. Koble Text In Church til Zapier

Følg [Text In Churchs Zapier-integrasjonsguide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). De genererer en API-token fra innvendig TIC-dashbordet.

### 3. Bygg connect-card-to-B1-Zap

Den mest vanlige retningen. Connect kort avfyrt fra TIC blir nye B1-mennesker automatisk.

1. **Utløser** — Text In Church: Connect card sendt.
2. **Handling** — B1.church: Finn person (etter e-post).
3. **path** — branch på funnet / ikke funnet:
   - Ikke funnet → B1.church: opprett person.
   - Funnet → fortsett.
4. **Handling** — B1.church: legg gruppemedalem til en "ny kontakt"-gruppe.

Slå Zap-en på. Det neste connect-kort sendt gjennom TIC lander i **B1Admin → mennesker** automatisk.

## Vanlige oppskrifter

### Utløs en connect-card-stil arbeitsflyt fra et B1-skjema

- **Utløser** — B1.church: ny skjemainnsending (filter på "Jeg er ny her"-skjema-id)
- **Handling** — Text In Church: opprett/oppdater person, kartlegging av skjemaets e-post / telefon / navn-svar
- **Handling** — Text In Church: legg til gruppe, hvor gruppen har en forhåndsbygget velkomst-arbeitsflyt vedlagt

### Speil gruppemedalemskap

- **Utløser** — B1.church: nytt gruppemedalem, filtrert på en spesifikk `groupId`
- **Handling** — Text In Church: legg til gruppe (samme person, speil-gruppe). Pair med en `group.member.removed`-Zap hvis du vil full sync.

### Page en leder når noen slutter seg til

- **Utløser** — B1.church: nytt gruppemedalem
- **Handling** — Text In Church: send tekstmelding, mottaker = gruppelederleder telefon, kropp = `"{first} {last} bare sluttet seg til {group}"`.

## Grenser og merknader

- **TICs Zapier-app gate bak planlag.** Hvis Zapier-integrasjonen er gråt i TIC-dashbordet, kontakt TIC-support for å aktivere det på planen din.
- **Gruppe-ID-er er TICs, ikke B1s.** Ved speilingen, vil du opprettholde et kartleggingsbord noe sted (et Zapier *oppslag-bord*, eller hardkodet per-Zap).
- **send tekstmelding-kostnader kreditter.** Hver Zap som avfyrer *send tekst* forbruker fra TIC SMS-godtgjørelsen din.

## Problemløsing

- **Connect-card utløser avfyres ikke** — TIC trenger Zapier-integrasjons-toggle på. Bekreft også at skjemaet du testet med er konfigurert som et "connect-kort", ikke en generisk undersøkelse.
- **opprett person i B1 mislykkes med 401** — API-nøkkelen er feil, tilbakekalt, eller mangler `people:write`. Re-mint.
- **duplikat B1-mennesker** — TIC sender både *person opprettet* og *connect-card sendt* for samme hendelse. Velg en som din sannhetskilde og legg ett Zapier-filter på den andre.

## Se også

- [Clearstream](./clearstream) — alternativ SMS-plattform med lignende Zapier-form
- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift
- [Text In Church Zapier-guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TICs docs)
