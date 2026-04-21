---
title: "Vejledning: Lancering af dit kirkewebsted"
---

# Lancering af dit kirkewebsted

<div class="article-intro">

B1.church inkluderer en komplet websiteBuilder uden ekstra omkostninger. Denne vejledning fører dig gennem oprettelse af dit kirkewebsted fra bunden -- opsætning af din hjemmeside, konfigurering af dit udseende og funktionsmåde, tilføjelse af vigtige sider og eventuelt forbinding af online giving og begivenhedsregistreringsformularer.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Har dit kirkelogo klar (PNG med transparent baggrund virker bedst)
- Vælg 2-3 mærkefarver til dit sted
- Hvis du bruger et brugerdefineret domæne (f.eks. dinkirke.com), skal du have adgang til din DNS-udbyder (GoDaddy, Cloudflare osv.)
- Hvis du vil have online giving på dit websted, skal du først udfylde [Online Giving Setup](../donations/online-giving-setup.md) (Stripe)

</div>

## Trin 1: Indledende webstedopsætning

Start med at oprette din hjemmeside og grundlæggende webstedstruktur.

Følg vejledningen [Websted indledende opsætning](../website/initial-setup.md) for at:

1. Gå til **Websted** i B1 Admin
2. Opret din hjemmeside med en herosection, velkomstkort og vigtige oplysninger
3. Tilføj dit kirkenavn og tagline

## Trin 2: Konfigurer udseende

Indstil dit websteds visuelle identitet -- farver, skrifttyper, logo og sidefod.

Følg vejledningen [Udseende](../website/appearance.md) for at:

1. Upload dit kirkelogo
2. Indstil dine primær- og accentfarver
3. Konfigurer navigationslinen og sidefoden
4. Forhåndsvis dine ændringer

:::tip
Hold din farvepalette enkel -- en primærfarve plus en accentfarve er normalt nok. Websitebuilder håndterer resten.
:::

## Trin 3: Tilføj indholdssider

Byg ud af de sider, dine besøgende har behov for mest.

Følg vejledningen [Styring af sider](../website/managing-pages.md) for at oprette sider som:

- **Om** -- Din kirkes historie, tro og ledelse
- **Prædikener** -- Link til dit [prædikenbibliothek](../sermons/managing-sermons.md)
- **Begivenheder** -- Kommende begivenheder og registrering
- **Giv** -- Siden for online giving (kræver [Stripe-opsætning](../donations/online-giving-setup.md))
- **Kontakt** -- Placering, servicetider og kontaktoplysninger

## Trin 4: Forbind dit domæne

Hvis du vil bruge dit eget domænenavn (som dinkirke.com) i stedet for standard-B1-URL'en:

1. Gå til **Websted > Indstillinger** i B1 Admin
2. Angiv dit brugerdefinerede domæne
3. Opdatér dine DNS-records hos din domæneudbyder for at pege på B1

:::info
DNS-ændringer kan tage op til 48 timer at udbrede. Dit websted er muligvis ikke tilgængeligt fra dit brugerdefinerede domæne med det samme. Standard-B1-URL'en fortsætter med at virke i denne tid.
:::

## Trin 5: Tilføj giving og formularer

Forbedre dit websted med interaktive elementer:

- **Online giving** -- Tilføj en giving-sektion, så medlemmer kan donere direkte fra dit websted. Se [Online Giving Setup](../donations/online-giving-setup.md) for at konfigurere Stripe først.
- **Registreringsformularer** -- Integrer [selvstændige formularer](../forms/creating-forms.md) til begivenhedstilmeldinger, besøgerkort eller frivillig ansøgninger. Se [Styring af sider](../website/managing-pages.md) for hvordan du tilføjer et formelaudsement til enhver side.

## Du er færdig!

Dit kirkewebsted er live. Del URL'en med din menighed og på sociale medier. Du kan opdatere indhold, tilføje nye sider og justere udseende når som helst fra B1 Admin-dashboardet.

## Relaterede artikler

- [Websted indledende opsætning](../website/initial-setup.md) -- detaljeret opsætningsgennemgang
- [Styring af sider](../website/managing-pages.md) -- tilføj og rediger sider
- [Udseende](../website/appearance.md) -- farver, logo og layout
- [Styring af filer](../website/files.md) -- upload billeder og dokumenter
- [Online Giving Setup](../donations/online-giving-setup.md) -- konfigurer Stripe
- [Oprettelse af formularer](../forms/creating-forms.md) -- byg registrerings- og undersøgelsesformularer
