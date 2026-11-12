---
title: "Tilkoblede tjenester"
description: "Koble B1 Admin til Mailchimp, Donorbox, Subsplash, VOMO, Clearstream og andre verktøy med Zapier- eller Make-oppskrifter, med oppsettguider for hver av dem."
---

# Tilkoblede tjenester

<div class="article-intro">

Den raskeste måten å koble B1 til et annet kirketeknologiverktøy er vanligvis en Zapier- eller Make-oppskrift. Du trenger ingen ny B1-infrastruktur, og tredjeparten er vert for arbeidsflyten. Denne siden er en kuratert liste over tjenester vi har bekreftet at kan kobles til i dag, med en kort oppsettguide for hver av dem som du kan kopiere og lime inn.

</div>

## Oversikt {#at-a-glance}

| Tjeneste | Kategori | Bro | Hva du kan koble sammen |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-post | Innebygd i B1 (fanen Webhooks) | Hold en Mailchimp-målgruppe synkronisert med B1-personer, grupper og lagrede lister |
| [Donorbox](./donorbox.md) | Gaver | Zapier | Send Donorbox-gaver og givere tilbake til B1 |
| [Subsplash](./subsplash.md) | App / gaver | Zapier | Hent Subsplash-gaver og personer inn i B1 |
| [VOMO](./vomo.md) | Frivillighet | Zapier | Synkroniser påmeldinger av frivillige mellom B1-grupper og VOMO-prosjekter |
| [Clearstream](./clearstream.md) | SMS | Zapier | Utløs en Clearstream-tekstmelding fra B1-hendelser, og hent inn svar som B1-poster |
| [Text In Church](./text-in-church.md) | SMS / arbeidsflyter | Zapier | Utløs Text In Church-arbeidsflyter fra B1, og motta data fra Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier eller Make | Send SMS fra en hvilken som helst B1-hendelse |
| [Checkr](./checkr.md) | Bakgrunnssjekk | Make | Start en bakgrunnssjekk når noen blir med i et tjenesteteam |

## Det alle disse har felles {#what-all-of-these-have-in-common}

1. **B1-delen av oppsettet er identisk.** Lag en API-nøkkel med riktige omfang under **B1 Admin → Innstillinger → Utvikler → API-nøkler**. Deretter lar du broen registrere en webhook for utløseren (Zapier / Make gjør dette automatisk, og krever `settings:write`), eller kaller B1s REST-endepunkter fra en nedstrøms handling. B1.church-appen for Zapier krever `settings:write` på hver nøkkel, fordi den sjekker nøkkelen mot B1s webhook-liste når du kobler den til. (Mailchimp er unntaket. Synkroniseringen er innebygd i B1 og settes opp på fanen **Webhooks**, uten API-nøkkel eller bro.)
2. **Broen fakturerer deg, ikke oss.** ChurchApps er gratis. Zapier og Make har begge gratisnivåer som dekker en håndfull oppskrifter.
3. **Du kan teste oppsettet uten å gå live.** Zapier har en knapp «Test step» som henter eksempeldata fra B1 og viser deg datastrukturen før du slår på oppskriften.

## Velge en bro {#picking-a-bridge}

- **Zapier** er enklere å bruke og har det største appkatalogen. Bruk det som standard, med mindre kostnad er et problem.
- **Make** er billigere i stor skala og har mer fleksibel logikk for ruting og filtrering. Bruk det når en enkelt arbeidsflyt har parallell forgrening, betingelser eller mange steg.
- **Webhooks by Zapier** (brukt i dokumentasjonen for Mobile Message) er en generell adapter som lar deg sende POST til et hvilket som helst HTTP-endepunkt fra en Zap, når mottakeren ikke er en førsteklasses Zapier-app.

Hvis du vil ha noe som ikke står på denne listen, er B1s [REST API](/docs/developer/api) og [webhooks](/docs/developer/api/webhooks) åpne. Du kan bygge en egen bro med [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) på noen timer.

## Hva som ikke finnes her (og hvorfor) {#whats-not-here-and-why}

Flere populære kirketeknologiverktøy, som Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck og MinistrySafe, har ingen publisert Zapier-app eller Make-modul i dag. De har egne API-er, men å koble dem til B1 er en jobb for egen kode, ikke en oppskrift, så de passer ikke på denne listen. Hvis en leverandør legger til en Zapier-app eller et Make-modul, legger vi til dokumentasjon for den.

Vi har også bevisst utelatt verktøy som er spesifikke for Planning Center Services (musikk, presentasjon), konkurrerende ChMS-produkter, migreringskonsulenter og verktøy som bare rydder i PCO-spesifikke data. Ingen av dem har en nyttig vei inn i B1.

## Se også {#see-also}

- [Zapier (oversikt)](../zapier.md): B1-delen av hver Zapier-oppskrift er identisk, og denne dokumentasjonen dekker den én gang
- [Make (oversikt)](../make.md): det samme for Make-scenarioer
- [Slack og Discord](../slack-discord.md): chatvarsler uten noen bro
- [Google Sheets](../google-sheets.md): eksporter på forespørsel
- [Webhooks (referanse for utviklere)](/docs/developer/api/webhooks): hendelseskatalogen alle oppskrifter bruker
