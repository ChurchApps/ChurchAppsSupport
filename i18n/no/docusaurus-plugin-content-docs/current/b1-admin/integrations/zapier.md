---
title: "Zapier"
description: "Koble B1 Admin til Zapier for å starte automatiseringer ved nye personer, gaver og gruppemedlemmer, og skrive poster tilbake til B1 uten koding."
---

# Zapier

<div class="article-intro">

Den offisielle B1.church-appen i Zapier lar en Zap reagere på hendelser i kirken din (ny person, ny gave, nytt gruppemedlem osv.) og skrive poster tilbake til B1. Ingen koding og ingen infrastruktur. Du kobler det sammen i Zapiers dra-og-slipp-editor, limer inn en API-nøkkel og slår på Zapen.

</div>

:::caution Venter på godkjenning fra Zapier
B1.church-appen er bygget og fungerer, men den venter fortsatt på Zapiers gjennomgang før den vises offentlig i appkatalogen i Zap-editoren. Inntil den er godkjent, kan bare inviterte kontoer bruke den. Alt nedenfor beskriver hvordan den vil fungere når den er godkjent.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Zapier](https://zapier.com)-konto (gratisnivået er nok for en håndfull Zaper)
- En kirkeadministrator med tillatelsen **Rediger innstillinger** i B1 Admin (du oppretter en API-nøkkel)
- En idé om hva du vil gjøre, f.eks. «når en person legges til i B1, legg dem til i Mailchimp-listen min»

</div>

## Utløsere og handlinger {#triggers-and-actions}

| Type | Hva | B1-hendelse / endepunkt |
|---|---|---|
| **Utløser** | Ny person | `person.created` |
| **Utløser** | Oppdatert person | `person.updated` |
| **Utløser** | Ny gave | `donation.created` |
| **Utløser** | Nytt gruppemedlem | `group.member.added` |
| **Utløser** | Ny skjemainnsending | `form.submission.created` |
| **Handling** | Opprett person | legger til en ny person |
| **Handling** | Legg til gave | registrerer en gave |
| **Handling** | Legg til gruppemedlem | legger en person til i en gruppe |
| **Handling** | Finn person | slår opp en person etter ID, e-post eller navn. Feiler oppgaven hvis ingen samsvarer |

Du kan kombinere disse fritt med en hvilken som helst av Zapiers over 7 000 støttede apper.

## Oppsett {#setup}

### 1. Lag en B1 API-nøkkel {#1-create-a-b1-api-key}

1. I B1 Admin går du til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk på **Ny API-nøkkel**, gi den et navn som «Zapier», og velg omfangene Zapen trenger.
3. **Viktig:** ta alltid med omfanget **`settings:write`**. Zapier sjekker nøkkelen mot B1s webhook-liste når du kobler den til, og B1-utløsere registrerer en webhook på dine vegne når Zapen slås på. Begge deler krever `settings:write`. En nøkkel uten det mislykkes i tilkoblingstesten, selv om Zapene dine bare bruker B1-handlinger.
4. Gi også omfangene handlingene trenger. For eksempel trenger handlingen «Legg til gave» `donations:write`, og «Opprett person» trenger `people:write`.
5. Lagre. Den fullstendige `cak_…`-nøkkelen vises **én gang**. Kopier den.

### 2. Koble Zapier til B1 {#2-connect-zapier-to-b1}

1. I Zapier lager du en ny Zap.
2. Når du velger en B1-utløser eller -handling for første gang, ber Zapier deg om å **logge inn på B1.church**.
3. Lim inn API-nøkkelen fra steg 1 i **API Key** (la **API URL** stå tomt), og klikk på **Yes, Continue**. Zapier validerer nøkkelen mot kirken din.

Tilkoblingen lagres i Zapier og gjenbrukes av alle Zaper på kontoen din.

### 3. Bygg Zapen {#3-build-the-zap}

Velg en utløser, og legg deretter til ett eller flere handlingssteg. Eksempler nedenfor.

## Vanlige oppskrifter {#common-recipes}

### Legg nye B1-personer til i Mailchimp {#add-new-b1-people-to-mailchimp}

- **Utløser**: B1: Ny person
- **Handling**: Mailchimp: Legg til/oppdater abonnent. Map B1s `name__first`, `name__last` og `contactInfo__email` til Mailchimps felt for fornavn, etternavn og e-post.

### Publiser gaver i en Slack-kanal med et rikere kort enn den innebygde connectoren {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Utløser**: B1: Ny gave
- **Handling**: Slack: Send kanalmelding. Lag det oppsettet du vil ha, med knapper, vedlegg osv., som den innebygde [Slack-connectoren](./slack-discord.md) ikke støtter.

### Legg nye gruppemedlemmer til i en Google-gruppe {#add-new-group-members-to-a-google-group}

- **Utløser**: B1: Nytt gruppemedlem
- **Handling**: Filter by Zapier: fortsett bare hvis utløserens `groupId` er B1-gruppen du bryr deg om
- **Handling**: B1: Finn person (bruk utløserens `personId` for å hente e-posten)
- **Handling**: Google Groups: Legg til medlem

### Videresend skjemainnsendinger til et oppgavesystem {#forward-form-submissions-to-a-project-tracker}

- **Utløser**: B1: Ny skjemainnsending
- **Handling**: Notion / Linear / Asana / Trello: Opprett side / sak / oppgave

## Slik fungerer utløserne under panseret {#how-triggers-work-under-the-hood}

Utløserne er **REST-hooks**, ikke polling. Zapier spør ikke B1 hvert 15. minutt. Når du slår på Zapen, ber Zapier B1 om å registrere en webhook som peker mot en privat Zapier-URL. Når hendelsen inntreffer, sender B1 innholdet til Zapier, og Zapen starter **innen sekunder**. Slår du av Zapen, ber Zapier B1 om å slette webhooken. Det blir ingen foreldreløse abonnementer.

Det betyr at utløseren bare starter for hendelser som skjer **etter** at Zapen er slått på. Det finnes ingen etterfylling. Å slå på en Zap spiller ikke av gårsdagens gaver på nytt.

## Begrensninger og merknader {#limits--notes}

- **Flere Zaper med samme utløser** registrerer hver sin B1-webhook. Det gir ingen konflikt, men det er greit å vite hvis du går til **Innstillinger → Utvikler → Webhooks** og lurer på hvorfor det finnes tre identiske rader `Zapier — donation.created`.
- **Testdata i Zap-oppsettet**: når du bygger en Zap, ber Zapier om eksempeldata for å koble felter. Den henter den nyeste matchende hendelsen fra B1 hvis det finnes en. Ellers bruker den et syntetisk eksempel fra appdefinisjonen.
- **Mislykkede handlinger vises som Zap-feil** i Zapiers oppgavelogg. Vanlig årsak: en API-nøkkel uten riktig omfang (f.eks. trenger handlingen «Legg til gave» `donations:write`). Lag nøkkelen på nytt med riktige omfang, og koble til på nytt i Zapier.
- **Kvoter for utgående API-kall**: hvert B1-API-kall fra en handling teller mot Zapiers oppgavekvote, ikke mot noe på B1s side.

## Feilsøking {#troubleshooting}

- **«Authentication failed»** ved tilkobling: API-nøkkelen er feil, slettet eller mangler `settings:write`. Lag en ny nøkkel i B1 Admin med `settings:write` pluss ressursomfangene Zapen bruker (omfang kan ikke endres på en eksisterende nøkkel), og oppdater tilkoblingen.
- **Utløseren starter aldri**: kontroller at webhooken faktisk ble registrert. I B1 Admin skal **Innstillinger → Utvikler → Webhooks** nå vise en rad med navnet «Zapier — &lt;hendelse&gt;». Hvis den ikke finnes, manglet API-nøkkelen sannsynligvis `settings:write` da du slo på Zapen. Rett nøkkelen, slå Zapen av og på igjen.
- **Utløseren starter to ganger**: Zapier sender av og til på nytt hvis bekreftelsen gikk tapt. Bruk et steg «Filter by Zapier» på en unik ID (f.eks. personens `id`) hvis du trenger streng deduplisering.

## Se også {#see-also}

- [Make](./make.md): samme mønster, en annen plattform
- [Slack og Discord](./slack-discord.md): enklere chatvarsler uten Zapier
- [Webhooks (referanse for utviklere)](/docs/developer/api/webhooks)
