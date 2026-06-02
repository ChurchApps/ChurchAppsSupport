---
title: "Koblet tjenester"
---

# Koblet tjenester

<div class="article-intro">

Den raskeste måten å koble B1 til et annet kirke-tech-verktøy på er vanligvis en Zapier- eller Make-oppskrift — du trenger ikke ny B1-infrastruktur, og tredjeparten hoster arbeidsflyten. Denne siden er en kuratert liste over tjenester vi har bekreftet er ledbare i dag, med en kort, copy-paste oppsettsveiledning for hver.

</div>

## Ved et blikk

| Tjeneste | Kategori | Bro | Hva du kan lede opp |
|---|---|---|---|
| [Mailchimp](./mailchimp) | E-post | Zapier eller Make | Synkroniser nye B1-mennesker / givere inn i en Mailchimp-publikum |
| [Donorbox](./donorbox) | Donasjoner | Zapier | Push Donorbox-donasjoner og donorer tilbake til B1 |
| [Subsplash](./subsplash) | App / donasjoner | Zapier | Trekk Subsplash-giver og mennesker til B1 |
| [VOMO](./vomo) | Frivillig | Zapier | Synkroniser frivillig-påmeldinger mellom B1-grupper og VOMO-prosjekter |
| [Clearstream](./clearstream) | SMS | Zapier | Utløs en Clearstream-tekst fra B1-hendelser; absorber svar som B1-poster |
| [Text In Church](./text-in-church) | SMS / arbeidsflyter | Zapier | Utløs Text In Church-arbeidsflyter fra B1; motta Connect Card-data |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks av Zapier eller Make | Send SMS fra en B1-hendelse |
| [Checkr](./checkr) | Bakgrunnssjekker | Make | Spark av en bakgrunnssjekk når noen slutter seg til et servingteam |

## Hva alle disse har til felles

1. **B1-siden av ledelsen er identisk** — opprett en API-nøkkel med riktige scoper i **B1Admin → innstillinger → utviklernavn → API-nøkler**, deretter enten la broen registrere en webhook for utløseren (Zapier / Make gjør dette automatisk, krever `settings:write`) eller ring B1s REST-endepunkter fra en nedstrøm-handling.
2. **Broen belaster deg, ikke oss.** ChurchApps er gratis; Zapier og Make har begge gratis nivåer som dekker en håndful oppskrifter.
3. **Du kan teste ledelsen uten å gå live.** Begge brodene har en "testtrinn"-knapp som avfyrer utløseren én gang mot B1 og viser deg datashapen før du slår oppskriften på.

## Velge en bro

- **Zapier** er vennligere og har den større app-katalogen — bruk det som standard hvis ikke kostnad er et problem.
- **Make** er billigere i stor skala og har mer fleksibel ruting/filterlogikk — bruk det når en enkelt arbeidsflyt har fan-out, betingelser, eller mange trinn.
- **Webhooks av Zapier** (brukt for Mobile Message-doc) er en generisk adapter som lar deg POST til et hvilket som helst HTTP-endepunkt fra en Zap når destinasjonen ikke er en førsteklasses Zapier-app.

Hvis du vil ha noe som ikke er på denne listen, er B1s [REST API](/docs/developer/api) og [webhooks](/docs/developer/api/webhooks) åpne — du kan bygge en engangs-bro med [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) på et par timer.

## Hva som ikke er her (og hvorfor)

Flere populære kirke-tech-verktøy — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — har ikke en publisert Zapier-app eller Make-modul i dag. De har egne APIer, men ledelse av dem til B1 er et tilpasset-kode-jobb, ikke en oppskrift, så de passer ikke denne listen. Hvis en leverandør legger til en Zapier-app eller Make-modul, vil vi legge til doc-en.

Vi har også bevisst hoppet over Planning Center-Services-spesifikke verktøy (musikk, presentasjon), konkurrerende ChMS-produkter, migrasjons konsulenter, og verktøy som bare renser opp PCO-spesifikke data — ingen av dem har en nyttig ledelsesti til B1.

## Se også

- [Zapier (oversikt)](../zapier) — B1-siden av hver Zapier-oppskrift er identisk; denne doc-en dekker den én gang
- [Make (oversikt)](../make) — samme for Make-scenarioer
- [Slack & Discord](../slack-discord) — chat-varsler uten noen bro
- [Google Sheets](../google-sheets) — eksporter på etterspørsel
- [Webhooks (utviklerreferanse)](/docs/developer/api/webhooks) — hendelseskatalogen hver oppskrift er avhengig av
