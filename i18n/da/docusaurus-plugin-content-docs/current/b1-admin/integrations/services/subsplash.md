---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Hvis du bruger Subsplash til din kirkeapp, donationer eller formularer, men gerne vil have B1 som det primære system for personer og donationer, kan Subsplashs Zapier-app sende donationer, nye profiler og formularsvar til B1 i realtid. Bemærk, at Subsplashs Zapier-app i øjeblikket kun understøtter **udløsere** — forbindelsen går kun én vej (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- En Subsplash-konto med et abonnement, der inkluderer adgang til **API + Zapier** (spørg din Subsplash Client Success Manager — disse funktioner kræver et bestemt abonnementsniveau)
- En [Zapier](https://zapier.com)-konto
- En B1Admin-bruger med tilladelsen **Rediger indstillinger**

</div>

## Hvad du kan opsætte

Alle udløsere nedenfor er Subsplashs. Handlingerne er B1's.

| Subsplash-udløser | B1-handling |
|---|---|
| Ny donation | Find person → Tilføj donation (Opret person, hvis den mangler) |
| Nyt løfte | Tilføj donation (med `notes` = "Pledge: …") |
| Ny person oprettet | Opret person |
| Person opdaterede profil | (ingen direkte B1-handling — log til et Google Sheet til manuel gennemgang) |
| Nyt formularsvar | Opret person + (valgfrit) Tilføj gruppemedlem baseret på formularen |

Subsplash → B1 er den eneste retning, Subsplashs app understøtter lige nu.

## Opsætning

### 1. Opret en B1 API-nøgle

I B1Admin: **Indstillinger → Udvikler → API-nøgler → Ny API-nøgle**. Scopes:

- `people:read` — til at finde donoren via e-mail
- `people:write` — til at oprette personen, hvis den ikke findes
- `donations:write` — til at registrere gaven
- (Ingen `settings:write` nødvendig — det er Subsplash, ikke B1, der ejer udløseren her.)

### 2. Forbind Subsplash til Zapier

Følg [Subsplashs vejledning til Zapier-integration](https://support.subsplash.com/en/articles/9825926-zapier-integration). De udsteder et API-token i Subsplash-dashboardet, som Zapier bruger til at godkende udløsersiden.

### 3. Opret Zap'en "registrer en donation"

1. **Udløser** — Subsplash: Ny donation
2. **Handling** — B1.church: Find person (efter e-mail)
3. **Filter / sti** — forgren på "person fundet":
   - **Fundet:** B1.church: Tilføj donation. Map beløb, dato, fond, metode = "Online" og notes = Subsplash-transaktions-id.
   - **Ikke fundet:** B1.church: Opret person → B1.church: Tilføj donation (med den nyoprettede persons id).

Slå Zap'en til. Fremtidige Subsplash-donationer kommer ind under **B1Admin → Donationer** inden for få sekunder.

## Almindelige opskrifter

### Send en tak, når en første gave modtages

- **Udløser** — Subsplash: Ny donation
- **Handling** — Filter i Zapier: fortsæt kun, hvis det er donorens første gave (brug en *Opslagstabel* med donorens e-mail mod et Google Sheet med tidligere givere, eller et Zapier-*Stier*-trin baseret på donorens oprettelsesdato)
- **Handling** — Mailchimp / SMTP / SendGrid: send takkebesked for første gave
- **Handling** — B1.church: Tilføj donation (som normalt)

### Skil løfter fra den almindelige givning

- **Udløser** — Subsplash: Nyt løfte
- **Handling** — B1.church: Tilføj donation med `notes = "Pledge — Subsplash"` og en fond ved navn `Løfter` (adskilt fra din driftsfond), så du kan rapportere om løfter separat under **B1Admin → Donationer → Oversigt**.

### Synkronisér nye app-brugere som B1-personer

- **Udløser** — Subsplash: Ny person oprettet
- **Handling** — B1.church: Opret person med navn, e-mail og telefon. Tag personen i B1 ved at tilføje den nye person til en gruppe som "Subsplash App-brugere".

## Begrænsninger og noter

- **Subsplashs Zapier-app understøtter kun udløsere.** Hvis du vil have ændringer på B1-siden (f.eks. at en ny B1-person også skal oprettes i Subsplash), skal du bygge broen selv: brug udløsere fra B1's Zapier-app til at kalde Subsplashs REST API via handlingen *Webhooks by Zapier — POST*. Det er en brugerdefineret integration, ikke en opskrift.
- **API-adgang kræver et bestemt abonnement.** Hvis Zapier-forbindelsen fejler med `403 Forbidden`, inkluderer dit Subsplash-abonnement sandsynligvis ikke API-adgang — kontakt din Client Success Manager.
- **Fondsmapning er manuel.** Subsplash sender et kampagne- eller kategorinavn, mens B1 kræver et numerisk fond-id. Enten hardcoder fonden i Zap'en, eller vedligehold en Zapier-*Opslagstabel*, der mapper Subsplash-kampagner til B1-fonde.

## Fejlfinding

- **Ingen udløser aktiveres efter en donation** — kontroller i Subsplashs Zapier-dashboard, at forbindelsen stadig viser *Connected*. Hvis API-tokenet er blevet roteret på Subsplash-siden, stopper Zap'en stille; forbind igen.
- **B1 *Tilføj donation* fejler med 422** — oftest mangler `fundId` eller er ukendt. Find dine fonde under **B1Admin → Donationer → Fonde** og kopiér det præcise id ind i Zap-trinnet.
- **Første gave udløser to gange** — Subsplash sender af og til en udløser igen, hvis Zapier ikke fik bekræftelsen. Tilføj et *Filter i Zapier* på donations-id'et (Subsplash sender det med i payload'en) for at fjerne dubletter.

## Se også

- [Donorbox](./donorbox) — samme opskriftsstruktur, anden donationsplatform
- [Zapier (oversigt)](../zapier) — B1-siden af alle Zapier-opskrifter
- [Subsplashs vejledning til Zapier-integration](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplashs dokumentation)
