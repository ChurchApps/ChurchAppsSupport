---
title: "Zapier"
description: "Forbind B1 Admin til Zapier for at starte automatiseringer ved nye personer, donationer og gruppemedlemmer, og skriv poster tilbage til B1 uden kodning."
---

# Zapier

<div class="article-intro">

Den officielle B1.church-app på Zapier gør det muligt for en Zap at reagere på hændelser i din kirke (ny person, ny donation, nyt gruppemedlem, …) og skrive poster tilbage til B1. Ingen kodning, ingen infrastruktur — du opsætter det i Zapiers drag-and-drop-editor, indsætter en API-nøgle og aktiverer Zap'en.

</div>

:::caution Venter på Zapiers godkendelse
B1.church-appen er bygget og fungerer, men den venter stadig på Zapiers gennemgang, før den vises offentligt i Zap-editorens appkatalog. Indtil den er godkendt, kan kun inviterede konti bruge den. Alt nedenfor beskriver, hvordan den vil fungere, når den er godkendt.
:::

<div class="prereqs">
<h4>Før du begynder</h4>

- En [Zapier](https://zapier.com)-konto (gratisniveauet er nok til et par Zaps)
- En kirkeadministrator med tilladelsen **Rediger indstillinger** i B1Admin (du opretter en API-nøgle)
- En idé om, hvad du vil gøre — f.eks. "når en person tilføjes i B1, tilføj dem til min Mailchimp-liste"

</div>

## Udløsere og handlinger

| Type | Hvad | B1-hændelse / endpoint |
|---|---|---|
| **Udløser** | Ny person | `person.created` |
| **Udløser** | Opdateret person | `person.updated` |
| **Udløser** | Ny donation | `donation.created` |
| **Udløser** | Nyt gruppemedlem | `group.member.added` |
| **Udløser** | Ny formularindsendelse | `form.submission.created` |
| **Handling** | Opret person | tilføjer en ny person |
| **Handling** | Tilføj donation | registrerer en donation |
| **Handling** | Tilføj gruppemedlem | tilføjer en person til en gruppe |
| **Handling** | Find person | slår en person op efter id, e-mail eller navn; mislykkes, hvis ingen matcher |

Kombiner disse frit med en hvilken som helst af Zapiers 7.000+ understøttede apps.

## Opsætning

### 1. Opret en B1 API-nøgle

1. Gå i B1Admin til **Indstillinger → Udvikler → API-nøgler**.
2. Klik på **Ny API-nøgle**, giv den et navn som "Zapier", og vælg de scopes, Zap'en har brug for.
3. **Vigtigt:** Zapier-udløsere registrerer en webhook på dine vegne, når Zap'en aktiveres, hvilket kræver scopet **`settings:write`**. Inkluder altid `settings:write`, hvis nogen af dine Zaps bruger en B1-udløser.
4. Giv også de scopes, handlingerne har brug for — f.eks. kræver handlingen "Tilføj donation" `donations:write`, og "Opret person" kræver `people:write`.
5. Gem. Den fulde `cak_…`-nøgle vises **én gang** — kopiér den.

### 2. Forbind Zapier til B1

1. Byg en ny Zap i Zapier.
2. Når du vælger en B1-udløser eller -handling for første gang, beder Zapier dig om at **logge ind på B1.church**.
3. Indsæt API-nøglen fra trin 1, og klik på **Ja, fortsæt**. Zapier validerer den mod din kirke.

Forbindelsen gemmes i Zapier og genbruges af alle Zaps på din konto.

### 3. Byg Zap'en

Vælg en udløser, og tilføj derefter et eller flere handlingstrin. Eksempler nedenfor.

## Almindelige opskrifter

### Tilføj nye B1-personer til Mailchimp

- **Udløser** — B1: Ny person
- **Handling** — Mailchimp: Tilføj/opdater abonnent. Map B1's `name__first`, `name__last`, `contactInfo__email` til Mailchimps felter for Fornavn / Efternavn / E-mail.

### Send donationer til en Slack-kanal med et rigere kort end den indbyggede connector

- **Udløser** — B1: Ny donation
- **Handling** — Slack: Send kanalbesked. Opbyg ethvert layout — knapper, vedhæftede filer osv. — som den indbyggede [Slack-connector](./slack-discord.md) ikke kan.

### Tilføj nye gruppemedlemmer til en Google-gruppe

- **Udløser** — B1: Nyt gruppemedlem (filtreret til et bestemt `groupId`)
- **Handling** — Filter by Zapier: fortsæt kun, hvis B1-gruppen er den, du er interesseret i
- **Handling** — B1: Find person (brug udløserens `personId` til at hente e-mailen)
- **Handling** — Google Grupper: Tilføj medlem

### Videresend formularindsendelser til et projektværktøj

- **Udløser** — B1: Ny formularindsendelse
- **Handling** — Notion / Linear / Asana / Trello: Opret side / problem / opgave

## Sådan fungerer udløsere under overfladen

Udløsere er **REST-hooks**, ikke polling — Zapier spørger ikke B1 hvert 15. minut. Når du aktiverer Zap'en, beder Zapier B1 om at registrere en webhook, der peger på en privat Zapier-URL; når hændelsen indtræffer, sender B1 datapakken til Zapier, og din Zap starter **inden for få sekunder**. Deaktiverer du Zap'en, beder Zapier B1 om at slette webhooken — der bliver ingen forældreløse abonnementer.

Det betyder, at udløseren kun aktiveres for hændelser, der sker **efter**, at Zap'en er aktiveret. Der er ingen tilbageudfyldning — aktivering af en Zap afspiller ikke gårsdagens donationer.

## Begrænsninger og noter

- **Flere Zaps med samme udløser** registrerer hver deres egen B1-webhook — der er ingen konflikt, men det er godt at vide, hvis du kigger under **Indstillinger → Udvikler → Webhooks** og undrer dig over, hvorfor der står tre identiske rækker `Zapier — donation.created`.
- **Testdata i Zap-opsætning** — når du bygger en Zap, beder Zapier om eksempeldata for at kortlægge felterne. Den henter den seneste matchende hændelse fra B1, hvis en findes; ellers bruger den et syntetisk eksempel fra app-definitionen.
- **Handlingsfejl vises som Zap-fejl** i Zapiers opgavehistorik. Almindelig årsag: en API-nøgle uden det rette scope (f.eks. kræver handlingen "Tilføj donation" `donations:write`). Opret nøglen igen med de rigtige scopes, og forbind igen i Zapier.
- **Kvoter for udgående API-kald** — hvert B1 API-kald fra en handling tæller mod din Zapier-opgavekvote, ikke mod noget på B1's side.

## Fejlfinding

- **"Authentication failed"** ved forbindelse — API-nøglen er forkert, tilbagekaldt eller mangler de scopes, Zap'en skal bruge. Opret den igen i B1Admin med mindst `settings:write` plus de ressource-scopes, Zap'en berører, og opdater derefter forbindelsen.
- **Udløseren aktiveres aldrig** — bekræft, at webhooken faktisk blev registreret: i B1Admin under **Indstillinger → Udvikler → Webhooks** skal der nu stå en række med navnet "Zapier — &lt;hændelse&gt;". Hvis den ikke er der, manglede API-nøglen sandsynligvis `settings:write`, da du aktiverede Zap'en. Ret nøglen, og slå Zap'en fra og til igen.
- **Udløseren aktiveres to gange** — Zapier sender en gang imellem en hændelse igen, hvis bekræftelsen gik tabt. Brug et "Filter by Zapier"-trin på et unikt id (f.eks. personens `id`), hvis du har brug for streng deduplikering.

## Se også

- [Make](./make.md) — samme mønster, en anden platform
- [Slack & Discord](./slack-discord.md) — enklere chatnotifikationer uden Zapier
- [Webhooks (udviklerreference)](/docs/developer/api/webhooks)
