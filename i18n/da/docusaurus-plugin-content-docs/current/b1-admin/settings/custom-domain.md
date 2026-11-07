---
title: "Eget domæne"
description: "Peg dit eget domæne, f.eks. www.dinkirke.dk, mod din B1-hjemmeside i B1 Admin ved at opsætte DNS-poster og tilføje domænet under Indstillinger."
---

# Eget domæne

<div class="article-intro">

Du kan pege dit eget domænenavn (for eksempel **`www.dinmenighed.org`**) hen til dit B1-site, så besøgende kommer ind via din menigheds egen webadresse i stedet for standardadressen dinmenighed.b1.church.

</div>

## Introduktionsvideo

<YouTube id="L5yaDusHts8" title="Sådan forbinder du et eget domæne i B1" next="Opsætning af livestreaming i B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Trin 1 — Tilføj DNS-posten først

Før du tilføjer dit domæne i B1, skal du pege det hen til B1's servere hos din domeneudbyder (GoDaddy, Namecheap, Cloudflare osv.).

Tilføj en af disse poster — CNAME foretrækkes:

| Type | Værtsnavn | Værdi |
|------|-----------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `dinmenighed.org` | `3.23.251.61` |

Brug **CNAME** til din `www`-adresse. Brug **A-posten**, hvis din udbyder ikke understøtter CNAME på et roddomæne (uden www), eller hvis du også vil have roddomænet til at virke.

Det kan tage nogle minutter til et par timer, før DNS-ændringer træder i kraft.

## Trin 2 — Tilføj domænet i B1

Når DNS peger på B1:

1. Gå til **Indstillinger** i B1 Admin.
2. Klik på **Domæner** i den venstre liste, og klik derefter på **Rediger** i sektionen **Domæner**.
3. Skriv dit domænenavn i feltet, og klik på **Gem**.

Du behøver ikke at klikke på knappen **+** først — et domæne, der står i feltet, bliver tilføjet, når du gemmer. Brug **+** (eller tryk på **Enter**), når du vil tilføje flere domæner til listen, før du gemmer.

B1 håndterer SSL automatisk — du behøver ikke købe et certifikat.

:::warning
Hvis du tilføjer domænet i B1, før dine DNS-poster er på plads, bliver det ikke gemt. Opsæt altid DNS først.
:::

## Kontrollér, at det virker

Når du har gemt, skal du besøge dit domæne i en browser. Hvis det indlæser dit B1-site, er du færdig. Hvis du ser en fejl, er DNS muligvis stadig ved at sprede sig — vent nogle minutter, og prøv igen.

Du kan også kontrollere DNS-udbredelsen på [dnschecker.org](https://dnschecker.org) — søg efter dit domæne, og se, om din CNAME- eller A-post vises.
