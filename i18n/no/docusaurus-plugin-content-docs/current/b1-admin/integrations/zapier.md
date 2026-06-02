---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Den offisielle B1.church-appen på Zapier lar en Zap reagere på hendelser i kirken din (ny person, ny donasjon, nytt gruppemedlem, …) og skrive poster tilbake til B1. Ingen koding, ingen infrastruktur — du kobler det sammen i Zapiers drag-and-drop-editor, limer inn en API-nøkkel, og slår på Zapen.

</div>

<div class="prereqs">
<h4>Før Du Begynner</h4>

- En [Zapier](https://zapier.com)-konto (gratisnivået er nok for en håndful Zaps)
- En kirkeadministrator med **Rediger Innstillinger**-tillatelse i B1Admin (du vil opprette en API-nøkkel)
- En ide om hva du vil gjøre — f.eks. "når en person legges til i B1, legg dem til i Mailchimp-listen min"

</div>

## Triggere og Handlinger

| Type | Hva | B1-hendelse / endepunkt |
|---|---|---|
| **Trigger** | Ny Person | `person.created` |
| **Trigger** | Oppdatert Person | `person.updated` |
| **Trigger** | Ny Donasjon | `donation.created` |
| **Trigger** | Nytt Gruppemedlem | `group.member.added` |
| **Trigger** | Ny Skjemainnsending | `form.submission.created` |
| **Handling** | Opprett Person | legger til en ny person |
| **Handling** | Legg Til Donasjon | registrerer en donasjon |
| **Handling** | Legg Til Gruppemedlem | legger en person til en gruppe |
| **Søk** | Finn Person | slår opp en person etter navn eller e-post |

Kombiner disse fritt med noen av Zapiers 7000+ støttede apper.

## Oppsett

### 1. Opprett en B1 API-nøkkel

1. I B1Admin går du til **Innstillinger → Utvikler → API-nøkler**.
2. Klikk **Ny API-nøkkel**, gi den et navn som "Zapier", og velg omfangene Zapen trenger.
3. **Viktig:** Zapier-triggere registrerer en webhook på dine vegne når Zapen slås på, noe som krever omfanget **`settings:write`**. Inkluder alltid `settings:write` hvis noen av Zapiene dine bruker en B1-trigger.
4. Gi også omfangene som handlingene trenger — for eksempel en "Legg Til Donasjon"-handling trenger `donations:write`, "Opprett Person" trenger `people:write`.
5. Lagre. Den fulle `cak_…`-nøkkelen vises **en gang** — kopier den.

### 2. Koble Zapier til B1

1. I Zapier bygger du en ny Zap.
2. Når du velger en B1-trigger eller handling for første gang, spør Zapier deg om å **Logge inn på B1.church**.
3. Lim inn API-nøkkelen fra trinn 1 og klikk **Ja, Fortsett**. Zapier validerer den mot kirken din.

Forbindelsen lagres i Zapier og gjenbrukes av hver Zap på kontoen din.

### 3. Bygg Zapen

Velg en trigger, legg deretter til en eller flere handlingstrinn. Eksempler nedenfor.

## Vanlige Oppskrifter

### Legg til nye B1-personer til Mailchimp

- **Trigger** — B1: Ny Person
- **Handling** — Mailchimp: Legg til/Oppdater Abonnent. Kartlegg B1s `name__first`, `name__last`, `contactInfo__email` til Mailchimps First Name / Last Name / Email-felt.

### Legg donasjoner til en Slack-kanal med et rikere kort enn den innebygde koblingen

- **Trigger** — B1: Ny Donasjon
- **Handling** — Slack: Send Kanalmeldelse. Sammenstill et hvilket som helst oppsett — knapper, vedlegg osv. — som den innebygde [Slack-koblingen](./slack-discord) ikke kan.

### Legg til nye gruppemedlemmer i en Google Group

- **Trigger** — B1: Nytt Gruppemedlem (filtrert til en bestemt `groupId`)
- **Handling** — Filtrer etter Zapier: fortsett bare hvis B1-gruppen er den du bryr deg om
- **Handling** — B1: Finn Person (bruk triggeren `personId` for å hente e-posten)
- **Handling** — Google Groups: Legg Til Medlem

### Videresend skjemainnsendinger til en prosjektsporer

- **Trigger** — B1: Ny Skjemainnsending
- **Handling** — Notion / Linear / Asana / Trello: Opprett side / problem / oppgave

## Hvordan Triggere Fungerer Under Panseret

Triggere er **REST-hooks**, ikke polling — Zapier pinger ikke B1 hvert 15. minutt. Når du slår på Zapen, ber Zapier B1 registrere en webhook som peker på en privat Zapier-URL; når hendelsen skjer, POSTer B1 konvolutten til Zapier og Zapen din starter **innen sekunder**. Slå av Zapen og Zapier ber B1 om å slette webhooken — ingen foreldreløse abonnementer.

Dette betyr at triggeren bare aktiveres for hendelser som oppstår **etter** at Zapen slås på. Det er ingen backfill — å slå på en Zap gjenspiller ikke gårsdagens donasjoner.

## Grenser & Notater

- **Flere Zaps med samme trigger** registrerer hver sin egen B1-webhook — det er ingen konflikt, men det er verdt å vite hvis du inspiserer **Innstillinger → Utvikler → Webhooks** og lurer på hvorfor det er tre identiske `Zapier — donation.created`-rader der.
- **Testdata i Zap-oppsett** — når du bygger en Zap, ber Zapier deg om eksempeldata for å kartlegge felt. Den vil trekke den nyeste samsvarende hendelsen fra B1 hvis det er noen; ellers bruker den et syntetisk eksempel fra app-definisjonen.
- **Handlingsfeil vises som Zap-feil** i Zapiers oppgavehistorikk. Vanlig årsak: en API-nøkkel uten riktig omfang (f.eks. en "Legg Til Donasjon"-handling trenger `donations:write`). Gjenopprett nøkkelen med riktig omfang og koble til igjen i Zapier.
- **Utgående API-anropskvoter** — hvert B1 API-anrop fra en handling teller mot Zapier-oppgavekvotagrensen din, ikke mot noe på B1s side.

## Feilsøking

- **"Autentisering mislyktes"** ved tilkobling — API-nøkkelen er feil, tilbakekalt, eller mangler omfangene som Zapen trenger. Gjenopprett den i B1Admin med minst `settings:write` pluss de ressursomfangene som Zapen berører, og oppdater deretter forbindelsen.
- **Trigger aktiveres aldri** — bekreft at webhooken faktisk ble registrert: i B1Admin, **Innstillinger → Utvikler → Webhooks** skal nå vise en rad kalt "Zapier — &lt;event&gt;". Hvis den ikke er der, manglet API-nøkkelen sannsynligvis `settings:write` da du slo på Zapen. Fiks nøkkelen, slå Zapen av og på igjen.
- **Trigger aktiveres to ganger** — Zapier leverer av og til på nytt hvis bekjeftelsen gikk tapt. Bruk et "Filtrer etter Zapier"-trinn på en unik id (f.eks. personens `id`) hvis du trenger streng deduplicering.

## Se Også

- [Make](./make) — samme mønster, annen plattform
- [Slack & Discord](./slack-discord) — enklere chatteringsvarsler uten Zapier
- [Webhooks (utviklerreferanse)](/docs/developer/api/webhooks)
