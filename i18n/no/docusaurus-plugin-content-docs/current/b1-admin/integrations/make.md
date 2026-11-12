---
title: "Make"
description: "Koble B1 Admin til Make for å automatisere arbeidsflyter: lag en API-nøkkel, sett opp B1.church-utløseren og -handlingene, og feilsøk vanlige feil."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (tidligere Integromat) er en visuell plattform for arbeidsflytautomatisering. Den ligner på Zapier i hensikt, med mer fleksibel logikk og en lavere regning i stor skala. Den offisielle B1.church-appen for Make lar deg bygge «scenarioer» som reagerer øyeblikkelig på B1-hendelser og skriver poster tilbake til B1.

</div>

:::caution Ikke tilgjengelig ennå
B1.church-appen for Make er ikke publisert i Makes appkatalog ennå, så du kan ikke legge til **B1.church**-modulene nedenfor i et scenario i dag. Inntil den er publisert, bruk [Zapier](./zapier.md), eller kall B1s [REST API](/docs/developer/api) fra Makes modul **HTTP: Lag en forespørsel** med en [API-nøkkel](/docs/developer/api/api-keys). Alt nedenfor beskriver hvordan appen vil fungere når den er lansert.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Make](https://www.make.com)-konto (gratisnivået dekker små arbeidsflyter)
- En kirkeadministrator med tillatelsen **Rediger innstillinger** i B1 Admin
- En grov idé om scenarioet du vil bygge

</div>

## Moduler {#modules}

| Type | Hva | B1-hendelse / endepunkt |
|---|---|---|
| **Øyeblikkelig utløser** | Følg hendelser | enhver abonnert B1-hendelse (`person.created`, `donation.created`, …) |
| **Handling** | Opprett person | legger til en ny person |
| **Handling** | Legg til gave | registrerer en gave |
| **Handling** | Legg til gruppemedlem | legger en person til i en gruppe |
| **Søk** | Søk etter personer | finner personer etter navn eller e-post |

Den øyeblikkelige utløseren lar deg velge hvilken hendelse den skal lytte etter. Det er én utløsermodul per scenario, konfigurert per hendelse.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-create-a-b1-api-key}

1. I B1 Admin går du til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk på **Ny API-nøkkel**, gi den navnet «Make», og gi omfangene du trenger.
3. **Ta med `settings:write`** hvis noen av scenarioene dine bruker den øyeblikkelige utløseren. Make registrerer en webhook på dine vegne når scenariet slås på.
4. Gi også omfangene handlingsmodulene trenger (f.eks. `donations:write` for modulen Legg til gave).
5. Lagre og kopier `cak_…`-nøkkelen.

### 2. Installer tilkoblingen {#2-install-the-connection}

1. I Make bygger du et nytt scenario og drar **B1.church**-utløsermodulen inn på lerretet.
2. Når du blir bedt om det, velg **Opprett en tilkobling**. Lim inn API-nøkkelen i feltet *API Key*, og la *API Base URL* stå som `https://api.churchapps.org` (med mindre du tester mot staging).
3. Klikk på **Lagre**. Make tester nøkkelen ved å lese kirkeprofilen din.

Tilkoblingen lagres på Make-kontoen din og gjenbrukes på tvers av scenarioer.

### 3. Konfigurer utløseren {#3-configure-the-trigger}

1. Åpne innstillingene for modulen **Følg hendelser**.
2. Velg hendelsen du vil ha, f.eks. `donation.created`.
3. Lagre. Make genererer en unik webhook-URL og lagrer den internt.

### 4. Legg til nedstrøms moduler {#4-add-downstream-modules}

Dra hvilke som helst av Makes hundrevis av appmoduler inn på lerretet: Mailchimp, Google Sheets, Slack, HubSpot, ditt eget HTTP-endepunkt osv. Map utdataene fra utløseren (`event`, `churchId`, `data.id`, `data.amount`, …) til inndatafeltene deres. Makes modul for flatten, iterator, ruter og aggregator lar deg bygge forgreninger og parallelle flyter som ville vært vanskelige i Zapier.

### 5. Slå på scenariet {#5-turn-the-scenario-on}

Slå på **Aktiv** i scenariets topplinje. Make kaller B1s `POST /membership/webhooks` for å registrere URL-en. Fra det øyeblikket går hver matchende B1-hendelse gjennom scenariet i sanntid.

Hvis du slår av scenariet, kaller det `DELETE /membership/webhooks/{id}`, slik at det ikke blir noen foreldreløse abonnementer.

## Vanlige oppskrifter {#common-recipes}

### Synkroniser gaver til et Google-regneark for økonomigjennomgang {#sync-donations-to-a-google-sheet-for-finance-review}

- **Utløser**: B1: Følg hendelser (`donation.created`)
- **Handling**: Google Sheets: Legg til en rad. Map `data.donationDate`, `data.amount`, `data.personId`, `data.method` og `data.batchId` inn i kolonnene i regnearket.

### Betinget Slack-varsel etter gavebeløp {#conditional-slack-notification-by-donation-amount}

- **Utløser**: B1: Følg hendelser (`donation.created`)
- **Ruter**:
  - Gren A: Filter: `data.amount >= 1000` → Slack: publiser i `#major-gifts`
  - Gren B: resten → Slack: publiser i `#donations`

### Ny person → CRM + velkomst-e-post + Slack {#new-person--crm--welcome-email--slack}

- **Utløser**: B1: Følg hendelser (`person.created`)
- **Handling**: HubSpot: Opprett kontakt
- **Handling**: Mailgun: Send velkomst-e-post
- **Handling**: Slack: Varsle `#new-people` (parallelt, bruk Makes ruter)

## Slik fungerer den øyeblikkelige utløseren {#how-the-instant-trigger-works}

Den øyeblikkelige utløseren er webhook-basert, ikke polling. Når den aktiveres, kaller Make `POST /membership/webhooks` med URL-en den har generert og hendelsen du valgte. Når hendelsen inntreffer i B1, sender B1 innholdet til Makes URL, og scenariet kjører innen få sekunder. Deaktiverer du scenariet, fjernes webhooken.

Utløseren starter bare for hendelser som skjer **mens scenariet er aktivt**. Det finnes ingen etterfylling av tidligere hendelser.

## Begrensninger og merknader {#limits--notes}

- **Én hendelse per modul Følg hendelser.** For å lytte etter flere hendelser, bygg ett scenario per hendelse.
- **Signaturverifisering er ikke eksponert.** Make sender ikke `X-B1-Signature` videre til scenariet. Tillitsgrensen er Makes uforutsigbare webhook-URL per scenario. Dette er vanlig praksis i Make. Hvis du trenger eksplisitte signatursjekker, bygg en egen integrasjon med [SDK-et](/docs/developer/api/webhooks#sdk-support) i stedet.
- **Antall operasjoner.** Hvert API-kall fra en handlingsmodul teller mot Makes kvote for operasjoner, ikke mot noe på B1s side.

## Feilsøking {#troubleshooting}

- **Tilkoblingstesten mislykkes**: oftest en skrivefeil i API-nøkkelen. Kopier den på nytt fra B1 Admin (hele nøkkelen vises bare én gang. Hvis du har mistet den, lag en ny nøkkel).
- **Utløsermodulen aktiveres ikke**: sjekk **Innstillinger → Utvikler → Webhooks** i B1 Admin. Hvis du ikke ser en rad «Make — &lt;hendelse&gt;» etter at du har aktivert scenariet, mangler nøkkelen `settings:write`. Oppdater nøkkelen og aktiver på nytt.
- **Handlingen gir `403 Forbidden`**: API-nøkkelen mangler omfanget for det endepunktet. For eksempel trenger Legg til gave `donations:write`. Oppdater nøkkelen i B1 Admin og test på nytt.

## Mangler en modul? {#missing-a-module}

Hvis du trenger en modul som ikke finnes (f.eks. en ny handling for et endepunkt vi ikke har dekket), send e-post til [support@churchapps.org](mailto:support@churchapps.org). I mellomtiden kan Makes modul **HTTP: Lag en forespørsel** kalle et hvilket som helst B1-endepunkt med en `Authorization: Bearer cak_…`-header.

## Se også {#see-also}

- [Zapier](./zapier.md): samme mønster med enklere grensesnitt og større appkatalog
- [Slack og Discord](./slack-discord.md): innebygde chatvarsler uten Make
- [Webhooks (referanse for utviklere)](/docs/developer/api/webhooks)
