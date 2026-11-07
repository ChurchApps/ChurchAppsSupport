---
title: "Zapier"
description: "Koble B1 Admin til Zapier for å starte automatiseringer ved nye personer, gaver og gruppemedlemmer, og skriv poster tilbake til B1 uten koding."
---

# Zapier

<div class="article-intro">

Den offisielle B1.church-appen på Zapier lar en Zap reagere på hendelser i kirken din (ny person, ny gave, nytt gruppemedlem, …) og skrive poster tilbake til B1. Ingen koding, ingen infrastruktur -- du kobler det sammen i Zapiers dra-og-slipp-editor, limer inn en API-nøkkel og slår på Zapen.

</div>

:::caution Venter på Zapiers godkjenning
B1.church-appen er bygget og fungerer, men den venter fortsatt på Zapiers gjennomgang før den vises offentlig i app-katalogen i Zap-editoren. Inntil den er godkjent, kan bare inviterte kontoer bruke den. Alt under beskriver hvordan det vil fungere når den er godkjent.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Zapier](https://zapier.com)-konto (gratisnivået er nok for noen få Zaps)
- En kirkeadministrator med tillatelsen **Rediger innstillinger** i B1Admin (du oppretter en API-nøkkel)
- En idé om hva du vil gjøre -- f.eks. «når en person legges til i B1, legg dem til i Mailchimp-listen min»

</div>

## Utløsere og handlinger

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
| **Handling** | Finn person | slår opp en person på id, e-post eller navn; feiler oppgaven hvis ingen samsvarer |

Kombiner disse fritt med hvilken som helst av Zapiers over 7 000 støttede apper.

## Oppsett

### 1. Opprett en B1 API-nøkkel

1. I B1Admin går du til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den et navn som «Zapier», og velg omfangene Zapen trenger.
3. **Viktig:** Zapier-utløsere registrerer en webhook på dine vegne når Zapen slås på, og det krever omfanget **`settings:write`**. Ta alltid med `settings:write` hvis noen av Zapene dine bruker en B1-utløser.
4. Gi også omfangene handlingene trenger -- for eksempel krever handlingen «Legg til gave» `donations:write`, og «Opprett person» krever `people:write`.
5. Lagre. Den fullstendige `cak_…`-nøkkelen vises **én gang** -- kopier den.

### 2. Koble Zapier til B1

1. I Zapier bygger du en ny Zap.
2. Når du velger en B1-utløser eller -handling for første gang, ber Zapier deg om å **logge inn på B1.church**.
3. Lim inn API-nøkkelen fra steg 1 og klikk **Ja, fortsett**. Zapier validerer den mot kirken din.

Tilkoblingen lagres i Zapier og gjenbrukes av alle Zapene på kontoen din.

### 3. Bygg Zapen

Velg en utløser, og legg deretter til ett eller flere handlingssteg. Eksempler nedenfor.

## Vanlige oppskrifter

### Legg nye B1-personer til i Mailchimp

- **Utløser** — B1: Ny person
- **Handling** — Mailchimp: Legg til/oppdater abonnent. Map B1s `name__first`, `name__last` og `contactInfo__email` til Mailchimps felt for Fornavn / Etternavn / E-post.

### Legg gaver ut i en Slack-kanal med et rikere kort enn den innebygde koblingen

- **Utløser** — B1: Ny gave
- **Handling** — Slack: Send kanalmelding. Lag hvilket som helst oppsett -- knapper, vedlegg osv. -- som den [innebygde Slack-koblingen](./slack-discord.md) ikke kan.

### Legg nye gruppemedlemmer til i en Google-gruppe

- **Utløser** — B1: Nytt gruppemedlem (filtrert til en bestemt `groupId`)
- **Handling** — Filtrer med Zapier: fortsett bare hvis B1-gruppen er den du bryr deg om
- **Handling** — B1: Finn person (bruk utløserens `personId` for å hente e-posten)
- **Handling** — Google Groups: Legg til medlem

### Videresend skjemainnsendinger til et prosjektverktøy

- **Utløser** — B1: Ny skjemainnsending
- **Handling** — Notion / Linear / Asana / Trello: Opprett side / sak / oppgave

## Slik fungerer utløsere under panseret

Utløsere er **REST-hooks**, ikke polling -- Zapier spør ikke B1 hvert 15. minutt. Når du slår på Zapen, ber Zapier B1 om å registrere en webhook som peker på en privat Zapier-URL; når hendelsen inntreffer, sender B1 innholdet til Zapier, og Zapen starter **innen sekunder**. Slår du av Zapen, ber Zapier B1 slette webhooken -- ingen foreldreløse abonnementer.

Dette betyr at utløseren bare aktiveres for hendelser som skjer **etter** at Zapen er slått på. Det finnes ingen etterfylling -- å slå på en Zap spiller ikke av gårsdagens gaver på nytt.

## Begrensninger og merknader

- **Flere Zaps med samme utløser** registrerer hver sin B1-webhook -- det er ingen konflikt, men det er greit å vite hvis du inspiserer **Innstillinger → Utvikler → Webhooks** og lurer på hvorfor tre identiske rader `Zapier — donation.created` finnes.
- **Testdata i Zap-oppsettet** -- når du bygger en Zap, ber Zapier om eksempeldata for å mappe felt. Den henter den siste matchende hendelsen fra B1 hvis det finnes en; ellers bruker den et syntetisk eksempel fra app-definisjonen.
- **Handlingsfeil vises som Zap-feil** i Zapiers oppgavehistorikk. Vanlig årsak: en API-nøkkel uten riktig omfang (f.eks. trenger handlingen «Legg til gave» `donations:write`). Lag nøkkelen på nytt med de riktige omfangene, og koble til på nytt i Zapier.
- **Kvoter for utgående API-kall** -- hvert B1-API-kall fra en handling teller mot Zapier-oppgavekvoten din, ikke mot noe på B1s side.

## Feilsøking

- **«Autentisering mislyktes»** ved tilkobling -- API-nøkkelen er feil, tilbakekalt, eller mangler omfangene Zapen trenger. Lag den på nytt i B1Admin med minst `settings:write` pluss de ressursomfangene Zapen berører, og oppdater tilkoblingen.
- **Utløseren aktiveres aldri** -- bekreft at webhooken faktisk ble registrert: i B1Admin skal **Innstillinger → Utvikler → Webhooks** nå vise en rad med navnet «Zapier — &lt;hendelse&gt;». Hvis den ikke er der, manglet API-nøkkelen sannsynligvis `settings:write` da du slo på Zapen. Rett nøkkelen, slå Zapen av og på igjen.
- **Utløseren aktiveres to ganger** -- Zapier sender av og til på nytt hvis bekreftelsen gikk tapt. Bruk et «Filtrer med Zapier»-steg på en unik id (f.eks. personens `id`) hvis du trenger streng deduplisering.

## Se også

- [Make](./make.md) -- samme mønster, annen plattform
- [Slack og Discord](./slack-discord.md) -- enklere chatvarsler uten Zapier
- [Webhooks (utviklerreferanse)](/docs/developer/api/webhooks)
