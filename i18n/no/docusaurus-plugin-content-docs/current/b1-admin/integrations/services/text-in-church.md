---
title: "Text In Church"
description: "Koble B1 Admin og Text In Church sammen med Zapier: lag en API-nøkkel, bygg en Zap fra connect-kort til B1, og speil gruppemedlemskap."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) samler SMS, dryppkampanjer (drip) og automatiseringer for connect-kort. Zapier-appen dekker begge retninger. Du kan sende B1-hendelser inn i en Text In Church-arbeidsflyt, og hente utløsere for connect-kort eller nye kontakter ut den andre veien og inn i B1.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Text In Church](https://textinchurch.com)-konto på et abonnement som inkluderer Zapier-integrasjonen
- En [Zapier](https://zapier.com)-konto
- En B1 Admin-bruker med tillatelsen **Rediger innstillinger**

</div>

## Hva du kan koble sammen {#what-you-can-wire-up}

| Retning | Utløser | Handling |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Opprett/oppdater person + Legg til i gruppe |
| B1 → Text In Church | B1 `form.submission.created` | Send tekstmelding via det relevante teamet |
| B1 → Text In Church | B1 `group.member.added` | Legg til i gruppe (speil gruppemedlemskap) |
| Text In Church → B1 | Connect-kort innsendt | B1: Opprett person + Legg til gruppemedlem |
| Text In Church → B1 | Person opprettet | B1: Opprett person |
| Text In Church → B1 | Person ble med i gruppe | B1: Legg til gruppemedlem |

Handlingene i Text In Church omfatter også *Send tekstmelding*, *Send talebroadcast*, *Opprett oppgave*, *Finn person/gruppe*, og å legge til og fjerne gruppemedlemskap.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-mint-a-b1-api-key}

**Innstillinger → Utvikler → API-nøkler → Ny API-nøkkel**:

- `settings:write`: kreves for å koble nøkkelen til Zapier, og for Zapene som utløses av B1
- `people:read`, `people:write`: for å finne eller opprette personen
- `groups:write`: for synkronisering av grupper
- (Valgfritt) `donations:write` hvis du kobler gavebekreftelser til TIC

### 2. Koble Text In Church til Zapier {#2-connect-text-in-church-to-zapier}

Følg [Text In Churchs veiledning for Zapier-integrasjon](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). De lager et API-token inne i TIC-dashbordet.

### 3. Bygg Zapen fra connect-kort til B1 {#3-build-the-connect-card-to-b1-zap}

Dette er den vanligste retningen. Connect-kort sendt fra TIC blir automatisk nye B1-personer.

1. **Utløser**: Text In Church: Connect-kort innsendt.
2. **Handling**: B1.church: Finn person (etter e-post).
3. **Handling**: B1.church: Legg til gruppemedlem i gruppen «Ny kontakt», med personens ID fra steg 2.

B1s *Finn person* stopper Zapen med feilen «No person found» når ingen samsvarer, så en Path kan ikke forgrene seg på det. For nye kontakter slår du på Zapiers feilhåndtering for steget Finn person, og kjører B1.church: Opprett person og deretter Legg til gruppemedlem i feilbanen.

Slå på Zapen. Neste connect-kort som sendes inn gjennom TIC havner automatisk i **B1 Admin → Personer**.

## Vanlige oppskrifter {#common-recipes}

### Utløs en connect-kort-lignende arbeidsflyt fra et B1-skjema {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Utløser**: B1.church: Ny skjemainnsending (filtrer på ID-en til skjemaet «Jeg er ny her»)
- **Handling**: Text In Church: Opprett/oppdater person, og map e-post-, telefon- og navnesvarene fra skjemaet
- **Handling**: Text In Church: Legg til i gruppe, der gruppen har en ferdig velkomstarbeidsflyt knyttet til seg

### Speil gruppemedlemskap {#mirror-group-membership}

- **Utløser**: B1.church: Nytt gruppemedlem, filtrert på en bestemt `groupId`
- **Handling**: Text In Church: Legg til i gruppe (samme person, speilgruppe). Kombiner med en Zap for `group.member.removed` hvis du vil ha full synkronisering.

### Varsle en leder når noen blir med {#page-a-leader-when-someone-joins}

- **Utløser**: B1.church: Nytt gruppemedlem
- **Handling**: Text In Church: Send tekstmelding, mottaker = gruppelederens telefon, innhold = `"{first} {last} just joined {group}"`.

## Begrensninger og merknader {#limits--notes}

- **TICs Zapier-app er knyttet til abonnementsnivå.** Hvis Zapier-integrasjonen er nedtonet i TIC-dashbordet, kontakt TIC-støtte for å aktivere den på abonnementet ditt.
- **Gruppe-ID-er er TICs, ikke B1s.** Ved speiling må du vedlikeholde en koblingstabell et sted (en Zapier *Lookup Table*, eller hardkodet per Zap).
- **Send tekstmelding koster kreditter.** Hver Zap som utløser *Send tekst* bruker av SMS-kvoten din i TIC.

## Feilsøking {#troubleshooting}

- **Connect-kort-utløseren starter ikke**: TIC må ha Zapier-integrasjonen slått på. Kontroller også at skjemaet du testet med er satt opp som et «Connect-kort», ikke en vanlig undersøkelse.
- **Opprett person i B1 mislykkes med 401**: API-nøkkelen er feil, trukket tilbake, eller mangler `people:write`. Lag en ny.
- **Dupliserte B1-personer**: TIC sender både *Person opprettet* og *Connect-kort innsendt* for samme hendelse. Velg én som hovedkilde, og legg til et Zapier-filter på den andre.

## Se også {#see-also}

- [Clearstream](./clearstream.md): alternativ SMS-plattform med lignende Zapier-oppsett
- [Zapier (oversikt)](../zapier.md): B1-delen av hver Zapier-oppskrift
- [Text In Church Zapier-veiledning](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TICs dokumentasjon)
