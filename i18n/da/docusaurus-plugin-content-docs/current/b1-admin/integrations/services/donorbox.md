---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Hvis din kirke modtager donationer gennem Donorbox, men registrerer personer og kvitteringer i B1, kan du få Donorbox' øjeblikkelige Zapier-udløsere til at oprette tilsvarende donationsposter i B1 — og til at oprette donoren som B1-person, hvis vedkommende ikke allerede findes. Ingen manuel afstemning, ingen månedlig eksport.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- En [Donorbox](https://donorbox.org)-konto med mindst én kampagne
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruger med tilladelsen **Edit Settings**

</div>

## Hvad du kan koble op

| Retning | Donorbox-udløser | B1-handling |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (øjeblikkelig) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (tilbagevendende) | Find Person → Add Donation (brug Plan-id'et som note) |

Donorbox udgiver sine udløsere som **øjeblikkelige** — de aktiveres inden for få sekunder efter en reel donation. Ingen ventetid ved polling.

## Opsætning

### 1. Opret en B1 API-nøgle

I B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read` — til at slå donoren op via e-mail
- `people:write` — til at oprette donoren, hvis vedkommende er ny
- `donations:write` — til at registrere gaven

Udløsere i denne retning er Donorbox' og ikke B1's, så du behøver ikke `settings:write` her.

### 2. Opbyg Zap'en "record a donation"

1. **Trigger** — Donorbox: New Donation. Forbind med Donorbox' API-nøgle (i Donorbox: *Account → Profile → API Settings*).
2. **Action** — B1.church: Find Person. Knyt donorens e-mail fra udløseren til feltet *Email* i søgningen.
3. **Action** — Filter by Zapier (valgfrit): fortsæt kun, hvis donoren ikke blev fundet, og derefter…
4. **Action** — B1.church: Create Person. Knyt fornavn/efternavn/e-mail, så donoren oprettes som medlem og ikke kun som gavepost.
5. **Action** — B1.church: Add Donation. Knyt:
   - Amount → `data.amount`
   - Donation Date → udløserens donationsdato
   - Fund → vælg den B1-fond, der spejler Donorbox-kampagnen (Zapier lader dig skifte fond baseret på et filter eller et formatér-trin)
   - Method → "Online"
   - Notes → Donorbox' transaktions-id (praktisk ved afstemning)

Slå Zap'en til. Den næste live-donation via Donorbox lander automatisk under **B1Admin → Donations**.

## Almindelige opskrifter

### Én Zap pr. fond

Hvis du kører flere Donorbox-kampagner, der svarer til separate B1-fonde, er det mest overskuelige layout én Zap pr. kampagne med et Donorbox *campaign*-filter øverst. Så er fondsmapningen fastlagt, og du springer opslagstrinnet over.

### Behandl opdaterede donationer som rettelser

Donorbox' *New or Updated Donation* aktiveres også ved redigeringer. Brug et Zapier *Path*-trin på `event_type` til at forgrene: "new" → Add Donation, "updated" → Find Donation + Update (bemærk: B1's Zapier-app har endnu ingen Update Donation-handling — indtil videre kan du logge "updated"-hændelser til en Slack-kanal til manuel gennemgang).

### Synkronisér ændringer i tilbagevendende planer til en Slack-kanal

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: Send Message til `#donations` (f.eks. "Plan ændret — Sarahs månedlige gave er nu 200 $")

## Begrænsninger og noter

- **Match donorer via e-mail.** Donorbox deler ikke B1's person-id; den eneste varige samlenøgle er e-mail. Donorer, der giver under en anden e-mail, opretter en ny B1-person — din månedlige afstemning bør lede efter disse.
- **Refusioner vises ikke særskilt** — Donorbox sender en statusopdatering på den samme donation. B1's Zapier-app har endnu ikke en *Update Donation*-handling; det sikre mønster i dag er at logge refusionshændelser uden for systemet og justere donationen manuelt.
- **Test først i Donorbox' sandkasse** for at undgå at oprette falske gaver i produktions-B1. Donorbox leverer testtilstands-legitimationsoplysninger, adskilt fra de live.

## Fejlfinding

- **Advarslen "Person not found" ved hver kørsel** — det er fint, hvis du har ordnet trinene, så et *Create Person* kører i "not found"-grenen. Hvis Create Person-trinnet heller aldrig kører, så tjek, at API-nøglen har `people:write`.
- **Donationsbeløbet ser 100 gange for stort eller lille ud** — Donorbox sender beløb i cent i nogle payload-varianter og i dollars i andre. Brug et *Formatter by Zapier — Numbers*-trin til at dividere med 100, hvis det er nødvendigt.
- **Dubletdonationer fra en enkelt gave** — Donorbox aktiverer både *New Donation* og *Updated Donation*. Enten filtrer til `event_type = "donation.succeeded"`, eller opret to Zaps med ikke-overlappende filtre.

## Se også

- [Zapier (overblik)](../zapier) — B1-siden af alle Zapier-opskrifter
- [Subsplash](./subsplash) — en anden donationsplatform med en Zapier-app
- [Mailchimp](./mailchimp) — kæd "ny gave" til et e-mail-tag
