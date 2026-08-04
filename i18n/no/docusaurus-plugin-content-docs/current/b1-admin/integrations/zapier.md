---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Den offisielle B1.church-appen på Zapier lar en Zap reagere på hendelser i menigheten din (ny person, ny gave, nytt gruppemedlem, …) og skrive poster tilbake til B1. Ingen koding, ingen infrastruktur -- du kobler det sammen i Zapiers dra-og-slipp-editor, limer inn en API-nøkkel, og slår på Zappen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En [Zapier](https://zapier.com)-konto (gratisnivået er nok for en håndfull Zapper)
- En menighetsadministrator med tillatelsen **Rediger innstillinger** i B1Admin (du skal opprette en API-nøkkel)
- En idé om hva du vil gjøre — f.eks. «når en person legges til i B1, legg dem til i Mailchimp-listen min»

</div>

## Triggere og handlinger

| Type | Hva | B1-hendelse / endepunkt |
|---|---|---|
| **Trigger** | Ny person | `person.created` |
| **Trigger** | Oppdatert person | `person.updated` |
| **Trigger** | Ny gave | `donation.created` |
| **Trigger** | Nytt gruppemedlem | `group.member.added` |
| **Trigger** | Ny skjemainnsending | `form.submission.created` |
| **Handling** | Opprett person | legger til en ny person |
| **Handling** | Legg til gave | registrerer en gave |
| **Handling** | Legg til gruppemedlem | legger en person til i en gruppe |
| **Handling** | Finn person | slår opp en person etter ID, e-post eller navn; feiler oppgaven hvis ingen treffer |

Kombiner disse fritt med hvilken som helst av Zapiers over 7000 støttede apper.

## Oppsett

### 1. Opprett en B1 API-nøkkel

1. I B1Admin, gå til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den et navn som «Zapier», og velg omfangene Zappen trenger.
3. **Viktig:** Zapier-triggere registrerer en webhook på dine vegne når Zappen slås på, noe som krever omfanget **`settings:write`**. Inkluder alltid `settings:write` hvis noen av Zappene dine bruker en B1-trigger.
4. Gi også omfangene handlingene trenger — for eksempel trenger en «Legg til gave»-handling `donations:write`, «Opprett person» trenger `people:write`.
5. Lagre. Den fullstendige `cak_…`-nøkkelen vises **kun én gang** — kopier den.

### 2. Koble Zapier til B1

1. I Zapier, bygg en ny Zap.
2. Når du velger en B1-trigger eller -handling for første gang, ber Zapier deg om å **logge inn på B1.church**.
3. Lim inn API-nøkkelen fra steg 1 og klikk **Ja, fortsett**. Zapier validerer den mot menigheten din.

Tilkoblingen lagres i Zapier og gjenbrukes av alle Zapper på kontoen din.

### 3. Bygg Zappen

Velg en trigger, og legg deretter til ett eller flere handlingssteg. Eksempler nedenfor.

## Vanlige oppskrifter

### Legg nye B1-personer til Mailchimp

- **Trigger** — B1: Ny person
- **Handling** — Mailchimp: Legg til/oppdater abonnent. Map B1s `name__first`, `name__last`, `contactInfo__email` inn i Mailchimps felt for fornavn/etternavn/e-post.

### Publiser gaver til en Slack-kanal med et rikere kort enn den innebygde koblingen

- **Trigger** — B1: Ny gave
- **Handling** — Slack: Send kanalmelding. Sett sammen et hvilket som helst oppsett -- knapper, vedlegg osv. -- som den innebygde [Slack-koblingen](./slack-discord) ikke kan.

### Legg nye gruppemedlemmer til en Google-gruppe

- **Trigger** — B1: Nytt gruppemedlem (filtrert til en bestemt `groupId`)
- **Handling** — Filtrer med Zapier: fortsett bare hvis B1-gruppen er den du bryr deg om
- **Handling** — B1: Finn person (bruk triggerens `personId` for å hente e-posten)
- **Handling** — Google Groups: Legg til medlem

### Videresend skjemainnsendinger til et prosjektsporingsverktøy

- **Trigger** — B1: Ny skjemainnsending
- **Handling** — Notion / Linear / Asana / Trello: Opprett side / sak / oppgave

## Hvordan triggere fungerer under panseret

Triggere er **REST-hooker**, ikke polling — Zapier pinger ikke B1 hvert 15. minutt. Når du slår på Zappen, ber Zapier B1 om å registrere en webhook som peker til en privat Zapier-URL; når hendelsen inntreffer, sender B1 konvolutten til Zapier via POST, og Zappen din starter **innen sekunder**. Slå av Zappen, og Zapier ber B1 om å slette webhooken -- ingen etterlatte abonnementer.

Dette betyr at triggeren bare utløses for hendelser som skjer **etter** at Zappen er slått på. Det finnes ingen etterfylling -- å slå på en Zap spiller ikke av gårsdagens gaver på nytt.

## Begrensninger og merknader

- **Flere Zapper med samme trigger** registrerer hver sin egen B1-webhook -- det er ingen konflikt, men det er greit å vite hvis du inspiserer **Innstillinger → Utvikler → Webhooker** og lurer på hvorfor tre identiske rader med `Zapier — donation.created` står der.
- **Testdata i Zap-oppsett** — når du bygger en Zap, ber Zapier om eksempeldata for å mappe felter. Den vil hente den nyeste matchende hendelsen fra B1 hvis en finnes; ellers bruker den et syntetisk eksempel fra appdefinisjonen.
- **Feilende handlinger vises som Zap-feil** i Zapiers oppgavehistorikk. Vanlig årsak: en API-nøkkel uten riktig omfang (f.eks. trenger en «Legg til gave»-handling `donations:write`). Lag nøkkelen på nytt med riktige omfang og koble til på nytt i Zapier.
- **Kvoter for utgående API-kall** — hvert B1 API-kall fra en handling teller mot Zapier-oppgavekvoten din, ikke mot noe på B1s side.

## Feilsøking

- **«Authentication failed»** ved tilkobling — API-nøkkelen er feil, tilbakekalt, eller mangler omfangene Zappen trenger. Lag den på nytt i B1Admin med minst `settings:write` pluss hvilke ressursomfang Zappen berører, og oppdater tilkoblingen.
- **Triggeren utløses aldri** — bekreft at webhooken faktisk ble registrert: i B1Admin skal **Innstillinger → Utvikler → Webhooker** nå vise en rad med navnet «Zapier — &lt;hendelse&gt;». Hvis den ikke er der, manglet API-nøkkelen sannsynligvis `settings:write` da du slo på Zappen. Fiks nøkkelen, slå Zappen av og på igjen.
- **Triggeren utløses to ganger** — Zapier leverer av og til på nytt hvis bekreftelsen ble tapt. Bruk et «Filtrer med Zapier»-steg på en unik ID (f.eks. personens `id`) hvis du trenger streng deduplisering.

## Se også

- [Make](./make) — samme mønster, annen plattform
- [Slack og Discord](./slack-discord) — enklere chat-varsler uten Zapier
- [Webhooker (utviklerreferanse)](/docs/developer/api/webhooks)
