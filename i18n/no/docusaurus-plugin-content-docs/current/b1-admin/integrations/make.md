---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (tidligere Integromat) er en visuell arbeidsflytautomatiseringsplattform — lik i ånd til Zapier, med mer fleksibel logikk og en billigere regning i stor skala. Den offisielle B1.church Make-appen lar deg bygge "scenarioer" som reagerer øyeblikkelig på B1-hendelser og skriver poster tilbake til B1.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Make](https://www.make.com)-konto (det gratis nivået dekker små arbeidsflyter)
- En kirkeadministrator med tillatelsen **Rediger innstillinger** i B1Admin
- En grov idé om scenarioet du vil bygge

</div>

## Moduler

| Type | Hva | B1-hendelse / endepunkt |
|---|---|---|
| **Øyeblikkelig utløser** | Se hendelser | enhver abonnert B1-hendelse (`person.created`, `donation.created`, …) |
| **Handling** | Opprett person | legger til en ny person |
| **Handling** | Legg til donasjon | registrerer en donasjon |
| **Handling** | Legg til gruppemedalem | legger til en person i en gruppe |
| **Søk** | Søk mennesker | finner mennesker etter navn eller e-post |

Den øyeblikkelige utløseren lar deg velge hvilken hendelse du vil lytte til — en utløsermodul per scenario, konfigurert per hendelse.

## Oppsett

### 1. Opprett en B1 API-nøkkel

1. I B1Admin gå til **Innstillinger → Utviklernavn → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den navnet "Make", og gi scopene du trenger.
3. **Inkluder `settings:write`** hvis noen av dine scenarioer bruker den øyeblikkelige utløseren — Make registrerer en webhook på vegne av deg når scenarioet slås på.
4. Gi også scopene handlingsmodulene trenger (f.eks. `donations:write` for Legg til donasjon-modulen).
5. Lagre og kopier `cak_…`-nøkkelen.

### 2. Installere forbindelsen

1. I Make bygger du et nytt scenario og drar **B1.church**-utløsermodulen på lerretet.
2. Når du blir bedt om det, **Opprett en forbindelse**. Lim inn API-nøkkelen i *API-nøkkel*-feltet og la *API Base URL* være `https://api.churchapps.org` (hvis du ikke tester mot staging).
3. Klikk **Lagre** — Make tester nøkkelen ved å lese kirka di-profilen.

Forbindelsen lagres på Make-kontoen og gjenbrukes på tvers av scenarioer.

### 3. Konfigurere utløseren

1. Åpne innstillingene for **Se hendelser**-modulen.
2. Velg hendelsen du vil ha — f.eks. `donation.created`.
3. Lagre. Make genererer en unik webhook-URL og lagrer den internt.

### 4. Legg til nedstrømmoduler

Dra noen av Makes hundrevis av app-moduler på lerretet — Mailchimp, Google Sheets, Slack, HubSpot, ditt eget HTTP-endepunkt, osv. Map utløserens utdata (`event`, `churchId`, `data.id`, `data.amount`, …) inn i deres inputfelt. Makes flatten / iterator / router / aggregator-moduler lar deg bygge forgrening og parallell flyter som ville være vanskelig i Zapier.

### 5. Slå scenarioet på

Veksle **Aktiv** i scenariohodet. Make ringer B1s `POST /membership/webhooks` for å registrere URL-en. Fra det øyeblikket flyter hver B1-hendelse som samsvarer gjennom scenarioet i sanntid.

Slå scenarioet av ringer `DELETE /membership/webhooks/{id}` slik at det ikke er foreldreløse abonnement.

## Vanlige oppskrifter

### Synkroniser donasjoner til et Google Sheet for gjennomgang av finans

- **Utløser** — B1: Se hendelser (`donation.created`)
- **Handling** — Google Sheets: Legg til en rad. Map `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` inn i arkets kolonner.

### Betinget Slack-varsel etter donasjonsmengde

- **Utløser** — B1: Se hendelser (`donation.created`)
- **Router**:
  - Gren A — Filter: `data.amount >= 1000` → Slack: post til `#major-gifts`
  - Gren B — fallthrough → Slack: post til `#donations`

### Ny person → CRM + velkomst-e-post + Slack

- **Utløser** — B1: Se hendelser (`person.created`)
- **Handling** — HubSpot: Opprett kontakt
- **Handling** — Mailgun: Send velkomst-e-post
- **Handling** — Slack: Varsle `#new-people` (parallelt — bruk Makes router)

## Hvordan den øyeblikkelige utløseren fungerer

Den øyeblikkelige utløseren er webhook-sikret, ikke polling — når aktivert ringer Make `POST /membership/webhooks` med sin genererte URL og hendelsen du valgte. Når hendelsen avfyres i B1, sender B1 konvolutten til Makes URL og scenarioet ditt kjører innen sekunder. Deaktivering av scenarioet fjerner webhoken.

Utløseren avfyres bare for hendelser som skjer **mens scenarioet er aktivt**. Det er ingen backfill.

## Grenser og merknader

- **En hendelse per Se hendelser-modul.** For å lytte til flere hendelser i ett scenario, drar du flere utløsermoduler inn i separate scenarioer (eller bruker en enkelt modul med den forente hendelseslisten — se nedenfor).
- **Signaturverifisering er ikke eksponert** — Make sender ikke `X-B1-Signature` gjennom til scenarioet; tillitsgrensen er Makes ugjettbar per-scenario webhook-URL. Dette er normal Make-praksis. Hvis du trenger eksplisitte signatursjekker, bygger du en tilpasset integrasjon med [SDK](/docs/developer/api/webhooks#sdk-support) i stedet.
- **Operasjonsteller** — hvert API-anrop fra en handlingsmodul teller mot Makeoperasjonskvoten din, ikke noe på B1s side.

## Problemløsing

- **Forbindelsestest mislykkes** — oftest en stavefeil i API-nøkkelen. Kopier den på nytt fra B1Admin (hele nøkkelen vises bare én gang; hvis du har mistet den, opprett en ny nøkkel).
- **Utløsermodul aktiveres ikke** — sjekk **Innstillinger → Utviklernavn → Webhooks** i B1Admin. Hvis du ikke ser en "Make — &lt;event&gt;"-rad etter aktivering av scenarioet, mangler nøkkelen `settings:write`. Oppdater nøkkelen og reaktiver.
- **Handling returnerer `403 Forbidden`** — API-nøkkelen mangler scopet for det endepunktet. For eksempel trenger Legg til donasjon `donations:write`. Oppdater nøkkelen i B1Admin og re-test.

## Tilpassing av appen

B1.church Make-appen er åpen kildekode — JSON-definisjonene lever i `B1Integrations/Make/`-repoet. Hvis du trenger en modul som ikke eksisterer (f.eks. en ny handling for et endepunkt vi ikke har dekket), åpne en issue eller PR der.

## Se også

- [Zapier](./zapier) — samme mønster med et enklere brukergrensesnitt og en større app-katalog
- [Slack & Discord](./slack-discord) — innebygd chat-varsler uten Make
- [Webhooks (utviklerreferanse)](/docs/developer/api/webhooks)
