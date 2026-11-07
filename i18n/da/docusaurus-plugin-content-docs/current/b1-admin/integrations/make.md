---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (tidligere Integromat) er en visuel platform til workflow-automatisering, der minder om Zapier, men med mere fleksibel logik og en lavere pris ved stor skala. Den officielle B1.church Make-app lader dig oprette "scenarier", der reagerer øjeblikkeligt på B1-hændelser og skriver poster tilbage til B1.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En [Make](https://www.make.com)-konto (gratisversionen dækker små workflows)
- En kirkeadministrator med tilladelsen **Rediger indstillinger** i B1Admin
- En grov idé om det scenarie, du vil oprette

</div>

## Moduler

| Type | Hvad | B1-hændelse / endpoint |
|---|---|---|
| **Øjeblikkelig udløser** | Overvåg hændelser | en hvilken som helst abonneret B1-hændelse (`person.created`, `donation.created`, …) |
| **Handling** | Opret person | tilføjer en ny person |
| **Handling** | Tilføj donation | registrerer en donation |
| **Handling** | Tilføj gruppemedlem | tilføjer en person til en gruppe |
| **Søgning** | Søg efter personer | finder personer ud fra navn eller e-mail |

Den øjeblikkelige udløser lader dig vælge, hvilken hændelse der skal lyttes efter — ét udløsermodul pr. scenarie, konfigureret pr. hændelse.

## Opsætning

### 1. Opret en B1 API-nøgle

1. Gå i B1Admin til **Indstillinger → Udvikler → API-nøgler**.
2. Klik på **Ny API-nøgle**, giv den navnet "Make", og tildel de scopes, du har brug for.
3. **Inkluder `settings:write`**, hvis nogen af dine scenarier bruger den øjeblikkelige udløser — Make registrerer en webhook på dine vegne, når scenariet aktiveres.
4. Tildel også de scopes, handlingsmodulerne kræver (f.eks. `donations:write` til modulet Tilføj donation).
5. Gem, og kopiér nøglen `cak_…`.

### 2. Installer forbindelsen

1. Byg et nyt scenarie i Make, og træk modulet **B1.church**-udløser ind på lærredet.
2. Når du bliver bedt om det, skal du vælge **Opret en forbindelse**. Indsæt API-nøglen i feltet *API Key*, og lad *API Base URL* stå som `https://api.churchapps.org` (medmindre du tester mod staging).
3. Klik på **Gem** — Make tester nøglen ved at læse din kirkeprofil.

Forbindelsen gemmes på din Make-konto og genbruges på tværs af scenarier.

### 3. Konfigurer udløseren

1. Åbn indstillingerne for modulet **Overvåg hændelser**.
2. Vælg den hændelse, du ønsker — f.eks. `donation.created`.
3. Gem. Make genererer en unik webhook-URL og gemmer den internt.

### 4. Tilføj efterfølgende moduler

Træk et af Makes hundredvis af app-moduler ind på lærredet — Mailchimp, Google Sheets, Slack, HubSpot, dit eget HTTP-endpoint osv. Knyt udløserens output (`event`, `churchId`, `data.id`, `data.amount`, …) til deres inputfelter. Makes moduler til flatten, iterator, router og aggregator lader dig bygge forgrenede og parallelle flows, der ville være svære at lave i Zapier.

### 5. Slå scenariet til

Skift **Aktiv** i scenariets header. Make kalder B1's `POST /membership/webhooks` for at registrere URL'en. Fra det øjeblik løber hver matchende B1-hændelse gennem scenariet i realtid.

Når du slår scenariet fra, kaldes `DELETE /membership/webhooks/{id}`, så der ikke bliver efterladt forældreløse abonnementer.

## Almindelige opskrifter

### Synkroniser donationer til et Google Sheet til økonomigennemgang

- **Udløser** — B1: Overvåg hændelser (`donation.created`)
- **Handling** — Google Sheets: Tilføj en række. Knyt `data.donationDate`, `data.amount`, `data.personId`, `data.method` og `data.batchId` til kolonnerne i arket.

### Betinget Slack-notifikation efter donationsbeløb

- **Udløser** — B1: Overvåg hændelser (`donation.created`)
- **Router**:
  - Gren A — Filter: `data.amount >= 1000` → Slack: post i `#major-gifts`
  - Gren B — fallback → Slack: post i `#donations`

### Ny person → CRM + velkomstmail + Slack

- **Udløser** — B1: Overvåg hændelser (`person.created`)
- **Handling** — HubSpot: Opret kontakt
- **Handling** — Mailgun: Send velkomstmail
- **Handling** — Slack: Giv besked i `#new-people` (parallelt — brug Makes router)

## Sådan virker den øjeblikkelige udløser

Den øjeblikkelige udløser er webhook-baseret, ikke polling-baseret — når den aktiveres, kalder Make `POST /membership/webhooks` med sin genererede URL og den hændelse, du valgte. Når hændelsen sker i B1, sender B1 kuvertet med POST til Makes URL, og dit scenarie kører inden for få sekunder. Deaktivering af scenariet fjerner webhooken.

Udløseren aktiveres kun for hændelser, der sker **mens scenariet er aktivt**. Der sker ingen efterfyldning af tidligere hændelser.

## Begrænsninger og noter

- **Én hændelse pr. modul Overvåg hændelser.** Hvis du vil lytte efter flere hændelser i ét scenarie, skal du lægge flere udløsermoduler i separate scenarier (eller bruge ét modul med den samlede hændelsesliste — se nedenfor).
- **Signaturverificering er ikke eksponeret** — Make videresender ikke `X-B1-Signature` til scenariet; tillidsgrænsen er Makes unikke, svært gætbare webhook-URL pr. scenarie. Dette er almindelig praksis hos Make. Hvis du har brug for eksplicitte signaturkontroller, skal du i stedet bygge en tilpasset integration med [SDK'et](/docs/developer/api/webhooks#sdk-support).
- **Antal operationer** — hvert API-kald fra et handlingsmodul tæller mod din kvote af Make-operationer, ikke mod noget på B1's side.

## Fejlfinding

- **Forbindelsestesten fejler** — oftest en tastefejl i API-nøglen. Kopiér den igen fra B1Admin (hele nøglen vises kun én gang; hvis du har mistet den, skal du oprette en ny nøgle).
- **Udløsermodulet aktiveres ikke** — tjek **Indstillinger → Udvikler → Webhooks** i B1Admin. Hvis du ikke ser en række "Make — &lt;event&gt;" efter aktivering af scenariet, mangler nøglen `settings:write`. Opdater nøglen og aktiver scenariet igen.
- **Handlingen returnerer `403 Forbidden`** — API-nøglen mangler scope til det pågældende endpoint. Tilføj f.eks. Tilføj donation kræver `donations:write`. Opdater nøglen i B1Admin og test igen.

## Tilpasning af appen

B1.church Make-appen er open source — JSON-definitionerne ligger i repoet `B1Integrations/Make/`. Hvis du har brug for et modul, der ikke findes (f.eks. en ny handling for et endpoint, vi endnu ikke dækker), kan du oprette et issue eller en pull request dér.

## Se også

- [Zapier](./zapier) — samme mønster med en enklere brugerflade og et større appkatalog
- [Slack & Discord](./slack-discord) — indbyggede chatnotifikationer uden Make
- [Webhooks (udviklerreference)](/docs/developer/api/webhooks)
